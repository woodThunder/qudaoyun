define(function(require, exports, module ){
    var html = require('text!./index.html');
    var styles = require('css!./index.css');
    var viewModel={
        pageInit:function(widgetId,count,height){
            $('#'+widgetId).css('height',height);
            for(var i=1;i<=count;i++){
                var str='<div class="swiper-slide swiper-no-swiping" ><img src="./widget/autoplay/images/'+i+'.jpg" class="img-responsive"> </div>';
                $('#'+widgetId).children().append(str);
            }
            var mySwiper = new Swiper ('#'+widgetId, {
                loop:'true',
                autoplay:3000,
                speed:1000,
                direction:'horizontal',
                autoplayDisableOnInteraction:'false'
            })
        }
    };
    return {
        init: function(widgetId,count,height){
            viewModel.pageInit(widgetId,count,height);
        }
    }
});