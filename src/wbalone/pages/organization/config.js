/**
 * Created by zhh on 2016/11/9.
 */
require.config({
    baseUrl:window.baseUrl,
    paths: {
        'css': window.baseUrl+'/trd/requirejs/css',
        'text': window.baseUrl+'/trd/requirejs/text',
        'uui':"/uui/libs/uui/js/u"
    }
})
require(['./viewmodel.js'],function (orgviewmodel) {
    var content=document.getElementById("content");
    orgviewmodel.init(content);
})