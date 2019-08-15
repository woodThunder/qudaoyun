/*!
 * Remark (http://getbootstrapadmin.com/remark)
 * Copyright 2015 amazingsurge
 * Licensed under the Themeforest Standard Licenses
 */
define([], function () {
  //var style = require('text!../../css/skintools.css');
  var pageInit = function() {
    'use strict';
    var layout = 'mmenu';
    var levelPaht = layout;
    var settingsName = 'remark.' + layout + '.skinTools';
    var settings = $.cookie('_TH_') || 'primary';

    function getLevel(url, tag) {
      var arr = url.split('/').reverse(),
          level, path = '';

      for (var i = 0; i < arr.length; i++) {
        if (arr[i] === tag) {
          level = i;
        }
      }
      for (var m = 1; m < level; m++) {
        path += '../'
      }
      return path;
    }
    
    var $body = $(document.body),
        $doc = $(document),
        $win = $(window);

    var Storage = {
      set: function (key, value) {
        if (!window.localStorage) {
          return null;
        }
        if (!key || !value) {
          return null;
        }

        if (typeof value === "object") {
          value = JSON.stringify(value);
        }
        localStorage.setItem(key, value);
      },
      get: function (key) {
        if (!window.localStorage) {
          return null;
        }

        var value = localStorage.getItem(key);

        if (!value) {
          return null;
        }

        if (value[0] === "{") {
          value = JSON.parse(value);
        }

        return value;
      }
    };

    var Skintools = {
      tpl: '<div class="site-skintools">' +
      '<div class="site-skintools-bar" data-target=".site-skintools" data-toggle="collapse" style="display: none"><i class="icon wb-settings"></i></div>' +
      '<div class="site-skintools-inner">' +
      '<div class="site-skintools-toggle">' +
      '<i class="icon wb-settings primary-600"></i>' +
      '</div>' +
      '<div class="site-skintools-content">' +
      '<div class="nav-tabs-horizontal clearfix">' +
      '<ul role="tablist" data-plugin="nav-tabs" class="nav nav-tabs nav-tabs-line">' +
      '<li role="presentation" class="hide"><a role="tab" aria-controls="skintoolsSidebar" href="#skintoolsSidebar" data-toggle="tab" aria-expanded="true">工具栏</a></li>' +
      '<li role="presentation" class="hide"><a role="tab" aria-controls="skintoolsNavbar" href="#skintoolsNavbar" data-toggle="tab" aria-expanded="false">导航栏</a></li>' +
      '<li role="presentation" class="style"><span class="skin-title">选择皮肤</span><span class="style-close" data-target=".site-skintools" data-toggle="collapse"><i class="enterprisefont icon-iconfontcha"></i></span></li>' +
      '</ul>' +
      '<div class="tab-content">' +
      '<div role="tabpanel" id="skintoolsSidebar" class="tab-pane "></div>' +
      '<div role="tabpanel" id="skintoolsNavbar" class="tab-pane"></div>' +
      '<div role="tabpanel" id="skintoolsPrimary" class="tab-pane active clearfix"></div>' +
      '<div class="skin-btn"><button class="u-button   u-button-info" id="skintoolsReset" type="button">保存</button>' +
      '<button class="u-button  margin-left-10 u-button-info cancel btn-back" id="skintoolsControl" type="button" onclick="$(this).parents(\'.site-skintools-content\').find(\'.style-close\').trigger(\'click\')">取消</button></div>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '</div>',
      skintoolsSidebar: ['dark', 'light'],
      skintoolsNavbar: ['primary', 'brown', 'cyan', 'green', 'grey', 'indigo', 'orange', 'pink', 'purple', 'red', 'teal', 'yellow'],
      navbarSkins: 'bg-primary-600 bg-brown-600 bg-cyan-600 bg-green-600 bg-grey-600 bg-indigo-600 bg-orange-600 bg-pink-600 bg-purple-600 bg-red-600 bg-teal-600 bg-yellow-700',
      skintoolsPrimary: ['primary', 'brown', 'cyan', 'green', 'grey', 'indigo', 'orange', 'pink', 'purple', 'red', 'teal', 'yellow'],
      storageKey: settingsName,
      defaultSettings: {
        'sidebar': 'dark',
        'navbar': 'primary',
        'navbarInverse': 'false',
        'primary': 'primary'
      },
      init: function (data) {
        var self = this;

        this.path = getLevel(window.location.pathname, layout);

        this.overflow = false;

        this.$siteSidebar = $('.site-menubar');
        this.$siteNavbar = $('.site-navbar');
        this.$themeButton = $('.theme-toggle');

        this.$container = $(this.tpl);
        this.$toggle = $('.site-skintools-toggle', this.$container);
        this.$content = $('.site-skintools-content', this.$container);
        this.$tabContent = $('.tab-content', this.$container);

        this.$sidebar = $('#skintoolsSidebar', this.$content);
        this.$navbar = $('#skintoolsNavbar', this.$content);
        this.$primary = $('#skintoolsPrimary', this.$content);

        if (data) {
          var d = [];
          $.each(data, function (i, item) {
            d.push(item);
          });
          this.skintoolsPrimary = d;
        }

        //this.build(this.$sidebar, this.skintoolsSidebar, 'skintoolsSidebar', 'radio', '工具栏主题');
        //this.build(this.$navbar, ['inverse'], 'skintoolsNavbar', 'checkbox', 'Navbar Type');
        //this.build(this.$navbar, this.skintoolsNavbar, 'skintoolsNavbar', 'radio', 'Navbar Skins');
        this.build(this.$primary, this.skintoolsPrimary, 'skintoolsPrimary', 'radio', 'Primary Skins');

        this.$container.appendTo($body);

        this.$toggle.on('click', function () {
          self.$container.toggleClass('is-open');
        });

        this.$themeButton.on('click', function () {
          self.$container.toggleClass('is-open');
        });

        $('#skintoolsSidebar input').on('click', function () {
          self.sidebarEvents(this);
        });
        $('#skintoolsNavbar input').on('click', function () {
          self.navbarEvents(this);
        });
        $('#skintoolsPrimary .radio-custom').on('click', function () {
          var o = $(this).find('input');
          $(this).find('label').addClass('is-checked').parent().siblings().find('label').removeClass('is-checked');
          self.primaryEvents(o);
        });


        $('#skintoolsReset').on('click', function () {
          self.save();
        });
        $('.style-close').on('click',function(e){
            $('.site-skintools').remove();
        });
        $('.site-skintools').addClass('collapse in');
      },
      ajax: function () {
        var self = this;

        $.ptAjax({
          url: contextRoot + "/theme/list",
          type: 'GET',
          dataType: 'json',
          contentType: 'application/json',
          success: function (res) {
            self.init(res.data);
          },
          error: function (XMLHttpRequest) {
            errorLogin(XMLHttpRequest);
            alert("网络请求失败");
          }
        });
      },
      updateSetting: function (item, value) {
        this.settings = value;
      },

      title: function (content) {
        return $('<h4 class="site-skintools-title hide">' + content + '</h4>')
      },
      item: function (type, name, id, content) {
        var cookieTh = $.cookie('_TH_') || 'primary';
        var checked = content.id == cookieTh ? "checked" : '';
        var selected = content.id == cookieTh ? "selected" : '';
        var isChecked = content.id == cookieTh ? "is-checked" : '';

        var item = '<div class="' + type + '-custom ' + type + '-' + content.id + '">' +
            '<img src="skin_' + content.id + '.png" width="80" height="50" class="' + selected + '">' +
            '<label class="u-radio is-upgraded u-radio-info '+isChecked+'" for="' + id + '">' +
            '<input ' + checked + ' type="' + type + '" id="' + id + '" class="u-radio-button" name="' + name + '" value="' + content.id + '">' +
            '<span class="u-radio-label">' + content.name + '</span>' +
            '<span class="u-radio-outer-circle"></span>'+
            '<span class="u-radio-inner-circle"></span>'+
            '<span style="overflow: hidden; position: relative;"><span class="u-ripple"></span></span>'+
            '</label>';
        return $(item);
      },
      build: function ($wrap, data, name, type, title) {
        if (title) {
          this.title(title).appendTo($wrap)
        }
        for (var i = 0; i < data.length; i++) {
          this.item(type, name, name + '-' + data[i].id, data[i]).appendTo($wrap);
        }
      },
      sidebarEvents: function (self) {
        var val = $(self).val();

        this.sidebarImprove(val);
        this.updateSetting('sidebar', val);
      },
      navbarEvents: function (self) {
        var val = $(self).val(),
            checked = $(self).prop('checked');

        this.navbarImprove(val, checked);

        if (val === 'inverse') {
          this.updateSetting('navbarInverse', checked.toString());
        } else {
          this.updateSetting('navbar', val);
        }
      },
      primaryEvents: function (self) {

        self.parent().prev().addClass('selected').parent().siblings().children('img').removeClass('selected');
        var val = $(self).val();

        this.primaryImprove(val);

        this.updateSetting('primary', val);
      },
      sidebarImprove: function (val) {
        if (val === 'dark') {
          this.$siteSidebar.removeClass('site-menubar-light');
        } else if (val === 'light') {
          this.$siteSidebar.addClass('site-menubar-' + val);
        }
      },
      navbarImprove: function (val, checked) {
        if (val === 'inverse') {
          checked ? this.$siteNavbar.addClass('navbar-inverse') : this.$siteNavbar.removeClass('navbar-inverse');
        } else {

          var bg = 'bg-' + val + '-600'
          if (val === 'yellow') {
            bg = 'bg-yellow-700';
          }
          if (val === 'primary') {
            bg = '';
          }

          this.$siteNavbar.removeClass(this.navbarSkins).addClass(bg);
        }
      },
      primaryImprove: function (val) {
        var $link = $('#skinStyle', $('head')),
            href = baseUrl + '/themes/css/' + val + '.css';
        if (val === 'primary') {
          $link.remove();
          $('.logo').find('img').attr('src', 'logo.png');
          return;
        }
        if ($link.length === 0) {
          $('head').append('<link id="skinStyle" href="' + href + '" rel="stylesheet" type="text/css"/>');
        } else {
          $link.attr('href', href);
        }
        $('.logo').find('img').attr('src', 'logo_' + val + '.png');
      },
      reset: function () {
      },
      save: function () {
        var val = $('.is-checked input[name=skintoolsPrimary]').val();
        $.ptAjax({
          url: contextRoot + "/theme/default/" + val,
          type: 'GET',
          dataType: 'json',
          contentType: 'application/json',
          success: function (res) {
            if (res.status == '1') {
              window.message();
              $('.style-close').trigger('click');
            }else{
              window.message(res.message,'error');
            }
          },
          error: function (XMLHttpRequest) {
            errorLogin(XMLHttpRequest);
            alert("网络请求失败");
          }
        });
      },
    };
    Skintools.ajax();
  };
  return {
    init:function(){
      pageInit();
    }
  }
});



