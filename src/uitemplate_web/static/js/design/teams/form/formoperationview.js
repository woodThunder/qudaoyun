define("teams/form/formoperationview", ["teams/utils", "teams/form/formmanagemodel"],
function() {
    var f = require("teams/utils");
    var d = require("teams/form/formmanagemodel"),
    h = Backbone.View.extend({
        initialize: function(c) {
            this.param = c;
            this.model = new d(c);
            // this.userId = TEAMS.currentUser.id;
            this.tpl = c.tpl;
            this.saveCallback = c.saveCallback;
            this.el = c.el;
            this.ownership = c.ownership;
            this.formwrite = c.formwrite;
            this.formTitle = c.formTitle;
            this.copyCallback = c.copyCallback;
            // this.isAdmin = TEAMS.currentUser.admin;
            this.formCategories = c.formCategories;
            $("body").append(this.tpl);
            this.initElement()
        },
        initElement: function() {
            var c = $(this.el);
            // "t7akvdnf84" == TEAMS.currentTenant.tenantKey ? 
            //     c.find(".js_formowner .js_cloudform").removeClass("hide") :
                c.find(".js_formowner .js_cloudform").remove();
            "cloud" == this.ownership ? c.find(".js_formowner").parent().addClass("hide") : c.find(".js_formowner .js_cloudform").addClass("hide")
        },
        delegateEvents: function() {
            var c = this,
            b = c.model,
            a = $(c.el),
            d = c.el;
            a.on("hidden.bs.modal",
            function(a) {
                c.remove()
            });
            /*a.on("keydown.FormoperationView", "#form-name",
            function(b) {
                13 === b.keyCode && (a.find("#form-btn-save").trigger("click"), b.preventDefault())
            });
            a.on("keydown.FormoperationView", "#form-name-copy",
            function(b) {
                13 === b.keyCode && (a.find("#form-btn-copy").trigger("click"), b.preventDefault())
            });*/
            a.on("click.FormoperationView", "#form-btn-cancel",
            function() {
                a.modal("hide")
            });
            a.on("shown.bs.modal",
            function() {
                "#build-newform" == d ? a.find("#form-name").focus() : a.find("#form-name-copy").focus().val(c.formTitle)
            });
            a.on("click.BuildnewformView", "#biaoge-form-btn-save",
            function() {
                var d = $.trim(a.find(".js_forminfo #form-name").val()),
                e = $.trim(a.find(".js_forminfo #form-describe").val()),
                n = {
                    form: {
                        formCategory: {},
                        operator: {}
                    }
                };
                if ("" == $.trim(d)) f.notify("请输入模板名称");
                else {
                    var p = a.find(".js_company_select").val();
                    n.form.name = d;
                    n.form.describe = e;
                    "其他" != p && (n.form.formCategory.id = p);
                    n.form.operator.tenant_id='';
                    n.form.operator.user_id='';
                    n.form.operator.id='';
                    var r = null;
                    b.saveForm(n, function(b) {
                        if (b.message) {
                            f.notify(b.message)
                        } else {
                            c.saveCallback && c.saveCallback(b)
                            f.notify("模板保存成功")
                            a.modal("hide")
                            window.open("/uitemplate_web/uitemplate_ctr/uitemplate_design_ctr/design/?pk_temp=" + b.pk_bo)
                        }
                    });
                }
            });
            a.on("click.FormoperationView", "#form-btn-copy",
            function() {
                var d = {
                    form: {}
                },
                e = $.trim(a.find(".js_forminfo #form-name-copy").val());
                var ischecked = a.find(".js_forminfo #form-type-check").is(':checked');
                if(ischecked){
                	d.form.ischecked = "yes";
                }else{
                	d.form.ischecked = "no";
                }
                if ("" == $.trim(e)) {
                    f.notify("请输入模板名称")
                } else {
                    // h = "personal"
                    d.form.name = e;
                    d.form.id = c.param.formId;
                    var tempType = $(".js_formcategory .js_copyForm[formid='"+c.param.formId+"']").attr("tempType");
                    var tenantid = ""; //123
                    //从cookie里面取租户id
                    if(document.cookie.split("tenantid=").length>1){
                    	document.cookie.split("tenantid=")[1].split(";") && (tenantid = document.cookie.split("tenantid=")[1].split(";")[0]);
                    }
                    tempType=="user" && (d.form.tenant_id = tenantid); //租户id
                    d.form.funnode = $(".js_formcategory .js_copyForm[formid='"+c.param.formId+"']").attr("funnode");
                    d.form.nexuskey = $(".js_formcategory .js_copyForm[formid='"+c.param.formId+"']").attr("nexuskey");
                    d.form.tempType = tempType;
                    // b.checkFormName(d, function(e) {
                    b.copyForm(d, function(e) {
                        //e = e.message;
                        if (e.message) {
                            f.notify(e.message)
                        } else {
                            c.copyCallback && c.copyCallback(e);
                            a.modal("hide");
                            f.notify("模板复制成功");
                        }
                    })
                }
            });
            a.on("hidden.bs.modal",
            function(a) {
                c.remove()
            })
        },
        render: function() {
            var c = $(this.el);
            c.modal();
            if (this.formwrite) {
                c.find(".js_personal_select").remove()
                c.find(".js_personal_label").remove()
                for (var b = 0, l = this.formCategories.length; b < l; b++) {
                    var d = this.formCategories[b];
                    c.find(".js_company_select").append('<option value="' + d.id + '">' + d.name + "</option>")
                }
                c.find(".js_company_select").append('<option selected="selected">其他</option>')
            }
            c.find("#form-describe").autosize();
        },
        remove: function() {
            $(this.el).off(".FormoperationView");
            $(this.el).remove()
        }
    });
    return h
});
