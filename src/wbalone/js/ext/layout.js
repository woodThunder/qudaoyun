
define([],function() {
    var Layout = require('../../js/ext/Layouts');
    var Toolbar = require('../../js/ext/Toolbar');
    var designer = require('html!../../pages/designer.html');


    var init = function (param) {
        var id = param.id;
        var viewid = param.viewid;
        var element = param.element;
        var router = param.router;
        var modifytime = param.modifytime;





        if($('#designer').length==0){
            $('#content').append(designer);
        }
        else {
            $('#designerContent').html('');
        }


        function initLayout(p, params) {
            var require = window.require;
            var module = p;
            requirejs.undef(module);
            if (params.length == 1)
                params = params[0]
            module = module+ "?bust=" +  (new Date()).getTime();
            require([module], function (module) {
                var options = {
                    "isSortable": true,
                    "isWidgetEdit": true,
                    "ModifiedLayout": true,
                    "isShowWidgetName": true,
                    "element":element
                };

                require(['jqueryui'],function(){
                    //初始化布局
                    var layout = new Layout('#designerContent', {
                        viewId: viewid,
                        layoutId: id
                    });
                    //初始化工具栏
                    var tools = new Toolbar('#toolbars', {
                        layout: layout,
                        layoutId: id,
                        modifytime:modifytime
                    });

                    $('#designerContent').css('height',$('body').height()-10);

                    $('#designer').on('hidden.bs.modal', function () {
                        setTimeout(function(){
                            if(typeof PubSub!='undefined'&& PubSub.publish('designer.closeAfter')){
                            }
                            else {
                                location.href = '#/'+decodeURIComponent(router);
                            }
                        },100)
                    }).on('shown.bs.modal',function(){
                        if(typeof PubSub!='undefined'){
                            PubSub.publish('designer.showBefore');
                        }
                        module.init(options);
                        $('#toolbars input').placeholder();
                    }).modal('show');
                })
            })
        }

        initLayout(contextRoot + "/data:layout/" + id, []);
        /*判断是否有无viewid*/
        //if (viewid != null) {
        //    initLayout(contextRoot + "/data:layout/" + id, []);
        //}
        //if(viewid == null) {
        //    tools.setLayout(true);
        //}

    };

    window.layout = init;
    return {
        init:init
    }
});