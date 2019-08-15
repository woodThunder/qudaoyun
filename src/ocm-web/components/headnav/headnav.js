define(["text!comp/headnav/headnav.tpl.html","css!comp/headnav/headnav.css","jquery.cookie"],function(tpl){
  'use strict';
  var ViewModel,baseData,events;
  baseData = {

  };
  events = {
    checklogin:function(){
      var loginName = $.cookie("_A_P_userName");
      if(loginName){
        return decodeURI(loginName);
      }
      return "请先登录";
    },
    mininavbar:function () {
	        $("body").toggleClass("mini-navbar");
	        ViewModel._SmoothlyMenu();
	  },
    //收起左侧菜单
    _SmoothlyMenu:function(){
      if (!$('body').hasClass('mini-navbar') || $('body').hasClass('body-small')) {
          // Hide menu in order to smoothly turn on when maximize menu
          $('#side-menu').hide();
          // For smoothly turn on menu
          setTimeout(
              function () {
                  $('#side-menu').fadeIn(500);
              }, 100);
      } else if ($('body').hasClass('fixed-sidebar')) {
          $('#side-menu').hide();
          setTimeout(
              function () {
                  $('#side-menu').fadeIn(500);
              }, 300);
      } else {
          // Remove all inline style from jquery fadeIn function to reset menu state
          $('#side-menu').removeAttr('style');
      }
    }
  }
  ViewModel = u.extend({},baseData,events);
  return{
    init:function(content){
      ko.cleanNode(content);
      content.innerHTML = tpl;
      u.createApp({
        el: content,
        model: ViewModel
      });
    }
  }
})
