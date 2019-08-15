define(['text!./orderfilterscheme.html', 'ocm_common', 'ocm_baseview', './meta.js'], function(tpl, common, baseview, model) {
  'use strict'
  var viewModel, appCtx = "/occ-b2c/b2c";
  var BILLPANELSTATUS = {
    ADD: "add",
    EDIT: "edit",
    COPY: "copy",
    DETAIL: "detail",
    DEFAULT: "default"
  }
  var view = baseview.extend({
    beforeCreate: function() {
      viewModel = this.viewModel;
    },
    tpl: tpl,
    model: model,
    baseData: {
      baseurl: '/order_filer_scheme',
      complexList: new u.DataTable(model.options.metas.orderFilterScheme),
      complexItems: new u.DataTable(model.options.metas.fieldConfigItem),
      ItemRefList: new u.DataTable(model.options.metas.ItemRef),

      searchcomp: {},
      button1Source: model.options.buttons.button1,
      button2Source: model.options.buttons.button2,
      button3Source: model.options.buttons.button3,
      button4Source: model.options.buttons.button4,

      card1Source: model.options.cards.card1,
      detail11Source: model.options.details.detail1,
      grid1Option: model.options.grids.grid1,
      grid2Option: model.options.grids.grid2,
      grid3Option: model.options.grids.grid3,



      billPanelStatus: ko.observable(BILLPANELSTATUS.DEFAULT),
      logiComIdModeSrc: [],
      enableRadioSrc: [{
        value: "1",
        name: "启用"
      }, {
        value: "0",
        name: "停用"
      }, {
        value: CONST.DEFAULTOPTION,
        name: "全部"
      }],
      //跳转单据页
      goBillPanel: common.bill.goBillPanel,
      //返回列表页
      // retListPanel: common.bill.retListPanel,
      //跳转详情页
      goDetailPanel: common.bill.goDetailPanel,
      // enableFmt: function() {
      //   var row = viewModel.complexList.getFocusRow();
      //   if(!row) {
      //     return;
      //   }
      //   var enableStatus = row.getValue("enableStatus");
      //   return enableStatus==1? "启用":"停用";
      // },
      enableFmt: ko.pureComputed(function() {
        var isEnable = viewModel.complexList.ref("isEnable")();
        switch (isEnable) {
          case 1:
            return "启用";
          case 2:
            return "停用";
          default:
            return "未启用";
        }
        // return isEnable == 1 ? "启用" : "停用";
      })
    },
    rendertype: {
      operation: common.rendertype.operation,
      enableStatusRender: common.rendertype.enableRender,
      detailRender: common.rendertype.detailRender,
      comlogiCom: function(params) {
        var row = params.row;
        switch (row.value.fieldType) {
          case 'COMBO':
            if (params.value == '2') {
              params.element.innerHTML = '快递配送';
            } else if (params.value == '3') {
              params.element.innerHTML = '服务商配送';
            } else if (params.value == '4') {
              params.element.innerHTML = '供应商直发';
            } else if (params.value == '5') {
              params.element.innerHTML = '经销商订单';
            }
            break;
          default:
            params.element.innerHTML = params.value;
            break;
        }
      },
      rules: function(params) {
        switch (params.value) {
          case "LIKE":
            params.element.innerHTML = "包含";
            break;
          case "IN":
            params.element.innerHTML = "在...中";
            break;
          case "NOTIN":
            params.element.innerHTML = "不在...中";
            break;
          case "NOTNULL":
            params.element.innerHTML = "不为空";
            break;
          case "EQ":
            params.element.innerHTML = "等于";
            break;
          case "NOTEQ":
            params.element.innerHTML = "不等于";
            break;
          case "GT":
            params.element.innerHTML = "大于";
            break;
          case "GTE":
            params.element.innerHTML = "大于等于";
            break;
          case "LT":
            params.element.innerHTML = "小于";
            break;
          case "LTE":
            params.element.innerHTML = "小于等于";
            break;
        }

      },
      enableCheckSrc: [{
        value: "1",
        name: "是"
      }],
      fieldsCombo: function(params) {
        var comboDataS = [{
          value: "LIKE",
          name: "包含"
        }, {
          value: "NOTNULL",
          name: "不为空"
        }, {
          value: "EQ",
          name: "等于"
        }, {
          value: "NOTEQ",
          name: "不等于"
        }];
        var comboDataRef = [{
          value: "EQ",
          name: "等于"
        }, {
          value: "NOTEQ",
          name: "不等于"
        }];
        var comboDataO = [{
            value: "GT",
            name: "大于"
          }, {
            value: "GTE",
            name: "大于等于"
          }, {
            value: "LT",
            name: "小于"
          }, {
            value: "LTE",
            name: "小于等于"
          }, {
            value: "EQ",
            name: "等于"
          },
          //  {
          //   value: "NOTEQ",
          //   name: "不等于"
          // }
        ];
        var ele = params.element;
        var gridObj = params.gridObj;
        var viewModel = gridObj.viewModel;
        var field = params.field;
        var dataTableId = gridObj.dataTable.id;
        var rowObj = params.rowObj;
        // if (rowObj.category == 1) {
        var htmlStr = '<div class="ui-inputarea" style="width:auto" u-meta=\'{"id":"' + field +
          '","type":"u-combobox","data":"' + dataTableId +
          '","field":"computationRule","showFix":true}\'><input style="width:auto" /><span class="ui-icon uf uf-arrow-down" style="top:2px" data-role="combo-button"></span></div>';
        var innerDom = u.makeDOM(htmlStr);
        ele.innerHTML = '';
        ele.appendChild(innerDom);
        var comp = viewModel.app.createComp(innerDom, viewModel);
        switch (rowObj.fieldType) {
          case 'STRING':
            comp.setComboData(comboDataS);
            break;
          case 'REF':
          case 'COMBO':
            comp.setComboData(comboDataRef);
            break;
          default:
            comp.setComboData(comboDataO);
            break;
        }
        u.compMgr.updateComp(ele);
      },
      isRef: function(params) {
        var ele = params.element;
        var gridObj = params.gridObj;
        var viewModel = gridObj.viewModel;
        var field = params.field;
        var dataTable = gridObj.dataTable;
        var dataTableId = gridObj.dataTable.id;
        var rowObj = params.rowObj;
        var daraRef = "ItemRefList";
        var refField = '';
        var rowId = params.rowObj['$_#_@_id'],
          row = dataTable.getRowByRowId(rowId); //当前Row
        if (row.getValue('computationRule') == 'NOTNULL') {
          htmlStr = '';
          row.setValue('scope', ' ');
          row.setValue('showScope', ' ');
          ele.innerHTML = htmlStr;
          return;
        }
        switch (rowObj.fieldType) {
          case 'BigDecimal':
            var comItems = viewModel.ItemRefList.getValue('scope');
            var ifVal = "scope";
            if (viewModel.billPanelStatus() == 'edit') {
              // viewModel.ItemRefList.setValue('scope1', '');
              // viewModel.ItemRefList.setValue('scope', '');
            }
            if (comItems) {
              ifVal = "scope1";
            }
            var htmlStr = '<input style="height:20px;line-height:20px;"u-meta=\'{"id":"scope' + rowId + '","type":"float","data":"ItemRefList","field":"' + ifVal + '","min":0,"max":100000000}\' />';
            break;
          case 'REF':
            switch (rowObj.fieldsCode) { //字段编码 用于区分是否为参照
              case 'orderReceiver.receiverProvince':
                refField = "provinceId"
                break;
              case 'orderReceiver.receiverCity':
                refField = "cityId"
                break;
              case 'orderReceiver.receiverDistrict':
                refField = "districtId"
                break;
              case 'orderReceiver.receiverTown':
                refField = "townId"
                break;
              case 'orderGoods.goodsId':
                refField = "skuCode"
                break;
              case 'orderProduct.productId':
                refField = "prototypeId"
                break;
              case 'platform.id':
                refField = "platformId"
                break;
              case 'store.id':
                refField = "storeId"
                break;
              case 'orderGoods.combineGoodsId':
                refField = "combineGoodsId";
                break;
            }
            var htmlStr = '<div class="ui-inputarea" u-meta=\'{"type":"uiRefer","data":"ItemRefList","field":"' + refField + '"}\'>' +
              '<input id="common_' + refField + '" readonly="readonly" autocomplete="off"/>' +
              '<span class="ui-icon uifont icon-bar refer"></span>' +
              '</div>';
            break;
          case 'COMBO':
            var refField = "logiComId";
            var htmlStr = '<div class="ui-inputarea" style="width:auto" u-meta=\'{"id":"' + refField +
              '","type":"u-combobox","data":"' + "ItemRefList" +
              '","field":"scopecombo","showFix":true}\'><input style="width:auto" /><span class="ui-icon uf uf-arrow-down" style="top:2px" data-role="combo-button"></span></div>';
            break;
          default:
            var ifVal = "scopeStr";
            if (viewModel.billPanelStatus() == 'edit') {
              // viewModel.ItemRefList.setValue('scopeStr1', '');
              // viewModel.ItemRefList.setValue('scopeStr', '');
            }
            var comItems = viewModel.ItemRefList.getValue('scopeStr');
            if (comItems) {
              ifVal = "scopeStr1";
            }
            var htmlStr = '<input style="height:20px;line-height:20px;"u-meta=\'{"id":"scope' + rowId + '","type":"string","data":"ItemRefList","field":"' + ifVal + '"}\' />';
        };
        var innerDom = u.makeDOM(htmlStr);
        ele.innerHTML = '';
        ele.appendChild(innerDom);
        var comp = viewModel.app.createComp(innerDom, viewModel);
        if (rowObj.fieldType == 'COMBO') {
          comp.setComboData(viewModel.logiComIdModeSrc);
        }
        u.compMgr.updateComp(ele);
        // 
        // $(ele).html(htmlStr)
        // ko.cleanNode(ele);
        // ko.applyBindings(viewModel, ele);
      },
    },
    events: {
      //删除和批量删除
      del: function(data, rowId) {
        if (typeof(data) == 'number') {
          viewModel.complexList.setRowSelectbyRowId(rowId);
        }
        var ids = [];
        var rows = viewModel.complexList.getSelectedRows(),
          len = rows.length,
          count = 0,
          rowsArr = [];
        if (rows && len > 0) {
          for (var i = 0; i < len; i++) {
            if (rows[i].getValue("isEnable") != 0) {
              if (len == 1) {
                toastr.warning("只有未启用的数据才可以删除！");
                return;
              } else {
                count++;
                continue;
              }
            } else {
              ids.push(rows[i].getValue("id"));
              rowsArr.push(rows[i]);
            }
          }
          if (ids.length == 0) {
            toastr.warning('选中的记录都不能删除!');
            return;
          } else {
            if (count > 0) {
              toastr.warning('选中的记录中有' + count + '个不能删除');
            }
          }
          common.dialog.confirmDialog({
            msg1: '确认删除这些项？',
            msg2: '此操作不可逆',
            width: '400px',
            type: 'error',
            onOk: function() {
              $._ajax({
                url: appCtx + viewModel.baseurl + "/delete",
                type: "post",
                // data: "ids=" + ids.join(","),
                data: {
                  ids: ids.join(",")
                },
                success: function(data) {
                  viewModel.complexList.removeRows(rowsArr);
                }
              });

            }
          });
        } else {
          toastr.warning("请至少选择一项");
        }
      },
      //刷新
      refresh: function() {
        viewModel.complexList.removeAllRows();
        var queryData = viewModel.searchcomp.getDataWithOpr ? viewModel.searchcomp.getDataWithOpr() : {};
        $._ajax({
          type: "get",
          url: appCtx + viewModel.baseurl,
          dataType: "json",
          data: queryData,
          success: function(data) {
            viewModel.complexList.setSimpleData(data.content, {
              unSelect: true
            });
          }
        })
      },
      //根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
      search: function(reindex) {
        if (reindex) {
          viewModel.complexList.pageIndex(0);
        }
        viewModel.complexList.removeAllRows();
        var queryData = viewModel.searchcomp.getDataWithOpr ? viewModel.searchcomp.getDataWithOpr() : {};
        var pageSize = viewModel.complexList.pageSize();
        var pageNumber = viewModel.complexList.pageIndex();
        queryData.page = pageNumber;
        queryData.size = pageSize;
        $._ajax({
          type: "get",
          url: appCtx + viewModel.baseurl,
          dataType: "json",
          data: queryData,
          success: function(data) {
            viewModel.complexList.setSimpleData(data.content, {
              unSelect: true
            });
            viewModel.complexList.totalRow(data.totalElements);
            viewModel.complexList.totalPages(data.totalPages);
          }
        })
      },
      //清空搜索条件
      cleanSearch: function() {
        viewModel.searchcomp.clearSearch();
      },
      //页码改变时的回调函数
      pageChange: function(index) {
        viewModel.complexList.pageIndex(index);
        viewModel.search();
      },
      //页码改变时的回调函数
      sizeChange: function(size) {
        viewModel.complexList.pageSize(size);
        viewModel.search(true);
      },
      //进入新增单据页
      showAddBillPanel: function() {
        var curRow = viewModel.complexList.createEmptyRow();
        viewModel.complexList.setRowFocus(curRow);
        viewModel.complexItems.removeAllRows();
        curRow.setValue("isEnable", "0");
        viewModel.goBillPanel();
        viewModel.billPanelStatus(CONST.BILLPANELSTATUS.ADD);
      },
      // 可以进入编辑态
      canInEdit: function() {
        var canIn = true;
        var id = viewModel.complexList.getValue("id");
        $._ajax({
          type: "get",
          url: appCtx + viewModel.baseurl + "/isRefer",
          async: false,
          data: {
            search_EQ_id: id
          },
          success: function(data) {
            if (data == 1) {
              toastr.error("已被引用数据不可编辑");
              canIn = false;
            }
          }
        })
        return canIn;
      },
      //进入修改单据页
      showEditBillPanel: function(index) {
        viewModel.complexList.setRowFocus(index);
        var id = viewModel.complexList.getValue("id");
        viewModel.complexList.originEditData = viewModel.complexList.getFocusRow().getSimpleData();
        //查询子表数据
        viewModel.findByParentid(id);
        viewModel.goBillPanel();
        viewModel.billPanelStatus(CONST.BILLPANELSTATUS.EDIT);
      },
      //详情
      detail: function(obj) {
        viewModel.complexList.setRowFocus(obj.rowIndex);
        if (obj) {
          var id = obj.rowObj.value.id;
          viewModel.findByParentid(id);
          viewModel.billPanelStatus(CONST.BILLPANELSTATUS.DETAIL);
        } else {
          setTimeout(function() {
            var curRow = viewModel.complexList.getCurrentRow();
            var id = id || curRow.getValue("id");
            viewModel.findByParentid(id);
            viewModel.billPanelStatus(CONST.BILLPANELSTATUS.DETAIL);
          }, 0);
        }
        //确保grid先将行设置为focus状态
        // setTimeout(function() {
        //   var curRow = viewModel.complexList.getCurrentRow();
        //   var id = id || curRow.getValue("id");
        //   viewModel.findByParentid(id);
        //   viewModel.billPanelStatus(CONST.BILLPANELSTATUS.DETAIL);
        //   // viewModel.goDetailPanel();
        // }, 0);
      },
      //查询子表数据
      findByParentid: function(id) {
        $._ajax({
          url: appCtx + viewModel.baseurl + '/detail',
          type: 'get',
          async: false,
          data: {
            id: id
          },
          success: function(data) {
            var arr = data.orderFieldsFilter;
            for (var k = 0, arrlen = arr ? arr.length : 0; k < arrlen; k++) {
              if (arr[k].scopeType == '1') {
                arr[k].showScope = arr[k].scopeName;
              } else {
                arr[k].showScope = arr[k].scope;
              }

            }
            if (arr) {
              viewModel.complexItems.setSimpleData(arr);
            }
          }
        })
      },
      // 清除基类属性
      clearBaseProp: function(row) {
        row.setValue("id", "");
        row.setValue("code", "");
        row.setValue("name", "");
        row.setValue("creator", "");
        row.setValue("creationTime", "");
        row.setValue("modifier", "");
        row.setValue("modifiedTime", "");
      },
      //跳转单据详情页
      showBillDetail: function() {
        $(".ui-list-panel").addClass("animated slideInLeft");
        $(".ui-bill-panel").addClass("animated slideOutDown");
      },
      //新增子表项
      addItem: function() {
        viewModel.complexItems.createEmptyRow();
      },
      //批量新增子表项
      // addItems: function() {
      //
      // },
      //删除子表项
      delItems: function() {
        var selectedRows = viewModel.complexItems.getSelectedRows();
        for (var i = 0; i < selectedRows.length; i++) {
          selectedRows[i].setValue("dr", "1");
        }
        viewModel.complexItems.removeRows(selectedRows);
      },
      //保存单据
      saveBill: function() {
        var result = viewModel.app.compsValidateMultiParam({
          element: ".ui-bill-panel",
          showMsg: true
        });
        if (!result.passed) {
          return;
        }
        var allRows = viewModel.complexItems.getAllRows();
        if (allRows.length == 0 || allRows.every(function(row) {
            return row.status == u.Row.STATUS.FALSE_DELETE
          })) {
          toastr.error("请录入表体行数据");
          return;
        }
        var complexData = viewModel.complexList.getCurrentRow().getSimpleData();

        var allRows = viewModel.complexItems.getAllRows();
        for (var i = 0, len = allRows.length; i < len; i++) {
          if (allRows[i].getValue('scope') == '') {
            allRows[i].setValue('scope', '  ');
          }
        }

        var complexItemsData = viewModel.complexItems.getSimpleData();
        complexData.orderFieldsFilter = complexItemsData;
        var _ajaxType = viewModel.complexList.getValue("id") ? "put" : "post";
        $._ajax({
          url: appCtx + viewModel.baseurl,
          type: _ajaxType,
          data: JSON.stringify(complexData),
          contentType: "application/json; charset=utf-8",
          success: function(data) {
            viewModel.complexList.getFocusRow().setSimpleData(data);
            viewModel.retListPanel();
          }
        })
      },
      //重置单据
      resetBill: function() {
        // var curRow = viewModel.complexList.getCurrentRow();
        // 新增重置
        // 编辑重置（修改或复制）
      },
      //取消单据
      cancelBill: function() {
        viewModel.complexItems.removeAllRows();
        var curRow = viewModel.complexList.getCurrentRow();
        // 修改，则还原
        if (curRow.getValue("id")) {
          curRow.setSimpleData(viewModel.complexList.originEditData)
        }
        // 新增或复制，则删除
        else {
          viewModel.complexList.removeRow(curRow);
          viewModel.complexItems.removeAllRows();
        }
        viewModel.retListPanel();
      },
      //启用
      enable: function() {
        var selectedRows = viewModel.complexList.getSelectedRows();
        if (selectedRows.length == 0) {
          toastr.error("请选择数据");
          return
        }
        if (selectedRows && selectedRows.length > 0) {
          var ids = [];
          for (var i = 0; i < selectedRows.length; i++) {
            ids.push(selectedRows[i].getValue("id"));
          }
          $._ajax({
            type: "post",
            url: appCtx + viewModel.baseurl + "/batch-enable",
            data: {
              ids: ids.join(",")
            },
            success: function(res) {
              toastr.success();
              for (var i = 0; i < selectedRows.length; i++) {
                selectedRows[i].setValue("isEnable", "1");
              }
            }
          })
        }
      },
      //停用
      disable: function() {
        var selectedRows = viewModel.complexList.getSelectedRows();
        if (selectedRows.length == 0) {
          toastr.error("请选择数据");
          return
        }
        if (selectedRows && selectedRows.length > 0) {
          var ids = [];
          for (var i = 0; i < selectedRows.length; i++) {
            ids.push(selectedRows[i].getValue("id"));
          }
          $._ajax({
            type: "post",
            url: appCtx + viewModel.baseurl + "/batch-disable",
            data: {
              ids: ids.join(",")
            },
            success: function(res) {
              toastr.success();
              for (var i = 0; i < selectedRows.length; i++) {
                selectedRows[i].setValue("isEnable", "2");
              }
            }
          })
        }
      },
      //参照选择批量新增子表（销售产品）
      showAddItemsRef: function() {
        viewModel.clearItemsRef();
        $("#addItemsRef .refer").trigger("click");
      },
      //清空已选销售产品参照
      clearItemsRef: function() {
        viewModel.ItemRefList.setValue("fieldschemeref", "");
        var refer = $("#refContainerfieldschemeref").data("uui.refer");
        refer.uncheckAll();
        refer.setValue([]);
      },
      detail2bill: function() {
        viewModel.billPanelStatus = BILLPANELSTATUS.EDIT;
        common.bill.detail2bill();
      },
      // 放回列表页
      retListPanel: function() {
        viewModel.billPanelStatus(CONST.BILLPANELSTATUS.DEFAULT);
        common.bill.retListPanel();
      },
    },
    afterCreate: function() {

      // 列表查询数据(无查询条件)
      viewModel.search();
      //物流方式枚举
      $._ajax({
        type: "get",
        url: appCtx + "/enum-service/data",
        async: false,
        data: {
          enumClassName: "com.yonyou.ocm.b2c.enums.LogisticsModeEnum"
        },
        success: function(data) {
          var newarray = common.dataconvert.toMap(data, "name", "code");
          viewModel.logiComIdModeSrc = newarray;
        }
      });
      // 子表参照聚焦行，用于绑定子表参照组件
      var refRow = viewModel.ItemRefList.createEmptyRow();
      viewModel.ItemRefList.setRowFocus(refRow);
      //字段配置表
      var allfields;
      $._ajax({
        type: "get",
        url: appCtx + '/fields-configure',
        dataType: "json",
        success: function(data) {
          allfields = data.content;
        }
      });

      function refValChange(obj) {
        if (!obj.newValue) {
          return;
        }
        var refer = $("#refContainercommon_" + obj.field).data("uui.refer");
        var refValues = refer.values;
        if (refValues && refValues.length > 0) {
          var row = viewModel.complexItems.getCurrentRow();
          var scopeVal = '',
            scopeId = '';
          for (var i = 0, len = refValues.length; i < len; i++) {
            scopeVal += refValues[i].refname;
            scopeId += refValues[i].refpk;
            if (i != len - 1)
              scopeVal += ','
          }
          row.setValue("showScope", scopeVal);
          row.setValue("scope", scopeId);
          row.setValue("scopeType", '1');
          row.setValue("scopeName", scopeVal);
        }
      }
      viewModel.complexItems.on('computationRule.valuechange', function(obj) {
        var row = obj.rowObj;
        if (obj.newValue == 'NOTNULL') {
          row.setValue('scope', ' ');
          row.setValue('showScope', ' ');
        }
      });
      // 为子表增行
      //scope字段获取参照的值
      viewModel.ItemRefList.on('provinceId.valuechange', function(obj) {
        refValChange(obj);
      });
      viewModel.ItemRefList.on('cityId.valuechange', function(obj) {
        refValChange(obj);
      });
      viewModel.ItemRefList.on('districtId.valuechange', function(obj) {
        refValChange(obj);
      });
      viewModel.ItemRefList.on('townId.valuechange', function(obj) {
        refValChange(obj);
      });
      viewModel.ItemRefList.on('logiComId.valuechange', function(obj) {
        refValChange(obj);
      });
      viewModel.ItemRefList.on('skuCode.valuechange', function(obj) {
        refValChange(obj);
      });
      viewModel.ItemRefList.on('prototypeId.valuechange', function(obj) {
        refValChange(obj);
      });
      viewModel.ItemRefList.on('platformId.valuechange', function(obj) {
        refValChange(obj);
      });
      viewModel.ItemRefList.on('storeId.valuechange', function(obj) {
        refValChange(obj);
      });
      viewModel.ItemRefList.on('combineGoodsId.valuechange', function(obj) {
        refValChange(obj);
      });
      viewModel.ItemRefList.on("scope.valuechange", function(obj) {
        var str = obj.newValue;
        viewModel.ItemRefList.setValue('scope1', '')
        var row = viewModel.complexItems.getFocusRow();
        row.setValue("showScope", str);
        row.setValue("scope", str);
      });
      viewModel.ItemRefList.on("scope.valuechange", function(obj) {
        var str = obj.newValue;
        viewModel.ItemRefList.setValue('scope', '')
        var row = viewModel.complexItems.getFocusRow();
        row.setValue("scope", str);
        row.setValue("showScope", str);
      });
      viewModel.ItemRefList.on("scopeStr.valuechange", function(obj) {
        var str = obj.newValue;
        viewModel.ItemRefList.setValue('scopeStr1', '')
        var row = viewModel.complexItems.getFocusRow();
        if (row) {
          row.setValue("scope", str);
          row.setValue("showScope", str);
        }
      });
      viewModel.ItemRefList.on("scopeStr1.valuechange", function(obj) {
        var str = obj.newValue;
        viewModel.ItemRefList.setValue('scopeStr', '');
        var row = viewModel.complexItems.getFocusRow();
        if (row) {
          row.setValue("scope", str);
          row.setValue("showScope", str);
        }
      });
      viewModel.ItemRefList.on("scopecombo.valuechange", function(obj) {
        var str = obj.newValue;
        var row = viewModel.complexItems.getFocusRow();
        if (row) {
          row.setValue("scope", str);
          row.setValue("showScope", str);
        }
      });
      viewModel.ItemRefList.on("fieldschemeref.valuechange", function(obj) {
        // 清空参照时不增行
        if (!obj.newValue) {
          return;
        }
        var refer = $("#refContainerfieldschemeref").data("uui.refer");
        var refValues = refer.values;
        if (refValues && refValues.length > 0) {
          for (var i = 0; i < refValues.length; i++) {
            var code = refValues[i].refcode;
            var id = refValues[i].refpk;
            var row = viewModel.complexItems.getRowByField("fieldsCode", code);
            if (!row || row.status == u.Row.STATUS.FALSE_DELETE) {
              for (var j = 0, len = allfields.length; j < len; j++) {
                if (allfields[j].id == id) {
                  var newrow = viewModel.complexItems.createEmptyRow();
                  newrow.setValue("fieldsName", allfields[j].fieldsName);
                  newrow.setValue("fieldsCode", allfields[j].fieldsCode);
                  newrow.setValue("fadId", allfields[j].id);
                  newrow.setValue("fieldType", allfields[j].fieldType);
                }
              }
            }
          }
        }
      });
    }
  });

  return view;
});