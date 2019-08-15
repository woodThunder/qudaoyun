require(["ocm_refinfo","ocm_const","ocm_extend"],function(refinfo,busiconst){

	window.appCtx = "/ocm-web";

	window.oc = {};

	window.CONST = busiconst;

	u.extend(window.refinfo,refinfo);

	require(["css!/ocm-web/vendor/jquery-toast/toast"]);
	require(["css!/ocm-web/vendor/antd/antd"]);
	require(["css!/ocm-web/css/style"]);
	require(["css!/ocm-web/css/animate"]);
	require(["css!/ocm-web/fonts/qyfont/iconfont"]);
	require(["css!/ocm-web/vendor/perfect-scrollbar/perfect-scrollbar"])
	require(["breadcrumb"]);
});
