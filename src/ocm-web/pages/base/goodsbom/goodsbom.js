define(['text!./goodsbom.html', './meta.js', 'ocm_common', 'ocm_baseview',
  "/ocm-web/vendor/jquery.orgchart/js/html2canvas.min.js",
  "/ocm-web/vendor/jquery.orgchart/js/jspdf.min.js",
  "/ocm-web/vendor/jquery.orgchart/js/jquery.orgchart.js"
], function (tpl, model, common, baseview) {
  var viewModel;
  var view = baseview.extend({
    tpl: tpl,
    beforeCreate: function () {
      viewModel = this.viewModel;
    },
    model: model,
    baseData: {
      baseurl: '/base/goods-boms',
      posturl: '/base/person-posts',
      statusField: 'isEnable',
      excelurl: '/person-excel',
      baseColorClass: [
        "color0",
        "color1",
        "color2",
        "color3",
        "color4",
        "color5",
        "color6",
        "color7",
        "color8",
        "color9"
      ],

      dialogWidth: '900px',
      simpleList: new u.DataTable(model.options.metas.goodsbommeta),
      childList: new u.DataTable(model.options.metas.goodsbomchildmeta),
      button1Source: model.options.buttons.button1,
      button2Source: model.options.buttons.button2,
      button3Source: model.options.buttons.button3,
      button4Source: model.options.buttons.button4,
      //buttonMenu1Source: model.options.buttonmenus.buttonmenu1,
      searchcomp: {},
      searchSource: model.options.searchs.search1,
      dialogcardcomp: {},
      detail1Source: model.options.details.detail1,
      grid1Option: model.options.grids.grid1,
      grid2Option: model.options.grids.grid2,
      grid3Option: model.options.grids.grid3,
      goBillPanel: common.bill.goBillPanel,
      card1Source: model.options.cards.card1,
      card2Source: model.options.cards.card2,

      whetherSource: [{
        value: "1",
        name: "是"
      }, {
        value: "0",
        name: "否"
      }],
      enableFmt: ko.pureComputed(function () {
        var status = viewModel.simpleList.ref("isEnable")();
        var statusName
        if (status == 0) {
          statusName = "未启用"
        }
        if (status == 1) {
          statusName = "已启用"
        }
        if (status == 2) {
          statusName = "已停用"
        }
        return statusName;
      }),
      //是否离职
      ifDepartureFmt: ko.pureComputed(function () {
        var status = viewModel.simpleList.ref("ifDeparture")();
        var statusName
        if (status == 0) {
          statusName = "否"
        }
        if (status == 1) {
          statusName = "是"
        }
        return statusName;
      }),
      accountManager: ko.pureComputed(function () {
        var isAccountManager = viewModel.simpleList.ref("isAccountManager")();
        return isAccountManager == 1 ? "是" : "否";
      }),
      isEnablecomp: ko.pureComputed(function () {
        var status = viewModel.simpleList.ref("isEnable")();
        var statusName;
        if (status == 0) {
          statusName = "未启用";
        }
        if (status == 1) {
          statusName = "已启用";
        }
        if (status == 2) {
          statusName = "已停用";
        }
        return statusName;
      }),
      billPanelStatus: ko.observable(CONST.BILLPANELSTATUS.DEFAULT),
    },
    rendertype: u.extend(common.rendertype, {
      // beforeEditCheck: function (obj) {
      //   var row = obj.rowObj.value;
      //   var organizationId = row.organizationId;
      //   viewModel.childList.setMeta("postId", "refparam",
      //     '{"EQ_isEnable":"1","EQ_organization.id":"' + organizationId + '"}')
      //   viewModel.childList.setMeta("departmentId", "refparam",
      //     '{"EQ_isEnable":"1","EQ_organization.id":"' + organizationId + '"}')
      //   return true
      // },
      operation: function (obj) {
        var viewModel = obj.gridObj.viewModel;
        var dataTableRowId = obj.row.value["$_#_@_id"];
        var params = {
          id: obj.row.value.parentGoodsId
        }
        var hrefValue = "index-view.html?" + common.toUrlParam(params) + "#/goodsbomtree";
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
        var copyfun =
          "data-bind=click:beforeCopy.bind($data," +
          obj.rowIndex +
          "," +
          dataTableRowId +
          ")";
        var detailfun = "data-bind=click:showGoodsBom.bind($data," +
          obj.rowIndex +
          "," +
          dataTableRowId +
          ")";

        obj.element.innerHTML =
          "<div class=\"ui-handle-icon\">" +

          "<span  class=\"ui-handle-word\">" +
          "<a href=" + hrefValue + " value=\"goodsbomtree\" name=\"联查商品结构\" class=\"ui-a-detail goodsbomtreeclass\" " +
          detailfun +
          ">" +
          "联查商品结构" +
          "</a>" +
          "</span>    " +

          "<span class=\"ui-handle-word\">" +
          "<a href=\"#\" " +
          copyfun +
          " title=\"复制\">复制</a>" +
          "</span>    " +

          "<span class=\"ui-handle-word\">" +
          "<a href=\"#\" " +
          editfun +
          " title=\"编辑\">编辑</a>" +
          "</span>    " +
          "<span class=\"ui-handle-word\">" +
          "<a href=\"#\" " +
          delfun +
          " title=\"删除\">删除</a>" +
          "</span></div>";
        ko.cleanNode(obj.element);
        ko.applyBindings(viewModel, obj.element);
      },
    }),

    events: {
      showGoodsBom: function (index, rowId) {
        var recordId = viewModel.simpleList.getRowByRowId(rowId).getSimpleData().id
        if (!viewModel.fieldMappingDialog) {
          viewModel.fieldMappingDialog = u.dialog({
            id: 'dialog_goodsbom',
            content: "#dialog_goodsbom",
            hasCloseMenu: true,
            width: "98%"
          });
          viewModel.fieldMappingDialog.show();
        } else {
          viewModel.fieldMappingDialog.show();
        }

        $._ajax({
          type: "get",
          url: appCtx + viewModel.baseurl + "/goods-bom-by-parent-goods",
          dataType: "json",
          data: {
            parentGoodId: recordId
          },
          success: function (data) {
            if (!data || data.length < 1) {
              $("#goodsbom-title")[0].innerHTML = "该商品无商品结构";
              return;
            }

            // function loop(arr) {
            //   var arr1 = arr;
            //   //初始化设置首选color为color1
            //   var tempColor = 1;
            //   for (var i = arr.length - 1; i >= 0; i--) {
            //     for (var j = arr1.length - 1; j >= 0; j--) {
            //       //如果arr[i]是arr1的子节点
            //       if (arr[i].parentGoodsId == arr1[j].childGoodsId) {
            //         //如果该商品的父级没有子节点
            //         if (!arr1[j].children || arr1[j].children.length < 1) {
            //           arr1[j].children = [];
            //           arr1[i].className = viewModel.baseColorClass[tempColor] ?
            //             viewModel.baseColorClass[tempColor] : "defaultColor";
            //           tempColor++;
            //         } else {
            //           //如果该商品父级有子节点，则当前节点和父级的第一个子节点同颜色
            //           arr1[i].className = arr1[j].children[0].className;
            //         }
            //         arr1[j].children.push(arr1[i]);
            //         arr1.splice(i, 1);
            //         break;
            //       }
            //     }
            //   }
            //   return arr1;
            // }
            var tempColorIndex = 0
            function loop(data, arr) {
              tempColorIndex++
              for (var i = 0; i < data.length; i++) {
                for (var j = 0; j < arr.length; j++) {
                  if (arr[j].parentGoodsId == data[i].id) {
                    // var node = {
                    //   type: "organization-func",
                    //   id: arr[j].organizationId,
                    //   code: arr[j].organizationCode,
                    //   name: arr[j].organizationName,
                    //   children: [],
                    //   className: viewModel.baseColorClass[tempColorIndex] ? viewModel.baseColorClass[tempColorIndex] : "defaultColor"
                    // }
                    arr[j].className = viewModel.baseColorClass[tempColorIndex] ? viewModel.baseColorClass[tempColorIndex] : "defaultColor"
                    if (data[i].children == undefined || data[i].children.length == 0) {
                      data[i].children = [];
                    }
                    data[i].children.push(arr[j])
                  }
                }
                if (data[i].children) {
                  loop(data[i].children, arr);
                }
              }
            }

            var datascource = {};
            datascource.type = "goodsbom";
            datascource.id = data[0].parentGoodsId;
            datascource.code = data[0].parentGoodsCode;
            datascource.name = data[0].parentGoodsName;
            datascource.qty = 1;
            datascource.model = data[0].parentGoodsModel;
            datascource.specification = data[0].parentGoodsSpecification;
            datascource.unit = data[0].parentGoodsUnitName;
            datascource.className = "color0";
            var goodsBomChildren = data[0].goodsBomChildren;
            var arr = [];
            for (var i = 0; i < goodsBomChildren.length; i++) {
              var qty = qty = goodsBomChildren[i].childGoodsQty;
              //计算数量时，要与其父节点数量相乘。parentId等于最外层id虽然查不到（不存在arr中），但最外层数量为1，故不需要额外逻辑。
              for (var j = 0; j < arr.length; j++) {
                if (goodsBomChildren[i].parentGoodsId == arr[j].id) {
                  qty *= arr[j].qty;
                }
              }
              arr.push({
                "type": "goodsbom",
                "qty": qty,
                "id": goodsBomChildren[i].childGoodsId,
                "code": goodsBomChildren[i].childGoodsCode,
                "name": goodsBomChildren[i].childGoodsName,
                "parentGoodsId": goodsBomChildren[i].parentGoodsId,
                "model": goodsBomChildren[i].parentGoodsModel,
                "specification": goodsBomChildren[i].childGoodsSpecification,
                "unit": goodsBomChildren[i].childGoodsUnitName
                // "childGoodsId": goodsBomChildren[i].childGoodsId
              });
            }
            var result = [];
            if (arr) {
              result.push(datascource)
              loop(result, arr);
            }

            $("#goodsbom-title")[0].innerHTML = datascource.name + "商品结构";
            //先清空，不然会出现多个图
            $("#chart-container")[0].innerHTML = ""
            $("#chart-container").orgchart({
              "data": result[0],
              'direction': 'l2r',
              "nodeContent": "title",
              'exportButton': true,
            });
          }
        });
      },
      //跳转单据详情页
      goDetailPanel: function (index, rowId) {
        // $(".ui-list-panel").hide();
        $(".ui-panel").hide();
        $(".ui-bill-detail").show();
        $(".ui-bill-detail").animateCss("fadeIn");
        var currentData = viewModel.simpleList.getFocusRow().getSimpleData();
        viewModel.childList.setSimpleData(currentData.goodsBomChildren);
        // $._ajax({
        //   url: appCtx + viewModel.posturl + '/findByPersonId',
        //   type: "get",
        //   data: { personId: currentData.id },
        //   contentType: "application/json; charset=utf-8",
        //   success: function (data) {
        //     viewModel.childList.setSimpleData(data);
        //   }
        // })

      },
      //返回列表页
      retListPanel: common.bill.retListPanel,
      //点击取消 单据页
      cancelHandle: function () {
        viewModel.search();
        viewModel.retListPanel();
      },
      backPanel: function () {
        common.dialog.confirmDialog({
          msg1: "确认返回列表页？",
          msg2: "此操作不可逆",
          width: "400px",
          type: "error",
          onOk: function () {
            $("#code-text").empty();
            viewModel.search();
            viewModel.retListPanel();
          }
        });
      },

      //子表增行
      addRow: function (dataTable) {
        viewModel[dataTable].createEmptyRow();
        viewModel.currentFlag = 0;
      },
      //子表 删除和批量删除
      delChild: function (dataTable) {
        var rows = viewModel[dataTable].getSelectedRows();
        viewModel[dataTable].removeRows(rows);
      },
      //复制
      beforeCopy: function (index, rowId) {
        viewModel.goBillPanel();
        $("#personBase").show();
        $("#personBase_show").hide();
        //设置tab显示基本信息
        $(".ui-bill-panel .u-tabs__tab").eq(0).addClass("is-active").siblings(".u-tabs__tab").removeClass("is-active");
        $(".ui-bill-panel .u-tabs__panel").eq(0).addClass("is-active").siblings(".u-tabs__panel").removeClass("is-active");
        viewModel.index = index;
        var row = viewModel.simpleList.createEmptyRow();
        //修改操作
        var currentData = viewModel.simpleList.getRowByRowId(rowId).getSimpleData();
        currentData.persistStatus = "new";
        currentData.isEnable = 0;
        viewModel.rowId = rowId;
        delete currentData.id;
        viewModel.billPanelStatus(CONST.BILLPANELSTATUS.COPY)
        // row.setSimpleData(currentData);
        this.simpleList.setSimpleData(currentData)
        var goodsBomChildren = currentData.goodsBomChildren;
        goodsBomChildren.forEach(function (item, index, array) {
          item.persistStatus = "new";
        })
        viewModel.childList.setSimpleData(goodsBomChildren);
      },
      //弹出卡片编辑窗(通过index区分是编辑还是新增，-1为新增，大于等于0为编辑)
      beforeEdit: function (index, rowId) {
        if (u.isNumber(index) && viewModel.simpleList.getRowByRowId(rowId).getSimpleData().isEnable == 1) {
          toastr.warning("不可编辑已启用的商品结构，请先停用。");
          return;
        }
        viewModel.goBillPanel();
        $("#personBase").show();
        $("#personBase_show").hide();
        //设置tab显示基本信息
        $(".ui-bill-panel .u-tabs__tab").eq(0).addClass("is-active").siblings(".u-tabs__tab").removeClass("is-active");
        $(".ui-bill-panel .u-tabs__panel").eq(0).addClass("is-active").siblings(".u-tabs__panel").removeClass("is-active");
        var title;
        viewModel.index = index;
        var row = viewModel.simpleList.createEmptyRow();
        if (u.isNumber(index)) {
          //修改操作
          title = "编辑";
          var currentData = viewModel.simpleList.getRowByRowId(rowId).getSimpleData();

          var refparam = {
              EQ_isEnable: 1,
              EQ_isSparePart: currentData.bomTypeCode == "02" ? 1 : 0
          };
          viewModel.childList.meta.childGoodsId.refparam = JSON.stringify(refparam);

          viewModel.rowId = rowId;
          viewModel.personId = currentData.id
          viewModel.billPanelStatus(CONST.BILLPANELSTATUS.EDIT)
          viewModel.childList.setSimpleData(currentData.goodsBomChildren);
        } else {
          title = "新增"
          viewModel.billPanelStatus(CONST.BILLPANELSTATUS.ADD)
          // viewModel.simpleList.setSimpleData([])
          viewModel.simpleList.setRowFocus(row);
          viewModel.childList.setSimpleData([]);
        }
      },
      validate: function (element) {
        var result = viewModel.app.compsValidateMultiParam({
          element: element,
          showMsg: true
        });
        return result;
      },
      //将人员信息保存
      saveHandle: function () {
        var baseInfo = $("#baseInfo")[0];
        var basechildInfo = $("#basechildInfo")[0];
        var basePass = viewModel.validate(baseInfo);
        var basechildPass = viewModel.validate(basechildInfo);
        if (!basePass.passed || !basechildPass.passed) {
          return;
        }
        var index = viewModel.index;
        var currentRow, type = "post";
        var simpleData = viewModel.simpleList.getFocusRow().getSimpleData();
        //复制时，删除id
        if (viewModel.billPanelStatus() == CONST.BILLPANELSTATUS.COPY) {
          delete simpleData.id
        }
        simpleData.bomCode = simpleData.parentGoodsId + "_" + simpleData.parentGoodsVersion;
        var childData = viewModel.childList.getSimpleData();

        for (var i = 0; i < childData.length - 1; i++) {
          for (var j = i + 1; j < childData.length; j++) {
            if (childData[i].childGoodsId == childData[j].childGoodsId && childData[i].persistStatus != "fdel" && childData[j].persistStatus != "fdel") {
              toastr.warning("不能添加相同的子项");
              return;
            }
          }
        }
        if (childData.length == 0) {
          toastr.warning("至少添加一条子项");
          return;
        }
        for (var i = 0; i < childData.length; i++) {
          childData[i].parentGoodsId = simpleData.parentGoodsId;
        }
        simpleData.goodsBomChildren = childData;
        if (viewModel.billPanelStatus() == CONST.BILLPANELSTATUS.EDIT) {
          type = "put";
        }

        //更改后台数据
        $._ajax({
          url: appCtx + viewModel.baseurl,
          type: type,
          data: JSON.stringify(simpleData),
          contentType: "application/json; charset=utf-8",
          success: function (data) {
            //如果index大于等于0说明是修改
            viewModel.search();
            viewModel.retListPanel();
          }
        })
      },

      //删除和批量删除
      del: function (data, rowId) {
        if (typeof (data) == 'number') {
          viewModel.simpleList.setRowSelectbyRowId(rowId);
        }
        var ids = [];
        var rows = viewModel.simpleList.getSelectedRows();
        var removeRow = new Array();
        if (rows && rows.length > 0) {
          for (var i = 0; i < rows.length; i++) {
            var isEnable=rows[i].getValue("isEnable");
            if(isEnable=="0"){
              removeRow.push(rows[i]);  
              ids.push(rows[i].getValue("id"));
            } 
            
            if(isEnable!="0"){
              toastr.warning("启用和停用数据不能删除");
              return;
            }
          }
          common.dialog.confirmDialog({
            msg1: '确认删除这些项？',
            msg2: '此操作不可逆',
            width: '400px',
            type: 'error',
            onOk: function () {
              $._ajax({
                url: appCtx + viewModel.baseurl + "/delete",
                type: "post",
                // data: "ids=" + ids.join(","),
                data: {
                  ids: ids.join(",")
                },
                success: function (data) {
                  viewModel.simpleList.removeRows(removeRow);
                }
              });
            }
          });
        } else {
          toastr.warning("请至少选择一项");
        }
      },
      //子表 删除和批量删除
      delChild: function () {
        var rows = viewModel.childList.getSelectedRows();
        viewModel.childList.removeRows(rows);
      },

      //根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
      search: function (reindex) {
        if (reindex) {
          viewModel.simpleList.pageIndex(0);
        }
        viewModel.simpleList.removeAllRows();
        var queryData = viewModel.searchcomp.getDataWithOpr ? viewModel.searchcomp.getDataWithOpr() : {};
        // if (queryData["search_EQ_goodsBomChildren.childGoodsId"] != undefined && queryData["search_EQ_parentGoodsId"] != undefined) {
        //   toastr.warning("父项和子项互斥，只能使用其中之一的条件");
        //   return;
        // }
        queryData.size = viewModel.simpleList.pageSize();
        queryData.page = viewModel.simpleList.pageIndex();
        // queryData['search_NULL_ownerCustomer'] = "~";
        $._ajax({
          type: "get",
          url: appCtx + viewModel.baseurl,
          dataType: "json",
          data: queryData,
          success: function (data) {
            viewModel.simpleList.setSimpleData(data.content, {
              unSelect: true
            });
            viewModel.simpleList.totalRow(data.totalElements);
            viewModel.simpleList.totalPages(data.totalPages);
          }
        })
      },
      //清空搜索条件
      cleanSearch: function () {
        viewModel.searchcomp.clearSearch();
        viewModel.searchcomp.viewModel.params.setMeta("parentGoodsId", 'enable', true)
        viewModel.searchcomp.viewModel.params.setMeta("goodsBomChildren--childGoodsId", 'enable', true)
      },
      //页码改变时的回调函数
      pageChange: function (index) {
        viewModel.simpleList.pageIndex(index);
        viewModel.search();
      },
      //页码改变时的回调函数
      sizeChange: function (size) {
        viewModel.simpleList.pageSize(size);
        viewModel.search(true);
      },
      //启用
      enable: function () {
        var selectedRows = viewModel.simpleList.getSelectedRows();
        if (selectedRows && selectedRows.length > 0) {
          var ids = selectedRows.map(function (row, index, arr) {
            return row.getValue("id");
          })
          $._ajax({
            type: "post",
            url: appCtx + viewModel.baseurl + "/batch-enable",
            data: {
              ids: ids.join(",")
            },
            success: function (res) {
              for (var i = 0; i < selectedRows.length; i++) {
                viewModel.statusField ?
                  selectedRows[i].setValue(viewModel.statusField, "1") :
                  selectedRows[i].setValue("isEnable", "1");
              }
            }
          })
        } else {
          toastr.warning("请至少选择一项");
        }
      },
      //停用
      disable: function () {
        var selectedRows = viewModel.simpleList.getSelectedRows();
        if (selectedRows && selectedRows.length > 0) {
          var ids = selectedRows.map(function (row, index, arr) {
            return row.getValue("id");
          })
          $._ajax({
            type: "post",
            url: appCtx + viewModel.baseurl + "/batch-disable",
            data: {
              ids: ids.join(",")
            },
            success: function (res) {
              for (var i = 0; i < selectedRows.length; i++) {
                viewModel.statusField ?
                  selectedRows[i].setValue(viewModel.statusField, "2") :
                  selectedRows[i].setValue("isEnable", "2");
              }
            }
          });
        } else {
          toastr.warning("请至少选择一项");
        }
      },
      detail: function () {
        //确保grid先将行设置为focus状态
        setTimeout(function () {
          viewModel.goDetailPanel();
        }, 0);
      },
    },
    afterCreate: function () {
      // 初始化折叠面板
      $.fn.collapsepanel(false, true);


      //搜索条件中的部门参照销售组织过滤
      viewModel.searchcomp.viewModel.params.on("parentGoodsId.valuechange", function (obj) {
        if (obj.newValue != undefined && obj.newValue != "") {
          viewModel.searchcomp.viewModel.params.setMeta("goodsBomChildren--childGoodsId", 'enable', false)
        } else {
          viewModel.searchcomp.viewModel.params.setMeta("goodsBomChildren--childGoodsId", 'enable', true)
        }
      })

      //搜索条件中的部门参照销售组织过滤
      viewModel.searchcomp.viewModel.params.on("goodsBomChildren--childGoodsId.valuechange", function (obj) {
        if (obj.newValue != undefined && obj.newValue != "") {
          viewModel.searchcomp.viewModel.params.setMeta("parentGoodsId", 'enable', false)
        } else {
          viewModel.searchcomp.viewModel.params.setMeta("parentGoodsId", 'enable', true)
        }
      })

      viewModel.simpleList.on("bomTypeCode.valuechange", function (obj) {
        if(obj.newValue) {
          var params = {
              EQ_isEnable: 1,
              EQ_isSparePart: obj.newValue == "02" ? 1 : 0
          }
          viewModel.childList.meta.childGoodsId.refparam = JSON.stringify(params);
          viewModel.childList.removeAllRows();
        }
      })
    }
  });

  return view;
});
