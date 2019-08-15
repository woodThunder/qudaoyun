define([
  "text!./fullcarrulemanage.html",
  "ocm_simpleview",
  "./meta.js",
  "ocm_common"
], function(tpl, simpleview, model, common) {
  var viewModel;
  var view = simpleview.extend({
    tpl: tpl,
    rendertype: Object.assign(
      {
        // 检查维度
        fullcarRender: function(params) {
          params.element.innerHTML = "";
          /*默认1表示启用，0表示停用*/
          if (params.value != 0 && params.value != "1") {
            params.element.innerHTML = "体积";
          } else {
            params.element.innerHTML = "重量";
          }
        },
        // 单表操作
        operation4spec: function(obj) {
          var viewModel = obj.gridObj.viewModel;
          var dataTableRowId = obj.row.value["$_#_@_id"];
          var delfun =
            "data-bind=click:ruledel.bind($data," +
            obj.rowIndex +
            "," +
            dataTableRowId +
            ")";
          var editfun =
            "data-bind=click:addruleFn.bind($data," +
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
        // 规则设置rendertype
        isSpecRender: function(obj) {
          var viewModel = obj.gridObj.viewModel;
          var dataTableRowId = obj.row.value["$_#_@_id"];
          var delfun =
            "data-bind=click:fullcarruleFn.bind($data," +
            obj.rowIndex +
            "," +
            dataTableRowId +
            ")";
          if (obj.value != 0 && obj.value != "0") {
            obj.element.innerHTML =
              '<div class="ui-handle-icon">' +
              '<span class="ui-handle-word">' +
              '<a href="#" ' +
              delfun +
              ' title="编辑特殊区域">编辑特殊区域</a>' +
              "</span></div>";
          }
          ko.cleanNode(obj.element);
          ko.applyBindings(viewModel, obj.element);
        }
      },
      common.rendertype
    ),
    beforeCreate: function() {
      viewModel = this.viewModel;
      // 进入规则页面
      viewModel.fullcarruleFn = function(val, rowId) {
        viewModel.trayId;
        var supttypeId = viewModel.simpleList.getRowByRowId(rowId).data.id.value;
        viewModel.trayId = supttypeId;
        viewModel.rulesearch(supttypeId);
        viewModel.goBillPanel();
      };
      // 返回
      viewModel.goback = function() {
        //返回列表页
        $(".ui-panel").hide();
        $(".ui-list-panel").show();
        $(".ui-list-panel").animateCss("fadeIn");
      };
      // 规则新增
      viewModel.addruleFn = function(index, rowId) {
        var title;
        viewModel.index = index;
        if (u.isNumber(index)) {
          //修改操作
          title = "编辑";
          var currentData = viewModel.rulessimpleList
            .getRowByRowId(rowId)
            .getSimpleData();
          viewModel.rowId = rowId;
          viewModel.rulesdialogcardcomp.seteidtData(currentData);
        } else {
          title = "新增";
          //清空编辑框的信息
          viewModel.rulesdialogcardcomp.cleareidt();
        }
        //显示模态框
        viewModel.dialogWidth
          ? viewModel.rulesdialogcardcomp.show(
              title,
              viewModel.dialogWidth,
              viewModel.ruleedit
            )
          : viewModel.rulesdialogcardcomp.show(
              title,
              "500px",
              viewModel.ruleedit
            );
      };
      // 规则编辑
      viewModel.ruleedit = function() {
        var result = viewModel.rulesdialogcardcomp.validate();
        var editVerify = function(value) {
          if (
            isNaN(value.maxLoadableVolume) ||
            isNaN(value.maxLoadableWeight)
          ) {
            toastr.warning("请输入数字！");
            return true;
          } else if (
            (!isNaN(value.maxLoadableVolume) &&
              value.maxLoadableVolume.toString().indexOf(".") != -1 &&
              value.maxLoadableVolume.toString().split(".")[1].length > 2) ||
            (!isNaN(value.maxLoadableWeight) &&
              value.maxLoadableWeight.toString().indexOf(".") != -1 &&
              value.maxLoadableWeight.toString().split(".")[1].length > 2)
          ) {
            var toastText = "您填写的";
            if (
              value.maxLoadableVolume.toString().indexOf(".") != -1 &&
              value.maxLoadableVolume.toString().split(".")[1].length > 2
            ) {
              toastText = toastText + ",装载体积超过小数点后2位了";
            }
            if (
              value.maxLoadableWeight.toString().indexOf(".") != -1 &&
              value.maxLoadableWeight.toString().split(".")[1].length > 2
            ) {
              toastText = toastText + ",装载重量超过小数点后2位了";
            }
            toastr.warning(toastText);
            return true;
          }
        };
        if (result.passed) {
          var index = viewModel.index;
          var currentRow,
            type = "post";
          var postdata = viewModel.rulesdialogcardcomp.geteidtData();
          //  对新增保存时有其他需求的校验添加的方法（命名editExtend） ---syf
          if (editVerify(postdata)) {
            return;
          }
          if (index >= 0) {
            type = "put";
          }
          // 将托型的id赋给子表
          postdata.filledTruckRule = viewModel.trayId;
          //更改后台数据
          $._ajax({
            url: appCtx + viewModel.rulebaseurl,
            type: type,
            data: JSON.stringify(postdata),
            contentType: "application/json; charset=utf-8",
            success: function(data) {
              //如果index大于等于0说明是修改
              viewModel.rulesdialogcardcomp.close();
              if (index >= 0) {
                //获取需要修改的行
                currentRow = viewModel.rulessimpleList.getRowByRowId(
                  viewModel.rowId
                );
                //将用户填写的数据更新到rulessimpleList上
              } else {
                //添加数据
                currentRow = viewModel.rulessimpleList.createEmptyRow();
              }
              currentRow.setSimpleData(data);
            }
          });
        }
      };
      // 规则删除
      viewModel.ruledel = function(index, rowId) {
        if (typeof(index) == "number") {
          viewModel.rulessimpleList.setRowSelectbyRowId(rowId);
        }
        var ids = [];
        var rows = viewModel.rulessimpleList.getSelectedRows();
        if (rows && rows.length > 0) {
          for (var i = 0; i < rows.length; i++) {
            ids.push(rows[i].getValue("id"));
          }
          common.dialog.confirmDialog({
            msg1: "确认删除这些项？",
            msg2: "此操作不可逆",
            width: "400px",
            type: "error",
            onOk: function() {
              $._ajax({
                url: appCtx + viewModel.rulebaseurl + "/delete",
                type: "post",
                // data: "ids=" + ids.join(","),
                data: {
                  ids: ids.join(",")
                },
                success: function(data) {
                  viewModel.rulesearch(viewModel.trayId);
                }
              });
            }
          });
        } else {
          toastr.warning("请至少选择一项");
        }
      };
      // 规则查询
      viewModel.rulesearch = function(reindex) {
        if (!viewModel.rulessearchcomp) {
          $("div.ui-searchbox").css("display", "none");
          // return;
        }

        viewModel.rulessimpleList.removeAllRows();

        if (!reindex) {
          var queryData = {};
        } else {
          var queryData = reindex
            ? { "search_IN_filledTruckRule.id": reindex }
            : {};
        }
        queryData.size = viewModel.rulessimpleList.pageSize();
        queryData.page = viewModel.rulessimpleList.pageIndex();
        $._ajax({
          type: "get",
          url: appCtx + viewModel.rulebaseurl,
          dataType: "json",
          data: queryData,
          success: function(data) {
            viewModel.rulessimpleList.setSimpleData(data.content, {
              unSelect: true
            });
            viewModel.rulessimpleList.totalRow(data.totalElements);
            viewModel.rulessimpleList.totalPages(data.totalPages);
          }
        });
      };
    },
    afterCreate: function() {
      //基本信息   省、城市、区县、街道四级联动
      viewModel.rulesdialogcardcomp.viewModel.params.on(
        "provinceId.valuechange",
        function(obj) {
          var cityValue = {
            EQ_areaLevel: "2",
            "EQ_parent.id": obj.newValue
          };
          $("#cityIdinfo").attr("data-refparam", JSON.stringify(cityValue));
          // viewModel.rulesdialogcardcomp.viewModel.params.meta.cityId.refparam = cityValue
          var cityId = viewModel.app.getComp("cityIdBase");
          viewModel.rulesdialogcardcomp.viewModel.params.setValue(
            "cityId",
            null
          );
        }
      );
      viewModel.rulesdialogcardcomp.viewModel.params.on(
        "cityId.valuechange",
        function(obj) {
          var countyValue = {
            EQ_areaLevel: "3",
            "EQ_parent.id": obj.newValue
          };
          $("#countyIdinfo").attr("data-refparam", JSON.stringify(countyValue));
          var countyId = viewModel.app.getComp("countyIdBase");
          viewModel.rulesdialogcardcomp.viewModel.params.setValue(
            "countyId",
            null
          );
        }
      );
    },

    model: model,
    baseData: {
      baseurl: "/b2b/filled-truck-rules",
      simpleList: new u.DataTable(model.options.metas.poControlRulemeta),
      buttonSource: model.options.buttons.button1,
      searchcomp: {},
      searchSource: model.options.searchs.search1,
      dialogcardcomp: {},
      dialogcardSource: model.options.dialogs.dialog1,
      gridOption: model.options.grids.grid1,

      // 规则设置
      goBillPanel: common.bill.goBillPanel,
      rulebaseurl: "/b2b/special-area-mgts",
      rulessimpleList: new u.DataTable(model.options.metas.ruleSettingmeta),
      rulesbuttonSource: model.options.buttons.button2,
      rulessearchcomp: {},
      rulesdialogcardcomp: {},
      rulesdialogcardSource: model.options.dialogs.dialog2,
      rulesgridOption: model.options.grids.grid2
    }
  });
  return view;
});
