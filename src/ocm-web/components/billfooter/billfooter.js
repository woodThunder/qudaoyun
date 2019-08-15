define([],function(){
  function billfooter(elements, viewModel, dataTableName) {
    var options = [
      {
        label: "创建人",
        field: "creator",
      },
      {
        label: "创建时间",
        field: "creationTime",
      },
      {
        label: "修改人",
        field: "modifier",
      },
      {
        label: "修改时间",
        field: "modifiedTime",
      },
    ]
    if(u.isArray(elements) && elements.length > 0) {
      for(var j =0; j<elements.length; j++) {
        var ele = elements[j];
        var content = '';
        for(var i=0; i< options.length;i++) {
          content += '' +
          '<span class="ui-bill-footer-item">' +
            '<label class="ui-bill-footer-name">'+options[i].label+'：</label>' +
            '<span class="ui-bill-footer-val" data-bind="text: '+dataTableName+'.ref(\''+options[i].field+'\')()? '+dataTableName+'.ref(\''+options[i].field+'\'): \'--\'"></span>' +
          '</span>'
        }
        ele.innerHTML = content;
        ko.cleanNode(ele);
        ko.applyBindings(viewModel, ele);
      }
    }
    else {
      throw new error("请传入正确的Element数组")
    }  
  }
  return billfooter;
})
