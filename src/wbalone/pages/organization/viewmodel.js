define(function(require, module, exports){
    //var templetutils = require('./uitemplate/templetutils');
    // 引入相关的功能插件或模块
    var html = require('text!pages/organization/org.html');
    require('css!pages/organization/index.css');
    require('css!/uitemplate_web/static/trd/bootstrap-table/src/bootstrap-table.css');
    require('/uitemplate_web/static/js/rt/templetutils.js');
    require('/wbalone/pages/organization/uitemplate/controller.js');
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
    /*请求地址*/
    var treeurl = window.baseUrl + '/organization/treeList/simple';//
    var addurl=window.baseUrl + '/organization/create';
    var editurl=window.baseUrl + '/organization/update';
    var getorgurl=window.baseUrl + '/organization/getById/';
    var deleurl=window.baseUrl + '/organization/delete/';

    var controler =  {
        buttonflag:ko.observable(false),
        editflag:ko.observable(false),
        orgid:ko.observable(),
        noorgflag:ko.observable(),//是否有组织信息
        footflag:ko.observable(),
        addflag:ko.observable(),//能否新增
        treeSetting:{
            view:{
                showLine:false,
                selectedMulti:false,
                dblClickExpand: false
            },
            callback:{
                onClick:function(e,id,node){
                    /*处于非编辑状态选择组织*/
                    if(controler.buttonflag()!=true){
                        var id=node.id;
                        controler.events.loadInfo(id);
                        controler.orgid(id);
                        $(".ztree a").removeClass("activenode");
                        $(e.toElement).closest("a").addClass("activenode");
                        $("#tree2")[0]['u-meta'].tree.expandNode(node)
                    }else{

                    }

                    /* if(!node.isParent){

                     }*/
                }
            }
        },
        treeData: new u.DataTable({
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
        events:{
            goback:function(){
                window.history.go(-1);
                return false;
            },
            loadTree:function () {
                $.ajax({
                    type: "get",
                    url: treeurl,
                    /* data:param,*/
                    async:false,
                    dataType: "json",
                    success: function(result) {
                        //清理数据
                        //设置数据
                        if(result.status==1){
                            var data=result.data;
                            //controler.treeData.clear();
                            if(data.length>0){
                                controler.treeData.removeAllRows();
                                controler.treeData.setSimpleData(data);
                                $("#tree2")[0]['u-meta'].tree.expandAll(true);//展开树
                                $("#template-organization").css("display","block");
                                controler.noorgflag(false);
                                controler.buttonflag(false);
                                $("#tree2").css("display","block");
                            }else{
                                $("#template-organization").css("display","none");
                                controler.noorgflag(true);
                                //controler.buttonflag(true);
                                $("#tree2").css("display","none");
                            }

                        }else{
                            dialogmin(result.msg,'tip-alert');
                            return false;
                        }

                    }
                });

            },
            loadInfo:function (id) {

                var templateModel = new TemplateModel(app);
                //初始化数据
                var param = {};
                param.templateInfo = templateModel.getTemplateInfo();
                $.ajax({
                    type: "get",
                    url: getorgurl+id,
                    data:param,
                    async:false,
                    dataType: "json" ,
                    success: function(result) {
                        //清理数据
                        //设置数据
                        templateModel.init(result,"");
                    }
                });

            },

            add:function () {
                /*处于非编辑状态新增组织*/
                if(controler.buttonflag()!=true){
                    var fs=app.getDataTable('headform').parent;
                    fs.headform_isEditable(true);
                    controler.buttonflag(true);
                    controler.editflag(false);
                    controler.footflag(true);
                    controler.addflag(false);
                    var id="null";
                    controler.events.loadInfo(id);
                    if(controler.noorgflag()==true){
                        $("#template-organization").css("display","block");
                        controler.noorgflag(false)
                    }
                }
            },

            save:function () {
                var empty=false;
                $("#template-organization td").each(function(){
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
                    if(controler.editflag()==true){
                        saveurl=editurl;
                    }else{
                        saveurl=addurl;
                    }
                    //saveurl=addurl;
                    var templateModel = new TemplateModel(app);
                    var data = templateModel.getAllValue();
                    var param = {};
                    //app.getDataTable('headform').parent datatable的上一级就是viewModel
                    param.templateInfo = templateModel.getTemplateInfo();
                    param.headData = JSON.stringify(data);
                    //param.body = JSON.stringify();
                    var cls = "com.yonyou.uap.wb.entity.org.Organization";
                    var icls = "com.yonyou.uap.wb.entity.org.Organization";
                    param.cls = cls;
                    param.icls = icls;
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
                                controler.addflag(true);
                                controler.events.loadTree();
                                controler.editflag(false);
                                controler.footflag(false);
                                if(controler.treeData.getSimpleData().length>0){
                                    window.orgid=controler.treeData.getSimpleData()[0].id;
                                    controler.orgid(controler.treeData.getSimpleData()[0].id);
                                    var nodetitle=controler.treeData.getSimpleData()[0].name;
                                    $("[title='"+nodetitle+"']").addClass("activenode");
                                    controler.events.loadInfo(controler.orgid());
                                }else{
                                    window.orgid="null";
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

                controler.buttonflag(false);
                controler.events.loadInfo(controler.orgid())
                //app.getDataTable('headform').parent.headform_isEditable(true);
                controler.editflag(false);
                controler.footflag(false);
                controler.addflag(true);
                app.getDataTable('headform').parent.headform_isEditable(false);
                //controler.events.loadTree();//为了没有组织，新建又取消的情况
            },
            delete:function () {
                var id=controler.orgid();
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
                                controler.events.loadTree();
                                if(controler.treeData.getSimpleData().length>0){
                                    window.orgid=controler.treeData.getSimpleData()[0].id;
                                    controler.orgid(controler.treeData.getSimpleData()[0].id);
                                    controler.events.loadInfo(controler.orgid());
                                    var nodetitle=controler.treeData.getSimpleData()[0].name;
                                    $("[title='"+nodetitle+"']").addClass("activenode");
                                }else{
                                    window.orgid="null";
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
                controler.buttonflag(true);
                controler.editflag(true);
                controler.footflag(true);
                controler.addflag(false);

            },
        },
        pageInit:function(){
            var app = u.createApp({
                el: '#org',
                model: controler
            });
            require(['/uitemplate_web/static/js/rt/templetutils.js','/wbalone/pages/organization/uitemplate/controller.js'],function () {
                var templetUtils = new TempletUtils(app);
                templetUtils.initTemplateComponent('template-organization', 'organization', 'org','/wbalone/pages/organization/uitemplate/controller.js',true);
            });
            //app.init(controler,null,false);
            //window.app = app;
            controler.events.loadTree();
            controler.footflag(false);
            controler.addflag(true);
            //controler.events.loadInfo(controler.treeData.getSimpleData()[0].id);
            if(controler.treeData.getSimpleData().length>0){
                window.orgid=controler.treeData.getSimpleData()[0].id;
                controler.orgid(controler.treeData.getSimpleData()[0].id);
                var nodetitle=controler.treeData.getSimpleData()[0].name;
                $("[title='"+nodetitle+"']").addClass("activenode");
            }else{
                window.orgid="null";
            }
        }
    } ;
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

