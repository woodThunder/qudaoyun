define(function(require, module, exports ){
var sites = require('text!../../pages/layoutList.html');
var art = require('art');
var init = function () {
    var layoutInit = arguments.callee;

    function loadData(key, pageIndex, pageSize) {
        pageIndex = pageIndex || '0';
        pageSize = pageSize || '10';
        var method = 'get';
        var url = contextRoot + '/layout/list?pageIndex=' + pageIndex + '&pageSize=' + pageSize + '&r=' + Math.random();
        var data = '';
        if (key) {
            method = 'post';
            url = contextRoot + '/layout/query';
            var obj = {"val": key, "pageIndex": pageIndex, "pageSize": pageSize};
            data = JSON.stringify(obj);
        }
        $.ptAjax({
            url: url,
            dataType: 'json',
            type: method,
            data: data,
            contentType: 'application/json',
            success: function (res) {
                var datas = [];
                if (res.status == '1') {
                    if (res.data && res.data.content && res.data.content.length) {
                        for (var i = 0; i < res.data.content.length; i++) {
                            if (res.data.content[i].tag) {
                                res.data.content[i].tag = encodeURIComponent(res.data.content[i].tag);
                            }
                            if (res.data.content[i].isenable) {
                                res.data.content[i].isenable = res.data.content[i].isenable == 'N' ? '否' : '是';
                            }
                        }
                        datas = res.data.content;
                    }
                    var data = {list: datas};
                    var render = art.compile(sites);
                    var html = render(data);
                    $('#content').html(html);
                    var reg=/MSIE([\W\w]+?);/;
                    var agent=window.navigator.userAgent;
                    if(!!window.ActiveXObject || "ActiveXObject" in window){
                        if(reg.exec(agent)){
                            if(reg.exec(agent)[1]){
                                if(reg.exec(agent)[1].indexOf('9')!=-1){
                                    $('select').addClass('portal-select-ie9');
                                }
                            }
                        }
                    }
                    $('#layoutList input').placeholder();

                    var ipad = navigator.userAgent.indexOf("iPad");

                    if (ipad != -1 || getBrowserVersion() == 'IE8') {
                        $('#site-save-open').hide();
                        $('.page-content .icon-icon4').hide();
                        $('.page-content .icons-l').removeClass('icons-l');
                    }
                    eventInit();
                    var page = document.getElementById('layoutPage');
                    var comp = new u.pagination({el: page, jumppage: true});
                    if(res.data){
                        comp.update({
                            totalPages: res.data.totalPages||Math.ceil(res.data.length/pageSize),
                            pageSize: res.data.size||pageSize,
                            currentPage: pageIndex ? pageIndex + 1 : '1',
                            totalCount: res.data.totalElements||res.data.length
                        });
                    }else{
                        var str='<tr><td colspan="8" class="no-data">暂时还没有数据~！</td></tr>';
                        $('#layoutList').find('.u-table').find('tbody').html(str);
                        $('#layoutPages').hide();
                        return;
                    }
                    comp.on('pageChange', function (pageIndex) {
                        loadData($('#searchBtn').prev().val(), pageIndex,$('#layoutPage .page_z').val())
                    });
                    comp.on('sizeChange', function (pageSize) {
                        loadData($('#searchBtn').prev().val(), 0, pageSize)
                    });
                    if(pageIndex==0||pageIndex=='0'){
                        if(res.data.totalElements>=10){
                            $('#layoutPages').show();
                        }else{
                            $('#layoutPages').hide();
                        }
                        if(res.data.content.length==0){
                            var str='<tr><td colspan="8" class="no-data">暂时还没有数据~！</td></tr>';
                            $('#layoutList').find('.u-table').find('tbody').html(str);
                            $('#layoutPages').hide();
                        }
                    }

                } else {
                    alert(res.message);
                }

            },
            error: function (XMLHttpRequest) {
                errorLogin(XMLHttpRequest);
            }
        });
    }

    /**
     * 确认删除布局
     * @param id  布局标示
     */
    function del(id) {
        $.ptAjax({
            url: contextRoot + "/layout/del/" + id +'?r=' + Math.random(),
            dataType: 'json',
            type: 'get',
            async: false,
            contentType: 'application/json',
            success: function (res) {
                if (res.status == '1') {
                    window.message();
                    layoutInit();
                    $('body').removeClass('modal-open');
                } else {
                    layoutInit();
                    window.message(res.message,'error');
                };
                $('.modal-backdrop').remove();
            },
            error: function (XMLHttpRequest) {
                errorLogin(XMLHttpRequest);
            }
        });
    }

    function eventInit() {
        //禁止输入 所有符号
        $('#layoutList .search input.u-form-control').bind('keyup', function(event) {
            var value=$(this).val();
            var reg=/[^A-Za-z0-9\u4e00-\u9fa5]/;
            if(reg.test(value)){
                $(this).val(value.replace(/[^A-Za-z0-9\u4e00-\u9fa5]/g,''));
            }
            if(event.keyCode==13){
                $("#searchBtn").trigger("click");
            }
        });
        //失去焦点去掉所有特殊符号
        $('#layoutList .search input.u-form-control').blur(function () {
            var value=$(this).val();
            var msg=value.replace(/[^A-Za-z0-9\u4e00-\u9fa5]/g,"");
            $(this).val(msg);
        });
        //
        $('#isDefaultIndex').find('.u-radio').on('click',function(e){
            if(e.target.nodeName=='LABEL'){
                $(e.target).addClass('is-checked').siblings().removeClass('is-checked');
            }else{
                $(e.target).parents('label').addClass('is-checked').siblings().removeClass('is-checked');
            }
        });
        $('#layoutMenu').find('.input-close').on('click',function(e){
            $(this).parents('.u-form-group').find('input').val('');
        });

        $('#site-save-open,#site-save').on('click', function (e) {
            e.preventDefault();
            var _this = $(this);
            var name = $('#exampleName').val();
            var code = $('#code').val();
            var data = {name: name, id: code};
            var parm = JSON.stringify(data);


            var inputs = $('.dropdown-layout input');

            inputs.focus(function () {
                $('#errorMessage').html("");
            });
            function checkForm() {
                var success = false;
                $.each(inputs, function (i, item) {
                    if ($.trim($(item).val()) == '') {
                        $('#errorMessage').html('请输入必填项！');
                        success = true;
                        return true;
                    }
                })
                return success;
            }

            if (checkForm()) {
                return false;
            }

            $.ptAjax({
                url: contextRoot + "/layout/save",
                dataType: 'json',
                type: 'post',
                data: parm,
                contentType: 'application/json',
                success: function (res) {
                    var minlayout = require('text!../../pages/minlayout.html');
                    if (res.status == '1') {
                        window.message();
                    }else {
                        window.message(res.message,'error');
                        return false;
                    }
                    var data = [
                        {
                            "id": res.data.id,
                            "name": name
                        }
                    ];
                    var render = art.compile(minlayout);
                    var html = render({list: data});

                    if (_this.attr('id') == 'site-save-open' && res.status == "1") {
                        setTimeout(function () {
                            location.href = '#/layout/' + res.data.id;
                            location.href = '#/layout/' + res.data.id + '/' + (res.data.tag || 'tag') + '/back/layouts';
                        }, 100)
                        layoutInit();
                    }
                    else {
                        layoutInit();
                    }
                },
                error: function (XMLHttpRequest) {
                    errorLogin(XMLHttpRequest);
                }
            });
        });
        $('#searchBtn').on('click', function () {
            loadData($(this).prev().val());
        });
        $('#layoutList .backBtn').on('click', function () {
            window.location.href=window.location.protocol+'//'+window.location.host+window.location.pathname;
        });

        $('#layoutList').on('click', '.layout-del', function () {

            var parent = $(this).closest('.col-md-3');
            var id = $(this).attr("data-id");
            var tag = $(this).attr("data-tag");
            $('#layoutDel').modal('show');
            $('#layoutDel .btn-del').attr('data-id', id);
            $('#layoutDel .btn-del').attr('data-tag', tag);
        });
        $('#layoutList').on('click', '.layouts-edit', function () {
            window.md = u.dialog({id: 'leEdit', content: "#layoutEdit", hasCloseMenu: true});
            $('#layoutName').val($(this).attr('data-name'));
            $('#leTag').val($(this).attr('data-tag'));
            $('#start').val($(this).attr('data-isenable')=='是'?'Y':'N');
            $('#layoutEdit').find('.layout-ok').attr('data-id',$(this).attr('data-id'));
            $('#layoutEdit').find('.em').hide();
        });
        $('#layoutList').on('click', '.layouts-copy', function () {
            $('#layoutCopy').find('.em').hide();
            window.md = u.dialog({id: 'lcCopy', content: "#layoutCopy", hasCloseMenu: true});
            $('#lcName').val($(this).attr('data-name'));
            $('#lcCode').val($(this).attr('data-id'));
        });
        $('#layoutList').on('click', '.u-checkbox-outline', function (e) {
            if ($(e.target).parents('label').parent()[0].nodeName == 'TH') {
                if ($(e.target).parents('label').hasClass('is-checked')) {
                    $('.u-checkbox').removeClass('is-checked').parents('td').parents('tr').removeClass('layout-table-bg');
                } else {
                    $('.u-checkbox').addClass('is-checked').parents('td').parents('tr').addClass('layout-table-bg');
                }
            } else {
                if ($(e.target).parents('label').hasClass('is-checked')) {
                    $(e.target).parents('label').removeClass('is-checked').parents('tr').removeClass('layout-table-bg');
                } else {
                    $(e.target).parents('label').addClass('is-checked').parents('tr').addClass('layout-table-bg');
                }
            }
        });
        $('#layoutList').on('click', '.layout-application', function () {
            var id = $(this).attr('data-id');
            var name = $(this).attr('data-name');
            $('#name').val(name);
            $('#funcId').val(id);
            $('#icon').val('');
            $('#parentId').val('');
            $('#role').val('');
            window.md = u.dialog({id: 'leMenu', content: "#layoutMenu", hasCloseMenu: true});
            $("#layoutMenu").removeAttr('batch');
        });

        $('#layoutList .batch-del').on('click', function () {
            if($('#layoutList table tbody .is-checked').length>0){
                $('#layoutList table tbody .is-checked').each(function (i, v) {
                    $('#layoutDel').modal('show');
                    $('#layoutDel .btn-del').on('click', function () {
                        if ($(v).parent()[0].nodeName == 'TD') {
                            var id = $(v).attr('layout-id');
                            var tag = $(v).attr('layout-tag');
                            if (id)del(id);
                        }
                    })
                })
            }else{
                window.parent.message('请选择至少一条数据','warn');
            }
        });

        $('#layoutList .batch-application').on('click', function () {
            window.md = u.dialog({id: 'leMenu', content: "#layoutMenu", hasCloseMenu: true});
            $("#layoutMenu").attr('batch',true);
        });


        $('#layoutDel .btn-del').click(function () {
            var _this = this;
            var id = $(this).attr("data-id");
            var tag = $(this).attr("data-tag");
            var data = {id: id,tag:tag};
            data = JSON.stringify(data);
            $('#layoutDel').modal('show');
            $('#layoutDel').on('hidden.bs.modal', function () {
                del(id);
            });
            $('#layoutDel').modal('hide');
        });


        $('#layoutEdit').on('click', function (e) {
            if ($(e.target).parents('button').hasClass('layout-cancel') || $(e.target).hasClass('layout-cancel')) {
                $('.u-msg-close').trigger('click');
            } else if ($(e.target).parents('button').hasClass('layout-ok') || $(e.target).hasClass('layout-ok')) {
                if($('#start').val()&&$('#layoutName').val()){
                    $('#layoutEdit').find('.u-form-control-info').hide();
                }else{
                    $('#layoutEdit').find('.u-form-control-info').show();
                    return;
                }

                //var data='isenable='+$('#start').val()+'&name='+$('#layoutName').val()+'&tag='+$('#leTag').val();
                var data={
                    'isenable':$('#start').val()||'',
                    'name':$('#layoutName').val()||'',
                    'tag':$('#leTag').val()||'',
                    'id':$('#layoutEdit').find('.layout-ok').attr('data-id')
                };
                $.ptAjax({
                    url: contextRoot + '/layout/save/' + $('#layoutEdit').find('.layout-ok').attr('data-id'),
                    dataType: 'json',
                    type: 'post',
                    data: JSON.stringify(data),
                    contentType: 'application/json',
                    success: function (res) {
                        if (res.status == '1') {
                            window.message();
                            layoutInit();
                            $('#leEdit').find('.u-msg-close').trigger('click');
                        } else {
                            window.message(res.message,'error');
                        }

                    }
                });
            }
        });


        $('#layoutCopy').on('click', function (e) {
            if ($(e.target).parents('button').hasClass('lc-cancel') || $(e.target).hasClass('lc-cancel')) {
                $('.u-msg-close').trigger('click');
            } else if ($(e.target).parents('button').hasClass('lc-ok') || $(e.target).hasClass('lc-ok')) {
                if($('#lcName').val()){
                    $('#lcName').parents('.u-form-group').find('.u-form-control-info').hide();
                }else{
                    $('#lcName').parents('.u-form-group').find('.u-form-control-info').hide();
                    return;
                }
                if($('#lcCode').val()){
                    var reg=/[^A-Za-z0-9]/;
                    if(reg.test($('#lcCode').val())){
                        $('#lcCode').parents('.u-form-group').find('.u-form-control-info').show();
                        return;
                    }else{
                        $('#lcCode').parents('.u-form-group').find('.u-form-control-info').hide();
                    }
                }else{
                    $('#lcCode').parents('.u-form-group').find('.u-form-control-info').show();
                    return;
                }


                var data ='code='+$('#lcCode').val()+'&name='+$('#lcName').val();
                $.ptAjax({
                    url: contextRoot + '/layout/copy/' + $('#layoutList .layouts-copy').attr('data-id'),
                    dataType: 'json',
                    type: 'post',
                    data: data,
                    success: function (res) {
                        if (res.status == '1') {
                            window.message();
                            layoutInit();
                            $('#lcCopy').find('.u-msg-close').trigger('click');
                        } else {
                            window.message(res.message,'error');
                        }
                    }
                });
            }
        });


        /**
         * 加载角色列表
         */
        function lrLoad(){
            var roleName=$('#lrRoleName').val()||'';
            var roleCode=$('#lrRoleId').val()||'';
            $.ptAjax({
                url:contextRoot+'/roleMGT/listRolePage?pn=1&ps=99999&search_LIKE_roleName='+roleName+'&search_LIKE_roleCode='+roleCode,
                type: 'get',
                dataType: 'json',
                contentType: 'application/json',
                success:function(res){
                    $('#lr-data').html('');
                    if (res.status=='1'||res.status==1) {
                        if(res.data&&res.data.content&&res.data.content.length){
                            var str = '';
                            for (var i = 0; i <  res.data.content.length; i++) {
                                var data=res.data.content[i];
                                str += '<tr><td><input type="checkbox" value="'+data.id+'" roleCode="'+data.roleCode+'" roleName="'+data.roleName+'"></td><td>' + data.roleName + '</td><td>' + data.roleCode + '</td></tr>';
                            }
                            $('#lr-data').html(str);
                        }else{
                            $('#lr-data').html('<tr><td colspan="3" class="no-data">暂时还没有数据~！</td></tr>');
                        }
                    }else{
                        alert(res.msg);
                    }
                },
                error:function(res){
                    $('#lr-data').html('<tr><td colspan="3" class="no-data">暂时还没有数据~！</td></tr>');
                }
            });
        }

        /**
         * 加载菜单列表
         */
        function lmlLoad(){
            $.ptAjax({
                url:contextRoot+'/appmenumgr/appmenuLeafTreeList',
                type:'get',
                dataType:'json',
                contentType:'application/json',
                success:function(res){
                    if(res.status=='1'||res.status==1){
                        $('#parentId').html('');
                        var data=res.data;
                        if(data&&data.length){
                            var str='<option value="" selected>请选择</option>';
                            for(var i=0;i<data.length;i++){
                                var menu=data[i];
                                str+='<option value="'+menu.premenu.id+'">'+menu.premenu.name+'</option>';
                            }
                            $('#parentId').html(str);
                        }else{
                            var str='<option value="">暂时还没有数据~! </option>';
                            $('#parentId').html(str);
                        }
                    }else{
                        alert(res.msg);
                    }
                },
                error: function (err) {
                    var str='<option value="">暂时还没有数据~! </option>';
                    $('#parentId').html(str);
                }
            })
        }

        lmlLoad();
        var checks=[];//保存角色
        $('#layoutMenu').on('click', function (e) {
            if ($(e.target).parents('button').hasClass('lm-cancel') || $(e.target).hasClass('lm-cancel')) {
                $('.u-msg-close').trigger('click');
                $('#layoutCopy').find('.em').hide();
            } else if($(e.target).attr('id')=='role'){
                window.md = u.dialog({id: 'lrEdit', content: "#layoutRole", hasCloseMenu: true});
                lrLoad();
            }else if ($(e.target).parents('button').hasClass('lm-ok') || $(e.target).hasClass('lm-ok')) {
                publishMenu($("#layoutMenu").attr('batch'));
            }else if($(e.target).attr('id')=='icon'){
                if($('#layoutIcon').is(':hidden')){
                    $('#layoutIcon').show();
                }
            }else if($(e.target).parents('div').attr('id')=='layoutIcon'){
                $('#icon').val($(e.target).attr('icon'));
                $('#layoutIcon').hide();
            }else if($(e.target).hasClass('icon-close')){
                $('#layoutIcon').hide();
            }
        });


        /**
         * 加载图标
         */
        function loadIcon(){
            for(var i=0;i<window.icons.length;i++){
                var icon=window.icons[i];
                ajaxLoad(icon.fontfamily,icon.path);
            }
        };
        function ajaxLoad(fontfamily,path){
            $.ptAjax({
                url:path,
                type:'get',
                async:'false',
                success:function(res){
                    var reg=/\/\*start\*\/([\W\w]+)\/\*end\*\//;
                    var str=reg.exec(res)[1];
                    var iconAry=str.split('.');
                    var strHtml='';
                    for(var i=1;i<iconAry.length;i++){
                        var temp=iconAry[i].split(':')[0];
                        var iconName=fontfamily+' '+temp;
                        strHtml+='<span class="'+iconName+' u-tag u-tag-default u-tag-round" icon="'+iconName+'"></span>';
                    }
                    $('#layoutIcon').append(strHtml);
                }
            })
        }
        loadIcon();
        //发布到菜单提交
        function publishMenu(batchFlag){
            var flag=true;
            $('#layoutMenu').find('.field').next().each(function(i,v){
                if(!$(v).val()){
                    if($(v).hasClass('dropdown')){
                        if(!$('#labelsShow').attr('code')){
                            $(v).parents('.u-form-group').find('.u-form-control-info').show();
                            flag=false;
                            return false;
                        }else{
                            $(v).parents('.u-form-group').find('.u-form-control-info').hide();
                            flag=true;
                            return true;
                        }
                    } else{
                        $(v).parents('.u-form-group').find('.u-form-control-info').show();
                        flag=false;
                        return false;
                    }
                }else{
                    if($(v).attr('id')=='appCode'||$(v).attr('id')=='funcId'){
                        var reg=/[^A-Z0-9a-z]/;
                        if(reg.test($(v).val())){
                            $(v).parents('.u-form-group').find('.u-form-control-info').show();
                            flag=false;
                            return false;
                        }else{
                            $(v).parents('.u-form-group').find('.u-form-control-info').hide();
                            flag=true;
                            return true;
                        }
                    }else{
                        $(v).parents('.u-form-group').find('.u-form-control-info').hide();
                        flag=true;
                        return true;
                    }

                }
            });
            if(flag){
                var menu=[];
                if(batchFlag){
                    $('#layoutList').find('table tbody .is-checked').each(function(i,v){
                        var code=$(v).parents('tr').find('td').eq(2).html();
                        var name=$(v).parents('tr').find('td').eq(1).html();
                        var obj={
                            "name": name,
                            "funcId": code,
                            "icon": $("#icon").val(),
                            "parentId": $("#parentId").val(),
                            "sort": 1,
                            "openview": $("#openview").val(),
                            "layoutId":code,
                            "isDefaultIndex":$('#isDefaultIndex').find('.is-checked').find('input').val(),
                            "groupId":'GROUP0000000005',
                            "areaId":'274833475802f3ccc5a75cedcac6f239'
                        };
                        menu.push(obj);
                    });
                }else{
                    menu=[{
                        "name": $("#name").val(),
                        "funcId": $("#funcId").val(),
                        "icon": $("#icon").val(),
                        "parentId": $("#parentId").val(),
                        "sort": 1,
                        "openview": $("#openview").val(),
                        "layoutId":$("#funcId").val(),
                        "isDefaultIndex":$('#isDefaultIndex').find('.is-checked').find('input').val(),
                        "groupId":'GROUP0000000005',
                        "areaId":'274833475802f3ccc5a75cedcac6f239'
                    }];
                }
                var json={
                    "groupId":'GROUP0000000005',
                    "areaId":'274833475802f3ccc5a75cedcac6f239',
                    "menu": menu,
                    "roles": checks
                };
                $.ptAjax({
                    url:contextRoot+'/wbalyout/layoutToMenu',
                    type:'post',
                    dataType:'json',
                    data:JSON.stringify(json),
                    contentType:'application/json',
                    success:function(res){
                        if(res.status=='1'){
                            window.message();
                        }else{
                            window.message(res.message,'error');
                        }
                        $('#leMenu').find('.u-msg-close').trigger('click');
                    },
                    error:function(err){
                        errorLogin(err);
                    }
                })
            }
        }

        $('#layoutRole').on('click',  function (e) {
            if($(e.target).hasClass('lr-ok')||$(e.target).parents('button').hasClass('lr-ok')){
                var names='';
                if(!$('#lr-data').find('input:checked').length){
                    alert('请选择至少一个角色');
                    return;
                }
                $('#lr-data').find('input:checked').each(function(i,v){
                    var check={'id':$(v).val(),'roleCode':$(v).attr('roleCode')};
                    checks.push(check);
                    names+=$(v).attr('roleName')+' ';
                });
                $('#role').val(names);
                $('#lrEdit').find('.u-msg-close').trigger('click');
            }else if($(e.target).hasClass('lr-cancel')||$(e.target).parents('button').hasClass('lr-cancel')){
                $('#lrEdit').find('.u-msg-close').trigger('click');
            }else if($(e.target).attr('id')=='lrSearch'){
                lrLoad();
            }
        });


    }
    loadData();
};
    return {
        init:init
    }
});