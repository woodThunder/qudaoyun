require(['dialogmin','dialog','text!apworkbench/js/userlist/useradd.html','bdtpl','dialogminBack', "knockout"]
    , function() {
    var ko = require('knockout');
    var dialogmin = require('dialogmin');
    var dialogminBack = require('dialogminBack');
    var dialog = require('dialog');
    var useraddTmpl = baidu.template(require('text!apworkbench/js/userlist/useradd.html'));
    var $ctx = window.contextRoot;
    var $tenantId = "";
    var $systemId = "";
    var $userId = "";
    //接口
    var deleteUrl = '/usermgr/user';//单个删除
    var deleteAUrl='/usermgr/del';            //批量删除
    var openAUrl='/usermgr/enable'               //批量启用
    var closeAUrl='/usermgr/disable'              //批量停用
    var resetUrl='/usermgr/resetpassword'              //重置密码
    var pageUrl = '/usermgr/page'; //列表加载
    /*var downlistallUrl = '/excel/excelExport'//导出全部用户
    var downlistpageUrl = '/excel/excelExport'//导出当前页用户
    var uploadUrl = '/excel/excelImport'//导入用户*/
    var modifyUrl = "/usermgr/usermodify";//修改用户信息
    var AddUerUrl = "/usermgr/user";//添加用户

    var viewModel = {
        data : {
            content : ko.observableArray([]),
            totalPages : ko.observable(0),
            number : ko.observable(0),
            totalElements: ko.observable(0)
        },
        searchText : ko.observable(""),
        deleteId:[],
        useId:[],
        isloaded:false,
        deleteUrl : deleteUrl,
        pageUrl : pageUrl,
        dataAdd :  ko.observable({})
    };

     viewModel.arrowup = function(){
         //var scrollTopthis = window.pageYOffset|| document.documentElement.scrollTop || document.body.scrollTop;
         $('body,html').animate({ scrollTop: 0 }, 200);
        return false
     }
    viewModel.downlistshow = function(){
        $(".downuserlist").slideToggle(100);
        $(".downuserlist").mouseleave(function(){
            $(this).slideUp(100)
        })
    };
    viewModel.downlistpage = function(){
        viewModel.userId = [];
        var content = viewModel.data.content();
        for(i=0;i<content.length;i++){
          viewModel.userId.push(content[i].userId)
        };
        var data = {
            userId:viewModel.userId,
            tenantId:$tenantId,
            alluser:false
        }
        if(viewModel.userId==""){
            dialogmin('当前没有用户!');
            return false;
        }
        $.ajax({
            type : 'post',
            dataType : 'json',
            data:data,
            url : $ctx + downlistpageUrl,
            success : function(data) {
                if (data.status==1){
                    dialogmin('导出成功!');
                    viewModel.downloadxls(data.Url)
                }else{
                    dialogmin(data.msg||'网络请求失败')
                }
            },
            error : function(XMLHttpRequest, textStatus, errorThrown) {
                dialogmin("调用服务报错!!");
            }
        });
        return false;
    };
    viewModel.downlistall = function(){

        var data = {
            userId:[],
            tenantId:$tenantId,
            alluser:true
        }
        if(viewModel.data.content()==""){
            dialogmin('当前没有用户!');
            return false;
        }
        $.ajax({
            type : 'post',
            dataType : 'json',
            data:data,
            url : $ctx + downlistallUrl,
            success : function(data) {
                if (data.status==1){
                    dialogmin('导出成功!')
                    viewModel.downloadxls(data.Url)
                }else{
                    dialogmin(data.msg||'网络请求失败')
                }
            },
            error : function(XMLHttpRequest, textStatus, errorThrown) {
                dialogmin("调用服务报错!!");
            }
        });
        return false;
    };
    viewModel.downloadxls = function(Url){
        var f = document.createElement("form");
        document.body.appendChild(f);
        var i = document.createElement("input");
        i.type = "hidden"; f.appendChild(i);
        i.value = "5";
        i.name = "price";
        f.action = Url;
        f.submit();

    }
    viewModel.add = function(){//添加跳转
        var d = dialog({
            title: '新增用户',
            content: useraddTmpl,
            width:800,
            button : [{
            	value : "确定",
            	callback : function() {
	                var queryData = {
	                    loginName: $("#userAddTest_Code").val(),
	                    name: $("#userAddTest_Name").val(),
	                    phone: $("#userAddTest_Tel").val(),
	                    email:$("#userAddTest_Email").val(),
	                    tenantId:$tenantId,
	                    systemId:$systemId,
	                    cuser:$userId
	                };
	                var userReg = /^[a-zA-Z][a-zA-Z0-9_]{5,17}$/; //账户正则
	                if(queryData==undefined||queryData.loginName==""){
	                    dialogmin('您的账户还没填呢~');
	                    return false
	                }
	                else if(userReg.test(queryData.loginName)==false){
	                    dialogmin('您的账户格式错咯~');
	                    return false
	                }
	                var mobileReg =/^(13[0-9]|15[012356789]|17[0678]|18[0-9]|14[57])[0-9]{8}$/; //手机正则
	                if(queryData.phone==undefined||queryData.phone==""){
	                    dialogmin('您的手机号还没填呢~');
	                    return false
	                }
	                else if(mobileReg.test(queryData.phone)==false){
	                    dialogmin('您的手机号格式错咯~');
	                    return false
	                }
	                if(queryData.name==undefined||queryData.name==""){
	                    dialogmin('您的用户名还没填呢~');
	                    return false
	                }
	                var EmailReg = /^([a-z0-9A-Z]+[-|\.]?)+[a-z0-9A-Z]@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\.)+[a-zA-Z]{2,}$/; //邮箱正则
	                if(queryData.email!=undefined&&queryData.email!=""&&EmailReg.test(queryData.email)==false){
	                    dialogmin('您的邮箱格式错咯~');
	                    return false
	                }
	                $.ajax({
	                    type : 'post',
	                    dataType : 'json',
	                    async : false,
	                    data : queryData,
	                    url : $ctx + AddUerUrl,
	                    success : function(data) {
	                        if (data.status==1){
	                            dialogmin('添加成功!');
	                            d.close();
	                            d.remove();
	                            viewModel.data.content([]);
	                            viewModel.load(1);
	                            clear();
	                            //viewModel.load(1);
	                        }else{
	                            dialogmin(data.msg);
	                        }
	                    },
	                    error : function(XMLHttpRequest, textStatus, errorThrown) {
	                        dialogmin("调用服务报错!!");
	                    }
	                });
            	}
            }, {value : "取消"}],
            onclose: function () {
            }
        });

        d.show();
    };
    viewModel.auth = function(){//添加跳转
        if(viewModel.deleteId == ""){
            dialogmin('请选择用户!');
            return false
        }
        addRouter(authUrl);
        window.router.setRoute("/tmp/auth/auth?"+viewModel.deleteId);
    };
    viewModel.modify = function(userId){ //修改
        window.router.setRoute("/usermgr/usermodify/usermodify/"+userId);
        return false;
    };
    viewModel.openOne = function(){//单个启用
        var data = {
            userId:[this.userId],
            tenantId:$tenantId
        }
        $.ajax({
            type : 'post',
            dataType : 'json',
            data:data,
            url : $ctx + openAUrl,
            success : function(data) {
                if (data.status==1){
                    dialogmin('启用成功!')
                    viewModel.data.content([]);
                    viewModel.load(1);
                    clear();
                }else{
                    dialogmin(data.msg||'网络请求失败')
                }
            },
            error : function(XMLHttpRequest, textStatus, errorThrown) {
                dialogmin("调用服务报错!!");
            }
        });
        return false;
    };
        viewModel.closeOne = function(){//单个停用
            var data = {
                userId:[this.userId],
                tenantId:$tenantId
            }
            $.ajax({
                type : 'post',
                dataType : 'json',
                data:data,
                url : $ctx + closeAUrl,
                success : function(data) {
                    if (data.status==1){
                        dialogmin('停用成功!')
                        viewModel.data.content([]);
                        viewModel.load(1);
                        clear();
                       // console.log(viewModel.data.content())
                    }else{
                        dialogmin(data.msg||'网络请求失败')
                    }
                },
                error : function(XMLHttpRequest, textStatus, errorThrown) {
                    dialogmin("调用服务报错!!");
                }
            });
            return false;
        };
    viewModel.open = function(){//批量启用 
        var data = {
            userId:viewModel.deleteId,
            tenantId:$tenantId
        }

        if(data.userId==""){
            dialogmin('请选择用户!');
            return false;
        }
        $.ajax({
            type : 'post',
            dataType : 'json',
            data:data,

            //traditional:true,

            url : $ctx + openAUrl,
            success : function(data) {
                if (data.status==1){
                    dialogmin('启用成功!')
                    viewModel.data.content([]);
                    viewModel.load(1);
                    clear();
                }else{
                    dialogmin(data.msg||'网络请求失败')
                }
            },
            error : function(XMLHttpRequest, textStatus, errorThrown) {
                dialogmin("调用服务报错!!");
            }
        });
        return false;
    };
    viewModel.close = function(){ //批量停用
        var data = {
            userId:viewModel.deleteId
        }
        if(data.userId==""){
            dialogmin('请选择用户!');
            return false;
        }
        $.ajax({
            type : 'post',
            dataType : 'json',
            data:data,
            url : $ctx + closeAUrl,
            success : function(data) {
                if (data.status==1){
                    dialogmin('停用成功!')
                    viewModel.data.content([]);
                    viewModel.load(1);
                    clear();
                }else{
                    dialogmin(data.msg||'网络请求失败')
                }
            },
            error : function(XMLHttpRequest, textStatus, errorThrown) {
                dialogmin("调用服务报错!!");
            }
        });
        return false;
    };
    viewModel.deleteA = function(){ //批量删除

        var data = {
            userId:viewModel.deleteId

        }
        if(data.userId==""){
            dialogmin('请选择用户!');
            return false;
        }
        dialogminBack('批量删除','是否删除已选择的用户？',function(isok) {
            if (isok) {
                $.ajax({
                    type: 'post',
                    data: data,
                    //contentType: 'application/json',
                    url: $ctx + deleteAUrl,
                    dataType: 'json',
                    success: function (data) {
                        if (data.status == 1) {
                            dialogmin('删除成功!')
                            viewModel.data.content([]);
                            viewModel.load(1);
                            clear();
                        } else {
                            dialogmin(data.msg || '网络请求失败')
                        }
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        dialogmin("调用服务报错!!");

                    }
                });
            }
        });
        return false;
    };
    viewModel.del = function(userId) {//单个删除

        var userID = this.userId;
        dialogminBack('删除','是否确认删除？',function(isok){
            if(isok){
                $.ajax({
                    type : 'delete',
                    dataType : 'json',
                    async : false,
                    data:{userId:userID},
                    url : $ctx + deleteUrl+"?userId="+userID,
                    success : function(data) {
                        if (data.status==1){
                            dialogmin('删除成功!')
                            viewModel.data.content([]);
                            viewModel.load(1);
                        }else{
                            dialogmin(data.msg||'网络请求失败')
                        }
                    },
                    error : function(XMLHttpRequest, textStatus, errorThrown) {
                        dialogmin("调用服务报错!!");
                    }
                });
            }
        });
        return false;
    }
    viewModel.reset = function() {//密码重置
       // e.stopPropagation();
        //e.preventDefault();
        var userID = this.userId;
        dialogminBack('密码重置','是否确认重置？',function(isok){
            if(isok){
                $.ajax({
                    type : 'post',
                    dataType : 'json',
                    data:{userId:userID},
                    url : $ctx + resetUrl+"?userId="+userID,
                    success : function(data) {
                        if (data.status==1){
                            dialogmin('重置成功!')
                           // viewModel.data.content([]);
                            //viewModel.load(1);
                        }else{
                            dialogmin(data.msg||'网络请求失败')
                        }
                    },
                    error : function(XMLHttpRequest, textStatus, errorThrown) {
                        dialogmin("调用服务报错!!");
                    }
                });
            }
         });


    };
    viewModel.checkAll =function(){

        $(".checkAll").off().on('click',function(){
            var _this = $(this);
            if(_this.find(".check_box").hasClass("ischoose")){
                $(".check_box").removeClass("ischoose");
                $(".check_box i").removeClass("icon-confirm");
                viewModel.deleteId=[];
            }else{
                $(".check_box").addClass("ischoose");
                $(".check_box i").addClass("icon-confirm");
                chooseAll();
            }

        });
        function chooseAll(){
            var content = viewModel.data.content();
            var userId = [];
            for(var i=0;i<content.length;i++){
                userId.push(content[i].userId)
            };
            viewModel.deleteId = userId;
        }

    };
    viewModel.loadMore = function(){
        var num = viewModel.data.number()+1;
        if(num>viewModel.data.totalPages()){
            $(".loadMore").html("")
        }else{

            $(".arrow_up").show();
            viewModel.load(num);
        }

    };
    viewModel.displayedit = function(){

        $(".list_top").on('click',function(){
            $(".dismodify").click();
            var parent = $(".user_list").find("li");
            //console.log(parent.find(".u_setting1").is(':visible'))
            parent.find(".u_setting").hide();
            parent.find(".iconfont").show();
        })
        $(".list_top input").click(function(e){
            e.stopPropagation();
            $(this).focus();
        })
    }
    viewModel.edituser =function(){
        $(".edituser").off().on('click',function(){
            $(this).parents("li").find("input").addClass("editthis").removeAttr("readonly");
            $(this).parents(".u_setting1").hide();
            $(this).parents("li").find(".u_setting2").show();
        })

    };
    viewModel.load = function(pageIndex){
        //$(".loadMore").html("<i class='iconfont icon-arrowicon'></i>加载更多…");
        var winH  = document.documentElement.clientHeight || document.body.clientHeight;
       // console.log(winH)
        var viewps = (winH-160)/154;
        if(parseInt(viewps)==0){
            viewps = 1;
        }
        var queryData = {
            search_name:"",
            ps: parseInt(viewps),     //page size 每页显示条数
            pn: pageIndex,    //page num 当前页数
            systemId:$systemId
        };
        $(".form-search").find(".input_search").each(function(){
            queryData.search_name = encodeURI(this.value);
        });
//        var res = {
//            "status" : 1,
//            "users" : {
//                "content" : [ {
//                    "apps" : "云采超市,友云彩",
//                    "authed" : false,
//                    "companyId" : "",
//                    "departmentId" : "",
//                    "lastLoginDate" : "",
//                    "registerDate" : "2016-06-15 15:00:06",
//                    "sourceId" : "本地",
//                    "systemId" : "ipu",
//                    "tenantId" : "w8cby0qz",
//                    "typeId" : "普通用户",
//                    "userAvator" : "",
//                    "userCode" : "mac0615",
//                    "userEmail" : "",
//                    "userId" : "68b6786c-5827-4e33-aff0-0331d47a8873",
//                    "userMobile" : "13623238239",
//                    "name" : "mac0615",
//                    "userStates" : "启用",
//                    "versionNum" : 0
//                } ],
//                "first" : true,
//                "firstPage" : true,
//                "last" : false,
//                "lastPage" : false,
//                "number" : 0,
//                "numberOfElements" : 1,
//                "size" : 1,
//                "sort" : { },
//                "totalElements" : 37,
//                "totalPages" : 37
//            }
//        };
//        if(res.status==1){
//            viewModel.isloaded=false;
//            if(viewModel.data.content().length==0){
//                viewModel.data.content(res.users.content);
//            }else{
//                var allcontent = viewModel.data.content().concat(res.users.content);
//
//                viewModel.data.content(allcontent);
//            }
//            viewModel.data.number(res.users.number+1);
//            viewModel.data.totalPages(res.users.totalPages);
//            viewModel.data.totalElements(res.users.totalElements);
//            if(queryData.ps>=res.users.totalElements || res.users.totalPages ==queryData.pn){
//                $(".loadMore").html("");
//            }
//            setTimeout(function(){
//                viewModel.scrollLoad();
//                viewModel.showSetting();
//                viewModel.edituser();
//                viewModel.dismodify();
//                viewModel.checkAll();
//                viewModel.checkoneId();
//                viewModel.displayedit();
//            },0)
//        }else{
//            dialogmin("网络错误!!");
//        }
        $.ajax({
            type : 'get',
            url : $ctx + this.pageUrl,
            data : queryData,
            cache:false,
            dataType: 'json',
            contentType: 'application/json',
            success : function(res) {

                if(res.status==1){
                    viewModel.isloaded=false;
                    if(viewModel.data.content().length==0){
                        viewModel.data.content(res.users.content);
                    }else{
                        var allcontent = viewModel.data.content().concat(res.users.content);

                        viewModel.data.content(allcontent);
                    }
                    viewModel.data.number(res.users.number+1);
                    viewModel.data.totalPages(res.users.totalPages);
                    viewModel.data.totalElements(res.users.totalElements);
                    if(res.users.number==0){
                        $(".loadMore").html("<i class='iconfont icon-arrowicon'></i>加载更多…")
                    }
                    if(queryData.ps>=res.users.totalElements || res.users.totalPages ==queryData.pn){
                        $(".loadMore").html("");
                    }
                    setTimeout(function(){
                        viewModel.scrollLoad();
                        viewModel.showSetting();
                        viewModel.edituser();
                        viewModel.dismodify();
                        viewModel.checkAll();
                        viewModel.checkoneId();
                        viewModel.displayedit();
                    },0)
                }else{
                    dialogmin("网络错误!!");
                }
            }
        });

    };
    viewModel.checkoneId = function(){
        $(".user_list").find(".check_box").off().on('click',function(){

            var _this =$(this);
                var userId = _this.attr("data-id");
                if(_this.hasClass("ischoose")){
                    _this.removeClass("ischoose");
                    _this.find("i").removeClass("icon-confirm");
                    //console.log(viewModel.deleteId)
                    for(var i=0;i<viewModel.deleteId.length;i++){
                        if(viewModel.deleteId[i]===userId){
                            viewModel.deleteId.splice(i,1);
                            i--;
                        }
                    }
                }else{
                    _this.find("i").addClass("icon-confirm");
                    _this.addClass("ischoose");
                    viewModel.deleteId.push(userId);
                }
            });

    }
    viewModel.showSetting = function(){
        $(".icon-moreicon").off().on('click',function(){
            $(".icon-moreicon").show();
            $(".dismodify").click();
            $(".u_setting").hide();
            $(this).hide();
            $(this).prev(".u_setting1").show()
        });
    };
    viewModel.modifyuser = function($event){
            var queryData = {
            	userCode: $event.userCode,
                name: $event.name,
                phone: $event.userMobile,
                email:$event.userEmail,
                tenantId:$tenantId,
                userId:$event.userId
            };
            $.ajax({
                type : 'post',
                dataType : 'json',
                async : false,
                data : queryData,
                url : $ctx + modifyUrl,
                success : function(data) {
                    if (data.status==1){
                        dialogmin("修改成功");
                        viewModel.data.content([]);
                        viewModel.load(1);
                    }else{
                        dialogmin(data.msg);
                    }
                },
                error : function(XMLHttpRequest, textStatus, errorThrown) {
                    dialogmin("调用服务报错!!");
                }
            });

    };
    viewModel.dismodify = function(){
        $(".dismodify").off().on('click',function(){
            $(this).parent().hide();
            $(this).parent().next(".u_setting1").show();
            $(this).parents("li").find("input").removeClass("editthis").attr("readonly","readonly")

        });
    };
    viewModel.scrollLoad = function(){
        var height = $(window).height();
        var body;
        if(navigator.userAgent.indexOf("Firefox")>0 || navigator.userAgent.indexOf("MSIE")>0){
            body = document.documentElement;
        }else{
            body = document.body;
        }
        var isFinish = true;
        var scrollFunc = function(e){
            if(isFinish){
                var scrollTop = body.scrollTop;
                e = e || window.event;
                if((e.wheelDelta<0|| e.detail>0) && scrollTop>=0 && scrollTop==$(document).height()-height){
                    if(viewModel.isloaded==false){
                        viewModel.loadMore();
                        viewModel.isloaded=true;
                    }
                }else if((e.wheelDelta>0 || e.detail<0) && scrollTop>=height && scrollTop<=height+20){
                    //scroll(0);
                }
            }

        };
        if(navigator.userAgent.indexOf("Firefox")>0){
            if(document.addEventListener){
                document.addEventListener('DOMMouseScroll',scrollFunc,false);
            }
        }else{
            document.onmousewheel = scrollFunc;
        }
    };
    viewModel.searchPage = function() {
        viewModel.data.content([]);
        this.load(1);
    }
    var clear = function(){
        viewModel.deleteId = [];
        $("#checkuser").find(".check_box").removeClass("ischoose");
        $(".checkAll").find(".check_box").removeClass("ischoose");
        $(".checkAll").find("i").removeClass("icon-confirm");
    };
    var init = function() {
        var pageNum = viewModel.data.number();
        if(pageNum > 0){
            viewModel.load(pageNum);
        } else {
            viewModel.load(1);
        };

    };
        init();
        ko.applyBindings(viewModel,document.getElementById("userpageDomNode"));

/*
    return {
        'model' : viewModel,
        'template' : template,
        'init' : init
    };*/

});