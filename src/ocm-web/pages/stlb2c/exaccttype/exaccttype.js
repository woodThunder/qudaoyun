define(['ocm_simpleview', './meta.js'], function (simpleview, model) {
    var viewModel;
    var view = simpleview.extend({
      beforeCreate:function(){
        viewModel = this.viewModel;
      },
      model:model,
      baseData:{
        baseurl: '/stlb2c/exacct-types',
        simpleList: new u.DataTable(model.options.metas.ExacctTypemeta),
        statusField:'isEnable',
        buttonSource: model.options.buttons.button1,
        searchcomp: {},
        searchSource: model.options.searchs.search1,
        dialogcardcomp: {},
        dialogcardSource: model.options.dialogs.dialog1,
        gridOption: model.options.grids.grid1
      },
      rendertype: {
        typeRender:function(obj) {
          var showValue;
          if(obj.value == "1"){
            showValue = "支出"
          }else if(obj.value == "2"){
            showValue = "收入"
          }
          obj.element.innerHTML = showValue;
        },
        enableRender:function(obj) {
          var showValue;
          if(obj.value == "0"){
            showValue = "未启用"
          }else if(obj.value == "1"){
            showValue = "已启用"
          }else if(obj.value == "2"){
            showValue = "已停用"
          }
          obj.element.innerHTML = showValue;
        },
        operation: function (obj) {
          var viewModel = obj.gridObj.viewModel;
          var dataTableRowId = obj.row.value["$_#_@_id"];
          var delfun =
              "data-bind=click:del.bind($data," +
              obj.rowIndex +
              "," +
              dataTableRowId +
              ")";
          var editfun =
              "data-bind=click:beforeEdit.bind($data," +
              obj.rowIndex +
              "," +
              dataTableRowId +
              ")";
          var alterfun =
              "data-bind=click:showAlter.bind($data," +
              obj.rowIndex +
              "," +
              dataTableRowId +
              ")";
          obj.element.innerHTML =
              "<div class=\"ui-handle-icon\">" +
              "<span class=\"ui-handle-word\">" +
              "<a href=\"#\" " +
              editfun +
              " title=\"编辑\">编辑</a>" +
              "</span>    " +
              "<span class=\"ui-handle-word\">" +
              "<a href=\"#\" " +
              delfun +
              " title=\"删除\">删除</a>" +
              "</span></div>";
          ko.cleanNode(obj.element);
          ko.applyBindings(viewModel, obj.element);
      },
      }
    });
  
    return view;
  });
  
