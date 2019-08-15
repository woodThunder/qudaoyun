define(["ocm_common"],function(common){
  function eidtcard(element,options,busimeta){
    var self = this;
    var viewModel = {};
    var params = {
      meta:{
        id:{type: 'string'},//id
      }
    };
    var ajaxoptions = [];
    var tpl =$('<div></div>');
    if(u.isArray(options)&&options.length>0){
      for(var i = 0;i<options.length;i++){
        //将option对象数组转为datatable的meta对象
        var metaforkey;
        if(busimeta){//判断是否传递了业务元数据
          metaforkey = busimeta.meta[options[i].key];
          if(metaforkey){//校验类型需要单独传递到uui控件上
            options[i].validType = metaforkey.validType;
            options[i].required = metaforkey.required||false;
          }
        }
        // 是否过滤已停用的档案，默认禁用
        var filter = true;
        if(options[i].disableFilter){
          filter = false;
        }
        common.metautils.metaHandle(params.meta,options[i],metaforkey,filter);


        //处理comobox,checkbox,radio存在DataSource的情况
        if(options[i].dataSource){
          viewModel[options[i].key+"sourceData"]=options[i].dataSource;
        }
        //这里url作为与datasource并列条件,注意需要传入对应的namefield和valuefield
        if(options[i].url){
          viewModel[options[i].key+"sourceData"]=ko.observableArray(options[i].dataSource);
          ajaxoptions.push({
            url:options[i].url,
            comboarr:options[i].key+"sourceData",
            namefield:options[i].namefield,
            valuefield:options[i].valuefield
          });
        }
        // 注入不可选择日期判断函数
        if(options[i].disabledDate) {
          if(typeof options[i].disabledDate === "function") {
            viewModel[options[i].key+"disabledDate"] = options[i].disabledDate;
          }
          // busimeta即为传进来的实际页面上的datatable，其parent属性为页面viewModel
          else if (busimeta.parent) {
            viewModel[options[i].key + "disabledDate"] = busimeta.parent[options[i].disabledDate];
          }
          else {
            throw new Error("disabledDate must be a function");
          }
        }
        tpl.append(generateTpl(common.metautils.optionHandle(options[i])),options[i],busimeta)
      }
    }
    common.metautils.urlHandle(ajaxoptions,viewModel);
    viewModel.params = new u.DataTable(params);
    ko.cleanNode(element);
    element.innerHTML = generateDialogTpl(tpl.html());

    self.app = u.createApp({
      el: element,
      model: viewModel
    });
    viewModel.params.createEmptyRow();
    self.geteidtData = geteidtData;
    self.seteidtData = seteidtData;
    self.seteidtValue = seteidtValue;
    self.cleareidt = cleareidt;
    self.viewModel = viewModel;
    self.element = element;
    self.validate = validate;
    self.show = show;
    self.close = close;
    
//*************** wangsyf add..  start */
/* 
  使用卡片动态逻辑编辑需要在对应 meta 设置params:{dialogcardUseDynamicRequired: true},
  且在对应的 dialog 中需要配置字段的required : true,需要在其 fn.required函数返回 bool值.
*/
    self.useDynamicRequired = busimeta &&  busimeta instanceof u.DataTable &&  busimeta.getParam('dialogcardUseDynamicRequired') === true;
    if(!self.useDynamicRequired){
      return
    }
    var keyMetaMap = {};
    self.keyMetaMap = keyMetaMap;
    $.map(options,function(data,index){
      keyMetaMap[data['key']] = data;
    });
    var allInputs = $(element).find('div.ui-item input');
    allInputs.off('focus').on('focus',function(){
      return editableHandler.call(this,keyMetaMap,viewModel.params,'before')
    });
    
    viewModel.params.on(u.DataTable.ON_VALUE_CHANGE,function(val){
      editedHandler.call(this,val,keyMetaMap)
      return true;
    })
  }
  function editedHandler(val,keyMetaMap){
    var key = val['field']
    var fnObj = keyMetaMap[key]['fn'];
    if(!fnObj || typeof fnObj != 'object' || $.isArray(fnObj)){
      return
    }
    if(!fnObj['after'] || typeof fnObj['after'] != 'function'){
      return
    }
    var holder = {
      row : val.rowObj,
      newValue : val.newValue,
      oldValue : val.oldValue,
      rowId : val.rowId,
    }
    fnObj['after'].call(null,holder);
  }
  function editableHandler(keyMetaMap,datatable){
    var mt = $(this).parent()[0]['u-meta'];
    if(mt['type'] != 'u-text'){
      return
    }
    var key = mt['field']
    var fnObj = keyMetaMap[key]['fn'];
    if(!fnObj || typeof fnObj != 'object' || $.isArray(fnObj)){
      return
    }
    if(!fnObj['before'] || typeof fnObj['before'] != 'function'){
      return
    }
    var result = fnObj['before'].call(null,datatable.getRow(0))
    if(result !== false){
      $(this).removeAttr('readonly')
    }else{
      $(this).attr('readonly',true)
    }
  }
//*************** wangsyf add..  end */
  


  function geteidtData(){
    return this.viewModel.params.getSimpleData()[0];
  }
  function seteidtValue(field,data){
    this.viewModel.params.setValue(field,data);
  }
  function seteidtData(data){
    this.viewModel.params.setSimpleData(data);
  }
  function cleareidt(){
    this.viewModel.params.removeAllRows();
    this.viewModel.params.createEmptyRow();
  }
  function show(title,width,callback, ifButtonTop){
    var self = this;
    self.callback = callback;
    var element = self.element;
    // 判断是否处于编辑态逻辑, 如果数据项有id,认为当前处于编辑态
    // 找到具有详情属性的元素。编辑态时显示文字元素，新增态时显示原有控件
    var $text =  $(element).find(".J-editcard-text");
    var id = self.viewModel.params.getValue("id");
    if(id){
      $text.siblings().hide();
      $text.show();
    }else{
      $text.siblings().show();
      $text.hide();
    }


    // 处理标题自定义逻辑
    $(element).find(".u-msg-title h4").text(title);
    // 对按钮显示位置进行处理
    if(ifButtonTop && ifButtonTop === true) {
        $(element).find(".u-msg-header").show();
        $(element).find(".u-msg-footer").hide();
    } else {
        $(element).find(".u-msg-header").hide();
        $(element).find(".u-msg-footer").show();
    }
    // 弹出框显示逻辑，增加对拖拽属性的支持（TODO：拖拽属性不是非常灵活，鼠标有越位bug,待修复）
    if(!self.dialog){
      self.dialog = u.dialog({
        content: "#"+element.id,
        hasCloseMenu: true,
        width: width,
        is_drag:true
      });
      $(element).on("click",".J-ok",function(){
        self.callback();
      });
      $(element).on("click",".J-cancel",function(){
        self.dialog.close();
      });
    }else{
      self.dialog.show();
      self.dialog.drag();
    }
  }
  function close(){
    this.dialog.close();
  }
  function validate(){
//*************** wangsyf add..  start */
    if(this.useDynamicRequired){
      var that = this;
      this.element.querySelectorAll('[u-meta*="u-text"]').forEach(function(val){
        var meta = val['u-meta'];
        if(meta['trueAdpt'] && meta['trueAdpt']['validate']){
          var data = that.keyMetaMap[meta['field']];
          if( data && data['fn'] && data['fn']['required'] && typeof data['fn']['required'] == 'function'){
            var logicRequired = data['fn']['required'].call(null,that.viewModel.params.getRow(0).getSimpleData());
            if(logicRequired){
              /**
               * 单独测试 u.js 时.要求 meta.required=true 才能初始化 validate
               * 实际测试中,meta.trueAdpt.validate.required 可控制是否必填.
               * 但中台页面使用时并不奏效.改由meta.validate.required控制.
               */
              // meta.trueAdpt.validate.required=true
              meta.validate.required=true
            }else{
              // meta.trueAdpt.validate.required=false
              meta.validate.required=false
            }
          }
        }
      })
    }
//*************** wangsyf add..  end */    
    var result = this.app.compsValidateMultiParam({element:this.element,showMsg:true});
    return result;
  }
  function generateTpl(option,opts,dt){
    var htmlstr =
    '<div class="ui-item '+
    option.cls+'">'+
    '<span class="ui-name '+
    option.labelcls+'">'+
    option.label +
    '：'+
    '</span>';
    option.domid ? htmlstr += '<div id='+ option.domid : htmlstr += '<div';
    htmlstr += ' class="ui-inputarea '+option.inputCls+'" '+ option.meta +'>'+
    option.content+
    '</div>'+
    '</div>';
    return htmlstr;
  }
  function generateDialogTpl(content){
    var htmlstr =
    '<div class="u-msg-title">'+
    '<h4>基本信息</h4>'+
    '</div>'+
    '<div class="u-msg-header" style="display: none;">'+
    '<a class="ui-btn ui-btn-primary J-cancel margin-right-5">取消'+
    '</a>'+
    '<a class="ui-btn ui-btn-green  J-ok">保存'+
    '</a>'+
    '</div>' +
    '<div class="u-msg-content ui-editbox">'+
    content+
    '<div class="clearfix"></div>'+
    '</div>'+
    '<div class="u-msg-footer">'+
    '<a class="ui-btn ui-btn-primary J-cancel margin-right-5">取消'+
    '</a>'+
    '<a class="ui-btn ui-btn-green  J-ok">保存'+
    '</a>'+
    '</div>';
    return htmlstr;
  }
  return eidtcard;
});
