require([
    'appconfig',
	'cookieOperation',
	'knockout',
	'css!fonts/moren/iconfont.css',
    'css!fonts/caidantubiao/iconfont.css',
    'css!apworkbench/trd/uui/fonts/font-awesome/css/font-awesome.css',
], function (appconfig, cookieOperation, ko) {
    //var appconfig = require('appconfig');  //获取应用配置
    window.appconfig = appconfig;
    //var cookieOperation = require('cookieOperation');

    var $tip = $("#messageCount [data-badge]");
    $tip.data('tipcount',0);

    //handle msg tipCount
    var userId = cookieOperation.get('userId');
    var userkey = cookieOperation.get('tenantid') == "\"\"" ? "null" : cookieOperation.get('tenantid');

    /*消息提醒*/
	/*
    $("#messageCount").on('click', function () {
        var routeInit = function (p) {
            var module = p;
            requirejs.undef(module);
            var content = document.getElementById('content');
            window.require([module], function (module) {
                ko.cleanNode(content);
                content.innerHTML = "";
                module.init(content);
            })
        };
        routeInit(appconfig.msgCenter.entryJs);
    });*/
    //订阅webpush server消息
    Message.subscribe(
        appconfig.msgCenter.pushServer,
        appconfig.msgCenter.port,
        {
            "identity": "server1001",
            "appid": "",
            "userkey": userkey.concat("_", userId)
        }, showMsgCount);
    function showMsgCount(err, jsonMsg) {
        if (err) {
            u.showMessage({showSeconds: 1, width: "32%", msg: "<i class='uf uf-exclamationsign margin-r-5'></i>" + err, position: "center", msgType: "warning"});
        }
        var Tcount = 0;
        if (jsonMsg.message && JSON.parse(jsonMsg.message)[userkey.concat("_", userId)]) {
            Tcount = JSON.parse(jsonMsg.message)[userkey.concat("_", userId)];
            $tip.data('tipcount',Tcount);
            if(Tcount>99){
                Tcount = '99+';
            }
        }
        $tip.attr('data-badge', Tcount.toString());
        if ($("#messageCount:has(b)")) {
            $("#messageCount>b").text(Tcount.toString());
        }
    }


    window.tipCountMinus =function(){
        var Tcount =  $tip.data('tipcount');
        if(Tcount){
            Tcount--;
            $tip.data('tipcount',Tcount);
            if(Tcount>99){
                $tip.attr('data-badge', '99+');
            }else{
                $tip.attr('data-badge', Tcount.toString());
            }
        }
    };

    var msgServer = appconfig.msgCenter.msgServer;
    getUnReadMsgNum();
    function getUnReadMsgNum() {
        $.ajax({
            url: msgServer + "/message/getUnReadMsg",
            type: 'GET',
            dataType: 'json',
            async: false,
            contentType: 'application/json',
            success: function (result) {
                if (result.status == 1) {
                    var Tcount = result.unReadNum;
                    $tip.data('tipcount',Tcount);
                    if(Tcount>99){
                        Tcount="99+";
                    }
                    $tip.attr('data-badge', Tcount.toString());
                    //if ($("#messageCount:has(b)")) {
                    //    $("#messageCount>b").text(Tcount.toString());
                    //}
                } else {
//                      alert(result.msg);
                }
            }
        });
    }

});
