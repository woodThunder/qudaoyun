define(["menu","router"],function(menuitems){
  'use strict';
  var menuModel = function(option){
    var self = this;
    self.fetch = function(){
      self.registerRouter(menuitems);
      return menuitems;
    };
    self.registerRouter = function(menulist){
      if(menulist&&menulist.length>0){
        for(var i =0;i<menulist.length;i++){
          if(menulist[i].children){
            self.registerRouter(menulist[i].children);
          }else{
            // console.log(menulist[i].location);
            window.registerRouter(menulist[i].location.substring(1));
          }
        }
      }
    }
  }
  window.getBreadcrumb = function(location){
        location = "#/"+location;

        var menus = menuitems;
        var n1, n2, n3;

        $.each(menus, function (i, item) {
            if (location == item.location) {
                n1 = item;
                return false;
            }
            if (item.children&&item.children.length>0) {
              $.each(item.children, function (t, items) {
                if (location == items.location) {
                  n2 = items;
                  n1 = item;
                  return false;
                }
                if(items.children&&items.children.length>0){
                  $.each(items.children, function (tt, itemss) {
                    if (location == itemss.location) {
                      n3 = itemss;
                      n2 = items;
                      n1 = item;
                      return false;
                    }
                  });
                }
              });
            }
        });

        return function () {
            var data = [];
            $.each([n1, n2, n3], function (i, item) {
                if (item) {
                    data.push(item.name);
                }
            });

            return data;
        }();
    };
    window.getCurrentMenu = function(id){
      var menus = menuitems;
      var menuitem;
      $.each(menus,function(i,item){
        if(item.id == id){
          menuitem = item;
          return false;
        }
        if(item.children&&item.children.length>0){
          $.each(item.children,function(i,item){
            if(item.id == id){
              menuitem = item;
              return false;
            }
            if(item.children&&item.children.length>0){
              $.each(item.children,function(i,item){
                if(item.id == id){
                  menuitem = item;
                  return false;
                }
              })
            }
          })
        }
      })
      if(menuitem){
        return menuitem;
      }
      return {};
    }  
    return menuModel;
})
