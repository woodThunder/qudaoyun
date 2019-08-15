define(function(require, module, exports){
    //var templetutils = require('./uitemplate/templetutils');
    // 引入相关的功能插件或模块
    var html = require('text!pages/dept/dept.html');
    require('css!pages/dept/index.css');
    require('/uitemplate_web/static/js/rt/templetutils.js');
    require('/wbalone/pages/dept/uitemplate/controller.js');
    require('css!/uitemplate_web/static/trd/bootstrap-table/src/bootstrap-table.css');
    var treeurl = window.baseUrl + '/dept/deptTreeListUnderOrganization/';//
    var addurl=window.baseUrl + '/dept/create';
    var editurl=window.baseUrl + '/dept/update';
    var getdepturl=window.baseUrl + '/dept/getById/';
    var deleurl=window.baseUrl + '/dept/delete/';
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

    var dialogmin=require('dialogmin');
    var refmodel="";

    var controler =  {
        buttonflag:ko.observable(false),//编辑删除的控制开关
        editflag:ko.observable(false),//是否为编辑状态,控制保存访问的接口
        addflag:ko.observable(),//能否新增
        orgid:ko.observable(),
        deptid:ko.observable(),
        nodeptflag:ko.observable(),//是否有部门信息
        footflag:ko.observable(),//保存/取消按钮的控制开关
        treeSetting:{
            view:{
                showLine:false,
                selectedMulti:false,
                dblClickExpand: false
            },
            callback:{
                onClick:function(e,id,node){
                    //非编辑态查询
                    if(controler.footflag()!=true){
                        var id=node.id;
                        controler.events.loadInfo(id);
                        controler.deptid(id);
                        $(".ztree a").removeClass("activenode");
                        $(e.toElement).closest("a").addClass("activenode");
                        $("#tree3")[0]['u-meta'].tree.expandNode(node)
                    }else{

                    }

                }
            }
        },
        depttreeData: new u.DataTable({
            meta: {
                'id': {
                    'value':""
                },
                'pid': {
                    'value':""
                },
                'name':{
                    'value':""
                },
                'code':{
                    'value':""
                }
            }
        }),
        headform2: new u.DataTable({
            meta: {
                'dataSourceId': {
                	'refparam': '{"isUseDataPower":false}',
                    'refmodel': '{}',
                    'refcfg': '{"isClearData":true,"ctx":"/uitemplate_web","isMultiSelectedEnabled":false,"pageUrl":"uitemplate_web","isCheckListEnabled":true}'
                }
            }
        }),
        events:{
            goback:function(){
                window.history.go(-1);
                return false;
            },
            loadTree:function (id) {
                $.ajax({
                    type: "get",
                    url: treeurl+id,
                    /* data:param,*/
                    async:false,
                    dataType: "json",
                    success: function(result) {
                        //清理数据
                        //设置数据
                        if(result.status==1){
                            var data=result.data;
                            if(data.length>0){
                                $("#template-dept").css("display","block");
                                $("#tree3").css("display","block");
                                controler.nodeptflag(false);
                                controler.depttreeData.removeAllRows();
                                $("#tree3")[0]['u-meta'].tree.expandAll(true);//展开树
                            }else{
                                if(!controler.editflag()){
                                    controler.nodeptflag(true);
                                    $("#template-dept").css("display","none");
                                }else{
                                    controler.nodeptflag(false);
                                    $("#template-dept").css("display","block");
                                }

                                $("#tree3").css("display","none");
                            }
                            controler.depttreeData.setSimpleData(data);
                        }else{
                            dialogmin(result.msg,'tip-alert');
                            return false;
                        }
                    }
                });
            },
            loadInfo:function (id) {
                var templateModel = new TemplateModel(app);
                /*通过参照code获取fieldid，再通过fieldid往dom元素设置refparam*/
                var fieldId =templateModel.getFieldIdByCode('headform',"Dept.parent_id");
                $('[fieldname="'+fieldId+'"]').find(".fr").attr("data-refparam",'{"isRefreshData":true,"pk_org":"'+controler.orgid()+'"}');
                //$('[fieldname="'+fieldId+'"]').find(".fr").attr("data-refparam",'{"pk_val":"OO00001"}');
                //初始化数据
                var param = {};
                param.templateInfo = templateModel.getTemplateInfo();
                $.ajax({
                    type: "get",
                    url: getdepturl+id,
                    data:param,
                    async:true,
                    dataType: "json" ,
                    success: function(result) {
                        //清理数据
                        //设置数据
                        templateModel.init(result,true);
                        //app.getDataTable('headform').parent.headform_isEditable(false);
                    }
                });
            },




            add:function () {
                if(!controler.orgid()){
                    dialogmin("请先选择组织！",'tip-alert');
                    return false;
                }
                /*处于非编辑状态新增部门*/
                if(controler.footflag()!=true){
                    var fs=app.getDataTable('headform').parent;
                    fs.headform_isEditable(true);
                    controler.buttonflag(true);
                    controler.footflag(true);
                    controler.editflag(false);
                    controler.addflag(false);
                    controler.nodeptflag(false);
                    $("#template-dept").css("display","block");
                    var id="null";
                    controler.events.loadInfo(id);
                };

            },

            save:function () {
                var empty=false;
                $("#template-dept .form-tablelayout>div").each(function(){
                    if ($(this).css("display")!="none"){
                        if($(this).find("input.ui-must-icon").val()==""){
                            $(this).find("input.ui-must-icon").siblings(".u-form-control-info").html("不能为空").css("display","block");
                            empty=true;
                        }
                    }
                })
                var timer=setTimeout(function(){
                    $("input.ui-must-icon").siblings(".u-form-control-info").html("").css("display","none");
                },2000);
                if(empty==false){
                    var saveurl;
                    //saveurl=addurl;
                    var templateModel = new TemplateModel(app);
                    var data = templateModel.getAllValue();
                    var param = {};
                    //app.getDataTable('headform').parent datatable的上一级就是viewModel
                    param.templateInfo = templateModel.getTemplateInfo();
                    param.headData = JSON.stringify(data);
                    //param.body = JSON.stringify();
                    var cls = "com.yonyou.uap.wb.entity.org.Dept";
                    var icls = "com.yonyou.uap.wb.entity.org.Dept";
                    param.cls = cls;
                    param.icls = icls;
                    if(controler.editflag()==true){
                        saveurl=editurl;
                    }else{
                        saveurl=addurl;
                        param.organizationId= controler.orgid();
                    }
                    $.ajax({
                        type: "POST",
                        url: saveurl,
                        data:param,
                        async:false,
                        dataType: "json" ,
                        success: function(result) {
                            //清理数据
                            //设置数据
                            if(result.status==1){
                                app.getDataTable('headform').parent.headform_isEditable(false);
                                controler.buttonflag(false);
                                controler.events.loadTree(controler.orgid());
                                controler.editflag(false);
                                controler.footflag(false);
                                controler.addflag(true);
                                if(controler.depttreeData.getSimpleData().length>0){
                                    controler.deptid(controler.depttreeData.getSimpleData()[0].id);
                                    var nodetitle=controler.depttreeData.getSimpleData()[0].name;
                                    $("[title='"+nodetitle+"']").addClass("activenode");
                                    controler.events.loadInfo(controler.deptid());
                                }else{
                                    var id="null";
                                    controler.events.loadInfo(id);
                                    controler.buttonflag(true);
                                }
                            }else{
                                dialogmin(result.msg,'tip-alert');
                                return false;
                            }
                        }
                    });
                }
            },
            cancel:function () {
                app.getDataTable('headform').parent.headform_isEditable(false);
                controler.events.loadInfo(controler.deptid());
                //app.getDataTable('headform').parent.headform_isEditable(true);
                controler.editflag(false);
                controler.footflag(false);
                controler.addflag(true);
                if(controler.depttreeData.getSimpleData().length==0){
                    controler.nodeptflag(true);
                    $("#template-dept").css("display","none");
                }else{
                    controler.buttonflag(false);
                }

            },
            delete:function () {
                var id=controler.deptid();
                window.md=u.dialog({id:'deleteDialog',content:"#delete-dialog",hasCloseMenu:true});
                var okButton = document.body.querySelector(".u-msg-ok");
                var cancelButton = document.body.querySelector(".u-msg-cancel");
                md.closeDiv.innerHTML="<span class='iconfont icon-cancel02'></span>";
                u.off(okButton,'click');
                u.on(okButton,'click', function(){
                    $.ajax({
                        type: "get",
                        url: deleurl+id,
                        async:true,
                        dataType: "json" ,
                        success: function(result) {
                            //清理数据
                            //设置数据
                            if(result.status==1){
                                controler.events.loadTree(controler.orgid());
                                if(controler.depttreeData.getSimpleData().length>0){
                                    controler.deptid(controler.depttreeData.getSimpleData()[0].id);
                                    controler.events.loadInfo(controler.deptid());
                                    var nodetitle=controler.depttreeData.getSimpleData()[0].name;
                                    $("[title='"+nodetitle+"']").addClass("activenode");
                                }else{
                                    var id="null";
                                    controler.events.loadInfo(id);
                                    controler.buttonflag(true);
                                }
                            }else{
                                dialogmin(result.msg,'tip-alert');
                                return false;
                            }
                        }
                    });
                    md.close();
                    return false
                });
                u.off(cancelButton,'click');
                u.on(cancelButton,'click', function(){
                    md.close();
                });

            },
            edit:function () {
                var fs=app.getDataTable('headform').parent;
                fs.headform_isEditable(true);
                controler.addflag(false);
                controler.buttonflag(true)
                controler.editflag(true);
                controler.footflag(true);
            },
        },
        pageInit:function(){
            var app = u.createApp({
                el: '#dept',
                model: controler
            });
            //app.init(controler,null,false);
            //window.app = app;
            require(['/uitemplate_web/static/js/rt/templetutils.js','/wbalone/pages/dept/uitemplate/controller.js'],function () {
                var templetUtils = new TempletUtils(app);
                templetUtils.initTemplateComponent('template-dept', 'dept', 'org','/wbalone/pages/dept/uitemplate/controller.js',true);
                // templetUtils.initTemplateComponent('template-deptref', 'organization_ref', 'org','/wbalone/pages/dept/uitemplate/controller.js',true);

            });
            window.deptid="null";
            $("#template-dept").css("display","none");
            controler.nodeptflag(true);
            controler.buttonflag(true);
            controler.footflag(false);
            controler.addflag(true);
            //初始化数据
            controler.headform2.createEmptyRow(); //创建空行
            controler.headform2.setRowSelect(0);
            controler.headform2.on('dataSourceId.valueChange', function (ele) {
                var compId = ele.newValue;
                controler.addflag(true);
                var rows =  controler.headform2.getChangedRows();
                if (compId) {
                    controler.events.loadTree(compId);
                    controler.orgid(compId);
                    var treedata=controler.depttreeData.getSimpleData();
                    if(treedata.length>0){
                        var id=controler.depttreeData.getSimpleData()[0].id;
                        var nodetitle=controler.depttreeData.getSimpleData()[0].name;
                        $("[title='"+nodetitle+"']").addClass("activenode");
                        controler.deptid(id);
                        controler.events.loadInfo(id);
                        controler.nodeptflag(false);
                        controler.buttonflag(false);
                    }else{
                        var id="null";
                        controler.events.loadInfo(id);
                        controler.buttonflag(true);
                    }

                    //app.getDataTable('headform').parent.headform_isEditable(false);
                }
                controler.headform2.setValue("dataSourceId", "");
            });
        }
    } ;
    function refInit(refCode) {
        if (!refCode) {
            dialogmin("缺少参数~~",'tip-alert');
            return false;
        }
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
                controler.headform2.setMeta('dataSourceId', 'refmodel', refmodel);
            }
        });
    };
    refInit('organization');
    return {
        init: function (content) {
            // 插入内容
            content.innerHTML = html;
            // 执行主逻辑
            controler.pageInit();
            // 获取节点配置模型中的模板信息
            // 调用模板工具初始化模板
        }
    }
});

