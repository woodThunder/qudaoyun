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
                window.location.href="#manage/rolemgrwidget";
//                window.initLayout(window.contextRoot + '/data:layout/rolemgrwidget', []);
            },
            render: function () {
                var   title =<div className='W-title'>
                                小部件授权
                                <span className="iconfont icon-star "></span>
                                <a onClick={this.back} className="btn btn-default btn-sm backbutton">返回</a>
                            </div>  ;
                return (
                    <div className="row">
                        {title}
                        <SearchForm/>
                        <WidgetGroupList/>
                    </div>
                    );
            }
        });
    return    WidgetList;
});