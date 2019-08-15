/**
 * Created with JetBrains WebStorm.
 * User: anry
 * Date: 16-5-5
 * Time: 下午8:07
 * To change this template use File | Settings | File Templates.
 */
define([
    'apworkbench/js/widgetAuthorize/SearchForm',
    'apworkbench/js/widgetAuthorize/WidgetGroupList',
    'customEvent'
], function () {
    var customEvent = require('customEvent');
    var SearchForm = require('apworkbench/js/widgetAuthorize/SearchForm');
    var WidgetGroupList = require('apworkbench/js/widgetAuthorize/WidgetGroupList');
    /*
     * 定义小部件列表组件
     * */
    var WidgetList = React.createClass(
        {
            displayName: 'WidgetList',
            back: function (e) {
                e.preventDefault();
                e.stopPropagation();
//                window.history.back();

                //获取url中的参数
                function getUrlParam(name) {
                    var aQuery = window.location.href.split("?");//取得Get参数
                    var aGET = {};
                    if(aQuery.length > 1)
                    {
                        var aBuf = aQuery[1].split("&");
                        for(var i=0, iLoop = aBuf.length; i<iLoop; i++)
                        {
                            var aTmp = aBuf[i].split("=");//分离key与Value
                            aGET[aTmp[0]] = aTmp[1];
                        }
                    }
                    return  aGET[name];
                }
                window.location.href="#manage/rolemgrwidget?keyword="+getUrlParam('keyword')+"&roleId="+getUrlParam("roleId")+"&pn="+getUrlParam("pn");
//                window.initLayout(window.contextRoot + '/data:layout/rolemgrwidget', []);
            },
            render: function () {
                var   title =React.createElement("div", {className: "W-title"}, 
                                "小部件授权", 
                                React.createElement("span", {className: "iconfont icon-star "}), 
                                React.createElement("a", {onClick: this.back, className: "btn btn-default btn-sm backbutton"}, "返回")
                            )  ;
                return (
                    React.createElement("div", {className: "row"},
                        title,
                        React.createElement("div", {className: "app-after-rolemgr-wrap"},
                            React.createElement(SearchForm, null),
                            React.createElement(WidgetGroupList, null)
                        )
                    )
                    );
            }
        });
    return    WidgetList;
});