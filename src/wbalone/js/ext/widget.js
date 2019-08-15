/**
 * Created by chief on 2015/10/21.
 */

define(function(require, module, exports ){
    var template = require('art');
    var minlayout = require('text!../../pages/widget.html');
    var init = function(options){
        var options = $.extend({},options);
        $(function(){

            function evenInit(){
                $('#widgetList input').placeholder();
                $('.btn-back').on('click',function(){
                    $('#content').removeAttr('selectType');
                });
                $('#type').val($('#content').attr('selectType'));
                $('#searchBtn').on('click',function(){
                    getWidgets();
                });
                $('#searchBtn').prev().on('focus',function(){
                    $('#searchBtn').css('color','rgb(107, 202, 234)');
                });
                $('#searchBtn').prev().on('blur',function(){
                    $('#searchBtn').css('color','rgb(180,180,180)');
                });
                /*$('#searchBtn').prev().on('input propertychange',function(){
                    var reg=/^[%_]+$/;
                    if(reg.test($(this).val())){
                        $(this).val('');
                    }
                });*/
                $('#widgetList .backBtn').on('click', function () {
                    window.location.href=window.location.protocol+'//'+window.location.host+window.location.pathname;
                });
                $('#type').on('change',function(){
                    $('#content').attr('selectType',$('#type').val());
                    getWidgets();
                });
                $('#category').on('change',function(){
                    getWidgets();
                });
                //禁止输入 所有符号
                $('#key').bind('keyup', function(event) {
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
                $("#key").blur(function () {
                    var value=$(this).val();
                    var msg=value.replace(/[^A-Za-z0-9\u4e00-\u9fa5]/g,"");
                    $(this).val(msg);
                });
                //
                $('#widgetList').on('focus', 'input', function () {
                    $(this).closest('form').find('#errorMessage').html('');
                });
                $('#widgetList').on('click', '#widget-create,#edit-widget,#copy-widget', function (e) {
                    if ($(e.target).attr('id') == 'widget-create' || $(e.target).attr('id') == 'edit-widget') {
                        $('#parentCode').val('');
                    }
                    e.preventDefault();
                    var data = {};
                    var element = $(this).closest('.site-items').find('.form-control');
                    $.each(element, function (i, item) {
                        var key = $(item).attr("name");
                        var value = $(item).val();
                        data[key] = value;
                    });

                    data = JSON.stringify(data);
                    var _this = this;

                    function checkForm() {
                        var fields = $(_this).closest('form').find('.field:visible');
                        var success = false;
                        $.each(fields, function (i, item) {
                            var input = $(item).next();
                            if ($.trim(input.val()) == "") {
                                $(_this).closest('form').find('#errorMessage').html('请填写必填项！');
                                success = true;
                                return false;
                            }
                        });
                        return success;
                    }

                    if (checkForm()) {
                        return false;
                    }


                    var url = contextRoot + '/widget/save';
                    if ($(this).attr('id') == 'edit-widget') {
                        var id = $('#examplePositionCenter').data('id');
                        url = contextRoot + '/widget/save/' + id;
                    }
                    else if ($(this).attr('id') == 'copy-widget') {
                        var parentCode = $('#parentCode').val();
                        url = contextRoot + '/widget/clone/' + parentCode;
                    }
                    $.ptAjax({
                        url: url,
                        dataType: 'json',
                        data: data,
                        type: 'post',
                        contentType: 'application/json',
                        success: function (res) {
                            if (res.status == '0') {
                                window.message(res.message,'error');
                                return false;
                            }else {
                                window.message();
                                $('.page-header-actions').removeClass('open');
                                if ($(_this).attr('id') == 'edit-widget') {
                                    $('#widget-body input').val('');
                                    $('#examplePositionCenter').modal('hide');
                                    return false;
                                } else if ($(_this).attr('id') == 'copy-widget') {
                                    window.message();
                                    $('#parentCode').val('');
                                    $('#copy-body input').val('');
                                    $('#copy').modal('hide');
                                    init(options);
                                    $('.modal-backdrop.fade.in').hide();
                                    $('body').removeClass('modal-open');
                                    return false;
                                } else {
                                    window.message();
                                    init(options);
                                }

                            }
                        },
                        error: function (XMLHttpRequest) {
                            errorLogin(XMLHttpRequest);
                        }
                    });

                });
            }

            function getCatels(value,flag){
                var value = value||'';
                $.ptAjax({
                    url: contextRoot + "/widget/catels",
                    dataType: 'json',
                    type: 'get',
                    contentType: 'application/json',
                    success: function (res) {
                        if(res.status=='1'){
                            if(res.data&&res.data.length){
                                var data=res.data;
                                var str = [];
                                var str1='<option value="">全部分类</option>';
                                $.each(data, function (i, item) {
                                    str.push('<option '+(item.id==value?"selected":"")+' value="' + item.id + '">' + item.name + '</option>');
                                    str1+='<option  '+(item.id==value?"selected":"")+' value="' + item.id + '">' + item.name + '</option>';
                                });
                                if(value=='create'){
                                    $('#create-category').html(str.join(''));
                                }
                                if(flag){
                                    $('.category-list').html(str.join(''));
                                }else{
                                    $('#category').html(str1);
                                }

                            }
                        }

                    },
                    error: function (XMLHttpRequest) {
                        errorLogin(XMLHttpRequest);
                }
                });
            }

            function getWidgets(pageIndex,pageSize){
                pageIndex=pageIndex||0;
                pageSize=pageSize||12;
                var category=$('#category').val()||'';
                var key=$('#key').val()||'';
                var type=$('#type').val()||'';
                var data={
                    "category":category,
                    "type":type,
                    "key":key,
                    "pageIndex":pageIndex,
                    "pageSize":pageSize
                };
                $.ptAjax({
                    url: contextRoot+'/widget/list',
                    dataType: 'json',
                    type:'post',
                    data:JSON.stringify(data),
                    contentType:'application/json',
                    success: function(res) {
                        var str = [];
                        var render = template.compile(minlayout);
                        if (res.data && res.data.content && res.data.content.length) {
                        var html = render({list: res.data.content, backUrl: options.backUrl});

                        function setScrollTop(scroll_top) {
                            document.body.scrollTop = scroll_top;
                            window.pageYOffset = scroll_top;
                            document.documentElement.scrollTop = scroll_top;

                        }

                        setScrollTop(0);
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



                        $('#widget-form input').placeholder();

                        $('.widget-content').data("list", res);
                        evenInit();
                        if (category) {
                            getCatels(category);
                        } else {
                            getCatels();
                        }
                        var pagination = document.getElementById('pagination');
                        var comp = new u.pagination({
                            el: pagination,
                            showState: false
                        });
                        comp.on('pageChange', function (pageIndex) {
                            getWidgets(pageIndex);
                        });
                        comp.update({
                            totalPages: res.data.totalPages,
                            pageSize: res.data.size,
                            currentPage: pageIndex ? pageIndex + 1 : '1',
                            totalCount: res.data.totalElements
                        });
                        if(pageIndex==0||pageIndex=='0'){
                            if(res.data.totalElements>=12){
                                $('#pagination').removeClass('hide').parents('.paginate-box').removeClass('hide');
                            }else{
                                $('#pagination').parents('.paginate-box').addClass('hide');
                            }
                        }

                        $('.wtype').on('change', function () {
                            edit($(this));
                        });




                        $('#examplePositionCenter').on('hidden.bs.modal', function () {
                            init(options);
                        });



                        $('#widgetDel .btn-del').click(function () {
                            var id = $(this).attr("data-id");
                            var tag = $(this).attr("data-tag");
                            /*var data = {id: id};
                            data = JSON.stringify(data);*/
                            $.ptAjax({
                                url: contextRoot + "/widget/delete/" + id,
                                dataType: 'json',
                                type: 'get',
                                contentType: 'application/json',
                                success: function (res) {
                                    if (res.status == "0") {
                                        $('#widgetDel').modal('hide');
                                        window.message(res.message,'error');
                                        return false;
                                    }
                                    else {
                                        window.message();
                                        $('#widgetDel').on('hidden.bs.modal', function () {
                                            init(options);
                                        });
                                        $('#widgetDel').modal('hide');
                                    }

                                    //$(_this).closest('.col-md-3').remove();
                                },
                                error: function (XMLHttpRequest) {
                                    errorLogin(XMLHttpRequest);
                                }
                            });
                        });


                        $('.widget-del').on('click', function () {
                            var _this = this;
                            var id = $(this).attr("data-id");
                            var tag = $(this).attr("data-tag");
                            $('#widgetDel').modal('show');
                            $('#widgetDel .btn-del').attr('data-id', id);
                            $('#widgetDel .btn-del').attr('data-tag', tag);
                        });

                        function edit(element) {
                            var _this = element;
                            var val = $(_this).val();
                            var parent = $(_this).closest('.site-items');

                            if (val == 'htmlfragment') {
                                parent.find('.wtype-url,.wtype-xml,.wtype-js').addClass('hide');
                                parent.find('.wtype-html').removeClass('hide');
                            }
                            else if (val.search(/(url)/) != -1) {
                                parent.find('.wtype-html,.wtype-xml,.wtype-js').addClass('hide');
                                parent.find('.wtype-url').removeClass('hide');
                            }
                            else if (val.search(/(xml)/) != -1) {
                                parent.find('.wtype-html,.wtype-url,.wtype-js').addClass('hide');
                                parent.find('.wtype-xml').removeClass('hide').find('.control-label').text(val)
                            }
                            else if (val.search(/(js)/) != -1) {
                                parent.find('.wtype-html,.wtype-url,.wtype-xml').addClass('hide');
                                parent.find('.wtype-js').removeClass('hide').find('.control-label').text(val)
                            }
                        }

                        $('.widget-edit').on('click', function () {
                            $('#parentCode').val('');
                            var _this = this;
                            var data = $(".widget-content").data("list");

                            var createwidget = require('text!../../pages/createwidget.html');


                            var pkWidget = $(this).attr("data-id");
                            var items = {};

                            $.each(data.data.content, function (i, item) {
                                if (item.code == pkWidget) {
                                    items = item;
                                }
                            });
                            $('#examplePositionCenter').data('id', items.code);
                            var render = template.compile(createwidget);
                            var html = render({item: items} );
                            $('.widget-edit-body').html(html);
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
                            $('#examplePositionCenter input').placeholder();
                            $('select[name="wtype"]').attr('disabled', true);
                            getCatels(items.category,true);
                            $('#examplePositionCenter .wtype').on('change', function () {
                                edit($(this));
                            });
                            $('.wtype-url').show().find('.control-label').text($('#wtype').val());

                        });
                        $('.create-widget-btn').on('click', function () {
                            $('select[name="wtype"]').removeAttr('disabled');
                            $('#widget-list').find('input').removeAttr('disabled');
                            getCatels('create');
                        });
                        $('.widget-copy').on('click', function () {
                            var _this = this;
                            var data = $(".widget-content").data("list");

                            var createwidget = require('text!../../pages/createwidget.html');


                            var pkWidget = $(this).attr("data-id");
                            var items = {};

                            $.each(data.data.content, function (i, item) {
                                if (item.code == pkWidget) {
                                    items = item;
                                }
                            });

                            $('#copy').data('id', items.code);
                            $('#parentCode').val(items.code);
                            var render = template.compile(createwidget);
                            var html = render({item: items});
                            $('.widget-edit-body').html(html);
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
                            $('input[name="code"]').removeAttr('disabled');
                            $('select[name="wtype"]').attr('disabled', true);
                            $('input[name="url"]').attr('disabled', true);
                            $('input[name="xml"]').attr('disabled', true);
                            $('textarea[name="htmlfragment"]').attr('disabled', true);
                            $('button[id="edit-widget"]').attr('id', 'copy-widget');
                            $('#copy input').placeholder();

                            getCatels();
                            $('#copy .wtype').on('change', function () {
                                edit($(this));
                            });
                            $('.wtype-url').show().find('.control-label').text($('#wtype').val());

                        });
                        $('#copy').find('.close').on('click', function () {
                            $('#parentCode').val('')
                            $('select[name="wtype"]').removeAttr('disabled');
                            $('input[name="url"]').removeAttr('disabled');
                            $('input[name="xml"]').removeAttr('disabled');
                            $('textarea[name="htmlfragment"]').removeAttr('disabled');
                        });
                        $('#copy').on('click', function (e) {
                            if ($(e.target).hasClass('btn')) {
                                $('select[name="wtype"]').removeAttr('disabled');
                                $('input[name="url"]').removeAttr('disabled');
                                $('input[name="xml"]').removeAttr('disabled');
                                $('textarea[name="htmlfragment"]').removeAttr('disabled');
                            }
                        });


                    }else{
                            var html = render({list:[], backUrl: options.backUrl});
                            $('#content').html(html);
                            if (category) {
                                getCatels(category);
                            } else {
                                getCatels();
                            };
                            evenInit();
                            $('.page-content').html('').addClass('no-widget');
                        }
                    }
                });
            }
            getWidgets();

        })
    };


    return {
        init:init
    }
});