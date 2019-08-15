/**
 * Created with JetBrains WebStorm.
 * User: anry
 * Date: 16-8-24
 * Time: 下午2:48
 * index.js
 */
define(function (require, module, exports) {
    // 引入相关的功能插件或模块
    //var html = require('text!./index.html');
    require('css!./index.css');
    var viewModel = {
        pageInit: function () {
            //todo sth
        }
    };
    return {
        init: function (content) {
            // 插入内容
            var html = '<h2>这是一个示例小应用</h2>';
            content.innerHTML = html;
            // 执行主逻辑
            viewModel.pageInit();
        }
    }
});