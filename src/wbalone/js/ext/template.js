define([],function(){
    var template = require('art');
    var temp = require('html!../../pages/template.html');


    var init = function(){
        $.ptAjax({
            url: contextRoot+"/layout/tpl/list",
            dataType: 'json',
            type:'get',
            contentType:'application/json',
            success: function(res) {
                var str = [];

                var render = template.compile(temp);
                var html  = render({list:res});
                $('#content').html(html);

                $('#upload-form').submit(function(e){

                })

            },
            error: function (XMLHttpRequest) {
                errorLogin(XMLHttpRequest);
            }
        });
    };




    return {
        init:init
    }
})