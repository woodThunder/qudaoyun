/**
 * 统一设置ajax的参数信息，发送信息前加载 loading 图标，请求完成后去掉 loading进度条图片
 */
$(function () {
    $.ajaxSetup({
        beforeSend: function (xhr) {
            var centerContent = "<i class=\"uf uf-fluffycloudsilhouette u-loader-centerContent\"></i>";
            var opt1 = {
                hasback: true,
                hasDesc: true,//是否含有加载内容描述
                centerContent: centerContent
            };
            u.showLoader(opt1);
        },
        complete: function (xhr, status) {
            setTimeout("u.hideLoader({hasback:true});", 200);

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            // 对错误进行统一处理
            if (XMLHttpRequest.statusText === "abort") {
                // 过滤 statusText 为 abort 的错误返回
                return;
            }
            var info = "";
            if (XMLHttpRequest.readyState === 0) {
                info = "请求超时。" + XMLHttpRequest.responseText;
            } else {
                info = "请求异常，请检查。" + XMLHttpRequest.responseText;
            }
            u.messageDialog({msg: info, title: "请求错误", btnText: "确定"});
        }
    });
});

var getAppCode = function () {
    var hash = window.location.hash;
    var id = hash.slice(2);
    return id;
};

var initButton = function (viewModel, element, appCode, async) {
    if (!viewModel.buttonShowGroup) {
        viewModel.buttonShowGroup = {};
    }
    var id = appCode || getAppCode();
    var async = async || false;
    $.ajax({
        type: "get",
        async: async,
        url: "/wbalone/security/auth?funcCode=" + id,
        success: function (data) {
            var funList = data;
            if (null != funList) {
                for (var i = 0; i < funList.length; i++) {
                    var funTemp = funList[i];
                    viewModel.buttonShowGroup[funTemp] = ko.observable(true);
                }
                ko.cleanNode(element);
                ko.applyBindings(viewModel, element);
            }
        }
    });
};
