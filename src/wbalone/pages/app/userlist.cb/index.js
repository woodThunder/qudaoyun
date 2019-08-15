define(function (require, module, exports) {
    // 引入相关的功能插件或模块
    var html = require('text!./index.html');
    require('css!./index.css');
    require('css!./user_showcase.css');
    require('css!./table.css');
    require('css!./useradd.css');
    require('css!./useredit.css');
    require('css!./paginate.css');
    require('css!./instantmsg.css');
    require('css!./save_success.css');
    require('css!./selectRole.css');
    require('css!./asignStore.css');
    require('css!./delete_success.css');
    require('css!./handle_success.css');
    require('css!./webuploader.css');

    // require('/uitemplate_web/static/js/uiref/reflib.js');
    // require('/uitemplate_web/static/js/uiref/refer.js');
    // require('/uitemplate_web/static/js/uiref/refGrid.js');
    // require('/uitemplate_web/static/js/uiref/refGridtree.js');
    // require('/uitemplate_web/static/js/uiref/refTree.js');
    // require('/uitemplate_web/static/js/uiref/refcommon.js');
    // require('/uitemplate_web/static/js/uiref/uiReferComp.js');

    require('reflib');
    require('refer');
    require('refGrid');
    require('refGridtree');
    require('refTree');
    require('refcommon');
    require('uiReferComp');

    var refmodel="";
    var WebUploader = require('./webuploader.js');
    var viewModel = {
        roleRefDT: new u.DataTable({
            meta: {
                'dataSourceId': {
                    'refmodel': '',
                    'refcfg': '{"isClearData":true,"ctx":"/uitemplate_web","isMultiSelectedEnabled":false,"pageUrl":"uitemplate_web","isCheckListEnabled":false}'
                }
            }
        }),

        headform2: new u.DataTable({
            meta: {
                'dataSourceId': {
                    'refmodel': '',
                    'refcfg': '{"isClearData":true,"ctx":"/uitemplate_web","isMultiSelectedEnabled":false,"pageUrl":"uitemplate_web","isCheckListEnabled":false}'
                }
            }
        }),

        listData: new u.DataTable({
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
                organizationId:{
                    type: 'string'
                },
                organizationName:{
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
        //true 默认为table列表展示， false橱窗列表展示
        showModal: {
            showType: ko.observable(true),
            tableShow: function () {
                viewModel.showModal.showType(true);
            },
            shopShow: function () {
                viewModel.showModal.showType(false);
            }
        },


        // 高级查询viewModel参照
        searchData: new u.DataTable({
            meta: {
                psncl_id: {
                    type: 'string'
                },
                psncl_id_showname: {
                    type: 'string'
                },
                post_id: {
                    type: 'string'
                },
                post_id_showname: {
                    type: 'string'
                },
                rptrel: {
                    type: 'string'
                },
                rptrel_showname: {
                    type: 'string'
                }
            }
        }),

        /**
         * 高级搜索模块
         * @type {Object}
         */
        proSearch: {
            searchData: {
                usercode: ko.observable(),
                userphone: ko.observable(),
                username: ko.observable()
            },
            keyPressHandle: function (viewM, event) {
                if (event.keyCode == 13) {
//                    console.log(viewM.proSearch.searchData());
                } else {
                }
            },
            visible: ko.observable(false),
            /**
             * 控制搜索面板显示
             * @method function
             * @return {[type]} [description]
             */
            show: function () {
                viewModel.proSearch.visible(!viewModel.proSearch.visible());
            },
            /**
             * 简单搜索
             * @method simpleSearch
             * @return {[type]}     [description]
             */
            simpleSearch: function () {
                var queryStr = $('#query').val();
                viewModel.loadList({
                    qryStr: queryStr
                });
            },
            /**
             * 高级搜索
             * @method function
             * @return {[type]} [description]
             */
            search: function () {
                // 获取搜索条件
                var psnclId = viewModel.searchData.getValue('psncl_id') || null;
                var postId = viewModel.searchData.getValue('post_id') || null;
                var rptrel = viewModel.searchData.getValue('rptrel') || null;

                var start = Date.parse($('#queryStartDate').val()) || null;
                var end = Date.parse($('#queryEndDate').val()) || null;

                // 进行搜索
                viewModel.loadList({
                    psnclId: psnclId,
                    postId: postId,
                    rptrelId: rptrel,
                    begindate: start,
                    enddate: end
                });
            },
            /**
             * 清空查询条件
             * @method function
             * @return {[type]} [description]
             */
            clean: function () {
                $('#queryPsnclId').val('');
                viewModel.searchData.setValue('psncl_id', '');

                $('#queryPostId').val('');
                viewModel.searchData.setValue('post_id', '');

                $('#queryRptrel').val('');
                viewModel.searchData.setValue('rptrel', '');
                $('#queryStartDate').val('');
                $('#queryEndDate').val('');
                return false;
            }
        },
        /*控制模态框状态及方法*/
        modal: {
            index: ko.observable(),
            type: ko.observable(),
            title: ko.observable(''),
            save: function (a, b) {
                var data = viewModel.usereditData.getSimpleData()[0];
                if (viewModel.modal.type()) {
                    viewModel.addsave();
                } else {
                    viewModel.editsave();
                }
            },
            cancel: function () {
                $("#editModal").modal('hide')

            }
        },
        addsave: function () {
            var addsaveData = viewModel.usereditData.getSimpleData()[0];
            addsaveData._class = "com.yonyou.uap.user.entity.WBUser";
            var inOrg = viewModel.headform2.getCurrentRow().data['dataSourceId'];
            if(inOrg.value){
                addsaveData.organizationId = inOrg.value||"";
                addsaveData.organizationName = inOrg.meta['display'];
            }


            var uri = window.baseUrl + '/userMGT/create';
            $.ajax({
                type: 'post',
                dataType: 'json',
                url: uri,
                data: JSON.stringify(addsaveData),
                contentType: 'application/json',
                success: function (res) {
                    if (res.status === 1) {
                        var userId = res.data;
                        addsaveData.id = userId;
                        viewModel.seluserData.setSimpleData(addsaveData);
                        viewModel.listData.addSimpleData(addsaveData);
                        $("#editModal").modal('hide');
                        $("#saveModal").modal('show');
                        viewModel.loadList({});
                    } else {
                        viewModel.hintModal.type(false);
                        viewModel.hintModal.msg(res.msg);
                        setTimeout(function(){
                            $("#hintModal").modal("hide");
                        },2000);
                        $("#hintModal").modal("show");
                    }
                }
            });
        },
        editsave: function () {
            var editsaveData = viewModel.usereditData.getSimpleData()[0];
            var uri = window.baseUrl + '/userMGT/update';

            editsaveData._class = "com.yonyou.uap.user.entity.WBUser";

            var inOrg = viewModel.headform2.getCurrentRow().data['dataSourceId'];
            editsaveData.organizationId = inOrg.value||"";
            editsaveData.organizationName = $('.ref_ac_input').val();





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
                    } else {
                        viewModel.hintModal.type(false);
                        viewModel.hintModal.msg(res.msg);
                        setTimeout(function(){
                            $("#hintModal").modal("hide");
                        },2000);
                        $("#hintModal").modal("show");
                    }
                }
            });

        },
        /**
         * 跳转新增页面
         * @method function
         * @param  {int} type
         * @return {[type]}      [description]
         */
        addUser: function () {

            viewModel.modal.title('新增用户');
            viewModel.modal.type(true);
            viewModel.usereditData.clear();
            viewModel.usereditData.createEmptyRow();

            viewModel.headform2.setValue('dataSourceId','');

            $("#editModal").modal("show");
        },
        lockUser: function (index, row, event) {
            var converseState = row.data.islock.value == "false" ? "true" : "false";
            var uri = window.baseUrl + '/userMGT/optUserStatus/' + row.data.id.value;
            var $lable = $(event.target).parents("td").find('label.u-checkbox');
            $.ajax({
                type: 'get',
                dataType: 'json',
                url: uri,
                data: {"islock": converseState},
                success: function (res) {
                    if (res.status === 1) {
                        if (row.data.islock.value == "true") {
                            row.setValue("islock", "false");
                        } else {
                            row.setValue("islock", "true");
                        }
                        viewModel.hintModal.type(true);
                        viewModel.hintModal.msg(res.msg);
                    } else {
                        viewModel.hintModal.type(false);
                        viewModel.hintModal.msg(res.msg);
                    }
                    setTimeout(function(){
                        $("#hintModal").modal("hide");
                    },2000);
                    $("#hintModal").modal("show");
                }
            })
        },
        /**
         * 创建新用户流程页面
         * @method function
         * @param  {[type]} index [description]
         * @param  {[type]} data  [description]
         * @return {[type]}       [description]
         */
        /*创建分配角色数据模型*/

        //穿梭表模型
        srcListData: new u.DataTable({
            meta: {
                id: {
                    type: 'string'
                },
                roleName: {
                    type: 'string'
                },
                roleCode: {
                    type: 'string'
                },
                roleType: {
                    type: 'string'
                },
                ischecked: {
                    type: 'string'
                }

            }
        }),
        destListData: new u.DataTable({
            meta: {
                id: {
                    type: 'string'
                },
                roleName: {
                    type: 'string'
                },
                roleCode: {
                    type: 'string'
                },
                roleType: {
                    type: 'string'
                },
                ischecked: {
                    type: 'string'
                }

            }
        }),

        /*被选中存储用户ID*/
        seluserData: new u.DataTable({
            meta: {
                id: {
                    type: 'string'
                }
            }
        }),
        /*成功/失败提示模态框控制*/
        hintModal: {
            type: ko.observable(),
            msg: ko.observable()
        },
        /* afterAdd:function(element, index, data){
         if (element.nodeType === 1) {
         u.compMgr.updateComp(element);
         }
         },*/
        selToR: function () {
            var selRows = viewModel.srcListData.getSelectedRows();
            viewModel.destListData.copyRows(viewModel.destListData.rows().length, selRows);
            viewModel.srcListData.removeRows(selRows);
        },
        allToR: function () {
            var allRows = viewModel.srcListData.getAllRows();
            if (allRows.length !== 0) {
                viewModel.destListData.copyRows(viewModel.destListData.rows().length, allRows);
                viewModel.srcListData.clear();
            }
        },
        selToL: function () {
            var selRows = viewModel.destListData.getSelectedRows();
            viewModel.srcListData.copyRows(viewModel.srcListData.rows().length, selRows);
            viewModel.destListData.removeRows(selRows);
        },
        allToL: function () {
            var allRows = viewModel.destListData.getAllRows();
            if (allRows.length !== 0) {
                viewModel.srcListData.copyRows(viewModel.srcListData.rows().length, allRows);
                viewModel.destListData.clear();
            }
        },
        leftSelAll: function () {
            viewModel.srcListData.toggleAllSelect()
        },
        checked: function (index, row) {
            if (row.data.ischecked.value == "true") {

                row.setValue("ischecked", "false");
            } else {
                row.setValue("ischecked", "true");

            }
        },

        /*分配角色，初始关联角色列表*/
        asignRole: function (index, row) {
            var id, selData;
            if (typeof  row === 'object' && row.data) {
                id = row.getValue("id");
                selData = row.getSimpleData();
                viewModel.seluserData.setSimpleData(selData);

            } else { //新增用户成功链接到此节点
                id = viewModel.seluserData.getValue("id");
            }
            var uri = window.baseUrl + '/userMGT/userRole/allCases/' + id;
            $.ajax({
                type: 'get',
                dataType: 'json',
                url: uri,
                success: function (res) {
                    if (res.status === 1) {
                        var data = res.data;
                        viewModel.destListData.setSimpleData(data.linked);
                        viewModel.srcListData.setSimpleData(data.unlink);
                        viewModel.destListData.setAllRowsUnSelect();
                        viewModel.srcListData.setAllRowsUnSelect();
                        $("#asignStoreModal").modal("show");
                    }
                }
            })

        },
        confirmRole: function (index, data) {
            $("#selectRoleModal").modal("hide");
            $("#asignStoreModal").modal("show");
        },
        selRole: function () {
            $.ajax({
                type: "get",
                url: '/uitemplate_web/iref_ctr/refInfo/',
                data: {
                    refCode: "organization" || ""
                },
                traditional: true,
                async: false,
                dataType: "json",
                success: function (pRefmodel) {
                    viewModel.roleRefDT.setMeta('dataSourceId', 'refmodel', JSON.stringify(pRefmodel));
                    app.createComp(document.getElementById('selRole'), viewModel);
                }
            });
            $('#selRole .refer').trigger('click');
            // $("#asignStoreModal").modal("hide");
            // $("#selectRoleModal").modal("show");
        },
        /*取消关联角色*/
        cancelLink: function (index, row) {
            viewModel.destListData.removeRow(index);
            viewModel.srcListData.copyRows(viewModel.srcListData.rows().length, [row]);

            /* $("#cancelLinkModal").modal("show");                  //by wujian
             var selRows = viewModel.destListData.getRow(index);
             var selrowdata = selRows.getSimpleData();//获取Row里头的数据
             var userid = viewModel.seluserData.getValue("id");
             selrowdata.index = index;
             selrowdata.id = userid;
             viewModel.seluserData.setSimpleData(selrowdata);*/
        },
        confirmcancelLink: function () {
            var index = viewModel.seluserData.getValue("index");
            var cancelRow = viewModel.destListData.getRow(index);
            viewModel.destListData.removeRow(index);
            viewModel.srcListData.copyRows(viewModel.srcListData.rows().length, cancelRow);
            $("#cancelLinkModal").modal("hide");
        },
        /*保存关联角色*/
        linkSave: function () {
            var seldata = viewModel.seluserData.getSimpleData()[0];
            var linkdata = viewModel.destListData.getSimpleData();
            var postdata = [];
            for (var i= 0,j=linkdata.length;i<j;i++) {
                postdata.push(linkdata[i].id);
            }
            var uri = window.baseUrl + '/userMGT/userRole/assignRole/' + seldata.id;
            $.ajax({
                type: 'post',
                dataType: 'json',
                url: uri,
                data: JSON.stringify(postdata),
                contentType: 'application/json',
                success: function (res) {
                    if (res.status === 1) {

                        $("#asignStoreModal").modal("hide");
                    }
                }
            })

        },


        /**
         * 编辑页面
         * @method function
         * @param  {[type]} index [description]
         * @param  {[type]} data  [description]
         * @return {[type]}       [description]
         */
        /*创建useredit数据模型*/
        usereditData: new u.DataTable({
            meta: {
                id: {
                    type: 'string'
                },
                loginName: {
                    type: 'string',
                    errorMsg: '用户编码包含字母数字组合',
                    nullMsg: '内容不能为空!',
                    regExp:/^[a-zA-Z0-9]+$/,
                    minLength:2,
                    maxLength:24,
                    placement: 'right',
                    notipFlag: true,
                    hasSuccess: true,
                    required: true
                },
                name: {
                    type: 'string',
                    errorMsg: '请输入正确名称',
                    nullMsg: '内容不能为空!',
                    minLength:1,
                    maxLength:24,
                    placement: 'right',
                    notipFlag: true,
                    hasSuccess: true,
                    required: true
                },
                remark: {
                    type: 'string'
                },
                avator: {
                    type: 'string'
                },

                phone: {
                    type: 'string',
                    validType: 'phone',
                    minLength:6,
                    maxLength:12,
                    regExp: /^1[3|4|5|8|7]\d{9}$/,
                    errorMsg: '请输入正确手机号码',
                    nullMsg: '内容不能为空!',
                    placement: 'right',
                    notipFlag: true,
                    hasSuccess: true,
                    required: true
                },
                email: {
                    type: 'string',
                    validType: 'email',
                    regExp: /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/,
                    minLength:5,
                    maxLength:24,
                    errorMsg: '请输入正确邮箱地址',
                    nullMsg: '内容不能为空!',
                    notipFlag: true,
                    hasSuccess: true,
                    placement: 'right',
                    required: true
                }

            }
        }),
        useredit: function (index, data) {
            viewModel.modal.type(false);
            viewModel.modal.title('编辑用户');
            var selRows = viewModel.listData.getRow(index);//获取选中的datatable.Row
            var editdata = selRows.getSimpleData();//获取Row里头的数据
            viewModel.usereditData.setSimpleData(editdata);//存入useredit数据模型中


            viewModel.headform2.setValue('dataSourceId','');

            viewModel.listData.setRowFocus(index);//设置该行作为焦点行，为编辑保存用
            viewModel.modal.index(index);
            $("#editModal").modal("show");

            if(editdata.organizationId){
                viewModel.headform2.setValue('dataSourceId',editdata.organizationId);
            }
        },
        /**
         * 分配店铺
         * @method function
         * @param  {[type]} index [description]
         * @param  {[type]} data  [description]
         * @return {[type]}       [description]
         */
        asign: function (index, data) {
//            u.dialog({ id: 'testDialg', content: "#selectRoleModal", hasCloseMenu: true });
            $('#selectRoleModal').modal('show');
            /*  window.asignmd = u.dialog({
             id: 'testDialg',
             content: "#asignStoreModal",
             hasCloseMenu: true
             });
             var okButton = document.body.querySelector(".u-msg-ok");
             u.on(okButton, 'click', function () {
             alert('ok');
             });

             var cancelButton = document.body.querySelector(".u-msg-cancel");
             u.on(cancelButton, 'click', function () {
             asignmd.close();
             });*/
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
         * 启用 停用
         * @method function
         * @param  {[type]} index [description]
         * @param  {[type]} data  [description]
         * @return {[type]}       [description]
         */
        changeState: function (index, row, event) {
            var converseState = row.data.states.value == "0" ? "1" : "0";
            var uri = window.baseUrl + '/userMGT/optUserState/' + row.data.id.value;
            var $icon = $(event.target).parents(".pro_oper").find('span');
            var $icontip = $(event.target).parents(".pro_oper").find('span>b');
            $.ajax({
                type: 'get',
                dataType: 'json',
                url: uri,
                data: {"states": converseState},
                success: function (res) {
                    if (res.status === 1) {
                        if (row.data.states.value == "1") {
                            row.setValue("states", "0");

                        } else {
                            row.setValue("states", "1");
                        }
                        viewModel.hintModal.type(true);
                        viewModel.hintModal.msg(res.msg);

                    }
                    setTimeout(function(){
                        $("#hintModal").modal("hide");
                    },2000);
                    $("#hintModal").modal("show")
                }
            })
        },
        /**
         * 重置密码
         * @method function
         * @param  {[type]} index [description]
         * @param  {[type]} data  [description]
         * @return {[type]}       [description]
         */
        resetPasword: function (index, row, event) {
            var uri = window.baseUrl + '/userMGT/resetPassword/' + row.data.id.value;
            $.ajax({
                type: 'get',
                dataType: 'json',
                url: uri,
                data: {},
                success: function (res) {
                    if (res.status === 1) {
                        viewModel.hintModal.type(true);
                        viewModel.hintModal.msg(res.msg);
                    } else {
                        viewModel.hintModal.type(false);
                        viewModel.hintModal.msg(res.msg);
                    }
                    setTimeout(function(){
                        $("#hintModal").modal("hide");
                    },2000);
                    $("#hintModal").modal("show");

                }
            })
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
            selrowdata.index = index;
            viewModel.seluserData.setSimpleData(selrowdata);
        },
        deleteconfirm: function () {
            var seldata = viewModel.seluserData.getSimpleData()[0];
            var uri = window.baseUrl + '/userMGT/delete/' + seldata.id;
            $.ajax({
                type: 'get',
                dataType: 'json',
                url: uri,
                data: {"id": seldata.id},
                success: function (res) {
                    if (res.status === 1) {
                        viewModel.listData.removeRow(seldata.index);
                        $("#deleteModal").modal("hide");
                        viewModel.hintModal.type(true);
                        viewModel.hintModal.msg(res.msg);
                    } else {
                        viewModel.hintModal.type(false);
                        viewModel.hintModal.msg(res.msg);

                    }
                    setTimeout(function(){
                        $("#hintModal").modal("hide");
                    },2000);
                    $("#hintModal").modal("show")
                }
            })
        },
        /**
         * 头像上传
         * @method function
         * @param  {[type]} index [description]
         * @param  {[type]} data  [description]
         * @return {[type]}        [description]
         */
        uploadimg: {
            init: function () {
                // 初始化Web Uploader
                var uploader = WebUploader.create({

                    // 选完文件后，是否自动上传。
                    auto: true,
                    swf: window.baseUrl + '/vendor/trd/upload/Uploader.swf?v=' + Math.random(),
                    server: window.baseUrl + '/userMGT/fastDfs/imgUpload',
                    chunked: false,
                    chunkSize: 512 * 1024,
                    // 选择文件的按钮。可选。
                    // 内部根据当前运行是创建，可能是input元素，也可能是flash.
                    pick: '#filePicker',
                    fileNumLimit:1,
                    fileSizeLimit:1024 * 1024,
                    // 只允许选择图片文件。
                    accept: {
                        title: 'Images',
                        extensions: 'gif,jpg,jpeg,bmp,png',
                        mimeTypes: 'image/*'
                    }
                });

                // 当有文件添加进来的时候
                uploader.on('fileQueued', function (file) {
                    // 创建缩略图
                    var $img = $('.tou-img');
                    uploader.makeThumb(file, function (error, src) {
                        if (error) {
                            $img.replaceWith('<span>不能预览</span>');
                            return;
                        }
                        //console.log(src);
                        $img.attr('src', src);
                    }, 100, 100);
                });
                // 文件上传过程中创建进度条实时显示。
                uploader.on('uploadProgress', function (file, percentage) {
                    var $li = $('.upload-tip'),
                        $percent = $li.find('span');
                    // 避免重复创建
                    if (!$percent.length) {
                        $percent = $('<p class="progress"><span></span></p>')
                            .appendTo($li)
                            .find('span');
                    }

                    $percent.css('width', percentage * 100 + '%');
                });

                // 文件上传成功，给item添加成功class, 用样式标记上传成功。
                uploader.on('uploadSuccess', function (file, res) {
                    if (res.status === 1) {
                        var photoName = res.data.fileName;
                        viewModel.usereditData.setValue('avator', 'http://'+res.data.accessAddress);
                    }
                    $('.upload-tip').find('span').text(res.msg);
                    setTimeout(function () {
                        $('.upload-tip').hide();
                    }, 2000);

                });

                // 文件上传失败，显示上传出错。
                uploader.on('uploadError', function (file, res) {
                    $('.upload-tip').find('span').text(res.msg);
                    setTimeout(function () {
                        $('.upload-tip').hide();
                    }, 2000);
                });
                uploader.on('error', function (type) {
                    console.log(">>>>>error:" + type);
                });
                // 完成上传完了，成功或者失败，先删除进度条。
                uploader.on('uploadComplete', function (file) {
                    $('.upload-tip').hide();
                    uploader.reset();
                });
            }
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
                "sortColumn": params.sorttype || "",
                "search_LIKE_loginName": params.loginName || "",
                "search_LIKE_name": params.name || "",
                "search_LIKE_phone": params.phone || "",
                "search_EQ_states": params.state || ""
            };

            //请求数据
            var obj = {
                type: "get",
                url: window.baseUrl + '/userMGT/pagingList',
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
                    setTimeout(function(){
                        $("#hintModal").modal("hide");
                    },2000);
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
                    pageList: ['5','10','15','20'],
                    jumppage: true
                });
                //分页
                this.element.on('pageChange', function (currentPage) {
                    viewModel.loadList({
                        "pn": currentPage + 1,
                        "ps": viewModel.pagination.element.options.pageSize,
                        "name": $("input#s-name").val(),
                        "loginName": $("input#s-loginName").val(),
                        "phone": $("input#s-phone").val(),
                        "states": $("select#s-state").val()
                    });
                });
                this.element.on('sizeChange', function (siz) {
                    viewModel.loadList({
                        pn: 1,
                        ps: siz - 0,
                        "name": $("input#s-name").val(),
                        "loginName": $("input#s-loginName").val(),
                        "phone": $("input#s-phone").val(),
                        "states": $("select#s-state").val()
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
            /*if (row.data.islock.value && (roata.islock.value == "true")) {
             $(element).find("label.u- checkbox").addClass('is-checked');
             }*/
        },
        /**
         * 页面初始化
         * @return {[type]} [description]
         */
        pageInit: function () {
            window.app = u.createApp({
                el: '#userList',
                model: viewModel
            });
            app.init(viewModel, null, false);
            viewModel.pagination.init();
            // 初次加载数据
            viewModel.loadList({});

            //上传功初始化
            viewModel.uploadimg.init();


            viewModel.roleRefDT.createEmptyRow(); //创建空行
            viewModel.roleRefDT.on('dataSourceId.valueChange', function (ele) {
                var compId = ele.newValue;
            });
            viewModel.headform2.createEmptyRow(); //创建空行
            viewModel.headform2.setRowSelect(0);
            viewModel.headform2.on('dataSourceId.valueChange', function (ele) {
                var compId = ele.newValue;
            });



            //点击搜索按钮toggle search  panel
            $("#condionSearch").click(function () {
                $("#condition-row").slideToggle(function(){
                    if ($(this).is(':hidden')) {
                        $("#condionSearch .icon-arrow-down").css("display","inline-block");
                        $("#condionSearch .icon-arrow-up").css("display","none");
                    }else{
                        $("#condionSearch .icon-arrow-down").css("display","none");
                        $("#condionSearch .icon-arrow-up").css("display","inline-block");
                    }
                });
            });
//            handleSearch
            $("#condition-row")
                .on("keypress", "input", function (event) {
                    if (event.keyCode == 13) {
                        var data = {
                            pn: 1,
                            "name": $("input#s-name").val(),
                            "loginName": $("input#s-loginName").val(),
                            "phone": $("input#s-phone").val(),
                            "states": $("select#s-state").val()
                        };
                        //todo updatelist
                        viewModel.loadList(data);
                    }
                })
                .on("change", "select", function (e) {
                    var data = {
                        pn: 1,
                        "name": $("input#s-name").val(),
                        "loginName": $("input#s-loginName").val(),
                        "phone": $("input#s-phone").val(),
                        "state": $("select#s-state").val()
                    };
                    //todo updatelist
                    viewModel.loadList(data);
                });
        },
        goback:function(){
            window.history.go(-1);
            return false;
        }
    };
    function refInit(refCode) {
        if (!refCode) return alert("缺少参数~~");
        $.ajax({
            type: "get",
            url: '/uitemplate_web/iref_ctr/refInfo/',
            data: {
                refCode: refCode || ""
            },
            traditional: true,
            async: false,
            dataType: "json",
            success: function (pRefmodel) {
                refmodel = JSON.stringify(pRefmodel);
                viewModel.headform2.setMeta('dataSourceId', 'refmodel', refmodel);
            }
        });
    };
    refInit('organization');
    return {
        init: function (content) {
            // 插入内容
            content.innerHTML = html;
            // 执行主逻辑
            viewModel.pageInit();
            //初始化事件

            //导入初始化
//            viewModel.upload();
        }
    }
});
