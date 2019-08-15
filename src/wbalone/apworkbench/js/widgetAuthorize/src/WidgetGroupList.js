define([
    'apworkbench/js/widgetAuthorize/WidgetGroup',
    'customEvent' ,
    'dialogmin'
], function () {
    var dialogmin = require('dialogmin');

    var WidgetGroup = require('apworkbench/js/widgetAuthorize/WidgetGroup');
    var customEvent = require('customEvent');
    var WidgetGroupList = React.createClass({
        getInitialState: function () {
            return {
                WidgetGroupList: [],
                checkedWidgets: [],
                unCheckedWidgets: []
            };
        },
        componentDidMount: function () {
            var self = this;
            var url = window.contextRoot + '/widgetQuery/list';
            $.get(url, function (result) {
                if (result.status == 1) {
                    self.setState({
                        WidgetGroupList: result.data
                    });
                } else {
                    result.msg ? alert(result.msg) : '';
                }
            }, 'json');

            var params = JSON.stringify({
                roleid: localStorage.getItem("roleid_in_widgetauth")
            });
            $.ajax({
                url: window.contextRoot + "/widgetQuery/assingedWidget",
                dataType: "json",
                data: params,
                type: "post",
                contentType: "application/json",
                success: function (res) {
                    self.setState({
                        checkedWidgets: res,
                        unCheckedWidgets: []
                    });
                },
                error: function (err) {
                    console.log(err);
                }
            });


            customEvent.on('widget.SelGroup', this.handleSelGroup);
            customEvent.on('widget.checkedWidget', this.handleCheckedWidget);
            customEvent.on('widget.saveWidgetAuth', this.handleSaveWidgetAuth);
        },
        render: function () {
            var _state = this.state;
            var widgetGroupList = _state.WidgetGroupList;
            var checkedWidgets = _state.checkedWidgets;
            widgetGroupList = widgetGroupList.map(function (v, i) {
                return <WidgetGroup key={i} WidgetGroup={v} checkedWidgets={checkedWidgets}/>
            });
            return (
                <div className='app-group-list'>
					{widgetGroupList}
                </div>
                )
        },
        handleSelGroup: function (e, val, key) {
            e.stopPropagation();
            e.preventDefault();
            var self = this;
            $.ajax({
                url: window.contextRoot + "/widgetQuery/queryByKeyword",
                dataType: "json",
                type: "post",
                data: JSON.stringify({
                    "keyword": key,
                    "category": val == "all" ? "" : val
                }),
                contentType: "application/json",
                success: function (result) {
                    self.setState({
                        WidgetGroupList: result.data
                    });
                },
                error: function (result) {
                    result.msg ? alert(result.msg) : '';
                }
            });
        },
        handleCheckedWidget: function (e, state, val) {
            var tmp = this.state.checkedWidgets;
            var globleCheckItems = this.state.unCheckedWidgets;

            if (state) {
                tmp.push(val);
            } else {
                tmp.splice($.inArray(val, tmp), 1);
                globleCheckItems.push(val);
            }
            this.setState({
                checkedWidgets: tmp,
                unCheckedWidgets: globleCheckItems
            });
        },
        handleSaveWidgetAuth: function ( ) {
            var roleid_in_widgetauth = localStorage.getItem("roleid_in_widgetauth");
            var checkedArray = this.state.checkedWidgets;
            var unchecked = this.state.unCheckedWidgets;
            var param = {
                checkedItems: checkedArray,
                roleId: roleid_in_widgetauth,
                uncheckedItems: unchecked
            };
            var url = window.contextRoot + "/widgetAuth/saveRoleWbWidget";
            $.ajax({
                url: url,
                dataType: "text",
                type: "post",
                data: JSON.stringify(param),
                contentType: "application/json",
                success: function (res) {
                    dialogmin("保存成功");
                    window.location.href="#manage/rolemgrwidget";
//                    window.history.back();
//                    initLayout(window.contextRoot  + '/data:layout/rolemgrwidget', []);

                },
                error: function (err) {
                    console.log(err);
                }
            });
        }
    });
    return WidgetGroupList
});
