/**
 * Created with JetBrains WebStorm.
 * User: anry
 * Date: 16-5-5
 * Time: 下午8:58
 * To change this template use File | Settings | File Templates.
 */

define([
    'customEvent'
], function () {
        /*
         * 定义小部件列表组件
         * */

        var customEvent = require('customEvent');
        var SearchForm = React.createClass(
            {
                displayName: 'SearchForm',
                // 在组件的生命周期中仅执行一次，用于设置初始状态
                getInitialState: function () {
                    return {
                        opts: [],
                        selected: "",
                        keyword: ""
                    };
                },
                // 当组件render完成后自动被调用
                componentDidMount: function () {
                    var self = this;
                    $.ajax({
                        url: window.contextRoot + "/widget/catels",
                        dataType: 'json',
                        type: 'get',
                        contentType: 'application/json',
                        success: function (res) {
                            res.data.unshift({
                                pkCategory: "all",
                                name: "全部",
                                id: "all"
                            });
                            self.setState({
                                opts: res.data,
                                selected: "all",
                                keyword: ''
                            });
                        }
                    });
                },
                handleSelWidget: function (event) {
                    if (event.target.value == this.state.selected) {
                        return false;
                    }
                    this.setState({selected: event.target.value});
                    var selGroup = this.refs.selGroup.value.trim();
                    var keywordSearch = this.refs.keywordSearch.value.trim();
                    customEvent.trigger('widget.SelGroup', [selGroup, keywordSearch]);
                },
                save: function (e) {
                    e.stopPropagation();
                    e.preventDefault();
                    customEvent.trigger('widget.saveWidgetAuth',[]);
                },
                handleSearchWidget: function (e) {
                    e.stopPropagation();
                    e.preventDefault();
                    var selGroup = this.refs.selGroup.value.trim();
                    var keywordSearch = this.refs.keywordSearch.value.trim();
                    customEvent.trigger('widget.SelGroup', [selGroup, keywordSearch]);
                },
                handleWordInput: function (event) {
                    this.setState({
                        keyword: event.target.value
                    });
              /*      if (event.keyCode == 13) {
                     var selGroup = this.refs.selGroup.value.trim();
                     var keywordSearch = this.refs.keywordSearch.value.trim();
                     customEvent.trigger('widget.SelGroup', [selGroup, keywordSearch]);
                     }*/
                },
                back: function () {
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
//                    window.history.back();
//                    initLayout(window.contextRoot + '/data:layout/rolemgrwidget', []);
                },

                render: function () {
                    var optData = this.state.opts;
                    var options = optData.map(function (v, i) {
                        return React.createElement("option", {value: v.id, key: i}, v.name)
                    });
                    return (
                        React.createElement("div", {className: "", style: {position: "relative", marginBottom: 35}}, 
                            React.createElement("div", {className: "form-inline  nc-thead"},
                                React.createElement("div", {className: "form-group "}, 
                                    React.createElement("label", {className: "sr-only"}, "select group"), 
                                    React.createElement("select", {className: "form-control input-sm nc-sel",style: {minWidth: 150 }, ref: "selGroup", value: this.state.selected, onChange: this.handleSelWidget},
                                        options
                                    )
                                ), 
                                React.createElement("div", {className: "form-group ", style: {position: "relative", marginLeft: 25}}, 
                                    React.createElement("input", {type: "search", ref: "keywordSearch", className: "nc-search", placeholder: "搜索", value: this.state.keyword, onChange: this.handleWordInput}),
                                    React.createElement("button", {className: "nc-searchbtn", id: "searchUser", onClick: this.handleSearchWidget},
                                        React.createElement("i", {className: "iconfont icon-search"}, " ")
                                    )
                                ), 
                                React.createElement("div", {className: " pull-right", style: {position: "relative", marginRight: 25}}, 
                                    React.createElement("a", {role: "button", className: "W-button", onClick: this.save}, " 保存"), 
                                    React.createElement("a", {role: "button", className: "W-button backbutton", onClick: this.back}, " 取消")
                                )
                            )
                        )
                        );
                }
            });


        return    SearchForm;
    }
);