var terminalbusiness = "/terminalbusiness";
var fmcg_web = "/fmcg_web";
var ocm_web = "/ocm-web";
var qy_fe = "/qy_fe";
var pbill = "/pbill";
require.config({
  paths: {
    //wbalone
    reflib: "/uitemplate_web/static/js/uiref/reflib",
    refer: "/uitemplate_web/static/js/uiref/refer",
    refGrid: "/uitemplate_web/static/js/uiref/refGrid",
    refGridtree: "/uitemplate_web/static/js/uiref/refGridtree",
    refTree: "/uitemplate_web/static/js/uiref/refTree",
    refcommon: "/uitemplate_web/static/js/uiref/refcommon",
    uiReferComp: "/uitemplate_web/static/js/uiref/uiReferComp",
    'uiNewReferComp': '/uitemplate_web/static/js/uiref/uiNewReferComp',
    ckeditor: "/uitemplate_web/static/js/design/ckeditor/ckeditor.js",
    ajaxfileupload: "/iuap-saas-filesystem-service/resources/js/ajaxfileupload",
    ossupload: "/iuap-saas-filesystem-service/resources/js/ossupload",
    interfaceFile: "/iuap-saas-filesystem-service/resources/js/interface.file",
    interfaceFileImpl:
      "/iuap-saas-filesystem-service/resources/js/interface.file.impl",
    toast_ref: "/uitemplate_web/static/js/design/jquery-toast/toastr.min",
    'i18n':"/wbalone/i18n/i18n.iuap",
    'i18nJQ':'/wbalone/i18n/jquery.i18n.properties',
    //------中台组件 begin-------------------------------------
    //公共组件
    "jquery.collapse": ocm_web + "/vendor/jquery.collapse/jquery.collapse",
    toast: ocm_web + "/vendor/jquery-toast/toastr.min",
    antd: ocm_web + "/vendor/antd/antd",
    "perfect-scrollbar":
      ocm_web + "/vendor/perfect-scrollbar/perfect-scrollbar",
    "ocm-wangEditor": ocm_web + "/vendor/wangeditor/wangEditor",
    "ocm-citypicker": ocm_web + "/vendor/citypicker/city-picker",
    "ocm-ChineseDistricts": ocm_web + "/vendor/citypicker/city-picker.data",
    "handlebars": ocm_web+"/vendor/handlebars/handlebars.amd.min",
    //自定义组件
    searchbox: ocm_web + "/components/searchbox/searchbox",
    editcard: ocm_web + "/components/editcard/editcard",
    billcard: ocm_web + "/components/billcard/billcard",
    billfooter: ocm_web + "/components/billfooter/billfooter",
    //iuap控件覆写
    refercomp: ocm_web + "/components/refercomp/refercomp",
    //自定义配置
    ocm_core: ocm_web + "/components/core/core",
    ocm_base: ocm_web + "/components/core/base",
    ocm_basemodel: ocm_web + "/components/core/basemodel",
    ocm_baseview: ocm_web + "/components/core/baseview",
    ocm_simpleview: ocm_web + "/views/simpleview/simpleview",
    ocm_simplepicview: ocm_web + "/views/simplepicview/simplepicview",
    ocm_nestedview: ocm_web + "/views/nestedview/nestedview",
    ocm_common: ocm_web + "/utils/common",
    ocm_global: ocm_web + "/config/global_ocm",
    ocm_extend: ocm_web + "/components/extend/jquery.extend",
    ocm_refinfo: ocm_web + "/components/refinfo/refinfo",
    ocm_refinfoTemp: ocm_web + "/components/refinfo/refinfo_temp",
    ocm_const: ocm_web + "/utils/const",
    ocm_grid: ocm_web + "/components/gridcomp/gridcomp",
    ocm_comp: ocm_web + "/components/ocdefcomp/ocdefcomp",
    ocm_ordertrack: ocm_web + "/components/ordertrack/ordertrack",
    ocm_repairtrack: ocm_web + "/components/repairTrack/repairTrack",
    ocm_templateBridge: ocm_web+"/components/core/templateBridge",

    ocm_dynamicTemplate: ocm_web+"/components/dynamicTemplate/dynamicTemplate",
    ocm_enuminfo: ocm_web+"/components/enuminfo/enuminfo",
    fmcg_basemodel: ocm_web + "/components/core/basemodel",
    fmcg_baseview: ocm_web + "/components/core/baseview",
    fmcg_searchbox: ocm_web + "/components/searchbox/searchbox",
    fmcg_global: ocm_web + "/config/global_ocm",
    fmcg_common: ocm_web + "/utils/common",

    //插件
    ocm_kindeditor: ocm_web + "/vendor/kindeditor/kindeditor-all"
    //------中台 end-------------------------------
  },
  shim: {
    interfaceFileImpl: {
      deps: ["interfaceFile"]
    },
    refer: {
      deps: [
        "css!/uitemplate_web/static/css/ref/ref.css",
        "css!/uitemplate_web/static/css/ref/jquery.scrollbar.css",
        "css!/uitemplate_web/static/trd/bootstrap-table/src/bootstrap-table.css",
        "css!/uitemplate_web/static/fontIcon/iconfont.css"
      ]
    },
    'i18n':{
      deps:["i18nJQ"]
    },
    uiReferComp: {
      deps: ["reflib", "refGrid", "refGridtree", "refTree", "refcommon"]
    },
    refGridtree: {
      deps: ["refer"]
    },
    refGrid: {
      deps: ["refer"]
    },
    refTree: {
      deps: ["refer"]
    },
    refcommon: {
      deps: ["refer"]
    },

    //中台--begin-------------------
    refercomp: {
      deps: ["uiReferComp"]
    },
    ocm_common: {
      deps: [
        "uiReferComp",
        "refer",
        "refercomp",
        "jquery.collapse",
        "antd",
        "css!" + ocm_web + "/vendor/jquery-toast/toast",
        "css!" + ocm_web + "/vendor/antd/antd",
        "css!" + ocm_web + "/vendor/jquery-toast/toast",
        "css!" + ocm_web + "/vendor/antd/antd",
        "css!" + ocm_web + "/css/animate",
        "css!" + ocm_web + "/fonts/qyfont/iconfont",
        "css!" + ocm_web + "/vendor/perfect-scrollbar/perfect-scrollbar",
        "ocm_grid",
        "ocm_refinfo",
        "ocm_const",
        "ocm_extend",
        "ocm_global"
      ]
    },
    ocm_global: {
      deps: [
        "ocm_refinfo",
        "ocm_const",
        "ocm_extend",
        "toast",
        "css!" + ocm_web + "/css/style"
      ]
    },
    ocm_grid: {
      deps: ["perfect-scrollbar"]
    },
    "ocm-wangEditor": {
      deps: ["css!" + ocm_web + "/vendor/wangeditor/wangEditor.min"]
    }
    //中台--end---------------------
  }
});
