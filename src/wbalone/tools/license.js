/**
 * User: anry
 * fun:license校验工具 ，处理校验流程，报错等
 */
define(function () {
    return {
        /*param
        * app:app对象
        * callback:回调函数
        * */
        HandleErr: function (app,callback) {//处理错误异常
            if (arguments.length!=2) {
                alert("参数错误");
                return true;
            }
            if (app.licenseControlFlag) { // = 1 ,需要license校验
                $.ajax({
                    type: 'get',
                    dataType: 'json',
                    contentType: 'application/json',
                    url: 'licenseRest/isModuleAllowed',
                    async: false,
                    data: {
                        areaId: app.areaId
                    },
                    success: function (res) {
                        if (res.status) {
                           callback&&callback();
                        } else {

                            //校验不通过，展示报错页面
                            var content = document.getElementById("content");
                            var htmlStr='';
                            if (ko) {
                                ko.cleanNode(content);
                            }
                            if(res.hasOwnProperty('flag')){
                                if(res.flag==1){
                                    htmlStr =   '<style type="text/css"> .imgWrapper{ width: 85%;background-color: #fff;margin: 65px auto;padding-top: 60px;padding-bottom: 60px;overflow: hidden;}.imgbox{min-height: 383px;margin: 0px auto; background: #fff url(./images/license/error_01.png) no-repeat fixed center;}</style>' +
                                        '<div class="imgWrapper"><div class="imgbox"></div></div>';
                                }
                                if(res.flag<1){
                                    htmlStr =   '<style type="text/css"> .imgWrapper{ width: 85%;background-color: #fff;margin: 65px auto;padding-top: 60px;padding-bottom: 0px;overflow: hidden;}.imgbox{min-height: 430px;margin: 0px auto;background: #fff url(./images/license/error_02.png) no-repeat fixed center;}</style>' +
                                        '<div class="imgWrapper"><div class="imgbox"></div></div>';
                                }
                                if(res.flag>1){
                                    htmlStr =   '<style type="text/css"> .imgWrapper{ width: 85%;background-color: #fff;margin: 65px auto;padding-top: 60px;padding-bottom: 60px;overflow: hidden;}.imgbox{min-height: 383px;margin: 0px auto;background: #fff url(./images/license/error_03.png) no-repeat fixed center;}</style>' +
                                        '<div class="imgWrapper"><div class="imgbox"></div></div>';
                                }
                            }else{
                                htmlStr =   '<style type="text/css"> .imgWrapper{ width: 85%;background-color: #fff;margin: 65px auto;padding-top: 60px;padding-bottom: 60px;overflow: hidden;}.imgbox{min-height: 400px;margin: 0px auto;background: #fff url(./images/404.png) no-repeat fixed center;}</style>' +
                                    '<div class="imgWrapper"><div class="imgbox"></div></div>';

                            }

                            content.innerHTML = htmlStr;
                        }
                    }
                });
            }else{
                callback&&callback();
            }
        }
    }
});
