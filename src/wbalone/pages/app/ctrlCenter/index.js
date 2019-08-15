define(function (require, module, exports) {
    // 引入相关的功能插件或模块
    var html = require('text!./index.html');
	require('i18n');
    require('css!./index.css');
	
    var license = require('../../../tools/license.js');


    var dialogmin = require('dialogmin');
    var app = null;
    initI18n();
    var viewModel = {
		 initI18n: function(){
            initI18n();
        },
        areaName:ko.observable($.i18n.prop('js.app.ctr.0001')),
        areaId:ko.observable(''),
        groupName:ko.observable($.i18n.prop('js.app.ctr.0002')),
        groupId:ko.observable(''),
        areaClick:function(obj){
			viewModel.initI18n();
            viewModel.areaName(obj.area.areaName);
            viewModel.areaId(obj.area.id);
            viewModel.groupName($.i18n.prop('js.app.ctr.0002'));
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
                el: '#ctrlCenter',
                model: viewModel
            });
			viewModel.initI18n();
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
                    showway: "sysarea",
                    areaId: param.areaId ? param.areaId : "",
                    groupId: param.groupId ? param.groupId : ""
                }
            };
            var successCallback = function (res) {
                if (res.status === 1) {
                    var data = res.data;
                    viewModel.groups(data);
                } else {
                    alert(res.msg ? res.msg : $.i18n.prop('js.app.ctr.0003'))
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
                                    "areaName" : $.i18n.prop('js.app.ctr.0004'),
                                    "isenable" : "Y",
                                    "sort" : "1",
                                    "tenantId" : "tenant"
                                },
                                "group" : [ {
                                    "id" : "",
                                    "tenantId" : "tenant",
                                    "name" : $.i18n.prop('js.app.ctr.0005'),
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
                        alert(e.message || $.i18n.prop('js.app.ctr.0006'));
                    }
                })
            },
            init: function () {
				viewModel.initI18n();
                viewModel.search.load();
                var rootDom = $("#ctrlCenter");
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
            var code = data.appCode;
            var urlType = data.urltype;


            license.HandleErr(data, function () {
                //router on url
                if (url == "/widget") {
                    location.href = "#manage/" + url.replace("/", "");
                } else if (url == "layout") {
                    location.href = "#layouts";
                } else if (urlType == "url") {
                    window.location.href = '#/ifr/' + encodeURIComponent(encodeURIComponent(url));
                } else {
                    if (url && url.indexOf('.js') != -1) {
                        if (!window.router.routes[code]) {
                            window.registerRouter(code, url);
                        }
                        window.location.href = "#/" + code;
                    } else {
                        location.href = "#manage/" + url;
                    }
                }
            });

            window.scrollTo(0,0)

            /*


             var url =data.url;
             var urltype = data.urltype || "";
             var code = data.appCode;
             switch (urltype) {
             case 'url':
             window.location.href = '#/ifr/' + encodeURIComponent(encodeURIComponent(url));
             break;
             case 'view':
             window.location.href = "#apps/" + url.replace("#","").trim();
             break;
             case 'plugin':
             if(!window.router.routes[code]){
             window.registerRouter(code, url);
             }
             window.location.href = "#/" + code;
             break;
             default:
             window.location.href = '#/ifr/404';
             }*/
        }
    };

    return {
        init: function (content) {
            // 插入内容
			
            content.innerHTML = html;
            
            //ie下input无法获得焦点
            if(u.isIE9||u.isIE10||u.isIE11){
                $('#ieHockInput').focus()
            }
            // 执行主逻辑
            viewModel.pageInit();
			viewModel.initI18n();
            $('body').css('overflow','auto');
			 //复写iuap uui的删除方法---by shangyujie 20170928,由于用户角色节点中使用viewModel.destListData.removeRow(index);不生效，故这里重写
            u.DataTable.prototype.removeRows = function(indices, obj){
              obj?obj.forceDel = true:obj = {forceDel:true};
              this.setRowsDelete(indices, obj);
            }

        }
    }
});
