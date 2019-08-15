'use strict';

define(function(require){
    var uitemplateCtr = {};
    uitemplateCtr.extendViewModel = function(viewModel, params, app) {
        viewModel.headform_isEditable(false);
        viewModel.headTitleOper(false) ;
        viewModel.headBtnOper(false);
    }
    uitemplateCtr.beforeInit = function(app,viewModel,templateModel){
        //注册表体行编辑按钮
        var params = {};
        initData(viewModel,params,app,templateModel)
    }

    function initData(viewModel,params,app,templateModel,id){
        uitemplateCtr.app =app;
        uitemplateCtr.viewModel = viewModel;
        uitemplateCtr.templateModel = templateModel;
        //初始化数据
        var param = {};
        param.templateInfo = viewModel.getTemplateInfo();
        var id=window.orgid;
        $.ajax({
            type: "get",
            url: window.baseUrl + '/organization/getById/'+id,
            data:param,
            async:true,
            dataType: "json" ,
            success: function(result) {
                //清理数据
                //设置数据
                templateModel.init(result,"");
            }
        });
    }

    uitemplateCtr.init = function(viewModel,params,app,templateModel){
        var id =window.orgid;
        if(id&&id!="null"){//如果有id说明是编辑
            initData(viewModel,params,app,templateModel,id);
        }else{
            var dts = app.getDataTables();
            for(var key in dts){
                var dt = dts[key];
                dt.createEmptyRow();
                dt.setRowSelect(0);
            }
        }

    }

    uitemplateCtr.save = function(app, viewModel,templateModel,datatableId){
        //添加验证
        var checked = uiCompValidate(app,datatableId);
        //特殊处理图片必输字段
        $('.validateimage').each(function(index, ele){
            var fieldId = ele.getAttribute('fieldid');
            var dtid = ele.getAttribute('datatableid');
            var required = app.getDataTable(dtid).getMeta(fieldId).required;
            if(required && required=='true'){//必输
                var vrow = app.getDataTable(dtid).getCurrentRow();
                if(vrow && vrow.data[fieldId].value == undefined){
                    checked = false;
                }
            }
        })
        if(!checked){
            return false;
        }
        //新增一个空白行
        var dt = app.getDataTable(datatableId);
        var cr = dt.getCurrentRow();

        var data = dt.meta;
        for(var field in data){
            if(typeof data[field].isTotal !="undefined" && data[field].isTotal=="true"){//如果是合计功能
                var mainfieldid = data[field].mainTableField;
                var dtvalue = row.data[field].value;
                var maincr = viewModel.headform.getCurrentRow();
                var oldtotalval = maincr.data[mainfieldid].value;
                maincr.data[mainfieldid].value=oldtotalval+dtvalue;
            }
        }
        uitemplateCtr.app =app;
        uitemplateCtr.viewModel = viewModel;
        uitemplateCtr.templateModel = templateModel;
        var headData = templateModel.getValue(datatableId);
        //执行保存逻辑
        var param = {};
        param.templateInfo = viewModel.getTemplateInfo();

        //添加同的表单不同的提交方式
        var vcls,vurl;
        if(datatableId=="headform"){
            vcls = "com.yonyou.iuap.eiap.entity.ReimburseBill";
            vurl = "/iuap-eiap-example/billform/save";
        }else{
            vcls = "com.yonyou.iuap.eiap.entity.ReimburseItem";
            vurl = "/iuap-eiap-example/billform/saveItem";
        }
        param.headData = JSON.stringify(headData);
        param.cls= vcls;
        $.ajax({
            type: "POST",
            url: vurl,
            data:param,
            async:true,
            dataType: "json" ,
            success: function(result) {
                //清理数据
                //设置数据
                if(datatableId ==="headform"){//表头
                    templateModel.setItemCodeValue(datatableId,"billform.id",result.body.id,"");
                }else{
                    var data = templateModel.getEditRowData(datatableId);
                    templateModel.updateRowData(data.body);
                }
            }
        });
        return true;
    }

    uitemplateCtr.cancel = function(app, viewModel,templateModel,datatableId){
        var dataTable = app.getDataTable(datatableId);
        var row = dataTable.getCurrentRow();
        if(row.status == u.Row.STATUS.NEW && "headform" != datatableId){
            var row = dataTable.getRow(0);
            templateModel.clearRowData(row);
        }
    }

    function valuechangeFormula(dts){
        for (var key in dts){
            var dt = dts[key]
            var data = dt.meta;
            for(var field in data){
                if(typeof data[field].componentKey !="undefined" && (data[field].componentKey=="Money" || data[field].componentKey=="NumberComponent")){//如果是计算功能
                    var mainfieldid = "";
                    if(data[field].moneyFields != "undefined" && JSON.parse(data[field].moneyFields).length > 0 &&  JSON.parse(data[field].moneyFields)[1].type =="field"){
                        mainfieldid = JSON.parse(data[field].moneyFields)[1].value;
                        var maincr = app.getDataTable(key).getCurrentRow();
                        if(maincr){
                            var val = maincr.data[mainfieldid].value;
                            if(val){
                                val = parseInt(val);
                            }
                            maincr.setValue(field,val);
                        }
                    }

                }
            }
        }
    }
    uitemplateCtr.rowDelete = function(app, viewModel,templateModel,datatableId,delRowIndex){
        uitemplateCtr.app =app;
        uitemplateCtr.viewModel = viewModel;
        uitemplateCtr.templateModel = templateModel;
        var datatable = app.getDataTable(datatableId);
        var row = datatable.getRow(delRowIndex);
        datatable.removeRow(delRowIndex);
        //合计字段处理
        var data = datatable.meta;
        for(var field in data){
            if(typeof data[field].isTotal !="undefined" && data[field].isTotal=="true"){//如果是合计功能
                var mainfieldid = data[field].mainTableField;
                var dtvalue =row.data[field].value;
                var maincr = viewModel.headform.getCurrentRow();
                if(maincr){
                    var oldtotalval = maincr.data[mainfieldid].value;
                    if(oldtotalval){
                        oldtotalval = parseInt(oldtotalval)-parseInt(dtvalue);
                    }else{
                        oldtotalval = parseInt(dtvalue);
                    }
                    maincr.setValue(mainfieldid,oldtotalval);
                }
            }
        }
    }

    uitemplateCtr.afterInit = function(viewModel,params,app,templateModel){
//		var param = {};
//		param.templateInfo = viewModel.getTemplateInfo();
//		$.ajax({
//			type: "POST",
//			url: "/uitemplate_web/uitemplate_rt/data_ctr/loadData",
//			data:param,
//			async:true,
//			dataType: "json" ,
//			success: function(result) {
//				 //清理数据
//				templateModel.init(result);
//				uitemplateCtr.draw(templateModel);
//			}
//		});
        //做一个假数据，每个datatable都新增一个行数据
        var datatable = app.getDataTable('headform');
        var row = datatable.createEmptyRow();
        row.status = 'nrm';
        datatable.setRowSelect(0);
    }


    return uitemplateCtr;
});