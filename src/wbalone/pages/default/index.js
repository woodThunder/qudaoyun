/**
 * Created with JetBrains WebStorm.
 * User: anry
 * Date: 16-8-24
 * Time: 下午2:48
 * index.js
 */
define(function(require, module, exports) {
    // 引入相关的功能插件或模块
    var html = require('text!./index.html');
    var RBOX = 'widgetBox';
    require('css!./index.css');
    $.ajaxSetup({
        cache: false
    });
    var viewModel = {
        pageInit: function() {
            app = u.createApp({
                el: '#firstPage',
                model: viewModel
            });
            viewModel.loadData();
        },
        pagesData: ko.observableArray([]),
        navPage: function(data, event) {
            $("#firstPage .wb-tab>a.wbactive").removeClass(' wbactive');
            $(event.currentTarget).addClass(' wbactive');
            viewModel.renderwidgetBox(data);
        },
        renderwidgetBox: function(item) {

            if (item.urltype) {
                if (item.urltype == "view") {
                    var module = window.contextRoot + "/data:layout/" + item.location;
                    var load = window.require;
                    requirejs.undef(module);
                    load([module], function(module) {
                        $('#' + RBOX).html('');
                        module.init({
                            'element': RBOX
                        });
                    });
                } else if (item.urltype == "plugin") {
                    var routeInit = function(p) {
                        var module = p;
                        requirejs.undef(module);
                        var content = document.getElementById(RBOX);
                        window.require([module], function(module) {
                            ko.cleanNode(content);
                            content.innerHTML = "";
                            if (module.init)
                                module.init(content);
                        })
                    };
                    routeInit(item.location);

                } else if (item.urltype == "url") {
                    var id = item.location || "";
                    var ctn = document.getElementById(RBOX);
                    ctn.innerHTML = '';
                    var ifr = document.createElement("iframe");
                    ifr.setAttribute("allowtransparency", true);
                    ifr.src = decodeURIComponent(decodeURIComponent(id));
                    ifr.style.width = '100%';
                    ifr.style.border = 'none';
                    ctn.appendChild(ifr);
                    var autodiv = $(ifr);

                    function autoH() {
                        var addh = $(window).height() - 55;
                        autodiv.height(addh);
                    }
                    autoH();
                    if (autodiv) {
                        autodiv.css({
                            overflow: "auto"
                        });
                        $(window).resize(function() {
                            autoH();
                        })
                    }
                }
            }
            if (viewModel.pagesData().length < 2) {
                $("#firstPage .wb-tab").hide();
            }
        },
        loadData: function() {
            var uri = window.baseUrl + '/appmenumgr/indexQuery';
            $.ajax({
                type: 'get',
                dataType: 'json',
                url: uri,
                data: null,
                contentType: 'application/json',
                success: function(res) {
                    if (res.status === 1) {
                        var pages = res.data;
                        viewModel.pagesData(pages);
                        if (pages[0] && pages[0].urltype) {
                            $("#firstPage .wb-tab>a").eq(0).addClass(' wbactive');
                            viewModel.renderwidgetBox(pages[0]);
                        }
                    } else {
                        alert(res.msg);
                    }
                }
            });
        }
    };
    return {
        init: function(content) {
            // 插入内容
            content.innerHTML = html;
            // 执行主逻辑
            viewModel.pageInit();
        }
    }
});