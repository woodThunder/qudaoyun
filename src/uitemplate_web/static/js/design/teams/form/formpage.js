define("teams/form/formpage", 
[
    "teams/core/page",
    "teams/form/formwriteview",
    "teams/form/formcloudview",
    "teams/formstat/formstatdatatableview",
],
function() {
    var q = require("teams/core/page");
    var 
    a = require("teams/form/formwriteview"),
    s = require("teams/form/formcloudview"),
    r = require("teams/formstat/formstatdatatableview"),
    h = q.extend({
        initialize: function(a) {
            this.type = a.type ? a.type: "write";
            this.formId = a.formId;
            this.pageKey = "form#" + this.type /*+ this.userId + this.formId*/;
            this.reloadPage = a.reloadPage;
            this.options = a;
            this.template = "form.formpage";
            this.pageActive = "form";
            this.el = "#mainContainer";
        },
        delegateEvents: function() {
            // $(this.el)
        },
        render: function() {
            var h = this,
            n = $(h.el);
            h.initLayout({
            });
            switch (h.type) {
                case 'form-manager':
                    alert(h.type + '注释了');
                    break;
                case 'cloud':
                    h.mainView = new s({
                        // id: h.userId,
                        el: h.el + " #j_formContent",
                        module: "biaoge"
                    })
                    break;
                case 'monitor':
                case 'monitorList':
                    alert(h.type + '注释了');
                    // h.mainView = new l
                    break;
                case 'monitorChart':
                    alert(h.type + '注释了');
                    // h.mainView = new m
                    break;
                case 'label':
                    alert(h.type + '注释了');
                    break;
                case 'personal':
                    alert(h.type + '注释了');
                    break;
                case 'company':
                    alert(h.type + '注释了');
                    break;
                case 'employee':
                    alert(h.type + '注释了');
                    break;
                case 'subordinate':
                    alert(h.type + '注释了');
                    break;
                case 'write':
                    h.mainView = new a({
                        // userId: h.userId,
                        container: h.el + " #j_formContent",
                        type: h.type
                    })
                    n.find(".j_form_write").addClass("active")
                    break;
                case 'usertempList':
                    h.mainView = new a({
                        // userId: h.userId,
                        container: h.el + " #j_formContent",
                        type: h.type
                    })
                    n.find(".j_form_usertempList").addClass("active")
                    break;    
                case 'mywrite':
                case 'employeewrite':
                case 'companywrite':
                    alert(h.type + '注释了');
                    break;
                case 'trashbin':
                    alert(h.type + '注释了');
                    // break;
                case 'todo':
                case 'finshed':
                case 'subordinates':
                    alert(h.type + '注释了');
                    break;
                case 'formstat':
                    h.mainView = new r({
                        formId: h.formId,
                        container: h.el + " #j_formContent"
                    })
                    n.find(".j_form_write").addClass("active")
                    break;
                case 'statreport':
                    alert(h.type + '注释了');
                    break;
                case 'statfield':
                    alert(h.type + '注释了');
                    break;
                default:
                    break;
            }
            h._render(".j_form-" + h.type);
        },
        renderSubview: function() {},
        renderType: function() {
        }
    });
    return h
});
