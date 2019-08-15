oc.Breadcrumb = u.BaseComponent.extend({
  init: function (options) {
    var self = this;

    var hash = window.location.hash;
    hash = hash.slice(2);
    try {
      var menus = parent.window.getBreadcrumb(hash);
      this.element.innerHTML = menus.join("&nbsp;&nbsp;/&nbsp;&nbsp;");
    } catch (e) {
      console.log(e);
    }
  }
});

if (u.compMgr) u.compMgr.regComp({
  comp: oc.Breadcrumb,
  compAsString: 'oc.Breadcrumb',
  css: 'oc-breadcrumb'
})

oc.LabelSourceAdapter = u.BaseAdapter.extend({
  mixins: [u.ValueMixin, u.EnableMixin, u.RequiredMixin],
  init: function () {
    var self = this;
    if (this.options['datasource']) {
      this.datasource = this.options['datasource'];
      if (this.options['defaultvalue']) {
        this.defaultvalue = this.options['defaultvalue'];
      }
    }
  },
  modelValueChange: function (value) {
    if (value === "" || value === null) value = this.defaultvalue;
    for (var i = 0; i < this.datasource.length; i++) {
      if (this.datasource[i].value == value) {
        this.element.innerHTML = this.datasource[i].name;
        break;
      }
    }
  }
})

if (u.compMgr) u.compMgr.addDataAdapter({
  adapter: oc.LabelSourceAdapter,
  name: 'oc-labelwithsource'
});

oc.LabelAdapter = u.BaseAdapter.extend({
  mixins: [u.ValueMixin, u.EnableMixin, u.RequiredMixin],
  init: function () {
    this.format = u.getFunction(this.viewModel, this.options['format'])
  },
  modelValueChange: function (value) {
    this.element.innerHTML = (typeof this.format == "function") ? this.format(value) : value;
  }
})

if (u.compMgr) u.compMgr.addDataAdapter({
  adapter: oc.LabelAdapter,
  name: 'oc-label'
});
oc.Tab = function Tab(tab, ctx) {

  if (tab && $(tab).attr("isUpgrade") != 1) {
    var rippleContainer = document.createElement('span');
    u.addClass(rippleContainer, ctx._CssClasses.U_RIPPLE_CONTAINER);
    u.addClass(rippleContainer, ctx._CssClasses.U_JS_RIPPLE_EFFECT);
    var ripple = document.createElement('span');
    u.addClass(ripple, ctx._CssClasses.U_RIPPLE);
    rippleContainer.appendChild(ripple);
    tab.appendChild(rippleContainer);

    tab.ripple = new u.Ripple(tab);

    tab.addEventListener('click', function (e) {
      u.stopEvent(e);
      var index = ctx.getIndex(tab);
      var f = ctx.triggerReturn('beforeTabChange', {
        tabDom: tab,
        index: index
      });
      if (!f) {
        return;
      }
      // e.preventDefault();
      var href = tab.href.split('#')[1];
      var panel = ctx.element.querySelector('#' + href);
      ctx.resetTabState_();
      ctx.resetPanelState_();
      u.addClass(tab, ctx._CssClasses.ACTIVE_CLASS);
      u.addClass(panel, ctx._CssClasses.ACTIVE_CLASS);

      ctx.trigger('tabchange', {
        tabDom: tab,
        index: index
      });
    });
    $(tab).attr("isUpgrade", 1)
  }
}
u.Tabs.prototype.updateTabs_ = function updateTabs_() {
  u.addClass(this.element, this._CssClasses.U_JS_RIPPLE_EFFECT_IGNORE_EVENTS);

  // Select element tabs, document panels
  this.tabs_ = this.element.querySelectorAll('.' + this._CssClasses.TAB_CLASS);
  this.panels_ = this.element.querySelectorAll('.' + this._CssClasses.PANEL_CLASS);

  // Create new tabs for each tab element
  for (var i = 0; i < this.tabs_.length; i++) {
    new oc.Tab(this.tabs_[i], this);
  }
  u.addClass(this.element, this._CssClasses.UPGRADED_CLASS);
}