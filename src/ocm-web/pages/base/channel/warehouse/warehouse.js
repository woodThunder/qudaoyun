define(['ocm_simpleview', './meta.js'], function (simpleview, model) {
  var viewModel;
  var view = simpleview.extend({
    beforeCreate: function () {
      viewModel = this.viewModel;
    },
    model: model,
    baseData: {
      dialogWidth: '900px',
      baseurl: '/base/channel/warehouses',
      simpleList: new u.DataTable(model.options.metas.WareHousemeta),
      statusField: 'isEnable',
      buttonSource: model.options.buttons.button1,
      searchcomp: {},
      searchSource: model.options.searchs.search1,
      dialogcardcomp: {},
      dialogcardSource: model.options.dialogs.dialog1,
      detailSource: model.options.details.detail1,
      gridOption: model.options.grids.grid1,
      //是否启用
      enableFmt: ko.pureComputed(function () {
        var status = viewModel.simpleList.ref("isEnable")();
        var statusName
        if (status == 0) {
          (statusName = "未启用")
        }
        if (status == 1) {
          (statusName = "已启用")
        }
        if (status == 2) {
          (statusName = "已停用")
        }
        return statusName;
      }),
      //是否冻结
      isFrozenFmt: ko.pureComputed(function () {
        var status = viewModel.simpleList.ref("isFrozen")();
        var statusName
        if (status == 0) {
          (statusName = "否")
        }
        if (status == 1) {
          (statusName = "是")
        }
        return statusName;
      }),
      //货位管理
      ifSlotManageFmt: ko.pureComputed(function () {
        var status = viewModel.simpleList.ref("ifSlotManage")();
        var statusName
        if (status == 0) {
          (statusName = "否")
        }
        if (status == 1) {
          (statusName = "是")
        }
        return statusName;
      }),
      //进行成本计算
      ifCalcInventoryCostFmt: ko.pureComputed(function () {
        var status = viewModel.simpleList.ref("ifCalcInventoryCost")();
        var statusName
        if (status == 0) {
          (statusName = "否")
        }
        if (status == 1) {
          (statusName = "是")
        }
        return statusName;
      }),

    },
    events: u.extend({}, simpleview.prototype.events, {
      beforeEdit: function(index, rowId) {
        var title;
        viewModel.index = index;

        //渠道商不能选择所属客户，默认选择自己关联的客户
        var ownerCustomer = viewModel.dialogcardcomp.app.getComp("ownerCustomerId");
        var customerStr = localStorage.getItem('_A_P_customer');
        var customer = JSON.parse(customerStr);
        viewModel.dialogcardcomp.viewModel.params.setValue("ownerCustomerId", customer.id);
        ownerCustomer.setEnable(false);
        
        if (u.isNumber(index)) {
          //修改操作
          title = "编辑";
          var currentData = viewModel.simpleList.getRowByRowId(rowId).getSimpleData();
          viewModel.rowId = rowId;
          viewModel.dialogcardcomp.seteidtData(currentData);
        } else {
          title = "新增"
          //清空编辑框的信息
          viewModel.dialogcardcomp.cleareidt();
        }
        //显示模态框
        viewModel.dialogWidth ?
          viewModel.dialogcardcomp.show(title, viewModel.dialogWidth, viewModel.edit) :
          viewModel.dialogcardcomp.show(title, "500px", viewModel.edit);
      },

      frozen: function () {
        //启用
        var selectedRows = viewModel.simpleList.getSelectedRows();
        if (selectedRows && selectedRows.length > 0) {
          var ids = selectedRows.map(function (row, index, arr) {
            return row.getValue("id");
          })
          $._ajax({
            type: "post",
            url: appCtx + viewModel.baseurl + "/batch-frozen",
            data: {
              ids: ids.join(",")
            },
            success: function (res) {
              for (var i = 0; i < selectedRows.length; i++) {
                selectedRows[i].setValue("isFrozen", "1");
              }
            }
          })
        } else {
          toastr.warning("请至少选择一项");
        }
      },
      unfrozen: function () {
        //启用
        var selectedRows = viewModel.simpleList.getSelectedRows();
        if (selectedRows && selectedRows.length > 0) {
          var ids = selectedRows.map(function (row, index, arr) {
            return row.getValue("id");
          })
          $._ajax({
            type: "post",
            url: appCtx + viewModel.baseurl + "/batch-unfrozen",
            data: {
              ids: ids.join(",")
            },
            success: function (res) {
              for (var i = 0; i < selectedRows.length; i++) {
                selectedRows[i].setValue("isFrozen", "0");
              }
            }
          })
        } else {
          toastr.warning("请至少选择一项");
        }
      }
    }),
    afterCreate: function () {
      // 基本信息
      // var inventoryOrg = viewModel.dialogcardcomp.app.getComp("inventoryOrgId");
      // var ownerCustomer = viewModel.dialogcardcomp.app.getComp("ownerCustomerId");
      // var ownerSupplier = viewModel.dialogcardcomp.app.getComp("ownerSupplierId");
      // inventoryOrg.element.parentElement.hidden = true;
      // ownerCustomer.element.parentElement.hidden = true;
      // ownerSupplier.element.parentElement.hidden = true;
      // viewModel.dialogcardcomp.viewModel.params.on("warehouseOwnershipCode.valuechange", function (obj) {
      //   var inventoryOrg = viewModel.dialogcardcomp.app.getComp("inventoryOrgId");
      //   var ownerCustomer = viewModel.dialogcardcomp.app.getComp("ownerCustomerId");
      //   var ownerSupplier = viewModel.dialogcardcomp.app.getComp("ownerSupplierId");
      //   inventoryOrg.element.parentElement.hidden = true;
      //   ownerCustomer.element.parentElement.hidden = true;
      //   ownerSupplier.element.parentElement.hidden = true;
      //   inventoryOrg.setRequired(false);
      //   inventoryOrg.validate.required = false;
      //   ownerCustomer.setRequired(false);
      //   ownerCustomer.validate.required = false;
      //   ownerSupplier.setRequired(false);
      //   ownerSupplier.validate.required = false;
      //   var html = '<span class="ui-redstar">*</span>'
      //   if (obj.newValue == 1) {
      //     inventoryOrg.setEnable(true);
      //     inventoryOrg.setValue("");
      //     inventoryOrg.element.parentElement.hidden = false;

      //     inventoryOrg.setRequired(true);
      //     inventoryOrg.validate.required = true;
      //     ownerCustomer.setRequired(false);
      //     ownerCustomer.validate.required = false;
      //     ownerSupplier.setRequired(false);
      //     ownerSupplier.validate.required = false;
      //     inventoryOrg.validate.nullMsg = "不能为空！"
      //     if (inventoryOrg.element.parentElement.children[0].innerHTML.indexOf("*") == -1) {
      //       html += inventoryOrg.element.parentElement.children[0].innerHTML
      //     } else {
      //       html = inventoryOrg.element.parentElement.children[0].innerHTML
      //     }
      //     inventoryOrg.element.parentElement.children[0].innerHTML = html
      //   }
      //   if (obj.newValue == 2) {
      //     ownerCustomer.setEnable(true);
      //     ownerCustomer.setValue("");
      //     ownerCustomer.element.parentElement.hidden = false;

      //     inventoryOrg.setRequired(false);
      //     inventoryOrg.validate.required = false;
      //     ownerCustomer.setRequired(true);
      //     ownerCustomer.validate.required = true;
      //     ownerSupplier.setRequired(false);
      //     ownerSupplier.validate.required = false;
      //     ownerCustomer.validate.nullMsg = "不能为空！"
      //     if (ownerCustomer.element.parentElement.children[0].innerHTML.indexOf("*") == -1) {
      //       html += ownerCustomer.element.parentElement.children[0].innerHTML
      //     } else {
      //       html = ownerCustomer.element.parentElement.children[0].innerHTML
      //     }
      //     ownerCustomer.element.parentElement.children[0].innerHTML = html


      //   }
      //   if (obj.newValue == 3) {
      //     ownerSupplier.setEnable(true);
      //     ownerSupplier.setValue("");
      //     ownerSupplier.element.parentElement.hidden = false;

      //     inventoryOrg.setRequired(false);
      //     inventoryOrg.validate.required = false;
      //     ownerCustomer.setRequired(false);
      //     ownerCustomer.validate.required = false;
      //     ownerSupplier.setRequired(true);
      //     ownerSupplier.validate.required = true;
      //     ownerSupplier.validate.nullMsg = "不能为空！"
      //     if (ownerSupplier.element.parentElement.children[0].innerHTML.indexOf("*") == -1) {
      //       html += ownerSupplier.element.parentElement.children[0].innerHTML
      //     } else {
      //       html = ownerSupplier.element.parentElement.children[0].innerHTML
      //     }
      //     ownerSupplier.element.parentElement.children[0].innerHTML = html

      //   }
      // });


      viewModel.dialogcardcomp.viewModel.params.on("countryId.valuechange", function (obj) {
        var provinceValue = {
          "EQ_country.id": obj.newValue,
          "EQ_areaLevel": "1"
        };
        $("#provinceIdinfo").attr("data-refparam", JSON.stringify(provinceValue));
        var provinceId = viewModel.app.getComp("provinceIdBase");
        viewModel.dialogcardcomp.viewModel.params.setValue("provinceId", "");
      });

      //基本信息   省、城市、区县、街道四级联动
      viewModel.dialogcardcomp.viewModel.params.on("provinceId.valuechange", function (obj) {
        var cityValue = {
          "EQ_parent.id": obj.newValue
        };
        $("#cityIdinfo").attr("data-refparam", JSON.stringify(cityValue));
        var cityId = viewModel.app.getComp("cityIdBase");
        viewModel.dialogcardcomp.viewModel.params.setValue("cityId", "");
      });
      viewModel.dialogcardcomp.viewModel.params.on("cityId.valuechange", function (obj) {
        var countyValue = {
          "EQ_parent.id": obj.newValue
        };
        $("#countyIdinfo").attr("data-refparam", JSON.stringify(countyValue));
        var countyId = viewModel.app.getComp("countyIdBase");
        viewModel.dialogcardcomp.viewModel.params.setValue("countyId", "");
      });
      viewModel.dialogcardcomp.viewModel.params.on("countyId.valuechange", function (obj) {
        //       var a=JSON.parse($("#townIdinfo").attr("data-refparam"));
        //       a["EQ_parent.id"]=obj.newValue;
        var townValue = {
          "EQ_parent.id": obj.newValue
        };
        $("#townIdinfo").attr("data-refparam", JSON.stringify(townValue));
        var townId = viewModel.app.getComp("townIdBase");
        viewModel.dialogcardcomp.viewModel.params.setValue("townId", "");
      });

    }
  });

  return view;
});

