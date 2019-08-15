require([
    'dialog',
    'dialogmin',
    'text!' + window.contextRoot + '/apworkbench/js/widgetAuth/index.html',
    'css!' + window.contextRoot + '/apworkbench/js/widgetAuth/index.css',
    'css!' + window.contextRoot + '/apworkbench/js/widgetAuth/modal.css',
    'css!' + window.contextRoot + '/apworkbench/js/widgetAuth/table.css',
    'css!' + window.contextRoot + '/apworkbench/js/widgetAuth/paginate.css'
], function () {
    debugger;
    var widgetListByRoleId = window.contextRoot + "/widgetQuery/widgetListByRoleId";
    // var appListByRoleId = window.contextRoot + "/rolemgr/appListByRoleId";
    var html = require('text!' + window.contextRoot + '/apworkbench/js/widgetAuth/index.html');

    //获取url中的参数
    function getUrlParam(name) {
        var aQuery = window.location.href.split("?");//取得Get参数
        var aGET = {};
        if (aQuery.length > 1) {
            var aBuf = aQuery[1].split("&");
            for (var i = 0, iLoop = aBuf.length; i < iLoop; i++) {
                var aTmp = aBuf[i].split("=");//分离key与Value
                aGET[aTmp[0]] = aTmp[1];
            }
        }
        return aGET[name];
    }

    document.getElementById('widgetAuth').innerHTML = html;
    var conUserModal = null;
    var viewModel = {
        goback: function () {
            window.location.href = '#sysmgr';
            // window.history.go(-1);
            return false;
        },
        /**
         * 页面初始化
         * @return {[type]} [description]
         */
        pageInit: function () {
            u.createApp({
                el: '#widgetAuth',
                model: viewModel
            });
            var keyword =getUrlParam('keyword');
            viewModel.pagination.init();
            if(keyword){
                $("input[name='searchRole']").val(keyword);
            }
            if (getUrlParam("pn")) {
                viewModel.loadRoleList({pn: getUrlParam("pn") || 1,keyword:keyword||''});
            } else {
                // 初次加载数据
                viewModel.loadRoleList({});
            }

//            // 加载用户列表
//            viewModel.loadUserList({});

            //事件处理
            //处理搜索任务
            $("#roleConUser")
                .on("keypress", "input[name='searchRole']", function (event) {
                    if (event.keyCode == 13) {
                        var keyword = $("input[name='searchRole']").val();
                        viewModel.loadRoleList({keyword: keyword});
                    }
                });
        },
        /**
         * 表格方法，用于添加行后触发渲染
         * @method function
         * @param  {[type]} element [description]
         * @param  {[type]} index   [description]
         * @param  {[type]} row     [description]
         * @return {[type]}         [description]
         */
        afterAdd: function (element, index, row) {
            if (element.nodeType === 1) {
                u.compMgr.updateComp(element);
            }
        },


        /**
         * 加载角色列表
         * @method function
         * @return {[type]} [description]
         */
        loadRoleList: function (params) {
            // 查询参数
            var options = {
                "pn": params.pn || viewModel.pagination.element.options.currentPage,
                "ps": params.ps || viewModel.pagination.element.options.pageSize,
                "sortType": params.sorttype || "",
                "search_LIKE_roleName": params.roleName || "",
                "search_LIKE_roleCode": params.roleCode || "",
                "search_EQ_label": params.roleType || "",
                'search_OR_searchParam':params.keyword||""
            };

            if (!!params.keyword) {
              options.pn = 1;
            }

            //请求数据
            var obj = {
                type: "get",
                url: 'roleMGT/listRolePage',
                data: options
            };
            var successCallback = function (res) {
                if (res.status === 1) {
                    var data = res.data;
                    if (data.totalElements == 0) {
                        viewModel.loading.stop();
                        viewModel.listData.setSimpleData([]);
                        viewModel.CurRole.ConUsersData.setSimpleData([]);
                        viewModel.pagination.count(0);
                        return false;
                    }
                    viewModel.pagination.element.update({
                        totalPages: data.totalPages,
                        pageSize: data.size,
                        currentPage: data.number + 1,
                        totalCount: data.totalElements,
                        showState: false
                    });
                    viewModel.listData.setSimpleData(data.content, {
                        unSelect: true
                    });
                    viewModel.pagination.count(data.totalElements);


                    //todo 默认选中第一行

                    var FisrtRow = viewModel.listData.getRow(0);
                    if (FisrtRow) {
                      viewModel.CurRole.init(FisrtRow);
                      $("#rolesTable tbody tr.active").removeClass("active");
                      $("#rolesTable tbody tr:eq(0)").addClass("active");
                    }

                } else {
                    alert(res.msg ? res.msg : "返回错误，请刷新页面")
                }
            };

            viewModel.loading.begein(document.getElementById('rolesTable'));
            $.ajax({
                type: obj.type || 'get',
                dataType: obj.dataType || 'json',
                contentType: 'application/json',
                url: obj.url,
                data: obj.data || '',
                success: function (res) {
                    viewModel.loading.stop();
                    if ((res && res.data == null) || (res.data && res.data.content.length < 1) || (res.data && res.data.length < 1)) {
                        $('#emptyImage').show();
                    }
                    successCallback(res);
                }
            });
        },
        loading: {
            begein: function (parLoad) {
                u.showLoader();
            },
            stop: function () {
                u.hideLoader();
            }
        },
        /**
         * 加载用户数据
         * @method function
         * @return {[type]} [description]
         */
        loadUserList: function (params) {
            var curRole = viewModel.CurRole.curRoleData();
            var options = {
                "pn": params.pageNum || viewModel.paginationt2.element.options.currentPage,
                "ps": params.pageSize || viewModel.paginationt2.element.options.pageSize || 10,
                "sortColumn": params.sorttype || "",
                "flag": params.flag || "2",
                "keyword": $("input[name='searchUnConUser']").val() || params.keyword,

                "roleCode": curRole.roleCode || "",
                "roleId": curRole.id || ""
            };
            //请求数据
            var obj = {
                type: "get",
                url: 'userMGT/pagingListByRole',
                data: options
            };
            /*
             // 查询参数
             var options = {
             "pn": params.pn || viewModel.paginationt3.element.options.currentPage,
             "ps": 10 || viewModel.paginationt3.element.options.pageSize,
             "sortColumn": params.sorttype || "",
             "search_LIKE_loginName": params.loginName || "",
             "search_LIKE_name": params.name || "",
             "search_LIKE_phone": params.phone || "",
             "search_EQ_states": params.state || ""
             };
             //请求数据
             var obj = {
             type: "get",
             url: 'userMGT/pagingList',
             data: options
             };*/


            var successCallback = function (res) {
                if (res.status === 1) {
                    var data = res.data;
                    viewModel.paginationt3.element.update({
                        totalPages: data.totalPages,
                        pageSize: data.size,
                        currentPage: data.number + 1,
                        totalCount: data.totalElements
                    });
                    viewModel.listUsersData.setSimpleData(data.content, {
                        unSelect: true
                    });
                    viewModel.paginationt3.count(data.totalElements);
                } else {
                    alert(res.msg ? res.msg : "返回错误")
                }
            };
//            viewModel.createAjaxFun(obj, successCallback);
            $.ajax({
                type: obj.type || 'get',
                dataType: obj.dataType || 'json',
                contentType: 'application/json',
                url: obj.url,
                data: obj.data || '',
                success: function (res) {
                    successCallback(res);
                }
            });
        },
        /**
         *  bind view  click event
         * */
        clickHandle: {
            searchRole: function (vm, event) {
                var keyword = $("input[name='searchRole']").val();
                viewModel.loadRoleList({keyword: keyword});
            },
            conUser: function (row, event) {  //分配用户
                //old   code
                var r_id = row.getSimpleData().id || '';
                var pn = viewModel.pagination.element.options.currentPage;
                var keyword = $("input[name='searchRole']").val();
                window.location.href = "#manage/auth_after_rolemgrwidget?keyword="+keyword+"&roleId=" + r_id + "&pn=" + pn;
            },
            showConUsers: function (data, event) {    //显示当前角色已分配用户
//                debugger;
                $("input[name='searchConUser']").val('');
                $("input[name='searchUnConUser']").val('');

                $("#rolesTable tbody tr.active").removeClass("active");
                $(event.target).parents("tr:eq(0)").addClass("active");
                viewModel.CurRole.init(data);
            }
        },

        /*角色table分页控件*/
        pagination: {
            element: null,
            // 用于控制分页控件的显示，条目大于10的时候显示控件
            count: ko.observable(0),
            init: function () {
                // 分页控件初始化
                var ele = $('#paginationt1')[0];
                viewModel.pagination.element = new u.pagination({
                    el: ele,
                    pageList: ['10'],
                    jumppage: true
                });
                //分页
                viewModel.pagination.element.on('pageChange', function (currentPage) {
                    viewModel.loadRoleList({
                        pageNum: currentPage + 1,
                        pageSize: viewModel.pagination.element.options.pageSize
                    });
                });
                viewModel.pagination.element.on('sizeChange', function (siz) {
                    viewModel.loadRoleList({
                        pageNum: 1,
                        pageSize: siz - 0
                    });
                });
            }
        },
        CurRole: {
            curRoleData: ko.observable(),
            curRoleIndex: ko.observable(0),
            /*当前角色已分配用户列表模型*/
            ConUsersData: new u.DataTable({
                meta: {
                    id: {
                        type: 'string'
                    },
                    name: {
                        type: 'string'
                    },
                    category: {
                        type: 'string'
                    },
                    pkWidget: {
                        type: 'string'
                    },
                    wtype: {
                        type: 'string'
                    },
                    url: {
                        type: 'string'
                    }
                }
            }),
            loadConUsersData: function (params) {
//                u.showLoader();
                // 查询参数
                var that = this;
                var curRole = viewModel.CurRole.curRoleData();
                //请求数据
                var obj = {
                    url: widgetListByRoleId,
                    dataType: "json",
                    cache: false,
                    type: "post",
                    contentType: "application/json",
                    data: JSON.stringify({"ROLEID": curRole.id})
                };
                var successCallback = function (res) {
                    that.ConUsersData.setSimpleData(res);

//                    u.hideLoader();
//                     if (res.status === 1) {
//                         var data = res.data;
//                         that.ConUsersData.setSimpleData(data);
//                     } else {
//                         alert(res.msg ? res.msg : "返回错误")
//                     }
                };
//                viewModel.loading.begein();
                $.ajax({
                    type: obj.type || 'get',
                    dataType: obj.dataType || 'json',
                    contentType: 'application/json',
                    url: obj.url,
                    data: obj.data || '',
                    success: function (res) {
//                        viewModel.loading.stop();
                        successCallback(res);
                    }
                });
            },
            init: function (data) {
                // if (this.curRoleData() && (data.getValue('id') == this.curRoleData().id)) return;
//                var index = this.curRoleIndex();
                this.curRoleData(data.getSimpleData());
                //初始化当前角色已分配用户列表
                this.loadConUsersData({});
            }
        },
        /*角色列表数据模型*/
        listData: new u.DataTable({
            meta: {
                sort: {
                    type: 'string'
                },
                id: {
                    type: 'string'
                },
                roleName: {
                    type: 'string'
                },
                roleCode: {
                    type: 'string'
                },
                isActive: {
                    type: 'string'
                },
                createDate: {
                    type: 'string'
                },
                tenantId: {
                    type: 'string'
                },
                label: {
                    type: 'string'
                },
                labelName: {
                    type: 'string'
                },
                remark: {
                    type: 'string'
                },
                creator: {
                    type: 'string'
                },
                modifyDate: {
                    type: 'string'
                },
                reviser: {
                    type: 'string'
                }
            }
        })
    };
    viewModel.pageInit();
});
