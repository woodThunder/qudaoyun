/**
 * Created by chief on 15/11/10.
 */
define([], function () {
    var Toolbar = function (containter, options) {
        var options = options || {};
        this.options = {
            viewId: null,
            layoutId: null,
            layout: {}
        };

        this.containter = containter;
        this.options = $.extend(this.options, options);


        this.createHtml();
        this.init();
    };
    /**
     * 过滤查询到的widget
     * @param resWidget 结果widget
     */
    var filterWidget=function (resWidget) {
        var widgets=$('#designerContent').find('.well');
        var widgetsId={};
        $.each(widgets,function (i, v) {
            widgetsId[($(v).attr('data-id'))]='';
        });
        var newRes=resWidget.filter(function (item) {
            if(!(item.code in widgetsId)) return item;
        });
        return newRes;
    };
    Toolbar.prototype = {
        createHtml: function () {

            var html =
                '<div id="tool-panel" class="sidebar-tools pannel">' +
                '<ul id="tool-panel-icons" class="icon-list">' +
                '<li data-pack="page" class="ion-android-settings ion-page" style="display:none;"></li>' +
                '<li title="布局模板" aria-hidden="true" data-pack="layout"><i class="iconfont icon-template"></i><b>模板</b></li>' +
                '<li data-pack="add"><i class="iconfont icon-component"></i><b>小部件</b></li>' +
                '<li id="layoutSave" data-pack="save"><i class="portalfont icon-baocun"></i><b>保存</b></li>'+
                '<li id="layoutReset" data-pack="reset" ><i class="portalfont icon-zhongzhi"></i><b>重置</b></li>'+
                '<li data-pack="close" data-dismiss="modal" aria-label="Close"><i class="iconfont icon-cancel"></i><b>关闭</b></li>' +
                '<li data-tags="camera, photo" data-pack="preview" class="ion-android-image" data-toggle="modal" data-target="#modalDefault"></li>' +
                '<li id="layoutCancel" class="icon-goto"><a href="index.html" style="color:#fff;" data-tags="reply" data-pack="ios7" class="ion-ios7-undo" class="ion-refresh"></a></li>' +
                '</ul>' +
                '<div id="tool-panel-add" class="tool-panels" style="display:none;">' +
                '<div class="panel">' +
                '<div class="panel-body">' +
                '<div class="form-container">' +
                '<select class="widget-category form-control portal-select">' +
                '<option selected value="all">全部分类</option>' +
                '</select>' +
                '</div>' +
                '<div class="form-inline">' +
                '<div class="input-search" style="margin-bottom:10px;position: relative;">' +
                '<input type="text" placeholder="搜索" name="" class="form-control widget-key">' +
                '<button class="input-search-btn widget-search" type="submit"><i aria-hidden="true" class="icon wb-search"></i></button>' +
                '</div>' +
                '</div>' +
                '<div class="row"></div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div id="tool-panel-layout" class="tool-panels" style="display:none;">' +
                '<div class="panel">' +
                '<div class="panel-body">' +
                '<div class="row">' +
                '<ul class="list-unstyled text-center">' +
                '</ul>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>';

            $(this.containter).html(html);
            $('#toolbars .tool-panels').css('height',$('body').height()-82);

        },
        init: function () {
            this.panel();
            this.changeLayout();
            this.search();
            this.saveLayout();
        },
        panel: function () {
            var _this = this;
            /* 右侧工具面板展开收起*/
            var ElemnetShow = null;
            $('#tool-panel-icons').click(function (e) {
                $(e.target).closest('li').addClass('clickBg').siblings().removeClass('clickBg');
                if($(e.target).closest('li').attr("data-pack")=='layout'){
                    if($('#tool-panel-layout').is(':visible')){
                        if($('#tool-panel-add').is(':visible')){

                        }else{
                            $('#designerContent').css('margin-right',80);
                        }
                    }else{
                        if($('#tool-panel-add').is(':visible')){

                        }else{
                            $('#designerContent').css('margin-right',$('#tool-panel-add').outerWidth()+$('#toolbars').outerWidth());

                        }
                    }
                }else if($(e.target).closest('li').attr("data-pack")=='add'){
                    if($('#tool-panel-add').is(':visible')){
                        if($('#tool-panel-layout').is(':visible')){

                        }else{
                            $('#designerContent').css('margin-right',80);
                        }
                    }else{
                        if($('#tool-panel-layout').is(':visible')){

                        }else{
                            $('#designerContent').css('margin-right',$('#tool-panel-add').outerWidth()+$('#toolbars').outerWidth());

                        }
                    }
                }

               /* if($(e.target).closest('li').attr("data-pack")=='layout'||$(e.target).closest('li').attr("data-pack")=='add'){
                    if($('#tool-panel-add').is(':visible')||$('#tool-panel-layout').is(':visible')){
                        $('#designerContent').css('margin-right',$('#tool-panel-add').outerWidth()+$('#toolbars').outerWidth());
                    }else{
                        $('#designerContent').css('margin-right',$('#tool-panel-add').outerWidth()+$('#toolbars').outerWidth())
                    }
                }*/

                var tar = $(e.target),
                    tarName = tar.closest('li').attr("data-pack"),
                    menu = $('#tool-panel-' + tarName);
                if (ElemnetShow != null) {
                    ElemnetShow.fadeOut();
                }
                if (menu.length > 0) {
                    if (menu.css("display") == 'none') {
                        menu.fadeIn();
                        ElemnetShow = menu;
                    }
                    else {
                        menu.fadeOut();
                    }
                };


                //console.log(tarName);

                switch (tarName) {
                    case 'layout':
                        if ($('#tool-panel-layout li').length > 0) {
                            return false
                        };
                        _this.setLayout();
                        break;
                    case 'preview':
                        $('.modal-body').html($('#content .row').html());
                        break;
                    case 'add':
                        if ($('#tool-panel-add .well').length > 0) {
                            return false
                        };
                        var url = contextRoot + '/widget/query?r='+Math.random();

                        function searchWidgets(data) {
                            data.viewId=location.hash.split('/')[2];
                            data = JSON.stringify(data);

                            var option = {
                                url: contextRoot + "/widget/query",
                                dataType: 'json',
                                data:data,
                                type: 'post',
                                contentType: 'application/json',
                                success: function (res) {
                                    if(res.status=='1'){
                                        var data = res.data || [];
                                        _this.renderWidget(filterWidget(data));
                                    }
                                },
                                error: function (XMLHttpRequest) {
                                    errorLogin(XMLHttpRequest);
                                }
                            }

                            //搜索订阅
                            if(typeof PubSub !='undefined'&&PubSub.publish('designer.searchWidgets',option)){
                            }
                            else {
                                $.ptAjax(option);
                            }

                        }

                        function getWidgets(url) {

                            var option = {
                                url: contextRoot + "/widget/query",
                                dataType: 'json',
                                type: 'post',
                                data:{"viewId":location.hash.split('/')[2]},
                                contentType: 'application/json',
                                success: function (res) {
                                    if(res.status=='1'){
                                        var data=res.data||[];
                                        var newRes=filterWidget(data);
                                        _this.renderWidget(newRes);
                                    }

                                },
                                error: function (XMLHttpRequest) {
                                    errorLogin(XMLHttpRequest);
                                }
                            };
                            //组件订阅
                            if(typeof PubSub !='undefined'&&PubSub.publish('designer.getWidgets',option)){
                            }
                            else {
                                $.ptAjax(option);
                            }

                        }

                        getWidgets(url);


                        var option = {
                            url: contextRoot + "/widget/catels",
                            dataType: 'json',
                            type: 'get',
                            contentType: 'application/json',
                            success: function (res) {
                                if(res.status=='1'){
                                    if(res.data&&res.data.length){
                                        var str = [];
                                        str.push('<option selected  value="all">全部分类</option>');
                                        $.each(res.data, function (i, item) {
                                            str.push('<option value="' + item.id + '">' + item.name + '</option>');
                                        });
                                        $('.widget-category').html(str.join('')).change(function (e) {
                                            var cate = $(this).val();
                                            var value = $.trim($('.widget-key').val());
                                            var data = {
                                                category:cate,
                                                keyword:value
                                            };
                                            searchWidgets(data);
                                        })
                                    }
                                }

                            },
                            error: function (XMLHttpRequest) {
                                errorLogin(XMLHttpRequest);
                            }
                        }

                        //分类订阅
                        if(typeof PubSub !='undefined'&&PubSub.publish('designer.getCatels',option)){
                        }
                        else {
                            $.ptAjax(option);
                        }
                        break;
                    case 'close':
                        if($('#content').attr('identity')=='normal'){
                            window.location.href=window.location.protocol+'//'+window.location.host+window.location.pathname;
                        }
                        $('#content').removeAttr('identity');
                }
            });

            var pannel = $('#create-site-panel');
            $('#create-site').on('click', function () {
                pannel.fadeIn();
                $(this).hide();
            });
            $('#create-site-cannel').on('click', function () {
                pannel.fadeOut(function () {
                    $('#create-site').show();
                });
            });
            $('#create-site-save').on('click', function () {
                var workspan = $('#gadget-site-workspace');
                $('#gadget-site-workspace').fadeIn(function () {
                    $('#tool-panel').removeClass('diplaynoe').addClass("animated fadeInRight");
                });
            });

        },
        renderWidget: function (res) {
            var str = [];
            $.each(res, function (i, item) {
                str.push(
                    '<div class="col-sm-6">' +
                    '<div data-id="' + item.code + '" data-url="' + item.url + '" class="well tile sort ui-draggable">' +
                    '<div class="icons-text">' +
                    '<i class="name" title="'+item.name+'">' + item.name + '</i>' +
                    '</div>' +
                    '<ul class="list-unstyled edit">' +
                    '</ul>' +
                    '<div class="innerHtml collapse in"></div>' +
                    '</div></div>'
                );
            });

            $("#tool-panel-add .row").html(str.join(''));
            $("#tool-panel-add").on('click',function(e){
               if($(e.target).hasClass('well')||$(e.target).parents().hasClass('well')){
                   if($(e.target).hasClass('well')){
                       $(e.target).addClass('clickBg').parents('.col-sm-6').siblings().find('.well').removeClass('clickBg');
                   }else{
                       $(e.target).parents('.well').addClass('clickBg').parents('.col-sm-6').siblings().find('.well').removeClass('clickBg');
                   }
               }
            });
            this.createDraggable();
        },
        createDraggable: function () {
            $("#tool-panel-add [class^='well']").draggable({
                connectToSortable: ".widgetBox",
                helper: "clone",
                snapMode: "outer",
                stop: function (event, ui) {
                    var html =
                        '<li><i class="portalfont btn btn-round btn-default btn-outline btn-pill-right icon-max" data-type="window" title="最大最小化"></i></li>'+
                        '<li><i class="portalfont btn btn-default btn-outline icon-unfold" data-type="collage" title="折叠"></i></li>' +
                        '<li><i class="portalfont btn btn-round btn-default btn-outline btn-pill-left icon-pencil" data-type="edit"  data-toggle="modal" data-target="#modalBlue" title="编辑"></i></li>' +
                        '<li><i class="portalfont btn btn-default btn-outline icon-cancel02" data-type="del" title="删除"></i></a></li>';
                    ui.helper.removeAttr("style").removeClass('tile').find('.edit').html(html);
                    var url = $(this).attr('data-url');
                   /* if (url.search(/^http:\/\//) != -1) {
                        ui.helper.find('.innerHtml').html('');
                        return false;
                    }*/
                    var dataId=$(this).attr('data-id');
                    var container = $(this);
                    var key='file:'+url+'?id='+dataId+'&lid='+dataId;
                    ui.helper.attr('data-ul',key);
                    $('#tool-panel-add').find('[data-id='+dataId+']').remove();
                    $('#tool-panel-add').find('.widget-search').trigger('click');
                    window.require([contextRoot+"/data:widget/"+dataId+'?r'+Math.random()],function(plugin){plugin.init({'domEle':ui.helper.find('.innerHtml')[0]});});
                    //initLayout(contextRoot+"/data:widget/"+dataId,{'domEle':ui.helper.find('.innerHtml')[0]});
                }
            });
        },
        changeLayout: function () {
            var _this = this;
            $('#tool-panel-layout').delegate('.item-layout', 'click', function (e) {
                var selected = $('#tool-panel-layout .item-layout');
                selected.removeClass("selected");
                var id = $(this).attr("id");
                var layoutId = "selected";
                $(this).addClass(layoutId);
                //var layoutArray = [
                //    ['12'],
                //    ['6-6'],
                //    ['4-8'],
                //    ['8-4'],
                //    ['4-4-4'],
                //];
                var res = $("#tool-panel-layout").data('res');

                var checkArrar = res[$(this).index()].tpl;


                $('#designerContent .well').removeClass("ui-draggable-handle");
                if ($("#designerContent .widgetBox").sortable) {
                    $("#designerContent .widgetBox").unbind();
                }

                var well = $('#designerContent .well').clone();

                var container = $('#designerContent').attr('code', res[$(this).index()].id).html(checkArrar);

                container.find(".widgetBox").eq(0).append(well);

                $("#designerContent .widgetBox").sortable({
                    connectWith: "#designerContent .widgetBox",
                    placeholder: "ui-portlet-placeholder",
                    forcePlaceholderSize: true,
                    edge: 300
                });
                _this.options.layout.getLayoutData();
                _this.options.layout.editLayout();
            })
        },
        search: function () {
            var _this = this;
            function searchWidgets(data) {
                data.viewId=location.hash.split('/')[2];
                data = JSON.stringify(data);
                var option = {
                    url: contextRoot + "/widget/query",
                    dataType: 'json',
                    data:data,
                    type: 'post',
                    contentType: 'application/json',
                    success: function (res) {
                        if(res.status=='1'){
                            var data = res.data || [];
                            _this.renderWidget(filterWidget(data));
                        }
                    },
                    error: function (XMLHttpRequest) {
                        errorLogin(XMLHttpRequest);
                    }
                }
                if(typeof PubSub !='undefined'&&PubSub.publish('designer.searchWidgets',option)){
                }
                else {
                    $.ptAjax(option);
                }

            }
            $('.widget-search').click(function () {
                var cate = $('.widget-category').val();
                var value = $.trim($('.widget-key').val());
                var data = {
                    category:cate,
                    keyword:value
                }
                searchWidgets(data);
            })
        },
        saveLayout: function () {
            //保存布局
            var _this = this;
            $('#layoutReset').click(function(){
                var options = _this.options;
                var userRole=$('#content').attr('identity');
                var url=contextRoot + "/layout/reset/"+options.layoutId+"?r="+Math.random();
                if(userRole){
                    url=contextRoot + "/layout/restore/"+options.layoutId+"?r="+Math.random();
                }
                $.ptAjax({
                    url: url,
                    dataType: 'json',
                    type: 'get',
                    contentType: 'application/json',
                    success: function (res) {
                        if(res.status =='1'){
                            window.message();
                        }
                        else {
                            window.message(res.message,'error');
                        }
                    },
                    error: function (XMLHttpRequest) {
                        errorLogin(XMLHttpRequest);
                    }
                });
            })

            $('#layoutSave').click(function () {
                var options = _this.options;
                var list = $("#designerContent .widgetBox"),
                    data = [], layData = [];
                var layoutId = options.layoutId;
                var viewId = options.viewId != null ? options.viewId : "";
                var modifytime = options.modifytime;


                function getGridData() {
                    var layouts = $('.ui-grid'),
                        data = [], html = [], str = 0, length = layouts.length, This = this;
                    $.each(layouts, function (i, item) {
                        var index = parseInt($(item).attr("class").replace(/[^0-9]/ig, ''));
                        data.push(index);
                    });
                    return data;
                };

                $.each(list, function (i, item) {
                    var child = $(item).find('.well');
                    n = [];
                    if (child.length >= 1) {
                        $.each(child, function (i, t) {
                            n.push($(t).attr('data-id'));
                        });
                    }
                    var wid = child.length >= 1 ? n : [];
                    data.push({wbid: $(item).attr('id'), wid: wid});

                    var layouts = getGridData()[i];

                    layData.push({
                        "wbid": "widgetbox" + (i + 1),
                        "attr": {
                            "width": "col-md-" + layouts
                        }
                    })
                });

                var templateId = $('#designerContent').attr('code');

                //viewId = viewId != null ? viewId : '';
                data = {
                    //viewId: viewId,
                    order: data,
                    templateId: templateId,
                    layoutId: layoutId,
                    layout: layData,
                    modifytime:modifytime
                };


                var parm = JSON.stringify(data);
                if ($("#designerContent .well").length == 0) {
                    alert("请选择一个小部件");
                    return false;
                }

                var hash = location.hash;
                var url = hash.match(/\#\/layout\//ig) != null ? contextRoot + "/layout/design/save" : contextRoot + "/page/sort/save";

                var option = {
                    url: url,
                    dataType: 'json',
                    type: 'post',
                    data: parm,
                    contentType: 'application/json',
                    success: function (res) {
                        if(res.status =='1'){
                            $('#content').removeAttr('identity');
                            window.message();
                        }
                        else {
                            window.message(res.message,'error');
                        }
                        $('#designer').modal('hide');
                        if(hash.match(/\#\/layout\//ig)==null){
                            window.location.href=window.location.protocol+'//'+window.location.host+window.location.pathname;
                        }
                    },
                    error: function (XMLHttpRequest) {
                        errorLogin(XMLHttpRequest);
                    }
                }

                //订阅save方法
                if(typeof PubSub !='undefined'&&PubSub.publish('designer.save',option)){
                }
                else {
                    $.ptAjax(option);
                }
            })
        },
        setLayout: function (setLayout) {
            var _this = this;

            function layoutData(layoutStr) {
                var l = $(layoutStr).children(),
                    d = [];
                $.each(l, function (i, item) {
                    var num = parseInt($(item).attr("class").replace(/[^0-9]/ig, ''))
                    d.push(num);
                })
                return d;
            }

            $.ptAjax({
                url: contextRoot + "/layout/tpl/list",
                dataType: 'json',
                type: 'get',
                contentType: 'application/json',
                success: function (res) {
                    if(res.status=='1'){
                        if(res.data&&res.data.length){
                            var data=res.data;
                            var str = [];
                            $("#tool-panel-layout").data('res', data);
                            $.each(data, function (i, item) {
                                var num = item.tpl.match(/ui-grid/ig);
                                var selected = i == 0 ? 'selected' : '';
                                str.push(
                                    '<div id="' + item.name + '"  class="container item-layout ' + selected + '">' + item.tpl + '</div>'
                                );
                            });
                            $("#tool-panel-layout").html(str.join(''));

                            if (data[0] && !_this.options.viewId && setLayout) {
                                $("#designerContent").html(data[0].tpl).attr("code", data[0].id);
                            }
                            _this.options.layout.initSortable($('.widgetBox'));
                        }
                    }
                },
                error: function (XMLHttpRequest) {
                    errorLogin(XMLHttpRequest);
                }
            });
        },

    };

    return Toolbar;
});