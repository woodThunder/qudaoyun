define(['text!./fourdistributionlist.html', 'ocm_common', 'searchbox', 'editcard', './meta.js', 'ocm_global'], function(tpl, common, searchbox, editcard) {
  'use strict'
  var app, baseData, events, rendertype, viewModel, batchdocSearch;
  baseData = {
    baseurl: '/b2c/dist-relations',
    batchdocList: new u.DataTable(batchdocmeta),
    prodskuref: new u.DataTable(agencymeta),
    pagestatus: CONST.PAGESTATUS.DEFAULT,
    gridcomp: {},
    tempdata: [],
    isSendArea: [{
      value: "1",
      name: '是'
    }, {
      value: "0",
      name: '否'
    }],
    isExpressDistribute: [{
      value: "1",
      name: '是'
    }, {
      value: "0",
      name: '否'
    }],
    comItems: ko.observableArray(),
    senderCode1Items: ko.observableArray(),
    senderCode2Items: ko.observableArray(),
    account1Items: ko.observableArray(),
    account2Items: ko.observableArray(),
    account1typeItems: ko.observableArray(),
    account2typeItems: ko.observableArray(),
    agencyNameList: ko.observableArray(),
    event: {
      delClick: function(index, obj) {
        common.dialog.confirmDialog({
          msg1: '确认删除这些项？',
          msg2: '此操作不可逆',
          width: '400px',
          type: 'error',
          onOk: function() {
            $._ajax({
              url: appCtx + viewModel.baseurl + "/delete",
              type: "post",
              data: {
                ids: obj.gridcomp.getFocusRow().id
              },
              success: function(data) {
                //viewModel.batchdocList.removeRows(rows);
                viewModel.search();
              }
            });
          }
        });
      }
    },
    referServices: function(obj) {
      obj.element.innerHTML = '<div class="u-input-group u-has-feedback width-100"><input type="text" class="u-form-control" id="exampleInput3" placeholder="' + obj.value + '" data-bind="click:refer"><span class="u-form-control-feedback uf uf-search"  data-bind="click:refer"></span></div>'
      ko.cleanNode(obj.element);
      ko.applyBindings({
        refer: viewModel.refer,
        element: obj.element
      }, obj.element);
    }
  };
  rendertype = {

  };
  events = {
    fwsAddr1: function(options) {
      var grid = options.gridObj,
        datatable = grid.dataTable,
        viewModel = grid.viewModel,
        field = options.field,
        element = options.element,
        column = grid.getColumnByField(field);
      var rowId = options.rowObj['$_#_@_id'];
      var row = datatable.getRowByRowId(rowId);
      var serviceProvider1 = row.getValue('customerId1');
      datatable.setMeta(field, 'refparam', '{"EQ_customer.id":"' + serviceProvider1 + '"}');
      if (serviceProvider1) {
        ncReferEditType(options);
      } else {
        toastr.warning('请先选择“第一服务商”！');
      }
    },
    fwsAddr2: function(options) {
      var grid = options.gridObj,
        datatable = grid.dataTable,
        viewModel = grid.viewModel,
        field = options.field,
        element = options.element,
        column = grid.getColumnByField(field);
      var rowId = options.rowObj['$_#_@_id'];
      var row = datatable.getRowByRowId(rowId);
      var serviceProvider2 = row.getValue('customerId2');
      datatable.setMeta(field, 'refparam', '{"EQ_customer.id":"' + serviceProvider2 + '"}');
      if (serviceProvider2) {
        ncReferEditType(options);
      } else {
        toastr.warning('请先选择“第二服务商”！');
      }
    },
    //导入
    importHandle: function() {
      var urlInfo = '/distRelation-excel/excelDataImport'; //倒入地址参数
      var urlStatusInfo = '/distRelation-excel/excelLoadingStatus'; //请求进度地址参数
      var ele = $('#importFiel')[0]; //挂载元素
      common.fileHandle.importFile(urlInfo, urlStatusInfo, ele);
    },
    //导出
    exportHandle: function() {
      var searchParams = batchdocSearch.getDataWithOpr(); //搜索查询参数
      var templateUrl = '/distRelation-excel/downloadExcelTemplate'; //导出模板地址参数
      var excelDataUrl = '/distRelation-excel/excelDataExport'; //导出数据地址参数
      var listData = viewModel.batchdocList; //需要导出表格的dataTable
      var ele = $('#exportFiel')[0]; //挂载元素
      common.fileHandle.exportFile(listData, ele, searchParams, templateUrl, excelDataUrl);
    },
    //增行
    addRow: function() {
      var emptyRow = viewModel.batchdocList.createEmptyRow({
        unSelect: true
      });
      viewModel.batchdocList.setRowFocus(emptyRow);
    },
    //删行
    delRow: function() {
      if (typeof(data) == 'number') {
        viewModel.batchdocList.setRowSelect(data);
      }
      var ids = [];
      var rows = viewModel.batchdocList.getSelectedRows();
      if (rows && rows.length > 0) {
        for (var i = 0; i < rows.length; i++) {
          ids.push(rows[i].getValue("id"));
        }
        var rows = viewModel.batchdocList.getSelectedRows();
        viewModel.batchdocList.removeRows(rows);
      } else {
        toastr.warning('请选择数据');
        return;
      }
    },
    afterRowFocus: function(obj) {
      // console.log("鼠标点击了一行:", obj);
      if (obj.colIndex == 1 && obj.rowObj.value.provinceId != null) { //所属市
        viewModel.batchdocList.setMeta("cityId", "refparam", '{"EQ_areaLevel":"2","EQ_parent.id":"' + obj.rowObj.value.provinceId + '"}');
      } else if (obj.colIndex == 2 && obj.rowObj.value.cityId != null) { //所属区(县)
        viewModel.batchdocList.setMeta("districtId", "refparam", '{"EQ_areaLevel":"3","EQ_parent.id":"' + obj.rowObj.value.cityId + '"}');
      } else if (obj.colIndex == 3 && obj.rowObj.value.districtId != null) { //所属镇(街道)
        viewModel.batchdocList.setMeta("townId", "refparam", '{"EQ_areaLevel":"4","EQ_parent.id":"' + obj.rowObj.value.districtId + '"}');
      } else if (obj.colIndex == 5 && obj.rowObj.value.agencyId != null) { //第一服务商
        //viewModel.batchdocList.setMeta("serviceProvider1", "refparam", '{"EQ_electricalBusiness":"1","EQ_organization.id":"' + obj.rowObj.value.agencyId + '"}');
      } else if (obj.colIndex == 6 && obj.rowObj.value.agencyId != null) { //第二服务商
        //viewModel.batchdocList.setMeta("serviceProvider2", "refparam", '{"EQ_electricalBusiness":"1","EQ_organization.id":"' + obj.rowObj.value.agencyId + '"}');
      } else if (obj.colIndex == 7 && obj.rowObj.value.account1Id != null) { //第一服务商地址
        //viewModel.batchdocList.setMeta("senderCode1Id", "refparam", '{"EQ_isEnable":"1","EQ_customer.id":"' + obj.rowObj.value.serviceProvider1 + '"}');
      } else if (obj.colIndex == 8 && obj.rowObj.value.account2Id != null) { //第二服务商地址
        //viewModel.batchdocList.setMeta("senderCode2Id", "refparam", '{"EQ_isEnable":"1","EQ_customer.id":"' + obj.rowObj.value.serviceProvider2 + '"}');
      }
      /**
       * gridObj 表格控件对象
       * rowObj  数据行对象
       * rowIndex  数据行对应的index
       */
      /*
      if (obj.gridObj.gridCompColumnArr[obj.colIndex].options.field == "serviceProvider1") {
        viewModel.batchdocList.setRowFocus(obj.rowIndex);
        if (obj.rowObj.value.agencyId == null || obj.rowObj.value.agencyId == "") {
          viewModel.batchdocList.setMeta("serviceProvider1", "refparam", '{"EQ_electricalBusiness":"1"}');
        } else {
          viewModel.batchdocList.setMeta("serviceProvider1", "refparam", '{"EQ_electricalBusiness":"1","EQ_organization.id":"' + obj.rowObj.value.agencyId + '"}');
        }
      }
      if (obj.gridObj.gridCompColumnArr[obj.colIndex].options.field == "serviceProvider2") {
        viewModel.batchdocList.setRowFocus(obj.rowIndex);
        if (obj.rowObj.value.agencyId == null || obj.rowObj.value.agencyId == "") {
          viewModel.batchdocList.setMeta("serviceProvider2", "refparam", '{"EQ_electricalBusiness":"1"}');
        } else {
          viewModel.batchdocList.setMeta("serviceProvider2", "refparam", '{"EQ_electricalBusiness":"1","EQ_organization.id":"' + obj.rowObj.value.agencyId + '"}');
        }
      }
      */
      return true;
    },
    validateBill: function() {
      var rows = viewModel.batchdocList.getAllRows();
      var errmsg = "请输入";
      if (rows.length > 0) {
        for (var i = 0; i < rows.length; i++) {
          var temperrmsg = "";
          if (rows[i].getValue("provinceId") == null) {
            temperrmsg = "所属省"
            toastr.error(errmsg + temperrmsg);
            return false;
          } else if (rows[i].getValue("cityId") == null) {
            temperrmsg = "所属市"
            toastr.error(errmsg + temperrmsg);
            return false;
          } else if (rows[i].getValue("districtId") == null) {
            temperrmsg = "所属区(县)"
            toastr.error(errmsg + temperrmsg);
            return false;
          }
          //        else if (rows[i].getValue("townId") == null) {
          //          temperrmsg = "所属镇(街)"
          //          toastr.error(errmsg + temperrmsg);
          //          return false;
          //        }
          else if (rows[i].getValue("agencyId") == null) {
            temperrmsg = "服务商所属组织"
            toastr.error(errmsg + temperrmsg);
            return false;
          } else if (rows[i].getValue("serviceProvider1") == null) {
            temperrmsg = "服务商1"
            toastr.error(errmsg + temperrmsg);
            return false;
          }
          //        else if (rows[i].getValue("senderCode1Id") == null) {
          //          temperrmsg = "送达方编码1"
          //          toastr.error(errmsg + temperrmsg);
          //          return false;
          //        }

          //        else if (rows[i].getValue("freight") == null) {
          //          temperrmsg = "标准运费"
          //          toastr.error(errmsg + temperrmsg);
          //          return false;
          //        }
          else {
            return true;
          }
        }
      }
      return true;
    },
    //批量保存
    save: function() {
      // var result = viewModel.validateBill();
      var result = app.compsValidateMultiParam({
        element: ".ui-bill-panel",
        showMsg: true
      });
      if (!result.passed) {
        return;
      }
      var postdata = viewModel.batchdocList.getSimpleData();
      var changeData = [];
      var nochangeData = []
      if (postdata && postdata.length > 0) {
        for (var i = 0; i < postdata.length; i++) {
          if (postdata[i].persistStatus != "nrm") {
            changeData.push(postdata[i]);
          } else {
            nochangeData.push(postdata[i]);
          }
        }
      }
      $._ajax({
        url: appCtx + viewModel.baseurl + "/batch-save",
        type: "post",
        data: JSON.stringify(changeData),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        // complete: function () {

        // },
        success: function(data) {
          if (data == 'fail_global') {
            toastr.error(data.message);
          } else {
            // u.hideLoader();
            // viewModel.showDefaultPage();
            // viewModel.batchdocList.removeAllRows();
            // viewModel.batchdocList.addSimpleData(data, "nrm", {
            //   "unSelect": true
            // });
            // viewModel.batchdocList.addSimpleData(nochangeData, "nrm", {
            //   "unSelect": true
            // });
            viewModel.search();
          }
        }
      })
    },
    edit: function() {
      viewModel.tempdata = viewModel.batchdocList.getSimpleData();
      viewModel.showEditPage();
    },
    cancle: function() {
      viewModel.batchdocList.removeAllRows();
      viewModel.batchdocList.setSimpleData(viewModel.tempdata, {
        "unSelect": true
      });
      viewModel.showDefaultPage();
    },
    showEditPage: function() {
      viewModel.gridcomp.setEditable(true);
      $("#page-view").hide(200);
      $("#page-edit").show(200);
    },
    showDefaultPage: function() {
      viewModel.gridcomp.setEditable(false);
      $("#page-edit").hide(200);
      $("#page-view").show(200);
    },
    //根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
    search: function(reindex) {
      if (reindex) {
        viewModel.batchdocList.pageIndex(0);
      }
      viewModel.batchdocList.removeAllRows();
      var queryData = batchdocSearch.getDataWithOpr();
      queryData.size = viewModel.batchdocList.pageSize();
      queryData.page = viewModel.batchdocList.pageIndex();
      $._ajax({
        type: "get",
        url: appCtx + viewModel.baseurl,
        dataType: "json",
        data: queryData,
        success: function(data) {
          viewModel.batchdocList.setSimpleData(data.content, {
            unSelect: true
          });
          viewModel.batchdocList.totalRow(data.totalElements);
          viewModel.batchdocList.totalPages(data.totalPages);
        }
      })
    },
    //清空搜索条件
    cleanSearch: function() {
      batchdocSearch.clearSearch();
    },
    //页码改变时的回调函数
    pageChange: function(index) {
      viewModel.batchdocList.pageIndex(index);
      viewModel.search();
    },
    //页码改变时的回调函数
    sizeChange: function(size) {
      viewModel.batchdocList.pageSize(size);
      viewModel.search(true);
    },
    optFun: function(obj) {
      var delfun = "data-bind=click:event.delClick.bind($data," + (obj.gridObj.getDataTableRowIdByRow(obj.row)) + ")";
      obj.element.innerHTML = '<div class="ui-handle-icon"><span class="ui-handle-word">' +
        '<a href="#" class="" ' +
        delfun +
        ' title="删除">删除</a>' +
        '</span></div>';
      ko.cleanNode(obj.element);
      ko.applyBindings(viewModel, obj.element);
    },
    refer: function(params) {
      viewModel.prodskuref.removeAllRows();
      viewModel.prodskuref.createEmptyRow();
      viewModel.prodskuref.setRowSelect(0);
      $(".refer").trigger("click");
    }
  }
  viewModel = u.extend({}, baseData, events, common.rendertype);

  function appInit(element, params) {
    //将模板页渲染到页面上
    element.innerHTML = tpl;
    //将viewModel和页面上的元素绑定并初始化u-meta声明的组件
    app = u.createApp({
      el: element,
      model: viewModel
    });
    // 查询组件初始化
    batchdocSearch = new searchbox(
      $("#batchdoc-searchcontent")[0], [{
        type: "text",
        key: "agency--name",
        label: "服务商所属组织"
      }, {
        type: "text",
        key: "serviceProvider1--customer--name",
        label: "第一服务商"
      }, {
        type: "text",
        key: "serviceProvider2--customer--name",
        label: "第二服务商"
      }, {
        type: "combo",
        key: "isExpressDistribute",
        label: "快递配送",
        dataSource: [{
          value: '',
          name: '全部'
        }, {
          value: '1',
          name: '是'
        }, {
          value: '0',
          name: '否'
        }]
      }, {
        type: "combo",
        key: "isSendArea",
        label: "送装区域",
        dataSource: [{
          value: '',
          name: '全部'
        }, {
          value: '1',
          name: '是'
        }, {
          value: '0',
          name: '否'
        }]
      }, {
        type: "refer",
        key: "province--id",
        label: "所属省",
        refinfo: "region",
        refName: "所属省",
        clientParam: {
          "EQ_areaLevel": "1"
        },
        domid: "provinceInfo"
      }, {
        type: "refer",
        key: "city--id",
        label: "所属市",
        refinfo: "region",
        clientParam: {
          "EQ_areaLevel": "2"
        },
        domid: "cityInfo"
      }, {
        type: "refer",
        key: "district--id",
        refinfo: "region",
        label: "所属区/县",
        clientParam: {
          "EQ_areaLevel": "3"
        },
        domid: "districtInfo"
      }, {
        type: "refer",
        key: "town--id",
        refinfo: "region",
        label: "所属镇/街道",
        clientParam: {
          "EQ_areaLevel": "4"
        },
        domid: "townInfo"
      }, ]);
    // 列表查询数据(无查询条件)
    viewModel.search();
  }

  function afterRender() {
    viewModel.gridcomp = app.getComp("grid_batchdoc").grid;
    //绑定输入框enter事件
    $('#batchdoc-searchcontent input').off("keydown").on("keydown", function(e) {
      if (e.keyCode == 13) {
        $(this).blur();
        viewModel.search();
      }
    });

    viewModel.batchdocList.on("agencyId.valuechange", function(obj) {
      if (viewModel.batchdocList.getCurrentRow() != null) {
        var row = obj.rowObj;
        var agid = row.getValue("agencyId");
        //      viewModel.batchdocList.setMeta("serviceProvider1", "refparam", '{"EQ_electricalBusiness":"1","EQ_organization.id":"' + agid + '"}');
        //      viewModel.batchdocList.setMeta("serviceProvider2", "refparam", '{"EQ_electricalBusiness":"1","EQ_organization.id":"' + agid + '"}');
      }
      if (obj.newValue != obj.oldValue) {
        viewModel.batchdocList.setValue("serviceProvider1", "");
        viewModel.batchdocList.setValue("serviceProvider2", "");
        viewModel.batchdocList.setValue("senderCode1Id", "");
        viewModel.batchdocList.setValue("senderCode2Id", "");
      }
    });

    viewModel.batchdocList.on("serviceProvider1.valuechange", function(obj) {
      //    if (viewModel.batchdocList.getCurrentRow() != null && obj.newValue != "") {
      //      viewModel.batchdocList.setMeta("account1Id", "refparam", '{"EQ_isEnable":"1","EQ_customer.id":"' + refValues[0].customerId + '"}');
      //      viewModel.batchdocList.setMeta("account1Type", "refparam", '{"EQ_isEnable":"1"');
      //    }
      if (obj.newValue != obj.oldValue) {
        var refValues = $("#refContainerserviceProvider1").data("uui.refer").values;
        viewModel.batchdocList.setValue("senderCode1Id", "");
        viewModel.batchdocList.setValue("customerId1", refValues[0].id);
      }
    });

    viewModel.batchdocList.on("serviceProvider2.valuechange", function(obj) {
      //    if (viewModel.batchdocList.getCurrentRow() != null && obj.newValue != "") {

      //      viewModel.batchdocList.setMeta("account2Id", "refparam", '{"EQ_isEnable":"1","EQ_customer.id":"' + refValues[0].customerId + '"}');
      //      viewModel.batchdocList.setMeta("account2Type", "refparam", '{"EQ_isEnable":"1"');
      //    }
      if (obj.newValue != obj.oldValue) {
        var refValues = $("#refContainerserviceProvider2").data("uui.refer").values;
        viewModel.batchdocList.setValue("senderCode2Id", "");
        viewModel.batchdocList.setValue("customerId2", refValues[0].id);
      }
    });

    //  viewModel.batchdocList.on("account1Id.valuechange", function (obj) {
    //    if (viewModel.batchdocList.getCurrentRow() != null && obj.newValue != "") {
    //      var refValues = $("#refContaineraccount1Id").data("uui.refer").values;
    //      viewModel.batchdocList.setMeta("senderCode1Id", "refparam", '{"EQ_isEnable":"1","EQ_account.id":"' + obj.newValue + '"}');
    //    }
    //    if(obj.newValue!=obj.oldValue){
    //    	viewModel.batchdocList.setValue("account1Type","");
    //    	viewModel.batchdocList.setValue("senderCode1Id","");
    //    }
    //  });

    //  viewModel.batchdocList.on("account2Id.valuechange", function (obj) {
    //    if (viewModel.batchdocList.getCurrentRow() != null && obj.newValue != "") {
    //      var refValues = $("#refContaineraccount2Id").data("uui.refer").values;
    //      viewModel.batchdocList.setMeta("senderCode2Id", "refparam", '{"EQ_isEnable":"1","EQ_account.id":"' + obj.newValue + '"}');
    //    }
    //    if(obj.newValue!=obj.oldValue){
    //    	viewModel.batchdocList.setValue("account2Type","");
    //    	viewModel.batchdocList.setValue("senderCode2Id","");
    //    }
    //  });

    //默认送装显示名称
    viewModel.batchdocList.on("defaultServiceName.valuechange", function(obj) {
      var valueArr = viewModel.comItems();
      for (var i = 0; i < valueArr.length; i++) {
        if (obj.newValue == valueArr[i].value) {
          viewModel.batchdocList.getCurrentRow(obj.rowId).setValue("defaultService", obj.newValue);
        }
      }
    });

    var areaLinkage = {
      area01: function() { //搜索地区联动
        //省市联动
        batchdocSearch.viewModel.params.on("province--id.valuechange", function(obj) {
          var id = obj.newValue;
          $("#cityInfo").attr("data-refparam", '{"EQ_areaLevel":"2","EQ_parent.id":"' + id + '"}');
          $("#cityInfo input").val('');
          $("#districtInfo input").val('');
          $("#townInfo input").val('');
        });
        //市区联动
        batchdocSearch.viewModel.params.on("city--id.valuechange", function(obj) {
          var id = obj.newValue;
          $("#districtInfo").attr("data-refparam", '{"EQ_areaLevel":"3","EQ_parent.id":"' + id + '"}');
          $("#districtInfo input").val('');
          $("#townInfo input").val('');
        });
        //区镇联动
        batchdocSearch.viewModel.params.on("district--id.valuechange", function(obj) {
          var id = obj.newValue;
          $("#townInfo").attr("data-refparam", '{"EQ_areaLevel":"4","EQ_parent.id":"' + id + '"}');
          $("#townInfo input").val('');
        });
      },
      area03: function() { //新增地区联动              
        //省市联动 
        viewModel.batchdocList.on("provinceId.valuechange", function(obj) {
          if (viewModel.batchdocList.getCurrentRow() != null) {
            var row = viewModel.batchdocList.getCurrentRow();
            var provinceId = row.getValue("provinceId");
            viewModel.batchdocList.setMeta("cityId", "refparam", '{"EQ_areaLevel":"2","EQ_parent.id":"' + provinceId + '"}');
          }
        });
        //省市联动 
        viewModel.batchdocList.on("cityId.valuechange", function(obj) {
          if (viewModel.batchdocList.getCurrentRow() != null) {
            var row = viewModel.batchdocList.getCurrentRow();
            var cityId = row.getValue("cityId");
            viewModel.batchdocList.setMeta("districtId", "refparam", '{"EQ_areaLevel":"3","EQ_parent.id":"' + cityId + '"}');
          }
        });
        //市区联动
        viewModel.batchdocList.on("districtId.valuechange", function(obj) {
          if (viewModel.batchdocList.getCurrentRow() != null) {
            var row = viewModel.batchdocList.getCurrentRow();
            var districtId = row.getValue("districtId");
            viewModel.batchdocList.setMeta("townId", "refparam", '{"EQ_areaLevel":"4","EQ_parent.id":"' + districtId + '"}');
          }
        });
        //区镇联动
        viewModel.batchdocList.on("townId.valuechange", function(obj) {});
      },
      init: function() {
        this.area01();
        this.area03();
      }
    };
    //地区联动
    areaLinkage.init();
  }

  function init(element, params) {
    appInit(element, params);
    afterRender();
    window.vm = viewModel;
  }

  return {
    init: init
  }
});