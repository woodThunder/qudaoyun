var terminalbusiness = "/terminalbusiness";
var ocm_web = "/ocm-web";
var qy_fe = "/qy_fe";
var pbill = "/pbill";
require.config({
    paths: {
        //wbalone
        'reflib': '/uitemplate_web/static/js/uiref/reflib',
        'refer': '/uitemplate_web/static/js/uiref/refer',
        'refGrid': '/uitemplate_web/static/js/uiref/refGrid',
        'refGridtree': '/uitemplate_web/static/js/uiref/refGridtree',
        'refTree': '/uitemplate_web/static/js/uiref/refTree',
        'refcommon': '/uitemplate_web/static/js/uiref/refcommon',
        'uiReferComp': '/uitemplate_web/static/js/uiref/uiReferComp',
        'ajaxfileupload': "/iuap-saas-filesystem-service/resources/js/ajaxfileupload",
        'ossupload': "/iuap-saas-filesystem-service/resources/js/ossupload",
        'interfaceFile': "/iuap-saas-filesystem-service/resources/js/interface.file",
        'interfaceFileImpl': "/iuap-saas-filesystem-service/resources/js/interface.file.impl",

        //终端组件 begin ------------------------------------
        "tbs_dicConfig": terminalbusiness + "/utils/dic_const",
        "tbs_util": terminalbusiness + "/utils/util",
        "tbs_jqimgslider": terminalbusiness + "/vendor/jquery-image-slider/js/jquery.slider",
        "tbs_grid": terminalbusiness + "/components/gridcomp/gridcomp",
        "tbs_comp": terminalbusiness + "/components/ocdefcomp/ocdefcomp",
        "tbs_global": terminalbusiness + "/config/global",
        "tbs_jquery_collapse": terminalbusiness + "/vendor/jquery.collapse/jquery.collapse",
        "tbs_toast": terminalbusiness + "/vendor/jquery-toast/toastr.min",
        "tbs_antd": terminalbusiness + "/vendor/antd/antd",
        "tbs_perfect-scrollbar": terminalbusiness + "/vendor/perfect-scrollbar/perfect-scrollbar",
        "tbs_extend": terminalbusiness + "/components/extend/jquery.extend",
        "tbs_refinfo": terminalbusiness + "/components/refinfo/refinfo",
        //终端组件 end -------------------------------------

        //------中台组件 begin-------------------------------------
        //jquery组件
        "jquery.collapse": ocm_web + "/vendor/jquery.collapse/jquery.collapse",
        "toast": ocm_web + "/vendor/jquery-toast/toastr.min",
        "antd": ocm_web + "/vendor/antd/antd",
        "perfect-scrollbar": ocm_web + "/vendor/perfect-scrollbar/perfect-scrollbar",
        "ocm-wangEditor": ocm_web + "/vendor/wangeditor/wangEditor",
        "ocm-citypicker":ocm_web + "/vendor/citypicker/city-picker",
        "ocm-ChineseDistricts":ocm_web + "/vendor/citypicker/city-picker.data",
        //自定义组件
        "searchbox": ocm_web + "/components/searchbox/searchbox",
        "editcard": ocm_web + "/components/editcard/editcard",
        "billfooter": ocm_web + "/components/billfooter/billfooter",
        //iuap控件覆写
        "refercomp": ocm_web + "/components/refercomp/refercomp",
        //自定义配置
        "ocm_common": ocm_web + "/utils/common",
        "ocm_global": ocm_web + "/config/global_ocm",
        "ocm_extend": ocm_web + "/components/extend/jquery.extend",
        "ocm_refinfo": ocm_web + "/components/refinfo/refinfo",
        "ocm_const": ocm_web + "/utils/const",
        "ocm_grid": ocm_web + "/components/gridcomp/gridcomp",
        "ocm_comp": ocm_web + "/components/ocdefcomp/ocdefcomp",
        "ocm_ordertrack": ocm_web + "/components/ordertrack/ordertrack",
        //------中台 end-------------------------------

        //中台售后补件 begin ------------------------------------
        "pbill_grid": pbill + "/components/gridcomp/gridcomp",
        "pbill_comp": pbill + "/components/ocdefcomp/ocdefcomp",
        "pbill_jquery_collapse": pbill + "/vendor/jquery.collapse/jquery.collapse",
        "pbill_toast": pbill + "/vendor/jquery-toast/toastr.min",
        "pbill_antd": pbill + "/vendor/antd/antd",
        "pbill_perfect-scrollbar": pbill + "/vendor/perfect-scrollbar/perfect-scrollbar",
        "pbill_extend": pbill + "/components/extend/jquery.extend",
        //中台售后补件 end -------------------------------------

    },
    shim: {
        'interfaceFileImpl': {
            deps: ["interfaceFile"]
        },
        'refer': {
            deps: ["css!/uitemplate_web/static/css/ref/ref.css",
                "css!/uitemplate_web/static/css/ref/jquery.scrollbar.css",
                "css!/uitemplate_web/static/trd/bootstrap-table/src/bootstrap-table.css",
                "css!/uitemplate_web/static/fontIcon/iconfont.css"
            ]
        },
        'uiReferComp': {
            deps: ["reflib", "refGrid", "refGridtree", "refTree", "refcommon"]
        },
        'refGridtree': {
            deps: ["refer"]
        },
        'refGrid': {
            deps: ["refer"]
        },
        'refTree': {
            deps: ["refer"]
        },
        'refcommon': {
            deps: ["refer"]
        },

        //中台--begin-------------------
        "refercomp": {
            deps: ["uiReferComp"]
        },
        "ocm_common": {
            deps: ["uiReferComp", "refer", "refercomp", "jquery.collapse", "antd", "css!" + ocm_web + "/vendor/jquery-toast/toast", "css!" + ocm_web + "/vendor/antd/antd",
                "css!" + ocm_web + "/vendor/jquery-toast/toast", "css!" + ocm_web + "/vendor/antd/antd",
                "css!" + ocm_web + "/css/animate", "css!" + ocm_web + "/fonts/qyfont/iconfont",
                "css!" + ocm_web + "/vendor/perfect-scrollbar/perfect-scrollbar", "ocm_grid",
                "ocm_refinfo", "ocm_const", "ocm_extend", "ocm_global"
            ]
        },
        "ocm_global": {
            deps: ["ocm_refinfo", "ocm_const", "ocm_extend", "toast", "css!" + ocm_web + "/css/style",]
        },
        "ocm_grid": {
            deps: ["perfect-scrollbar"]
        },
        "ocm-wangEditor":{
            deps: ["css!" + ocm_web + "/vendor/wangeditor/wangEditor.min"]
        }, 
        //中台--end---------------------
        //终端 begin ------------------------------------
        "tbs_dicConfig": {
            deps: ["uiReferComp",
                "refer",
                "tbs_util",
                "tbs_jquery_collapse",
                "tbs_antd",
                "tbs_grid",
                "tbs_global",
                "tbs_extend",
                "tbs_refinfo",
                "css!" + terminalbusiness + "/vendor/jquery-toast/toast",
                "css!" + terminalbusiness + "/vendor/antd/antd",
                "css!" + terminalbusiness + "/css/animate",
                "css!" + terminalbusiness + "/fonts/qyfont/iconfont",
                "css!" + terminalbusiness + "/vendor/perfect-scrollbar/perfect-scrollbar",
                "css!" + terminalbusiness + "/css/terBusiness",
                "css!" + terminalbusiness + "/css/style"
            ]
        },
        "tbs_grid": {
            deps: ["tbs_perfect-scrollbar"]
        },
        "tbs_jqimgslider": {
            deps: [
                "css!" + terminalbusiness + "/vendor/jquery-image-slider/css/ie.css",
                "css!" + terminalbusiness + "/vendor/jquery-image-slider/css/jquery.slider.css",
                "css!" + terminalbusiness + "/vendor/jquery-image-slider/css/print.css",
            ],
            exports: 'tbs_jqimgslider'
        },
        //终端 end -------------------------------------
        //中台，售后补件 begin-----------------------
        "pbill_extend":{
            deps:[
                "pbill_grid",
                "pbill_comp",
                "pbill_jquery_collapse",
                "pbill_toast",
                "pbill_antd",
                "pbill_perfect-scrollbar",
                "css!" + pbill + "/vendor/jquery-toast/toast",
                "css!" + pbill + "/vendor/antd/antd",
                "css!" + pbill + "/css/animate",
                "css!" + pbill + "/fonts/qyfont/iconfont",
                "css!" + pbill + "/vendor/perfect-scrollbar/perfect-scrollbar",
                "css!" + pbill + "/css/terBusiness",
                "css!" + pbill + "/css/style"
            ]
        }
        //中台，售后补件end----------------------------------
    }
});
