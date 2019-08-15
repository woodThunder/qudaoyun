define([
    'customEvent'
], function () {
    var customEvent = require('customEvent');

    var Widget = React.createClass({
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
                    <div className="col-sm-4 col-lg-2" >
                        <div className= "widget-wrap">
                            <label  htmlFor={id}>
                                <div className="title">{name}</div>
                                <div className="img-and-dynamic">
                                    <i className="iconfont icon-home"></i>
                                </div>
                            </label>
                            <div className="checkbox-wrap">
                                <input  id ={id} type="checkbox" checked={isCheck} onChange={this.handlerAllState} />
                            </div>
                        </div>
                    </div>
                )
                }
                });
                return Widget
                });
