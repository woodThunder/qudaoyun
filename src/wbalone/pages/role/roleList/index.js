define(function (require, module, exports) {
    // 引入相关的功能插件或模块
    var html = require('text!./index.html');
    require('css!./index.css');
    require('css!./user_showcase.css');
    require('css!./table.css');
    require('css!./roleadd.css');
    require('css!./roleedit.css');
    require('css!./paginate.css');
    require('css!./instantmsg.css');
    require('css!./save_success.css');
    require('css!./asignFun.css');
    require('css!./delete_success.css');
    require('css!./handle_success.css');
    require('css!./tree.css');
    require('./u-tree.js');
    var viewModel = {
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
        }),
        /*控制模态框状态及方法*/
        modal:{
            index:ko.observable(),
            type: ko.observable(),
            title:ko.observable(''),
            save:function(a,b){
                if(viewModel.modal.type()){
                    viewModel.addsave();
                }else{
                    viewModel.editsave();
                }
            },
            cancel:function(){
                $("#editModal").modal('hide')

            }
        },
        /*创建roleedit数据模型*/
        roleeditData: new u.DataTable({
            meta: {
                roleName: {
                    type: 'string'


                },
                roleCode: {
                    type: 'string'


                },
                roleType: {
                    type: 'string'
                },
                isActive: {
                    type: 'string'

                },
                remark: {
                    type: 'string'
                }


            }
        }),
        /*新增角色*/
        addUser: function () {

            viewModel.modal.title('新增角色');
            viewModel.modal.type(true);
            viewModel.roleeditData.clear();
            viewModel.roleeditData.createEmptyRow();
            var uri = window.baseUrl + '/label/listByGroup' ;
            $.ajax({
                type: 'get',
                dataType: 'json',
                url: uri,
                data: {"group":"person"} ,
                success: function (res) {
                    if (res.status === 1) {
                        var data=res.data;
                        viewModel.groupListData.setSimpleData(data) ;
                    }
                }
            });
            $("#editModal").modal("show");

        },
        getCode:function(labelval){
            var code = "" ;
            $.each(viewModel.groupListData.getSimpleData(),function(i,item){
                if(item.name == labelval) {
                    code = item.code;
                    return false;
                }
            });
            return code||"";
        },
        /*新增角色保存*/
        addsave:function(){
            var addsaveData = viewModel.roleeditData.getSimpleData()[0];
            addsaveData._class = "com.yonyou.uap.wb.entity.extend.WBRole";
             var labelval=$(".selectrole").val();
            addsaveData.labelName=labelval;
            addsaveData.label=  viewModel.getCode(labelval);
            var uri = window.baseUrl + '/roleMGT/create';
            $.ajax({
                type: 'post',
                dataType: 'json',
                url: uri,
                data: JSON.stringify(addsaveData),
                contentType: 'application/json',
                success: function (res) {
                    if (res.status === 1) {
                        var userId=res.data;
                        addsaveData.id= userId;
                        viewModel.seluserData.setSimpleData(addsaveData);
                        viewModel.listData.addSimpleData(addsaveData);
                        $("#editModal").modal('hide');
                        $("#saveModal").modal('show');
                        viewModel.loadList({});
                    }else{
                        viewModel.hintModal.type(false);
                        viewModel.hintModal.msg(res.msg);
                        $("#hintModal").modal("show");
                    }
                }
            });
        },
        /*编辑角色*/
        useredit: function (index, data) {
            viewModel.modal.type(false);
            viewModel.modal.title('编辑角色');
            var selRows = viewModel.listData.getRow(index);//获取选中的datatable.Row
            var editdata = selRows.getSimpleData();//获取Row里头的数据
            viewModel.roleeditData.setSimpleData(editdata);//存入useredit数据模型中
            viewModel.listData.setRowFocus(index);//设置该行作为焦点行，为编辑保存用
            viewModel.modal.index(index);
            var uri = window.baseUrl + '/label/listByGroup' ;
            $.ajax({
                type: 'get',
                dataType: 'json',
                url: uri,
                data: {"group":"person"} ,
                success: function (res) {
                    if (res.status === 1) {
                        var data=res.data;
                        viewModel.groupListData.setSimpleData(data) ;
                    }
                }
            });
            $("#editModal").modal("show");
        },
        /*编辑角色保存*/
        editsave:function(){
            var editsaveData = viewModel.roleeditData.getSimpleData()[0];
            var uri = window.baseUrl + '/roleMGT/update';
            editsaveData._class = "com.yonyou.uap.wb.entity.extend.WBRole";
            var labelval=$(".selectrole").val();
            editsaveData.labelName=labelval;
            editsaveData.label=  viewModel.getCode(labelval);
            var index = viewModel.modal.index();
            var row = viewModel.listData.getRow(index);//获取选中的datatable.Row
            $.ajax({
                type: 'post',
                dataType: 'json',
                url: uri,
                data: JSON.stringify(editsaveData),
                contentType: 'application/json',
                success: function (res) {
                    if (res.status === 1) {
                        row.setSimpleData(editsaveData);
                        $("#editModal").modal('hide');
                    }else{
                        viewModel.hintModal.type(false);
                        viewModel.hintModal.msg(res.msg);
                        $("#hintModal").modal("show");
                    }
                }
            });

        },

         /*角色标签列表模型*/
        groupListData: new u.DataTable({
            meta:{
                "id" : {
                   type: 'string'
                },
                "createDate" : {
                    type: 'string'
                },
                "code" : {
                    type: 'string'
                },
                "name": {
                    type: 'string'
                },
                "tenantId" : {
                    type: 'string'
                },
                "system": {
                    type: 'string'
                },
                "group": {
                    type: 'string'
                },
                "status": {
                    type: 'string'
                }
            }
        }),


        /*被选中存储用户ID等信息*/
        seluserData:new u.DataTable({
                 meta:{
                     id:{
                         type:'string'
                     }
                 }
        }),
        /*成功/失败提示模态框控制*/
        hintModal:{
            type:ko.observable(),
            msg: ko.observable()
        },
        /* afterAdd:function(element, index, data){
         if (element.nodeType === 1) {
         u.compMgr.updateComp(element);
         }
         },*/

        /**
         * 分配功能
         * @method function
         * @param  {[type]} index [description]
         * @param  {[type]} data  [description]
         * @return {[type]}       [description]
         */
        // 分配组织的穿梭框树形基本配置
        treeSetting:{
            data:{
                keep:{
                    parent: true
                }
            },
            view:{
                showLine:false,
                selectedMulti:true,
                showIcon: false
            },
            check:{
                enable: true,
                chkStyle: "checkbox",
                chkboxType : {"Y": "ps", "N": "ps"}
            },
            callback:{
                onClick:function(e,id,node){
                    // alert(id)
                    // alert(node)
//                    var rightInfo = node.name + '被选中';
//                    u.showMessage({msg:rightInfo,position:"top"})
                }
            }
        },
        // 分配组织的穿梭框模型（待分配功能）
        groupLeftDataTable: new u.DataTable({
            meta: {
                'id': {
                    'value':""
                },
                'pid': {
                    'value':""
                },
                'appCode': {
                    'value':""
                },
                'appName':{
                    'value':""
                }
            }
        }),
        // 分配组织的穿梭框模型（已分配）
        groupRightDataTable: new u.DataTable({
            meta: {
                'id': {
                    'value':""
                },
                'pid': {
                    'value':""
                },
                'appCode': {
                    'value':""
                },
                'appName':{
                    'value':""
                }
            }
        }),
        // 分配组织穿梭框的数据



        // 分配组织右侧穿梭框的选择添加功能
        groupOneRightSelect: function() {
            var zTreeL =  $("#tree1")[0]['u-meta'].tree;
            var zTreeR =  $("#tree2")[0]['u-meta'].tree;

            var rs = viewModel.groupLeftDataTable.getSelectedRows();
            $.each(rs,function(i, item){
                if(item.getValue('pid')=="root"){
//                    viewModel.groupLeftDataTable.setRowUnSelect(item.index);
                    var flag = false;
                    $.each(viewModel.groupRightDataTable.getSimpleData(),function(ri,ritem){
                        if(item.getValue('id')===ritem.id){//repeat
                            flag=true;
                        }
                    });
                    if(!flag){
                        viewModel.groupRightDataTable.addRow(item);
                    }
                }else{
                    viewModel.groupRightDataTable.addRow(item);
                    viewModel.groupLeftDataTable.removeRowByRowId(item.rowId);
                }
             });
            $.each(rs,function(i, item){
                if(item.getValue('pid')=="root"){
                    var Xflag =false;
                    $.each(viewModel.groupLeftDataTable.getSimpleData(),function(li,litem){
                        if(item.getValue('id')===litem.pid){//repeat
                            Xflag=true;
                        }
                    });
                    if(!Xflag){
                        viewModel.groupLeftDataTable.removeRowByRowId(item.rowId);
                    }
                }
            });
            viewModel.groupLeftDataTable.setAllRowsUnSelect();
            zTreeL.checkAllNodes(false);
            zTreeL.refresh();
            var TmpArray=viewModel.groupRightDataTable.getSimpleData();
            viewModel.groupRightDataTable.clear();
            viewModel.groupRightDataTable.setSimpleData(TmpArray);
            viewModel.groupRightDataTable.setAllRowsUnSelect();
            zTreeR.refresh();
            zTreeR.checkAllNodes(false);
        },
        // 分配组织左侧穿梭框的全选添加功能
        groupAllRightSelect: function() {
            var zTreeL =  $("#tree1")[0]['u-meta'].tree;
            var zTreeR =  $("#tree2")[0]['u-meta'].tree;
            var rs = viewModel.groupLeftDataTable.getAllRows();
                viewModel.groupRightDataTable.addRows(rs);
                viewModel.groupLeftDataTable.removeAllRows();
            var TmpArray=viewModel.groupRightDataTable.getSimpleData();
            viewModel.groupRightDataTable.clear();
            viewModel.groupRightDataTable.setSimpleData(TmpArray);
            viewModel.groupRightDataTable.setAllRowsUnSelect();
            zTreeL.checkAllNodes(false);
            zTreeL.refresh();
            zTreeR.checkAllNodes(false);
            zTreeR.refresh();
        },
        // 分配组织左侧穿梭框的全选添加功能
        groupOneLeftSelect: function() {
            var zTreeL =  $("#tree1")[0]['u-meta'].tree;
            var zTreeR =  $("#tree2")[0]['u-meta'].tree;

            var rs = viewModel.groupRightDataTable.getSelectedRows();
            $.each(rs,function(i, item){
                if(item.getValue('pid')=="root"){
                    var flag = false;
                    $.each(viewModel.groupLeftDataTable.getSimpleData(),function(ri,ritem){
                        if(item.getValue('id')===ritem.id){//repeat
                            flag=true;
                        }
                    });
                    if(!flag){
                        viewModel.groupLeftDataTable.addRow(item);
                    }
                }else{
                    viewModel.groupLeftDataTable.addRow(item);
                    viewModel.groupRightDataTable.removeRowByRowId(item.rowId);
                }
            });
            $.each(rs,function(i, item){
                if(item.getValue('pid')=="root"){
                    var Xflag =false;
                    $.each(viewModel.groupRightDataTable.getSimpleData(),function(li,litem){
                        if(item.getValue('id')===litem.pid){//repeat
                            Xflag=true;
                        }
                    });
                    if(!Xflag){
                        viewModel.groupRightDataTable.removeRowByRowId(item.rowId);
                    }
                }
            });
            viewModel.groupRightDataTable.setAllRowsUnSelect();
            zTreeL.checkAllNodes(false);
            zTreeL.refresh();
            var TmpArray=viewModel.groupLeftDataTable.getSimpleData();
            viewModel.groupLeftDataTable.clear();
            viewModel.groupLeftDataTable.setSimpleData(TmpArray);
            viewModel.groupLeftDataTable.setAllRowsUnSelect();
            zTreeR.refresh();
            zTreeR.checkAllNodes(false);
        },
        // 分配组织右侧穿梭框的全选添加功能
        groupAllLeftSelect:  function() {
            var zTreeL =  $("#tree1")[0]['u-meta'].tree;
            var zTreeR =  $("#tree2")[0]['u-meta'].tree;
            var rs = viewModel.groupRightDataTable.getAllRows();
                viewModel.groupLeftDataTable.addRows(rs);
                viewModel.groupRightDataTable.removeAllRows();
            var TmpArray=viewModel.groupLeftDataTable.getSimpleData();
            viewModel.groupLeftDataTable.clear();
            viewModel.groupLeftDataTable.setSimpleData(TmpArray);
            viewModel.groupLeftDataTable.setAllRowsUnSelect();
            zTreeL.checkAllNodes(false);
            zTreeL.refresh();
            zTreeR.checkAllNodes(false);
            zTreeR.refresh();

        },


        saveAsign:function(){
            var uri = window.baseUrl + '/roleMGT/saveRoleApp' ;
            var checkedItems=[];
            var RArray = viewModel.groupRightDataTable.getSimpleData();
            if( RArray.length){
                $.each(RArray,function(index,item){
                    if(item.pid!='root'){
                        checkedItems.push({
                            "id":item.id,
                            "code":item.appCode
                        });
                    }
                });
            }
            var curRows = viewModel.listData.getRow(viewModel.modal.index()||'0');//获取选中的datatable.Row
            $.ajax({
                type: 'post',
                dataType: 'json',
                url: uri,
                contentType: 'application/json',
                data: JSON.stringify({"roleCode": curRows.getValue('roleCode'),"roleId": curRows.getValue('id'),checkedItems:checkedItems}),
                success: function (res) {
                    if (res.status === 1) {
                        viewModel.hintModal.type(true);
                        viewModel.hintModal.msg(res.msg||'分配成功');
                    }else{
                        viewModel.hintModal.type(false);
                        viewModel.hintModal.msg(res.msg||'分配失败');
                    }
                    $("#hintModal").modal("show") ;
                }
            })
        },

        /**
         * 分配功能
         * @method function
         * @param  {[type]} index [description]
         * @param  {[type]} data  [description]
         * @return {[type]}       [description]
         */

        asign: function (index, row) {

            var roleId;
            if (typeof  row === 'object' && row.data) {
                roleId = row.getValue("id");
            } else {
                index = viewModel.listData.totalRow()-1;
                roleId = viewModel.seluserData.getValue("id");
            }

            viewModel.modal.index(index);

            var uri = window.baseUrl + '/roleMGT/appPermissionList' ;
            $.ajax({
                type: 'get',
                dataType: 'json',
                url: uri,
                data:{"roleId":roleId||""},
                success: function (res) {
                    if (res.status === 1) {
                        //初始化树菜单
                        var data = res.data;
                        viewModel.groupLeftDataTable.removeAllRows();
                        viewModel.groupLeftDataTable.setSimpleData(data.unchecked);
                        viewModel.groupLeftDataTable.setRowUnSelect(0); //

                        viewModel.groupRightDataTable.removeAllRows();
                        viewModel.groupRightDataTable.setSimpleData(data.checked);
                        viewModel.groupRightDataTable.setRowUnSelect(0); //


                        $('#asignFunModal').modal('show');
                    }
                }
            })
        },
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
                    data: obj.data || {},
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
                            $('#emptyImage span').html('服务连接错误');
                            $('#emptyImage span').css({'margin-left': '-46px'});
                        }
                        $("#LoadingImage").hide();
                    }
                });
            }();
        },


        /**
         * 删除
         * @method function
         * @param  {[type]} index [description]
         * @param  {[type]} data  [description]
         * @return {[type]}       [description]
         */
        delete: function (index, row, event) {
            $("#deleteModal").modal("show");
            var selRows = viewModel.listData.getRow(index);
            var selrowdata = selRows.getSimpleData();//获取Row里头的数据
            selrowdata.index=index;
            viewModel.seluserData.setSimpleData(selrowdata);
            /*u.confirmDialog({
                msg: "是否执行删除？",
                title: "确认",
                onOk: function () {
                    var uri = window.baseUrl + '/userMGT/delete/' + row.data.id.value;
                    $.ajax({
                        type: 'get',
                        dataType: 'json',
                        url: uri,
                        data: {"id": row.data.id.value},
                        success: function (res) {
                            if (res.status === 1) {
                                viewModel.listData.removeRow(index);
                            }
                            u.messageDialog({
                                msg: res.msg,
                                title: "提示",
                                btnText: "OK"
                            });
                        }
                    })
                },
                onCancel: function () {

                }
            });*/
        },
        deleteconfirm:function(){
            var seldata=viewModel.seluserData.getSimpleData()[0];
            var uri = window.baseUrl + '/roleMGT/delete/' + seldata.id;
            $.ajax({
                type: 'post',
                dataType: 'json',
                url: uri,
                data: {"id": seldata.id},
                success: function (res) {
                    if (res.status === 1) {
                        viewModel.listData.removeRow(seldata.index);
                        $("#deleteModal").modal("hide");
                        viewModel.hintModal.type(true);
                        viewModel.hintModal.msg(res.msg);

                    }else{
                        viewModel.hintModal.type(false);
                        viewModel.hintModal.msg(res.msg);

                    }
                    $("#hintModal").modal("show")

                }
            })
        },
        /**
         * 加载表格数据
         * @method function
         * @return {[type]} [description]
         */
        loadList: function (params) {
            // 查询参数
            var options = {
                "pn": params.pn || viewModel.pagination.element.options.currentPage,
                "ps": params.ps || viewModel.pagination.element.options.pageSize,
                "sortType": params.sorttype || "",
                "search_LIKE_roleName": params.roleName || "",
                "search_LIKE_roleCode": params.roleCode || "" ,
                "search_LIKE_roleType": params.roleType || ""
            };

            //请求数据
            var obj = {
                type: "get",
                url: window.baseUrl + '/roleMGT/listRolePage',
                data: options
            };
            var successCallback = function (res) {
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
                    viewModel.hintModal.type(false);
                    viewModel.hintModal.msg(res.msg);
                    $("#hintModal").modal("show");
                }
            };
            viewModel.createAjaxFun(obj, successCallback);
        },

        /**
         * 分页控件
         * @type {Object}
         */
        pagination: {
            element: null,
            // 用于控制分页控件的显示，条目大于10的时候显示控件
            count: ko.observable(0),
            init: function () {
                // 分页控件初始化
                var ele = $('#pagination')[0];
                this.element = new u.pagination({
                    el: ele,
                    pageList:['10'],
                    jumppage: true
                });
                //分页
                this.element.on('pageChange', function (currentPage) {
                    viewModel.loadList({
                        pageNum: currentPage + 1,
                        pageSize: viewModel.pagination.element.options.pageSize
                    });
                });
                this.element.on('sizeChange', function (siz) {
                    viewModel.loadList({
                        pageNum: 1,
                        pageSize: siz - 0
                    });
                });
//                //居中
//                $('#pagination').css(
//                    "display","inline-block"
//                );
            }
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
         * 页面初始化
         * @return {[type]} [description]
         */
        pageInit: function () {

            u.createApp({
                el: '.list-panel',
                model: viewModel
            });
            viewModel.pagination.init();
            // 初次加载数据
            viewModel.loadList({});
            //点击搜索按钮toggle search  panel
            $("#condionSearch").click(function () {
                $("#condition-row").slideToggle("");
            });
            //处理搜索任务
            $("#condition-row")
                .on("keypress", "input", function (event) {
                    if (event.keyCode == 13) {
                        var data = {
                            pn: 1,
                            "roleName": $("input#s-name").val(),
                            "roleCode": $("input#s-loginName").val(),
                            "roleType": $("select#s-state").val()
                        };
                        //todo updatelist
                        viewModel.loadList(data);
                    }
                })
                .on("change", "select", function (e) {
                    var data = {
                        pn: 1,
                        "roleName": $("input#s-name").val(),
                        "roleCode": $("input#s-loginName").val(),
                        "roleType": $("select#s-state").val()
                    };
                    //todo updatelist
                    viewModel.loadList(data);
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
