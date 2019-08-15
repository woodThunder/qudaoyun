
+ function($) {

    u.cloudRefComp = u.BaseAdapter.extend({
        init: function() {
            console.log(this)
            console.log(this.dataModel.getCurrentRow())
            var Inputvalue = '';
            var showValue ='';
            // var Inputvalue = this.dataModel.getCurrentRow().getValue(this.field);
            // var showValue = this.dataModel.getCurrentRow().getMeta(field);
            // this.setValue(Inputvalue);

            var self = this;
            var element = this.element;
            var options = this.options;
            var viewModel = this.viewModel;

            //根据模版信息，生成参照参数option内容
            var type = options.type;
            var referType = options.refertype || 2;

            var dataTable = viewModel[options.data];



            var refModel = dataTable.getMeta(options.field).refmodel;

            if(refModel == '' || refModel == undefined) {
                return false;
            }
            var refobj = JSON.parse(refModel)
            var refIntl={}
            if(refobj.title)refIntl.title=refobj.title;
            if(refobj.buttonText)refIntl.buttonText=refobj.buttonText;

            var option = {
                title: '部门',
                refType:1,
                isRadio:true,
                hasPage:false,
                backdrop:false,
                treeloadData: false, //modify by wjp
                tabData:[
                    {"title":"常用","key":"commonUse"},
                    {"title":"全部","key":"total"}
                ],// option中可增加defaultActiveKey作为默认tab标签
                param:{//url请求参数
                    refCode:'newdept',
                    tenantId:'xxx',
                    sysId:'xxx',
                    content:'云平台',
                    locale: u.getCookie("u_locale"),
                    refModelUrl: '/newref/rest/iref_ctr/blobRefTree'
                },
                buttonText:{ok:"确定",cancel:"取消"},
                refModelUrl:{
                    TreeUrl:'/newref/rest/iref_ctr/blobRefTree', //树请求
                    GridUrl:'http://workbench.yyuap.com/ref/rest/iref_ctr/commonRefsearch',//单选多选请求
                    TableBodyUrl:'/newref/rest/iref_ctr/blobRefTree',//表体请求
                    TableBarUrl:'/newref/rest/iref_ctr/refInfo',//表头请求
                    totalDataUrl:'http://workbench.yyuap.com/ref/diwork/iref_ctr/matchPKRefJSON',//根据refcode请求完整数据

                },
                checkedArray:[],
                onCancel: function (p) {
                    console.log(p)
                },
                onSave: function (sels) {
                    self.setValue(sels);
                },
                className:'',
            }
            switch(JSON.parse(refModel).refModelUrl)
            {
                case '/basedoc/ref/org/':
                    option = $.extend(option,{
                        title: '行政组织参照',
                        refType:1,
                        treeloadData: true, //modify by wjp
                        param:{//url请求参数
                            refCode:'neworganizition',
                        },
                        refModelUrl:{
                            TreeUrl:'/newref/rest/iref_ctr/blobRefTree'
                        }
                    })
                    break;
                case '/basedoc/ref/dept/':
                    option = $.extend(option,{
                        title: '部门',
                        refType:1,
                        param:{//url请求参数
                            refCode:'newdept',
                        },
                        refModelUrl:{
                            TreeUrl:'/newref/rest/iref_ctr/blobRefTree'
                        }
                    })
                    break;
                case '/wbalone/organizationRef/':
                    option = $.extend(option,{
                        refType:1,
                        param:{//url请求参数
                            refCode:'neworganizition',
                            locale: u.getCookie("u_locale"),
                            clientParam: {"isUseDataPower":"true"}
                        },
                        refModelUrl:{
                            TreeUrl:'/newref/rest/iref_ctr/blobRefTree'
                        }
                    })
                    break;
                case '/wbalone/wbUserRef/':
                    option = $.extend(option,{
                        title: '用户',
                        refType:2,
                        param:{//url请求参数
                            refCode:'newuser',
                        },
                        refModelUrl:{
                            TableBodyUrl:'/newref/rest/iref_ctr/blobRefTreeGrid/',//表体请求
                            TableBarUrl:'/newref/rest/iref_ctr/refInfo',//表头请求
                        }
                    })
                    break;
                case '/basedoc/peopledocRef/':
                    option = $.extend(option,{
                        title: '人员',
                        refType:2,
                        param:{//url请求参数
                            refCode:'bd_new_user',
                        },
                        refModelUrl:{
                            TableBodyUrl:'/newref/rest/iref_ctr/blobRefTreeGrid/',//表体请求
                            TableBarUrl:'/newref/rest/iref_ctr/refInfo',//表头请求
                        }
                    })
                    break;
                case '/wbalone/appMenuRef'://菜单
                    option = $.extend(option,{
                        title: '菜单',
                        refType:1,
                        param:{//url请求参数
                            refCode:'newposition',
                        },
                        refModelUrl:{
                            TableBodyUrl:'/newref/rest/iref_ctr/blobRefTree',//表体请求
                            TableBarUrl:'/newref/rest/iref_ctr/refInfo',//表头请求
                        }
                    })
                    break;
                case '/wbalone/applicationRef'://小应用
                    option = $.extend(option,{
                        title: '小应用',
                        refType:3,
                        param:{//url请求参数
                            refCode:'newposition',
                        },
                        refModelUrl:{
                            TableBodyUrl:'/newref/rest/iref_ctr/blobRefTree',//表体请求
                            TableBarUrl:'/newref/rest/iref_ctr/refInfo',//表头请求
                        }
                    })
                    break;
                case '/basedoc/ref/newposition/'://职位
                    option = $.extend(option,{
                        title: '选取岗位',
                        refType:2,
                        param:{//url请求参数
                            refCode:'newposition'
                        },
                        refModelUrl:{
                            TableBodyUrl:'/newref/rest/iref_ctr/blobRefTree',//表体请求
                            TableBarUrl:'/newref/rest/iref_ctr/refInfo',//表头请求
                        }
                    })
                    break;
                default:
                    option = $.extend(option,{
                        title: '部门',
                        refType:1,
                        param:{//url请求参数
                            refCode:'newdept',
                        },
                        refModelUrl:{
                            TreeUrl:'/newref/rest/iref_ctr/blobRefTree'
                        }
                    })
                    return false;
            }
            option = $.extend(option,refIntl);
            this.option = option;


            if(this.meta_childmeta){
                var nowRow = this.dataModel.getCurrentRow();
                if(nowRow && this.childmetaArr && this.childIndexArr && this.childmetaArr.length == this.childIndexArr.length){
                    for(var i = 0; i < this.childmetaArr.length; i++){
                        nowRow = nowRow.getValue(this.childmetaArr[i]).getRow(this.childIndexArr[i]);
                    }
                    nowRow.ref(this.field).subscribe(function(value){
                        self.modelValueChange(value)
                    });

                    var v = nowRow.getValue(this.field);
                    this.modelValueChange(v);
                }
            }else{
                this.dataModel.ref(this.field).subscribe(function(value) {
                    self.modelValueChange(value)
                });
                this.modelValueChange(this.dataModel.getValue(this.field))
            }
            element.getElementsByClassName('refer')[0].addEventListener('click',function(){
                console.log('调用参照')
                option = Object.assign(option,{checkedArray:self.getValue()})

                window.createModal(option)
            },false)
        },

        setValue: function(value) {
            var seletedValue = value || [];
            //seletedValue = Array.from(new Set(seletedValue));
            var showValue = [];
            var refPk = [];
            seletedValue.forEach(function(v,k){
                refPk.push(v.refpk);
            })
            seletedValue.forEach(function(v,k){
                showValue.push(v.refname);
            })
            showValue = showValue.join(',');

            //获取field值 && 修改row数据 (setValue setMeta)
            var field = this.field;
            var refPkData = refPk.join(',');
            this.dataModel.getCurrentRow().setValue(field,refPkData);
            this.dataModel.getCurrentRow().setMeta(field,'display',showValue);
            //设置selectedValue 并 显示
            this.selectedValue = seletedValue;
            this.setShowValue(showValue);
        },
        modelValueChange: function(val) {
            var self = this;
            var ele = $(this.element);
            var $input = ele.find("input");
            var modelValue = val;
            var inputVal = ele.find("input").val();
            var refName = ele.attr('refname');
            var oldValue = this.trueValue;

            this.trueValue = modelValue;
            var autoCheck;
            if(ele.attr("data-refcfg") != ''  && typeof ele.attr("data-refcfg") !=='undefined'){
                autoCheck = JSON.parse(ele.attr("data-refcfg")).autoCheck;
            }
            var contentId = 'refContainer' + self.fieldId;
            var refContainerID = contentId.replace(/[^\w\s]/gi, '\\$&');
            //解决直接通过KO设置PK
            //TODO:autochck=false不处理
//			if ("" !== inputVal && modelValue === refName) {
            if (!val){
                if(autoCheck!==false){
                    ele.find("input").val('');
                }
                //改变参照that.values数据
                $('#' + refContainerID).Refer && $('#' + refContainerID).Refer('setValue', val || "");
                return;
            }

            var mdisp;
            var mvalue;
            if (parseInt(this.options.rowIndex) > -1) {
                if ((this.options.rowIndex + '').indexOf('.') > 0) {
                    var childObj = this.getChildVariable();
                    var lastRow = childObj.lastRow;
                    var lastField = childObj.lastField;
                    if (lastRow) mvalue = lastRow.getValue(lastField);
                } else {
                    var rowObj = this.dataModel.getRow(this.options.rowIndex);
                    if (rowObj) mvalue = rowObj.getValue(this.field);
                }
            }else{
                mvalue = this.dataModel.getCurrentRow().getValue(this.field);
            }
            if (this.showField){
                //新增
                //if(this.dataModel.getCurrentRow().data[this.showField] && this.meta_translations!="child"){
                if(!this.meta_childmeta){
                    mdisp = this.dataModel.getCurrentRow().getValue(this.showField);
                }else{
                    //mdisp = this.dataModel.getCurrentRow().data['childsets']['value'].getValue(this.showField);
                    mdisp = this.dataModel.getCurrentRow().getChildValue(this.meta_childmeta+'.'+this.showField);
                    mvalue = this.dataModel.getCurrentRow().getChildValue(this.meta_childmeta+'.'+this.field);
                }
            }else if(this.options.display){
                //zhanghy7添加对于div中u-meta中的display属性做处理以显示真实值
                mdisp = this.dataModel.getCurrentRow().getValue(this.options.display);
            }else{
                if (parseInt(this.options.rowIndex) > -1) {
                    if ((this.options.rowIndex + '').indexOf('.') > 0) {
                        var childObj = this.getChildVariable();
                        var lastRow = childObj.lastRow;
                        var lastField = childObj.lastField;
                        if (lastRow) mdisp = lastRow.getMeta(lastField, 'display');
                    } else {
                        var rowObj = this.dataModel.getRow(this.options.rowIndex);
                        if (rowObj) mdisp = rowObj.getMeta(this.field, 'display');
                    }
                }else{
                    mdisp = this.dataModel.getCurrentRow().getMeta(this.field, 'display');
                }
            }

            if(val == mvalue && mdisp != null && mdisp != "" && (oldValue=="" || oldValue==null || oldValue == mvalue)) {
                self.setShowValue(mdisp);
                return;
            }

            //"#refContainer1bodys_project.pk_projectclass" "Str1.str2%str3".replace(/[^\w\s]/gi, '\\$&')


            //TODO:Refer.js加载延迟bug
            if (!$('#' + refContainerID).Refer) return
            var data = $('#' + refContainerID).Refer('getRefValByPK', modelValue.split(','));
            if (data  && data.length > 0) {
                var options = $('#' + refContainerID).Refer('getOptions');
                var pk = $.map(data, function(val, index) {
                    return val.refpk
                }).join(',');
                var name = $.map(data, function(val, index) {
                    return val.refname
                }).join(',');
                var code = $.map(data, function(val, index) {
                    return val.refcode
                }).join(',');
                self.setShowValue(options.isReturnCode ? code : name);
                self.setModelShowValue(options.isReturnCode ? code : name);
            }
//			}
        },
        setShowValue : function(showValue){
            this.showValue = showValue;
            $(this.element).find('input').length>0 ? $(this.element).find('input').val(showValue) : $(this.element).find('div:last').length>0 ? $(this.element).find('div:last').val(showValue) : $(this.element).val(showValue);
        },
        getValue: function () {
            return this.selectedValue;
        },
        getShowValue: function () {
            var Inputvalue="";
            if(Inputvalue==""){
                return this.showValue
            }else{
                return Inputvalue
            }
        },
        addDomEvent: function(name, callback){
            $(this.element).find("input").on(name, callback);
            return this;
        },
        getCookie:function(param){
            //return "ddd";
            var strCookie = document.cookie;
            var arrCookie = strCookie.split("; ");
            for(var i = 0; i < arrCookie.length; i++){
                var arr = arrCookie[i].split("=");
                if(param == arr[0]){
                    return arr[1];
                }
            }
        }
    })


    u.compMgr.addDataAdapter({
        adapter: u.cloudRefComp,
        name: 'uiNewRefer'
    });

}($)
