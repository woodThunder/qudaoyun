require([
    'bdtpl',
    'dialog',
    'dialogmin',
    'customEvent' ,
    'text!' + window.contextRoot + '/apworkbench/js/widgetAuth/tmpl/layout.html',
    'text!' + window.contextRoot + '/apworkbench/js/widgetAuth/tmpl/roletable.html',
    'text!' + window.contextRoot + '/apworkbench/js/widgetAuth/tmpl/widgettable.html'
], function () {

    var baidu = require('bdtpl');
    var customEvent = require('customEvent');
    var dialog = require('dialog');
    var dialogmin = require('dialogmin');

    var height = document.body.offsetHeight-50;

    document.getElementById('iframe_tenant_home').style.minHeight = height;
    document.getElementById('iframe_tenant_home').minHeight = height;

    document.getElementById('iframe_tenant_home').style.Height = height;
    document.getElementById('iframe_tenant_home').Height = height;


    var h = document.getElementsByTagName('iframe').style.minHeight = document.body.offsetHeight-50;
    var layout = baidu.template(require('text!' + window.contextRoot + '/apworkbench/js/widgetAuth/tmpl/layout.html'));
    var roletable = baidu.template(require('text!' + window.contextRoot + '/apworkbench/js/widgetAuth/tmpl/roletable.html'));
    var widgettable = baidu.template(require('text!' + window.contextRoot + '/apworkbench/js/widgetAuth/tmpl/widgettable.html'));

    var getRoleListUrl = window.contextRoot + "/roleMGT/listWithPaging";
    var widgetListByRoleId = window.contextRoot + "/widgetQuery/widgetListByRoleId";

    var $wrap = $("#widgetAuth");
    var rolePN = 1;
    $wrap.empty().append(layout({}));

    var $rolebox = $wrap.find(".role");
    var $wbox = $wrap.find("#widgetlist");

    initpage();
    function initpage() {
        //
        if (getUrlParam("pn")) {
            updateRoleList(getUrlParam("pn"));
            rolePN=parseInt(getUrlParam("pn"));
        }else{
            updateRoleList();
        }
        addEvent();
    }

    //更新角色列表
    function updateRoleList(pn) {
        $.ajax({
            url: getRoleListUrl,
            type: 'POST',
            dataType: 'json',
            data: JSON.stringify({"pn": pn || "1"}),
            contentType: 'application/json',
            success: function (result) {
                if (result.status == 1) {

                    $rolebox.empty().append(roletable({data: result.data, pn: pn || "1"}));
                    if (getUrlParam("roleId")) {
                        $wrap.find('tr[data-roleid=' + getUrlParam("roleId") + ']').trigger("click");
                    } else {
                        $wrap.find('tr[data-roleid]:first').trigger("click");
                    }
                } else {
                    result.msg ? alert(result.msg) : '';
                }
            },
            error: function (e) {
                alert(e.message || "网络请求失败");
            }
        });
    }

    //更新小部件列表
    function updateWidgetList(wid) {
        $.ajax({
            url: widgetListByRoleId,
            data: JSON.stringify({"ROLEID": wid}),
            dataType: "json",
            cache: false,
            type: "post",
            contentType: "application/json",
            success: function (rtn) {
                $wbox.empty().append(widgettable({data: rtn}))
            },
            error: function (res) {
                console.log(res ? "Error:" + res : "");
                dialog({
                    title: "提示",
                    content: "widget列表显示失败！",
                    cancel: false,
                    ok: function () {
                    }
                }).show();
            }
        });
    }

    //获取url中的参数
    function getUrlParam(name) {
        var aQuery = window.location.href.split("?");//取得Get参数
        var aGET = {};
        if (aQuery.length > 1) {
            var aBuf = aQuery[1].split("&");
            for (var i = 0, iLoop = aBuf.length; i < iLoop; i++) {
                var aTmp = aBuf[i].split("=");//分离key与Value
                aGET[aTmp[0]] = aTmp[1];
            }
        }
        return  aGET[name];
    }

    //添加监听事件
    function addEvent() {

        //事件监听
        $wrap.on("click", "#role_tbody tr", function (e) { //加载对应角色的数据
            e.stopPropagation();
            e.preventDefault();
//        $(this).siblings().removeClass("active").end().addClass("active");
            var s_id = $(this).siblings().removeClass("active").end().addClass("active").data("roleid");
            updateWidgetList(s_id);
        })
            .on("click", "#role_tbody button.auth", function (e) { //加载对应角色的数据
                e.stopPropagation();
                e.preventDefault();
                var rolid = $(this).parent().parent().data("roleid");
                localStorage.setItem("roleid_in_widgetauth", rolid);

                window.location.href = "#manage/auth_after_rolemgrwidget?roleId=" + rolid+"&pn="+rolePN.toString();
//            initLayout(contextRoot + '/data:layout/auth_after_rolemgrwidget', []);
            });
        $wrap.on("click", ".role .lastP,.role .nextP", function (e) {
            e.stopPropagation();
            e.preventDefault();
            if ($(this).hasClass('lastP')) {
                //pn--
                rolePN--;
            }
            if ($(this).hasClass('nextP')) {
                //pn++
                rolePN++;
            }
            updateRoleList(rolePN.toString());
        });

    }
});