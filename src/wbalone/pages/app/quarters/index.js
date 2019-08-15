define(function (require, module, exports) {
    // 引入相关的功能插件或模块
    var html = require('text!./index.html');
    require('css!./index.css');
    var license = require('../../../tools/license.js');
    var dialogmin = require('dialogmin');
    var comp = null;
    var viewModal = {
        loadShow: function () {
            try {
                window.parent.loadShow();
            } catch (err) {

            }
        },
        loadHide: function () {
            try {
                window.parent.loadHide();
            } catch (err) {

            }
        },
        operation: function (type, e) {
            if(type=='dept'&&(!viewModal.orgId())){
                viewModal.tipShow('请先选择组织', 'success');
                return false;
            }
            var title='选取部门';
            var option = {
                title: title,
                refType:1,
                isRadio:true,
                hasPage:false,
                backdrop:false,
                tabData:[
                    {"title":"常用","key":"commonUse"},
                    {"title":"全部","key":"total"}
                ], // option中可增加defaultActiveKey作为默认tab标签
                param:{//url请求参数
                    pk_org:viewModal.orgId(),
                    refCode:'newdept',
                    tenantId:'xxx',
                    sysId:'xxx',
                    content:'云平台',
                    refModelUrl: '/newref/rest/iref_ctr/blobRefTree'
                },
                refModelUrl:{
                    TreeUrl:'/newref/rest/iref_ctr/blobRefTree', //树请求
                    GridUrl:'http://workbench.yyuap.com/ref/rest/iref_ctr/commonRefsearch',//单选多选请求
                    TableBodyUrl:'/newref/rest/iref_ctr/blobRefTree',//表体请求
                    TableBarUrl:'/newref/rest/iref_ctr/refInfo',//表头请求
                    totalDataUrl:'http://workbench.yyuap.com/ref/diwork/iref_ctr/matchPKRefJSON',//根据refcode请求完整数据

                },
                checkedArray: [],
                onCancel: function (p) {
                },
                onSave: function (sels) {
                    var obj=sels[0];
                    $("#deptInput").val(obj.refname);
                    viewModal.deptId(obj.refpk);
                },
                className: '',
            };
            if(type=='org'){
                option = {
                    title: '选取组织',
                    refType:1,
                    isRadio:true,
                    hasPage:false,
                    backdrop:false,
                    treeloadData:true,
                    tabData:[

                    ],
                    param:{//url请求参数
                        refCode:'neworganizition',
                        tenantId:'xxx',
                        sysId:'xxx',
                        content:'用友网络',
                        refModelUrl: 'http://workbench.yyuap.com/ref/rest/testref_ctr/'
                    },    
                    refModelUrl:{
                        TreeUrl:'/newref/rest/iref_ctr/blobRefTree', //树请求
                        GridUrl:'http://workbench.yyuap.com/ref/rest/iref_ctr/commonRefsearch',//单选多选请求
                        TableBodyUrl:'/newref/rest/iref_ctr/blobRefTree',//表体请求
                        TableBarUrl:'/newref/rest/iref_ctr/refInfo',//表头请求
                        totalDataUrl:'http://workbench.yyuap.com/ref/diwork/iref_ctr/matchPKRefJSON',//根据refcode请求完整数
                    },
                    checkedArray: [],
                    onCancel: function (p) {
                    },
                    onSave: function (sels) {
                        var obj=sels[0];
                        $("#group").val(obj.refname);
                        viewModal.orgId(obj.refpk);
                        viewModal.deptId('');
                        $("#deptInput").val('');
                    },
                    className: '',
                };
            }
            window.createModal(option)
        },
        tipContent: ko.observable('操作成功！'),
        openTitle: ko.observable('高级查询<i class="uf uf-arrow-down"></i>'),
        delId: ko.observable(''),
        totalPages: ko.observable(0),
        totalCount: ko.observable(0),
        pageIndex: ko.observable(1),
        editTitle: ko.observable('新增'),
        editObj: ko.observable({}),
        deptId:ko.observable(''),
        orgId:ko.observable(''),
        tipShow: function (msg, type) {
            viewModal.tipContent(msg);
            window.tipContent = u.dialog({
                id: 'tipContentModal',
                content: "#tipContent",
                hasCloseMenu: true
            });
            if (type == 'success') {
                window.setTimeout(function () {
                    window.tipContent.close();
                }, 1000);
            }
        },
        tipClose:function() {
            window.tipContent.close();
        },
        loadData: function (pi) {
            var pageIndex = pi || viewModal.pageIndex();
            var name = $("#name").val();
            var code = $('#code').val();
            var url = '/wbalone/position/page';
            var data = {
                code: code,
                name: name,
                page: pageIndex,
                size: 10
            }
            viewModal.loadShow();
            $.ajax({
                dataType: 'json',
                url: url,
                type: 'post',
                data: JSON.stringify(data),
                contentType: 'application/json;charset=UTF-8',
                success: function (res) {
                    viewModal.loadHide();
                    if (res.success == 'success') {
                        var data = res.detailMsg.data;
                        if (data.content && data.content.length > 0) {
                            viewModal.tableData(res.detailMsg.data.content);
                            $('#quarters .no-data').hide();
                        } else {
                            viewModal.tableData([]);
                            $('#quarters .no-data').show();
                        }
                        comp.update({
                            totalPages: data.totalPages,
                            pageSize: 10,
                            currentPage: data.number + 1,
                            totalCount: data.totalElements
                        });
                    } else {
                        viewModal.tableData([]);
                        viewModal.tipShow(res.message || '操作失败', 'error');
                    }
                },
                error: function () {
                    viewModal.loadHide();
                    viewModal.tipShow('操作失败', 'error');
                }
            })
        },
        tableData: ko.observable([]),
        editData: ko.observable({}),
        openClick: function () {
            if ($('#searchPanel').css('height') == '0px') {
                $('#searchPanel').css('height', 'auto');
                viewModal.openTitle('高级查询<i class="uf uf-arrow-up"></i>');
            } else {
                $('#searchPanel').css('height', '0px');
                viewModal.openTitle('高级查询<i class="uf uf-arrow-down"></i>');
            }

        },
        searchClick: function () {
            viewModal.loadData();
        },
        clearClick: function () {
            $("#name").val('');
            $('#code').val('');
        },
        addClick: function () {
            viewModal.editTitle('新增');
            viewModal.editObj({});
            $("#group").val('');
            $("#deptInput").val('');
            $("#saveCode").val('');
            $("#saveName").val('');
            viewModal.deptId('');
            viewModal.orgId('');
            $('#saveCode').attr('readonly', false);
            window.printObjEdit = u.dialog({
                id: 'printObjEdit',
                content: "#quartersEdit",
                hasCloseMenu: true
            });
        },
        editClick: function (item) {
            viewModal.editTitle('编辑');
            viewModal.editObj(item);
            $("#group").val(item.org_name);
            $("#deptInput").val(item.dept_name);
            viewModal.deptId(item.dept_id);
            viewModal.orgId(item.org_id);
            $("#saveCode").val(item.code);
            $("#saveName").val(item.name);
            $('#saveCode').attr('readonly', true);
            window.printObjEdit = u.dialog({
                id: 'printObjEdit',
                content: "#quartersEdit",
                hasCloseMenu: true
            });
        },
        saveClick: function () {
            var data = {
                org_id: viewModal.orgId(),
                dept_id: viewModal.deptId(),
                code: $("#saveCode").val(),
                name: $("#saveName").val()
            }
            if(!data.org_id){
                viewModal.tipShow('请选择组织', 'success');
                return;
            }
            if(!data.dept_id){
                viewModal.tipShow('请选择部门', 'success');
                return;
            }
            if(!data.code){
                viewModal.tipShow('请填写编号', 'success');
                return;
            }
            if(!data.name){
                viewModal.tipShow('请填写名称', 'success');
                return;
            }
            var url = '/wbalone/position/save';
            if (viewModal.editTitle() == '编辑') {
                url = '/wbalone/position/update';
                data.id=viewModal.editObj().id;
            }
            viewModal.loadShow();
            $.ajax({
                url: url,
                type: 'post',
                data: JSON.stringify(data),
                contentType: 'application/json;charset=UTF-8',
                success: function (res) {
                    viewModal.loadHide();
                    if (res.success == 'success') {
                        viewModal.tipShow('操作成功', 'success');
                        viewModal.backList();
                        viewModal.loadData();
                    } else {
                        viewModal.tipShow(res.msg || '操作失败', 'error');
                    }
                },
                error: function () {
                    viewModal.loadHide();
                    viewModal.tipShow('操作失败', 'error');
                }
            })
        },
        backList: function () {
            window.printObjEdit.close();
        },

        delClick: function (item) {
            viewModal.delId(item.id);
            window.printObjDel = u.dialog({
                id: 'printObjModalDel',
                content: "#delModal",
                hasCloseMenu: true
            });
        },
        backClick: function () {
            window.history.go(-1)
        },
        delOk: function () {
            var pk = viewModal.delId();
            var url = '/wbalone/position/delete?id=' + pk;
            viewModal.loadShow();
            $.ajax({
                url: url,
                type: 'get',
                contentType: 'application/json;charset=UTF-8',
                success: function (res) {
                    viewModal.loadHide();
                    if (res.success == 'success') {
                        window.printObjDel.close();
                        viewModal.tipShow('删除成功！', 'success');
                        viewModal.loadData()
                    } else {
                        window.printObjDel.close();
                        viewModal.tipShow(res.msg, 'error');
                    }
                },
                error: function () {
                    viewModal.loadHide();
                    window.printObjDel.close();
                    viewModal.tipShow('操作失败', 'error');
                }
            })
        },
        delCancel: function () {
            window.printObjDel.close();
        },

        init: function () {
            ko.applyBindings(viewModal, document.getElementById('quarters'));
            viewModal.loadData();
            var element = document.getElementById("pagination");
            comp = new u.pagination({
                el: element,
                showState: false
            });
            comp.update({
                totalPages: viewModal.totalPages(),
                pageSize: 10,
                currentPage: 1,
                totalCount: viewModal.totalCount()
            });
            comp.on('pageChange', function (pageIndex) {
                viewModal.loadData(pageIndex + 1);
            });

            $(document).on("keyup","#code,#name",function(e){
                if(e.keyCode == 13){
                    viewModal.loadData();
                }
            })
        }
    }
    return {
        init: function (content) {
            content.innerHTML = html;
            viewModal.init();
        }
    }
});