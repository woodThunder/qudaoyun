var WidgetEditTool = React.createClass({
	name:"WidgetEditTool",
	displayName : "WidgetEditTool",
	getInitialState:function(){
		return {}
	},
	render: function(){
		return (
			React.createElement("ul", {className: "list-unstyled edit"}, 
				React.createElement("li", null, React.createElement("i", {className: "portalfont btn btn-round btn-default btn-outline btn-pill-right icon-max", "data-type": "window", title: "最大最小化"})), 
				React.createElement("li", null, React.createElement("i", {className: "portalfont btn btn-default btn-outline icon-unfold", "data-type": "collage", title: "折叠"})), 
				React.createElement("li", null, React.createElement("i", {className: "portalfont btn btn-round btn-default btn-outline btn-pill-left icon-pencil", "data-type": "edit", "data-toggle": "modal", "data-target": "#modalBlue", title: "编辑"})), 
				React.createElement("li", null, React.createElement("i", {className: "portalfont btn btn-default btn-outline icon-cancel02", "data-type": "del", title: "删除"}))
			)
		)
	}
})

var Widget = React.createClass({
	name : "Widget",
	displayName : "Widget",
	getWidgetMeta : function() {
		var url = this.props.gadgetURL;
		var layoutContext = this.props.layoutContext;
		var layoutMeta = layoutContext.layoutMeta;
		var widgetMeta = layoutMeta[url];
		return widgetMeta;
	},
	getInitialState : function() {
		var widgetMeta = this.getWidgetMeta();
		var view = this.props.view ;
		if(!view)
			view =   "default";
		var url = this.props.gadgetURL;
		var html  = 'loading...';
		if(widgetMeta.error){
			html = widgetMeta.error.message;
		}else{
			html = widgetMeta.contents[view];
		}

		return {
			html : html
		};
	},
	componentWillMount : function() {

	},
	componentDidMount : function() {
		if(!this.state.html){
			//url process
			var widgetMeta = this.getWidgetMeta();
			var view = 'default' ;
			$.each( widgetMeta.views, function(v, n){
				view = v;//default url has one
				return false;
			});
			if(view != 'default'){
				var gadgetURL = widgetMeta.iframeUrls[view];
				var _container = this.props.layoutContext.container;
				_container.renderGadget(gadgetURL,  this.props.id,'url')
			}else{
				//other
				var _container = this.props.layoutContext.container;
				_container.renderGadget(this.props.gadgetURL,this.props.id)
			}
		}
		if (this.isMounted() && this.state.html) {
			var doms = $.parseHTML(this.state.html,true);
			if(doms)
				this.domManip(doms);
		}
		this.setPubSub();
	},
	componentWillUnmount : function() {

	},
	setPubSub:function(){
		if (this.state.html) {
			//自定义事件
			var MY_TOPIC = 'widget.'+this.props.id;
			var dom = ReactDOM.findDOMNode(this);
			//PubSub.publish(MY_TOPIC, dom);
			var _this = this;
			//require(['pubsub'],function(){
			//	var url = _this.props.gadgetURL;
			//	var dataUrl = _this.props.layoutContext.layoutMeta[url].modulePrefs.thumbnail
			//	PubSub.publish(MY_TOPIC, dataUrl);
			//})
		}
	},
	setWidgetEditTool:function(){
		return this.props.layoutContext.options.isWidgetEdit?React.createElement(WidgetEditTool, null):'';
	},
	getParamUrl:function(name,url) {
	    url=url.split('?')[1];
	    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	    var str=url.match(reg);
	    if(str!=null)return str[2];
	    return null;
	},
	render : function() {
		var isUrl = false;
		var widgetMeta = this.getWidgetMeta();
		if(!this.state.html){
			//url process
			var widgetMeta = this.getWidgetMeta();
			var view = 'default' ;
			$.each( widgetMeta.views, function(v, n){
				view = v;//default url has one
				return false;
			});
			if(view != 'default'){
				isUrl = true;
			}
		}
		return (
			React.createElement("div", null, 
				React.createElement("div", {id: 'gadget-site-'+this.props.id, "data-id": this.props.id, "data-ul": this.props.gadgetURL, className: this.props.layoutContext.options.isSortable?'well sort':'unsortable'}, 
					 this.props.layoutContext.options.isShowWidgetName?React.createElement("h5", null, widgetMeta.modulePrefs?widgetMeta.modulePrefs.title:'modulePrefs is undefined'):'', 
					React.createElement("div", {id: 'gadget-site-content-'+this.props.id, className: isUrl?'innerHtml-ipad collapse in':'innerHtml collapse in', dangerouslySetInnerHTML: {__html:this.state.html}}
					), 
					this.setWidgetEditTool()
				)
			)
		);
	},
	domManip : function (fragment){
			var node, hasScripts,
			scripts,i = 0;
			
			scripts = this.getAll( fragment, "script" );
			hasScripts = scripts.length;
			if ( hasScripts ) {
	
				// Evaluate executable scripts on first document insertion
				var rscriptType = /^$|\/(?:java|ecma)script/i;
				var rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) && !jQuery._data( node, "globalEval" )) {
						if ( node.src ) {
							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								var nodeSrc =  node.src ;
								//adjust script src
								if(window.baseUrl && nodeSrc.indexOf(window.baseUrl) == -1){
									var proUrl = nodeSrc.split("//");
									var index = proUrl[1].indexOf("/");
									nodeSrc = proUrl[0] + "//" +proUrl[1].substring(0, index) + window.baseUrl + proUrl[1].substring(index, proUrl[1].length);
								}
								jQuery._evalUrl( nodeSrc );
							}
						} else {
							jQuery.globalEval( ( node.text || node.textContent || node.innerHTML || "" ).replace( rcleanScript, "" ) );
						}
					}
				}
			}
	},
	getAll : function ( context, tag ) {
		var strundefined = typeof undefined;
		var elems, elem,
			i = 0,
			found =typeof context.getElementsByTagName !== strundefined ? context.getElementsByTagName( tag || "*" ) :
				typeof context.querySelectorAll !== strundefined ? context.querySelectorAll( tag || "*" ) :
				undefined;
	
		if ( !found ) {
			for ( found = [], elems = context.childNodes || context; (elem = elems[i]) != null; i++ ) {
				if ( !tag || jQuery.nodeName( elem, tag ) ) {
					found.push( elem );
				} else {
					jQuery.merge( found, this.getAll( elem, tag ) );
				}
			}
		}
	
		return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
			jQuery.merge( [ context ], found ) :
			found;
	}
});

var WidgetBox = React.createClass({
    displayName: "WidgetBox",
	getInitialState:function(){
		return {
			gridData:[]
		}
	},
	componentDidMount:function(){
		var widgetBox = ReactDOM.findDOMNode(this);
		this.setWidgetDrag(widgetBox);
	},
	setWidgetDrag: function (elems) {
		if (this.props.layoutContext.options.isSortable) {
			$(elems).sortable({
				"connectWith": ".widgetBox",
				"forcePlaceholderSize": true,
				"placeholder": "ui-portlet-placeholder",
				stop: function (i) {
					//console.log(i);
				},
				over: function () {

				}
			})
		}
	},
    render: function () {
        var widgetBoxId = this.props.id;
        return (
            React.createElement("div", {id: this.props.id, key: this.props.id, className: "widgetBox connectedSortable"}, 
                
                    React.Children.map(
                        this.props.children,
                        function (result) {
                            if (result.type.displayName && result.type.displayName === "Widget") {
                                return (
                                    React.createElement(Widget, {id: result.props.id, key: result.props.id, 
                                            className: result.props.className+' ui-sortable-handle', 
                                            layoutContext: result.props.layoutContext, 
                                            gadgetURL: result.props.gadgetURL, 
                                            widgetBoxId: widgetBoxId})
                                )
                            }
                        }
                    )
                
            )
        );
    }
});
