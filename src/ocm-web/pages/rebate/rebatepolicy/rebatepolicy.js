define([
  "text!./rebatepolicy.html",
  "ocm_common",
  "ocm_baseview",
  "./meta.js",
  "../../flow/bpmapproveref/bpmopenbill.js"
], function (tpl, common, baseview, model, bpmopenbill) {
  "use strict";
  var viewModel, app;
  var appCtx = window.pathMap.rebate;
  var view = baseview.extend({
    beforeCreate: function () {
      viewModel = this.viewModel;
      app = this.app;
      viewModel = u.extend(viewModel, bpmopenbill.model);
    },
    tpl: tpl,
    model: model,
    baseData: {
      baseurl: "/rebate/policys",
      applicationUrl: "/rebate/policys",
      customerScopetUrl: "/rebate/customer-scopes",
      basisUrl: "/rebate/basiss",
      valueUrl: "/rebate/values",
      calculationUrl: "/rebate/calculation-rules",

      SalePolicyList: new u.DataTable(model.options.metas.SalePolicyMeta),
      SalePolicyCard: new u.DataTable(model.options.metas.SalePolicyMeta),
      SalePolicyDetail: new u.DataTable(model.options.metas.SalePolicyMeta),
      CustomerScopeList: new u.DataTable(model.options.metas.CustomerScopeMeta),
      BasisCard: new u.DataTable(model.options.metas.BasisMeta),
      BasisList: new u.DataTable(model.options.metas.BasisMeta),
      BasisConditionDetailList: new u.DataTable(model.options.metas.BasisConditionDetailMeta),
      BasisConditionDetailCard: new u.DataTable(model.options.metas.BasisConditionDetailMeta),
      ValueCard: new u.DataTable(model.options.metas.ValueMeta),
      ValueConditionDetailList: new u.DataTable(model.options.metas.ValueConditionDetailMeta),
      ValueConditionDetailCard: new u.DataTable(model.options.metas.ValueConditionDetailMeta),
      CalculationRuleList: new u.DataTable(model.options.metas.CalculationRuleMeta),
      CalculationRuleitemList: new u.DataTable(model.options.metas.CalculationRuleitemMeta),

      conditionFields: ["trantypeId", "promActivityId", "goodsRangeId", "projectId", "isGift", "goodsSupplement"],

      CustomerScopeFields: ["customerCategoryId", "customerId", "marketAreaId"],

      // 维度
      dimensionNameSource: ko.observableArray([]),
      // 维度值
      dimensionValueSource: ko.observableArray([]),

      // 计算规则 累进方式
      progressiveWaySource: ko.observableArray([{
        value: "0",
        name: "全额累进"
      }, {
        value: "1",
        name: "超额累进"
      }]),
      // 计算规则 定价项指标
      pricingIndexItemSource: ko.observableArray(CONST.REBATE_PRICING),
      // 返利依据类型
      rebateBasisTypeSource: ko.observableArray(CONST.REBATEBASISTYPE),
      // 返利值类型
      rebateValueTypeSource: ko.observableArray(CONST.REBATEVALUETYPE),
      // 比较符
      comparisonSource: ko.observableArray([{
        value: "EQ",
        name: "等于"
      }, {
        value: "NOTEQ",
        name: "不等于"
      }]),

      whetherSrc: CONST.WHETHER,

      enableFormat: common.format.enableFormat,

      searchcomp: {},
      searchSource: model.options.searchs.search1,

      button1Source: model.options.buttons.button1,
      button2Source: model.options.buttons.button2,
      button3Source: model.options.buttons.button3,
      button4Source: model.options.buttons.button4,
      button5Source: model.options.buttons.button5,
      button6Source: model.options.buttons.button6,
      button7Source: model.options.buttons.button7,
      button8Source: model.options.buttons.button8,

      card1Source: model.options.cards.card1,
      card2Source: model.options.cards.card2,
      card3Source: model.options.cards.card3,
      detail1Source: model.options.details.detail1,
      detail2Source: model.options.details.detail2,
      detail3Source: model.options.details.detail3,

      grid1Option: model.options.grids.grid1,
      grid2Option: model.options.grids.grid2,
      grid3Option: model.options.grids.grid3,
      grid4Option: model.options.grids.grid4,
      grid5Option: model.options.grids.grid5,
      grid6Option: model.options.grids.grid6,
      grid7Option: model.options.grids.grid7,
      grid8Option: model.options.grids.grid8,
      //跳转单据页
      goBillPanel: common.bill.goBillPanel,
      //跳转单据详情页
      goDetailPanel: common.bill.goDetailPanel,
      billPanelStatus: ko.observable(CONST.BILLPANELSTATUS.DEFAULT),
      //返回列表页
      retListPanel: common.bill.retListPanel,
      // 方便判断编辑、新增
      basisIndex: -1,
    },
    rendertype: {
      // 类型方式
      progressiveWayRender: function (obj) {
        var showValue = obj.value == "1" ? "超额累计" : "全额累进";
        obj.element.innerHTML = showValue;
      },
      rebateBasisTypeRender: function (obj) {
        var value = obj.value;
        var basisTypes = CONST.REBATEBASISTYPE || [];
        var findType = basisTypes.find(function (type) {
          return type.value == value;
        })
        obj.element.innerHTML = findType ? (findType.name || "") : "";
      },
      // 返利依据类型
      rebateBasisTypeComputed: ko.pureComputed(function () {
        var value = viewModel.BasisCard.ref("rebateBasisType")();
        var basisTypes = CONST.REBATEBASISTYPE || [];
        var findType = basisTypes.find(function (type) {
          return type.value == value;
        })
        return findType ? (findType.name || "") : "";
      }),
      accountTargetComputed: ko.pureComputed(function () {
        var stateValue = viewModel.BasisCard.ref("accountTarget")();
        var stateName = "";

        if (stateValue == "1") {
          stateName = "是";
        } else if (stateValue == "0") {
          stateName = "否";
        }
        return stateName;
      }),
       // 是否包含子客户
       includeSecCustomerBasisComputed: ko.pureComputed(function () {
        var dataValue = viewModel.BasisCard.ref("includeSecCustomer")();
        var showName;
        dataValue == 1 ? (showName = "是") : (showName = "否");
        return showName;
      }),
      // 是否包含下级客户
      includeLowCustomerBasisComputed: ko.pureComputed(function (obj) {
        var dataValue = viewModel.BasisCard.ref("includeLowCustomer")();
        var showName;
        dataValue == 1 ? (showName = "是") : (showName = "否");
        return showName;
      }),
      // 返利值类型
      rebateValueTypeComputed: ko.pureComputed(function () {
        var value = viewModel.ValueCard.ref("rebateValueType")();
        var basisTypes = CONST.REBATEVALUETYPE || [];
        var findType = basisTypes.find(function (type) {
          return type.value == value;
        })
        return findType ? (findType.name || "") : "";
      }),
      // 是否包含子客户
      includeSecCustomerComputed: ko.pureComputed(function () {
        var dataValue = viewModel.ValueCard.ref("includeSecCustomer")();
        var showName;
        dataValue == 1 ? (showName = "是") : (showName = "否");
        return showName;
      }),
      // 是否包含下级客户
      includeLowCustomerComputed: ko.pureComputed(function () {
        var dataValue = viewModel.ValueCard.ref("includeLowCustomer")();
        var showName;
        dataValue == 1 ? (showName = "是") : (showName = "否");
        return showName;
      }),

      //跳转详情页
      operation4single: common.rendertype.operation4single,
      detailRender: common.rendertype.detailRender,
      operationStr: function (obj, funcName, title) {
        var dataTableRowId = obj.row.value['$_#_@_id'];
        var array = [];
        var bindArray = [];

        bindArray.push("data-bind=click:");
        bindArray.push(funcName);
        bindArray.push(".bind($data,");
        bindArray.push(obj.rowIndex);
        bindArray.push(',');
        bindArray.push(dataTableRowId);
        bindArray.push(')');

        array.push('<div class="ui-handle-icon"><span class="ui-handle-word"><a href="#" ');
        array.push(bindArray.join(''));
        array.push(' title="');
        array.push(title);
        array.push('">');
        array.push(title);
        array.push('</a></span><span class="ui-handle-word">');
        return array.join('');
      },
      operation: function (obj) {
        var str = '';
        var billState = obj.row.value.state;
        if (billState == '0') {
          // 可编辑,可提交,可删除
          str = viewModel.operationStr(obj, 'showEditBillPanel', '编辑').concat(viewModel.operationStr(obj, 'submit', '提交')).concat(viewModel.operationStr(obj, 'del', '删除'));
        } else if (billState == '1') {
          // 已提交，尚未审批 . 可收回,可审批
          str = viewModel.operationStr(obj, 'unsubmit', '收回') + viewModel.operationStr(obj, 'approve', '审批');
        } else if (billState == '3') {
          str = viewModel.operationStr(obj, 'cancelApprove', '取消审批');
        }
        obj.element.innerHTML = str;
        ko.cleanNode(obj.element);
        ko.applyBindings(viewModel, obj.element);
      },
      // 返利依据列表操作
      basisOperation: function (obj) {
        var str = viewModel.operationStr(obj, 'showEditBasisDialog', '编辑').concat(viewModel.operationStr(obj, 'del_basis', '删除'));
        obj.element.innerHTML = str;
        ko.cleanNode(obj.element);
        ko.applyBindings(viewModel, obj.element);
      },
      // 返利依据查看明细
      basisDetailRender: function (obj) {
        var str = viewModel.operationStr(obj, 'showDetailBasisDialog', obj.value);
        obj.element.innerHTML = str;
        ko.cleanNode(obj.element);
        ko.applyBindings(viewModel, obj.element);
      },

      //状态
      isStateGrid: function (obj) {
        var stateValue = viewModel.SalePolicyList.getRow(obj.rowIndex).getValue("state");
        var stateName = "";
        if (stateValue == 0) {
          (stateName = "待处理")
        }
        if (stateValue == 1) {
          (stateName = "已提交")
        }
        if (stateValue == 2) {
          (stateName = "审批中")
        }
        if (stateValue == 3) {
          (stateName = "审批通过")
        }
        if (stateValue == 4) {
          (stateName = "审批不通过")
        }
        obj.element.innerHTML = stateName;
      },

      // 是否
      yesOrNoRender: function (obj) {
        var showValue = obj.value == "1" ? "是" : "否";
        obj.element.innerHTML = showValue;
      },

      // 是否 累计指标
      isAccountTarget: function (obj) {
        var accountTarget = viewModel.BasisList.getRow(obj.rowIndex).getValue(
          "accountTarget"
        );
        var name;
        accountTarget == 1 ? (name = "累计") : (name = "不累计");
        obj.element.innerHTML = name;
      },
    },
    events: {
      isState: ko.pureComputed(function () {
        var stateValue = viewModel.SalePolicyList.ref("state")();
        var stateName;

        if (stateValue == 0) {
          (stateName = "待处理")
        }
        if (stateValue == 1) {
          (stateName = "已提交")
        }
        if (stateValue == 2) {
          (stateName = "审批中")
        }
        if (stateValue == 3) {
          (stateName = "审批通过")
        }
        if (stateValue == 4) {
          (stateName = "审批不通过")
        }
        return stateName;
      }),
      // 维度
      dimensionNameCompute: ko.pureComputed(function () {
        var value = viewModel.SalePolicyDetail.ref("dimensionName")();
        var basisTypes = viewModel.dimensionNameSource();
        var findType = basisTypes.find(function (type) {
          return type.value == value;
        })
        return findType ? (findType.name || "") : "";
      }),
      // 维度值
      dimensionValueCompute: ko.pureComputed(function () {
        var value = viewModel.SalePolicyDetail.ref("dimensionValue")();
        var basisTypes = viewModel.dimensionValueSource();
        var findType = basisTypes.find(function (type) {
          return type.value == value;
        })
        return findType ? (findType.name || "") : "";
      }),

      whetherComputed: function (row) {
        var rangeValues = row.ref("rangeValues")();
        var name = "";

        if (rangeValues == "1") {
          name = "是";
        } else if (rangeValues == "0") {
          name = "否";
        }
        return name;
      },

      // 计算规则详情
      isFinanceOrgComputed: ko.pureComputed(function () {
        var isFinanceOrg = viewModel.CalculationRuleList.ref("isFinanceOrg")();
        var stateName = "";

        if (isFinanceOrg == "1") {
          stateName = "是";
        } else {
          stateName = "否";
        }
        return stateName;
      }),
      progressiveWayComputed: ko.pureComputed(function () {
        var progressiveWay = viewModel.CalculationRuleList.ref("progressiveWay")();
        return progressiveWay == "1" ? "超额累计" : "全额累进";
      }),

      pricingIndexItemComputed: ko.pureComputed(function () {
        var pricingIndexItem = viewModel.CalculationRuleList.ref("pricingIndexItem")();
        var pricingIndexItemSource = viewModel.pricingIndexItemSource();
        var findItem = pricingIndexItemSource.find(function (prici) {
          return prici.value == pricingIndexItem;
        })
        return findItem ? findItem.name : "";
      }),


      validIndexByCol: function (colIndex, field) {
        var gridObj = viewModel.app.getComp("grid_CustomerScopeList").grid;
        var column = gridObj.getColumnByField(field);
        return colIndex == gridObj.getIndexOfColumn(column);
      },
      // 客户范围互斥
      ifCanEidtHandle: function (obj) {
        var colIndex = obj.colIndex;
        var curRow = viewModel.CustomerScopeList.getRow(obj.rowIndex);
        var customerCategoryId = curRow.getValue("customerCategoryId");
        var customerId = curRow.getValue("customerId");
        var marketAreaId = curRow.getValue("marketAreaId")
        if (
          customerCategoryId ||
          customerId ||
          marketAreaId
        ) {
          if (customerCategoryId) {
            return viewModel.validIndexByCol(colIndex, "customerCategoryId");
          }
          if (customerId) {
            return viewModel.validIndexByCol(colIndex, "customerId");
          }
          if (marketAreaId) {
            return viewModel.validIndexByCol(colIndex, "marketAreaId");
          }
          return false;
        } else {
          return true;
        }
      },
      // 新增编辑返利依据
      showEditBasisDialog: function (index, rowId) {
        var curRow = viewModel.SalePolicyCard.getCurrentRow();
        var policyId = curRow.getValue("id");
        if (!policyId) {
          toastr.warning("请先保存表头信息！");
          return;
        }
        // 卡片弹框
        viewModel.BasisCard.removeAllRows();
        viewModel.BasisConditionDetailList.removeAllRows();
        viewModel.BasisConditionDetailCard.removeAllRows();

        var curBasisRow;
        if (typeof index == "number") {
          viewModel.basisIndex = index;
          curBasisRow = viewModel.BasisList.getRowByRowId(rowId);
          var id = curBasisRow.getValue("id");
          if (id) {
            viewModel.getBasisBaseInfo(id);
          }
        } else {
          viewModel.basisIndex = -1;
          viewModel.BasisCard.createEmptyRow();
        }

        // 弹框
        if (!viewModel.basisDialog) {
          viewModel.basisDialog = u.dialog({
            id: "dialog_rebate_basis",
            content: "#dialog_rebate_basis",
            hasCloseMenu: true,
            width: "75%"
          });
          var okButton = $("#dialog_rebate_basis .J-ok");
          okButton.off().on("click", function () {
            // 点击确定时
            viewModel.saveBasis(function (data) {
              var newCurBasisRow = null;
              if (viewModel.basisIndex >= 0) {
                newCurBasisRow = viewModel.BasisList.getRow(index);
              } else {
                newCurBasisRow = viewModel.BasisList.createEmptyRow();
              }
              newCurBasisRow.setSimpleData(data, {
                unSelect: true
              });
              viewModel.basisIndex = -1;
              viewModel.basisDialog.close();
              // 保存成功，继续重新封装定价指标项
              viewModel.fillPricingData(viewModel.BasisList.getSimpleData());
            });
          });
          var cancelButton = $("#dialog_rebate_basis .J-cancel");
          cancelButton.off().on("click", function () {
            viewModel.basisDialog.close();
          });
        } else {
          viewModel.basisDialog.show();
        }
      },
      showDetailBasisDialog: function (index, rowId) {
        // 卡片弹框
        viewModel.BasisCard.removeAllRows();
        viewModel.BasisConditionDetailList.removeAllRows();
        viewModel.BasisConditionDetailCard.removeAllRows();

        var curBasisRow = viewModel.BasisList.getRowByRowId(rowId);
        var id = curBasisRow.getValue("id");
        if (id) {
          viewModel.getBasisBaseInfo(id, "detail");
        }
        // 弹框
        if (!viewModel.basisDetailDialog) {
          viewModel.basisDetailDialog = u.dialog({
            id: "dialog_rebate_basis_detail",
            content: "#dialog_rebate_basis_detail",
            hasCloseMenu: true,
            width: "75%"
          });
        } else {
          viewModel.basisDetailDialog.show();
        }
      },
      // 获取返利依据信息
      getBasisBaseInfo: function (id, type) {
        //根据id 查询客户范围
        $._ajax({
          url: appCtx + viewModel.basisUrl + "/detail",
          type: "get",
          data: {
            id: id
          },
          contentType: "application/json; charset=utf-8",
          success: function (data) {
            viewModel.BasisCard.removeAllRows();
            viewModel.BasisCard.setSimpleData(data);
            // 排序
            var basisConditionDetails = viewModel.conditionSortHandle(data.basisConditionDetails);
            viewModel.BasisConditionDetailList.setSimpleData(basisConditionDetails, {
              unSelect: true
            });
            viewModel.conditionsListToCard(basisConditionDetails, "BasisConditionDetailCard");
            setTimeout(function () {
              viewModel.createNewComp($("#basisConditionDetailInfo")[0]);
            }, 100);
          }
        });
      },
      // 清空
      clearPanelData: function () {
        viewModel.SalePolicyCard.clear();
        viewModel.SalePolicyDetail.clear();
        viewModel.CustomerScopeList.clear();
        viewModel.BasisList.clear();
        viewModel.ValueCard.clear();
        viewModel.ValueConditionDetailList.clear();
        viewModel.ValueConditionDetailCard.clear();
        viewModel.CalculationRuleList.clear();
        viewModel.CalculationRuleitemList.clear();
        viewModel.dimensionNameSource([]);
        viewModel.dimensionValueSource([]);
      },
      createNewComp: function (element, onlyType) {
        element.querySelectorAll('[u-meta]').forEach(function (ele) {
          var options = JSON.parse(ele.getAttribute('u-meta'));
          if (onlyType && options['type'] != onlyType) {
            return false;
          }
          if (!options.id) {
            options.id = Math.random();
          }
          // 对单选框特殊处理
          if (options['type'] == 'u-radio') {
            var field = options['field'];
            ele.innerHTML = '<label class="u-radio margin-right-15">' +
              '<input type="radio" class="u-radio-button" name="' + field + '" />' +
              '<span class="u-radio-label"></span>' +
              '</label>';
          }
          options['type'] = options['type'] || 'string';
          if (options && options['type']) {
            if (app.adjustFunc) app.adjustFunc.call(app, options);
            var comp = u.compMgr.createDataAdapter({
              el: ele,
              options: options,
              model: viewModel,
              app: app
            });
            // 下拉框特殊处理
            if (options['type'] == 'u-combobox') {
              $(ele).find("input.u-combobox-input").attr("readonly", true);
            }
            ele['u-meta'] = comp;
            app.comps.push(comp);
          }
        });
      },
      //进入新增单据页
      showAddBillPanel: function () {
        viewModel.clearPanelData();
        viewModel.isEditTip = true;
        viewModel.SalePolicyCard.setMeta("saleOrgId", "enable", true);
        viewModel.SalePolicyCard.setMeta("cycleId", "enable", true);
        var curRow = viewModel.SalePolicyCard.createEmptyRow();
        curRow.setValue("state", "0");
        viewModel.goBillPanel();
        $("#policyBase").show();
        $("#policyBase_show").hide();
        setTimeout(function () {
          // 计算规则
          viewModel.CalculationRuleList.createEmptyRow();
          viewModel.CalculationRuleitemList.createEmptyRow();
          viewModel.createNewComp($("#calculationBaseInfo")[0]);
        }, 100);
        // 返利值
        var valueRow = viewModel.ValueCard.createEmptyRow();
        valueRow.setValue("includeSecCustomer", "0");
        valueRow.setValue("includeLowCustomer", "0");
        //设置tab显示基本信息
        $(".ui-bill-panel .u-tabs__tab").eq(0).addClass("is-active").siblings(".u-tabs__tab").removeClass("is-active");
        $(".ui-bill-panel .u-tabs__panel").eq(0).addClass("is-active").siblings(".u-tabs__panel").removeClass("is-active");
        viewModel.billPanelStatus(CONST.BILLPANELSTATUS.ADD);
      },
      fillDimensionNameAndValueSource: function (row) {
        var cycleType = row.getValue("cycleType");
        var dimensionNameCombo = viewModel.fillDimensionNameSource(cycleType);
        viewModel.dimensionNameSource(dimensionNameCombo);
        var dimensionName = row.getValue("dimensionName");
        switch (dimensionName) {
          case "hyear":
            viewModel.dimensionValueSource(CONST.REBATE_HYEAR);
            break;
          case "season":
            viewModel.dimensionValueSource(CONST.REBATE_SEASON);
            break;
          case "month":
            viewModel.dimensionValueSource(CONST.REBATE_MONTH);
            break;
          default:
            break;
        };
      },
      //进入修改单据页
      showEditBillPanel: function (index, rowId) {
        viewModel.clearPanelData();
        viewModel.isEditTip = true;
        var curRow = viewModel.SalePolicyList.getRowByRowId(rowId);
        var policyId = curRow.getValue("id");
        viewModel.fillDimensionNameAndValueSource(curRow);
        // 由于表头、表体分开保存，因此编辑时， 销售组织、周期不可编辑
        viewModel.SalePolicyCard.setMeta("saleOrgId", "enable", false);
        viewModel.SalePolicyCard.setMeta("cycleId", "enable", false);
        //请求完整主子表信息
        viewModel.getPolicyInfo(policyId, "edit", function (data) {
          viewModel.SalePolicyCard.setSimpleData(data);
          viewModel.setRefparamByHeadInfo(data);
        });
        viewModel.goBillPanel();
        $("#policyBase").show();
        $("#policyBase_show").hide();
        //设置tab显示基本信息
        $(".ui-bill-panel .u-tabs__tab").eq(0).addClass("is-active").siblings(".u-tabs__tab").removeClass("is-active");
        $(".ui-bill-panel .u-tabs__panel").eq(0).addClass("is-active").siblings(".u-tabs__panel").removeClass("is-active");
        viewModel.billPanelStatus(CONST.BILLPANELSTATUS.EDIT);
      },
      // 封装计算规则页签中的定价指标项
      fillPricingData: function (basiss) {
        if (basiss && basiss.length) {
          var newPricings = basiss.map(function (basis) {
            return {
              value: basis.code,
              name: basis.name
            };
          });
          newPricings = newPricings.concat(CONST.REBATE_PRICING)
          viewModel.pricingIndexItemSource(newPricings);
        }
      },
      // 获取销售政策具体信息
      getPolicyInfo: function (policyId, type, callback) {
        // 查询明细
        $._ajax({
          url: appCtx + viewModel.baseurl + "/detail",
          type: "get",
          data: {
            id: policyId
          },
          contentType: "application/json; charset=utf-8",
          success: function (data) {
            if (typeof callback == "function") {
              callback(data);
              // 提交时校验，查询到明细后即可直接返回
              if (type == "submit") {
                return false;
              }
            }
            // 客户范围
            viewModel.CustomerScopeList.setSimpleData(data.customerScopes, {
              unSelect: true
            });
            // 返利依据
            viewModel.BasisList.setSimpleData(data.basiss || [], {
              unSelect: true
            });
            // 封装定价指标项
            viewModel.fillPricingData(data.basiss);
            // 返利值
            var value = data.values[0] || {
              valueConditionDetails: []
            };
            var valueRow = viewModel.ValueCard.createEmptyRow();
            valueRow.setSimpleData(value);
            // 排序
            var valueConditionDetails = viewModel.conditionSortHandle(value.valueConditionDetails);
            viewModel.ValueConditionDetailList.setSimpleData(valueConditionDetails, {
              unSelect: true
            });
            viewModel.conditionsListToCard(valueConditionDetails, "ValueConditionDetailCard");
            // 计算规则
            var rule = data.calculationRules[0] || {
              calculationRuleitems: [{}]
            };
            var ruleRow = viewModel.CalculationRuleList.createEmptyRow();
            ruleRow.setSimpleData(rule);
            rule.calculationRuleitems.sort(function(curr, next) {
              return curr.lowerLimit - next.lowerLimit;
            });
            viewModel.CalculationRuleitemList.setSimpleData(rule.calculationRuleitems, {
              unSelect: true
            });
            setTimeout(function () {
              viewModel.createNewComp($("#calculationBaseInfo")[0]);
            }, 100);

          }
        });
        // //根据id 查询客户范围
        // $._ajax({
        //   url: appCtx + viewModel.customerScopetUrl + "/findByPolicyId",
        //   type: "get",
        //   data: {
        //     policyId: policyId
        //   },
        //   contentType: "application/json; charset=utf-8",
        //   success: function (data) {
        //     viewModel.CustomerScopeList.setSimpleData(data, {
        //       unSelect: true
        //     });
        //   }
        // });
        // //根据id查 返利依据
        // $._ajax({
        //   url: appCtx + viewModel.basisUrl + "/findByPolicyId",
        //   type: "get",
        //   data: {
        //     policyId: policyId
        //   },
        //   contentType: "application/json; charset=utf-8",
        //   success: function (data) {
        //     viewModel.BasisList.setSimpleData(data, {
        //       unSelect: true
        //     });
        //   }
        // });
        // //根据id 查询计算返利值
        // $._ajax({
        //   url: appCtx + viewModel.valueUrl + "/findByPolicyId",
        //   type: "get",
        //   data: {
        //     policyId: policyId
        //   },
        //   contentType: "application/json; charset=utf-8",
        //   success: function (data) {
        //     viewModel.ValueCard.setSimpleData(data, {
        //       unSelect: true
        //     });
        //     viewModel.ValueConditionDetailList.setSimpleData(data.valueConditionDetails, {
        //       unSelect: true
        //     });
        //     viewModel.conditionsListToCard(data.valueConditionDetails, "ValueConditionDetailCard");
        //   }
        // });
        // //根据id 查询计算规则
        // $._ajax({
        //   url: appCtx + viewModel.calculationUrl + "/findByPolicyId",
        //   type: "get",
        //   data: {
        //     policyId: policyId
        //   },
        //   contentType: "application/json; charset=utf-8",
        //   success: function (data) {
        //     viewModel.CalculationRuleList.setSimpleData(data, {
        //       unSelect: true
        //     });
        //     // viewModel.CalculationRuleitemList.setSimpleData(data.calculationRuleitems, {
        //     //   unSelect: true
        //     // });
        //   }
        // });
      },

      //点击保存按钮
      saveHandle: function () {
        var infoBase = $("#policyBase")[0];
        var basePass = viewModel.validate(infoBase);

        if (basePass.passed) {
          viewModel.edit();
        }
      },

      //将操作后的数据进行保存
      edit: function (index) {
        var postdata = viewModel.SalePolicyCard.getSimpleData()[0];
        var type = "post";
        if (postdata.id) {
          type = "put";
          postdata.persistStatus = "upd";
        } else {
          postdata.persistStatus = "new";
        }
        //更改后台数据
        $._ajax({
          url: appCtx + viewModel.baseurl,
          type: type,
          data: JSON.stringify(postdata),
          contentType: "application/json; charset=utf-8",
          success: function (data) {
            // 不触发监听事件
            viewModel.isEditTip = false;
            viewModel.SalePolicyCard.setSimpleData(data);
            viewModel.SalePolicyDetail.setSimpleData(data);

            ko.cleanNode($("#policyBase_show")[0]);
            ko.applyBindings(viewModel, $("#policyBase_show")[0]);
            $("#policyBase").hide();
            $("#policyBase_show").show();
            toastr.success("保存成功");
          }
        });
      },
      validate: function (element) {
        var result = viewModel.app.compsValidateMultiParam({
          element: element,
          showMsg: true
        });
        return result;
      },
      isNumber: function (val) {
        var regPos = /^\d+(\.{0,1}\d+){0,1}$/; //非负浮点数
        if (regPos.test(val)) {
          return true;
        } else {
          return false;
        }
      },
      //客户范围保存
      saveCustomerScope: function () {
        var curRow = viewModel.SalePolicyCard.getCurrentRow();
        var policyId = curRow.getValue("id");
        if (!policyId) {
          toastr.warning("请先保存表头信息！");
          return;
        }
        var postdata = viewModel.CustomerScopeList.getSimpleData();
        var changeData = [];
        var nochangeData = [];
        if (postdata && postdata.length > 0) {
          for (var i = 0; i < postdata.length; i++) {
            if (postdata[i].persistStatus != "nrm") {
              postdata[i].policyId = policyId;
              changeData.push(postdata[i]);
            } else {
              nochangeData.push(postdata[i]);
            }
          }
        }
        if (changeData.length == 0) {
          toastr.warning("没有相关数据需要保存");
          return false;
        }
        var customerScopeInfo = $("#customerScopeInfo")[0];
        var customerScopePass = viewModel.validate(customerScopeInfo);
        if (customerScopePass.passed) {
          $._ajax({
            url: appCtx + viewModel.customerScopetUrl + "/batch-save",
            type: "post",
            data: JSON.stringify(changeData),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            complete: function () {
              u.hideLoader();
            },
            success: function (data) {
              toastr.success("保存客户范围成功！");
              viewModel.CustomerScopeList.removeAllRows();
              viewModel.CustomerScopeList.addSimpleData(data, "nrm", {
                unSelect: true
              });
              viewModel.CustomerScopeList.addSimpleData(nochangeData, "nrm", {
                unSelect: true
              });
            }
          });
        }
      },
      // 返利值页签点击事件
      valueTabClickHandle: function() {
        setTimeout(function () {
          viewModel.createNewComp($("#valueBaseInfo")[0], "u-radio");
          viewModel.createNewComp($("#valueConditionDetailInfo")[0]);
        }, 100);
      },
      // 返利值保存
      saveRebateValue: function () {
        var curRow = viewModel.SalePolicyCard.getCurrentRow();
        var policyId = curRow.getValue("id");
        if (!policyId) {
          toastr.warning("请先保存表头信息！");
          return;
        }
        var postdata = viewModel.ValueCard.getSimpleData()[0];
        if (postdata.rebateValueType == "03" && !postdata.salesTargetId) {
          toastr.warning("返利值类型为金额超目标额时，销售指标必填！");
          return;
        }
        var conditionDetails = viewModel.ValueConditionDetailList.getSimpleData();
        var cardData = viewModel.ValueConditionDetailCard.getSimpleData()[0];
        var newConditionDetails = viewModel.conditionsCardToList(cardData, conditionDetails) || [];
        // 校验过滤条件
        if (viewModel.validateCondition(newConditionDetails)) {
          toastr.warning("维护取值范围，必须维护比较符！");
          return;
        }
        newConditionDetails.forEach(function(detail) {
          detail.persistStatus = "new";
        })
        postdata.policyId = policyId;
        postdata.valueConditionDetails = newConditionDetails;
        var ajaxType = "post";
        if (postdata.id) {
          ajaxType = "put";
          
        }
        var valueBaseInfoInfo = $("#valueBaseInfo")[0];
        var valueBaseInfoInfoPass = viewModel.validate(valueBaseInfoInfo);
        if (valueBaseInfoInfoPass.passed) {
          $._ajax({
            url: appCtx + viewModel.valueUrl,
            type: ajaxType,
            data: JSON.stringify(postdata),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            complete: function () {
              u.hideLoader();
            },
            success: function (data) {
              toastr.success("保存返利值成功！");
              viewModel.ValueCard.removeAllRows();
              viewModel.ValueCard.setSimpleData(data);
              viewModel.ValueConditionDetailList.setSimpleData(data.valueConditionDetails, {
                unSelect: true
              });
              setTimeout(function () {
                viewModel.createNewComp($("#valueConditionDetailInfo")[0]);
              }, 100);
            }
          });
        }
      },
      // 保存计算规则
      saveCalculationRule: function () {
        var curRow = viewModel.SalePolicyCard.getCurrentRow();
        var policyId = curRow.getValue("id");
        if (!policyId) {
          toastr.warning("请先保存表头信息！");
          return;
        }
        var postdata = viewModel.CalculationRuleList.getSimpleData()[0];
        var progressiveWay = postdata.progressiveWay;
        var pricingIndexItem = postdata.pricingIndexItem;
        if (progressiveWay == "1" && pricingIndexItem != "value") {
          toastr.warning("累进方式为超额累进时，定价指标项只能选择返利值！");
          return;
        }
        postdata.policyId = policyId;
        var calculationRuleitems = viewModel.CalculationRuleitemList.getSimpleData() || [];
        if (pricingIndexItem != "constant") {
          var validResult = calculationRuleitems.every(function(item) {
            return viewModel.isNumber(item.lowerLimit);
          });
          if (!validResult) {
            toastr.warning("定价指标项非【常量】时，指标下限必须维护值");
            return;
          }
        }
        calculationRuleitems.forEach(function(item) {
          item.persistStatus = "new";
        })
        postdata.calculationRuleitems = calculationRuleitems;
        var ajaxType = "post";
        if (postdata.id) {
          ajaxType = "put";
        }
        var calculationBaseInfo = $("#calculationBaseInfo")[0];
        var calculationBasePass = viewModel.validate(calculationBaseInfo);
        if (calculationBasePass.passed) {
          $._ajax({
            url: appCtx + viewModel.calculationUrl,
            type: ajaxType,
            data: JSON.stringify(postdata),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            complete: function () {
              u.hideLoader();
            },
            success: function (data) {
              toastr.success("保存计算规则成功！");
              viewModel.CalculationRuleList.removeAllRows();
              var calculationRow = viewModel.CalculationRuleList.createEmptyRow();
              calculationRow.setSimpleData(data);
              viewModel.CalculationRuleitemList.setSimpleData(data.calculationRuleitems, {
                unSelect: true
              });
              setTimeout(function () {
                viewModel.createNewComp($("#calculationBaseInfo")[0]);
              }, 100);
            }
          });
        }
      },
      // 计算规则 - 新增指标梯度
      addCalculationRuleitemRow: function (row) {
        var upRow = viewModel.CalculationRuleitemList.getRow(viewModel.CalculationRuleitemList.rows().length - 1);
        //检验上一行录入值的正确性
        if (upRow) {
          var lowerLimitNumber = viewModel.isNumber(
            upRow.getSimpleData()["lowerLimit"]
          );
          var upperLimitNumber = viewModel.isNumber(
            upRow.getSimpleData()["upperLimit"]
          );
          if (lowerLimitNumber == false || upperLimitNumber == false) {
            toastr.error("请输入非负数");
            return;
          }
        }
        //新增一行
        viewModel.CalculationRuleitemList.insertRow(viewModel.CalculationRuleitemList.rows().length);
        var newRow = viewModel.CalculationRuleitemList.getRow(viewModel.CalculationRuleitemList.rows().length - 1);

        if (upRow) {
          //上一行的下限值赋到新增行的上限值
          newRow.setValue(
            "lowerLimit",
            upRow.getSimpleData()["upperLimit"]
          );
        }
      },
      // 计算规则 - 删除指标梯度
      delCalculationRuleitemRow: function (row, childRow) {
        var allRow = viewModel.CalculationRuleitemList.getAllRealRows();
        if (allRow && allRow.length == 1) {
          toastr.warning("必须维护返利价格，最后一行不允许删除！");
          return;
        }
        var index = viewModel.CalculationRuleitemList.getIndexByRowId(childRow.rowId);
        viewModel.CalculationRuleitemList.removeRows([index], {
          forceDel: true
        });
      },
      // 删除返利依据
      del_basis: function (index, rowId) {
        var curRow = viewModel.BasisList.getRowByRowId(rowId);
        var id = curRow.getValue("id");
        common.dialog.confirmDialog({
          msg1: "确认删除改项？",
          msg2: "此操作不可逆",
          width: "400px",
          type: "error",
          onOk: function () {
            $._ajax({
              url: appCtx + viewModel.basisUrl + "/delete",
              type: "post",
              data: {
                ids: id
              },
              success: function (data) {
                toastr.success("删除成功");
                viewModel.BasisList.removeRows([curRow], { forceDel: true });
              }
            });
          }
        });
      },
      validateCondition: function(conditions) {
        return conditions.some(function(condition) {
          return condition.rangeValues && !condition.comparison;
        });
      },
      // 保存返利依据
      saveBasis: function (callback) {
        var curRow = viewModel.SalePolicyCard.getCurrentRow();
        var policyId = curRow.getValue("id");
        if (!policyId) {
          toastr.warning("请先保存表头信息！");
          return;
        }
        var postdata = viewModel.BasisCard.getSimpleData()[0];
        var conditionDetails = viewModel.BasisConditionDetailList.getSimpleData();
        var cardData = viewModel.BasisConditionDetailCard.getSimpleData()[0];
        var newConditionDetails = viewModel.conditionsCardToList(cardData, conditionDetails) || [];
        // 校验过滤条件
        if (viewModel.validateCondition(newConditionDetails)) {
          toastr.warning("维护取值范围，必须维护比较符！");
          return;
        }
        newConditionDetails.forEach(function(detail) {
          detail.persistStatus = "new";
        });
        postdata.policyId = policyId;
        postdata.basisConditionDetails = newConditionDetails;
        var ajaxType = "post";
        if (postdata.id) {
          ajaxType = "put";
        }

        var basisInfo = $("#basisBaseInfo")[0];
        var basisPass = viewModel.validate(basisInfo);
        if (basisPass.passed) {
          $._ajax({
            url: appCtx + viewModel.basisUrl,
            type: ajaxType,
            data: JSON.stringify(postdata),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            complete: function () {
              u.hideLoader();
            },
            success: function (data) {
              if (typeof callback == "function") {
                callback(data);
              }
            }
          });
        }
      },
      //主表删除和批量删除
      del: function (data, rowId) {
        if (typeof data == "number") {
          viewModel.SalePolicyList.setRowSelect(
            viewModel.SalePolicyList.getRowByRowId(rowId)
          );
        }
        var ids = [];
        var rows = viewModel.SalePolicyList.getSelectedRows();
        var status = [];
        var statustip = "";
        if (rows && rows.length > 0) {
          for (var i = 0; i < rows.length; i++) {
            ids.push(rows[i].getValue("id"));
            var state = rows[i].getValue("state");
            if (state != "0") {
              status.push(rows[i].getValue("code"));
            }
          }
          if (status.length > 0) {
            var statusArr = function () {
              for (i = 0; i < status.length; i++) {
                statustip += status[i] + "，";
              }
              return statustip.substring(0, statustip.length - 1);
            };

            toastr.warning("数据   " + statusArr() + " 非【待处理】状态，不可删除");
            return false;
          }
          common.dialog.confirmDialog({
            msg1: "确认删除这些项？",
            msg2: "此操作不可逆",
            width: "400px",
            type: "error",
            onOk: function () {
              $._ajax({
                url: appCtx + viewModel.baseurl + "/delete",
                type: "post",
                data: "ids=" + ids.join(","),
                success: function (data) {
                  toastr.success("删除成功");
                  viewModel.search();
                }
              });
            }
          });
        } else {
          toastr.warning("请先选择要删除的数据");
        }
      },
      //子表 删除和批量删除
      delChild: function (dataTable) {
        var rows = viewModel[dataTable].getSelectedRows();
        viewModel[dataTable].removeRows(rows);
      },
      //子表增行
      addRow: function (dataTable) {
        viewModel[dataTable].createEmptyRow();
      },
      //查看详情
      detail: function () {
        //确保grid先将行设置为focus状态
        setTimeout(function () {
          viewModel.clearPanelData();
          var curRow = viewModel.SalePolicyList.getCurrentRow();
          viewModel.fillDimensionNameAndValueSource(curRow);
          var policyId = curRow.getValue("id");
          viewModel.getPolicyInfo(policyId, "detail", function (data) {
            var detailRow = viewModel.SalePolicyDetail.createEmptyRow();
            detailRow.setSimpleData(data);
          });
          viewModel.goDetailPanel();
          //设置tab显示基本信息
          $(".ui-bill-detail .u-tabs__tab").eq(0).addClass("is-active").siblings(".u-tabs__tab").removeClass("is-active");
          $(".ui-bill-detail .u-tabs__panel").eq(0).addClass("is-active").siblings(".u-tabs__panel").removeClass("is-active");
          viewModel.billPanelStatus(CONST.BILLPANELSTATUS.DETAIL);
        }, 0);
      },

      //点击取消 单据页
      cancelHandle: function () {
        viewModel.backListPrompt();
      },
      backListPrompt: function () {
        // 如果是编辑标识，则返回列表时需给出提示
        if (viewModel.isEditTip) {
          common.dialog.confirmDialog({
            msg1: "有数据尚未保存，是否先保存数据?",
            msg2: "点击确认，将返回列表页",
            width: "400px",
            type: "error",
            onOk: function () {
              $("#code-text").empty();
              viewModel.search();
              viewModel.retListPanel();
            }
          });
        } else {
          viewModel.search();
          viewModel.retListPanel();
        }

      },
      //返回
      backPanel: function () {
        viewModel.search();
        viewModel.retListPanel();
      },

      //根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
      search: function (reindex) {
        if (reindex) {
          viewModel.SalePolicyList.pageIndex(0);
        }
        viewModel.SalePolicyList.removeAllRows();
        var queryData = viewModel.searchcomp.getDataWithOpr();
        queryData.size = viewModel.SalePolicyList.pageSize();
        queryData.page = viewModel.SalePolicyList.pageIndex();

        $._ajax({
          type: "get",
          url: appCtx + viewModel.baseurl,
          dataType: "json",
          data: queryData,
          success: function (data) {
            viewModel.SalePolicyList.setSimpleData(data.content, {
              unSelect: true
            });
            viewModel.SalePolicyList.totalRow(data.totalElements);
            viewModel.SalePolicyList.totalPages(data.totalPages);
          }
        });
      },
      //清空搜索条件
      cleanSearch: function () {
        viewModel.searchcomp.clearSearch();
      },
      //页码改变时的回调函数
      pageChange: function (index) {
        viewModel.SalePolicyList.pageIndex(index);
        viewModel.search();
      },
      //页码改变时的回调函数
      sizeChange: function (size) {
        viewModel.SalePolicyList.pageSize(size);
        viewModel.search(true);
      },


      //导入---返利依据 暂留
      importCustomer: function () {
        var urlInfo = "/customer-excel/excelDataImport"; //倒入地址参数
        var urlStatusInfo = "/customer-excel/excelLoadingStatus"; //请求进度地址参数
        var ele = $("#importFiel")[0]; //挂载元素
        common.fileHandle.importFile(urlInfo, urlStatusInfo, ele);
      },
      //导出---返利依据 暂留
      exportCustomer: function () {
        var searchParams = viewModel.searchcomp.getDataWithOpr(); //搜索查询参数
        var templateUrl = "/policys-excel/downloadExcelTemplate"; //导出模板地址参数
        var excelDataUrl = "/policys-excel/excelDataExport"; //导出数据地址参数
        var listData = viewModel.SalePolicyList; //需要导出表格的dataTable
        var ele = $("#exportFiel")[0]; //挂载元素
        common.fileHandle.exportFile(
          listData,
          ele,
          searchParams,
          templateUrl,
          excelDataUrl
        );
      },
      // 审批流程的相关按钮点击事件 - start
      // 提交
      submit: function (data, rowId) {
        if (typeof (data) == 'number') {
          viewModel.SalePolicyList.setRowSelectbyRowId(rowId);
        }
        // 提交时校验是否维护返利值、计算规则
        var selectedRows = viewModel.SalePolicyList.getSelectedRows();
        if (selectedRows.length != 1) {
          toastr.error("请选择一条数据。");
          return;
        }
        var policyId = selectedRows[0].getValue("id");
        viewModel.getPolicyInfo(policyId, "submit", function (data) {
          if (!(data.values && data.values.length) || !(data.calculationRules && data.calculationRules.length)) {
            toastr.error("提交前请先维护政策的返利值、返利计算规则！");
            return;
          }
          var listCompId = "SalePolicyList";
          var nodeJs = "/ocm-web/pages/rebate/rebatepolicy/rebatepolicy.js";
          var billTypeCode = "RebatePolicy";
          var tranTypeCode = null;
          var callback = null;
          viewModel.bpmSubmit(viewModel, listCompId, nodeJs, billTypeCode, tranTypeCode, callback);
        });
        
      },

      // 收回
      unsubmit: function (data, rowId) {
        if (typeof (data) == 'number') {
          viewModel.SalePolicyList.setRowSelectbyRowId(rowId);
        }
        var listCompId = "SalePolicyList";
        var billTypeCode = "RebatePolicy";
        var tranTypeCode = null;
        var callback = null;
        viewModel.bpmUnsubmit(viewModel, listCompId, billTypeCode, tranTypeCode, callback);
      },

      // 审批通过
      approve: function (data, rowId) {
        if (typeof (data) == 'number') {
          viewModel.SalePolicyList.setRowSelectbyRowId(rowId);
        }
        var listCompId = "SalePolicyList";
        var billTypeCode = "RebatePolicy";
        var tranTypeCode = null;
        var withBpmCallback = function () {
          var index = viewModel[listCompId].getSelectedIndex();
          var rowId = viewModel[listCompId].getSelectedRows()[0].rowId;
          var id = viewModel.SalePolicyList.getRow(index).getValue('id');
          viewModel.detail(index, rowId);
          viewModel.initBPMFromBill(id, viewModel);
        };
        var withoutBpmCallback = null;
        viewModel.approveWithoutBpm(viewModel, listCompId, billTypeCode, tranTypeCode, withBpmCallback,
          withoutBpmCallback);
      },

      // 审批不通过
      disapprove: function () {
        var listCompId = "SalePolicyList";
        var billTypeCode = "RebatePolicy";
        var tranTypeCode = null;
        var withBpmCallback = function () {
          var index = viewModel[listCompId].getSelectedIndex();
          var rowId = viewModel[listCompId].getSelectedRows()[0].rowId;
          var id = viewModel.SalePolicyList.getRow(index).getValue('id');
          viewModel.detail(index, rowId);
          viewModel.initBPMFromBill(id, viewModel);
        };
        var withoutBpmCallback = null;
        viewModel.disapproveWithoutBpm(viewModel, listCompId, billTypeCode, tranTypeCode, withBpmCallback,
          withoutBpmCallback);
      },

      // 取消审批
      cancelApprove: function (data, rowId) {
        if (typeof (data) == 'number') {
          viewModel.SalePolicyList.setRowSelectbyRowId(rowId);
        }
        var listCompId = "SalePolicyList";
        var billTypeCode = "RebatePolicy";
        var tranTypeCode = null;
        var withBpmCallback = function () {
          var index = viewModel[listCompId].getSelectedIndex();
          var rowId = viewModel[listCompId].getSelectedRows()[0].rowId;
          var id = viewModel.SalePolicyList.getRow(index).getValue('id');
          viewModel.detail(index, rowId);
          viewModel.initBPMFromBill(id, viewModel);
        };
        var withoutBpmCallback = null;
        viewModel.cancelApproveWithoutBpm(viewModel, listCompId, billTypeCode, tranTypeCode, withBpmCallback,
          withoutBpmCallback);
      },
      // 审批流程的相关按钮点击事件 - end

      // 过滤条件排序
      conditionSortHandle: function(conditionDetails) {
        if (!conditionDetails || !conditionDetails.length) {
          return conditionDetails;
        }
        conditionDetails.forEach(function(condition) {
          switch (condition.conditionCode) {
            case "orderType":
              condition.findex = 1;
              break;
            case "billTranType":
              condition.findex = 1;
              break;
            case "activity":
              condition.findex = 2;
              break;
            case "goodsRange":
              condition.findex = 3;
              break;
            case "project":
              condition.findex = 4;
              break;
            case "isGift":
              condition.findex = 5;
              break;
            case "goodsSupplement":
              condition.findex = 6;
              break;
            default:
              break;
          };
        });
        return conditionDetails.sort(function(curr, next) {
          return curr.findex - next.findex;
        })

      },
      // 返利依据、返利值过滤条件卡片、列表转换
      // 列表 转 卡片
      conditionsListToCard: function (conditionDetails, cardType) {
        viewModel[cardType].clear();
        var curRow = viewModel[cardType].createEmptyRow();
        conditionDetails.forEach(function (condition, index) {
          switch (condition.conditionCode) {
            case "orderType":
              curRow.setValue("trantypeId", condition.rangeValues);
              curRow.setValue("comparison1", condition.comparison);
              break;
            case "billTranType":
              curRow.setValue("trantypeId", condition.rangeValues);
              curRow.setValue("comparison1", condition.comparison);
              break;
            case "activity":
              curRow.setValue("promActivityId", condition.rangeValues);
              curRow.setValue("comparison2", condition.comparison);
              break;
            case "goodsRange":
              curRow.setValue("goodsRangeId", condition.rangeValues);
              curRow.setValue("comparison3", condition.comparison);
              break;
            case "project":
              curRow.setValue("projectId", condition.rangeValues);
              curRow.setValue("comparison4", condition.comparison);
              break;
            case "isGift":
              curRow.setValue("isGift", condition.rangeValues || "0");
              curRow.setValue("comparison5", condition.comparison);
              break;
            case "goodsSupplement":
              curRow.setValue("goodsSupplement", condition.rangeValues || "0");
              curRow.setValue("comparison6", condition.comparison);
              break;
            default:
              break;
          };
        });
      },
      // 卡片 转 列表
      conditionsCardToList: function (data, conditionDetails) {
        conditionDetails.forEach(function (condition, index) {
          switch (condition.conditionCode) {
            case "orderType":
              condition.rangeValues = data.trantypeId;
              condition.trantypeId = data.trantypeId;
              condition.comparison = data.comparison1;
              break;
            case "billTranType":
              condition.rangeValues = data.trantypeId;
              condition.trantypeId = data.trantypeId;
              condition.comparison = data.comparison1;
              break;
            case "activity":
              condition.rangeValues = data.promActivityId;
              condition.promActivityId = data.promActivityId;
              condition.comparison = data.comparison2;
              break;
            case "goodsRange":
              condition.rangeValues = data.goodsRangeId;
              condition.goodsRangeId = data.goodsRangeId;
              condition.comparison = data.comparison3;
              break;
            case "project":
              condition.rangeValues = data.projectId;
              condition.projectId = data.projectId;
              condition.comparison = data.comparison4;
              break;
            case "isGift":
              condition.rangeValues = data.isGift;
              condition.isGift = data.isGift;
              condition.comparison = data.comparison5;
              break;
            case "goodsSupplement":
              condition.rangeValues = data.goodsSupplement;
              condition.goodsSupplement = data.goodsSupplement;
              condition.comparison = data.comparison6;
              break;
            default:
              break;
          }
        });
        return conditionDetails;
      },
      // 清空表体信息
      removeAllBodyList: function () {
        viewModel.CustomerScopeList.removeAllRows();
        viewModel.BasisList.removeAllRows();
        viewModel.ValueCard.removeAllRows();
        viewModel.ValueConditionDetailList.removeAllRows();
        viewModel.ValueConditionDetailCard.removeAllRows();
        viewModel.CalculationRuleList.removeAllRows();
        viewModel.CalculationRuleitemList.removeAllRows();
        viewModel.dimensionNameSource([]);
        viewModel.dimensionValueSource([]);

        // 创建新行
        var valueRow = viewModel.ValueCard.createEmptyRow();
        valueRow.setValue("includeSecCustomer", "0");
        valueRow.setValue("includeLowCustomer", "0");
        setTimeout(function () {
          // 计算规则
          viewModel.CalculationRuleList.createEmptyRow();
          viewModel.CalculationRuleitemList.createEmptyRow();
          viewModel.createNewComp($("#calculationBaseInfo")[0]);
        }, 100);
      },
      // 清空起始时间、截止时间信息
      clearStartAndEndTime: function () {
        var curRow = viewModel.SalePolicyCard.getCurrentRow();
        curRow.setValue("startTime", "");
        curRow.setValue("endTime", "");
        curRow.setValue("dimensionValue", "");
      },
      // 根据维度值的起始时间、截止时间
      setStartAndEndTimeByDimensionValue: function (startMonth, endMonth) {
        var curRow = viewModel.SalePolicyCard.getCurrentRow();
        var date = new Date();
        var year = date.getFullYear();
        var month = startMonth;
        var firstdate = year + '-' + month + '-01'
        var monthFirst = firstdate + " 00:00:00";

        var endDay = new Date(year, endMonth, 0);
        var lastdate = year + '-' + endMonth + '-' + endDay.getDate();
        var monthLast = lastdate + " 23:59:59";

        curRow.setValue("startTime", monthFirst || "");
        curRow.setValue("endTime", monthLast || "");
      },
      // 根据维度、维度设置起始时间、截止时间
      setStartAndEndTime: function (dimensionName, dimensionValue) {
        var startMonth = 0;
        var endMonth = 0;
        if (dimensionName == "year") {
          startMonth = 1;
          endMonth = 12;
        } else if (dimensionName == "hyear") {
          startMonth = 1 + 6 * (dimensionValue - 1);
          endMonth = 6 * dimensionValue;
        } else if (dimensionName == "season") {
          startMonth = 1 + 3 * (dimensionValue - 1);
          endMonth = 3 * dimensionValue;
        } else if (dimensionName == "month") {
          startMonth = dimensionValue;
          endMonth = dimensionValue;
        }
        viewModel.setStartAndEndTimeByDimensionValue(startMonth, endMonth);
      },
      fillDimensionNameSource: function (cycleType) {
        var types = cycleType.split("_");
        return types.map(function (type) {
          var value = "";
          var name = "";
          switch (type) {
            case "YEAR":
              value = "year";
              name = "年";
              break;
            case "HYEAR":
              value = "hyear";
              name = "半年";
              break;
            case "SEASON":
              value = "season";
              name = "季度";
              break;
            case "MONTH":
              value = "month";
              name = "月";
              break;
            default:
              break;
          };
          return {
            value: value,
            name: name
          }
        });
      },
      setRefparamByHeadInfo: function(data) {
        var refparam = {
          "EQ_state": "3",
          "EQ_saleOrg": data.saleOrgId,
          "EQ_cycle.id": data.cycleId
        };
        $("#basisSalesTargetId").attr("data-refparam", JSON.stringify(refparam));
        $("#valueSalesTargetId").attr("data-refparam", JSON.stringify(refparam));
      }
    },
    afterCreate: function () {
      // 销售组织监听事件
      viewModel.SalePolicyCard.on("saleOrgId.valuechange", function (obj) {
        var curRow = viewModel.SalePolicyCard.getCurrentRow();
        if (obj.newValue && obj.newValue != obj.oldValue) {
          viewModel.removeAllBodyList();
          // 为返利依据、返利值的销售政策增加过滤条件
          viewModel.setRefparamByHeadInfo(curRow.getSimpleData());
        }
      });
      // 周期监听事件
      viewModel.SalePolicyCard.on("cycleId.valuechange", function (obj) {
        var curRow = viewModel.SalePolicyCard.getCurrentRow();
        if (obj.newValue && obj.newValue != obj.oldValue) {
          viewModel.dimensionNameSource([]);
          viewModel.dimensionValueSource([]);
          viewModel.clearStartAndEndTime();
          // 为返利依据、返利值的销售政策增加过滤条件
          viewModel.setRefparamByHeadInfo(curRow.getSimpleData());

          var refer = $("#refContainercycleIdBase").data("uui.refer");
          if (refer) {
            var refValue = refer.values[0];
            if (!refValue) return;
            curRow.setValue("year", refValue.year || "");
            curRow.setValue("cycleType", refValue.cycleType || "");
            if (refValue.cycleType == "CUSTOM") {
              curRow.setValue("startTime", refValue.startTime || "");
              curRow.setValue("endTime", refValue.endTime || "");
            } else {
              var dimensionNameCombo = viewModel.fillDimensionNameSource(refValue.cycleType);
              viewModel.dimensionNameSource(dimensionNameCombo);
            }
          }
        }
      });
      // 维度监听事件
      viewModel.SalePolicyCard.on("dimensionName.valuechange", function (obj) {
        if (obj.newValue && obj.newValue != obj.oldValue) {
          viewModel.dimensionValueSource([]);
          viewModel.clearStartAndEndTime();
          switch (obj.newValue) {
            case "year":
              viewModel.setStartAndEndTime("year");
              break;
            case "hyear":
              viewModel.dimensionValueSource(CONST.REBATE_HYEAR);
              break;
            case "season":
              viewModel.dimensionValueSource(CONST.REBATE_SEASON);
              break;
            case "month":
              viewModel.dimensionValueSource(CONST.REBATE_MONTH);
              break;
            default:
              break;
          };
        }
      });

      // 维度值监听事件
      viewModel.SalePolicyCard.on("dimensionValue.valuechange", function (obj) {
        if (obj.newValue && obj.newValue != obj.oldValue) {
          var curRow = viewModel.SalePolicyCard.getCurrentRow();
          var dimensionName = curRow.getValue("dimensionName");
          viewModel.setStartAndEndTime(dimensionName, obj.newValue);
        }
      });

      // 返利依据 单据类型监听事件
      viewModel.BasisCard.off("billTypeId.valuechange").on("billTypeId.valuechange", function (obj) {
        var conditionDetails = [];
        if (obj.newValue && obj.newValue != obj.oldValue) {
          viewModel.BasisConditionDetailList.removeAllRows();
          viewModel.BasisConditionDetailCard.removeAllRows();
          if (obj.newValue == "SaleOrder") {
            conditionDetails = CONST.SALEORDERVALUE;
          } else if (obj.newValue == "SaleOut") {
            conditionDetails = CONST.SALEOUTORDERVALUE;
          }
          if (conditionDetails && conditionDetails.length) {
            conditionDetails.forEach(function (detail) {
              var tempRow = viewModel.BasisConditionDetailList.createEmptyRow();
              tempRow.setSimpleData(detail);
            });
            viewModel.conditionsListToCard(conditionDetails, "BasisConditionDetailCard");
            setTimeout(function () {
              viewModel.createNewComp($("#basisConditionDetailInfo")[0]);
              var params = {
                "EQ_billTypeId": obj.newValue
              }
              $("#basisRerferTrantypeId").attr("data-refparam", JSON.stringify(params));
            }, 100);
          }
        }
      });
      // 返利依据 销售指标监听事件 返利依据的商品范围需和销售指标保持一致
      viewModel.BasisCard.off("salesTargetId.valuechange").on("salesTargetId.valuechange", function (obj) {
        if (obj.newValue && obj.newValue != obj.oldValue) {
          var refer = $("#refContainerbasisSalesTargetIdRefer").data("uui.refer");
          var refValue = refer.values[0];
          if (refValue) {
            var basisDetailRow = viewModel.BasisConditionDetailCard.getCurrentRow();
            if (basisDetailRow) {
              basisDetailRow.setValue("comparison3", "EQ");
              basisDetailRow.setValue("goodsRangeId", refValue.goodsRangeId);
            }
          }
        }
      });


      // 返利值 单据类型监听事件
      viewModel.ValueCard.off("billTypeId.valuechange").on("billTypeId.valuechange", function (obj) {
        var conditionDetails = [];
        if (obj.newValue && obj.newValue != obj.oldValue) {
          viewModel.ValueConditionDetailList.removeAllRows();
          viewModel.ValueConditionDetailCard.removeAllRows();
          if (obj.newValue == "SaleOrder") {
            conditionDetails = CONST.SALEORDERVALUE;
          } else if (obj.newValue == "SaleOut") {
            conditionDetails = CONST.SALEOUTORDERVALUE;
          }
          if (conditionDetails && conditionDetails.length) {
            conditionDetails.forEach(function (detail) {
              var tempRow = viewModel.ValueConditionDetailList.createEmptyRow();
              tempRow.setSimpleData(detail);
            });
            viewModel.conditionsListToCard(conditionDetails, "ValueConditionDetailCard");
            setTimeout(function () {
              viewModel.createNewComp($("#valueConditionDetailInfo")[0]);
              // 为交易类型赋筛选条件
              var params = {
                "EQ_billTypeId": obj.newValue
              }
              $("#valueRerferTrantypeId").attr("data-refparam", JSON.stringify(params));
            }, 100);
          }
        }

      });

      // 返利值 返利值类型监听
      // viewModel.ValueCard.off("rebateValueType.valuechange").on("rebateValueType.valuechange", function (obj) {
      //   var comp = app.getComp("valueSalesTargetCompId");
      //   comp.validate.required = false;
      //   viewModel.ValueCard.setMeta("salesTargetId", "required", false);
      //   if (obj.newValue && obj.newValue != obj.oldValue) {
      //     if(obj.newValue == "03") {
      //       comp.validate.required = true;
      //       viewModel.ValueCard.setMeta("salesTargetId", "required", true);
      //     }
      //   }
      // });

      // 返利值 销售指标监听事件 返利值的商品范围需和销售指标保持一致
      viewModel.ValueCard.off("salesTargetId.valuechange").on("salesTargetId.valuechange", function (obj) {
        if (obj.newValue && obj.newValue != obj.oldValue) {
          var refer = $("#refContainervalueSalesTargetIdRefer").data("uui.refer");
          var refValue = refer.values[0];
          if (refValue) {
            var valueDetailRow = viewModel.ValueConditionDetailCard.getCurrentRow();
            if (valueDetailRow) {
              valueDetailRow.setValue("comparison3", "EQ");
              valueDetailRow.setValue("goodsRangeId", refValue.goodsRangeId);
            }
          }
        }
      });

      // 客户范围互斥事件
      viewModel.CustomerScopeList.off("").on("valuechange", function (obj) {
        if (obj.newValue && viewModel.CustomerScopeFields.includes(obj.field)) {
          var curRow = viewModel.CustomerScopeList.getRowByRowId(obj.rowId);
          viewModel.CustomerScopeFields.forEach(function(field) {
            if (field != obj.field) {
              var newField = field.substring(0, field.length - 2);
              curRow.setValue(field, "");
              curRow.setValue(newField + "Code", "");
              curRow.setValue(newField + "Name", "");
              curRow.setMeta(field, "display", "");
            }
          });
        }
      });

      $(".calculation-grid-table").off("blur", "input.J-number").on("blur", "input.J-number", function (e) {
        if (!viewModel.isNumber(e.target.value)) {
          toastr.info("请输入非负数");
        }
      });

      //加载条
      viewModel.onLoading = function onLoading() {
        var centerContent =
          "<i class=\"fa fa-cloud u-loader-centerContent\"></i>";
        var opt1 = {
          hasback: true,
          hasDesc: true, //是否含有加载内容描述
          centerContent: centerContent
        };
        u.showLoader(opt1);
      };

      //关闭加载条
      viewModel.onCloseLoading = function onCloseLoading() {
        u.hideLoader();
      };
    }
  });

  return view;
});