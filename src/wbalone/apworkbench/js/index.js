require([
    'userInfo',
    'contextRoot',
    'cookieOperation',
    'dealTopic',
    'css!fonts/moren/iconfont.css',
    'css!fonts/caidantubiao/iconfont.css',
    'css!apworkbench/trd/uui/fonts/font-awesome/css/font-awesome.css',
    'customEvent'
], function () {
    var userInfo = require('userInfo');
    var contextRoot = require('contextRoot').get();
    var cookieOperation = require('cookieOperation');
    var logoImgUrl = cookieOperation.get('logoImgUrl');
    var isadmin = cookieOperation.get('_A_P_isadmin');
    var userAvator = cookieOperation.get('_A_P_userAvator');
    if (!logoImgUrl) {
        logoImgUrl = "./logo.png";
    }


    //获取用户个人头像
    if (userAvator.length < 3) {
        $('#username span img').attr('src', './user.png');
    } else {
        $('#username span img').attr('src', decodeURIComponent(decodeURIComponent(userAvator)));
    }
    $('#syslogo').attr('src', decodeURIComponent(logoImgUrl));
    $("#username .avatar-name").html(userInfo.name);
    $("#toolbar").hide();
    //如果是管理员则显示管理员菜单
    //隐藏管理菜单
    var hideManageMenu = function () {
        $('.dropdown-menu[role="menu"]>li:first').remove();
    };
    /*
     *   添加修改密码路由
     */
    if (!window.router.routes['editpassword']) {
        window.registerRouter('editpassword', window.contextRoot + '/pages/pwPolicy/editPassword/index.js');
    }
    /*
     *   添加管理中心路由
     */
    if (!window.router.routes['sysmgr']) {
        window.registerRouter('sysmgr', window.contextRoot + '/pages/app/ctrlCenter/index.js');
    }
    /*
     *   添加个人设置路由
     */
    if (!window.router.routes['personsetting']) {
        window.registerRouter('personsetting', window.contextRoot + '/pages/pwPolicy/personsetting/index.js');
    }
    window.router.on('/personsetting', function () {
        window.location.href = '#personsetting';
    });
    window.router.on('/sysmgr', function () {
        window.location.href = '#sysmgr';
    });
    window.router.on('/editpassword', function () {
        window.location.href = '#editpassword';
    });

    /*
     *   添加管理中心路由
     */

    window.router.on('/manage/:id', function (id) {
        setTimeout(function () {
            $('.page').removeClass('fade-out');
        }, 1000);
        if (id == "widget") {
            widgets.init({
                backUrl: '#sysmgr'
            });
        }
        else {
            window.initLayout(window.contextRoot + "/data:layout/" + id, []);
        }
    });
    /*
     *   添加应用中心路由
     */
    window.router.on('/apps/:id', function (id) {
        setTimeout(function () {
            $('.page').removeClass('fade-out');
        }, 1000);
        window.initLayout(window.contextRoot + "/data:layout/" + id, []);
    });
    /*
     *   添加管理员管理入口路由
     */

//    window.router.on('/sysmgr', function (id) {
//        setTimeout(function () {
//            $('.page').removeClass('fade-out');
//        }, 1000);
//        window.initLayout(window.contextRoot + "/data:layout/sysmgr", []);
//    });
    window.router.on('after', '/sysmgr', function () {
        $('#design').parent().hide();
    });

    /*
     *   处理首页个性化 按钮
     */
    setTimeout(function () {
        if (window.router.routes.sysmgr) {
            window.router.routes.sysmgr.before = null;
        }
        if (window.router.routes.roleapplication) {
            window.router.routes.roleapplication.before = null;
        }

    }, 100);


    /*
     * 处理siderbar和管理中心交互
     * */
    $('#username').parent().on('show.bs.dropdown', function () {
        $(this).on("click", "ul.dropdown-menu>li", function () {
            $("ul.menubar>li.active").removeClass("active");
        });
    });

    if (isadmin && isadmin != "1") {
        hideManageMenu();
    } else {
        window.router.dispatch('on', '/' + location.hash.replace('#', ''));
    }

    if (navigator.userAgent.indexOf("iPad") != -1 || getBrowserVersion() == 'IE8') {
        $('.navbar-right [href="#sysmgr"]').parent().hide();
        $('.divider').hide();
    }
    var dealTopic = require('dealTopic');
    dealTopic.init();
});
