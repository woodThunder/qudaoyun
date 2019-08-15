define(['text!./pricemaintain.html', 'ocm_common', 'ocm_baseview', './meta.js'], function(tpl, common, baseview, model) {
  'use strict'
  var viewModel;
  var view = baseview.extend({
    beforeCreate: function() {
      viewModel = this.viewModel;
    },
    tpl: tpl,
    model: model,
    baseData: {
      // 价目表维护
      baseurl: '/price/price-maintains',
      // 价目表维护详情
      detailurl: '/price/price-list-details',
      // 价目表定义
      priceurl: '/price/price-lists',
      priceMaintainList: new u.DataTable(model.options.metas.priceMaintainmeta),
      priceMaintainDetail: new u.DataTable(model.options.metas.priceMaintainDetailmeta),
      // 自定义价格项数量
      customPriceItemNum: 10,
      button1Source: model.options.buttons.button1,
      button2Source: model.options.buttons.button2,
      button3Source: model.options.buttons.button3,
      button4Source: model.options.buttons.button4,
      searchcomp: {},
      searchSource: model.options.searchs.search1,
      subsearchcomp: {},
      subsearchSource: model.options.searchs.search2,
      dialogcardcomp: {},
      dialogcardSource: model.options.dialogs.dialog1,
      detail11Source: model.options.details.detail1,
      gridOption: model.options.grids.grid1,
      defaultGridTpl: {
        domid: "grid_priceMaintainDetail",
        umeta: {
          id: "grid_priceMaintainDetail_edit",
          data: "priceMaintainDetail",
          type: "grid",
          editable: true,
          multiSelect: true,
          showNumCol: false,
        },
        columns: [],
      }
    },
    rendertype: {
      operation4single: common.rendertype.operation4single,
      //详情 
      detailRender: common.rendertype.detailRender,

      goBillPanel: common.bill.goBillPanel,
      //返回列表页
      retListPanel: common.bill.retListPanel,
      //跳转详情页
      goDetailPanel: common.bill.goDetailPanel,
    },
    events: {
      //弹出卡片编辑窗(通过index区分是编辑还是新增，-1为新增，大于等于0为编辑)
      beforeEdit: function(index, rowId) {
        var title;
        viewModel.index = index;
        var organizationId = "";
        if (index >= 0) {
          //修改操作
          title = "编辑";
          var currentData = viewModel.priceMaintainList.getRowByRowId(rowId).getSimpleData();
          organizationId = currentData.organizationId;
          viewModel.rowId = rowId;
          viewModel.dialogcardcomp.seteidtData(currentData);
        } else {
          title = "新增"
          //清空编辑框的信息
          viewModel.dialogcardcomp.cleareidt();
        }
        // 新增编辑时设置参照条件过滤
        viewModel.changeCondition("priceListId", {}, {
          "EQ_organization": organizationId
        })
        //显示模态框
        viewModel.dialogcardcomp.show(title, "500px", viewModel.edit);
      },
      //将操作后的数据进行保存
      edit: function() {
        var result = viewModel.dialogcardcomp.validate();
        if (result.passed) {
          var index = viewModel.index;
          var currentRow, type = "post";
          var postdata = viewModel.dialogcardcomp.geteidtData();
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
                currentRow = viewModel.priceMaintainList.getRowByRowId(viewModel.rowId);
                //将用户填写的数据更新到priceMaintainList上
              } else {
                //添加数据
                currentRow = viewModel.priceMaintainList.createEmptyRow();
              }
              currentRow.setSimpleData(data);
            }
          })

        }
      },
      //删除和批量删除
      del: function(data, rowId) {
        if (typeof(data) == 'number') {
          viewModel.priceMaintainList.setRowSelectbyRowId(rowId);
        }
        var ids = [];
        var rows = viewModel.priceMaintainList.getSelectedRows();
        if (rows && rows.length > 0) {
          for (var i = 0; i < rows.length; i++) {
            ids.push(rows[i].getValue("id"));
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
                  viewModel.priceMaintainList.removeRows(rows);
                }
              });
            }
          });
        } else {
          toastr.warning("请至少选择一项");
        }
      },
      //根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
      search: function(reindex) {
        if (reindex) {
          viewModel.priceMaintainList.pageIndex(0);
        }
        viewModel.priceMaintainList.removeAllRows();
        var queryData = viewModel.searchcomp.getDataWithOpr ? viewModel.searchcomp.getDataWithOpr() : {};
        queryData.size = viewModel.priceMaintainList.pageSize();
        queryData.page = viewModel.priceMaintainList.pageIndex();
        $._ajax({
          type: "get",
          url: appCtx + viewModel.baseurl,
          dataType: "json",
          data: queryData,
          success: function(data) {
            viewModel.priceMaintainList.setSimpleData(data.content, {
              unSelect: true
            });
            viewModel.priceMaintainList.totalRow(data.totalElements);
            viewModel.priceMaintainList.totalPages(data.totalPages);
          }
        })
      },
      //清空搜索条件
      cleanSearch: function() {
        viewModel.searchcomp.clearSearch();
      },
      //页码改变时的回调函数
      pageChange: function(index) {
        viewModel.priceMaintainList.pageIndex(index);
        viewModel.search();
      },
      //页码改变时的回调函数
      sizeChange: function(size) {
        viewModel.priceMaintainList.pageSize(size);
        viewModel.search(true);
      },
      //启用
      enable: function() {
        var selectedRows = viewModel.priceMaintainList.getSelectedRows();
        if (selectedRows && selectedRows.length > 0) {
          var ids = selectedRows.map(function(row, index, arr) {
            return row.getValue("id");
          })
          $._ajax({
            type: "post",
            url: appCtx + viewModel.baseurl + "/batch-enable",
            data: {
              ids: ids.join(",")
            },
            success: function(res) {
              for (var i = 0; i < selectedRows.length; i++) {
                selectedRows[i].setValue("isEnable", "1");
              }
            }
          })
        } else {
          toastr.warning("请至少选择一项");
        }
      },
      //停用
      disable: function() {
        var selectedRows = viewModel.priceMaintainList.getSelectedRows();
        if (selectedRows && selectedRows.length > 0) {
          var ids = selectedRows.map(function(row, index, arr) {
            return row.getValue("id");
          })
          $._ajax({
            type: "post",
            url: appCtx + viewModel.baseurl + "/batch-disable",
            data: {
              ids: ids.join(",")
            },
            success: function(res) {
              for (var i = 0; i < selectedRows.length; i++) {
                selectedRows[i].setValue("isEnable", "0");
              }
            }
          });
        } else {
          toastr.warning("请至少选择一项");
        }
      },
      changeCondition: function(domid, oldcondition, newcondition) {
        $("#" + domid).parent().attr("data-refparam", JSON.stringify(
          u.extend({},
            oldcondition,
            newcondition
          )
        ));
      },
      generateGrid: function(data, $ele, extraGridUmeta, isdetail) {
        function transOption(data) {
          var keyObj = {
            useBrand: {
              field: "brandId",
              title: "品牌",
              showField: "brandName"
            },
            useCustomer: {
              field: "customerId",
              title: "客户",
              showField: "customerName"
            },
            useCustomerCategory: {
              field: "customerCategoryId",
              title: "客户分类",
              showField: "customerCategoryName"
            },
            useGoods: {
              field: "goodsId",
              title: "商品",
              showField: "goodsName",
            },
            useGoodsCode: {
              field: "goodsCode",
              title: "商品编码",
              showField: "goodsCode",
            },
            useGoodsCategory: {
              field: "goodsCategoryId",
              title: "商品分类",
              showField: "goodsCategoryName"
            },
            useProduct: {
              field: "productId",
              title: "产品",
              showField: "productName"
            },
            useShop: {
              field: "shopId",
              title: "门店",
              showField: "shopName"
            }
          }
          var columns = [];
          if (isdetail) {
            for (var key in keyObj) {
              if (data[key] == 1 && key=="useGoods") {
                columns.push(u.extend({
                  "dataType": "String",
                }, {
                  field: keyObj[key].showField,
                  title: keyObj[key].title,
                }));
                columns.push(u.extend({
                  "dataType": "String",
                }, {
                  field: "goodsCode",
                  title: "商品编码"
                }));
              }else if(data[key] == 1){
                columns.push(u.extend({
                  "dataType": "String",
                }, {
                  field: keyObj[key].showField,
                  title: keyObj[key].title,
                }))
              }
            }
            columns.push({
              "dataType": "String",
              "field": "currencyName",
              "title": "币种",
            });
          } else {
            for (var key in keyObj) {
              if (data[key] == 1 && key=="useGoods") {
                columns.push(u.extend({
                  "dataType": "String",
                  "renderType": "ncReferRender",
                  "editType": "ncReferEditType",
                  "editOptions": {
                    "validType": "string",
                  }
                }, keyObj[key]));
                columns.push(u.extend({
                  "dataType": "String",
                  "renderType": "ncReferRender",
                  "editType": "ncReferEditType",
                  "editOptions": {
                    "validType": "string" ,
                  },
                  "editable": false
                }, keyObj["useGoodsCode"]))
              }else if(data[key] == 1){
                columns.push(u.extend({
                  "dataType": "String",
                  "renderType": "ncReferRender",
                  "editType": "ncReferEditType",
                  "editOptions": {
                    "validType": "string",
                  }
                }, keyObj[key]))
              }
            }
            columns.push(u.extend({
              "dataType": "String",
              "renderType": "ncReferRender",
              "editType": "ncReferEditType",
              "editOptions": {
                "validType": "string",
              }
            }, {
              field: "currencyId",
              title: "币种",
              showField: "currencyName",
              required: true
            }));
          }


          columns.push(u.extend({
            "dataType": "String",
            "editable": "false",
          }, {
            field: "adjustmentNum",
            title: "价目表调整单号",
            showField: "adjustmentNum"
          }));
          var priceListItems = data.priceListItems;
          var count = 1;
          viewModel.detailItems = {};
          for (var i = 0; i < priceListItems.length; i++) {
            if (priceListItems[i].isSelected == 1) {
              columns.push({
                "field": "detailItemPrice" + count,
                "dataType": "String",
                "title": priceListItems[i].priceItemName
              })
              viewModel.detailItems["detailItemId" + count] = priceListItems[i].id;
              viewModel.detailItems["detailItemName" + count] = priceListItems[i].priceItemName;
              count++;
            }
          }
          var umeta = u.extend({}, viewModel.defaultGridTpl.umeta, extraGridUmeta)
          return {
            domid: "",
            umeta: umeta,
            columns: columns
          };
        }

        function handleGridTpl(param) {
          function handleUmeta(meta) {
            return JSON.stringify(meta);
          }

          function handleColumns(columns) {
            if (u.isArray(columns)) {
              var optionArr = columns.map(function(item) {
                return '<div options=\'' + JSON.stringify(item) + '\'></div>'
              })
              return optionArr.join(" ");

            } else {
              throw new Error("columns must be Array");
            }
          }
          return '<div id=\'' + param.domid + '\' u-meta=\'' + handleUmeta(param.umeta) + '\'>' +
            handleColumns(param.columns) +
            '</div>'
        }
        var ele = $ele[0];
        var options = transOption(data);
        $ele.empty();
        ele.innerHTML = handleGridTpl(options);


        ko.cleanNode(ele);
        u.createApp({
          el: ele,
          model: viewModel
        });
      },
      cancelBill: function() {
        viewModel.retListPanel();
      },
      showMaintainPanel: function(from) {
        viewModel.priceMaintainDetail.removeAllRows();
        var selectedRows;
        if (from == "detail") {
          selectedRows = [viewModel.priceMaintainList.getCurrentRow()]
        } else {
          selectedRows = viewModel.priceMaintainList.getSelectedRows();
        }
        if (selectedRows && selectedRows.length == 1) {
          var row = selectedRows[0];
          var id = row.getValue("id");
          var priceListId = row.getValue("priceListId");
          $._ajax({
            type: "get",
            url: appCtx + viewModel.priceurl + "/" + priceListId,
            dataType: "json",
            success: function(data) {

              viewModel.generateGrid(data, $("#editgrid"));

              viewModel.goBillPanel();
              // 补充主表id
              if (viewModel.detailItems == undefined) viewModel.detailItems = {};

              viewModel.detailItems.priceMaintainId = id;
              // 搜索价目表详情
              viewModel.searchMaintainDetail(true);
            }
          })
        } else {
          if (selectedRows.length > 1) {
            toastr.warning("只能选择一个价目表");
          } else {
            toastr.warning("请先选择一个价目表");
          }
        }
      },
      //导入
      importHandle: function() {
        var urlInfo = '/pricemaintain-excel/excelDataImport'; //倒入地址参数
        var urlStatusInfo = '/pricemaintain-excel/excelLoadingStatus'; //请求进度地址参数
        var ele = $('#importFiel')[0]; //挂载元素
        common.fileHandle.importFile(urlInfo, urlStatusInfo, ele);
      },
        //导入
      importHandle_detail: function() {
        var listData = viewModel.priceMaintainDetail; //需要导出表格的dataTable
        var row = viewModel.priceMaintainList.getCurrentRow();
        var pointparam = "?Excel_sid="+row.getValue("id");
          var urlInfo = '/price-list-details-excel/excelDataImport'+pointparam;; //倒入地址参数
          var urlStatusInfo = '/price-list-details-excel/excelLoadingStatus'; //请求进度地址参数
          var ele = $('#importFiel')[0]; //挂载元素
          common.fileHandle.importFile(urlInfo, urlStatusInfo, ele, null, function() {
            viewModel.searchMaintainDetail(true);
          });
          
        },
      //导出
      exportHandle: function() {
        var searchParams = viewModel.searchcomp.getDataWithOpr(); //搜索查询参数
        var templateUrl = '/pricemaintain-excel/downloadExcelTemplate'; //导出模板地址参数
        var excelDataUrl = '/pricemaintain-excel/excelDataExport'; //导出数据地址参数
        var listData = viewModel.priceMaintainList; //需要导出表格的dataTable
        var ele = $('#exportFiel')[0]; //挂载元素
        common.fileHandle.exportFile(listData, ele, searchParams, templateUrl, excelDataUrl);
      },
      exportHandle_detail: function() {
        var row = viewModel.priceMaintainList.getCurrentRow();
        var priceMaintainId = row.getValue("id");
        var pointparam = "?Excel_sid="+row.getValue("priceListId")+"&Excel_mainid="+priceMaintainId;
        var searchParams = viewModel.subsearchcomp.getDataWithOpr(); //搜索查询参数
        searchParams["search_EQ_priceMaintain.id"] = priceMaintainId;
        var listData = viewModel.priceMaintainDetail; //需要导出表格的dataTable
        var templateUrl = '/price-list-details-excel/downloadExcelTemplate'+pointparam; //导出模板地址参数
        var excelDataUrl = '/price-list-details-excel/excelDataExport'+pointparam; //导出数据地址参数
        var ele = $('#exportFiel')[0]; //挂载元素
        common.fileHandle.exportFile(listData, ele, searchParams, templateUrl, excelDataUrl);
      },
      //新增子表项
      addItem: function() {
        var myRow=viewModel.priceMaintainDetail.createEmptyRow();
        var row = viewModel.priceMaintainList.getCurrentRow();
        var currencyId=row.getValue("currencyId");
        var currencyCode=row.getValue("currencyCode");
        var currencyName=row.getValue("currencyName");
        myRow.setValue("currencyId",currencyId) ;
        myRow.setValue("currencyCode",currencyCode) ;
        myRow.setValue("currencyName",currencyName) ;
      },
      //删除子表项
      delItems: function() {
        var selectedRows = viewModel.priceMaintainDetail.getSelectedRows();
        viewModel.priceMaintainDetail.removeRows(selectedRows);
      },
      searchMaintainDetail: function(reindex) {
        if (reindex) {
          viewModel.priceMaintainDetail.pageIndex(0);
        }
        var queryData = {};
        queryData.size = viewModel.priceMaintainDetail.pageSize();
        queryData.page = viewModel.priceMaintainDetail.pageIndex();
        queryData["search_EQ_priceMaintain.id"] = viewModel.detailItems.priceMaintainId;
        var addition = viewModel.subsearchcomp.getDataWithOpr();
        u.extend(queryData, addition);
        $._ajax({
          type: "get",
          url: appCtx + viewModel.detailurl,
          dataType: "json",
          data: queryData,
          success: function(data) {
            if (data.content && data.content.length > 0) {
              // 后端查询出来的价格项有顺序问题，前端手动纠正 bug号：QDYBZCP-141
              data.content.map(function(item) {
                var temp = {},
                  i;
                for (i = 1; i <= viewModel.customPriceItemNum; i++) {
                  if (item["detailItemId" + i]) {
                    temp[item["detailItemId" + i]] = item["detailItemPrice" + i];
                  } else {
                    break;
                  }
                }
                var realCount = i - 1;
                for (i = 1; i <= realCount; i++) {
                  item["detailItemPrice" + i] = temp[viewModel.detailItems["detailItemId" + i]]
                }
              })
            }
            viewModel.priceMaintainDetail.setSimpleData(data.content, {
              unSelect: true
            });
            viewModel.priceMaintainDetail.totalRow(data.totalElements);
            viewModel.priceMaintainDetail.totalPages(data.totalPages);
          }
        })
      },
      detail: function() {
        //确保grid先将行设置为focus状态
        setTimeout(function() {
          var row = viewModel.priceMaintainList.getCurrentRow();
          var id = row.getValue("id");
          var priceListId = row.getValue("priceListId");
          $._ajax({
            type: "get",
            url: appCtx + viewModel.priceurl + "/" + priceListId,
            dataType: "json",
            success: function(data) {

              viewModel.generateGrid(data, $("#detailgrid"), {
                id: "grid_priceMaintainDetail_detail",
                data: "priceMaintainDetail",
                editable: false,
                multiSelect: false,
                showNumCol: true
              }, true);

              viewModel.goDetailPanel();
              // 补充主表id
              if (viewModel.detailItems == undefined) viewModel.detailItems = {};

              viewModel.detailItems.priceMaintainId = id;
              // 搜索价目表详情
              viewModel.subsearchcomp.clearSearch();
              viewModel.searchMaintainDetail(true);
            }
          })
        }, 0);
      },
      detail2bill: function() {
        var row = viewModel.priceMaintainList.getCurrentRow();
        viewModel.showMaintainPanel("detail");
      },
      //清空搜索条件
      subcleanSearch: function() {
        viewModel.subsearchcomp.clearSearch();
      },
      beforeSubPageChange: function(index) {
        var rows = viewModel.priceMaintainDetail.getChangedRows();
        if (rows && rows.length > 0) {
          common.dialog.confirmDialog({
            msg1: '当前页有修改，是否跳转？',
            msg2: '跳转后会丢失当前页未保存数据',
            width: '400px',
            type: 'error',
            onOk: function() {
              viewModel.subPageChange(index);
            },
          });
          return false
        }
        return true
      },
      //页码改变时的回调函数
      subPageChange: function(index) {
        viewModel.priceMaintainDetail.pageIndex(index);
        viewModel.searchMaintainDetail();
      },
      //页码改变时的回调函数
      subSizeChange: function(size) {
        viewModel.priceMaintainDetail.pageSize(size);
        viewModel.searchMaintainDetail(true);
      },

      saveMaintain: function() {
        var postdata = viewModel.priceMaintainDetail.getSimpleData();
        var changeData = [];
        var nochangeData = []
        if (postdata && postdata.length > 0) {
          for (var i = 0; i < postdata.length; i++) {
            if (postdata[i].persistStatus != "nrm") {
              u.extend(postdata[i], viewModel.detailItems);
              changeData.push(postdata[i]);
            } else {
              nochangeData.push(postdata[i]);
            }
          }
        }
        if (changeData.length == 0) {
          toastr.warning("没有需要保存的数据");
          return
        }
        $._ajax({
          url: appCtx + viewModel.detailurl + "/batch-save",
          type: "post",
          data: JSON.stringify(changeData),
          contentType: "application/json; charset=utf-8",
          dataType: "json",
          success: function(data) {
            viewModel.retListPanel();
           /* viewModel.priceMaintainDetail.removeAllRows();
            viewModel.priceMaintainDetail.addSimpleData(data, "nrm", {
              "unSelect": true
            });
            viewModel.priceMaintainDetail.addSimpleData(nochangeData, "nrm", {
              "unSelect": true
            });*/
            toastr.success();
          }
        })
      }
    },
    afterCreate: function() {
      viewModel.priceMaintainDetail.on("goodsId.valuechange", function(obj) {
        if (!obj.newValue) return;
        var str = obj.newValue;
        var vals = str.split(',');
        var refer = $("#refContainergoodsId").data("uui.refer");
        var valNames = refer.values;
        var curRow = viewModel.priceMaintainDetail.getRowByRowId(obj.rowId);
        curRow.setValue('goodsId', vals[0]);
        curRow.setValue('goodsCode', valNames[0].refcode);
        if (vals.length == 1) {
          return;
        }
        var row = viewModel.priceMaintainList.getCurrentRow();
        var currencyId=row.getValue("currencyId");
        var currencyName=row.getValue("currencyName");
     
        
        curRow.setValue('goodsName', '');
        curRow.setValue("currencyId", currencyId) ;
        curRow.setValue("currencyName",currencyName) ;
        for (var i = 1; i < vals.length; i++) {
          var newRow = viewModel.priceMaintainDetail.createEmptyRow();
          newRow.setValue('goodsId', vals[i]);
          newRow.setValue('goodsName', valNames[i].displayName);
          newRow.setValue('goodsCode', valNames[i].refcode);
          newRow.setValue("currencyId", currencyId) ;
          newRow.setValue("currencyName",currencyName) ;
        }
      });
      viewModel.dialogcardcomp.viewModel.params.on("organizationId.valuechange", function(obj) {
        var value = obj.newValue;
        viewModel.changeCondition("priceListId", {}, {
          "EQ_organization": value
        });
        viewModel.dialogcardcomp.viewModel.params.getCurrentRow().setValue("priceListId", null);

      })
    }
  });

  return view;
});