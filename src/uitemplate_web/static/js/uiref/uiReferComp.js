
+ function($) {

	u.NcRefComp = u.BaseAdapter.extend({
		mixins:[u.EnableMixin, u.RequiredMixin, u.ValidateMixin,u.ValueMixin],
		init: function() {
			var element = this.element;
			var options = this.options;
			var viewModel = this.viewModel;
			//增加锚点
			this.meta_translations = options.meta_translations;
			this.meta_childmeta = options.meta_childmeta;
			if(this.meta_childmeta)
				this.childmetaArr = this.meta_childmeta.split('.');
			this.childIndex = options.childIndex;
			if(this.childIndex)
				this.childIndexArr = this.childIndex.split('-');
			this.hasDataTable = true;
			var self = this;
			var refmodel = '', refparam = '',refcfg = '';
			this.fieldId = '';
			this.showField = this.options['showField'];
			this.validType = 'string';
			if (this.hasDataTable) {
				refcfg = this.dataModel.getMeta(this.field, 'refcfg');
				//新增
				if(this.meta_childmeta){
					var nowChildMeta = this.dataModel;
					for(var i = 0; i < this.childmetaArr.length; i++){
						nowChildMeta = nowChildMeta.meta[this.childmetaArr[i]];
					}
					refmodel = nowChildMeta.meta[this.field].refmodel;
				}else{
					refmodel = this.dataModel.getMeta(this.field, 'refmodel')
				}
				refparam = this.dataModel.getMeta(this.field, 'refparam');
				var els = $(this.element);
				var $inputed = els.find("input");
				var inputid = $inputed.attr('id');

				this.fieldId = inputid || this.field;
				this.dataModel.refMeta(this.field, 'refparam').subscribe(function(value){
					$(element).attr('data-refparam', value);
				})
				this.dataModel.refMeta(this.field, 'refcfg').subscribe(function(value){
					$(element).attr('data-refcfg', value);
				})
			}
			$(element).attr('data-refmodel', refmodel);
			$(element).attr('data-refcfg', refcfg);
			$(element).attr('data-refparam', refparam);
			var pageUrl = '/uitemplate_web/static/js/uiref/refDList.js'; //默认地址
			var extendUrl = '/static/js/uiref/refDList.js';
			var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/;
			if(rbrace.test( refcfg )){
				refcfg=jQuery.parseJSON(refcfg);
			}
			if (refcfg && refcfg.pageUrl) {
				pageUrl ="/"+refcfg.pageUrl + extendUrl;
			}


			var refInitFunc = pageUrl.substr(pageUrl.lastIndexOf('/') +1).replace('.js','');

			var contentId = 'refContainer' + this.fieldId;
			var refContainerID=contentId.replace(/[^\w\s]/gi, '\\$&');
			if ($('#' + refContainerID).length > 0)
				$('#' + refContainerID).remove();


			if(!window[refInitFunc]){
				var scriptStr = '';
				$.ajax({
					url:pageUrl,
					dataType:'script',
					async : false,
					cache: true,
					success : function(data){
						scriptStr  = data
					}
				});
				(new Function(scriptStr))();
			}


			window[refInitFunc]({
				contentId: contentId,
				dom: $(this.element),
				pageUrl: pageUrl,
				setVal: function(data, noFocus) {
					if (data) {
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
						var oldVal = self.trueValue,
						showValue = options.isReturnCode ? code : name,
						valObj = {trueValue:pk,showValue:showValue};
						// self.dataModel.setSimpleData({});
						if (pk == '') {
							if (oldVal != null && oldVal != '') {
								self.setValue(valObj);
							}

						} else {
							self.setValue(valObj);
						}
						if (!noFocus) {
							$(self.element).find("input").focus();
						}
					}
				},
				onOk: function(data) {
					this.setVal(data);
					this.onCancel();
				},
				onCancel: function() {
					$('#' + refContainerID).css("display")!=="none" && $('#' + refContainerID).Refer('hide');
				}
			})
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
				
				// iuap前端升级同步更改 wt 20190124 // 这里补充一下参照实例本身的值，防止在校验输入框内值时随机匹配第一项
				var referComp = $('#' + refContainerID).data("uui.refer");
				if(referComp){
					setTimeout(function() {
						referComp.setValue(data,true);
					});
				}

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
		setValue: function(value) {
			this.trueValue = value.trueValue;
			this.slice = true;
			/*
			author:zhanghy7
			为参照添加属性，将pk赋予改属性，作为查询值
			*/
			$(this.element).find('input').attr('data-search',this.trueValue);
			this.setModelShowValue(value.showValue);
//			this.setModelValue(this.trueValue)

			//新增
			//if(this.dataModel.getCurrentRow().data[this.field]!=='undefined' && this.meta_translations!="child"){
			if (parseInt(this.options.rowIndex) > -1) {
			                if ((this.options.rowIndex + '').indexOf('.') > 0) {
			                    var childObj = this.getChildVariable();
			                    var lastRow = childObj.lastRow;
			                    var lastField = childObj.lastField;
			                    if (lastRow) lastRow.setValue(lastField, this.trueValue);
			                } else {
			                    var rowObj = this.dataModel.getRow(this.options.rowIndex);
			                    if (rowObj) rowObj.setValue(this.field, this.trueValue);
			                }
			            } else {
			if(!this.meta_childmeta){
				if(this.dataModel.getCurrentRow() ==null && this.dataModel.getRow(currentRowIndex_qy) ){
					this.dataModel.getRow(currentRowIndex_qy).setChildValue(this.field,this.trueValue);
				}
				else{
					this.dataModel.getCurrentRow().setValue(this.field,this.trueValue);
				}

			}else{
				if(this.dataModel.getCurrentRow() ==null){
					//this.dataModel.getCurrentRow().data['childsets']['value'].setValue(this.field, this.trueValue)
				this.dataModel.getRow(currentRowIndex_qy).setChildValue(this.meta_childmeta +'.'+ this.field,this.trueValue);
				}
				else{
					this.dataModel.getCurrentRow().setChildValue(this.meta_childmeta +'.'+ this.field,this.trueValue);
				}

			}

			//zhanghy7适配grid参照20170515
			// if(this.dataModel.getCurrentRow() ==null){
			// 	this.dataModel.getRow(currentRowIndex_qy).setValue('pk_org_name',value.showValue);
			// }
			this.setShowValue(value.showValue);
			this.slice = false;
			if(!this.hasDataTable) {
				this.trigger('valueChange', value);
			}
		}
		},

		getValue: function () {
			return this.trueValue;
		},
		setModelShowValue: function(showValue) {
			if (this.showField){
				//新增
				//if(this.dataModel.getCurrentRow().data[this.showField]!="undefined" && this.meta_translations!="child"){
				if(!this.meta_childmeta){
					this.dataModel.getCurrentRow().setValue(this.showField, showValue);
				}else{
					//this.dataModel.getCurrentRow().data['childsets']['value'].setValue(this.showField, showValue)
					this.dataModel.getCurrentRow().setChildValue(this.meta_childmeta+'.'+this.showField, showValue);
				}
			}else{
				//zhanghy7修改20170515
				if(this.dataModel.getCurrentRow() != null){
					this.dataModel.getCurrentRow().setMeta(this.field, 'display', showValue);
					try{
                        if(this.dataModel.getCurrentRow().getMeta()[this.field+"_name"]){
                            this.dataModel.getCurrentRow().setValue(this.field+"_name", showValue);
                        }
					}catch (e){}
				}
				else{
					if (currentRowIndex_qy < 0) {
						this.dataModel.createEmptyRow();
						this.dataModel.getRow(0).setMeta(this.field, 'display', showValue);
					}
					else{
						this.dataModel.getRow(currentRowIndex_qy).setMeta(this.field, 'display', showValue);
						currentRowIndex_qy = -1;
					}

				}

			}

		},

		getShowValue: function () {
			return this.showValue
		},
		setShowValue : function(showValue){
			this.showValue = showValue;
			$(this.element).find('input').length>0 ? $(this.element).find('input').val(showValue) : $(this.element).find('div:last').length>0 ? $(this.element).find('div:last').val(showValue) : $(this.element).val(showValue);
			//this.trigger('showValueChange', showValue);
		},
		addDomEvent: function(name, callback){
			$(this.element).find("input").on(name, callback);
			return this;
		},
		setEnable: function(enable){
			var contentId = 'refContainer' + this.fieldId;
			var refContainerID=contentId.replace(/[^\w\s]/gi, '\\$&');
var referInputReadonly = this.options.referInputReadonly;
			if(enable === true || enable === 'true'){
				this.enable = true
if(!referInputReadonly){
					$(this.element).find('input').removeAttr('readonly disabled');
				}
				$(this.element).removeClass('disablecover').find('.covershade').remove();
			}
			else if(enable === false || enable === 'false'){
				this.enable = false
				$(this.element).find('input').attr({'readonly': 'readonly', 'disabled': 'disabled'});
				$(this.element).addClass('disablecover').prepend('<div class="covershade"></div>');
			}

			if(!$('#' + refContainerID).Refer){
				var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/;
				refcfg = this.dataModel.getMeta(this.field, 'refcfg');
				var refcfg=rbrace.test( refcfg ) ? jQuery.parseJSON( refcfg ) :{};
				$.extend(refcfg, {isEnable:this.enable});
				$(this.element).attr('data-refcfg', JSON.stringify(refcfg));
			}else{
				if ($('#' + refContainerID).Refer('getInstance').setEnable)
					$('#' + refContainerID).Refer('getInstance').setEnable(this.enable);
			}
		},
		// songyd3 更新参照meta中的查询参数到DOM中
		updateMeta: function() {
			var refparam = this.dataModel.getMeta(this.field, "refparam");
			$(this.element).attr("data-refparam", refparam);
		},
	})

	/**
	 * grid控件 edittype
	 * @param {Object} options
	 * options:{gridObj,element,value,field,rowObj}
	 */
	var ncReferEditType = function(options) {
		var grid = options.gridObj,
		datatable = grid.dataTable,
		viewModel = grid.viewModel,
		field = options.field,
		// showField = options.showField,
		showField = options.gridObj.getColumnByField(options.field).options.showField;
		element = options.element,
		column = grid.getColumnByField(field);
		//iuap 前端升级同步更改 wt 20190124
		var rowId = options.rowObj['$_#_@_id'];
      	var row = datatable.getRowByRowId(rowId);
		//grid控件加上一个是否只读的属性判断
		var referInputReadonly = column.options.editOptions.referInputReadonly;
		var readOnly = referInputReadonly ? 'readonly="readonly"': '';
		var placeholder = column.options.editOptions.placeholder?column.options.editOptions.placeholder:"";
		var referCls = column.options.editOptions.referCls ? column.options.editOptions.referCls : "";
		var htmlStr = '<div class="input-group date form_date">' +
			'<input  placeholder="'+placeholder+'" class="form-control '+ referCls +'" type="text" '+readOnly+'/>' +
			'<span class="u-form-control-feedback fa fa-list-ul"></span>' +
			'</div>';
		// var htmlStr = '<div class="input-group date form_date">' +
		// 	'<input  class="form-control" type="text">' +
		// 	'<span class="input-group-addon"><span class="fa fa-angle-down"></span></span>' +
		// 	'</div>';
		//element.innerHTML = htmlStr
		// songyd3 优先使用已创建的实例元素
		// if(grid.gridModel.editComponent[field] && grid.gridModel.editComponent[field].element) {
		// 	$(element).html(grid.gridModel.editComponent[field].element);
		// }
		// else {
		// 	$(element).html(htmlStr);
		// }
		var refmodel = datatable.getMeta(field,'refmodel');
		var refparam = datatable.getMeta(field,'refparam');
//		grid._editComp || grid._editComp = {}
//		var ncrefer = grid._editComp[field]
//		if (!ncrefer){
		var refOptions =  column.options.editOptions;
		refOptions['refmodel'] = refmodel;
		refOptions['refparam'] = refparam;
		// songyd3 优先使用已创建的实例，避免重复创建实例
		var ncrefer = grid.gridModel.editComponent[field];
		options.element.innerHTML = '';
		if(ncrefer instanceof u.NcRefComp) {
			if(grid.gridModel.editComponentDiv[field] && $(grid.gridModel.editComponentDiv[field]).find("input").length > 0) {
				$(options.element).html(grid.gridModel.editComponentDiv[field]);
				var referComp = $("#refContainer"+ncrefer.fieldId).data("uui.refer");
				referComp.init();
				referComp.options.data = [];
				if(options.value && options.value != "") {
					var pks = options.value.split(",");
					var items = referComp.getRefValByPK(pks);
					setTimeout(function() {
						referComp.setValue(items);
					});
				}
				referComp.bindFirstEvent();
			}else {
                ncrefer = new u.NcRefComp({
                    // el:$(element).find('div')[0],
                    el:$(htmlStr)[0],
                    options: refOptions,
                    model:viewModel});
                $(options.element).html($(ncrefer.element));
                grid.gridModel.editComponent[field] = ncrefer;
                grid.gridModel.editComponentDiv[field] = $(ncrefer.element);
            }
			// $(options.element).html($(ncrefer.element).clone(true,true));
		}
		else {
			ncrefer = new u.NcRefComp({
				// el:$(element).find('div')[0],
				el:$(htmlStr)[0],
				options: refOptions,
				model:viewModel});
			$(options.element).html($(ncrefer.element));
			grid.gridModel.editComponent[field] = ncrefer;
			grid.gridModel.editComponentDiv[field] = $(ncrefer.element);
		}
		ncrefer.updateMeta();
		options.gridObj.editComp = ncrefer;

		var rowId = options.rowObj['$_#_@_id'];
		var row = datatable.getRowByRowId(rowId);
		var display
		if (showField){
			display = row.getValue(showField);
		}else{
			display = row.getMeta(field, 'display')	|| '';
		}
//		datatable.ref(field).subscribe(function(vakue){
//			grid.editValueChange(field,value);
//		})

		$(element).find('input').val(display);

	};

	/**
	 *grid 控件 render
	 */
	var ncReferRender = function(options){
//		obj.value = v;
//		obj.element = span;
//		obj.gridObj = oThis;
//		obj.row = this;
//		obj.gridCompColumn = gridCompColumn;
//		obj.rowIndex = j;
		setTimeout(function(){
			var grid = options.gridObj;
			var datatable = grid.dataTable;
			var column = options.gridCompColumn;
			var field = column.options.field;
			var showField = column.options.showField;
			var rowIndex = options.rowIndex;
			var rowId =  $(grid.dataSourceObj.rows[rowIndex].value).attr("$_#_@_id");
			//0830增加rowId的获取
			var rowId = options.row.value["$_#_@_id"];
			var row = datatable.getRowByRowId(rowId);

			//参照必输校验提示
			var element = options.element;
			var editObj  = {};
			editObj.element = element;
			// songy3 注释，editComponent在editType时已放入参照实例
			// grid.gridModel.editComponent[field]= editObj;


			var display = "";
			if(typeof row !="undefined" && row!=null){
				row.getValue(field)?display:row.setValue(showField,'');
				if (showField){

					display = row.getValue(showField) || row.getMeta(field, 'display');
				}else{
					display = row.getMeta(field, 'display') || '';
				}
			}
			options.element.innerHTML = display || '';
			$(options.element).attr('title', display);
			$(options.element).closest("body").find(".ref_ac_results").css("display","none");//隐藏模糊搜索
		},100)

	}

	window.ncReferEditType = ncReferEditType;
	window.ncReferRender = ncReferRender;


	u.compMgr.addDataAdapter({
        adapter: u.NcRefComp,
        name: 'uiRefer'
    });

}($)
