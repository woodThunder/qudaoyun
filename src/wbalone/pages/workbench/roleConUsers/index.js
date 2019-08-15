define(function (require, module, exports) {
    // 引入相关的功能插件或模块
    var html = require('text!./index.html');
    require('css!./index.css');
    require('css!./table.css');
    require('css!./paginate.css');
    require('css!./modal.css');

    var conUserModal = null;


    var viewModel = {
        goback: function () {
            window.history.go(-1);
            return false;
        },
        /**
         * 页面初始化
         * @return {[type]} [description]
         */
        pageInit: function () {
            u.createApp({
                el: '#roleConUser',
                model: viewModel
            });
            viewModel.pagination.init();
            initI18n('/roleConUsers/');

            // 初次加载数据
            viewModel.loadRoleList({});
//            // 加载用户列表
//            viewModel.loadUserList({});

            //事件处理
            //处理搜索任务
            $("#roleConUser")
                .on("keypress", "input[name='searchConUser']", function (event) {
                    if (event.keyCode == 13) {
                        var keyword = $("input[name='searchConUser']").val();
                        viewModel.CurRole.loadConUsersData({keyword: keyword});
                    }
                })
                .on("keypress", "input[name='searchUnConUser']", function (event) {
                    if (event.keyCode == 13) {
                        var keyword = $("input[name='searchUnConUser']").val();
                        viewModel.loadUserList({keyword: keyword});
                    }
                })
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
                        viewModel.pagination.count(0);
                        viewModel.CurRole.ConUsersData.setSimpleData([]);
                        return  false;
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
                    initI18n('/roleConUsers/');
                } else {
                    alert(res.msg ? res.msg : $.i18n.prop('js.wor.rol2.0001', '返回错误，请刷新页面'))
                }
            };


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
                    initI18n('/roleConUsers/');
                } else {
                    alert(res.msg ? res.msg : $.i18n.prop('js.wor.rol2.0002', '返回错误'))
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
         * ajax fun
         * */
        createAjaxFun: function (obj, successCallback) {
            return function () {
                $("#LoadingImage").show();
                $("#emptyImage").hide();
                $('#LoadingImage').parent().find('table tbody').hide();
                $.ajax({
                    type: obj.type || 'get',
                    dataType: obj.dataType || 'json',
                    contentType: 'application/json',
                    url: obj.url,
                    data: obj.data || '',
                    success: function (res) {
                        $("#LoadingImage").hide();
                        $('#LoadingImage').parent().find('table tbody').show();
                        if ((res && res.data == null) || (res.data && res.data.content.length < 1) || (res.data && res.data.length < 1)) {
                            $('#emptyImage').show();
                        }
                        successCallback(res);
                    },
                    //timeout:3000,
                    error: function (e) {
                        if (e.status == 500 && e.responseText == 'Internal Server Error') {
                            $('#emptyImage').show();
                            $('#emptyImage span').html($.i18n.prop('js.wor.rol2.0003', '服务连接错误'));
                            $('#emptyImage span').css({'margin-left': '-46px'});
                        }
                        $("#LoadingImage").hide();
                    }
                });
            }();
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
                $("#rolesTable tbody tr.active").removeClass("active");
                $(event.target).parents("tr:eq(0)").addClass("active");
                viewModel.CurRole.init(row);


                conUserModal = u.dialog({ id: 'conUserModaldialog', content: "#conUserModal", hasCloseMenu: true });
                conUserModal.show();

                viewModel.listUsersData.allSelected(false);
                ko.cleanNode(document.getElementById('tableHeader'));
                ko.applyBindings(viewModel, document.getElementById('tableHeader'));

                $("input[name='searchConUser']").val('');
                $("input[name='searchUnConUser']").val('');


                //todo 分配用户
                //加载未分配用户列表
                viewModel.paginationt3.init();
                viewModel.loadUserList({});
            },
            searchConUser: function (vm, event) {
//                debugger;
                var keyword = $("input[name='searchConUser']").val();
                vm.CurRole.loadConUsersData({keyword: keyword});
            },
            searchUnConUser: function (vm, event) {
//                debugger;
                var keyword = $("input[name='searchUnConUser']").val();
                vm.loadUserList({keyword: keyword});
            },
            unConUserOne: function (row) {   //取消分配当前用户
//                debugger;
                var ids = [];
                ids.push(row.getValue('id'));
                viewModel.CurRole.UnConUsersAjax(ids);
            },
            unConUsers: function () {   //批量取消分配用户
//                debugger;
                var selrowIds = viewModel.CurRole.ConUsersData
                    .getSimpleData({type: 'select', fields: ['id']})
                    .map(function (item, index) {
                        return item.id;
                    });
                viewModel.CurRole.UnConUsersAjax(selrowIds);
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
        /*已分配用户table分页控件*/
        paginationt2: {
            element: null,
            // 用于控制分页控件的显示，条目大于10的时候显示控件
            count: ko.observable(0),
            init: function () {
                // 分页控件初始化
                var ele = $('#paginationt2')[0];
                viewModel.paginationt2.element = new u.pagination({
                    el: ele,
                    pageList: ['5', '10', '20', '50'],
                    jumppage: true
                });
                //分页
                viewModel.paginationt2.element.on('pageChange', function (currentPage) {
                    viewModel.CurRole.loadConUsersData({
                        pageNum: currentPage + 1,
                        pageSize: viewModel.paginationt2.element.options.pageSize
                    });
                });
                viewModel.paginationt2.element.on('sizeChange', function (siz) {
                    viewModel.CurRole.loadConUsersData({
                        pageNum: 1,
                        pageSize: siz - 0
                    });
                });
            }
        },
        /*所有用户table分页控件*/
        paginationt3: {
            element: null,
            // 用于控制分页控件的显示，条目大于10的时候显示控件
            count: ko.observable(0),
            init: function () {
                // 分页控件初始化
                var ele = $('#paginationt3')[0];
                viewModel.paginationt3.element = new u.pagination({
                    el: ele,
                    pageList: ['5', '10'],
                    jumppage: true
                });
                //分页
                viewModel.paginationt3.element.on('pageChange', function (currentPage) {
                    viewModel.loadUserList({
                        pageNum: currentPage + 1,
                        pageSize: viewModel.paginationt3.element.options.pageSize
                    });
                });
                viewModel.paginationt3.element.on('sizeChange', function (siz) {
                    viewModel.loadUserList({
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
                    sort: {
                        type: 'string'
                    },
                    id: {
                        type: 'string'
                    },
                    loginName: {
                        type: 'string'
                    },
                    name: {
                        type: 'string'
                    },
                    name2: {
                        type: 'string'
                    },
                    name3: {
                        type: 'string'
                    },
                    name4: {
                        type: 'string'
                    },
                    name5: {
                        type: 'string'
                    },
                    name6: {
                        type: 'string'
                    }
                }
            }),
            /*分配用户请求*/
            ConUsersAjax: function (callback) {
//                debugger;
                var selrowIds = viewModel.listUsersData
                    .getSimpleData({type: 'select', fields: ['id']})
                    .map(function (item, index) {
                        return item.id;
                    });
                var curRole = viewModel.CurRole.curRoleData();
                var obj = {
                    type: "post",
                    url: "wbuserrole/assignUserRole",
                    data: {
                        roleCode: curRole.roleCode || "",
                        roleId: curRole.id || "",
                        userIds: selrowIds
                    }
                };
                $.ajax({
                    type: obj.type || 'get',
                    dataType: obj.dataType || 'json',
                    contentType: 'application/json',
                    url: obj.url,
                    data: JSON.stringify(obj.data) || '',
                    success: function (res) {
//                        debugger;
                        if (res.status == 1) {
                            viewModel.CurRole.loadConUsersData({});
                            callback();
//                        viewModel.loading.stop();
                        } else {
                            //todo
                        }
                    }
                });

            },

            /*取消分配用户请求*/
            UnConUsersAjax: function (ids) {
                var curRole = viewModel.CurRole.curRoleData();
                var obj = {
                    type: "post",
                    url: "wbuserrole/cancelAssignUserRole",
                    data: {
                        roleCode: curRole.roleCode || "",
                        roleId: curRole.id || "",
                        userIds: ids
                    }
                };
                $.ajax({
                    type: obj.type || 'get',
                    dataType: obj.dataType || 'json',
                    contentType: 'application/json',
                    url: obj.url,
                    data: JSON.stringify(obj.data) || '',
                    success: function (res) {
//                        debugger;
                        if (res.status == 1) {
                            viewModel.CurRole.loadConUsersData({});
                        } else {
                            //todo
                        }
                    }
                });

            },
            loadConUsersData: function (params) {
//                u.showLoader();
                // 查询参数
                var that = this;
                var curRole = viewModel.CurRole.curRoleData();
                var options = {
                    "pn": params.pageNum || viewModel.paginationt2.element.options.currentPage,
                    "ps": params.pageSize || viewModel.paginationt2.element.options.pageSize,
                    "sortColumn": params.sorttype || "",
                    "flag": params.flag || "1",
                    "keyword": params.keyword || $("input[name='searchConUser']").val(),

                    "roleCode": curRole.roleCode || "",
                    "roleId": curRole.id || ""
                };
                //请求数据
                var obj = {
                    type: "get",
                    url: 'userMGT/pagingListByRole',
                    data: options
                };
                var successCallback = function (res) {
//                    u.hideLoader();
                    if (res.status === 1) {
                        var data = res.data;
                        viewModel.paginationt2.element.update({
                            totalPages: data.totalPages,
                            pageSize: data.size,
                            currentPage: data.number + 1,
                            totalCount: data.totalElements
                        });
                        that.ConUsersData.setSimpleData(data.content, {
                            unSelect: true
                        });
                        viewModel.paginationt2.count(data.totalElements);
                        initI18n('/roleConUsers/');
                    } else {
                        alert(res.msg ? res.msg : $.i18n.prop('js.wor.rol2.0002', '返回错误'))
                    }
                };
//
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
                // if (this.curRoleData() && (data.getValue('id') == this.curRoleData().id))return;
//                var index = this.curRoleIndex();
                this.curRoleData(data.getSimpleData());


                //初始化当前角色已分配用户列表
                viewModel.paginationt2.init();
                this.loadConUsersData({});
            },
            CancelAction: function () {
                conUserModal.close();
                viewModel.listUsersData.setAllRowsUnSelect();
//                viewModel.listUsersData.toggleAllSelect();
//                viewModel.listUsersData.toggleAllSelect();
            },
            ConfirmConUsers: function () {
//                debugger;
                var cb = function () {
                    viewModel.CurRole.CancelAction();
                };
                viewModel.CurRole.ConUsersAjax(cb);
            }
        },

        /*用户列表模型*/
        listUsersData: new u.DataTable({
            meta: {
                sort: {
                    type: 'string'
                },
                id: {
                    type: 'string'
                },
                loginName: {
                    type: 'string'
                },
                name: {
                    type: 'string'
                },
                name2: {
                    type: 'string'
                },
                name3: {
                    type: 'string'
                },
                name4: {
                    type: 'string'
                },
                name5: {
                    type: 'string'
                },
                name6: {
                    type: 'string'
                },
                password: {
                    type: 'string'
                },
                roles: {
                    type: 'string'
                },
                registerDate: {
                    type: 'string'
                },
                avator: {
                    type: 'string'
                },
                label: {
                    type: 'string'
                },
                phone: {
                    type: 'string'
                },
                img: {
                    type: 'string'
                },
                islock: {
                    type: 'string'
                },
                email: {
                    type: 'string'
                },
                remark: {
                    type: 'string'
                },
                states: {
                    type: 'string'
                },
                type: {
                    type: 'string'
                }

            }
        }),
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
                roleName2: {
                    type: 'string'
                },
                roleName3: {
                    type: 'string'
                },
                roleName4: {
                    type: 'string'
                },
                roleName5: {
                    type: 'string'
                },
                roleName6: {
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

    return {
        init: function (content) {

            // 插入内容
            content.innerHTML = html;
            // iuap 前端升级同步更改 wt 20190123
            // window.headerInit($('#roleConUser .apptitle')[0],$.i18n.prop('js.wor.rol2.0004', '角色分配用户'),window.location.href.indexOf("modulefrom=sidebar")>0);
            // 执行主逻辑
            viewModel.pageInit();
            initI18n('/roleConUsers/');
        }
    }
});
