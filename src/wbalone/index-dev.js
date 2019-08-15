/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	var parentJsonpFunction = window["webpackJsonp"];
/******/ 	window["webpackJsonp"] = function webpackJsonpCallback(chunkIds, moreModules) {
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, callbacks = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId])
/******/ 				callbacks.push.apply(callbacks, installedChunks[chunkId]);
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			modules[moduleId] = moreModules[moduleId];
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(chunkIds, moreModules);
/******/ 		while(callbacks.length)
/******/ 			callbacks.shift().call(null, __webpack_require__);
/******/
/******/ 	};
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// "0" means "already loaded"
/******/ 	// Array means "loading", array contains callbacks
/******/ 	var installedChunks = {
/******/ 		0:0
/******/ 	};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId, callback) {
/******/ 		// "0" is the signal for "already loaded"
/******/ 		if(installedChunks[chunkId] === 0)
/******/ 			return callback.call(null, __webpack_require__);
/******/
/******/ 		// an array means "currently loading".
/******/ 		if(installedChunks[chunkId] !== undefined) {
/******/ 			installedChunks[chunkId].push(callback);
/******/ 		} else {
/******/ 			// start chunk loading
/******/ 			installedChunks[chunkId] = [callback];
/******/ 			var head = document.getElementsByTagName('head')[0];
/******/ 			var script = document.createElement('script');
/******/ 			script.type = 'text/javascript';
/******/ 			script.charset = 'utf-8';
/******/ 			script.async = true;
/******/
/******/ 			script.src = __webpack_require__.p + "" + ({}[chunkId]||chunkId) + ".chunk.js";
/******/ 			head.appendChild(script);
/******/ 		}
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	//CSS
	__webpack_require__(1);
	__webpack_require__(2);
	__webpack_require__(3);
	__webpack_require__(4);
	__webpack_require__(5);
	__webpack_require__(6);
	__webpack_require__(7);
	__webpack_require__(8);
	__webpack_require__(9);
	//widget
	__webpack_require__(10);
	__webpack_require__(11);
	__webpack_require__(12);
	__webpack_require__(13);
	__webpack_require__(14);
	window.designer = __webpack_require__(15);
	window.widgets = __webpack_require__(19);
	__webpack_require__(23);
	__webpack_require__(24);
	__webpack_require__(25);
	//扩展图标
	__webpack_require__(26);
	//skintools
	__webpack_require__(27);
	//Router
	var directors = __webpack_require__(28);
	var router = new directors.Router();
	window.router = router;
	router.on('/widget', function () {
	    var widget = __webpack_require__(19);
	    widget.init();
	});
	//布局站点管理
	router.on('/layouts', function () {
	    var sites = __webpack_require__(29);
	    sites.init();
	});

	router.on('/sidebar/:id',function(id){
	    initLayout(contextRoot + "/data:layout/" + id, []);
	});
	//布局模板管理
	router.on('/layout/template', function (id, viewid) {
	    var layout = __webpack_require__(32);
	    layout.init();
	});
	router.on('/design',function(){
	    var id=getParamUrl('lid',$('.unsortable').attr('data-ul'));
	    var version=$('#content').attr('v')||$('#widgetBox').attr('v');
	    $('#content').attr('identity','normal');
	    var layout = __webpack_require__(15);
	    var param = {
	        id: id,
	        element:'designerContent',
	        modifytime:decodeURIComponent(version),
	        router:id
	    };
	    $('#content').html('');
	    layout.init(param);
	});
	router.on('after','/design',function(){
	    $('.modal-backdrop').fadeOut(function(){
	        $(this).remove();
	    });
	    $('body').removeClass('modal-open');
	});
	//设计器
	router.on('/layout/:id/:modifytime/back/:router', function (id,modifytime,router) {
	    var layout = __webpack_require__(15);
	    var param = {
	        id: id,
	        element:'designerContent',
	        modifytime:decodeURIComponent(modifytime),
	        router:router
	    };
	    layout.init(param);
	});
	router.on('after','/layout/:id/:modifytime/back/:router', function (id,modifytime,router) {
	    $('.modal-backdrop').fadeOut(function(){
	        $(this).remove();
	    });
	    $('body').removeClass('modal-open');
	});
	router.on('/home/:viewid', function (viewid) {
	    initLayout(contextRoot + "/data:layout/" + viewid, []);
	});
	router.on('/layout/:id/:viewid', function (id, viewid) {
	    var layout = __webpack_require__(15);
	    var param = {
	        id: id,
	        viewid: viewid
	    }
	    layout.init(param);
	    designClickFn();
	});
	router.on('/sidebar/:id/:viewid', function (id, viewid) {
	    var layout = __webpack_require__(15);
	    var param = {
	        id: id,
	        viewid: viewid
	    }
	    layout.init(param);
	});
	router.on('/ifr/:id', function (id) {
	    var ctn = document.getElementById("content");
	    ctn.innerHTML = '';
	    var ifr = document.createElement("iframe");
	    ifr.setAttribute("allowtransparency",true);
	    ifr.src = decodeURIComponent(decodeURIComponent(id));
	    ifr.style.width = '100%';
	    ifr.style.border = 'none';
	    ctn.appendChild(ifr);
	    var autodiv = $(ifr);

	    function autoH() {
	        var addh = $(window).height() - 55;
	        autodiv.height(addh);
	    }
	    autoH();
	    if (autodiv) {
	        autodiv.css({overflow: "auto"});
	        $(window).resize(function () {
	            autoH();
	        })
	    }
	});
	router.on('/ifrNoHead/:id', function (id) {
	    var ctn = document.body;
	    ctn.innerHTML = '';
	    var ifr = document.createElement("iframe");
	    ifr.setAttribute("allowtransparency",true);
	    ifr.src = decodeURIComponent(decodeURIComponent(id));
	    ifr.style.width = '100%';
	    ifr.style.border = 'none';
	    ctn.appendChild(ifr);
	    var autodiv = $(ifr);

	    function autoH() {
	        var addh = $(window).height() - 55;
	        autodiv.height(addh);
	    }
	    autoH();
	    if (autodiv) {
	        autodiv.css({overflow: "auto"});
	        $(window).resize(function () {
	            autoH();
	        })
	    }
	});
	router.on('/userMapping/relevance/:systemCode', function (systemCode) {
	     var userMapping = __webpack_require__(34);
	     userMapping.init(systemCode,document.getElementById('content'));
	 });
	__webpack_require__.e/* nsure */(2, function(sidebar){
	    var sidebar = __webpack_require__(36);
	    var bar = new sidebar('.menubar');
	});
	//$('#username').children('.avatar-name').html($.cookie('u_usercode'));//用户名称
	$('#content').on('click', '.add-to-sidebar', function(){
	    var id = $(this).closest('.widget').find('.layout-del').attr('data-id');
	    var parent = $(this).closest('.widget');

	    $.ptAjax({
	        url: contextRoot + "/layout/default/" + id,
	        dataType: 'json',
	        type: 'get',
	        cache:false,
	        contentType: 'application/json',
	        success: function (res) {
	            if(res.status=='1'){
	                parent.closest('.row').find('.widget-home').removeClass('widget-home');
	                parent.addClass('widget-home');
	                window.message();
	            }else{
	                window.message(res.message,'error');
	            }
	        }

	    })

	});
	function getParamUrl(name,url) {
	    url=url.split('?')[1];
	    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	    var str=url.match(reg);
	    if(str!=null)return str[2];
	    return null;
	}
	function designClickFn(){
	    var str='<div class="modal-dialog modal-center"><div class="modal-content"><div class="modal-header"><button aria-label="Close" data-dismiss="modal" class="close" type="button"><span aria-hidden="true">×</span></button><h4 class="modal-title">编辑小部件</h4></div><div class="modal-body"><div class="site-items list-unstyled"><div class="widget-create-edit"><div class="panel-body"><form  class="widget-form" ><div id="editModal" class="margin-bottom-15"></div><div id="errorMessage"></div><div class="modal-footer"><button class="u-button u-button-info font-size-14" data-type="save" type="button" id="modelSave" style="height: 36px;">保存</button><button data-dismiss="modal" class="u-button margin-left-10 font-size-14" type="button" style="height: 36px;border: 1px solid #cecece;">取消</button></div></form></div></div></div></div></div></div>';
	    $('#modalBlue').html(str);
	}
	designClickFn();
	$('#editModal').on('click',function (e) {
	    if($(e.target).attr('type')=='checkbox'){
	        $(e.target).val($(e.target).val()=='true'?'false':'true');
	    }
	});
	$("body").on('click',function (e) {
	    if($(e.target).parents('div.site-skintools').length==0){
	        $('.site-skintools').remove();
	    }
	    if($(e.target).attr('id')=='modelSave'||$(e.target).parents('button').attr('id')=='modelSave'){
	        var aryForm = $(e.target).parents('form').serializeArray();
	        var ary=[];
	        for(var ii=0;ii<aryForm.length;ii++){
	            var aryInput=$('#editModal').find('input[name="'+aryForm[ii].name+'"][value="'+aryForm[ii].value+'"]');
	            if(aryInput.attr('type')=='checkbox'){
	                if(aryInput.parents('label').hasClass('is-checked')){
	                    ary.push(aryForm[ii]);
	                }else{

	                }
	            }else{
	                ary.push(aryForm[ii]);
	            }
	        }
	        for(var aryI=0;aryI<ary.length;aryI++){

	            for(var aryJ=0;aryJ<ary.length;aryJ++){
	                if(ary[aryI].name==ary[aryJ].name&&ary[aryI].value!=ary[aryJ].value){
	                    ary[aryI]={'name':ary[aryI].name,'value':ary[aryI].value+'|'+ary[aryJ].value};
	                    ary.splice(aryJ,1);
	                    aryJ--;
	                }
	            }
	        };
	        var checkbox=$('#editModal').find('[type="checkbox"]');
	        if(checkbox.val()=='false'){
	            ary.push({id:checkbox.attr('id'),name:checkbox.attr('name'),status:checkbox.attr('status'),value:'false'});
	        }
	        $.each(ary, function (i, v) {
	            var temp = $('#editModal').find('[name=' + v.name + ']');
	            ary[i].id = temp.attr('id');
	            ary[i].status = temp.attr('status');
	            ary[i].name = temp.attr('displayName');
	        });
	        var jsonData = {
	            "widgetId": $('#editModal').attr('widgetId'),
	            "viewId": $('#editModal').attr('viewId'),
	            "setting": ary
	        };
	        var url='/widget/pref/save';
	        if($('#content').attr('identity')){
	            url='/page/pref/save';
	        }
	        $.ptAjax({
	            url: contextRoot + url,
	            type: 'post',
	            data: JSON.stringify(jsonData),
	            contentType: 'application/json',
	            success: function (res) {

	                if(res.status=="1"){
	                    window.message('操作成功,请刷新后查看');
	                    $("#modelSave").next().trigger('click')
	                }else{
	                    window.message(res.message,'error');
	                }
	            }
	        });
	    }else if($(e.target).parents('#modalBlue').length&&$(e.target).parents('label').hasClass('u-checkbox')){
	            var label=$(e.target).parents('label');
	            if(label.hasClass('is-checked')){
	                label.removeClass('is-checked');
	            }else{
	                label.addClass('is-checked');
	            }
	            e.stopPropagation();
	            e.preventDefault();
	    }else{
	        var target = $(e.target);
	        var customFlag=Number($.cookie('_A_P_userType'))>3;//是否是普通用户，true为普通用户，false为管理员
	        target = target.closest(".btn");
	        var hash = location.hash.split('/');
	        if (target.length > 0) {
	            var str = target.attr("data-type");
	            switch (str) {
	                case 'del':
	                    var min=target.parents('.list-unstyled').find('li:first i').eq(0);
	                    if(min.hasClass('icon-mini')){
	                        min.trigger('click');
	                    }
	                    if(customFlag){
	                        target.parents('.ui-sortable-handle').remove();
	                        $('.widget-search').trigger('click');
	                    }else{
	                        target.closest('.well').remove();
	                        $('.widget-search').trigger('click');
	                    }
	                    break;
	                case 'edit':
	                    //var widgetBox = target.closest(".widgetBox").find('.well');
	                    var widgetBox = target.parents('.well');
	                    var viewId = hash['2'];
	                    var id = widgetBox.attr('data-id');
	                    var dataUrl=widgetBox.attr('data-ul');
	                    // var widgetObj = getWidget(id);
	                    var widgetObj = window.container.service_.getCachedGadgetMetadata(dataUrl);
	                    if (widgetObj&&widgetObj.modulePrefs&&widgetObj.modulePrefs.userprefUrl) {
	                        var url=widgetObj.modulePrefs.userprefUrl;
	                        if(url.indexOf('?')==-1){
	                            url+='?status=0'
	                        }else{
	                            url+='&status=0'
	                        }
	                        if(url.indexOf(baseUrl)==-1){
	                            var width=getParamUrl('w',url)||'100%';
	                            var height=getParamUrl('h',url)||'100%';
	                            var wid=getParamUrl('widgetId',url)||'100%';
	                            $('#modalBlue #editModal').html('<iframe src='+url+' width='+width+' height='+height+' frameborder="0" widgetId='+wid+' ></iframe>');
	                            $('#modalBlue .modal-dialog').css('width',$('#modalBlue .modal-body').find('iframe').width()+32);
	                            $('#modalBlue .modal-content').css('width',$('#modalBlue .modal-body').find('iframe').width()+32);
	                            if(height!='100%'){
	                                $('#modalBlue .modal-content').css('height',$('#modalBlue .modal-body').find('iframe').height()+100);
	                            }
	                            $('#modalBlue .modal-content>.modal-body ').addClass('padding-0');
	                        }else{
	                            $('#modalBlue .modal-content').css('height','auto');
	                            $('#editModal').load(url);
	                        }
	                    } else {
	                        $('#modalBlue .modal-content').css('height','auto');
	                        var str = '';
	                        if(widgetObj&&widgetObj.userPrefs){
	                            for(var i in widgetObj.userPrefs){
	                                var item=widgetObj.userPrefs[i];
	                                switch (item.dataType) {
	                                    case 'STRING':
	                                        if(customFlag){
	                                            if(Number(item.status)){
	                                                str += '<div class="form-inline" style="padding:10px"><label class="control-label" style="margin-right: 10px">' + item.displayName + '</label><input type="text" name="' + item.name + '" class="form-control" value="' + item.defaultValue + '" placeholder="输入文本" id="' + i + '" status="' + item.status + '"  displayName="'+item.displayName +'" /></div>';
	                                            }
	                                        }else{
	                                            str += '<div class="form-inline" style="padding:10px"><label class="control-label" style="margin-right: 10px">' + item.displayName + '</label><input type="text" name="' + item.name + '" class="form-control" value="' + item.defaultValue + '" placeholder="输入文本" id="' + i + '" status="' + item.status + '"  displayName="'+item.displayName +'" /></div>';
	                                        }
	                                        break;
	                                    case 'BOOL':
	                                        if(customFlag){
	                                            if(Number(item.status)){
	                                                str += '<div class="form-inline" style="padding:10px">' +
	                                                    '<label class="control-label" style="margin-right: 10px">' + item.displayName +
	                                                    '</label>' +
	                                                    '<input  value="'+item.defaultValue+'" type="checkbox" name="' + item.name + '"' + (item.defaultValue == "true" ? "checked" : "") + ' id="' + i + '" status="' + item.status + '" displayName="'+item.displayName +'" /></div>';
	                                            }
	                                        }else{
	                                            if(Number(item.status)){
	                                                str += '<div class="form-inline" style="padding:10px">' +
	                                                    '<label class="control-label" style="margin-right: 10px">' + item.displayName +
	                                                    '</label>' +
	                                                    '<input  value="'+item.defaultValue+'" type="checkbox" name="' + item.name + '"' + (item.defaultValue == "true" ? "checked" : "") + ' id="' + i + '" status="' + item.status + '" displayName="'+item.displayName +'" /></div>';
	                                            }
	                                        }
	                                        break;
	                                    case 'ENUM':
	                                        if(customFlag){
	                                            if(Number(item.status)){
	                                                str += '<div class="form-inline" style="padding:10px"><label class="control-label" style="margin-right: 10px">' + item.displayName + '</label>';
	                                                $.each(item.orderedEnumValues, function (index, v) {
	                                                    str += '<label class="radio-inline"><input type="radio" name="' + item.name + '"  value="' + v.value + '"' + (item.defaultValue == v.value ? "checked" : "") + ' id="' + i + '" status="' + item.status + '" displayName="'+item.displayName +'">' + v.displayValue + '</label>';
	                                                });
	                                                str += '</div>';
	                                            }
	                                        }else{
	                                            str += '<div class="form-inline" style="padding:10px"><label class="control-label" style="margin-right: 10px">' + item.displayName + '</label>';
	                                            $.each(item.orderedEnumValues, function (index, v) {
	                                                str += '<label class="radio-inline"><input type="radio" name="' + item.name + '"  value="' + v.value + '"' + (item.defaultValue == v.value ? "checked" : "") + ' id="' + i + '" status="' + item.status + '" displayName="'+item.displayName +'">' + v.displayValue + '</label>';
	                                            });
	                                            str += '</div>';
	                                        }
	                                        break;
	                                    case 'HIDDEN':
	                                        if(customFlag){
	                                            if(Number(item.status)){
	                                                str += '<input type="text" name="' + item.name + '" class="form-control" value="' + item.defaultValue + '"  id="' + i + '" status="' + item.status + '" style="display: none;" displayName="'+item.displayName +'"/>';
	                                            }
	                                        }else{
	                                            str += '<input type="text" name="' + item.name + '" class="form-control" value="' + item.defaultValue + '"  id="' + i + '" status="' + item.status + '" style="display: none;" displayName="'+item.displayName +'"/>';
	                                        }
	                                        break;
	                                    case 'LIST':
	                                        if(customFlag){
	                                            if(Number(item.status)){
	                                                var checkAry=item.defaultValue.split('|');
	                                                str+='<div class="form-inline list-dom"  style="padding:10px"><label style="margin-right: 10px" class="control-label">'+item.displayName +'</label>';
	                                                for(var cn=0;cn<checkAry.length;cn++){
	                                                    str+='<label class="u-checkbox u-checkbox-info w-xs is-checked is-upgraded" data-upgraded=",u.Checkbox">'+
	                                                        '<input id="' + i + '" type="checkbox" class="u-checkbox-input"  checked name="'+item.name+'" value="'+checkAry[cn]+'" status="' + item.status + '"  displayName="'+item.displayName +'">'+
	                                                        '<span class="u-checkbox-label"></span>'+checkAry[cn]+'<span class="u-checkbox-focus-helper"></span><span class="u-checkbox-outline"><span class="u-checkbox-tick-outline"></span></span><span style="overflow: hidden; position: relative;"><span class="u-ripple"></span></span></label>';

	                                                }
	                                                str+='</div>';
	                                            }
	                                        }else{
	                                            var checkAry=item.defaultValue.split('|');
	                                            str+='<div class="form-inline list-dom"  style="padding:10px"><label style="margin-right: 10px" class="control-label">'+item.displayName +'</label>';
	                                            for(var cn=0;cn<checkAry.length;cn++){
	                                                str+='<label class="u-checkbox u-checkbox-info w-xs is-checked is-upgraded" data-upgraded=",u.Checkbox">'+
	                                                    '<input id="' + i + '" type="checkbox" class="u-checkbox-input"  checked name="'+item.name+'" value="'+checkAry[cn]+'" status="' + item.status + '"  displayName="'+item.displayName +'">'+
	                                                    '<span class="u-checkbox-label"></span>'+checkAry[cn]+'<span class="u-checkbox-focus-helper"></span><span class="u-checkbox-outline"><span class="u-checkbox-tick-outline"></span></span><span style="overflow: hidden; position: relative;"><span class="u-ripple"></span></span></label>';

	                                            }
	                                            str+='</div>';
	                                        }

	                                        break;
	                                    default:
	                                        str = '暂无此部件的属性信息'
	                                }
	                            };
	                        }
	                        if(!str)str="暂无此部件的属性信息";
	                        $('#editModal').html(str).attr('widgetId', id).attr('viewId', viewId);
	                    }
	                    break;
	                case "collage":
	                    var containter = target.closest(".well").find('.collapse');
	                    var icons = target;
	                    if (icons.hasClass("icon-unfold")) {
	                        icons.attr("class", "portalfont btn btn-default btn-outline icon-packup")
	                    }
	                    else {
	                        icons.attr("class", "portalfont btn btn-default btn-outline icon-unfold");
	                    }
	                    containter.collapse('toggle');
	                    break;
	                case "window":
	                    var icons = target;
	                    if (icons.hasClass("icon-mini")) {
	                        if(customFlag){
	                            icons.attr("class", "portalfont btn btn-round btn-default btn-outline btn-pill-right icon-max custom");
	                        }else{
	                            icons.attr("class", "portalfont btn btn-round btn-default btn-outline btn-pill-right icon-max");
	                        }
	                        $('.ui-grid').show();
	                        target.closest(".ui-grid").removeAttr("style");
	                        target.closest(".ui-grid").find("[class*=col-md]").removeAttr("style");
	                        $('.layout-edit').show();
	                        $('.line').show();
	                    }
	                    else {
	                        icons.attr("class", "portalfont btn btn-round btn-default btn-outline btn-pill-right icon-mini");
	                        $('.ui-grid').hide();
	                        target.closest(".ui-grid").show().css("width", "100%");
	                        target.closest(".ui-grid").find("[class*=col-md]").hide();
	                        target.closest("[class*=col-md]").show().css("width", "100%");
	                        $('.layout-edit').hide();
	                        $('.line').hide();
	                    }
	                    break;
	            }
	        }
	    }

	});
	if(navigator.userAgent.indexOf("iPad")!=-1||getBrowserVersion()=='IE8'){
	    $('#design').hide().parents('li').next().hide();
	}
	//加载默认皮肤
	window.onload=function(){
	    var settings = $.cookie('_TH_') || 'primary';
	    if (settings) {
	        var head = $('head'), link = document.createElement('link');
	        link.type = 'text/css';
	        link.rel = 'stylesheet';
	        link.href = baseUrl + '/themes/css/' + settings + '.css';
	        link.id = "skinStyle";
	        head.append($(link));
	        if(settings=='primary'){
	            $('.logo').find('img').attr('src', 'logo.png');
	        }else{
	            $('.logo').find('img').attr('src', 'logo_' + settings + '.png');
	        }

	    }
	};
	u.Radio.prototype.init = function() {
	    this._btnElement = this.element.querySelector('input');
	    this._boundChangeHandler = this._onChange.bind(this);
	    this._boundFocusHandler = this._onChange.bind(this);
	    this._boundBlurHandler = this._onBlur.bind(this);
	    this._boundMouseUpHandler = this._onMouseup.bind(this);
	    var outerCircle = document.createElement('span');
	    u.addClass(outerCircle, this._CssClasses.RADIO_OUTER_CIRCLE)
	    var innerCircle = document.createElement('span');
	    u.addClass(innerCircle, this._CssClasses.RADIO_INNER_CIRCLE)
	    var self = this;
	    var ii = setInterval(function(){
	        if(self.element.offsetWidth > 0){
	            self.element.appendChild(outerCircle);
	            self.element.appendChild(innerCircle);
	            clearInterval(ii)
	        }
	    },100);
	    var rippleContainer;
	    rippleContainer = document.createElement('span');
	    rippleContainer.addEventListener('mouseup', this._boundMouseUpHandler);
	    this.element.appendChild(rippleContainer);
	    new u.Ripple(rippleContainer);
	    this._btnElement.addEventListener('change', this._boundChangeHandler);
	    this._btnElement.addEventListener('focus', this._boundFocusHandler);
	    this._btnElement.addEventListener('blur', this._boundBlurHandler);
	    this.element.addEventListener('mouseup', this._boundMouseUpHandler);
	    this._updateClasses();
	    u.addClass(this.element, this._CssClasses.IS_UPGRADED)
	};
	//加载更多
	$('#username').on('click',function(){
	    $('.nav.navbar-nav').find('ul.dropdown-menu').html('');
	    $.ptAjax({
	        url:contextRoot+'/moreMenu/list?r='+Math.random(),
	        dataType:'json',
	        type: 'get',
	        async:false,
	        contentType: 'application/json',
	        success:function(res){
	            if(res.status==1){
	                if(res.data&&res.data.length){
	                    $('.nav.navbar-nav').find('ul.dropdown-menu').html('');
	                    var str='';
	                    var jsStr='';
	                    for(var i=0;i<res.data.length;i++){
	                        var temp=res.data[i];
	                        str='<li><a href="javascript:;" id="'+temp.code+'"><i class="'+temp.icon+'">' +
	                                '</i>'+temp.name+'</a></li><li role="presentation" class="divider"></li>';
	                        $('.nav.navbar-nav').find('ul.dropdown-menu').append(str);
	                        if(temp.urlType=='url'){
	                            jsStr+='$("#'+temp.code+'").on("click",function(){u.iframeDialog({url:"'+temp.url+'",top:"100px"});});';
	                            /*$('#'+temp.code).on('click',function(){
	                                u.iframeDialog({
	                                   url:temp.url,
	                                   top:'100px'
	                                });
	                            });*/
	                        }else if(temp.urlType=='view'){
	                            jsStr+='$("#'+temp.code+'").on("click",function(){window.location.href="'+contextRoot+'/index.html#'+temp.url+'";});';
	                            /*$('#'+temp.code).on('click',function(){
	                               window.location.href=contextRoot+'/index.html#'+temp.url;
	                            });*/
	                        }else if(temp.urlType=='js'){
	                            jsStr+='$("#'+temp.code+'").on("click",function(){ require(["'+temp.url+'"],function('+temp.code+'){'+temp.code+'.init();});});';
	                            /*$('#'+temp.code).on('click',function(){
	                               require([temp.url],function(jsTemp){
	                                   jsTemp.init();
	                               })
	                            });*/
	                        }
	                    }
	                    str='<li role="presentation"><a role="menuitem" href="'+$('#logooutUrl').val()+'"><i aria-hidden="true" class="iconfont  icon-logout"></i> 注销</a></li>';
	                    if(!$('.ui-grid').length){
	                        $('#design').parent().remove();
	                    }
	                    $('.nav.navbar-nav').find('ul.dropdown-menu').append(str);
	                    if ($('#sysmgr').parents('li').next().next().hasClass('divider')) {
	                        $('#sysmgr').parents('li').next().remove()
	                    }
	                    try{
	                        eval(jsStr);
	                    }catch (err){
	                        alert(err);
	                    }
	                }
	            }else{
	                alert(res.message);
	            }
	        }
	    });
	});
	function getCookie(name) {
	    var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
	    if (arr != null) {
	        return unescape(arr[2]);
	    }
	    return null;
	}
	// window.setInterval(function(){
	//     if(getCookie('u_logints')==null||getCookie('u_logints')=='""'||getCookie('u_logints')==undefined||getCookie('u_logints')==''){
    //         window.parent.location.href = '/wbalone/pages/login/login.html?r=L3BvcnRhbC8';
	//         //location.reload();
	//     }

	// },1000);

/***/ },
/* 1 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 2 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 3 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 4 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 5 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 6 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 7 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 8 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 9 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 10 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*! http://mths.be/placeholder v2.1.1 by @mathias */
	(function(factory) {
		if (true) {
			// AMD
			!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else {
			// Browser globals
			factory(jQuery);
		}
	}(function() {
		// Opera Mini v7 doesn't support placeholder although its DOM seems to indicate so
		var isOperaMini = Object.prototype.toString.call(window.operamini) == '[object OperaMini]';
		var isInputSupported = 'placeholder' in document.createElement('input') && !isOperaMini;
		var isTextareaSupported = 'placeholder' in document.createElement('textarea') && !isOperaMini;
		var valHooks = $.valHooks;
		var propHooks = $.propHooks;
		var hooks;
		var placeholder;

		if (isInputSupported && isTextareaSupported) {

			placeholder = $.fn.placeholder = function() {
				return this;
			};

			placeholder.input = placeholder.textarea = true;

		} else {

			var settings = {};

			placeholder = $.fn.placeholder = function(options) {

				var defaults = {customClass: 'placeholder'};
				settings = $.extend({}, defaults, options);

				var $this = this;
				$this
					.filter((isInputSupported ? 'textarea' : ':input') + '[placeholder]')
					.not('.'+settings.customClass)
					.bind({
						'focus.placeholder': clearPlaceholder,
						'blur.placeholder': setPlaceholder
					})
					.data('placeholder-enabled', true)
					.trigger('blur.placeholder');
				return $this;
			};

			placeholder.input = isInputSupported;
			placeholder.textarea = isTextareaSupported;

			hooks = {
				'get': function(element) {
					var $element = $(element);

					var $passwordInput = $element.data('placeholder-password');
					if ($passwordInput) {
						return $passwordInput[0].value;
					}

					return $element.data('placeholder-enabled') && $element.hasClass(settings.customClass) ? '' : element.value;
				},
				'set': function(element, value) {
					var $element = $(element);

					var $passwordInput = $element.data('placeholder-password');
					if ($passwordInput) {
						return $passwordInput[0].value = value;
					}

					if (!$element.data('placeholder-enabled')) {
						return element.value = value;
					}
					if (value === '') {
						element.value = value;
						// Issue #56: Setting the placeholder causes problems if the element continues to have focus.
						if (element != safeActiveElement()) {
							// We can't use `triggerHandler` here because of dummy text/password inputs :(
							setPlaceholder.call(element);
						}
					} else if ($element.hasClass(settings.customClass)) {
						clearPlaceholder.call(element, true, value) || (element.value = value);
					} else {
						element.value = value;
					}
					// `set` can not return `undefined`; see http://jsapi.info/jquery/1.7.1/val#L2363
					return $element;
				}
			};

			if (!isInputSupported) {
				valHooks.input = hooks;
				propHooks.value = hooks;
			}
			if (!isTextareaSupported) {
				valHooks.textarea = hooks;
				propHooks.value = hooks;
			}

			$(function() {
				// Look for forms
				$(document).delegate('form', 'submit.placeholder', function() {
					// Clear the placeholder values so they don't get submitted
					var $inputs = $('.'+settings.customClass, this).each(clearPlaceholder);
					setTimeout(function() {
						$inputs.each(setPlaceholder);
					}, 10);
				});
			});

			// Clear placeholder values upon page reload
			$(window).bind('beforeunload.placeholder', function() {
				$('.'+settings.customClass).each(function() {
					this.value = '';
				});
			});

		}

		function args(elem) {
			// Return an object of element attributes
			var newAttrs = {};
			var rinlinejQuery = /^jQuery\d+$/;
			$.each(elem.attributes, function(i, attr) {
				if (attr.specified && !rinlinejQuery.test(attr.name)) {
					newAttrs[attr.name] = attr.value;
				}
			});
			return newAttrs;
		}

		function clearPlaceholder(event, value) {
			var input = this;
			var $input = $(input);
			if (input.value == $input.attr('placeholder') && $input.hasClass(settings.customClass)) {
				if ($input.data('placeholder-password')) {
					$input = $input.hide().nextAll('input[type="password"]:first').show().attr('id', $input.removeAttr('id').data('placeholder-id'));
					// If `clearPlaceholder` was called from `$.valHooks.input.set`
					if (event === true) {
						return $input[0].value = value;
					}
					$input.focus();
				} else {
					input.value = '';
					$input.removeClass(settings.customClass);
					input == safeActiveElement() && input.select();
				}
			}
		}

		function setPlaceholder() {
			var $replacement;
			var input = this;
			var $input = $(input);
			var id = this.id;
			if (input.value === '') {
				if (input.type === 'password') {
					if (!$input.data('placeholder-textinput')) {
						try {
							$replacement = $input.clone().attr({ 'type': 'text' });
						} catch(e) {
							$replacement = $('<input>').attr($.extend(args(this), { 'type': 'text' }));
						}
						$replacement
							.removeAttr('name')
							.data({
								'placeholder-password': $input,
								'placeholder-id': id
							})
							.bind('focus.placeholder', clearPlaceholder);
						$input
							.data({
								'placeholder-textinput': $replacement,
								'placeholder-id': id
							})
							.before($replacement);
					}
					$input = $input.removeAttr('id').hide().prevAll('input[type="text"]:first').attr('id', id).show();
					// Note: `$input[0] != input` now!
				}
				$input.addClass(settings.customClass);
				$input[0].value = $input.attr('placeholder');
			} else {
				$input.removeClass(settings.customClass);
			}
		}

		function safeActiveElement() {
			// Avoid IE9 `document.activeElement` of death
			// https://github.com/mathiasbynens/jquery-placeholder/pull/99
			try {
				return document.activeElement;
			} catch (exception) {}
		}

	}));


/***/ },
/* 12 */
/***/ function(module, exports) {

	/*jshint eqnull:true */
	/*!
	 * jQuery Cookie Plugin v1.1
	 * https://github.com/carhartl/jquery-cookie
	 *
	 * Copyright 2011, Klaus Hartl
	 * Dual licensed under the MIT or GPL Version 2 licenses.
	 * http://www.opensource.org/licenses/mit-license.php
	 * http://www.opensource.org/licenses/GPL-2.0
	 */
	(function($, document) {

	    var pluses = /\+/g;
	    function raw(s) {
	        return s;
	    }
	    function decoded(s) {
	        return decodeURIComponent(s.replace(pluses, ' '));
	    }

	    $.cookie = function(key, value, options) {

	        // key and at least value given, set cookie...
	        if (arguments.length > 1 && (!/Object/.test(Object.prototype.toString.call(value)) || value == null)) {
	            options = $.extend({}, $.cookie.defaults, options);

	            if (value == null) {
	                options.expires = -1;
	            }

	            if (typeof options.expires === 'number') {
	                var days = options.expires, t = options.expires = new Date();
	                t.setDate(t.getDate() + days);
	            }

	            value = String(value);

	            return (document.cookie = [
	                encodeURIComponent(key), '=', options.raw ? value : encodeURIComponent(value),
	                options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
	                options.path    ? '; path=' + options.path : '',
	                options.domain  ? '; domain=' + options.domain : '',
	                options.secure  ? '; secure' : ''
	            ].join(''));
	        }

	        // key and possibly options given, get cookie...
	        options = value || $.cookie.defaults || {};
	        var decode = options.raw ? raw : decoded;
	        var cookies = document.cookie.split('; ');
	        for (var i = 0, parts; (parts = cookies[i] && cookies[i].split('=')); i++) {
	            if (decode(parts.shift()) === key) {
	                return decode(parts.join('='));
	            }
	        }
	        return null;
	    };

	    $.cookie.defaults = {};

	})(jQuery, document);



/***/ },
/* 13 */
/***/ function(module, exports) {

	/*!
	 * Bootstrap v3.3.4 (http://getbootstrap.com)
	 * Copyright 2011-2015 Twitter, Inc.
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	 */

	if (typeof jQuery === 'undefined') {
	  throw new Error('Bootstrap\'s JavaScript requires jQuery')
	}

	+function ($) {
	  'use strict';
	  var version = $.fn.jquery.split(' ')[0].split('.')
	  if ((version[0] < 2 && version[1] < 9) || (version[0] == 1 && version[1] == 9 && version[2] < 1)) {
	    throw new Error('Bootstrap\'s JavaScript requires jQuery version 1.9.1 or higher')
	  }
	}(jQuery);

	/* ========================================================================
	 * Bootstrap: transition.js v3.3.4
	 * http://getbootstrap.com/javascript/#transitions
	 * ========================================================================
	 * Copyright 2011-2015 Twitter, Inc.
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	 * ======================================================================== */


	+function ($) {
	  'use strict';

	  // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
	  // ============================================================

	  function transitionEnd() {
	    var el = document.createElement('bootstrap')

	    var transEndEventNames = {
	      WebkitTransition : 'webkitTransitionEnd',
	      MozTransition    : 'transitionend',
	      OTransition      : 'oTransitionEnd otransitionend',
	      transition       : 'transitionend'
	    }

	    for (var name in transEndEventNames) {
	      if (el.style[name] !== undefined) {
	        return { end: transEndEventNames[name] }
	      }
	    }

	    return false // explicit for ie8 (  ._.)
	  }

	  // http://blog.alexmaccaw.com/css-transitions
	  $.fn.emulateTransitionEnd = function (duration) {
	    var called = false
	    var $el = this
	    $(this).one('bsTransitionEnd', function () { called = true })
	    var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
	    setTimeout(callback, duration)
	    return this
	  }

	  $(function () {
	    $.support.transition = transitionEnd()

	    if (!$.support.transition) return

	    $.event.special.bsTransitionEnd = {
	      bindType: $.support.transition.end,
	      delegateType: $.support.transition.end,
	      handle: function (e) {
	        if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
	      }
	    }
	  })

	}(jQuery);

	/* ========================================================================
	 * Bootstrap: alert.js v3.3.4
	 * http://getbootstrap.com/javascript/#alerts
	 * ========================================================================
	 * Copyright 2011-2015 Twitter, Inc.
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	 * ======================================================================== */


	+function ($) {
	  'use strict';

	  // ALERT CLASS DEFINITION
	  // ======================

	  var dismiss = '[data-dismiss="alert"]'
	  var Alert   = function (el) {
	    $(el).on('click', dismiss, this.close)
	  }

	  Alert.VERSION = '3.3.4'

	  Alert.TRANSITION_DURATION = 150

	  Alert.prototype.close = function (e) {
	    var $this    = $(this)
	    var selector = $this.attr('data-target')

	    if (!selector) {
	      selector = $this.attr('href')
	      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
	    }

	    var $parent = $(selector)

	    if (e) e.preventDefault()

	    if (!$parent.length) {
	      $parent = $this.closest('.alert')
	    }

	    $parent.trigger(e = $.Event('close.bs.alert'))

	    if (e.isDefaultPrevented()) return

	    $parent.removeClass('in')

	    function removeElement() {
	      // detach from parent, fire event then clean up data
	      $parent.detach().trigger('closed.bs.alert').remove()
	    }

	    $.support.transition && $parent.hasClass('fade') ?
	      $parent
	        .one('bsTransitionEnd', removeElement)
	        .emulateTransitionEnd(Alert.TRANSITION_DURATION) :
	      removeElement()
	  }


	  // ALERT PLUGIN DEFINITION
	  // =======================

	  function Plugin(option) {
	    return this.each(function () {
	      var $this = $(this)
	      var data  = $this.data('bs.alert')

	      if (!data) $this.data('bs.alert', (data = new Alert(this)))
	      if (typeof option == 'string') data[option].call($this)
	    })
	  }

	  var old = $.fn.alert

	  $.fn.alert             = Plugin
	  $.fn.alert.Constructor = Alert


	  // ALERT NO CONFLICT
	  // =================

	  $.fn.alert.noConflict = function () {
	    $.fn.alert = old
	    return this
	  }


	  // ALERT DATA-API
	  // ==============

	  $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close)

	}(jQuery);

	/* ========================================================================
	 * Bootstrap: button.js v3.3.4
	 * http://getbootstrap.com/javascript/#buttons
	 * ========================================================================
	 * Copyright 2011-2015 Twitter, Inc.
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	 * ======================================================================== */


	+function ($) {
	  'use strict';

	  // BUTTON PUBLIC CLASS DEFINITION
	  // ==============================

	  var Button = function (element, options) {
	    this.$element  = $(element)
	    this.options   = $.extend({}, Button.DEFAULTS, options)
	    this.isLoading = false
	  }

	  Button.VERSION  = '3.3.4'

	  Button.DEFAULTS = {
	    loadingText: 'loading...'
	  }

	  Button.prototype.setState = function (state) {
	    var d    = 'disabled'
	    var $el  = this.$element
	    var val  = $el.is('input') ? 'val' : 'html'
	    var data = $el.data()

	    state = state + 'Text'

	    if (data.resetText == null) $el.data('resetText', $el[val]())

	    // push to event loop to allow forms to submit
	    setTimeout($.proxy(function () {
	      $el[val](data[state] == null ? this.options[state] : data[state])

	      if (state == 'loadingText') {
	        this.isLoading = true
	        $el.addClass(d).attr(d, d)
	      } else if (this.isLoading) {
	        this.isLoading = false
	        $el.removeClass(d).removeAttr(d)
	      }
	    }, this), 0)
	  }

	  Button.prototype.toggle = function () {
	    var changed = true
	    var $parent = this.$element.closest('[data-toggle="buttons"]')

	    if ($parent.length) {
	      var $input = this.$element.find('input')
	      if ($input.prop('type') == 'radio') {
	        if ($input.prop('checked') && this.$element.hasClass('active')) changed = false
	        else $parent.find('.active').removeClass('active')
	      }
	      if (changed) $input.prop('checked', !this.$element.hasClass('active')).trigger('change')
	    } else {
	      this.$element.attr('aria-pressed', !this.$element.hasClass('active'))
	    }

	    if (changed) this.$element.toggleClass('active')
	  }


	  // BUTTON PLUGIN DEFINITION
	  // ========================

	  function Plugin(option) {
	    return this.each(function () {
	      var $this   = $(this)
	      var data    = $this.data('bs.button')
	      var options = typeof option == 'object' && option

	      if (!data) $this.data('bs.button', (data = new Button(this, options)))

	      if (option == 'toggle') data.toggle()
	      else if (option) data.setState(option)
	    })
	  }

	  var old = $.fn.button

	  $.fn.button             = Plugin
	  $.fn.button.Constructor = Button


	  // BUTTON NO CONFLICT
	  // ==================

	  $.fn.button.noConflict = function () {
	    $.fn.button = old
	    return this
	  }


	  // BUTTON DATA-API
	  // ===============

	  $(document)
	    .on('click.bs.button.data-api', '[data-toggle^="button"]', function (e) {
	      var $btn = $(e.target)
	      if (!$btn.hasClass('btn')) $btn = $btn.closest('.btn')
	      Plugin.call($btn, 'toggle')
	      e.preventDefault()
	    })
	    .on('focus.bs.button.data-api blur.bs.button.data-api', '[data-toggle^="button"]', function (e) {
	      $(e.target).closest('.btn').toggleClass('focus', /^focus(in)?$/.test(e.type))
	    })

	}(jQuery);

	/* ========================================================================
	 * Bootstrap: carousel.js v3.3.4
	 * http://getbootstrap.com/javascript/#carousel
	 * ========================================================================
	 * Copyright 2011-2015 Twitter, Inc.
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	 * ======================================================================== */


	+function ($) {
	  'use strict';

	  // CAROUSEL CLASS DEFINITION
	  // =========================

	  var Carousel = function (element, options) {
	    this.$element    = $(element)
	    this.$indicators = this.$element.find('.carousel-indicators')
	    this.options     = options
	    this.paused      = null
	    this.sliding     = null
	    this.interval    = null
	    this.$active     = null
	    this.$items      = null

	    this.options.keyboard && this.$element.on('keydown.bs.carousel', $.proxy(this.keydown, this))

	    this.options.pause == 'hover' && !('ontouchstart' in document.documentElement) && this.$element
	      .on('mouseenter.bs.carousel', $.proxy(this.pause, this))
	      .on('mouseleave.bs.carousel', $.proxy(this.cycle, this))
	  }

	  Carousel.VERSION  = '3.3.4'

	  Carousel.TRANSITION_DURATION = 600

	  Carousel.DEFAULTS = {
	    interval: 5000,
	    pause: 'hover',
	    wrap: true,
	    keyboard: true
	  }

	  Carousel.prototype.keydown = function (e) {
	    if (/input|textarea/i.test(e.target.tagName)) return
	    switch (e.which) {
	      case 37: this.prev(); break
	      case 39: this.next(); break
	      default: return
	    }

	    e.preventDefault()
	  }

	  Carousel.prototype.cycle = function (e) {
	    e || (this.paused = false)

	    this.interval && clearInterval(this.interval)

	    this.options.interval
	      && !this.paused
	      && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))

	    return this
	  }

	  Carousel.prototype.getItemIndex = function (item) {
	    this.$items = item.parent().children('.item')
	    return this.$items.index(item || this.$active)
	  }

	  Carousel.prototype.getItemForDirection = function (direction, active) {
	    var activeIndex = this.getItemIndex(active)
	    var willWrap = (direction == 'prev' && activeIndex === 0)
	                || (direction == 'next' && activeIndex == (this.$items.length - 1))
	    if (willWrap && !this.options.wrap) return active
	    var delta = direction == 'prev' ? -1 : 1
	    var itemIndex = (activeIndex + delta) % this.$items.length
	    return this.$items.eq(itemIndex)
	  }

	  Carousel.prototype.to = function (pos) {
	    var that        = this
	    var activeIndex = this.getItemIndex(this.$active = this.$element.find('.item.active'))

	    if (pos > (this.$items.length - 1) || pos < 0) return

	    if (this.sliding)       return this.$element.one('slid.bs.carousel', function () { that.to(pos) }) // yes, "slid"
	    if (activeIndex == pos) return this.pause().cycle()

	    return this.slide(pos > activeIndex ? 'next' : 'prev', this.$items.eq(pos))
	  }

	  Carousel.prototype.pause = function (e) {
	    e || (this.paused = true)

	    if (this.$element.find('.next, .prev').length && $.support.transition) {
	      this.$element.trigger($.support.transition.end)
	      this.cycle(true)
	    }

	    this.interval = clearInterval(this.interval)

	    return this
	  }

	  Carousel.prototype.next = function () {
	    if (this.sliding) return
	    return this.slide('next')
	  }

	  Carousel.prototype.prev = function () {
	    if (this.sliding) return
	    return this.slide('prev')
	  }

	  Carousel.prototype.slide = function (type, next) {
	    var $active   = this.$element.find('.item.active')
	    var $next     = next || this.getItemForDirection(type, $active)
	    var isCycling = this.interval
	    var direction = type == 'next' ? 'left' : 'right'
	    var that      = this

	    if ($next.hasClass('active')) return (this.sliding = false)

	    var relatedTarget = $next[0]
	    var slideEvent = $.Event('slide.bs.carousel', {
	      relatedTarget: relatedTarget,
	      direction: direction
	    })
	    this.$element.trigger(slideEvent)
	    if (slideEvent.isDefaultPrevented()) return

	    this.sliding = true

	    isCycling && this.pause()

	    if (this.$indicators.length) {
	      this.$indicators.find('.active').removeClass('active')
	      var $nextIndicator = $(this.$indicators.children()[this.getItemIndex($next)])
	      $nextIndicator && $nextIndicator.addClass('active')
	    }

	    var slidEvent = $.Event('slid.bs.carousel', { relatedTarget: relatedTarget, direction: direction }) // yes, "slid"
	    if ($.support.transition && this.$element.hasClass('slide')) {
	      $next.addClass(type)
	      $next[0].offsetWidth // force reflow
	      $active.addClass(direction)
	      $next.addClass(direction)
	      $active
	        .one('bsTransitionEnd', function () {
	          $next.removeClass([type, direction].join(' ')).addClass('active')
	          $active.removeClass(['active', direction].join(' '))
	          that.sliding = false
	          setTimeout(function () {
	            that.$element.trigger(slidEvent)
	          }, 0)
	        })
	        .emulateTransitionEnd(Carousel.TRANSITION_DURATION)
	    } else {
	      $active.removeClass('active')
	      $next.addClass('active')
	      this.sliding = false
	      this.$element.trigger(slidEvent)
	    }

	    isCycling && this.cycle()

	    return this
	  }


	  // CAROUSEL PLUGIN DEFINITION
	  // ==========================

	  function Plugin(option) {
	    return this.each(function () {
	      var $this   = $(this)
	      var data    = $this.data('bs.carousel')
	      var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option)
	      var action  = typeof option == 'string' ? option : options.slide

	      if (!data) $this.data('bs.carousel', (data = new Carousel(this, options)))
	      if (typeof option == 'number') data.to(option)
	      else if (action) data[action]()
	      else if (options.interval) data.pause().cycle()
	    })
	  }

	  var old = $.fn.carousel

	  $.fn.carousel             = Plugin
	  $.fn.carousel.Constructor = Carousel


	  // CAROUSEL NO CONFLICT
	  // ====================

	  $.fn.carousel.noConflict = function () {
	    $.fn.carousel = old
	    return this
	  }


	  // CAROUSEL DATA-API
	  // =================

	  var clickHandler = function (e) {
	    var href
	    var $this   = $(this)
	    var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) // strip for ie7
	    if (!$target.hasClass('carousel')) return
	    var options = $.extend({}, $target.data(), $this.data())
	    var slideIndex = $this.attr('data-slide-to')
	    if (slideIndex) options.interval = false

	    Plugin.call($target, options)

	    if (slideIndex) {
	      $target.data('bs.carousel').to(slideIndex)
	    }

	    e.preventDefault()
	  }

	  $(document)
	    .on('click.bs.carousel.data-api', '[data-slide]', clickHandler)
	    .on('click.bs.carousel.data-api', '[data-slide-to]', clickHandler)

	  $(window).on('load', function () {
	    $('[data-ride="carousel"]').each(function () {
	      var $carousel = $(this)
	      Plugin.call($carousel, $carousel.data())
	    })
	  })

	}(jQuery);

	/* ========================================================================
	 * Bootstrap: collapse.js v3.3.4
	 * http://getbootstrap.com/javascript/#collapse
	 * ========================================================================
	 * Copyright 2011-2015 Twitter, Inc.
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	 * ======================================================================== */


	+function ($) {
	  'use strict';

	  // COLLAPSE PUBLIC CLASS DEFINITION
	  // ================================

	  var Collapse = function (element, options) {
	    this.$element      = $(element)
	    this.options       = $.extend({}, Collapse.DEFAULTS, options)
	    this.$trigger      = $('[data-toggle="collapse"][href="#' + element.id + '"],' +
	                           '[data-toggle="collapse"][data-target="#' + element.id + '"]')
	    this.transitioning = null

	    if (this.options.parent) {
	      this.$parent = this.getParent()
	    } else {
	      this.addAriaAndCollapsedClass(this.$element, this.$trigger)
	    }

	    if (this.options.toggle) this.toggle()
	  }

	  Collapse.VERSION  = '3.3.4'

	  Collapse.TRANSITION_DURATION = 350

	  Collapse.DEFAULTS = {
	    toggle: true
	  }

	  Collapse.prototype.dimension = function () {
	    var hasWidth = this.$element.hasClass('width')
	    return hasWidth ? 'width' : 'height'
	  }

	  Collapse.prototype.show = function () {
	    if (this.transitioning || this.$element.hasClass('in')) return

	    var activesData
	    var actives = this.$parent && this.$parent.children('.panel').children('.in, .collapsing')

	    if (actives && actives.length) {
	      activesData = actives.data('bs.collapse')
	      if (activesData && activesData.transitioning) return
	    }

	    var startEvent = $.Event('show.bs.collapse')
	    this.$element.trigger(startEvent)
	    if (startEvent.isDefaultPrevented()) return

	    if (actives && actives.length) {
	      Plugin.call(actives, 'hide')
	      activesData || actives.data('bs.collapse', null)
	    }

	    var dimension = this.dimension()

	    this.$element
	      .removeClass('collapse')
	      .addClass('collapsing')[dimension](0)
	      .attr('aria-expanded', true)

	    this.$trigger
	      .removeClass('collapsed')
	      .attr('aria-expanded', true)

	    this.transitioning = 1

	    var complete = function () {
	      this.$element
	        .removeClass('collapsing')
	        .addClass('collapse in')[dimension]('')
	      this.transitioning = 0
	      this.$element
	        .trigger('shown.bs.collapse')
	    }

	    if (!$.support.transition) return complete.call(this)

	    var scrollSize = $.camelCase(['scroll', dimension].join('-'))

	    this.$element
	      .one('bsTransitionEnd', $.proxy(complete, this))
	      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)[dimension](this.$element[0][scrollSize])
	  }

	  Collapse.prototype.hide = function () {
	    if (this.transitioning || !this.$element.hasClass('in')) return

	    var startEvent = $.Event('hide.bs.collapse')
	    this.$element.trigger(startEvent)
	    if (startEvent.isDefaultPrevented()) return

	    var dimension = this.dimension()

	    this.$element[dimension](this.$element[dimension]())[0].offsetHeight

	    this.$element
	      .addClass('collapsing')
	      .removeClass('collapse in')
	      .attr('aria-expanded', false)

	    this.$trigger
	      .addClass('collapsed')
	      .attr('aria-expanded', false)

	    this.transitioning = 1

	    var complete = function () {
	      this.transitioning = 0
	      this.$element
	        .removeClass('collapsing')
	        .addClass('collapse')
	        .trigger('hidden.bs.collapse')
	    }

	    if (!$.support.transition) return complete.call(this)

	    this.$element
	      [dimension](0)
	      .one('bsTransitionEnd', $.proxy(complete, this))
	      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)
	  }

	  Collapse.prototype.toggle = function () {
	    this[this.$element.hasClass('in') ? 'hide' : 'show']()
	  }

	  Collapse.prototype.getParent = function () {
	    return $(this.options.parent)
	      .find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]')
	      .each($.proxy(function (i, element) {
	        var $element = $(element)
	        this.addAriaAndCollapsedClass(getTargetFromTrigger($element), $element)
	      }, this))
	      .end()
	  }

	  Collapse.prototype.addAriaAndCollapsedClass = function ($element, $trigger) {
	    var isOpen = $element.hasClass('in')

	    $element.attr('aria-expanded', isOpen)
	    $trigger
	      .toggleClass('collapsed', !isOpen)
	      .attr('aria-expanded', isOpen)
	  }

	  function getTargetFromTrigger($trigger) {
	    var href
	    var target = $trigger.attr('data-target')
	      || (href = $trigger.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') // strip for ie7

	    return $(target)
	  }


	  // COLLAPSE PLUGIN DEFINITION
	  // ==========================

	  function Plugin(option) {
	    return this.each(function () {
	      var $this   = $(this)
	      var data    = $this.data('bs.collapse')
	      var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option)

	      if (!data && options.toggle && /show|hide/.test(option)) options.toggle = false
	      if (!data) $this.data('bs.collapse', (data = new Collapse(this, options)))
	      if (typeof option == 'string') data[option]()
	    })
	  }

	  var old = $.fn.collapse

	  $.fn.collapse             = Plugin
	  $.fn.collapse.Constructor = Collapse


	  // COLLAPSE NO CONFLICT
	  // ====================

	  $.fn.collapse.noConflict = function () {
	    $.fn.collapse = old
	    return this
	  }


	  // COLLAPSE DATA-API
	  // =================

	  $(document).on('click.bs.collapse.data-api', '[data-toggle="collapse"]', function (e) {
	    var $this   = $(this)

	    if (!$this.attr('data-target')) e.preventDefault()

	    var $target = getTargetFromTrigger($this)
	    var data    = $target.data('bs.collapse')
	    var option  = data ? 'toggle' : $this.data()

	    Plugin.call($target, option)
	  })

	}(jQuery);

	/* ========================================================================
	 * Bootstrap: dropdown.js v3.3.4
	 * http://getbootstrap.com/javascript/#dropdowns
	 * ========================================================================
	 * Copyright 2011-2015 Twitter, Inc.
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	 * ======================================================================== */


	+function ($) {
	  'use strict';

	  // DROPDOWN CLASS DEFINITION
	  // =========================

	  var backdrop = '.dropdown-backdrop'
	  var toggle   = '[data-toggle="dropdown"]'
	  var Dropdown = function (element) {
	    $(element).on('click.bs.dropdown', this.toggle)
	  }

	  Dropdown.VERSION = '3.3.4'

	  Dropdown.prototype.toggle = function (e) {
	    var $this = $(this)

	    if ($this.is('.disabled, :disabled')) return

	    var $parent  = getParent($this)
	    var isActive = $parent.hasClass('open')

	    clearMenus()

	    if (!isActive) {
	      if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
	        // if mobile we use a backdrop because click events don't delegate
	        $('<div class="dropdown-backdrop"/>').insertAfter($(this)).on('click', clearMenus)
	      }

	      var relatedTarget = { relatedTarget: this }
	      $parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget))

	      if (e.isDefaultPrevented()) return

	      $this
	        .trigger('focus')
	        .attr('aria-expanded', 'true')

	      $parent
	        .toggleClass('open')
	        .trigger('shown.bs.dropdown', relatedTarget)
	    }

	    return false
	  }

	  Dropdown.prototype.keydown = function (e) {
	    if (!/(38|40|27|32)/.test(e.which) || /input|textarea/i.test(e.target.tagName)) return

	    var $this = $(this)

	    e.preventDefault()
	    e.stopPropagation()

	    if ($this.is('.disabled, :disabled')) return

	    var $parent  = getParent($this)
	    var isActive = $parent.hasClass('open')

	    if ((!isActive && e.which != 27) || (isActive && e.which == 27)) {
	      if (e.which == 27) $parent.find(toggle).trigger('focus')
	      return $this.trigger('click')
	    }

	    var desc = ' li:not(.disabled):visible a'
	    var $items = $parent.find('[role="menu"]' + desc + ', [role="listbox"]' + desc)

	    if (!$items.length) return

	    var index = $items.index(e.target)

	    if (e.which == 38 && index > 0)                 index--                        // up
	    if (e.which == 40 && index < $items.length - 1) index++                        // down
	    if (!~index)                                      index = 0

	    $items.eq(index).trigger('focus')
	  }

	  function clearMenus(e) {
	    if (e && e.which === 3) return
	    $(backdrop).remove()
	    $(toggle).each(function () {
	      var $this         = $(this)
	      var $parent       = getParent($this)
	      var relatedTarget = { relatedTarget: this }

	      if (!$parent.hasClass('open')) return

	      $parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget))

	      if (e.isDefaultPrevented()) return

	      $this.attr('aria-expanded', 'false')
	      $parent.removeClass('open').trigger('hidden.bs.dropdown', relatedTarget)
	    })
	  }

	  function getParent($this) {
	    var selector = $this.attr('data-target')

	    if (!selector) {
	      selector = $this.attr('href')
	      selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
	    }

	    var $parent = selector && $(selector)

	    return $parent && $parent.length ? $parent : $this.parent()
	  }


	  // DROPDOWN PLUGIN DEFINITION
	  // ==========================

	  function Plugin(option) {
	    return this.each(function () {
	      var $this = $(this)
	      var data  = $this.data('bs.dropdown')

	      if (!data) $this.data('bs.dropdown', (data = new Dropdown(this)))
	      if (typeof option == 'string') data[option].call($this)
	    })
	  }

	  var old = $.fn.dropdown

	  $.fn.dropdown             = Plugin
	  $.fn.dropdown.Constructor = Dropdown


	  // DROPDOWN NO CONFLICT
	  // ====================

	  $.fn.dropdown.noConflict = function () {
	    $.fn.dropdown = old
	    return this
	  }


	  // APPLY TO STANDARD DROPDOWN ELEMENTS
	  // ===================================

	  $(document)
	    .on('click.bs.dropdown.data-api', clearMenus)
	    .on('click.bs.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
	    .on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle)
	    .on('keydown.bs.dropdown.data-api', toggle, Dropdown.prototype.keydown)
	    .on('keydown.bs.dropdown.data-api', '[role="menu"]', Dropdown.prototype.keydown)
	    .on('keydown.bs.dropdown.data-api', '[role="listbox"]', Dropdown.prototype.keydown)

	}(jQuery);

	/* ========================================================================
	 * Bootstrap: modal.js v3.3.4
	 * http://getbootstrap.com/javascript/#modals
	 * ========================================================================
	 * Copyright 2011-2015 Twitter, Inc.
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	 * ======================================================================== */


	+function ($) {
	  'use strict';

	  // MODAL CLASS DEFINITION
	  // ======================

	  var Modal = function (element, options) {
	    this.options             = options
	    this.$body               = $(document.body)
	    this.$element            = $(element)
	    this.$dialog             = this.$element.find('.modal-dialog')
	    this.$backdrop           = null
	    this.isShown             = null
	    this.originalBodyPad     = null
	    this.scrollbarWidth      = 0
	    this.ignoreBackdropClick = false

	    if (this.options.remote) {
	      this.$element
	        .find('.modal-content')
	        .load(this.options.remote, $.proxy(function () {
	          this.$element.trigger('loaded.bs.modal')
	        }, this))
	    }
	  }

	  Modal.VERSION  = '3.3.4'

	  Modal.TRANSITION_DURATION = 300
	  Modal.BACKDROP_TRANSITION_DURATION = 150

	  Modal.DEFAULTS = {
	    backdrop: true,
	    keyboard: true,
	    show: true
	  }

	  Modal.prototype.toggle = function (_relatedTarget) {
	    return this.isShown ? this.hide() : this.show(_relatedTarget)
	  }

	  Modal.prototype.show = function (_relatedTarget) {
	    var that = this
	    var e    = $.Event('show.bs.modal', { relatedTarget: _relatedTarget })

	    this.$element.trigger(e)

	    if (this.isShown || e.isDefaultPrevented()) return

	    this.isShown = true

	    this.checkScrollbar()
	    this.setScrollbar()
	    this.$body.addClass('modal-open')

	    this.escape()
	    this.resize()

	    this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))

	    this.$dialog.on('mousedown.dismiss.bs.modal', function () {
	      that.$element.one('mouseup.dismiss.bs.modal', function (e) {
	        if ($(e.target).is(that.$element)) that.ignoreBackdropClick = true
	      })
	    })

	    this.backdrop(function () {
	      var transition = $.support.transition && that.$element.hasClass('fade')

	      if (!that.$element.parent().length) {
	        that.$element.appendTo(that.$body) // don't move modals dom position
	      }

	      that.$element
	        .show()
	        .scrollTop(0)

	      that.adjustDialog()

	      if (transition) {
	        that.$element[0].offsetWidth // force reflow
	      }

	      that.$element
	        .addClass('in')
	        .attr('aria-hidden', false)

	      that.enforceFocus()

	      var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget })

	      transition ?
	        that.$dialog // wait for modal to slide in
	          .one('bsTransitionEnd', function () {
	            that.$element.trigger('focus').trigger(e)
	          })
	          .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
	        that.$element.trigger('focus').trigger(e)
	    })
	  }

	  Modal.prototype.hide = function (e) {
	    if (e) e.preventDefault()

	    e = $.Event('hide.bs.modal')

	    this.$element.trigger(e)

	    if (!this.isShown || e.isDefaultPrevented()) return

	    this.isShown = false

	    this.escape()
	    this.resize()

	    $(document).off('focusin.bs.modal')

	    this.$element
	      .removeClass('in')
	      .attr('aria-hidden', true)
	      .off('click.dismiss.bs.modal')
	      .off('mouseup.dismiss.bs.modal')

	    this.$dialog.off('mousedown.dismiss.bs.modal')

	    $.support.transition && this.$element.hasClass('fade') ?
	      this.$element
	        .one('bsTransitionEnd', $.proxy(this.hideModal, this))
	        .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
	      this.hideModal()
	  }

	  Modal.prototype.enforceFocus = function () {
	    $(document)
	      .off('focusin.bs.modal') // guard against infinite focus loop
	      .on('focusin.bs.modal', $.proxy(function (e) {
	        if (this.$element[0] !== e.target && !this.$element.has(e.target).length) {
	          this.$element.trigger('focus')
	        }
	      }, this))
	  }

	  Modal.prototype.escape = function () {
	    if (this.isShown && this.options.keyboard) {
	      this.$element.on('keydown.dismiss.bs.modal', $.proxy(function (e) {
	        e.which == 27 && this.hide()
	      }, this))
	    } else if (!this.isShown) {
	      this.$element.off('keydown.dismiss.bs.modal')
	    }
	  }

	  Modal.prototype.resize = function () {
	    if (this.isShown) {
	      $(window).on('resize.bs.modal', $.proxy(this.handleUpdate, this))
	    } else {
	      $(window).off('resize.bs.modal')
	    }
	  }

	  Modal.prototype.hideModal = function () {
	    var that = this
	    this.$element.hide()
	    this.backdrop(function () {
	      that.$body.removeClass('modal-open')
	      that.resetAdjustments()
	      that.resetScrollbar()
	      that.$element.trigger('hidden.bs.modal')
	    })
	  }

	  Modal.prototype.removeBackdrop = function () {
	    this.$backdrop && this.$backdrop.remove()
	    this.$backdrop = null
	  }

	  Modal.prototype.backdrop = function (callback) {
	    var that = this
	    var animate = this.$element.hasClass('fade') ? 'fade' : ''

	    if (this.isShown && this.options.backdrop) {
	      var doAnimate = $.support.transition && animate

	      this.$backdrop = $('<div class="modal-backdrop ' + animate + '" />')
	        .appendTo(this.$body)

	      this.$element.on('click.dismiss.bs.modal', $.proxy(function (e) {
	        if (this.ignoreBackdropClick) {
	          this.ignoreBackdropClick = false
	          return
	        }
	        if (e.target !== e.currentTarget) return
	        this.options.backdrop == 'static'
	          ? this.$element[0].focus()
	          : this.hide()
	      }, this))

	      if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

	      this.$backdrop.addClass('in')

	      if (!callback) return

	      doAnimate ?
	        this.$backdrop
	          .one('bsTransitionEnd', callback)
	          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
	        callback()

	    } else if (!this.isShown && this.$backdrop) {
	      this.$backdrop.removeClass('in')

	      var callbackRemove = function () {
	        that.removeBackdrop()
	        callback && callback()
	      }
	      $.support.transition && this.$element.hasClass('fade') ?
	        this.$backdrop
	          .one('bsTransitionEnd', callbackRemove)
	          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
	        callbackRemove()

	    } else if (callback) {
	      callback()
	    }
	  }

	  // these following methods are used to handle overflowing modals

	  Modal.prototype.handleUpdate = function () {
	    this.adjustDialog()
	  }

	  Modal.prototype.adjustDialog = function () {
	    var modalIsOverflowing = this.$element[0].scrollHeight > document.documentElement.clientHeight

	    this.$element.css({
	      paddingLeft:  !this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : '',
	      paddingRight: this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : ''
	    })
	  }

	  Modal.prototype.resetAdjustments = function () {
	    this.$element.css({
	      paddingLeft: '',
	      paddingRight: ''
	    })
	  }

	  Modal.prototype.checkScrollbar = function () {
	    var fullWindowWidth = window.innerWidth
	    if (!fullWindowWidth) { // workaround for missing window.innerWidth in IE8
	      var documentElementRect = document.documentElement.getBoundingClientRect()
	      fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left)
	    }
	    this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth
	    this.scrollbarWidth = this.measureScrollbar()
	  }

	  Modal.prototype.setScrollbar = function () {
	    var bodyPad = parseInt((this.$body.css('padding-right') || 0), 10)
	    this.originalBodyPad = document.body.style.paddingRight || ''
	    if (this.bodyIsOverflowing) this.$body.css('padding-right', bodyPad + this.scrollbarWidth)
	  }

	  Modal.prototype.resetScrollbar = function () {
	    this.$body.css('padding-right', this.originalBodyPad)
	  }

	  Modal.prototype.measureScrollbar = function () { // thx walsh
	    var scrollDiv = document.createElement('div')
	    scrollDiv.className = 'modal-scrollbar-measure'
	    this.$body.append(scrollDiv)
	    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
	    this.$body[0].removeChild(scrollDiv)
	    return scrollbarWidth
	  }


	  // MODAL PLUGIN DEFINITION
	  // =======================

	  function Plugin(option, _relatedTarget) {
	    return this.each(function () {
	      var $this   = $(this)
	      var data    = $this.data('bs.modal')
	      var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)

	      if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
	      if (typeof option == 'string') data[option](_relatedTarget)
	      else if (options.show) data.show(_relatedTarget)
	    })
	  }

	  var old = $.fn.modal

	  $.fn.modal             = Plugin
	  $.fn.modal.Constructor = Modal


	  // MODAL NO CONFLICT
	  // =================

	  $.fn.modal.noConflict = function () {
	    $.fn.modal = old
	    return this
	  }


	  // MODAL DATA-API
	  // ==============

	  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
	    var $this   = $(this)
	    var href    = $this.attr('href')
	    var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) // strip for ie7
	    var option  = $target.data('bs.modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())

	    if ($this.is('a')) e.preventDefault()

	    $target.one('show.bs.modal', function (showEvent) {
	      if (showEvent.isDefaultPrevented()) return // only register focus restorer if modal will actually get shown
	      $target.one('hidden.bs.modal', function () {
	        $this.is(':visible') && $this.trigger('focus')
	      })
	    })
	    Plugin.call($target, option, this)
	  })

	}(jQuery);

	/* ========================================================================
	 * Bootstrap: tooltip.js v3.3.4
	 * http://getbootstrap.com/javascript/#tooltip
	 * Inspired by the original jQuery.tipsy by Jason Frame
	 * ========================================================================
	 * Copyright 2011-2015 Twitter, Inc.
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	 * ======================================================================== */


	+function ($) {
	  'use strict';

	  // TOOLTIP PUBLIC CLASS DEFINITION
	  // ===============================

	  var Tooltip = function (element, options) {
	    this.type       = null
	    this.options    = null
	    this.enabled    = null
	    this.timeout    = null
	    this.hoverState = null
	    this.$element   = null

	    this.init('tooltip', element, options)
	  }

	  Tooltip.VERSION  = '3.3.4'

	  Tooltip.TRANSITION_DURATION = 150

	  Tooltip.DEFAULTS = {
	    animation: true,
	    placement: 'top',
	    selector: false,
	    template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
	    trigger: 'hover focus',
	    title: '',
	    delay: 0,
	    html: false,
	    container: false,
	    viewport: {
	      selector: 'body',
	      padding: 0
	    }
	  }

	  Tooltip.prototype.init = function (type, element, options) {
	    this.enabled   = true
	    this.type      = type
	    this.$element  = $(element)
	    this.options   = this.getOptions(options)
	    this.$viewport = this.options.viewport && $(this.options.viewport.selector || this.options.viewport)

	    if (this.$element[0] instanceof document.constructor && !this.options.selector) {
	      throw new Error('`selector` option must be specified when initializing ' + this.type + ' on the window.document object!')
	    }

	    var triggers = this.options.trigger.split(' ')

	    for (var i = triggers.length; i--;) {
	      var trigger = triggers[i]

	      if (trigger == 'click') {
	        this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
	      } else if (trigger != 'manual') {
	        var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focusin'
	        var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout'

	        this.$element.on(eventIn  + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
	        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
	      }
	    }

	    this.options.selector ?
	      (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
	      this.fixTitle()
	  }

	  Tooltip.prototype.getDefaults = function () {
	    return Tooltip.DEFAULTS
	  }

	  Tooltip.prototype.getOptions = function (options) {
	    options = $.extend({}, this.getDefaults(), this.$element.data(), options)

	    if (options.delay && typeof options.delay == 'number') {
	      options.delay = {
	        show: options.delay,
	        hide: options.delay
	      }
	    }

	    return options
	  }

	  Tooltip.prototype.getDelegateOptions = function () {
	    var options  = {}
	    var defaults = this.getDefaults()

	    this._options && $.each(this._options, function (key, value) {
	      if (defaults[key] != value) options[key] = value
	    })

	    return options
	  }

	  Tooltip.prototype.enter = function (obj) {
	    var self = obj instanceof this.constructor ?
	      obj : $(obj.currentTarget).data('bs.' + this.type)

	    if (self && self.$tip && self.$tip.is(':visible')) {
	      self.hoverState = 'in'
	      return
	    }

	    if (!self) {
	      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
	      $(obj.currentTarget).data('bs.' + this.type, self)
	    }

	    clearTimeout(self.timeout)

	    self.hoverState = 'in'

	    if (!self.options.delay || !self.options.delay.show) return self.show()

	    self.timeout = setTimeout(function () {
	      if (self.hoverState == 'in') self.show()
	    }, self.options.delay.show)
	  }

	  Tooltip.prototype.leave = function (obj) {
	    var self = obj instanceof this.constructor ?
	      obj : $(obj.currentTarget).data('bs.' + this.type)

	    if (!self) {
	      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
	      $(obj.currentTarget).data('bs.' + this.type, self)
	    }

	    clearTimeout(self.timeout)

	    self.hoverState = 'out'

	    if (!self.options.delay || !self.options.delay.hide) return self.hide()

	    self.timeout = setTimeout(function () {
	      if (self.hoverState == 'out') self.hide()
	    }, self.options.delay.hide)
	  }

	  Tooltip.prototype.show = function () {
	    var e = $.Event('show.bs.' + this.type)

	    if (this.hasContent() && this.enabled) {
	      this.$element.trigger(e)

	      var inDom = $.contains(this.$element[0].ownerDocument.documentElement, this.$element[0])
	      if (e.isDefaultPrevented() || !inDom) return
	      var that = this

	      var $tip = this.tip()

	      var tipId = this.getUID(this.type)

	      this.setContent()
	      $tip.attr('id', tipId)
	      this.$element.attr('aria-describedby', tipId)

	      if (this.options.animation) $tip.addClass('fade')

	      var placement = typeof this.options.placement == 'function' ?
	        this.options.placement.call(this, $tip[0], this.$element[0]) :
	        this.options.placement

	      var autoToken = /\s?auto?\s?/i
	      var autoPlace = autoToken.test(placement)
	      if (autoPlace) placement = placement.replace(autoToken, '') || 'top'

	      $tip
	        .detach()
	        .css({ top: 0, left: 0, display: 'block' })
	        .addClass(placement)
	        .data('bs.' + this.type, this)

	      this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)

	      var pos          = this.getPosition()
	      var actualWidth  = $tip[0].offsetWidth
	      var actualHeight = $tip[0].offsetHeight

	      if (autoPlace) {
	        var orgPlacement = placement
	        var $container   = this.options.container ? $(this.options.container) : this.$element.parent()
	        var containerDim = this.getPosition($container)

	        placement = placement == 'bottom' && pos.bottom + actualHeight > containerDim.bottom ? 'top'    :
	                    placement == 'top'    && pos.top    - actualHeight < containerDim.top    ? 'bottom' :
	                    placement == 'right'  && pos.right  + actualWidth  > containerDim.width  ? 'left'   :
	                    placement == 'left'   && pos.left   - actualWidth  < containerDim.left   ? 'right'  :
	                    placement

	        $tip
	          .removeClass(orgPlacement)
	          .addClass(placement)
	      }

	      var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight)

	      this.applyPlacement(calculatedOffset, placement)

	      var complete = function () {
	        var prevHoverState = that.hoverState
	        that.$element.trigger('shown.bs.' + that.type)
	        that.hoverState = null

	        if (prevHoverState == 'out') that.leave(that)
	      }

	      $.support.transition && this.$tip.hasClass('fade') ?
	        $tip
	          .one('bsTransitionEnd', complete)
	          .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
	        complete()
	    }
	  }

	  Tooltip.prototype.applyPlacement = function (offset, placement) {
	    var $tip   = this.tip()
	    var width  = $tip[0].offsetWidth
	    var height = $tip[0].offsetHeight

	    // manually read margins because getBoundingClientRect includes difference
	    var marginTop = parseInt($tip.css('margin-top'), 10)
	    var marginLeft = parseInt($tip.css('margin-left'), 10)

	    // we must check for NaN for ie 8/9
	    if (isNaN(marginTop))  marginTop  = 0
	    if (isNaN(marginLeft)) marginLeft = 0

	    offset.top  = offset.top  + marginTop
	    offset.left = offset.left + marginLeft

	    // $.fn.offset doesn't round pixel values
	    // so we use setOffset directly with our own function B-0
	    $.offset.setOffset($tip[0], $.extend({
	      using: function (props) {
	        $tip.css({
	          top: Math.round(props.top),
	          left: Math.round(props.left)
	        })
	      }
	    }, offset), 0)

	    $tip.addClass('in')

	    // check to see if placing tip in new offset caused the tip to resize itself
	    var actualWidth  = $tip[0].offsetWidth
	    var actualHeight = $tip[0].offsetHeight

	    if (placement == 'top' && actualHeight != height) {
	      offset.top = offset.top + height - actualHeight
	    }

	    var delta = this.getViewportAdjustedDelta(placement, offset, actualWidth, actualHeight)

	    if (delta.left) offset.left += delta.left
	    else offset.top += delta.top

	    var isVertical          = /top|bottom/.test(placement)
	    var arrowDelta          = isVertical ? delta.left * 2 - width + actualWidth : delta.top * 2 - height + actualHeight
	    var arrowOffsetPosition = isVertical ? 'offsetWidth' : 'offsetHeight'

	    $tip.offset(offset)
	    this.replaceArrow(arrowDelta, $tip[0][arrowOffsetPosition], isVertical)
	  }

	  Tooltip.prototype.replaceArrow = function (delta, dimension, isVertical) {
	    this.arrow()
	      .css(isVertical ? 'left' : 'top', 50 * (1 - delta / dimension) + '%')
	      .css(isVertical ? 'top' : 'left', '')
	  }

	  Tooltip.prototype.setContent = function () {
	    var $tip  = this.tip()
	    var title = this.getTitle()

	    $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
	    $tip.removeClass('fade in top bottom left right')
	  }

	  Tooltip.prototype.hide = function (callback) {
	    var that = this
	    var $tip = $(this.$tip)
	    var e    = $.Event('hide.bs.' + this.type)

	    function complete() {
	      if (that.hoverState != 'in') $tip.detach()
	      that.$element
	        .removeAttr('aria-describedby')
	        .trigger('hidden.bs.' + that.type)
	      callback && callback()
	    }

	    this.$element.trigger(e)

	    if (e.isDefaultPrevented()) return

	    $tip.removeClass('in')

	    $.support.transition && $tip.hasClass('fade') ?
	      $tip
	        .one('bsTransitionEnd', complete)
	        .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
	      complete()

	    this.hoverState = null

	    return this
	  }

	  Tooltip.prototype.fixTitle = function () {
	    var $e = this.$element
	    if ($e.attr('title') || typeof ($e.attr('data-original-title')) != 'string') {
	      $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
	    }
	  }

	  Tooltip.prototype.hasContent = function () {
	    return this.getTitle()
	  }

	  Tooltip.prototype.getPosition = function ($element) {
	    $element   = $element || this.$element

	    var el     = $element[0]
	    var isBody = el.tagName == 'BODY'

	    var elRect    = el.getBoundingClientRect()
	    if (elRect.width == null) {
	      // width and height are missing in IE8, so compute them manually; see https://github.com/twbs/bootstrap/issues/14093
	      elRect = $.extend({}, elRect, { width: elRect.right - elRect.left, height: elRect.bottom - elRect.top })
	    }
	    var elOffset  = isBody ? { top: 0, left: 0 } : $element.offset()
	    var scroll    = { scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : $element.scrollTop() }
	    var outerDims = isBody ? { width: $(window).width(), height: $(window).height() } : null

	    return $.extend({}, elRect, scroll, outerDims, elOffset)
	  }

	  Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
	    return placement == 'bottom' ? { top: pos.top + pos.height,   left: pos.left + pos.width / 2 - actualWidth / 2 } :
	           placement == 'top'    ? { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2 } :
	           placement == 'left'   ? { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth } :
	        /* placement == 'right' */ { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width }

	  }

	  Tooltip.prototype.getViewportAdjustedDelta = function (placement, pos, actualWidth, actualHeight) {
	    var delta = { top: 0, left: 0 }
	    if (!this.$viewport) return delta

	    var viewportPadding = this.options.viewport && this.options.viewport.padding || 0
	    var viewportDimensions = this.getPosition(this.$viewport)

	    if (/right|left/.test(placement)) {
	      var topEdgeOffset    = pos.top - viewportPadding - viewportDimensions.scroll
	      var bottomEdgeOffset = pos.top + viewportPadding - viewportDimensions.scroll + actualHeight
	      if (topEdgeOffset < viewportDimensions.top) { // top overflow
	        delta.top = viewportDimensions.top - topEdgeOffset
	      } else if (bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height) { // bottom overflow
	        delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset
	      }
	    } else {
	      var leftEdgeOffset  = pos.left - viewportPadding
	      var rightEdgeOffset = pos.left + viewportPadding + actualWidth
	      if (leftEdgeOffset < viewportDimensions.left) { // left overflow
	        delta.left = viewportDimensions.left - leftEdgeOffset
	      } else if (rightEdgeOffset > viewportDimensions.width) { // right overflow
	        delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset
	      }
	    }

	    return delta
	  }

	  Tooltip.prototype.getTitle = function () {
	    var title
	    var $e = this.$element
	    var o  = this.options

	    title = $e.attr('data-original-title')
	      || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

	    return title
	  }

	  Tooltip.prototype.getUID = function (prefix) {
	    do prefix += ~~(Math.random() * 1000000)
	    while (document.getElementById(prefix))
	    return prefix
	  }

	  Tooltip.prototype.tip = function () {
	    return (this.$tip = this.$tip || $(this.options.template))
	  }

	  Tooltip.prototype.arrow = function () {
	    return (this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow'))
	  }

	  Tooltip.prototype.enable = function () {
	    this.enabled = true
	  }

	  Tooltip.prototype.disable = function () {
	    this.enabled = false
	  }

	  Tooltip.prototype.toggleEnabled = function () {
	    this.enabled = !this.enabled
	  }

	  Tooltip.prototype.toggle = function (e) {
	    var self = this
	    if (e) {
	      self = $(e.currentTarget).data('bs.' + this.type)
	      if (!self) {
	        self = new this.constructor(e.currentTarget, this.getDelegateOptions())
	        $(e.currentTarget).data('bs.' + this.type, self)
	      }
	    }

	    self.tip().hasClass('in') ? self.leave(self) : self.enter(self)
	  }

	  Tooltip.prototype.destroy = function () {
	    var that = this
	    clearTimeout(this.timeout)
	    this.hide(function () {
	      that.$element.off('.' + that.type).removeData('bs.' + that.type)
	    })
	  }


	  // TOOLTIP PLUGIN DEFINITION
	  // =========================

	  function Plugin(option) {
	    return this.each(function () {
	      var $this   = $(this)
	      var data    = $this.data('bs.tooltip')
	      var options = typeof option == 'object' && option

	      if (!data && /destroy|hide/.test(option)) return
	      if (!data) $this.data('bs.tooltip', (data = new Tooltip(this, options)))
	      if (typeof option == 'string') data[option]()
	    })
	  }

	  var old = $.fn.tooltip

	  $.fn.tooltip             = Plugin
	  $.fn.tooltip.Constructor = Tooltip


	  // TOOLTIP NO CONFLICT
	  // ===================

	  $.fn.tooltip.noConflict = function () {
	    $.fn.tooltip = old
	    return this
	  }

	}(jQuery);

	/* ========================================================================
	 * Bootstrap: popover.js v3.3.4
	 * http://getbootstrap.com/javascript/#popovers
	 * ========================================================================
	 * Copyright 2011-2015 Twitter, Inc.
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	 * ======================================================================== */


	+function ($) {
	  'use strict';

	  // POPOVER PUBLIC CLASS DEFINITION
	  // ===============================

	  var Popover = function (element, options) {
	    this.init('popover', element, options)
	  }

	  if (!$.fn.tooltip) throw new Error('Popover requires tooltip.js')

	  Popover.VERSION  = '3.3.4'

	  Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
	    placement: 'right',
	    trigger: 'click',
	    content: '',
	    template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
	  })


	  // NOTE: POPOVER EXTENDS tooltip.js
	  // ================================

	  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype)

	  Popover.prototype.constructor = Popover

	  Popover.prototype.getDefaults = function () {
	    return Popover.DEFAULTS
	  }

	  Popover.prototype.setContent = function () {
	    var $tip    = this.tip()
	    var title   = this.getTitle()
	    var content = this.getContent()

	    $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
	    $tip.find('.popover-content').children().detach().end()[ // we use append for html objects to maintain js events
	      this.options.html ? (typeof content == 'string' ? 'html' : 'append') : 'text'
	    ](content)

	    $tip.removeClass('fade top bottom left right in')

	    // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
	    // this manually by checking the contents.
	    if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide()
	  }

	  Popover.prototype.hasContent = function () {
	    return this.getTitle() || this.getContent()
	  }

	  Popover.prototype.getContent = function () {
	    var $e = this.$element
	    var o  = this.options

	    return $e.attr('data-content')
	      || (typeof o.content == 'function' ?
	            o.content.call($e[0]) :
	            o.content)
	  }

	  Popover.prototype.arrow = function () {
	    return (this.$arrow = this.$arrow || this.tip().find('.arrow'))
	  }


	  // POPOVER PLUGIN DEFINITION
	  // =========================

	  function Plugin(option) {
	    return this.each(function () {
	      var $this   = $(this)
	      var data    = $this.data('bs.popover')
	      var options = typeof option == 'object' && option

	      if (!data && /destroy|hide/.test(option)) return
	      if (!data) $this.data('bs.popover', (data = new Popover(this, options)))
	      if (typeof option == 'string') data[option]()
	    })
	  }

	  var old = $.fn.popover

	  $.fn.popover             = Plugin
	  $.fn.popover.Constructor = Popover


	  // POPOVER NO CONFLICT
	  // ===================

	  $.fn.popover.noConflict = function () {
	    $.fn.popover = old
	    return this
	  }

	}(jQuery);

	/* ========================================================================
	 * Bootstrap: scrollspy.js v3.3.4
	 * http://getbootstrap.com/javascript/#scrollspy
	 * ========================================================================
	 * Copyright 2011-2015 Twitter, Inc.
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	 * ======================================================================== */


	+function ($) {
	  'use strict';

	  // SCROLLSPY CLASS DEFINITION
	  // ==========================

	  function ScrollSpy(element, options) {
	    this.$body          = $(document.body)
	    this.$scrollElement = $(element).is(document.body) ? $(window) : $(element)
	    this.options        = $.extend({}, ScrollSpy.DEFAULTS, options)
	    this.selector       = (this.options.target || '') + ' .nav li > a'
	    this.offsets        = []
	    this.targets        = []
	    this.activeTarget   = null
	    this.scrollHeight   = 0

	    this.$scrollElement.on('scroll.bs.scrollspy', $.proxy(this.process, this))
	    this.refresh()
	    this.process()
	  }

	  ScrollSpy.VERSION  = '3.3.4'

	  ScrollSpy.DEFAULTS = {
	    offset: 10
	  }

	  ScrollSpy.prototype.getScrollHeight = function () {
	    return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
	  }

	  ScrollSpy.prototype.refresh = function () {
	    var that          = this
	    var offsetMethod  = 'offset'
	    var offsetBase    = 0

	    this.offsets      = []
	    this.targets      = []
	    this.scrollHeight = this.getScrollHeight()

	    if (!$.isWindow(this.$scrollElement[0])) {
	      offsetMethod = 'position'
	      offsetBase   = this.$scrollElement.scrollTop()
	    }

	    this.$body
	      .find(this.selector)
	      .map(function () {
	        var $el   = $(this)
	        var href  = $el.data('target') || $el.attr('href')
	        var $href = /^#./.test(href) && $(href)

	        return ($href
	          && $href.length
	          && $href.is(':visible')
	          && [[$href[offsetMethod]().top + offsetBase, href]]) || null
	      })
	      .sort(function (a, b) { return a[0] - b[0] })
	      .each(function () {
	        that.offsets.push(this[0])
	        that.targets.push(this[1])
	      })
	  }

	  ScrollSpy.prototype.process = function () {
	    var scrollTop    = this.$scrollElement.scrollTop() + this.options.offset
	    var scrollHeight = this.getScrollHeight()
	    var maxScroll    = this.options.offset + scrollHeight - this.$scrollElement.height()
	    var offsets      = this.offsets
	    var targets      = this.targets
	    var activeTarget = this.activeTarget
	    var i

	    if (this.scrollHeight != scrollHeight) {
	      this.refresh()
	    }

	    if (scrollTop >= maxScroll) {
	      return activeTarget != (i = targets[targets.length - 1]) && this.activate(i)
	    }

	    if (activeTarget && scrollTop < offsets[0]) {
	      this.activeTarget = null
	      return this.clear()
	    }

	    for (i = offsets.length; i--;) {
	      activeTarget != targets[i]
	        && scrollTop >= offsets[i]
	        && (offsets[i + 1] === undefined || scrollTop < offsets[i + 1])
	        && this.activate(targets[i])
	    }
	  }

	  ScrollSpy.prototype.activate = function (target) {
	    this.activeTarget = target

	    this.clear()

	    var selector = this.selector +
	      '[data-target="' + target + '"],' +
	      this.selector + '[href="' + target + '"]'

	    var active = $(selector)
	      .parents('li')
	      .addClass('active')

	    if (active.parent('.dropdown-menu').length) {
	      active = active
	        .closest('li.dropdown')
	        .addClass('active')
	    }

	    active.trigger('activate.bs.scrollspy')
	  }

	  ScrollSpy.prototype.clear = function () {
	    $(this.selector)
	      .parentsUntil(this.options.target, '.active')
	      .removeClass('active')
	  }


	  // SCROLLSPY PLUGIN DEFINITION
	  // ===========================

	  function Plugin(option) {
	    return this.each(function () {
	      var $this   = $(this)
	      var data    = $this.data('bs.scrollspy')
	      var options = typeof option == 'object' && option

	      if (!data) $this.data('bs.scrollspy', (data = new ScrollSpy(this, options)))
	      if (typeof option == 'string') data[option]()
	    })
	  }

	  var old = $.fn.scrollspy

	  $.fn.scrollspy             = Plugin
	  $.fn.scrollspy.Constructor = ScrollSpy


	  // SCROLLSPY NO CONFLICT
	  // =====================

	  $.fn.scrollspy.noConflict = function () {
	    $.fn.scrollspy = old
	    return this
	  }


	  // SCROLLSPY DATA-API
	  // ==================

	  $(window).on('load.bs.scrollspy.data-api', function () {
	    $('[data-spy="scroll"]').each(function () {
	      var $spy = $(this)
	      Plugin.call($spy, $spy.data())
	    })
	  })

	}(jQuery);

	/* ========================================================================
	 * Bootstrap: tab.js v3.3.4
	 * http://getbootstrap.com/javascript/#tabs
	 * ========================================================================
	 * Copyright 2011-2015 Twitter, Inc.
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	 * ======================================================================== */


	+function ($) {
	  'use strict';

	  // TAB CLASS DEFINITION
	  // ====================

	  var Tab = function (element) {
	    this.element = $(element)
	  }

	  Tab.VERSION = '3.3.4'

	  Tab.TRANSITION_DURATION = 150

	  Tab.prototype.show = function () {
	    var $this    = this.element
	    var $ul      = $this.closest('ul:not(.dropdown-menu)')
	    var selector = $this.data('target')

	    if (!selector) {
	      selector = $this.attr('href')
	      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
	    }

	    if ($this.parent('li').hasClass('active')) return

	    var $previous = $ul.find('.active:last a')
	    var hideEvent = $.Event('hide.bs.tab', {
	      relatedTarget: $this[0]
	    })
	    var showEvent = $.Event('show.bs.tab', {
	      relatedTarget: $previous[0]
	    })

	    $previous.trigger(hideEvent)
	    $this.trigger(showEvent)

	    if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) return

	    var $target = $(selector)

	    this.activate($this.closest('li'), $ul)
	    this.activate($target, $target.parent(), function () {
	      $previous.trigger({
	        type: 'hidden.bs.tab',
	        relatedTarget: $this[0]
	      })
	      $this.trigger({
	        type: 'shown.bs.tab',
	        relatedTarget: $previous[0]
	      })
	    })
	  }

	  Tab.prototype.activate = function (element, container, callback) {
	    var $active    = container.find('> .active')
	    var transition = callback
	      && $.support.transition
	      && (($active.length && $active.hasClass('fade')) || !!container.find('> .fade').length)

	    function next() {
	      $active
	        .removeClass('active')
	        .find('> .dropdown-menu > .active')
	          .removeClass('active')
	        .end()
	        .find('[data-toggle="tab"]')
	          .attr('aria-expanded', false)

	      element
	        .addClass('active')
	        .find('[data-toggle="tab"]')
	          .attr('aria-expanded', true)

	      if (transition) {
	        element[0].offsetWidth // reflow for transition
	        element.addClass('in')
	      } else {
	        element.removeClass('fade')
	      }

	      if (element.parent('.dropdown-menu').length) {
	        element
	          .closest('li.dropdown')
	            .addClass('active')
	          .end()
	          .find('[data-toggle="tab"]')
	            .attr('aria-expanded', true)
	      }

	      callback && callback()
	    }

	    $active.length && transition ?
	      $active
	        .one('bsTransitionEnd', next)
	        .emulateTransitionEnd(Tab.TRANSITION_DURATION) :
	      next()

	    $active.removeClass('in')
	  }


	  // TAB PLUGIN DEFINITION
	  // =====================

	  function Plugin(option) {
	    return this.each(function () {
	      var $this = $(this)
	      var data  = $this.data('bs.tab')

	      if (!data) $this.data('bs.tab', (data = new Tab(this)))
	      if (typeof option == 'string') data[option]()
	    })
	  }

	  var old = $.fn.tab

	  $.fn.tab             = Plugin
	  $.fn.tab.Constructor = Tab


	  // TAB NO CONFLICT
	  // ===============

	  $.fn.tab.noConflict = function () {
	    $.fn.tab = old
	    return this
	  }


	  // TAB DATA-API
	  // ============

	  var clickHandler = function (e) {
	    e.preventDefault()
	    Plugin.call($(this), 'show')
	  }

	  $(document)
	    .on('click.bs.tab.data-api', '[data-toggle="tab"]', clickHandler)
	    .on('click.bs.tab.data-api', '[data-toggle="pill"]', clickHandler)

	}(jQuery);

	/* ========================================================================
	 * Bootstrap: affix.js v3.3.4
	 * http://getbootstrap.com/javascript/#affix
	 * ========================================================================
	 * Copyright 2011-2015 Twitter, Inc.
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	 * ======================================================================== */


	+function ($) {
	  'use strict';

	  // AFFIX CLASS DEFINITION
	  // ======================

	  var Affix = function (element, options) {
	    this.options = $.extend({}, Affix.DEFAULTS, options)

	    this.$target = $(this.options.target)
	      .on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this))
	      .on('click.bs.affix.data-api',  $.proxy(this.checkPositionWithEventLoop, this))

	    this.$element     = $(element)
	    this.affixed      = null
	    this.unpin        = null
	    this.pinnedOffset = null

	    this.checkPosition()
	  }

	  Affix.VERSION  = '3.3.4'

	  Affix.RESET    = 'affix affix-top affix-bottom'

	  Affix.DEFAULTS = {
	    offset: 0,
	    target: window
	  }

	  Affix.prototype.getState = function (scrollHeight, height, offsetTop, offsetBottom) {
	    var scrollTop    = this.$target.scrollTop()
	    var position     = this.$element.offset()
	    var targetHeight = this.$target.height()

	    if (offsetTop != null && this.affixed == 'top') return scrollTop < offsetTop ? 'top' : false

	    if (this.affixed == 'bottom') {
	      if (offsetTop != null) return (scrollTop + this.unpin <= position.top) ? false : 'bottom'
	      return (scrollTop + targetHeight <= scrollHeight - offsetBottom) ? false : 'bottom'
	    }

	    var initializing   = this.affixed == null
	    var colliderTop    = initializing ? scrollTop : position.top
	    var colliderHeight = initializing ? targetHeight : height

	    if (offsetTop != null && scrollTop <= offsetTop) return 'top'
	    if (offsetBottom != null && (colliderTop + colliderHeight >= scrollHeight - offsetBottom)) return 'bottom'

	    return false
	  }

	  Affix.prototype.getPinnedOffset = function () {
	    if (this.pinnedOffset) return this.pinnedOffset
	    this.$element.removeClass(Affix.RESET).addClass('affix')
	    var scrollTop = this.$target.scrollTop()
	    var position  = this.$element.offset()
	    return (this.pinnedOffset = position.top - scrollTop)
	  }

	  Affix.prototype.checkPositionWithEventLoop = function () {
	    setTimeout($.proxy(this.checkPosition, this), 1)
	  }

	  Affix.prototype.checkPosition = function () {
	    if (!this.$element.is(':visible')) return

	    var height       = this.$element.height()
	    var offset       = this.options.offset
	    var offsetTop    = offset.top
	    var offsetBottom = offset.bottom
	    var scrollHeight = $(document.body).height()

	    if (typeof offset != 'object')         offsetBottom = offsetTop = offset
	    if (typeof offsetTop == 'function')    offsetTop    = offset.top(this.$element)
	    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom(this.$element)

	    var affix = this.getState(scrollHeight, height, offsetTop, offsetBottom)

	    if (this.affixed != affix) {
	      if (this.unpin != null) this.$element.css('top', '')

	      var affixType = 'affix' + (affix ? '-' + affix : '')
	      var e         = $.Event(affixType + '.bs.affix')

	      this.$element.trigger(e)

	      if (e.isDefaultPrevented()) return

	      this.affixed = affix
	      this.unpin = affix == 'bottom' ? this.getPinnedOffset() : null

	      this.$element
	        .removeClass(Affix.RESET)
	        .addClass(affixType)
	        .trigger(affixType.replace('affix', 'affixed') + '.bs.affix')
	    }

	    if (affix == 'bottom') {
	      this.$element.offset({
	        top: scrollHeight - height - offsetBottom
	      })
	    }
	  }


	  // AFFIX PLUGIN DEFINITION
	  // =======================

	  function Plugin(option) {
	    return this.each(function () {
	      var $this   = $(this)
	      var data    = $this.data('bs.affix')
	      var options = typeof option == 'object' && option

	      if (!data) $this.data('bs.affix', (data = new Affix(this, options)))
	      if (typeof option == 'string') data[option]()
	    })
	  }

	  var old = $.fn.affix

	  $.fn.affix             = Plugin
	  $.fn.affix.Constructor = Affix


	  // AFFIX NO CONFLICT
	  // =================

	  $.fn.affix.noConflict = function () {
	    $.fn.affix = old
	    return this
	  }


	  // AFFIX DATA-API
	  // ==============

	  $(window).on('load', function () {
	    $('[data-spy="affix"]').each(function () {
	      var $spy = $(this)
	      var data = $spy.data()

	      data.offset = data.offset || {}

	      if (data.offsetBottom != null) data.offset.bottom = data.offsetBottom
	      if (data.offsetTop    != null) data.offset.top    = data.offsetTop

	      Plugin.call($spy, data)
	    })
	  })

	}(jQuery);


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
	Copyright (c) 2010,2011,2012,2013,2014 Morgan Roderick http://roderick.dk
	License: MIT - http://mrgnrdrck.mit-license.org

	https://github.com/mroderick/PubSubJS
	*/
	(function (root, factory){
		'use strict';

	    if (true){
	        // AMD. Register as an anonymous module.
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

	    } else if (typeof exports === 'object'){
	        // CommonJS
	        factory(exports);

	    }

	    // Browser globals
	    var PubSub = {};
	    root.PubSub = PubSub;
	    factory(PubSub);

	}(( typeof window === 'object' && window ) || this, function (PubSub){
		'use strict';

		var messages = {},
			lastUid = -1;

		function hasKeys(obj){
			var key;

			for (key in obj){
				if ( obj.hasOwnProperty(key) ){
					return true;
				}
			}
			return false;
		}

		/**
		 *	Returns a function that throws the passed exception, for use as argument for setTimeout
		 *	@param { Object } ex An Error object
		 */
		function throwException( ex ){
			return function reThrowException(){
				throw ex;
			};
		}

		function callSubscriberWithDelayedExceptions( subscriber, message, data ){
			try {
				subscriber( message, data );
			} catch( ex ){
				setTimeout( throwException( ex ), 0);
			}
		}

		function callSubscriberWithImmediateExceptions( subscriber, message, data ){
			subscriber( message, data );
		}

		function deliverMessage( originalMessage, matchedMessage, data, immediateExceptions ){
			var subscribers = messages[matchedMessage],
				callSubscriber = immediateExceptions ? callSubscriberWithImmediateExceptions : callSubscriberWithDelayedExceptions,
				s;

			if ( !messages.hasOwnProperty( matchedMessage ) ) {
				return;
			}

			for (s in subscribers){
				if ( subscribers.hasOwnProperty(s)){
					callSubscriber( subscribers[s], originalMessage, data );
				}
			}
		}

		function createDeliveryFunction( message, data, immediateExceptions ){
			return function deliverNamespaced(){
				var topic = String( message ),
					position = topic.lastIndexOf( '.' );

				// deliver the message as it is now
				deliverMessage(message, message, data, immediateExceptions);

				// trim the hierarchy and deliver message to each level
				while( position !== -1 ){
					topic = topic.substr( 0, position );
					position = topic.lastIndexOf('.');
					deliverMessage( message, topic, data, immediateExceptions );
				}
			};
		}

		function messageHasSubscribers( message ){
			var topic = String( message ),
				found = Boolean(messages.hasOwnProperty( topic ) && hasKeys(messages[topic])),
				position = topic.lastIndexOf( '.' );

			while ( !found && position !== -1 ){
				topic = topic.substr( 0, position );
				position = topic.lastIndexOf( '.' );
				found = Boolean(messages.hasOwnProperty( topic ) && hasKeys(messages[topic]));
			}

			return found;
		}

		function publish( message, data, sync, immediateExceptions ){
			var deliver = createDeliveryFunction( message, data, immediateExceptions ),
				hasSubscribers = messageHasSubscribers( message );

			if ( !hasSubscribers ){
				return false;
			}

			if ( sync === true ){
				deliver();
			} else {
				setTimeout( deliver, 0 );
			}
			return true;
		}

		/**
		 *	PubSub.publish( message[, data] ) -> Boolean
		 *	- message (String): The message to publish
		 *	- data: The data to pass to subscribers
		 *	Publishes the the message, passing the data to it's subscribers
		**/
		PubSub.publish = function( message, data ){
			return publish( message, data, false, PubSub.immediateExceptions );
		};

		/**
		 *	PubSub.publishSync( message[, data] ) -> Boolean
		 *	- message (String): The message to publish
		 *	- data: The data to pass to subscribers
		 *	Publishes the the message synchronously, passing the data to it's subscribers
		**/
		PubSub.publishSync = function( message, data ){
			return publish( message, data, true, PubSub.immediateExceptions );
		};

		/**
		 *	PubSub.subscribe( message, func ) -> String
		 *	- message (String): The message to subscribe to
		 *	- func (Function): The function to call when a new message is published
		 *	Subscribes the passed function to the passed message. Every returned token is unique and should be stored if
		 *	you need to unsubscribe
		**/
		PubSub.subscribe = function( message, func ){
			if ( typeof func !== 'function'){
				return false;
			}

			// message is not registered yet
			if ( !messages.hasOwnProperty( message ) ){
				messages[message] = {};
			}

			// forcing token as String, to allow for future expansions without breaking usage
			// and allow for easy use as key names for the 'messages' object
			var token = 'uid_' + String(++lastUid);
			messages[message][token] = func;

			// return token for unsubscribing
			return token;
		};

		/* Public: Clears all subscriptions
		 */
		PubSub.clearAllSubscriptions = function clearAllSubscriptions(){
			messages = {};
		};

		/*Public: Clear subscriptions by the topic
		*/
		PubSub.clearSubscriptions = function clearSubscriptions(topic){
			var m;
			for (m in messages){
				if (messages.hasOwnProperty(m) && m.indexOf(topic) === 0){
					delete messages[m];
				}
			}
		};

		/* Public: removes subscriptions.
		 * When passed a token, removes a specific subscription.
		 * When passed a function, removes all subscriptions for that function
		 * When passed a topic, removes all subscriptions for that topic (hierarchy)
		 *
		 * value - A token, function or topic to unsubscribe.
		 *
		 * Examples
		 *
		 *		// Example 1 - unsubscribing with a token
		 *		var token = PubSub.subscribe('mytopic', myFunc);
		 *		PubSub.unsubscribe(token);
		 *
		 *		// Example 2 - unsubscribing with a function
		 *		PubSub.unsubscribe(myFunc);
		 *
		 *		// Example 3 - unsubscribing a topic
		 *		PubSub.unsubscribe('mytopic');
		 */
		PubSub.unsubscribe = function(value){
			var isTopic    = typeof value === 'string' && messages.hasOwnProperty(value),
				isToken    = !isTopic && typeof value === 'string',
				isFunction = typeof value === 'function',
				result = false,
				m, message, t;

			if (isTopic){
				delete messages[value];
				return;
			}

			for ( m in messages ){
				if ( messages.hasOwnProperty( m ) ){
					message = messages[m];

					if ( isToken && message[value] ){
						delete message[value];
						result = value;
						// tokens are unique, so we can just stop here
						break;
					}

					if (isFunction) {
						for ( t in message ){
							if (message.hasOwnProperty(t) && message[t] === value){
								delete message[t];
								result = true;
							}
						}
					}
				}
			}

			return result;
		};
	}));


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
	    var Layout = __webpack_require__(16);
	    var Toolbar = __webpack_require__(17);
	    var designer = __webpack_require__(18);


	    var init = function (param) {
	        var id = param.id;
	        var viewid = param.viewid;
	        var element = param.element;
	        var router = param.router;
	        var modifytime = param.modifytime;





	        if($('#designer').length==0){
	            $('#content').append(designer);
	        }
	        else {
	            $('#designerContent').html('');
	        }


	        function initLayout(p, params) {
	            var require = window.require;
	            var module = p;
	            requirejs.undef(module);
	            if (params.length == 1)
	                params = params[0]
	            module = module+ "?bust=" +  (new Date()).getTime();
	            require([module], function (module) {
	                var options = {
	                    "isSortable": true,
	                    "isWidgetEdit": true,
	                    "ModifiedLayout": true,
	                    "isShowWidgetName": true,
	                    "element":element
	                };

	                require(['jqueryui'],function(){
	                    //初始化布局
	                    var layout = new Layout('#designerContent', {
	                        viewId: viewid,
	                        layoutId: id
	                    });
	                    //初始化工具栏
	                    var tools = new Toolbar('#toolbars', {
	                        layout: layout,
	                        layoutId: id,
	                        modifytime:modifytime
	                    });

	                    $('#designerContent').css('height',$('body').height()-10);

	                    $('#designer').on('hidden.bs.modal', function () {
	                        setTimeout(function(){
	                            if(typeof PubSub!='undefined'&& PubSub.publish('designer.closeAfter')){
	                            }
	                            else {
	                                location.href = '#/'+decodeURIComponent(router);
	                            }
	                        },100)
	                    }).on('shown.bs.modal',function(){
	                        if(typeof PubSub!='undefined'){
	                            PubSub.publish('designer.showBefore');
	                        }
	                        module.init(options);
	                        $('#toolbars input').placeholder();
	                    }).modal('show');
	                })
	            })
	        }

	        initLayout(contextRoot + "/data:layout/" + id, []);
	        /*判断是否有无viewid*/
	        //if (viewid != null) {
	        //    initLayout(contextRoot + "/data:layout/" + id, []);
	        //}
	        //if(viewid == null) {
	        //    tools.setLayout(true);
	        //}

	    };

	    window.layout = init;
	    return {
	        init:init
	    }
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * Created by chief on 15/11/4.
	 */
	//布局设置按钮
	/*
	 * options
	 *
	 * isLayoutEdit  是否可以编辑布局
	 * isSortable   是否可以拖动
	 * layoutId     布局id
	 * viewId       预览id
	 * status       用户态1 设计态0
	 */
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
	    var Layout = function (containter, options) {
	        var options = options || {};
	        this.options = {
	            isLayoutEdit: true,
	            isSortable: false,
	            layoutId: null,
	            viewId: null,
	            gridData: [],
	            status: 0
	        };
	        this.options = $.extend(this.options, options);
	        this.edit();
	        this.containter = $(containter) || $('#designerContent');
	        //this.editLayout();
	    }
	    Layout.prototype = {
	        init: function () {
	            var d = this.options;
	            if (!d.layoutId) {
	                return false;
	            }
	            if (d.viewId || d.layoutId) {
	                this.initSortable($('.widgetBox'));
	            }
	            if (d.isLayoutEdit) {
	                this.getLayoutData();
	            }
	            if (d.isSortable) {
	                this.initSortable();
	            }
	            return this;

	        },
	        createElement: function () {

	        },
	        editLayout: function () {
	            var _this = this;
	            var container = _this.containter;
	            setTimeout(function () {

	                var w = (container.width() + 30) / 12;

	                var grid = _this.options.gridData;

	                function limit() {
	                    var lines = [], place = [], curLength = 0;
	                    $.each(grid, function (i, item) {
	                        var l = grid.length;
	                        var p = [], n = i + 1;
	                        curLength += item;
	                        var persent = (curLength/12*100).toFixed(4)+'%';
	                        var line = '<div class="line" style="left:'+persent+'"></div>';
	                        if (i == (l - 1)) {
	                            return false;
	                        }
	                        var p = [parseInt((curLength - item + 1) * w), 0, parseInt((curLength + grid[n] - 1) * w), 0];
	                        place.push(p);
	                        lines.push(line);
	                    })
	                    if (container.find(".line").length == 0) {
	                        container.find(".row").eq(0).append(lines.join(""));
	                    }
	                    return place;
	                }

	                var place = limit();

	                container.find(".line").each(function (i, item) {
	                    var L = i;
	                    $(item).draggable({
	                        axis: 'x',
	                        containment: place[i],
	                        grid: [w],
	                        drag: function (event, ui) {
	                            var myW = ui.helper.width();
	                            var lW = Math.round(ui.position.left/w);
	                        },
	                        stop: function (event, ui) {
	                            var myW = ui.helper.width();
	                            var lW = Math.round(ui.position.left/w);
	                            var grid = _this.options.gridData;
	                            var curL = 0, prevL = 0;
	                            ui.helper.css('left',(lW/12*100).toFixed(4)+'%');
	                            $.each(grid, function (t, item) {
	                                if (t < i) {
	                                    prevL += item;
	                                }
	                            })
	                            curL = (i == 0) ? lW : lW - prevL;

	                            var l = grid[i] + grid[i + 1];
	                            //console.log(l);
	                            //console.log(grid[i]);
	                            $(".ui-grid").eq(i).attr("class", "col-md-" + curL + " ui-grid");
	                            $(".ui-grid").eq(i + 1).attr("class", "col-md-" + (l - curL) + " ui-grid");
	                            (_this.options.gridData)[i] = curL;

	                            (_this.options.gridData)[i + 1] = l - curL;

	                            var place = limit();

	                            //ui.helper.draggable('option',"containment",place[i]);

	                            //更新拖动限制范围
	                            if (grid.length == 2) {
	                                //ui.helper.draggable('option',"containment",place[i]);
	                            }
	                            else if (i == grid.length - 1 - 1 && grid.length != 2) {
	                                ui.helper.prev().draggable('option', "containment", place[i - 1]);
	                            }
	                            else {
	                                ui.helper.next().draggable('option', "containment", place[i + 1]);
	                            }
	                            //$(".ui-grid").eq(0).attr("class","col-md-"+lW+" ui-grid");
	                            //$(".ui-grid").eq(1).attr("class","col-md-"+(12-lW)+" ui-grid");
	                            //console.log(ui.helper.draggable('option',"containment",[500, 0, 1000, 0]));
	                            //var grid = _this.getLayoutData().options.gridData;
	                            //var length = grid-length,
	                            //    l = 0;

	                        }
	                    });
	                })
	            },0)

	        },
	        setLayout: function (data) {
	            $(containter).html(data);
	            this.initSortable();
	        },
	        getLayoutData: function () {
	            var layouts = $(this.containter).find('.ui-grid'),
	                data = [], html = [], str = 0, length = layouts.length, This = this;
	            $.each(layouts, function (i, item) {
	                var index = parseInt($(item).attr("class").replace(/[^0-9]/ig, ''));
	                data.push(index);
	                //var edit = '<div index="'+i+'" class="layout-edit offset">' +
	                //    '<input class="layout-col"  value="'+index+'" />'+
	                //    '</div>'
	                //html.push(edit);
	                //$(item).append(edit).find('.layout-col').change(function(e,index){
	                //    var index = parseInt($(this).parent().attr("index"));
	                //
	                //    var value = $(this).val();
	                //    var isNum = value.search(/^[0-9]/ig);
	                //
	                //    if(length==1) return false;
	                //    var next = index+1;
	                //    if(next==length){
	                //        next = index-1;
	                //    };
	                //    str=0;
	                //    $.each($('.layout-col'),function(i,item){
	                //        if(i!=index&&i!=next){
	                //            str += parseInt($(this).val())
	                //        }
	                //    });
	                //
	                //    if(isNum==-1) {
	                //        alert("请输入1-12范围内的整数");
	                //        $(this).val(data[index]);
	                //        return false;
	                //    }
	                //    else if(isNum!=-1){
	                //        if(parseInt(value)>12||parseInt(value)<=0||parseInt(value)>(12-str-1)){
	                //            alert("请输入1-12范围内的整数");
	                //            $(this).val(data[index]);
	                //            return false;
	                //        }
	                //    }
	                //    $(item).attr("class",'col-md-'+value+' ui-grid ui-resizable');
	                //    layouts.eq(next).attr("class",'col-md-'+(12-str-value)+' ui-grid ui-resizable');
	                //    $('.layout-col').eq(next).val((12-str-value));
	                //    data[next] = 12-str-value;
	                //    data[index] = parseInt(value);
	                //});
	            });
	            This.options.gridData = data;
	            return this;
	        },
	        edit: function () {
	            $('#content').delegate('.widgetBox .well', 'mouseover', function (e) {
	                $(this).find(".edit").show();
	            });
	            $('#content').delegate('.widgetBox .ui-sortable-handle', 'mouseover', function (e) {
	                $(this).find(".edit").show();
	            });

	            $('#content').delegate('.widgetBox .well', 'mouseleave', function (e) {
	                $(this).find(".edit").hide();
	            });

	            $('#content').delegate('.widgetBox .ui-sortable-handle', 'mouseleave', function (e) {
	                $(this).find(".edit").hide();
	            });
	            var _this = this;
	        },
	        initSortable: function (elems) {
	            this.getLayoutData();
	            $(elems).sortable({
	                placeholder: "ui-portlet-placeholder",
	                connectWith: ".widgetBox",
	                forcePlaceholderSize: true,
	                stop: function (i) {
	                    //console.log(i);
	                },
	                over: function () {

	                }
	            }).disableSelection();
	            return this;
	        }
	    }

	    return Layout;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * Created by chief on 15/11/10.
	 */
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
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
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = "<div tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"designer\" aria-hidden=\"true\" id=\"designer\" class=\"modal fade\">\n    <div class=\"modal-dialog modal-center\">\n        <div class=\"modal-content\">\n            <div class=\"modal-header\">\n                <ol class=\"breadcrumb hide\">\n                    <li><a href=\"index.html\">首页</a></li>\n                    <li>布局管理</li>\n                    <li>编辑</li>\n                </ol>\n                     <span class=\"panel-save hide\">\n                         <button class=\"btn btn-primary\">保存</button>\n                         <button class=\"btn\" data-dismiss=\"modal\" aria-label=\"Close\">取消</button>\n                         <button class=\"btn\" >重置</button>\n                     </span>\n            </div>\n            <div class=\"modal-body widget-edit-body\" >\n                <div id=\"designerContent\">\n                </div>\n                <div id=\"toolbars\"></div>\n            </div>\n        </div>\n    </div>\n</div>";

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * Created by chief on 2015/10/21.
	 */

	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, module, exports ){
	    var template = __webpack_require__(20);
	    var minlayout = __webpack_require__(21);
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
						window.location.hash = '#sysmgr';
	                    //window.location.href=window.location.protocol+'//'+window.location.host+window.location.pathname;
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

	                            var createwidget = __webpack_require__(22);


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

	                            var createwidget = __webpack_require__(22);


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
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/*!art-template - Template Engine | http://aui.github.com/artTemplate/*/
	!function(){function a(a){return a.replace(t,"").replace(u,",").replace(v,"").replace(w,"").replace(x,"").split(y)}function b(a){return"'"+a.replace(/('|\\)/g,"\\$1").replace(/\r/g,"\\r").replace(/\n/g,"\\n")+"'"}function c(c,d){function e(a){return m+=a.split(/\n/).length-1,k&&(a=a.replace(/\s+/g," ").replace(/<!--[\w\W]*?-->/g,"")),a&&(a=s[1]+b(a)+s[2]+"\n"),a}function f(b){var c=m;if(j?b=j(b,d):g&&(b=b.replace(/\n/g,function(){return m++,"$line="+m+";"})),0===b.indexOf("=")){var e=l&&!/^=[=#]/.test(b);if(b=b.replace(/^=[=#]?|[\s;]*$/g,""),e){var f=b.replace(/\s*\([^\)]+\)/,"");n[f]||/^(include|print)$/.test(f)||(b="$escape("+b+")")}else b="$string("+b+")";b=s[1]+b+s[2]}return g&&(b="$line="+c+";"+b),r(a(b),function(a){if(a&&!p[a]){var b;b="print"===a?u:"include"===a?v:n[a]?"$utils."+a:o[a]?"$helpers."+a:"$data."+a,w+=a+"="+b+",",p[a]=!0}}),b+"\n"}var g=d.debug,h=d.openTag,i=d.closeTag,j=d.parser,k=d.compress,l=d.escape,m=1,p={$data:1,$filename:1,$utils:1,$helpers:1,$out:1,$line:1},q="".trim,s=q?["$out='';","$out+=",";","$out"]:["$out=[];","$out.push(",");","$out.join('')"],t=q?"$out+=text;return $out;":"$out.push(text);",u="function(){var text=''.concat.apply('',arguments);"+t+"}",v="function(filename,data){data=data||$data;var text=$utils.$include(filename,data,$filename);"+t+"}",w="'use strict';var $utils=this,$helpers=$utils.$helpers,"+(g?"$line=0,":""),x=s[0],y="return new String("+s[3]+");";r(c.split(h),function(a){a=a.split(i);var b=a[0],c=a[1];1===a.length?x+=e(b):(x+=f(b),c&&(x+=e(c)))});var z=w+x+y;g&&(z="try{"+z+"}catch(e){throw {filename:$filename,name:'Render Error',message:e.message,line:$line,source:"+b(c)+".split(/\\n/)[$line-1].replace(/^\\s+/,'')};}");try{var A=new Function("$data","$filename",z);return A.prototype=n,A}catch(B){throw B.temp="function anonymous($data,$filename) {"+z+"}",B}}var d=function(a,b){return"string"==typeof b?q(b,{filename:a}):g(a,b)};d.version="3.0.0",d.config=function(a,b){e[a]=b};var e=d.defaults={openTag:"<%",closeTag:"%>",escape:!0,cache:!0,compress:!1,parser:null},f=d.cache={};d.render=function(a,b){return q(a,b)};var g=d.renderFile=function(a,b){var c=d.get(a)||p({filename:a,name:"Render Error",message:"Template not found"});return b?c(b):c};d.get=function(a){var b;if(f[a])b=f[a];else if("object"==typeof document){var c=document.getElementById(a);if(c){var d=(c.value||c.innerHTML).replace(/^\s*|\s*$/g,"");b=q(d,{filename:a})}}return b};var h=function(a,b){return"string"!=typeof a&&(b=typeof a,"number"===b?a+="":a="function"===b?h(a.call(a)):""),a},i={"<":"&#60;",">":"&#62;",'"':"&#34;","'":"&#39;","&":"&#38;"},j=function(a){return i[a]},k=function(a){return h(a).replace(/&(?![\w#]+;)|[<>"']/g,j)},l=Array.isArray||function(a){return"[object Array]"==={}.toString.call(a)},m=function(a,b){var c,d;if(l(a))for(c=0,d=a.length;d>c;c++)b.call(a,a[c],c,a);else for(c in a)b.call(a,a[c],c)},n=d.utils={$helpers:{},$include:g,$string:h,$escape:k,$each:m};d.helper=function(a,b){o[a]=b};var o=d.helpers=n.$helpers;d.onerror=function(a){var b="Template Error\n\n";for(var c in a)b+="<"+c+">\n"+a[c]+"\n\n";"object"==typeof console&&console.error(b)};var p=function(a){return d.onerror(a),function(){return"{Template Error}"}},q=d.compile=function(a,b){function d(c){try{return new i(c,h)+""}catch(d){return b.debug?p(d)():(b.debug=!0,q(a,b)(c))}}b=b||{};for(var g in e)void 0===b[g]&&(b[g]=e[g]);var h=b.filename;try{var i=c(a,b)}catch(j){return j.filename=h||"anonymous",j.name="Syntax Error",p(j)}return d.prototype=i.prototype,d.toString=function(){return i.toString()},h&&b.cache&&(f[h]=d),d},r=n.$each,s="break,case,catch,continue,debugger,default,delete,do,else,false,finally,for,function,if,in,instanceof,new,null,return,switch,this,throw,true,try,typeof,var,void,while,with,abstract,boolean,byte,char,class,const,double,enum,export,extends,final,float,goto,implements,import,int,interface,long,native,package,private,protected,public,short,static,super,synchronized,throws,transient,volatile,arguments,let,yield,undefined",t=/\/\*[\w\W]*?\*\/|\/\/[^\n]*\n|\/\/[^\n]*$|"(?:[^"\\]|\\[\w\W])*"|'(?:[^'\\]|\\[\w\W])*'|\s*\.\s*[$\w\.]+/g,u=/[^\w$]+/g,v=new RegExp(["\\b"+s.replace(/,/g,"\\b|\\b")+"\\b"].join("|"),"g"),w=/^\d[^,]*|,\d[^,]*/g,x=/^,+|,+$/g,y=/^$|,+/;e.openTag="{{",e.closeTag="}}";var z=function(a,b){var c=b.split(":"),d=c.shift(),e=c.join(":")||"";return e&&(e=", "+e),"$helpers."+d+"("+a+e+")"};e.parser=function(a){a=a.replace(/^\s/,"");var b=a.split(" "),c=b.shift(),e=b.join(" ");switch(c){case"if":a="if("+e+"){";break;case"else":b="if"===b.shift()?" if("+b.join(" ")+")":"",a="}else"+b+"{";break;case"/if":a="}";break;case"each":var f=b[0]||"$data",g=b[1]||"as",h=b[2]||"$value",i=b[3]||"$index",j=h+","+i;"as"!==g&&(f="[]"),a="$each("+f+",function("+j+"){";break;case"/each":a="});";break;case"echo":a="print("+e+");";break;case"print":case"include":a=c+"("+b.join(",")+");";break;default:if(/^\s*\|\s*[\w\$]/.test(e)){var k=!0;0===a.indexOf("#")&&(a=a.substr(1),k=!1);for(var l=0,m=a.split("|"),n=m.length,o=m[l++];n>l;l++)o=z(o,m[l]);a=(k?"=":"=#")+o}else a=d.helpers[c]?"=#"+c+"("+b.join(",")+");":"="+a}return a}, true?!(__WEBPACK_AMD_DEFINE_RESULT__ = function(){return d}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)):"undefined"!=typeof exports?module.exports=d:this.template=d}();

/***/ },
/* 21 */
/***/ function(module, exports) {

	module.exports = "<div id=\"widgetList\" class=\"padding-left-25\">\n    <div class=\"page-header font-size-20 padding-left-0\">\n        <ol class=\"breadcrumb margin-bottom-20\">\n            <li class=\"page-title\" class=\"active\">小部件管理</li>\n\n            <a role=\"button\" class=\"\">\n                <button class=\"u-button btn-back font-size-14 margin-left-10 backBtn\" type=\"button\">\n                    <span class=\"text hidden-xs\">返回</span>\n                </button>\n            </a>\n\n        </ol>\n        <div class=\"page-header-actions dropdown width-full margin-left-0 padding-10\" style=\"z-index: 1!important;background: #fff\">\n            <a href=\"javascript:void(0)\" class=\"inline-block\" role=\"button\" data-animation=\"scale-up\" aria-expanded=\"false\"\n               data-toggle=\"dropdown\">\n                <button class=\"u-button u-button-info font-size-14 create-widget-btn\" type=\"button\">\n                    <span class=\"text hidden-xs\">创建小部件</span>\n                    <i aria-hidden=\"true\" class=\"icon wb-chevron-right\"></i>\n                </button>\n            </a>\n            <ul role=\"menu\" style=\"width:300px;\" class=\"dropdown-menu dropdown-menu-left dropdown-menu-media\">\n                <li role=\"presentation\" class=\"clearfix scrollable is-enabled scrollable-vertical\"\n                    style=\"position: relative\">\n                    <div data-role=\"container\" class=\"scrollable-container\">\n                        <div data-role=\"content\" class=\"scrollable-content\">\n                            <div id=\"widget-list\" class=\"site-items list-unstyled\">\n                                <div class=\"col-md-12 widget-create\">\n                                    <div class=\"panel-body\" id=\"widget-body\">\n                                        <form class=\"form-horizontal\" action=\"widget/save\" id=\"widget-form\">\n                                             <div class=\"form-inline\">\n                                                 <label class=\"control-label text-right\">名称:</label>\n                                                 <span class=\"field\">*</span>\n                                                 <input type=\"text\" name=\"name\" placeholder=\"名称\" id=\"inputRounded\" class=\"form-control round\">\n                                             </div>\n                                              <div class=\"form-inline\">\n                                                  <label class=\"control-label text-right\">编码:</label>\n                                                  <span class=\"field\">*</span>\n                                                  <input type=\"text\" name=\"code\" placeholder=\"编码\"  class=\"form-control round\">\n                                              </div>\n\n\n                                               <div class=\"form-inline\">\n                                                   <label class=\"control-label margin-right-10 text-right\">分类:</label>\n                                                   <select name=\"category\" id=\"create-category\" class=\"form-control category-list round portal-select rel-5\">\n                                                       <option value=\"workbench\">工作台</option>\n                                                   </select>\n                                               </div>\n                                            <div class=\"form-inline\">\n                                                <label class=\"control-label margin-right-10 text-right\">类型:</label>\n                                                <select name=\"wtype\" class=\"form-control wtype round portal-select rel-5\">\n                                                    <option value=\"url\">url</option>\n                                                    <option value=\"xml\" selected=selected>xml</option>\n                                                    <option value=\"htmlfragment\">html片段</option>\n                                                    <option value=\"js\">js</option>\n                                                </select>\n                                            </div>\n                                             <div class=\"form-inline wtype-url hide\">\n                                                 <label class=\"control-label text-right\">url</label>\n                                                 <span class=\"field\">*</span>\n                                                 <input type=\"text\" name=\"url\" placeholder=\"\" class=\"form-control round\"/>\n                                             </div>\n                                             <div class=\"form-inline wtype-xml\">\n                                                 <label class=\"control-label text-right\">xml</label>\n                                                 <span class=\"field\">*</span>\n                                                 <input type=\"text\" name=\"xml\" placeholder=\"/gadgets/xxx.xml\" class=\"form-control round\"/>\n                                             </div>\n                                             <div class=\"form-inline wtype-html hide\">\n                                                 <label class=\"control-label text-right\">html片段</label>\n                                                 <span class=\"field\">*</span>\n                                                 <textarea name=\"htmlfragment\" placeholder=\"\" style=\"height:50px\"\n                                               class=\"form-control\"></textarea>\n                                             </div>\n                                            <div class=\"form-inline wtype-js hide\">\n                                                <label class=\"control-label text-right\">js</label>\n                                                <span class=\"field\">*</span>\n                                                <input type=\"text\" name=\"js\" placeholder=\"/portal/widget/xxx.js\" class=\"form-control round\"/>\n                                            </div>\n                                            <div class=\"form-inline\">\n                                                <label class=\"control-label margin-right-10 text-right\">描述:</label>\n                                                <input type=\"text\" name=\"descr\" placeholder=\"描述\" class=\"form-control rel-5\">\n                                            </div>\n                                            <div class=\"form-inline text-left\">\n                                                <div id=\"errorMessage\"></div>\n                                            </div>\n                                            <div class=\"u-form-group width-full margin-bottom-0\" id=\"widgManBottom\">\n                                                <a href=\"javascript:void(0)\"\n                                                   class=\"u-button u-button-primary pull-right font-size-14\" data-toggle=\"dropdown\"\n                                                   aria-expanded=\"false\">取消</a>\n                                                <button id=\"widget-create\"\n                                                        class=\"u-button u-button-info margin-right-10 pull-right font-size-14\">保存\n                                                </button>\n                                            </div>\n                                        </form>\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"scrollable-bar scrollable-bar-vertical scrollable-bar-hide\" draggable=\"false\">\n                        <div class=\"scrollable-bar-handle\" style=\"height: 30px;\"></div>\n                    </div>\n                </li>\n            </ul>\n            <select class=\"form-control input-sm inline-block width-auto margin-left-10 portal-select\" id=\"category\" style=\"background-position-x: 90%;\">\n                <option value=\"\">全部分类</option>\n            </select>\n            <span class=\"margin-left-5 margin-right-5 break\">|</span>\n            <select class=\"form-control input-sm inline-block width-auto portal-select\" id=\"type\" style=\"background-position-x: 90%;\">\n                <option value=\"\">全部类型</option>\n                <option value=\"url\">url</option>\n                <option value=\"xml\">xml</option>\n                <option value=\"htmlfragment\">html片段</option>\n                <option value=\"js\">js</option>\n            </select>\n            <div class=\"search  pull-right margin-right-20 inline-block\">\n                <div class=\"u-input-group u-has-feedback margin-bottom-0\">\n                    <input type=\"text\" class=\"u-form-control\" placeholder=\"小部件名称/小部件编码\" id=\"key\">\n                    <span class=\"u-form-control-feedback uf uf-magnifyingglass\" id=\"searchBtn\"></span>\n                </div>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"page-content container-fluid padding-left-15\" >\n        <div class=\"row\">\n            {{each list as item i}}\n            <div class=\"widget\">\n                <div class=\"widget-content padding-30 bg-white clearfix\">\n                    <div class=\"pull-left white icons-pull\">\n                        <i aria-hidden=\"true\" class=\"iconfont icon-component\"></i>\n                    </div>\n                    <div class=\"counter counter-md\">\n                        <div class=\"counter-number-group clearfix\">\n                            <span class=\"counter-number-related text-capitalize\" title=\"{{item.name}}\">{{item.name}}</span>\n                        </div>\n                        <div class=\"counter-label text-capitalize font-size-16\"></div>\n                    </div>\n                </div>\n                <div class=\"widget-footer bg-white\">\n                    <div class=\"u-row\">\n                        <div class=\"u-col-4 u-col-xs-4 text-center\">\n                            <div class=\"icons-button text-center icons-l\">\n                                <a href=\"\" data-toggle=\"modal\" data-target=\"#examplePositionCenter\"\n                                   data-id=\"{{item.code}}\" class=\"widget-edit\" title=\"编辑\">\n                                    <i class=\"iconfont icon-pencil\"></i>\n                                </a>\n                            </div>\n                        </div>\n                        <div class=\"u-col-4 u-col-xs-4 text-center\">\n                            <div class=\"icons-button text-center icons-l\">\n                                <a href=\"\" data-toggle=\"modal\" data-target=\"#copy\"\n                                   data-id=\"{{item.code}}\" class=\"widget-copy\" title=\"复制\">\n                                    <i class=\"enterprisefont icon-fuzhi\"></i>\n                                </a>\n                            </div>\n                        </div>\n                        <div class=\"u-col-4 u-col-xs-4 text-center\">\n                            <div class=\"icons-button text-center\">\n                                <a href=\"\" data-id=\"{{item.code}}\" data-tag=\"{{item.tag}}\" class=\"widget-del\" title=\"删除\">\n                                    <i class=\"iconfont icon-delete\"></i>\n                                </a>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n            {{/each}}\n\n        </div>\n        <div class=\" paginate-box text-center\">\n            <div id=\"pagination\" class=\" u-pagination inline-block\"></div>\n        </div>\n        <!-- Modal -->\n        <div tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"examplePositionCenter\" aria-hidden=\"true\"\n             id=\"examplePositionCenter\" class=\"modal fade\">\n            <div class=\"modal-dialog modal-center\">\n                <div class=\"modal-content\">\n                    <div class=\"modal-header portal-modal-header\">\n                        <button aria-label=\"Close\" data-dismiss=\"modal\" class=\"close\" type=\"button\">\n                            <span aria-hidden=\"true\">×</span>\n                        </button>\n                        <h4 class=\"modal-title\">编辑小部件</h4>\n                    </div>\n                    <div class=\"modal-body widget-edit-body\">\n\n                    </div>\n                </div>\n            </div>\n        </div>\n        <!-- End Modal -->\n\n        <div tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"copy\" aria-hidden=\"true\" id=\"copy\" class=\"modal fade\">\n            <div class=\"modal-dialog modal-center\">\n                <div class=\"modal-content\">\n                    <div class=\"modal-header portal-modal-header\">\n                        <button aria-label=\"Close\" data-dismiss=\"modal\" class=\"close\" type=\"button\">\n                            <span aria-hidden=\"true\">×</span>\n                        </button>\n                        <h4 class=\"modal-title\">复制小部件</h4>\n                    </div>\n                    <div class=\"modal-body widget-edit-body\">\n                        <form action=\"widget/save\" class=\"widget-form\">\n                            <div class=\"form-inline\">\n                                <label class=\"control-label\">名称</label><span class=\"field\">*</span>\n                                <input type=\"text\" name=\"name\" value=\"我\" placeholder=\"名称\"\n                                       class=\"form-control inputRounded round\">\n\n                            </div>\n                            <div class=\"form-inline\">\n                                <label class=\"control-label\">编码</label><span class=\"field\">*</span>\n                                <input type=\"text\" name=\"code\" placeholder=\"编码\" value=\"hde\" class=\"form-control round\">\n\n                            </div>\n                            <div class=\"form-inline\">\n                                <label class=\"control-label\">分类</label>\n                                <select name=\"category\" class=\"form-control category-list round portal-select\">\n                                    <option value=\"portal\">门户</option>\n                                    <option selected=\"\" value=\"workbench\">工作台</option>\n                                </select>\n                            </div>\n                            <div class=\"form-inline\">\n                                <label class=\"control-label\">类型</label>\n                                <select name=\"wtype\" class=\"form-control wtype round portal-select\" disabled>\n                                    <option selected=\"selected\" value=\"url\">url</option>\n                                    <option value=\"xml\">xml</option>\n                                    <option value=\"htmlfragment\">html片段</option>\n                                </select>\n                            </div>\n\n                            <div class=\"form-inline wtype-url  \">\n                                <label class=\"control-label\">url</label><span class=\"field\">*</span>\n                                <input disabled type=\"text\" name=\"url\" value=\"http://www.sohu.com\" placeholder=\"\"\n                                       class=\"form-control round\">\n\n                            </div>\n\n                            <div class=\"form-inline wtype-xml hide \">\n                                <label class=\"control-label\">xml</label><span class=\"field\">*</span>\n                                <input type=\"text\" name=\"xml\" value=\"\" placeholder=\"/gadgets/xxx.xml\"\n                                       class=\"form-control round\">\n\n                            </div>\n\n\n                            <div class=\"form-inline wtype-html hide\">\n                                <label class=\"control-label\">html片段</label><span class=\"field\">*</span>\n                                <textarea name=\"htmlfragment\" placeholder=\"\" style=\"height:50px\"\n                                          class=\"form-control\"></textarea>\n                            </div>\n                            <div class=\"form-inline\">\n                                <label class=\"control-label\">描述</label>\n                                <input type=\"text\" name=\"descr\" value=\"\" placeholder=\"描述\" class=\"form-control\">\n                            </div>\n                            <input type=\"hidden\" name=\"modifytime\" value=\"2016-06-23 14:48:50\" class=\"form-control\">\n                            <div id=\"errorMessage\"></div>\n                            <div class=\"modal-footer\">\n                                <button class=\"u-button u-button-info\" id=\"copy-widget\" type=\"button\">保存</button>\n                                <button data-dismiss=\"modal\" class=\"btn btn-default\" type=\"button\">取消</button>\n                            </div>\n                        </form>\n                    </div>\n                </div>\n            </div>\n        </div>\n\n        <div class=\"modal fade\" id=\"widgetDel\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\"\n             aria-hidden=\"true\">\n            <div class=\"modal-dialog\">\n                <div class=\"modal-content\">\n                    <div class=\"modal-header portal-modal-header\" >\n                        <button type=\"button\" class=\"close\"  data-dismiss=\"modal\"\n                                aria-hidden=\"true\">&times;</button>\n                        <h4 class=\"modal-title\" id=\"myModalLabel\">\n                            确认\n                        </h4>\n                    </div>\n                    <div class=\"modal-body\">\n                        您确认要删除小部件吗？\n                    </div>\n                    <div class=\"modal-footer\">\n                        <button type=\"button\" class=\"u-button u-button-info margin-right-10 btn-del\">确定</button>\n                        <button type=\"button\" class=\"u-button u-button-primary btn-back\" data-dismiss=\"modal\">取消</button>\n                    </div>\n                </div><!-- /.modal-content -->\n            </div><!-- /.modal -->\n        </div>\n        <input type=\"hidden\" id=\"parentCode\"/>\n    </div>\n</div>"

/***/ },
/* 22 */
/***/ function(module, exports) {

	module.exports = "<div class=\"site-items list-unstyled\">\n    <div class=\"widget-create-eidt\">\n        <div class=\"panel-body\">\n            <form action=\"widget/save\" class=\"widget-form\">\n                <div class=\"form-inline hide\">\n                    <label class=\"control-label\"></label>\n                    <span class=\"field\"></span>\n                    <input type=\"hidden\" name=\"tag\" value=\"{{item.tag}}\" class=\"form-control\">\n                </div>\n                <div class=\"form-inline\">\n                    <label class=\"control-label\">名称:</label>\n                    <span class=\"field\">*</span>\n                    <input type=\"text\" name=\"name\" value=\"{{item.name}}\" placeholder=\"名称\" class=\"form-control inputRounded round\">\n                </div>\n                <div class=\"form-inline\">\n                    <label class=\"control-label\">编码:</label>\n                    <span class=\"field\">*</span>\n                    <input type=\"text\" name=\"code\" placeholder=\"编码\" value=\"{{item.code}}\" class=\"form-control round\" disabled>\n                </div>\n                <div class=\"form-inline\">\n                    <label class=\"control-label margin-right-10 \">分类:</label>\n                    <select name=\"category\" class=\"form-control category-list round portal-select\">\n                        <option value=\"workbench\">工作台</option>\n                    </select>\n                </div>\n                <div class=\"form-inline\">\n                    <label class=\"control-label margin-right-10\">类型:</label>\n                    <select name=\"wtype\" class=\"form-control wtype round portal-select\">\n                        <option {{item.wtype==\"url\"?\"selected=selected\":\"\"}} value=\"url\">url</option>\n                        <option {{item.wtype==\"xml\"?\"selected=selected\":\"\"}} value=\"xml\">xml</option>\n                        <option {{item.wtype==\"htmlfragment\"?\"selected=selected\":\"\"}} value=\"htmlfragment\">html片段</option>\n                        <option {{item.wtype==\"js\"?\"selected=selected\":\"\"}} value=\"js\">js</option>\n                    </select>\n                </div>\n\n                <div class=\"form-inline wtype-url {{if item.wtype!=\"url\"}}hide{{/if}} \">\n                    <label class=\"control-label\">url</label>\n                    <span class=\"field\">*</span>\n                    <input type=\"text\" name=\"url\" value=\"{{if item.wtype==\"url\"}}{{item.cnf}}{{/if}}\" placeholder=\"\" class=\"form-control round\"/>\n\n                </div>\n\n                <div class=\"form-inline wtype-xml {{if item.wtype!=\"xml\"}}hide{{/if}} \">\n                    <label class=\"control-label\">{{if item.isVirtXml==true}}(虚){{/if}}xml</label>\n                    <span class=\"field\">*</span>\n                    <input type=\"text\" name=\"xml\" value=\"{{if item.wtype==\"xml\"}}{{item.url}}{{/if}}\" placeholder=\"/gadgets/xxx.xml\" class=\"form-control round\"/>\n\n                </div>\n\n\n                <div class=\"form-inline wtype-html {{if item.wtype!=\"htmlfragment\"}}hide{{/if}}\" >\n                    <label class=\"control-label\">html片段</label>\n                     <span class=\"field\">*</span>\n                     <textarea name=\"htmlfragment\" placeholder=\"\" style=\"height:50px\" class=\"form-control\">{{if item.wtype==\"htmlfragment\"}}{{item.cnf}}{{/if}}</textarea>\n                </div>\n\n                <div class=\"form-inline wtype-js {{if item.wtype!=\"js\"}}hide{{/if}} \">\n                    <label class=\"control-label\">{{if item.isVirtXml==true}}(虚){{/if}}js</label>\n                    <span class=\"field\">*</span>\n                    <input type=\"text\" name=\"js\" value=\"{{if item.wtype==\"js\"}}{{item.cnf}}{{/if}}\" placeholder=\"/portal/gadgets/xxx.js\" class=\"form-control round\"/>\n                </div>\n\n                <div class=\"form-inline\">\n                    <label class=\"control-label margin-right-10\">描述:</label>\n                    <input type=\"text\" name=\"descr\" value=\"{{item.descr}}\" placeholder=\"描述\" class=\"form-control\">\n                </div>\n                <input type=\"hidden\" name=\"modifytime\" value=\"{{item.modifytime}}\" class=\"form-control\"/>\n                <div id=\"errorMessage\"></div>\n                <!--<div class=\"modal-footer\">\n                    <button class=\"btn btn-primary\" id=\"edit-widget\" type=\"button\">保存</button>\n                    <button data-dismiss=\"modal\" class=\"btn btn-default\" type=\"button\">取消</button>\n                </div>-->\n\n<div class=\" modal-footer u-form-group width-full \" id=\"editWidBottom\">\n    <button data-dismiss=\"modal\"\n            class=\"u-button u-button-primary pull-right margin-left-10\">取消\n    </button>\n    <button id=\"edit-widget\"\n            class=\"u-button u-button-info margin-left-10 pull-right\">保存\n    </button>\n</div>\n\n\n</form>\n        </div>\n    </div>\n</div>"

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * 信使——发布/订阅通信机（负责全局通信,不需要依赖某个特殊对象）
	 *
	 * Created by guoshg on 15/11/7
	 *
	 * 使用：
	 * 1：发布一个topic：
	 *    Topic.publish('/page/load', {
	 *       url: '/some/url/path' // 此处可以是任意对象,任意参数
	 *    });
	 * 2：订阅topic以便得到事件通知：
	 *    var subscription = Topic.subscribe('/page/load', function(obj) {
	 *  	// 当事件发生时,可以执行某些操作...
	 *    });
	 * 3：取消订阅
	 *	subscription.remove();
	 */
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function(){
		var Topic = (function() {
			var topics = {};
			var _subscribeOne = function(topic, listener) {
				// 如果没有创建,则创建一个topic对象
				if (!topics[topic])
					topics[topic] = {
						queue : []
					};

				// 添加监听器到队列中
				var index = topics[topic].queue.push(listener) - 1;

				// 提供移除topic的句柄(对象)
				return (function(topic, index) {
					return {
						remove : function() {
							delete topics[topic].queue[index];
						}
					}
				})(topic, index);
			};
			/**
			 * Returns internal [[Class]] property of an object
			 * __getClass(5); // => "Number" __getClass({}); // => "Object"
			 * __getClass(/foo/); // => "RegExp" __getClass(''); // => "String"
			 * __getClass(true); // => "Boolean" __getClass([]); // => "Array"
			 * __getClass(undefined); // => "Window" __getClass(Element); // =>"Constructor"
			 *
			 */
			function _getClass(object) {
				return Object.prototype.toString.call(object).match(/^\[object\s(.*)\]$/)[1];
			};
			return {
				subscribe : function(topic, listener) {
					if(_getClass(topic) === "String"){
						return _subscribeOne(topic, listener);
					}
					if(_getClass(topic) === "Array"){
						var res = [];
						for(var p in topic){
							if(_getClass(topic[p])=="String"){
								res.push(_subscribeOne(topic[p], listener));
							}
						}
						return res;
					}
				},
				publish : function(topic, info) {
					// 如果 topic 不存在,或者队列中没有监听器,则 return
					if (!topics[topic] || !topics[topic].queue.length)
						return;

					// 通过循环 topics 队列, 触发事件!
					var items = topics[topic].queue;
					items.forEach(function(item) {
						item(info || {});
					});
				}
			};
		})();

		window.Topic = Topic;

		return Topic;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))


/***/ },
/* 24 */
/***/ function(module, exports) {

	(function(o) {
		//ajax 306 处理
		var until = {
			getParam:function(name){
				var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
				var r = window.location.search.substr(1).match(reg);
				if(r!=null)return  unescape(r[2]); return null;
			},
			getQueryString:function(name){
				return this.getParam(name);
			},
			errorLogin:function(XMLHttpRequest, textStatus, errorThrown){
				// if(XMLHttpRequest.status == '306'){
				// 	location.href = '/wbalone/pages/login/login.html?r=L3BvcnRhbC8';
				// }
			},
			crosser:function(w,h,iframeid){
				var _iframeid = "__url_gadget-site-"+iframeid;
				$("#"+_iframeid).attr({'width':'100%','height':h});
			},
			addRouter:function(path, func) {
				var pos = path.indexOf('/:');
				var truePath = path;
				if (pos != -1)
					truePath = path.substring(0, pos);
				func = func || function() {
						var params = arguments;
						initLayout(contextRoot+'/data:layout' + truePath, params);
					}
				var tmparray = truePath.split("/");
				if (tmparray[1] in router.routes
					&& tmparray[2] in router.routes[tmparray[1]]
					&& tmparray[3] in router.routes[tmparray[1]][tmparray[2]]) {
					return;
				} else {
					router.on(path, func);
					router.on('before',path, function(){
						var design = $("#design");
						if(navigator.userAgent.indexOf("iPad")!=-1||getBrowserVersion()=='IE8'){}
						else {
							design.html('<i class="portalfont icon-personalized"></i>个性化').parent().show();
							design.parent().parent().find('.divider').show();
						}

						design.attr("path",path.replace(/#|\//ig, ''));
					});
					router.on('after',path, function(){
						var design = $("#design");
						if(design.attr("sortalbe") == "true"){
							var r=confirm("有尚未保存的内容,保存吗?");
							if (r==true){
								$("#design").trigger("click");
							}
						}
						design.attr({"path":"","sortalbe":"false"}).parent().hide();
						design.parent().parent().find('.divider').hide();
					});
				}
			},
			registerRouter:function (id, path) {
				var routeInit = function (p) {
					return function () {
						var module = p;
						requirejs.undef(module);
						var content = document.getElementById("content");
						//截取路由路径，若为绝对路径那么取到项目名，作为参数传给各js模块
						var params = {};
						if(module.charAt(0) == '/'){
							// params.appCtx = module.split("/pages")[0];
							if (module.indexOf("/ocm-web/pages")>-1){
								var temppath = module.split("/ocm-web/pages/")[1];
								var businessindex = temppath.indexOf("/");
								var pathkey = temppath.slice(0,businessindex);
								window.appCtx = window.pathMap[pathkey];
							}
						}
						window.require([module], function (module) {
							ko.cleanNode(content);
							content.innerHTML = "";
							if(typeof module.init == "function"){
								module.init(content,params);
							}else{
								new module({el:content,params:params})
							}
						})
					}
				};
				router.on(id, routeInit(path));
			},
			initLayout:function(p, params) {
				var module = p;
				var load = window.require;
				requirejs.undef(module);
				if (params.length == 1)
					params = params[0]
				load([ module ], function(module) {
					$('#content').html('');
					module.init(params);
				})
			},
			initLayoutTemplate:function(p, params) {
				var module = p;
				var load = window.require;
				requirejs.undef(module);
				load([ module ], function(module) {
					module.init(params);
				})
			},
			rebindView:function(oldViewId,newViewId){
				var idx = -1;
				var layoutRoutes = window.router.routes[oldViewId].on;
				if($.isArray(layoutRoutes)){
					var len = layoutRoutes.length;
					for(var k = 0;k< len;k++ ){
						if(layoutRoutes[k].toString().indexOf("initLayout") != -1){
							idx = k;
						}
					}
					layoutRoutes.splice(idx,0);
				}else{
					window.router.routes[oldViewId].on = [];
				}
				//fix:跳转到新地址
				window.addRouter("/"+oldViewId,function() {
					window.router.setRoute("/"+newViewId)
				});

				window.addRouter("/"+newViewId);

			},
			include:function(html, target) {
				$(target).load(html);
			},
			getBrowserVersion:function () {
				var userAgent = navigator.userAgent.toLowerCase();
				if (userAgent.match(/msie ([\d.]+)/) != null) {//ie6--ie9
					uaMatch = userAgent.match(/msie ([\d.]+)/);
					return 'IE' + uaMatch[1].match(/\d/);
				} else if
				(userAgent.match(/(trident)\/([\w.]+)/)) {
					uaMatch = userAgent.match(/trident\/([\w.]+)/);
					switch (uaMatch[1]) {
						case "4.0":
							return "IE8";
							break;
						case "5.0":
							return "IE9";
							break;
						case "6.0":
							return "IE10";
							break;
						case "7.0":
							return "IE11";
							break;
						default:
							return "undefined";
					}
				}
				return "undefined";
			},
			/**
			 * 获得小部件信息的默认值
			 * @param id  小部件id
			 * @param key  属性key
			 */
			getWidgetAttr: function (id, key) {
				var res = window.container.service_.cachedMetadatas_;
				var data = {}, obj = {};
				for (var attr in res) {
					var ary = attr.split('?')[1].split('&');
					if (id == ary[0].split('=')[1]) {
						data = res[attr]['userPrefs'];
					}
				}
				if (key) {
					if(data&&data[key]&&data[key]['defaultValue']){
						return obj[key] = data[key]['defaultValue'];
					}
				} else {
					for (var attr in data) {
						obj[attr] = data[attr]['defaultValue'];
					}
					return obj;
				}
			},
			/**
			 * 提示消息
			 * @param msg  提示消息内容(不写则显示默认的操作成功和操作失败)
	         * @param type 提示消息类型:成功(success),失败(error),警告(warn),默认success
	         * @param time 设置提示消息显示多久后消失，单位毫秒，默认2000毫秒
	         */
			message:function(msg,type,time){
				time=time||2000;
				type=type||'success';
				msg=msg||'操作成功';
				var message=$('body').children('.u-message');
				if(type=='success'){
					message=$('body').children('.u-message.u-mesinfo');
				}else if(type=='error'){
					message=$('body').children('.u-message.u-mesdanger');
				}else if(type=='warn'){
					message=$('body').children('.u-message.u-meswarning');
				}
				message.find('i').eq(0).html('<span class="msg">'+msg+'</span>');
				message.show();
				message.css('left',($('body').width()-message.find('i').eq(0).width())/2);
				message.width(message.find('i').eq(0).width()+20);
				message.css('opacity',1);
				window.setTimeout(function(){
					message.hide();
					message.css('opacity','0');
				},time);
			},
			/**
			 * 显示等待效果图
			 */
			loadShow:function(){
				$('#uLoadeBack').show();
				$('#uLoad').show();
			},
			/**
			 * 隐藏等待效果图
			 */
			loadHide:function(){
				$('#uLoadeBack').hide();
				$('#uLoad').hide();
			}
		};
		$.extend(o,until);
	})(window);


/***/ },
/* 25 */
/***/ function(module, exports) {

	;(function($) {
		var _ajax = $.ajax;
		$.ptAjax = function(opt) {
			var fn = {
				error : function(XMLHttpRequest, textStatus, errorThrown) {},
				success : function(data, textStatus) {}
			};
			if (opt.error) {
				fn.error = opt.error;
			}
			if (opt.success) {
				fn.success = opt.success;
			}
			var _opt = $.extend(opt, {
				error : function(XMLHttpRequest, textStatus, errorThrown) {
					_wrapError(errorThrown,textStatus,XMLHttpRequest);
					fn.error(XMLHttpRequest, textStatus, errorThrown);
				},
				success : function(data, state,xhr) {
					if(_processXHRError(data,state,xhr)){
						//notice: context must process
						if(_opt.context){
							fn.success.call(_opt.context,data, state);
						}else
							fn.success(data, state);
						_wrapSuccess(data, state);
					}
				},
				beforeSend : function(XHR) {
					//显示等待
					$('#uLoadeBack').show();
					$('#uLoad').show();
				},
				complete : function(XHR, TS) {
					//requset success or failure also call
					//隐藏等待
					$('#uLoadeBack').hide();
					$('#uLoad').hide();
				}
			});
			var _processXHRError= function(rsl,state,xhr){
				if(xhr && xhr.getResponseHeader && xhr.getResponseHeader("X-Error")){
					alert(rsl["message"]);
					return false;
				}
				return true;
			};
			var _wrapSuccess = function(data, textStatus){
				//to do ...
			};
			var _wrapError = function (rsl,state,xhr) {
				_processXHRError(rsl,state,xhr);
				//to do ...
			};

			var _publishTopic = function(params){
				var topic ;
				if(params.topic){
					topic = params.topic;
				}
				else{
					//默认取url  url: "/demo/layout/set/save",
					var urlarys = params.url.split("?")[0].split("/");
					var nurl = [];
					$.each(urlarys,function(i,n){
						if(i != 0 && i != 1){
							nurl.push(n);
						}
					});
					topic = "/"+nurl.join("/");
				}
				Topic.publish(topic,params);
			};

			var _wrapParam = function(params){
				//to do
			};

			//platform process begin
			_wrapParam(_opt) ;

			_publishTopic(_opt);

			//adjust opt param
			opt.data = $.isEmptyObject(_opt.data)?null:_opt.data;

			//fire ajax request
			return _ajax(_opt);
		};
	})(jQuery)

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function(){
	    var icons= [
	        {
	            name: "默认",
	            fontfamily: "iconfont",
	            path: "fonts/iconfont/iconfont.css"
	        },
	        {
	            name: "企业门户",
	            fontfamily: "portalfont",
	            path: "fonts/portalfont/iconfont.css"
	        }
	    ];
	    window.icons=icons;
	    return icons;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 27 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	//
	// Generated on Tue Dec 16 2014 12:13:47 GMT+0100 (CET) by Charlie Robbins, Paolo Fragomeni & the Contributors (Using Codesurgeon).
	// Version 1.2.6
	//

	(function(exports) {

		/*
		 * browser.js: Browser specific functionality for director.
		 *
		 * (C) 2011, Charlie Robbins, Paolo Fragomeni, & the Contributors.
		 * MIT LICENSE
		 *
		 */

		if(!Array.isArray){

			Array.isArray = function(arr) {

					return Object.prototype.toString.call(arr) == '[object Array]';

			}


		}
		if (!Array.prototype.filter) {
		    Array.prototype.filter = function(fun /*, thisp*/){
		        var len = this.length;
		        if (typeof fun != "function"){
		            throw new TypeError();
		        }
		        var res = new Array();
		        var thisp = arguments[1];
		        for (var i = 0; i < len; i++){
		            if (i in this){
		                var val = this[i]; // in case fun mutates this
		                if (fun.call(thisp, val, i, this)) {
		                    res.push(val);
		                }
		            }
		        }
		        return res;
		    };
		}
		var dloc = document.location;

		function dlocHashEmpty() {
			// Non-IE browsers return '' when the address bar shows '#'; Director's logic
			// assumes both mean empty.
			return dloc.hash === '' || dloc.hash === '#';
		}

		var listener = {
			mode: 'modern',
			hash: dloc.hash,
			history: false,

			check: function() {
				var h = dloc.hash;
				if (h != this.hash) {
					this.hash = h;
					this.onHashChanged();
				}
			},

			fire: function() {
				if (this.mode === 'modern') {
					this.history === true ? window.onpopstate() : window.onhashchange();
				} else {
					this.onHashChanged();
				}
			},

			init: function(fn, history) {
				var self = this;
				this.history = history;

				if (!Router.listeners) {
					Router.listeners = [];
				}

				function onchange(onChangeEvent) {
					for (var i = 0, l = Router.listeners.length; i < l; i++) {
						Router.listeners[i](onChangeEvent);
					}
				}

				//note IE8 is being counted as 'modern' because it has the hashchange event
				if ('onhashchange' in window && (document.documentMode === undefined || document.documentMode > 7)) {
					// At least for now HTML5 history is available for 'modern' browsers only
					if (this.history === true) {
						// There is an old bug in Chrome that causes onpopstate to fire even
						// upon initial page load. Since the handler is run manually in init(),
						// this would cause Chrome to run it twise. Currently the only
						// workaround seems to be to set the handler after the initial page load
						// http://code.google.com/p/chromium/issues/detail?id=63040
						setTimeout(function() {
							window.onpopstate = onchange;
						}, 500);
					} else {
						window.onhashchange = onchange;
					}
					this.mode = 'modern';
				} else {
					//
					// IE support, based on a concept by Erik Arvidson ...
					//
					var frame = document.createElement('iframe');
					frame.id = 'state-frame';
					frame.style.display = 'none';
					document.body.appendChild(frame);
					this.writeFrame('');

					if ('onpropertychange' in document && 'attachEvent' in document) {
						document.attachEvent('onpropertychange', function() {
							if (event.propertyName === 'location') {
								self.check();
							}
						});
					}

					window.setInterval(function() {
						self.check();
					}, 50);

					this.onHashChanged = onchange;
					this.mode = 'legacy';
				}

				Router.listeners.push(fn);

				return this.mode;
			},

			destroy: function(fn) {
				if (!Router || !Router.listeners) {
					return;
				}

				var listeners = Router.listeners;

				for (var i = listeners.length - 1; i >= 0; i--) {
					if (listeners[i] === fn) {
						listeners.splice(i, 1);
					}
				}
			},

			setHash: function(s) {
				// Mozilla always adds an entry to the history
				if (this.mode === 'legacy') {
					this.writeFrame(s);
				}

				if (this.history === true) {
					window.history.pushState({}, document.title, s);
					// Fire an onpopstate event manually since pushing does not obviously
					// trigger the pop event.
					this.fire();
				} else {
					dloc.hash = (s[0] === '/') ? s : '/' + s;
				}
				return this;
			},

			writeFrame: function(s) {
				// IE support...
				var f = document.getElementById('state-frame');
				var d = f.contentDocument || f.contentWindow.document;
				d.open();
				d.write("<script>_hash = '" + s + "'; onload = parent.listener.syncHash;<script>");
				d.close();
			},

			syncHash: function() {
				// IE support...
				var s = this._hash;
				if (s != dloc.hash) {
					dloc.hash = s;
				}
				return this;
			},

			onHashChanged: function() {}
		};

		var Router = exports.Router = function(routes) {
			if (!(this instanceof Router)) return new Router(routes);

			this.params = {};
			this.routes = {};
			this.methods = ['on', 'once', 'after', 'before'];
			this.scope = [];
			this._methods = {};

			this._insert = this.insert;
			this.insert = this.insertEx;

			this.historySupport = (window.history != null ? window.history.pushState : null) != null

			this.configure();
			this.mount(routes || {});
		};

		Router.prototype.init = function(r) {
			var self = this,
				routeTo;
			this.handler = function(onChangeEvent) {
				var newURL = onChangeEvent && onChangeEvent.newURL || window.location.hash;
				var url = self.history === true ? self.getPath() : newURL.replace(/.*#/, '');
				self.dispatch('on', url.charAt(0) === '/' ? url : '/' + url);
			};

			listener.init(this.handler, this.history);

			if (this.history === false) {
				if (dlocHashEmpty() && r) {
					dloc.hash = r;
				} else if (!dlocHashEmpty()) {
					self.dispatch('on', '/' + dloc.hash.replace(/^(#\/|#|\/)/, ''));
				}
			} else {
				if (this.convert_hash_in_init) {
					// Use hash as route
					routeTo = dlocHashEmpty() && r ? r : !dlocHashEmpty() ? dloc.hash.replace(/^#/, '') : null;
					if (routeTo) {
						window.history.replaceState({}, document.title, routeTo);
					}
				} else {
					// Use canonical url
					routeTo = this.getPath();
				}

				// Router has been initialized, but due to the chrome bug it will not
				// yet actually route HTML5 history state changes. Thus, decide if should route.
				if (routeTo || this.run_in_init === true) {
					this.handler();
				}
			}

			return this;
		};

		Router.prototype.explode = function() {
			var v = this.history === true ? this.getPath() : dloc.hash;
			if (v.charAt(1) === '/') {
				v = v.slice(1)
			}
			return v.slice(1, v.length).split("/");
		};

		Router.prototype.setRoute = function(i, v, val) {
			var url = this.explode();

			if (typeof i === 'number' && typeof v === 'string') {
				url[i] = v;
			} else if (typeof val === 'string') {
				url.splice(i, v, s);
			} else {
				url = [i];
			}

			listener.setHash(url.join('/'));
			return url;
		};

		//
		// ### function insertEx(method, path, route, parent)
		// #### @method {string} Method to insert the specific `route`.
		// #### @path {Array} Parsed path to insert the `route` at.
		// #### @route {Array|function} Route handlers to insert.
		// #### @parent {Object} **Optional** Parent "routes" to insert into.
		// insert a callback that will only occur once per the matched route.
		//
		Router.prototype.insertEx = function(method, path, route, parent) {
			if (method === "once") {
				method = "on";
				route = function(route) {
					var once = false;
					return function() {
						if (once) return;
						once = true;
						return route.apply(this, arguments);
					};
				}(route);
			}
			return this._insert(method, path, route, parent);
		};

		Router.prototype.getRoute = function(v) {
			var ret = v;

			if (typeof v === "number") {
				ret = this.explode()[v];
			} else if (typeof v === "string") {
				var h = this.explode();
				ret = h.indexOf(v);
			} else {
				ret = this.explode();
			}

			return ret;
		};

		Router.prototype.destroy = function() {
			listener.destroy(this.handler);
			return this;
		};

		Router.prototype.getPath = function() {
			var path = window.location.pathname;
			if (path.substr(0, 1) !== '/') {
				path = '/' + path;
			}
			return path;
		};

		function _every(arr, iterator) {
			for (var i = 0; i < arr.length; i += 1) {
				if (iterator(arr[i], i, arr) === false) {
					return;
				}
			}
		}

		function _flatten(arr) {
			var flat = [];
			for (var i = 0, n = arr.length; i < n; i++) {
				flat = flat.concat(arr[i]);
			}
			return flat;
		}

		function _asyncEverySeries(arr, iterator, callback) {
			if (!arr.length) {
				return callback();
			}
			var completed = 0;
			(function iterate() {
				iterator(arr[completed], function(err) {
					if (err || err === false) {
						callback(err);
						callback = function() {};
					} else {
						completed += 1;
						if (completed === arr.length) {
							callback();
						} else {
							iterate();
						}
					}
				});
			})();
		}

		function paramifyString(str, params, mod) {
			mod = str;
			for (var param in params) {
				if (params.hasOwnProperty(param)) {
					mod = params[param](str);
					if (mod !== str) {
						break;
					}
				}
			}
			return mod === str ? "([._a-zA-Z0-9-%()]+)" : mod;
		}

		function regifyString(str, params) {
			var matches, last = 0,
				out = "";
			while (matches = str.substr(last).match(/[^\w\d\- %@&]*\*[^\w\d\- %@&]*/)) {
				last = matches.index + matches[0].length;
				matches[0] = matches[0].replace(/^\*/, "([_.()!\\ %@&a-zA-Z0-9-]+)");
				out += str.substr(0, matches.index) + matches[0];
			}
			str = out += str.substr(last);
			var captures = str.match(/:([^\/]+)/ig),
				capture, length;
			if (captures) {
				length = captures.length;
				for (var i = 0; i < length; i++) {
					capture = captures[i];
					if (capture.slice(0, 2) === "::") {
						str = capture.slice(1);
					} else {
						str = str.replace(capture, paramifyString(capture, params));
					}
				}
			}
			return str;
		}

		function terminator(routes, delimiter, start, stop) {
			var last = 0,
				left = 0,
				right = 0,
				start = (start || "(").toString(),
				stop = (stop || ")").toString(),
				i;
			for (i = 0; i < routes.length; i++) {
				var chunk = routes[i];
				if (chunk.indexOf(start, last) > chunk.indexOf(stop, last) || ~chunk.indexOf(start, last) && !~chunk.indexOf(stop, last) || !~chunk.indexOf(start, last) && ~chunk.indexOf(stop, last)) {
					left = chunk.indexOf(start, last);
					right = chunk.indexOf(stop, last);
					if (~left && !~right || !~left && ~right) {
						var tmp = routes.slice(0, (i || 1) + 1).join(delimiter);
						routes = [tmp].concat(routes.slice((i || 1) + 1));
					}
					last = (right > left ? right : left) + 1;
					i = 0;
				} else {
					last = 0;
				}
			}
			return routes;
		}

		var QUERY_SEPARATOR = /\?.*/;

		Router.prototype.configure = function(options) {
			options = options || {};
			for (var i = 0; i < this.methods.length; i++) {
				this._methods[this.methods[i]] = true;
			}
			this.recurse = options.recurse || this.recurse || false;
			this.async = options.async || false;
			this.delimiter = options.delimiter || "/";
			this.strict = typeof options.strict === "undefined" ? true : options.strict;
			this.notfound = options.notfound;
			this.resource = options.resource;
			this.history = options.html5history && this.historySupport || false;
			this.run_in_init = this.history === true && options.run_handler_in_init !== false;
			this.convert_hash_in_init = this.history === true && options.convert_hash_in_init !== false;
			this.every = {
				after: options.after || null,
				before: options.before || null,
				on: options.on || null
			};
			return this;
		};

		Router.prototype.param = function(token, matcher) {
			if (token[0] !== ":") {
				token = ":" + token;
			}
			var compiled = new RegExp(token, "g");
			this.params[token] = function(str) {
				return str.replace(compiled, matcher.source || matcher);
			};
			return this;
		};

		Router.prototype.on = Router.prototype.route = function(method, path, route) {
			var self = this;
			if (!route && typeof path == "function") {
				route = path;
				path = method;
				method = "on";
			}
			if (Array.isArray(path)) {
				return path.forEach(function(p) {
					self.on(method, p, route);
				});
			}
			if (path.source) {
				path = path.source.replace(/\\\//ig, "/");
			}
			if (Array.isArray(method)) {
				return method.forEach(function(m) {
					self.on(m.toLowerCase(), path, route);
				});
			}
			path = path.split(new RegExp(this.delimiter));
			path = terminator(path, this.delimiter);
			this.insert(method, this.scope.concat(path), route);
		};

		Router.prototype.path = function(path, routesFn) {
			var self = this,
				length = this.scope.length;
			if (path.source) {
				path = path.source.replace(/\\\//ig, "/");
			}
			path = path.split(new RegExp(this.delimiter));
			path = terminator(path, this.delimiter);
			this.scope = this.scope.concat(path);
			routesFn.call(this, this);
			this.scope.splice(length, path.length);
		};

		Router.prototype.dispatch = function(method, path, callback) {
			var self = this,
				fns = this.traverse(method, path.replace(QUERY_SEPARATOR, ""), this.routes, ""),
				invoked = this._invoked,
				after;
			this._invoked = true;
			if (!fns || fns.length === 0) {
				this.last = [];
				if (typeof this.notfound === "function") {
					this.invoke([this.notfound], {
						method: method,
						path: path
					}, callback);
				}
				return false;
			}
			if (this.recurse === "forward") {
				fns = fns.reverse();
			}

			function updateAndInvoke() {
				self.last = fns.after;
				self.invoke(self.runlist(fns), self, callback);
			}
			after = this.every && this.every.after ? [this.every.after].concat(this.last) : [this.last];
			if (after && after.length > 0 && invoked) {
				if (this.async) {
					this.invoke(after, this, updateAndInvoke);
				} else {
					this.invoke(after, this);
					updateAndInvoke();
				}
				return true;
			}
			updateAndInvoke();
			return true;
		};

		Router.prototype.invoke = function(fns, thisArg, callback) {
			var self = this;
			var apply;
			if (this.async) {
				apply = function(fn, next) {
					if (Array.isArray(fn)) {
						return _asyncEverySeries(fn, apply, next);
					} else if (typeof fn == "function") {
						fn.apply(thisArg, (fns.captures || []).concat(next));
					}
				};
				_asyncEverySeries(fns, apply, function() {
					if (callback) {
						callback.apply(thisArg, arguments);
					}
				});
			} else {
				apply = function(fn) {
					if (Array.isArray(fn)) {
						return _every(fn, apply);
					} else if (typeof fn === "function") {
						return fn.apply(thisArg, fns.captures || []);
					} else if (typeof fn === "string" && self.resource) {
						self.resource[fn].apply(thisArg, fns.captures || []);
					}
				};
				_every(fns, apply);
			}
		};

		Router.prototype.traverse = function(method, path, routes, regexp, filter) {
			var fns = [],
				current, exact, match, next, that;

			function filterRoutes(routes) {
				if (!filter) {
					return routes;
				}

				function deepCopy(source) {
					var result = [];
					for (var i = 0; i < source.length; i++) {
						result[i] = Array.isArray(source[i]) ? deepCopy(source[i]) : source[i];
					}
					return result;
				}

				function applyFilter(fns) {
					for (var i = fns.length - 1; i >= 0; i--) {
						if (Array.isArray(fns[i])) {
							applyFilter(fns[i]);
							if (fns[i].length === 0) {
								fns.splice(i, 1);
							}
						} else {
							if (!filter(fns[i])) {
								fns.splice(i, 1);
							}
						}
					}
				}
				var newRoutes = deepCopy(routes);
				newRoutes.matched = routes.matched;
				newRoutes.captures = routes.captures;
				newRoutes.after = routes.after.filter(filter);
				applyFilter(newRoutes);
				return newRoutes;
			}
			if (path === this.delimiter && routes[method]) {
				next = [
					[routes.before, routes[method]].filter(Boolean)
				];
				next.after = [routes.after].filter(Boolean);
				next.matched = true;
				next.captures = [];
				return filterRoutes(next);
			}
			for (var r in routes) {
				if (routes.hasOwnProperty(r) && (!this._methods[r] || this._methods[r] && typeof routes[r] === "object" && !Array.isArray(routes[r]))) {
					current = exact = regexp + this.delimiter + r;
					if (!this.strict) {
						exact += "[" + this.delimiter + "]?";
					}
					match = path.match(new RegExp("^" + exact));
					if (!match) {
						continue;
					}
					if (match[0] && match[0] == path && routes[r][method]) {
						next = [
							[routes[r].before, routes[r][method]].filter(Boolean)
						];
						next.after = [routes[r].after].filter(Boolean);
						next.matched = true;
						next.captures = match.slice(1);
						if (this.recurse && routes === this.routes) {
							next.push([routes.before, routes.on].filter(Boolean));
							next.after = next.after.concat([routes.after].filter(Boolean));
						}
						return filterRoutes(next);
					}
					next = this.traverse(method, path, routes[r], current);
					if (next.matched) {
						if (next.length > 0) {
							fns = fns.concat(next);
						}
						if (this.recurse) {
							fns.push([routes[r].before, routes[r].on].filter(Boolean));
							next.after = next.after.concat([routes[r].after].filter(Boolean));
							if (routes === this.routes) {
								fns.push([routes["before"], routes["on"]].filter(Boolean));
								next.after = next.after.concat([routes["after"]].filter(Boolean));
							}
						}
						fns.matched = true;
						fns.captures = next.captures;
						fns.after = next.after;
						return filterRoutes(fns);
					}
				}
			}
			return false;
		};

		Router.prototype.insert = function(method, path, route, parent) {
			var methodType, parentType, isArray, nested, part;


			path = path.filter(function(p) {

				return p && p.length > 0;
			});
			parent = parent || this.routes;
			part = path.shift();
			if (/\:|\*/.test(part) && !/\\d|\\w/.test(part)) {
				part = regifyString(part, this.params);
			}
			if (path.length > 0) {
				parent[part] = parent[part] || {};
				return this.insert(method, path, route, parent[part]);
			}
			if (!part && !path.length && parent === this.routes) {
				methodType = typeof parent[method];
				switch (methodType) {
					case "function":
						parent[method] = [parent[method], route];
						return;
					case "object":
						parent[method].push(route);
						return;
					case "undefined":
						parent[method] = route;
						return;
				}
				return;
			}
			parentType = typeof parent[part];
			isArray = Array.isArray(parent[part]);
			if (parent[part] && !isArray && parentType == "object") {
				methodType = typeof parent[part][method];
				switch (methodType) {
					case "function":
						parent[part][method] = [parent[part][method], route];
						return;
					case "object":
						parent[part][method].push(route);
						return;
					case "undefined":
						parent[part][method] = route;
						return;
				}
			} else if (parentType == "undefined") {
				nested = {};
				nested[method] = route;
				parent[part] = nested;
				return;
			}
			throw new Error("Invalid route context: " + parentType);
		};



		Router.prototype.extend = function(methods) {
			var self = this,
				len = methods.length,
				i;

			function extend(method) {
				self._methods[method] = true;
				self[method] = function() {
					var extra = arguments.length === 1 ? [method, ""] : [method];
					self.on.apply(self, extra.concat(Array.prototype.slice.call(arguments)));
				};
			}
			for (i = 0; i < len; i++) {
				extend(methods[i]);
			}
		};

		Router.prototype.runlist = function(fns) {
			var runlist = this.every && this.every.before ? [this.every.before].concat(_flatten(fns)) : _flatten(fns);
			if (this.every && this.every.on) {
				runlist.push(this.every.on);
			}
			runlist.captures = fns.captures;
			runlist.source = fns.source;
			return runlist;
		};

		Router.prototype.mount = function(routes, path) {


			if (!routes || typeof routes !== "object" || Array.isArray(routes)) {
				return;
			}
			var self = this;
			path = path || [];
			if (!Array.isArray(path)) {
				path = path.split(self.delimiter);
			}

			function insertOrMount(route, local) {
				var rename = route,
					parts = route.split(self.delimiter),
					routeType = typeof routes[route],
					isRoute = parts[0] === "" || !self._methods[parts[0]],
					event = isRoute ? "on" : rename;
				if (isRoute) {
					rename = rename.slice((rename.match(new RegExp("^" + self.delimiter)) || [""])[0].length);
					parts.shift();
				}
				if (isRoute && routeType === "object" && !Array.isArray(routes[route])) {
					local = local.concat(parts);
					self.mount(routes[route], local);
					return;
				}
				if (isRoute) {
					local = local.concat(rename.split(self.delimiter));
					local = terminator(local, self.delimiter);
				}
				self.insert(event, local, routes[route]);
			}
			for (var route in routes) {
				if (routes.hasOwnProperty(route)) {
					insertOrMount(route, path.slice(0));
				}
			}
		};

	}( true ? exports : window));

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, module, exports ){
	var sites = __webpack_require__(30);
	var art = __webpack_require__(20);
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
	                    var minlayout = __webpack_require__(31);
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
				window.location.hash = '#sysmgr';
	            //window.location.href=window.location.protocol+'//'+window.location.host+window.location.pathname;
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
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 30 */
/***/ function(module, exports) {

	module.exports = " <div id=\"layoutList\" class=\"layout-list\">\n    <div class=\"page-header\">\n       <span class=\"page-title\">布局管理</span>\n        <button class=\"u-button margin-left-10 font-size-14 backBtn btn-back\">返回</button>\n\n    </div>\n\n    <div class=\"page-content container-fluid\">\n        <div class=\"row\" style=\"margin-top: -10px\">\n            <div class=\"page-header-actions dropdown\" style=\"z-index: 2!important;width: auto\">\n                <a class=\"inline-block\" href=\"javascript:void(0)\" role=\"button\" data-animation=\"scale-up\" aria-expanded=\"false\" data-toggle=\"dropdown\">\n                    <button class=\"u-button u-button-info\" type=\"button\" >\n                        <span class=\"text hidden-xs\">创建布局</span>\n                        <i aria-hidden=\"true\" class=\"icon wb-chevron-right\"></i>\n                    </button>\n                </a>\n                <ul role=\"menu\" class=\"dropdown-menu dropdown-menu-left dropdown-menu-media dropdown-layout\">\n                    <li role=\"presentation\" class=\"scrollable is-enabled scrollable-vertical\" style=\"position: relative\">\n                        <div data-role=\"container\" class=\"scrollable-container\" >\n\n                            <div data-role=\"content\" class=\"scrollable-content\" >\n                                <div class=\"panel-body\">\n                                    <form>\n                                        <div class=\"form-inline\">\n                                            <label class=\"control-label\">名称</label>\n                                            <span class=\"field\">*</span>\n                                            <input type=\"text\" id=\"exampleName\" placeholder=\"名称\" class=\"form-control\" />\n                                        </div>\n                                        <div class=\"form-inline\">\n                                            <label class=\"control-label\">编码</label>\n                                            <span class=\"field\">*</span>\n                                            <input type=\"text\" name=\"id\" id=\"code\" placeholder=\"编码\" class=\"form-control\">\n                                        </div>\n                                        <div class=\"form-inline\">\n                                            <div id=\"errorMessage\"></div>\n                                        </div>\n                                        <div class=\"form-group text-right\">\n                                            <button id=\"site-save-open\"  class=\"u-button u-button-info\">创建并打开</button>\n                                            <button id=\"site-save\" class=\"u-button u-button-info\">保存</button>\n                                        </div>\n                                    </form>\n                                </div>\n                            </div>\n\n                        </div>\n                    </li>\n                </ul>\n                <button class=\"u-button font-size-14 batch-del btn-back\" style=\"margin-left: 8px\">批量删除</button>\n                <button class=\"u-button font-size-14 batch-application btn-back hide\" style=\"margin-left: 8px\">批量发布</button>\n            </div>\n            <div class=\"search  pull-right \">\n                <div class=\"u-input-group u-has-feedback \">\n                    <input type=\"text\" class=\"u-form-control\"  placeholder=\"布局名称/布局编码\">\n                    <span class=\"u-form-control-feedback uf uf-magnifyingglass\"  id=\"searchBtn\"></span>\n                </div>\n            </div>\n        </div>\n        <div class=\"empty\"></div>\n        <div class=\"row padding-top-10 \" style=\"background: #fff;overflow: auto;\">\n            <table class=\"u-table b-table width-full\">\n                <thead>\n                    <tr>\n                        <th>\n                            <label class=\"u-checkbox only-style u-checkbox-info is-upgraded\"  data-upgraded=\",u.Checkbox\">\n                                <input  type=\"checkbox\" class=\"u-checkbox-input\">\n                                <span class=\"u-checkbox-label\"></span>\n                                <span class=\"u-checkbox-focus-helper\"></span>\n                                <span class=\"u-checkbox-outline\">\n                                    <span class=\"u-checkbox-tick-outline\"></span>\n                                </span>\n                                <span style=\"overflow: hidden; position: relative;\">\n                                    <span class=\"u-ripple\"></span>\n                                </span>\n                            </label>\n                        </th>\n                        <th>布局名称</th>\n                        <th>布局编码</th>\n                        <th>模板名称</th>\n                        <th>创建时间</th>\n                        <th>最后修改时间</th>\n                        <th>是否启用</th>\n                        <th style=\"min-width: 180px;\">操作</th>\n                    </tr>\n                </thead>\n                <tbody>\n                {{each list as item i}}\n                    <tr>\n                        <td>\n                            <label class=\"u-checkbox only-style u-checkbox-info is-upgraded\"  data-upgraded=\",u.Checkbox\" layout-id=\"{{item.id}}\" layout-tag=\"{{item.tag}}\" layout-name=\"{{item.name}}\">\n                                <input  type=\"checkbox\" class=\"u-checkbox-input\">\n                                <span class=\"u-checkbox-label\"></span>\n                                <span class=\"u-checkbox-focus-helper\"></span>\n                                <span class=\"u-checkbox-outline\">\n                                    <span class=\"u-checkbox-tick-outline\"></span>\n                                </span>\n                                <span style=\"overflow: hidden; position: relative;\">\n                                    <span class=\"u-ripple\"></span>\n                                </span>\n                            </label>\n                        </td>\n                        <td title=\"{{item.name}}\">{{item.name}}</td>\n                        <td title=\"{{item.id}}\">{{item.id}}</td>\n                        <td title=\"{{item.tplname}}\">{{item.tplname}}</td>\n                        <td>{{item.createtime}}</td>\n                        <td>{{item.lastModifytime}}</td>\n                        <td>{{item.isenable}}</td>\n                        <td>\n                            <a  data-id=\"{{item.id}}\" data-name=\"{{item.name}}\" data-isenable=\"{{item.isenable}}\" data-tag=\"{{item.tag}}\"  title=\"编辑\" class=\"layouts-edit\">\n                                <i class=\"iconfont icon-pencil\"></i>\n                            </a>&nbsp;\n                            <a  data-id=\"{{item.id}}\" data-name=\"{{item.name}}\"  title=\"复制\" class=\"layouts-copy\">\n                                <i class=\"enterprisefont icon-fuzhi\"></i>\n                            </a>&nbsp;\n                            <a href=\"#/layout/{{item.id}}/{{item.tag||'tag'}}/back/layouts\" data-id=\"{{item.id}}\" data-viewid=\"{{item.id}}\" title=\"设计\">\n                                <i class=\"portalfont icon-icon4\"></i>\n                            </a>&nbsp;\n                            <a href=\"javascript:;\" data-id=\"{{item.id}}\" data-name=\"{{item.name}}\" class=\"layout-application hide\" title=\"发布到菜单\">\n                                <i class=\"enterprisefont icon-fabudaocaidan\"></i>\n                            </a>&nbsp;\n                            <a href=\"\" data-id=\"{{item.id}}\" class=\"layout-del\" data-tag=\"{{item.tag}}\" title=\"删除\">\n                                <i class=\"iconfont icon-delete\"></i>\n                            </a>\n                        </td>\n                    </tr>\n                {{/each}}\n                </tbody>\n            </table>\n        </div>\n        <div class=\"page text-center\" id=\"layoutPages\">\n            <input type=\"text\" class=\"hide\" id=\"startPageIndex\">\n            <div id='layoutPage' class='u-pagination pagination-center'>\n            </div>\n        </div>\n    </div>\n\n\n\n     <div class=\"modal fade\" id=\"layoutDel\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\">\n         <div class=\"modal-dialog\">\n             <div class=\"modal-content\">\n                 <div class=\"modal-header portal-modal-header\">\n                     <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button>\n                     <h4 class=\"modal-title\" id=\"myModalLabel\">\n                         确认\n                     </h4>\n                 </div>\n                 <div class=\"modal-body\">\n                     您确认要删除此布局吗？\n                 </div>\n                 <div class=\"modal-footer\">\n                     <button type=\"button\" class=\"u-button btn-del raised u-button-info\">确认</button>\n                     <button type=\"button\" class=\"u-button btn-default\" data-dismiss=\"modal\" style=\"border: 1px solid #cecece\">取消</button>\n                 </div>\n             </div><!-- /.modal-content -->\n         </div><!-- /.modal -->\n     </div>\n\n     <div class=\"layoutEdit\" id=\"layoutEdit\" style=\"display: none\">\n         <div class=\"portal-uui-dialog-title\">编辑</div>\n         <div class=\"u-msg-content\">\n             <input type=\"hidden\" id=\"leTag\">\n             <div class=\"u-row u-form-group\">\n                 <label class=\"u-input-label u-col-2 text-right\">布局名称:</label>\n                 <span class=\"field\">*</span>\n                 <input placeholder=\"请输入布局名称\" name=\"layoutName\" id=\"layoutName\" class=\"u-form-control u-col-10\"/>\n                 <span class=\"u-form-control-info uf uf-exclamationsign  u-col-10\" >布局名称不能为空</span>\n             </div>\n             <div class=\" u-row u-form-group\">\n                 <label class=\"u-input-label u-col-2 text-right\">是否启用:</label>\n                 <select name=\"start\" id=\"start\" class=\"u-form-control u-col-10 portal-select\">\n                     <option value=\"Y\">启用</option>\n                     <option value=\"N\">停用</option>\n                 </select>\n             </div>\n         </div>\n         <div class=\"u-msg-footer  padding-bottom-20\">\n             <button type=\"button\" class=\"u-button  pull-right layout-cancel\" style=\"border: 1px solid #cecece\">取消</button>\n             <button type=\"button\" class=\"u-button raised u-button-info pull-right margin-right-10 layout-ok\">保存\n             </button>\n         </div>\n     </div>\n\n     <div class=\"layoutCopy \" id=\"layoutCopy\" style=\"display: none\">\n         <div class=\"portal-uui-dialog-title\">复制</div>\n         <div class=\"u-msg-content\">\n             <div class=\"u-row u-form-group\">\n                 <label class=\"u-input-label u-col-2 text-right\">布局名称:</label>\n                 <span class=\"field\" >*</span>\n                 <input placeholder=\"请输入布局名称\" name=\"lcName\" id=\"lcName\" class=\"u-form-control u-col-10\"/>\n                 <span class=\"u-form-control-info uf uf-exclamationsign u-col-10\" >布局名称不能为空</span>\n             </div>\n             <div class=\" u-row u-form-group\">\n                 <label class=\"u-input-label u-col-2 text-right\">布局编码:</label>\n                 <span class=\"field\">*</span>\n                 <input placeholder=\"请输入布局编码\" name=\"lcCode\" id=\"lcCode\" class=\"u-form-control u-col-10\"/>\n                 <span class=\"u-form-control-info uf uf-exclamationsign u-col-10\" >布局编码不能为空且只能有字母和数字组成</span>\n             </div>\n         </div>\n         <div class=\"u-msg-footer  padding-bottom-20\">\n             <button type=\"button\" class=\"u-button  pull-right lc-cancel\" style=\"border: 1px solid #cecece\">取消</button>\n             <button type=\"button\" class=\"u-button raised u-button-info pull-right margin-right-10 lc-ok\">保存\n             </button>\n         </div>\n     </div>\n\n     <div class=\"layoutMenu \" id=\"layoutMenu\" style=\"display: none\">\n         <div class=\"u-msg-title\">发布到菜单</div>\n         <div class=\"u-msg-content\" >\n             <div class=\"u-row\" style=\"position: relative\">\n                 <div class=\"u-col-2 u-col-xs-2 \"></div>\n                 <div class=\"layoutIcon u-col-10 u-col-xs-10\" id=\"layoutIcon\" style=\"display: none\">\n\n                 </div>\n             </div>\n             <div class=\" u-row u-form-group hide\">\n                 <label class=\"u-input-label u-col-2 text-right\">菜单名称:</label>\n                 <span class=\"field\">*</span>\n                 <input placeholder=\"请输入菜单名称\" name=\"name\" id=\"name\" value=\"name\" class=\"u-form-control u-col-10\"/>\n                 <span class=\"u-form-control-info uf uf-exclamationsign u-col-10\" >菜单名称不能为空</span>\n             </div>\n             <div class=\" u-row u-form-group hide\">\n                 <label class=\"u-input-label u-col-2 text-right\">菜单编码:</label>\n                 <span class=\"field\">*</span>\n                 <input placeholder=\"请输入菜单编码\" name=\"funcId\" id=\"funcId\" value=\"code\" class=\"u-form-control u-col-10\"/>\n                 <span class=\"u-form-control-info uf uf-exclamationsign u-col-10\" >菜单编码不能为空且只能有字母和数字组成</span>\n\n             </div>\n             <div class=\" u-row u-form-group \">\n                 <label class=\"u-input-label u-col-2 u-col-xs-2 text-right\">图标:</label>\n                 <input placeholder=\"图标\" name=\"icon\" id=\"icon\" class=\"u-form-control u-col-10 u-col-xs-10\" value=\"icon-C-home\"/>\n                 <span class=\"u-form-control-feedback portalfont icon-cancel02 input-close icon-close\" title=\"清除\"></span>\n             </div>\n             <div class=\" u-row u-form-group \">\n                 <label class=\"u-input-label u-col-2 u-col-xs-2 text-right\">父菜单编码:</label>\n                 <select name=\"parentId\" id=\"parentId\" class=\"u-form-control u-col-10 u-col-xs-10 portal-select\">\n\n                 </select>\n             </div>\n             <div class=\" u-row u-form-group\">\n                 <label class=\"u-input-label u-col-2 u-col-xs-2 text-right\">打开方式:</label>\n                 <span class=\"field\">*</span>\n                 <select class=\"u-form-control u-col-10 u-col-xs-10 portal-select\" id=\"openview\" name=\"openview\">\n                     <option value=\"curnpage\">当前页面</option>\n                     <option value=\"blank\">新窗口打开</option>\n                 </select>\n                 <span class=\"u-form-control-info uf uf-exclamationsign u-col-10\" >打开方式不能为空</span>\n             </div>\n             <div class=\"u-row u-form-group\">\n                 <label class=\"u-input-label u-col-2 u-col-xs-2 text-right\">是否首页:</label>\n                 <div class=\"u-col-10 u-col-xs-10\" id=\"isDefaultIndex\">\n                     <label class=\"u-radio u-radio-info is-upgraded \" for=\"option-1\" data-upgraded=\",u.Radio\">\n                         <input type=\"radio\" id=\"option-1\" class=\"u-radio-button\" name=\"options\" value=\"true\">\n                         <span class=\"u-radio-label\">是</span>\n                         <span class=\"u-radio-outer-circle\"></span>\n                         <span class=\"u-radio-inner-circle\"></span>\n                         <span style=\"overflow: hidden; position: relative;\">\n                         <span class=\"u-ripple\"></span></span>\n                     </label>\n                     <label class=\"u-radio u-radio-info is-upgraded is-checked\" for=\"option-2\" data-upgraded=\",u.Radio\" >\n                         <input type=\"radio\" id=\"option-2\" class=\"u-radio-button\" name=\"options\" value=\"false\">\n                         <span class=\"u-radio-label\">否</span>\n                         <span class=\"u-radio-outer-circle\"></span>\n                         <span class=\"u-radio-inner-circle\"></span>\n\t\t\t\t         <span style=\"overflow: hidden; position: relative;\">\n\t\t\t\t\t     <span class=\"u-ripple\"></span></span>\n                     </label>\n                 </div>\n             </div>\n             <div class=\" u-row u-form-group u-has-feedback\">\n                 <label class=\"u-input-label u-col-2 u-col-xs-2 text-right\">选择角色:</label>\n                 <span class=\"field\">*</span>\n                 <input name=\"role\" id=\"role\" class=\"u-form-control u-col-10 u-col-xs-10\"/>\n                 <span class=\"u-form-control-info uf uf-exclamationsign u-col-10 u-col-xs-10\" >角色不能为空</span>\n                 <span class=\"u-form-control-feedback portalfont icon-cancel02 input-close\" title=\"清除\"></span>\n             </div>\n             <input  id=\"id\" type=\"hidden\"/>\n             <input  id=\"roleCode\" type=\"hidden\"/>\n\n         </div>\n         <div class=\"u-msg-footer  padding-bottom-20\">\n             <button type=\"button\" class=\"u-button  pull-right lm-cancel\" style=\"border: 1px solid #cecece\">取消</button>\n             <button type=\"button\" class=\"u-button raised u-button-info pull-right margin-right-10 lm-ok\">保存</button>\n         </div>\n     </div>\n\n     <div class=\"layoutRole \" id=\"layoutRole\" style=\"display: none\">\n         <div class=\"u-msg-title\">角色列表</div>\n         <div class=\"u-msg-content\" >\n             <div class=\"lr-search u-row\">\n                 <div class=\" u-form-group \">\n                     <label class=\"u-input-label u-col-2 text-right\">名称:</label>\n                     <input placeholder=\"请输入应用名称\" name=\"roleName\" id=\"lrRoleName\" class=\"u-form-control u-col-3\"/>\n                 </div>\n                 <div class=\"u-form-group\">\n                     <label class=\"u-input-label u-col-2 text-right\">编码:</label>\n                     <input placeholder=\"请输入应用名称\" name=\"roleId\" id=\"lrRoleId\" class=\"u-form-control u-col-3\"/>\n                 </div>\n                 <div class=\" u-col-2 margin-bottom-20\">\n                     <button class=\"u-button u-button-info\"  id=\"lrSearch\">查询</button>\n                 </div>\n             </div>\n             <div class=\"lr-content u-row\" style=\"overflow: auto;max-height: 300px\">\n                 <table class=\"u-table width-full\">\n                     <thead>\n                     <tr>\n                         <th></th>\n                         <th>角色名称</th>\n                         <th>角色编码</th>\n                     </tr>\n                     </thead>\n                     <tbody id=\"lr-data\">\n                     <tr>\n                         <td><input type=\"checkbox\"></td>\n                         <td>名称1</td>\n                         <td>bm1</td>\n                     </tr>\n                     <tr>\n                         <td><input type=\"checkbox\" ></td>\n                         <td>名称2</td>\n                         <td>bm2</td>\n                     </tr>\n                     </tbody>\n                 </table>\n             </div>\n         </div>\n         <div class=\"u-msg-footer  padding-bottom-20\">\n             <button type=\"button\" class=\"u-button  pull-right lr-cancel\" style=\"border: 1px solid #cecece\">取消</button>\n             <button type=\"button\" class=\"u-button raised u-button-info pull-right margin-right-10 lr-ok\">确定</button>\n         </div>\n     </div>\n\n </div>"

/***/ },
/* 31 */
/***/ function(module, exports) {

	module.exports = "{{each list as item i}}\n<div class=\"col-md-3\">\n    <div class=\"widget \">\n        <div class=\"widget-content padding-35 bg-white clearfix\">\n            <div class=\"pull-left white\">\n                <i aria-hidden=\"true\" class=\"icon icon-circle icon-2x wb-clipboard bg-red-600\"></i>\n            </div>\n            <div class=\"counter counter-md counter text-right pull-right\">\n                <div class=\"counter-number-group\">\n                    <span class=\"counter-number-related text-capitalize\">{{item.name}}</span>\n                </div>\n                <div class=\"counter-label text-capitalize font-size-16\"></div>\n            </div>\n        </div>\n        <div class=\"padding-10 text-right\">\n            <a href=\"javascript:;\" class=\"add-to-sidebar\">\n                <button  type=\"button\" class=\"btn btn-sm btn-outline btn-default btn-round\">\n                    <span class=\"text hidden-xs\">设为首页</span>\n                </button>\n            </a>\n            <a href=\"#/layout/{{item.id}}\">\n                <button type=\"button\" class=\"btn btn-sm btn-outline btn-default btn-round\">\n                    <span class=\"text hidden-xs\">设计</span>\n                </button>\n            </a>\n            <button type=\"button\" data-id=\"{{item.id}}\" class=\"btn btn-sm btn-outline btn-default btn-round layout-del\">\n                <span class=\"text hidden-xs\" >删除</span>\n                <i class=\"icon wb-chevron-right\" aria-hidden=\"true\"></i>\n            </button>\n        </div>\n    </div>\n</div>\n{{/each}}"

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function(){
	    var template = __webpack_require__(20);
	    var temp = __webpack_require__(33);


	    var init = function(){
	        $.ptAjax({
	            url: contextRoot+"/layout/tpl/list",
	            dataType: 'json',
	            type:'get',
	            contentType:'application/json',
	            success: function(res) {
	                var str = [];

	                var render = template.compile(temp);
	                var html  = render({list:res});
	                $('#content').html(html);

	                $('#upload-form').submit(function(e){

	                })

	            },
	            error: function (XMLHttpRequest) {
	                errorLogin(XMLHttpRequest);
	            }
	        });
	    };




	    return {
	        init:init
	    }
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))

/***/ },
/* 33 */
/***/ function(module, exports) {

	module.exports = "\n<div class=\"page-header\">\n    <h1 class=\"page-title\">布局模板管理</h1>\n    <ol class=\"breadcrumb\">\n        <li><a href=\"index.html\">首页</a></li>\n        <li class=\"active\">布局模板</li>\n    </ol>\n    <div class=\"page-header-actions dropdown\" style=\"z-index: 1\">\n        <a href=\"javascript:void(0)\" role=\"button\" data-animation=\"scale-up\" aria-expanded=\"false\" data-toggle=\"dropdown\">\n            <button class=\"btn btn-sm btn-outline btn-default btn-round\" type=\"button\">\n                <span class=\"text hidden-xs\">导入布局模板</span>\n                <i aria-hidden=\"true\" class=\"icon wb-chevron-right\"></i>\n            </button>\n        </a>\n        <ul role=\"menu\" class=\"dropdown-menu dropdown-menu-right dropdown-menu-media\">\n            <li role=\"presentation\" class=\"dropdown-menu-header\">\n                <h5>导入一个新的布局模板</h5>\n            </li>\n            <li role=\"presentation\" class=\"scrollable is-enabled scrollable-vertical\" style=\"position: relative\">\n                <div data-role=\"container\" class=\"scrollable-container\" >\n                    <div data-role=\"content\" class=\"scrollable-content\" >\n                        <div id=\"widget-list\" class=\"site-items list-unstyled\">\n                            <div class=\"col-md-12 widget-create\">\n                                <div class=\"panel-body\" id=\"widget-body\">\n                                    <form action=\"layout/tpl/import\" method=\"post\" enctype=\"multipart/form-data\" id=\"upload-form\"  target=\"hidden_frame\">\n                                        <div class=\"form-group\">\n                                            <h4 class=\"example-title\">名称</h4>\n                                            <input type=\"text\" name=\"name\" placeholder=\"名称\" id=\"inputRounded\" name=\"name\" class=\"form-control round\">\n                                        </div>\n                                        <div class=\"form-group\">\n                                            <h4 class=\"example-title\">标识</h4>\n                                            <input type=\"text\" name=\"id\" placeholder=\"标识\" id=\"\" class=\"form-control round\">\n                                        </div>\n                                        <div class=\"form-group\">\n                                            <h4 class=\"example-title\">模板上传</h4>\n                                            <div class=\"form-group\">\n                                                <div class=\"input-group input-group-file\">\n                                                    <input type=\"text\" readonly=\"\" class=\"form-control\">\n                                                    <span class=\"input-group-btn\">\n                                                      <span class=\"btn btn-outline btn-file\">\n                                                        <i aria-hidden=\"true\" class=\"icon wb-upload\"></i>\n                                                        <input type=\"file\" multiple=\"\" name=\"tpl\">\n                                                      </span>\n                                                    </span>\n                                                </div>\n                                            </div>\n                                        </div>\n                                        <div class=\"form-group text-left\">\n                                            <div id=\"errorMessage\"></div>\n                                        </div>\n                                        <div class=\"form-group text-right\">\n                                            <button type=\"submit\" id=\"file-upload\" class=\"btn-blue btn-block btn-xs\">上传</button>\n                                        </div>\n                                    </form>\n                                    <iframe name='hidden_frame' id=\"hidden_frame\" style='display:none'></iframe>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                </li>\n            <li role=\"presentation\" class=\"dropdown-menu-footer\">\n                <a role=\"button\" href=\"javascript:void(0)\" class=\"dropdown-menu-footer-btn\">\n                    <i aria-hidden=\"true\" class=\"icon wb-settings\"></i>\n                </a>\n            </li>\n        </ul>\n    </div>\n</div>\n\n<div class=\"page-content container-fluid\">\n    <div class=\"row\">\n        {{each list as item i}}\n        <div class=\"col-md-3\">\n            <div class=\"widget\">\n                <div class=\"widget-content padding-35 bg-white clearfix\">\n                    <div class=\"pull-left white\">\n                        <i aria-hidden=\"true\" class=\"icon icon-circle icon-2x wb-image bg-blue-600\"></i>\n                    </div>\n                    <div class=\"counter counter-md counter text-right pull-right\">\n                        <div class=\"counter-number-group\">\n                            <span class=\"counter-number-related text-capitalize\">{{item.name}}</span>\n                        </div>\n                        <div class=\"counter-label text-capitalize font-size-16\"></div>\n                    </div>\n                </div>\n                <div class=\"layout-template\">\n                    <!--\n                    {{echo item.tpl}}\n                    -->\n                </div>\n                <div class=\"padding-10 text-right\">\n                    <button type=\"button\" data-id=\"{{item.pkWidget}}\" class=\"btn btn-sm btn-outline btn-default btn-round widget-edit\">\n                        <span class=\"text hidden-xs\">编辑</span>\n                    </button>\n                    <button type=\"button\" data-id=\"{{item.pkWidget}}\" class=\"btn btn-sm btn-outline btn-default btn-round widget-del\">\n                        <span class=\"text hidden-xs\" >删除</span>\n                        <i class=\"icon wb-chevron-right\" aria-hidden=\"true\"></i>\n                    </button>\n                </div>\n            </div>\n        </div>\n        {{/each}}\n    </div>\n</div>";

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * Created by Liushaozhen on 2016/9/12.
	 */
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module ) {
	    var init = function(sysCode,content ){
	        $.ptAjax({
	            url: '/integration/usermapping/system/verifyitem/' + sysCode,
	            dataType: 'json',
	            type: 'get',
	            async:false,
	            contentType: 'application/json',
	            success: function (res) {
	                if (res.status == "1") {
	                    var html = __webpack_require__(35);
	                    content.innerHTML = html;
	                    var str = '';
	                    if (res.data && res.data.length) {
	                        for (var i = 0; i < res.data.length; i++) {
	                            var temp = res.data[i];
	                            var visable=temp.visable==true?'':'hide';
	                            var require=temp.required==true?'<div class="u-input-group-before" style="color: red;right:82%;top: 37%;">*</div>':'';
	                            var requireAttr=temp.required==true?'require="1"':'';
	                            var password=temp.ispassword==true?'password':'text';
	                            var defVal=temp.defVal==null?'':temp.defVal;
	                            str+='<div class="u-form-group u-has-feedback '+visable+'"><label class="u-col-2 u-form-label text-right padding-right-10" style="padding-top: 8px;">' + temp.title + '</label>'+
	                                '<input '+requireAttr+' type="'+password+'" class="u-form-control u-col-8" name="' + temp.id + '" value="'+defVal+'">'+require+'<div class="u-col-2"></div></div>';
	                        }
	                        if(!str){
	                            str='暂无凭证关联信息';
	                        }
	                        $('#userRelevance').find('form').html(str);
	                        //content.innerHTML = $('#userRelevance').html();
	                        $('.userRelevance').find('.u-msg-ok').show();
	                    }else{
	                        $('#userRelevance').find('form').html('暂无凭证关联信息');
	                        $('.userRelevance').find('.u-msg-ok').hide();
	                    }
	                }else{
	                    alert(res.message);
	                }
	            }
	        });
	        function getParams(name){
	            var url=window.location.hash.split('?')[1];
	            var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	            var str=null;
	            if(url){
	                 str=url.match(reg);
	            }
	            if(str!=null)return str[2];
	            return null;
	        };
	        $('.userRelevance').find('.u-msg-ok').on('click', function () {
	            var str='';
	            $('input[require="1"]').each(function(i,v){
	                if(!$(v).val()){
	                    str+=$(v).prev().html()+' ';
	                }
	            });
	            if(str){
	               str+=' 不能为空';
	                alert(str);
	                return;
	            }
	            var ary = $('.userRelevance').find('form').serializeArray();
	            var data = [];
	            for (var i = 0; i < ary.length; i++) {
	                var obj = {};
	                obj.id = ary[i].name;
	                obj.value = ary[i].value;
	                data.push(obj);
	            }
	            data.push({id: "pt_systemcode", value: sysCode});
	            data.push({id: "pt_usercode", value: $.cookie('u_usercode')});
	            $.ptAjax({
	                url: '/integration/usermapping/credential',
	                dataType: 'json',
	                data: JSON.stringify(data),
	                type: 'post',
	                contentType: 'application/json',
	                success: function (res) {
	                    if (res.status == "1") {
	                        window.message();
	                        var flag=getParams('flag');
	                        if(flag){
	                            window.history.go(-1);
	                        }else{
	                            if(window.parent){
	                                window.parent.location.reload(true);
	                            }
	                        }
	                    } else {
	                        window.message(res.message,'error');
	                    }
	                }
	            });
	        });
	        $('.userRelevance').find(".u-msg-cancel").on('click', function () {
	            window.history.go(-1);
	        });
	    };
	    return {
	        init: function(sysCode,content ){
	            init(sysCode,content);
	        }
	    }
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 35 */
/***/ function(module, exports) {

	module.exports = "<div  id=\"userRelevance\">\n    <div class=\"userRelevance \">\n        <div class=\"u-msg-title\">\n            <h4 class=\"modal-title\">用户映射</h4>\n        </div>\n        <div class=\"u-msg-content padding-20 margin-top-20\" style=\"background: #fff\">\n            <form>\n\n            </form>\n        </div>\n        <div class=\"u-msg-footer width-full clearfix padding-bottom-10\" style=\"background: #fff\">\n            <div class=\"u-col-2\"></div>\n            <div class=\"u-col-8\">\n                <button class=\"u-msg-cancel u-button pull-right btn-back\" style=\"height: 36px;border: 1px solid #cecece\">取消<span class=\"u-button-container\"><span\n                        class=\"u-ripple\"></span></span>\n                </button>\n                <button class=\"u-msg-ok u-button u-button-info pull-right margin-right-10\" style=\"height: 36px\">保存<span class=\"u-button-container\"><span class=\"u-ripple\"></span></span>\n                </button>\n            </div>\n            <div class=\"u-col-2\">\n\n            </div>\n        </div>\n    </div>\n</div>\n\n";

/***/ }
/******/ ]);
//# sourceMappingURL=index.js.map
