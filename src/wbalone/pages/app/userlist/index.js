define(function (require, module, exports) {
    // 引入相关的功能插件或模块
    var html = require('text!./index.html');
    require('i18n');
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
    require('css!./mutlilang.css');
    require('reflib');
    require('refer');
    require('refGrid');
    require('refGridtree');
    require('refTree');
    require('refcommon');
    require('uiReferComp');
    require('uiNewReferComp');

    // var refmodel="";
    var WebUploader = require('./webuploader.js');
    initI18n();
    var viewModel = {
        yhtAdapter:function () {
            var loginChannel=u.getCookie('loginChannel');
            if(loginChannel ==="yht"){
                return false;
            }else{
                return true;
            }
        },
        initI18n:function () {
            initI18n();
        },
        roleRefDT: new u.DataTable({
            meta: {
                'roledata': {
                    'refparam': '{"isUseDataPower":true}',
                    'refmodel': '',
                    'refcfg': '{"isClearData":true,"ctx":"/uitemplate_web","isMultiSelectedEnabled":true,"pageUrl":"uitemplate_web","isCheckListEnabled":false}'
                },
                'groupdata': {
                    'refparam': '{"isUseDataPower":true}',
                    'refmodel': '',
                    'refcfg': '{"isClearData":true,"ctx":"/uitemplate_web","isMultiSelectedEnabled":false,"pageUrl":"uitemplate_web","isCheckListEnabled":false}'
                }
            }
        }),

        headform2: new u.DataTable({
            meta: {
                'orgdata': {
                    'refmodel': JSON.stringify({
                        "refClientPageInfo": {
                            "currPageIndex": 0,
                            "pageCount": 0,
                            "pageSize": 100
                        },
                        "refCode": "people",
                        "refModelUrl": "/wbalone/organizationRef/",
                        "refName": "组织",
                        "refUIType": "RefGrid",
                        "rootName": "组织列表",
                        "title": $.i18n.prop('js.app.use2.0004','选择组织'),
                        "buttonText":{"ok":$.i18n.prop('js.app.use1.0011','确定'),"cancel":$.i18n.prop('js.app.use2.0005','取消')},

                    })
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
                groupId: {
                    type: 'string'
                },
                groupName: {
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
                var psnclId = $.trim(viewModel.searchData.getValue('psncl_id')) || null;
                var postId = $.trim(viewModel.searchData.getValue('post_id')) || null;
                var rptrel = $.trim(viewModel.searchData.getValue('rptrel'))  || null;

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

                //validate form data  start
                if (!data.showName) {
                    viewModel.hintModal.type(false);
                    viewModel.hintModal.msg($.i18n.prop('js.app.use2.0006'), "tip-alert");
                    setTimeout(function () {
                        $('#hintModal').modal('hide');
                    },2000);
                    $('#hintModal').modal('show');
                    return false;
                }
                if (!viewModel.usereditData.getValue("name"+viewModel.mutlilang.sysDefaultLanguageSerial())) {
                    viewModel.hintModal.type(false);
                    viewModel.hintModal.msg(viewModel.mutlilang.sysDefaultLanguageShow()+$.i18n.prop('js.app.use2.0006'), "tip-alert");
                    setTimeout(function () {
                        $('#hintModal').modal('hide');
                    },2000);
                    $('#hintModal').modal('show');
                    return false;
                }
                if(!viewModel.usereditData.getValue("name")){
                    viewModel.hintModal.type(false);
                    viewModel.hintModal.msg("中文简体 " + $.i18n.prop('js.app.use2.0006'), "tip-alert");
                    setTimeout(function () {
                        $('#hintModal').modal('hide');
                    },2000);
                    $('#hintModal').modal('show');
                    return false;
                }

                //validate form data  stop

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
            var inOrg = viewModel.headform2.getCurrentRow().data['orgdata'];

            //iuap前端升级同步更改 用户新增时，去掉iuap组用户引用 wt 20190123
            // var groupRefer = $("#refContainergroupdata").data('uui.refer');
            // var groupdata = groupRefer.values;
            // if (groupdata != undefined) {
            //         if(groupdata.length){
            //             addsaveData.groupId = groupdata[0].refpk;
            //             addsaveData.groupName = groupdata[0].refname;
            //         }
            // }

            if(inOrg.value){
                addsaveData.organizationId = inOrg.value||"";
                addsaveData.organizationName = inOrg.meta['display'];
            }
            // var ingroup = viewModel.roleRefDT.getCurrentRow().data['groupdata'];

            // if(ingroup.value){
            //     addsaveData.groupId = ingroup.value||"";
            //     addsaveData.groupName = ingroup.meta['display'];
            // }


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

                        message(res.msg,'error');
                    }
                }
            });
        },
        editsave: function () {
            var editsaveData = viewModel.usereditData.getSimpleData()[0];
            var uri = window.baseUrl + '/userMGT/update';

            editsaveData._class = "com.yonyou.uap.user.entity.WBUser";

            var inOrg = viewModel.headform2.getCurrentRow().data['orgdata'];
            editsaveData.organizationId = inOrg.value||"";
            editsaveData.organizationName = $('#orgId').val();

            //iuap前端升级同步更改 用户新增时，去掉iuap组用户引用 wt 20190123
            //     var groupRefer = $("#refContainergroupdata").data('uui.refer');
            //     var groupdata = groupRefer.values;
            // if (groupdata != undefined) {
            //     	if(groupdata.length){
            //     	    editsaveData.groupId = groupdata[0].refpk;
            //     	    editsaveData.groupName = groupdata[0].refname;
            //     	}
            // }

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
                        // row.setSimpleData(editsaveData);
                        //更新用户信息时刷新
                        viewModel.loadList({});
                        $("#editModal").modal('hide');
                    } else {
                        message(res.msg,'error');
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

            viewModel.modal.title($.i18n.prop('js.app.use1.0001'));
            viewModel.modal.type(true);
            viewModel.usereditData.clear();
            viewModel.usereditData.createEmptyRow();

            viewModel.headform2.setValue('orgdata','');
            viewModel.roleRefDT.setValue('groupdata','');
            viewModel.usereditData.setValue('avator', 'images/dot.png');
            viewModel.mutlilang.defaultLocaleValue("");

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
                        // if (row.data.islock.value == "true") {
                        //     row.setValue("islock", "false");
                        // } else {
                        //     row.setValue("islock", "true");
                        // }
                        viewModel.loadList({});
                        message(res.msg,'success');
                    } else {
                        message(res.msg,'error');
                    }
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

        curSelectedUserId:ko.observable(null),
        updateroleTable:function () {
            if(!viewModel.curSelectedUserId()){
                console.log('viewModel.curSelectedUserId() is not valued ')
                return ;
            }
            var id = viewModel.curSelectedUserId();
            var uri = window.baseUrl + '/userMGT/userRole/allCases/' + id;
            $.ajax({
                type: 'get',
                dataType: 'json',
                url: uri,
                success: function (res) {
                    if (res.status === 1) {
                        var data = res.data;
                        viewModel.destListData.setSimpleData(data.linked);
                        // viewModel.srcListData.setSimpleData(data.unlink);
                        viewModel.destListData.setAllRowsUnSelect();
                        // viewModel.srcListData.setAllRowsUnSelect();
                        $("#asignStoreModal").modal("show");
                    }
                }
            })

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
            viewModel.curSelectedUserId(id);
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
            $("#asignStoreModal").modal("hide");
            viewModel.roleRefDT.removeAllRows();
            viewModel.roleRefDT.createEmptyRow(); //创建空行
            // $('#selRole .refer').trigger('click');
            // var roleRefer = $("#refContainerroledata").data('uui.refer');
            // roleRefer.uncheckAll();
            var itemList = viewModel.transListToCheckedArray();
            var option = {
                title: $.i18n.prop('js.app.use2.0003', '角色'),
                refType:3,
                isRadio:false,
                hasPage:true,
                backdrop:true,
                treeloadData:true,
                buttonText:{ok:$.i18n.prop('js.app.use1.0011','确定'),cancel:$.i18n.prop('js.app.use2.0005','取消')},
                tabData:[

                ],
                param:{//url请求参数
                    refCode:'newRoleTreeGridRef',
                    tenantId:'',
                    sysId:'',
                    locale: u.getCookie("u_locale"),
                    content:'',
                    refModelUrl: '/wbalone/newRoleTreeGridRef'
                },
                refModelUrl:{
                    TreeUrl:'/newref/rest/iref_ctr/blobRefTree', //树请求
                    GridUrl:'http://workbench.yyuap.com/ref/rest/iref_ctr/commonRefsearch',//单选多选请求
                    TableBodyUrl:'/newref/rest/iref_ctr/blobRefTreeGrid',//表体请求
                    TableBarUrl:'/newref/rest/iref_ctr/refInfo',//表头请求
                    totalDataUrl:'http://workbench.yyuap.com/ref/diwork/iref_ctr/matchPKRefJSON',//根据refcode请求完整数
                },
                checkedArray: itemList,
                onCancel: function (p) {
                    $("#asignStoreModal").modal("show");
                },
                onSave: function (sels) {
                    if (sels.length) {
                        var ids =   ko.utils.arrayMap(sels,function (app) {
                            return app.id||app.refpk;
                        });
                        var uri = window.baseUrl + '/userMGT/userRole/assignUserRole/' + viewModel.curSelectedUserId();
                        $.ajax({
                            type: 'post',
                            dataType: 'json',
                            url: uri,
                            data: JSON.stringify(ids),
                            contentType: 'application/json',
                            success: function (res) {
                                if (res.status === 1) {
                                    viewModel.updateroleTable();
                                }
                            }
                        })
                    }
                },
                className: '',
            };
            window.createModal(option);
            // $("#asignStoreModal").modal("hide");
            // $("#selectRoleModal").modal("show");
        },
        transListToCheckedArray: function(){
            var destList = viewModel.destListData.getSimpleData();
            var titemList = [];
            for(var i=0; i<destList.length; i++){
                var item = destList[i];
                titemList.push({
                    refpk:  item.id,
                    refcode: item.roleCode,
                    refname: item.roleName,
                    refroletype: item.labelName,
                });
            }
            return titemList;
        },
        /*取消关联角色*/
        cancelLink: function (index, row) {
            // viewModel.destListData.removeRow(index);
            // viewModel.srcListData.copyRows(viewModel.srcListData.rows().length, [row]);

            /* $("#cancelLinkModal").modal("show");                  //by wujian
             var selRows = viewModel.destListData.getRow(index);
             var selrowdata = selRows.getSimpleData();//获取Row里头的数据
             var userid = viewModel.seluserData.getValue("id");
             selrowdata.index = index;
             selrowdata.id = userid;
             viewModel.seluserData.setSimpleData(selrowdata);*/

            var ids = [row.getValue('id')];
            var uri = window.baseUrl + '/userMGT/userRole/cancelUserRole/' + viewModel.curSelectedUserId();
            $.ajax({
                type: 'post',
                dataType: 'json',
                url: uri,
                data: JSON.stringify(ids),
                contentType: 'application/json',
                success: function (res) {
                    if (res.status === 1) {
                        // viewModel.destListData.removeRow(index);
                        // iuap前端升级同步更改 取消关联时，重新查询列表 wt 20190123
                        viewModel.updateroleTable();
                        // viewModel.updateroleTable();
                        // $("#asignStoreModal").modal("show");
                    }
                }
            })




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
            $("#asignStoreModal").modal("hide");

            // var seldata = viewModel.seluserData.getSimpleData()[0];
            // var linkdata = viewModel.destListData.getSimpleData();
            // var postdata = [];
            // for (var i= 0,j=linkdata.length;i<j;i++) {
            //     postdata.push(linkdata[i].id);
            // }
            // var uri = window.baseUrl + '/userMGT/userRole/assignRole/' + seldata.id;
            // $.ajax({
            //     type: 'post',
            //     dataType: 'json',
            //     url: uri,
            //     data: JSON.stringify(postdata),
            //     contentType: 'application/json',
            //     success: function (res) {
            //         if (res.status === 1) {
            //         }
            //     }
            // })
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
                    errorMsg: $.i18n.prop('js.app.use1.0002'),
                    // nullMsg: '内容不能为空!',
                    regExp:/^[a-zA-Z0-9]+$/,
                    minLength:2,
                    maxLength:24,
                    placement: 'right',
                    notipFlag: true,
                    hasSuccess: true,
                    // required: true
                },
                showName: {
                    type: 'string',
                    errorMsg: $.i18n.prop('js.app.use2.0006'),
                    // nullMsg: '内容不能为空!',
                    minLength:1,
                    maxLength:24,
                    placement: 'right',
                    notipFlag: true,
                    hasSuccess: true,
                    // required: true
                },
                remark: {
                    type: 'string',
                    maxLength: 30,
                    notipFlag: true,
                    hasSuccess: true
                },
                avator: {
                    type: 'string'
                },

                phone: {
                    type: 'string',
                    validType: 'phone',
                    minLength:11,
                    maxLength:11,
                    regExp:/^1[3-9]\d{9}$/,
                    errorMsg: $.i18n.prop('js.app.use1.0004'),
                    // nullMsg: '内容不能为空!',
                    placement: 'right',
                    notipFlag: true,
                    hasSuccess: true,
                    // required: true
                },
                email: {
                    type: 'string',
                    validType: 'email',
                    regExp: /^(\w)+(\.\w+)*@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
                    minLength:5,
                    maxLength:50,
                    errorMsg: $.i18n.prop('js.app.use1.0005'),
                    // nullMsg: '内容不能为空!',
                    notipFlag: true,
                    hasSuccess: true,
                    placement: 'right',
                    // required: true
                }

            }
        }),
        useredit: function (index, data) {
            viewModel.modal.type(false);
            viewModel.modal.title($.i18n.prop('js.app.use1.0006'));
            var selRows = viewModel.listData.getRow(index);//获取选中的datatable.Row
            var editdata = selRows.getSimpleData();//获取Row里头的数据
            viewModel.usereditData.setSimpleData(editdata);//存入useredit数据模型中

            var defaltValue = viewModel.usereditData.getValue("name"+viewModel.mutlilang.currentSerial);
            viewModel.usereditData.setValue("showName",defaltValue);

            viewModel.headform2.setValue('orgdata','');
            viewModel.roleRefDT.setValue('groupdata','');

            viewModel.listData.setRowFocus(index);//设置该行作为焦点行，为编辑保存用
            viewModel.modal.index(index);
            $("#editModal").modal("show");

            if(editdata.organizationId){
                viewModel.headform2.setValue('orgdata',editdata.organizationId);
            }
            if(editdata.groupId){
                viewModel.roleRefDT.setValue('groupdata',editdata.groupId);
            }

            $("#orgId").val(editdata.organizationName||'');
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
                            $('#emptyImage span').html($.i18n.prop('js.app.use1.0007'));
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
                        // if (row.data.states.value == "1") {
                        //     row.setValue("states", "0");
                        //
                        // } else {
                        //     row.setValue("states", "1");
                        // }
                        viewModel.loadList({});

                        message(res.msg,'success');

                    }
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
                        message(res.msg,'success');
                    } else {
                        message(res.msg,'error');
                    }

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
                        message(res.msg,'success');
                    } else {
                        message(res.msg,'error');

                    }
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
                initI18n();
                $("#filePicker").html($.i18n.prop('js.app.use1.0008'));
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
                            $img.replaceWith($.i18n.prop('js.app.use1.0009'));
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
                        viewModel.usereditData.setValue('avator', res.data.accessAddress);
                    } else {
                        u.messageDialog({
                            msg: res.msg,
                            title: $.i18n.prop('js.app.use1.0010'),
                            btnText: $.i18n.prop('js.app.use1.0011')
                        });
                    }
                    setTimeout(function () {
                        $('.upload-tip').hide();
                    }, 2000);

                });

                // 文件上传失败，显示上传出错。
                uploader.on('uploadError', function (file, res) {
                    $('.upload-tip').find('span').text(res.msg);
                    setTimeout(function () {
                        $('.upload-tip').hide();$('.upload-tip').hide();
                    }, 2000);
                });
                uploader.on('error', function (type) {
                    window.message($.i18n.prop('js.app.use1.0012'),'error');
                });
                // 完成上传完了，成功或者失败，先删除进度条。
                uploader.on('uploadComplete', function (file) {
                    $('.upload-tip').hide();
                    uploader.reset();
                    //上传完成的时候重新初始化上传组件
                    viewModel.uploadimg.init();
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
                "search_LIKE_loginName": params.loginName ||$.trim($("input#s-loginName").val())|| "",
                "search_LIKE_name": params.name || $.trim($("input#s-name").val())||"",
                "search_LIKE_phone": params.phone ||$.trim($("input#s-phone").val())|| "",
                "search_EQ_states": params.state || $.trim( $("select#s-state").val())||"",
                "search_LIKE_remark": params.remark || $.trim( $("input#s-remark").val())||""
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
                    if(!data ||data ==null){
                        u.messageDialog({
                            msg:  $.i18n.prop('ht.app.use.0030'),
                            btnText: $.i18n.prop('js.app.use1.0011')
                        });

                    }else{
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
                    }
                    setTimeout(function(){
                        viewModel.initI18n();
                    },300)
                } else {
                    message(res.msg,'error');
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
                        "name": $.trim($("input#s-name").val()),
                        "loginName":$.trim( $("input#s-loginName").val()),
                        "phone": $.trim($("input#s-phone").val()),
                        "states":$.trim( $("select#s-state").val())
                    });
                });
                this.element.on('sizeChange', function (siz) {
                    viewModel.loadList({
                        pn: 1,
                        ps: siz - 0,
                        "name": $.trim($("input#s-name").val()),
                        "loginName": $.trim($("input#s-loginName").val()),
                        "phone": $.trim($("input#s-phone").val()),
                        "states": $.trim($("select#s-state").val())
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
        delroles:function () {
            //todo   批量删除角色
            var selrowIds = viewModel.destListData
                .getSimpleData({type: 'select', fields: ['id']})
                .map(function (item, index) {
                    return item.id;
                });
            if (selrowIds.length) {
                var uri = window.baseUrl + '/userMGT/userRole/cancelUserRole/' + viewModel.curSelectedUserId();
                $.ajax({
                    type: 'post',
                    dataType: 'json',
                    url: uri,
                    data: JSON.stringify(selrowIds),
                    contentType: 'application/json',
                    success: function (res) {
                        if (res.status === 1) {
                            viewModel.updateroleTable();
                            // $("#asignStoreModal").modal("show");
                        }
                    }
                })
            }else{
                message($.i18n.prop("js.app.use1.0015","请先选择要删除的数据"),"warn")
            }
        },
        /**
         * 页面初始化
         * @return {[type]} [description]
         */
        pageInit: function () {
            var app = u.createApp({
                el: '#userList',
                model: viewModel
            });
            this.app = app;
            // app.init(viewModel, null, false);
            viewModel.pagination.init();
            // 初次加载数据
            viewModel.loadList({});

            //上传功初始化
            viewModel.uploadimg.init();
            viewModel.refInit('organization');


            viewModel.roleRefDT.createEmptyRow(); //创建空行
            viewModel.roleRefDT.setRowSelect(0);
            viewModel.headform2.createEmptyRow(); //创建空行
            viewModel.headform2.setRowSelect(0);
            viewModel.headform2.on('orgdata.valueChange', function (ele) {
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
                            "name": $.trim($("input#s-name").val()),
                            "loginName": $.trim($("input#s-loginName").val()),
                            "phone": $.trim($("input#s-phone").val()),
                            "states":$.trim( $("select#s-state").val())
                        };
                        //todo updatelist
                        viewModel.loadList(data);
                    }
                })
                .on("change", "select", function (e) {
                    var data = {
                        pn: 1,
                        "name": $.trim($("input#s-name").val()),
                        "loginName": $.trim($("input#s-loginName").val()),
                        "phone": $.trim($("input#s-phone").val()),
                        "state":$.trim( $("select#s-state").val())
                    };
                    //todo updatelist
                    viewModel.loadList(data);
                })
                .on("click", ".nc-searchbtn", function () {
                    var data = {
                        pn: 1,
                        "name": $.trim($("input#s-name").val()),
                        "loginName": $.trim($("input#s-loginName").val()),
                        "phone": $.trim($("input#s-phone").val()),
                        "state":$.trim( $("select#s-state").val())
                    };
                    //todo updatelist
                    viewModel.loadList(data);
                });

            $("#refContainerroledata").delegate(".qy-gridTree-input", "keypress", function (event) {
                if (event.keyCode == 13) {
                    $(".qy-gridTree-searchBtn").click();
                }

            });

            viewModel.mutlilang.init();
        },
        goback:function(){
            window.history.go(-1);
            return false;
        },

        refInit:function (refCode) {
            if (!refCode) return alert($.i18n.prop('js.app.use1.0013'));
            var self = this;
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
                    viewModel.headform2.setMeta('orgdata', 'refmodel', JSON.stringify(pRefmodel));
                    // self.app.createComp(document.getElementById('orgRef'), viewModel);
                }
            });
            // $.ajax({
            //     type: "get",
            //     url: '/uitemplate_web/iref_ctr/refInfo/',
            //     data: {
            //         refCode: "role" || ""
            //     },
            //     traditional: true,
            //     async: false,
            //     dataType: "json",
            //     success: function (pRefmodel) {
            //         viewModel.roleRefDT.setMeta('roledata', 'refmodel', JSON.stringify(pRefmodel));
            //         self.app.createComp(document.getElementById('selRole'), viewModel);
            //     }
            // });

            // $.ajax({
            //     type: "get",
            //     url: '/uitemplate_web/iref_ctr/refInfo/',
            //     data: {
            //         refCode: "userGroupRef" || ""
            //     },
            //     traditional: true,
            //     async: false,
            //     dataType: "json",
            //     success: function (pRefmodel) {
            //         viewModel.roleRefDT.setMeta('groupdata', 'refmodel', JSON.stringify(pRefmodel));
            //         app.createComp(document.getElementById('groupRef'), viewModel);
            //     }
            // });
        },
        //国际化多字段录入 -- start--
        mutlilang: {
            sysLocale: ko.observable(''),
            show: ko.observable(false),
            defaultLocaleValue: ko.observable(''),
            sysDefaultLanguageShow: ko.observable(''),
            sysDefaultLanguageSerial: ko.observable(''),
            sysDefaultLanguagePreLocale: ko.observable(''),
            simpleChineseShow: ko.observable(''),
            locale: ko.observableArray([]),
            tempSerial: "",
            currentSerial: "",
            getCurrentSerial: function (newLocaleValue) {
                var uri = '../wbalone/i18n/classification/serialId';
                var JsonData = null;
                if (newLocaleValue && newLocaleValue.length > 0) {
                    JsonData = {
                        locale: newLocaleValue
                    }
                }
                $.ajax({
                    type: 'get',
                    dataType: 'json',
                    url: uri,
                    data: JsonData,
                    async: false,
                    contentType: 'application/json',
                    success: function (res) {
                        if (res.status == 1) {
                            viewModel.mutlilang.currentSerial= res.data=="1"?"":res.data;
                        }
                    }
                });
            },
            getSerial: function (newLocaleValue) {
                var uri = '../wbalone/i18n/classification/serialId';
                var JsonData = null;
                if (newLocaleValue && newLocaleValue.length > 0) {
                    JsonData = {
                        locale: newLocaleValue
                    }
                }
                $.ajax({
                    type: 'get',
                    dataType: 'json',
                    url: uri,
                    data: JsonData,
                    async: false,
                    contentType: 'application/json',
                    success: function (res) {
                        if (res.status == 1) {
                            viewModel.mutlilang.tempSerial = res.data=="1"?"":res.data;
                        }
                    }
                });
            },
            changeDTValue: function (e) {
                viewModel.usereditData.setValue("name"+viewModel.mutlilang.currentSerial, viewModel.mutlilang.defaultLocaleValue());
            },
            saveValue: function () {
                var defaltValue = viewModel.usereditData.getValue("name"+viewModel.mutlilang.currentSerial);
                viewModel.mutlilang.defaultLocaleValue(defaltValue);
                viewModel.usereditData.setValue("showName",defaltValue);
                viewModel.mutlilang.show(false);
            },
            closeMul: function () {
                viewModel.mutlilang.show(false);
            },
            showMul: function () {
                viewModel.mutlilang.show(true);
            },
            getCurrentLocales: function () {
                var cookieValue = viewModel.mutlilang.getCookie("u_locale");
                if (cookieValue == null || cookieValue.replaceAll("\"", "").length == 0) {
                    // cookieValue = "zh_CN";
                    cookieValue = viewModel.mutlilang.sysDefaultLanguagePreLocale();
                }
                viewModel.mutlilang.sysLocale(cookieValue);
                viewModel.mutlilang.getCurrentSerial(cookieValue);
            },
            getCookie: function (name) {
                var cookieValue = null;
                if (document.cookie && document.cookie != '') {
                    var cookies = document.cookie.split(';');
                    for (var i = 0; i < cookies.length; i++) {
                        var cookie = $.trim(cookies[i]);
                        // Does this cookie string begin with the name we want?
                        if (cookie.substring(0, name.length + 1) == (name + '=')) {
                            cookieValue = decodeURIComponent(cookie
                                .substring(name.length + 1));
                            break;
                        }
                    }
                }
                return cookieValue;
            },
            getLanguageList: function () {
                //TODO 调用接口
                $.ajax({
                    url: "../wbalone/i18n/classification/list",
                    type: 'get',
                    data: null,
                    dataType: 'JSON',
                    contentType: 'application/json',
                    cache: false,
                    success: function (res) {
                        if (res.status == 1) {
                            var localeArray = [];
                            for (var index = 0; index < res.data.length; index++) {
                                viewModel.mutlilang.getSerial(res.data[index].prelocale);
                                //获取默认语种
                                if(res.data[index].i18nDefault==1){
                                    viewModel.mutlilang.sysDefaultLanguageShow( res.data[index].pageshow);
                                    viewModel.mutlilang.sysDefaultLanguagePreLocale( res.data[index].prelocale);
                                    viewModel.mutlilang.sysDefaultLanguageSerial(viewModel.mutlilang.tempSerial);
                                }
                                if(res.data[index].serialid==1){
                                    viewModel.mutlilang.simpleChineseShow( res.data[index].pageshow);
                                }
                                localeArray.push({
                                    "locale": res.data[index].prelocale,
                                    "label": res.data[index].pageshow,
                                    "serial": viewModel.mutlilang.tempSerial,
                                    "value": ""
                                });
                            }
                            viewModel.mutlilang.locale(localeArray);
                            //动态的设置字段
                            for (var i = 0; i < viewModel.mutlilang.locale().length; i++) {
                                var item = viewModel.mutlilang.locale()[i]
                                viewModel.usereditData.createField("name"+item.serial);
                            }
                            viewModel.usereditData.createEmptyRow();
                            $('.input-par').each(function () {
                                var fieldStr = $(this).attr('field');
                                var umetaStr = $(this).attr('u-meta');
                                if (fieldStr) {
                                    var options = JSON.parse(umetaStr);
                                    options.field = fieldStr;
                                    $(this).attr('u-meta', JSON.stringify(options));
                                    // ko.cleanNode($(this)[0]);
                                    options['type'] = options['type'] || 'string';
                                    if (options && options['type']) {
                                        var comp = u.compMgr.createDataAdapter({
                                            el: $(this)[0],
                                            options: options,
                                            model: viewModel,
                                            app: viewModel.app
                                        });
                                        $(this)[0]['u-meta'] = comp;
                                        viewModel.app.comps.push(comp);
                                    }
                                }

                            })
                        }
                    },
                });
            },
            init: function () {
                viewModel.mutlilang.getLanguageList();
                viewModel.mutlilang.getCurrentLocales();
            }
        }
        //国际化多字段录入 -- stop--
    };

    return {
        init: function (content) {
            // 插入内容
            content.innerHTML = html;

            // 执行主逻辑
            //初始化事件
            viewModel.pageInit();
            viewModel.initI18n();
            window.headerInit($('#userList .apptitle')[0],$.i18n.prop('js.app.use1.0014'), window.location.href.indexOf("modulefrom=sidebar")>0);

            //导入初始化
//            viewModel.upload();
        }
    }
});
