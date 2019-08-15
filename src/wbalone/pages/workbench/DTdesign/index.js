define(function (require, module, exports) {
    // 引入相关的功能插件或模块
    var html = require('text!./index.html');
    require('css!./index.css');
    require('css!./table.css');
    require('css!./modal.css');
    require('css!./paginate.css');
    require('css!./grid.css');
    require('./u-grid.js');


    var dialogmin = require('dialogmin');
    var DTdesignModal = null;
    var app = null;
    var delId = null;
    var delLayoutId = null;
    var viewModel = {
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
                el: '#DTdesign',
                model: viewModel
            });
            viewModel.pagination.init();
            initI18n('/DTdesign/');
            viewModel.paginationUndesign.init();

            // 获取已经设计过布局的角色列表
            viewModel.loadRoleList({});
            // 获取没有设计的角色列表
            viewModel.loadRoleUndesignList({});

        },
        /**
         * 表格方法，用于添加行后触发渲染
         */
        afterAdd: function (element, index, row) {
            if (element.nodeType === 1) {
                u.compMgr.updateComp(element);
            }
        },
        edit: function (index, row) {

            var datas = {
                roleId: row.getValue("roleid"),
                roleCode: row.getValue("roleCode")
            };
            if (navigator.userAgent.indexOf("iPad") != -1) {
                dialogmin($.i18n.prop('js.wor.DTd.0101', '暂不支持iPad设计布局~'), "tip-alert");
                return;
            } else {
                $.ajax({
                    url: "roleDesign/getExistLayout",
                    dataType: "json",
                    data: JSON.stringify(datas),
                    type: "post",
                    async: false,
                    contentType: "application/json",
                    success: function (res) {
                        if (res.status == "1") {
                            var data = res.data;
                            $("#content").html('');
                            window.designId = datas.roleId;
                            window.designCode = datas.roleCode;
                            window.location.href = "#/layout/" + row.getValue("layoutid") + "/" + encodeURIComponent(data.modify) + "/back/rolemgrdesign";
                        } else {
                            alert(res.msg);
                        }
                    }
                });
            }

        },
        delete: function (i,row) {
            $("#deleteModal").modal("show");
            delId = row.getValue("id");
            delLayoutId = row.getValue("layoutid");
        },
        remove: function () {
            var id = delId;
            var layoutId = delLayoutId;
            $.ajax({
                url: "roleDesign/delete/" + id + "/" + layoutId,
                dataType: "json",
                data: {
                    id: id,
                    layoutId: layoutId
                },
                type: "get",
                async: false,
                contentType: "application/json",
                success: function (res) {
                    if (res.status == "1") {
                        $("#deleteModal").modal("hide");
                        dialogmin($.i18n.prop('js.wor.DTd.0102', '删除成功~'), "tip-suc");
                        viewModel.loadRoleList({});
                        viewModel.loadRoleUndesignList({});

                    } else {
                        alert(res.msg);
                    }
                }
            });

        },
        moveup: function (i, row) {
            //i--
            if (i == 0) return false;

            var arr, tml;
            arr = viewModel.listData.getSimpleData();
            if (i == 1) {
            }
            var data = {
                preId: arr[i - 2] ? arr[i - 2].id : "0",
                curId: row.getValue("id"),
                preSort: arr[i - 2] ? arr[i - 2].sort : "0",
                curSort: row.getValue("sort")
            };
            $.ajax({
                url: "roleDesign/sort",
                dataType: "json",
                data: JSON.stringify(data),
                type: "POST",
                async: false,
                contentType: "application/json",
                success: function (res) {
                    if (res.status == "1") {
                        tml = arr[i - 1];
                        arr[i - 1] = arr[i];
                        arr[i] = tml;

                        viewModel.listData.clear();
                        viewModel.listData.setSimpleData(arr);
                        dialogmin($.i18n.prop('js.wor.DTd.0103', '排序成功~'), "tip-suc");
                    } else {
                        alert(res.msg);
                    }
                }
            });


        },

        movedown: function (i, row) {
            //i++;

            var arr, tml;
            arr = viewModel.listData.getSimpleData();
            var l = arr.length;
            if (i == l - 1) return false;
            var data = {
                preId: arr[i + 1].id,
                curId: row.getValue("id"),
                preSort: arr[i + 1].sort,
                curSort: row.getValue("sort")
            };
            $.ajax({
                url: "roleDesign/sort",
                dataType: "json",
                data: JSON.stringify(data),
                type: "POST",
                async: false,
                contentType: "application/json",
                success: function (res) {
                    if (res.status == "1") {
                        tml = arr[i + 1];
                        arr[i + 1] = arr[i];
                        arr[i] = tml;
                        viewModel.listData.clear();
                        viewModel.listData.setSimpleData(arr);

                        dialogmin($.i18n.prop('js.wor.DTd.0103', '排序成功~'), "tip-suc");
                    } else {
                        alert(res.msg);
                    }
                }
            });

        },

        UndesignList: new u.DataTable({
            meta: {
                id: {
                    type: 'string'
                },
                roleid: {
                    type: 'string'
                },
                roleCode: {
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
                tenantId: {
                    type: 'string'
                },
                layoutid: {
                    type: 'string'
                },
                sort: {
                    type: 'string'
                },
                label: {
                    type: 'string'
                }
            }
        }),
        loadRoleUndesignList: function (params) {
            // 查询参数
            var options = {
                "pn": params.pageNum || viewModel.pagination.element.options.currentPage,
                "ps": params.pageSize || viewModel.pagination.element.options.pageSize
            };

            //请求数据
            var obj = {
                type: "get",
                url: 'roleDesign/listNotDesignedRolePage',
                data: options
            };
            var successCallback = function (res) {
                if (res.status === 1) {
                    var data = res.data;
                    if (data.totalElements == 0) {
                        return false;
                    }
                    viewModel.paginationUndesign.element.update({
                        totalPages: data.totalPages,
                        pageSize: data.size,
                        currentPage: data.number + 1,
                        totalCount: data.totalElements,
                        showState: false
                    });
                    viewModel.UndesignList.setSimpleData(data.content, {
                        unSelect: true
                    });
                    viewModel.checkRole(null);//清空已选择的角色
                    viewModel.paginationUndesign.count(data.totalElements);

                    //todo 默认选中第一行
                    //
                } else {
                    alert(res.msg ? res.msg : $.i18n.prop('js.wor.DTd.0104', '返回错误，请刷新页面'))
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
                    if ((res && res.data == null) || (res.data && res.data.content.length < 1)) {
                        $('#emptyImage').show();
                    }
                    successCallback(res);
                }
            });
        },

        /**
         * 加载角色列表
         * @method function
         * @return {[type]} [description]
         */
        loadRoleList: function (params) {
            // 查询参数
            var options = {
                "pn": params.pageNum || viewModel.pagination.element.options.currentPage,
                "ps": params.pageSize || viewModel.pagination.element.options.pageSize
            };

            //请求数据
            var obj = {
                type: "get",
                url: 'roleDesign/listDesignedRolePage',
                data: options
            };
            var successCallback = function (res) {
                if (res.status === 1) {
                    var data = res.data;
                    // if (data.totalElements == 0) {
                    //     return false;
                    // }
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
                    //
                } else {
                    alert(res.msg ? res.msg : $.i18n.prop('js.wor.DTd.0104', '返回错误，请刷新页面'))
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
                    if ((res && res.data == null) || (res.data && res.data.content.length < 1)) {
                        $('#emptyImage').show();
                    }
                    successCallback(res);
                }
            });
        },
        /**
         *  bind view  click event
         * */
        clickHandle: {
            add: function () {  //分配用户
                // TODO 点击新增按钮，显示对话框
                if (!DTdesignModal) {
                    DTdesignModal = u.dialog({ id: 'DTdesignModal', content: "#selRoleModal", hasCloseMenu: true });
                } else {
                    DTdesignModal.show();
                }
            },
            sort: function () {

            },
            CancelAction: function () {
                DTdesignModal.close();
            },
            ConfirmDesign: function () {
                if (viewModel.checkRole()) {
                    var datas = {
                        roleId: viewModel.checkRole().roleid,
                        roleCode: viewModel.checkRole().roleCode
                    };
                    if (navigator.userAgent.indexOf("iPad") != -1) {
                        dialogmin($.i18n.prop('js.wor.DTd.0101', '暂不支持iPad设计布局~'), "tip-alert");
                        return;
                    } else {
                        $.ajax({
                            url: "roleDesign/getExistLayout",
                            dataType: "json",
                            data: JSON.stringify(datas),
                            type: "post",
                            contentType: "application/json",
                            success: function (res) {
                                if (res.status == "1") {
                                    DTdesignModal.close();
                                    var data = res.data;
                                    $("#content").html('');
                                    window.designId = datas.roleId;
                                    window.designCode = datas.roleCode;
                                    window.location.href = "#/layout/" + data.viewId + "/" + encodeURIComponent(data.modify) + "/back/rolemgrdesign";
                                } else {
                                    alert(res.msg);
                                }
                            }
                        });
                    }
                }
                else {
                    dialogmin($.i18n.prop('js.wor.DTd.0105', '请先选择角色'), "tip-alert");// "请先选择角色"
                    // DTdesignModal.close();
                }
            }
        },

        paginationUndesign: {
            element: null,
            // 用于控制分页控件的显示，条目大于10的时候显示控件
            count: ko.observable(0),
            init: function () {
                // 分页控件初始化
                var ele = $('#paginationUndesign')[0];
                viewModel.paginationUndesign.element = new u.pagination({
                    el: ele,
                    pageList: ['10'],
                    jumppage: true
                });
                //分页
                viewModel.paginationUndesign.element.on('pageChange', function (currentPage) {
                    viewModel.loadRoleUndesignList({
                        pageNum: currentPage + 1,
                        pageSize: viewModel.paginationUndesign.element.options.pageSize
                    });
                });
                viewModel.paginationUndesign.element.on('sizeChange', function (siz) {
                    viewModel.loadRoleUndesignList({
                        pageNum: 1,
                        pageSize: siz - 0
                    });
                });
            }
        },
        /*角色table分页控件*/
        pagination: {
            element: null,
            // 用于控制分页控件的显示，条目大于10的时候显示控件
            count: ko.observable(0),
            init: function () {
                // 分页控件初始化
                var ele = $('#pagination')[0];
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
        checkRole: ko.observable(),
        /*角色列表数据模型*/
        listData: new u.DataTable({
            meta: {
                id: {
                    type: 'string'
                },
                roleCode: {
                    type: 'string'
                },
                roleName: {
                    type: 'string'
                },
                roleid: {
                    type: 'string'
                },
                tenantId: {
                    type: 'string'
                },
                layoutid: {
                    type: 'string'
                },
                sort: {
                    type: 'string'
                },
                label: {
                    type: 'string'
                }
            }
        })
    };

    return {
        init: function (content) {
            initI18n('/DTdesign/');
            // 插入内容
            content.innerHTML = html;
            // iuap 前端升级同步更改 wt 20190123
            // window.headerInit($('#DTdesign .apptitle')[0],$.i18n.prop('ht.wor.DTd.0001', '工作台设计'), window.location.href.indexOf("modulefrom=sidebar")>0,function(){
            //     window.location.href = '#sysmgr';
            // });
            // 执行主逻辑
            viewModel.pageInit();
        }
    }
});