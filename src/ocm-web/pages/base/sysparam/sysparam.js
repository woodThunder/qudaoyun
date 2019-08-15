define(['ocm_simpleview', './meta.js'], function (simpleview, model) {
  var viewModel;
  var view = simpleview.extend({
    beforeCreate: function () {
      viewModel = this.viewModel;
    },
    model: model,
    baseData: {
      baseurl: '/base/sys-params',
      simpleList: new u.DataTable(model.options.metas.SysParamMeta),
      statusField: 'isEnable',
      buttonSource: null,
      searchcomp: {},
      searchSource: model.options.searchs.search1,
      dialogcardcomp: {},
      dialogcardSource: model.options.dialogs.dialog1,
      gridOption: model.options.grids.grid1
    },
    events: u.extend({}, simpleview.prototype.events, {


      beforeEdit: function (index, rowId) {
        var title;
        viewModel.index = index;

        var valueText = viewModel.dialogcardcomp.app.getComp("valueText");
        var valueBoolean = viewModel.dialogcardcomp.app.getComp("valueBoolean");
        var valueNumber1 = viewModel.dialogcardcomp.app.getComp("valueNumber1");
        var valueNumber2 = viewModel.dialogcardcomp.app.getComp("valueNumber2");
        var valueDate = viewModel.dialogcardcomp.app.getComp("valueDate");


        if (u.isNumber(index)) {
          //修改操作
          title = "编辑";
          var currentData = viewModel.simpleList.getRowByRowId(rowId).getSimpleData();


          valueText.element.parentElement.parentElement.hidden = true;
          valueBoolean.element.parentElement.hidden = true;
          valueNumber1.element.parentElement.parentElement.hidden = true;
          valueNumber2.element.parentElement.parentElement.hidden = true;
          valueDate.element.parentElement.hidden = true;
          valueText.setRequired(false);
          valueText.validate.required = false;
          valueBoolean.setRequired(false);
          valueBoolean.validate.required = false;
          valueNumber1.setRequired(false);
          valueNumber1.validate.required = false;
          valueNumber2.setRequired(false);
          valueNumber2.validate.required = false;
          valueDate.setRequired(false);
          valueDate.validate.required = false;
          switch (currentData.valueTypeCode) {
            case "01":
              valueText.element.parentElement.parentElement.hidden = false;
              valueText.setRequired(true);
              valueText.validate.required = true;
              break;
            case "02":
              valueBoolean.element.parentElement.hidden = false;
              valueBoolean.setRequired(true);
              valueBoolean.validate.required = true;
              break;
            case "03":
              valueNumber1.element.parentElement.parentElement.hidden = false;
              valueNumber1.setRequired(true);
              valueNumber1.validate.required = true;
              break;
            case "04":
              valueNumber2.element.parentElement.parentElement.hidden = false;
              valueNumber2.setRequired(true);
              valueNumber2.validate.required = true;
              break;
            case "05":
              valueDate.element.parentElement.hidden = false;
              valueDate.setRequired(true);
              valueDate.validate.required = true;
              break;
          }



          viewModel.rowId = rowId;
          viewModel.dialogcardcomp.seteidtData(currentData);
        } else {
          valueText.element.parentElement.parentElement.hidden = false;
          valueBoolean.element.parentElement.hidden = true;
          valueNumber1.element.parentElement.parentElement.hidden = true;
          valueNumber2.element.parentElement.parentElement.hidden = true;
          valueDate.element.parentElement.hidden = true;
          valueText.setRequired(false);
          valueText.validate.required = false;
          valueBoolean.setRequired(false);
          valueBoolean.validate.required = false;
          valueNumber1.setRequired(false);
          valueNumber1.validate.required = false;
          valueNumber2.setRequired(false);
          valueNumber2.validate.required = false;
          valueDate.setRequired(false);
          valueDate.validate.required = false;

          title = "新增"
          //清空编辑框的信息
          viewModel.dialogcardcomp.cleareidt();
        }
        //显示模态框
        viewModel.dialogWidth ?
          viewModel.dialogcardcomp.show(title, viewModel.dialogWidth, viewModel.edit) :
          viewModel.dialogcardcomp.show(title, "500px", viewModel.edit);
      },



      //将操作后的数据进行保存
      edit: function () {
        var result = viewModel.dialogcardcomp.validate();
        if (result.passed) {
          var index = viewModel.index;
          var currentRow, type = "post";
          var postdata = viewModel.dialogcardcomp.geteidtData();
          if (index >= 0) {
            type = "put";
          }

          switch (postdata.valueTypeCode) {
            case "01":
              postdata.value = postdata.valueText;
              break;
            case "02":
              postdata.value = postdata.valueBoolean;
              break;
            case "03":
              postdata.value = postdata.valueNumber1;
              break;
            case "04":
              postdata.value = postdata.valueNumber2;
              break;
            case "05":
              postdata.value = postdata.valueDate;
              break;
          }

          //更改后台数据
          $._ajax({
            url: appCtx + viewModel.baseurl,
            type: type,
            data: JSON.stringify(postdata),
            contentType: "application/json; charset=utf-8",
            success: function (data) {
              //德高423bug，修改后不刷新
              viewModel.search();
              // //如果index大于等于0说明是修改
              viewModel.dialogcardcomp.close();
              // if (index >= 0) {
              //   //获取需要修改的行
              //   currentRow = viewModel.simpleList.getRowByRowId(viewModel.rowId);
              //   //将用户填写的数据更新到simpleList上
              // } else {
              //   //添加数据
              //   currentRow = viewModel.simpleList.createEmptyRow();
              // }
              // currentRow.setSimpleData(data);
            }
          })

        }
      },
      search: function (reindex) {
        if (reindex) {
          viewModel.simpleList.pageIndex(0);
        }
        viewModel.simpleList.removeAllRows();
        var queryData = viewModel.searchcomp.getDataWithOpr ? viewModel.searchcomp.getDataWithOpr() : {};
        queryData.size = viewModel.simpleList.pageSize();
        queryData.page = viewModel.simpleList.pageIndex();
        $._ajax({
          type: "get",
          url: appCtx + (viewModel.searchBaseurl ? viewModel.searchBaseurl : viewModel.baseurl),
          dataType: "json",
          data: queryData,
          success: function (data) {
            for (var i = 0; i < data.content.length; i++) {
              switch (data.content[i].valueTypeCode) {
                case "01":
                  data.content[i].valueText = data.content[i].value;
                  data.content[i].displayValue = data.content[i].value;
                  break;
                case "02":
                  data.content[i].valueBoolean = data.content[i].value;
                  data.content[i].displayValue = data.content[i].value==1?"是":"否";
                  break;
                case "03":
                  data.content[i].valueNumber1 = data.content[i].value;
                  data.content[i].displayValue = data.content[i].value;
                  break;
                case "04":
                  data.content[i].valueNumber2 = data.content[i].value;
                  data.content[i].displayValue = data.content[i].value;
                  break;
                case "05":
                  data.content[i].valueDate = data.content[i].value;
                    var date =  new Date(parseInt(data.content[i].value));
                    var y = 1900+date.getYear();
                    var m = "0"+(date.getMonth()+1);
                    var d = "0"+date.getDate();
                    data.content[i].displayValue = y+"-"+m.substring(m.length-2,m.length)+"-"+d.substring(d.length-2,d.length);

                  break;
              }
            }
            viewModel.simpleList.setSimpleData(data.content, {
              unSelect: true
            });
            viewModel.simpleList.totalRow(data.totalElements);
            viewModel.simpleList.totalPages(data.totalPages);
          }
        })
      },


    }),
    afterCreate: function () {
      var valueText = viewModel.dialogcardcomp.app.getComp("valueText");
      var valueBoolean = viewModel.dialogcardcomp.app.getComp("valueBoolean");
      var valueNumber1 = viewModel.dialogcardcomp.app.getComp("valueNumber1");
      var valueNumber2 = viewModel.dialogcardcomp.app.getComp("valueNumber2");
      var valueDate = viewModel.dialogcardcomp.app.getComp("valueDate");
      valueBoolean.element.parentElement.hidden = true;
      valueNumber1.element.parentElement.parentElement.hidden = true;
      valueNumber2.element.parentElement.parentElement.hidden = true;
      valueDate.element.parentElement.hidden = true;
      valueBoolean.setRequired(false);
      valueBoolean.validate.required = false;
      valueNumber1.setRequired(false);
      valueNumber1.validate.required = false;
      valueNumber2.setRequired(false);
      valueNumber2.validate.required = false;
      valueDate.setRequired(false);
      valueDate.validate.required = false;

      viewModel.dialogcardcomp.viewModel.params.on("valueTypeCode.valuechange", function (obj) {
        // debugger
        valueText.element.parentElement.parentElement.hidden = true;
        valueBoolean.element.parentElement.hidden = true;
        valueNumber1.element.parentElement.parentElement.hidden = true;
        valueNumber2.element.parentElement.parentElement.hidden = true;
        valueDate.element.parentElement.hidden = true;
        valueText.setRequired(false);
        valueText.validate.required = false;
        valueBoolean.setRequired(false);
        valueBoolean.validate.required = false;
        valueNumber1.setRequired(false);
        valueNumber1.validate.required = false;
        valueNumber2.setRequired(false);
        valueNumber2.validate.required = false;
        valueDate.setRequired(false);
        valueDate.validate.required = false;

        if(obj.newValue!=obj.oldValue){
          valueText.setValue("");
          valueBoolean.setModelValue();
          valueNumber1.setValue("");
          valueNumber2.setValue("");
          valueDate.setModelValue();
        }

        switch (obj.newValue) {
          case "01":
            valueText.element.parentElement.parentElement.hidden = false;
            valueText.setRequired(true);
            valueText.validate.required = true;
            break;
          case "02":
            valueBoolean.element.parentElement.hidden = false;
            valueBoolean.setRequired(true);
            valueBoolean.validate.required = true;
            break;
          case "03":
            valueNumber1.element.parentElement.parentElement.hidden = false;
            valueNumber1.setRequired(true);
            valueNumber1.validate.required = true;
            break;
          case "04":
            valueNumber2.element.parentElement.parentElement.hidden = false;
            valueNumber2.setRequired(true);
            valueNumber2.validate.required = true;
            break;
          case "05":
            valueDate.element.parentElement.hidden = false;
            valueDate.setRequired(true);
            valueDate.validate.required = true;
            break;
        }
      })
    }
  });

  return view;
});
