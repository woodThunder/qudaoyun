define(function (require, module, exports) {
    // 引入相关的功能插件或模块
    var html = require('text!./index.html');
    require('css!./index.css');
    require('css!./table.css');
    require('css!./paginate.css');
    require('css!./modal.css');
    require('i18n');

    //load ref component dependcy
    //require('/uitemplate_web/static/js/uiref/reflib.js');
    //require('/uitemplate_web/static/js/uiref/refer.js');
    //require('/uitemplate_web/static/js/uiref/refGrid.js');
    //require('/uitemplate_web/static/js/uiref/refGridtree.js');
    //require('/uitemplate_web/static/js/uiref/refTree.js');
    //require('/uitemplate_web/static/js/uiref/refcommon.js');
    //require('/uitemplate_web/static/js/uiref/uiReferComp.js');

    require('reflib');
    require('refer');
    require('refGrid');
    require('refGridtree');
    require('refTree');
    require('refcommon');
    require('uiReferComp');

    var refmodel = "";
//     $.ajax({
//         type: "get",
//         url: '/uitemplate_web/iref_ctr/refInfo/',
//         data: {
//             refCode: "organization" || ""
//         },
//         traditional: true,
//         async: false,
//         dataType: "json",
//         success: function (pRefmodel) {
//             refmodel = JSON.stringify(pRefmodel);
// //            viewModel.headform.setMeta('dataSourceId', 'refmodel', refmodel);
//         }
//     });
    var conUserModal = null;
    var newpRefmodel = null;
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
            window.app = u.createApp({
                el: '#roleAuth',
                model: viewModel
            });
            app.init(viewModel, null, false);

            /* var app = window.app;
             app = u.createApp({
             el: '#roleAuth',
             model: viewModel
             });
             try {
             app.init(viewModel, null, false);
             } catch (e) {
             alert(e.stack);
             }*/

            //初始化数据
            viewModel.headform.createEmptyRow(); //创建空行
            viewModel.headform.setRowSelect(0);
            viewModel.headform.on('dataSourceId.valueChange', function (ele) {
                var compId = ele.newValue;
                var rows = viewModel.headform.getChangedRows();
                if (compId) {
                    viewModel.CurRole.ConObjbusisAjax(compId);
                }
                // viewModel.headform.setValue("dataSourceId", "");
            });

            // 初次加载角色列表数据
            viewModel.pagination.init();
            viewModel.loadRoleList({});
            initI18n('/roleAuth/');

            $("#conBOModal").on("keypress", "input[name='searchUnConUser']", function (event) {
                if (event.keyCode == 13) {
                    var keyword = $("input[name='searchUnConUser']").val();
                    viewModel.loadObjList({keyword: keyword});
                }
            })
            //处理搜索任务
            $("#roleAuth")
                .on("keypress", "input[name='searchRole']", function (event) {
                    if (event.keyCode == 13) {
                        var keyword = $("input[name='searchRole']").val();
                        viewModel.loadRoleList({keyword: keyword});
                    }
                })
                .on("keypress", "input[name='searchObj']", function (event) {
                    if (event.keyCode == 13) {
                        var keyword = $("input[name='searchObj']").val();
                        viewModel.CurRole.loadConObjbusiData({keyword: keyword});
                    }
                })
        },
        headform: new u.DataTable({
            meta: {
                'dataSourceId': {
                    'refparam': '{"isUseDataPower":false}',
                    'refmodel': refmodel,
                    'refcfg': '{"isClearData":true,"ctx":"/uitemplate_web","isMultiSelectedEnabled":true,"pageUrl":"uitemplate_web","isCheckListEnabled":false}'
                },
                'dataSourceIdNew': {}
            }
        }),
        refInit: function (refCode) {
            if (!refCode) return alert($.i18n.prop('js.wor.rol1.0001', '缺少参数~~'));
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
                    pRefmodel.isUseDataPower = false;
                    newpRefmodel=pRefmodel;
                    if(newpRefmodel!=null && newpRefmodel.refVertion=='NewRef'){
                        $("#dataSourceIdOld").css("display","none");
                        $("#dataSourceIdNew").css("display","inline-block");
                        //viewModel.newRefInit(pRefmodel);
                    }else{
                        $("#dataSourceIdOld").css("display","inline-block");
                        $("#dataSourceIdNew").css("display","none");
                        viewModel.oldRefInit(pRefmodel);
                    }
                }
            });
        },

        oldRefInit: function(pRefmodel){
            refmodel = JSON.stringify(pRefmodel);
            refmodel.isUseDataPower = false;
            viewModel.headform.setMeta('dataSourceId', 'refmodel', refmodel);
            app.createComp(document.getElementById('dataSourceIdOld'),viewModel);
        },

        newRefInit: function (refModel) {
            var option = {
                title: $.i18n.prop('js.wor.rol1.0002', '选取组织'),
                refType:1,
                isRadio:true,
                hasPage:false,
                backdrop:false,
                treeloadData:true,
                buttonText:{ok:$.i18n.prop('ht.wor.rol9.0025','确定'),cancel:$.i18n.prop('ht.wor.rol9.0024','取消')},
                tabData:[

                ],
                param:{//url请求参数
                    refCode:'neworganizition',
                    tenantId:'',
                    sysId:'',
                    locale: u.getCookie("u_locale"),
                    content:'',
                    refModelUrl: 'http://workbench.yyuap.com/ref/rest/testref_ctr/'
                },
                refModelUrl:{
                    TreeUrl:'/newref/rest/iref_ctr/blobRefTree', //树请求
                    GridUrl:'http://workbench.yyuap.com/ref/rest/iref_ctr/commonRefsearch',//单选多选请求
                    TableBodyUrl:'/newref/rest/iref_ctr/blobRefTreeGrid',//表体请求
                    TableBarUrl:'/newref/rest/iref_ctr/refInfo',//表头请求
                    totalDataUrl:'http://workbench.yyuap.com/ref/diwork/iref_ctr/matchPKRefJSON',//根据refcode请求完整数
                },
                checkedArray: [],
                onCancel: function (p) {
                },
                onSave: function (sels) {
                    var obj=sels[0];
                    var dataSourceId = "";
                    if(sels!=null){
                        for(var i=0; i<sels.length; i++){
                            dataSourceId=dataSourceId+obj.refpk+",";
                        }
                        dataSourceId=dataSourceId.substr(0,dataSourceId.lastIndexOf(","));
                    }
                    //viewModel.headform.setValue("dataSourceIdNew",dataSourceId);
					
					if (dataSourceId) {
                        viewModel.CurRole.ConObjbusisAjax(dataSourceId);
                    }
                    viewModel.headform.setValue("dataSourceIdNew", "");
                },
                className: '',
            };
            switch(refModel.refUIType)
            {
                case 'CommonRef':
                    option.refType = 4;
                    break;
                case 'RefGrid':
                    option.refType = 2;
                    break;
                case 'RefTree':
                    option.refType = 1;
                    break;
                case 'RefGridTree':
                    option.refType = 3;
                    break;
                default:
                    option.refType = 1;
            }
            option.param.refCode=refModel.refCode;
            option.param.refModelUrl=refModel.refModelUrl;
            option.title=refModel.rootName;
			
			var destList = viewModel.CurRole.ConCurObjBusiData.getSimpleData();
            var titemList = [];
            for(var i=0; i<destList.length; i++){
                var item = destList[i];
                titemList.push(item.resourceId);
            }

            if(titemList.length>0) {
                //请求数据
                var obj = {
                    type: "post",
                    url: '/newref/rest/iref_ctr/matchPKRefJSON',
                    async: false,
                    data: {'refCode': refModel.refCode, 'pk_val': titemList}
                };
                var successCallback = function (res) {
                    if (res.data) {
                        for (var i = 0; i < res.data.length; i++) {
                            var item = res.data[i];
                            option.checkedArray.push(item);
                        }
                    }
                    window.createModal(option);
                }
                $.ajax({
                    type: obj.type || 'get',
                    dataType: obj.dataType || 'json',
                    contentType: 'application/json',
                    url: obj.url,
                    data: JSON.stringify(obj.data) || '',
                    success: function (res) {
                        successCallback(res);
                    }
                });
            }else {
                window.createModal(option);
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
                async: false,
                data: options
            };
            var successCallback = function (res) {
                if (res.status === 1) {
                    var data = res.data;
                    if (data.totalElements == 0) {
                        viewModel.loading.stop();
                        viewModel.listData.setSimpleData([]);
                        //viewModel.CurRole.listObjsData.setSimpleData([]);
                        viewModel.CurRole.ConCurObjBusiData.setSimpleData([]);
                        $('#s-busyO').empty();
                        viewModel.pagination.count(0);
                        return  false;
                    }
                    viewModel.pagination.element.update({
                        totalPages: data.totalPages,
                        pageSize: data.size,
                        currentPage: data.number + 1,
                        totalCount: data.totalElements,
                        showState: false
                    });
                    viewModel.listData.setSimpleData(data.content);
                    viewModel.pagination.count(data.totalElements);


                    // 默认选中第一行
                    var FisrtRow = viewModel.listData.getRow(0);

                    // 加载当前系统所有业务对象
                    viewModel.paginationt3.init();

                    if (FisrtRow) {
                        viewModel.CurRole.init(FisrtRow);
                        //   viewModel.loadObjList({});
                        $("#rolesTable tbody tr.active").removeClass("active");
                        $("#rolesTable tbody tr:eq(0)").addClass("active");
                    }

                } else {
                    alert(res.msg ? res.msg : $.i18n.prop('js.wor.rol1.0003', '返回错误，请刷新页面'))
                }

                assignmentPage();
            };

            // viewModel.loading.begein();
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
            begein: function () {
                u.showLoader();
            },
            stop: function () {
                u.hideLoader();
            }
        },
        /**
         * 查询全部对象资源
         * @method function
         * @return {[type]} [description]
         */
        loadObjList: function (params) {
            var curRole = viewModel.CurRole.curRoleData();
            var options = {
                "number": params.pageNum || viewModel.paginationt3.element.options.currentPage,
                "size": params.pageSize || viewModel.paginationt3.element.options.pageSize || 10,

                // 'roleId':curRole.id||"",
                "tenantId": curRole.tenantId || "",
                "sysId": "wbalone" || "",
                'keyword':params.keyword||''
            };
            //请求数据
            var obj = {
                type: "get",
                // url: '/iuap_qy/dataperm/filter/assigned/bos'
                url: 'security/findAllResourceObject.do',
                data: options
            };
            var successCallback = function (res) {
//                viewModel.loading.stop();
//                debugger;
                if (res.status === "1") {
                    var data = res;
                    viewModel.paginationt3.element.update({
                        totalPages: data.totalPages,
                        pageSize: data.size,
                        currentPage: data.number + 1,
                        totalCount: data.totalElements
                    });
                    viewModel.listObjsData.setSimpleData(data.data, {
                        unSelect: true
                    });
                    viewModel.paginationt3.count(data.totalElements);
                } else {
                    alert(res.msg ? res.msg : $.i18n.prop('js.wor.rol1.0004', '返回错误'))
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
                            $('#emptyImage span').html($.i18n.prop('js.wor.rol1.0005', '服务连接错误'));
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
            searchObj: function (vm, event) {
                var keyword = $("input[name='searchObj']").val();
                viewModel.CurRole.loadConObjbusiData({keyword: keyword});
            },
            ConObjBusis: function () {//当前角色选择的对象分配实体内容
                //  调用参照组件
                var curobj = viewModel.CurRole.CurObj();
                if (curobj) {
                    // viewModel.refInit(curobj.resourcetypecode);
                    if(newpRefmodel!=null && newpRefmodel.refVertion=='NewRef'){
                        viewModel.newRefInit(newpRefmodel);
                    }
                } else {
                    alert($.i18n.prop('js.wor.rol1.0006', '请先为当前角色分配对象~~'));
                }
            },
            conUser: function (row, event) {  //分配用户
                $("#rolesTable tbody tr.active").removeClass("active");
                $(event.target).parents("tr:eq(0)").addClass("active");

                if( viewModel.paginationt3.element.options){
                    viewModel.paginationt3.element.update({
                        totalPages: 0,
                        pageSize: 0,
                        currentPage: 1,
                        totalCount: 0
                    });
                    viewModel.paginationt3.count(0);

                    viewModel.listObjsData.setSimpleData([]);

                }
                viewModel.CurRole.curRoleData(row.getSimpleData());
                // viewModel.CurRole.init(row);
                viewModel.loadObjList({});
                if (!conUserModal) {
                    conUserModal = u.dialog({ id: 'conUserModal', content: "#conBOModal", hasCloseMenu: true  });
                } else {
                    conUserModal.show();
                }

                $("input[name='searchConUser']").val('');
                $("input[name='searchUnConUser']").val('');

            },
            searchConUser: function (vm, event) {
//                debugger;
                var keyword = $("input[name='searchConUser']").val();
                viewModel.CurRole.loadConObjbusiData({keyword: keyword});
            },
            searchUnConUser: function (vm, event) {
//                debugger;
                var keyword = $("input[name='searchUnConUser']").val();
                viewModel.loadObjList({keyword: keyword});
            },
            unConUserOne: function (row) {   //取消分配当前用户
//                debugger;
                var ids = [];
                ids.push(row.getValue('id'));
                viewModel.CurRole.UnConUsersAjax(ids);
            },
            unConUsers: function () {   //批量取消分配用户
//                debugger;
                var selrowIds = viewModel.CurRole.ConCurObjBusiData
                    .getSimpleData({type: 'select', fields: ['id']})
                    .map(function (item, index) {
                        return item.id;
                    });
                if (!selrowIds.length) return false;
                viewModel.CurRole.UnConUsersAjax(selrowIds);
            },
            showConUsers: function (data, event) {    //显示当前角色已数据对象
//                debugger;

                //清空select 对象数组
                // viewModel.CurRole.CurObjs.removeAll();
                // viewModel.CurRole.CurObj(undefined);
                // viewModel.headform.setValue("dataSourceId", "");

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
                    pageList: ['5', '10'],
                    jumppage: true
                });
                //分页
                viewModel.paginationt2.element.on('pageChange', function (currentPage) {
                    viewModel.CurRole.loadConObjbusiData({
                        pageNum: currentPage + 1,
                        pageSize: viewModel.paginationt2.element.options.pageSize
                    });
                });
                viewModel.paginationt2.element.on('sizeChange', function (siz) {
                    viewModel.CurRole.loadConObjbusiData({
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
                    viewModel.loadObjList({
                        pageNum: currentPage + 1,
                        pageSize: viewModel.paginationt3.element.options.pageSize
                    });
                });
                viewModel.paginationt3.element.on('sizeChange', function (siz) {
                    viewModel.loadObjList({
                        pageNum: 1,
                        pageSize: siz - 0
                    });
                });
            }
        },

        checkRole: ko.observable(),
        CurRole: {
            CurObjs: ko.observableArray([]),
            CurObj: ko.observable(),
            curRoleData: ko.observable(),
            curRoleIndex: ko.observable(0),

            //

            selBusi:function (data) {

                // alert(data);
                if(data&&data.CurRole&&data.CurRole.CurObj()){
                    viewModel.refInit(data.CurRole.CurObj().refTypeCode);
                    //初始化当前角色select选中对象的内容列表
                    if(viewModel.paginationt2.element&&viewModel.paginationt2.element.options){
                        viewModel.CurRole.loadConObjbusiData({});
                    }

                }
            },
            /*当前角色已分配用户列表模型*/
            ConCurObjBusiData: new u.DataTable({
                meta: {
                    resoureObjectCode: {
                        type: 'string'
                    },
                    resourceOjectName: {
                        type: 'string'
                    },
                    id: {
                        type: 'string'
                    },
                    roleId: {
                        type: 'string'
                    },
                    resourceId: {
                        type: 'string'
                    },
                    resourcetypecode: {
                        type: 'string'
                    },
                    operationCode: {
                        type: 'string'
                    },
                    tenantId: {
                        type: 'string'
                    },
                    sysId: {
                        type: 'string'
                    }
                }
            }),
            /*分配对象实体*/
            ConObjbusisAjax: function (ids) {
                var obj = {
                    type: "post",
                    //iuap 前端升级同步更改 修改了数据权限分配对象的sql，是所有角色都能看到同样要分配权限的对象 wt 20190123
                    url: "wbalone/datasource/saveByEntity.do",
                    data: []
                };
                var curRole = viewModel.CurRole.curRoleData();
                var curObj = viewModel.CurRole.CurObj();
                if (!curObj) {
                    curObj.refTypeCode = "organizationRef";
                }
                if (!ids.length) return false;
                var idsArr = ids.split(',');
                for (var i = 0, j = idsArr.length; i < j; i++) {
                    obj.data.push({
                        "operationCode": "read",
                        "resourceId": idsArr[i],
                        "resourcetypecode": curObj.resourcetypecode || "organization",   //refTypeCode
                        "roleId": curRole.id,
                        "sysId": "wbalone",
                        "tenantId": curRole.tenantId
                    })
                }
                $.ajax({
                    type: obj.type || 'get',
                    dataType: obj.dataType || 'json',
                    contentType: 'application/json',
                    url: obj.url,
                    data: JSON.stringify(obj.data) || '',
                    success: function (res) {
                        if (res.status == "1") {
                            //更新已分配业务列表
                            viewModel.CurRole.loadConObjbusiData({});
                        } else {
                            alert(res.msg || $.i18n.prop('js.wor.rol1.0007', '异常错误'));
                        }
                    }
                });

            },
            /*取消分配用户请求*/
            UnConUsersAjax: function (ids) {
                var obj = {
                    type: "post",
                    url: "security/data_perm/delete.do",
                    data: ids || []
                };
                $.ajax({
                    type: obj.type || 'get',
                    dataType: obj.dataType || 'json',
                    contentType: 'application/json',
                    url: obj.url,
                    data: JSON.stringify(obj.data) || '',
                    success: function (res) {
                        if (res.status === "1") {
                            viewModel.CurRole.loadConObjbusiData({});
                        } else {
                            alert(res.msg || $.i18n.prop('js.wor.rol1.0007', '异常错误'));
                        }
                    }
                });

            },
            loadConObjData: function (params) {
                var curRole = viewModel.CurRole.curRoleData();
                // 查询参数
                var options = {
                    "tenantId": curRole.tenantId || "",
                    "sysId": "wbalone" || "",
                    "roleId": curRole.id || ""
                };
                //请求数据
                var obj = {
                    type: "get",
                    //iuap 前端升级同步更改 修改数据权限 打开数据权限报错 wt 20190123 
                    url: 'security/findAllProfileRegByRoleId',
                    data: options
                };
                var successCallback = function (res) {
                    if (res.status === "1") {
                        viewModel.CurRole.CurObjs(res.data);

                        viewModel.paginationt2.init();
                        viewModel.CurRole.ConCurObjBusiData.allSelected(false);
                        if (res.data.length) {
                            viewModel.CurRole.CurObj(res.data[0]);
                            viewModel.refInit(res.data[0].refTypeCode);

                            //初始化当前角色select选中对象的内容列表
                            viewModel.CurRole.loadConObjbusiData({});
                        } else {
                            // 设置空行数据
                            viewModel.CurRole.ConCurObjBusiData.removeAllRows();

                        }
                        viewModel.headform.removeAllRows();
                        viewModel.headform.createEmptyRow();
                    } else {
                        alert(res.msg ? res.msg : $.i18n.prop('js.wor.rol1.0004', '返回错误'))
                    }
                };
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
            loadConObjbusiData: function (params) {
//               u.showLoader();
                var that = this;
                var curRole = viewModel.CurRole.curRoleData();
                var CurObj = viewModel.CurRole.CurObj();
                if(CurObj==undefined){
                    alert($.i18n.prop('ht.wor.rol9.0026', '请先分配业务对象'))
                    return;
                }
                var options = {
                    "number": params.pageNum || viewModel.paginationt2.element.options.currentPage||1,
                    "size": params.pageSize || viewModel.paginationt2.element.options.pageSize||10,
                    "tenantId":CurObj&& CurObj.tenantId || "",
                    "sysId": CurObj&&CurObj.sysId || "",
                    "resourcetypecode": CurObj&&CurObj.resourcetypecode || "",
                    "roleId": curRole.id || "",
                    'keyword':params.keyword||''
                };
                //请求数据
                var obj = {
                    type: "get",
                    url: 'security/data_perm/page.do',
                    data: options
                };
                var successCallback = function (res) {
//                   u.hideLoader();
                    if (res.status === "1") {
                        var data = res;
                        viewModel.paginationt2.element.update({
                            totalPages: data.totalPages,
                            pageSize: data.size,
                            currentPage: data.number + 1,
                            totalCount: data.totalElements
                        });
                        that.ConCurObjBusiData.setSimpleData(data.data, {
                            unSelect: true
                        });
                        viewModel.paginationt2.count(data.totalElements);
                        viewModel.headform.removeAllRows();
                        viewModel.headform.createEmptyRow();
                    } else {
                        viewModel.paginationt2.count(0);
                        viewModel.CurRole.ConCurObjBusiData.removeAllRows();
                        alert(res.msg ? res.msg : $.i18n.prop('js.wor.rol1.0004', '返回错误'))
                    }
                    initI18n('/roleAuth/');
                };
//                viewModel.loading.begein();
                $.ajax({
                    type: obj.type || 'get',
                    dataType: obj.dataType || 'json',
                    contentType: 'application/json',
                    url: obj.url,
                    data: obj.data || '',
                    cache:false,
                    success: function (res) {
//                        viewModel.loading.stop();
                        successCallback(res);
                    }
                });
            },
            init: function (data) {
                // if (this.curRoleData() && (data.getValue('id') == this.curRoleData().id))return;
                //set curRoleData
                this.curRoleData(data.getSimpleData());
                //初始化当前角色已分配对象列表
                //
                // viewModel.loadObjList({});
                viewModel.CurRole.loadConObjData({});
            },
            CancelAction: function () {
                conUserModal.close();
            },
            ConfirmConUsers: function () {
                var oldCode=viewModel.CurRole.CurObj()?viewModel.CurRole.CurObj().refTypeCode:'';
                var checkBusyO = viewModel.checkRole();
                // 需要检查是否在sel中已经存在
                var array = viewModel.CurRole.CurObjs();
                var flag = false;
                var flagIndex =0;
                if (array.length) {
                    array.map(function (item,index) {
                        if (item.id == checkBusyO.id) {
                            flagIndex = index;
                            flag = true;
                        }
                        return  this;
                    });
                }
                if (!flag) {
                    viewModel.CurRole.CurObjs.push(checkBusyO);
                }else{
                    if(flagIndex !=0){
                        var arr = viewModel.CurRole.CurObjs();
                        var temp = arr[0];
                        arr[0] = checkBusyO;
                        arr[flagIndex] = temp;
                        viewModel.CurRole.CurObjs(arr);
                    }
                }
                //sel选中当前选择对象
                viewModel.CurRole.CurObj(checkBusyO);
                viewModel.CurRole.loadConObjbusiData({});
                if (oldCode&&(checkBusyO.refTypeCode != oldCode)) {
                    viewModel.CurRole.ConCurObjBusiData.setSimpleData([]);
                }
                viewModel.refInit(checkBusyO.refTypeCode);

                viewModel.CurRole.CancelAction();
            }
        },

        /*用户列表模型*/
        listObjsData: new u.DataTable({
            meta: {
                id: {
                    type: 'string'
                },
                resourcetypecode: {
                    type: 'string'
                },
                resourcetypename: {
                    type: 'string'
                },
                operationCode: {
                    type: 'string'
                },
                dptableName: {
                    type: 'string'
                },
                refTypeCode: {
                    type: 'string'
                },
                dataConvertUrl: {
                    type: 'string'
                },
                tenantId: {
                    type: 'string'
                },
                sysId: {
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
            initI18n('/roleAuth/');
            content.innerHTML = html;
            // iuap 前端升级同步更改 wt 20190123
            // window.headerInit($('#roleAuth .apptitle')[0],$.i18n.prop('js.wor.rol1.0008', '数据权限'),window.location.href.indexOf("modulefrom=sidebar")>0);
            // 执行主逻辑
            viewModel.pageInit();
        }
    }
});
