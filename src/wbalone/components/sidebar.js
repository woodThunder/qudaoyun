//集成hr云应用链接
var routeInit = function (p) {
    return function () {
        var module = p;
        requirejs.undef(module);
        var content = document.getElementById("content");
        window.require([module], function (module) {
            ko.cleanNode(content);
            content.innerHTML = "";
            module.init(content);
        })
    }
};
//注册路由
window.registerRouter = function (id, path) {
    router.on(id, routeInit(path));
};

//初始化侧边栏菜单
var $body = $(document.body);


var name = $.cookie('_A_P_userLoginName')||$.cookie('u_usercode');
var clickEventType=((document.ontouchstart!==null)?'click':'touchend')



var menuList = contextRoot + "/appmenumgr/sidebarList?r="+Math.random();

window.menu = function (data) {
    var str = [];
    var hash = location.hash;
    if(hash.match(/#\/widget|#\/layouts/)){
        if(hash.match(/#\/widget|#\/layouts/).length>0){
            $("#design").attr("sortalbe",'false').parent().hide();
            $("#design").parent().parent().find('.divider').hide();
        }
    }
    $.each(data, function (i, item) {
        if (item.children != null && (item.children) && (item.children.length)) { //child menu
            var s = '<div class="menubar-menu '+(item.children.length>=10?"menubar-cloum-"+parseInt(item.children.length/10):"")+'"><ul>'
            $.each(item.children, function (t, items) {
                s += '<li><a urltype="' + (items.urltype ) + '" ahref="' + items.location + '" href="' + (formmaterUrl(items)) + '">' + items.name + '</a></li>';
            });
            s += '</ul></div>';
            var b = '<span class="icon wb-chevron-right-mini"></span>';
            var t = '';
            str.push(
                '<li ' + (i == 0 ? 'class="active" isIndex="true"' : "") + '>' +
                    '<a urltype="' + item.urltype + '" href="javascript:void(0);" >' +
                    '<i class="icon iconfont  '+ item.icon+'"> </i>' + '<span class="icon-name">' + item.name + b + '</span>'+
                    '</a>' + t + s +
                    '</li>')
        } else {
            var s = '', b = '';
            str.push(
                '<li ' + (i == 0 ? 'class="active" isIndex="true"' : "") + '>' +
                    '<a urltype="' + item.urltype + '" ahref="#' + item.location + '" href="' + formmaterUrl(item) + '">' +
                    '<i class="icon iconfont '+ item.icon+'"></i>' + '<span class="icon-name">' + item.name + '</span>' + b +
                    '</a>'  + s +
                    '</li>');

        }
    });
    function formmaterUrl(item) {
        var uri = " ";
        if (item.urltype === 'url') {
            uri = '#/ifr/' + encodeURIComponent(encodeURIComponent(item.location));
            return  uri;
        } else if (item.urltype === 'plugin') {
            uri = item.id ? ('#/' + item.id) : "#/index_plugin";
            window.registerRouter(uri.replace("#", ""), item.location);
            return  uri;
        } else if (item.urltype === 'view') {
            uri = item.location;
            uri= uri.replace("#", "/");
            addRouter(uri);
            return  "#"+uri;
        }else if(item.urltype == undefined){
            item.location = '404';
            return  '#/ifr/' + encodeURIComponent(encodeURIComponent(item.location));
        }
        else {
            return item.location;
        }
    }
	function IsURL(str_url) {
		var strRegex = '^((https|http|ftp|rtsp|mms)?://)'
				+ '?(([0-9a-z_!~*\'().&=+$%-]+: )?[0-9a-z_!~*\'().&=+$%-]+@)?' // ftp的user@
				+ '(([0-9]{1,3}.){3}[0-9]{1,3}' // IP形式的URL- 199.194.52.184
				+ '|' // 允许IP和DOMAIN（域名）
				+ '([0-9a-z_!~*\'()-]+.)*' // 域名- www.
				+ '([0-9a-z][0-9a-z-]{0,61})?[0-9a-z].' // 二级域名
				+ '[a-z]{2,6})' // first level domain- .com or .museum
				+ '(:[0-9]{1,4})?' // 端口- :80
				+ '((/?)|' // a slash isn't required if there is no file name
				+ '(/[0-9a-z_!~*\'().;?:@&=+$,%#-]+)+/?)$';
		var re = new RegExp(strRegex);
		if (re.test(str_url)) {
			return true;
		} else {
			return false;
		}
	}

    var menubar = $('.menubar');
    menubar.html(str.join('')).on(clickEventType, 'li',function (e) {   //菜单点击
        $('.menubar li').removeAttr('class');
        $(this).addClass('active');

    })

    if(navigator.userAgent.indexOf("iPad")==-1){
        menubar.on('mouseenter', '>li',function (e) {
            var menu = $(this).find('.menubar-menu');
            var tips = $(this).find('.tips');
            var top = $('.site-menubar').position().top;
            var menuTop = $(this).position().top;
            menu.show();
            tips.show();
            $(this).addClass('menubar-hover');
        }).on('mouseleave', 'li',function (e) {
            var menu = $(this).find('.menubar-menu');
            var tips = $(this).find('.tips');
            menu.hide();
            tips.hide();
            $(this).removeClass('menubar-hover');
        }).on('mouseleave',function (e) {
            var tips = $(this).find('.tips');
            tips.hide();
        }).on('click', '.menubar-menu ul>li', function (e) { //子菜单点击处理
            $(this).siblings("li").removeClass("active").end().addClass('active').parents("li:first").addClass("active");
            $(this).closest('.menubar-menu').hide();
        });
    }
    else {

        menubar.on('click', '.menubar-menu ul>li', function (e) { //子菜单点击处理
            $(this).siblings("li").removeClass("active").end().addClass('active').parents("li:first").addClass("active");
            $(this).closest('.menubar-menu').hide();
        }).on('mousedown', 'li',function (e) {
            var menu = $(this).find('.menubar-menu');

            var top = $('.site-menubar').position().top;
            var menuTop = $(this).position().top;
            menu.show();

        })
    }


    //设定hash的选中状态
    var hash = encodeURI(location.hash);
    var element  = $('.menubar a[href~="'+hash+'"]');
    if(element.length>0){
        var parent = element.closest('.menubar-menu');
        $('.menubar li:first-child').removeClass('active');
        if(parent.length>0){
            parent.closest('.menubar-menu').parent().addClass("active");
        }
        element.parent().addClass("active");
    }
};


var initMenuList = function () {
    $.ptAjax({
        url: menuList,
        type: 'GET',
        dataType: 'json',
        contentType: 'application/json',
        success: function (result) {
            if (result.status) {
                //var a = [];
                //for(var i=0;i<=34;i++){
                //    a.push(
                //        {
                //            children:[],
                //            icon:"icon-home",
                //            id:"widget",
                //            location:"#/widget",
                //            menustatus:"N",
                //            name:"小部件管理",
                //            target:"portal",
                //            urltype:"default"
                //
                //        }
                //    )
                //}
                //
                //result.data[1].children = a;
                window.menu(result.data);
                var homePage = $(".menubar>li[isindex=true]>a").attr("href");
                if(window.extendRouteRegister){
                    window.extendRouteRegister(router);
                }
                if($.trim(window.location.hash)==''){
                    router.init(homePage.replace("#",""));

                }else{
                    router.init("/"+window.location.hash);
                }

            } else {
                console.log(result.msg ? result.msg : "error happend!~!");
            }
        },
        error: function (XMLHttpRequest) {
            errorLogin(XMLHttpRequest);
            alert("网络请求失败");
        }
    });
}


initMenuList();
