define(function (require, module, exports) {
    // 引入相关的功能插件或模块
    var html = require('text!./index.html');
    require('css!./index.css');
    var dialogmin = require('dialogmin');


    // require('/uitemplate_web/static/js/uiref/reflib.js');
    // require('/uitemplate_web/static/js/uiref/refer.js');
    // require('/uitemplate_web/static/js/uiref/refGrid.js');
    // require('/uitemplate_web/static/js/uiref/refGridtree.js');
    // require('/uitemplate_web/static/js/uiref/refTree.js');
    // require('/uitemplate_web/static/js/uiref/refcommon.js');
    // require('/uitemplate_web/static/js/uiref/uiReferComp.js');
    // 通过json数据创建tree
    var simpleObj;

    function onClick(event, treeId, treeNode, clickFlag) {
        $("#emptybox").hide();
        viewModel.grouper(new grouper(treeNode));
    }

    var simpleSet = {
        callback: {
            onClick: onClick
        },
        view: {showIcon: false},
        data: {
            // 开启简单数据模式
            simpleData: {
                enable: true,
                idKey: "id",
                pIdKey: "pid",
                rootPId: null
            }
        }
    };

    function grouper(item) {


        this.id = item.id;
        this.pid = item.pid;
        this.grouptype = ko.observable(true);
        this.code = ko.observable(item.code || "");
        this.creator = ko.observable(item.creator);
        this.createDate = ko.observable(item.createTime);
        this.name = ko.observable(item.name || "");
        this.edit = function (item) {
            viewModel.flag(false);
            item.grouptype(false);
        };
        this.remove = function (item) {

            var nodes = simpleObj.getSelectedNodes();
            if(!nodes.length){
                alert('请选择一个用户组');
                return ;
            }
            $("#deleteModal").modal("show");
        };
        this.cancel = function (item) {
            viewModel.flag(true);
        };
        this.save = function (item) {
            var tree = simpleObj.getSelectedNodes();
            if(!item.code().replace(/\ +/g,"").length){
                dialogmin("编码不能为空~", "tip-alert");
                return ;
            }
            if(!item.name().replace(/\ +/g,"").length){
                dialogmin("名称不能为空~", "tip-alert");
                return ;
            }
            if (item.grouptype()) {//new
                var uri = window.baseUrl + '/usergroup/save';
                var data = {
                    code: item.code(),
                    name: item.name()
                };
                if(tree.length){//children
                    data.pid = tree[0].id;
                }else {//root
                    data.pid = null;
                }
                $.ajax({
                    type: 'post',
                    dataType: 'json',
                    url: uri,
                    data: JSON.stringify(data),
                    contentType: 'application/json',
                    success: function (res) {
                        if (res.status === 1) {
                            viewModel.updatetree(function () {
                                var thisnode = simpleObj.getNodeByParam("code",item.code(),tree.length?tree[0]:null);
                                if(thisnode){
                                    simpleObj.selectNode(thisnode);
                                    viewModel.grouper(new grouper(thisnode));
                                }
                                simpleObj.expandNode(tree[0], true, true, true);
                            });
                            dialogmin("新增成功~", "tip-suc");
                            $("#emptybox").hide();
                            // simpleObj.addNodes(tree[0], {
                            //     pid: tree[0].pid,
                            //     code: item.code(),
                            //     creator: "anry",
                            //     createDate: "",
                            //     modifydate: '',
                            //     editor: '',
                            //     name: item.name()
                            // });
                        }else {
                            dialogmin(res.msg||"异常错误,请重试", "tip-alert");
                        }
                    }
                });

            } else {//edit

                var uri = window.baseUrl + '/usergroup/update';
                $.ajax({
                    type: 'post',
                    dataType: 'json',
                    url: uri,
                    data: JSON.stringify({
                        id: tree[0].id,
                        pid: tree[0].pid,
                        code: item.code(),
                        name: item.name()
                    }),
                    contentType: 'application/json',
                    success: function (res) {
                        if (res.status === 1) {
                            if (tree.length > 0) {
                                tree[0].name = item.name();
                                tree[0].code = item.code();
                                simpleObj.updateNode(tree[0]);
                            }
                            viewModel.updatetree(function () {
                                simpleObj.expandNode(tree[0], true, true, true);
                            });
                            dialogmin("修改成功~", "tip-suc");


                        }else {
                            dialogmin(res.msg||"异常错误,请重试", "tip-alert");
                        }
                    }
                })

            }
            $("#emptybox").hide();
            viewModel.flag(true);
        };

    }

    var viewModel = {
        flag: ko.observable(true),
        grouper: ko.observable(null),
        goback: function () {
            window.history.go(-1);
            return false;
        },

        okremove:function () {
            var nodes = simpleObj.getSelectedNodes();

            var uri = window.baseUrl + '/usergroup/delete/' + nodes[0].id;
            $.ajax({
                type: 'get',
                dataType: 'json',
                url: uri,
                data: null,
                success: function (res) {
                    if (res.status === 1) {

                        for (var i = 0, l = nodes.length; i < l; i++) {
                            simpleObj.removeNode(nodes[i]);
                        }
                        // u.showMessage({
                        //     msg: "删除成功",
                        //     position: "center",
                        //     width: "440px",
                        //     darkType: 'dark',
                        //     showSeconds: 1
                        // });
                        // simpleObj.expandAll(true);
                        dialogmin("删除成功", "tip-suc");

                        if(nodes[0].getParentNode()){
                            simpleObj.expandNode(nodes[0].getParentNode(), true, true, true);
                        }
                        $("#emptybox").show();
                        viewModel.grouper(null);
                        $("#deleteModal").modal("hide");

                    }else {
                        dialogmin(res.msg||"异常错误,请重试", "tip-alert");
                        //
                        // u.showMessage({
                        //     msg: res.msg||"异常错误,请重试",
                        //     position: "center",
                        //     msgType: "warning",
                        //     width: "440px",
                        //     darkType: 'dark',
                        //     showSeconds: 1
                        // });
                        // alert(res.msg||"异常错误");
                    }
                }
            });
        },
        addgroup: function () {
            var tree = simpleObj.getSelectedNodes();
            viewModel.flag(false);
            viewModel.grouper(new grouper({}));
        },
        updatetree: function (cb) {
            var uri = window.baseUrl + '/usergroup/listAll';
            $.ajax({
                type: 'get',
                dataType: 'json',
                url: uri,
                data: null,
                success: function (res) {
                    if (res.status === 1) {
                        // debugger;
                        simpleObj = $.fn.zTree.init($("#treeSimple"), simpleSet, res.data);
                        setTimeout(function () {
                            if(cb){
                                cb&&cb();
                            }
                        },100);


                    }else {
                        dialogmin(res.msg||"异常错误,请重试", "tip-alert");

                    }
                }
            })
        },
        pageInit: function () {
            window.app = null;
            window.app = u.createApp({
                el: '#userGroups',
                model: viewModel
            });
            app.init(viewModel, null, false);

            viewModel.updatetree();
            $("#emptybox").show();
        },
        afterAdd: function (element, index, row) {
            if (element.nodeType === 1) {
                u.compMgr.updateComp(element);
            }
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