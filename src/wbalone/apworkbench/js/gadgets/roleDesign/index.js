require([
    'bdtpl',
    'dialog',
    'dialogmin',
    'customEvent' ,
    'text!' + window.contextRoot + '/apworkbench/js/gadgets/roleDesign/layout.html',
    'text!' + window.contextRoot + '/apworkbench/js/gadgets/roleDesign/roletable.html'
], function () {

    var baidu = require('bdtpl');
    var customEvent = require('customEvent');
    var dialog = require('dialog');
    var dialogmin = require('dialogmin');


    var layout = baidu.template(require('text!' + window.contextRoot + '/apworkbench/js/gadgets/roleDesign/layout.html'));
    var roletable = baidu.template(require('text!' + window.contextRoot + '/apworkbench/js/gadgets/roleDesign/roletable.html'));

    var getRoleListUrl = window.contextRoot + "/roleMGT/listWithPaging";

    var $wrap = $("#roleDeskDesign");
    var rolePN = 1;
    $wrap.empty().append(layout({}));

    var $rolebox = $wrap.find(".role");

    initpage();
    function initpage() {
        //
        updateRoleList();

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
                } else {
                    result.msg ? alert(result.msg) : '';
                }
            },
            error: function (e) {
                alert(e.message || "网络请求失败");
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
        $wrap.on("click", "#role_tbody button.design", function (e) { //加载对应角色的数据
            e.stopPropagation();
            e.preventDefault();
           // var role = $(this).parents("td").data("attrrole");
			
			var roleId = $(this).parents("td").data("attrroleid");
			var roleCode = $(this).parents("td").data("attrrolecode");
            var data = {
                roleId: roleId,
                roleCode: roleCode
            };
            if (navigator.userAgent.indexOf("iPad") != -1) {
                dialogmin("暂不支持iPad设计布局~", "tip-alert");
                return ;
            } else {
                $.ajax({
                    url: window.contextRoot + "/roleDesign/getExistLayout",
                    dataType: "json",
                    data: JSON.stringify(data),
                    type: "post",
                    contentType: "application/json",
                    success: function (res) {
                        if (res.status == "1") {
                            var data = res.data;
//                        window.location.href = "#/layout/" + res.data;
                            $("#content").html('');
                            window.designId = roleId;
                            window.location.href = "#/layout/" + data.viewId + "/" + encodeURIComponent(data.modify) + "/back/manage%2Frolemgrdesign";
                        } else {
                            alert(res.msg);
                        }
                    }
                });
            }
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