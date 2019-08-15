define("teams/form/formwriteview", [
    "teams/utils",
    "teams/form/formmanagemodel",
    "teams/form/formoperationview",
    "teams/form/formcolor"
],
function() {
    var f = require("teams/utils"),
    d = require("teams/form/formmanagemodel"),
    c = require("teams/form/formoperationview");
    var  e = require("teams/form/formcolor"),
    h = Backbone.View.extend({
        initialize: function(a) {
            this.userId = a.userId;
            this.el = a.container ? a.container: "#j_workflowcenter";
            this.type = a.type;
            a.type == "write" && (this.operationname = "复制");
            a.type == "usertempList" && (this.operationname = "定制");
            this.tpl = f.template("form.formwrite",{operationname:this.operationname});
            this.model = new d(a);
            this.pageModule = "biaoge"
        },
        delegateEvents: function() {
            var d = this,
            e = d.model,
            h = $(d.tpl),
            n = $(d.el);
            $("body").on("click.FormWriteView", ".goto-top",
            function(a) {
                f.gotoTop(".js_forms." + d.activeTab)
            });
            n.on("click.FormWriteView", ".js_copyForm",
            function() {
                var a = $(this).attr("formId"),
                b = $(this).parents(".js_formListBox").find("#form-title").text(),
                e,
                g = $(this).attr("osp");
                "personal" == g ? e = !1 : "company" == g && (e = !0);
                var l = {};
                l.formId = a;
                l.module = d.pageModule;
                l.el = "#copy-form";
                l.formTitle = b;
                l.ownership = g;
                l.tpl = f.template("flow.formcopy", {
                    userId: d.userId,
                    operationtype: "复制",
                    admin: e
                });
                l.copyCallback = function(a) {
                    var b = n.find(".js_formcategory .j_formlist .js_formboxli[formid='"+a.form.sys_pk_temp+"']").closest(".j_formlist"),
                    c = h.siblings("#formitems." + d.activeTab).find(".js_formitemsli").clone();
                    d.renderPersonalForm(a.form, b, c, "prepend",a.form.temptype);
                };
                d.formoperationView = new c(l);
                d.formoperationView.render()
            });
            // 预览
            n.on("click.FormWriteView", ".js_formPreview",
            function() {
                var a = $(this).attr("formId");
                window.open("/iform/rt_ctr/open?pk_bo=" + a)
            });
            // 重命名表单
            n.on("click.FormWriteView", ".js_renameForm",
            function() {
                var a = $(this).attr("formId");
                if (0 == $(this).parents(".js_formListBox").find('input[name="formTitle"]').length) {
                    var a = $('<input type="text" name="formTitle" style="width:100%" class="input-formTitle form-control" maxLength="50" formId=' + a + ">"),
                    b = $(this).parents(".js_formListBox").find("#form-title").text();
                    $(this).parents(".js_formListBox").find("#form-title").hide();
                    $(this).parents(".js_formListBox").find("#form-title").after(a);
                    $(this).parents(".js_formListBox").find('input[name="formTitle"]').focus().val(b)
                }
            });
            var keyCode = 0;
            // 重命名表单
            n.on("blur.FormWriteView", 'input[name="formTitle"]',
            function(event) {
                var a = $(this).attr("formId"),
                b = $.trim($(this).val()),
                c = this;
                if ("" == b || b == $(c).prev().text() || 27 == keyCode) {
                    $(c).prev().show()
                    $(c).remove()
                    keyCode = 0
                } else {
                    var d = {
                        form: {}
                    };
                    d.form.id = a;
                    d.form.name = $.trim(b);
                    e.renameForm(d, function(a) {
                        if (a && a.message) {
                        	$(c).prev().text(b).attr("title", b).show();
                            $(c).remove();
                            f.notify(a.message);
                        } else {
                            $(c).prev().text(b).attr("title", b).show();
                            $(c).remove();
                            f.notify("模板名称修改成功");
                        }
                    })
                }
            });
            // 重命名表单
            n.on("keydown.FormWriteView", 'input[name="formTitle"]',
            function(a) {
                keyCode = a.keyCode;
                if (keyCode == 27 || keyCode == 13) {
                    $(this).trigger("blur.FormWriteView")
                }
            });
            //启用功能
            n.on("click.FormWriteView", '.js_enableForm',
                    function(event) {
		            	var tenantid = ""; //123
		                //从cookie里面取租户id
		                if(document.cookie.split("tenantid=").length>1){
		                	document.cookie.split("tenantid=")[1].split(";") && (tenantid = document.cookie.split("tenantid=")[1].split(";")[0]);
		                }
                        var a = $(this).attr("formId"),
                        funnode = $(this).attr("funnode"),
                        nexuskey = $(this).attr("nexuskey"),
                        tenant_id = tenantid,
                        b = $.trim($(this).val()),
                        c = this;
                        var d = {
                            form: {}
                        };
                        d.form.id = a;
                        d.form.name = $.trim(b);
                        d.form.funnode = funnode;
                        d.form.nexuskey = nexuskey;
                        d.form.tenant_id = tenant_id;
                        e.enableForm(d, function(a) {
                            if (a && a.message) {
                            	$(c).closest(".js_formcategory").find("span.enablebtn").remove();
                            	$(c).closest(".js_formcategory").find("div[formid="+d.form.id+"]").find("a.j_fillCount ").append("<span class='enablebtn' style='color:blue;'>（启用）</span>");
                                f.notify(a.message);
                            } else {
                            	$(c).closest(".js_formcategory").find("span.enablebtn").remove();
                            	$(c).closest(".js_formcategory").find("div[formid="+d.form.id+"]").find("a.j_fillCount ").append("<span class='enablebtn' style='color:blue;'>（启用）</span>");
                                f.notify("模板启用成功");
                            }
                        });
            });
            
            //升级
            n.on("click.FormWriteView", '.js_upgradeForm',
                    function(event) {
                var tenantid = ""; //123
		        //从cookie里面取租户id
		        if(document.cookie.split("tenantid=").length>1){
		              document.cookie.split("tenantid=")[1].split(";") && (tenantid = document.cookie.split("tenantid=")[1].split(";")[0]);
		        }
                var a = $(this).attr("formId"),
                b = $.trim($(this).val()),
                c = this;
                var d = {
                    form: {}
                };
                d.form.id = a;
            	e.upgradeForm(d, function(a){
                    if(a && a.upgradeFlag==="update"){
                        $(c).closest(".js_formcategory").find("div[formid="+d.form.id+"]").find(".js_restoreForm").show();
                        f.notify("模板升级成功");
                    }else{
                        f.notify("模板未升级");
                    }
            		 
            	});
            });
            
            //还原
            n.on("click.FormWriteView", '.js_restoreForm',
                    function(event) {
                var tenantid = ""; //123
		        //从cookie里面取租户id
		        if(document.cookie.split("tenantid=").length>1){
		              document.cookie.split("tenantid=")[1].split(";") && (tenantid = document.cookie.split("tenantid=")[1].split(";")[0]);
		        }
                var a = $(this).attr("formId"),
                b = $.trim($(this).val()),
                c = this;
                var d = {
                    form: {}
                };
                d.form.id = a;
            	e.restoreForm(d, function(a){
                   $(c).closest(".js_formcategory").find("div[formid="+d.form.id+"]").find(".js_restoreForm").hide();
           		   f.notify("模板还原成功");
            	});
            });
            
            // 新建表单
            n.off("click.FormWriteView", ".js_buildNewForm").on("click.FormWriteView", ".js_buildNewForm",
            function() {
                var a = {};
                a.module = d.pageModule;
                a.el = "#build-newform";
                a.tpl = f.template("biaoge.formnew");
                a.ownership = "personal";
                a.formwrite = "formwrite";
                a.saveCallback = function(a) {
                    d.render()
                };
                a.formCategories = []
                $(d.el).find("#custom-category .js_formcategory." + d.activeTab).each(function() {
                    var c = $(this).find("#cate-name .js_categoryname")
                    a.formCategories.push({
                        id: c.attr("id"),
                        name: c.text()
                    })
                })
                d.formoperationView = new c(a);
                d.formoperationView.render()
            });
            
            // 新建分组
            n.on("click.FormWriteView", ".js_newcategory",
            function(a) {
                a = h.siblings(".js_formcategory." + d.activeTab).clone().attr("id", "newCateId");
                a.find(".j_formcateInfo").remove();
                var b = $('<input type="text" class="form-control js_createcategory" placeholder="分类名称(ESC取消，回车键保存)" maxLength="20">');
                a.find(".js_categoryname").append(b);
                var c = n.find(".js_forms." + d.activeTab + " .js_form-list #custom-category #newCateId");
                1 == c.length ? c.find(".js_createcategory").focus() : (n.find(".js_forms." + d.activeTab + " .js_form-list #custom-category").prepend(a), b.focus())
            });
            // 新建分组
            n.on("blur.FormWriteView", ".js_createcategory",
            function(a) {
                $(this);
                var b = $.trim($(this).val());
                a = $(this).attr("placeholder");
                var c = $(this).parent(),
                g = $(this).parents(".js_formcategory." + d.activeTab);
                b == a || "" == b ? $(".js_forms." + d.activeTab + " .js_form-list #newCateId").remove() : e.createCategory({
                    "formCategory": {
                        "name": b
                    }
                },
                function(a) {
                    a.message ? f.notify(a.message) : (
                        c.empty().text(b).next().text("(0)"),
                        c.attr("id", a.formCategory.id),
                        g.removeAttr("id"),
                        f.notify("新建表单分类成功"),
                        d.drag()
                    )
                })
            });
            // 新建分组
            n.on("keydown.FormWriteView", ".js_createcategory",
            function(a) {
                a = a.keyCode;
                var b = $.trim($(this).val());
                27 == a ? ($(this).val(""), $(this).parents(".js_formcategory." + d.activeTab).remove()) : 13 == a && ("" == b ? f.notify("请输入表单分类名称") : $(this).trigger("blur.FormWriteView"))
            });
            
            // 修改分组名
            n.on("keydown.FormWriteView", ".js_updatecatename",
            function(a, b) {
                var c = $(this),
                g = $.trim($(this).val()),
                h = $(this).next().text(),
                l = $(this).next().attr("id"),
                m = $(this).next().attr("type"),
                p = {
                    formCategory: {}
                },
                n = a.keyCode || b;
                27 == n ? (
                    $(this).next().show(),
                    c.val(h)/*,
                    $(this).remove()*/
                ) : 13 == n && (
                    "" == g ? 
                        f.notify("请输入表单分类名称") : 
                        g != h ? (
                            p.formCategory.id = l,
                            p.formCategory.name = g,
                            e.updateCategoryName(p, function(a) {
                                a.message ? 
                                    f.notify(a.message) :
                                    (
                                        f.notify("表单分类名称修改成功"),
                                        c.next().text(g).show(),
                                        c.remove()
                                    )
                            })
                        ) : (
                            $(this).next().show(),
                            $(this).remove()
                        )
                    )
            });
            // 修改分组名
            n.on("blur.FormWriteView", ".js_updatecatename",
            function(a) {
                a = $.trim($(this).val());
                var b = $(this).next().text();
                a === b ? ($(this).next().show(), $(this).remove()) : $(this).trigger("keydown.FormWriteView", 13)
            });
            // 分组标题提示信息
            n.on("mouseenter.FormWriteView", ".j_form-category",
            function(a) { (null == $(this).parents(".js_cloudforms").get(0)/* || d.isWeaver*/) && $(this).find(".j_formcateInfo").removeClass("hide")
            });
            // 分组标题提示信息
            n.on("mouseleave.FormWriteView", ".form-category-hd",
            function(a) { (null == $(this).parents(".js_cloudforms").get(0)/* || d.isWeaver*/) && $(this).find(".j_formcateInfo").addClass("hide")
            });
            
            // 编辑表单
            n.on("click.FormWriteView", ".js_editForm",
            function() {
                var a = $(this).attr("formId");
                var b = $(this).attr("temptype");
                window.open("/uitemplate_web/uitemplate_ctr/uitemplate_design_ctr/design/?pk_temp=" + a+"&temptype="+b)
            });
            
            // 删除表单
            n.on("click.FormWriteView", ".js_deleteForm",
            function() {
                    var a = this,
                    b = $(this).attr("formId"),
                    g = {
                        form: {
                            id: b
                        }
                    };
                    d.deleteForm(a, g, c);
            });

        },
        
        // 没有表单的时候显示提示信息
        ifShowIntro: function(a) {
            var b = this;
            if (a) {
                 $("#noformsShow").remove()
            } else {
                $(".j_biaoge .js_form-list").show()//,
                 var d = $(b.tpl).siblings("#noform-clone").find("#noformsShow").clone();
                $(".j_biaoge .js_form-list").append(d);
            }
        },
        render: function() {
            var a = $(this.el),
            b = this.tpl,
            b = $(b).siblings("#formmanage-container");
            a.html(b.html());
            this.rendertab();
        },
        getPageModule: function() {
            this.activeTab = "j_" + this.pageModule
        },
        rendertab: function() {
            var a = $(this.el);
            this.getPageModule();
            f.layout(this.el + " .js_forms." + this.activeTab);
            a.find(".js_forms." + this.activeTab + " #formlist-loading").show();
            a.find(".js_forms.j_" + this.pageModule).show();
            a.find(".js_formtab li[module='" + this.pageModule + "']").attr("data-load", "true").addClass("active");
            // this.isAdmin || a.find(".j_formIntroduction .js_newcategory").remove();
            this.renderPersonalForms({
                module: "biaoge"
            });
            $(".js_forms." + this.activeTab + " .js_form-list").removeClass("hide")
        },
        loadCateAndForms: function(a, b, c) {
            // $(this.el);
            c = this.tpl;
            var d = b.find("#custom-category");
            b = b.find("#other-category");
            a = a.formCategories;
            var temptype = "";
            var formsval = "";
            for(var i in a){
            	if(a[i].type=="usertempList"){
            		temptype = "user";
            		var f = a[i],
            		g = f.name,
            		h = f.id,
            		l = f.sort,
            		m = f.forms,
            		n = m.length,
            		q = f.type,
            		f = $(c).siblings(".js_formcategory." + this.activeTab);
            		f.find(".form-category-hd").addClass("tempCard");
            		"其他" == g ? f.addClass("js_other").find(".j_form-category").removeClass("j_form-category") : f.find(".js_categoryname").attr("id", h).attr("sort", l).attr("type", q);
            		f.find(".js_categoryname").text(g);
            		f.find(".js_categoryname").attr("title", g);
            		f.find(".form-acount").text("(" + n + ")");
            		f.hasClass("js_other") ? b.append(f) : d.append(f);
            		formsval = a[i].forms;
            	}else{
            		temptype = "sys";
            		formsval = [a[i]];
            	}
            	for (var e in formsval) {
                    var f = formsval[e],
                    //var f = formsval,
                    g = f.name,
                    h = f.id,
                    l = f.sort,
                    m = f.forms,
                    n = m.length,
                    q = f.type,
                    f = $(c).siblings(".js_formcategory." + this.activeTab);
                    "其他" == g ? f.addClass("js_other").find(".j_form-category").removeClass("j_form-category") : f.find(".js_categoryname").attr("id", h).attr("sort", l).attr("type", q);
                    f.find(".js_categoryname").text(g);
                    f.find(".js_categoryname").attr("title", g);
                    f.find(".form-acount").text("(" + n + ")");
                    for (var F in m){
    	                g = m[F];
    	                h = f.find(".j_formlist");
    	                l = $(c).siblings("#formitems." + this.activeTab).find(".js_formitemsli").clone();
    	                this.renderPersonalForm(g, h, l,"",temptype);
                    }
                    f.hasClass("js_other") ? b.append(f) : d.append(f);
                    this.buildSerialNumber(f.find(".j_formlist"))
                }
            }
        },
        renderPersonalForms: function(a) {
            var b = this,
            c = b.model,
            d = $(b.el);
            a.module = "biaoge";
            a.tenant_id="";
            var tenantid = ""; //123
            //从cookie里面取租户id
            if(document.cookie.split("tenantid=").length>1){
            	document.cookie.split("tenantid=")[1].split(";") && (tenantid = document.cookie.split("tenantid=")[1].split(";")[0]);
            }
            this.type == "usertempList" && (a.tenant_id=tenantid);
            this.type == "usertempList" && (a.type="user");
            this.type == "usertempList" && $(".aside").find("li[data-type='form-write']").hide();
            this.type == "write" && $(".aside").find("li[data-type='form-usertempList']").hide();
            this.type == "write" && (a.type="sys");
            c.queryMyForms(a, function(a) {
                var e = d.find("#formmanagelist .js_forms." + b.activeTab + " .js_form-list");
                b.loadCateAndForms(a, e, "personal");
                "j_biaoge" == b.activeTab && (a = d.find(".js_forms.j_biaoge .js_formitemsli").length, b.ifShowIntro(a));
                d.find(".js_forms." + b.activeTab + " #formlist-loading").hide();
            })
        },
        renderBiageForm: function(a, b, c, d,w) {
            c = this.tpl;
            // $(this.el);
            var f = a.name,
            // g = a.describe,
            h = a.id || a.pk_temp,
            l = a.newFillCount,
            funnode = a.funnode,
            nexuskey = a.nexuskey,
            rootname = a.rootsysname,
            c = $(c).siblings("#formitems." + this.activeTab).find(".js_formitemsli");
            c.find("#form-number").css("background-color", e.getRandomColor());
            c.attr("formid", h).attr("sort", a.sort);
            c.attr("formid", h);
            c.attr("id", h);
            c.find(".js_formPreview").attr("formId", h);
            c.find("#form-title").text(f);
            c.find("#form-title").attr("title", f);
            c.find("#form-title").attr("data-id", h);
            c.find("#form-title").attr("userId", this.userId);
            c.find(".js_formListBox").attr("formId", h);
            c.find(".js_enableForm").attr("formId", h).attr("funnode",funnode).attr("nexuskey",nexuskey);
            c.find(".js_renameForm").attr("formId", h);
            //wujd 升级和还原 添加formId属性
            c.find(".js_upgradeForm").attr("formId", h);
            c.find(".js_restoreForm").attr("formId", h);
            c.find(".js_editForm").attr("formId", h).attr("tempType",w);
            var isdefault = "";
            var sysusername = "";
            a.isdefault=="Y" && (isdefault="<span class='enablebtn' style='color:#0070FE;float: right;'>（启用）</span>");
            rootname && (sysusername = "<a class='ellipsis nameFrom' title='用户模板——来源于"+rootname+"' style='color:#F3A50F;width: 199px;'>用户模板——来源于"+rootname+"</a>");
            w=="user" && a.sysflag=="Y" && c.find(".j_fillCount").html("系统模板"+isdefault);
            w=="user" && a.sysflag=="N" && c.find(".j_fillCount").html(sysusername+isdefault);
            w=="user" && a.sysflag=="Y" && c.find(".js_editForm span").text("浏览");
            w=="sys" && c.find("a.js_enableForm").remove();
            // c.find(".js_shareForm").attr("formId", h);
            c.find(".js_copyForm").attr("formId", h).attr("tempType",w).attr("osp", a.ownership).attr("funnode",funnode).attr("nexuskey",nexuskey);
            c.find(".js_deleteForm").attr("formId", h);
            //wujd 去除删除按钮
            (w=="user" && a.sysflag=="Y") && c.find(".js_deleteForm").remove();
            //wujd 只有自定义才有升级、还原功能,并且只能显示一个
            (w=="sys" || (w=="user" && a.sysflag=="Y")) && c.find(".js_upgradeForm").remove();
            (w=="sys" || (w=="user" && a.sysflag=="Y") || a.upgradestate=="Y") && c.find(".js_restoreForm").hide();
            "prepend" == d ? b.prepend(c) : b.append(c);
            this.buildSerialNumber(b)
        },
        renderPersonalForm: function(a, b, c, d,e) {
            this.renderBiageForm(a, b, c, d,e)
        },
       
        deleteForm: function(a, b, c, d) {
            var e = this,
            g = e.model,
            h = $(a).parents(".j_formlist");
            // "cloud" === c && (h = $(a).parents("#cloudformul"));
            var l = function(c) {
                c && g.deleteForm(b,
                function(b) {
                    if (b.message) {
                    	$(a).parents("li").remove()
                        f.notify(b.message)
                        e.buildCount(h)
                        e.buildSerialNumber(h)
                    } else {
                        $(a).parents("li").remove()
                        f.notify("模板删除成功")
                        e.buildCount(h)
                        e.buildSerialNumber(h)
                    }
                })
            };
            l(true)
        },
        buildSerialNumber: function(a) {
            this.buildCount(a);
            a.find(".js_formitemsli").each(function(a) {
                $(this).find("#form-number").text(a + 1)
            })
        },
        buildCount: function(a) {
            var b = a.parents(".js_formcategory." + this.activeTab).find(".js_formitemsli").length;
            a.parents(".js_formcategory." + this.activeTab).find(".js_formcount").text("(" + b + ")")
        },
        sortCategory: function(a) {
            a.find(".js_formcategory." + this.activeTab).each(function(a) {
                $(this).find("#cate-name .js_categoryname").attr("sort", a + 1)
            })
        },     
        remove: function() {
            $(this.el).off(".FormWriteView");
            this.formoperationView && (this.formoperationView.remove(), this.formoperationView = null);
            this.header && (this.header.remove(), this.header = null)
        }
        
    });
    return h
});
