/*!
 * Remark (http://getbootstrapadmin.com/remark)
 * Copyright 2015 amazingsurge
 * Licensed under the Themeforest Standard Licenses
 */
(function(window, document) {
  'use strict';

  if (!window.localStorage) {
    return null;
  }
  var layout = 'mmenu';
  var levelPaht = layout;
  var settingsName = 'remark.' + layout + '.skinTools';
  var settings = localStorage.getItem(settingsName);

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

  if (settings) {
    if (settings[0] === "{") {
      settings = JSON.parse(settings);
    }

    if (settings['primary'] && settings['primary'] !== 'primary') {
      var head = document.head,
        link = document.createElement('link');

      link.type = 'text/css';
      link.rel = 'stylesheet';
      link.href = '/js/ext/assets/skins/' + settings['primary'] + '.css';
      link.id = "skinStyle";

      head.appendChild(link)
    }

    if (settings['sidebar'] && settings['sidebar'] === 'light') {
      var menubarFn = setInterval(function() {
        var menubar = document.getElementsByClassName('site-menubar');
        if (menubar.length > 0) {
          clearInterval(menubarFn);
          menubar[0].className += " site-menubar-light";
        }
      }, 5);
    }

    var navbarFn = setInterval(function() {
      var navbar = document.getElementsByClassName('site-navbar');
      if (navbar.length > 0) {
        clearInterval(navbarFn);
        if (settings['navbar'] && settings['navbar'] !== 'primary') {
          navbar[0].className += " bg-" + settings['navbar'] + "-600";
        }
        if (settings['navbarInverse'] && settings['navbarInverse'] !== 'false') {
          navbar[0].className += " navbar-inverse";
        }

      }
    }, 5);
  }

  if (document.addEventListener) {
    document.addEventListener("DOMContentLoaded", function() {
      var $body = $(document.body),
        $doc = $(document),
        $win = $(window);

      var Storage = {
        set: function(key, value) {
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
        get: function(key) {
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
        '<div class="site-skintools-bar" data-target=".site-skintools" data-toggle="collapse"><i class="icon wb-settings"></i></div>' +
        '<div class="site-skintools-inner">' +
        '<div class="site-skintools-toggle">' +
        '<i class="icon wb-settings primary-600"></i>' +
        '</div>' +
        '<div class="site-skintools-content">' +
        '<div class="nav-tabs-horizontal">' +
        '<ul role="tablist" data-plugin="nav-tabs" class="nav nav-tabs nav-tabs-line">' +
        '<li role="presentation" class="hide"><a role="tab" aria-controls="skintoolsSidebar" href="#skintoolsSidebar" data-toggle="tab" aria-expanded="true">工具栏</a></li>' +
        '<li role="presentation" class="hide"><a role="tab" aria-controls="skintoolsNavbar" href="#skintoolsNavbar" data-toggle="tab" aria-expanded="false">导航栏</a></li>' +
        '<li role="presentation" class="active"><a role="tab" aria-controls="skintoolsPrimary" href="#skintoolsPrimary" data-toggle="tab" aria-expanded="false">主题</a></li>' +
        '</ul>' +
        '<div class="tab-content">' +
        '<div role="tabpanel" id="skintoolsSidebar" class="tab-pane "></div>' +
        '<div role="tabpanel" id="skintoolsNavbar" class="tab-pane"></div>' +
        '<div role="tabpanel" id="skintoolsPrimary" class="tab-pane active"></div>' +
        '<button class="btn btn-outline btn-block btn-primary margin-top-20" id="skintoolsReset" type="button">Reset</button>' +
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
        init: function() {
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

          this.build(this.$sidebar, this.skintoolsSidebar, 'skintoolsSidebar', 'radio', '工具栏主题');
          this.build(this.$navbar, ['inverse'], 'skintoolsNavbar', 'checkbox', 'Navbar Type');
          this.build(this.$navbar, this.skintoolsNavbar, 'skintoolsNavbar', 'radio', 'Navbar Skins');
          this.build(this.$primary, this.skintoolsPrimary, 'skintoolsPrimary', 'radio', 'Primary Skins');

          this.$container.appendTo($body);

          this.$toggle.on('click', function() {
            self.$container.toggleClass('is-open');
          });

          this.$themeButton.on('click', function() {
            self.$container.toggleClass('is-open');
          });

          $('#skintoolsSidebar input').on('click', function() {
            self.sidebarEvents(this);
          });
          $('#skintoolsNavbar input').on('click', function() {
            self.navbarEvents(this);
          });
          $('#skintoolsPrimary input').on('click', function() {
            self.primaryEvents(this);
          });

          $('#skintoolsReset').on('click', function() {
            self.reset();
          });

          this.initLocalStorage();
        },
        initLocalStorage: function() {
          var self = this;

          this.settings = Storage.get(this.storageKey);

          if (this.settings === null) {
            this.settings = $.extend(true, {}, this.defaultSettings);

            Storage.set(this.storageKey, this.settings);
          }

          if (this.settings && $.isPlainObject(this.settings)) {
            $.each(this.settings, function(n, v) {
              switch (n) {
                case 'sidebar':
                  $('input[value="' + v + '"]', self.$sidebar).prop('checked', true);
                  self.sidebarImprove(v);
                  break;
                case 'navbar':
                  $('input[value="' + v + '"]', self.$navbar).prop('checked', true);
                  self.navbarImprove(v);
                  break;
                case 'navbarInverse':
                  var flag = v === 'false' ? false : true;
                  $('input[value="inverse"]', self.$navbar).prop('checked', flag);
                  self.navbarImprove('inverse', flag);
                  break;
                case 'primary':
                  $('input[value="' + v + '"]', self.$primary).prop('checked', true);
                  self.primaryImprove(v);
                  break;
              }
            });
          }
        },

        updateSetting: function(item, value) {
          this.settings[item] = value;
          Storage.set(this.storageKey, this.settings);
        },

        title: function(content) {
          return $('<h4 class="site-skintools-title hide">' + content + '</h4>')
        },
        item: function(type, name, id, content) {
          var item = '<div class="' + type + '-custom ' + type + '-' + content + '">' +
            '<input id="' + id + '" type="' + type + '" name="' + name + '" value="' + content + '">' +
            '<label for="' + id + '">' + content + '</label>' +
            '</div>';
          return $(item);
        },
        build: function($wrap, data, name, type, title) {
          if (title) {
            this.title(title).appendTo($wrap)
          }
          for (var i = 0; i < data.length; i++) {
            this.item(type, name, name + '-' + data[i], data[i]).appendTo($wrap);
          }
        },
        sidebarEvents: function(self) {
          var val = $(self).val();

          this.sidebarImprove(val);
          this.updateSetting('sidebar', val);
        },
        navbarEvents: function(self) {
          var val = $(self).val(),
            checked = $(self).prop('checked');

          this.navbarImprove(val, checked);

          if (val === 'inverse') {
            this.updateSetting('navbarInverse', checked.toString());
          } else {
            this.updateSetting('navbar', val);
          }
        },
        primaryEvents: function(self) {
          var val = $(self).val();

          this.primaryImprove(val);

          this.updateSetting('primary', val);
        },
        sidebarImprove: function(val) {
          if (val === 'dark') {
            this.$siteSidebar.removeClass('site-menubar-light');
          } else if (val === 'light') {
            this.$siteSidebar.addClass('site-menubar-' + val);
          }
        },
        navbarImprove: function(val, checked) {
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
        primaryImprove: function(val) {
          var $link = $('#skinStyle', $('head')),
            href = '/js/ext/assets/skins/' + val + '.css';
          if (val === 'primary') {
            $link.remove();
            return;
          }
          if ($link.length === 0) {
            $('head').append('<link id="skinStyle" href="' + href + '" rel="stylesheet" type="text/css"/>');
          } else {
            $link.attr('href', href);
          }
        },
        reset: function() {
          localStorage.clear();
          this.initLocalStorage();
        }
      };

      Skintools.init();
    });
  }

})(window, document);
