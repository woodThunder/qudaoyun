define([
    'customEvent'
], function () {
    var customEvent = require('customEvent');

    var Widget = React.createClass({displayName: "Widget",
        getInitialState: function () {
            return {
                isCheck: ''
            }
        },
        openApp: function () {
            console.log("has clicked");
        },
        handlerAllState:function(e){
            var pkWidget  =   this.props.widget.pkWidget ;
            var state  = e.target.checked;
              this.setState({
                  isCheck: state
              });
            customEvent.trigger('widget.checkedWidget',[
                state,
                pkWidget
            ]);
        },
        render: function () {
            var Widget = this.props.widget;
            var name = Widget.name;
            var id = Widget.id;
            var desc = Widget.descr;
            var pkWidget = Widget.pkWidget;
            var isCheck =  this.props.isCheck;
            return (
                    React.createElement("div", {className: "col-sm-4 col-lg-2"}, 
                        React.createElement("div", {className: "widget-wrap"}, 
                            React.createElement("label", {htmlFor: id}, 
                                React.createElement("div", {className: "title"}, name), 
                                React.createElement("div", {className: "img-and-dynamic"}, 
                                    React.createElement("i", {className: "iconfont icon-component"})
                                )
                            ), 
                            React.createElement("div", {className: "checkbox-wrap"}, 
                                React.createElement("input", {id: id, type: "checkbox", checked: isCheck, onChange: this.handlerAllState})
                            )
                        )
                    )
                )
                }
                });
                return Widget
                });
