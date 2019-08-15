define(['ocm_simpleview', './meta.js'], function (simpleview, model) {
  var viewModel;
  var view = simpleview.extend({
    beforeCreate: function () {
      viewModel = this.viewModel;
    },
    model: model,
    baseData: {
      dialogWidth: '900px',
      baseurl: '/base/banks',
      excelurl: '/bank-excel',
      simpleList: new u.DataTable(model.options.metas.bankmeta),
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
    },
    afterCreate: function () {
      // 基本信息

      //基本信息   国家、省、城市、区县、街道联动
      viewModel.dialogcardcomp.viewModel.params.on("countryId.valuechange", function (obj) {
        var provinceValue = {
          "EQ_country.id": obj.newValue,
          "EQ_areaLevel": "1",
          "EQ_isEnable":"1"
        };
        $("#provinceIdinfo").attr("data-refparam", JSON.stringify(provinceValue));
        var provinceId = viewModel.app.getComp("provinceIdBase");
        viewModel.dialogcardcomp.viewModel.params.setValue("provinceId", "");
      });

      viewModel.dialogcardcomp.viewModel.params.on("provinceId.valuechange", function (obj) {
        var cityValue = {
          "EQ_parent.id": obj.newValue,
          "EQ_areaLevel": "2",
          "EQ_isEnable":"1"
        };
        $("#cityIdinfo").attr("data-refparam", JSON.stringify(cityValue));
        var cityId = viewModel.app.getComp("cityIdBase");
        viewModel.dialogcardcomp.viewModel.params.setValue("cityId", "");
      });
      viewModel.dialogcardcomp.viewModel.params.on("cityId.valuechange", function (obj) {
        var countyValue = {
          "EQ_parent.id": obj.newValue,
          "EQ_areaLevel": "3",
          "EQ_isEnable":"1"
        };
        $("#countyIdinfo").attr("data-refparam", JSON.stringify(countyValue));
        var countyId = viewModel.app.getComp("countyIdBase");
        viewModel.dialogcardcomp.viewModel.params.setValue("countyId", "");
      });
      viewModel.dialogcardcomp.viewModel.params.on("countyId.valuechange", function (obj) {
        //       var a=JSON.parse($("#townIdinfo").attr("data-refparam"));
        //       a["EQ_parent.id"]=obj.newValue;
        var townValue = {
          "EQ_parent.id": obj.newValue,
          "EQ_areaLevel": "4",
          "EQ_isEnable":"1"
        };
        $("#townIdinfo").attr("data-refparam", JSON.stringify(townValue));
        var townId = viewModel.app.getComp("townIdBase");
        viewModel.dialogcardcomp.viewModel.params.setValue("townId", "");
      });
        viewModel.dialogcardcomp.viewModel.params.on("superiorBankId.valuechange", function (obj) {
            var simple = viewModel.simpleList.getValue("id");
            if (obj.newValue==simple){
                viewModel.dialogcardcomp.viewModel.params.setValue("superiorBankId", "");
                viewModel.dialogcardcomp.viewModel.params.setValue("superiorBankCode", "");
                viewModel.dialogcardcomp.viewModel.params.setValue("superiorBankName", "");
                var townId = viewModel.app.getComp("bank");
                viewModel.dialogcardcomp.viewModel.params.setValue(townId, "");
            }
        });
    }
  });

  return view;
});

