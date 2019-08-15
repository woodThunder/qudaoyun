define(['text!./productsku.html', 'ocm_common', 'searchbox', 'editcard', 'billfooter', './meta.js', 'ocm_global', 'ajaxfileupload', 'ossupload', 'interfaceFileImpl'], function(tpl, common, searchbox, editcard, billfooter) {
  'use strict'
  var app, baseData, events, rendertype, viewModel, singledocSearch, singledoceidt, footer, exportDialog, importDialog, fileDialog, picBigDialog;
  var BILLPANELSTATUS = {
    ADD: "add",
    EDIT: "edit",
    COPY: "copy",
    DETAIL: "detail",
    DEFAULT: "default"
  }

  baseData = {
    index: -1,
    baseurl: '/product-info',
    attrValue: '/base/product-info-attrs/findByProInfoId',
    picurl: '/prod-photo-info',
    relationurl: '/prod-info-photo-info',
    finishedProductSuiteList: new u.DataTable(finishedProductSuite),
    purchaseorderCard: new u.DataTable(finishedProductSuite),
    ProdInfoAndPhotoInfoList: new u.DataTable(ProdInfoAndPhotoInfometa),
    ProductAttributeValueList: new u.DataTable(ProductAttributeValuemeta),
    pictureCategoryRef: new u.DataTable(pictureCategoryRef),
    FileList: new u.DataTable(FileMeta),
    billPanelStatus: ko.observable(CONST.BILLPANELSTATUS.DEFAULT),
    //  billPanelStatus: BILLPANELSTATUS.DEFAULT,
    whetherFormat: common.format.whetherFormat,
    enableCheckSrc: [{
      value: "1",
      name: "是"
    }],
    enableFmt: ko.pureComputed(function() {
      var status = viewModel.finishedProductSuiteList.ref("whetherIMEI")();
      return status == 1 ? "是" : "否";
    }),
    //TODO: 审核枚举值
    whetherUnconventionalitySrc: CONST.WHETHER,
    productionModeSrc: ko.observableArray([]),
    croMaStateSrc: ko.observableArray([]),
    genericTypeSrc: ko.observableArray([]),
    labelStandardSrc: ko.observableArray([]),
    proStateSrc: ko.observableArray([]),
    attrcomItems: ko.observableArray([]),
    attrListTable: [],
    supplySrc: [{
      value: "1",
      name: "供货"
    }, {
      value: "0",
      name: "不供货"
    }],
    pictureCategory: "",
    pictureCategoryName: "",
    prodPhotoInfoId: [],
    //跳转单据页
    goBillPanel: common.bill.goBillPanel,
    //跳转单据详情页
    goDetailPanel: common.bill.goDetailPanel,
    //返回列表页
    retListPanel: common.bill.retListPanel,
    //跳转图片维护页
    goPicPanel: common.bill.goPicPanel,
    onBeforeRowSelectedFun: function(obj) {
      var _prodAttrId = viewModel.ProductAttributeValueList.getRow(obj.rowIndex).getValue('attrProId');
      var attrList = viewModel.ProductAttributeValueList.getRow(obj.rowIndex);
      // var curRow = viewModel.ProductAttributeValueList.getCurrentRow();
      // var _prodAttrId = curRow.getValue("prodAttrStrucItemId");
      $._ajax({
        type: "get",
        url: appCtx + "/base/product-attrs/get-prod-attr-vals/" + _prodAttrId + "?isEnable=1",
        success: function(data) {
          var newarray = common.dataconvert.toMap(data, "name", "id");
          viewModel.attrListTable = newarray;
          viewModel.attrcomItems(newarray);
        }
      });
      return true;
    }
  };
  rendertype = {
    operation: common.rendertype.operation,
    enableStatusRender: function(obj) {
      var showValue = obj.value == "1" ? "启用" : "停用";
      obj.element.innerHTML = showValue;
    },
    detailRender: common.rendertype.detailRender,
    //表格图片
    picShow: function(obj) {
      var prodPhotoInfoUrl = viewModel.ProdInfoAndPhotoInfoList.getRow(obj.rowIndex).getValue("prodPhotoInfoUrl");
      var prodUrl = "";
      if (prodPhotoInfoUrl) {
        //特殊字符\  .  替换
        var prodUrl = prodPhotoInfoUrl.replace(/\./g, "spot").replace(/\//g, "linePath").replace(/\-/g, "lineThrough");
        obj.element.innerHTML = '<img width="30" height="30" src=' + prodPhotoInfoUrl + ' data-bind="click: picBig.bind($data,' + "'" + prodUrl + "'" + ')">';
      }
      ko.cleanNode(obj.element);
      ko.applyBindings(viewModel, obj.element);
    },
    //是否主图
    mainPhoto: function(obj) {
      var mainPhoto = viewModel.ProdInfoAndPhotoInfoList.getRow(obj.rowIndex).getValue("isMainPhoto");
      var showValue = "否";
      if (mainPhoto == 1 || mainPhoto == "1") {
        showValue = "是"
      }
      obj.element.innerHTML = showValue;
      ko.cleanNode(obj.element);
      ko.applyBindings(viewModel, obj.element);
    },
    operationPic: function(obj) {
      var viewModel = obj.gridObj.viewModel;
      var dataTableRowId = obj.row.value['$_#_@_id'];
      var uploadBtn = "data-bind=click:picPage.bind($data," + obj.rowIndex + "," + dataTableRowId + ")";
      obj.element.innerHTML = '<div class="ui-handle-icon">' +
        '<span class="ui-handle-word">' +
        '<a href="#"' +
        uploadBtn +
        ' title="图片维护">图片维护</a>' +
        '</span>' +
        '</div>';
      ko.cleanNode(obj.element);
      ko.applyBindings(viewModel, obj.element);
    },
    //设为主图
    operationMain: function(obj) {
      var viewModel = obj.gridObj.viewModel;
      var dataTableRowId = obj.row.value['$_#_@_id'];
      var mainBtn = "data-bind=click:mainPic.bind($data," + obj.rowIndex + "," + dataTableRowId + ")";
      obj.element.innerHTML = '<div class="ui-handle-icon">' +
        '<span class="ui-handle-word">' +
        '<a href="#"' +
        mainBtn +
        ' title="设为主图">设为主图</a>' +
        '</span>' +
        '</div>';
      ko.cleanNode(obj.element);
      ko.applyBindings(viewModel, obj.element);
    },
    //审核状态
    stateGrid: function(params) {
      params.element.innerHTML = "停用";
      /*默认1表示启用，0表示停用*/
      if (params.value != 0 && params.value != "0") {
        params.element.innerHTML = "启用";
      }
    },
    attributeValueEditType: function(params) {
      var ele = params.element;
      var gridObj = params.gridObj;
      var viewModel = gridObj.viewModel;
      var field = params.field;
      var dataTableId = gridObj.dataTable.id;
      var rowObj = params.rowObj;
      if (rowObj.category == 1) {
        var innerStr = '<div class="ui-inputarea" style="width:auto" u-meta=\'{"id":"' + field +
          '","type":"u-combobox","data":"' + dataTableId +
          '","field":"productAttributeValueId","showFix":true}\'><input style="width:auto" /><span class="ui-icon uf uf-arrow-down" style="top:2px" data-role="combo-button"></span></div>';
      } else {
        var innerStr = '<div class="ui-inputarea" style="width:auto" u-meta=\'{"id":"' + field +
          '","type":"u-text","data":"' + dataTableId +
          '","field":"productAttributeValueName"}\'><input style="width:auto" /></div>';
      }
      var innerDom = u.makeDOM(innerStr);
      ele.innerHTML = '';
      ele.appendChild(innerDom);
      var comp = app.createComp(innerDom, viewModel);
      if (rowObj.category == 1) {
        if (u.isArray(rowObj.productAttributeValueArray) && rowObj.productAttributeValueArray.length > 0) {
          comp.setComboData(rowObj.productAttributeValueArray);
        } else {
          var _prodAttrId = rowObj.attrProId;
          $._ajax({
            type: "post",
            url: appCtx + "/base/product-attribute-values/findByProAttId",
            data: {
              proAttId: _prodAttrId
            },
            async: false,
            success: function(data) {
              var newarray = common.dataconvert.toMap(data, "name", "id");
              var rowId = rowObj['$_#_@_id'];
              var row = viewModel[dataTableId].getRowByRowId(rowId);
              row.setValue("productAttributeValueArray", newarray);
              comp.setComboData(newarray);
            }
          });
        }
        comp.comp.setName(rowObj.productAttributeValueName);
      }
      gridObj.editComp = comp;
      u.compMgr.updateComp(ele);
    },
    sum: ko.pureComputed(function(obj) {
      var length = viewModel.finishedProductSuiteList.ref('length')();
      var width = viewModel.finishedProductSuiteList.ref('width')();
      var height = viewModel.finishedProductSuiteList.ref('height')();
      var diameter = viewModel.finishedProductSuiteList.ref('diameter')();
      length == null ? length = "" : length = length + "*";
      width == null ? width = "" : width = width + "*";
      height == null ? height = "" : height = height;
      diameter == null ? diameter = "" : diameter = "φ" + diameter + "*";
      return diameter + length + width + height;
    }),

  };

  events = {
    //进入复制单据页
    showCopyBillPanel: function() {
      viewModel.index = -1;
      var copyRow = viewModel.finishedProductSuiteList.getFocusRow();
      if (copyRow) {
        var maindata = copyRow.getSimpleData();
        var childdata = viewModel.ProductAttributeValueList.getSimpleData(); //copyRow.getValue("purchaseOrderItems").getSimpleData();

        // if (childdata && childdata.length > 0) {
        //   maindata.reqTypeCode = childdata[0].reqTypeCode;
        //   maindata.reqTypeName = childdata[0].reqTypeName;
        // }
        viewModel.purchaseorderCard.setSimpleData(maindata);
        viewModel.ProductAttributeValueList.setSimpleData(childdata, {
          unSelect: true,
          status: "new"
        });

        var curRow = viewModel.purchaseorderCard.getFocusRow();
        // // 为参照设置联动条件
        // viewModel.seteidtCondition();
        // // 获得当前最大行号
        // viewModel.getCurRowNum();
        // // 获得服务器当前时间
        // viewModel.getCurDate(curRow);
        // // 为合计行进行精度处理
        // viewModel.totalPrecisionHandle(curRow);

        //删除主表主键，编码，审计信息
        viewModel.clearBaseProp(curRow, 1);
        // 单据状态重设为未提交
        // curRow.setValue("billStatusCode", billstatus.UNCOMMITTED);
        // curRow.setValue("billStatusName", "未提交");
        //删除子表主键，子表主表关联,并获得产品id
        var subRows = viewModel.ProductAttributeValueList.getAllRows();
        var productids = [];
        // if (subRows && subRows.length > 0) {
        //   for (var i = 0; i < subRows.length; i++) {
        //     viewModel.clearBaseProp(subRows[i], 2);
        //     productids.push(subRows[i].getValue("productId"));
        //     // 删除孙表主键，孙表和子表之间的关联
        //     var subStructRows = subRows[i].getValue("poProductStrucs").getAllRows();
        //     if (subStructRows && subStructRows.length > 0) {
        //       for (var j = 0; j < subStructRows.length; j++) {
        //         viewModel.clearBaseProp(subStructRows[j], 3);
        //       }
        //     }
        //   }
        // }
        if ($('#SPU-input').css('display') == 'none') {
          $('#SPU-input').show();
          $('#designProductId').show();
          $('#SPU-text').hide();
          $("#code-input").show();
          $("#code-text").hide();
          $(".ui-bill-detail").show();
        }

        viewModel.goBillPanel();
        viewModel.billPanelStatus = BILLPANELSTATUS.COPY;
        // // 重新询价
        // if (productids.length > 0) {
        //   viewModel.inquiryPrice(productids);
        // }
      } else {
        toastr.warning("未找到来源商品");
      }
    },
    //删除和批量删除
    del: function(data) {
      if (typeof(data) == 'number') {
        viewModel.finishedProductSuiteList.setRowSelect(data);
      }
      var ids = [];
      var status = [];
      var statustip = "";
      var rows = viewModel.finishedProductSuiteList.getSelectedRows();
      if (rows && rows.length > 0) {
        for (var i = 0; i < rows.length; i++) {
          ids.push(rows[i].getValue("id"));
          var statusCode = rows[i].getValue("statusCode");
          if (statusCode == 1 || statusCode == "1") {
            status.push(rows[i].getValue("code"));
          }
        }
        if (status.length > 0) {
          function statusArr() {
            for (i = 0; i < status.length; i++) {
              statustip += status[i] + "，";
            }
            return statustip.substring(0, statustip.length - 1)
          }
          toastr.warning("数据   " + statusArr() + " 已启用不可删除");
          return false
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
                viewModel.finishedProductSuiteList.removeRows(rows);
                toastr.success("删除成功");
              }
            });

          }
        });
      } else {
        toastr.warning("请先选择需要删除数据");
      }
    },

    //根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
    search: function(reindex) {
      if (reindex) {
        viewModel.finishedProductSuiteList.pageIndex(0);
      }
      viewModel.finishedProductSuiteList.removeAllRows();
      var queryData = singledocSearch.getDataWithOpr();
      var pageSize = viewModel.finishedProductSuiteList.pageSize();
      var pageNumber = viewModel.finishedProductSuiteList.pageIndex();
      queryData.size = pageSize;
      queryData.page = pageNumber;
      $._ajax({
        type: "get",
        url: appCtx + viewModel.baseurl + "",
        dataType: "json",
        data: queryData,
        success: function(data) {
          viewModel.finishedProductSuiteList.setSimpleData(data.content, {
            unSelect: true
          });
          viewModel.finishedProductSuiteList.totalRow(data.totalElements);
          viewModel.finishedProductSuiteList.totalPages(data.totalPages);
        }
      })
    },
    //清空搜索条件
    cleanSearch: function() {
      singledocSearch.clearSearch();
    },
    //页码改变时的回调函数
    pageChange: function(index) {
      viewModel.finishedProductSuiteList.pageIndex(index);
      viewModel.search();
    },
    //页码改变时的回调函数
    sizeChange: function(size) {
      viewModel.finishedProductSuiteList.pageSize(size);
      viewModel.search();
    },
    //进入新增单据页
    showAddBillPanel: function() {
      viewModel.index = -1;
      var curRow = viewModel.purchaseorderCard.createEmptyRow();
      viewModel.purchaseorderCard.setRowFocus(curRow);
      curRow.setValue("statusCode", "1");
      viewModel.goBillPanel();
      $(".product-choose-result").hide();
      $(".product-choose-content").hide();
      $("#code-input").show();
      $("#code-text").hide();
      $('#SPU-input').show();
      $('#designProductId').show();
      $('#SPU-text').hide();
      viewModel.billPanelStatus = BILLPANELSTATUS.ADD;
    },
    //进入修改单据页
    showEditBillPanel: function(index, rowId) {
      var row;
      viewModel.rowId = rowId;
      if (index == -1) {
        //处理通过详情页编辑进入
        row = viewModel.finishedProductSuiteList.getFocusRow();
        //通过改变index判断当前处于编辑态
        index = 0;
      } else {
        //行上的编辑按钮
        row = viewModel.finishedProductSuiteList.getRowByRowId(rowId);
      }
      viewModel.index = index;
      viewModel.rowId = row.rowId;
      // viewModel.purchaseorderCard.setRowFocus(index);
      var maindata = row.getSimpleData();
      viewModel.purchaseorderCard.removeAllRows();
      viewModel.purchaseorderCard.setSimpleData(maindata);
      var id = viewModel.purchaseorderCard.getValue("id");
      var attId = viewModel.purchaseorderCard.getValue("prodAttrStrucId");
      //      alert(viewModel.finishedProductSuiteList.whetherSaleProduct);
      viewModel.purchaseorderCard.originEditData = viewModel.purchaseorderCard.getFocusRow().getSimpleData();
      var dLIst = viewModel.findByParentid(id, attId);

      viewModel.goBillPanel();
      viewModel.billPanelStatus = BILLPANELSTATUS.EDIT;
      // var whetherProductPackShow = viewModel.finishedProductSuiteList.getValue("whetherProductPack");
      // if (whetherProductPackShow == 1) {
      //   $(".product-choose-result").show();
      // }
      var designProductSPUName = viewModel.purchaseorderCard.getValue('designProductName');
      $('#SPU-input').hide();
      $('#designProductId').hide();
      $('#SPU-text').show().html(designProductSPUName);
      var code = viewModel.purchaseorderCard.getValue('code');
      $("#code-input").hide();
      $("#code-text").show().html(code);
    },
    //查询子表数据
    findByParentid: function(id, attId) {
      $._ajax({
        url: appCtx + viewModel.attrValue,
        type: 'post',
        async: false,
        data: {
          'proInfoId': id
        },
        success: function(data) {
          viewModel.ProductAttributeValueList.removeAllRows();
          viewModel.ProductAttributeValueList.setSimpleData(data);
          if (attId && attId) {
            viewModel.findAttrValues(attId, data);
          }
        }
      })
    },
    findAttrValues: function(struId, dList) {
      app.getComp("prodAttrStrucId").setValue(struId);
      $._ajax({
        type: "get",
        url: appCtx + "/base/prod-attr-strucs/get-prod-attr-struc-items/" + struId,
        success: function(data) {
          if (dList && dList.length) {
            for (var i = 0, len = data.length; i < len; i++) { //给对应的属性赋值
              for (var l = 0, dLen = dList.length; l < dLen; l++) {
                if (data[i].displayName == dList[l].prodAttrStrucItemName) {
                  var subAttName = dList[l].attrvalue ? dList[l].attrvalue : dList[l].productAttributeValueName;
                  data[i].productAttributeValueName = subAttName;
                  data[i].productAttributeValueId = dList[l].productAttributeValueId;
                }
              }
            }
            var attrList = data.map(function(row, index, arr) {
              return {
                "id": row.id,
                "creationTime": row.creationTime,
                "attrProId": row.prodAttrId,
                "prodAttrStrucItemName": row.displayName,
                "prodAttrStrucItemId": row.id,
                "productAttributeValueName": row.productAttributeValueName,
                "productAttributeValueId": row.productAttributeValueId,
                "isKeyAttr": row.isKeyAttr,
                "category": row.category,
                "attrvalue": row.productAttributeValueName
              }
            });
          } else {
            var attrList = data.map(function(row, index, arr) {
              return {
                "attrProId": row.prodAttrId,
                "prodAttrStrucItemName": row.displayName,
                "prodAttrStrucItemId": row.id,
                "productAttributeValueName": "",
                "productAttributeValueId": '',
                "isKeyAttr": row.isKeyAttr,
                "category": row.category
              }
            });
          }
          viewModel.ProductAttributeValueList.removeAllRows();
          viewModel.ProductAttributeValueList.setSimpleData(attrList);
          $(".product-choose-result").show();
          $(".product-choose-content").show();
          $(".product-choose-result").addClass("open");
        }
      });
    },
    //进入复制单据页
    // showCopyBillPanel: function() {
    //   var selectedRows = viewModel.finishedProductSuiteList.getSelectedRows();
    //   var focusRow = viewModel.finishedProductSuiteList.getFocusRow();
    //   // 只支持单一复制，批量复制需单独处理
    //   if (selectedRows.length != 1) {
    //     //TODO: tips替换
    //     alert("请选择一条要复制的行")
    //     return;
    //   }
    //   var copyRow = selectedRows[0];
    //   var curRow = viewModel.finishedProductSuiteList.createEmptyRow();
    //   curRow.setSimpleData(copyRow.getSimpleData());
    //   viewModel.finishedProductSuiteList.setRowFocus(curRow);
    //   var id = copyRow.getValue("id");
    //   //删除主表主键，编码，审计信息
    //   viewModel.clearBaseProp(curRow);
    //   viewModel.goBillPanel();
    //   viewModel.billPanelStatus = BILLPANELSTATUS.COPY;
    // },
    // 清除基类属性
    // clearBaseProp: function(row, type) {
    //   // 公共
    //   row.setValue("id", "");
    //   row.setValue("code", "");
    //   row.setValue("description", "");
    //   row.setValue("name", "");
    // },
    //进入详情页
    detail: function() {
      //确保grid先将行设置为focus状态
      setTimeout(function() {
        $(".detail-show").hide();
        $(".detail-show-content").hide();
        var curRow = viewModel.finishedProductSuiteList.getFocusRow();
        var id = curRow.getValue("id");
        $(".show-detail").hide();
        var attId = viewModel.finishedProductSuiteList.getValue("prodAttrStrucId");
        if (attId) {
          $(".detail-show").show();
          $(".detail-show-content").show();
        }
        // var attId = viewModel.finishedProductSuiteList.getValue("prodAttrStrucId");
        var dLIst = viewModel.findByParentid(id, attId);
        //根据id查图片维护
        $.ajax({
          url: appCtx + viewModel.relationurl + '/findByProductInfoId',
          type: 'get',
          data: {
            productInfoId: id
          },
          contentType: "application/json; charset=utf-8",
          success: function(data) {
            viewModel.ProdInfoAndPhotoInfoList.setSimpleData(data, {
              unSelect: true
            });
          }
        });
        //        viewModel.fillData(id);
        //        viewModel.billPanelStatus(CONST.BILLPANELSTATUS.DETAIL);
        viewModel.goDetailPanel();
      }, 0);
    },
    // 详情页跳转编辑单据页
    detail2bill: function() {
      //      viewModel.billPanelStatus(CONST.BILLPANELSTATUS.EDIT);
      viewModel.billPanelStatus = BILLPANELSTATUS.EDIT;
      var whetherProductPackShow = viewModel.finishedProductSuiteList.getValue("whetherProductPack");
      if (whetherProductPackShow == 1) {
        $(".product-choose-result").show();
      }
      var rowObj = viewModel.finishedProductSuiteList.getFocusRow();
      var rowId = rowObj['$_#_@_id'];
      viewModel.showEditBillPanel(-1, rowId);
      common.bill.detail2bill();
    },
    // 清除基类属性
    clearBaseProp: function(row) {
      row.setValue("id", "");
      row.setValue("code", "");
      row.setValue("description", "");
      row.setValue("name", "");
      row.setValue("creator", "");
      row.setValue("creationTime", "");
      row.setValue("modifier", "");
      row.setValue("modifiedTime", "");
    },
    //保存单据
    saveBill: function() {
      var productBase = $("#productBase")[0];
      var basePass = viewModel.validate(productBase);
      var ProAttributeValueData = viewModel.ProductAttributeValueList.getSimpleData();
      var subAttr = viewModel.validateSubTabAttr(ProAttributeValueData, 'grid_attr_value_content_table');
      if (!subAttr) {
        return false;
      }
      if (basePass.passed) {

        var currentRow, index = viewModel.index;
        var PromoActivityData = viewModel.purchaseorderCard.getCurrentRow().getSimpleData();
        if (viewModel.billPanelStatus == BILLPANELSTATUS.ADD || viewModel.billPanelStatus == BILLPANELSTATUS.COPY) {
          PromoActivityData.persistStatus = "new";
          PromoActivityData.proNature = "3";
        } else
        if (viewModel.billPanelStatus == BILLPANELSTATUS.EDIT) {
          PromoActivityData.persistStatus = "upd";
        } else {
          PromoActivityData.persistStatus = "";
        }
        PromoActivityData.prodInfoAndPhotoInfos = [];
        PromoActivityData.matchRelations = [];
        for (var k in PromoActivityData) {
          if (k.indexOf("whether") > -1 && PromoActivityData[k] == null) {
            PromoActivityData[k] = 0;
          }
        }
        if (PromoActivityData.cubage == null) {
          PromoActivityData.cubage = 0;
        }
        if (PromoActivityData.netWeight == null) {
          PromoActivityData.netWeight = 0;
        }
        if (PromoActivityData.grossWeight == null) {
          PromoActivityData.grossWeight = 0;
        }

        var ProAttributeValueData = viewModel.ProductAttributeValueList.getSimpleData();
        // for (var i = 0, len = ProAttributeValueData.length; i < len; i++) {
        //   var curRow = viewModel.ProductAttributeValueList.getRow(i);
        //   curRow.setValue("productAttributeValueName", ProAttributeValueData[i].productAttributeValueId);
        // }
        var attrs = viewModel.ProductAttributeValueList.getSimpleData();
        PromoActivityData.productInfoAttrs = attrs;
        var _ajaxType = viewModel.purchaseorderCard.getValue("id") ? "put" : "post";
        $._ajax({
          url: appCtx + viewModel.baseurl,
          type: _ajaxType,
          data: JSON.stringify(PromoActivityData),
          contentType: "application/json; charset=utf-8",
          success: function(data) {
            viewModel.purchaseorderCard.getFocusRow().setSimpleData(data);
            toastr.success("保存成功");
            if (viewModel.billPanelStatus == BILLPANELSTATUS.EDIT) {
              currentRow = viewModel.finishedProductSuiteList.getRowByRowId(viewModel.rowId);
            } else {
              currentRow = viewModel.finishedProductSuiteList.createEmptyRow();
            }
            currentRow.setSimpleData(data);
            viewModel.retListPanel();
          }
        })
      }

    },
    //取消单据
    cancelBill: function() {
      var curRow = viewModel.purchaseorderCard.getCurrentRow();
      if (!curRow) {
        var curRow = viewModel.finishedProductSuiteList.getCurrentRow();
      }
      // 修改，则还原
      if (curRow.getValue("id")) {
        curRow.setSimpleData(viewModel.purchaseorderCard.originEditData)
      }
      // 新增或复制，则删除
      else {
        viewModel.purchaseorderCard.removeRow(curRow);
      }
      viewModel.retListPanel();
    },

    //启用
    enable: function() {
      var selectedRows = viewModel.finishedProductSuiteList.getSelectedRows();
      var ids = [];
      var status = [];
      var statustip = "";
      if (selectedRows && selectedRows.length > 0) {
        for (var i = 0; i < selectedRows.length; i++) {
          ids.push(selectedRows[i].getValue("id"));
          if (selectedRows[i].getValue("statusCode") == 1 || selectedRows[i].getValue("statusCode") == "1") {
            status.push(selectedRows[i].getValue("code"));
          }
        }
        if (status.length > 0) {
          function statusArr() {
            for (i = 0; i < status.length; i++) {
              statustip += status[i] + "，";
            }
            return statustip.substring(0, statustip.length - 1)
          }
          toastr.warning("数据   " + statusArr() + " 不可重复启用");
          return false
        }
        ids = ids.join(",");
        $._ajax({
          type: "post",
          url: appCtx + viewModel.baseurl + "/batch-enable",
          data: {
            ids: ids
          },
          success: function(res) {
            for (var i = 0; i < selectedRows.length; i++) {
              selectedRows[i].setValue("statusCode", "1");
            }
            toastr.success("启用成功");
          }
        })
      } else {
        toastr.warning("请先选择需要启用数据");
      }
    },
    //停用
    disable: function() {
      var selectedRows = viewModel.finishedProductSuiteList.getSelectedRows();
      var ids = [];
      var status = [];
      var statustip = "";
      if (selectedRows && selectedRows.length > 0) {
        for (var i = 0; i < selectedRows.length; i++) {
          ids.push(selectedRows[i].getValue("id"));
          if (selectedRows[i].getValue("statusCode") == 0 || selectedRows[i].getValue("statusCode") == "0") {
            status.push(selectedRows[i].getValue("code"));
          }
        }
        if (status.length > 0) {
          function statusArr() {
            for (i = 0; i < status.length; i++) {
              statustip += status[i] + "，";
            }
            return statustip.substring(0, statustip.length - 1)
          }
          toastr.warning("数据   " + statusArr() + " 不可重复停用");
          return false
        }
        ids = ids.join(",");
        $._ajax({
          type: "post",
          url: appCtx + viewModel.baseurl + "/batch-disable",
          data: {
            ids: ids
          },
          success: function(res) {
            for (var i = 0; i < selectedRows.length; i++) {
              selectedRows[i].setValue("statusCode", "0");
            }
            toastr.success("停用成功");
          }
        })
      } else {
        toastr.warning("请先选择需要停用数据")
      }
    },
    //进入图片维护页
    picPage: function(index, rowId) {
      var currentData = viewModel.finishedProductSuiteList.getRowByRowId(rowId).getSimpleData();
      viewModel.picRowId = currentData.id;
      //根据id查图片维护
      $.ajax({
        url: appCtx + viewModel.relationurl + '/findByProductInfoId',
        type: 'get',
        data: {
          productInfoId: viewModel.picRowId
        },
        contentType: "application/json; charset=utf-8",
        success: function(data) {
          viewModel.ProdInfoAndPhotoInfoList.setSimpleData(data, {
            unSelect: true
          });
        }
      });
      viewModel.goPicPanel();
    },
    //设为主图
    mainPic: function(index) {
      var oldData = viewModel.ProdInfoAndPhotoInfoList.getRow(index).getSimpleData();
      var allData = viewModel.ProdInfoAndPhotoInfoList.getSimpleData();
      var id;
      if (JSON.stringify(oldData).indexOf("id") != -1) {
        id = oldData.id;
        $._ajax({
          type: "post",
          url: appCtx + viewModel.relationurl + "/setIsMainPhoto",
          data: {
            id: id
          },
          success: function(res) {
            for (var i = 0; i < allData.length; i++) {
              if (allData[i] != index) {
                viewModel.ProdInfoAndPhotoInfoList.getRow(i).setValue("isMainPhoto", 0);
              }
            }
            viewModel.ProdInfoAndPhotoInfoList.getRow(index).setValue("isMainPhoto", 1);
            toastr.success("设为主图成功");
          }

        })
      } else {
        for (var i = 0; i < allData.length; i++) {
          if (allData[i] != index) {
            viewModel.ProdInfoAndPhotoInfoList.getRow(i).setValue("isMainPhoto", 0);
          }
        }
        viewModel.ProdInfoAndPhotoInfoList.getRow(index).setValue("isMainPhoto", 1);
        toastr.success("设为主图成功");
      }
    },
    //导入
    importHandle: function() {
      var urlInfo = '/product-excel/excelDataImport'; //倒入地址参数
      var urlStatusInfo = '/product-excel/excelLoadingStatus'; //请求进度地址参数
      var ele = $('#importFiel')[0]; //挂载元素
      common.fileHandle.importFile(urlInfo, urlStatusInfo, ele);
    },
    //导出
    exportHandle: function() {
      var searchParams = singledocSearch.getDataWithOpr(); //搜索查询参数
      searchParams.search_EQ_proNature = "3";
      var templateUrl = '/product-excel/downloadExcelTemplate'; //导出模板地址参数
      var excelDataUrl = '/product-excel/excelDataExport'; //导出数据地址参数
      var listData = viewModel.finishedProductSuiteList; //需要导出表格的dataTable
      var ele = $('#exportFiel')[0]; //挂载元素
      common.fileHandle.exportFile(listData, ele, searchParams, templateUrl, excelDataUrl);
    },
    validate: function(element) {
      var result = app.compsValidateMultiParam({
        element: element,
        showMsg: true
      });
      return result;
    },
    validateSubTabAttr: function(datas, id) {
      var isOk = true;
      var dLists = datas.map(function(row, index, arr) {
        if (row.isKeyAttr == 1 && !row.productAttributeValueName) {
          toastr.error('"' + row.prodAttrStrucItemName + '"是必填项,请输入!');
          isOk = false;
        }
        if (!row.category && row.productAttributeValueName) {
          var temprow = viewModel.ProductAttributeValueList.getRowByField("prodAttrStrucItemId", row.prodAttrStrucItemId);
          temprow.setValue("attrvalue", row.productAttributeValueName);
        }
        return row;
      });
      // viewModel.ProductAttributeValueList.removeAllRows();
      // viewModel.ProductAttributeValueList.addSimpleData(dLists, "nrm", {
      //   "unSelect": true
      // });
      return isOk;
    },
    whetherSupply: function() {
      var dataValue = viewModel.finishedProductSuiteList.getValue('whetherSupply');
      var showName;
      dataValue == 1 ? showName = "供货" : showName = "不供货";
      return showName;
    },
    whetherEnable: function() {
      var dataValue = viewModel.finishedProductSuiteList.getValue('statusCode');
      var showName = "启用";
      if (dataValue == 0 || dataValue == "0") {
        showName = "停用";
      }
      return showName;
    },
    //子表 删除和批量删除
    delRow: function(dataTable) {
      var rows = viewModel[dataTable].getSelectedRows();
      viewModel[dataTable].removeRows(rows);
    },
    picBig: function(url) {
      var picUrl = url.replace(/spot/g, ".").replace(/linePath/g, '\\').replace(/lineThrough/g, '\-');
      if (!picBigDialog) {
        picBigDialog = u.dialog({
          content: "#picBig-dialog",
          hasCloseMenu: true
        });
      } else {
        picBigDialog.show();
      }
      $("#picBig-dialog").parent().parent().css("width", "auto");
      $("#picBig").attr("src", picUrl);
    },
    //--------------------------------图片上传-------------------------------------------------
    //随机生成文件夹
    generateMixed: function() {
      var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
      var result = "";
      for (var i = 0; i < 20; i++) {
        var id = Math.ceil(Math.random() * 35);
        result += chars[id];
      }
      return result;
    },
    //上传弹框调用
    showFileDialog: function() {
      viewModel.pk = viewModel.generateMixed();
      var pk = viewModel.pk;
      viewModel.fileQuery();
      if (!fileDialog) {
        fileDialog = u.dialog({
          content: "#file-dialog",
          hasCloseMenu: true
        });
      } else {
        fileDialog.show();
      }
    },
    onOpenUploadWin: function() {
      if (viewModel.pictureCategory != "") {
        $("#uploadbatch_id").val(undefined);
        $("#uploadbatch_id").trigger("click");
      } else {
        toastr.warning("请先选择图片分类");
      }
    },
    //上传附件
    onFileUpload: function() {
      var fileNum = $("#uploadbatch_id")[0].files.length;
      var fileSize = 0;
      var fileSizeMb = 0;
      var fileTypeArr = [];
      var allowType = ".jpg,.bmp,.gif,.png,.jpeg";
      var fileSizeSum = function() {
        for (var i = 0; i < fileNum; i++) {
          fileSize += $("#uploadbatch_id")[0].files[i].size;
          var fileName = $("#uploadbatch_id")[0].files[i].name;
          var fileType = fileName.substr(fileName.lastIndexOf(".")).toLowerCase();
          fileTypeArr.push(fileType);
        }
        fileSizeMb = fileSize / 1024 / 1024;
        return fileSizeMb
      }();
      for (var i = 0; i < fileTypeArr.length; i++) {
        if (allowType.indexOf(fileTypeArr[i]) == -1) {
          toastr.warning("仅支持" + allowType + "格式文件");
          return false
        }
      }
      if (fileSizeSum <= 500) {
        //获取表单
        var pk = viewModel.pk;
        var allowExtention = ".jpg,.bmp,.gif,.png";
        var par = {
          fileElementId: "uploadbatch_id", //【必填】文件上传空间的id属性  <input type="file" id="id_file" name="file" />,可以修改，主要看你使用的 id是什么
          filepath: pk, //【必填】单据相关的唯一标示，一般包含单据ID，如果有多个附件的时候由业务自己制定规则
          groupname: pk, //【必填】分組名称,未来会提供树节点
          permission: "read", //【选填】 read是可读=公有     private=私有     当这个参数不传的时候会默认private
          url: true, //【选填】是否返回附件的连接地址，并且会存储到数据库
          //thumbnail :  "500w",//【选填】缩略图--可调节大小，和url参数配合使用，不会存储到数据库
          cross_url: window.ctxfilemng //【选填】跨iuap-saas-fileservice-base 时候必填
        }
        var f = new interface_file();
        f.filesystem_upload(par, viewModel.fileUploadCallback);

      } else {
        toastr.warning("图片总和不能超过500MB");
        return false
      }
    },
    //上传文件回传信息
    fileUploadCallback: function(data) {
      if (1 == data.status) { //上传成功状态
        viewModel.FileList.addSimpleData(data.data);
        //  toastr.success();
      } else { //error 或者加載js錯誤
        toastr.error(data.message);
      }
    },
    fileQuery: function() {
      //获取表单
      var pk = viewModel.pk;
      var par = {
        //建议一定要有条件否则会返回所有值
        filepath: pk, //【选填】单据相关的唯一标示，一般包含单据ID，如果有多个附件的时候由业务自己制定规则
        groupname: pk, //【选填】[分組名称,未来会提供树节点]
        cross_url: window.ctxfilemng //【选填】跨iuap-saas-fileservice-base 时候必填
      }
      var f = new interface_file();
      f.filesystem_query(par, viewModel.fileQueryCallBack);
    },
    fileQueryCallBack: function(data) {
      if (1 == data.status) { //上传成功状态
        viewModel.FileList.setSimpleData(data.data);
      } else {
        //删除成功后查询
        if (data.status == 0 && !data.data) {
          viewModel.FileList.setSimpleData([]);
        }
      }
    },
    //附件删除
    fileDelete: function() {
      var row = viewModel.FileList.getSelectedRows();
      if (row == null || row.length == 0) {
        toastr.error("请选择一个附件");
        return
      }
      for (var i = 0; i < row.length; i++) {
        var pk = row[i].getValue("id");
        var par = {
          id: pk, //【必填】表的id
          cross_url: window.ctxfilemng //【选填】跨iuap-saas-fileservice-base 时候必填
        }
        var f = new interface_file();
        f.filesystem_delete(par, viewModel.fileDeleteCallBack);
      }
    },
    //附件删除回调
    fileDeleteCallBack: function(data) {
      if (1 == data.status) { //上传成功状态
        viewModel.fileQuery();
      } else {
        toastr.error(data.message);
      }
    },
    //下载
    fileDownload: function() {
      var row = viewModel.FileList.getSelectedRows();
      if (row == null || row.length == 0 || row.length > 1) {
        toastr.error("请选择一个附件");
        return
      }
      for (var i = 0; i < row.length; i++) {
        var pk = row[i].getValue("id");
        var form = $("<form>"); //定义一个form表单
        form.attr('style', 'display:none'); //在form表单中添加查询参数
        form.attr('target', '');
        form.attr('enctype', 'multipart/form-data');
        form.attr('method', 'post');
        form.attr('action', window.ctxfilemng + "file/download?permission=read&stream=false&id=" + pk);
        $('#file-dialog').append(form); //将表单放置在web中
        form.submit();
      }
    },
    //查看
    fileView: function() {
      var row = viewModel.FileList.getSelectedRows();
      if (row == null || row.length == 0) {
        toastr.error("请选择一个附件");
        return
      }
      for (var i = 0; i < row.length; i++) {
        var url = row[i].getValue("url");
        parent.open(location.origin + url);
      }
    },
    //图片保存
    savePic: function() {
      var curRow = viewModel.finishedProductSuiteList.getCurrentRow();
      var cId = curRow.getValue("id");
      var postdata = viewModel.FileList.getSimpleData();
      if (postdata.length == 0) {
        toastr.warning("没有相关数据需要保存");
        return false
      }
      var picdata = new Array();
      for (var i = 0; i < postdata.length; i++) {
        picdata[i] = {};
        picdata[i].code = postdata[i].filename;
        picdata[i].picturePath = postdata[i].url;
        picdata[i].pictureCategoryId = viewModel.pictureCategory;
        picdata[i].statusCode = "1";
        picdata[i].persistStatus = "new";
      }
      $._ajax({
        url: appCtx + viewModel.picurl + "/batch-save",
        type: "post",
        data: JSON.stringify(picdata),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        complete: function() {
          u.hideLoader();
        },
        success: function(data) {
          var andArr = [];
          for (var i = 0; i < data.length; i++) {
            andArr[i] = {};
            andArr[i].prodPhotoInfoCode = data[i].code;
            andArr[i].prodPhotoInfoUrl = data[i].picturePath;
            andArr[i].pictureCategoryName = viewModel.pictureCategoryName;
            viewModel.prodPhotoInfoId[i] = data[i].id;
          }
          toastr.success("保存成功");
          fileDialog.hide();
          viewModel.ProdInfoAndPhotoInfoList.addSimpleData(andArr, "new", {
            "unSelect": true
          });
        }
      })

    },
    //图片关系保存
    saveParse: function() {
        var curRow = viewModel.finishedProductSuiteList.getCurrentRow();
        var cId = curRow.getValue("id");
        var postdata = viewModel.ProdInfoAndPhotoInfoList.getSimpleData();
        var picdata = [];
        var nochangeData = [];
        for (var i = 0; i < postdata.length; i++) {
          if (postdata[i].persistStatus != "nrm") {
            picdata.push(postdata[i]);
            if (postdata[i].persistStatus == "new") {
              picdata[i].productInfoId = cId;
              picdata[i].prodPhotoInfoUrl = postdata[i].prodPhotoInfoUrl;
              picdata[i].pictureCategoryId = viewModel.pictureCategory;
              picdata[i].statusCode = "1";
              if (picdata[i].isMainPhoto == null) {
                picdata[i].isMainPhoto = 0;
              }
              picdata[i].prodPhotoInfoId = viewModel.prodPhotoInfoId[i];
            }
          } else {
            nochangeData.push(postdata[i]);
          }
        }
        if (picdata.length == 0) {
          toastr.warning("没有相关数据需要保存");
          return false
        } else {
          $._ajax({
            url: appCtx + viewModel.relationurl + "/batch-save",
            type: "post",
            data: JSON.stringify(picdata),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            complete: function() {
              u.hideLoader();
            },
            success: function(data) {
              viewModel.ProdInfoAndPhotoInfoList.removeAllRows();
              viewModel.ProdInfoAndPhotoInfoList.addSimpleData(nochangeData, "nrm", {
                "unSelect": true
              });
              viewModel.ProdInfoAndPhotoInfoList.addSimpleData(data, "nrm", {
                "unSelect": true
              });
              toastr.success("保存成功");
            }
          })
        }
      }
      //--------------------------------图片上传-------------------------------------------------

  }
  viewModel = u.extend({}, baseData, events, common.rendertype, rendertype);

  function appInit(element, params) {
    //将模板页渲染到页面上
    element.innerHTML = tpl;
    //将viewModel和页面上的元素绑定并初始化u-meta声明的组件
    app = u.createApp({
      el: element,
      model: viewModel
    });
    // 查询组件初始化
    singledocSearch = new searchbox(
      $("#custommade-searchcontent")[0], [{
        type: "text",
        key: "code",
        label: "编码"
      }, {
        type: "text",
        key: "description",
        label: "名称"
      }, {
        type: "text",
        key: "proModel",
        label: "型号"
      }, {
        type: "refer",
        key: "productCategory--id",
        referId: "productCategoryId",
        label: "所属分类",
        refinfo: "productCategory"
      }]);
    // footer = new billfooter($(".ui-bill-footer").get(), viewModel, "finishedProductSuiteList");
    // 列表查询数据(无查询条件)
    viewModel.search();
  }

  function afterRender() {
    // 初始化折叠面板
    $.fn.collapsepanel(false, true);
    //绑定输入框enter事件
    $('#PromoActivity-searchcontent input').off("keydown").on("keydown", function(e) {
      if (e.keyCode == 13) {
        $(this).blur();
        viewModel.search();
      }
    });
    // //长宽高计算外观值
    // viewModel.finishedProductSuiteList.on("length.valuechange", function(obj) {
    //   var exteriorSize = app.getComp("exteriorSize");
    //   exteriorSize.setValue(viewModel.sum());
    // });
    // viewModel.finishedProductSuiteList.on("width.valuechange", function(obj) {
    //   var exteriorSize = app.getComp("exteriorSize");
    //   exteriorSize.setValue(viewModel.sum());
    // });
    // viewModel.finishedProductSuiteList.on("height.valuechange", function(obj) {
    //   var exteriorSize = app.getComp("exteriorSize");
    //   exteriorSize.setValue(viewModel.sum());
    // });
    //根据产品带出所属分类属性结构型号销售系列
    viewModel.purchaseorderCard.on("designProductId.valuechange", function(obj) {
      if (obj.oldValue != undefined && obj.newValue != obj.oldValue) {
        var procates = app.getComp("productCategoryName"); //所属分类
        var saleSeriesName = app.getComp("saleSeriesName"); //销售系列
        var proattrstructure = app.getComp("prodAttrStrucName"); //属性结构
        var proModel = app.getComp("proModel"); //型号
        var refer = $("#refContainerdesignProductId").data("uui.refer");
        var refValues = refer.values;
        if (refValues[0].productCategoryName != null) {
          procates.setValue(refValues[0].productCategoryName);
          app.getComp("productCategoryId").setValue(refValues[0].productCategoryId);
        }
        if (refValues[0].productSaleSeriesName != null) {
          saleSeriesName.setValue(refValues[0].productSaleSeriesName);
          app.getComp("saleSeriesId").setValue(refValues[0].productSaleSeriesId);
        }
        if (refValues[0].prodAttrStrucName != null) {
          proattrstructure.setValue(refValues[0].prodAttrStrucName);
          var struId = refValues[0].prodAttrStrucId;
          viewModel.findAttrValues(struId);
        }
        if (refValues[0].proModel != null) {
          proModel.setValue(refValues[0].proModel);
        }
      }
    });
    //根据研发系列带出销售系列
    // viewModel.finishedProductSuiteList.on("radSeriesId.valuechange", function(obj) {
    //  if(obj.oldValue!=undefined && obj.newValue != obj.oldValue){
    //      var saleSeriesName=app.getComp("saleSeriesName");
    //      var refer = $("#refContainerradSeriesId").data("uui.refer");
    //      var refValues = refer.values;
    //      if(refValues[0].productSaleSeriesName !=null){
    //         saleSeriesName.setValue(refValues[0].productSaleSeriesName);
    //      }
    //  }
    // });
    // //物料组
    //   viewModel.finishedProductSuiteList.on("materialGroupId.valuechange", function(obj) {
    //    if(obj.oldValue!=undefined && obj.newValue != obj.oldValue){
    //        var refValues = $("#refContainermaterialGroupId").data("uui.refer").values;
    //        $("#materialGroupId").css({visibility:"hidden"});
    //        $("#materialGroupIdshow").text(refValues[0].treePathNamePret).css({visibility:"visible"});
    //    }
    //   });
    // $("#materialGroupIdshow").click(function(){
    //   $("#materialGroupId").css({visibility:"visible"}).focus();
    //   $("#materialGroupIdshow").css({visibility:"hidden"});
    //   $("#materialGroupId").off("blur").on("blur",function(){
    //     $("#materialGroupId").css({visibility:"hidden"}).next("span").removeClass("refpic");;
    //     $("#materialGroupIdshow").css({visibility:"visible"});
    //     $("#refContainermaterialGroupId").closest("body").find(".ref_ac_results").css("display","none");//焦点移开隐藏模糊搜索
    //   })
    // });
    viewModel.pictureCategoryRef.createEmptyRow();
    //判断上传选择图片分类
    viewModel.pictureCategoryRef.on("pictureCategory.valuechange", function(obj) {
      viewModel.pictureCategory = obj.newValue;
      var refValues = $("#refContainerpictureCategory").data("uui.refer").values;
      viewModel.pictureCategoryName = refValues[0].refname;
    });
    viewModel.ProductAttributeValueList.on("productAttributeValueId.valuechange", function(obj) {
      var row = obj.rowObj;
      var value = obj.newValue;
      var productAttributeValueArray = row.getValue("productAttributeValueArray");
      var name = common.dataconvert.valueToName(value, productAttributeValueArray);
      row.setValue("productAttributeValueName", name);
    });
    //
    $._ajax({
      type: "get",
      url: appCtx + "/cust-doc-defs/cust_doc_code",
      data: {
        cust_doc_code: "QY006"
      },
      success: function(data) {
        var newarray = common.dataconvert.toMap(data, "name", "code");
        viewModel.productionModeSrc(newarray);
      }
    });
    $._ajax({
      type: "get",
      url: appCtx + "/cust-doc-defs/cust_doc_code",
      data: {
        cust_doc_code: "QY010"
      },
      success: function(data) {
        var newarray = common.dataconvert.toMap(data, "name", "code");
        viewModel.croMaStateSrc(newarray);
      }
    });


    $._ajax({
      type: "get",
      url: appCtx + "/cust-doc-defs/cust_doc_code",
      data: {
        cust_doc_code: "QY007"
      },
      success: function(data) {
        var newarray = common.dataconvert.toMap(data, "name", "code");
        viewModel.genericTypeSrc(newarray);
      }
    });
    $._ajax({
      type: "get",
      url: appCtx + "/cust-doc-defs/cust_doc_code",
      data: {
        cust_doc_code: "QY011"
      },
      success: function(data) {
        var newarray = common.dataconvert.toMap(data, "name", "id");
        viewModel.labelStandardSrc(newarray);
      }
    });
    $._ajax({
      type: "get",
      url: appCtx + "/cust-doc-defs/cust_doc_code",
      data: {
        cust_doc_code: "QY003"
      },
      success: function(data) {
        var newarray = common.dataconvert.toMap(data, "name", "code");
        viewModel.proStateSrc(newarray);
      }
    });
    // 选择上传文件后，直接调用上传方法
    $("#fileiptwrap").on("change", "#uploadbatch_id", function() {
      if (this.value) {
        viewModel.onFileUpload();
      }
    });
  }

  function init(element, params) {
    appInit(element, params);
    afterRender();
    window.vm = viewModel;
    $(".product-choose-result").hide();
    $(".product-choose").each(function(index) {
      var _this = $(this);
      _this.click(function() {
        if ($(this).hasClass("is-checked")) {
          $(".product-choose-result").eq(index).show();
        } else {
          $(".product-choose-result").eq(index).hide();
          $(".product-choose-result").eq(index).removeClass("open");
          $(".ui-collapse-content").eq(index + 1).attr("aria-hidden", "true").hide();
        }
      })

    })

  }

  return {
    init: init
  }
});
