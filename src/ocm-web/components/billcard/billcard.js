define(["ocm_common"],function(common){
    function card(element,options,busimeta,dataTable,viewModel){
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
          common.metautils.metaHandle(busimeta.meta,options[i],metaforkey,filter);
  
  
          //处理comobox,checkbox,radio存在DataSource的情况
          if(options[i].dataSource){
            if(u.isArray(options[i].dataSource)){
              viewModel[options[i].key+"sourceData"]=fillEmptyOption(options[i], options[i].dataSource);
            }else{
              viewModel[options[i].key+"sourceData"]=viewModel[options[i].dataSource];
            }
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
            else {
              throw new Error("disabledDate must be a function");
            }
          }
          tpl.append(generateTpl(common.metautils.optionHandle(options[i],dataTable)))
        }
      }
      common.metautils.urlHandle(ajaxoptions,viewModel);
      element.innerHTML = tpl.html() + '<div class="clearfix"></div>';
    }
    function generateTpl(option){
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
    function fillEmptyOption(option, dataSource) {
        // type为comobox时统一封装空选项
        if(option.type == "combo") {
            if(u.isArray(dataSource)){
                dataSource.unshift({
                    value: "",
                    name: "请选择"
                });
            }
        }
        return dataSource;
    }
    return card;
  });
  