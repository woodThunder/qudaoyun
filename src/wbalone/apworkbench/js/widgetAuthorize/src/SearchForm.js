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
                            res.unshift({
                                pkCategory: "all",
                                name: "全部",
                                id: "all"
                            });
                            self.setState({
                                opts: res,
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
                handleWordInput: function (e) {
                    e.stopPropagation();
                    e.preventDefault();
                    this.setState({
                        keyword: e.target.value
                    });
                    /*
                     if (e.target.keyCode == 13) {
                     var selGroup = this.refs.selGroup.value.trim();
                     var keywordSearch = this.refs.keywordSearch.value.trim();
                     customEvent.trigger('widget.SelGroup', [selGroup, keywordSearch]);
                     }*/
                },
                back: function () {
                    window.location.href="#manage/rolemgrwidget";
//                    window.history.back();
//                    initLayout(window.contextRoot + '/data:layout/rolemgrwidget', []);
                },
                formsubmit: function (e) {
                    e.stopPropagation();
                    e.preventDefault();
                },
                render: function () {
                    var optData = this.state.opts;
                    var options = optData.map(function (v, i) {
                        return <option value={v.id} key={i}>{v.name}</option>
                    });
                    return (
                        <div className="" style={{position: "relative", marginBottom: 35}}>
                            <form className="form-inline" onSubmit={this.formsubmit}>
                                <div className="form-group ">
                                    <label className="sr-only">select group</label>
                                    <select  className="form-control input-sm" ref="selGroup"  value={this.state.selected} onChange={this.handleSelWidget}>
                                        {options}
                                    </select>
                                </div>
                                <div className="form-group " style={{position: "relative", marginLeft: 25}}>
                                    <label className="sr-only">search widget</label>
                                    <input type="search" ref="keywordSearch" className="W-search" placeholder="搜索" value={this.state.keyword}  onChange={this.handleWordInput}/>
                                    <div className="W-searchbtn" id="searchUser" onClick={this.handleSearchWidget}>
                                        <i className="iconfont icon-search"> </i>
                                    </div>
                                </div>
                                <div className=" pull-right" style={{position: "relative", marginRight: 25}}>
                                    <a role="button" className="W-button" onClick={this.save}> 保存</a>
                                    <a role="button" className="W-button backbutton" onClick={this.back}> 取消</a>
                                </div>
                            </form>
                        </div>
                        );
                }
            });


        return    SearchForm;
    }
);