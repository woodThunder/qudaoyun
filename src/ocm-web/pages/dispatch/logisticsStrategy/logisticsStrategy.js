define(['ocm_simpleview', './meta.js', 'ocm_common', "text!./logisticsStrategy.html"], function (simpleview, model, common, tpl) {
  var viewModel;
  var view = simpleview.extend({
    beforeCreate: function () {
      viewModel = this.viewModel;
    },
    tpl: tpl,
    model: model,
    baseData: {
      baseurl: '/dispatch/b2b-match-strategys',
      simpleList: new u.DataTable(model.options.metas.logisticsStrategymeta),
      statusField: 'isEnable',
      buttonSource: model.options.buttons.button1,
      searchcomp: {},
      searchSource: model.options.searchs.search1,
      dialogcardcomp: {},
      dialogcardSource: model.options.dialogs.dialog1,
      gridOption: model.options.grids.grid1,
    },
    rendertype: u.extend({}, common.rendertype, {
      // 单表操作
      operation4single: function (obj) {
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

        obj.element.innerHTML =
          '<div class="ui-handle-icon">' +
          '<span class="ui-handle-word">' +
          '<a href="#" ' +
          editfun +
          ' title="编辑">编辑</a>' +
          "</span>    " +
          '<span class="ui-handle-word">' +
          '<a href="#" ' +
          delfun +
          ' title="删除">删除</a>' +
          "</span></div>";
        ko.cleanNode(obj.element);
        ko.applyBindings(viewModel, obj.element);
      },
      //优先维度
      dimensionRender: function (obj) {
        var stateValue = viewModel.simpleList.getRow(obj.rowIndex).getValue("dimension");
        var stateName;
        stateValue == 1 ? (stateName = "收货地址") : (stateName = "商品");
        obj.element.innerHTML = stateName;
      },
    }),
    events: u.extend({}, simpleview.prototype.events, {
      //弹出卡片编辑窗(通过index区分是编辑还是新增，-1为新增，大于等于0为编辑)
      beforeEdit: function (index, rowId) {
        var title;
        viewModel.index = index;
        if (u.isNumber(index)) {
          //修改操作
          title = "编辑";
          var currentData = viewModel.simpleList
            .getRowByRowId(rowId)
            .getSimpleData();
          viewModel.rowId = rowId;
          viewModel.dialogcardcomp.seteidtData(currentData);
        } else {
          title = "新增";
          //清空编辑框的信息
          viewModel.dialogcardcomp.cleareidt();
        }
        //显示模态框
        viewModel.dialogWidth
          ? viewModel.dialogcardcomp.show(
            title,
            viewModel.dialogWidth,
            viewModel.edit
          )
          : viewModel.dialogcardcomp.show(title, "500px", viewModel.edit);
      },

      //将操作后的数据进行保存
      edit: function () {
        var result = viewModel.dialogcardcomp.validate();
        if (result.passed) {
          var index = viewModel.index;
          var currentRow, type = "post";
          var postdata = viewModel.dialogcardcomp.geteidtData();
          if (postdata.goodsId && postdata.productLineId) {
            toastr.warning("产品线和商品不能同时维护！");
            return;
          }
          var linkOrgs = [];
          if (postdata.linkOrgsId && postdata.linkOrgsId.length > 0) {
            var linkOrgsIds = postdata.linkOrgsId.split(",");
            if (linkOrgsIds && linkOrgsIds.length > 0) {
              for (var i = 0; i < linkOrgsIds.length; i++) {
                linkOrgs.push({ saleOrgId: linkOrgsIds[i] });
              }
            }
          }
          postdata.linkOrgs = linkOrgs;
          postdata.type = 3;
          if (index >= 0) {
            type = "put";
          }
          //更改后台数据
          $._ajax({
            url: appCtx + viewModel.baseurl,
            type: type,
            data: JSON.stringify(postdata),
            contentType: "application/json; charset=utf-8",
            success: function () {
              viewModel.dialogcardcomp.close();
              viewModel.search();
            }
          })
        }
      },
      //根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
      search: function (reindex) {
        if (!viewModel.searchcomp) {
          $('div.ui-searchbox').css('display', 'none');
          // return;
        }
        if (reindex) {
          viewModel.simpleList.pageIndex(0);
        }
        viewModel.simpleList.removeAllRows();
        if (!viewModel.searchcomp) {
          var queryData = {};
        } else {
          var queryData = viewModel.searchcomp.getDataWithOpr ? viewModel.searchcomp.getDataWithOpr() : {};
        }
        queryData.size = viewModel.simpleList.pageSize();
        queryData.page = viewModel.simpleList.pageIndex();
        queryData["search_EQ_type"] = 3
        $._ajax({
          type: "get",
          url: appCtx + (viewModel.searchBaseurl ? viewModel.searchBaseurl : viewModel.baseurl),
          dataType: "json",
          data: queryData,
          success: function (data) {
            var arr = data.content
            if (arr && arr.length > 0) {
              for (var i = 0; i < arr.length; i++) {
                if (arr[i].linkOrgs && arr[i].linkOrgs.length > 0) {
                  var linkOrgs = arr[i].linkOrgs
                  var linkOrgsIds = "";
                  var linkOrgsNames = "";
                  for (var j = 0; j < linkOrgs.length; j++) {
                    linkOrgsIds += linkOrgs[j].saleOrgId;
                    linkOrgsIds += ","
                    linkOrgsNames += linkOrgs[j].saleOrgName;
                    linkOrgsNames += ","
                  }
                  linkOrgsIds = linkOrgsIds.substring(0, linkOrgsIds.length - 1);
                  linkOrgsNames = linkOrgsNames.substring(0, linkOrgsNames.length - 1);
                  arr[i].linkOrgsId = linkOrgsIds
                  arr[i].linkOrgsName = linkOrgsNames
                }
              }
            }

            viewModel.simpleList.setSimpleData(arr, {
              unSelect: true
            });
            viewModel.simpleList.totalRow(data.totalElements);
            viewModel.simpleList.totalPages(data.totalPages);
          }
        })
      },


    }),
    afterCreate: function () {

    }
  });

  return view;
});
