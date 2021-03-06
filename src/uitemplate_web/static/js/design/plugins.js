(function(d) {
    function e(a) {
        var b = a || window.event
          , c = [].slice.call(arguments, 1)
          , f = 0
          , e = 0
          , g = 0;
        a = d.event.fix(b);
        a.type = "mousewheel";
        b.wheelDelta && (f = b.wheelDelta / 120);
        b.detail && (f = -b.detail / 3);
        g = f;
        void 0 !== b.axis && b.axis === b.HORIZONTAL_AXIS && (g = 0,
        e = -1 * f);
        void 0 !== b.wheelDeltaY && (g = b.wheelDeltaY / 120);
        void 0 !== b.wheelDeltaX && (e = -1 * b.wheelDeltaX / 120);
        c.unshift(a, f, e, g);
        return (d.event.dispatch || d.event.handle).apply(this, c)
    }
    var c = ["DOMMouseScroll", "mousewheel"];
    if (d.event.fixHooks)
        for (var h = c.length; h; )
            d.event.fixHooks[c[--h]] = 
            d.event.mouseHooks;
    d.event.special.mousewheel = {
        setup: function() {
            if (this.addEventListener)
                for (var a = c.length; a; )
                    this.addEventListener(c[--a], e, !1);
            else
                this.onmousewheel = e
        },
        teardown: function() {
            if (this.removeEventListener)
                for (var a = c.length; a; )
                    this.removeEventListener(c[--a], e, !1);
            else
                this.onmousewheel = null 
        }
    };
    d.fn.extend({
        mousewheel: function(a) {
            return a ? this.bind("mousewheel", a) : this.trigger("mousewheel")
        },
        unmousewheel: function(a) {
            return this.unbind("mousewheel", a)
        }
    })
})(jQuery);
(function(d, t, C, J) {
    var I = {
        setWidth: !1,
        setHeight: !1,
        setTop: 0,
        setLeft: 0,
        axis: "y",
        scrollbarPosition: "inside",
        scrollInertia: 0,
        autoDraggerLength: !0,
        autoHideScrollbar: !1,
        autoExpandScrollbar: !1,
        alwaysShowScrollbar: 0,
        snapAmount: null ,
        snapOffset: 0,
        mouseWheel: {
            enable: !0,
            scrollAmount: "120",
            axis: "y",
            preventDefault: !1,
            deltaFactor: "auto",
            normalizeDelta: !0,
            invert: !1,
            disableOver: ["select", "option", "keygen", "datalist", "textarea"]
        },
        scrollButtons: {
            enable: !1,
            scrollType: "stepless",
            scrollAmount: "auto"
        },
        keyboard: {
            enable: !0,
            scrollType: "stepless",
            scrollAmount: "auto"
        },
        contentTouchScroll: 25,
        advanced: {
            autoExpandHorizontalScroll: !1,
            autoScrollOnFocus: "input,textarea,select,button,datalist,keygen,a[tabindex],area,object,[contenteditable\x3d'true']",
            updateOnContentResize: !0,
            updateOnImageLoad: !0,
            updateOnSelectorChange: !1
        },
        theme: "dark",
        callbacks: {
            onScrollStart: !1,
            onScroll: !1,
            onTotalScroll: !1,
            onTotalScrollBack: !1,
            whileScrolling: !1,
            onTotalScrollOffset: 0,
            onTotalScrollBackOffset: 0,
            alwaysTriggerOffsets: !0
        },
        live: !1,
        liveSelector: null 
    }
      , 
    K = 0
      , E = {}
      , F = function(a) {
        E[a] && (clearTimeout(E[a]),
        g._delete.call(null , E[a]))
    }
      , D = t.attachEvent && !t.addEventListener ? 1 : 0
      , w = !1
      , B = {
        init: function(a) {
            a = d.extend(!0, {}, I, a);
            var c = g._selector.call(this);
            if (a.live) {
                var b = a.liveSelector || this.selector || ".mCustomScrollbar"
                  , e = d(b);
                if ("off" === a.live) {
                    F(b);
                    return
                }
                E[b] = setTimeout(function() {
                    e.mCustomScrollbar(a);
                    "once" === a.live && e.length && F(b)
                }, 500)
            } else
                F(b);
            a.setWidth = a.set_width ? a.set_width : a.setWidth;
            a.setHeight = a.set_height ? a.set_height : a.setHeight;
            a.axis = a.horizontalScroll ? 
            "x" : g._findAxis.call(null , a.axis);
            a.scrollInertia = 17 > a.scrollInertia ? 17 : a.scrollInertia;
            "object" !== typeof a.mouseWheel && 1 == a.mouseWheel && (a.mouseWheel = {
                enable: !0,
                scrollAmount: "auto",
                axis: "y",
                preventDefault: !1,
                deltaFactor: "auto",
                normalizeDelta: !1,
                invert: !1
            });
            a.mouseWheel.scrollAmount = a.mouseWheelPixels ? a.mouseWheelPixels : a.mouseWheel.scrollAmount;
            a.mouseWheel.normalizeDelta = a.advanced.normalizeMouseWheelDelta ? a.advanced.normalizeMouseWheelDelta : a.mouseWheel.normalizeDelta;
            a.scrollButtons.scrollType = 
            g._findScrollButtonsType.call(null , a.scrollButtons.scrollType);
            g._theme.call(null , a);
            return d(c).each(function() {
                var b = d(this);
                if (!b.data("mCS")) {
                    b.data("mCS", {
                        idx: ++K,
                        opt: a,
                        scrollRatio: {
                            y: null ,
                            x: null 
                        },
                        overflowed: null ,
                        bindEvents: !1,
                        tweenRunning: !1,
                        sequential: {},
                        langDir: b.css("direction"),
                        cbOffsets: null ,
                        trigger: null 
                    });
                    var c = b.data("mCS").opt
                      , e = b.data("mcs-axis")
                      , m = b.data("mcs-scrollbar-position")
                      , l = b.data("mcs-theme");
                    e && (c.axis = e);
                    m && (c.scrollbarPosition = m);
                    l && (c.theme = l,
                    g._theme.call(null , c));
                    g._pluginMarkup.call(this);
                    B.update.call(null , b)
                }
            })
        },
        update: function(a) {
            a = a || g._selector.call(this);
            return d(a).each(function() {
                var a = d(this);
                if (a.data("mCS")) {
                    var b = a.data("mCS")
                      , e = b.opt
                      , f = d("#mCSB_" + b.idx + "_container")
                      , k = [d("#mCSB_" + b.idx + "_dragger_vertical"), d("#mCSB_" + b.idx + "_dragger_horizontal")];
                    f.length && (b.tweenRunning && g._stop.call(null , a),
                    a.hasClass("mCS_disabled") && a.removeClass("mCS_disabled"),
                    a.hasClass("mCS_destroyed") && a.removeClass("mCS_destroyed"),
                    g._maxHeight.call(this),
                    g._expandContentHorizontally.call(this),
                    "y" === e.axis || e.advanced.autoExpandHorizontalScroll || f.css("width", g._contentWidth(f.children())),
                    b.overflowed = g._overflowed.call(this),
                    g._scrollbarVisibility.call(this),
                    e.autoDraggerLength && g._setDraggerLength.call(this),
                    g._scrollRatio.call(this),
                    g._bindEvents.call(this),
                    f = [Math.abs(f[0].offsetTop), Math.abs(f[0].offsetLeft)],
                    "x" !== e.axis && (b.overflowed[0] ? k[0].height() > k[0].parent().height() ? g._resetContentPosition.call(this) : g._scrollTo.call(this, a, f[0].toString(), {
                        dir: "y",
                        dur: 0,
                        overwrite: "none"
                    }) : 
                    (g._resetContentPosition.call(this),
                    "y" === e.axis ? g._unbindEvents.call(this) : "yx" === e.axis && b.overflowed[1] && g._scrollTo.call(this, a, f[1].toString(), {
                        dir: "x",
                        dur: 0,
                        overwrite: "none"
                    }))),
                    "y" !== e.axis && (b.overflowed[1] ? k[1].width() > k[1].parent().width() ? g._resetContentPosition.call(this) : g._scrollTo.call(this, a, f[1].toString(), {
                        dir: "x",
                        dur: 0,
                        overwrite: "none"
                    }) : (g._resetContentPosition.call(this),
                    "x" === e.axis ? g._unbindEvents.call(this) : "yx" === e.axis && b.overflowed[0] && g._scrollTo.call(this, a, f[0].toString(), 
                    {
                        dir: "y",
                        dur: 0,
                        overwrite: "none"
                    }))),
                    g._autoUpdate.call(this))
                }
            })
        },
        scrollTo: function(a, c) {
            if ("undefined" != typeof a && null  != a) {
                var b = g._selector.call(this);
                return d(b).each(function() {
                    var b = d(this);
                    if (b.data("mCS")) {
                        var f = b.data("mCS")
                          , k = f.opt
                          , h = d.extend(!0, {}, {
                            trigger: "external",
                            scrollInertia: k.scrollInertia,
                            scrollEasing: "mcsEaseInOut",
                            moveDragger: !1,
                            callbacks: !0,
                            onStart: !0,
                            onUpdate: !0,
                            onComplete: !0
                        }, c)
                          , m = g._arr.call(this, a)
                          , l = 17 > h.scrollInertia ? 17 : h.scrollInertia;
                        m[0] = g._to.call(this, m[0], "y");
                        m[1] = 
                        g._to.call(this, m[1], "x");
                        h.moveDragger && (m[0] *= f.scrollRatio.y,
                        m[1] *= f.scrollRatio.x);
                        h.dur = l;
                        setTimeout(function() {
                            null  !== m[0] && "undefined" !== typeof m[0] && "x" !== k.axis && f.overflowed[0] && (h.dir = "y",
                            h.overwrite = "all",
                            g._scrollTo.call(this, b, m[0].toString(), h));
                            null  !== m[1] && "undefined" !== typeof m[1] && "y" !== k.axis && f.overflowed[1] && (h.dir = "x",
                            h.overwrite = "none",
                            g._scrollTo.call(this, b, m[1].toString(), h))
                        }, 60)
                    }
                })
            }
        },
        stop: function() {
            var a = g._selector.call(this);
            return d(a).each(function() {
                var a = d(this);
                a.data("mCS") && g._stop.call(null , a)
            })
        },
        disable: function(a) {
            var c = g._selector.call(this);
            return d(c).each(function() {
                var b = d(this);
                b.data("mCS") && (b.data("mCS"),
                g._autoUpdate.call(this, "remove"),
                g._unbindEvents.call(this),
                a && g._resetContentPosition.call(this),
                g._scrollbarVisibility.call(this, !0),
                b.addClass("mCS_disabled"))
            })
        },
        destroy: function() {
            var a = g._selector.call(this);
            return d(a).each(function() {
                var c = d(this);
                if (c.data("mCS")) {
                    var b = c.data("mCS")
                      , e = b.opt
                      , f = d("#mCSB_" + b.idx)
                      , k = d("#mCSB_" + b.idx + 
                    "_container")
                      , h = d(".mCSB_" + b.idx + "_scrollbar");
                    e.live && F(a);
                    g._autoUpdate.call(this, "remove");
                    g._unbindEvents.call(this);
                    g._resetContentPosition.call(this);
                    c.removeData("mCS");
                    g._delete.call(null , this.mcs);
                    h.remove();
                    f.replaceWith(k.contents());
                    c.removeClass("mCustomScrollbar _mCS_" + b.idx + " mCS-autoHide mCS-dir-rtl mCS_no_scrollbar mCS_disabled").addClass("mCS_destroyed")
                }
            })
        }
    }
      , g = {
        _selector: function() {
            return "object" !== typeof d(this) || 1 > d(this).length ? ".mCustomScrollbar" : this
        },
        _theme: function(a) {
            a.autoDraggerLength = 
            -1 < d.inArray(a.theme, ["rounded", "rounded-dark", "rounded-dots", "rounded-dots-dark"]) ? !1 : a.autoDraggerLength;
            a.autoExpandScrollbar = -1 < d.inArray(a.theme, "rounded-dots rounded-dots-dark 3d 3d-dark 3d-thick 3d-thick-dark inset inset-dark inset-2 inset-2-dark inset-3 inset-3-dark".split(" ")) ? !1 : a.autoExpandScrollbar;
            a.scrollButtons.enable = -1 < d.inArray(a.theme, ["minimal", "minimal-dark"]) ? !1 : a.scrollButtons.enable;
            a.autoHideScrollbar = -1 < d.inArray(a.theme, ["minimal", "minimal-dark"]) ? !0 : a.autoHideScrollbar;
            a.scrollbarPosition = -1 < d.inArray(a.theme, ["minimal", "minimal-dark"]) ? "outside" : a.scrollbarPosition
        },
        _findAxis: function(a) {
            return "yx" === a || "xy" === a || "auto" === a ? "yx" : "x" === a || "horizontal" === a ? "x" : "y"
        },
        _findScrollButtonsType: function(a) {
            return "stepped" === a || "pixels" === a || "step" === a || "click" === a ? "stepped" : "stepless"
        },
        _pluginMarkup: function() {
            var a = d(this)
              , c = a.data("mCS")
              , b = c.opt
              , e = b.autoExpandScrollbar ? " mCSB_scrollTools_onDrag_expand" : ""
              , e = ["\x3cdiv id\x3d'mCSB_" + c.idx + "_scrollbar_vertical' class\x3d'mCSB_scrollTools mCSB_" + 
            c.idx + "_scrollbar mCS-" + b.theme + " mCSB_scrollTools_vertical" + e + "'\x3e\x3cdiv class\x3d'mCSB_draggerContainer'\x3e\x3cdiv id\x3d'mCSB_" + c.idx + "_dragger_vertical' class\x3d'mCSB_dragger' style\x3d'position:absolute;' oncontextmenu\x3d'return false;'\x3e\x3cdiv class\x3d'mCSB_dragger_bar' /\x3e\x3c/div\x3e\x3cdiv class\x3d'mCSB_draggerRail' /\x3e\x3c/div\x3e\x3c/div\x3e", "\x3cdiv id\x3d'mCSB_" + c.idx + "_scrollbar_horizontal' class\x3d'mCSB_scrollTools mCSB_" + c.idx + "_scrollbar mCS-" + b.theme + " mCSB_scrollTools_horizontal" + 
            e + "'\x3e\x3cdiv class\x3d'mCSB_draggerContainer'\x3e\x3cdiv id\x3d'mCSB_" + c.idx + "_dragger_horizontal' class\x3d'mCSB_dragger' style\x3d'position:absolute;' oncontextmenu\x3d'return false;'\x3e\x3cdiv class\x3d'mCSB_dragger_bar' /\x3e\x3c/div\x3e\x3cdiv class\x3d'mCSB_draggerRail' /\x3e\x3c/div\x3e\x3c/div\x3e"]
              , f = "yx" === b.axis ? "mCSB_vertical_horizontal" : "x" === b.axis ? "mCSB_horizontal" : "mCSB_vertical"
              , e = "yx" === b.axis ? e[0] + e[1] : "x" === b.axis ? e[1] : e[0]
              , k = "yx" === b.axis ? "\x3cdiv id\x3d'mCSB_" + c.idx + "_container_wrapper' class\x3d'mCSB_container_wrapper' /\x3e" : 
            ""
              , h = b.autoHideScrollbar ? " mCS-autoHide" : ""
              , m = "x" !== b.axis && "rtl" === c.langDir ? " mCS-dir-rtl" : "";
            b.setWidth && a.css("width", b.setWidth);
            b.setHeight && a.css("height", b.setHeight);
            b.setLeft = "y" !== b.axis && "rtl" === c.langDir ? "989999px" : b.setLeft;
            a.addClass("mCustomScrollbar _mCS_" + c.idx + h + m).wrapInner("\x3cdiv id\x3d'mCSB_" + c.idx + "' class\x3d'mCustomScrollBox mCS-" + b.theme + " " + f + "'\x3e\x3cdiv id\x3d'mCSB_" + c.idx + "_container' class\x3d'mCSB_container' style\x3d'position:relative; top:" + b.setTop + "; left:" + 
            b.setLeft + ";' dir\x3d" + c.langDir + " /\x3e\x3c/div\x3e");
            f = d("#mCSB_" + c.idx);
            h = d("#mCSB_" + c.idx + "_container");
            "y" === b.axis || b.advanced.autoExpandHorizontalScroll || h.css("width", g._contentWidth(h.children()));
            "outside" === b.scrollbarPosition ? ("static" === a.css("position") && a.css("position", "relative"),
            a.css("overflow", "visible"),
            f.addClass("mCSB_outside").after(e)) : (f.addClass("mCSB_inside").append(e),
            h.wrap(k));
            g._scrollButtons.call(this);
            a = [d("#mCSB_" + c.idx + "_dragger_vertical"), d("#mCSB_" + c.idx + "_dragger_horizontal")];
            a[0].css("min-height", a[0].height());
            a[1].css("min-width", a[1].width())
        },
        _contentWidth: function(a) {
            return Math.max.apply(Math, a.map(function() {
                return d(this).outerWidth(!0)
            }).get())
        },
        _expandContentHorizontally: function() {
            var a = d(this).data("mCS")
              , c = a.opt
              , a = d("#mCSB_" + a.idx + "_container");
            c.advanced.autoExpandHorizontalScroll && "y" !== c.axis && a.css({
                position: "absolute",
                width: "auto"
            }).wrap("\x3cdiv class\x3d'mCSB_h_wrapper' style\x3d'position:relative; left:0; width:999999px;' /\x3e").css({
                width: Math.ceil(a[0].getBoundingClientRect().right + 
                .4) - Math.floor(a[0].getBoundingClientRect().left),
                position: "relative"
            }).unwrap()
        },
        _scrollButtons: function() {
            var a = d(this).data("mCS")
              , c = a.opt
              , a = d(".mCSB_" + a.idx + "_scrollbar:first")
              , b = ["\x3ca href\x3d'#' class\x3d'mCSB_buttonUp' oncontextmenu\x3d'return false;' /\x3e", "\x3ca href\x3d'#' class\x3d'mCSB_buttonDown' oncontextmenu\x3d'return false;' /\x3e", "\x3ca href\x3d'#' class\x3d'mCSB_buttonLeft' oncontextmenu\x3d'return false;' /\x3e", "\x3ca href\x3d'#' class\x3d'mCSB_buttonRight' oncontextmenu\x3d'return false;' /\x3e"]
              , 
            b = ["x" === c.axis ? b[2] : b[0], "x" === c.axis ? b[3] : b[1], b[2], b[3]];
            c.scrollButtons.enable && a.prepend(b[0]).append(b[1]).next(".mCSB_scrollTools").prepend(b[2]).append(b[3])
        },
        _maxHeight: function() {
            var a = d(this)
              , c = a.data("mCS")
              , c = d("#mCSB_" + c.idx)
              , b = a.css("max-height")
              , e = -1 !== b.indexOf("%")
              , f = a.css("box-sizing");
            "none" !== b && (b = e ? a.parent().height() * parseInt(b) / 100 : parseInt(b),
            "border-box" === f && (b -= a.innerHeight() - a.height() + (a.outerHeight() - a.innerHeight())),
            c.css("max-height", Math.round(b)))
        },
        _setDraggerLength: function() {
            var a = 
            d(this).data("mCS")
              , c = d("#mCSB_" + a.idx)
              , b = d("#mCSB_" + a.idx + "_container")
              , a = [d("#mCSB_" + a.idx + "_dragger_vertical"), d("#mCSB_" + a.idx + "_dragger_horizontal")]
              , c = [c.height() / b.outerHeight(!1), c.width() / b.outerWidth(!1)]
              , c = [parseInt(a[0].css("min-height")), Math.round(c[0] * a[0].parent().height()), parseInt(a[1].css("min-width")), Math.round(c[1] * a[1].parent().width())]
              , b = D && c[3] < c[2] ? c[2] : c[3];
            a[0].css({
                height: D && c[1] < c[0] ? c[0] : c[1],
                "max-height": a[0].parent().height() - 10
            }).find(".mCSB_dragger_bar").css({
                "line-height": c[0] + 
                "px"
            });
            a[1].css({
                width: b,
                "max-width": a[1].parent().width() - 10
            })
        },
        _scrollRatio: function() {
            var a = d(this).data("mCS")
              , c = d("#mCSB_" + a.idx)
              , b = d("#mCSB_" + a.idx + "_container")
              , e = [d("#mCSB_" + a.idx + "_dragger_vertical"), d("#mCSB_" + a.idx + "_dragger_horizontal")]
              , c = [b.outerHeight(!1) - c.height(), b.outerWidth(!1) - c.width()]
              , e = [c[0] / (e[0].parent().height() - e[0].height()), c[1] / (e[1].parent().width() - e[1].width())];
            a.scrollRatio = {
                y: e[0],
                x: e[1]
            }
        },
        _onDragClasses: function(a, c, b) {
            b = b ? "mCSB_dragger_onDrag_expanded" : "";
            var d = 
            ["mCSB_dragger_onDrag", "mCSB_scrollTools_onDrag"]
              , f = a.closest(".mCSB_scrollTools");
            "active" === c ? (a.toggleClass(d[0] + " " + b),
            f.toggleClass(d[1]),
            a[0]._draggable = a[0]._draggable ? 0 : 1) : a[0]._draggable || ("hide" === c ? (a.removeClass(d[0]),
            f.removeClass(d[1])) : (a.addClass(d[0]),
            f.addClass(d[1])))
        },
        _overflowed: function() {
            var a = d(this).data("mCS")
              , c = d("#mCSB_" + a.idx)
              , b = d("#mCSB_" + a.idx + "_container")
              , e = null  == a.overflowed ? b.height() : b.outerHeight(!1)
              , a = null  == a.overflowed ? b.width() : b.outerWidth(!1);
            return [e > c.height(), 
            a > c.width()]
        },
        _resetContentPosition: function() {
            var a = d(this)
              , c = a.data("mCS")
              , b = c.opt
              , e = d("#mCSB_" + c.idx)
              , f = d("#mCSB_" + c.idx + "_container")
              , k = [d("#mCSB_" + c.idx + "_dragger_vertical"), d("#mCSB_" + c.idx + "_dragger_horizontal")];
            g._stop(a);
            ("x" !== b.axis && !c.overflowed[0] || "y" === b.axis && c.overflowed[0]) && k[0].add(f).css("top", 0);
            if ("y" !== b.axis && !c.overflowed[1] || "x" === b.axis && c.overflowed[1])
                a = dx = 0,
                "rtl" === c.langDir && (a = e.width() - f.outerWidth(!1),
                dx = Math.abs(a / c.scrollRatio.x)),
                f.css("left", a),
                k[1].css("left", 
                dx)
        },
        _bindEvents: function() {
            var a = d(this)
              , c = a.data("mCS")
              , b = c.opt;
            if (!c.bindEvents) {
                g._draggable.call(this);
                b.contentTouchScroll && g._contentDraggable.call(this);
                if (b.mouseWheel.enable) {
                    var e = function() {
                        f = setTimeout(function() {
                            d.event.special.mousewheel ? (clearTimeout(f),
                            g._mousewheel.call(a[0])) : e()
                        }, 1E3)
                    }
                    , f;
                    e()
                }
                g._draggerRail.call(this);
                g._wrapperScroll.call(this);
                b.advanced.autoScrollOnFocus && g._focus.call(this);
                b.scrollButtons.enable && g._buttons.call(this);
                b.keyboard.enable && g._keyboard.call(this);
                c.bindEvents = !0
            }
        },
        _unbindEvents: function() {
            var a = d(this)
              , c = a.data("mCS")
              , b = "mCS_" + c.idx
              , e = ".mCSB_" + c.idx + "_scrollbar"
              , e = d("#mCSB_" + c.idx + ",#mCSB_" + c.idx + "_container,#mCSB_" + c.idx + "_container_wrapper," + e + " .mCSB_draggerContainer,#mCSB_" + c.idx + "_dragger_vertical,#mCSB_" + c.idx + "_dragger_horizontal," + e + "\x3ea")
              , f = d("#mCSB_" + c.idx + "_container");
            c.bindEvents && (d(C).unbind("." + b),
            e.each(function() {
                d(this).unbind("." + b)
            }),
            clearTimeout(a[0]._focusTimeout),
            g._delete.call(null , a[0]._focusTimeout),
            clearTimeout(c.sequential.step),
            g._delete.call(null , c.sequential.step),
            clearTimeout(f[0].onCompleteTimeout),
            g._delete.call(null , f[0].onCompleteTimeout),
            c.bindEvents = !1)
        },
        _scrollbarVisibility: function(a) {
            var c = d(this)
              , b = c.data("mCS")
              , e = b.opt
              , f = d("#mCSB_" + b.idx + "_container_wrapper")
              , f = f.length ? f : d("#mCSB_" + b.idx + "_container")
              , g = [d("#mCSB_" + b.idx + "_scrollbar_vertical"), d("#mCSB_" + b.idx + "_scrollbar_horizontal")]
              , h = [g[0].find(".mCSB_dragger"), g[1].find(".mCSB_dragger")];
            "x" !== e.axis && (b.overflowed[0] && !a ? (g[0].add(h[0]).add(g[0].children("a")).css("display", 
            "block"),
            f.removeClass("mCS_no_scrollbar_y mCS_y_hidden")) : (e.alwaysShowScrollbar ? (2 !== e.alwaysShowScrollbar && h[0].add(g[0].children("a")).css("display", "none"),
            f.removeClass("mCS_y_hidden")) : (g[0].css("display", "none"),
            f.addClass("mCS_y_hidden")),
            f.addClass("mCS_no_scrollbar_y")));
            "y" !== e.axis && (b.overflowed[1] && !a ? (g[1].add(h[1]).add(g[1].children("a")).css("display", "block"),
            f.removeClass("mCS_no_scrollbar_x mCS_x_hidden")) : (e.alwaysShowScrollbar ? (2 !== e.alwaysShowScrollbar && h[1].add(g[1].children("a")).css("display", 
            "none"),
            f.removeClass("mCS_x_hidden")) : (g[1].css("display", "none"),
            f.addClass("mCS_x_hidden")),
            f.addClass("mCS_no_scrollbar_x")));
            b.overflowed[0] || b.overflowed[1] ? c.removeClass("mCS_no_scrollbar") : c.addClass("mCS_no_scrollbar")
        },
        _coordinates: function(a) {
            switch (a.type) {
            case "pointerdown":
            case "MSPointerDown":
            case "pointermove":
            case "MSPointerMove":
            case "pointerup":
            case "MSPointerUp":
                return [a.originalEvent.pageY, a.originalEvent.pageX];
            case "touchstart":
            case "touchmove":
            case "touchend":
                return a = a.originalEvent.touches[0] || 
                a.originalEvent.changedTouches[0],
                [a.pageY, a.pageX];
            default:
                return [a.pageY, a.pageX]
            }
        },
        _draggable: function() {
            function a(a) {
                var b = m.find("iframe");
                b.length && b.css("pointer-events", a ? "auto" : "none")
            }
            function c(a, c, d, k) {
                m[0].idleTimer = 233 > f.scrollInertia ? 250 : 0;
                if (n.attr("id") === h[1]) {
                    var l = "x";
                    a = (n[0].offsetLeft - c + k) * e.scrollRatio.x
                } else
                    l = "y",
                    a = (n[0].offsetTop - a + d) * e.scrollRatio.y;
                g._scrollTo(b, a.toString(), {
                    dir: l,
                    drag: !0
                })
            }
            var b = d(this), e = b.data("mCS"), f = e.opt, k = "mCS_" + e.idx, h = ["mCSB_" + e.idx + "_dragger_vertical", 
            "mCSB_" + e.idx + "_dragger_horizontal"], m = d("#mCSB_" + e.idx + "_container"), l = d("#" + h[0] + ",#" + h[1]), n, p, x;
            l.bind("mousedown." + k + " touchstart." + k + " pointerdown." + k + " MSPointerDown." + k, function(c) {
                c.stopImmediatePropagation();
                c.preventDefault();
                if (g._mouseBtnLeft(c)) {
                    w = !0;
                    D && (C.onselectstart = function() {
                        return !1
                    }
                    );
                    a(!1);
                    g._stop(b);
                    n = d(this);
                    var e = n.offset()
                      , h = g._coordinates(c)[0] - e.top;
                    c = g._coordinates(c)[1] - e.left;
                    var k = n.height() + e.top
                      , e = n.width() + e.left;
                    h < k && 0 < h && c < e && 0 < c && (p = h,
                    x = c);
                    g._onDragClasses(n, 
                    "active", f.autoExpandScrollbar)
                }
            }).bind("touchmove." + k, function(a) {
                a.stopImmediatePropagation();
                a.preventDefault();
                var b = n.offset()
                  , d = g._coordinates(a)[0] - b.top;
                a = g._coordinates(a)[1] - b.left;
                c(p, x, d, a)
            });
            d(C).bind("mousemove." + k + " pointermove." + k + " MSPointerMove." + k, function(a) {
                if (n) {
                    var b = n.offset()
                      , d = g._coordinates(a)[0] - b.top;
                    a = g._coordinates(a)[1] - b.left;
                    p !== d && c(p, x, d, a)
                }
            }).add(l).bind("mouseup." + k + " touchend." + k + " pointerup." + k + " MSPointerUp." + k, function(b) {
                n && (g._onDragClasses(n, "active", f.autoExpandScrollbar),
                n = null );
                w = !1;
                D && (C.onselectstart = null );
                a(!0)
            })
        },
        _contentDraggable: function() {
            function a(a, b) {
                var c = [1.5 * b, 2 * b, b / 1.5, b / 2];
                return 90 < a ? 4 < b ? c[0] : c[3] : 60 < a ? 3 < b ? c[3] : c[2] : 30 < a ? 8 < b ? c[1] : 6 < b ? c[0] : 4 < b ? b : c[2] : 8 < b ? b : c[3]
            }
            function c(a, c, d, e, f, h) {
                a && g._scrollTo(b, a.toString(), {
                    dur: c,
                    scrollEasing: d,
                    dir: e,
                    overwrite: f,
                    drag: h
                })
            }
            var b = d(this), e = b.data("mCS"), f = e.opt, k = "mCS_" + e.idx, h = d("#mCSB_" + e.idx), m = d("#mCSB_" + e.idx + "_container"), l = [d("#mCSB_" + e.idx + "_dragger_vertical"), d("#mCSB_" + e.idx + "_dragger_horizontal")], 
            n, p, x, v, r = [], u = [], q, s, t, y, z, A, G, H = "yx" === f.axis ? "none" : "all";
            m.bind("touchstart." + k + " pointerdown." + k + " MSPointerDown." + k, function(a) {
                if (g._pointerTouch(a) && !w) {
                    var b = m.offset();
                    n = g._coordinates(a)[0] - b.top;
                    p = g._coordinates(a)[1] - b.left
                }
            }).bind("touchmove." + k + " pointermove." + k + " MSPointerMove." + k, function(a) {
                if (g._pointerTouch(a) && !w) {
                    a.stopImmediatePropagation();
                    s = g._getTime();
                    var b = h.offset()
                      , d = g._coordinates(a)[0] - b.top
                      , b = g._coordinates(a)[1] - b.left;
                    r.push(d);
                    u.push(b);
                    if (e.overflowed[0])
                        var k = 
                        l[0].parent().height() - l[0].height()
                          , k = 0 < n - d && d - n > -(k * e.scrollRatio.y);
                    if (e.overflowed[1])
                        var z = l[1].parent().width() - l[1].width()
                          , z = 0 < p - b && b - p > -(z * e.scrollRatio.x);
                    (k || z) && a.preventDefault();
                    A = "yx" === f.axis ? [n - d, p - b] : "x" === f.axis ? [null , p - b] : [n - d, null ];
                    m[0].idleTimer = 250;
                    e.overflowed[0] && c(A[0], 0, "mcsLinearOut", "y", "all", !0);
                    e.overflowed[1] && c(A[1], 0, "mcsLinearOut", "x", H, !0)
                }
            });
            h.bind("touchstart." + k + " pointerdown." + k + " MSPointerDown." + k, function(a) {
                if (g._pointerTouch(a) && !w) {
                    a.stopImmediatePropagation();
                    g._stop(b);
                    q = g._getTime();
                    var c = h.offset();
                    x = g._coordinates(a)[0] - c.top;
                    v = g._coordinates(a)[1] - c.left;
                    r = [];
                    u = []
                }
            }).bind("touchend." + k + " pointerup." + k + " MSPointerUp." + k, function(b) {
                if (g._pointerTouch(b) && !w) {
                    b.stopImmediatePropagation();
                    t = g._getTime();
                    var d = h.offset()
                      , k = g._coordinates(b)[0] - d.top
                      , d = g._coordinates(b)[1] - d.left;
                    if (!(30 < t - s)) {
                        z = 1E3 / (t - q);
                        var l = (b = 2.5 > z) ? [r[r.length - 2], u[u.length - 2]] : [0, 0];
                        y = b ? [k - l[0], d - l[1]] : [k - x, d - v];
                        k = [Math.abs(y[0]), Math.abs(y[1])];
                        z = b ? [Math.abs(y[0] / 4), Math.abs(y[1] / 
                        4)] : [z, z];
                        b = [Math.abs(m[0].offsetTop) - y[0] * a(k[0] / z[0], z[0]), Math.abs(m[0].offsetLeft) - y[1] * a(k[1] / z[1], z[1])];
                        A = "yx" === f.axis ? [b[0], b[1]] : "x" === f.axis ? [null , b[1]] : [b[0], null ];
                        G = [4 * k[0] + f.scrollInertia, 4 * k[1] + f.scrollInertia];
                        b = parseInt(f.contentTouchScroll) || 0;
                        A[0] = k[0] > b ? A[0] : 0;
                        A[1] = k[1] > b ? A[1] : 0;
                        e.overflowed[0] && c(A[0], G[0], "mcsEaseOut", "y", H, !1);
                        e.overflowed[1] && c(A[1], G[1], "mcsEaseOut", "x", H, !1)
                    }
                }
            })
        },
        _mousewheel: function() {
            var a = d(this)
              , c = a.data("mCS");
            if (c) {
                var b = c.opt
                  , e = "mCS_" + c.idx
                  , f = d("#mCSB_" + 
                c.idx)
                  , k = [d("#mCSB_" + c.idx + "_dragger_vertical"), d("#mCSB_" + c.idx + "_dragger_horizontal")];
                f.bind("mousewheel." + e, function(e, m) {
                    g._stop(a);
                    if (!g._disableMousewheel(a, e.target)) {
                        var l = "auto" !== b.mouseWheel.deltaFactor ? parseInt(b.mouseWheel.deltaFactor) : D && 100 > e.deltaFactor ? 100 : 40 > e.deltaFactor ? 40 : e.deltaFactor || 100;
                        if ("x" === b.axis || "x" === b.mouseWheel.axis)
                            var n = "x"
                              , l = [Math.round(l * c.scrollRatio.x), parseInt(b.mouseWheel.scrollAmount)]
                              , l = "auto" !== b.mouseWheel.scrollAmount ? l[1] : l[0] >= f.width() ? .9 * f.width() : 
                            l[0]
                              , p = Math.abs(d("#mCSB_" + c.idx + "_container")[0].offsetLeft)
                              , x = k[1][0].offsetLeft
                              , v = k[1].parent().width() - k[1].width()
                              , r = e.deltaX || e.deltaY || m;
                        else
                            n = "y",
                            l = [Math.round(l * c.scrollRatio.y), parseInt(b.mouseWheel.scrollAmount)],
                            l = "auto" !== b.mouseWheel.scrollAmount ? l[1] : l[0] >= f.height() ? .9 * f.height() : l[0],
                            p = Math.abs(d("#mCSB_" + c.idx + "_container")[0].offsetTop),
                            x = k[0][0].offsetTop,
                            v = k[0].parent().height() - k[0].height(),
                            r = e.deltaY || m;
                        if (("y" !== n || c.overflowed[0]) && ("x" !== n || c.overflowed[1])) {
                            b.mouseWheel.invert && 
                            (r = -r);
                            b.mouseWheel.normalizeDelta && (r = 0 > r ? -1 : 1);
                            if (0 < r && 0 !== x || 0 > r && x !== v || b.mouseWheel.preventDefault)
                                e.stopImmediatePropagation(),
                                e.preventDefault();
                            g._scrollTo(a, (p - r * l).toString(), {
                                dir: n
                            })
                        }
                    }
                })
            }
        },
        _disableMousewheel: function(a, c) {
            var b = c.nodeName.toLowerCase()
              , e = a.data("mCS").opt.mouseWheel.disableOver
              , g = ["select", "textarea"];
            return -1 < d.inArray(b, e) && !(-1 < d.inArray(b, g) && !d(c).is(":focus"))
        },
        _draggerRail: function() {
            var a = d(this)
              , c = a.data("mCS")
              , b = "mCS_" + c.idx
              , e = d("#mCSB_" + c.idx + "_container")
              , f = 
            e.parent();
            d(".mCSB_" + c.idx + "_scrollbar .mCSB_draggerContainer").bind("touchstart." + b + " pointerdown." + b + " MSPointerDown." + b, function(a) {
                w = !0
            }).bind("touchend." + b + " pointerup." + b + " MSPointerUp." + b, function(a) {
                w = !1
            }).bind("click." + b, function(b) {
                if (d(b.target).hasClass("mCSB_draggerContainer") || d(b.target).hasClass("mCSB_draggerRail")) {
                    g._stop(a);
                    var h = d(this)
                      , m = h.find(".mCSB_dragger");
                    if (0 < h.parent(".mCSB_scrollTools_horizontal").length) {
                        if (!c.overflowed[1])
                            return;
                        h = "x";
                        b = b.pageX > m.offset().left ? -1 : 
                        1;
                        b = Math.abs(e[0].offsetLeft) - .9 * b * f.width()
                    } else {
                        if (!c.overflowed[0])
                            return;
                        h = "y";
                        b = b.pageY > m.offset().top ? -1 : 1;
                        b = Math.abs(e[0].offsetTop) - .9 * b * f.height()
                    }
                    g._scrollTo(a, b.toString(), {
                        dir: h,
                        scrollEasing: "mcsEaseInOut"
                    })
                }
            })
        },
        _focus: function() {
            var a = d(this)
              , c = a.data("mCS")
              , b = c.opt
              , e = "mCS_" + c.idx
              , f = d("#mCSB_" + c.idx + "_container")
              , k = f.parent();
            f.bind("focusin." + e, function(c) {
                var e = d(C.activeElement);
                c = f.find(".mCustomScrollBox").length;
                e.is(b.advanced.autoScrollOnFocus) && (g._stop(a),
                clearTimeout(a[0]._focusTimeout),
                a[0]._focusTimer = c ? 17 * c : 0,
                a[0]._focusTimeout = setTimeout(function() {
                    var c = [e.offset().top - f.offset().top, e.offset().left - f.offset().left]
                      , d = [f[0].offsetTop, f[0].offsetLeft]
                      , d = [0 <= d[0] + c[0] && d[0] + c[0] < k.height() - e.outerHeight(!1), 0 <= d[1] + c[1] && d[0] + c[1] < k.width() - e.outerWidth(!1)]
                      , h = "yx" !== b.axis || d[0] || d[1] ? "all" : "none";
                    "x" === b.axis || d[0] || g._scrollTo(a, c[0].toString(), {
                        dir: "y",
                        scrollEasing: "mcsEaseInOut",
                        overwrite: h,
                        dur: 0
                    });
                    "y" === b.axis || d[1] || g._scrollTo(a, c[1].toString(), {
                        dir: "x",
                        scrollEasing: "mcsEaseInOut",
                        overwrite: h,
                        dur: 0
                    })
                }, a[0]._focusTimer))
            })
        },
        _wrapperScroll: function() {
            var a = d(this).data("mCS")
              , c = "mCS_" + a.idx
              , b = d("#mCSB_" + a.idx + "_container").parent();
            b.bind("scroll." + c, function(a) {
                b.scrollTop(0).scrollLeft(0)
            })
        },
        _buttons: function() {
            var a = d(this)
              , c = a.data("mCS")
              , b = c.opt
              , e = c.sequential
              , f = "mCS_" + c.idx;
            d("#mCSB_" + c.idx + "_container");
            d(".mCSB_" + c.idx + "_scrollbar\x3ea").bind("mousedown." + f + " touchstart." + f + " pointerdown." + f + " MSPointerDown." + f + " mouseup." + f + " touchend." + f + " pointerup." + f + " MSPointerUp." + 
            f + " mouseout." + f + " pointerout." + f + " MSPointerOut." + f + " click." + f, function(f) {
                function h(c, d) {
                    e.scrollAmount = b.snapAmount || b.scrollButtons.scrollAmount;
                    g._sequentialScroll.call(this, a, c, d)
                }
                f.preventDefault();
                if (g._mouseBtnLeft(f)) {
                    var m = d(this).attr("class");
                    e.type = b.scrollButtons.scrollType;
                    switch (f.type) {
                    case "mousedown":
                    case "touchstart":
                    case "pointerdown":
                    case "MSPointerDown":
                        if ("stepped" === e.type)
                            break;
                        w = !0;
                        c.tweenRunning = !1;
                        h("on", m);
                        break;
                    case "mouseup":
                    case "touchend":
                    case "pointerup":
                    case "MSPointerUp":
                    case "mouseout":
                    case "pointerout":
                    case "MSPointerOut":
                        if ("stepped" === 
                        e.type)
                            break;
                        w = !1;
                        e.dir && h("off", m);
                        break;
                    case "click":
                        if ("stepped" !== e.type || c.tweenRunning)
                            break;
                        h("on", m)
                    }
                }
            })
        },
        _keyboard: function() {
            var a = d(this)
              , c = a.data("mCS")
              , b = c.opt
              , e = c.sequential
              , f = "mCS_" + c.idx
              , k = d("#mCSB_" + c.idx)
              , h = d("#mCSB_" + c.idx + "_container")
              , m = h.parent();
            k.attr("tabindex", "0").bind("blur." + f + " keydown." + f + " keyup." + f, function(f) {
                function k(d, f) {
                    e.type = b.keyboard.scrollType;
                    e.scrollAmount = b.snapAmount || b.keyboard.scrollAmount;
                    "stepped" === e.type && c.tweenRunning || g._sequentialScroll.call(this, 
                    a, d, f)
                }
                switch (f.type) {
                case "blur":
                    c.tweenRunning && e.dir && k("off", null );
                    break;
                case "keydown":
                case "keyup":
                    var p = f.keyCode ? f.keyCode : f.which
                      , x = "on";
                    if ("x" !== b.axis && (38 === p || 40 === p) || "y" !== b.axis && (37 === p || 39 === p)) {
                        if ((38 === p || 40 === p) && !c.overflowed[0] || (37 === p || 39 === p) && !c.overflowed[1])
                            break;
                        "keyup" === f.type && (x = "off");
                        d(C.activeElement).is("input,textarea,select,datalist,keygen,[contenteditable\x3d'true']") || (f.preventDefault(),
                        f.stopImmediatePropagation(),
                        k(x, p))
                    } else if (33 === p || 34 === p) {
                        if (c.overflowed[0] || 
                        c.overflowed[1])
                            f.preventDefault(),
                            f.stopImmediatePropagation();
                        "keyup" === f.type && (g._stop(a),
                        p = 34 === p ? -1 : 1,
                        "x" === b.axis || "yx" === b.axis && c.overflowed[1] && !c.overflowed[0] ? (f = "x",
                        p = Math.abs(h[0].offsetLeft) - .9 * p * m.width()) : (f = "y",
                        p = Math.abs(h[0].offsetTop) - .9 * p * m.height()),
                        g._scrollTo(a, p.toString(), {
                            dir: f,
                            scrollEasing: "mcsEaseInOut"
                        }))
                    } else if ((35 === p || 36 === p) && !d(C.activeElement).is("input,textarea,select,datalist,keygen,[contenteditable\x3d'true']")) {
                        if (c.overflowed[0] || c.overflowed[1])
                            f.preventDefault(),
                            f.stopImmediatePropagation();
                        "keyup" === f.type && ("x" === b.axis || "yx" === b.axis && c.overflowed[1] && !c.overflowed[0] ? (f = "x",
                        p = 35 === p ? Math.abs(m.width() - h.outerWidth(!1)) : 0) : (f = "y",
                        p = 35 === p ? Math.abs(m.height() - h.outerHeight(!1)) : 0),
                        g._scrollTo(a, p.toString(), {
                            dir: f,
                            scrollEasing: "mcsEaseInOut"
                        }))
                    }
                }
            })
        },
        _sequentialScroll: function(a, c, b) {
            function e(b) {
                var c = "stepped" !== h.type
                  , d = b ? c ? k.scrollInertia / 1.5 : k.scrollInertia : 1E3 / 60
                  , l = b ? c ? 7.5 : 40 : 2.5
                  , r = [Math.abs(m[0].offsetTop), Math.abs(m[0].offsetLeft)]
                  , u = [10 < f.scrollRatio.y ? 
                10 : f.scrollRatio.y, 10 < f.scrollRatio.x ? 10 : f.scrollRatio.x]
                  , l = "x" === h.dir[0] ? r[1] + h.dir[1] * u[1] * l : r[0] + h.dir[1] * u[0] * l
                  , u = "x" === h.dir[0] ? r[1] + h.dir[1] * parseInt(h.scrollAmount) : r[0] + h.dir[1] * parseInt(h.scrollAmount)
                  , l = "auto" !== h.scrollAmount ? u : l;
                b && 17 > d && (l = "x" === h.dir[0] ? r[1] : r[0]);
                g._scrollTo(a, l.toString(), {
                    dir: h.dir[0],
                    scrollEasing: b ? c ? "mcsLinearOut" : "mcsEaseInOut" : "mcsLinear",
                    dur: d,
                    onComplete: b ? !0 : !1
                });
                b ? h.dir = !1 : (clearTimeout(h.step),
                h.step = setTimeout(function() {
                    e()
                }, d))
            }
            var f = a.data("mCS")
              , k = f.opt
              , 
            h = f.sequential
              , m = d("#mCSB_" + f.idx + "_container")
              , l = "stepped" === h.type ? !0 : !1;
            switch (c) {
            case "on":
                h.dir = ["mCSB_buttonRight" === b || "mCSB_buttonLeft" === b || 39 === b || 37 === b ? "x" : "y", "mCSB_buttonUp" === b || "mCSB_buttonLeft" === b || 38 === b || 37 === b ? -1 : 1];
                g._stop(a);
                if (g._isNumeric(b) && "stepped" === h.type)
                    break;
                e(l);
                break;
            case "off":
                clearTimeout(h.step),
                g._stop(a),
                (l || f.tweenRunning && h.dir) && e(!0)
            }
        },
        _arr: function(a) {
            var c = d(this).data("mCS").opt
              , b = [];
            "function" === typeof a && (a = a());
            a instanceof Array ? b = 1 < a.length ? [a[0], 
            a[1]] : "x" === c.axis ? [null , a[0]] : [a[0], null ] : (b[0] = a.y ? a.y : a.x || "x" === c.axis ? null  : a,
            b[1] = a.x ? a.x : a.y || "y" === c.axis ? null  : a);
            "function" === typeof b[0] && (b[0] = b[0]());
            "function" === typeof b[1] && (b[1] = b[1]());
            return b
        },
        _to: function(a, c) {
            if (null  != a && "undefined" != typeof a) {
                var b = d(this)
                  , e = b.data("mCS")
                  , f = e.opt
                  , e = d("#mCSB_" + e.idx + "_container")
                  , k = e.parent()
                  , h = typeof a;
                c || (c = "x" === f.axis ? "x" : "y");
                var m = "x" === c ? e.outerWidth(!1) : e.outerHeight(!1)
                  , f = "x" === c ? e.offset().left : e.offset().top
                  , l = "x" === c ? e[0].offsetLeft : 
                e[0].offsetTop
                  , n = "x" === c ? "left" : "top";
                switch (h) {
                case "function":
                    return a();
                case "object":
                    if (a.nodeType)
                        var p = "x" === c ? d(a).offset().left : d(a).offset().top;
                    else if (a.jquery) {
                        if (!a.length)
                            break;
                        p = "x" === c ? a.offset().left : a.offset().top
                    }
                    return p - f;
                case "string":
                case "number":
                    if (g._isNumeric.call(null , a))
                        return Math.abs(a);
                    if (-1 !== a.indexOf("%"))
                        return Math.abs(m * parseInt(a) / 100);
                    if (-1 !== a.indexOf("-\x3d"))
                        return Math.abs(l - parseInt(a.split("-\x3d")[1]));
                    if (-1 !== a.indexOf("+\x3d"))
                        return b = l + parseInt(a.split("+\x3d")[1]),
                        0 <= b ? 0 : Math.abs(b);
                    if (-1 !== a.indexOf("px") && g._isNumeric.call(null , a.split("px")[0]))
                        return Math.abs(a.split("px")[0]);
                    if ("top" === a || "left" === a)
                        return 0;
                    if ("bottom" === a)
                        return Math.abs(k.height() - e.outerHeight(!1));
                    if ("right" === a)
                        return Math.abs(k.width() - e.outerWidth(!1));
                    if ("first" === a || "last" === a)
                        return b = e.find(":" + a),
                        p = "x" === c ? d(b).offset().left : d(b).offset().top,
                        p - f;
                    if (d(a).length)
                        return p = "x" === c ? d(a).offset().left : d(a).offset().top,
                        p - f;
                    e.css(n, a);
                    B.update.call(null , b[0])
                }
            }
        },
        _autoUpdate: function(a) {
            function c() {
                clearTimeout(n[0].autoUpdate);
                n[0].autoUpdate = setTimeout(function() {
                    if (l.advanced.updateOnSelectorChange && (u = f(),
                    u !== r)) {
                        k();
                        r = u;
                        return
                    }
                    l.advanced.updateOnContentResize && (s = [n.outerHeight(!1), n.outerWidth(!1), p.height(), p.width(), v()[0], v()[1]],
                    s[0] !== q[0] || s[1] !== q[1] || s[2] !== q[2] || s[3] !== q[3] || s[4] !== q[4] || s[5] !== q[5]) && (k(),
                    q = s);
                    l.advanced.updateOnImageLoad && (y = b(),
                    y !== t && (n.find("img").each(function() {
                        e(this.src)
                    }),
                    t = y));
                    (l.advanced.updateOnSelectorChange || l.advanced.updateOnContentResize || l.advanced.updateOnImageLoad) && c()
                }, 
                60)
            }
            function b() {
                var a = 0;
                l.advanced.updateOnImageLoad && (a = n.find("img").length);
                return a
            }
            function e(a) {
                var b = new Image;
                b.onload = function(a, b) {
                    return function() {
                        return b.apply(a, arguments)
                    }
                }(b, function() {
                    this.onload = null ;
                    k()
                });
                b.src = a
            }
            function f() {
                !0 === l.advanced.updateOnSelectorChange && (l.advanced.updateOnSelectorChange = "*");
                var a = 0
                  , b = n.find(l.advanced.updateOnSelectorChange);
                l.advanced.updateOnSelectorChange && 0 < b.length && b.each(function() {
                    a += d(this).height() + d(this).width()
                });
                return a
            }
            function k() {
                clearTimeout(n[0].autoUpdate);
                B.update.call(null , h[0])
            }
            var h = d(this)
              , m = h.data("mCS")
              , l = m.opt
              , n = d("#mCSB_" + m.idx + "_container");
            if (a)
                clearTimeout(n[0].autoUpdate),
                g._delete.call(null , n[0].autoUpdate);
            else {
                var p = n.parent(), x = [d("#mCSB_" + m.idx + "_scrollbar_vertical"), d("#mCSB_" + m.idx + "_scrollbar_horizontal")], v = function() {
                    return [x[0].is(":visible") ? x[0].outerHeight(!0) : 0, x[1].is(":visible") ? x[1].outerWidth(!0) : 0]
                }
                , r = f(), u, q = [n.outerHeight(!1), n.outerWidth(!1), p.height(), p.width(), v()[0], v()[1]], s, t = b(), y;
                c()
            }
        },
        _snapAmount: function(a, 
        c, b) {
            return Math.round(a / c) * c - b
        },
        _stop: function(a) {
            a = a.data("mCS");
            d("#mCSB_" + a.idx + "_container,#mCSB_" + a.idx + "_container_wrapper,#mCSB_" + a.idx + "_dragger_vertical,#mCSB_" + a.idx + "_dragger_horizontal").each(function() {
                g._stopTween.call(this)
            })
        },
        _scrollTo: function(a, c, b) {
            function e(a) {
                return k && h.callbacks[a] && "function" === typeof h.callbacks[a]
            }
            function f() {
                var c = [n[0].offsetTop, n[0].offsetLeft]
                  , d = [v[0].offsetTop, v[0].offsetLeft]
                  , e = [n.outerHeight(!1), n.outerWidth(!1)]
                  , f = [l.height(), l.width()];
                a[0].mcs = 
                {
                    content: n,
                    top: c[0],
                    left: c[1],
                    draggerTop: d[0],
                    draggerLeft: d[1],
                    topPct: Math.round(100 * Math.abs(c[0]) / (Math.abs(e[0]) - f[0])),
                    leftPct: Math.round(100 * Math.abs(c[1]) / (Math.abs(e[1]) - f[1])),
                    direction: b.dir
                }
            }
            var k = a.data("mCS")
              , h = k.opt;
            b = d.extend({
                trigger: "internal",
                dir: "y",
                scrollEasing: "mcsEaseOut",
                drag: !1,
                dur: h.scrollInertia,
                overwrite: "all",
                callbacks: !0,
                onStart: !0,
                onUpdate: !0,
                onComplete: !0
            }, b);
            var m = [b.dur, b.drag ? 0 : b.dur]
              , l = d("#mCSB_" + k.idx)
              , n = d("#mCSB_" + k.idx + "_container")
              , p = h.callbacks.onTotalScrollOffset ? 
            g._arr.call(a, h.callbacks.onTotalScrollOffset) : [0, 0]
              , t = h.callbacks.onTotalScrollBackOffset ? g._arr.call(a, h.callbacks.onTotalScrollBackOffset) : [0, 0];
            k.trigger = b.trigger;
            h.snapAmount && (c = g._snapAmount(c, h.snapAmount, h.snapOffset));
            switch (b.dir) {
            case "x":
                var v = d("#mCSB_" + k.idx + "_dragger_horizontal")
                  , r = "left"
                  , u = n[0].offsetLeft
                  , q = [l.width() - n.outerWidth(!1), v.parent().width() - v.width()]
                  , s = [c, c / k.scrollRatio.x]
                  , w = p[1]
                  , y = t[1]
                  , z = 0 < w ? w / k.scrollRatio.x : 0
                  , A = 0 < y ? y / k.scrollRatio.x : 0;
                break;
            case "y":
                v = d("#mCSB_" + 
                k.idx + "_dragger_vertical"),
                r = "top",
                u = n[0].offsetTop,
                q = [l.height() - n.outerHeight(!1), v.parent().height() - v.height()],
                s = [c, c / k.scrollRatio.y],
                w = p[0],
                y = t[0],
                z = 0 < w ? w / k.scrollRatio.y : 0,
                A = 0 < y ? y / k.scrollRatio.y : 0
            }
            0 > s[1] ? s = [0, 0] : s[1] >= q[1] ? s = [q[0], q[1]] : s[0] = -s[0];
            clearTimeout(n[0].onCompleteTimeout);
            if (k.tweenRunning || !(0 === u && 0 <= s[0] || u === q[0] && s[0] <= q[0]))
                g._tweenTo.call(null , v[0], r, Math.round(s[1]), m[1], b.scrollEasing),
                g._tweenTo.call(null , n[0], r, Math.round(s[0]), m[0], b.scrollEasing, b.overwrite, {
                    onStart: function() {
                        b.callbacks && 
                        b.onStart && !k.tweenRunning && (e("onScrollStart") && (f(),
                        h.callbacks.onScrollStart.call(a[0])),
                        k.tweenRunning = !0,
                        g._onDragClasses(v),
                        k.cbOffsets = [h.callbacks.alwaysTriggerOffsets || u >= q[0] + w, h.callbacks.alwaysTriggerOffsets || u <= -y])
                    },
                    onUpdate: function() {
                        b.callbacks && b.onUpdate && e("whileScrolling") && (f(),
                        h.callbacks.whileScrolling.call(a[0]))
                    },
                    onComplete: function() {
                        b.callbacks && b.onComplete && ("yx" === h.axis && clearTimeout(n[0].onCompleteTimeout),
                        n[0].onCompleteTimeout = setTimeout(function() {
                            e("onScroll") && 
                            (f(),
                            h.callbacks.onScroll.call(a[0]));
                            e("onTotalScroll") && s[1] >= q[1] - z && k.cbOffsets[0] && (f(),
                            h.callbacks.onTotalScroll.call(a[0]));
                            e("onTotalScrollBack") && s[1] <= A && k.cbOffsets[1] && (f(),
                            h.callbacks.onTotalScrollBack.call(a[0]));
                            k.tweenRunning = !1;
                            n[0].idleTimer = 0;
                            g._onDragClasses(v, "hide")
                        }, n[0].idleTimer || 0))
                    }
                })
        },
        _tweenTo: function(a, c, b, d, f, k, h) {
            function m() {
                a._mcsstop || (q || p.call(),
                q = g._getTime() - r,
                l(),
                q >= a._mcstime && (a._mcstime = q > a._mcstime ? q + u - (q - a._mcstime) : q + u - 1,
                a._mcstime < q + 1 && (a._mcstime = q + 
                1)),
                a._mcstime < d ? a._mcsid = _request(m) : v.call())
            }
            function l() {
                0 < d ? (a._mcscurrVal = n(a._mcstime, s, y, d, f),
                w[c] = Math.round(a._mcscurrVal) + "px") : w[c] = b + "px";
                x.call()
            }
            function n(a, b, c, d, e) {
                switch (e) {
                case "linear":
                case "mcsLinear":
                    return c * a / d + b;
                case "mcsLinearOut":
                    return a /= d,
                    a--,
                    c * Math.sqrt(1 - a * a) + b;
                case "easeInOutSmooth":
                    a /= d / 2;
                    if (1 > a)
                        return c / 2 * a * a + b;
                    a--;
                    return -c / 2 * (a * (a - 2) - 1) + b;
                case "easeInOutStrong":
                    a /= d / 2;
                    if (1 > a)
                        return c / 2 * Math.pow(2, 10 * (a - 1)) + b;
                    a--;
                    return c / 2 * (-Math.pow(2, -10 * a) + 2) + b;
                case "easeInOut":
                case "mcsEaseInOut":
                    a /= 
                    d / 2;
                    if (1 > a)
                        return c / 2 * a * a * a + b;
                    a -= 2;
                    return c / 2 * (a * a * a + 2) + b;
                case "easeOutSmooth":
                    return a /= d,
                    a--,
                    -c * (a * a * a * a - 1) + b;
                case "easeOutStrong":
                    return c * (-Math.pow(2, -10 * a / d) + 1) + b;
                default:
                    return d = (a /= d) * a,
                    e = d * a,
                    b + c * (.499999999999997 * e * d + -2.5 * d * d + 5.5 * e + -6.5 * d + 4 * a)
                }
            }
            h = h || {};
            var p = h.onStart || function() {}
            , x = h.onUpdate || function() {}
            , v = h.onComplete || function() {}
            , r = g._getTime(), u, q = 0, s = a.offsetTop, w = a.style;
            "left" === c && (s = a.offsetLeft);
            var y = b - s;
            a._mcsstop = 0;
            "none" !== k && null  != a._mcsid && (t.requestAnimationFrame ? t.cancelAnimationFrame(a._mcsid) : 
            clearTimeout(a._mcsid),
            a._mcsid = null );
            (function() {
                u = 1E3 / 60;
                a._mcstime = q + u;
                _request = t.requestAnimationFrame ? t.requestAnimationFrame : function(a) {
                    l();
                    return setTimeout(a, .01)
                }
                ;
                a._mcsid = _request(m)
            })()
        },
        _getTime: function() {
            return t.performance && t.performance.now ? t.performance.now() : t.performance && t.performance.webkitNow ? t.performance.webkitNow() : Date.now ? Date.now() : (new Date).getTime()
        },
        _stopTween: function() {
            null  != this._mcsid && (t.requestAnimationFrame ? t.cancelAnimationFrame(this._mcsid) : clearTimeout(this._mcsid),
            this._mcsid = null ,
            this._mcsstop = 1)
        },
        _delete: function(a) {
            delete a
        },
        _mouseBtnLeft: function(a) {
            return !(a.which && 1 !== a.which)
        },
        _pointerTouch: function(a) {
            a = a.originalEvent.pointerType;
            return !(a && "touch" !== a && 2 !== a)
        },
        _isNumeric: function(a) {
            return !isNaN(parseFloat(a)) && isFinite(a)
        }
    };
    J = "https:" == C.location.protocol ? "https:" : "http:";
    d.event.special.mousewheel || d("head").append(decodeURI("%3Cscript src\x3dundefined//cdnjs.cloudflare.com/ajax/libs/jquery-mousewheel/3.1.11/jquery.mousewheel.min.js%3E%3C/script%3E"));
    d.fn.mCustomScrollbar = function(a) {
        if (B[a])
            return B[a].apply(this, Array.prototype.slice.call(arguments, 1));
        if ("object" !== typeof a && a)
            d.error("Method " + a + " does not exist");
        else
            return B.init.apply(this, arguments)
    }
    ;
    d.mCustomScrollbar = function(a) {
        if (B[a])
            return B[a].apply(this, Array.prototype.slice.call(arguments, 1));
        if ("object" !== typeof a && a)
            d.error("Method " + a + " does not exist");
        else
            return B.init.apply(this, arguments)
    }
    ;
    d.mCustomScrollbar.defaults = I;
    t.mCustomScrollbar = !0;
    d(t).load(function() {
        d(".mCustomScrollbar").mCustomScrollbar()
    })
})(jQuery, 
window, document);
(function(d) {
    var l = {
        className: "autosizejs",
        append: "",
        callback: !1,
        resizeDelay: 10
    }, q = "fontFamily fontSize fontWeight fontStyle letterSpacing textTransform wordSpacing textIndent".split(" "), h, c = d('\x3ctextarea tabindex\x3d"-1" style\x3d"position:absolute; top:-999px; left:0; right:auto; bottom:auto; border:0; padding: 0; -moz-box-sizing:content-box; -webkit-box-sizing:content-box; box-sizing:content-box; word-wrap:break-word; height:0 !important; min-height:0 !important; overflow:hidden; transition:none; -webkit-transition:none; -moz-transition:none;"/\x3e').data("autosize", 
    !0)[0];
    c.style.lineHeight = "99px";
    "99px" === d(c).css("lineHeight") && q.push("lineHeight");
    c.style.lineHeight = "";
    d.fn.autosize = function(e) {
        if (!this.length)
            return this;
        e = d.extend({}, l, e || {});
        c.parentNode !== document.body && d(document.body).append(c);
        return this.each(function() {
            function r() {
                var g, e = window.getComputedStyle ? window.getComputedStyle(b, null ) : !1;
                e ? (g = b.getBoundingClientRect().width,
                d.each(["paddingLeft", "paddingRight", "borderLeftWidth", "borderRightWidth"], function(a, b) {
                    g -= parseInt(e[b], 10)
                }),
                c.style.width = 
                g + "px") : c.style.width = Math.max(a.width(), 0) + "px"
            }
            function l() {
                var g = {};
                h = b;
                c.className = e.className;
                k = parseInt(a.css("maxHeight"), 10);
                d.each(q, function(b, c) {
                    g[c] = a.css(c)
                });
                d(c).css(g);
                r();
                if (window.chrome) {
                    var f = b.style.width;
                    b.style.width = "0px";
                    b.style.width = f
                }
            }
            function f() {
                var a, d;
                h !== b ? l() : r();
                c.value = b.value + e.append;
                c.style.overflowY = b.style.overflowY;
                d = parseInt(b.style.height, 10);
                c.scrollTop = 0;
                c.scrollTop = 9E4;
                a = c.scrollTop;
                k && a > k ? (b.style.overflowY = "scroll",
                a = k) : (b.style.overflowY = "hidden",
                a < m && (a = m));
                a += n;
                d !== a && (b.style.height = a + "px",
                u && e.callback.call(b, b))
            }
            function s() {
                clearTimeout(p);
                p = setTimeout(function() {
                    var b = a.width();
                    b !== t && (t = b,
                    f())
                }, parseInt(e.resizeDelay, 10))
            }
            var b = this, a = d(b), k, m, n = 0, u = d.isFunction(e.callback), v = {
                height: b.style.height,
                overflow: b.style.overflow,
                overflowY: b.style.overflowY,
                wordWrap: b.style.wordWrap,
                resize: b.style.resize
            }, p, t = a.width();
            if (!a.data("autosize")) {
                a.data("autosize", !0);
                if ("border-box" === a.css("box-sizing") || "border-box" === a.css("-moz-box-sizing") || 
                "border-box" === a.css("-webkit-box-sizing"))
                    n = a.outerHeight() - a.height();
                m = Math.max(parseInt(a.css("minHeight"), 10) - n || 0, a.height());
                a.css({
                    overflow: "hidden",
                    overflowY: "hidden",
                    wordWrap: "break-word",
                    resize: "none" === a.css("resize") || "vertical" === a.css("resize") ? "none" : "horizontal"
                });
                if ("onpropertychange" in b)
                    if ("oninput" in b)
                        a.on("input.autosize keyup.autosize", f);
                    else
                        a.on("propertychange.autosize", function() {
                            "value" === event.propertyName && f()
                        });
                else
                    a.on("input.autosize", f);
                if (!1 !== e.resizeDelay)
                    d(window).on("resize.autosize", 
                    s);
                a.on("autosize.resize", f);
                a.on("autosize.resizeIncludeStyle", function() {
                    h = null ;
                    f()
                });
                a.on("autosize.destroy", function() {
                    h = null ;
                    clearTimeout(p);
                    d(window).off("resize", s);
                    a.off("autosize").off(".autosize").css(v).removeData("autosize");
                    d(c).remove()
                });
                f()
            }
        })
    }
})(window.jQuery || window.$);
(function(b) {
    function B() {
        return b("\x3cdiv/\x3e")
    }
    var C = Math.abs
      , n = Math.max
      , p = Math.min
      , g = Math.round;
    b.imgAreaSelect = function(z, d) {
        function O(a) {
            return a + A.left - w.left
        }
        function P(a) {
            return a + A.top - w.top
        }
        function J(a) {
            return a - A.left + w.left
        }
        function K(a) {
            return a - A.top + w.top
        }
        function G(a) {
            var d = a || U;
            a = a || V;
            return {
                x1: g(c.x1 * d),
                y1: g(c.y1 * a),
                x2: g(c.x2 * d),
                y2: g(c.y2 * a),
                width: g(c.x2 * d) - g(c.x1 * d),
                height: g(c.y2 * a) - g(c.y1 * a)
            }
        }
        function ha(a, d, b, f, e) {
            var h = e || U;
            e = e || V;
            c = {
                x1: g(a / h || 0),
                y1: g(d / e || 0),
                x2: g(b / h || 0),
                y2: g(f / e || 0)
            };
            c.width = c.x2 - c.x1;
            c.height = c.y2 - c.y1
        }
        function M() {
            $ && x.width() && (A = {
                left: g(x.offset().left),
                top: g(x.offset().top)
            },
            y = x.innerWidth(),
            u = x.innerHeight(),
            A.top += x.outerHeight() - u >> 1,
            A.left += x.outerWidth() - y >> 1,
            W = g(d.minWidth / U) || 0,
            X = g(d.minHeight / V) || 0,
            ia = g(p(d.maxWidth / U || 16777216, y)),
            ja = g(p(d.maxHeight / V || 16777216, u)),
            "1.3.2" != b().jquery || "fixed" != aa || ka.getBoundingClientRect || (A.top += n(document.body.scrollTop, ka.scrollTop),
            A.left += n(document.body.scrollLeft, ka.scrollLeft)),
            w = /absolute|relative/.test(Q.css("position")) ? 
            {
                left: g(Q.offset().left) - Q.scrollLeft(),
                top: g(Q.offset().top) - Q.scrollTop()
            } : "fixed" == aa ? {
                left: b(document).scrollLeft(),
                top: b(document).scrollTop()
            } : {
                left: 0,
                top: 0
            },
            q = O(0),
            r = P(0),
            (c.x2 > y || c.y2 > u) && ba())
        }
        function ca(a) {
            if (da) {
                l.css({
                    left: O(c.x1),
                    top: P(c.y1)
                }).add(R).width(E = c.width).height(L = c.height);
                R.add(t).add(s).css({
                    left: 0,
                    top: 0
                });
                t.width(n(E - t.outerWidth() + t.innerWidth(), 0)).height(n(L - t.outerHeight() + t.innerHeight(), 0));
                b(m[0]).css({
                    left: q,
                    top: r,
                    width: c.x1,
                    height: u
                });
                b(m[1]).css({
                    left: q + c.x1,
                    top: r,
                    width: E,
                    height: c.y1
                });
                b(m[2]).css({
                    left: q + c.x2,
                    top: r,
                    width: y - c.x2,
                    height: u
                });
                b(m[3]).css({
                    left: q + c.x1,
                    top: r + c.y2,
                    width: E,
                    height: u - c.y2
                });
                E -= s.outerWidth();
                L -= s.outerHeight();
                switch (s.length) {
                case 8:
                    b(s[4]).css({
                        left: E >> 1
                    }),
                    b(s[5]).css({
                        left: E,
                        top: L >> 1
                    }),
                    b(s[6]).css({
                        left: E >> 1,
                        top: L
                    }),
                    b(s[7]).css({
                        top: L >> 1
                    });
                case 4:
                    s.slice(1, 3).css({
                        left: E
                    }),
                    s.slice(2, 4).css({
                        top: L
                    })
                }
                if (!1 !== a && (b.imgAreaSelect.onKeyPress != ta && b(document).unbind(b.imgAreaSelect.keyPress, b.imgAreaSelect.onKeyPress),
                d.keys))
                    b(document)[b.imgAreaSelect.keyPress](b.imgAreaSelect.onKeyPress = 
                    ta);
                S && 2 == t.outerWidth() - t.innerWidth() && (t.css("margin", 0),
                setTimeout(function() {
                    t.css("margin", "auto")
                }, 0))
            }
        }
        function la(a) {
            M();
            ca(a);
            f = O(c.x1);
            e = P(c.y1);
            h = O(c.x2);
            k = P(c.y2)
        }
        function ma(a, b) {
            d.fadeSpeed ? a.fadeOut(d.fadeSpeed, b) : a.hide()
        }
        function N(a) {
            var b = J(a.pageX - w.left) - c.x1;
            a = K(a.pageY - w.top) - c.y1;
            na || (M(),
            na = !0,
            l.one("mouseout", function() {
                na = !1
            }));
            v = "";
            d.resizable && (a <= d.resizeMargin ? v = "n" : a >= c.height - d.resizeMargin && (v = "s"),
            b <= d.resizeMargin ? v += "w" : b >= c.width - d.resizeMargin && (v += "e"));
            l.css("cursor", 
            v ? v + "-resize" : d.movable ? "move" : "");
            ea && ea.toggle()
        }
        function ua(a) {
            b("body").css("cursor", "");
            (d.autoHide || 0 == c.width * c.height) && ma(l.add(m), function() {
                b(this).hide()
            });
            b(document).unbind("mousemove", oa);
            l.mousemove(N);
            d.onSelectEnd(z, G())
        }
        function va(a) {
            if (1 != a.which)
                return !1;
            M();
            v ? (b("body").css("cursor", v + "-resize"),
            f = O(c[/w/.test(v) ? "x2" : "x1"]),
            e = P(c[/n/.test(v) ? "y2" : "y1"]),
            b(document).mousemove(oa).one("mouseup", ua),
            l.unbind("mousemove", N)) : d.movable ? (pa = q + c.x1 - (a.pageX - w.left),
            qa = r + c.y1 - (a.pageY - 
            w.top),
            l.unbind("mousemove", N),
            b(document).mousemove(wa).one("mouseup", function() {
                d.onSelectEnd(z, G());
                b(document).unbind("mousemove", wa);
                l.mousemove(N)
            })) : x.mousedown(a);
            return !1
        }
        function Y(a) {
            H && (a ? (h = n(q, p(q + y, f + C(k - e) * H * (h > f || -1))),
            k = g(n(r, p(r + u, e + C(h - f) / H * (k > e || -1)))),
            h = g(h)) : (k = n(r, p(r + u, e + C(h - f) / H * (k > e || -1))),
            h = g(n(q, p(q + y, f + C(k - e) * H * (h > f || -1)))),
            k = g(k)))
        }
        function ba() {
            f = p(f, q + y);
            e = p(e, r + u);
            C(h - f) < W && (h = f - W * (h < f || -1),
            h < q ? f = q + W : h > q + y && (f = q + y - W));
            C(k - e) < X && (k = e - X * (k < e || -1),
            k < r ? e = r + X : k > r + u && (e = 
            r + u - X));
            h = n(q, p(h, q + y));
            k = n(r, p(k, r + u));
            Y(C(h - f) < C(k - e) * H);
            C(h - f) > ia && (h = f - ia * (h < f || -1),
            Y());
            C(k - e) > ja && (k = e - ja * (k < e || -1),
            Y(!0));
            c = {
                x1: J(p(f, h)),
                x2: J(n(f, h)),
                y1: K(p(e, k)),
                y2: K(n(e, k)),
                width: C(h - f),
                height: C(k - e)
            };
            ca();
            d.onSelectChange(z, G())
        }
        function oa(a) {
            h = /w|e|^$/.test(v) || H ? a.pageX - w.left : O(c.x2);
            k = /n|s|^$/.test(v) || H ? a.pageY - w.top : P(c.y2);
            ba();
            return !1
        }
        function Z(a, g) {
            h = (f = a) + c.width;
            k = (e = g) + c.height;
            b.extend(c, {
                x1: J(f),
                y1: K(e),
                x2: J(h),
                y2: K(k)
            });
            ca();
            d.onSelectChange(z, G())
        }
        function wa(a) {
            f = n(q, 
            p(pa + (a.pageX - w.left), q + y - c.width));
            e = n(r, p(qa + (a.pageY - w.top), r + u - c.height));
            Z(f, e);
            a.preventDefault();
            return !1
        }
        function ra() {
            b(document).unbind("mousemove", ra);
            M();
            h = f;
            k = e;
            ba();
            v = "";
            m.is(":visible") || l.add(m).hide().fadeIn(d.fadeSpeed || 0);
            da = !0;
            b(document).unbind("mouseup", fa).mousemove(oa).one("mouseup", ua);
            l.unbind("mousemove", N);
            d.onSelectStart(z, G())
        }
        function fa() {
            b(document).unbind("mousemove", ra).unbind("mouseup", fa);
            ma(l.add(m));
            ha(J(f), K(e), J(f), K(e));
            this instanceof b.imgAreaSelect || (d.onSelectChange(z, 
            G()),
            d.onSelectEnd(z, G()))
        }
        function xa(a) {
            if (1 != a.which || m.is(":animated"))
                return !1;
            M();
            pa = f = a.pageX - w.left;
            qa = e = a.pageY - w.top;
            b(document).mousemove(ra).mouseup(fa);
            return !1
        }
        function ya() {
            la(!1)
        }
        function za() {
            $ = !0;
            sa(d = b.extend({
                classPrefix: "imgareaselect",
                movable: !0,
                parent: "body",
                resizable: !0,
                resizeMargin: 10,
                onInit: function() {},
                onSelectStart: function() {},
                onSelectChange: function() {},
                onSelectEnd: function() {}
            }, d));
            l.add(m).css({
                visibility: ""
            });
            d.show && (da = !0,
            M(),
            ca(),
            l.add(m).hide().fadeIn(d.fadeSpeed || 
            0));
            setTimeout(function() {
                d.onInit(z, G())
            }, 0)
        }
        function ga(a, b) {
            for (var c in b)
                void 0 !== d[c] && a.css(b[c], d[c])
        }
        function sa(a) {
            a.parent && (Q = b(a.parent)).append(l.add(m));
            b.extend(d, a);
            M();
            if (null  != a.handles) {
                s.remove();
                s = b([]);
                for (T = a.handles ? "corners" == a.handles ? 4 : 8 : 0; T--; )
                    s = s.add(B());
                s.addClass(d.classPrefix + "-handle").css({
                    position: "absolute",
                    fontSize: 0,
                    zIndex: I + 1 || 1
                });
                0 <= !parseInt(s.css("width")) && s.width(5).height(5);
                (F = d.borderWidth) && s.css({
                    borderWidth: F,
                    borderStyle: "solid"
                });
                ga(s, {
                    borderColor1: "border-color",
                    borderColor2: "background-color",
                    borderOpacity: "opacity"
                })
            }
            U = d.imageWidth / y || 1;
            V = d.imageHeight / u || 1;
            null  != a.x1 && (ha(a.x1, a.y1, a.x2, a.y2),
            a.show = !a.hide);
            a.keys && (d.keys = b.extend({
                shift: 1,
                ctrl: "resize"
            }, a.keys));
            m.addClass(d.classPrefix + "-outer");
            R.addClass(d.classPrefix + "-selection");
            for (T = 0; 4 > T++; )
                b(t[T - 1]).addClass(d.classPrefix + "-border" + T);
            ga(R, {
                selectionColor: "background-color",
                selectionOpacity: "opacity"
            });
            ga(t, {
                borderOpacity: "opacity",
                borderWidth: "border-width"
            });
            ga(m, {
                outerColor: "background-color",
                outerOpacity: "opacity"
            });
            (F = d.borderColor1) && b(t[0]).css({
                borderStyle: "solid",
                borderColor: F
            });
            (F = d.borderColor2) && b(t[1]).css({
                borderStyle: "dashed",
                borderColor: F
            });
            l.append(R.add(t).add(ea)).append(s);
            S && ((F = (m.css("filter") || "").match(/opacity=(\d+)/)) && m.css("opacity", F[1] / 100),
            (F = (t.css("filter") || "").match(/opacity=(\d+)/)) && t.css("opacity", F[1] / 100));
            a.hide ? ma(l.add(m)) : a.show && $ && (da = !0,
            l.add(m).fadeIn(d.fadeSpeed || 0),
            la());
            H = (Aa = (d.aspectRatio || "").split(/:/))[0] / Aa[1];
            x.add(m).unbind("mousedown", 
            xa);
            if (d.disable || !1 === d.enable)
                l.unbind("mousemove", N).unbind("mousedown", va),
                b(window).unbind("resize", ya);
            else {
                if (d.enable || !1 === d.disable)
                    (d.resizable || d.movable) && l.mousemove(N).mousedown(va),
                    b(window).resize(ya);
                d.persistent || x.add(m).mousedown(xa)
            }
            d.enable = d.disable = void 0
        }
        var x = b(z), $, l = B(), R = B(), t = B().add(B()).add(B()).add(B()), m = B().add(B()).add(B()).add(B()), s = b([]), ea, q, r, A = {
            left: 0,
            top: 0
        }, y, u, Q, w = {
            left: 0,
            top: 0
        }, I = 0, aa = "absolute", pa, qa, U, V, v, W, X, ia, ja, H, da, f, e, h, k, c = {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 0,
            width: 0,
            height: 0
        }, ka = document.documentElement, D = navigator.userAgent, Aa, T, F, E, L, na, ta = function(a) {
            var b = d.keys, c, g = a.keyCode;
            c = isNaN(b.alt) || !a.altKey && !a.originalEvent.altKey ? !isNaN(b.ctrl) && a.ctrlKey ? b.ctrl : !isNaN(b.shift) && a.shiftKey ? b.shift : isNaN(b.arrows) ? 10 : b.arrows : b.alt;
            if ("resize" == b.arrows || "resize" == b.shift && a.shiftKey || "resize" == b.ctrl && a.ctrlKey || "resize" == b.alt && (a.altKey || a.originalEvent.altKey)) {
                switch (g) {
                case 37:
                    c = -c;
                case 39:
                    a = n(f, h);
                    f = p(f, h);
                    h = n(a + c, f);
                    Y();
                    break;
                case 38:
                    c = -c;
                case 40:
                    a = 
                    n(e, k);
                    e = p(e, k);
                    k = n(a + c, e);
                    Y(!0);
                    break;
                default:
                    return
                }
                ba()
            } else
                switch (f = p(f, h),
                e = p(e, k),
                g) {
                case 37:
                    Z(n(f - c, q), e);
                    break;
                case 38:
                    Z(f, n(e - c, r));
                    break;
                case 39:
                    Z(f + p(c, y - J(h)), e);
                    break;
                case 40:
                    Z(f, e + p(c, u - K(k)));
                    break;
                default:
                    return
                }
            return !1
        }
        ;
        this.remove = function() {
            sa({
                disable: !0
            });
            l.add(m).remove()
        }
        ;
        this.getOptions = function() {
            return d
        }
        ;
        this.setOptions = sa;
        this.getSelection = G;
        this.setSelection = ha;
        this.cancelSelection = fa;
        this.update = la;
        for (var S = (/msie ([\w.]+)/i.exec(D) || [])[1], Ba = /opera/i.test(D), Ca = 
        /webkit/i.test(D) && !/chrome/i.test(D), D = x; D.length; )
            I = n(I, isNaN(D.css("z-index")) ? I : D.css("z-index")),
            "fixed" == D.css("position") && (aa = "fixed"),
            D = D.parent(":not(body)");
        I = d.zIndex || I;
        S && x.attr("unselectable", "on");
        b.imgAreaSelect.keyPress = S || Ca ? "keydown" : "keypress";
        Ba && (ea = B().css({
            width: "100%",
            height: "100%",
            position: "absolute",
            zIndex: I + 2 || 2
        }));
        l.add(m).css({
            visibility: "hidden",
            position: aa,
            overflow: "hidden",
            zIndex: I || "0"
        });
        l.css({
            zIndex: I + 2 || 2
        });
        R.add(t).css({
            position: "absolute",
            fontSize: 0
        });
        z.complete || 
        "complete" == z.readyState || !x.is("img") ? za() : x.one("load", za);
        !$ && S && 7 <= S && (z.src = z.src)
    }
    ;
    b.fn.imgAreaSelect = function(g) {
        g = g || {};
        this.each(function() {
            b(this).data("imgAreaSelect") ? g.remove ? (b(this).data("imgAreaSelect").remove(),
            b(this).removeData("imgAreaSelect")) : b(this).data("imgAreaSelect").setOptions(g) : g.remove || (void 0 === g.enable && void 0 === g.disable && (g.enable = !0),
            b(this).data("imgAreaSelect", new b.imgAreaSelect(this,g)))
        });
        return g.instance ? b(this).data("imgAreaSelect") : this
    }
})(jQuery);
(function(r, q, v) {
    q.fn.artZoom = function(g) {
        g = q.extend({}, q.fn.artZoom.defaults, g);
        var b, l = g.path, h = l + "/loading.gif", p = l + "/zoomin.cur", l = l + "/zoomout.cur";
        (new Image).src = h;
        p = "url('" + p + "'), pointer";
        b = ['\x3cdiv class\x3d"ui-artZoom-toolbar" style\x3d"display:none"\x3e\x3cspan class\x3d"ui-artZoom-buttons" style\x3d"display:none"\x3e\x3ca data-go\x3d"left" class\x3d"ui-artZoom-left"\x3e\x3cspan\x3e\x3c/span\x3e', g.left, '\x3c/a\x3e\x3ca data-go\x3d"right" class\x3d"ui-artZoom-right"\x3e\x3cspan\x3e\x3c/span\x3e', 
        g.right, '\x3c/a\x3e\x3ca data-go\x3d"source" class\x3d"ui-artZoom-source"\x3e\x3cspan\x3e\x3c/span\x3e', g.source, '\x3c/a\x3e\x3ca data-go\x3d"hide" class\x3d"ui-artZoom-hide"\x3e\x3cspan\x3e\x3c/span\x3e', g.hide, '\x3c/a\x3e\x3c/span\x3e\x3cspan class\x3d"ui-artZoom-loading"\x3e\x3cimg data-live\x3d"stop" src\x3d"', h, '" style\x3d"display:inline-block;*zoom:1;*display:inline;vertical-align:middle;width:16px;height:16px;" /\x3e \x3cspan\x3eLoading..\x3c/span\x3e\x3c/span\x3e\x3c/div\x3e\x3cdiv class\x3d"ui-artZoom-box" style\x3d"display:none"\x3e\x3cspan class\x3d"ui-artZoom-photo" data-go\x3d"hide" style\x3d"display:inline-block;*display:inline;*zoom:1;overflow:hidden;position:relative;cursor:', 
        "url('" + l + "'), pointer", '"\x3e\x3cimg data-name\x3d"thumb" data-go\x3d"hide" data-live\x3d"stop" src\x3d"', h, '" /\x3e\x3c/span\x3e\x3c/div\x3e'].join("");
        this.on("click", function(d) {
            if ("IMG" !== this.nodeName && "stop" === this.getAttribute("data-live"))
                return !1;
            var f, a, n = this, c = q(n);
            d = c.parent();
            var k = n.src
              , m = c.attr("data-artZoom-show") || k
              , e = c.attr("data-artZoom-source") || m
              , h = g.maxWidth || ("A" === d[0].nodeName ? c.parent() : c).parent().width()
              , p = g.maxHeight || 99999
              , h = h - g.borderWidth
              , h = 400;
            "A" === d[0].nodeName && 
            (m = d.attr("data-artZoom-show") || d.attr("href"),
            e = d.attr("data-artZoom-source") || d.attr("rel"));
            if (c.data("artZoom"))
                c.hide();
            else {
                var l = r.createElement("div"), s, t, u;
                f = q(l);
                l.className = "ui-artZoom ui-artZoom-noLoad";
                l.innerHTML = b;
                ("A" === d[0].nodeName ? c.parent() : c).before(l);
                c.data("artZoom", f);
                t = f.find(".ui-artZoom-box");
                s = f.find("[data-name\x3dthumb]");
                w(m, function() {
                    var a = this.width
                      , b = this.height
                      , e = Math.min(h, a)
                      , b = e / a * b
                      , a = e;
                    s.attr("src", k).css(g.blur ? {
                        width: a + "px",
                        height: b + "px"
                    } : {
                        display: "none"
                    }).after(['\x3cimg class\x3d"ui-artZoom-show" title\x3d"', 
                    n.title, '" alt\x3d"', n.alt, '" src\x3d"', m, '" style\x3d"width:', a, "px;height:", b, 'px;position:absolute;left:0;top:0;background:transparent" /\x3e'].join(""));
                    u = f.find(".ui-artZoom-show");
                    s.attr("class", "ui-artZoom-show");
                    f.addClass("ui-artZoom-ready");
                    f.find(".ui-artZoom-buttons").show();
                    c.data("artZoom-ready", !0);
                    c.hide();
                    t.show()
                }, function() {
                    s.removeAttr("class").hide();
                    u.css({
                        position: "static",
                        left: "auto",
                        top: "auto"
                    });
                    f.removeClass("ui-artZoom-noLoad");
                    f.find(".ui-artZoom-loading").hide();
                    c.data("artZoom-load", 
                    !0)
                }, function() {
                    f.addClass("ui-artZoom-error");
                    v('jQuery.fn.artZoom: Load "' + m + '" Error!')
                })
            }
            f = c.data("artZoom");
            a = function(b) {
                b = this.getAttribute("data-go");
                var g = this.getAttribute("data-live")
                  , d = c.data("artZoom-degree") || 0
                  , l = f.find(".ui-artZoom-show")[0];
                if ("stop" === g)
                    return !1;
                /img|canvas$/i.test(this.nodeName) && (b = "hide");
                switch (b) {
                case "left":
                    d -= 90;
                    d = -90 === d ? 270 : d;
                    break;
                case "right":
                    d += 90;
                    d = 360 === d ? 0 : d;
                    break;
                case "source":
                    window.open(e || m || k);
                    break;
                case "hide":
                    c.show(),
                    f.find(".ui-artZoom-toolbar").hide(),
                    f.hide(),
                    f.find("[data-go]").off("click", a)
                }
                "left" !== b && "right" !== b || !c.data("artZoom-load") || (x(l, d, h, p),
                c.data("artZoom-degree", d));
                return !1
            }
            ;
            f.show().find(".ui-artZoom-toolbar").slideDown(150);
            f.find("[data-go]").on("click", a);
            return !1
        });
        this.on("mouseover", function() {
            "ui-artZoom-show" !== this.className && (this.style.cursor = p)
        });
        this[0] && (this[0].style.cursor = p);
        return this
    }
    ;
    q.fn.artZoom.defaults = {
        path: "/static/css/img/artzoom",
        left: "\u5de6\u65cb\u8f6c",
        right: "\u53f3\u65cb\u8f6c",
        source: "\u770b\u539f\u56fe",
        hide: "\u00d7",
        blur: !0,
        preload: !0,
        maxWidth: null ,
        maxHeight: null ,
        borderWidth: 18
    };
    var x = q.imgRotate = function() {
        var g = !!r.createElement("canvas").getContext;
        return function(b, l, h, p) {
            var d, f, a, n = 1, c = b.naturalWidth, k = b.naturalHeight;
            a = b["{$canvas}"];
            if (!b["{$canvas}"]) {
                if (!("naturalWidth" in b)) {
                    a = b.runtimeStyle;
                    var m = a.width
                      , e = a.height;
                    a.width = a.height = "auto";
                    b.naturalWidth = c = b.width;
                    b.naturalHeight = k = b.height;
                    a.width = m;
                    a.height = e
                }
                b["{$canvas}"] = a = r.createElement(g ? "canvas" : "span");
                b.parentNode.insertBefore(a, 
                b.nextSibling);
                b.style.display = "none";
                a.className = b.className;
                a.title = b.title;
                g || (a.img = r.createElement("img"),
                a.img.src = b.src,
                a.appendChild(a.img),
                a.style.cssText = "display:inline-block;*zoom:1;*display:inline;padding:0;margin:0;border:none 0;position:static;float:none;overflow:hidden;width:auto;height:auto")
            }
            m = function(a) {
                a && (c = [k, k = c][0]);
                c > h && (n = h / c,
                k *= n,
                c = h);
                k > p && (n = n * p / k,
                c *= p / k,
                k = p);
                g && (a ? k : c) / b.naturalWidth
            }
            ;
            switch (l) {
            case 0:
                f = d = 0;
                m();
                break;
            case 90:
                d = 0;
                f = -b.naturalHeight;
                m(!0);
                break;
            case 180:
                d = 
                -b.naturalWidth;
                f = -b.naturalHeight;
                m();
                break;
            case 270:
                d = -b.naturalWidth,
                f = 0,
                m(!0)
            }
            g ? (a.setAttribute("width", c),
            a.setAttribute("height", k),
            a = a.getContext("2d"),
            a.rotate(l * Math.PI / 180),
            a.scale(n, n),
            a.drawImage(b, d, f)) : (a.style.width = c + "px",
            a.style.height = k + "px",
            a.img.style.filter = "progid:DXImageTransform.Microsoft.BasicImage(rotation\x3d" + l / 90 + ")",
            a.img.width = b.width * n,
            a.img.height = b.height * n)
        }
    }()
      , w = function() {
        var g = []
          , b = null 
          , l = function() {
            for (var h = 0; h < g.length; h++)
                g[h].end ? g.splice(h--, 1) : g[h]();
            g.length || 
            (clearInterval(b),
            b = null )
        }
        ;
        return function(h, p, d, f) {
            var a, n, c, k, m, e = new Image;
            e.src = h;
            e.complete ? (p.call(e),
            d && d.call(e)) : (n = e.width,
            c = e.height,
            e.onerror = function() {
                f && f.call(e);
                a.end = !0;
                e = e.onload = e.onerror = null 
            }
            ,
            a = function() {
                k = e.width;
                m = e.height;
                if (k !== n || m !== c || 1024 < k * m)
                    p.call(e),
                    a.end = !0
            }
            ,
            a(),
            e.onload = function() {
                !a.end && a();
                d && d.call(e);
                e = e.onload = e.onerror = null 
            }
            ,
            a.end || (g.push(a),
            null  === b && (b = setInterval(l, 40))))
        }
    }()
})(document, jQuery, function(r) {
    window.console && console.log(r)
});
jQuery.extend({
    highlighter: {
        __config__: {
            sourceHtmlDataKey: "__jquery.highlighter.data.sourceHTML__"
        }
    }
});
jQuery.fn.highlight = function(f, n) {
    var k = jQuery.extend({
        hClass: null ,
        hColor: "#C03",
        separator: " ",
        wrapper: "em",
        useDefaultStyle: !0,
        needUnhighlight: !1
    }, n)
      , l = "string" == typeof k.hClass && 0 < k.hClass.length
      , r = $("\x3c" + k.wrapper + "/\x3e");
    l ? r.addClass(k.hClass) : k.useDefaultStyle && (r.css("color", k.hColor),
    "em" == k.wrapper && r.css("font-style", "normal"));
    var l = /^\s*$/
      , g = null ;
    if ("string" == typeof f) {
        if (l.test(f))
            return;
        g = f.split(k.separator)
    } else
        jQuery.isArray(f) && (g = f);
    for (var m = 0; m < g.length; m++) {
        var u = g[m];
        if (l.test(u))
            g.splice(m, 
            1);
        else
            for (var s = g.length - 1; s > m; s--)
                u == g[s] && g.splice(s, 1)
    }
    var x = [{
        spChar: "\\",
        escapeChar: "\\\\"
    }, {
        spChar: "$",
        escapeChar: "\\$"
    }, {
        spChar: "(",
        escapeChar: "\\("
    }, {
        spChar: ")",
        escapeChar: "\\)"
    }, {
        spChar: "*",
        escapeChar: "\\*"
    }, {
        spChar: "+",
        escapeChar: "\\+"
    }, {
        spChar: ".",
        escapeChar: "\\."
    }, {
        spChar: "[",
        escapeChar: "\\["
    }, {
        spChar: "?",
        escapeChar: "\\?"
    }, {
        spChar: "^",
        escapeChar: "\\^"
    }, {
        spChar: "{",
        escapeChar: "\\{"
    }, {
        spChar: "|",
        escapeChar: "\\|"
    }]
      , v = /<\/?[a-z][a-z0-9]*[^<>]*>/ig
      , w = /&(?:[a-z]+?|#[0-9]+?|#x[0-9a-f]+?);/ig
      , 
    t = $("\x3cdiv /\x3e");
    return this.each(function() {
        var f = $(this)
          , h = f.data(jQuery.highlighter.__config__.sourceHtmlDataKey);
        h || (h = f.html(),
        k.needUnhighlight && f.data(jQuery.highlighter.__config__.sourceHtmlDataKey, h));
        for (var a = null , b = []; null  != (a = v.exec(h)); )
            a = {
                start: a.index,
                end: v.lastIndex,
                tag: a[0]
            },
            b.push(a);
        for (var p = []; null  != (a = w.exec(h)); )
            a = {
                start: a.index,
                end: w.lastIndex,
                tag: a[0]
            },
            p.push(a);
        for (var e = [], c = 0; c < g.length; c++) {
            var m = t.text(g[c]).html();
            jQuery.each(x, function(a, b) {
                m = m.replace(b.spChar, 
                b.escapeChar)
            });
            for (var d = new RegExp(m,"ig"); null  != (a = d.exec(h)); )
                a = {
                    start: a.index,
                    end: d.lastIndex
                },
                e.push(a)
        }
        for (c = e.length - 1; 0 <= c; c--)
            for (a = e[c],
            d = 0; d < b.length; d++) {
                var n = b[d];
                if (a.start > n.start && a.end < n.end) {
                    e.splice(c, 1);
                    break
                }
            }
        for (c = e.length - 1; 0 <= c; c--)
            for (a = e[c],
            d = 0; d < p.length; d++) {
                b = p[d];
                if (a.start > b.start && a.end <= b.end || a.start >= b.start && a.end < b.end) {
                    e.splice(c, 1);
                    break
                }
                if (a.start > b.start && a.start < b.end && a.end > b.end || a.start < b.start && a.end > b.start && a.end < b.end) {
                    e.splice(c, 1);
                    break
                }
            }
        p = [];
        for (c = 
        0; c < e.length; c++) {
            a = e[c];
            for (d = e.length - 1; d > c; d--)
                b = e[d],
                a.start <= b.start && a.end >= b.start && a.end < b.end ? (a.end = b.end,
                e.splice(d, 1)) : b.start < a.start && b.end >= a.start && b.end <= a.end ? (a.start = b.start,
                e.splice(d, 1)) : a.start <= b.start && a.end >= b.end ? e.splice(d, 1) : a.start >= b.start && a.end <= b.end && (a.start = b.start,
                a.end = b.end,
                e.splice(d, 1));
            p.push(a)
        }
        p.sort(function(a, b) {
            return a.start - b.start
        });
        var l = []
          , q = 0;
        jQuery.each(p, function(a, b) {
            q < b.start && l.push(h.substring(q, b.start));
            t.empty().append(r.clone().html(h.substring(b.start, 
            b.end)));
            l.push(t.html());
            q = b.end
        });
        q < h.length && l.push(h.substr(q));
        f.html(l.join(""))
    })
}
;
jQuery.fn.unhighlight = function() {
    return this.each(function() {
        var f = $(this)
          , n = f.data(jQuery.highlighter.__config__.sourceHtmlDataKey);
        n && (f.html(n),
        f.removeData(jQuery.highlighter.__config__.sourceHtmlDataKey))
    })
}
;
(function(s, D, f, K) {
    var J = f("html")
      , p = f(s)
      , q = f(D)
      , b = f.fancybox = function() {
        b.open.apply(this, arguments)
    }
      , I = navigator.userAgent.match(/msie/i)
      , v = null 
      , t = void 0 !== D.createTouch
      , y = function(a) {
        return a && a.hasOwnProperty && a instanceof f
    }
      , r = function(a) {
        return a && "string" === f.type(a)
    }
      , F = function(a) {
        return r(a) && 0 < a.indexOf("%")
    }
      , m = function(a, d) {
        var e = parseInt(a, 10) || 0;
        d && F(a) && (e *= b.getViewport()[d] / 100);
        return Math.ceil(e)
    }
      , w = function(a, b) {
        return m(a, b) + "px"
    }
    ;
    f.extend(b, {
        version: "2.1.5",
        defaults: {
            padding: 15,
            margin: 20,
            width: 800,
            height: 600,
            minWidth: 100,
            minHeight: 100,
            maxWidth: 9999,
            maxHeight: 9999,
            pixelRatio: 1,
            autoSize: !0,
            autoHeight: !1,
            autoWidth: !1,
            autoResize: !0,
            autoCenter: !t,
            fitToView: !0,
            aspectRatio: !1,
            topRatio: .5,
            leftRatio: .5,
            scrolling: "auto",
            wrapCSS: "",
            arrows: !0,
            closeBtn: !0,
            closeClick: !1,
            nextClick: !1,
            mouseWheel: !0,
            autoPlay: !1,
            playSpeed: 3E3,
            preload: 3,
            modal: !1,
            loop: !0,
            ajax: {
                dataType: "html",
                headers: {
                    "X-fancyBox": !0
                }
            },
            iframe: {
                scrolling: "auto",
                preload: !0
            },
            swf: {
                wmode: "transparent",
                allowfullscreen: "true",
                allowscriptaccess: "always"
            },
            keys: {
                next: {
                    13: "left",
                    34: "up",
                    39: "left",
                    40: "up"
                },
                prev: {
                    8: "right",
                    33: "down",
                    37: "right",
                    38: "down"
                },
                close: [27],
                play: [32],
                toggle: [70]
            },
            direction: {
                next: "left",
                prev: "right"
            },
            scrollOutside: !0,
            index: 0,
            type: null ,
            href: null ,
            content: null ,
            title: null ,
            tpl: {
                wrap: '\x3cdiv class\x3d"fancybox-wrap" tabIndex\x3d"-1"\x3e\x3cdiv class\x3d"fancybox-skin"\x3e\x3cdiv class\x3d"fancybox-outer"\x3e\x3cdiv class\x3d"fancybox-inner"\x3e\x3c/div\x3e\x3c/div\x3e\x3c/div\x3e\x3c/div\x3e',
                image: '\x3cimg class\x3d"fancybox-image" src\x3d"{href}" alt\x3d"" /\x3e',
                iframe: '\x3ciframe id\x3d"fancybox-frame{rnd}" name\x3d"fancybox-frame{rnd}" class\x3d"fancybox-iframe" frameborder\x3d"0" vspace\x3d"0" hspace\x3d"0" webkitAllowFullScreen mozallowfullscreen allowFullScreen' + (I ? ' allowtransparency\x3d"true"' : "") + "\x3e\x3c/iframe\x3e",
                error: '\x3cp class\x3d"fancybox-error"\x3eThe requested content cannot be loaded.\x3cbr/\x3ePlease try again later.\x3c/p\x3e',
                closeBtn: '\x3ca title\x3d"Close" class\x3d"fancybox-item fancybox-close" href\x3d"javascript:;"\x3e\x3c/a\x3e',
                next: '\x3ca title\x3d"Next" class\x3d"fancybox-nav fancybox-next" href\x3d"javascript:;"\x3e\x3cspan\x3e\x3c/span\x3e\x3c/a\x3e',
                prev: '\x3ca title\x3d"Previous" class\x3d"fancybox-nav fancybox-prev" href\x3d"javascript:;"\x3e\x3cspan\x3e\x3c/span\x3e\x3c/a\x3e'
            },
            openEffect: "fade",
            openSpeed: 250,
            openEasing: "swing",
            openOpacity: !0,
            openMethod: "zoomIn",
            closeEffect: "fade",
            closeSpeed: 250,
            closeEasing: "swing",
            closeOpacity: !0,
            closeMethod: "zoomOut",
            nextEffect: "elastic",
            nextSpeed: 250,
            nextEasing: "swing",
            nextMethod: "changeIn",
            prevEffect: "elastic",
            prevSpeed: 250,
            prevEasing: "swing",
            prevMethod: "changeOut",
            helpers: {
                overlay: !0,
                title: !0
            },
            onCancel: f.noop,
            beforeLoad: f.noop,
            afterLoad: f.noop,
            beforeShow: f.noop,
            afterShow: f.noop,
            beforeChange: f.noop,
            beforeClose: f.noop,
            afterClose: f.noop
        },
        group: {},
        opts: {},
        previous: null ,
        coming: null ,
        current: null ,
        isActive: !1,
        isOpen: !1,
        isOpened: !1,
        wrap: null ,
        skin: null ,
        outer: null ,
        inner: null ,
        player: {
            timer: null ,
            isActive: !1
        },
        ajaxLoad: null ,
        imgPreload: null ,
        transitions: {},
        helpers: {},
        open: function(a, d) {
            if (a && (f.isPlainObject(d) || 
            (d = {}),
            !1 !== b.close(!0)))
                return f.isArray(a) || (a = y(a) ? f(a).get() : [a]),
                f.each(a, function(e, c) {
                    var l = {}, g, k, h, n, m;
                    "object" === f.type(c) && (c.nodeType && (c = f(c)),
                    y(c) ? (l = {
                        href: c.data("fancybox-href") || c.attr("href"),
                        title: c.data("fancybox-title") || c.attr("title"),
                        type: c.data("fancybox-type") || c.attr("type"),
                        isDom: !0,
                        element: c
                    },
                    f.metadata && f.extend(!0, l, c.metadata())) : l = c);
                    g = d.href || l.href || (r(c) ? c : null );
                    k = void 0 !== d.title ? d.title : l.title || "";
                    n = (h = d.content || l.content) ? "html" : d.type || l.type;
                    !n && l.isDom && 
                    (n = c.data("fancybox-type"),
                    n || (n = (n = c.prop("class").match(/fancybox\.(\w+)/)) ? n[1] : null ));
                    r(g) && (n || (b.isImage(g) ? n = "image" : b.isSWF(g) ? n = "swf" : "#" === g.charAt(0) ? n = "inline" : r(c) && (n = "html",
                    h = c)),
                    "ajax" === n && (m = g.split(/\s+/, 2),
                    g = m.shift(),
                    m = m.shift()));
                    h || ("inline" === n ? g ? h = f(r(g) ? g.replace(/.*(?=#[^\s]+$)/, "") : g) : l.isDom && (h = c) : "html" === n ? h = g : n || g || !l.isDom || (n = "inline",
                    h = c));
                    f.extend(l, {
                        href: g,
                        type: n,
                        content: h,
                        title: k,
                        selector: m
                    });
                    a[e] = l
                }),
                b.opts = f.extend(!0, {}, b.defaults, d),
                void 0 !== d.keys && (b.opts.keys = 
                d.keys ? f.extend({}, b.defaults.keys, d.keys) : !1),
                b.group = a,
                b._start(b.opts.index)
        },
        cancel: function() {
            var a = b.coming;
            a && !1 !== b.trigger("onCancel") && (b.hideLoading(),
            b.ajaxLoad && b.ajaxLoad.abort(),
            b.ajaxLoad = null ,
            b.imgPreload && (b.imgPreload.onload = b.imgPreload.onerror = null ),
            a.wrap && a.wrap.stop(!0, !0).trigger("onReset").remove(),
            b.coming = null ,
            b.current || b._afterZoomOut(a))
        },
        close: function(a) {
            b.cancel();
            !1 !== b.trigger("beforeClose") && (b.unbindEvents(),
            b.isActive && (b.isOpen && !0 !== a ? (b.isOpen = b.isOpened = 
            !1,
            b.isClosing = !0,
            f(".fancybox-item, .fancybox-nav").remove(),
            b.wrap.stop(!0, !0).removeClass("fancybox-opened"),
            b.transitions[b.current.closeMethod]()) : (f(".fancybox-wrap").stop(!0).trigger("onReset").remove(),
            b._afterZoomOut())))
        },
        play: function(a) {
            var d = function() {
                clearTimeout(b.player.timer)
            }
              , e = function() {
                d();
                b.current && b.player.isActive && (b.player.timer = setTimeout(b.next, b.current.playSpeed))
            }
              , c = function() {
                d();
                q.unbind(".player");
                b.player.isActive = !1;
                b.trigger("onPlayEnd")
            }
            ;
            !0 === a || !b.player.isActive && 
            !1 !== a ? b.current && (b.current.loop || b.current.index < b.group.length - 1) && (b.player.isActive = !0,
            q.bind({
                "onCancel.player beforeClose.player": c,
                "onUpdate.player": e,
                "beforeLoad.player": d
            }),
            e(),
            b.trigger("onPlayStart")) : c()
        },
        next: function(a) {
            var d = b.current;
            d && (r(a) || (a = d.direction.next),
            b.jumpto(d.index + 1, a, "next"))
        },
        prev: function(a) {
            var d = b.current;
            d && (r(a) || (a = d.direction.prev),
            b.jumpto(d.index - 1, a, "prev"))
        },
        jumpto: function(a, d, e) {
            var c = b.current;
            c && (a = m(a),
            b.direction = d || c.direction[a >= c.index ? "next" : 
            "prev"],
            b.router = e || "jumpto",
            c.loop && (0 > a && (a = c.group.length + a % c.group.length),
            a %= c.group.length),
            void 0 !== c.group[a] && (b.cancel(),
            b._start(a)))
        },
        reposition: function(a, d) {
            var e = b.current, c = e ? e.wrap : null , l;
            c && (l = b._getPosition(d),
            a && "scroll" === a.type ? (delete l.position,
            c.stop(!0, !0).animate(l, 200)) : (c.css(l),
            e.pos = f.extend({}, e.dim, l)))
        },
        update: function(a) {
            var d = a && a.type
              , e = !d || "orientationchange" === d;
            e && (clearTimeout(v),
            v = null );
            b.isOpen && !v && (v = setTimeout(function() {
                var c = b.current;
                c && !b.isClosing && 
                (b.wrap.removeClass("fancybox-tmp"),
                (e || "load" === d || "resize" === d && c.autoResize) && b._setDimension(),
                "scroll" === d && c.canShrink || b.reposition(a),
                b.trigger("onUpdate"),
                v = null )
            }, e && !t ? 0 : 300))
        },
        toggle: function(a) {
            b.isOpen && (b.current.fitToView = "boolean" === f.type(a) ? a : !b.current.fitToView,
            t && (b.wrap.removeAttr("style").addClass("fancybox-tmp"),
            b.trigger("onUpdate")),
            b.update())
        },
        hideLoading: function() {
            q.unbind(".loading");
            f("#fancybox-loading").remove()
        },
        showLoading: function() {
            var a, d;
            b.hideLoading();
            a = 
            f('\x3cdiv id\x3d"fancybox-loading"\x3e\x3cdiv\x3e\x3c/div\x3e\x3c/div\x3e').click(b.cancel).appendTo("body");
            q.bind("keydown.loading", function(a) {
                27 === (a.which || a.keyCode) && (a.preventDefault(),
                b.cancel())
            });
            b.defaults.fixed || (d = b.getViewport(),
            a.css({
                position: "absolute",
                top: .5 * d.h + d.y,
                left: .5 * d.w + d.x
            }))
        },
        getViewport: function() {
            var a = b.current && b.current.locked || !1
              , d = {
                x: p.scrollLeft(),
                y: p.scrollTop()
            };
            a ? (d.w = a[0].clientWidth,
            d.h = a[0].clientHeight) : (d.w = t && s.innerWidth ? s.innerWidth : p.width(),
            d.h = t && 
            s.innerHeight ? s.innerHeight : p.height());
            return d
        },
        unbindEvents: function() {
            b.wrap && y(b.wrap) && b.wrap.unbind(".fb");
            q.unbind(".fb");
            p.unbind(".fb")
        },
        bindEvents: function() {
            var a = b.current, d;
            a && (p.bind("orientationchange.fb" + (t ? "" : " resize.fb") + (a.autoCenter && !a.locked ? " scroll.fb" : ""), b.update),
            (d = a.keys) && q.bind("keydown.fb", function(e) {
                var c = e.which || e.keyCode
                  , l = e.target || e.srcElement;
                if (27 === c && b.coming)
                    return !1;
                e.ctrlKey || e.altKey || e.shiftKey || e.metaKey || l && (l.type || f(l).is("[contenteditable]")) || 
                f.each(d, function(d, l) {
                    if (1 < a.group.length && void 0 !== l[c])
                        return b[d](l[c]),
                        e.preventDefault(),
                        !1;
                    if (-1 < f.inArray(c, l))
                        return b[d](),
                        e.preventDefault(),
                        !1
                })
            }),
            f.fn.mousewheel && a.mouseWheel && b.wrap.bind("mousewheel.fb", function(d, c, l, g) {
                for (var k = f(d.target || null ), h = !1; k.length && !(h || k.is(".fancybox-skin") || k.is(".fancybox-wrap")); )
                    h = (h = k[0]) && !(h.style.overflow && "hidden" === h.style.overflow) && (h.clientWidth && h.scrollWidth > h.clientWidth || h.clientHeight && h.scrollHeight > h.clientHeight),
                    k = f(k).parent();
                0 !== c && !h && 1 < b.group.length && !a.canShrink && (0 < g || 0 < l ? b.prev(0 < g ? "down" : "left") : (0 > g || 0 > l) && b.next(0 > g ? "up" : "right"),
                d.preventDefault())
            }))
        },
        trigger: function(a, d) {
            var e, c = d || b.coming || b.current;
            if (c) {
                f.isFunction(c[a]) && (e = c[a].apply(c, Array.prototype.slice.call(arguments, 1)));
                if (!1 === e)
                    return !1;
                c.helpers && f.each(c.helpers, function(d, e) {
                    if (e && b.helpers[d] && f.isFunction(b.helpers[d][a]))
                        b.helpers[d][a](f.extend(!0, {}, b.helpers[d].defaults, e), c)
                });
                q.trigger(a)
            }
        },
        isImage: function(a) {
            return r(a) && a.match(/(^data:image\/.*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg)((\?|#).*)?$)/i)
        },
        isSWF: function(a) {
            return r(a) && a.match(/\.(swf)((\?|#).*)?$/i)
        },
        _start: function(a) {
            var d = {}, e, c;
            a = m(a);
            e = b.group[a] || null ;
            if (!e)
                return !1;
            d = f.extend(!0, {}, b.opts, e);
            e = d.margin;
            c = d.padding;
            "number" === f.type(e) && (d.margin = [e, e, e, e]);
            "number" === f.type(c) && (d.padding = [c, c, c, c]);
            d.modal && f.extend(!0, d, {
                closeBtn: !1,
                closeClick: !1,
                nextClick: !1,
                arrows: !1,
                mouseWheel: !1,
                keys: null ,
                helpers: {
                    overlay: {
                        closeClick: !1
                    }
                }
            });
            d.autoSize && (d.autoWidth = d.autoHeight = !0);
            "auto" === d.width && (d.autoWidth = !0);
            "auto" === d.height && 
            (d.autoHeight = !0);
            d.group = b.group;
            d.index = a;
            b.coming = d;
            if (!1 === b.trigger("beforeLoad"))
                b.coming = null ;
            else {
                c = d.type;
                e = d.href;
                if (!c)
                    return b.coming = null ,
                    b.current && b.router && "jumpto" !== b.router ? (b.current.index = a,
                    b[b.router](b.direction)) : !1;
                b.isActive = !0;
                if ("image" === c || "swf" === c)
                    d.autoHeight = d.autoWidth = !1,
                    d.scrolling = "visible";
                "image" === c && (d.aspectRatio = !0);
                "iframe" === c && t && (d.scrolling = "scroll");
                d.wrap = f(d.tpl.wrap).addClass("fancybox-" + (t ? "mobile" : "desktop") + " fancybox-type-" + c + " fancybox-tmp " + 
                d.wrapCSS).appendTo(d.parent || "body");
                f.extend(d, {
                    skin: f(".fancybox-skin", d.wrap),
                    outer: f(".fancybox-outer", d.wrap),
                    inner: f(".fancybox-inner", d.wrap)
                });
                f.each(["Top", "Right", "Bottom", "Left"], function(a, b) {
                    d.skin.css("padding" + b, w(d.padding[a]))
                });
                b.trigger("onReady");
                if ("inline" === c || "html" === c) {
                    if (!d.content || !d.content.length)
                        return b._error("content")
                } else if (!e)
                    return b._error("href");
                "image" === c ? b._loadImage() : "ajax" === c ? b._loadAjax() : "iframe" === c ? b._loadIframe() : b._afterLoad()
            }
        },
        _error: function(a) {
            f.extend(b.coming, 
            {
                type: "html",
                autoWidth: !0,
                autoHeight: !0,
                minWidth: 0,
                minHeight: 0,
                scrolling: "no",
                hasError: a,
                content: b.coming.tpl.error
            });
            b._afterLoad()
        },
        _loadImage: function() {
            var a = b.imgPreload = new Image;
            a.onload = function() {
                this.onload = this.onerror = null ;
                b.coming.width = this.width / b.opts.pixelRatio;
                b.coming.height = this.height / b.opts.pixelRatio;
                b._afterLoad()
            }
            ;
            a.onerror = function() {
                this.onload = this.onerror = null ;
                b._error("image")
            }
            ;
            a.src = b.coming.href;
            !0 !== a.complete && b.showLoading()
        },
        _loadAjax: function() {
            var a = b.coming;
            b.showLoading();
            b.ajaxLoad = f.ajax(f.extend({}, a.ajax, {
                url: a.href,
                error: function(a, e) {
                    b.coming && "abort" !== e ? b._error("ajax", a) : b.hideLoading()
                },
                success: function(d, e) {
                    "success" === e && (a.content = d,
                    b._afterLoad())
                }
            }))
        },
        _loadIframe: function() {
            var a = b.coming
              , d = f(a.tpl.iframe.replace(/\{rnd\}/g, (new Date).getTime())).attr("scrolling", t ? "auto" : a.iframe.scrolling).attr("src", a.href);
            f(a.wrap).bind("onReset", function() {
                try {
                    f(this).find("iframe").hide().attr("src", "//about:blank").end().empty()
                } catch (a) {}
            });
            a.iframe.preload && (b.showLoading(),
            d.one("load", function() {
                f(this).data("ready", 1);
                t || f(this).bind("load.fb", b.update);
                f(this).parents(".fancybox-wrap").width("100%").removeClass("fancybox-tmp").show();
                b._afterLoad()
            }));
            a.content = d.appendTo(a.inner);
            a.iframe.preload || b._afterLoad()
        },
        _preloadImages: function() {
            var a = b.group, d = b.current, e = a.length, c = d.preload ? Math.min(d.preload, e - 1) : 0, f, g;
            for (g = 1; g <= c; g += 1)
                f = a[(d.index + g) % e],
                "image" === f.type && f.href && ((new Image).src = f.href)
        },
        _afterLoad: function() {
            var a = 
            b.coming, d = b.current, e, c, l, g, k;
            b.hideLoading();
            if (a && !1 !== b.isActive)
                if (!1 === b.trigger("afterLoad", a, d))
                    a.wrap.stop(!0).trigger("onReset").remove(),
                    b.coming = null ;
                else {
                    d && (b.trigger("beforeChange", d),
                    d.wrap.stop(!0).removeClass("fancybox-opened").find(".fancybox-item, .fancybox-nav").remove());
                    b.unbindEvents();
                    e = a.content;
                    c = a.type;
                    l = a.scrolling;
                    f.extend(b, {
                        wrap: a.wrap,
                        skin: a.skin,
                        outer: a.outer,
                        inner: a.inner,
                        current: a,
                        previous: d
                    });
                    g = a.href;
                    switch (c) {
                    case "inline":
                    case "ajax":
                    case "html":
                        a.selector ? 
                        e = f("\x3cdiv\x3e").html(e).find(a.selector) : y(e) && (e.data("fancybox-placeholder") || e.data("fancybox-placeholder", f('\x3cdiv class\x3d"fancybox-placeholder"\x3e\x3c/div\x3e').insertAfter(e).hide()),
                        e = e.show().detach(),
                        a.wrap.bind("onReset", function() {
                            f(this).find(e).length && e.hide().replaceAll(e.data("fancybox-placeholder")).data("fancybox-placeholder", !1)
                        }));
                        break;
                    case "image":
                        e = a.tpl.image.replace("{href}", g);
                        break;
                    case "swf":
                        e = '\x3cobject id\x3d"fancybox-swf" classid\x3d"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width\x3d"100%" height\x3d"100%"\x3e\x3cparam name\x3d"movie" value\x3d"' + 
                        g + '"\x3e\x3c/param\x3e',
                        k = "",
                        f.each(a.swf, function(a, b) {
                            e += '\x3cparam name\x3d"' + a + '" value\x3d"' + b + '"\x3e\x3c/param\x3e';
                            k += " " + a + '\x3d"' + b + '"'
                        }),
                        e += '\x3cembed src\x3d"' + g + '" type\x3d"application/x-shockwave-flash" width\x3d"100%" height\x3d"100%"' + k + "\x3e\x3c/embed\x3e\x3c/object\x3e"
                    }
                    y(e) && e.parent().is(a.inner) || a.inner.append(e);
                    b.trigger("beforeShow");
                    a.inner.css("overflow", "yes" === l ? "scroll" : "no" === l ? "hidden" : l);
                    b._setDimension();
                    b.reposition();
                    b.isOpen = !1;
                    b.coming = null ;
                    b.bindEvents();
                    if (!b.isOpened)
                        f(".fancybox-wrap").not(a.wrap).stop(!0).trigger("onReset").remove();
                    else if (d.prevMethod)
                        b.transitions[d.prevMethod]();
                    b.transitions[b.isOpened ? a.nextMethod : a.openMethod]();
                    b._preloadImages()
                }
        },
        _setDimension: function() {
            var a = b.getViewport(), d = 0, e = !1, c = !1, e = b.wrap, l = b.skin, g = b.inner, k = b.current, c = k.width, h = k.height, n = k.minWidth, u = k.minHeight, p = k.maxWidth, q = k.maxHeight, t = k.scrolling, r = k.scrollOutside ? k.scrollbarWidth : 0, x = k.margin, z = m(x[1] + x[3]), s = m(x[0] + x[2]), y, A, v, C, B, G, D, E, H;
            e.add(l).add(g).width("auto").height("auto").removeClass("fancybox-tmp");
            x = m(l.outerWidth(!0) - 
            l.width());
            y = m(l.outerHeight(!0) - l.height());
            A = z + x;
            v = s + y;
            C = F(c) ? (a.w - A) * m(c) / 100 : c;
            B = F(h) ? (a.h - v) * m(h) / 100 : h;
            if ("iframe" === k.type) {
                if (H = k.content,
                k.autoHeight && 1 === H.data("ready"))
                    try {
                        H[0].contentWindow.document.location && (g.width(C).height(9999),
                        G = H.contents().find("body"),
                        r && G.css("overflow-x", "hidden"),
                        B = G.outerHeight(!0))
                    } catch (I) {}
            } else if (k.autoWidth || k.autoHeight)
                g.addClass("fancybox-tmp"),
                k.autoWidth || g.width(C),
                k.autoHeight || g.height(B),
                k.autoWidth && (C = g.width()),
                k.autoHeight && (B = g.height()),
                g.removeClass("fancybox-tmp");
            c = m(C);
            h = m(B);
            E = C / B;
            n = m(F(n) ? m(n, "w") - A : n);
            p = m(F(p) ? m(p, "w") - A : p);
            u = m(F(u) ? m(u, "h") - v : u);
            q = m(F(q) ? m(q, "h") - v : q);
            G = p;
            D = q;
            k.fitToView && (p = Math.min(a.w - A, p),
            q = Math.min(a.h - v, q));
            A = a.w - z;
            s = a.h - s;
            k.aspectRatio ? (c > p && (c = p,
            h = m(c / E)),
            h > q && (h = q,
            c = m(h * E)),
            c < n && (c = n,
            h = m(c / E)),
            h < u && (h = u,
            c = m(h * E))) : (c = Math.max(n, Math.min(c, p)),
            k.autoHeight && "iframe" !== k.type && (g.width(c),
            h = g.height()),
            h = Math.max(u, Math.min(h, q)));
            if (k.fitToView)
                if (g.width(c).height(h),
                e.width(c + x),
                a = e.width(),
                z = e.height(),
                k.aspectRatio)
                    for (; (a > A || z > s) && c > n && h > u && !(19 < d++); )
                        h = Math.max(u, Math.min(q, h - 10)),
                        c = m(h * E),
                        c < n && (c = n,
                        h = m(c / E)),
                        c > p && (c = p,
                        h = m(c / E)),
                        g.width(c).height(h),
                        e.width(c + x),
                        a = e.width(),
                        z = e.height();
                else
                    c = Math.max(n, Math.min(c, c - (a - A))),
                    h = Math.max(u, Math.min(h, h - (z - s)));
            r && "auto" === t && h < B && c + x + r < A && (c += r);
            g.width(c).height(h);
            e.width(c + x);
            a = e.width();
            z = e.height();
            e = (a > A || z > s) && c > n && h > u;
            c = k.aspectRatio ? c < G && h < D && c < C && h < B : (c < G || h < D) && (c < C || h < B);
            f.extend(k, {
                dim: {
                    width: w(a),
                    height: w(z)
                },
                origWidth: C,
                origHeight: B,
                canShrink: e,
                canExpand: c,
                wPadding: x,
                hPadding: y,
                wrapSpace: z - l.outerHeight(!0),
                skinSpace: l.height() - h
            });
            !H && k.autoHeight && h > u && h < q && !c && g.height("auto")
        },
        _getPosition: function(a) {
            var d = b.current
              , e = b.getViewport()
              , c = d.margin
              , f = b.wrap.width() + c[1] + c[3]
              , g = b.wrap.height() + c[0] + c[2]
              , c = {
                position: "absolute",
                top: c[0],
                left: c[3]
            };
            d.autoCenter && d.fixed && !a && g <= e.h && f <= e.w ? c.position = "fixed" : d.locked || (c.top += e.y,
            c.left += e.x);
            c.top = w(Math.max(c.top, c.top + (e.h - g) * d.topRatio));
            c.left = w(Math.max(c.left, c.left + (e.w - 
            f) * d.leftRatio));
            return c
        },
        _afterZoomIn: function() {
            var a = b.current;
            a && ((b.isOpen = b.isOpened = !0,
            b.wrap.css("overflow", "visible").addClass("fancybox-opened"),
            b.update(),
            (a.closeClick || a.nextClick && 1 < b.group.length) && b.inner.css("cursor", "pointer").bind("click.fb", function(d) {
                f(d.target).is("a") || f(d.target).parent().is("a") || (d.preventDefault(),
                b[a.closeClick ? "close" : "next"]())
            }),
            a.closeBtn && f(a.tpl.closeBtn).appendTo(b.skin).bind("click.fb", function(a) {
                a.preventDefault();
                b.close()
            }),
            a.arrows && 1 < b.group.length && 
            ((a.loop || 0 < a.index) && f(a.tpl.prev).appendTo(b.outer).bind("click.fb", b.prev),
            (a.loop || a.index < b.group.length - 1) && f(a.tpl.next).appendTo(b.outer).bind("click.fb", b.next)),
            b.trigger("afterShow"),
            a.loop || a.index !== a.group.length - 1) ? b.opts.autoPlay && !b.player.isActive && (b.opts.autoPlay = !1,
            b.play()) : b.play(!1))
        },
        _afterZoomOut: function(a) {
            a = a || b.current;
            f(".fancybox-wrap").trigger("onReset").remove();
            f.extend(b, {
                group: {},
                opts: {},
                router: !1,
                current: null ,
                isActive: !1,
                isOpened: !1,
                isOpen: !1,
                isClosing: !1,
                wrap: null ,
                skin: null ,
                outer: null ,
                inner: null 
            });
            b.trigger("afterClose", a)
        }
    });
    b.transitions = {
        getOrigPosition: function() {
            var a = b.current
              , d = a.element
              , e = a.orig
              , c = {}
              , f = 50
              , g = 50
              , k = a.hPadding
              , h = a.wPadding
              , n = b.getViewport();
            !e && a.isDom && d.is(":visible") && (e = d.find("img:first"),
            e.length || (e = d));
            y(e) ? (c = e.offset(),
            e.is("img") && (f = e.outerWidth(),
            g = e.outerHeight())) : (c.top = n.y + (n.h - g) * a.topRatio,
            c.left = n.x + (n.w - f) * a.leftRatio);
            if ("fixed" === b.wrap.css("position") || a.locked)
                c.top -= n.y,
                c.left -= n.x;
            return c = {
                top: w(c.top - k * a.topRatio),
                left: w(c.left - h * a.leftRatio),
                width: w(f + h),
                height: w(g + k)
            }
        },
        step: function(a, d) {
            var e, c, f = d.prop;
            c = b.current;
            var g = c.wrapSpace
              , k = c.skinSpace;
            if ("width" === f || "height" === f)
                e = d.end === d.start ? 1 : (a - d.start) / (d.end - d.start),
                b.isClosing && (e = 1 - e),
                c = "width" === f ? c.wPadding : c.hPadding,
                c = a - c,
                b.skin[f](m("width" === f ? c : c - g * e)),
                b.inner[f](m("width" === f ? c : c - g * e - k * e))
        },
        zoomIn: function() {
            var a = b.current
              , d = a.pos
              , e = a.openEffect
              , c = "elastic" === e
              , l = f.extend({
                opacity: 1
            }, d);
            delete l.position;
            c ? (d = this.getOrigPosition(),
            a.openOpacity && 
            (d.opacity = .1)) : "fade" === e && (d.opacity = .1);
            b.wrap.css(d).animate(l, {
                duration: "none" === e ? 0 : a.openSpeed,
                easing: a.openEasing,
                step: c ? this.step : null ,
                complete: b._afterZoomIn
            })
        },
        zoomOut: function() {
            var a = b.current
              , d = a.closeEffect
              , e = "elastic" === d
              , c = {
                opacity: .1
            };
            e && (c = this.getOrigPosition(),
            a.closeOpacity && (c.opacity = .1));
            b.wrap.animate(c, {
                duration: "none" === d ? 0 : a.closeSpeed,
                easing: a.closeEasing,
                step: e ? this.step : null ,
                complete: b._afterZoomOut
            })
        },
        changeIn: function() {
            var a = b.current, d = a.nextEffect, e = a.pos, c = {
                opacity: 1
            }, 
            f = b.direction, g;
            e.opacity = .1;
            "elastic" === d && (g = "down" === f || "up" === f ? "top" : "left",
            "down" === f || "right" === f ? (e[g] = w(m(e[g]) - 200),
            c[g] = "+\x3d200px") : (e[g] = w(m(e[g]) + 200),
            c[g] = "-\x3d200px"));
            "none" === d ? b._afterZoomIn() : b.wrap.css(e).animate(c, {
                duration: a.nextSpeed,
                easing: a.nextEasing,
                complete: b._afterZoomIn
            })
        },
        changeOut: function() {
            var a = b.previous
              , d = a.prevEffect
              , e = {
                opacity: .1
            }
              , c = b.direction;
            "elastic" === d && (e["down" === c || "up" === c ? "top" : "left"] = ("up" === c || "left" === c ? "-" : "+") + "\x3d200px");
            a.wrap.animate(e, 
            {
                duration: "none" === d ? 0 : a.prevSpeed,
                easing: a.prevEasing,
                complete: function() {
                    f(this).trigger("onReset").remove()
                }
            })
        }
    };
    b.helpers.overlay = {
        defaults: {
            closeClick: !0,
            speedOut: 200,
            showEarly: !0,
            css: {},
            locked: !t,
            fixed: !0
        },
        overlay: null ,
        fixed: !1,
        el: f("html"),
        create: function(a) {
            a = f.extend({}, this.defaults, a);
            this.overlay && this.close();
            this.overlay = f('\x3cdiv class\x3d"fancybox-overlay"\x3e\x3c/div\x3e').appendTo(b.coming ? b.coming.parent : a.parent);
            this.fixed = !1;
            a.fixed && b.defaults.fixed && (this.overlay.addClass("fancybox-overlay-fixed"),
            this.fixed = !0)
        },
        open: function(a) {
            var d = this;
            a = f.extend({}, this.defaults, a);
            this.overlay ? this.overlay.unbind(".overlay").width("auto").height("auto") : this.create(a);
            this.fixed || (p.bind("resize.overlay", f.proxy(this.update, this)),
            this.update());
            a.closeClick && this.overlay.bind("click.overlay", function(a) {
                if (f(a.target).hasClass("fancybox-overlay"))
                    return b.isActive ? b.close() : d.close(),
                    !1
            });
            this.overlay.css(a.css).show()
        },
        close: function() {
            var a, b;
            p.unbind("resize.overlay");
            this.el.hasClass("fancybox-lock") && 
            (f(".fancybox-margin").removeClass("fancybox-margin"),
            a = p.scrollTop(),
            b = p.scrollLeft(),
            this.el.removeClass("fancybox-lock"),
            p.scrollTop(a).scrollLeft(b));
            f(".fancybox-overlay").remove().hide();
            f.extend(this, {
                overlay: null ,
                fixed: !1
            })
        },
        update: function() {
            var a = "100%", b;
            this.overlay.width(a).height("100%");
            I ? (b = Math.max(D.documentElement.offsetWidth, D.body.offsetWidth),
            q.width() > b && (a = q.width())) : q.width() > p.width() && (a = q.width());
            this.overlay.width(a).height(q.height())
        },
        onReady: function(a, b) {
            var e = this.overlay;
            f(".fancybox-overlay").stop(!0, !0);
            e || this.create(a);
            a.locked && this.fixed && b.fixed && (e || (this.margin = q.height() > p.height() ? f("html").css("margin-right").replace("px", "") : !1),
            b.locked = this.overlay.append(b.wrap),
            b.fixed = !1);
            !0 === a.showEarly && this.beforeShow.apply(this, arguments)
        },
        beforeShow: function(a, b) {
            var e, c;
            b.locked && (!1 !== this.margin && (f("*").filter(function() {
                return "fixed" === f(this).css("position") && !f(this).hasClass("fancybox-overlay") && !f(this).hasClass("fancybox-wrap")
            }).addClass("fancybox-margin"),
            this.el.addClass("fancybox-margin")),
            e = p.scrollTop(),
            c = p.scrollLeft(),
            this.el.addClass("fancybox-lock"),
            p.scrollTop(e).scrollLeft(c));
            this.open(a)
        },
        onUpdate: function() {
            this.fixed || this.update()
        },
        afterClose: function(a) {
            this.overlay && !b.coming && this.overlay.fadeOut(a.speedOut, f.proxy(this.close, this))
        }
    };
    b.helpers.title = {
        defaults: {
            type: "float",
            position: "bottom"
        },
        beforeShow: function(a) {
            var d = b.current
              , e = d.title
              , c = a.type;
            f.isFunction(e) && (e = e.call(d.element, d));
            if (r(e) && "" !== f.trim(e)) {
                d = f('\x3cdiv class\x3d"fancybox-title fancybox-title-' + 
                c + '-wrap"\x3e' + e + "\x3c/div\x3e");
                switch (c) {
                case "inside":
                    c = b.skin;
                    break;
                case "outside":
                    c = b.wrap;
                    break;
                case "over":
                    c = b.inner;
                    break;
                default:
                    c = b.skin,
                    d.appendTo("body"),
                    I && d.width(d.width()),
                    d.wrapInner('\x3cspan class\x3d"child"\x3e\x3c/span\x3e'),
                    b.current.margin[2] += Math.abs(m(d.css("margin-bottom")))
                }
                d["top" === a.position ? "prependTo" : "appendTo"](c)
            }
        }
    };
    f.fn.fancybox = function(a) {
        var d, e = f(this), c = this.selector || "", l = function(g) {
            var k = f(this).blur(), h = d, l, m;
            g.ctrlKey || g.altKey || g.shiftKey || g.metaKey || 
            k.is(".fancybox-wrap") || (l = a.groupAttr || "data-fancybox-group",
            m = k.attr(l),
            m || (l = "rel",
            m = k.get(0)[l]),
            m && "" !== m && "nofollow" !== m && (k = c.length ? f(c) : e,
            k = k.filter("[" + l + '\x3d"' + m + '"]'),
            h = k.index(this)),
            a.index = h,
            !1 !== b.open(k, a) && g.preventDefault())
        }
        ;
        a = a || {};
        d = a.index || 0;
        c && !1 !== a.live ? q.undelegate(c, "click.fb-start").delegate(c + ":not('.fancybox-item, .fancybox-nav')", "click.fb-start", l) : e.unbind("click.fb-start").bind("click.fb-start", l);
        this.filter("[data-fancybox-start\x3d1]").trigger("click");
        return this
    }
    ;
    q.ready(function() {
        var a, d;
        void 0 === f.scrollbarWidth && (f.scrollbarWidth = function() {
            var a = f('\x3cdiv style\x3d"width:50px;height:50px;overflow:auto"\x3e\x3cdiv/\x3e\x3c/div\x3e').appendTo("body")
              , b = a.children()
              , b = b.innerWidth() - b.height(99).innerWidth();
            a.remove();
            return b
        }
        );
        void 0 === f.support.fixedPosition && (f.support.fixedPosition = function() {
            var a = f('\x3cdiv style\x3d"position:fixed;top:20px;"\x3e\x3c/div\x3e').appendTo("body")
              , b = 20 === a[0].offsetTop || 15 === a[0].offsetTop;
            a.remove();
            return b
        }());
        f.extend(b.defaults, 
        {
            scrollbarWidth: f.scrollbarWidth(),
            fixed: f.support.fixedPosition,
            parent: f("body")
        });
        a = f(s).width();
        J.addClass("fancybox-lock-test");
        d = f(s).width();
        J.removeClass("fancybox-lock-test");
        f("\x3cstyle type\x3d'text/css'\x3e.fancybox-margin{margin-right:" + (d - a) + "px;}\x3c/style\x3e").appendTo("head")
    })
})(window, document, jQuery);
/* Tooltipster v3.2.1 */;(function(e, t, n) {
    function s(t, n) {
        this.bodyOverflowX;
        this.callbacks = {
            hide: [],
            show: []
        };
        this.checkInterval = null ;
        this.Content;
        this.$el = e(t);
        this.$elProxy;
        this.elProxyPosition;
        this.enabled = true;
        this.options = e.extend({}, i, n);
        this.mouseIsOverProxy = false;
        this.namespace = "tooltipster-" + Math.round(Math.random() * 1e5);
        this.Status = "hidden";
        this.timerHide = null ;
        this.timerShow = null ;
        this.$tooltip;
        this.options.iconTheme = this.options.iconTheme.replace(".", "");
        this.options.theme = this.options.theme.replace(".", "");
        this._init()
    }
    function o(t, n) {
        var r = true;
        e.each(t, function(e, i) {
            if (typeof n[e] === "undefined" || t[e] !== n[e]) {
                r = false;
                return false
            }
        });
        return r
    }
    function f() {
        return !a && u
    }
    function l() {
        var e = n.body || n.documentElement
          , t = e.style
          , r = "transition";
        if (typeof t[r] == "string") {
            return true
        }
        v = ["Moz", "Webkit", "Khtml", "O", "ms"],
        r = r.charAt(0).toUpperCase() + r.substr(1);
        for (var i = 0; i < v.length; i++) {
            if (typeof t[v[i] + r] == "string") {
                return true
            }
        }
        return false
    }
    var r = "tooltipster"
      , i = {
        animation: "fade",
        arrow: true,
        arrowColor: "",
        autoClose: true,
        content: null ,
        contentAsHTML: false,
        contentCloning: true,
        delay: 200,
        fixedWidth: 0,
        maxWidth: 0,
        functionInit: function(e, t) {},
        functionBefore: function(e, t) {
            t()
        },
        functionReady: function(e, t) {},
        functionAfter: function(e) {},
        icon: "(?)",
        iconCloning: true,
        iconDesktop: false,
        iconTouch: false,
        iconTheme: "tooltipster-icon",
        interactive: false,
        interactiveTolerance: 350,
        multiple: false,
        offsetX: 0,
        offsetY: 0,
        onlyOne: false,
        position: "top",
        positionTracker: false,
        speed: 350,
        timer: 0,
        theme: "tooltipster-default",
        touchDevices: true,
        trigger: "hover",
        updateAnimation: true
    };
    s.prototype = {
        _init: function() {
            var t = this;
            if (n.querySelector) {
                if (t.options.content !== null ) {
                    t._content_set(t.options.content)
                } else {
                    var r = t.$el.attr("title");
                    if (typeof r === "undefined")
                        r = null ;
                    t._content_set(r)
                }
                var i = t.options.functionInit.call(t.$el, t.$el, t.Content);
                if (typeof i !== "undefined")
                    t._content_set(i);
                t.$el.removeAttr("title").addClass("tooltipstered");
                if (!u && t.options.iconDesktop || u && t.options.iconTouch) {
                    if (typeof t.options.icon === "string") {
                        t.$elProxy = e('<span class="' + t.options.iconTheme + '"></span>');
                        t.$elProxy.text(t.options.icon)
                    } else {
                        if (t.options.iconCloning)
                            t.$elProxy = t.options.icon.clone(true);
                        else
                            t.$elProxy = t.options.icon
                    }
                    t.$elProxy.insertAfter(t.$el)
                } else {
                    t.$elProxy = t.$el
                }
                if (t.options.trigger == "hover") {
                    t.$elProxy.on("mouseenter." + t.namespace, function() {
                        if (!f() || t.options.touchDevices) {
                            t.mouseIsOverProxy = true;
                            t._show()
                        }
                    }).on("mouseleave." + t.namespace, function() {
                        if (!f() || t.options.touchDevices) {
                            t.mouseIsOverProxy = false
                        }
                    });
                    if (u && t.options.touchDevices) {
                        t.$elProxy.on("touchstart." + t.namespace, function() {
                            t._showNow()
                        })
                    }
                } else if (t.options.trigger == "click") {
                    t.$elProxy.on("click." + t.namespace, function() {
                        if (!f() || t.options.touchDevices) {
                            t._show()
                        }
                    })
                }
            }
        },
        _show: function() {
            var e = this;
            if (e.Status != "shown" && e.Status != "appearing") {
                if (e.options.delay) {
                    e.timerShow = setTimeout(function() {
                        if (e.options.trigger == "click" || e.options.trigger == "hover" && e.mouseIsOverProxy) {
                            e._showNow()
                        }
                    }, e.options.delay)
                } else
                    e._showNow()
            }
        },
        _showNow: function(n) {
            var r = this;
            r.options.functionBefore.call(r.$el, r.$el, function() {
                if (r.enabled && r.Content !== null ) {
                    if (n)
                        r.callbacks.show.push(n);
                    r.callbacks.hide = [];
                    clearTimeout(r.timerShow);
                    r.timerShow = null ;
                    clearTimeout(r.timerHide);
                    r.timerHide = null ;
                    if (r.options.onlyOne) {
                        e(".tooltipstered").not(r.$el).each(function(t, n) {
                            var r = e(n)
                              , i = r.data("tooltipster-ns");
                            e.each(i, function(e, t) {
                                var n = r.data(t)
                                  , i = n.status()
                                  , s = n.option("autoClose");
                                if (i !== "hidden" && i !== "disappearing" && s) {
                                    n.hide()
                                }
                            })
                        })
                    }
                    var i = function() {
                        r.Status = "shown";
                        e.each(r.callbacks.show, function(e, t) {
                            t.call(r.$el)
                        });
                        r.callbacks.show = []
                    }
                    ;
                    if (r.Status !== "hidden") {
                        var s = 0;
                        if (r.Status === "disappearing") {
                            r.Status = "appearing";
                            if (l()) {
                                r.$tooltip.clearQueue().removeClass("tooltipster-dying").addClass("tooltipster-" + r.options.animation + "-show");
                                if (r.options.speed > 0)
                                    r.$tooltip.delay(r.options.speed);
                                r.$tooltip.queue(i)
                            } else {
                                r.$tooltip.stop().fadeIn(i)
                            }
                        } else if (r.Status === "shown") {
                            i()
                        }
                    } else {
                        r.Status = "appearing";
                        var s = r.options.speed;
                        r.bodyOverflowX = e("body").css("overflow-x");
                        e("body").css("overflow-x", "hidden");
                        var o = "tooltipster-" + r.options.animation
                          , a = "-webkit-transition-duration: " + r.options.speed + "ms; -webkit-animation-duration: " + r.options.speed + "ms; -moz-transition-duration: " + r.options.speed + "ms; -moz-animation-duration: " + r.options.speed + "ms; -o-transition-duration: " + r.options.speed + "ms; -o-animation-duration: " + r.options.speed + "ms; -ms-transition-duration: " + r.options.speed + "ms; -ms-animation-duration: " + r.options.speed + "ms; transition-duration: " + r.options.speed + "ms; animation-duration: " + r.options.speed + "ms;"
                          , f = r.options.fixedWidth > 0 ? "width:" + Math.round(r.options.fixedWidth) + "px;" : ""
                          , c = r.options.maxWidth > 0 ? "max-width:" + Math.round(r.options.maxWidth) + "px;" : ""
                          , h = r.options.interactive ? "pointer-events: auto;" : "";
                        r.$tooltip = e('<div class="tooltipster-base ' + r.options.theme + '" style="' + f + " " + c + " " + h + " " + a + '"><div class="tooltipster-content"></div></div>');
                        if (l())
                            r.$tooltip.addClass(o);
                        r._content_insert();
                        r.$tooltip.appendTo("body");
                        r.reposition();
                        r.options.functionReady.call(r.$el, r.$el, r.$tooltip);
                        if (l()) {
                            r.$tooltip.addClass(o + "-show");
                            if (r.options.speed > 0)
                                r.$tooltip.delay(r.options.speed);
                            r.$tooltip.queue(i)
                        } else {
                            r.$tooltip.css("display", "none").fadeIn(r.options.speed, i)
                        }
                        r._interval_set();
                        e(t).on("scroll." + r.namespace + " resize." + r.namespace, function() {
                            r.reposition()
                        });
                        if (r.options.autoClose) {
                            e("body").off("." + r.namespace);
                            if (r.options.trigger == "hover") {
                                if (u) {
                                    setTimeout(function() {
                                        e("body").on("touchstart." + r.namespace, function() {
                                            r.hide()
                                        })
                                    }, 0)
                                }
                                if (r.options.interactive) {
                                    if (u) {
                                        r.$tooltip.on("touchstart." + r.namespace, function(e) {
                                            e.stopPropagation()
                                        })
                                    }
                                    var p = null ;
                                    r.$elProxy.add(r.$tooltip).on("mouseleave." + r.namespace + "-autoClose", function() {
                                        clearTimeout(p);
                                        p = setTimeout(function() {
                                            r.hide()
                                        }, r.options.interactiveTolerance)
                                    }).on("mouseenter." + r.namespace + "-autoClose", function() {
                                        clearTimeout(p)
                                    })
                                } else {
                                    r.$elProxy.on("mouseleave." + r.namespace + "-autoClose", function() {
                                        r.hide()
                                    })
                                }
                            } else if (r.options.trigger == "click") {
                                setTimeout(function() {
                                    e("body").on("click." + r.namespace + " touchstart." + r.namespace, function() {
                                        r.hide()
                                    })
                                }, 0);
                                if (r.options.interactive) {
                                    r.$tooltip.on("click." + r.namespace + " touchstart." + r.namespace, function(e) {
                                        e.stopPropagation()
                                    })
                                }
                            }
                        }
                    }
                    if (r.options.timer > 0) {
                        r.timerHide = setTimeout(function() {
                            r.timerHide = null ;
                            r.hide()
                        }, r.options.timer + s)
                    }
                }
            })
        },
        _interval_set: function() {
            var t = this;
            t.checkInterval = setInterval(function() {
                if (e("body").find(t.$el).length === 0 || e("body").find(t.$elProxy).length === 0 || t.Status == "hidden" || e("body").find(t.$tooltip).length === 0) {
                    if (t.Status == "shown" || t.Status == "appearing")
                        t.hide();
                    t._interval_cancel()
                } else {
                    if (t.options.positionTracker) {
                        var n = t._repositionInfo(t.$elProxy)
                          , r = false;
                        if (o(n.dimension, t.elProxyPosition.dimension)) {
                            if (t.$elProxy.css("position") === "fixed") {
                                if (o(n.position, t.elProxyPosition.position))
                                    r = true
                            } else {
                                if (o(n.offset, t.elProxyPosition.offset))
                                    r = true
                            }
                        }
                        if (!r) {
                            t.reposition()
                        }
                    }
                }
            }, 200)
        },
        _interval_cancel: function() {
            clearInterval(this.checkInterval);
            this.checkInterval = null 
        },
        _content_set: function(e) {
            if (typeof e === "object" && e !== null  && this.options.contentCloning) {
                e = e.clone(true)
            }
            this.Content = e
        },
        _content_insert: function() {
            var e = this
              , t = this.$tooltip.find(".tooltipster-content");
            if (typeof e.Content === "string" && !e.options.contentAsHTML) {
                t.text(e.Content)
            } else {
                t.empty().append(e.Content)
            }
        },
        _update: function(e) {
            var t = this;
            t._content_set(e);
            if (t.Content !== null ) {
                if (t.Status !== "hidden") {
                    t._content_insert();
                    t.reposition();
                    if (t.options.updateAnimation) {
                        if (l()) {
                            t.$tooltip.css({
                                width: "",
                                "-webkit-transition": "all " + t.options.speed + "ms, width 0ms, height 0ms, left 0ms, top 0ms",
                                "-moz-transition": "all " + t.options.speed + "ms, width 0ms, height 0ms, left 0ms, top 0ms",
                                "-o-transition": "all " + t.options.speed + "ms, width 0ms, height 0ms, left 0ms, top 0ms",
                                "-ms-transition": "all " + t.options.speed + "ms, width 0ms, height 0ms, left 0ms, top 0ms",
                                transition: "all " + t.options.speed + "ms, width 0ms, height 0ms, left 0ms, top 0ms"
                            }).addClass("tooltipster-content-changing");
                            setTimeout(function() {
                                if (t.Status != "hidden") {
                                    t.$tooltip.removeClass("tooltipster-content-changing");
                                    setTimeout(function() {
                                        if (t.Status !== "hidden") {
                                            t.$tooltip.css({
                                                "-webkit-transition": t.options.speed + "ms",
                                                "-moz-transition": t.options.speed + "ms",
                                                "-o-transition": t.options.speed + "ms",
                                                "-ms-transition": t.options.speed + "ms",
                                                transition: t.options.speed + "ms"
                                            })
                                        }
                                    }, t.options.speed)
                                }
                            }, t.options.speed)
                        } else {
                            t.$tooltip.fadeTo(t.options.speed, .5, function() {
                                if (t.Status != "hidden") {
                                    t.$tooltip.fadeTo(t.options.speed, 1)
                                }
                            })
                        }
                    }
                }
            } else {
                t.hide()
            }
        },
        _repositionInfo: function(e) {
            return {
                dimension: {
                    height: e.outerHeight(false),
                    width: e.outerWidth(false)
                },
                offset: e.offset(),
                position: {
                    left: parseInt(e.css("left")),
                    top: parseInt(e.css("top"))
                }
            }
        },
        hide: function(n) {
            var r = this;
            if (n)
                r.callbacks.hide.push(n);
            r.callbacks.show = [];
            clearTimeout(r.timerShow);
            r.timerShow = null ;
            clearTimeout(r.timerHide);
            r.timerHide = null ;
            var i = function() {
                e.each(r.callbacks.hide, function(e, t) {
                    t.call(r.$el)
                });
                r.callbacks.hide = []
            }
            ;
            if (r.Status == "shown" || r.Status == "appearing") {
                r.Status = "disappearing";
                var s = function() {
                    r.Status = "hidden";
                    if (typeof r.Content == "object" && r.Content !== null ) {
                        r.Content.detach()
                    }
                    r.$tooltip.remove();
                    r.$tooltip = null ;
                    e(t).off("." + r.namespace);
                    e("body").off("." + r.namespace).css("overflow-x", r.bodyOverflowX);
                    e("body").off("." + r.namespace);
                    r.$elProxy.off("." + r.namespace + "-autoClose");
                    r.options.functionAfter.call(r.$el, r.$el);
                    i()
                }
                ;
                if (l()) {
                    r.$tooltip.clearQueue().removeClass("tooltipster-" + r.options.animation + "-show").addClass("tooltipster-dying");
                    if (r.options.speed > 0)
                        r.$tooltip.delay(r.options.speed);
                    r.$tooltip.queue(s)
                } else {
                    r.$tooltip.stop().fadeOut(r.options.speed, s)
                }
            } else if (r.Status == "hidden") {
                i()
            }
            return r
        },
        show: function(e) {
            this._showNow(e);
            return this
        },
        update: function(e) {
            return this.content(e)
        },
        content: function(e) {
            if (typeof e === "undefined") {
                return this.Content
            } else {
                this._update(e);
                return this
            }
        },
        reposition: function() {
            var n = this;
            if (e("body").find(n.$tooltip).length !== 0) {
                n.$tooltip.css("width", "");
                n.elProxyPosition = n._repositionInfo(n.$elProxy);
                var r = null 
                  , i = e(t).width()
                  , s = n.elProxyPosition
                  , o = n.$tooltip.outerWidth(false)
                  , u = n.$tooltip.innerWidth() + 1
                  , a = n.$tooltip.outerHeight(false);
                if (n.$elProxy.is("area")) {
                    var f = n.$elProxy.attr("shape")
                      , l = n.$elProxy.parent().attr("name")
                      , c = e('img[usemap="#' + l + '"]')
                      , h = c.offset().left
                      , p = c.offset().top
                      , d = n.$elProxy.attr("coords") !== undefined ? n.$elProxy.attr("coords").split(",") : undefined;
                    if (f == "circle") {
                        var v = parseInt(d[0])
                          , m = parseInt(d[1])
                          , g = parseInt(d[2]);
                        s.dimension.height = g * 2;
                        s.dimension.width = g * 2;
                        s.offset.top = p + m - g;
                        s.offset.left = h + v - g
                    } else if (f == "rect") {
                        var v = parseInt(d[0])
                          , m = parseInt(d[1])
                          , y = parseInt(d[2])
                          , b = parseInt(d[3]);
                        s.dimension.height = b - m;
                        s.dimension.width = y - v;
                        s.offset.top = p + m;
                        s.offset.left = h + v
                    } else if (f == "poly") {
                        var w = []
                          , E = []
                          , S = 0
                          , x = 0
                          , T = 0
                          , N = 0
                          , C = "even";
                        for (var k = 0; k < d.length; k++) {
                            var L = parseInt(d[k]);
                            if (C == "even") {
                                if (L > T) {
                                    T = L;
                                    if (k === 0) {
                                        S = T
                                    }
                                }
                                if (L < S) {
                                    S = L
                                }
                                C = "odd"
                            } else {
                                if (L > N) {
                                    N = L;
                                    if (k == 1) {
                                        x = N
                                    }
                                }
                                if (L < x) {
                                    x = L
                                }
                                C = "even"
                            }
                        }
                        s.dimension.height = N - x;
                        s.dimension.width = T - S;
                        s.offset.top = p + x;
                        s.offset.left = h + S
                    } else {
                        s.dimension.height = c.outerHeight(false);
                        s.dimension.width = c.outerWidth(false);
                        s.offset.top = p;
                        s.offset.left = h
                    }
                }
                if (n.options.fixedWidth === 0) {
                    n.$tooltip.css({
                        width: Math.round(u) + "px",
                        "padding-left": "0px",
                        "padding-right": "0px"
                    })
                }
                var A = 0
                  , O = 0
                  , M = 0
                  , _ = parseInt(n.options.offsetY)
                  , D = parseInt(n.options.offsetX)
                  , P = n.options.position;
                function H() {
                    var n = e(t).scrollLeft();
                    if (A - n < 0) {
                        r = A - n;
                        A = n
                    }
                    if (A + o - n > i) {
                        r = A - (i + n - o);
                        A = i + n - o
                    }
                }
                function B(n, r) {
                    if (s.offset.top - e(t).scrollTop() - a - _ - 12 < 0 && r.indexOf("top") > -1) {
                        P = n
                    }
                    if (s.offset.top + s.dimension.height + a + 12 + _ > e(t).scrollTop() + e(t).height() && r.indexOf("bottom") > -1) {
                        P = n;
                        M = s.offset.top - a - _ - 12
                    }
                }
                if (P == "top") {
                    var j = s.offset.left + o - (s.offset.left + s.dimension.width);
                    A = s.offset.left + D - j / 2;
                    M = s.offset.top - a - _ - 12;
                    H();
                    B("bottom", "top")
                }
                if (P == "top-left") {
                    A = s.offset.left + D;
                    M = s.offset.top - a - _ - 12;
                    H();
                    B("bottom-left", "top-left")
                }
                if (P == "top-right") {
                    A = s.offset.left + s.dimension.width + D - o;
                    M = s.offset.top - a - _ - 12;
                    H();
                    B("bottom-right", "top-right")
                }
                if (P == "bottom") {
                    var j = s.offset.left + o - (s.offset.left + s.dimension.width);
                    A = s.offset.left - j / 2 + D;
                    M = s.offset.top + s.dimension.height + _ + 12;
                    H();
                    B("top", "bottom")
                }
                if (P == "bottom-left") {
                    A = s.offset.left + D;
                    M = s.offset.top + s.dimension.height + _ + 12;
                    H();
                    B("top-left", "bottom-left")
                }
                if (P == "bottom-right") {
                    A = s.offset.left + s.dimension.width + D - o;
                    M = s.offset.top + s.dimension.height + _ + 12;
                    H();
                    B("top-right", "bottom-right")
                }
                if (P == "left") {
                    A = s.offset.left - D - o - 12;
                    O = s.offset.left + D + s.dimension.width + 12;
                    var F = s.offset.top + a - (s.offset.top + s.dimension.height);
                    M = s.offset.top - F / 2 - _;
                    if (A < 0 && O + o > i) {
                        var I = parseFloat(n.$tooltip.css("border-width")) * 2
                          , q = o + A - I;
                        n.$tooltip.css("width", q + "px");
                        a = n.$tooltip.outerHeight(false);
                        A = s.offset.left - D - q - 12 - I;
                        F = s.offset.top + a - (s.offset.top + s.dimension.height);
                        M = s.offset.top - F / 2 - _
                    } else if (A < 0) {
                        A = s.offset.left + D + s.dimension.width + 12;
                        r = "left"
                    }
                }
                if (P == "right") {
                    A = s.offset.left + D + s.dimension.width + 12;
                    O = s.offset.left - D - o - 12;
                    var F = s.offset.top + a - (s.offset.top + s.dimension.height);
                    M = s.offset.top - F / 2 - _;
                    if (A + o > i && O < 0) {
                        var I = parseFloat(n.$tooltip.css("border-width")) * 2
                          , q = i - A - I;
                        n.$tooltip.css("width", q + "px");
                        a = n.$tooltip.outerHeight(false);
                        F = s.offset.top + a - (s.offset.top + s.dimension.height);
                        M = s.offset.top - F / 2 - _
                    } else if (A + o > i) {
                        A = s.offset.left - D - o - 12;
                        r = "right"
                    }
                }
                if (n.options.arrow) {
                    var R = "tooltipster-arrow-" + P;
                    if (n.options.arrowColor.length < 1) {
                        var U = n.$tooltip.css("background-color")
                    } else {
                        var U = n.options.arrowColor
                    }
                    if (!r) {
                        r = ""
                    } else if (r == "left") {
                        R = "tooltipster-arrow-right";
                        r = ""
                    } else if (r == "right") {
                        R = "tooltipster-arrow-left";
                        r = ""
                    } else {
                        r = "left:" + Math.round(r) + "px;"
                    }
                    if (P == "top" || P == "top-left" || P == "top-right") {
                        var z = parseFloat(n.$tooltip.css("border-bottom-width"))
                          , W = n.$tooltip.css("border-bottom-color")
                    } else if (P == "bottom" || P == "bottom-left" || P == "bottom-right") {
                        var z = parseFloat(n.$tooltip.css("border-top-width"))
                          , W = n.$tooltip.css("border-top-color")
                    } else if (P == "left") {
                        var z = parseFloat(n.$tooltip.css("border-right-width"))
                          , W = n.$tooltip.css("border-right-color")
                    } else if (P == "right") {
                        var z = parseFloat(n.$tooltip.css("border-left-width"))
                          , W = n.$tooltip.css("border-left-color")
                    } else {
                        var z = parseFloat(n.$tooltip.css("border-bottom-width"))
                          , W = n.$tooltip.css("border-bottom-color")
                    }
                    if (z > 1) {
                        z++
                    }
                    var X = "";
                    if (z !== 0) {
                        var V = ""
                          , J = "border-color: " + W + ";";
                        if (R.indexOf("bottom") !== -1) {
                            V = "margin-top: -" + Math.round(z) + "px;"
                        } else if (R.indexOf("top") !== -1) {
                            V = "margin-bottom: -" + Math.round(z) + "px;"
                        } else if (R.indexOf("left") !== -1) {
                            V = "margin-right: -" + Math.round(z) + "px;"
                        } else if (R.indexOf("right") !== -1) {
                            V = "margin-left: -" + Math.round(z) + "px;"
                        }
                        X = '<span class="tooltipster-arrow-border" style="' + V + " " + J + ';"></span>'
                    }
                    n.$tooltip.find(".tooltipster-arrow").remove();
                    var K = '<div class="' + R + ' tooltipster-arrow" style="' + r + '">' + X + '<span style="border-color:' + U + ';"></span></div>';
                    n.$tooltip.append(K)
                }
                n.$tooltip.css({
                    top: Math.round(M) + "px",
                    left: Math.round(A) + "px"
                })
            }
            return n
        },
        enable: function() {
            this.enabled = true;
            return this
        },
        disable: function() {
            this.hide();
            this.enabled = false;
            return this
        },
        destroy: function() {
            var t = this;
            t.hide();
            if (t.$el[0] !== t.$elProxy[0])
                t.$elProxy.remove();
            t.$el.removeData(t.namespace).off("." + t.namespace);
            var n = t.$el.data("tooltipster-ns");
            if (n.length === 1) {
                var r = typeof t.Content === "string" ? t.Content : e("<div></div>").append(t.Content).html();
                t.$el.removeClass("tooltipstered").attr("title", r).removeData(t.namespace).removeData("tooltipster-ns").off("." + t.namespace)
            } else {
                n = e.grep(n, function(e, n) {
                    return e !== t.namespace
                });
                t.$el.data("tooltipster-ns", n)
            }
            return t
        },
        elementIcon: function() {
            return this.$el[0] !== this.$elProxy[0] ? this.$elProxy[0] : undefined
        },
        elementTooltip: function() {
            return this.$tooltip ? this.$tooltip[0] : undefined
        },
        option: function(e) {
            return this.options[e]
        },
        status: function(e) {
            return this.Status
        }
    };
    e.fn[r] = function() {
        var t = arguments;
        if (this.length === 0) {
            if (typeof t[0] === "string") {
                var n = true;
                switch (t[0]) {
                case "setDefaults":
                    e.extend(i, t[1]);
                    break;
                default:
                    n = false;
                    break
                }
                if (n)
                    return true;
                else
                    return this
            } else {
                return this
            }
        } else {
            if (typeof t[0] === "string") {
                var r = "#*$~&";
                this.each(function() {
                    var n = e(this).data("tooltipster-ns")
                      , i = n ? e(this).data(n[0]) : null ;
                    if (i) {
                        if (typeof i[t[0]] === "function") {
                            var s = i[t[0]](t[1])
                        } else {
                            throw new Error('Unknown method .tooltipster("' + t[0] + '")')
                        }
                        if (s !== i) {
                            r = s;
                            return false
                        }
                    } else {
                        throw new Error("You called Tooltipster's \"" + t[0] + '" method on an uninitialized element')
                    }
                });
                return r !== "#*$~&" ? r : this
            } else {
                var o = []
                  , u = t[0] && typeof t[0].multiple !== "undefined"
                  , a = u && t[0].multiple || !u && i.multiple;
                this.each(function() {
                    var n = false
                      , r = e(this).data("tooltipster-ns")
                      , i = null ;
                    if (!r) {
                        n = true
                    } else {
                        if (a)
                            n = true;
                        else
                            console.log('Tooltipster: one or more tooltips are already attached to this element: ignoring. Use the "multiple" option to attach more tooltips.')
                    }
                    if (n) {
                        i = new s(this,t[0]);
                        if (!r)
                            r = [];
                        r.push(i.namespace);
                        e(this).data("tooltipster-ns", r);
                        e(this).data(i.namespace, i)
                    }
                    o.push(i)
                });
                if (a)
                    return o;
                else
                    return this
            }
        }
    }
    ;
    var u = !!("ontouchstart" in t);
    var a = false;
    e("body").one("mousemove", function() {
        a = true
    })
})(jQuery, window, document);
(function(a) {
    a.fn.circliful = function(l, I) {
        var E = a.extend({
            startdegree: 0,
            fgcolor: "#556b2f",
            bgcolor: "#eee",
            fill: !1,
            width: 15,
            dimension: 200,
            fontsize: 15,
            percent: 50,
            animationstep: 1,
            iconsize: "20px",
            iconcolor: "#999",
            border: "default",
            complete: null ,
            bordersize: 10
        }, l)
          , F = window.requestAnimationFrame || window.msRequestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || function(a) {
            setTimeout(a, 16)
        }
        ;
        return this.each(function() {
            function p(b, e, d) {
                a("\x3cspan\x3e\x3c/span\x3e").appendTo(b).addClass(e).html(u).prepend(v).css({
                    "line-height": d + 
                    "px",
                    "font-size": c.fontsize + "px"
                })
            }
            function q(b, e) {
                a("\x3cspan\x3e\x3c/span\x3e").appendTo(b).addClass("circle-info-half").css("line-height", c.dimension * e + "px").text(w)
            }
            function x(b) {
                e.clearRect(0, 0, h.width, h.height);
                e.beginPath();
                e.arc(y, z, A, r, s, !1);
                e.lineWidth = c.width + 1;
                e.strokeStyle = c.bgcolor;
                e.stroke();
                B && (e.fillStyle = c.fill,
                e.fill());
                e.beginPath();
                e.arc(y, z, A, -m + C, t * b - m + C, !1);
                "outline" == c.border ? e.lineWidth = c.width + c.bordersize : "inline" == c.border && (e.lineWidth = c.width - c.bordersize);
                e.strokeStyle = 
                c.fgcolor;
                e.stroke();
                f < g && (f += G,
                F(function() {
                    x(Math.min(f, g) / 100)
                }, d));
                f == g && D && "undefined" != typeof l && a.isFunction(l.complete) && (l.complete(),
                D = !1)
            }
            var H = "fgcolor bgcolor fill width dimension fontsize animationstep endPercent icon iconcolor iconsize border startdegree bordersize".split(" "), c = {}, v = "", g = 0, d = a(this), B = !1, u, w;
            d.addClass("circliful");
            (function(b) {
                a.each(H, function(e, d) {
                    void 0 != b.data(d) ? c[d] = b.data(d) : c[d] = a(E).attr(d);
                    "fill" == d && void 0 != b.data("fill") && (B = !0)
                })
            })(d);
            void 0 != d.data("text") && 
            (u = d.data("text"),
            void 0 != d.data("icon") && (v = a("\x3ci\x3e\x3c/i\x3e").addClass("fa " + a(this).data("icon")).css({
                color: c.iconcolor,
                "font-size": c.iconsize
            })),
            void 0 != d.data("type") ? (b = a(this).data("type"),
            "half" == b ? p(d, "circle-text-half", c.dimension / 1.45) : p(d, "circle-text", c.dimension)) : p(d, "circle-text", c.dimension));
            void 0 != a(this).data("total") && void 0 != a(this).data("part") ? (b = a(this).data("total") / 100,
            (a(this).data("part") / b / 100).toFixed(3),
            g = (a(this).data("part") / b).toFixed(3)) : void 0 != a(this).data("percent") && 
            (a(this).data("percent"),
            g = a(this).data("percent"));
            void 0 != a(this).data("info") && (w = a(this).data("info"),
            void 0 != a(this).data("type") ? (b = a(this).data("type"),
            "half" == b ? q(d, .9) : q(d, 1.25)) : q(d, 1.25));
            a(this).width(c.dimension + "px");
            var b = c.dimension
              , h = a("\x3ccanvas\x3e\x3c/canvas\x3e").attr({
                width: b,
                height: b
            }).appendTo(a(this)).get(0)
              , e = h.getContext("2d")
              , k = window.devicePixelRatio;
            if (k) {
                var n = a(h);
                n.css("width", b);
                n.css("height", b);
                n.attr("width", b * k);
                n.attr("height", b * k);
                e.scale(k, k)
            }
            a(h).parent();
            var y = b / 2
              , z = b / 2
              , A = b / 2.5
              , s = 2.3 * Math.PI
              , r = 0
              , f = 0 === c.animationstep ? g : 0
              , G = Math.max(c.animationstep, 0)
              , t = 2 * Math.PI
              , m = Math.PI / 2
              , b = ""
              , D = !0
              , C = c.startdegree / 180 * Math.PI;
            void 0 != a(this).data("type") && (b = a(this).data("type"),
            "half" == b && (s = 2 * Math.PI,
            r = 3.13,
            t = Math.PI,
            m = Math.PI / .996));
            void 0 != a(this).data("type") && (b = a(this).data("type"),
            "angle" == b && (s = 2.25 * Math.PI,
            r = 2.4,
            t = 1.53 + Math.PI,
            m = .73 + Math.PI / .996));
            x(f / 100)
        })
    }
})(jQuery);
+function(c) {
    function d() {
        var c = document.createElement("bootstrap"), b = {
            WebkitTransition: "webkitTransitionEnd",
            MozTransition: "transitionend",
            OTransition: "oTransitionEnd otransitionend",
            transition: "transitionend"
        }, a;
        for (a in b)
            if (void 0 !== c.style[a])
                return {
                    end: b[a]
                };
        return !1
    }
    c.fn.emulateTransitionEnd = function(d) {
        var b = !1
          , a = this;
        c(this).one("bsTransitionEnd", function() {
            b = !0
        });
        setTimeout(function() {
            b || c(a).trigger(c.support.transition.end)
        }, d);
        return this
    }
    ;
    c(function() {
        c.support.transition = d();
        c.support.transition && 
        (c.event.special.bsTransitionEnd = {
            bindType: c.support.transition.end,
            delegateType: c.support.transition.end,
            handle: function(d) {
                if (c(d.target).is(this))
                    return d.handleObj.handler.apply(this, arguments)
            }
        })
    })
}(jQuery);
+function(c) {
    function d(a, b) {
        return this.each(function() {
            var e = c(this)
              , d = e.data("bs.modal")
              , m = c.extend({}, f.DEFAULTS, e.data(), "object" == typeof a && a);
            d || e.data("bs.modal", d = new f(this,m));
            if ("string" == typeof a)
                d[a](b);
            else
                m.show && d.show(b)
        })
    }
    var f = function(a, b) {
        this.options = b;
        this.$body = c(document.body);
        this.$element = c(a);
        this.$backdrop = this.isShown = null ;
        this.scrollbarWidth = 0;
        this.options.remote && this.$element.find(".modal-content").load(this.options.remote, c.proxy(function() {
            this.$element.trigger("loaded.bs.modal")
        }, 
        this))
    }
    ;
    f.VERSION = "3.2.0";
    f.DEFAULTS = {
        backdrop: !0,
        keyboard: !0,
        show: !0
    };
    f.prototype.toggle = function(a) {
        return this.isShown ? this.hide() : this.show(a)
    }
    ;
    f.prototype.show = function(a) {
        var b = this
          , e = c.Event("show.bs.modal", {
            relatedTarget: a
        });
        this.$element.trigger(e);
        this.isShown || e.isDefaultPrevented() || (this.isShown = !0,
        this.checkScrollbar(),
        this.$body.addClass("modal-open"),
        this.setScrollbar(),
        this.escape(),
        this.$element.on("click.dismiss.bs.modal", '[data-dismiss\x3d"modal"]', c.proxy(this.hide, this)),
        this.backdrop(function() {
            var e = 
            c.support.transition && b.$element.hasClass("fade");
            b.$element.parent().length || b.$element.appendTo(b.$body);
            b.$element.show().scrollTop(0);
            e && b.$element[0].offsetWidth;
            b.$element.addClass("in").attr("aria-hidden", !1);
            b.enforceFocus();
            var d = c.Event("shown.bs.modal", {
                relatedTarget: a
            });
            e ? b.$element.find(".modal-dialog").one("bsTransitionEnd", function() {
                b.$element.trigger("focus").trigger(d)
            }).emulateTransitionEnd(300) : b.$element.trigger("focus").trigger(d)
        }))
    }
    ;
    f.prototype.hide = function(a) {
        a && a.preventDefault();
        a = c.Event("hide.bs.modal");
        this.$element.trigger(a);
        this.isShown && !a.isDefaultPrevented() && (this.isShown = !1,
        this.$body.removeClass("modal-open"),
        this.resetScrollbar(),
        this.escape(),
        c(document).off("focusin.bs.modal"),
        this.$element.removeClass("in").attr("aria-hidden", !0).off("click.dismiss.bs.modal"),
        c.support.transition && this.$element.hasClass("fade") ? this.$element.one("bsTransitionEnd", c.proxy(this.hideModal, this)).emulateTransitionEnd(300) : this.hideModal())
    }
    ;
    f.prototype.enforceFocus = function() {
        c(document).off("focusin.bs.modal").on("focusin.bs.modal", 
        c.proxy(function(a) {
            this.$element[0] === a.target || this.$element.has(a.target).length || this.$element.trigger("focus")
        }, this))
    }
    ;
    f.prototype.escape = function() {
        if (this.isShown && this.options.keyboard)
            this.$element.on("keyup.dismiss.bs.modal", c.proxy(function(a) {
                27 == a.which && this.hide()
            }, this));
        else
            this.isShown || this.$element.off("keyup.dismiss.bs.modal")
    }
    ;
    f.prototype.hideModal = function() {
        var a = this;
        this.$element.hide();
        this.backdrop(function() {
            a.$element.trigger("hidden.bs.modal")
        })
    }
    ;
    f.prototype.removeBackdrop = 
    function() {
        this.$backdrop && this.$backdrop.remove();
        this.$backdrop = null 
    }
    ;
    f.prototype.backdrop = function(a) {
        var b = this
          , e = this.$element.hasClass("fade") ? "fade" : "";
        if (this.isShown && this.options.backdrop) {
            var d = c.support.transition && e;
            this.$backdrop = c('\x3cdiv class\x3d"modal-backdrop ' + e + '" /\x3e').appendTo(this.$body);
            this.$element.on("click.dismiss.bs.modal", c.proxy(function(a) {
                a.target === a.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus.call(this.$element[0]) : this.hide.call(this))
            }, 
            this));
            d && this.$backdrop[0].offsetWidth;
            this.$backdrop.addClass("in");
            a && (d ? this.$backdrop.one("bsTransitionEnd", a).emulateTransitionEnd(150) : a())
        } else
            !this.isShown && this.$backdrop ? (this.$backdrop.removeClass("in"),
            e = function() {
                b.removeBackdrop();
                a && a()
            }
            ,
            c.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one("bsTransitionEnd", e).emulateTransitionEnd(150) : e()) : a && a()
    }
    ;
    f.prototype.checkScrollbar = function() {
        document.body.clientWidth >= window.innerWidth || (this.scrollbarWidth = this.scrollbarWidth || 
        this.measureScrollbar())
    }
    ;
    f.prototype.setScrollbar = function() {
        var a = parseInt(this.$body.css("padding-right") || 0, 10);
        this.scrollbarWidth && this.$body.css("padding-right", a + this.scrollbarWidth)
    }
    ;
    f.prototype.resetScrollbar = function() {
        this.$body.css("padding-right", "")
    }
    ;
    f.prototype.measureScrollbar = function() {
        var a = document.createElement("div");
        a.className = "modal-scrollbar-measure";
        this.$body.append(a);
        var b = a.offsetWidth - a.clientWidth;
        this.$body[0].removeChild(a);
        return b
    }
    ;
    var b = c.fn.modal;
    c.fn.modal = 
    d;
    c.fn.modal.Constructor = f;
    c.fn.modal.noConflict = function() {
        c.fn.modal = b;
        return this
    }
    ;
    c(document).on("click.bs.modal.data-api", '[data-toggle\x3d"modal"]', function(a) {
        var b = c(this)
          , e = b.attr("href")
          , k = c(b.attr("data-target") || e && e.replace(/.*(?=#[^\s]+$)/, ""))
          , e = k.data("bs.modal") ? "toggle" : c.extend({
            remote: !/#/.test(e) && e
        }, k.data(), b.data());
        b.is("a") && a.preventDefault();
        k.one("show.bs.modal", function(a) {
            if (!a.isDefaultPrevented())
                k.one("hidden.bs.modal", function() {
                    b.is(":visible") && b.trigger("focus")
                })
        });
        d.call(k, e, this)
    })
}(jQuery);
+function(c) {
    var d = function(b, a) {
        this.$element = this.hoverState = this.timeout = this.enabled = this.options = this.type = null ;
        this.init("tooltip", b, a)
    }
    ;
    d.VERSION = "3.3.4";
    d.TRANSITION_DURATION = 150;
    d.DEFAULTS = {
        animation: !0,
        placement: "top",
        selector: !1,
        template: '\x3cdiv class\x3d"tooltip" role\x3d"tooltip"\x3e\x3cdiv class\x3d"tooltip-arrow"\x3e\x3c/div\x3e\x3cdiv class\x3d"tooltip-inner"\x3e\x3c/div\x3e\x3c/div\x3e',
        trigger: "hover focus",
        title: "",
        delay: 0,
        html: !1,
        container: !1,
        viewport: {
            selector: "body",
            padding: 0
        }
    };
    d.prototype.init = function(b, a, h) {
        this.enabled = !0;
        this.type = b;
        this.$element = c(a);
        this.options = this.getOptions(h);
        this.$viewport = this.options.viewport && c(this.options.viewport.selector || this.options.viewport);
        if (this.$element[0] instanceof document.constructor && !this.options.selector)
            throw Error("`selector` option must be specified when initializing " + this.type + " on the window.document object!");
        b = this.options.trigger.split(" ");
        for (a = b.length; a--; )
            if (h = b[a],
            "click" == h)
                this.$element.on("click." + this.type, 
                this.options.selector, c.proxy(this.toggle, this));
            else if ("manual" != h) {
                var e = "hover" == h ? "mouseleave" : "focusout";
                this.$element.on(("hover" == h ? "mouseenter" : "focusin") + "." + this.type, this.options.selector, c.proxy(this.enter, this));
                this.$element.on(e + "." + this.type, this.options.selector, c.proxy(this.leave, this))
            }
        this.options.selector ? this._options = c.extend({}, this.options, {
            trigger: "manual",
            selector: ""
        }) : this.fixTitle()
    }
    ;
    d.prototype.getDefaults = function() {
        return d.DEFAULTS
    }
    ;
    d.prototype.getOptions = function(b) {
        b = 
        c.extend({}, this.getDefaults(), this.$element.data(), b);
        b.delay && "number" == typeof b.delay && (b.delay = {
            show: b.delay,
            hide: b.delay
        });
        return b
    }
    ;
    d.prototype.getDelegateOptions = function() {
        var b = {}
          , a = this.getDefaults();
        this._options && c.each(this._options, function(c, e) {
            a[c] != e && (b[c] = e)
        });
        return b
    }
    ;
    d.prototype.enter = function(b) {
        var a = b instanceof this.constructor ? b : c(b.currentTarget).data("bs." + this.type);
        if (a && a.$tip && a.$tip.is(":visible"))
            a.hoverState = "in";
        else {
            a || (a = new this.constructor(b.currentTarget,
            this.getDelegateOptions()),
            c(b.currentTarget).data("bs." + this.type, a));
            clearTimeout(a.timeout);
            a.hoverState = "in";
            if (!a.options.delay || !a.options.delay.show)
                return a.show();
            a.timeout = setTimeout(function() {
                "in" == a.hoverState && a.show()
            }, a.options.delay.show)
        }
    }
    ;
    d.prototype.leave = function(b) {
        var a = b instanceof this.constructor ? b : c(b.currentTarget).data("bs." + this.type);
        a || (a = new this.constructor(b.currentTarget,this.getDelegateOptions()),
        c(b.currentTarget).data("bs." + this.type, a));
        clearTimeout(a.timeout);
        a.hoverState = "out";
        if (!a.options.delay || !a.options.delay.hide)
            return a.hide();
        a.timeout = setTimeout(function() {
            "out" == a.hoverState && a.hide()
        }, a.options.delay.hide)
    }
    ;
    d.prototype.show = function() {
        var b = c.Event("show.bs." + this.type);
        if (this.hasContent() && this.enabled) {
            this.$element.trigger(b);
            var a = c.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]);
            if (!b.isDefaultPrevented() && a) {
                var h = this
                  , b = this.tip()
                  , a = this.getUID(this.type);
                this.setContent();
                b.attr("id", a);
                this.$element.attr("aria-describedby", 
                a);
                this.options.animation && b.addClass("fade");
                var a = "function" == typeof this.options.placement ? this.options.placement.call(this, b[0], this.$element[0]) : this.options.placement
                  , e = /\s?auto?\s?/i
                  , k = e.test(a);
                k && (a = a.replace(e, "") || "top");
                b.detach().css({
                    top: 0,
                    left: 0,
                    display: "block"
                }).addClass(a).data("bs." + this.type, this);
                this.options.container ? b.appendTo(this.options.container) : b.insertAfter(this.$element);
                var e = this.getPosition()
                  , f = b[0].offsetWidth
                  , g = b[0].offsetHeight;
                if (k) {
                    var k = a
                      , l = this.options.container ? 
                    c(this.options.container) : this.$element.parent()
                      , l = this.getPosition(l)
                      , a = "bottom" == a && e.bottom + g > l.bottom ? "top" : "top" == a && e.top - g < l.top ? "bottom" : "right" == a && e.right + f > l.width ? "left" : "left" == a && e.left - f < l.left ? "right" : a;
                    b.removeClass(k).addClass(a)
                }
                e = this.getCalculatedOffset(a, e, f, g);
                this.applyPlacement(e, a);
                a = function() {
                    var a = h.hoverState;
                    h.$element.trigger("shown.bs." + h.type);
                    h.hoverState = null ;
                    "out" == a && h.leave(h)
                }
                ;
                c.support.transition && this.$tip.hasClass("fade") ? b.one("bsTransitionEnd", a).emulateTransitionEnd(d.TRANSITION_DURATION) : 
                a()
            }
        }
    }
    ;
    d.prototype.applyPlacement = function(b, a) {
        var d = this.tip()
          , e = d[0].offsetWidth
          , k = d[0].offsetHeight
          , f = parseInt(d.css("margin-top"), 10)
          , g = parseInt(d.css("margin-left"), 10);
        isNaN(f) && (f = 0);
        isNaN(g) && (g = 0);
        b.top += f;
        b.left += g;
        c.offset.setOffset(d[0], c.extend({
            using: function(a) {
                d.css({
                    top: Math.round(a.top),
                    left: Math.round(a.left)
                })
            }
        }, b), 0);
        d.addClass("in");
        var g = d[0].offsetWidth
          , l = d[0].offsetHeight;
        "top" == a && l != k && (b.top = b.top + k - l);
        var n = this.getViewportAdjustedDelta(a, b, g, l);
        n.left ? b.left += n.left : 
        b.top += n.top;
        e = (f = /top|bottom/.test(a)) ? 2 * n.left - e + g : 2 * n.top - k + l;
        k = f ? "offsetWidth" : "offsetHeight";
        d.offset(b);
        this.replaceArrow(e, d[0][k], f)
    }
    ;
    d.prototype.replaceArrow = function(b, a, c) {
        this.arrow().css(c ? "left" : "top", 50 * (1 - b / a) + "%").css(c ? "top" : "left", "")
    }
    ;
    d.prototype.setContent = function() {
        var b = this.tip()
          , a = this.getTitle();
        b.find(".tooltip-inner")[this.options.html ? "html" : "text"](a);
        b.removeClass("fade in top bottom left right")
    }
    ;
    d.prototype.hide = function(b) {
        function a() {
            "in" != h.hoverState && e.detach();
            h.$element.removeAttr("aria-describedby").trigger("hidden.bs." + h.type);
            b && b()
        }
        var h = this
          , e = c(this.$tip)
          , f = c.Event("hide.bs." + this.type);
        this.$element.trigger(f);
        if (!f.isDefaultPrevented())
            return e.removeClass("in"),
            c.support.transition && e.hasClass("fade") ? e.one("bsTransitionEnd", a).emulateTransitionEnd(d.TRANSITION_DURATION) : a(),
            this.hoverState = null ,
            this
    }
    ;
    d.prototype.fixTitle = function() {
        var b = this.$element;
        (b.attr("title") || "string" != typeof b.attr("data-original-title")) && b.attr("data-original-title", 
        b.attr("title") || "").attr("title", "")
    }
    ;
    d.prototype.hasContent = function() {
        return this.getTitle()
    }
    ;
    d.prototype.getPosition = function(b) {
        b = b || this.$element;
        var a = b[0]
          , d = "BODY" == a.tagName
          , a = a.getBoundingClientRect();
        null  == a.width && (a = c.extend({}, a, {
            width: a.right - a.left,
            height: a.bottom - a.top
        }));
        var e = d ? {
            top: 0,
            left: 0
        } : b.offset();
        b = {
            scroll: d ? document.documentElement.scrollTop || document.body.scrollTop : b.scrollTop()
        };
        d = d ? {
            width: c(window).width(),
            height: c(window).height()
        } : null ;
        return c.extend({}, a, b, d, e)
    }
    ;
    d.prototype.getCalculatedOffset = function(b, a, c, d) {
        return "bottom" == b ? {
            top: a.top + a.height,
            left: a.left + a.width / 2 - c / 2
        } : "top" == b ? {
            top: a.top - d,
            left: a.left + a.width / 2 - c / 2
        } : "left" == b ? {
            top: a.top + a.height / 2 - d / 2,
            left: a.left - c
        } : {
            top: a.top + a.height / 2 - d / 2,
            left: a.left + a.width
        }
    }
    ;
    d.prototype.getViewportAdjustedDelta = function(b, a, c, d) {
        var f = {
            top: 0,
            left: 0
        };
        if (!this.$viewport)
            return f;
        var m = this.options.viewport && this.options.viewport.padding || 0
          , g = this.getPosition(this.$viewport);
        /right|left/.test(b) ? (c = a.top - m - g.scroll,
        a = a.top + m - g.scroll + d,
        c < g.top ? f.top = g.top - c : a > g.top + g.height && (f.top = g.top + g.height - a)) : (d = a.left - m,
        a = a.left + m + c,
        d < g.left ? f.left = g.left - d : a > g.width && (f.left = g.left + g.width - a));
        return f
    }
    ;
    d.prototype.getTitle = function() {
        var b = this.$element
          , a = this.options;
        return b.attr("data-original-title") || ("function" == typeof a.title ? a.title.call(b[0]) : a.title)
    }
    ;
    d.prototype.getUID = function(b) {
        do
            b += ~~(1E6 * Math.random());
        while (document.getElementById(b));return b
    }
    ;
    d.prototype.tip = function() {
        return this.$tip = this.$tip || 
        c(this.options.template)
    }
    ;
    d.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
    }
    ;
    d.prototype.enable = function() {
        this.enabled = !0
    }
    ;
    d.prototype.disable = function() {
        this.enabled = !1
    }
    ;
    d.prototype.toggleEnabled = function() {
        this.enabled = !this.enabled
    }
    ;
    d.prototype.toggle = function(b) {
        var a = this;
        b && (a = c(b.currentTarget).data("bs." + this.type),
        a || (a = new this.constructor(b.currentTarget,this.getDelegateOptions()),
        c(b.currentTarget).data("bs." + this.type, a)));
        a.tip().hasClass("in") ? 
        a.leave(a) : a.enter(a)
    }
    ;
    d.prototype.destroy = function() {
        var b = this;
        clearTimeout(this.timeout);
        this.hide(function() {
            b.$element.off("." + b.type).removeData("bs." + b.type)
        })
    }
    ;
    var f = c.fn.tooltip;
    c.fn.tooltip = function(b) {
        return this.each(function() {
            var a = c(this)
              , f = a.data("bs.tooltip")
              , e = "object" == typeof b && b;
            if (f || !/destroy|hide/.test(b))
                if (f || a.data("bs.tooltip", f = new d(this,e)),
                "string" == typeof b)
                    f[b]()
        })
    }
    ;
    c.fn.tooltip.Constructor = d;
    c.fn.tooltip.noConflict = function() {
        c.fn.tooltip = f;
        return this
    }
}(jQuery);
(function(b) {
    b.Placeholders = {
        Utils: {
            addEventListener: function(d, l, e) {
                if (d.addEventListener)
                    return d.addEventListener(l, e, !1);
                if (d.attachEvent)
                    return d.attachEvent("on" + l, e)
            },
            inArray: function(d, l) {
                var e, b;
                e = 0;
                for (b = d.length; e < b; e++)
                    if (d[e] === l)
                        return !0;
                return !1
            },
            moveCaret: function(d, b) {
                var e;
                d.createTextRange ? (e = d.createTextRange(),
                e.move("character", b),
                e.select()) : d.selectionStart && (d.focus(),
                d.setSelectionRange(b, b))
            },
            changeType: function(b, l) {
                try {
                    return b.type = l,
                    !0
                } catch (e) {
                    return !1
                }
            }
        }
    }
})(this);
(function(b) {
    function d() {}
    function l(a) {
        var b;
        if (a.value === a.getAttribute("data-placeholder-value") && "true" === a.getAttribute("data-placeholder-active")) {
            a.setAttribute("data-placeholder-active", "false");
            a.value = "";
            a.className = a.className.replace(v, "");
            if (b = a.getAttribute("data-placeholder-type"))
                a.type = b;
            return !0
        }
        return !1
    }
    function e(a) {
        var b;
        b = a.getAttribute("data-placeholder-value");
        return "" === a.value && b ? (a.setAttribute("data-placeholder-active", "true"),
        a.value = b,
        a.className += " ",
        (b = a.getAttribute("data-placeholder-type")) ? 
        a.type = "text" : "password" === a.type && g.changeType(a, "text") && a.setAttribute("data-placeholder-type", "password"),
        !0) : !1
    }
    function u(a, b) {
        var c, d, e, g, f;
        if (a && a.getAttribute("data-placeholder-value"))
            b(a);
        else
            for (c = a ? a.getElementsByTagName("input") : h,
            d = a ? a.getElementsByTagName("textarea") : n,
            f = 0,
            g = c.length + d.length; f < g; f++)
                e = f < c.length ? c[f] : d[f - c.length],
                b(e)
    }
    function w(a) {
        u(a, l)
    }
    function C(a) {
        u(a, e)
    }
    function D(a) {
        return function() {
            s && a.value === a.getAttribute("data-placeholder-value") && "true" === a.getAttribute("data-placeholder-active") ? 
            g.moveCaret(a, 0) : l(a)
        }
    }
    function E(a) {
        return function() {
            e(a)
        }
    }
    function F(a) {
        return function(b) {
            t = a.value;
            if ("true" === a.getAttribute("data-placeholder-active") && t === a.getAttribute("data-placeholder-value") && g.inArray(G, b.keyCode))
                return b.preventDefault && b.preventDefault(),
                !1
        }
    }
    function H(a) {
        return function() {
            var b;
            "true" === a.getAttribute("data-placeholder-active") && a.value !== t && (a.className = a.className.replace(v, ""),
            a.value = a.value.replace(a.getAttribute("data-placeholder-value"), ""),
            a.setAttribute("data-placeholder-active", 
            !1),
            b = a.getAttribute("data-placeholder-type")) && (a.type = b);
            "" === a.value && (a.blur(),
            g.moveCaret(a, 0))
        }
    }
    function I(a) {
        return function() {
            a === document.activeElement && a.value === a.getAttribute("data-placeholder-value") && "true" === a.getAttribute("data-placeholder-active") && g.moveCaret(a, 0)
        }
    }
    function J(a) {
        return function() {
            w(a)
        }
    }
    function x(a) {
        a.form && (p = a.form,
        p.getAttribute("data-placeholder-submit") || (g.addEventListener(p, "submit", J(p)),
        p.setAttribute("data-placeholder-submit", "true")));
        g.addEventListener(a, 
        "focus", D(a));
        g.addEventListener(a, "blur", E(a));
        s && (g.addEventListener(a, "keydown", F(a)),
        g.addEventListener(a, "keyup", H(a)),
        g.addEventListener(a, "click", I(a)));
        a.setAttribute("data-placeholder-bound", "true");
        a.setAttribute("data-placeholder-value", k);
        e(a)
    }
    var y = "text search url tel email password number textarea".split(" "), G = [27, 33, 34, 35, 36, 37, 38, 39, 40, 8, 46], v = /(?:^|\s)(?!\S)/, h, n, m = document.createElement("input"), z = document.getElementsByTagName("head")[0], q = document.documentElement;
    b = b.Placeholders;
    var g = b.Utils, s, A, t, k, B, p, c, r, f;
    b.nativeSupport = void 0 !== m.placeholder;
    if (!b.nativeSupport) {
        h = document.getElementsByTagName("input");
        n = document.getElementsByTagName("textarea");
        s = "false" === q.getAttribute("data-placeholder-focus");
        A = "false" !== q.getAttribute("data-placeholder-live");
        m = document.createElement("style");
        m.type = "text/css";
        q = document.createTextNode(". { color:; }");
        m.styleSheet ? m.styleSheet.cssText = q.nodeValue : m.appendChild(q);
        z.insertBefore(m, z.firstChild);
        f = 0;
        for (r = h.length + n.length; f < 
        r; f++)
            c = f < h.length ? h[f] : n[f - h.length],
            (k = c.attributes.placeholder) && (k = k.nodeValue) && g.inArray(y, c.type) && x(c);
        B = setInterval(function() {
            f = 0;
            for (r = h.length + n.length; f < r; f++)
                if (c = f < h.length ? h[f] : n[f - h.length],
                (k = c.attributes.placeholder) && (k = k.nodeValue) && g.inArray(y, c.type) && (c.getAttribute("data-placeholder-bound") || x(c),
                k !== c.getAttribute("data-placeholder-value") || "password" === c.type && !c.getAttribute("data-placeholder-type")))
                    "password" === c.type && !c.getAttribute("data-placeholder-type") && g.changeType(c, 
                    "text") && c.setAttribute("data-placeholder-type", "password"),
                    c.value === c.getAttribute("data-placeholder-value") && (c.value = k),
                    c.setAttribute("data-placeholder-value", k);
            A || clearInterval(B)
        }, 100)
    }
    b.disable = b.nativeSupport ? d : w;
    b.enable = b.nativeSupport ? d : C
})(this);
!function(e) {
    function r() {
        return new Date(Date.UTC.apply(Date, arguments))
    }
    var u = function(a, b) {
        var c = this;
        this.element = e(a);
        this.language = b.language || this.element.data("date-language") || "en";
        this.language = this.language in f ? this.language : "en";
        this.isRTL = f[this.language].rtl || !1;
        this.formatType = b.formatType || this.element.data("format-type") || "standard";
        this.format = g.parseFormat(b.format || this.element.data("date-format") || f[this.language].format || g.getDefaultFormat(this.formatType, "input"), this.formatType);
        this.isVisible = this.isInline = !1;
        this.isInput = this.element.is("input");
        this.component = this.element.is(".date") ? this.element.find(".add-on .icon-th, .add-on .icon-time, .add-on .icon-calendar").parent() : !1;
        this.componentReset = this.element.is(".date") ? this.element.find(".add-on .icon-remove").parent() : !1;
        this.hasInput = this.component && this.element.find("input").length;
        this.component && 0 === this.component.length && (this.component = !1);
        this.linkField = b.linkField || this.element.data("link-field") || !1;
        this.linkFormat = 
        g.parseFormat(b.linkFormat || this.element.data("link-format") || g.getDefaultFormat(this.formatType, "link"), this.formatType);
        this.minuteStep = b.minuteStep || this.element.data("minute-step") || 5;
        this.pickerPosition = b.pickerPosition || this.element.data("picker-position") || "bottom-right";
        this.showMeridian = b.showMeridian || this.element.data("show-meridian") || !1;
        this.initialDate = b.initialDate || new Date;
        this.writeValue = b.writeValue || !1;
        this._attachEvents();
        this.formatViewType = "datetime";
        "formatViewType" in b ? this.formatViewType = 
        b.formatViewType : "formatViewType" in this.element.data() && (this.formatViewType = this.element.data("formatViewType"));
        this.minView = 0;
        "minView" in b ? this.minView = b.minView : "minView" in this.element.data() && (this.minView = this.element.data("min-view"));
        this.minView = g.convertViewMode(this.minView);
        this.maxView = g.modes.length - 1;
        "maxView" in b ? this.maxView = b.maxView : "maxView" in this.element.data() && (this.maxView = this.element.data("max-view"));
        this.maxView = g.convertViewMode(this.maxView);
        this.wheelViewModeNavigation = 
        !1;
        "wheelViewModeNavigation" in b ? this.wheelViewModeNavigation = b.wheelViewModeNavigation : "wheelViewModeNavigation" in this.element.data() && (this.wheelViewModeNavigation = this.element.data("view-mode-wheel-navigation"));
        this.wheelViewModeNavigationInverseDirection = !1;
        "wheelViewModeNavigationInverseDirection" in b ? this.wheelViewModeNavigationInverseDirection = b.wheelViewModeNavigationInverseDirection : "wheelViewModeNavigationInverseDirection" in this.element.data() && (this.wheelViewModeNavigationInverseDirection = 
        this.element.data("view-mode-wheel-navigation-inverse-dir"));
        this.wheelViewModeNavigationDelay = 100;
        "wheelViewModeNavigationDelay" in b ? this.wheelViewModeNavigationDelay = b.wheelViewModeNavigationDelay : "wheelViewModeNavigationDelay" in this.element.data() && (this.wheelViewModeNavigationDelay = this.element.data("view-mode-wheel-navigation-delay"));
        this.startViewMode = 2;
        "startView" in b ? this.startViewMode = b.startView : "startView" in this.element.data() && (this.startViewMode = this.element.data("start-view"));
        this.viewMode = 
        this.startViewMode = g.convertViewMode(this.startViewMode);
        this.viewSelect = this.minView;
        "viewSelect" in b ? this.viewSelect = b.viewSelect : "viewSelect" in this.element.data() && (this.viewSelect = this.element.data("view-select"));
        this.viewSelect = g.convertViewMode(this.viewSelect);
        this.forceParse = !0;
        "forceParse" in b ? this.forceParse = b.forceParse : "dateForceParse" in this.element.data() && (this.forceParse = this.element.data("date-force-parse"));
        this.picker = e(g.template).appendTo(this.isInline ? this.element : "body").on({
            click: e.proxy(this.click, 
            this),
            mousedown: e.proxy(this.mousedown, this)
        });
        if (this.wheelViewModeNavigation)
            if (e.fn.mousewheel)
                this.picker.on({
                    mousewheel: e.proxy(this.mousewheel, this)
                });
            else
                console.log("Mouse Wheel event is not supported. Please include the jQuery Mouse Wheel plugin before enabling this option");
        this.isInline ? this.picker.addClass("datetimepicker-inline") : this.picker.addClass("datetimepicker-dropdown-" + this.pickerPosition + " dropdown-menu");
        this.isRTL && (this.picker.addClass("datetimepicker-rtl"),
        this.picker.find(".prev i, .next i").toggleClass("icon-arrow-left icon-arrow-right"));
        e(document).on("mousedown", function(a) {
            0 === e(a.target).closest(".datetimepicker").length && c.hide()
        });
        this.autoclose = !1;
        "autoclose" in b ? this.autoclose = b.autoclose : "dateAutoclose" in this.element.data() && (this.autoclose = this.element.data("date-autoclose"));
        this.keyboardNavigation = !0;
        "keyboardNavigation" in b ? this.keyboardNavigation = b.keyboardNavigation : "dateKeyboardNavigation" in this.element.data() && (this.keyboardNavigation = this.element.data("date-keyboard-navigation"));
        this.todayBtn = b.todayBtn || this.element.data("date-today-btn") || 
        !1;
        this.todayHighlight = b.todayHighlight || this.element.data("date-today-highlight") || !1;
        this.weekStart = (b.weekStart || this.element.data("date-weekstart") || f[this.language].weekStart || 0) % 7;
        this.weekEnd = (this.weekStart + 6) % 7;
        this.startDate = -Infinity;
        this.endDate = Infinity;
        this.daysOfWeekDisabled = [];
        this.setStartDate(b.startDate || this.element.data("date-startdate"));
        this.setEndDate(b.endDate || this.element.data("date-enddate"));
        this.setDaysOfWeekDisabled(b.daysOfWeekDisabled || this.element.data("date-days-of-week-disabled"));
        this.fillDow();
        this.fillMonths();
        this.update();
        this.showMode();
        this.isInline && this.show()
    }
    ;
    u.prototype = {
        constructor: u,
        _events: [],
        _attachEvents: function() {
            this._detachEvents();
            this.isInput ? this._events = [[this.element, {
                focus: e.proxy(this.show, this),
                keyup: e.proxy(this.update, this),
                keydown: e.proxy(this.keydown, this)
            }]] : this.component && this.hasInput ? (this._events = [[this.element.find("input"), {
                focus: e.proxy(this.show, this),
                keyup: e.proxy(this.update, this),
                keydown: e.proxy(this.keydown, this)
            }], [this.component, 
            {
                click: e.proxy(this.show, this)
            }]],
            this.componentReset && this._events.push([this.componentReset, {
                click: e.proxy(this.reset, this)
            }])) : this.element.is("div") || this.element.hasClass("inline") ? this.isInline = !0 : this._events = [[this.element, {
                click: e.proxy(this.show, this)
            }]];
            for (var a = 0, b, c; a < this._events.length; a++)
                b = this._events[a][0],
                c = this._events[a][1],
                b.on(c)
        },
        _detachEvents: function() {
            for (var a = 0, b, c; a < this._events.length; a++)
                b = this._events[a][0],
                c = this._events[a][1],
                b.off(c);
            this._events = []
        },
        show: function(a) {
            this.picker.show();
            this.height = this.component ? this.component.outerHeight() : this.element.outerHeight();
            this.forceParse && this.update();
            this.place();
            e(window).on("resize", e.proxy(this.place, this));
            a && (a.stopPropagation(),
            a.preventDefault());
            this.isVisible = !0;
            this.element.trigger({
                type: "show",
                date: this.date
            })
        },
        hide: function(a) {
            this.isVisible && !this.isInline && (this.picker.hide(),
            e(window).off("resize", this.place),
            this.viewMode = this.startViewMode,
            this.showMode(),
            this.isInput || e(document).off("mousedown", this.hide),
            this.forceParse && 
            (this.isInput && this.element.val() || this.hasInput && this.element.find("input").val()) && this.setValue(),
            this.isVisible = !1,
            this.element.trigger({
                type: "hide",
                date: this.date
            }))
        },
        remove: function() {
            this._detachEvents();
            this.picker.remove();
            delete this.picker;
            delete this.element.data().datetimepicker
        },
        getDate: function() {
            var a = this.getUTCDate();
            return new Date(a.getTime() + 6E4 * a.getTimezoneOffset())
        },
        getUTCDate: function() {
            return this.date
        },
        setDate: function(a) {
            this.setUTCDate(new Date(a.getTime() - 6E4 * a.getTimezoneOffset()))
        },
        setUTCDate: function(a) {
            a >= this.startDate && a <= this.endDate ? (this.date = a,
            this.setValue(),
            this.viewDate = this.date,
            this.fill()) : this.element.trigger({
                type: "outOfRange",
                date: a,
                startDate: this.startDate,
                endDate: this.endDate
            })
        },
        setFormat: function(a) {
            this.format = g.parseFormat(a, this.formatType);
            var b;
            this.isInput ? b = this.element : this.component && (b = this.element.find("input"));
            b && b.val() && this.setValue()
        },
        setValue: function() {
            var a = this.getFormattedDate();
            this.isInput ? this.writeValue || this.element.val(a) : this.component && 
            !this.writeValue && this.element.find("input").val(a);
            this.element.data("date", a);
            this.linkField && e("#" + this.linkField).val(this.getFormattedDate(this.linkFormat))
        },
        getFormattedDate: function(a) {
            void 0 == a && (a = this.format);
            return g.formatDate(this.date, a, this.language, this.formatType)
        },
        setStartDate: function(a) {
            this.startDate = a || -Infinity;
            -Infinity !== this.startDate && (this.startDate = g.parseDate(this.startDate, this.format, this.language, this.formatType));
            this.update();
            this.updateNavArrows()
        },
        setEndDate: function(a) {
            this.endDate = 
            a || Infinity;
            Infinity !== this.endDate && (this.endDate = g.parseDate(this.endDate, this.format, this.language, this.formatType));
            this.update();
            this.updateNavArrows()
        },
        setDaysOfWeekDisabled: function(a) {
            this.daysOfWeekDisabled = a || [];
            e.isArray(this.daysOfWeekDisabled) || (this.daysOfWeekDisabled = this.daysOfWeekDisabled.split(/,\s*/));
            this.daysOfWeekDisabled = e.map(this.daysOfWeekDisabled, function(a) {
                return parseInt(a, 10)
            });
            this.update();
            this.updateNavArrows()
        },
        place: function() {
            if (!this.isInline) {
                var a = parseInt(this.element.parents().filter(function() {
                    return "auto" != 
                    e(this).css("z-index")
                }).first().css("z-index")) + 1051, b, c, d;
                if (this.component) {
                    if (b = this.component.offset(),
                    d = b.left,
                    "bottom-left" == this.pickerPosition || "top-left" == this.pickerPosition)
                        d += this.component.outerWidth() - this.picker.outerWidth()
                } else if (b = this.element.offset(),
                d = b.left,
                "bottom-left" == this.pickerPosition || "top-left" == this.pickerPosition)
                    d -= this.picker.outerWidth() - 50;
                if (c = "top-left" == this.pickerPosition || "top-right" == this.pickerPosition ? b.top - this.picker.outerHeight() : b.top + this.height) {
                    var n = 
                    "left";
                    -1 != this.pickerPosition.indexOf("right") && (n = "right");
                    c + this.picker.outerWidth() > e(window).height() ? (c = b.top - this.picker.outerHeight() - this.height,
                    this.picker.removeClass("datetimepicker-dropdown-" + this.pickerPosition),
                    this.pickerPosition = "top-" + n,
                    this.picker.addClass("datetimepicker-dropdown-" + this.pickerPosition)) : 0 > c && (c = b.top + this.height,
                    this.picker.removeClass("datetimepicker-dropdown-" + this.pickerPosition),
                    this.pickerPosition = "bottom-" + n,
                    this.picker.addClass("datetimepicker-dropdown-" + 
                    this.pickerPosition))
                }
                this.picker.css({
                    top: c,
                    left: d,
                    zIndex: a
                })
            }
        },
        update: function() {
            var a, b = !1;
            arguments && arguments.length && ("string" === typeof arguments[0] || arguments[0] instanceof Date) ? (a = arguments[0],
            b = !0) : a = this.element.data("date") || (this.isInput ? this.element.val() : this.element.find("input").val()) || this.initialDate;
            a || (a = new Date,
            b = !1);
            this.date = g.parseDate(a, this.format, this.language, this.formatType);
            b && this.setValue();
            this.viewDate = this.date < this.startDate ? new Date(this.startDate) : this.date > 
            this.endDate ? new Date(this.endDate) : new Date(this.date);
            this.fill()
        },
        fillDow: function() {
            for (var a = this.weekStart, b = "\x3ctr\x3e"; a < this.weekStart + 7; )
                b += '\x3cth class\x3d"dow"\x3e' + f[this.language].daysMin[a++ % 7] + "\x3c/th\x3e";
            b += "\x3c/tr\x3e";
            this.picker.find(".datetimepicker-days thead").append(b)
        },
        fillMonths: function() {
            for (var a = "", b = 0; 12 > b; )
                a += '\x3cspan class\x3d"month"\x3e' + f[this.language].monthsShort[b++] + "\x3c/span\x3e";
            this.picker.find(".datetimepicker-months td").html(a)
        },
        fill: function() {
            if (null  != 
            this.date && null  != this.viewDate) {
                var a = new Date(this.viewDate)
                  , b = a.getUTCFullYear()
                  , c = a.getUTCMonth()
                  , d = a.getUTCDate()
                  , n = a.getUTCHours()
                  , l = a.getUTCMinutes()
                  , a = -Infinity !== this.startDate ? this.startDate.getUTCFullYear() : -Infinity
                  , v = -Infinity !== this.startDate ? this.startDate.getUTCMonth() : -Infinity
                  , w = Infinity !== this.endDate ? this.endDate.getUTCFullYear() : Infinity
                  , s = Infinity !== this.endDate ? this.endDate.getUTCMonth() : Infinity
                  , k = (new r(this.date.getUTCFullYear(),this.date.getUTCMonth(),this.date.getUTCDate())).valueOf()
                  , 
                t = new Date;
                this.picker.find(".datetimepicker-days thead th:eq(1)").text(f[this.language].months[c] + " " + b);
                if ("time" == this.formatViewType) {
                    var m = n % 12 ? n % 12 : 12
                      , m = (10 > m ? "0" : "") + m
                      , p = (10 > l ? "0" : "") + l
                      , h = f[this.language].meridiem[12 > n ? 0 : 1];
                    this.picker.find(".datetimepicker-hours thead th:eq(1)").text(m + ":" + p + " " + h.toUpperCase());
                    this.picker.find(".datetimepicker-minutes thead th:eq(1)").text(m + ":" + p + " " + h.toUpperCase())
                } else
                    this.picker.find(".datetimepicker-hours thead th:eq(1)").text(d + " " + f[this.language].months[c] + 
                    " " + b),
                    this.picker.find(".datetimepicker-minutes thead th:eq(1)").text(d + " " + f[this.language].months[c] + " " + b);
                this.picker.find("tfoot th.dategroup").html('\x3cdiv class\x3d"today"\x3e\u4eca\u5929\x3c/div\x3e\x3cdiv class\x3d"tomorrow"\x3e\u660e\u5929\x3c/div\x3e\x3cdiv class\x3d"upcoming"\x3e\u5373\u5c06\x3c/div\x3e\x3cdiv class\x3d"someday"\x3e\u65e0\u65e5\u671f\x3c/div\x3e').toggle(!1 !== this.todayBtn);
                this.updateNavArrows();
                this.fillMonths();
                h = r(b, c - 1, 28, 0, 0, 0, 0);
                m = g.getDaysInMonth(h.getUTCFullYear(), 
                h.getUTCMonth());
                h.setUTCDate(m);
                h.setUTCDate(m - (h.getUTCDay() - this.weekStart + 7) % 7);
                var q = new Date(h);
                q.setUTCDate(q.getUTCDate() + 42);
                q = q.valueOf();
                for (m = []; h.valueOf() < q; ) {
                    h.getUTCDay() == this.weekStart && m.push("\x3ctr\x3e");
                    p = "";
                    if (h.getUTCFullYear() < b || h.getUTCFullYear() == b && h.getUTCMonth() < c)
                        p += " old";
                    else if (h.getUTCFullYear() > b || h.getUTCFullYear() == b && h.getUTCMonth() > c)
                        p += " new";
                    this.todayHighlight && h.getUTCFullYear() == t.getFullYear() && h.getUTCMonth() == t.getMonth() && h.getUTCDate() == t.getDate() && 
                    (p += " today");
                    h.valueOf() == k && (p += " active");
                    if (h.valueOf() + 864E5 <= this.startDate || h.valueOf() > this.endDate || -1 !== e.inArray(h.getUTCDay(), this.daysOfWeekDisabled))
                        p += " disabled";
                    m.push('\x3ctd class\x3d"day' + p + '"\x3e' + h.getUTCDate() + "\x3c/td\x3e");
                    h.getUTCDay() == this.weekEnd && m.push("\x3c/tr\x3e");
                    h.setUTCDate(h.getUTCDate() + 1)
                }
                this.picker.find(".datetimepicker-days tbody").empty().append(m.join(""));
                m = [];
                q = t = h = "";
                for (k = 0; 24 > k; k++)
                    h = r(b, c, d, k),
                    p = "",
                    q = " halfhour",
                    h.valueOf() + 36E5 <= this.startDate || 
                    h.valueOf() > this.endDate ? (p += " disabled",
                    q += " disabled") : n == k && (p += " active"),
                    !k % 3 && m.push('\x3cfieldset class\x3d"hour"\x3e\x3clegend\x3e' + t.toUpperCase() + "\x3c/legend\x3e"),
                    h = k,
                    m.push('\x3cspan class\x3d"hour' + p + " hour_" + (12 > k ? "am" : "pm") + '" style\x3d"font-size:12px;font-weight: bold;" hour\x3d"' + h + '" minute\x3d"0"\x3e' + h + "\x3c/span\x3e"),
                    m.push('\x3cspan class\x3d"hour' + q + " hour_" + (12 > k ? "am" : "pm") + '" hour\x3d"' + h + '" minute\x3d"30"\x3e' + h + ":30\x3c/span\x3e"),
                    !(k + 1) % 3 && m.push("\x3c/fieldset\x3e");
                this.picker.find(".datetimepicker-hours td").html(m.join(""));
                m = [];
                q = "";
                for (k = 0; 60 > k; k += this.minuteStep)
                    h = r(b, c, d, n, k, 0),
                    p = "",
                    h.valueOf() < this.startDate || h.valueOf() > this.endDate ? p += " disabled" : Math.floor(l / this.minuteStep) == Math.floor(k / this.minuteStep) && (p += " active"),
                    this.showMeridian && 2 == f[this.language].meridiem.length ? (t = 12 > n ? f[this.language].meridiem[0] : f[this.language].meridiem[1],
                    t != q && ("" != q && m.push("\x3c/fieldset\x3e"),
                    m.push('\x3cfieldset class\x3d"minute"\x3e\x3clegend\x3e' + t.toUpperCase() + 
                    "\x3c/legend\x3e")),
                    q = t,
                    h = n % 12 ? n % 12 : 12,
                    m.push('\x3cspan class\x3d"minute' + p + '"\x3e' + h + ":" + (10 > k ? "0" + k : k) + "\x3c/span\x3e"),
                    59 == k && m.push("\x3c/fieldset\x3e")) : m.push('\x3cspan class\x3d"minute' + p + '"\x3e' + n + ":" + (10 > k ? "0" + k : k) + "\x3c/span\x3e");
                this.picker.find(".datetimepicker-minutes td").html(m.join(""));
                c = this.date.getUTCFullYear();
                d = this.picker.find(".datetimepicker-months").find("th:eq(1)").text(b).end().find("span").removeClass("active");
                c == b && d.eq(this.date.getUTCMonth()).addClass("active");
                (b < 
                a || b > w) && d.addClass("disabled");
                b == a && d.slice(0, v).addClass("disabled");
                b == w && d.slice(s + 1).addClass("disabled");
                m = "";
                b = 10 * parseInt(b / 10, 10);
                v = this.picker.find(".datetimepicker-years").find("th:eq(1)").text(b + "-" + (b + 9)).end().find("td");
                b -= 1;
                for (k = -1; 11 > k; k++)
                    m += '\x3cspan class\x3d"year' + (-1 == k || 10 == k ? " old" : "") + (c == b ? " active" : "") + (b < a || b > w ? " disabled" : "") + '"\x3e' + b + "\x3c/span\x3e",
                    b += 1;
                v.html(m);
                this.place()
            }
        },
        updateNavArrows: function() {
            var a = new Date(this.viewDate)
              , b = a.getUTCFullYear()
              , c = a.getUTCMonth()
              , 
            d = a.getUTCDate()
              , a = a.getUTCHours();
            switch (this.viewMode) {
            case 0:
                -Infinity !== this.startDate && b <= this.startDate.getUTCFullYear() && c <= this.startDate.getUTCMonth() && d <= this.startDate.getUTCDate() && a <= this.startDate.getUTCHours() ? this.picker.find(".prev").css({
                    visibility: "hidden"
                }) : this.picker.find(".prev").css({
                    visibility: "visible"
                });
                Infinity !== this.endDate && b >= this.endDate.getUTCFullYear() && c >= this.endDate.getUTCMonth() && d >= this.endDate.getUTCDate() && a >= this.endDate.getUTCHours() ? this.picker.find(".next").css({
                    visibility: "hidden"
                }) : 
                this.picker.find(".next").css({
                    visibility: "visible"
                });
                break;
            case 1:
                -Infinity !== this.startDate && b <= this.startDate.getUTCFullYear() && c <= this.startDate.getUTCMonth() && d <= this.startDate.getUTCDate() ? this.picker.find(".prev").css({
                    visibility: "hidden"
                }) : this.picker.find(".prev").css({
                    visibility: "visible"
                });
                Infinity !== this.endDate && b >= this.endDate.getUTCFullYear() && c >= this.endDate.getUTCMonth() && d >= this.endDate.getUTCDate() ? this.picker.find(".next").css({
                    visibility: "hidden"
                }) : this.picker.find(".next").css({
                    visibility: "visible"
                });
                break;
            case 2:
                -Infinity !== this.startDate && b <= this.startDate.getUTCFullYear() && c <= this.startDate.getUTCMonth() ? this.picker.find(".prev").css({
                    visibility: "hidden"
                }) : this.picker.find(".prev").css({
                    visibility: "visible"
                });
                Infinity !== this.endDate && b >= this.endDate.getUTCFullYear() && c >= this.endDate.getUTCMonth() ? this.picker.find(".next").css({
                    visibility: "hidden"
                }) : this.picker.find(".next").css({
                    visibility: "visible"
                });
                break;
            case 3:
            case 4:
                -Infinity !== this.startDate && b <= this.startDate.getUTCFullYear() ? this.picker.find(".prev").css({
                    visibility: "hidden"
                }) : 
                this.picker.find(".prev").css({
                    visibility: "visible"
                }),
                Infinity !== this.endDate && b >= this.endDate.getUTCFullYear() ? this.picker.find(".next").css({
                    visibility: "hidden"
                }) : this.picker.find(".next").css({
                    visibility: "visible"
                })
            }
        },
        mousewheel: function(a) {
            a.preventDefault();
            a.stopPropagation();
            this.wheelPause || (this.wheelPause = !0,
            a = a.originalEvent.wheelDelta,
            a = 0 < a ? 1 : 0 === a ? 0 : -1,
            this.wheelViewModeNavigationInverseDirection && (a = -a),
            this.showMode(a),
            setTimeout(e.proxy(function() {
                this.wheelPause = !1
            }, this), this.wheelViewModeNavigationDelay))
        },
        click: function(a) {
            a.stopPropagation();
            a.preventDefault();
            var b = e(a.target).closest("span, td, th, legend");
            if (1 == b.length)
                if (b.is(".disabled"))
                    this.element.trigger({
                        type: "outOfRange",
                        date: this.viewDate,
                        startDate: this.startDate,
                        endDate: this.endDate
                    });
                else
                    switch (b[0].nodeName.toLowerCase()) {
                    case "th":
                        switch (b[0].className) {
                        case "switch":
                            this.showMode(1);
                            break;
                        case "prev":
                        case "next":
                            b = g.modes[this.viewMode].navStep * ("prev" == b[0].className ? -1 : 1);
                            switch (this.viewMode) {
                            case 0:
                                this.viewDate = this.moveHour(this.viewDate, 
                                b);
                                break;
                            case 1:
                                this.viewDate = this.moveDate(this.viewDate, b);
                                break;
                            case 2:
                                this.viewDate = this.moveMonth(this.viewDate, b);
                                break;
                            case 3:
                            case 4:
                                this.viewDate = this.moveYear(this.viewDate, b)
                            }
                            this.fill();
                            break;
                        case "today":
                            b = new Date;
                            b = r(b.getFullYear(), b.getMonth(), b.getDate(), b.getHours(), b.getMinutes(), b.getSeconds(), 0);
                            this.viewMode = this.startViewMode;
                            this.showMode(0);
                            this._setDate(b);
                            this.fill();
                            this.autoclose && this.hide();
                            break;
                        case "dategroup":
                            switch (a = e(a.target).attr("class"),
                            b = Date.create(TEAMS.nowTime),
                            a) {
                            case "today":
                                this.viewMode = this.startViewMode;
                                this.showMode(0);
                                this._setDate(b);
                                this.fill();
                                this.autoclose && this.hide();
                                break;
                            case "tomorrow":
                                b.addDays(1);
                                this.viewMode = this.startViewMode;
                                this.showMode(0);
                                this._setDate(b);
                                this.fill();
                                this.autoclose && this.hide();
                                break;
                            case "upcoming":
                                b.addDays(7);
                                this.viewMode = this.startViewMode;
                                this.showMode(0);
                                this._setDate(b);
                                this.fill();
                                this.autoclose && this.hide();
                                break;
                            case "someday":
                                this.viewMode = this.startViewMode,
                                this.showMode(0),
                                this._setDate(null ),
                                this.fill(),
                                this.autoclose && this.hide()
                            }
                        }
                        break;
                    case "span":
                        if (!b.is(".disabled")) {
                            a = this.viewDate.getUTCFullYear();
                            var c = this.viewDate.getUTCMonth()
                              , d = this.viewDate.getUTCDate()
                              , n = this.viewDate.getUTCHours()
                              , l = this.viewDate.getUTCMinutes()
                              , f = this.viewDate.getUTCSeconds();
                            b.is(".month") ? (this.viewDate.setUTCDate(1),
                            c = b.parent().find("span").index(b),
                            d = this.viewDate.getUTCDate(),
                            this.viewDate.setUTCMonth(c),
                            this.element.trigger({
                                type: "changeMonth",
                                date: this.viewDate
                            }),
                            3 <= this.viewSelect && this._setDate(r(a, c, d, 
                            n, l, f, 0))) : b.is(".year") ? (this.viewDate.setUTCDate(1),
                            a = parseInt(b.text(), 10) || 0,
                            this.viewDate.setUTCFullYear(a),
                            this.element.trigger({
                                type: "changeYear",
                                date: this.viewDate
                            }),
                            4 <= this.viewSelect && this._setDate(r(a, c, d, n, l, f, 0))) : b.is(".hour") ? (n = parseInt(b.attr("hour")) || 0,
                            l = parseInt(b.attr("minute")) || 0,
                            this.viewDate.setUTCHours(n),
                            this.element.trigger({
                                type: "changeHour",
                                date: this.viewDate
                            }),
                            this.viewDate.setUTCMinutes(l),
                            this.element.trigger({
                                type: "changeMinute",
                                date: this.viewDate
                            }),
                            this._setDate(r(a, 
                            c, d, n, l, f, 0))) : b.is(".minute") && (l = parseInt(b.text().substr(b.text().indexOf(":") + 1), 10) || 0,
                            this.viewDate.setUTCMinutes(l),
                            this.element.trigger({
                                type: "changeMinute",
                                date: this.viewDate
                            }),
                            0 <= this.viewSelect && this._setDate(r(a, c, d, n, l, f, 0)));
                            0 != this.viewMode ? (b = this.viewMode,
                            this.showMode(-1),
                            this.fill(),
                            b == this.viewMode && this.autoclose && this.hide()) : (this.fill(),
                            this.autoclose && this.hide())
                        }
                        break;
                    case "td":
                        b.is(".day") && !b.is(".disabled") && (d = parseInt(b.text(), 10) || 1,
                        a = this.viewDate.getUTCFullYear(),
                        c = this.viewDate.getUTCMonth(),
                        n = this.viewDate.getUTCHours(),
                        l = this.viewDate.getUTCMinutes(),
                        f = this.viewDate.getUTCSeconds(),
                        b.is(".old") ? 0 === c ? (c = 11,
                        a -= 1) : c -= 1 : b.is(".new") && (11 == c ? (c = 0,
                        a += 1) : c += 1),
                        this.viewDate.setUTCFullYear(a),
                        this.viewDate.setUTCMonth(c),
                        this.viewDate.setUTCDate(d),
                        this.element.trigger({
                            type: "changeDay",
                            date: this.viewDate
                        }),
                        2 <= this.viewSelect && this._setDate(r(a, c, d, n, l, f, 0))),
                        b = this.viewMode,
                        this.showMode(-1),
                        this.fill(),
                        b == this.viewMode && this.autoclose && this.hide()
                    }
        },
        _setDate: function(a, 
        b) {
            b && "date" != b || (this.date = a);
            b && "view" != b || (this.viewDate = a);
            this.fill();
            this.setValue();
            var c;
            this.isInput ? c = this.element : this.component && (c = this.element.find("input"));
            c && c.change();
            this.element.trigger({
                type: "changeDate",
                date: this.date
            })
        },
        moveMinute: function(a, b) {
            if (!b)
                return a;
            var c = new Date(a.valueOf());
            c.setUTCMinutes(c.getUTCMinutes() + b * this.minuteStep);
            return c
        },
        moveHour: function(a, b) {
            if (!b)
                return a;
            var c = new Date(a.valueOf());
            c.setUTCHours(c.getUTCHours() + b);
            return c
        },
        moveDate: function(a, 
        b) {
            if (!b)
                return a;
            var c = new Date(a.valueOf());
            c.setUTCDate(c.getUTCDate() + b);
            return c
        },
        moveMonth: function(a, b) {
            if (!b)
                return a;
            var c = new Date(a.valueOf()), d = c.getUTCDate(), n = c.getUTCMonth(), e = Math.abs(b), f;
            b = 0 < b ? 1 : -1;
            if (1 == e) {
                if (e = -1 == b ? function() {
                    return c.getUTCMonth() == n
                }
                 : function() {
                    return c.getUTCMonth() != f
                }
                ,
                f = n + b,
                c.setUTCMonth(f),
                0 > f || 11 < f)
                    f = (f + 12) % 12
            } else {
                for (var g = 0; g < e; g++)
                    c = this.moveMonth(c, b);
                f = c.getUTCMonth();
                c.setUTCDate(d);
                e = function() {
                    return f != c.getUTCMonth()
                }
            }
            for (; e(); )
                c.setUTCDate(--d),
                c.setUTCMonth(f);
            return c
        },
        moveYear: function(a, b) {
            return this.moveMonth(a, 12 * b)
        },
        dateWithinRange: function(a) {
            return a >= this.startDate && a <= this.endDate
        },
        keydown: function(a) {
            if (this.picker.is(":not(:visible)"))
                27 == a.keyCode && this.show();
            else {
                var b = !1, c, d, e;
                switch (a.keyCode) {
                case 27:
                    this.hide();
                    a.preventDefault();
                    break;
                case 37:
                case 39:
                    if (!this.keyboardNavigation)
                        break;
                    c = 37 == a.keyCode ? -1 : 1;
                    viewMode = this.viewMode;
                    a.ctrlKey ? viewMode += 2 : a.shiftKey && (viewMode += 1);
                    4 == viewMode ? (d = this.moveYear(this.date, c),
                    e = this.moveYear(this.viewDate, c)) : 3 == viewMode ? (d = this.moveMonth(this.date, c),
                    e = this.moveMonth(this.viewDate, c)) : 2 == viewMode ? (d = this.moveDate(this.date, c),
                    e = this.moveDate(this.viewDate, c)) : 1 == viewMode ? (d = this.moveHour(this.date, c),
                    e = this.moveHour(this.viewDate, c)) : 0 == viewMode && (d = this.moveMinute(this.date, c),
                    e = this.moveMinute(this.viewDate, c));
                    this.dateWithinRange(d) && (this.date = d,
                    this.viewDate = e,
                    this.setValue(),
                    this.update(),
                    a.preventDefault(),
                    b = !0);
                    break;
                case 38:
                case 40:
                    if (!this.keyboardNavigation)
                        break;
                    c = 38 == a.keyCode ? -1 : 1;
                    viewMode = this.viewMode;
                    a.ctrlKey ? viewMode += 2 : a.shiftKey && (viewMode += 1);
                    4 == viewMode ? (d = this.moveYear(this.date, c),
                    e = this.moveYear(this.viewDate, c)) : 3 == viewMode ? (d = this.moveMonth(this.date, c),
                    e = this.moveMonth(this.viewDate, c)) : 2 == viewMode ? (d = this.moveDate(this.date, 7 * c),
                    e = this.moveDate(this.viewDate, 7 * c)) : 1 == viewMode ? this.showMeridian ? (d = this.moveHour(this.date, 6 * c),
                    e = this.moveHour(this.viewDate, 6 * c)) : (d = this.moveHour(this.date, 4 * c),
                    e = this.moveHour(this.viewDate, 4 * c)) : 0 == viewMode && 
                    (d = this.moveMinute(this.date, 4 * c),
                    e = this.moveMinute(this.viewDate, 4 * c));
                    this.dateWithinRange(d) && (this.date = d,
                    this.viewDate = e,
                    this.setValue(),
                    this.update(),
                    a.preventDefault(),
                    b = !0);
                    break;
                case 13:
                    0 != this.viewMode ? (c = this.viewMode,
                    this.showMode(-1),
                    this.fill(),
                    c == this.viewMode && this.autoclose && this.hide()) : (this.fill(),
                    this.autoclose && this.hide());
                    a.preventDefault();
                    break;
                case 9:
                    this.hide()
                }
                if (b) {
                    var f;
                    this.isInput ? f = this.element : this.component && (f = this.element.find("input"));
                    f && f.change();
                    this.element.trigger({
                        type: "changeDate",
                        date: this.date
                    })
                }
            }
        },
        showMode: function(a) {
            a && (a = Math.max(0, Math.min(g.modes.length - 1, this.viewMode + a)),
            a >= this.minView && a <= this.maxView && (this.element.trigger({
                type: "changeMode",
                date: this.viewDate,
                oldViewMode: this.viewMode,
                newViewMode: a
            }),
            this.viewMode = a));
            this.picker.find("\x3ediv").hide().filter(".datetimepicker-" + g.modes[this.viewMode].clsName).css("display", "block");
            this.updateNavArrows()
        },
        reset: function(a) {
            this._setDate(null , "date")
        }
    };
    e.fn.datetimepicker = function(a) {
        var b = Array.apply(null , arguments);
        b.shift();
        return this.each(function() {
            var c = e(this)
              , d = c.data("datetimepicker")
              , f = "object" == typeof a && a;
            d || c.data("datetimepicker", d = new u(this,e.extend({}, e.fn.datetimepicker.defaults, f)));
            "string" == typeof a && "function" == typeof d[a] && d[a].apply(d, b)
        })
    }
    ;
    e.fn.datetimepicker.defaults = {};
    e.fn.datetimepicker.Constructor = u;
    var f = e.fn.datetimepicker.dates = {
        en: {
            days: "Sunday Monday Tuesday Wednesday Thursday Friday Saturday Sunday".split(" "),
            daysShort: "Sun Mon Tue Wed Thu Fri Sat Sun".split(" "),
            daysMin: "Su Mo Tu We Th Fr Sa Su".split(" "),
            months: "January February March April May June July August September October November December".split(" "),
            monthsShort: "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),
            meridiem: ["am", "pm"],
            suffix: ["st", "nd", "rd", "th"],
            today: "Today"
        }
    }
      , g = {
        modes: [{
            clsName: "minutes",
            navFnc: "Hours",
            navStep: 1
        }, {
            clsName: "hours",
            navFnc: "Date",
            navStep: 1
        }, {
            clsName: "days",
            navFnc: "Month",
            navStep: 1
        }, {
            clsName: "months",
            navFnc: "FullYear",
            navStep: 1
        }, {
            clsName: "years",
            navFnc: "FullYear",
            navStep: 10
        }],
        isLeapYear: function(a) {
            return 0 === 
            a % 4 && 0 !== a % 100 || 0 === a % 400
        },
        getDaysInMonth: function(a, b) {
            return [31, g.isLeapYear(a) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][b]
        },
        getDefaultFormat: function(a, b) {
            if ("standard" == a)
                return "input" == b ? "yyyy-mm-dd hh:ii" : "yyyy-mm-dd hh:ii:ss";
            if ("php" == a)
                return "input" == b ? "Y-m-d H:i" : "Y-m-d H:i:s";
            throw Error("Invalid format type.");
        },
        validParts: function(a) {
            if ("standard" == a)
                return /hh?|HH?|p|P|ii?|ss?|dd?|DD?|mm?|MM?|yy(?:yy)?/g;
            if ("php" == a)
                return /[dDjlNwzFmMnStyYaABgGhHis]/g;
            throw Error("Invalid format type.");
        },
        nonpunctuation: /[^ -\/:-@\[-`{-~\t\n\rTZ]+/g,
        parseFormat: function(a, b) {
            var c = a.replace(this.validParts(b), "\x00").split("\x00")
              , d = a.match(this.validParts(b));
            if (!c || !c.length || !d || 0 == d.length)
                throw Error("Invalid date format.");
            return {
                separators: c,
                parts: d
            }
        },
        parseDate: function(a, b, c, d) {
            if (a instanceof Date)
                return a;
            /^\d{4}\-\d{1,2}\-\d{1,2}$/.test(a) && (b = this.parseFormat("yyyy-mm-dd", d));
            /^\d{4}\-\d{1,2}\-\d{1,2}[T ]\d{1,2}\:\d{1,2}$/.test(a) && (b = this.parseFormat("yyyy-mm-dd hh:ii", d));
            /^\d{4}\-\d{1,2}\-\d{1,2}[T ]\d{1,2}\:\d{1,2}\:\d{1,2}[Z]{0,1}$/.test(a) && 
            (b = this.parseFormat("yyyy-mm-dd hh:ii:ss", d));
            if (/^[-+]\d+[dmwy]([\s,]+[-+]\d+[dmwy])*$/.test(a)) {
                b = /([-+]\d+)([dmwy])/;
                var g = a.match(/([-+]\d+)([dmwy])/g);
                a = new Date;
                for (var l = 0; l < g.length; l++)
                    switch (d = b.exec(g[l]),
                    c = parseInt(d[1]),
                    d[2]) {
                    case "d":
                        a.setUTCDate(a.getUTCDate() + c);
                        break;
                    case "m":
                        a = u.prototype.moveMonth.call(u.prototype, a, c);
                        break;
                    case "w":
                        a.setUTCDate(a.getUTCDate() + 7 * c);
                        break;
                    case "y":
                        a = u.prototype.moveYear.call(u.prototype, a, c)
                    }
                return r(a.getUTCFullYear(), a.getUTCMonth(), a.getUTCDate(), 
                a.getUTCHours(), a.getUTCMinutes(), a.getUTCSeconds(), 0)
            }
            g = a && a.match(this.nonpunctuation) || [];
            a = new Date(0,0,0,0,0,0,0);
            var v = {}, w = "hh h ii i ss s yyyy yy M MM m mm D DD d dd H HH p P".split(" "), s = {
                hh: function(a, b) {
                    return a.setUTCHours(b)
                },
                h: function(a, b) {
                    return a.setUTCHours(b)
                },
                HH: function(a, b) {
                    return a.setUTCHours(12 == b ? 0 : b)
                },
                H: function(a, b) {
                    return a.setUTCHours(12 == b ? 0 : b)
                },
                ii: function(a, b) {
                    return a.setUTCMinutes(b)
                },
                i: function(a, b) {
                    return a.setUTCMinutes(b)
                },
                ss: function(a, b) {
                    return a.setUTCSeconds(b)
                },
                s: function(a, b) {
                    return a.setUTCSeconds(b)
                },
                yyyy: function(a, b) {
                    return a.setUTCFullYear(b)
                },
                yy: function(a, b) {
                    return a.setUTCFullYear(2E3 + b)
                },
                m: function(a, b) {
                    for (b -= 1; 0 > b; )
                        b += 12;
                    b %= 12;
                    for (a.setUTCMonth(b); a.getUTCMonth() != b; )
                        a.setUTCDate(a.getUTCDate() - 1);
                    return a
                },
                d: function(a, b) {
                    return a.setUTCDate(b)
                },
                p: function(a, b) {
                    return a.setUTCHours(1 == b ? a.getUTCHours() + 12 : a.getUTCHours())
                }
            }, k;
            s.M = s.MM = s.mm = s.m;
            s.dd = s.d;
            s.P = s.p;
            a = r(a.getFullYear(), a.getMonth(), a.getDate(), a.getHours(), a.getMinutes(), a.getSeconds());
            if (g.length == b.parts.length) {
                for (var l = 0, t = b.parts.length; l < t; l++) {
                    k = parseInt(g[l], 10);
                    d = b.parts[l];
                    if (isNaN(k))
                        switch (d) {
                        case "MM":
                            k = e(f[c].months).filter(function() {
                                var a = this.slice(0, g[l].length)
                                  , b = g[l].slice(0, a.length);
                                return a == b
                            });
                            k = e.inArray(k[0], f[c].months) + 1;
                            break;
                        case "M":
                            k = e(f[c].monthsShort).filter(function() {
                                var a = this.slice(0, g[l].length)
                                  , b = g[l].slice(0, a.length);
                                return a == b
                            });
                            k = e.inArray(k[0], f[c].monthsShort) + 1;
                            break;
                        case "p":
                        case "P":
                            k = e.inArray(g[l].toLowerCase(), f[c].meridiem)
                        }
                    v[d] = 
                    k
                }
                for (l = 0; l < w.length; l++)
                    if (d = w[l],
                    d in v && !isNaN(v[d]))
                        s[d](a, v[d])
            }
            return a
        },
        formatDate: function(a, b, c, d) {
            if (null  == a)
                return "";
            if ("standard" == d)
                c = {
                    yy: a.getUTCFullYear().toString().substring(2),
                    yyyy: a.getUTCFullYear(),
                    m: a.getUTCMonth() + 1,
                    M: f[c].monthsShort[a.getUTCMonth()],
                    MM: f[c].months[a.getUTCMonth()],
                    d: a.getUTCDate(),
                    D: f[c].daysShort[a.getUTCDay()],
                    DD: f[c].days[a.getUTCDay()],
                    p: 2 == f[c].meridiem.length ? f[c].meridiem[12 > a.getUTCHours() ? 0 : 1] : "",
                    h: a.getUTCHours(),
                    i: a.getUTCMinutes(),
                    s: a.getUTCSeconds()
                },
                c.H = 0 == c.h % 12 ? 12 : c.h % 12,
                c.HH = (10 > c.H ? "0" : "") + c.H,
                c.P = c.p.toUpperCase(),
                c.hh = (10 > c.h ? "0" : "") + c.h,
                c.ii = (10 > c.i ? "0" : "") + c.i,
                c.ss = (10 > c.s ? "0" : "") + c.s,
                c.dd = (10 > c.d ? "0" : "") + c.d,
                c.mm = (10 > c.m ? "0" : "") + c.m;
            else if ("php" == d)
                c = {
                    y: a.getUTCFullYear().toString().substring(2),
                    Y: a.getUTCFullYear(),
                    F: f[c].months[a.getUTCMonth()],
                    M: f[c].monthsShort[a.getUTCMonth()],
                    n: a.getUTCMonth() + 1,
                    t: g.getDaysInMonth(a.getUTCFullYear(), a.getUTCMonth()),
                    j: a.getUTCDate(),
                    l: f[c].days[a.getUTCDay()],
                    D: f[c].daysShort[a.getUTCDay()],
                    w: a.getUTCDay(),
                    N: 0 == a.getUTCDay() ? 7 : a.getUTCDay(),
                    S: a.getUTCDate() % 10 <= f[c].suffix.length ? f[c].suffix[a.getUTCDate() % 10 - 1] : "",
                    a: 2 == f[c].meridiem.length ? f[c].meridiem[12 > a.getUTCHours() ? 0 : 1] : "",
                    g: 0 == a.getUTCHours() % 12 ? 12 : a.getUTCHours() % 12,
                    G: a.getUTCHours(),
                    i: a.getUTCMinutes(),
                    s: a.getUTCSeconds()
                },
                c.m = (10 > c.n ? "0" : "") + c.n,
                c.d = (10 > c.j ? "0" : "") + c.j,
                c.A = c.a.toString().toUpperCase(),
                c.h = (10 > c.g ? "0" : "") + c.g,
                c.H = (10 > c.G ? "0" : "") + c.G,
                c.i = (10 > c.i ? "0" : "") + c.i,
                c.s = (10 > c.s ? "0" : "") + c.s;
            else
                throw Error("Invalid format type.");
            a = [];
            d = e.extend([], b.separators);
            for (var n = 0, l = b.parts.length; n < l; n++)
                d.length && a.push(d.shift()),
                a.push(c[b.parts[n]]);
            return a.join("")
        },
        convertViewMode: function(a) {
            switch (a) {
            case 4:
            case "decade":
                a = 4;
                break;
            case 3:
            case "year":
                a = 3;
                break;
            case 2:
            case "month":
                a = 2;
                break;
            case 1:
            case "day":
                a = 1;
                break;
            case 0:
            case "hour":
                a = 0
            }
            return a
        },
        headTemplate: '\x3cthead\x3e\x3ctr\x3e\x3cth class\x3d"prev"\x3e\x3ci class\x3d"icon-arrow-left"/\x3e\x3c/th\x3e\x3cth colspan\x3d"5" class\x3d"switch"\x3e\x3c/th\x3e\x3cth class\x3d"next"\x3e\x3ci class\x3d"icon-arrow-right"/\x3e\x3c/th\x3e\x3c/tr\x3e\x3c/thead\x3e',
        contTemplate: '\x3ctbody\x3e\x3ctr\x3e\x3ctd colspan\x3d"7"\x3e\x3c/td\x3e\x3c/tr\x3e\x3c/tbody\x3e',
        footTemplate: '\x3ctfoot\x3e\x3ctr\x3e\x3cth colspan\x3d"7" class\x3d"dategroup"\x3e\x3c/th\x3e\x3c/tr\x3e\x3c/tfoot\x3e'
    };
    g.template = '\x3cdiv class\x3d"datetimepicker"\x3e\x3cdiv class\x3d"datetimepicker-minutes"\x3e\x3ctable class\x3d" table-condensed"\x3e' + g.headTemplate + g.contTemplate + g.footTemplate + '\x3c/table\x3e\x3c/div\x3e\x3cdiv class\x3d"datetimepicker-hours"\x3e\x3ctable class\x3d" table-condensed"\x3e' + 
    g.headTemplate + g.contTemplate + g.footTemplate + '\x3c/table\x3e\x3c/div\x3e\x3cdiv class\x3d"datetimepicker-days"\x3e\x3ctable class\x3d" table-condensed"\x3e' + g.headTemplate + "\x3ctbody\x3e\x3c/tbody\x3e" + g.footTemplate + '\x3c/table\x3e\x3c/div\x3e\x3cdiv class\x3d"datetimepicker-months"\x3e\x3ctable class\x3d"table-condensed"\x3e' + g.headTemplate + g.contTemplate + g.footTemplate + '\x3c/table\x3e\x3c/div\x3e\x3cdiv class\x3d"datetimepicker-years"\x3e\x3ctable class\x3d"table-condensed"\x3e' + g.headTemplate + 
    g.contTemplate + g.footTemplate + "\x3c/table\x3e\x3c/div\x3e\x3c/div\x3e";
    e.fn.datetimepicker.DPGlobal = g;
    e.fn.datetimepicker.noConflict = function() {
        e.fn.datetimepicker = old;
        return this
    }
    ;
    e(document).on("focus.datetimepicker.data-api click.datetimepicker.data-api", '[data-provide\x3d"datetimepicker"]', function(a) {
        var b = e(this);
        b.data("datetimepicker") || (a.preventDefault(),
        b.datetimepicker("show"))
    });
    e(function() {
        e('[data-provide\x3d"datetimepicker-inline"]').datetimepicker()
    })
}(window.jQuery);
(function(e) {
    e.fn.datetimepicker.dates["zh-CN"] = {
        days: "\u661f\u671f\u65e5 \u661f\u671f\u4e00 \u661f\u671f\u4e8c \u661f\u671f\u4e09 \u661f\u671f\u56db \u661f\u671f\u4e94 \u661f\u671f\u516d \u661f\u671f\u65e5".split(" "),
        daysShort: "\u5468\u65e5 \u5468\u4e00 \u5468\u4e8c \u5468\u4e09 \u5468\u56db \u5468\u4e94 \u5468\u516d \u5468\u65e5".split(" "),
        daysMin: "\u65e5\u4e00\u4e8c\u4e09\u56db\u4e94\u516d\u65e5".split(""),
        months: "\u4e00\u6708 \u4e8c\u6708 \u4e09\u6708 \u56db\u6708 \u4e94\u6708 \u516d\u6708 \u4e03\u6708 \u516b\u6708 \u4e5d\u6708 \u5341\u6708 \u5341\u4e00\u6708 \u5341\u4e8c\u6708".split(" "),
        monthsShort: "\u4e00\u6708 \u4e8c\u6708 \u4e09\u6708 \u56db\u6708 \u4e94\u6708 \u516d\u6708 \u4e03\u6708 \u516b\u6708 \u4e5d\u6708 \u5341\u6708 \u5341\u4e00\u6708 \u5341\u4e8c\u6708".split(" "),
        today: "\u4eca\u5929",
        suffix: [],
        meridiem: ["\u4e0a\u5348", "\u4e0b\u5348"]
    }
})(jQuery);
(function(d) {
    var t, l, u, k = d(window), x = {
        bootstrap: {
            container: "alert alert-warning",
            notice: "",
            notice_icon: "icon-exclamation-sign",
            info: "alert-info",
            info_icon: "icon-info-sign",
            success: "alert-success",
            success_icon: "icon-ok-sign",
            error: "alert-error",
            error_icon: "icon-warning-sign",
            closer: "icon-remove",
            pin_up: "icon-pause",
            pin_down: "icon-play",
            hi_menu: "well",
            hi_btn: "btn",
            hi_btnhov: "",
            hi_hnd: "icon-chevron-down"
        }
    }, v = function() {
        u = d("body");
        k = d(window);
        k.bind("resize", function() {
            l && clearTimeout(l);
            l = setTimeout(d.pnotify_position_all, 
            10)
        })
    }
    ;
    document.body ? v() : d(v);
    d.extend({
        pnotify_remove_all: function() {
            var e = k.data("pnotify");
            e && e.length && d.each(e, function() {
                this.pnotify_remove && this.pnotify_remove()
            })
        },
        pnotify_position_all: function() {
            l && clearTimeout(l);
            l = null ;
            var e = k.data("pnotify");
            e && e.length && (d.each(e, function() {
                var d = this.opts.stack;
                d && (d.nextpos1 = d.firstpos1,
                d.nextpos2 = d.firstpos2,
                d.addpos2 = 0,
                d.animation = !0)
            }),
            d.each(e, function() {
                this.pnotify_position()
            }))
        },
        pnotify: function(e) {
            var g, a;
            "object" != typeof e ? (a = d.extend({}, 
            d.pnotify.defaults),
            a.text = e) : a = d.extend({}, d.pnotify.defaults, e);
            for (var s in a)
                "string" == typeof s && s.match(/^pnotify_/) && (a[s.replace(/^pnotify_/, "")] = a[s]);
            if (a.before_init && !1 === a.before_init(a))
                return null ;
            var m, r = function(a, c) {
                b.css("display", "none");
                var f = document.elementFromPoint(a.clientX, a.clientY);
                b.css("display", "block");
                var e = d(f)
                  , g = e.css("cursor");
                b.css("cursor", "auto" != g ? g : "default");
                m && m.get(0) == f || (m && (q.call(m.get(0), "mouseleave", a.originalEvent),
                q.call(m.get(0), "mouseout", a.originalEvent)),
                q.call(f, "mouseenter", a.originalEvent),
                q.call(f, "mouseover", a.originalEvent));
                q.call(f, c, a.originalEvent);
                m = e
            }
            , f = x[a.styling], b = d("\x3cdiv /\x3e", {
                "class": "ui-pnotify " + a.addclass,
                css: {
                    display: "none"
                },
                mouseenter: function(n) {
                    a.nonblock && n.stopPropagation();
                    a.mouse_reset && "out" == g && (b.stop(!0),
                    g = "in",
                    b.css("height", "auto").animate({
                        width: a.width,
                        opacity: a.nonblock ? a.nonblock_opacity : a.opacity
                    }, "fast"));
                    a.nonblock && b.animate({
                        opacity: a.nonblock_opacity
                    }, "fast");
                    a.hide && a.mouse_reset && b.pnotify_cancel_remove();
                    a.sticker && !a.nonblock && b.sticker.trigger("pnotify_icon").css("visibility", "visible");
                    a.closer && !a.nonblock && b.closer.css("visibility", "visible")
                },
                mouseleave: function(n) {
                    a.nonblock && n.stopPropagation();
                    m = null ;
                    b.css("cursor", "auto");
                    a.nonblock && "out" != g && b.animate({
                        opacity: a.opacity
                    }, "fast");
                    a.hide && a.mouse_reset && b.pnotify_queue_remove();
                    a.sticker_hover && b.sticker.css("visibility", "hidden");
                    a.closer_hover && b.closer.css("visibility", "hidden");
                    d.pnotify_position_all()
                },
                mouseover: function(b) {
                    a.nonblock && 
                    b.stopPropagation()
                },
                mouseout: function(b) {
                    a.nonblock && b.stopPropagation()
                },
                mousemove: function(b) {
                    a.nonblock && (b.stopPropagation(),
                    r(b, "onmousemove"))
                },
                mousedown: function(b) {
                    a.nonblock && (b.stopPropagation(),
                    b.preventDefault(),
                    r(b, "onmousedown"))
                },
                mouseup: function(b) {
                    a.nonblock && (b.stopPropagation(),
                    b.preventDefault(),
                    r(b, "onmouseup"))
                },
                click: function(b) {
                    a.nonblock && (b.stopPropagation(),
                    r(b, "onclick"))
                },
                dblclick: function(b) {
                    a.nonblock && (b.stopPropagation(),
                    r(b, "ondblclick"))
                }
            });
            b.opts = a;
            b.container = 
            d("\x3cdiv /\x3e", {
                "class": f.container + " ui-pnotify-container " + ("error" == a.type ? f.error : "info" == a.type ? f.info : "success" == a.type ? f.success : f.notice)
            }).appendTo(b);
            "" != a.cornerclass && b.container.removeClass("ui-corner-all").addClass(a.cornerclass);
            a.shadow && b.container.addClass("ui-pnotify-shadow");
            b.pnotify_version = "1.2.0";
            b.pnotify = function(n) {
                var c = a;
                "string" == typeof n ? a.text = n : a = d.extend({}, a, n);
                for (var e in a)
                    "string" == typeof e && e.match(/^pnotify_/) && (a[e.replace(/^pnotify_/, "")] = a[e]);
                b.opts = 
                a;
                a.cornerclass != c.cornerclass && b.container.removeClass("ui-corner-all").addClass(a.cornerclass);
                a.shadow != c.shadow && (a.shadow ? b.container.addClass("ui-pnotify-shadow") : b.container.removeClass("ui-pnotify-shadow"));
                !1 === a.addclass ? b.removeClass(c.addclass) : a.addclass !== c.addclass && b.removeClass(c.addclass).addClass(a.addclass);
                !1 === a.title ? b.title_container.slideUp("fast") : a.title !== c.title && (a.title_escape ? b.title_container.text(a.title).slideDown(200) : b.title_container.html(a.title).slideDown(200));
                !1 === a.text ? b.text_container.slideUp("fast") : a.text !== c.text && (a.text_escape ? b.text_container.text(a.text).slideDown(200) : b.text_container.html(a.insert_brs ? String(a.text).replace(/\n/g, "\x3cbr /\x3e") : a.text).slideDown(200));
                b.pnotify_history = a.history;
                b.pnotify_hide = a.hide;
                a.type != c.type && b.container.removeClass(f.error + " " + f.notice + " " + f.success + " " + f.info).addClass("error" == a.type ? f.error : "info" == a.type ? f.info : "success" == a.type ? f.success : f.notice);
                if (a.icon !== c.icon || !0 === a.icon && a.type != c.type)
                    b.container.find("div.ui-pnotify-icon").remove(),
                    !1 !== a.icon && d("\x3cdiv /\x3e", {
                        "class": "ui-pnotify-icon"
                    }).append(d("\x3cspan /\x3e", {
                        "class": !0 === a.icon ? "error" == a.type ? f.error_icon : "info" == a.type ? f.info_icon : "success" == a.type ? f.success_icon : f.notice_icon : a.icon
                    })).prependTo(b.container);
                a.width !== c.width && b.animate({
                    width: a.width
                });
                a.min_height !== c.min_height && b.container.animate({
                    minHeight: a.min_height
                });
                a.opacity !== c.opacity && b.fadeTo(a.animate_speed, a.opacity);
                !a.closer || a.nonblock ? b.closer.css("display", "none") : b.closer.css("display", "block");
                !a.sticker || a.nonblock ? b.sticker.css("display", "none") : b.sticker.css("display", "block");
                b.sticker.trigger("pnotify_icon");
                a.sticker_hover ? b.sticker.css("visibility", "hidden") : a.nonblock || b.sticker.css("visibility", "visible");
                a.closer_hover ? b.closer.css("visibility", "hidden") : a.nonblock || b.closer.css("visibility", "visible");
                a.hide ? c.hide || b.pnotify_queue_remove() : b.pnotify_cancel_remove();
                b.pnotify_queue_position();
                return b
            }
            ;
            b.pnotify_position = function(a) {
                var c = b.opts.stack;
                if (c) {
                    c.nextpos1 || (c.nextpos1 = 
                    c.firstpos1);
                    c.nextpos2 || (c.nextpos2 = c.firstpos2);
                    c.addpos2 || (c.addpos2 = 0);
                    var d = "none" == b.css("display");
                    if (!d || a) {
                        var f, e = {}, g;
                        switch (c.dir1) {
                        case "down":
                            g = "top";
                            break;
                        case "up":
                            g = "bottom";
                            break;
                        case "left":
                            g = "right";
                            break;
                        case "right":
                            g = "left"
                        }
                        a = parseInt(b.css(g));
                        isNaN(a) && (a = 0);
                        "undefined" != typeof c.firstpos1 || d || (c.firstpos1 = a,
                        c.nextpos1 = c.firstpos1);
                        var h;
                        switch (c.dir2) {
                        case "down":
                            h = "top";
                            break;
                        case "up":
                            h = "bottom";
                            break;
                        case "left":
                            h = "right";
                            break;
                        case "right":
                            h = "left"
                        }
                        f = parseInt(b.css(h));
                        isNaN(f) && (f = 0);
                        "undefined" != typeof c.firstpos2 || d || (c.firstpos2 = f,
                        c.nextpos2 = c.firstpos2);
                        if ("down" == c.dir1 && c.nextpos1 + b.height() > k.height() || "up" == c.dir1 && c.nextpos1 + b.height() > k.height() || "left" == c.dir1 && c.nextpos1 + b.width() > k.width() || "right" == c.dir1 && c.nextpos1 + b.width() > k.width())
                            c.nextpos1 = c.firstpos1,
                            c.nextpos2 += c.addpos2 + ("undefined" == typeof c.spacing2 ? 25 : c.spacing2),
                            c.addpos2 = 0;
                        if (c.animation && c.nextpos2 < f)
                            switch (c.dir2) {
                            case "down":
                                e.top = c.nextpos2 + "px";
                                break;
                            case "up":
                                e.bottom = c.nextpos2 + 
                                "px";
                                break;
                            case "left":
                                e.right = c.nextpos2 + "px";
                                break;
                            case "right":
                                e.left = c.nextpos2 + "px"
                            }
                        else
                            b.css(h, c.nextpos2 + "px");
                        switch (c.dir2) {
                        case "down":
                        case "up":
                            b.outerHeight(!0) > c.addpos2 && (c.addpos2 = b.height());
                            break;
                        case "left":
                        case "right":
                            b.outerWidth(!0) > c.addpos2 && (c.addpos2 = b.width())
                        }
                        if (c.nextpos1)
                            if (c.animation && (a > c.nextpos1 || e.top || e.bottom || e.right || e.left))
                                switch (c.dir1) {
                                case "down":
                                    e.top = c.nextpos1 + "px";
                                    break;
                                case "up":
                                    e.bottom = c.nextpos1 + "px";
                                    break;
                                case "left":
                                    e.right = c.nextpos1 + "px";
                                    break;
                                case "right":
                                    e.left = c.nextpos1 + "px"
                                }
                            else
                                b.css(g, c.nextpos1 + "px");
                        (e.top || e.bottom || e.right || e.left) && b.animate(e, {
                            duration: 500,
                            queue: !1
                        });
                        switch (c.dir1) {
                        case "down":
                        case "up":
                            c.nextpos1 += b.height() + ("undefined" == typeof c.spacing1 ? 25 : c.spacing1);
                            break;
                        case "left":
                        case "right":
                            c.nextpos1 += b.width() + ("undefined" == typeof c.spacing1 ? 25 : c.spacing1)
                        }
                    }
                }
            }
            ;
            b.pnotify_queue_position = function(a) {
                l && clearTimeout(l);
                a || (a = 10);
                l = setTimeout(d.pnotify_position_all, a)
            }
            ;
            b.pnotify_display = function() {
                b.parent().length || 
                b.appendTo(u);
                a.before_open && !1 === a.before_open(b) || ("top" != a.stack.push && b.pnotify_position(!0),
                "fade" == a.animation || "fade" == a.animation.effect_in ? b.show().fadeTo(0, 0).hide() : 1 != a.opacity && b.show().fadeTo(0, a.opacity).hide(),
                b.animate_in(function() {
                    a.after_open && a.after_open(b);
                    b.pnotify_queue_position();
                    a.hide && b.pnotify_queue_remove()
                }))
            }
            ;
            b.pnotify_remove = function() {
                b.timer && (window.clearTimeout(b.timer),
                b.timer = null );
                a.before_close && !1 === a.before_close(b) || b.animate_out(function() {
                    a.after_close && 
                    !1 === a.after_close(b) || (b.pnotify_queue_position(),
                    a.remove && b.detach())
                })
            }
            ;
            b.animate_in = function(d) {
                g = "in";
                var c;
                c = "undefined" != typeof a.animation.effect_in ? a.animation.effect_in : a.animation;
                "none" == c ? (b.show(),
                d()) : "show" == c ? b.show(a.animate_speed, d) : "fade" == c ? b.show().fadeTo(a.animate_speed, a.opacity, d) : "slide" == c ? b.slideDown(a.animate_speed, d) : "function" == typeof c ? c("in", d, b) : b.show(c, "object" == typeof a.animation.options_in ? a.animation.options_in : {}, a.animate_speed, d)
            }
            ;
            b.animate_out = function(d) {
                g = 
                "out";
                var c;
                c = "undefined" != typeof a.animation.effect_out ? a.animation.effect_out : a.animation;
                "none" == c ? (b.hide(),
                d()) : "show" == c ? b.hide(a.animate_speed, d) : "fade" == c ? b.fadeOut(a.animate_speed, d) : "slide" == c ? b.slideUp(a.animate_speed, d) : "function" == typeof c ? c("out", d, b) : b.hide(c, "object" == typeof a.animation.options_out ? a.animation.options_out : {}, a.animate_speed, d)
            }
            ;
            b.pnotify_cancel_remove = function() {
                b.timer && window.clearTimeout(b.timer)
            }
            ;
            b.pnotify_queue_remove = function() {
                b.pnotify_cancel_remove();
                b.timer = 
                window.setTimeout(function() {
                    b.pnotify_remove()
                }, isNaN(a.delay) ? 0 : a.delay)
            }
            ;
            b.closer = d("\x3cdiv /\x3e", {
                "class": "ui-pnotify-closer",
                css: {
                    cursor: "pointer",
                    visibility: a.closer_hover ? "hidden" : "visible"
                },
                click: function() {
                    b.pnotify_remove();
                    b.sticker.css("visibility", "hidden");
                    b.closer.css("visibility", "hidden")
                }
            }).append(d("\x3cspan /\x3e", {
                "class": f.closer
            })).appendTo(b.container);
            a.closer && !a.nonblock || b.closer.css("display", "none");
            b.sticker = d("\x3cdiv /\x3e", {
                "class": "ui-pnotify-sticker",
                css: {
                    cursor: "pointer",
                    visibility: a.sticker_hover ? "hidden" : "visible"
                },
                click: function() {
                    a.hide = !a.hide;
                    a.hide ? b.pnotify_queue_remove() : b.pnotify_cancel_remove();
                    d(this).trigger("pnotify_icon")
                }
            }).bind("pnotify_icon", function() {
                d(this).children().removeClass(f.pin_up + " " + f.pin_down).addClass(a.hide ? f.pin_up : f.pin_down)
            }).append(d("\x3cspan /\x3e", {
                "class": f.pin_up
            })).appendTo(b.container);
            a.sticker && !a.nonblock || b.sticker.css("display", "none");
            !1 !== a.icon && d("\x3cdiv /\x3e", {
                "class": "ui-pnotify-icon"
            }).append(d("\x3cspan /\x3e", 
            {
                "class": !0 === a.icon ? "error" == a.type ? f.error_icon : "info" == a.type ? f.info_icon : "success" == a.type ? f.success_icon : f.notice_icon : a.icon
            })).prependTo(b.container);
            b.title_container = d("\x3ch4 /\x3e", {
                "class": "ui-pnotify-title"
            }).appendTo(b.container);
            !1 === a.title ? b.title_container.hide() : a.title_escape ? b.title_container.text(a.title) : b.title_container.html(a.title);
            b.text_container = d("\x3cdiv /\x3e", {
                "class": "ui-pnotify-text"
            }).appendTo(b.container);
            !1 === a.text ? b.text_container.hide() : a.text_escape ? b.text_container.text(a.text) : 
            b.text_container.html(a.insert_brs ? String(a.text).replace(/\n/g, "\x3cbr /\x3e") : a.text);
            "string" == typeof a.width && b.css("width", a.width);
            "string" == typeof a.min_height && b.container.css("min-height", a.min_height);
            b.pnotify_history = a.history;
            b.pnotify_hide = a.hide;
            var h = k.data("pnotify");
            if (null  == h || "object" != typeof h)
                h = [];
            h = "top" == a.stack.push ? d.merge([b], h) : d.merge(h, [b]);
            k.data("pnotify", h);
            "top" == a.stack.push && b.pnotify_queue_position(1);
            a.after_init && a.after_init(b);
            if (a.history) {
                var p = k.data("pnotify_history");
                "undefined" == typeof p && (p = d("\x3cdiv /\x3e", {
                    "class": "ui-pnotify-history-container " + f.hi_menu,
                    mouseleave: function() {
                        p.animate({
                            top: "-" + t + "px"
                        }, {
                            duration: 100,
                            queue: !1
                        })
                    }
                }).append(d("\x3cdiv /\x3e", {
                    "class": "ui-pnotify-history-header",
                    text: "Redisplay"
                })).append(d("\x3cbutton /\x3e", {
                    "class": "ui-pnotify-history-all " + f.hi_btn,
                    text: "All",
                    mouseenter: function() {
                        d(this).addClass(f.hi_btnhov)
                    },
                    mouseleave: function() {
                        d(this).removeClass(f.hi_btnhov)
                    },
                    click: function() {
                        d.each(h, function() {
                            this.pnotify_history && 
                            (this.is(":visible") ? this.pnotify_hide && this.pnotify_queue_remove() : this.pnotify_display && this.pnotify_display())
                        });
                        return !1
                    }
                })).append(d("\x3cbutton /\x3e", {
                    "class": "ui-pnotify-history-last " + f.hi_btn,
                    text: "Last",
                    mouseenter: function() {
                        d(this).addClass(f.hi_btnhov)
                    },
                    mouseleave: function() {
                        d(this).removeClass(f.hi_btnhov)
                    },
                    click: function() {
                        var a = -1, b;
                        do {
                            b = -1 == a ? h.slice(a) : h.slice(a, a + 1);
                            if (!b[0])
                                break;
                            a--
                        } while (!b[0].pnotify_history || b[0].is(":visible"));if (!b[0])
                            return !1;
                        b[0].pnotify_display && b[0].pnotify_display();
                        return !1
                    }
                })).appendTo(u),
                t = d("\x3cspan /\x3e", {
                    "class": "ui-pnotify-history-pulldown " + f.hi_hnd,
                    mouseenter: function() {
                        p.animate({
                            top: "0"
                        }, {
                            duration: 100,
                            queue: !1
                        })
                    }
                }).appendTo(p).offset().top + 2,
                p.css({
                    top: "-" + t + "px"
                }),
                k.data("pnotify_history", p))
            }
            a.stack.animation = !1;
            b.pnotify_display();
            return b
        }
    });
    var w = /^on/
      , y = /^(dbl)?click$|^mouse(move|down|up|over|out|enter|leave)$|^contextmenu$/
      , z = /^(focus|blur|select|change|reset)$|^key(press|down|up)$/
      , A = /^(scroll|resize|(un)?load|abort|error)$/
      , q = function(e, 
    g) {
        var a;
        e = e.toLowerCase();
        document.createEvent && this.dispatchEvent ? (e = e.replace(w, ""),
        e.match(y) ? (d(this).offset(),
        a = document.createEvent("MouseEvents"),
        a.initMouseEvent(e, g.bubbles, g.cancelable, g.view, g.detail, g.screenX, g.screenY, g.clientX, g.clientY, g.ctrlKey, g.altKey, g.shiftKey, g.metaKey, g.button, g.relatedTarget)) : e.match(z) ? (a = document.createEvent("UIEvents"),
        a.initUIEvent(e, g.bubbles, g.cancelable, g.view, g.detail)) : e.match(A) && (a = document.createEvent("HTMLEvents"),
        a.initEvent(e, g.bubbles, g.cancelable)),
        a && this.dispatchEvent(a)) : (e.match(w) || (e = "on" + e),
        a = document.createEventObject(g),
        this.fireEvent(e, a))
    }
    ;
    d.pnotify.defaults = {
        title: !1,
        title_escape: !1,
        text: !1,
        text_escape: !1,
        styling: "bootstrap",
        addclass: "",
        cornerclass: "",
        nonblock: !1,
        nonblock_opacity: .2,
        history: !0,
        width: "300px",
        min_height: "16px",
        type: "notice",
        icon: !0,
        animation: "fade",
        animate_speed: "slow",
        opacity: 1,
        shadow: !0,
        closer: !0,
        closer_hover: !0,
        sticker: !0,
        sticker_hover: !0,
        hide: !0,
        delay: 3E3,
        mouse_reset: !0,
        remove: !0,
        insert_brs: !0,
        stack: {
            dir1: "down",
            dir2: "left",
            push: "bottom",
            spacing1: 25,
            spacing2: 25
        }
    }
})(jQuery);
window.bootbox = window.bootbox || function(w, r) {
    function m(b, a) {
        "undefined" === typeof a && (a = t);
        return "string" === typeof p[a][b] ? p[a][b] : "en" != a ? m(b, "en") : b
    }
    var t = "en"
      , u = !0
      , s = "static"
      , v = ""
      , h = {}
      , k = {}
      , n = {
        setLocale: function(b) {
            for (var a in p)
                if (a == b) {
                    t = b;
                    return
                }
            throw Error("Invalid locale: " + b);
        },
        addLocale: function(b, a) {
            "undefined" === typeof p[b] && (p[b] = {});
            for (var c in a)
                p[b][c] = a[c]
        },
        setIcons: function(b) {
            k = b;
            if ("object" !== typeof k || null  === k)
                k = {}
        },
        setBtnClasses: function(b) {
            h = b;
            if ("object" !== typeof h || null  === 
            h)
                h = {}
        },
        alert: function() {
            var b = ""
              , a = m("OK")
              , c = null ;
            switch (arguments.length) {
            case 1:
                b = arguments[0];
                break;
            case 2:
                b = arguments[0];
                "function" == typeof arguments[1] ? c = arguments[1] : a = arguments[1];
                break;
            case 3:
                b = arguments[0];
                a = arguments[1];
                c = arguments[2];
                break;
            default:
                throw Error("Incorrect number of arguments: expected 1-3");
            }
            var e = n.dialog(b, {
                label: a,
                icon: k.OK,
                "class": h.OK,
                callback: c
            }, {
                header: '\x3ci class\x3d"icon-ok-sign"\x3e\x3c/i\x3e \u6d88\u606f',
                onEscape: c || !0
            });
            e.off("keyup.alert").on("keyup.alert", 
            function(a) {
                13 == a.which && e.modal("hide")
            });
            return e
        },
        confirm: function() {
            var b = ""
              , a = m("CANCEL")
              , c = m("CONFIRM")
              , e = null ;
            switch (arguments.length) {
            case 1:
                b = arguments[0];
                break;
            case 2:
                b = arguments[0];
                "function" == typeof arguments[1] ? e = arguments[1] : a = arguments[1];
                break;
            case 3:
                b = arguments[0];
                a = arguments[1];
                "function" == typeof arguments[2] ? e = arguments[2] : c = arguments[2];
                break;
            case 4:
                b = arguments[0];
                a = arguments[1];
                c = arguments[2];
                e = arguments[3];
                break;
            default:
                throw Error("Incorrect number of arguments: expected 1-4");
            }
            var g = function() {
                if ("function" === typeof e)
                    return e(!1)
            }
              , l = function() {
                if ("function" === typeof e)
                    return e(!0)
            }
              , d = n.dialog(b, [{
                label: c,
                icon: k.CONFIRM,
                "class": h.CONFIRM,
                callback: l
            }, {
                label: a,
                icon: k.CANCEL,
                "class": h.CANCEL,
                callback: g
            }], {
                header: '\x3ci class\x3d"icon-info-sign"\x3e\x3c/i\x3e \u786e\u8ba4',
                onEscape: g
            });
            d.off("keyup.confirm").on("keyup.confirm", function(a) {
                13 == a.which && (d.modal("hide"),
                l())
            });
            return d
        },
        prompt: function() {
            var b = ""
              , a = m("CANCEL")
              , c = m("CONFIRM")
              , e = null 
              , g = "";
            switch (arguments.length) {
            case 1:
                b = 
                arguments[0];
                break;
            case 2:
                b = arguments[0];
                "function" == typeof arguments[1] ? e = arguments[1] : a = arguments[1];
                break;
            case 3:
                b = arguments[0];
                a = arguments[1];
                "function" == typeof arguments[2] ? e = arguments[2] : c = arguments[2];
                break;
            case 4:
                b = arguments[0];
                a = arguments[1];
                c = arguments[2];
                e = arguments[3];
                break;
            case 5:
                b = arguments[0];
                a = arguments[1];
                c = arguments[2];
                e = arguments[3];
                g = arguments[4];
                break;
            default:
                throw Error("Incorrect number of arguments: expected 1-5");
            }
            var l = r("\x3cform\x3e\x3c/form\x3e");
            l.append("\x3cinput class\x3d'input-block-level' autocomplete\x3doff type\x3dtext value\x3d'" + 
            g + "' /\x3e");
            var g = function() {
                if ("function" === typeof e)
                    return e(null )
            }
              , d = n.dialog(l, [{
                label: c,
                icon: k.CONFIRM,
                "class": h.CONFIRM,
                callback: function() {
                    if ("function" === typeof e)
                        return e(l.find("input[type\x3dtext]").val())
                }
            }, {
                label: a,
                icon: k.CANCEL,
                "class": h.CANCEL,
                callback: g
            }], {
                header: b,
                show: !1,
                onEscape: g
            });
            d.on("shown", function() {
                l.find("input[type\x3dtext]").focus();
                l.on("submit", function(a) {
                    a.preventDefault();
                    d.find(".btn-primary").click()
                })
            });
            d.modal("show");
            return d
        },
        dialog: function(b, a, c) {
            function e(a) {
                a = 
                null ;
                "function" === typeof c.onEscape && (a = c.onEscape());
                !1 !== a && f.modal("hide")
            }
            var g = ""
              , l = [];
            c || (c = {});
            "undefined" === typeof a ? a = [] : "undefined" == typeof a.length && (a = [a]);
            for (var d = a.length; d--; ) {
                var h = null 
                  , k = null 
                  , q = null 
                  , m = ""
                  , p = null ;
                if ("undefined" == typeof a[d].label && "undefined" == typeof a[d]["class"] && "undefined" == typeof a[d].callback) {
                    var h = 0, k = null , n;
                    for (n in a[d])
                        if (k = n,
                        1 < ++h)
                            break;
                    1 == h && "function" == typeof a[d][n] && (a[d].label = k,
                    a[d].callback = a[d][n])
                }
                "function" == typeof a[d].callback && (p = a[d].callback);
                a[d]["class"] ? q = a[d]["class"] : 0 == d && 2 >= a.length && (q = "btn-primary");
                !0 !== a[d].link && (q = "btn btn-sm " + q);
                h = a[d].label ? a[d].label : "Option " + (d + 1);
                a[d].icon && (m = "\x3ci class\x3d'" + a[d].icon + "'\x3e\x3c/i\x3e ");
                a[d].href ? (k = a[d].href,
                g = "\x3ca data-handler\x3d'" + d + "' class\x3d'" + q + "' href\x3d'" + k + "'\x3e" + m + "" + h + "\x3c/a\x3e" + g) : g = "\x3ca data-handler\x3d'" + d + "' class\x3d'" + q + "'\x3e" + m + "" + h + "\x3c/a\x3e" + g;
                l[d] = p
            }
            d = ["\x3cdiv class\x3d'bootbox modal' tabindex\x3d'-1' style\x3d'overflow:hidden;'\x3e\x3cdiv class\x3d'modal-dialog'\x3e\x3cdiv class\x3d'modal-content'\x3e"];
            if (c.header) {
                q = "";
                if ("undefined" == typeof c.headerCloseButton || c.headerCloseButton)
                    q = "\x3ca href\x3d'javascript:;' class\x3d'close'\x3e\x26times;\x3c/a\x3e";
                d.push("\x3cdiv class\x3d'modal-header'\x3e" + q + "\x3ch5 class\x3d'modal-title'\x3e" + c.header + "\x3c/h5\x3e\x3c/div\x3e")
            }
            d.push("\x3cdiv class\x3d'modal-body'\x3e\x3c/div\x3e");
            g && d.push("\x3cdiv class\x3d'modal-footer'\x3e" + g + "\x3c/div\x3e");
            d.push("\x3c/div\x3e\x3c/div\x3e\x3c/div\x3e");
            var f = r(d.join("\n"));
            ("undefined" === typeof c.animate ? u : c.animate) && 
            f.addClass("fade");
            (g = "undefined" === typeof c.classes ? v : c.classes) && f.addClass(g);
            f.find(".modal-body").html(b);
            f.on("keyup.dismiss.modal", function(a) {
                27 === a.which && c.onEscape && e("escape")
            });
            f.on("click", "a.close", function(a) {
                a.preventDefault();
                e("close")
            });
            f.on("shown", function() {
                f.find("a.btn-primary:first").focus()
            });
            f.on("hidden.bs.modal", function(a) {
                a.target === this && f.remove()
            });
            f.off("keyup").on("keyup", function(a) {
                27 == a.which && f.modal("hide")
            });
            f.on("click", ".modal-footer a", function(b) {
                var c = 
                r(this).data("handler")
                  , d = l[c]
                  , e = null ;
                if ("undefined" === typeof c || "undefined" === typeof a[c].href)
                    b.preventDefault(),
                    "function" === typeof d && (e = d(b)),
                    !1 !== e && f.modal("hide")
            });
            r("body").append(f);
            f.modal({
                backdrop: "undefined" === typeof c.backdrop ? s : c.backdrop,
                keyboard: !1,
                show: !1
            });
            f.on("show", function(a) {
                r(w).off("focusin.modal")
            });
            "undefined" !== typeof c.show && !0 !== c.show || f.modal("show");
            return f
        },
        modal: function() {
            var b, a, c, e = {
                onEscape: null ,
                keyboard: !0,
                backdrop: s
            };
            switch (arguments.length) {
            case 1:
                b = arguments[0];
                break;
            case 2:
                b = arguments[0];
                "object" == typeof arguments[1] ? c = arguments[1] : a = arguments[1];
                break;
            case 3:
                b = arguments[0];
                a = arguments[1];
                c = arguments[2];
                break;
            default:
                throw Error("Incorrect number of arguments: expected 1-3");
            }
            e.header = a;
            c = "object" == typeof c ? r.extend(e, c) : e;
            return n.dialog(b, [], c)
        },
        hideAll: function() {
            r(".bootbox").modal("hide")
        },
        animate: function(b) {
            u = b
        },
        backdrop: function(b) {
            s = b
        },
        classes: function(b) {
            v = b
        }
    }
      , p = {
        en: {
            OK: "OK",
            CANCEL: "Cancel",
            CONFIRM: "OK"
        },
        zh_CN: {
            OK: "OK",
            CANCEL: "\u53d6\u6d88",
            CONFIRM: "\u786e\u8ba4"
        },
        zh_TW: {
            OK: "OK",
            CANCEL: "\u53d6\u6d88",
            CONFIRM: "\u78ba\u8a8d"
        }
    };
    return n
}(document, window.jQuery);
(function(p, h) {
    "object" === typeof exports ? h(exports) : "function" === typeof define && define.amd ? define(["exports"], h) : h(p)
})(this, function(p) {
    function h(a) {
        this._targetElement = a;
        this._options = {
            nextLabel: "\u4e0b\u4e00\u6b65 ",
            prevLabel: "\u4e0a\u4e00\u6b65",
            skipLabel: "\u4e0d\u63d0\u793a",
            doneLabel: "\u5b8c\u6210",
            tooltipPosition: "bottom",
            tooltipClass: "",
            exitOnEsc: !0,
            exitOnOverlayClick: !1,
            showStepNumbers: !0
        }
    }
    function x(a) {
        var b = []
          , c = this;
        if (this._options.steps)
            for (var e = [], g = 0, e = this._options.steps.length; g < 
            e; g++) {
                var h = this._options.steps[g];
                h.step = g + 1;
                "string" === typeof h.element && (h.element = document.querySelector(h.element));
                b.push(h)
            }
        else {
            e = a.querySelectorAll("*[data-intro]");
            if (1 > e.length)
                return !1;
            g = 0;
            for (h = e.length; g < h; g++) {
                var l = e[g];
                b.push({
                    element: l,
                    intro: l.getAttribute("data-intro"),
                    step: parseInt(l.getAttribute("data-step"), 10),
                    tooltipClass: l.getAttribute("data-tooltipClass"),
                    position: l.getAttribute("data-position") || this._options.tooltipPosition
                })
            }
        }
        b.sort(function(a, b) {
            return a.step - b.step
        });
        c._introItems = b;
        y.call(c, a) && (q.call(c),
        a.querySelector(".introjs-skipbutton"),
        a.querySelector(".introjs-nextbutton"),
        c._onKeyDown = function(b) {
            if (27 === b.keyCode && 1 == c._options.exitOnEsc)
                r.call(c, a),
                void 0 != c._introExitCallback && c._introExitCallback.call(c);
            else if (37 === b.keyCode)
                t.call(c);
            else if (39 === b.keyCode || 13 === b.keyCode)
                q.call(c),
                b.preventDefault ? b.preventDefault() : b.returnValue = !1
        }
        ,
        c._onResize = function(a) {
            s.call(c, document.querySelector(".introjs-helperLayer"))
        }
        ,
        window.addEventListener ? (window.addEventListener("keydown", 
        c._onKeyDown, !0),
        window.addEventListener("resize", c._onResize, !0)) : document.attachEvent && (document.attachEvent("onkeydown", c._onKeyDown),
        document.attachEvent("onresize", c._onResize)));
        return !1
    }
    function q() {
        "undefined" === typeof this._currentStep ? this._currentStep = 0 : ++this._currentStep;
        if (this._introItems.length <= this._currentStep)
            "function" === typeof this._introCompleteCallback && this._introCompleteCallback.call(this),
            r.call(this, this._targetElement);
        else {
            var a = this._introItems[this._currentStep];
            "undefined" !== 
            typeof this._introBeforeChangeCallback && this._introBeforeChangeCallback.call(this, a.element);
            u.call(this, a)
        }
    }
    function t() {
        if (0 === this._currentStep)
            return !1;
        var a = this._introItems[--this._currentStep];
        "undefined" !== typeof this._introBeforeChangeCallback && this._introBeforeChangeCallback.call(this, a.element);
        u.call(this, a)
    }
    function r(a) {
        var b = a.querySelector(".introjs-overlay");
        b.style.opacity = 0;
        setTimeout(function() {
            b.parentNode && b.parentNode.removeChild(b)
        }, 500);
        (a = a.querySelector(".introjs-helperLayer")) && 
        a.parentNode.removeChild(a);
        if (a = document.querySelector(".introjs-showElement"))
            a.className = a.className.replace(/introjs-[a-zA-Z]+/g, "").replace(/^\s+|\s+$/g, "");
        if ((a = document.querySelectorAll(".introjs-fixParent")) && 0 < a.length)
            for (var c = a.length - 1; 0 <= c; c--)
                a[c].className = a[c].className.replace(/introjs-fixParent/g, "").replace(/^\s+|\s+$/g, "");
        window.removeEventListener ? window.removeEventListener("keydown", this._onKeyDown, !0) : document.detachEvent && document.detachEvent("onkeydown", this._onKeyDown);
        this._currentStep = void 0
    }
    function v(a, b, c) {
        b.style.top = null ;
        b.style.right = null ;
        b.style.bottom = null ;
        b.style.left = null ;
        b.style.quickBuild = null ;
        b.style.message = null ;
        b.style.systemSetup = null ;
        b.style.userPanel = null ;
        if (this._introItems[this._currentStep]) {
            var e = ""
              , e = this._introItems[this._currentStep]
              , e = "string" === typeof e.tooltipClass ? e.tooltipClass : this._options.tooltipClass;
            b.className = ("introjs-tooltip " + e).replace(/^\s+|\s+$/g, "");
            switch (this._introItems[this._currentStep].position) {
            case "top":
                b.style.left = 
                "15px";
                b.style.top = "-" + (g(b).height + 10) + "px";
                c.className = "introjs-arrow bottom";
                break;
            case "right":
                b.style.left = g(a).width + 20 + "px";
                c.className = "introjs-arrow left";
                break;
            case "left":
                b.style.top = "15px";
                b.style.right = g(a).width + 20 + "px";
                c.className = "introjs-arrow right";
                break;
            case "quickBuild":
                b.style.top = "38px";
                b.style.right = g(a).width + 74 + "px";
                c.className = "introjs-arrow right";
                break;
            case "message":
                b.style.top = "36px";
                b.style.right = g(a).width + 143 + "px";
                c.className = "introjs-arrow right";
                break;
            case "systemSetup":
                b.style.top = 
                "35px";
                b.style.right = g(a).width + 105 + "px";
                c.className = "introjs-arrow right";
                break;
            case "userPanel":
                b.style.top = "25px";
                b.style.left = g(a).width + 14 + "px";
                c.className = "introjs-arrow left";
                break;
            default:
                b.style.bottom = "-" + (g(b).height + 10) + "px",
                c.className = "introjs-arrow top"
            }
        }
    }
    function s(a) {
        if (a && this._introItems[this._currentStep]) {
            var b = g(this._introItems[this._currentStep].element);
            a.setAttribute("style", "width: " + (b.width + 10) + "px; height:" + (b.height + 10) + "px; top:" + (b.top - 5) + "px;left: " + (b.left - 5) + "px;")
        }
    }
    function u(a) {
        "undefined" !== typeof this._introChangeCallback && this._introChangeCallback.call(this, a.element);
        var b = this
          , c = document.querySelector(".introjs-helperLayer");
        g(a.element);
        if (null  != c) {
            var e = c.querySelector(".introjs-helperNumberLayer")
              , h = c.querySelector(".introjs-tooltiptext")
              , p = c.querySelector(".introjs-arrow")
              , l = c.querySelector(".introjs-tooltip")
              , d = c.querySelector(".introjs-skipbutton")
              , f = c.querySelector(".introjs-prevbutton")
              , m = c.querySelector(".introjs-nextbutton");
            l.style.opacity = 
            0;
            s.call(b, c);
            if ((c = document.querySelectorAll(".introjs-fixParent")) && 0 < c.length)
                for (var k = c.length - 1; 0 <= k; k--)
                    c[k].className = c[k].className.replace(/introjs-fixParent/g, "").replace(/^\s+|\s+$/g, "");
            c = document.querySelector(".introjs-showElement");
            c.className = c.className.replace(/introjs-[a-zA-Z]+/g, "").replace(/^\s+|\s+$/g, "");
            b._lastShowElementTimer && clearTimeout(b._lastShowElementTimer);
            b._lastShowElementTimer = setTimeout(function() {
                null  != e && (e.innerHTML = a.step);
                h.innerHTML = a.intro;
                v.call(b, a.element, 
                l, p);
                l.style.opacity = 1
            }, 350)
        } else {
            d = document.createElement("div");
            c = document.createElement("div");
            k = document.createElement("div");
            d.className = "introjs-helperLayer";
            s.call(b, d);
            this._targetElement.appendChild(d);
            c.className = "introjs-arrow";
            k.innerHTML = '\x3cdiv class\x3d"introjs-tooltiptext"\x3e' + a.intro + '\x3c/div\x3e\x3cdiv class\x3d"introjs-tooltipbuttons"\x3e\x3c/div\x3e';
            this._options.showStepNumbers && (f = document.createElement("span"),
            f.className = "introjs-helperNumberLayer",
            f.innerHTML = a.step,
            d.appendChild(f));
            k.appendChild(c);
            d.appendChild(k);
            m = document.createElement("a");
            m.onclick = function() {
                b._introItems.length - 1 != b._currentStep && q.call(b)
            }
            ;
            m.href = "javascript:void(0);";
            m.innerHTML = this._options.nextLabel;
            f = document.createElement("a");
            f.onclick = function() {
                0 != b._currentStep && t.call(b)
            }
            ;
            f.href = "javascript:void(0);";
            f.innerHTML = this._options.prevLabel;
            d = document.createElement("a");
            d.className = "btn btn-sm introjs-button introjs-skipbutton";
            d.href = "javascript:void(0);";
            d.innerHTML = this._options.skipLabel;
            d.onclick = function() {
                b._introItems.length - 1 == b._currentStep && "function" === typeof b._introCompleteCallback && b._introCompleteCallback.call(b);
                b._introItems.length - 1 != b._currentStep && "function" === typeof b._introExitCallback && b._introExitCallback.call(b);
                r.call(b, b._targetElement)
            }
            ;
            var n = k.querySelector(".introjs-tooltipbuttons");
            n.appendChild(d);
            1 < this._introItems.length && (n.appendChild(f),
            n.appendChild(m));
            v.call(b, a.element, k, c)
        }
        0 == this._currentStep ? (f.className = "btn btn-sm introjs-button introjs-prevbutton introjs-disabled",
        m.className = "btn btn-sm btn-success introjs-button introjs-nextbutton",
        d.className = "btn btn-sm introjs-button introjs-skipbutton",
        d.innerHTML = this._options.skipLabel,
        $(".introjs-skipbutton").after($(".introjs-prevbutton"))) : this._introItems.length - 1 == this._currentStep ? (d.innerHTML = this._options.doneLabel,
        f.className = "btn btn-sm introjs-button introjs-prevbutton",
        m.className = "btn btn-sm btn-success introjs-button introjs-nextbutton introjs-disabled",
        d.className = " btn-success btn-done " + d.className,
        $(".introjs-prevbutton").after($(".introjs-skipbutton"))) : (f.className = "btn btn-sm introjs-button introjs-prevbutton",
        m.className = "btn btn-sm btn-success introjs-button introjs-nextbutton",
        d.className = "btn btn-sm introjs-button introjs-skipbutton",
        d.innerHTML = this._options.skipLabel,
        $(".introjs-skipbutton").after($(".introjs-prevbutton")));
        m.focus();
        a.element.className += " introjs-showElement";
        d = w(a.element, "position");
        "absolute" !== d && "relative" !== d && (a.element.className += " introjs-relativePosition");
        for (d = a.element.parentNode; null  != d && "body" !== d.tagName.toLowerCase(); )
            f = w(d, "z-index"),
            /[0-9]+/.test(f) && (d.className += " introjs-fixParent"),
            d = d.parentNode;
        z(a.element) || (f = a.element.getBoundingClientRect(),
        d = f.bottom - (f.bottom - f.top),
        f = f.bottom - A().height,
        0 > d ? window.scrollBy(0, d - 30) : window.scrollBy(0, f + 100))
    }
    function w(a, b) {
        var c = "";
        a.currentStyle ? c = a.currentStyle[b] : document.defaultView && document.defaultView.getComputedStyle && (c = document.defaultView.getComputedStyle(a, null ).getPropertyValue(b));
        return c && c.toLowerCase ? c.toLowerCase() : c
    }
    function A() {
        if (void 0 != window.innerWidth)
            return {
                width: window.innerWidth,
                height: window.innerHeight
            };
        var a = document.documentElement;
        return {
            width: a.clientWidth,
            height: a.clientHeight
        }
    }
    function z(a) {
        a = a.getBoundingClientRect();
        return 0 <= a.top && 0 <= a.left && a.bottom + 80 <= window.innerHeight && a.right <= window.innerWidth
    }
    function y(a) {
        var b = document.createElement("div")
          , c = "";
        b.className = "introjs-overlay";
        if ("body" === a.tagName.toLowerCase())
            c += "top: 0;bottom: 0; left: 0;right: 0;position: fixed;",
            b.setAttribute("style", c);
        else {
            var e = g(a);
            e && (c += "width: " + e.width + "px; height:" + e.height + "px; top:" + e.top + "px;left: " + e.left + "px;",
            b.setAttribute("style", c))
        }
        a.appendChild(b);
        setTimeout(function() {
            c += "opacity: .8;";
            b.setAttribute("style", c)
        }, 10);
        return !0
    }
    function g(a) {
        var b = {};
        b.width = a.offsetWidth;
        b.height = a.offsetHeight;
        for (var c = 0, e = 0; a && !isNaN(a.offsetLeft) && !isNaN(a.offsetTop); )
            c += a.offsetLeft,
            e += a.offsetTop,
            a = a.offsetParent;
        b.top = e;
        b.left = c;
        return b
    }
    var n = function(a) {
        if ("object" === typeof a)
            return new h(a);
        if ("string" === typeof a) {
            if (a = document.querySelector(a))
                return new h(a);
            throw Error("There is no element with given selector.");
        }
        return new h(document.body)
    }
    ;
    n.version = "0.5.0";
    n.fn = h.prototype = {
        clone: function() {
            return new h(this)
        },
        setOption: function(a, b) {
            this._options[a] = b;
            return this
        },
        setOptions: function(a) {
            var b = this._options, c = {}, e;
            for (e in b)
                c[e] = b[e];
            for (e in a)
                c[e] = a[e];
            this._options = c;
            return this
        },
        start: function() {
            x.call(this, this._targetElement);
            return this
        },
        goToStep: function(a) {
            this._currentStep = 
            a - 2;
            "undefined" !== typeof this._introItems && q.call(this);
            return this
        },
        exit: function() {
            r.call(this, this._targetElement)
        },
        refresh: function() {
            s.call(this, document.querySelector(".introjs-helperLayer"));
            return this
        },
        onbeforechange: function(a) {
            if ("function" === typeof a)
                this._introBeforeChangeCallback = a;
            else
                throw Error("Provided callback for onbeforechange was not a function");
            return this
        },
        onchange: function(a) {
            if ("function" === typeof a)
                this._introChangeCallback = a;
            else
                throw Error("Provided callback for onchange was not a function.");
            return this
        },
        oncomplete: function(a) {
            if ("function" === typeof a)
                this._introCompleteCallback = a;
            else
                throw Error("Provided callback for oncomplete was not a function.");
            return this
        },
        onexit: function(a) {
            if ("function" === typeof a)
                this._introExitCallback = a;
            else
                throw Error("Provided callback for onexit was not a function.");
            return this
        }
    };
    return p.introJs = n
});
(function(n) {
    function p() {
        this.returnValue = !1
    }
    function g() {
        this.cancelBubble = !0
    }
    var y = 0, D = [], E = {}, t = {}, k = {
        "\x3c": "lt",
        "\x3e": "gt",
        "\x26": "amp",
        '"': "quot",
        "'": "#39"
    }, G = /[<>&\"\']/g, B = window.setTimeout, s = {}, l;
    (function(a) {
        a = a.split(/,/);
        var e, f, c;
        for (e = 0; e < a.length; e += 2)
            for (c = a[e + 1].split(/ /),
            f = 0; f < c.length; f++)
                t[c[f]] = a[e]
    })("application/msword,doc dot,application/pdf,pdf,application/pgp-signature,pgp,application/postscript,ps ai eps,application/rtf,rtf,application/vnd.ms-excel,xls xlb,application/vnd.ms-powerpoint,ppt pps pot,application/zip,zip,application/x-shockwave-flash,swf swfl,application/vnd.openxmlformats-officedocument.wordprocessingml.document,docx,application/vnd.openxmlformats-officedocument.wordprocessingml.template,dotx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,xlsx,application/vnd.openxmlformats-officedocument.presentationml.presentation,pptx,application/vnd.openxmlformats-officedocument.presentationml.template,potx,application/vnd.openxmlformats-officedocument.presentationml.slideshow,ppsx,application/x-javascript,js,application/json,json,audio/mpeg,mpga mpega mp2 mp3,audio/x-wav,wav,audio/mp4,m4a,image/bmp,bmp,image/gif,gif,image/jpeg,jpeg jpg jpe,image/photoshop,psd,image/png,png,image/svg+xml,svg svgz,image/tiff,tiff tif,text/plain,asc txt text diff log,text/html,htm html xhtml,text/css,css,text/csv,csv,text/rtf,rtf,video/mpeg,mpeg mpg mpe m2v,video/quicktime,qt mov,video/mp4,mp4,video/x-m4v,m4v,video/x-flv,flv,video/x-ms-wmv,wmv,video/avi,avi,video/webm,webm,video/3gpp,3gp,video/3gpp2,3g2,video/vnd.rn-realvideo,rv,application/vnd.oasis.opendocument.formula-template,otf,application/octet-stream,exe");
    var h = {
        VERSION: "1.5.7",
        STOPPED: 1,
        STARTED: 2,
        QUEUED: 1,
        UPLOADING: 2,
        FAILED: 4,
        DONE: 5,
        GENERIC_ERROR: -100,
        HTTP_ERROR: -200,
        IO_ERROR: -300,
        SECURITY_ERROR: -400,
        INIT_ERROR: -500,
        FILE_SIZE_ERROR: -600,
        FILE_EXTENSION_ERROR: -601,
        IMAGE_FORMAT_ERROR: -700,
        IMAGE_MEMORY_ERROR: -701,
        IMAGE_DIMENSIONS_ERROR: -702,
        mimeTypes: t,
        ua: function() {
            var a = navigator, e = a.userAgent, f = a.vendor, c, b;
            b = (c = /WebKit/.test(e)) && -1 !== f.indexOf("Apple");
            f = window.opera && window.opera.buildNumber;
            return {
                windows: -1 !== navigator.platform.indexOf("Win"),
                android: /Android/.test(e),
                ie: !c && !f && /MSIE/gi.test(e) && /Explorer/gi.test(a.appName),
                webkit: c,
                gecko: !c && /Gecko/.test(e),
                safari: b,
                opera: !!f
            }
        }(),
        typeOf: function(a) {
            return {}.toString.call(a).match(/\s([a-z|A-Z]+)/)[1].toLowerCase()
        },
        extend: function(a) {
            h.each(arguments, function(e, f) {
                0 < f && h.each(e, function(c, b) {
                    a[b] = c
                })
            });
            return a
        },
        cleanName: function(a) {
            var e, f;
            f = [/[\300-\306]/g, "A", /[\340-\346]/g, "a", /\307/g, "C", /\347/g, "c", /[\310-\313]/g, "E", /[\350-\353]/g, "e", /[\314-\317]/g, "I", /[\354-\357]/g, "i", /\321/g, 
            "N", /\361/g, "n", /[\322-\330]/g, "O", /[\362-\370]/g, "o", /[\331-\334]/g, "U", /[\371-\374]/g, "u"];
            for (e = 0; e < f.length; e += 2)
                a = a.replace(f[e], f[e + 1]);
            a = a.replace(/\s+/g, "_");
            return a = a.replace(/[^a-z0-9_\-\.]+/gi, "")
        },
        addRuntime: function(a, e) {
            e.name = a;
            D[a] = e;
            D.push(e);
            return e
        },
        guid: function() {
            var a = (new Date).getTime().toString(32), e;
            for (e = 0; 5 > e; e++)
                a += Math.floor(65535 * Math.random()).toString(32);
            return (h.guidPrefix || "p") + a + (y++).toString(32)
        },
        buildUrl: function(a, e) {
            var f = "";
            h.each(e, function(a, b) {
                f += (f ? 
                "\x26" : "") + encodeURIComponent(b) + "\x3d" + encodeURIComponent(a)
            });
            f && (a += (0 < a.indexOf("?") ? "\x26" : "?") + f);
            return a
        },
        each: function(a, e) {
            var f, c;
            if (a)
                if (f = a.length,
                void 0 === f)
                    for (c in a) {
                        if (a.hasOwnProperty(c) && !1 === e(a[c], c))
                            break
                    }
                else
                    for (c = 0; c < f && !1 !== e(a[c], c); c++)
                        ;
        },
        formatSize: function(a) {
            return void 0 === a || /\D/.test(a) ? h.translate("N/A") : 1073741824 < a ? Math.round(a / 1073741824, 1) + " GB" : 1048576 < a ? Math.round(a / 1048576, 1) + " MB" : 1024 < a ? Math.round(a / 1024, 1) + " KB" : a + " b"
        },
        getPos: function(a, e) {
            function f(b) {
                var a, 
                d = 0;
                a = 0;
                b && (a = b.getBoundingClientRect(),
                b = "CSS1Compat" === q.compatMode ? q.documentElement : q.body,
                d = a.left + b.scrollLeft,
                a = a.top + b.scrollTop);
                return {
                    x: d,
                    y: a
                }
            }
            var c = 0, b = 0, d, q = document;
            e = e || q.body;
            if (a && a.getBoundingClientRect && h.ua.ie && (!q.documentMode || 8 > q.documentMode))
                return c = f(a),
                b = f(e),
                {
                    x: c.x - b.x,
                    y: c.y - b.y
                };
            for (d = a; d && d != e && d.nodeType; )
                c += d.offsetLeft || 0,
                b += d.offsetTop || 0,
                d = d.offsetParent;
            for (d = a.parentNode; d && d != e && d.nodeType; )
                c -= d.scrollLeft || 0,
                b -= d.scrollTop || 0,
                d = d.parentNode;
            return {
                x: c,
                y: b
            }
        },
        getSize: function(a) {
            return {
                w: a.offsetWidth || a.clientWidth,
                h: a.offsetHeight || a.clientHeight
            }
        },
        parseSize: function(a) {
            var e;
            "string" == typeof a && (a = /^([0-9]+)([mgk]?)$/.exec(a.toLowerCase().replace(/[^0-9mkg]/g, "")),
            e = a[2],
            a = +a[1],
            "g" == e && (a *= 1073741824),
            "m" == e && (a *= 1048576),
            "k" == e && (a *= 1024));
            return a
        },
        xmlEncode: function(a) {
            return a ? ("" + a).replace(G, function(a) {
                return k[a] ? "\x26" + k[a] + ";" : a
            }) : a
        },
        toArray: function(a) {
            var e, f = [];
            for (e = 0; e < a.length; e++)
                f[e] = a[e];
            return f
        },
        inArray: function(a, e) {
            if (e) {
                if (Array.prototype.indexOf)
                    return Array.prototype.indexOf.call(e, 
                    a);
                for (var f = 0, c = e.length; f < c; f++)
                    if (e[f] === a)
                        return f
            }
            return -1
        },
        addI18n: function(a) {
            return h.extend(E, a)
        },
        translate: function(a) {
            return E[a] || a
        },
        isEmptyObj: function(a) {
            if (void 0 === a)
                return !0;
            for (var e in a)
                return !1;
            return !0
        },
        hasClass: function(a, e) {
            return "" == a.className ? !1 : (new RegExp("(^|\\s+)" + e + "(\\s+|$)")).test(a.className)
        },
        addClass: function(a, e) {
            h.hasClass(a, e) || (a.className = "" == a.className ? e : a.className.replace(/\s+$/, "") + " " + e)
        },
        removeClass: function(a, e) {
            a.className = a.className.replace(new RegExp("(^|\\s+)" + 
            e + "(\\s+|$)"), function(a, c, b) {
                return " " === c && " " === b ? " " : ""
            })
        },
        getStyle: function(a, e) {
            if (a.currentStyle)
                return a.currentStyle[e];
            if (window.getComputedStyle)
                return window.getComputedStyle(a, null )[e]
        },
        addEvent: function(a, e, f, c) {
            var b;
            e = e.toLowerCase();
            void 0 === l && (l = "Plupload_" + h.guid());
            a.addEventListener ? (b = f,
            a.addEventListener(e, b, !1)) : a.attachEvent && (b = function() {
                var b = window.event;
                b.target || (b.target = b.srcElement);
                b.preventDefault = p;
                b.stopPropagation = g;
                f(b)
            }
            ,
            a.attachEvent("on" + e, b));
            void 0 === a[l] && 
            (a[l] = h.guid());
            s.hasOwnProperty(a[l]) || (s[a[l]] = {});
            a = s[a[l]];
            a.hasOwnProperty(e) || (a[e] = []);
            a[e].push({
                func: b,
                orig: f,
                key: c
            })
        },
        removeEvent: function(a, e, f) {
            var c, b;
            "function" == typeof f ? c = f : b = f;
            e = e.toLowerCase();
            if (a[l] && s[a[l]] && s[a[l]][e]) {
                f = s[a[l]][e];
                for (var d = f.length - 1; 0 <= d; d--)
                    if (f[d].key === b || f[d].orig === c)
                        if (a.removeEventListener ? a.removeEventListener(e, f[d].func, !1) : a.detachEvent && a.detachEvent("on" + e, f[d].func),
                        f[d].orig = null ,
                        f[d].func = null ,
                        f.splice(d, 1),
                        void 0 !== c)
                            break;
                f.length || delete s[a[l]][e];
                if (h.isEmptyObj(s[a[l]])) {
                    delete s[a[l]];
                    try {
                        delete a[l]
                    } catch (q) {
                        a[l] = void 0
                    }
                }
            }
        },
        removeAllEvents: function(a, e) {
            void 0 !== a[l] && a[l] && h.each(s[a[l]], function(f, c) {
                h.removeEvent(a, c, e)
            })
        },
        Uploader: function(a) {
            function e() {
                var b, a = 0, c;
                if (this.state == h.STARTED) {
                    for (c = 0; c < d.length; c++)
                        b || d[c].status != h.QUEUED ? a++ : (b = d[c],
                        b.status = h.UPLOADING,
                        this.trigger("BeforeUpload", b) && this.trigger("UploadFile", b));
                    a == d.length && (this.stop(),
                    this.trigger("UploadComplete", d))
                }
            }
            function f() {
                var a, c;
                b.reset();
                for (a = 0; a < 
                d.length; a++)
                    c = d[a],
                    void 0 !== c.size ? (b.size += c.size,
                    b.loaded += c.loaded) : b.size = void 0,
                    c.status == h.DONE ? b.uploaded++ : c.status == h.FAILED ? b.failed++ : b.queued++;
                void 0 === b.size ? b.percent = 0 < d.length ? Math.ceil(b.uploaded / d.length * 100) : 0 : (b.bytesPerSec = Math.ceil(b.loaded / ((+new Date - q || 1) / 1E3)),
                b.percent = 0 < b.size ? Math.ceil(b.loaded / b.size * 100) : 0)
            }
            var c = {}, b, d = [], q, g = !1;
            b = new h.QueueProgress;
            a = h.extend({
                chunk_size: 0,
                multipart: !0,
                multi_selection: !0,
                file_data_name: "file",
                filters: []
            }, a);
            h.extend(this, {
                state: h.STOPPED,
                runtime: "",
                features: {},
                files: d,
                settings: a,
                total: b,
                id: h.guid(),
                init: function() {
                    function b() {
                        var a = u[k++], d, e, f;
                        if (a) {
                            d = a.getFeatures();
                            if (e = c.settings.required_features)
                                for (e = e.split(","),
                                f = 0; f < e.length; f++)
                                    if (!d[e[f]]) {
                                        b();
                                        return
                                    }
                            a.init(c, function(e) {
                                e && e.success ? (c.features = d,
                                c.runtime = a.name,
                                c.trigger("Init", {
                                    runtime: a.name
                                }),
                                c.trigger("PostInit"),
                                c.refresh()) : b()
                            })
                        } else
                            c.trigger("Error", {
                                code: h.INIT_ERROR,
                                message: h.translate("Init error.")
                            })
                    }
                    var c = this, g, u, k = 0, l;
                    "function" == typeof a.preinit ? a.preinit(c) : 
                    h.each(a.preinit, function(b, a) {
                        c.bind(a, b)
                    });
                    a.page_url = a.page_url || document.location.pathname.replace(/\/[^\/]+$/g, "/");
                    /^(\w+:\/\/|\/)/.test(a.url) || (a.url = a.page_url + a.url);
                    a.chunk_size = h.parseSize(a.chunk_size);
                    a.max_file_size = h.parseSize(a.max_file_size);
                    c.bind("FilesAdded", function(b, e) {
                        var f, g, C = 0, q;
                        (f = a.filters) && f.length && (q = [],
                        h.each(f, function(b) {
                            h.each(b.extensions.split(/,/), function(b) {
                                /^\s*\*\s*$/.test(b) ? q.push("\\.*") : q.push("\\." + b.replace(new RegExp("[" + "/^$.*+?|()[]{}\\".replace(/./g, 
                                "\\$\x26") + "]","g"), "\\$\x26"))
                            })
                        }),
                        q = new RegExp(q.join("|") + "$","i"));
                        for (f = 0; f < e.length; f++)
                            g = e[f],
                            g.loaded = 0,
                            g.percent = 0,
                            g.status = h.QUEUED,
                            q && !q.test(g.name) ? b.trigger("Error", {
                                code: h.FILE_EXTENSION_ERROR,
                                message: h.translate("File extension error."),
                                file: g
                            }) : void 0 !== g.size && g.size > a.max_file_size ? b.trigger("Error", {
                                code: h.FILE_SIZE_ERROR,
                                message: h.translate("File size error."),
                                file: g
                            }) : (d.push(g),
                            C++);
                        if (C)
                            B(function() {
                                c.trigger("QueueChanged");
                                c.refresh()
                            }, 1);
                        else
                            return !1
                    });
                    a.unique_names && 
                    c.bind("UploadFile", function(b, a) {
                        var c = a.name.match(/\.([^.]+)$/)
                          , d = "tmp";
                        c && (d = c[1]);
                        a.target_name = a.id + "." + d
                    });
                    c.bind("UploadProgress", function(b, a) {
                        a.percent = 0 < a.size ? Math.ceil(a.loaded / a.size * 100) : 100;
                        f()
                    });
                    c.bind("StateChanged", function(b) {
                        if (b.state == h.STARTED)
                            q = +new Date;
                        else if (b.state == h.STOPPED)
                            for (g = b.files.length - 1; 0 <= g; g--)
                                b.files[g].status == h.UPLOADING && (b.files[g].status = h.QUEUED,
                                f())
                    });
                    c.bind("QueueChanged", f);
                    c.bind("Error", function(b, a) {
                        a.file && (a.file.status = h.FAILED,
                        f(),
                        b.state == 
                        h.STARTED && B(function() {
                            e.call(c)
                        }, 1))
                    });
                    c.bind("FileUploaded", function(b, a) {
                        a.status = h.DONE;
                        a.loaded = a.size;
                        b.trigger("UploadProgress", a);
                        B(function() {
                            e.call(c)
                        }, 1)
                    });
                    if (a.runtimes)
                        for (u = [],
                        l = a.runtimes.split(/\s?,\s?/),
                        g = 0; g < l.length; g++)
                            D[l[g]] && u.push(D[l[g]]);
                    else
                        u = D;
                    b();
                    "function" == typeof a.init ? a.init(c) : h.each(a.init, function(b, a) {
                        c.bind(a, b)
                    })
                },
                refresh: function() {
                    this.trigger("Refresh")
                },
                start: function() {
                    d.length && this.state != h.STARTED && (this.state = h.STARTED,
                    this.trigger("StateChanged"),
                    e.call(this))
                },
                stop: function() {
                    this.state != h.STOPPED && (this.state = h.STOPPED,
                    this.trigger("CancelUpload"),
                    this.trigger("StateChanged"))
                },
                disableBrowse: function(b) {
                    g = void 0 !== b ? b : !0;
                    this.trigger("DisableBrowse", g)
                },
                getFile: function(b) {
                    var a;
                    for (a = d.length - 1; 0 <= a; a--)
                        if (d[a].id === b)
                            return d[a]
                },
                removeFile: function(b) {
                    var a;
                    for (a = d.length - 1; 0 <= a; a--)
                        if (d[a].id === b.id)
                            return this.splice(a, 1)[0]
                },
                splice: function(b, a) {
                    var c;
                    c = d.splice(void 0 === b ? 0 : b, void 0 === a ? d.length : a);
                    this.trigger("FilesRemoved", c);
                    this.trigger("QueueChanged");
                    return c
                },
                trigger: function(b) {
                    var a = c[b.toLowerCase()], d, e;
                    if (a)
                        for (e = Array.prototype.slice.call(arguments),
                        e[0] = this,
                        d = 0; d < a.length; d++)
                            if (!1 === a[d].func.apply(a[d].scope, e))
                                return !1;
                    return !0
                },
                hasEventListener: function(a) {
                    return !!c[a.toLowerCase()]
                },
                bind: function(a, b, d) {
                    var e;
                    a = a.toLowerCase();
                    e = c[a] || [];
                    e.push({
                        func: b,
                        scope: d || this
                    });
                    c[a] = e
                },
                unbind: function(a, b) {
                    a = a.toLowerCase();
                    var d = c[a], e;
                    if (d) {
                        if (void 0 !== b)
                            for (e = d.length - 1; 0 <= e; e--) {
                                if (d[e].func === b) {
                                    d.splice(e, 
                                    1);
                                    break
                                }
                            }
                        else
                            d = [];
                        d.length || delete c[a]
                    }
                },
                unbindAll: function() {
                    var a = this;
                    h.each(c, function(b, c) {
                        a.unbind(c)
                    })
                },
                destroy: function() {
                    this.stop();
                    this.trigger("Destroy");
                    this.unbindAll()
                }
            })
        },
        File: function(a, e, f) {
            this.id = a;
            this.name = e;
            this.size = f;
            this.status = this.percent = this.loaded = 0
        },
        Runtime: function() {
            this.getFeatures = function() {}
            ;
            this.init = function(a, e) {}
        },
        QueueProgress: function() {
            var a = this;
            a.size = 0;
            a.loaded = 0;
            a.uploaded = 0;
            a.failed = 0;
            a.queued = 0;
            a.percent = 0;
            a.bytesPerSec = 0;
            a.reset = function() {
                a.size = 
                a.loaded = a.uploaded = a.failed = a.queued = a.percent = a.bytesPerSec = 0
            }
        },
        runtimes: {}
    };
    window.plupload = h
})(jQuery);
(function(n, p, g, y) {
    function D() {
        var g;
        try {
            g = navigator.plugins["Shockwave Flash"],
            g = g.description
        } catch (p) {
            try {
                g = (new ActiveXObject("ShockwaveFlash.ShockwaveFlash")).GetVariable("$version")
            } catch (n) {
                g = "0.0"
            }
        }
        g = g.match(/\d+/g);
        return parseFloat(g[0] + "." + g[1])
    }
    var E = {}
      , t = {};
    g.flash = {
        trigger: function(g, p, n) {
            setTimeout(function() {
                var s = E[g];
                s && s.trigger("Flash:" + p, n)
            }, 0)
        }
    };
    g.runtimes.Flash = g.addRuntime("flash", {
        getFeatures: function() {
            return {
                jpgresize: !0,
                pngresize: !0,
                maxWidth: 8091,
                maxHeight: 8091,
                chunks: !0,
                progress: !0,
                multipart: !0,
                multi_selection: !0
            }
        },
        init: function(k, n) {
            function B() {
                return p.getElementById(k.id + "_flash")
            }
            function s() {
                5E3 < h++ ? n({
                    success: !1
                }) : !1 === t[k.id] && setTimeout(s, 1)
            }
            var l, h = 0, a = p.body;
            10 > D() ? n({
                success: !1
            }) : (t[k.id] = !1,
            E[k.id] = k,
            $(k.settings.browse_button).get(0),
            l = p.createElement("div"),
            l.id = k.id + "_flash_container",
            g.extend(l.style, {
                position: "absolute",
                top: "0px",
                background: k.settings.shim_bgcolor || "transparent",
                zIndex: 99999,
                width: "100%",
                height: "100%"
            }),
            l.className = "plupload flash",
            k.settings.container && (a = $(k.settings.container).get(0),
            "static" === g.getStyle(a, "position") && (a.style.position = "relative")),
            a.appendChild(l),
            function() {
                var a, f;
                a = '\x3cobject id\x3d"' + k.id + '_flash" type\x3d"application/x-shockwave-flash" data\x3d"' + k.settings.flash_swf_url + '" ';
                g.ua.ie && (a += 'classid\x3d"clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" ');
                a += 'width\x3d"100%" height\x3d"100%" style\x3d"outline:0"\x3e\x3cparam name\x3d"movie" value\x3d"' + k.settings.flash_swf_url + '" /\x3e\x3cparam name\x3d"flashvars" value\x3d"id\x3d' + 
                escape(k.id) + '" /\x3e\x3cparam name\x3d"wmode" value\x3d"transparent" /\x3e\x3cparam name\x3d"allowscriptaccess" value\x3d"always" /\x3e\x3c/object\x3e';
                g.ua.ie ? (f = p.createElement("div"),
                l.appendChild(f),
                f.outerHTML = a) : l.innerHTML = a
            }(),
            s(),
            l = null ,
            k.bind("Destroy", function(a) {
                g.removeAllEvents(p.body, a.id);
                delete t[a.id];
                delete E[a.id];
                (a = p.getElementById(a.id + "_flash_container")) && a.parentNode.removeChild(a)
            }),
            k.bind("Flash:Init", function() {
                var a = {};
                try {
                    B().setFileFilters(k.settings.filters, k.settings.multi_selection)
                } catch (f) {
                    n({
                        success: !1
                    });
                    return
                }
                t[k.id] || (t[k.id] = !0,
                k.bind("UploadFile", function(c, b) {
                    var d = c.settings
                      , f = k.settings.resize || {};
                    B().uploadFile(a[b.id], d.url, {
                        name: b.target_name || b.name,
                        mime: g.mimeTypes[b.name.replace(/^.+\.([^.]+)/, "$1").toLowerCase()] || "application/octet-stream",
                        chunk_size: d.chunk_size,
                        width: f.width,
                        height: f.height,
                        quality: f.quality,
                        multipart: d.multipart,
                        multipart_params: d.multipart_params || {},
                        file_data_name: d.file_data_name,
                        format: /\.(jpg|jpeg)$/i.test(b.name) ? "jpg" : "png",
                        headers: d.headers,
                        urlstream_upload: d.urlstream_upload
                    })
                }),
                k.bind("CancelUpload", function() {
                    B().cancelUpload()
                }),
                k.bind("Flash:UploadProcess", function(c, b) {
                    var d = c.getFile(a[b.id]);
                    d.status != g.FAILED && (d.loaded = b.loaded,
                    d.size = b.size,
                    c.trigger("UploadProgress", d))
                }),
                k.bind("Flash:UploadChunkComplete", function(c, b) {
                    var d = c.getFile(a[b.id]);
                    c.trigger("ChunkUploaded", d, {
                        chunk: b.chunk,
                        chunks: b.chunks,
                        response: b.text
                    });
                    d.status !== g.FAILED && c.state !== g.STOPPED && B().uploadNextChunk();
                    b.chunk == b.chunks - 1 && (d.status = g.DONE,
                    c.trigger("FileUploaded", d, {
                        response: b.text
                    }))
                }),
                k.bind("Flash:SelectFiles", function(c, b) {
                    var d, f, h = [], C;
                    for (f = 0; f < b.length; f++)
                        d = b[f],
                        C = g.guid(),
                        a[C] = d.id,
                        a[d.id] = C,
                        h.push(new g.File(C,d.name,d.size));
                    h.length && k.trigger("FilesAdded", h)
                }),
                k.bind("Flash:SecurityError", function(c, b) {
                    k.trigger("Error", {
                        code: g.SECURITY_ERROR,
                        message: g.translate("Security error."),
                        details: b.message,
                        file: k.getFile(a[b.id])
                    })
                }),
                k.bind("Flash:GenericError", function(c, b) {
                    k.trigger("Error", {
                        code: g.GENERIC_ERROR,
                        message: g.translate("Generic error."),
                        details: b.message,
                        file: k.getFile(a[b.id])
                    })
                }),
                k.bind("Flash:IOError", function(c, b) {
                    k.trigger("Error", {
                        code: g.IO_ERROR,
                        message: g.translate("IO error."),
                        details: b.message,
                        file: k.getFile(a[b.id])
                    })
                }),
                k.bind("Flash:ImageError", function(c, b) {
                    k.trigger("Error", {
                        code: parseInt(b.code, 10),
                        message: g.translate("Image error."),
                        file: k.getFile(a[b.id])
                    })
                }),
                k.bind("Flash:StageEvent:rollOver", function(a) {
                    var b;
                    b = $(k.settings.browse_button).get(0);
                    a = a.settings.browse_button_hover;
                    b && a && g.addClass(b, a)
                }),
                k.bind("Flash:StageEvent:rollOut", function(a) {
                    var b;
                    b = $(k.settings.browse_button).get(0);
                    a = a.settings.browse_button_hover;
                    b && a && g.removeClass(b, a)
                }),
                k.bind("Flash:StageEvent:mouseDown", function(a) {
                    var b, d;
                    b = $(k.settings.browse_button).get(0);
                    d = a.settings.browse_button_active;
                    b && d && (g.addClass(b, d),
                    g.addEvent(p.body, "mouseup", function() {
                        g.removeClass(b, d)
                    }, a.id))
                }),
                k.bind("Flash:StageEvent:mouseUp", function(a) {
                    var b;
                    b = $(k.settings.browse_button).get(0);
                    a = a.settings.browse_button_active;
                    b && a && g.removeClass(b, a)
                }),
                k.bind("Flash:ExifData", function(c, b) {
                    k.trigger("ExifData", k.getFile(a[b.id]), 
                    b.data)
                }),
                k.bind("Flash:GpsData", function(c, b) {
                    k.trigger("GpsData", k.getFile(a[b.id]), b.data)
                }),
                k.bind("QueueChanged", function(a) {
                    k.refresh()
                }),
                k.bind("FilesRemoved", function(c, b) {
                    var d;
                    for (d = 0; d < b.length; d++)
                        B().removeFile(a[b[d].id])
                }),
                k.bind("StateChanged", function(a) {
                    k.refresh()
                }),
                k.bind("Refresh", function(a) {
                    var b, d;
                    B().setFileFilters(k.settings.filters, k.settings.multi_selection);
                    if (b = $(k.settings.browse_button).get(0))
                        d = g.getPos(b, $(a.settings.container).get(0)),
                        b = g.getSize(b),
                        g.extend(p.getElementById(a.id + 
                        "_flash_container").style, {
                            top: d.y + "px",
                            left: d.x + "px",
                            width: b.w + "px",
                            height: b.h + "px"
                        })
                }),
                k.bind("DisableBrowse", function(a, b) {
                    B().disableBrowse(b)
                }),
                n({
                    success: !0
                }))
            }))
        }
    })
})(window, document, plupload);
(function(n, p, g, y) {
    function D(g, a) {
        var e;
        if ("FileReader" in n)
            e = new FileReader,
            e.readAsDataURL(g),
            e.onload = function() {
                a(e.result)
            };
        else
            return a(g.getAsDataURL())
    }
    function E(g, a) {
        var e;
        if ("FileReader" in n)
            e = new FileReader,
            e.readAsBinaryString(g),
            e.onload = function() {
                a(e.result)
            };
        else
            return a(g.getAsBinary())
    }
    function t(g, a, e, f) {
        var c, b, d, q = this;
        D(s[g.id], function(u) {
            c = p.createElement("canvas");
            c.style.display = "none";
            p.body.appendChild(c);
            b = new Image;
            b.onerror = b.onabort = function() {
                f({
                    success: !1
                })
            }
            ;
            b.onload = function() {
                var C, k, r, m;
                a.width || (a.width = b.width);
                a.height || (a.height = b.height);
                d = Math.min(a.width / b.width, a.height / b.height);
                if (1 > d)
                    C = Math.round(b.width * d),
                    k = Math.round(b.height * d);
                else if (a.quality && "image/jpeg" === e)
                    C = b.width,
                    k = b.height;
                else {
                    f({
                        success: !1
                    });
                    return
                }
                c.width = C;
                c.height = k;
                m = b;
                var l = m.naturalWidth
                  , n = m.naturalHeight
                  , s = C
                  , y = k
                  , H = c.getContext("2d");
                H.save();
                var x;
                x = m.naturalWidth;
                if (1048576 < x * m.naturalHeight) {
                    var z = p.createElement("canvas");
                    z.width = z.height = 1;
                    z = z.getContext("2d");
                    z.drawImage(m, -x + 1, 0);
                    x = 0 === z.getImageData(0, 0, 1, 1).data[3]
                } else
                    x = !1;
                x && (l /= 2,
                n /= 2);
                x = p.createElement("canvas");
                x.width = x.height = 1024;
                var z = x.getContext("2d"), v;
                v = n;
                var w = p.createElement("canvas");
                w.width = 1;
                w.height = v;
                w = w.getContext("2d");
                w.drawImage(m, 0, 0);
                for (var w = w.getImageData(0, 0, 1, v).data, t = 0, A = v, F = v; F > t; )
                    0 === w[4 * (F - 1) + 3] ? A = F : t = F,
                    F = A + t >> 1;
                v = F / v;
                v = 0 === v ? 1 : v;
                for (w = 0; w < n; ) {
                    t = w + 1024 > n ? n - w : 1024;
                    for (A = 0; A < l; ) {
                        F = A + 1024 > l ? l - A : 1024;
                        z.clearRect(0, 0, 1024, 1024);
                        z.drawImage(m, -A, -w);
                        var D = A * s / l << 0
                          , I = Math.ceil(F * 
                        s / l)
                          , E = w * y / n / v << 0
                          , J = Math.ceil(t * y / n / v);
                        H.drawImage(x, 0, 0, F, t, D, E, I, J);
                        A += 1024
                    }
                    w += 1024
                }
                H.restore();
                "image/jpeg" === e && (r = new G(atob(u.substring(u.indexOf("base64,") + 7))),
                r.headers && r.headers.length && (m = new B,
                m.init(r.get("exif")[0]) && (m.setExif("PixelXDimension", C),
                m.setExif("PixelYDimension", k),
                r.set("exif", m.getBinary()),
                q.hasEventListener("ExifData") && q.trigger("ExifData", g, m.EXIF()),
                q.hasEventListener("GpsData") && q.trigger("GpsData", g, m.GPS()))));
                if (a.quality && "image/jpeg" === e)
                    try {
                        u = c.toDataURL(e, 
                        a.quality / 100)
                    } catch (K) {
                        u = c.toDataURL(e)
                    }
                else
                    u = c.toDataURL(e);
                u = u.substring(u.indexOf("base64,") + 7);
                u = atob(u);
                r && r.headers && r.headers.length && (u = r.restore(u),
                r.purge());
                c.parentNode.removeChild(c);
                f({
                    success: !0,
                    data: u
                })
            }
            ;
            b.src = u
        })
    }
    function k() {
        function g(a, b) {
            var d = e ? 0 : -8 * (b - 1), q = 0, h;
            for (h = 0; h < b; h++)
                q |= f.charCodeAt(a + h) << Math.abs(d + 8 * h);
            return q
        }
        function a(a, b, d) {
            d = 3 === arguments.length ? d : f.length - b - 1;
            f = f.substr(0, b) + a + f.substr(d + b)
        }
        var e = !1, f;
        return {
            II: function(a) {
                if (a === y)
                    return e;
                e = a
            },
            init: function(a) {
                e = 
                !1;
                f = a
            },
            SEGMENT: function(c, b, d) {
                switch (arguments.length) {
                case 1:
                    return f.substr(c, f.length - c - 1);
                case 2:
                    return f.substr(c, b);
                case 3:
                    a(d, c, b);
                    break;
                default:
                    return f
                }
            },
            BYTE: function(a) {
                return g(a, 1)
            },
            SHORT: function(a) {
                return g(a, 2)
            },
            LONG: function(c, b) {
                if (b === y)
                    return g(c, 4);
                var d = "", f = e ? 0 : -24, u;
                for (u = 0; 4 > u; u++)
                    d += String.fromCharCode(b >> Math.abs(f + 8 * u) & 255);
                a(d, c, 4)
            },
            SLONG: function(a) {
                a = g(a, 4);
                return 2147483647 < a ? a - 4294967296 : a
            },
            STRING: function(a, b) {
                var d = "";
                for (b += a; a < b; a++)
                    d += String.fromCharCode(g(a, 
                    1));
                return d
            }
        }
    }
    function G(g) {
        var a = {
            65505: {
                app: "EXIF",
                name: "APP1",
                signature: "Exif\x00"
            },
            65506: {
                app: "ICC",
                name: "APP2",
                signature: "ICC_PROFILE\x00"
            },
            65517: {
                app: "IPTC",
                name: "APP13",
                signature: "Photoshop 3.0\x00"
            }
        }, e = [], f, c, b = y, d = 0;
        f = new k;
        f.init(g);
        if (65496 === f.SHORT(0)) {
            c = 2;
            for (g = Math.min(1048576, g.length); c <= g; )
                if (b = f.SHORT(c),
                65488 <= b && 65495 >= b)
                    c += 2;
                else {
                    if (65498 === b || 65497 === b)
                        break;
                    d = f.SHORT(c + 2) + 2;
                    a[b] && f.STRING(c + 4, a[b].signature.length) === a[b].signature && e.push({
                        hex: b,
                        app: a[b].app.toUpperCase(),
                        name: a[b].name.toUpperCase(),
                        start: c,
                        length: d,
                        segment: f.SEGMENT(c, d)
                    });
                    c += d
                }
            f.init(null );
            return {
                headers: e,
                restore: function(a) {
                    f.init(a);
                    var b = new G(a);
                    if (!b.headers)
                        return !1;
                    for (a = b.headers.length; 0 < a; a--) {
                        var d = b.headers[a - 1];
                        f.SEGMENT(d.start, d.length, "")
                    }
                    b.purge();
                    c = 65504 == f.SHORT(2) ? 4 + f.SHORT(4) : 2;
                    a = 0;
                    for (b = e.length; a < b; a++)
                        f.SEGMENT(c, 0, e[a].segment),
                        c += e[a].length;
                    return f.SEGMENT()
                },
                get: function(a) {
                    for (var b = [], d = 0, c = e.length; d < c; d++)
                        e[d].app === a.toUpperCase() && b.push(e[d].segment);
                    return b
                },
                set: function(a, b) {
                    var d = [];
                    "string" === typeof b ? d.push(b) : d = b;
                    for (var c = ii = 0, g = e.length; c < g && !(e[c].app === a.toUpperCase() && (e[c].segment = d[ii],
                    e[c].length = d[ii].length,
                    ii++),
                    ii >= d.length); c++)
                        ;
                },
                purge: function() {
                    e = [];
                    f.init(null )
                }
            }
        }
    }
    function B() {
        function h(b, d) {
            var e = a.SHORT(b), g, h, k, r, m, l = [], n = {};
            for (g = 0; g < e; g++)
                if (m = b + 12 * g + 2,
                k = d[a.SHORT(m)],
                k !== y) {
                    h = a.SHORT(m += 2);
                    r = a.LONG(m += 2);
                    m += 4;
                    l = [];
                    switch (h) {
                    case 1:
                    case 7:
                        4 < r && (m = a.LONG(m) + f.tiffHeader);
                        for (h = 0; h < r; h++)
                            l[h] = a.BYTE(m + h);
                        break;
                    case 2:
                        4 < r && (m = 
                        a.LONG(m) + f.tiffHeader);
                        n[k] = a.STRING(m, r - 1);
                        continue;
                    case 3:
                        2 < r && (m = a.LONG(m) + f.tiffHeader);
                        for (h = 0; h < r; h++)
                            l[h] = a.SHORT(m + 2 * h);
                        break;
                    case 4:
                        1 < r && (m = a.LONG(m) + f.tiffHeader);
                        for (h = 0; h < r; h++)
                            l[h] = a.LONG(m + 4 * h);
                        break;
                    case 5:
                        m = a.LONG(m) + f.tiffHeader;
                        for (h = 0; h < r; h++)
                            l[h] = a.LONG(m + 4 * h) / a.LONG(m + 4 * h + 4);
                        break;
                    case 9:
                        m = a.LONG(m) + f.tiffHeader;
                        for (h = 0; h < r; h++)
                            l[h] = a.SLONG(m + 4 * h);
                        break;
                    case 10:
                        m = a.LONG(m) + f.tiffHeader;
                        for (h = 0; h < r; h++)
                            l[h] = a.SLONG(m + 4 * h) / a.SLONG(m + 4 * h + 4);
                        break;
                    default:
                        continue
                    }
                    r = 1 == r ? l[0] : l;
                    c.hasOwnProperty(k) && "object" != typeof r ? n[k] = c[k][r] : n[k] = r
                }
            return n
        }
        var a, e, f = {}, c;
        a = new k;
        e = {
            tiff: {
                274: "Orientation",
                34665: "ExifIFDPointer",
                34853: "GPSInfoIFDPointer"
            },
            exif: {
                36864: "ExifVersion",
                40961: "ColorSpace",
                40962: "PixelXDimension",
                40963: "PixelYDimension",
                36867: "DateTimeOriginal",
                33434: "ExposureTime",
                33437: "FNumber",
                34855: "ISOSpeedRatings",
                37377: "ShutterSpeedValue",
                37378: "ApertureValue",
                37383: "MeteringMode",
                37384: "LightSource",
                37385: "Flash",
                41986: "ExposureMode",
                41987: "WhiteBalance",
                41990: "SceneCaptureType",
                41988: "DigitalZoomRatio",
                41992: "Contrast",
                41993: "Saturation",
                41994: "Sharpness"
            },
            gps: {
                0: "GPSVersionID",
                1: "GPSLatitudeRef",
                2: "GPSLatitude",
                3: "GPSLongitudeRef",
                4: "GPSLongitude"
            }
        };
        c = {
            ColorSpace: {
                1: "sRGB",
                0: "Uncalibrated"
            },
            MeteringMode: {
                0: "Unknown",
                1: "Average",
                2: "CenterWeightedAverage",
                3: "Spot",
                4: "MultiSpot",
                5: "Pattern",
                6: "Partial",
                255: "Other"
            },
            LightSource: {
                1: "Daylight",
                2: "Fliorescent",
                3: "Tungsten",
                4: "Flash",
                9: "Fine weather",
                10: "Cloudy weather",
                11: "Shade",
                12: "Daylight fluorescent (D 5700 - 7100K)",
                13: "Day white fluorescent (N 4600 -5400K)",
                14: "Cool white fluorescent (W 3900 - 4500K)",
                15: "White fluorescent (WW 3200 - 3700K)",
                17: "Standard light A",
                18: "Standard light B",
                19: "Standard light C",
                20: "D55",
                21: "D65",
                22: "D75",
                23: "D50",
                24: "ISO studio tungsten",
                255: "Other"
            },
            Flash: {
                0: "Flash did not fire.",
                1: "Flash fired.",
                5: "Strobe return light not detected.",
                7: "Strobe return light detected.",
                9: "Flash fired, compulsory flash mode",
                13: "Flash fired, compulsory flash mode, return light not detected",
                15: "Flash fired, compulsory flash mode, return light detected",
                16: "Flash did not fire, compulsory flash mode",
                24: "Flash did not fire, auto mode",
                25: "Flash fired, auto mode",
                29: "Flash fired, auto mode, return light not detected",
                31: "Flash fired, auto mode, return light detected",
                32: "No flash function",
                65: "Flash fired, red-eye reduction mode",
                69: "Flash fired, red-eye reduction mode, return light not detected",
                71: "Flash fired, red-eye reduction mode, return light detected",
                73: "Flash fired, compulsory flash mode, red-eye reduction mode",
                77: "Flash fired, compulsory flash mode, red-eye reduction mode, return light not detected",
                79: "Flash fired, compulsory flash mode, red-eye reduction mode, return light detected",
                89: "Flash fired, auto mode, red-eye reduction mode",
                93: "Flash fired, auto mode, return light not detected, red-eye reduction mode",
                95: "Flash fired, auto mode, return light detected, red-eye reduction mode"
            },
            ExposureMode: {
                0: "Auto exposure",
                1: "Manual exposure",
                2: "Auto bracket"
            },
            WhiteBalance: {
                0: "Auto white balance",
                1: "Manual white balance"
            },
            SceneCaptureType: {
                0: "Standard",
                1: "Landscape",
                2: "Portrait",
                3: "Night scene"
            },
            Contrast: {
                0: "Normal",
                1: "Soft",
                2: "Hard"
            },
            Saturation: {
                0: "Normal",
                1: "Low saturation",
                2: "High saturation"
            },
            Sharpness: {
                0: "Normal",
                1: "Soft",
                2: "Hard"
            },
            GPSLatitudeRef: {
                N: "North latitude",
                S: "South latitude"
            },
            GPSLongitudeRef: {
                E: "East longitude",
                W: "West longitude"
            }
        };
        return {
            init: function(b) {
                f = {
                    tiffHeader: 10
                };
                if (b === y || !b.length)
                    return !1;
                a.init(b);
                return 65505 === a.SHORT(0) && "EXIF\x00" === a.STRING(4, 5).toUpperCase() ? (b = y,
                b = f.tiffHeader,
                a.II(18761 == a.SHORT(b)),
                42 !== a.SHORT(b += 2) ? b = !1 : (f.IFD0 = f.tiffHeader + a.LONG(b + 
                2),
                b = h(f.IFD0, e.tiff),
                f.exifIFD = "ExifIFDPointer" in b ? f.tiffHeader + b.ExifIFDPointer : y,
                f.gpsIFD = "GPSInfoIFDPointer" in b ? f.tiffHeader + b.GPSInfoIFDPointer : y,
                b = !0),
                b) : !1
            },
            EXIF: function() {
                var a;
                a = h(f.exifIFD, e.exif);
                if (a.ExifVersion && "array" === g.typeOf(a.ExifVersion)) {
                    for (var d = 0, c = ""; d < a.ExifVersion.length; d++)
                        c += String.fromCharCode(a.ExifVersion[d]);
                    a.ExifVersion = c
                }
                return a
            },
            GPS: function() {
                var a;
                a = h(f.gpsIFD, e.gps);
                a.GPSVersionID && (a.GPSVersionID = a.GPSVersionID.join("."));
                return a
            },
            setExif: function(b, 
            d) {
                if ("PixelXDimension" !== b && "PixelYDimension" !== b)
                    return !1;
                var c;
                c = b;
                var g, h, k, l = 0;
                if ("string" === typeof c)
                    for (hex in g = e.exif,
                    g)
                        if (g[hex] === c) {
                            c = hex;
                            break
                        }
                g = f.exifIFD;
                h = a.SHORT(g);
                for (i = 0; i < h; i++)
                    if (k = g + 12 * i + 2,
                    a.SHORT(k) == c) {
                        l = k + 8;
                        break
                    }
                l ? (a.LONG(l, d),
                c = !0) : c = !1;
                return c
            },
            getBinary: function() {
                return a.SEGMENT()
            }
        }
    }
    var s = {}, l;
    g.runtimes.Html5 = g.addRuntime("html5", {
        getFeatures: function() {
            var h, a, e, f, c, b;
            a = e = c = b = !1;
            n.XMLHttpRequest && (h = new XMLHttpRequest,
            e = !!h.upload,
            a = !(!h.sendAsBinary && !h.upload));
            a && (f = !!(h.sendAsBinary || n.Uint8Array && n.ArrayBuffer),
            c = !(!File || !File.prototype.getAsDataURL && !n.FileReader || !f),
            b = !(!File || !(File.prototype.mozSlice || File.prototype.webkitSlice || File.prototype.slice)));
            l = g.ua.safari && g.ua.windows;
            h = a;
            a = p.createElement("div");
            return {
                html5: h,
                dragdrop: "draggable" in a || "ondragstart" in a && "ondrop" in a,
                jpgresize: c,
                pngresize: c,
                multipart: c || !!n.FileReader || !!n.FormData,
                canSendBinary: f,
                cantSendBlobInFormData: !(!(g.ua.gecko && n.FormData && n.FileReader) || FileReader.prototype.readAsArrayBuffer) || 
                g.ua.android,
                progress: e,
                chunks: b,
                multi_selection: !(g.ua.safari && g.ua.windows),
                triggerDialog: g.ua.gecko && n.FormData || g.ua.webkit || n.FileReader
            }
        },
        init: function(h, a) {
            function e(a) {
                var d, c, e = [], f, k = {};
                for (c = 0; c < a.length; c++)
                    d = a[c],
                    k[d.name] && g.ua.safari && g.ua.windows || (k[d.name] = !0,
                    f = g.guid(),
                    s[f] = d,
                    e.push(new g.File(f,d.fileName || d.name,d.fileSize || d.size)));
                e.length && h.trigger("FilesAdded", e)
            }
            var f, c;
            f = this.getFeatures();
            f.html5 ? (h.bind("Init", function(a) {
                var d, c, f = [], k, l, r = a.settings.filters, m, n;
                k = 
                p.body;
                d = p.createElement("div");
                d.id = a.id + "_html5_container";
                g.extend(d.style, {
                    position: "absolute",
                    background: h.settings.shim_bgcolor || "transparent",
                    width: "100px",
                    height: "100px",
                    overflow: "hidden",
                    zIndex: 99999,
                    opacity: h.settings.shim_bgcolor ? "" : 0
                });
                d.className = "plupload html5";
                h.settings.container && (k = $(h.settings.container).get(0),
                "static" === g.getStyle(k, "position") && (k.style.position = "relative"));
                k.appendChild(d);
                k = 0;
                a: for (; k < r.length; k++)
                    for (m = r[k].extensions.split(/,/),
                    l = 0; l < m.length; l++) {
                        if ("*" === 
                        m[l]) {
                            f = [];
                            break a
                        }
                        (n = g.mimeTypes[m[l]]) && -1 === g.inArray(n, f) && f.push(n)
                    }
                d.innerHTML = '\x3cinput id\x3d"' + h.id + '_html5"  style\x3d"font-size:999px" type\x3d"file" accept\x3d"' + f.join(",") + '" ' + (h.settings.multi_selection && h.features.multi_selection ? 'multiple\x3d"multiple"' : "") + " /\x3e";
                d.scrollTop = 100;
                f = p.getElementById(h.id + "_html5");
                a.features.triggerDialog ? g.extend(f.style, {
                    position: "absolute",
                    width: "100%",
                    height: "100%"
                }) : g.extend(f.style, {
                    cssFloat: "right",
                    styleFloat: "right"
                });
                f.onchange = function() {
                    e(this.files);
                    this.value = ""
                }
                ;
                if (c = $(h.settings.browse_button).get(0)) {
                    var s = a.settings.browse_button_hover
                      , t = a.settings.browse_button_active;
                    d = a.features.triggerDialog ? c : d;
                    s && (g.addEvent(d, "mouseover", function() {
                        g.addClass(c, s)
                    }, a.id),
                    g.addEvent(d, "mouseout", function() {
                        g.removeClass(c, s)
                    }, a.id));
                    t && (g.addEvent(d, "mousedown", function() {
                        g.addClass(c, t)
                    }, a.id),
                    g.addEvent(p.body, "mouseup", function() {
                        g.removeClass(c, t)
                    }, a.id));
                    a.features.triggerDialog && g.addEvent(c, "click", function(d) {
                        var c = p.getElementById(a.id + "_html5");
                        c && !c.disabled && c.click();
                        d.preventDefault()
                    }, a.id)
                }
            }),
            h.bind("PostInit", function() {
                var a = $(h.settings.drop_element).get(0);
                a && (l ? g.addEvent(a, "dragenter", function(d) {
                    var c;
                    c = p.getElementById(h.id + "_drop");
                    c || (c = p.createElement("input"),
                    c.setAttribute("type", "file"),
                    c.setAttribute("id", h.id + "_drop"),
                    c.setAttribute("multiple", "multiple"),
                    g.addEvent(c, "change", function() {
                        e(this.files);
                        g.removeEvent(c, "change", h.id);
                        c.parentNode.removeChild(c)
                    }, h.id),
                    g.addEvent(c, "dragover", function(a) {
                        a.stopPropagation()
                    }, 
                    h.id),
                    a.appendChild(c));
                    g.getPos(a, $(h.settings.container).get(0));
                    d = g.getSize(a);
                    "static" === g.getStyle(a, "position") && g.extend(a.style, {
                        position: "relative"
                    });
                    g.extend(c.style, {
                        position: "absolute",
                        display: "block",
                        top: 0,
                        left: 0,
                        width: d.w + "px",
                        height: d.h + "px",
                        opacity: 0
                    })
                }, h.id) : (g.addEvent(a, "dragover", function(a) {
                    a.preventDefault()
                }, h.id),
                g.addEvent(a, "drop", function(a) {
                    var b = a.dataTransfer;
                    b && b.files && e(b.files);
                    a.preventDefault()
                }, h.id)))
            }),
            h.bind("Refresh", function(a) {
                var c, e, f;
                if (c = $(h.settings.browse_button).get(0))
                    e = 
                    g.getPos(c, $(a.settings.container).get(0)),
                    f = g.getSize(c),
                    a = p.getElementById(h.id + "_html5_container"),
                    g.extend(a.style, {
                        top: e.y + "px",
                        left: e.x + "px",
                        width: f.w + "px",
                        height: f.h + "px"
                    }),
                    h.features.triggerDialog && ("static" === g.getStyle(c, "position") && g.extend(c.style, {
                        position: "relative"
                    }),
                    e = parseInt(g.getStyle(c, "zIndex"), 10),
                    isNaN(e) && (e = 0),
                    g.extend(c.style, {
                        zIndex: e
                    }),
                    g.extend(a.style, {
                        zIndex: e - 1
                    }))
            }),
            h.bind("DisableBrowse", function(a, c) {
                var e = p.getElementById(a.id + "_html5");
                e && (e.disabled = c)
            }),
            h.bind("CancelUpload", 
            function() {
                c && c.abort && c.abort()
            }),
            h.bind("UploadFile", function(a, d) {
                function e(a, b, c) {
                    var d;
                    if (File.prototype.slice)
                        try {
                            return a.slice(),
                            a.slice(b, c)
                        } catch (f) {
                            return a.slice(b, c - b)
                        }
                    else
                        return (d = File.prototype.webkitSlice || File.prototype.mozSlice) ? d.call(a, b, c) : null 
                }
                function h(l) {
                    function m() {
                        function h(d) {
                            if (c.sendAsBinary)
                                c.sendAsBinary(d);
                            else if (a.features.canSendBinary) {
                                for (var e = new Uint8Array(d.length), f = 0; f < d.length; f++)
                                    e[f] = d.charCodeAt(f) & 255;
                                c.send(e.buffer)
                            }
                        }
                        function s(e) {
                            var k = 0, l = "----pluploadboundary" + 
                            g.guid(), r, q = "";
                            c = new XMLHttpRequest;
                            c.upload && (c.upload.onprogress = function(c) {
                                d.loaded = Math.min(d.size, u + c.loaded - k);
                                a.trigger("UploadProgress", d)
                            }
                            );
                            c.onreadystatechange = function() {
                                var f, h;
                                if (4 == c.readyState && a.state !== g.STOPPED) {
                                    try {
                                        f = c.status
                                    } catch (k) {
                                        f = 0
                                    }
                                    if (400 <= f)
                                        a.trigger("Error", {
                                            code: g.HTTP_ERROR,
                                            message: g.translate("HTTP Error."),
                                            file: d,
                                            status: f
                                        });
                                    else {
                                        if (x) {
                                            h = {
                                                chunk: p,
                                                chunks: x,
                                                response: c.responseText,
                                                status: f
                                            };
                                            a.trigger("ChunkUploaded", d, h);
                                            u += w;
                                            if (h.cancelled) {
                                                d.status = g.FAILED;
                                                return
                                            }
                                            d.loaded = 
                                            Math.min(d.size, (p + 1) * v)
                                        } else
                                            d.loaded = d.size;
                                        a.trigger("UploadProgress", d);
                                        e = t = r = q = null ;
                                        !x || ++p >= x ? (d.status = g.DONE,
                                        a.trigger("FileUploaded", d, {
                                            response: c.responseText,
                                            status: f
                                        })) : m()
                                    }
                                }
                            }
                            ;
                            if (a.settings.multipart && f.multipart) {
                                z.name = d.target_name || d.name;
                                c.open("post", A, !0);
                                g.each(a.settings.headers, function(a, b) {
                                    c.setRequestHeader(b, a)
                                });
                                if ("string" !== typeof e && n.FormData) {
                                    r = new FormData;
                                    g.each(g.extend(z, a.settings.multipart_params), function(a, b) {
                                        r.append(b, a)
                                    });
                                    r.append(a.settings.file_data_name, 
                                    e);
                                    c.send(r);
                                    return
                                }
                                if ("string" === typeof e) {
                                    c.setRequestHeader("Content-Type", "multipart/form-data; boundary\x3d" + l);
                                    g.each(g.extend(z, a.settings.multipart_params), function(a, b) {
                                        q += "--" + l + '\r\nContent-Disposition: form-data; name\x3d"' + b + '"\r\n\r\n';
                                        q += unescape(encodeURIComponent(a)) + "\r\n"
                                    });
                                    y = g.mimeTypes[d.name.replace(/^.+\.([^.]+)/, "$1").toLowerCase()] || "application/octet-stream";
                                    q += "--" + l + '\r\nContent-Disposition: form-data; name\x3d"' + a.settings.file_data_name + '"; filename\x3d"' + unescape(encodeURIComponent(d.name)) + 
                                    '"\r\nContent-Type: ' + y + "\r\n\r\n" + e + "\r\n--" + l + "--\r\n";
                                    k = q.length - e.length;
                                    e = q;
                                    h(e);
                                    return
                                }
                            }
                            A = g.buildUrl(a.settings.url, g.extend(z, a.settings.multipart_params));
                            c.open("post", A, !0);
                            c.setRequestHeader("Content-Type", "application/octet-stream");
                            g.each(a.settings.headers, function(a, b) {
                                c.setRequestHeader(b, a)
                            });
                            "string" === typeof e ? h(e) : c.send(e)
                        }
                        var t, x, z, v, w, y, A = a.settings.url;
                        d.status != g.DONE && d.status != g.FAILED && a.state != g.STOPPED && (z = {
                            name: d.target_name || d.name
                        },
                        k.chunk_size && d.size > k.chunk_size && 
                        (f.chunks || "string" == typeof l) ? (v = k.chunk_size,
                        x = Math.ceil(d.size / v),
                        w = Math.min(v, d.size - p * v),
                        t = "string" == typeof l ? l.substring(p * v, p * v + w) : e(l, p * v, p * v + w),
                        z.chunk = p,
                        z.chunks = x) : (w = d.size,
                        t = l),
                        a.settings.multipart && f.multipart && "string" !== typeof t && n.FileReader && f.cantSendBlobInFormData && f.chunks && a.settings.chunk_size ? function() {
                            var a = new FileReader;
                            a.onload = function() {
                                s(a.result);
                                a = null 
                            }
                            ;
                            a.readAsBinaryString(t)
                        }() : s(t))
                    }
                    var p = 0
                      , u = 0;
                    m()
                }
                var k = a.settings, l;
                l = s[d.id];
                f.jpgresize && a.settings.resize && /\.(png|jpg|jpeg)$/i.test(d.name) ? 
                t.call(a, d, a.settings.resize, /\.png$/i.test(d.name) ? "image/png" : "image/jpeg", function(a) {
                    a.success ? (d.size = a.data.length,
                    h(a.data)) : f.chunks ? h(l) : E(l, h)
                }) : !f.chunks && f.jpgresize ? E(l, h) : h(l)
            }),
            h.bind("Destroy", function(a) {
                var c, e, f = p.body, h = {
                    inputContainer: a.id + "_html5_container",
                    inputFile: a.id + "_html5",
                    browseButton: a.settings.browse_button,
                    dropElm: a.settings.drop_element
                };
                for (c in h)
                    (e = $(h[c]).get(0)) && g.removeAllEvents(e, a.id);
                g.removeAllEvents(p.body, a.id);
                a.settings.container && (f = $(a.settings.container).get(0));
                f && h.inputContainer && f.removeChild(p.getElementById(h.inputContainer))
            }),
            a({
                success: !0
            })) : a({
                success: !1
            })
        }
    })
})(window, document, plupload);
(function(m, Ha) {
    var q = m.document, x = m.navigator, F = m.setTimeout, Y = m.Number.parseInt || m.parseInt, L = m.Number.parseFloat || m.parseFloat, Z = m.Number.isNaN || m.isNaN, M = m.encodeURIComponent, G = m.Math, $ = m.Date, aa = m.ActiveXObject, ba = m.Array.prototype.slice, N = m.Object.keys, r = m.Object.prototype.hasOwnProperty, O = function() {
        var a;
        if (a = "function" === typeof m.Object.defineProperty)
            try {
                var b = {};
                m.Object.defineProperty(b, "y", {
                    value: "z"
                });
                a = "z" === b.y
            } catch (c) {
                a = !1
            }
        if (a)
            return m.Object.defineProperty
    }(), k = function(a) {
        return ba.call(a, 
        0)
    }
    , v = function(a, b, c) {
        if ("function" === typeof b.indexOf)
            return b.indexOf(a, c);
        var d = b.length;
        for ("undefined" === typeof c ? c = 0 : 0 > c && (c = d + c); c < d; c++)
            if (r.call(b, c) && b[c] === a)
                return c;
        return -1
    }
    , s = function() {
        var a, b, c, d, e, f = k(arguments), g = f[0] || {};
        a = 1;
        for (b = f.length; a < b; a++)
            if (null  != (c = f[a]))
                for (d in c)
                    r.call(c, d) && (e = c[d],
                    g !== e && void 0 !== e && (g[d] = e));
        return g
    }
    , z = function(a) {
        var b, c, d;
        if ("object" !== typeof a || null  == a)
            b = a;
        else if ("number" === typeof a.length)
            for (b = [],
            c = 0,
            d = a.length; c < d; c++)
                r.call(a, c) && (b[c] = 
                z(a[c]));
        else
            for (c in b = {},
            a)
                r.call(a, c) && (b[c] = z(a[c]));
        return b
    }
    , P = function(a) {
        if (null  == a)
            return [];
        if (N)
            return N(a);
        var b = [], c;
        for (c in a)
            r.call(a, c) && b.push(c);
        return b
    }
    , Q = function(a) {
        return function() {
            return a.now ? a.now() : (new a).getTime()
        }
    }($), R = function(a, b) {
        if (a && 1 === a.nodeType && b && (1 === b.nodeType || 9 === b.nodeType)) {
            do {
                if (a === b)
                    return !0;
                a = a.parentNode
            } while (a)
        }
        return !1
    }
    , l = {
        bridge: null ,
        version: "0.0.0",
        pluginType: "unknown",
        disabled: null ,
        outdated: null ,
        unavailable: null ,
        deactivated: null ,
        overdue: null ,
        ready: null 
    }, y = {}, w, p = {}, H = null , ca = {
        ready: "Flash communication is established",
        error: {
            "flash-disabled": "Flash is disabled or not installed",
            "flash-outdated": "Flash is too outdated to support ZeroClipboard",
            "flash-unavailable": "Flash is unable to communicate bidirectionally with JavaScript",
            "flash-deactivated": "Flash is too outdated for your browser and/or is configured as click-to-activate",
            "flash-overdue": "Flash communication was established but NOT within the acceptable time limit"
        }
    }, h = {
        swfPath: function() {
            var a, 
            b, c, d, e = "ZeroClipboard.swf";
            if (!q.currentScript || !(d = q.currentScript.src)) {
                var f = q.getElementsByTagName("script");
                if ("readyState" in f[0])
                    for (a = f.length; a-- && ("interactive" !== f[a].readyState || !(d = f[a].src)); )
                        ;
                else if ("loading" === q.readyState)
                    d = f[f.length - 1].src;
                else {
                    for (a = f.length; a--; ) {
                        c = f[a].src;
                        if (!c) {
                            b = null ;
                            break
                        }
                        c = c.split("#")[0].split("?")[0];
                        c = c.slice(0, c.lastIndexOf("/") + 1);
                        if (null  == b)
                            b = c;
                        else if (b !== c) {
                            b = null ;
                            break
                        }
                    }
                    null  !== b && (d = b)
                }
            }
            d && (d = d.split("#")[0].split("?")[0],
            e = d.slice(0, d.lastIndexOf("/") + 
            1) + e);
            return e
        }(),
        trustedDomains: m.location.host ? [m.location.host] : [],
        cacheBust: !0,
        forceEnhancedClipboard: !1,
        flashLoadTimeout: 3E4,
        autoActivate: !0,
        bubbleEvents: !0,
        containerId: "global-zeroclipboard-html-bridge",
        containerClass: "global-zeroclipboard-container",
        swfObjectId: "global-zeroclipboard-flash-bridge",
        hoverClass: "zeroclipboard-is-hover",
        activeClass: "zeroclipboard-is-active",
        forceHandCursor: !1,
        title: null ,
        zIndex: 999999999
    }, da = function(a) {
        if ("object" === typeof a && null  !== a)
            for (var b in a)
                if (r.call(a, 
                b))
                    if (/^(?:forceHandCursor|title|zIndex|bubbleEvents)$/.test(b))
                        h[b] = a[b];
                    else if (null  == l.bridge)
                        if ("containerId" === b || "swfObjectId" === b) {
                            var c = a[b];
                            if ("string" === typeof c && c && /^[A-Za-z][A-Za-z0-9_:\-\.]*$/.test(c))
                                h[b] = a[b];
                            else
                                throw Error("The specified `" + b + "` value is not valid as an HTML4 Element ID");
                        } else
                            h[b] = a[b];
        if ("string" === typeof a && a) {
            if (r.call(h, a))
                return h[a]
        } else
            return z(h)
    }
    , ea = function() {
        for (var a = ["userAgent", "platform", "appName"], b = {}, c = 0, d = a.length; c < d; c++)
            a[c] in x && (b[a[c]] = 
            x[a[c]]);
        var a = ["bridge"], c = {}, e;
        for (e in l)
            -1 === v(e, a) && (c[e] = l[e]);
        return {
            browser: b,
            flash: c,
            zeroclipboard: {
                version: g.version,
                config: g.config()
            }
        }
    }
    , fa = function() {
        return !!(l.disabled || l.outdated || l.unavailable || l.deactivated)
    }
    , ga = function(a, b) {
        var c, d, e, f = {};
        if ("string" === typeof a && a)
            e = a.toLowerCase().split(/\s+/);
        else if ("object" === typeof a && a && "undefined" === typeof b)
            for (c in a)
                if (r.call(a, c) && "string" === typeof c && c && "function" === typeof a[c])
                    g.on(c, a[c]);
        if (e && e.length) {
            c = 0;
            for (d = e.length; c < d; c++)
                a = 
                e[c].replace(/^on/, ""),
                f[a] = !0,
                y[a] || (y[a] = []),
                y[a].push(b);
            f.ready && l.ready && g.emit({
                type: "ready"
            });
            if (f.error)
                for (e = ["disabled", "outdated", "unavailable", "deactivated", "overdue"],
                c = 0,
                d = e.length; c < d; c++)
                    if (!0 === l[e[c]]) {
                        g.emit({
                            type: "error",
                            name: "flash-" + e[c]
                        });
                        break
                    }
        }
        return g
    }
    , ha = function(a, b) {
        var c, d, e, f, n;
        if (0 === arguments.length)
            f = P(y);
        else if ("string" === typeof a && a)
            f = a.split(/\s+/);
        else if ("object" === typeof a && a && "undefined" === typeof b)
            for (c in a)
                r.call(a, c) && "string" === typeof c && c && "function" === 
                typeof a[c] && g.off(c, a[c]);
        if (f && f.length)
            for (c = 0,
            d = f.length; c < d; c++)
                if (a = f[c].toLowerCase().replace(/^on/, ""),
                (n = y[a]) && n.length)
                    if (b)
                        for (e = v(b, n); -1 !== e; )
                            n.splice(e, 1),
                            e = v(b, n, e);
                    else
                        n.length = 0;
        return g
    }
    , ia = function(a) {
        return "string" === typeof a && a ? z(y[a]) || null  : z(y)
    }
    , ja = function(a) {
        var b, c, d;
        if (a = S(a)) {
            b = a;
            var e = b.target || w || null 
              , f = "swf" === b._source;
            delete b._source;
            switch (b.type) {
            case "error":
                v(b.name, ["flash-disabled", "flash-outdated", "flash-deactivated", "flash-overdue"]) && s(l, {
                    disabled: "flash-disabled" === 
                    b.name,
                    outdated: "flash-outdated" === b.name,
                    unavailable: "flash-unavailable" === b.name,
                    deactivated: "flash-deactivated" === b.name,
                    overdue: "flash-overdue" === b.name,
                    ready: !1
                });
                break;
            case "ready":
                e = !0 === l.deactivated;
                s(l, {
                    disabled: !1,
                    outdated: !1,
                    unavailable: !1,
                    deactivated: !1,
                    overdue: e,
                    ready: !e
                });
                break;
            case "copy":
                var n, u, e = b.relatedTarget;
                !p["text/html"] && !p["text/plain"] && e && (u = e.value || e.outerHTML || e.innerHTML) && (n = e.value || e.textContent || e.innerText) ? (b.clipboardData.clearData(),
                b.clipboardData.setData("text/plain", 
                n),
                u !== n && b.clipboardData.setData("text/html", u)) : !p["text/plain"] && b.target && (n = b.target.getAttribute("data-clipboard-text")) && (b.clipboardData.clearData(),
                b.clipboardData.setData("text/plain", n));
                break;
            case "aftercopy":
                g.clearData();
                if (n = e) {
                    var k;
                    try {
                        k = q.activeElement
                    } catch (t) {
                        k = null 
                    }
                    n = e !== k
                }
                n && e.focus && e.focus();
                break;
            case "_mouseover":
                g.focus(e);
                !0 === h.bubbleEvents && f && (e && e !== b.relatedTarget && !R(b.relatedTarget, e) && A(s({}, b, {
                    type: "mouseenter",
                    bubbles: !1,
                    cancelable: !1
                })),
                A(s({}, b, {
                    type: "mouseover"
                })));
                break;
            case "_mouseout":
                g.blur();
                !0 === h.bubbleEvents && f && (e && e !== b.relatedTarget && !R(b.relatedTarget, e) && A(s({}, b, {
                    type: "mouseleave",
                    bubbles: !1,
                    cancelable: !1
                })),
                A(s({}, b, {
                    type: "mouseout"
                })));
                break;
            case "_mousedown":
                T(e, h.activeClass);
                !0 === h.bubbleEvents && f && A(s({}, b, {
                    type: b.type.slice(1)
                }));
                break;
            case "_mouseup":
                B(e, h.activeClass);
                !0 === h.bubbleEvents && f && A(s({}, b, {
                    type: b.type.slice(1)
                }));
                break;
            case "_click":
            case "_mousemove":
                !0 === h.bubbleEvents && f && A(s({}, b, {
                    type: b.type.slice(1)
                }))
            }
            b = /^_(?:click|mouse(?:over|out|down|up|move))$/.test(b.type) ? 
            !0 : void 0;
            if (!b) {
                if ("ready" === a.type && !0 === l.overdue)
                    return g.emit({
                        type: "error",
                        name: "flash-overdue"
                    });
                b = s({}, a);
                if ("object" === typeof b && b && b.type && (e = U(b),
                (n = (y["*"] || []).concat(y[b.type] || [])) && n.length)) {
                    var x, D;
                    u = 0;
                    for (k = n.length; u < k; u++)
                        f = n[u],
                        x = this,
                        "string" === typeof f && "function" === typeof m[f] && (f = m[f]),
                        "object" === typeof f && f && "function" === typeof f.handleEvent && (x = f,
                        f = f.handleEvent),
                        "function" === typeof f && (D = s({}, b),
                        V(f, x, [D], e))
                }
                if ("copy" === a.type) {
                    c = {};
                    a = {};
                    if ("object" === typeof p && p) {
                        for (d in p)
                            if (d && 
                            r.call(p, d) && "string" === typeof p[d] && p[d])
                                switch (d.toLowerCase()) {
                                case "text/plain":
                                case "text":
                                case "air:text":
                                case "flash:text":
                                    c.text = p[d];
                                    a.text = d;
                                    break;
                                case "text/html":
                                case "html":
                                case "air:html":
                                case "flash:html":
                                    c.html = p[d];
                                    a.html = d;
                                    break;
                                case "application/rtf":
                                case "text/rtf":
                                case "rtf":
                                case "richtext":
                                case "air:rtf":
                                case "flash:rtf":
                                    c.rtf = p[d],
                                    a.rtf = d
                                }
                        d = {
                            data: c,
                            formatMap: a
                        }
                    } else
                        d = void 0;
                    c = d.data;
                    H = d.formatMap
                }
                return c
            }
        }
    }
    , la = function() {
        "boolean" !== typeof l.ready && (l.ready = !1);
        if (!g.isFlashUnusable() && 
        null  === l.bridge) {
            var a = h.flashLoadTimeout;
            "number" === typeof a && 0 <= a && F(function() {
                "boolean" !== typeof l.deactivated && (l.deactivated = !0);
                !0 === l.deactivated && g.emit({
                    type: "error",
                    name: "flash-deactivated"
                })
            }, a);
            l.overdue = !1;
            ka()
        }
    }
    , na = function() {
        g.clearData();
        g.blur();
        g.emit("destroy");
        ma();
        g.off()
    }
    , oa = function(a, b) {
        var c;
        if ("object" === typeof a && a && "undefined" === typeof b)
            c = a,
            g.clearData();
        else if ("string" === typeof a && a)
            c = {},
            c[a] = b;
        else
            return;
        for (var d in c)
            "string" === typeof d && d && r.call(c, d) && "string" === 
            typeof c[d] && c[d] && (p[d] = c[d])
    }
    , pa = function(a) {
        if ("undefined" === typeof a) {
            if (p)
                for (var b in p)
                    r.call(p, b) && delete p[b];
            H = null 
        } else
            "string" === typeof a && r.call(p, a) && delete p[a]
    }
    , qa = function(a) {
        if ("undefined" === typeof a)
            return z(p);
        if ("string" === typeof a && r.call(p, a))
            return p[a]
    }
    , ra = function(a) {
        if (a && 1 === a.nodeType) {
            w && (B(w, h.activeClass),
            w !== a && B(w, h.hoverClass));
            w = a;
            T(a, h.hoverClass);
            var b = a.getAttribute("title") || h.title;
            if ("string" === typeof b && b) {
                var c = C(l.bridge);
                c && c.setAttribute("title", b)
            }
            (b = 
            !0 === h.forceHandCursor) || (a = (b = m.getComputedStyle(a, null ).getPropertyValue("cursor")) && "auto" !== b || "A" !== a.nodeName ? b : "pointer",
            b = "pointer" === a);
            a = b;
            !0 === l.ready && (l.bridge && "function" === typeof l.bridge.setHandCursor ? l.bridge.setHandCursor(a) : l.ready = !1);
            var d;
            w && (d = C(l.bridge)) && (a = W(w),
            s(d.style, {
                width: a.width + "px",
                height: a.height + "px",
                top: a.top + "px",
                left: a.left + "px",
                zIndex: "" + I(h.zIndex)
            }))
        }
    }
    , sa = function() {
        var a = C(l.bridge);
        a && (a.removeAttribute("title"),
        a.style.left = "0px",
        a.style.top = "-9999px",
        a.style.width = "1px",
        a.style.top = "1px");
        w && (B(w, h.hoverClass),
        B(w, h.activeClass),
        w = null )
    }
    , ta = function() {
        return w || null 
    }
    , S = function(a) {
        var b;
        "string" === typeof a && a ? (b = a,
        a = {}) : "object" === typeof a && a && "string" === typeof a.type && a.type && (b = a.type);
        if (b) {
            s(a, {
                type: b.toLowerCase(),
                target: a.target || w || null ,
                relatedTarget: a.relatedTarget || null ,
                currentTarget: l && l.bridge || null ,
                timeStamp: a.timeStamp || Q() || null 
            });
            b = ca[a.type];
            "error" === a.type && a.name && b && (b = b[a.name]);
            b && (a.message = b);
            "ready" === a.type && s(a, {
                target: null ,
                version: l.version
            });
            "error" === a.type && (/^flash-(disabled|outdated|unavailable|deactivated|overdue)$/.test(a.name) && s(a, {
                target: null ,
                minimumVersion: "11.0.0"
            }),
            /^flash-(outdated|unavailable|deactivated|overdue)$/.test(a.name) && s(a, {
                version: l.version
            }));
            "copy" === a.type && (a.clipboardData = {
                setData: g.setData,
                clearData: g.clearData
            });
            if ("aftercopy" === a.type && (b = H,
            "object" === typeof a && a && "object" === typeof b && b)) {
                var c = {}, d;
                for (d in a)
                    if (r.call(a, d))
                        if ("success" !== d && "data" !== d)
                            c[d] = a[d];
                        else {
                            c[d] = {};
                            var e = 
                            a[d], f;
                            for (f in e)
                                f && r.call(e, f) && r.call(b, f) && (c[d][b[f]] = e[f])
                        }
                a = c
            }
            a.target && !a.relatedTarget && (d = a,
            f = (f = (f = a.target) && f.getAttribute && f.getAttribute("data-clipboard-target")) ? q.getElementById(f) : null ,
            d.relatedTarget = f);
            if (a && /^_(?:click|mouse(?:over|out|down|up|move))$/.test(a.type)) {
                d = a.target;
                f = "_mouseover" === a.type && a.relatedTarget ? a.relatedTarget : void 0;
                b = "_mouseout" === a.type && a.relatedTarget ? a.relatedTarget : void 0;
                var e = W(d)
                  , c = e.left + ("number" === typeof a._stageX ? a._stageX : 0)
                  , e = e.top + ("number" === 
                typeof a._stageY ? a._stageY : 0)
                  , n = c - (q.body.scrollLeft + q.documentElement.scrollLeft)
                  , h = e - (q.body.scrollTop + q.documentElement.scrollTop)
                  , k = (m.screenLeft || m.screenX || 0) + n
                  , p = (m.screenTop || m.screenY || 0) + h
                  , t = "number" === typeof a.movementX ? a.movementX : 0
                  , D = "number" === typeof a.movementY ? a.movementY : 0;
                delete a._stageX;
                delete a._stageY;
                s(a, {
                    srcElement: d,
                    fromElement: f,
                    toElement: b,
                    screenX: k,
                    screenY: p,
                    pageX: c,
                    pageY: e,
                    clientX: n,
                    clientY: h,
                    x: n,
                    y: h,
                    movementX: t,
                    movementY: D,
                    offsetX: 0,
                    offsetY: 0,
                    layerX: 0,
                    layerY: 0
                })
            }
            return a
        }
    }
    , 
    U = function(a) {
        return !/^(?:(?:before)?copy|destroy)$/.test(a && "string" === typeof a.type && a.type || "")
    }
    , V = function(a, b, c, d) {
        d ? F(function() {
            a.apply(b, c)
        }, 0) : a.apply(b, c)
    }
    , A = function(a) {
        if (a && "string" === typeof a.type && a) {
            var b, c = a.target || null ;
            b = c && c.ownerDocument || q;
            a = s({
                view: b.defaultView || m,
                canBubble: !0,
                cancelable: !0,
                detail: "click" === a.type ? 1 : 0,
                button: "number" === typeof a.which ? a.which - 1 : "number" === typeof a.button ? a.button : b.createEvent ? 0 : 1
            }, a);
            c && b.createEvent && c.dispatchEvent && (a = [a.type, a.canBubble, 
            a.cancelable, a.view, a.detail, a.screenX, a.screenY, a.clientX, a.clientY, a.ctrlKey, a.altKey, a.shiftKey, a.metaKey, a.button, a.relatedTarget],
            b = b.createEvent("MouseEvents"),
            b.initMouseEvent && (b.initMouseEvent.apply(b, a),
            b._source = "js",
            c.dispatchEvent(b)))
        }
    }
    , C = function(a) {
        for (a = a && a.parentNode; a && "OBJECT" === a.nodeName && a.parentNode; )
            a = a.parentNode;
        return a || null 
    }
    , ka = function() {
        var a, b = l.bridge, c = C(b);
        if (!b) {
            var b = ua(m.location.host, h), d = "never" === b ? "none" : "all", e, f, n, u = "", k = [];
            h.trustedDomains && ("string" === 
            typeof h.trustedDomains ? e = [h.trustedDomains] : "object" === typeof h.trustedDomains && "length" in h.trustedDomains && (e = h.trustedDomains));
            if (e && e.length)
                for (c = 0,
                f = e.length; c < f; c++)
                    if (r.call(e, c) && e[c] && "string" === typeof e[c] && (n = J(e[c]))) {
                        if ("*" === n) {
                            k = [n];
                            break
                        }
                        k.push.apply(k, [n, "//" + n, m.location.protocol + "//" + n])
                    }
            k.length && (u += "trustedOrigins\x3d" + M(k.join(",")));
            !0 === h.forceEnhancedClipboard && (u += (u ? "\x26" : "") + "forceEnhancedClipboard\x3dtrue");
            "string" === typeof h.swfObjectId && h.swfObjectId && (u += (u ? "\x26" : 
            "") + "swfObjectId\x3d" + M(h.swfObjectId));
            e = u;
            c = h.swfPath;
            f = null  == h || h && !0 === h.cacheBust ? (-1 === h.swfPath.indexOf("?") ? "?" : "\x26") + "noCache\x3d" + Q() : "";
            f = c + f;
            c = q.createElement("div");
            c.id = h.containerId;
            c.className = h.containerClass;
            c.style.position = "absolute";
            c.style.left = "0px";
            c.style.top = "-9999px";
            c.style.width = "1px";
            c.style.height = "1px";
            c.style.zIndex = "" + I(h.zIndex);
            n = q.createElement("div");
            c.appendChild(n);
            q.body.appendChild(c);
            u = q.createElement("div");
            k = "activex" === l.pluginType;
            u.innerHTML = '\x3cobject id\x3d"' + 
            h.swfObjectId + '" name\x3d"' + h.swfObjectId + '" width\x3d"100%" height\x3d"100%" ' + (k ? 'classid\x3d"clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"' : 'type\x3d"application/x-shockwave-flash" data\x3d"' + f + '"') + "\x3e" + (k ? '\x3cparam name\x3d"movie" value\x3d"' + f + '"/\x3e' : "") + '\x3cparam name\x3d"allowScriptAccess" value\x3d"' + b + '"/\x3e\x3cparam name\x3d"allowNetworking" value\x3d"' + d + '"/\x3e\x3cparam name\x3d"menu" value\x3d"false"/\x3e\x3cparam name\x3d"wmode" value\x3d"transparent"/\x3e\x3cparam name\x3d"flashvars" value\x3d"' + 
            e + '"/\x3e\x3c/object\x3e';
            b = u.firstChild;
            b.ZeroClipboard = g;
            c.replaceChild(b, n)
        }
        b || ((b = q[h.swfObjectId]) && (a = b.length) && (b = b[a - 1]),
        !b && c && (b = c.firstChild));
        l.bridge = b || null ;
        return b
    }
    , ma = function() {
        var a = l.bridge;
        if (a) {
            var b = C(a);
            b && ("activex" === l.pluginType && "readyState" in a ? (a.style.display = "none",
            function d() {
                if (4 === a.readyState) {
                    for (var e in a)
                        "function" === typeof a[e] && (a[e] = null );
                    a.parentNode && a.parentNode.removeChild(a);
                    b.parentNode && b.parentNode.removeChild(b)
                } else
                    F(d, 10)
            }()) : (a.parentNode && 
            a.parentNode.removeChild(a),
            b.parentNode && b.parentNode.removeChild(b)));
            l.ready = null ;
            l.bridge = null ;
            l.deactivated = null 
        }
    }
    , J = function(a) {
        if (null  == a || "" === a)
            return null ;
        a = a.replace(/^\s+|\s+$/g, "");
        if ("" === a)
            return null ;
        var b = a.indexOf("//");
        a = -1 === b ? a : a.slice(b + 2);
        var c = a.indexOf("/");
        return (a = -1 === c ? a : -1 === b || 0 === c ? null  : a.slice(0, c)) && ".swf" === a.slice(-4).toLowerCase() ? null  : a || null 
    }
    , ua = function() {
        var a = function(a, c) {
            var d, e, f;
            if (null  != a && "*" !== c[0] && ("string" === typeof a && (a = [a]),
            "object" === typeof a && 
            "number" === typeof a.length))
                for (d = 0,
                e = a.length; d < e; d++)
                    if (r.call(a, d) && (f = J(a[d]))) {
                        if ("*" === f) {
                            c.length = 0;
                            c.push("*");
                            break
                        }
                        -1 === v(f, c) && c.push(f)
                    }
        }
        ;
        return function(b, c) {
            var d = J(c.swfPath);
            null  === d && (d = b);
            var e = [];
            a(c.trustedOrigins, e);
            a(c.trustedDomains, e);
            var f = e.length;
            if (0 < f) {
                if (1 === f && "*" === e[0])
                    return "always";
                if (-1 !== v(b, e))
                    return 1 === f && b === d ? "sameDomain" : "always"
            }
            return "never"
        }
    }(), T = function(a, b) {
        if (!a || 1 !== a.nodeType)
            return a;
        if (a.classList)
            return a.classList.contains(b) || a.classList.add(b),
            a;
        if (b && "string" === typeof b) {
            var c = (b || "").split(/\s+/);
            if (1 === a.nodeType)
                if (a.className) {
                    for (var d = " " + a.className + " ", e = a.className, f = 0, g = c.length; f < g; f++)
                        0 > d.indexOf(" " + c[f] + " ") && (e += " " + c[f]);
                    a.className = e.replace(/^\s+|\s+$/g, "")
                } else
                    a.className = b
        }
        return a
    }
    , B = function(a, b) {
        if (!a || 1 !== a.nodeType)
            return a;
        if (a.classList)
            return a.classList.contains(b) && a.classList.remove(b),
            a;
        if ("string" === typeof b && b) {
            var c = b.split(/\s+/);
            if (1 === a.nodeType && a.className) {
                for (var d = (" " + a.className + " ").replace(/[\n\t]/g, 
                " "), e = 0, f = c.length; e < f; e++)
                    d = d.replace(" " + c[e] + " ", " ");
                a.className = d.replace(/^\s+|\s+$/g, "")
            }
        }
        return a
    }
    , W = function(a) {
        var b = {
            left: 0,
            top: 0,
            width: 0,
            height: 0
        };
        if (a.getBoundingClientRect) {
            a = a.getBoundingClientRect();
            var c, d;
            "pageXOffset" in m && "pageYOffset" in m ? (c = m.pageXOffset,
            d = m.pageYOffset) : (c = 1,
            "function" === typeof q.body.getBoundingClientRect && (c = q.body.getBoundingClientRect(),
            c = c.right - c.left,
            d = q.body.offsetWidth,
            c = G.round(c / d * 100) / 100),
            d = c,
            c = G.round(q.documentElement.scrollLeft / d),
            d = G.round(q.documentElement.scrollTop / 
            d));
            var e = q.documentElement.clientTop || 0;
            b.left = a.left + c - (q.documentElement.clientLeft || 0);
            b.top = a.top + d - e;
            b.width = "width" in a ? a.width : a.right - a.left;
            b.height = "height" in a ? a.height : a.bottom - a.top
        }
        return b
    }
    , I = function(a) {
        if (/^(?:auto|inherit)$/.test(a))
            return a;
        var b;
        "number" !== typeof a || Z(a) ? "string" === typeof a && (b = I(Y(a, 10))) : b = a;
        return "number" === typeof b ? b : "auto"
    }
    ;
    (function(a) {
        function b(a) {
            a = a.match(/[\d]+/g);
            a.length = 3;
            return a.join(".")
        }
        function c(a) {
            a && (e = !0,
            a.version && (h = b(a.version)),
            !h && 
            a.description && (h = b(a.description)),
            a.filename && (a = a.filename,
            g = !!a && (a = a.toLowerCase()) && (/^(pepflashplayer\.dll|libpepflashplayer\.so|pepperflashplayer\.plugin)$/.test(a) || "chrome.plugin" === a.slice(-13))))
        }
        var d, e = !1, f = !1, g = !1, h = "";
        if (x.plugins && x.plugins.length)
            a = x.plugins["Shockwave Flash"],
            c(a),
            x.plugins["Shockwave Flash 2.0"] && (e = !0,
            h = "2.0.0.11");
        else if (x.mimeTypes && x.mimeTypes.length)
            a = (a = x.mimeTypes["application/x-shockwave-flash"]) && a.enabledPlugin,
            c(a);
        else if ("undefined" !== typeof a) {
            f = 
            !0;
            try {
                d = new a("ShockwaveFlash.ShockwaveFlash.7"),
                e = !0,
                h = b(d.GetVariable("$version"))
            } catch (k) {
                try {
                    d = new a("ShockwaveFlash.ShockwaveFlash.6"),
                    e = !0,
                    h = "6.0.21"
                } catch (m) {
                    try {
                        d = new a("ShockwaveFlash.ShockwaveFlash"),
                        e = !0,
                        h = b(d.GetVariable("$version"))
                    } catch (p) {
                        f = !1
                    }
                }
            }
        }
        l.disabled = !0 !== e;
        l.outdated = h && L(h) < L("11.0.0");
        l.version = h || "0.0.0";
        l.pluginType = g ? "pepper" : f ? "activex" : e ? "netscape" : "unknown"
    })(aa);
    var g = function() {
        if (!(this instanceof g))
            return new g;
        "function" === typeof g._createClient && g._createClient.apply(this, 
        k(arguments))
    }
    ;
    g.version = "2.1.1";
    (function(a, b) {
        b in a && "function" === typeof O && O(a, b, {
            value: a[b],
            writable: !1,
            configurable: !0,
            enumerable: !0
        })
    })(g, "version");
    g.config = function() {
        return da.apply(this, k(arguments))
    }
    ;
    g.state = function() {
        return ea.apply(this, k(arguments))
    }
    ;
    g.isFlashUnusable = function() {
        return fa.apply(this, k(arguments))
    }
    ;
    g.on = function() {
        return ga.apply(this, k(arguments))
    }
    ;
    g.off = function() {
        return ha.apply(this, k(arguments))
    }
    ;
    g.handlers = function() {
        return ia.apply(this, k(arguments))
    }
    ;
    g.emit = 
    function() {
        return ja.apply(this, k(arguments))
    }
    ;
    g.create = function() {
        return la.apply(this, k(arguments))
    }
    ;
    g.destroy = function() {
        return na.apply(this, k(arguments))
    }
    ;
    g.setData = function() {
        return oa.apply(this, k(arguments))
    }
    ;
    g.clearData = function() {
        return pa.apply(this, k(arguments))
    }
    ;
    g.getData = function() {
        return qa.apply(this, k(arguments))
    }
    ;
    g.focus = g.activate = function() {
        return ra.apply(this, k(arguments))
    }
    ;
    g.blur = g.deactivate = function() {
        return sa.apply(this, k(arguments))
    }
    ;
    g.activeElement = function() {
        return ta.apply(this, 
        k(arguments))
    }
    ;
    var va = 0
      , t = {}
      , wa = 0
      , E = {}
      , K = {};
    s(h, {
        autoActivate: !0
    });
    var xa = function(a) {
        var b = this;
        b.id = "" + va++;
        t[b.id] = {
            instance: b,
            elements: [],
            handlers: {}
        };
        a && b.clip(a);
        g.on("*", function(a) {
            return b.emit(a)
        });
        g.on("destroy", function() {
            b.destroy()
        });
        g.create()
    }
      , ya = function(a, b) {
        var c, d, e, f = {}, g = t[this.id] && t[this.id].handlers;
        if ("string" === typeof a && a)
            e = a.toLowerCase().split(/\s+/);
        else if ("object" === typeof a && a && "undefined" === typeof b)
            for (c in a)
                if (r.call(a, c) && "string" === typeof c && c && "function" === 
                typeof a[c])
                    this.on(c, a[c]);
        if (e && e.length) {
            c = 0;
            for (d = e.length; c < d; c++)
                a = e[c].replace(/^on/, ""),
                f[a] = !0,
                g[a] || (g[a] = []),
                g[a].push(b);
            f.ready && l.ready && this.emit({
                type: "ready",
                client: this
            });
            if (f.error)
                for (e = ["disabled", "outdated", "unavailable", "deactivated", "overdue"],
                c = 0,
                d = e.length; c < d; c++)
                    if (l[e[c]]) {
                        this.emit({
                            type: "error",
                            name: "flash-" + e[c],
                            client: this
                        });
                        break
                    }
        }
        return this
    }
      , za = function(a, b) {
        var c, d, e, f, g, h = t[this.id] && t[this.id].handlers;
        if (0 === arguments.length)
            f = P(h);
        else if ("string" === typeof a && 
        a)
            f = a.split(/\s+/);
        else if ("object" === typeof a && a && "undefined" === typeof b)
            for (c in a)
                r.call(a, c) && "string" === typeof c && c && "function" === typeof a[c] && this.off(c, a[c]);
        if (f && f.length)
            for (c = 0,
            d = f.length; c < d; c++)
                if (a = f[c].toLowerCase().replace(/^on/, ""),
                (g = h[a]) && g.length)
                    if (b)
                        for (e = v(b, g); -1 !== e; )
                            g.splice(e, 1),
                            e = v(b, g, e);
                    else
                        g.length = 0;
        return this
    }
      , Aa = function(a) {
        var b = null 
          , c = t[this.id] && t[this.id].handlers;
        c && (b = "string" === typeof a && a ? c[a] ? c[a].slice(0) : [] : z(c));
        return b
    }
      , Ba = function(a) {
        var b;
        var c = 
        a;
        if (!c || !c.type || c.client && c.client !== this)
            b = !1;
        else {
            var d = t[this.id] && t[this.id].elements
              , e = !!d && 0 < d.length;
            b = !c.target || e && -1 !== v(c.target, d);
            d = c.relatedTarget && e && -1 !== v(c.relatedTarget, d);
            c = c.client && c.client === this;
            b = b || d || c ? !0 : !1
        }
        if (b && ("object" === typeof a && a && "string" === typeof a.type && a.type && (a = s({}, a)),
        a = s({}, S(a), {
            client: this
        }),
        "object" === typeof a && a && a.type && (b = U(a),
        (c = (t[this.id] && t[this.id].handlers["*"] || []).concat(t[this.id] && t[this.id].handlers[a.type] || [])) && c.length)))
            for (var f, 
            g, h, d = 0, e = c.length; d < e; d++)
                f = c[d],
                g = this,
                "string" === typeof f && "function" === typeof m[f] && (f = m[f]),
                "object" === typeof f && f && "function" === typeof f.handleEvent && (g = f,
                f = f.handleEvent),
                "function" === typeof f && (h = s({}, a),
                V(f, g, [h], b));
        return this
    }
      , Da = function(a) {
        a = X(a);
        for (var b = 0; b < a.length; b++)
            if (r.call(a, b) && a[b] && 1 === a[b].nodeType) {
                a[b].zcClippingId ? -1 === v(this.id, E[a[b].zcClippingId]) && E[a[b].zcClippingId].push(this.id) : (a[b].zcClippingId = "zcClippingId_" + wa++,
                E[a[b].zcClippingId] = [this.id],
                !0 === h.autoActivate && 
                Ca(a[b]));
                var c = t[this.id] && t[this.id].elements;
                -1 === v(a[b], c) && c.push(a[b])
            }
        return this
    }
      , Ea = function(a) {
        var b = t[this.id];
        if (!b)
            return this;
        var b = b.elements, c;
        a = "undefined" === typeof a ? b.slice(0) : X(a);
        for (var d = a.length; d--; )
            if (r.call(a, d) && a[d] && 1 === a[d].nodeType) {
                for (c = 0; -1 !== (c = v(a[d], b, c)); )
                    b.splice(c, 1);
                var e = E[a[d].zcClippingId];
                if (e) {
                    for (c = 0; -1 !== (c = v(this.id, e, c)); )
                        e.splice(c, 1);
                    if (0 === e.length) {
                        if (!0 === h.autoActivate && (c = a[d]) && 1 === c.nodeType && (e = K[c.zcClippingId],
                        "object" === typeof e && e)) {
                            for (var f = 
                            void 0, g = void 0, k = ["move", "leave", "enter", "out", "over"], l = 0, m = k.length; l < m; l++)
                                f = "mouse" + k[l],
                                g = e[f],
                                "function" === typeof g && c.removeEventListener(f, g, !1);
                            delete K[c.zcClippingId]
                        }
                        delete a[d].zcClippingId
                    }
                }
            }
        return this
    }
      , Fa = function() {
        var a = t[this.id];
        return a && a.elements ? a.elements.slice(0) : []
    }
      , Ga = function() {
        this.unclip();
        this.off();
        delete t[this.id]
    }
      , X = function(a) {
        "string" === typeof a && (a = []);
        return "number" !== typeof a.length ? [a] : a
    }
      , Ca = function(a) {
        if (a && 1 === a.nodeType) {
            var b = function(a) {
                if (a || (a = m.event))
                    "js" !== 
                    a._source && (a.stopImmediatePropagation(),
                    a.preventDefault()),
                    delete a._source
            }
              , c = function(c) {
                if (c || (c = m.event))
                    b(c),
                    g.focus(a)
            }
            ;
            a.addEventListener("mouseover", c, !1);
            a.addEventListener("mouseout", b, !1);
            a.addEventListener("mouseenter", b, !1);
            a.addEventListener("mouseleave", b, !1);
            a.addEventListener("mousemove", b, !1);
            K[a.zcClippingId] = {
                mouseover: c,
                mouseout: b,
                mouseenter: b,
                mouseleave: b,
                mousemove: b
            }
        }
    }
    ;
    g._createClient = function() {
        xa.apply(this, k(arguments))
    }
    ;
    g.prototype.on = function() {
        return ya.apply(this, k(arguments))
    }
    ;
    g.prototype.off = function() {
        return za.apply(this, k(arguments))
    }
    ;
    g.prototype.handlers = function() {
        return Aa.apply(this, k(arguments))
    }
    ;
    g.prototype.emit = function() {
        return Ba.apply(this, k(arguments))
    }
    ;
    g.prototype.clip = function() {
        return Da.apply(this, k(arguments))
    }
    ;
    g.prototype.unclip = function() {
        return Ea.apply(this, k(arguments))
    }
    ;
    g.prototype.elements = function() {
        return Fa.apply(this, k(arguments))
    }
    ;
    g.prototype.destroy = function() {
        return Ga.apply(this, k(arguments))
    }
    ;
    g.prototype.setText = function(a) {
        g.setData("text/plain", 
        a);
        return this
    }
    ;
    g.prototype.setHtml = function(a) {
        g.setData("text/html", a);
        return this
    }
    ;
    g.prototype.setRichText = function(a) {
        g.setData("application/rtf", a);
        return this
    }
    ;
    g.prototype.setData = function() {
        g.setData.apply(this, k(arguments));
        return this
    }
    ;
    g.prototype.clearData = function() {
        g.clearData.apply(this, k(arguments));
        return this
    }
    ;
    g.prototype.getData = function() {
        return g.getData.apply(this, k(arguments))
    }
    ;
    "function" === typeof define && define.amd ? define(function() {
        return g
    }) : "object" === typeof module && module && 
    "object" === typeof module.exports && module.exports ? module.exports = g : m.ZeroClipboard = g
})(function() {
    return this
}());
(function() {
    var e, g, h;
    e = jQuery;
    h = function(b, d) {
        return setTimeout(function() {
            return e(b).find("img").each(function(c, a) {
                return g(a.src, d)
            })
        }, 1)
    }
    ;
    g = function(b, d) {
        var c;
        c = new Image;
        c.onload = function() {
            var a, b;
            a = document.createElement("canvas");
            a.width = c.width;
            a.height = c.height;
            a.getContext("2d").drawImage(c, 0, 0, a.width, a.height);
            b = null ;
            try {
                b = a.toDataURL("image/png")
            } catch (e) {}
            if (b)
                return d({
                    dataURL: b,
                    dataContentType: "image/png"
                })
        }
        ;
        return c.src = b
    }
    ;
    getFileData = function(b, d, c) {
        return c({
            pataFileName: d.name,
            dataContentType: d.type,
            dataURL: b
        })
    }
    ;
    e.paste = function(b) {
        e(b).on("paste", function(d) {
            var c = e(b).text(), a, f, g, k, l = this;
            if (null  != (null  != (a = d.originalEvent) ? a.clipboardData : void 0))
                if (a = d.originalEvent.clipboardData,
                a.items)
                    for (k = a.items,
                    f = 0,
                    g = k.length; f < g; f++) {
                        a = k[f];
                        if ("text/plain" === a.type) {
                            a.getAsString(function(a) {
                                c += a
                            });
                            return
                        }
                        d = new FileReader;
                        var m = a.getAsFile();
                        d.onload = function(a) {
                            return getFileData(a.target.result, m, function(a) {
                                return e(b).trigger("pasteFile", a)
                            })
                        }
                        ;
                        d.readAsDataURL(m)
                    }
                else if (0 < 
                a.types.length) {
                    for (f = 0; f < a.files.length; f++) {
                        var n = a.files[f];
                        d = new FileReader;
                        d.onload = function(a) {
                            return getFileData(a.target.result, n, function(a) {
                                return e(b).trigger("pasteFile", a)
                            })
                        }
                        ;
                        d.readAsDataURL(n)
                    }
                    text = a.getData("Text");
                    if (null  != text) {
                        c += text;
                        return
                    }
                } else
                    h(b, function(a) {
                        return e(b).trigger("pasteImage", a)
                    });
            if (a = window.clipboardData) {
                if (null  != (l = text = a.getData("Text")) && l.length) {
                    c += text;
                    return
                }
                h(b, function(a) {
                    return e(b).trigger("pasteImage", a)
                })
            }
            return setTimeout(function() {
                return e(b).text(c)
            }, 
            2)
        });
        return e(b)
    }
}
).call(this);
(function() {
    var e, g, h;
    e = jQuery;
    h = function(b, d) {
        return setTimeout(function() {
            return e(b).find("img").each(function(c, a) {
                return g(a.src, d)
            })
        }, 1)
    }
    ;
    g = function(b, d) {
        var c;
        c = new Image;
        c.onload = function() {
            var a, b;
            a = document.createElement("canvas");
            a.width = c.width;
            a.height = c.height;
            a.getContext("2d").drawImage(c, 0, 0, a.width, a.height);
            b = null ;
            try {
                b = a.toDataURL("image/png")
            } catch (e) {}
            if (b)
                return d({
                    dataURL: b,
                    dataContentType: "image/png"
                })
        }
        ;
        return c.src = b
    }
    ;
    getFileData = function(b, d, c) {
        return c({
            pataFileName: d.name,
            dataContentType: d.type,
            dataURL: b
        })
    }
    ;
    e.pasteupload = function(b) {
        e(b).on("paste", function(d) {
            var c = e(b).val(), a, f, g, k, l = this;
            if (null  != (null  != (a = d.originalEvent) ? a.clipboardData : void 0))
                if (a = d.originalEvent.clipboardData,
                a.items)
                    for (k = a.items,
                    f = 0,
                    g = k.length; f < g; f++) {
                        a = k[f];
                        if ("text/plain" === a.type) {
                            a.getAsString(function(a) {
                                c += a
                            });
                            return
                        }
                        d = new FileReader;
                        var m = a.getAsFile();
                        d.onload = function(a) {
                            return getFileData(a.target.result, m, function(a) {
                                return e(b).trigger("pasteFile", a)
                            })
                        }
                        ;
                        d.readAsDataURL(m)
                    }
                else if (0 < 
                a.types.length) {
                    for (f = 0; f < a.files.length; f++) {
                        var n = a.files[f];
                        d = new FileReader;
                        d.onload = function(a) {
                            return getFileData(a.target.result, n, function(a) {
                                return e(b).trigger("pasteFile", a)
                            })
                        }
                        ;
                        d.readAsDataURL(n)
                    }
                    text = a.getData("Text");
                    if (null  != text) {
                        c += text;
                        return
                    }
                } else
                    h(b, function(a) {
                        return e(b).trigger("pasteImage", a)
                    });
            if (a = window.clipboardData) {
                if (null  != (l = text = a.getData("Text")) && l.length) {
                    c += text;
                    return
                }
                h(b, function(a) {
                    return e(b).trigger("pasteImage", a)
                })
            }
            return setTimeout(function() {
                return e(b).val(c)
            }, 
            2)
        });
        return e(b)
    }
}
).call(this);
$.fn.outerHTML = function() {
    var a;
    if (this.length) {
        if (!(a = this[0].outerHTML)) {
            a = this[0];
            var b = document.createElement("div");
            b.appendChild(a.cloneNode(!0));
            a = b.innerHTML
        }
    } else
        a = this;
    return a
}
;
$.fn.fixPlaceholder = function() {
    var a = !1;
    "placeholder" in document.createElement("input") && (a = !0);
    a || (a = document.activeElement,
    $(this).find(":text,textarea").bind("focus", function() {
        "" != $(this).attr("placeholder") && $(this).val() == $(this).attr("placeholder") && $(this).val("")
    }).bind("blur", function() {
        "" == $(this).attr("placeholder") || "" != $(this).val() && $(this).val() != $(this).attr("placeholder") || $(this).val($(this).attr("placeholder"))
    }),
    $(a).focus())
}
;
//window.alert = function() {}
;
var console = console || {
    log: function() {
        return !1
    }
};
(function(c) {
    var m = function() {
        var d = {
            showEvent: "click",
            onShow: function() {},
            onBeforeShow: function() {},
            onHide: function() {},
            onChange: function() {},
            onSubmit: function() {},
            colorScheme: "light",
            color: "3289c7",
            livePreview: !0,
            flat: !1,
            layout: "full",
            submit: 1,
            submitText: "OK",
            height: 156
        }
          , p = function(a, b) {
            var l = n(a);
            c(b).data("colpick").fields.eq(1).val(l.r).end().eq(2).val(l.g).end().eq(3).val(l.b).end()
        }
          , g = function(a, b) {
            c(b).data("colpick").fields.eq(4).val(Math.round(a.h)).end().eq(5).val(Math.round(a.s)).end().eq(6).val(Math.round(a.b)).end()
        }
          , 
        f = function(a, b) {
            c(b).data("colpick").fields.eq(0).val(e(a))
        }
          , h = function(a, b) {
            c(b).data("colpick").selector.css("backgroundColor", "#" + e({
                h: a.h,
                s: 100,
                b: 100
            }));
            c(b).data("colpick").selectorIndic.css({
                left: parseInt(c(b).data("colpick").height * a.s / 100, 10),
                top: parseInt(c(b).data("colpick").height * (100 - a.b) / 100, 10)
            })
        }
          , s = function(a, b) {
            c(b).data("colpick").hue.css("top", parseInt(c(b).data("colpick").height - c(b).data("colpick").height * a.h / 360, 10))
        }
          , m = function(a, b) {
            c(b).data("colpick").currentColor.css("backgroundColor", 
            "#" + e(a))
        }
          , t = function(a, b) {
            c(b).data("colpick").newColor.css("backgroundColor", "#" + e(a))
        }
          , q = function(a) {
            a = c(this).parent().parent();
            var b;
            if (0 < this.parentNode.className.indexOf("_hex")) {
                b = a.data("colpick");
                var l = this.value
                  , d = 6 - l.length;
                if (0 < d) {
                    for (var k = [], m = 0; m < d; m++)
                        k.push("0");
                    k.push(l);
                    l = k.join("")
                }
                b.color = b = u(l);
                p(b, a.get(0));
                g(b, a.get(0))
            } else
                0 < this.parentNode.className.indexOf("_hsb") ? (a.data("colpick").color = b = x({
                    h: parseInt(a.data("colpick").fields.eq(4).val(), 10),
                    s: parseInt(a.data("colpick").fields.eq(5).val(), 
                    10),
                    b: parseInt(a.data("colpick").fields.eq(6).val(), 10)
                }),
                p(b, a.get(0)),
                f(b, a.get(0))) : (b = a.data("colpick"),
                l = parseInt(a.data("colpick").fields.eq(1).val(), 10),
                d = parseInt(a.data("colpick").fields.eq(2).val(), 10),
                k = parseInt(a.data("colpick").fields.eq(3).val(), 10),
                l = {
                    r: Math.min(255, Math.max(0, l)),
                    g: Math.min(255, Math.max(0, d)),
                    b: Math.min(255, Math.max(0, k))
                },
                b.color = b = r(l),
                f(b, a.get(0)),
                g(b, a.get(0)));
            h(b, a.get(0));
            s(b, a.get(0));
            t(b, a.get(0));
            a.data("colpick").onChange.apply(a.parent(), [b, e(b), n(b), 
            a.data("colpick").el, 0])
        }
          , v = function(a) {
            c(this).parent().removeClass("colpick_focus")
        }
          , w = function() {
            c(this).parent().parent().data("colpick").fields.parent().removeClass("colpick_focus");
            c(this).parent().addClass("colpick_focus")
        }
          , G = function(a) {
            a.preventDefault ? a.preventDefault() : a.returnValue = !1;
            var b = c(this).parent().find("input").focus();
            a = {
                el: c(this).parent().addClass("colpick_slider"),
                max: 0 < this.parentNode.className.indexOf("_hsb_h") ? 360 : 0 < this.parentNode.className.indexOf("_hsb") ? 100 : 255,
                y: a.pageY,
                field: b,
                val: parseInt(b.val(), 10),
                preview: c(this).parent().parent().data("colpick").livePreview
            };
            c(document).mouseup(a, y);
            c(document).mousemove(a, z)
        }
          , z = function(a) {
            a.data.field.val(Math.max(0, Math.min(a.data.max, parseInt(a.data.val - a.pageY + a.data.y, 10))));
            a.data.preview && q.apply(a.data.field.get(0), [!0]);
            return !1
        }
          , y = function(a) {
            q.apply(a.data.field.get(0), [!0]);
            a.data.el.removeClass("colpick_slider").find("input").focus();
            c(document).off("mouseup", y);
            c(document).off("mousemove", z);
            return !1
        }
          , H = function(a) {
            a.preventDefault ? 
            a.preventDefault() : a.returnValue = !1;
            var b = {
                cal: c(this).parent(),
                y: c(this).offset().top
            };
            c(document).on("mouseup touchend", b, A);
            c(document).on("mousemove touchmove", b, B);
            a = "touchstart" == a.type ? a.originalEvent.changedTouches[0].pageY : a.pageY;
            q.apply(b.cal.data("colpick").fields.eq(4).val(parseInt(360 * (b.cal.data("colpick").height - (a - b.y)) / b.cal.data("colpick").height, 10)).get(0), [b.cal.data("colpick").livePreview]);
            return !1
        }
          , B = function(a) {
            var b = "touchmove" == a.type ? a.originalEvent.changedTouches[0].pageY : 
            a.pageY;
            q.apply(a.data.cal.data("colpick").fields.eq(4).val(parseInt(360 * (a.data.cal.data("colpick").height - Math.max(0, Math.min(a.data.cal.data("colpick").height, b - a.data.y))) / a.data.cal.data("colpick").height, 10)).get(0), [a.data.preview]);
            return !1
        }
          , A = function(a) {
            p(a.data.cal.data("colpick").color, a.data.cal.get(0));
            f(a.data.cal.data("colpick").color, a.data.cal.get(0));
            c(document).off("mouseup touchend", A);
            c(document).off("mousemove touchmove", B);
            return !1
        }
          , I = function(a) {
            a.preventDefault ? a.preventDefault() : 
            a.returnValue = !1;
            var b = {
                cal: c(this).parent(),
                pos: c(this).offset()
            };
            b.preview = b.cal.data("colpick").livePreview;
            c(document).on("mouseup touchend", b, C);
            c(document).on("mousemove touchmove", b, D);
            "touchstart" == a.type ? (pageX = a.originalEvent.changedTouches[0].pageX,
            a = a.originalEvent.changedTouches[0].pageY) : (pageX = a.pageX,
            a = a.pageY);
            q.apply(b.cal.data("colpick").fields.eq(6).val(parseInt(100 * (b.cal.data("colpick").height - (a - b.pos.top)) / b.cal.data("colpick").height, 10)).end().eq(5).val(parseInt(100 * (pageX - 
            b.pos.left) / b.cal.data("colpick").height, 10)).get(0), [b.preview]);
            return !1
        }
          , D = function(a) {
            var b;
            "touchmove" == a.type ? (pageX = a.originalEvent.changedTouches[0].pageX,
            b = a.originalEvent.changedTouches[0].pageY) : (pageX = a.pageX,
            b = a.pageY);
            q.apply(a.data.cal.data("colpick").fields.eq(6).val(parseInt(100 * (a.data.cal.data("colpick").height - Math.max(0, Math.min(a.data.cal.data("colpick").height, b - a.data.pos.top))) / a.data.cal.data("colpick").height, 10)).end().eq(5).val(parseInt(100 * Math.max(0, Math.min(a.data.cal.data("colpick").height, 
            pageX - a.data.pos.left)) / a.data.cal.data("colpick").height, 10)).get(0), [a.data.preview]);
            return !1
        }
          , C = function(a) {
            p(a.data.cal.data("colpick").color, a.data.cal.get(0));
            f(a.data.cal.data("colpick").color, a.data.cal.get(0));
            c(document).off("mouseup touchend", C);
            c(document).off("mousemove touchmove", D);
            return !1
        }
          , J = function(a) {
            a = c(this).parent();
            var b = a.data("colpick").color;
            a.data("colpick").origColor = b;
            m(b, a.get(0));
            a.data("colpick").onSubmit(b, e(b), n(b), a.data("colpick").el)
        }
          , F = function(a) {
            a.stopPropagation();
            a = c("#" + c(this).data("colpickId"));
            a.data("colpick").onBeforeShow.apply(this, [a.get(0)]);
            var b = c(this).offset()
              //, d = b.top + this.offsetHeight
			  , d = b.top - 201
              , b = b.left
              , p = K()
              , f = a.width();
            b + f > p.l + p.w && (b -= f);
            a.css({
                left: b + "px",
                top: d + "px"
            });
            0 != a.data("colpick").onShow.apply(this, [a.get(0)]) && a.show();
            c("html").mousedown({
                cal: a
            }, E);
            a.mousedown(function(a) {
                a.stopPropagation()
            })
        }
          , E = function(a) {
            0 != a.data.cal.data("colpick").onHide.apply(this, [a.data.cal.get(0)]) && a.data.cal.hide();
            c("html").off("mousedown", E)
        }
          , K = function() {
            var a = 
            "CSS1Compat" == document.compatMode;
            return {
                l: window.pageXOffset || (a ? document.documentElement.scrollLeft : document.body.scrollLeft),
                w: window.innerWidth || (a ? document.documentElement.clientWidth : document.body.clientWidth)
            }
        }
          , x = function(a) {
            return {
                h: Math.min(360, Math.max(0, a.h)),
                s: Math.min(100, Math.max(0, a.s)),
                b: Math.min(100, Math.max(0, a.b))
            }
        }
          , L = function() {
            var a = c(this).parent()
              , b = a.data("colpick").origColor;
            a.data("colpick").color = b;
            p(b, a.get(0));
            f(b, a.get(0));
            g(b, a.get(0));
            h(b, a.get(0));
            s(b, a.get(0));
            t(b, 
            a.get(0))
        }
        ;
        return {
            init: function(a) {
                a = c.extend({}, d, a || {});
                if ("string" == typeof a.color)
                    a.color = u(a.color);
                else if (void 0 != a.color.r && void 0 != a.color.g && void 0 != a.color.b)
                    a.color = r(a.color);
                else if (void 0 != a.color.h && void 0 != a.color.s && void 0 != a.color.b)
                    a.color = x(a.color);
                else
                    return this;
                return this.each(function() {
                    if (!c(this).data("colpickId")) {
                        var b = c.extend({}, a);
                        b.origColor = a.color;
                        var d = "collorpicker_" + parseInt(1E3 * Math.random());
                        c(this).data("colpickId", d);
                        d = c('\x3cdiv class\x3d"colpick"\x3e\x3cdiv class\x3d"colpick_color"\x3e\x3cdiv class\x3d"colpick_color_overlay1"\x3e\x3cdiv class\x3d"colpick_color_overlay2"\x3e\x3cdiv class\x3d"colpick_selector_outer"\x3e\x3cdiv class\x3d"colpick_selector_inner"\x3e\x3c/div\x3e\x3c/div\x3e\x3c/div\x3e\x3c/div\x3e\x3c/div\x3e\x3cdiv class\x3d"colpick_hue"\x3e\x3cdiv class\x3d"colpick_hue_arrs"\x3e\x3cdiv class\x3d"colpick_hue_larr"\x3e\x3c/div\x3e\x3cdiv class\x3d"colpick_hue_rarr"\x3e\x3c/div\x3e\x3c/div\x3e\x3c/div\x3e\x3cdiv class\x3d"colpick_new_color"\x3e\x3c/div\x3e\x3cdiv class\x3d"colpick_current_color"\x3e\x3c/div\x3e\x3cdiv class\x3d"colpick_hex_field"\x3e\x3cdiv class\x3d"colpick_field_letter"\x3e#\x3c/div\x3e\x3cinput type\x3d"text" maxlength\x3d"6" size\x3d"6" /\x3e\x3c/div\x3e\x3cdiv class\x3d"colpick_rgb_r colpick_field"\x3e\x3cdiv class\x3d"colpick_field_letter"\x3eR\x3c/div\x3e\x3cinput type\x3d"text" maxlength\x3d"3" size\x3d"3" /\x3e\x3cdiv class\x3d"colpick_field_arrs"\x3e\x3cdiv class\x3d"colpick_field_uarr"\x3e\x3c/div\x3e\x3cdiv class\x3d"colpick_field_darr"\x3e\x3c/div\x3e\x3c/div\x3e\x3c/div\x3e\x3cdiv class\x3d"colpick_rgb_g colpick_field"\x3e\x3cdiv class\x3d"colpick_field_letter"\x3eG\x3c/div\x3e\x3cinput type\x3d"text" maxlength\x3d"3" size\x3d"3" /\x3e\x3cdiv class\x3d"colpick_field_arrs"\x3e\x3cdiv class\x3d"colpick_field_uarr"\x3e\x3c/div\x3e\x3cdiv class\x3d"colpick_field_darr"\x3e\x3c/div\x3e\x3c/div\x3e\x3c/div\x3e\x3cdiv class\x3d"colpick_rgb_b colpick_field"\x3e\x3cdiv class\x3d"colpick_field_letter"\x3eB\x3c/div\x3e\x3cinput type\x3d"text" maxlength\x3d"3" size\x3d"3" /\x3e\x3cdiv class\x3d"colpick_field_arrs"\x3e\x3cdiv class\x3d"colpick_field_uarr"\x3e\x3c/div\x3e\x3cdiv class\x3d"colpick_field_darr"\x3e\x3c/div\x3e\x3c/div\x3e\x3c/div\x3e\x3cdiv class\x3d"colpick_hsb_h colpick_field"\x3e\x3cdiv class\x3d"colpick_field_letter"\x3eH\x3c/div\x3e\x3cinput type\x3d"text" maxlength\x3d"3" size\x3d"3" /\x3e\x3cdiv class\x3d"colpick_field_arrs"\x3e\x3cdiv class\x3d"colpick_field_uarr"\x3e\x3c/div\x3e\x3cdiv class\x3d"colpick_field_darr"\x3e\x3c/div\x3e\x3c/div\x3e\x3c/div\x3e\x3cdiv class\x3d"colpick_hsb_s colpick_field"\x3e\x3cdiv class\x3d"colpick_field_letter"\x3eS\x3c/div\x3e\x3cinput type\x3d"text" maxlength\x3d"3" size\x3d"3" /\x3e\x3cdiv class\x3d"colpick_field_arrs"\x3e\x3cdiv class\x3d"colpick_field_uarr"\x3e\x3c/div\x3e\x3cdiv class\x3d"colpick_field_darr"\x3e\x3c/div\x3e\x3c/div\x3e\x3c/div\x3e\x3cdiv class\x3d"colpick_hsb_b colpick_field"\x3e\x3cdiv class\x3d"colpick_field_letter"\x3eB\x3c/div\x3e\x3cinput type\x3d"text" maxlength\x3d"3" size\x3d"3" /\x3e\x3cdiv class\x3d"colpick_field_arrs"\x3e\x3cdiv class\x3d"colpick_field_uarr"\x3e\x3c/div\x3e\x3cdiv class\x3d"colpick_field_darr"\x3e\x3c/div\x3e\x3c/div\x3e\x3c/div\x3e\x3cdiv class\x3d"colpick_submit"\x3e\x3c/div\x3e\x3c/div\x3e').attr("id", 
                        d);
                        d.addClass("colpick_" + b.layout + (b.submit ? "" : " colpick_" + b.layout + "_ns"));
                        "light" != b.colorScheme && d.addClass("colpick_" + b.colorScheme);
                        d.find("div.colpick_submit").html(b.submitText).click(J);
                        b.fields = d.find("input").change(q).blur(v).focus(w);
                        d.find("div.colpick_field_arrs").mousedown(G).end().find("div.colpick_current_color").click(L);
                        b.selector = d.find("div.colpick_color").on("mousedown touchstart", I);
                        b.selectorIndic = b.selector.find("div.colpick_selector_outer");
                        b.el = this;
                        b.hue = d.find("div.colpick_hue_arrs");
                        huebar = b.hue.parent();
                        var e = navigator.userAgent.toLowerCase()
                          , k = "Microsoft Internet Explorer" === navigator.appName
                          , n = k ? parseFloat(e.match(/msie ([0-9]{1,}[\.0-9]{0,})/)[1]) : 0
                          , e = "#ff0000 #ff0080 #ff00ff #8000ff #0000ff #0080ff #00ffff #00ff80 #00ff00 #80ff00 #ffff00 #ff8000 #ff0000".split(" ");
                        if (k && 10 > n)
                            for (k = 0; 11 >= k; k++)
                                n = c("\x3cdiv\x3e\x3c/div\x3e").attr("style", "height:8.333333%; filter:progid:DXImageTransform.Microsoft.gradient(GradientType\x3d0,startColorstr\x3d" + e[k] + ", endColorstr\x3d" + e[k + 
                                1] + '); -ms-filter: "progid:DXImageTransform.Microsoft.gradient(GradientType\x3d0,startColorstr\x3d' + e[k] + ", endColorstr\x3d" + e[k + 1] + ')";'),
                                huebar.append(n);
                        else
                            stopList = e.join(","),
                            huebar.attr("style", "background:-webkit-linear-gradient(top," + stopList + "); background: -o-linear-gradient(top," + stopList + "); background: -ms-linear-gradient(top," + stopList + "); background:-moz-linear-gradient(top," + stopList + "); -webkit-linear-gradient(top," + stopList + "); background:linear-gradient(to bottom," + stopList + "); ");
                        d.find("div.colpick_hue").on("mousedown touchstart", H);
                        b.newColor = d.find("div.colpick_new_color");
                        b.currentColor = d.find("div.colpick_current_color");
                        d.data("colpick", b);
                        p(b.color, d.get(0));
                        g(b.color, d.get(0));
                        f(b.color, d.get(0));
                        s(b.color, d.get(0));
                        h(b.color, d.get(0));
                        m(b.color, d.get(0));
                        t(b.color, d.get(0));
                        b.flat ? (d.appendTo(this).show(),
                        d.css({
                            position: "relative",
                            display: "block"
                        })) : (d.appendTo(document.body),
                        c(this).on(b.showEvent, F),
                        d.css({
                            position: "absolute"
                        }))
                    }
                })
            },
            showPicker: function() {
                return this.each(function() {
                    c(this).data("colpickId") && 
                    F.apply(this)
                })
            },
            hidePicker: function() {
                return this.each(function() {
                    c(this).data("colpickId") && c("#" + c(this).data("colpickId")).hide()
                })
            },
            setColor: function(a, b) {
                b = "undefined" === typeof b ? 1 : b;
                if ("string" == typeof a)
                    a = u(a);
                else if (void 0 != a.r && void 0 != a.g && void 0 != a.b)
                    a = r(a);
                else if (void 0 != a.h && void 0 != a.s && void 0 != a.b)
                    a = x(a);
                else
                    return this;
                return this.each(function() {
                    if (c(this).data("colpickId")) {
                        var d = c("#" + c(this).data("colpickId"));
                        d.data("colpick").color = a;
                        d.data("colpick").origColor = a;
                        p(a, d.get(0));
                        g(a, d.get(0));
                        f(a, d.get(0));
                        s(a, d.get(0));
                        h(a, d.get(0));
                        t(a, d.get(0));
                        d.data("colpick").onChange.apply(d.parent(), [a, e(a), n(a), d.data("colpick").el, 1]);
                        b && m(a, d.get(0))
                    }
                })
            }
        }
    }()
      , v = function(d) {
        d = parseInt(-1 < d.indexOf("#") ? d.substring(1) : d, 16);
        return {
            r: d >> 16,
            g: (d & 65280) >> 8,
            b: d & 255
        }
    }
      , u = function(d) {
        return r(v(d))
    }
      , r = function(d) {
        var c = {
            h: 0,
            s: 0,
            b: 0
        }
          , g = Math.min(d.r, d.g, d.b)
          , f = Math.max(d.r, d.g, d.b)
          , g = f - g;
        c.b = f;
        c.s = 0 != f ? 255 * g / f : 0;
        c.h = 0 != c.s ? d.r == f ? (d.g - d.b) / g : d.g == f ? 2 + (d.b - d.r) / g : 4 + (d.r - d.g) / g : -1;
        c.h *= 60;
        0 > 
        c.h && (c.h += 360);
        c.s *= 100 / 255;
        c.b *= 100 / 255;
        return c
    }
      , n = function(d) {
        var c, g, f;
        c = d.h;
        var h = 255 * d.s / 100;
        d = 255 * d.b / 100;
        if (0 == h)
            c = g = f = d;
        else {
            var h = (255 - h) * d / 255
              , e = c % 60 * (d - h) / 60;
            360 == c && (c = 0);
            60 > c ? (c = d,
            f = h,
            g = h + e) : 120 > c ? (g = d,
            f = h,
            c = d - e) : 180 > c ? (g = d,
            c = h,
            f = h + e) : 240 > c ? (f = d,
            c = h,
            g = d - e) : 300 > c ? (f = d,
            g = h,
            c = h + e) : 360 > c ? (c = d,
            g = h,
            f = d - e) : f = g = c = 0
        }
        return {
            r: Math.round(c),
            g: Math.round(g),
            b: Math.round(f)
        }
    }
      , w = function(d) {
        var e = [d.r.toString(16), d.g.toString(16), d.b.toString(16)];
        c.each(e, function(d, c) {
            1 == c.length && (e[d] = "0" + c)
        });
        return e.join("")
    }
      , e = function(c) {
        return w(n(c))
    }
    ;
    c.fn.extend({
        colpick: m.init,
        colpickHide: m.hidePicker,
        colpickShow: m.showPicker,
        colpickSetColor: m.setColor
    });
    c.extend({
        colpick: {
            rgbToHex: w,
            rgbToHsb: r,
            hsbToHex: e,
            hsbToRgb: n,
            hexToHsb: u,
            hexToRgb: v
        }
    })
})(jQuery);
var swfobject = function() {
    function v() {
        if (!t) {
            try {
                var a = d.getElementsByTagName("body")[0].appendChild(d.createElement("span"));
                a.parentNode.removeChild(a)
            } catch (b) {
                return
            }
            t = !0;
            for (var a = y.length, c = 0; c < a; c++)
                y[c]()
        }
    }
    function L(a) {
        t ? a() : y[y.length] = a
    }
    function M(a) {
        if ("undefined" != typeof n.addEventListener)
            n.addEventListener("load", a, !1);
        else if ("undefined" != typeof d.addEventListener)
            d.addEventListener("load", a, !1);
        else if ("undefined" != typeof n.attachEvent)
            T(n, "onload", a);
        else if ("function" == typeof n.onload) {
            var b = 
            n.onload;
            n.onload = function() {
                b();
                a()
            }
        } else
            n.onload = a
    }
    function U() {
        var a = d.getElementsByTagName("body")[0]
          , b = d.createElement("object");
        b.setAttribute("type", "application/x-shockwave-flash");
        var c = a.appendChild(b);
        if (c) {
            var f = 0;
            (function() {
                if ("undefined" != typeof c.GetVariable) {
                    var g = c.GetVariable("$version");
                    g && (g = g.split(" ")[1].split(","),
                    e.pv = [parseInt(g[0], 10), parseInt(g[1], 10), parseInt(g[2], 10)])
                } else if (10 > f) {
                    f++;
                    setTimeout(arguments.callee, 10);
                    return
                }
                a.removeChild(b);
                c = null ;
                D()
            })()
        } else
            D()
    }
    function D() {
        var a = r.length;
        if (0 < a)
            for (var b = 0; b < a; b++) {
                var c = r[b].id
                  , f = r[b].callbackFn
                  , g = {
                    success: !1,
                    id: c
                };
                if (0 < e.pv[0]) {
                    var d = p(c);
                    if (d)
                        if (!z(r[b].swfVersion) || e.wk && 312 > e.wk)
                            if (r[b].expressInstall && E()) {
                                g = {};
                                g.data = r[b].expressInstall;
                                g.width = d.getAttribute("width") || "0";
                                g.height = d.getAttribute("height") || "0";
                                d.getAttribute("class") && (g.styleclass = d.getAttribute("class"));
                                d.getAttribute("align") && (g.align = d.getAttribute("align"));
                                for (var h = {}, d = d.getElementsByTagName("param"), k = d.length, l = 0; l < 
                                k; l++)
                                    "movie" != d[l].getAttribute("name").toLowerCase() && (h[d[l].getAttribute("name")] = d[l].getAttribute("value"));
                                F(g, h, c, f)
                            } else
                                V(d),
                                f && f(g);
                        else
                            u(c, !0),
                            f && (g.success = !0,
                            g.ref = G(c),
                            f(g))
                } else
                    u(c, !0),
                    f && ((c = G(c)) && "undefined" != typeof c.SetVariable && (g.success = !0,
                    g.ref = c),
                    f(g))
            }
    }
    function G(a) {
        var b = null ;
        (a = p(a)) && "OBJECT" == a.nodeName && ("undefined" != typeof a.SetVariable ? b = a : (a = a.getElementsByTagName("object")[0]) && (b = a));
        return b
    }
    function E() {
        return !A && z("6.0.65") && (e.win || e.mac) && !(e.wk && 312 > e.wk)
    }
    function F(a, b, c, f) {
        A = !0;
        H = f || null ;
        N = {
            success: !1,
            id: c
        };
        var g = p(c);
        if (g) {
            "OBJECT" == g.nodeName ? (x = I(g),
            B = null ) : (x = g,
            B = c);
            a.id = "SWFObjectExprInst";
            if ("undefined" == typeof a.width || !/%$/.test(a.width) && 310 > parseInt(a.width, 10))
                a.width = "310";
            if ("undefined" == typeof a.height || !/%$/.test(a.height) && 137 > parseInt(a.height, 10))
                a.height = "137";
            d.title = d.title.slice(0, 47) + " - Flash Player Installation";
            f = e.ie && e.win ? "ActiveX" : "PlugIn";
            f = "MMredirectURL\x3d" + n.location.toString().replace(/&/g, "%26") + "\x26MMplayerType\x3d" + 
            f + "\x26MMdoctitle\x3d" + d.title;
            b.flashvars = "undefined" != typeof b.flashvars ? b.flashvars + ("\x26" + f) : f;
            e.ie && e.win && 4 != g.readyState && (f = d.createElement("div"),
            c += "SWFObjectNew",
            f.setAttribute("id", c),
            g.parentNode.insertBefore(f, g),
            g.style.display = "none",
            function() {
                4 == g.readyState ? g.parentNode.removeChild(g) : setTimeout(arguments.callee, 10)
            }());
            J(a, b, c)
        }
    }
    function V(a) {
        if (e.ie && e.win && 4 != a.readyState) {
            var b = d.createElement("div");
            a.parentNode.insertBefore(b, a);
            b.parentNode.replaceChild(I(a), b);
            a.style.display = 
            "none";
            (function() {
                4 == a.readyState ? a.parentNode.removeChild(a) : setTimeout(arguments.callee, 10)
            })()
        } else
            a.parentNode.replaceChild(I(a), a)
    }
    function I(a) {
        var b = d.createElement("div");
        if (e.win && e.ie)
            b.innerHTML = a.innerHTML;
        else if (a = a.getElementsByTagName("object")[0])
            if (a = a.childNodes)
                for (var c = a.length, f = 0; f < c; f++)
                    1 == a[f].nodeType && "PARAM" == a[f].nodeName || 8 == a[f].nodeType || b.appendChild(a[f].cloneNode(!0));
        return b
    }
    function J(a, b, c) {
        var f, g = p(c);
        if (e.wk && 312 > e.wk)
            return f;
        if (g)
            if ("undefined" == typeof a.id && 
            (a.id = c),
            e.ie && e.win) {
                var q = "", h;
                for (h in a)
                    a[h] != Object.prototype[h] && ("data" == h.toLowerCase() ? b.movie = a[h] : "styleclass" == h.toLowerCase() ? q += ' class\x3d"' + a[h] + '"' : "classid" != h.toLowerCase() && (q += " " + h + '\x3d"' + a[h] + '"'));
                h = "";
                for (var k in b)
                    b[k] != Object.prototype[k] && (h += '\x3cparam name\x3d"' + k + '" value\x3d"' + b[k] + '" /\x3e');
                g.outerHTML = '\x3cobject classid\x3d"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"' + q + "\x3e" + h + "\x3c/object\x3e";
                C[C.length] = a.id;
                f = p(a.id)
            } else {
                k = d.createElement("object");
                k.setAttribute("type", 
                "application/x-shockwave-flash");
                for (var l in a)
                    a[l] != Object.prototype[l] && ("styleclass" == l.toLowerCase() ? k.setAttribute("class", a[l]) : "classid" != l.toLowerCase() && k.setAttribute(l, a[l]));
                for (q in b)
                    b[q] != Object.prototype[q] && "movie" != q.toLowerCase() && (a = k,
                    h = q,
                    l = b[q],
                    c = d.createElement("param"),
                    c.setAttribute("name", h),
                    c.setAttribute("value", l),
                    a.appendChild(c));
                g.parentNode.replaceChild(k, g);
                f = k
            }
        return f
    }
    function O(a) {
        var b = p(a);
        b && "OBJECT" == b.nodeName && (e.ie && e.win ? (b.style.display = "none",
        function() {
            if (4 == 
            b.readyState) {
                var c = p(a);
                if (c) {
                    for (var f in c)
                        "function" == typeof c[f] && (c[f] = null );
                    c.parentNode.removeChild(c)
                }
            } else
                setTimeout(arguments.callee, 10)
        }()) : b.parentNode.removeChild(b))
    }
    function p(a) {
        var b = null ;
        try {
            b = d.getElementById(a)
        } catch (c) {}
        return b
    }
    function T(a, b, c) {
        a.attachEvent(b, c);
        w[w.length] = [a, b, c]
    }
    function z(a) {
        var b = e.pv;
        a = a.split(".");
        a[0] = parseInt(a[0], 10);
        a[1] = parseInt(a[1], 10) || 0;
        a[2] = parseInt(a[2], 10) || 0;
        return b[0] > a[0] || b[0] == a[0] && b[1] > a[1] || b[0] == a[0] && b[1] == a[1] && b[2] >= a[2] ? !0 : 
        !1
    }
    function P(a, b, c, f) {
        if (!e.ie || !e.mac) {
            var g = d.getElementsByTagName("head")[0];
            g && (c = c && "string" == typeof c ? c : "screen",
            f && (K = m = null ),
            m && K == c || (f = d.createElement("style"),
            f.setAttribute("type", "text/css"),
            f.setAttribute("media", c),
            m = g.appendChild(f),
            e.ie && e.win && "undefined" != typeof d.styleSheets && 0 < d.styleSheets.length && (m = d.styleSheets[d.styleSheets.length - 1]),
            K = c),
            e.ie && e.win ? m && "object" == typeof m.addRule && m.addRule(a, b) : m && "undefined" != typeof d.createTextNode && m.appendChild(d.createTextNode(a + 
            " {" + b + "}")))
        }
    }
    function u(a, b) {
        if (Q) {
            var c = b ? "visible" : "hidden";
            t && p(a) ? p(a).style.visibility = c : P("#" + a, "visibility:" + c)
        }
    }
    function R(a) {
        return null  != /[\\\"<>\.;]/.exec(a) && "undefined" != typeof encodeURIComponent ? encodeURIComponent(a) : a
    }
    var n = window, d = document, s = navigator, S = !1, y = [function() {
        S ? U() : D()
    }
    ], r = [], C = [], w = [], x, B, H, N, t = !1, A = !1, m, K, Q = !0, e = function() {
        var a = "undefined" != typeof d.getElementById && "undefined" != typeof d.getElementsByTagName && "undefined" != typeof d.createElement
          , b = s.userAgent.toLowerCase()
          , 
        c = s.platform.toLowerCase()
          , f = c ? /win/.test(c) : /win/.test(b)
          , c = c ? /mac/.test(c) : /mac/.test(b)
          , b = /webkit/.test(b) ? parseFloat(b.replace(/^.*webkit\/(\d+(\.\d+)?).*$/, "$1")) : !1
          , g = !+"\v1"
          , e = [0, 0, 0]
          , h = null ;
        if ("undefined" != typeof s.plugins && "object" == typeof s.plugins["Shockwave Flash"])
            !(h = s.plugins["Shockwave Flash"].description) || "undefined" != typeof s.mimeTypes && s.mimeTypes["application/x-shockwave-flash"] && !s.mimeTypes["application/x-shockwave-flash"].enabledPlugin || (S = !0,
            g = !1,
            h = h.replace(/^.*\s+(\S+\s+\S+$)/, 
            "$1"),
            e[0] = parseInt(h.replace(/^(.*)\..*$/, "$1"), 10),
            e[1] = parseInt(h.replace(/^.*\.(.*)\s.*$/, "$1"), 10),
            e[2] = /[a-zA-Z]/.test(h) ? parseInt(h.replace(/^.*[a-zA-Z]+(.*)$/, "$1"), 10) : 0);
        else if ("undefined" != typeof n.ActiveXObject)
            try {
                var k = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
                k && (h = k.GetVariable("$version")) && (g = !0,
                h = h.split(" ")[1].split(","),
                e = [parseInt(h[0], 10), parseInt(h[1], 10), parseInt(h[2], 10)])
            } catch (l) {}
        return {
            w3: a,
            pv: e,
            wk: b,
            ie: g,
            win: f,
            mac: c
        }
    }();
    (function() {
        e.w3 && (("undefined" != typeof d.readyState && 
        "complete" == d.readyState || "undefined" == typeof d.readyState && (d.getElementsByTagName("body")[0] || d.body)) && v(),
        t || ("undefined" != typeof d.addEventListener && d.addEventListener("DOMContentLoaded", v, !1),
        e.ie && e.win && (d.attachEvent("onreadystatechange", function() {
            "complete" == d.readyState && (d.detachEvent("onreadystatechange", arguments.callee),
            v())
        }),
        n == top && function() {
            if (!t) {
                try {
                    d.documentElement.doScroll("left")
                } catch (a) {
                    setTimeout(arguments.callee, 0);
                    return
                }
                v()
            }
        }()),
        e.wk && function() {
            t || (/loaded|complete/.test(d.readyState) ? 
            v() : setTimeout(arguments.callee, 0))
        }(),
        M(v)))
    })();
    (function() {
        e.ie && e.win && window.attachEvent("onunload", function() {
            for (var a = w.length, b = 0; b < a; b++)
                w[b][0].detachEvent(w[b][1], w[b][2]);
            a = C.length;
            for (b = 0; b < a; b++)
                O(C[b]);
            for (var c in e)
                e[c] = null ;
            e = null ;
            for (var f in swfobject)
                swfobject[f] = null ;
            swfobject = null 
        })
    })();
    return {
        registerObject: function(a, b, c, f) {
            if (e.w3 && a && b) {
                var d = {};
                d.id = a;
                d.swfVersion = b;
                d.expressInstall = c;
                d.callbackFn = f;
                r[r.length] = d;
                u(a, !1)
            } else
                f && f({
                    success: !1,
                    id: a
                })
        },
        getObjectById: function(a) {
            if (e.w3)
                return G(a)
        },
        embedSWF: function(a, b, c, d, g, q, h, k, l, n) {
            var p = {
                success: !1,
                id: b
            };
            e.w3 && !(e.wk && 312 > e.wk) && a && b && c && d && g ? (u(b, !1),
            L(function() {
                c += "";
                d += "";
                var e = {};
                if (l && "object" === typeof l)
                    for (var m in l)
                        e[m] = l[m];
                e.data = a;
                e.width = c;
                e.height = d;
                m = {};
                if (k && "object" === typeof k)
                    for (var r in k)
                        m[r] = k[r];
                if (h && "object" === typeof h)
                    for (var s in h)
                        m.flashvars = "undefined" != typeof m.flashvars ? m.flashvars + ("\x26" + s + "\x3d" + h[s]) : s + "\x3d" + h[s];
                if (z(g))
                    r = J(e, m, b),
                    e.id == b && u(b, !0),
                    p.success = !0,
                    p.ref = r;
                else {
                    if (q && E()) {
                        e.data = q;
                        F(e, 
                        m, b, n);
                        return
                    }
                    u(b, !0)
                }
                n && n(p)
            })) : n && n(p)
        },
        switchOffAutoHideShow: function() {
            Q = !1
        },
        ua: e,
        getFlashPlayerVersion: function() {
            return {
                major: e.pv[0],
                minor: e.pv[1],
                release: e.pv[2]
            }
        },
        hasFlashPlayerVersion: z,
        createSWF: function(a, b, c) {
            if (e.w3)
                return J(a, b, c)
        },
        showExpressInstall: function(a, b, c, d) {
            e.w3 && E() && F(a, b, c, d)
        },
        removeSWF: function(a) {
            e.w3 && O(a)
        },
        createCSS: function(a, b, c, d) {
            e.w3 && P(a, b, c, d)
        },
        addDomLoadEvent: L,
        addLoadEvent: M,
        getQueryParamValue: function(a) {
            var b = d.location.search || d.location.hash;
            if (b) {
                /\?/.test(b) && 
                (b = b.split("?")[1]);
                if (null  == a)
                    return R(b);
                for (var b = b.split("\x26"), c = 0; c < b.length; c++)
                    if (b[c].substring(0, b[c].indexOf("\x3d")) == a)
                        return R(b[c].substring(b[c].indexOf("\x3d") + 1))
            }
            return ""
        },
        expressInstallCallback: function() {
            if (A) {
                var a = p("SWFObjectExprInst");
                a && x && (a.parentNode.replaceChild(x, a),
                B && (u(B, !0),
                e.ie && e.win && (x.style.display = "block")),
                H && H(N));
                A = !1
            }
        }
    }
}();
(function() {
    if (!window.WEB_SOCKET_FORCE_FLASH) {
        if (window.WebSocket)
            return;
        if (window.MozWebSocket) {
            window.WebSocket = MozWebSocket;
            return
        }
    }
    var d;
    d = window.WEB_SOCKET_LOGGER ? WEB_SOCKET_LOGGER : window.console && window.console.log && window.console.error ? window.console : {
        log: function() {},
        error: function() {}
    };
    10 > swfobject.getFlashPlayerVersion().major ? d.error("Flash Player \x3e\x3d 10.0.0 is required.") : ("file:" == location.protocol && d.error("WARNING: web-socket-js doesn't work in file:///... URL unless you set Flash Security Settings properly. Open the page via Web server i.e. http://..."),
    window.WebSocket = function(a, b, c, d, f) {
        var e = this;
        e.__id = WebSocket.__nextId++;
        WebSocket.__instances[e.__id] = e;
        e.readyState = WebSocket.CONNECTING;
        e.bufferedAmount = 0;
        e.__events = {};
        b ? "string" == typeof b && (b = [b]) : b = [];
        e.__createTask = setTimeout(function() {
            WebSocket.__addTask(function() {
                e.__createTask = null ;
                WebSocket.__flash.create(e.__id, a, b, c || null , d || 0, f || null )
            })
        }, 0)
    }
    ,
    WebSocket.prototype.send = function(a) {
        if (this.readyState == WebSocket.CONNECTING)
            throw "INVALID_STATE_ERR: Web Socket connection has not been established";
        a = WebSocket.__flash.send(this.__id, encodeURIComponent(a));
        if (0 > a)
            return !0;
        this.bufferedAmount += a;
        return !1
    }
    ,
    WebSocket.prototype.close = function() {
        this.__createTask ? (clearTimeout(this.__createTask),
        this.__createTask = null ,
        this.readyState = WebSocket.CLOSED) : this.readyState != WebSocket.CLOSED && this.readyState != WebSocket.CLOSING && (this.readyState = WebSocket.CLOSING,
        WebSocket.__flash.close(this.__id))
    }
    ,
    WebSocket.prototype.addEventListener = function(a, b, c) {
        a in this.__events || (this.__events[a] = []);
        this.__events[a].push(b)
    }
    ,
    WebSocket.prototype.removeEventListener = function(a, b, c) {
        if (a in this.__events)
            for (a = this.__events[a],
            c = a.length - 1; 0 <= c; --c)
                if (a[c] === b) {
                    a.splice(c, 1);
                    break
                }
    }
    ,
    WebSocket.prototype.dispatchEvent = function(a) {
        for (var b = this.__events[a.type] || [], c = 0; c < b.length; ++c)
            b[c](a);
        (b = this["on" + a.type]) && b.apply(this, [a])
    }
    ,
    WebSocket.prototype.__handleEvent = function(a) {
        "readyState" in a && (this.readyState = a.readyState);
        "protocol" in a && (this.protocol = a.protocol);
        var b;
        if ("open" == a.type || "error" == a.type)
            b = this.__createSimpleEvent(a.type);
        else if ("close" == a.type)
            b = this.__createSimpleEvent("close"),
            b.wasClean = a.wasClean ? !0 : !1,
            b.code = a.code,
            b.reason = a.reason;
        else if ("message" == a.type)
            a = decodeURIComponent(a.message),
            b = this.__createMessageEvent("message", a);
        else
            throw "unknown event type: " + a.type;
        this.dispatchEvent(b)
    }
    ,
    WebSocket.prototype.__createSimpleEvent = function(a) {
        if (document.createEvent && window.Event) {
            var b = document.createEvent("Event");
            b.initEvent(a, !1, !1);
            return b
        }
        return {
            type: a,
            bubbles: !1,
            cancelable: !1
        }
    }
    ,
    WebSocket.prototype.__createMessageEvent = 
    function(a, b) {
        if (document.createEvent && window.MessageEvent && !window.opera) {
            var c = document.createEvent("MessageEvent");
            c.initMessageEvent("message", !1, !1, b, null , null , window, null );
            return c
        }
        return {
            type: a,
            data: b,
            bubbles: !1,
            cancelable: !1
        }
    }
    ,
    WebSocket.CONNECTING = 0,
    WebSocket.OPEN = 1,
    WebSocket.CLOSING = 2,
    WebSocket.CLOSED = 3,
    WebSocket.__isFlashImplementation = !0,
    WebSocket.__initialized = !1,
    WebSocket.__flash = null ,
    WebSocket.__instances = {},
    WebSocket.__tasks = [],
    WebSocket.__nextId = 0,
    WebSocket.loadFlashPolicyFile = function(a) {
        WebSocket.__addTask(function() {
            WebSocket.__flash.loadManualPolicyFile(a)
        })
    }
    ,
    WebSocket.__initialize = function() {
        if (!WebSocket.__initialized)
            if (WebSocket.__initialized = !0,
            WebSocket.__swfLocation && (window.WEB_SOCKET_SWF_LOCATION = WebSocket.__swfLocation),
            window.WEB_SOCKET_SWF_LOCATION) {
                if (!window.WEB_SOCKET_SUPPRESS_CROSS_DOMAIN_SWF_ERROR && !WEB_SOCKET_SWF_LOCATION.match(/(^|\/)WebSocketMainInsecure\.swf(\?.*)?$/) && WEB_SOCKET_SWF_LOCATION.match(/^\w+:\/\/([^\/]+)/)) {
                    var a = RegExp.$1;
                    location.host != a && d.error("[WebSocket] You must host HTML and WebSocketMain.swf in the same host ('" + 
                    location.host + "' !\x3d '" + a + "'). See also 'How to host HTML file and SWF file in different domains' section in README.md. If you use WebSocketMainInsecure.swf, you can suppress this message by WEB_SOCKET_SUPPRESS_CROSS_DOMAIN_SWF_ERROR \x3d true;")
                }
                a = document.createElement("div");
                a.id = "webSocketContainer";
                a.style.position = "absolute";
                WebSocket.__isFlashLite() ? (a.style.left = "0px",
                a.style.top = "0px") : (a.style.left = "-100px",
                a.style.top = "-100px");
                var b = document.createElement("div");
                b.id = "webSocketFlash";
                a.appendChild(b);
                document.body.appendChild(a);
                swfobject.embedSWF(WEB_SOCKET_SWF_LOCATION, "webSocketFlash", "1", "1", "10.0.0", null , null , {
                    hasPriority: !0,
                    swliveconnect: !0,
                    allowScriptAccess: "always"
                }, null , function(a) {
                    a.success || d.error("[WebSocket] swfobject.embedSWF failed")
                })
            } else
                d.error("[WebSocket] set WEB_SOCKET_SWF_LOCATION to location of WebSocketMain.swf")
    }
    ,
    WebSocket.__onFlashInitialized = function() {
        setTimeout(function() {
            WebSocket.__flash = document.getElementById("webSocketFlash");
            WebSocket.__flash.setCallerUrl(location.href);
            WebSocket.__flash.setDebug(!!window.WEB_SOCKET_DEBUG);
            for (var a = 0; a < WebSocket.__tasks.length; ++a)
                WebSocket.__tasks[a]();
            WebSocket.__tasks = []
        }, 0)
    }
    ,
    WebSocket.__onFlashEvent = function() {
        setTimeout(function() {
            try {
                for (var a = WebSocket.__flash.receiveEvents(), b = 0; b < a.length; ++b)
                    WebSocket.__instances[a[b].webSocketId].__handleEvent(a[b])
            } catch (c) {
                d.error(c)
            }
        }, 0);
        return !0
    }
    ,
    WebSocket.__log = function(a) {
        d.log(decodeURIComponent(a))
    }
    ,
    WebSocket.__error = function(a) {
        d.error(decodeURIComponent(a))
    }
    ,
    WebSocket.__addTask = 
    function(a) {
        WebSocket.__flash ? a() : WebSocket.__tasks.push(a)
    }
    ,
    WebSocket.__isFlashLite = function() {
        if (!window.navigator || !window.navigator.mimeTypes)
            return !1;
        var a = window.navigator.mimeTypes["application/x-shockwave-flash"];
        return a && a.enabledPlugin && a.enabledPlugin.filename ? a.enabledPlugin.filename.match(/flashlite/i) ? !0 : !1 : !1
    }
    ,
    window.WEB_SOCKET_DISABLE_AUTO_INITIALIZATION || swfobject.addDomLoadEvent(function() {
        WebSocket.__initialize()
    }))
})();
+function(e) {
    var d = function(b, a) {
        this.$element = this.hoverState = this.timeout = this.enabled = this.options = this.type = null ;
        this.init("tooltip", b, a)
    }
    ;
    d.VERSION = "3.3.4";
    d.TRANSITION_DURATION = 150;
    d.DEFAULTS = {
        animation: !0,
        placement: "top",
        selector: !1,
        template: '\x3cdiv class\x3d"tooltip" role\x3d"tooltip"\x3e\x3cdiv class\x3d"tooltip-arrow"\x3e\x3c/div\x3e\x3cdiv class\x3d"tooltip-inner"\x3e\x3c/div\x3e\x3c/div\x3e',
        trigger: "hover focus",
        title: "",
        delay: 0,
        html: !1,
        container: !1,
        viewport: {
            selector: "body",
            padding: 0
        }
    };
    d.prototype.init = function(b, a, c) {
        this.enabled = !0;
        this.type = b;
        this.$element = e(a);
        this.options = this.getOptions(c);
        this.$viewport = this.options.viewport && e(this.options.viewport.selector || this.options.viewport);
        if (this.$element[0] instanceof document.constructor && !this.options.selector)
            throw Error("`selector` option must be specified when initializing " + this.type + " on the window.document object!");
        b = this.options.trigger.split(" ");
        for (a = b.length; a--; )
            if (c = b[a],
            "click" == c)
                this.$element.on("click." + this.type, 
                this.options.selector, e.proxy(this.toggle, this));
            else if ("manual" != c) {
                var f = "hover" == c ? "mouseleave" : "focusout";
                this.$element.on(("hover" == c ? "mouseenter" : "focusin") + "." + this.type, this.options.selector, e.proxy(this.enter, this));
                this.$element.on(f + "." + this.type, this.options.selector, e.proxy(this.leave, this))
            }
        this.options.selector ? this._options = e.extend({}, this.options, {
            trigger: "manual",
            selector: ""
        }) : this.fixTitle()
    }
    ;
    d.prototype.getDefaults = function() {
        return d.DEFAULTS
    }
    ;
    d.prototype.getOptions = function(b) {
        b = 
        e.extend({}, this.getDefaults(), this.$element.data(), b);
        b.delay && "number" == typeof b.delay && (b.delay = {
            show: b.delay,
            hide: b.delay
        });
        return b
    }
    ;
    d.prototype.getDelegateOptions = function() {
        var b = {}
          , a = this.getDefaults();
        this._options && e.each(this._options, function(c, f) {
            a[c] != f && (b[c] = f)
        });
        return b
    }
    ;
    d.prototype.enter = function(b) {
        var a = b instanceof this.constructor ? b : e(b.currentTarget).data("bs." + this.type);
        if (a && a.$tip && a.$tip.is(":visible"))
            a.hoverState = "in";
        else {
            a || (a = new this.constructor(b.currentTarget,
            this.getDelegateOptions()),
            e(b.currentTarget).data("bs." + this.type, a));
            clearTimeout(a.timeout);
            a.hoverState = "in";
            if (!a.options.delay || !a.options.delay.show)
                return a.show();
            a.timeout = setTimeout(function() {
                "in" == a.hoverState && a.show()
            }, a.options.delay.show)
        }
    }
    ;
    d.prototype.leave = function(b) {
        var a = b instanceof this.constructor ? b : e(b.currentTarget).data("bs." + this.type);
        a || (a = new this.constructor(b.currentTarget,this.getDelegateOptions()),
        e(b.currentTarget).data("bs." + this.type, a));
        clearTimeout(a.timeout);
        a.hoverState = "out";
        if (!a.options.delay || !a.options.delay.hide)
            return a.hide();
        a.timeout = setTimeout(function() {
            "out" == a.hoverState && a.hide()
        }, a.options.delay.hide)
    }
    ;
    d.prototype.show = function() {
        var b = e.Event("show.bs." + this.type);
        if (this.hasContent() && this.enabled) {
            this.$element.trigger(b);
            var a = e.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]);
            if (!b.isDefaultPrevented() && a) {
                var c = this
                  , b = this.tip()
                  , a = this.getUID(this.type);
                this.setContent();
                b.attr("id", a);
                this.$element.attr("aria-describedby", 
                a);
                this.options.animation && b.addClass("fade");
                var a = "function" == typeof this.options.placement ? this.options.placement.call(this, b[0], this.$element[0]) : this.options.placement
                  , f = /\s?auto?\s?/i
                  , l = f.test(a);
                l && (a = a.replace(f, "") || "top");
                b.detach().css({
                    top: 0,
                    left: 0,
                    display: "block"
                }).addClass(a).data("bs." + this.type, this);
                this.options.container ? b.appendTo(this.options.container) : b.insertAfter(this.$element);
                var f = this.getPosition()
                  , h = b[0].offsetWidth
                  , g = b[0].offsetHeight;
                if (l) {
                    var l = a
                      , k = this.options.container ? 
                    e(this.options.container) : this.$element.parent()
                      , k = this.getPosition(k)
                      , a = "bottom" == a && f.bottom + g > k.bottom ? "top" : "top" == a && f.top - g < k.top ? "bottom" : "right" == a && f.right + h > k.width ? "left" : "left" == a && f.left - h < k.left ? "right" : a;
                    b.removeClass(l).addClass(a)
                }
                f = this.getCalculatedOffset(a, f, h, g);
                this.applyPlacement(f, a);
                a = function() {
                    var a = c.hoverState;
                    c.$element.trigger("shown.bs." + c.type);
                    c.hoverState = null ;
                    "out" == a && c.leave(c)
                }
                ;
                e.support.transition && this.$tip.hasClass("fade") ? b.one("bsTransitionEnd", a).emulateTransitionEnd(d.TRANSITION_DURATION) : 
                a()
            }
        }
    }
    ;
    d.prototype.applyPlacement = function(b, a) {
        var c = this.tip()
          , f = c[0].offsetWidth
          , d = c[0].offsetHeight
          , h = parseInt(c.css("margin-top"), 10)
          , g = parseInt(c.css("margin-left"), 10);
        isNaN(h) && (h = 0);
        isNaN(g) && (g = 0);
        b.top += h;
        b.left += g;
        e.offset.setOffset(c[0], e.extend({
            using: function(a) {
                c.css({
                    top: Math.round(a.top),
                    left: Math.round(a.left)
                })
            }
        }, b), 0);
        c.addClass("in");
        var g = c[0].offsetWidth
          , k = c[0].offsetHeight;
        "top" == a && k != d && (b.top = b.top + d - k);
        var m = this.getViewportAdjustedDelta(a, b, g, k);
        m.left ? b.left += m.left : 
        b.top += m.top;
        f = (h = /top|bottom/.test(a)) ? 2 * m.left - f + g : 2 * m.top - d + k;
        d = h ? "offsetWidth" : "offsetHeight";
        c.offset(b);
        this.replaceArrow(f, c[0][d], h)
    }
    ;
    d.prototype.replaceArrow = function(b, a, c) {
        this.arrow().css(c ? "left" : "top", 50 * (1 - b / a) + "%").css(c ? "top" : "left", "")
    }
    ;
    d.prototype.setContent = function() {
        var b = this.tip()
          , a = this.getTitle();
        b.find(".tooltip-inner")[this.options.html ? "html" : "text"](a);
        b.removeClass("fade in top bottom left right")
    }
    ;
    d.prototype.hide = function(b) {
        function a() {
            "in" != c.hoverState && f.detach();
            c.$element.removeAttr("aria-describedby").trigger("hidden.bs." + c.type);
            b && b()
        }
        var c = this
          , f = e(this.$tip)
          , l = e.Event("hide.bs." + this.type);
        this.$element.trigger(l);
        if (!l.isDefaultPrevented())
            return f.removeClass("in"),
            e.support.transition && f.hasClass("fade") ? f.one("bsTransitionEnd", a).emulateTransitionEnd(d.TRANSITION_DURATION) : a(),
            this.hoverState = null ,
            this
    }
    ;
    d.prototype.fixTitle = function() {
        var b = this.$element;
        (b.attr("title") || "string" != typeof b.attr("data-original-title")) && b.attr("data-original-title", 
        b.attr("title") || "").attr("title", "")
    }
    ;
    d.prototype.hasContent = function() {
        return this.getTitle()
    }
    ;
    d.prototype.getPosition = function(b) {
        b = b || this.$element;
        var a = b[0]
          , c = "BODY" == a.tagName
          , a = a.getBoundingClientRect();
        null  == a.width && (a = e.extend({}, a, {
            width: a.right - a.left,
            height: a.bottom - a.top
        }));
        var d = c ? {
            top: 0,
            left: 0
        } : b.offset();
        b = {
            scroll: c ? document.documentElement.scrollTop || document.body.scrollTop : b.scrollTop()
        };
        c = c ? {
            width: e(window).width(),
            height: e(window).height()
        } : null ;
        return e.extend({}, a, b, c, d)
    }
    ;
    d.prototype.getCalculatedOffset = function(b, a, c, d) {
        return "bottom" == b ? {
            top: a.top + a.height,
            left: a.left + a.width / 2 - c / 2
        } : "top" == b ? {
            top: a.top - d,
            left: a.left + a.width / 2 - c / 2
        } : "left" == b ? {
            top: a.top + a.height / 2 - d / 2,
            left: a.left - c
        } : {
            top: a.top + a.height / 2 - d / 2,
            left: a.left + a.width
        }
    }
    ;
    d.prototype.getViewportAdjustedDelta = function(b, a, c, d) {
        var e = {
            top: 0,
            left: 0
        };
        if (!this.$viewport)
            return e;
        var h = this.options.viewport && this.options.viewport.padding || 0
          , g = this.getPosition(this.$viewport);
        /right|left/.test(b) ? (c = a.top - h - g.scroll,
        a = a.top + h - g.scroll + d,
        c < g.top ? e.top = g.top - c : a > g.top + g.height && (e.top = g.top + g.height - a)) : (d = a.left - h,
        a = a.left + h + c,
        d < g.left ? e.left = g.left - d : a > g.width && (e.left = g.left + g.width - a));
        return e
    }
    ;
    d.prototype.getTitle = function() {
        var b = this.$element
          , a = this.options;
        return b.attr("data-original-title") || ("function" == typeof a.title ? a.title.call(b[0]) : a.title)
    }
    ;
    d.prototype.getUID = function(b) {
        do
            b += ~~(1E6 * Math.random());
        while (document.getElementById(b));return b
    }
    ;
    d.prototype.tip = function() {
        return this.$tip = this.$tip || 
        e(this.options.template)
    }
    ;
    d.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
    }
    ;
    d.prototype.enable = function() {
        this.enabled = !0
    }
    ;
    d.prototype.disable = function() {
        this.enabled = !1
    }
    ;
    d.prototype.toggleEnabled = function() {
        this.enabled = !this.enabled
    }
    ;
    d.prototype.toggle = function(b) {
        var a = this;
        b && (a = e(b.currentTarget).data("bs." + this.type),
        a || (a = new this.constructor(b.currentTarget,this.getDelegateOptions()),
        e(b.currentTarget).data("bs." + this.type, a)));
        a.tip().hasClass("in") ? 
        a.leave(a) : a.enter(a)
    }
    ;
    d.prototype.destroy = function() {
        var b = this;
        clearTimeout(this.timeout);
        this.hide(function() {
            b.$element.off("." + b.type).removeData("bs." + b.type)
        })
    }
    ;
    var n = e.fn.tooltip;
    e.fn.tooltip = function(b) {
        return this.each(function() {
            var a = e(this)
              , c = a.data("bs.tooltip")
              , f = "object" == typeof b && b;
            if (c || !/destroy|hide/.test(b))
                if (c || a.data("bs.tooltip", c = new d(this,f)),
                "string" == typeof b)
                    c[b]()
        })
    }
    ;
    e.fn.tooltip.Constructor = d;
    e.fn.tooltip.noConflict = function() {
        e.fn.tooltip = n;
        return this
    }
}(jQuery);
