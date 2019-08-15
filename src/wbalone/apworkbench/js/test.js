/**
 * Created with JetBrains WebStorm.
 * User: anry
 * Date: 16-3-24
 * Time: 上午9:47
 * To change this template use File | Settings | File Templates.
 */
define([], function () {
    alert("test");

    var data = [{
        "location": "#index_main",
        "name": "首页",
        "menustatus": "N",
        "children": null,
        "icon": "&#xe609;",
        "target": "workbench",
        "urltype": "view",
        "id": "4949dc034c70483d97853c2ffc64c664"
    }, {
        "location": "http://songhlc:82/portal/workbench#/pages/home/home",
        "name": "首页",
        "menustatus": "N",
        "children": null,
        "icon": "&#xe603;",
        "target": "workbench",
        "urltype": "url",
        "id": "f148453f26cd48068011b43d57d6cd26"
    }, {
        "location": "js/test.js",
        "name": "testjs",
        "menustatus": "N",
        "children": null,
        "icon": "&#xe607;",
        "target": "workbench",
        "urltype": "plugin",
        "id": "indexjs"
    }]

    window.menu(data);
    addRouter("/permissionTenant");//管理菜单
    router.init("/index_main");


    return {
        init: function () {
            alert("test");
        }
    }
})
