define(['ocm_common'],function(common){
  function searchbox(element,options,collapse,showAll){
    var self = this;
    var viewModel = {};
    var params = {
      meta:{}
    };
    var ajaxoptions = [];
    var oprs = [];
    var tpl =$('<div class="ui-searchbox"></div>');
    if(u.isArray(options)&&options.length>0){
      for(var i = 0;i<options.length;i++){
        //将option对象数组转为datatable的meta对象
        common.metautils.metaHandle(params.meta,options[i])
        //处理comobox,checkbox,radio存在DataSource的情况
        if(options[i].dataSource){
          if(options[i].hasAll) {
            if(ko.isObservable(options[i].dataSource)) {
              options[i].dataSource = options[i].dataSource();
            }
            options[i].dataSource = options[i].dataSource.concat();
            options[i].dataSource.unshift({name:"全部",value:CONST.DEFAULTOPTION});
          }
          viewModel[options[i].key+"sourceData"]=options[i].dataSource;
        }
        //这里url作为与datasource并列条件,注意需要传入对应的namefield和valuefield
        if(options[i].url){
          viewModel[options[i].key+"sourceData"]=ko.observableArray(options[i].dataSource);
          ajaxoptions.push({
            url:options[i].url,
            comboarr:options[i].key+"sourceData",
            namefield:options[i].namefield,
            valuefield:options[i].valuefield,
            hasAll: options[i].hasAll
          });
        }
        //处理操作符
        oprHandle(oprs,options[i]);
        tpl.append(generateTpl(common.metautils.optionHandle(options[i])))
      }
    }
    tpl.append('<div class="clearfix"></div>');
    common.metautils.urlHandle(ajaxoptions,viewModel);

    viewModel.params = new u.DataTable(params);
    viewModel.oprs = oprs;
    ko.cleanNode(element);
    element.innerHTML = tpl.html();
    u.createApp({
      el: element,
      model: viewModel
    });
    viewModel.params.createEmptyRow();
    if(collapse){
      collapseBind(element);
    }else{
      eventBind(element, showAll);
    }
    self.getSearchData = getSearchData;
    self.getDataWithOpr = getDataWithOpr;
    self.validSearchData = validSearchData;
    self.setSearchData = setSearchData;
    self.setSearchValue = setSearchValue;
    self.clearSearch = clearSearch;
    self.viewModel = viewModel;
  }
  function getSearchData(){
    return this.viewModel.params.getSimpleData()[0];
  }
  // 校验数据，必输项必须输入，否则返回false
  function validSearchData() {
    var data = this.viewModel.params.getSimpleData()[0];
    var oprs = this.viewModel.oprs;
    if(u.isArray(oprs)&&oprs.length>0){
      for(var i = 0;i<oprs.length;i++){
        var key = oprs[i].key;
        if(oprs[i].required) {
          if(!data[key]) {
            toastr.info(oprs[i].label+"必须输入！");
            return false;
          }
        }
      }
    }
    return true;
  }
  function getDataWithOpr(){
    var data = this.viewModel.params.getSimpleData()[0];
    var oprs = this.viewModel.oprs;
    var datawithopr = {};
    if(u.isArray(oprs)&&oprs.length>0){
      for(var i = 0;i<oprs.length;i++){
        var key = oprs[i].key;
        var truekey = oprs[i].key;
        var curOpr = oprs[i].opr
        // 处理LIKEORIN操作符，当只有一个值时，使用LIKE，当存在逗号分隔的多个值，使用IN
        if(curOpr == CONST.OPERATOR.LIKEORIN) {
          if(data[key] && data[key].split(",").length == 1) {
            curOpr = CONST.OPERATOR.LIKE;
          }
          else if (data[key] && data[key].split(",").length > 1) {
            curOpr = CONST.OPERATOR.IN;
          }
          else {
            curOpr = CONST.OPERATOR.LIKE;
          }
        }
        if(oprs[i].type == "range"){
          var start = oprs[i].keyStart;
          var end = oprs[i].keyEnd;
          var startVal = parseFloat(data[start]);
          var endVal = parseFloat(data[end]);
          startVal?datawithopr["search_"+CONST.OPERATOR.GTE+"_"+truekey]= startVal:"";
          endVal? datawithopr["search_"+CONST.OPERATOR.LTE+"_"+truekey]= endVal:"";
        }
        if(data[key] == undefined||data[key] === ""||data[key] === CONST.DEFAULTOPTION){
          continue
        }else{
          // 去除前后空格
          if((typeof data[key]) == 'string'){
            data[key] = data[key].trim();
          }
        }
        // 处理like前后拼接百分号
        if(curOpr == CONST.OPERATOR.LIKE){
          if(oprs[i].likeposition){
            if(oprs[i].likeposition == "left"){
              data[key] = "%"+data[key];
            }else if(oprs[i].likeposition == "right"){
              data[key] = data[key]+"%";
            }
          }else{
            data[key] = "%"+data[key]+"%";
          }
        }
        //搜索条件中的相关表字段处理
        if(key.indexOf("--")>-1){
          truekey = truekey.replaceAll("--",".");
        }
        // 搜索条件中的日期范围类型处理
        if(oprs[i].type == "daterange"){
          truekey = truekey + "_date";
          //处理开始日期和结束日期
          var truetime = data[key].split(";");
          var startTime = parseFloat(truetime[0]);
          var endTime = parseFloat(truetime[1]);
          var tempendTime = new Date(endTime);
          tempendTime.setDate(tempendTime.getDate()+1);
          endTime = tempendTime.getTime();

          //拼接搜索条件
          datawithopr["search_"+CONST.OPERATOR.GTE+"_"+truekey]= startTime;
          datawithopr["search_"+CONST.OPERATOR.LT+"_"+truekey]= endTime;
          continue;
        }
        // 搜索条件中的单独日期类型处理
        if(oprs[i].type == "date"&&oprs[i].startkey&&oprs[i].endkey){
          var startkey = oprs[i].startkey+ "_date";
          var endkey = oprs[i].endkey+ "_date";
          //对应数据库两个字段
          var truetime = data[key];
          //拼接搜索条件
          datawithopr["search_"+CONST.OPERATOR.LTE+"_"+startkey]= truetime;
          datawithopr["search_"+CONST.OPERATOR.GTE+"_"+endkey]= truetime;

          continue;
        }

        datawithopr["search_"+curOpr+"_"+truekey]= data[key];
        /**
         * 树形参照时，可转id查询参数为treeCode，方便查询当前节点及其下级
         * referId(必有) string 方便获取参照，取treeCode 
         * ifSeachTreeCode（必有）boolean 是否转treeCode进行查询
         */
        if(oprs[i].referId && oprs[i].ifSeachTreeCode && oprs[i].ifSeachTreeCode === true) {
          var refValues = $("#refContainer" + oprs[i].referId).data("uui.refer").values;
          if(refValues && refValues[0] && refValues[0].treeCode) {
            if(oprs[i].key.indexOf("--") > 0) {
              if(oprs[i].key.split("--")[0] == "parent") {
                datawithopr["search_LIKE_treeCode"] = refValues[0].treeCode+"%";
              } else {
                datawithopr["search_LIKE_"+ oprs[i].key.split("--")[0] +".treeCode"] = refValues[0].treeCode+"%";
              }
            } else {
              datawithopr["search_LIKE_treeCode"] = refValues[0].treeCode+"%";
            }
            delete datawithopr["search_"+curOpr+"_"+truekey];
          }
        }
      }
    }
    return datawithopr;
  }
  function setSearchValue(field,data){
    this.viewModel.params.setValue(field,data);
  }
  function setSearchData(data){
    this.viewModel.params.setSimpleData(data);
  }
  function clearSearch(){
    this.viewModel.params.removeAllRows();
    this.viewModel.params.createEmptyRow();
  }
  function generateTpl(option){
    var htmlstr =
      '<div class="ui-item ui-search-item '+
      option.cls+'">'+
      '<span class="ui-name '+option.labelcls+'">'+
      option.label +
      '：'+
      '</span>';
    option.domid ? htmlstr += '<div id='+option.domid : htmlstr += '<div';
    htmlstr += ' class="ui-inputarea '+option.inputCls+'" '+ option.meta +'>'+
      option.content+
      '</div>'+
      '</div>';
    return htmlstr;
  }
  function oprHandle(oprs,option){
    //默认搜索条件为完全匹配
    var opr = CONST.OPERATOR.EQ;
    //文本类型的条件为相似匹配
    if(option.type == "text"){
      opr = CONST.OPERATOR.LIKE;
    }
    if(option.type == "checkboxlist"){
      opr = CONST.OPERATOR.IN;
    }
    //下拉框多选，参照多选，使用in匹配
    if(option.multi){
      opr = CONST.OPERATOR.IN;
    }
    //如果option中声明了操作符类型，则该操作符优先级最高
    if(option.opr){
      opr = option.opr;
    }
    if(option.key){
      var item = u.extend({},option,{opr:opr});
      oprs.push(item);
    }
  }
  function eventBind(element, showAll){
    // 展示全部不折叠
    if(showAll) {
      return;
    }
    // 如果查询组件初始化时没有高度（元素或者祖先元素是隐藏的），则轮询等待组件具备高度
    if($(element).height() == 0) {
      var waitSearcherShow = setInterval(function() {
        // 查询组件有高度时处理更多按钮，并终止轮询
        if($(element).height() > 0) {
          moreBtnHandle(element);
          clearInterval(waitSearcherShow);
        }
      }, 500);
    }
    else {
      moreBtnHandle(element);
    }
  }
  function moreBtnHandle(element) {
    if($(element).height() > 44) {
      $(element).addClass("ui-collapse");
      var morebtn = $(element).parent().find(".ui-search-more");
      morebtn.removeClass("hidden");
      morebtn.click(function(){
        $(element).toggleClass("ui-collapse");
        morebtn.toggleClass("expand")
      })
    }
  }
  function collapseBind(element){
    var container = $(element).parent();
    var morebtn = container.find(".ui-search-more");
    container.addClass("ui-collapse");
    morebtn.removeClass("hidden");
    morebtn.click(function(){
      container.toggleClass("ui-collapse");
      morebtn.toggleClass("expand")
    })
  }

  return searchbox;
});
