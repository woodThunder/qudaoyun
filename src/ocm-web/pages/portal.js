require(["sidenav","headnav","metismenu"],function(sidenav,headnav){
  // 侧边栏和导航栏初始化
  var el_sidenav = $("#sidenav");
  var el_headnav = $("#headnav");

  sidenav.init(el_sidenav[0]);
  headnav.init(el_headnav[0]);
  $('#side-menu').metisMenu();

  // 开发环境下禁用grid的缓存
  var gridCompProto = $.fn.grid.gridComp.prototype;
  var oldinitDefault = gridCompProto.initDefault;
  gridCompProto.initDefault = function() {
    oldinitDefault.call(this);
    this.defaults.needLocalStorage = false;
  }

})
