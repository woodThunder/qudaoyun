/**
 * Created with JetBrains WebStorm.
 * User: anry
 * Date: 16-5-5
 * Time: 下午8:02
 * To change this template use File | Settings | File Templates.
 */
require([
    'userInfo',
    'cookieOperation' ,
    'apworkbench/js/widgetAuthorize/WidgetList',
    'customEvent',
    'css!apworkbench/css/widgetAuthorize.css'
], function () {
    //
    /*
    * 渲染小部件列表的react 组件
    * */
    var WidgetList =  require('apworkbench/js/widgetAuthorize/WidgetList');
    ReactDOM.render(
        <WidgetList/>,
        document.getElementById("widgetAuthorize")
    );
});