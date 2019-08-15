define([],function(){
   return {
       LoadList: function (obj, successCallback) {
           return function () {
               $("#LoadingImage").show();
               $("#emptyImage").hide();
               $('#LoadingImage').parent().find('table tbody').hide();
               $.ajax({
                   type: obj.type || 'get',
                   dataType: obj.dataType || 'json',
                   contentType: 'application/json',
                   url: obj.url,
                   data: obj.data || {},
                   success: function (res) {
                       $("#LoadingImage").hide();
                       $('#LoadingImage').parent().find('table tbody').show();
                       if ((res && res.data == null) || (res.data && res.data.content.length < 1) || (res.data && res.data.length < 1)) {
                           $('#emptyImage').show();
                       }
                       successCallback(res);
                   },
                   //timeout:3000,
                   error: function (e) {
                       if (e.status == 500 && e.responseText == 'Internal Server Error') {
                           $('#emptyImage').show();
                           $('#emptyImage span').html($.i18n.prop('js.app.use.0001'));
                           $('#emptyImage span').css({'margin-left': '-46px'});
                       }
                       $("#LoadingImage").hide();
                   }
               });
           }();
       },
       action:function(obj, successCallback) {
           return function () {
               $.ajax({
                   type: obj.type || 'get',
                   dataType: obj.dataType || 'json',
                   contentType: 'application/json',
                   url: obj.url,
                   data: obj.data || {},
                   success: function (res) {
                       successCallback(res);
                   },
                   error: function (e) {
                       if (e.status == 500 && e.responseText == 'Internal Server Error') {
                           $('#emptyImage').show();
                           $('#emptyImage span').html($.i18n.prop('js.app.use.0001'));
                           $('#emptyImage span').css({'margin-left': '-46px'});
                       }
                   }
               });
           }();
       }
   }
});
