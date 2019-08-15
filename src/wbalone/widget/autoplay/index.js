define(function(require, exports, module ){
    var html = require('text!./index.html');
    var styles = require('css!./index.css');
    var viewModel={
        pageInit:function(widgetId,count,height){
            $('#'+widgetId).find('.swiper-container').css('height',height);
            for(var i=1;i<=count;i++){
                var str='<div class="swiper-slide swiper-no-swiping" ><img src="'+i+'.jpg" class="img-responsive"> </div>';
                $('#'+widgetId).find('.swiper-container').children().append(str);
            }
            var mySwiper = new Swiper ('.swiper-container', {
                loop:'true',
                autoplay:3000,
                speed:1000,
                direction:'horizontal',
                autoplayDisableOnInteraction:'false'
            })
        }
    };
    return {
        init: function(widgetId,height,content){
            content.innerHTML = html;
            viewModel.pageInit(widgetId,height);
        }
    }
});
