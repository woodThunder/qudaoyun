define(['ocm_simpleview', './meta.js'], function(simpleview, model) {
  'use strict'
  var viewModel;
  var view = simpleview.extend({
    beforeCreate: function() {
      viewModel = this.viewModel;
    },
    model: model,
    baseData: {
      baseurl: '/settlement/settlementTypeSet',
      simpleList: new u.DataTable(model.options.metas.potypemeta),
      buttonSource: model.options.buttons.button1,
      searchcomp: {},
      searchSource: model.options.searchs.search1,
      dialogcardcomp: {},
      dialogcardSource: model.options.dialogs.dialog1,
      detailSource: model.options.details.detail,
      gridOption: model.options.grids.grid1,
      hasSaleOrg: false,
      hasAgency: false,
      hasSettleOrg: false,
      enableFmt: ko.pureComputed(function() {
        var status = viewModel.simpleList.ref("settleRule")();
        return status == 1 ? "自营" : "回购";
      }),
    },
    edit: function() {
      var result = viewModel.dialogcardcomp.validate();
      if (result.passed) {
        var index = viewModel.index;
        var currentRow,
          type = "post";
        var postdata = viewModel.dialogcardcomp.geteidtData();
        //  对新增保存时有其他需求的校验添加的方法（命名editExtend） ---syf
        if (
          viewModel.editVerify &&
          typeof viewModel.editVerify == "function" &&
          viewModel.editVerify(postdata)
        ) {
          return;
        }
        if (index >= 0) {
          type = "put";
        }
        //更改后台数据
        $._ajax({
          url: appCtx + viewModel.baseurl,
          type: type,
          data: JSON.stringify(postdata),
          contentType: "application/json; charset=utf-8",
          success: function(data) {
            //如果index大于等于0说明是修改
            viewModel.dialogcardcomp.close();
            if (index >= 0) {
              //获取需要修改的行
              currentRow = viewModel.simpleList.getRowByRowId(
                viewModel.rowId
              );
              currentRow.setSimpleData(data);
              //将用户填写的数据更新到simpleList上
            } else {
              viewModel.search();
              //添加数据
              // currentRow = viewModel.simpleList.createEmptyRow();
            }

          }
        });
      }
    },
    events: $.extend({}, simpleview.prototype.events, {
      edit: function() {
        if (viewModel.hasAgency) {
          toastr.warning('经销商已有相应组合，请重新选择！');
          return;
        }
        if (viewModel.hasSaleOrg) {
          toastr.warning('销售组织已有相应组合，请重新选择！');
          return;
        }
        if (viewModel.hasSettleOrg) {
          toastr.warning('结算规则已有相应组合，请重新选择！');
          return;
        }
        var result = viewModel.dialogcardcomp.validate();
        if (result.passed) {
          var index = viewModel.index;
          var currentRow,
            type = "post";
          var postdata = viewModel.dialogcardcomp.geteidtData();
          //  对新增保存时有其他需求的校验添加的方法（命名editExtend） ---syf
          if (
            viewModel.editVerify &&
            typeof viewModel.editVerify == "function" &&
            viewModel.editVerify(postdata)
          ) {
            return;
          }
          if (index >= 0) {
            type = "put";
          }
          //更改后台数据
          $._ajax({
            url: appCtx + viewModel.baseurl,
            type: type,
            data: JSON.stringify(postdata),
            contentType: "application/json; charset=utf-8",
            success: function(data) {
              //如果index大于等于0说明是修改
              viewModel.dialogcardcomp.close();
              if (index >= 0) {
                //获取需要修改的行
                currentRow = viewModel.simpleList.getRowByRowId(
                  viewModel.rowId
                );
                currentRow.setSimpleData(data);
                //将用户填写的数据更新到simpleList上
              } else {
                viewModel.search();
                //添加数据
                // currentRow = viewModel.simpleList.createEmptyRow();
              }

            }
          });
        }
      },
    }),
    afterCreate: function() {
      viewModel.dialogcardcomp.viewModel.params.on("saleOrgId.valuechange", function(obj) {
        if (!obj.newValue || obj.newValue == '') return;
        var id = viewModel.dialogcardcomp.viewModel.params.getValue('id') || '';
        var datas = {
            "id": id,
            "saleOrgId": obj.newValue
          },
          agency = viewModel.dialogcardcomp.viewModel.params.getValue('agencyId');
        if (!agency) {
          var sr = viewModel.dialogcardcomp.viewModel.params.getValue('settleRule');
          datas.settleRule = sr;
        } else {
          datas.agencyId = agency;
        }
        $._ajax({
          url: appCtx + "/settlement/checkUnique",
          type: 'get',
          async: false,
          data: datas,
          success: function(data) {
            if (data) {
              toastr.warning('已有相应组合，请重新选择！');
              viewModel.hasSaleOrg = true;
            } else {
              viewModel.hasSaleOrg = false;
            }
          }
        })
      });

      viewModel.dialogcardcomp.viewModel.params.on("agencyId.valuechange", function(obj) {
        if (!obj.newValue || obj.newValue == '') return;
        var id = viewModel.dialogcardcomp.viewModel.params.getValue('id') || '';
        var datas = {
            "id": id,
            "agencyId": obj.newValue
          },
          saleOrg = viewModel.dialogcardcomp.viewModel.params.getValue('saleOrgId');
        if (!saleOrg) {
          var sr = viewModel.dialogcardcomp.viewModel.params.getValue('settleRule');
          datas.settleRule = sr;
        } else {
          datas.saleOrgId = saleOrg;
        }
        $._ajax({
          url: appCtx + "/settlement/checkUnique",
          type: 'get',
          async: false,
          data: datas,
          success: function(data) {
            if (data) {
              toastr.warning('已有相应组合，请重新选择！');
              viewModel.hasAgency = true;
            } else {
              viewModel.hasAgency = false;
            }
          }
        })
      });
      viewModel.dialogcardcomp.viewModel.params.on("settleRule.valuechange", function(obj) {
        if (!obj.newValue || obj.newValue == '') return;
        var id = viewModel.dialogcardcomp.viewModel.params.getValue('id') || '';
        var datas = {
            "id": id,
            "settleRule": obj.newValue
          },
          saleOrg = viewModel.dialogcardcomp.viewModel.params.getValue('saleOrgId');
        if (!saleOrg) {
          var sr = viewModel.dialogcardcomp.viewModel.params.getValue('agencyId');
          datas.agencyId = sr;
        } else {
          datas.saleOrgId = saleOrg;
        }
        $._ajax({
          url: appCtx + "/settlement/checkUnique",
          type: 'get',
          async: false,
          data: datas,
          success: function(data) {
            if (data) {
              toastr.warning('已有相应组合，请重新选择！');
              viewModel.hasSettleOrg = true;
            } else {
              viewModel.hasSettleOrg = false;
            }
          }
        })
      });
    }
  });

  return view;
});