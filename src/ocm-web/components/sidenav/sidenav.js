 define(['text!comp/sidenav/sidenav.tpl.html','comp/sidenav/sidemodel.js','css!comp/sidenav/sidenav.css'],function(tpl,model){
  'use strict';
  var ViewModel,baseData,events;
  baseData = {
    username:ko.observable("admin"),
    ObservableArray:ko.observableArray([])
  };
  events = {};
  ViewModel = u.extend({},baseData,events);
  return{
    init:function(content){
      ko.cleanNode(content);
      content.innerHTML = tpl;
      ViewModel.ObservableArray(new model().fetch());
      u.createApp({
        el: content,
        model: ViewModel
      });
      window.router.init();
    }
  }
})
