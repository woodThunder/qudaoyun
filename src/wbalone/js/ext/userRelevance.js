/**
 * Created by Liushaozhen on 2016/9/12.
 */
define(function(require, exports, module ) {
    var init = function(sysCode,content ){
        $.ptAjax({
            url: '/integration/usermapping/system/verifyitem/' + sysCode,
            dataType: 'json',
            type: 'get',
            async:false,
            contentType: 'application/json',
            success: function (res) {
                if (res.status == "1") {
                    var html = require('html!../../pages/userRelevance.html');
                    content.innerHTML = html;
                    var str = '';
                    if (res.data && res.data.length) {
                        for (var i = 0; i < res.data.length; i++) {
                            var temp = res.data[i];
                            var visable=temp.visable==true?'':'hide';
                            var require=temp.required==true?'<div class="u-input-group-before" style="color: red;right:82%;top: 37%;">*</div>':'';
                            var requireAttr=temp.required==true?'require="1"':'';
                            var password=temp.ispassword==true?'password':'text';
                            var defVal=temp.defVal==null?'':temp.defVal;
                            str+='<div class="u-form-group u-has-feedback '+visable+'"><label class="u-col-2 u-form-label text-right padding-right-10" style="padding-top: 8px;">' + temp.title + '</label>'+
                                '<input '+requireAttr+' type="'+password+'" class="u-form-control u-col-8" name="' + temp.id + '" value="'+defVal+'">'+require+'<div class="u-col-2"></div></div>';
                        }
                        if(!str){
                            str='暂无凭证关联信息';
                        }
                        $('#userRelevance').find('form').html(str);
                        //content.innerHTML = $('#userRelevance').html();
                        $('.userRelevance').find('.u-msg-ok').show();
                    }else{
                        $('#userRelevance').find('form').html('暂无凭证关联信息');
                        $('.userRelevance').find('.u-msg-ok').hide();
                    }
                }else{
                    alert(res.message);
                }
            }
        });
        function getParams(name){
            var url=window.location.hash.split('?')[1];
            var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
            var str=null;
            if(url){
                 str=url.match(reg);
            }
            if(str!=null)return str[2];
            return null;
        };
        $('.userRelevance').find('.u-msg-ok').on('click', function () {
            var str='';
            $('input[require="1"]').each(function(i,v){
                if(!$(v).val()){
                    str+=$(v).prev().html()+' ';
                }
            });
            if(str){
               str+=' 不能为空';
                alert(str);
                return;
            }
            var ary = $('.userRelevance').find('form').serializeArray();
            var data = [];
            for (var i = 0; i < ary.length; i++) {
                var obj = {};
                obj.id = ary[i].name;
                obj.value = ary[i].value;
                data.push(obj);
            }
            data.push({id: "pt_systemcode", value: sysCode});
            data.push({id: "pt_usercode", value: $.cookie('u_usercode')});
            $.ptAjax({
                url: '/integration/usermapping/credential',
                dataType: 'json',
                data: JSON.stringify(data),
                type: 'post',
                contentType: 'application/json',
                success: function (res) {
                    if (res.status == "1") {
                        window.message();
                        var flag=getParams('flag');
                        if(flag){
                            window.history.go(-1);
                        }else{
                            if(window.parent){
                                window.parent.location.reload(true);
                            }
                        }
                    } else {
                        window.message(res.message,'error');
                    }
                }
            });
        });
        $('.userRelevance').find(".u-msg-cancel").on('click', function () {
            window.history.go(-1);
        });
    };
    return {
        init: function(sysCode,content ){
            init(sysCode,content);
        }
    }
});