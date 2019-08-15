define(['text!./promorule.html', 'ocm_common', 'searchbox', 'editcard', './meta.js', 'ocm_global'], function(tpl, common, searchbox, editcard) {
  'use strict'
  var app, baseData, events, rendertype, viewModel, singledocSearch;
  baseData = {
    baseurl: '/b2c/prom-rules',
    promoRuleList: new u.DataTable(promorulemeta),
    promoRuleMeta: new u.DataTable(promorulemeta),
    promoRuleItemList: new u.DataTable(promoruleitemmeta),
    productRef2: new u.DataTable(productRef2),
    productRef3: new u.DataTable(productRef3),
    productRef4: new u.DataTable(productRef4),
    includeGoodsList: new u.DataTable(promRuleGoodsIncludeMeta),
    excludeGoodsList: new u.DataTable(promRuleGoodsExcludeMeta),
    promRuleTimeRanges: new u.DataTable(promRuleTimeRanges),
    promoConditionDataSrc: [],
    listIndex: null,
    //  deliveryTimeDataSrc: [],
    //  promoTypeDataSrc: [],
    //是否递增
    isProgressiveSrc: [{
      value: "0",
      name: "否"
    }, {
      value: "1",
      name: "是"
    }],
    //启用状态
    isEnableSrc: [{
      value: "1",
      name: "启用"
    }, {
      value: "2",
      name: "停用"
    }],
    //  //排序类型
    //  orderTypeSrc: [],
    //
    isForAllSrc: [{
      value: "0",
      name: "部分商品"
    }, {
      value: "1",
      name: "全部商品"
    }],
    //跳转单据页
    goBillPanel: common.bill.goBillPanel,
    //跳转单据详情页
    goDetailPanel: common.bill.goDetailPanel,
    //返回列表页
    retListPanel: common.bill.retListPanel,

    billPanelStatus: CONST.BILLPANELSTATUS.DEFAULT

  };
  rendertype = {
    precision2Render: common.rendertype.precision2Render,
    //跳转详情页
    detailRender: function(obj) {
      var viewModel = obj.gridObj.viewModel;
      var dataTableRowId = obj.row.value['$_#_@_id'];
      var detailfun = "data-bind=click:detail.bind($data," + obj.rowIndex + "," + dataTableRowId + ")";
      obj.element.innerHTML = '<a href="#" class="ui-a-detail" ' + detailfun + '>' + obj.value + '</a>';
      ko.cleanNode(obj.element);
      ko.applyBindings(viewModel, obj.element);
    },
    operation: function(obj) {
      var delfun = "data-bind=click:del.bind($data," + obj.rowIndex + ")";
      var editfun = "data-bind=click:beforeEdit.bind($data," + obj.rowIndex + ")";
      obj.element.innerHTML = '<div class="ui-handle-icon">' +
        '<span class="ui-handle ui-tab-icon-b">' +
        '<a href="#" class="uifont icon-edit font-c-c" ' +
        editfun +
        ' title="编辑"></a>' +
        '</span>    ' +
        '<span class="ui-handle ui-tab-icon-b">' +
        '<a href="#" class="uifont icon-shanchu1 font-c-c" ' +
        delfun +
        ' title="删除"></a>' +
        '</span></div>';
      ko.cleanNode(obj.element);
      ko.applyBindings(viewModel, obj.element);
    },
  };
  events = {
    //时间范围开始
    getClientPosition: function(elem) {
      var box = void 0;
      var x = void 0;
      var y = void 0;
      var doc = elem.ownerDocument;
      var body = doc.body;
      var docElem = doc && doc.documentElement;
      box = elem.getBoundingClientRect();

      x = box.left;
      y = box.top;

      x -= docElem.clientLeft || body.clientLeft || 0;
      y -= docElem.clientTop || body.clientTop || 0;

      return {
        left: x,
        top: y
      };
    },
    getScroll: function(w, top) {
      var ret = w['page' + (top ? 'Y' : 'X') + 'Offset'];
      var method = 'scroll' + (top ? 'Top' : 'Left');
      if (typeof ret !== 'number') {
        var d = w.document;
        // ie6,7,8 standard mode
        ret = d.documentElement[method];
        if (typeof ret !== 'number') {
          // quirks mode
          ret = d.body[method];
        }
      }
      return ret;
    },

    getScrollLeft: function(w) {
      return viewModel.getScroll(w);
    },

    getScrollTop: function(w) {
      return viewModel.getScroll(w, true);
    },

    getOffset: function(el) {
      var pos = viewModel.getClientPosition(el);
      var doc = el.ownerDocument;
      var w = doc.defaultView || doc.parentWindow;
      pos.left += viewModel.getScrollLeft(w);
      pos.top += viewModel.getScrollTop(w);
      return pos;
    },
    timeOnly: function(options) {
      var grid = options.gridObj,
        datatable = grid.dataTable,
        viewModel = grid.viewModel,
        field = options.field,
        element = options.element,
        column = grid.getColumnByField(field),
        isRange = column.options.isRange;
      var pos = viewModel.getOffset(element),
        val = datatable.getValue(field),
        time = val ? val : '';
      var clickfun = 'data-bind=click:addTimePanl.bind($data,"' + field + '",' + pos.left + ',' + pos.top + ')';
      var htmlStr = '<span class="ant-time-picker ">' +
        '<input type="text" ' + clickfun + ' class="ant-time-picker-input" placeholder="选择时间" readonly="" value="' + time + '">' +
        '<span class="ant-com-time-picker-icon"></span></span>'
      $(element).html(htmlStr)
      ko.cleanNode(element);
      ko.applyBindings(viewModel, element);
      $('#timepanel div.ant-calendar-footer a.ant-calendar-ok-btn').attr('data-field', field).attr('isRange', isRange);
      if (isRange == true || isRange == 'true') {
        $('#timepanel div.ant-calendar-footer a.ant-calendar-ok-btn').attr('isRange', isRange);
      }
    },
    addTimePanl: function(field, left, top) {
      var curRow = viewModel.promRuleTimeRanges.getCurrentRow(),
        pinner = $('#timepanel div.ant-time-picker-panel-inner').first(),
        inp = pinner.find('input.ant-time-picker-panel-input'),
        uls = pinner.find('ul'),
        val = curRow.getValue(field);
      if (val && val != '') {
        inp.val(val);
        var vArr = val.split(':');
        for (var i = 0; i < 3; i++) {
          $(uls[i]).find('li.ant-time-picker-panel-select-option-selected').first().removeClass('ant-time-picker-panel-select-option-selected');
          var addC = $(uls[i]).find('li').eq(parseInt(vArr[i]));
          $(addC).addClass('ant-time-picker-panel-select-option-selected');
        }
      }
      $('#timepanel div.ant-time-picker-panel').css({
        'left': left + 'px',
        'top': top + 'px',
        'display': 'block'
      });
      $('#timepanel').css({
        'display': 'block'
      });
    },
    clearTime: function(o, e) {
      var tar = e.target,
        pinner = $(tar).parents('.ant-time-picker-panel-inner'),
        uls = pinner.find('ul');
      $('#timepanel div.ant-time-picker-panel').css({
        'display': 'none'
      });
      $(tar).prev('.ant-time-picker-panel-input').val('')
      for (var i = 0, len = uls.length; i < len; i++) {
        $(uls[i]).find('li.ant-time-picker-panel-select-option-selected').first().removeClass('ant-time-picker-panel-select-option-selected')
        $(uls[i]).find('li').first().addClass('ant-time-picker-panel-select-option-selected')
      }
    },
    selectOption: function(o, e) {
      var tar = e.target;
      if ((tar.tagName.toUpperCase() == 'LI' && !$(tar).hasClass('ant-time-picker-panel-select-option-selected')) || (tar.tagName.toUpperCase() == 'LI' && $(tar).hasClass('ant-time-picker-panel-select-option-selected') && $(tar).hasClass('zero'))) {
        // if ($(tar).hasClass('zero')) {
        //   $(tar).removeClass('zero')
        // }
        $(tar).addClass('ant-time-picker-panel-select-option-selected');
        $(tar).siblings('.ant-time-picker-panel-select-option-selected').removeClass('ant-time-picker-panel-select-option-selected');
        var pDiv = $(tar).parents('.ant-time-picker-panel-inner'),
          inp = pDiv.find('input.ant-time-picker-panel-input'),
          pinner = $(tar).parents('.ant-time-picker-panel-combobox'),
          sLis = pinner.find('li.ant-time-picker-panel-select-option-selected');
        inp.val('');
        for (var i = 0, len = sLis.length; i < len; i++) {
          if (i != 0) {
            inp.val(inp.val() + ':');
          }
          inp.val(inp.val() + sLis[i].innerText);
        }
      }
    },
    timeOk: function(o, e) {
      var tar = e.target;
      var curRow = viewModel.promRuleTimeRanges.getCurrentRow();
      var pDiv = $(tar).parents('.ant-time-picker-panel-inner'),
        inp = pDiv.find('input.ant-time-picker-panel-input'),
        field = $(tar).attr('data-field'),
        isRange = $(tar).attr('isRange'),
        uls = pDiv.find('ul'),
        isPass = true,
        val = inp.val();
      if (isRange) {
        if (field == 'beginTime') {
          var endT = curRow.getValue('endTime');
          var beginT = val;
        } else {
          var endT = val;
          var beginT = curRow.getValue('beginTime');
        }
        if (endT && endT != '' && val != '') {
          if (!beginT) {
            toastr.warning('请先输入“开始时间”！');
            return;
          }
          var bArr = beginT.split(':'),
            eArr = endT.split(':');
          for (var ei = 0; ei < 3; ei++) {
            if (parseInt(bArr[ei]) > parseInt(eArr[ei])) {
              toastr.warning('结束时间应大于等于开始时间！');
              isPass = false;
              break;
            } else if (parseInt(bArr[ei]) < parseInt(eArr[ei])) {
              isPass = true;
              break;
            }
          }
        }
      }
      if (!isPass) {
        return;
      }
      curRow.setValue(field, val);
      $('#timepanel div.ant-time-picker-panel').css({
        'display': 'none'
      });
      inp.val('');
      for (var u = 0; u < uls.length; u++) {
        $(uls[u]).find('li.ant-time-picker-panel-select-option-selected').first().removeClass('ant-time-picker-panel-select-option-selected');
        $(uls[u]).find('li').first().addClass('ant-time-picker-panel-select-option-selected');
      }

    },
    //  //时间限制
    //  disabledBegin: function (current) {
    //    var endTime = viewModel.promoRuleItemList.getValue("topPaiedTimeCeiling");
    //    if (endTime) {
    //      endTime = new Date(endTime).getTime();
    //      if (current) {
    //        current = new Date(current.format("YYYY-MM-DD")).getTime();
    //      }
    //      return current && current > endTime;
    //    }
    //  },
    //  disabledEnd: function (current) {
    //    var beginTime = viewModel.promoRuleItemList.getValue("topPaiedTimeFloor");
    //    if (beginTime) {
    //      beginTime = new Date(beginTime).getTime();
    //      if (current) {
    //        current = new Date(current.format("YYYY-MM-DD")).getTime();
    //      }
    //      return current && current < beginTime;
    //    }
    //  },
    //  //排序类型
    //  orderTypeFun: function () {
    //    var orderType = viewModel.promoRuleMeta.getValue('orderType');
    //    var name;
    //    switch (orderType) {
    //      case '0':
    //        name = '付款时间排名';
    //        break;
    //      case '1':
    //        name = '付款金额排名';
    //        break;
    //      default:
    //        name = '';
    //    }
    //    return name;
    //  },
    //是否全部商品
    isForAllFun: function() {
      var isForAll = viewModel.promoRuleMeta.getValue('isForAll');
      var name;
      switch (isForAll) {
        case 0:
          name = '部分商品';
          break;
        case 1:
          name = '全部商品';
          break;
        default:
          name = '';
      }
      return name;
    },
    //启用停用
    isEnableFun: function() {
      var isForAll = viewModel.promoRuleMeta.getValue('isEnable');
      var name;
      switch (isForAll) {
        case 2:
          name = '停用';
          break;
        case 1:
          name = '启用';
          break;
        default:
          name = '未启用';
      }
      return name;
    },
    //是否递增
    isProgressiveFun: function() {
      var isProgressive = viewModel.promoRuleMeta.getValue('isProgressive');
      var name;
      switch (isProgressive) {
        case 0:
          name = '否';
          break;
        case 1:
          name = '是';
          break;
        default:
          name = '';
      }
      return name;
    },
    reShowCols: function() {
      var grid = app.getComp("grid_item_list").grid;
      var condition = viewModel.promoRuleList.getCurrentRow().getValue("condition");
      var isProgressive = viewModel.promoRuleList.getCurrentRow().getValue("isProgressive");
      if (condition == "0" && isProgressive == "0") { //整单金额 不递增
        grid.setColumnVisibleByIndex(0, true);
        grid.setColumnVisibleByIndex(1, true);
        grid.setColumnVisibleByIndex(2, false);
        grid.setColumnVisibleByIndex(3, false);
        grid.setColumnVisibleByIndex(4, false);
        grid.setColumnVisibleByIndex(5, false);
        grid.setColumnVisibleByIndex(6, false);
        grid.setColumnVisibleByIndex(7, false);
        grid.setRequired('amountLowerLimit', true);
        grid.setRequired('amountUpperLimit', true);
        grid.setRequired('amountBase', false);
        grid.setRequired('numberLowerLimit', false);
        grid.setRequired('numberUpperLimit', false);
        grid.setRequired('numberBase', false);
        grid.setRequired('topLowerLimit', false);
        grid.setRequired('topUpperLimit', false);
        grid.repaintGridDivs();
      } else if (condition == "0" && isProgressive == "1") { //整单金额 递增
        grid.setColumnVisibleByIndex(0, false);
        grid.setColumnVisibleByIndex(1, false);
        grid.setColumnVisibleByIndex(2, true);
        grid.setColumnVisibleByIndex(3, false);
        grid.setColumnVisibleByIndex(4, false);
        grid.setColumnVisibleByIndex(5, false);
        grid.setColumnVisibleByIndex(6, false);
        grid.setColumnVisibleByIndex(7, false);
        grid.setRequired('amountLowerLimit', false);
        grid.setRequired('amountUpperLimit', false);
        grid.setRequired('amountBase', true);
        grid.setRequired('numberLowerLimit', false);
        grid.setRequired('numberUpperLimit', false);
        grid.setRequired('numberBase', false);
        grid.setRequired('topLowerLimit', false);
        grid.setRequired('topUpperLimit', false);
        grid.repaintGridDivs();
      } else if (condition == "1" && isProgressive == "0") { //整单数量 不递增
        grid.setColumnVisibleByIndex(0, false);
        grid.setColumnVisibleByIndex(1, false);
        grid.setColumnVisibleByIndex(2, false);
        grid.setColumnVisibleByIndex(3, true);
        grid.setColumnVisibleByIndex(4, true);
        grid.setColumnVisibleByIndex(5, false);
        grid.setColumnVisibleByIndex(6, false);
        grid.setColumnVisibleByIndex(7, false);
        grid.setRequired('amountLowerLimit', false);
        grid.setRequired('amountUpperLimit', false);
        grid.setRequired('amountBase', false);
        grid.setRequired('numberLowerLimit', true);
        grid.setRequired('numberUpperLimit', true);
        grid.setRequired('numberBase', false);
        grid.setRequired('topLowerLimit', false);
        grid.setRequired('topUpperLimit', false);
        grid.repaintGridDivs();
      } else if (condition == "1" && isProgressive == "1") { //整单数量 递增
        grid.setColumnVisibleByIndex(0, false);
        grid.setColumnVisibleByIndex(1, false);
        grid.setColumnVisibleByIndex(2, false);
        grid.setColumnVisibleByIndex(3, false);
        grid.setColumnVisibleByIndex(4, false);
        grid.setColumnVisibleByIndex(5, true);
        grid.setColumnVisibleByIndex(6, false);
        grid.setColumnVisibleByIndex(7, false);
        grid.setRequired('amountLowerLimit', false);
        grid.setRequired('amountUpperLimit', false);
        grid.setRequired('amountBase', false);
        grid.setRequired('numberLowerLimit', false);
        grid.setRequired('numberUpperLimit', false);
        grid.setRequired('numberBase', true);
        grid.setRequired('topLowerLimit', false);
        grid.setRequired('topUpperLimit', false);
        grid.repaintGridDivs();
      } else if (condition == "2") { //排序 付款时间
        grid.setColumnVisibleByIndex(0, false);
        grid.setColumnVisibleByIndex(1, false);
        grid.setColumnVisibleByIndex(2, false);
        grid.setColumnVisibleByIndex(3, false);
        grid.setColumnVisibleByIndex(4, false);
        grid.setColumnVisibleByIndex(5, false);
        grid.setColumnVisibleByIndex(6, true);
        grid.setColumnVisibleByIndex(7, true);
        grid.setRequired('amountLowerLimit', false);
        grid.setRequired('amountUpperLimit', false);
        grid.setRequired('amountBase', false);
        grid.setRequired('numberLowerLimit', false);
        grid.setRequired('numberUpperLimit', false);
        grid.setRequired('numberBase', false);
        grid.setRequired('topLowerLimit', true);
        grid.setRequired('topUpperLimit', true);
        grid.repaintGridDivs();
      }
    },
    //查看详情
    detail: function(obj, rowId) {
      //确保grid先将行设置为focus状态
      if (viewModel.listIndex == obj.rowIndex) {
        return true;
      } else {
        viewModel.listIndex = obj.rowIndex;
      }
      viewModel.promoRuleList.setRowSelect(obj.rowIndex);
      var id = obj.rowObj.value.id;

      var condition = viewModel.promoRuleList.getCurrentRow().getValue("condition");
      var isProgressive = viewModel.promoRuleList.getCurrentRow().getValue("isProgressive");
      var grid = app.getComp("grid_item_list_detail").grid;
      //请求完整主子表信息
      viewModel.findByParentid(id);
      if (condition == "0" && isProgressive == "0") { //整单金额 不递增
        grid.setColumnVisibleByIndex(0, true);
        grid.setColumnVisibleByIndex(1, true);
        grid.setColumnVisibleByIndex(2, false);
        grid.setColumnVisibleByIndex(3, false);
        grid.setColumnVisibleByIndex(4, false);
        grid.setColumnVisibleByIndex(5, false);
        grid.setColumnVisibleByIndex(6, false);
        grid.setColumnVisibleByIndex(7, false);
      } else if (condition == "0" && isProgressive == "1") { //整单金额 递增
        grid.setColumnVisibleByIndex(0, false);
        grid.setColumnVisibleByIndex(1, false);
        grid.setColumnVisibleByIndex(2, true);
        grid.setColumnVisibleByIndex(3, false);
        grid.setColumnVisibleByIndex(4, false);
        grid.setColumnVisibleByIndex(5, false);
        grid.setColumnVisibleByIndex(6, false);
        grid.setColumnVisibleByIndex(7, false);

      } else if (condition == "1" && isProgressive == "0") { //整单数量 不递增
        grid.setColumnVisibleByIndex(0, false);
        grid.setColumnVisibleByIndex(1, false);
        grid.setColumnVisibleByIndex(2, false);
        grid.setColumnVisibleByIndex(3, true);
        grid.setColumnVisibleByIndex(4, true);
        grid.setColumnVisibleByIndex(5, false);
        grid.setColumnVisibleByIndex(6, false);
        grid.setColumnVisibleByIndex(7, false);

      } else if (condition == "1" && isProgressive == "1") { //整单数量 递增
        grid.setColumnVisibleByIndex(0, false);
        grid.setColumnVisibleByIndex(1, false);
        grid.setColumnVisibleByIndex(2, false);
        grid.setColumnVisibleByIndex(3, false);
        grid.setColumnVisibleByIndex(4, false);
        grid.setColumnVisibleByIndex(5, true);
        grid.setColumnVisibleByIndex(6, false);
        grid.setColumnVisibleByIndex(7, false);

      } else if (condition == "2") { //排序
        grid.setColumnVisibleByIndex(0, false);
        grid.setColumnVisibleByIndex(1, false);
        grid.setColumnVisibleByIndex(2, false);
        grid.setColumnVisibleByIndex(3, false);
        grid.setColumnVisibleByIndex(4, false);
        grid.setColumnVisibleByIndex(5, false);
        grid.setColumnVisibleByIndex(6, true);
        grid.setColumnVisibleByIndex(7, true);

      }
      viewModel.billPanelStatus = CONST.BILLPANELSTATUS.DETAIL;
      // viewModel.goDetailPanel();
    },
    //弹出卡片编辑窗(通过index区分是编辑还是新增，-1为新增，大于等于0为编辑)
    beforeEdit: function(index) {
      var title;
      viewModel.index = index;
      if (index >= 0) {
        //修改操作
        title = "编辑";
        viewModel.promoRuleList.setRowFocus(index);
        var id = viewModel.promoRuleList.getCurrentRow().getValue("id");
        //请求完整主子表信息
        viewModel.findByParentid(id);
        viewModel.goBillPanel();
        viewModel.billPanelStatus = CONST.BILLPANELSTATUS.EDIT;
        viewModel.reShowCols();
      } else {
        title = "新增";
        var row = viewModel.promoRuleMeta.createEmptyRow();
        viewModel.promoRuleMeta.setRowFocus(row);
        viewModel.promoRuleItemList.removeAllRows();
        viewModel.includeGoodsList.removeAllRows();
        viewModel.excludeGoodsList.removeAllRows();
        viewModel.promRuleTimeRanges.removeAllRows();
        //      row.setValue("orderType", "0");//
        row.setValue("isProgressive", "0");
        row.setValue("isForAll", "0");
        //      row.setValue("promType", "0");//
        row.setValue("condition", "0"); //
        row.setValue("isEnable", "1"); //
        viewModel.goBillPanel();
        viewModel.billPanelStatus = CONST.BILLPANELSTATUS.ADD;
      }
    },

    //查询子表数据
    findByParentid: function(id) {
      $._ajax({
        type: "get",
        url: appCtx + viewModel.baseurl + '/detail',
        data: {
          id: id
        },
        success: function(data) {
          viewModel.promoRuleMeta.setSimpleData(data);
          viewModel.promoRuleItemList.removeAllRows();
          viewModel.promoRuleItemList.setSimpleData(data.ruleItems, {
            unSelect: true
          });
          viewModel.includeGoodsList.removeAllRows();
          viewModel.includeGoodsList.setSimpleData(data.includedGoods, {
            unSelect: true
          });
          viewModel.excludeGoodsList.removeAllRows();
          viewModel.excludeGoodsList.setSimpleData(data.excludedGoods, {
            unSelect: true
          });
          viewModel.promRuleTimeRanges.removeAllRows();
          viewModel.promRuleTimeRanges.setSimpleData(data.promRuleTimeRanges, {
            unSelect: true
          });
          if (viewModel.billPanelStatus == CONST.BILLPANELSTATUS.DETAIL) {
            if (data.includedGoods.length) {
              $('#detail_in').css('display', 'block');
              $('#detail_ex').css('display', 'none');
            }
            if (data.excludedGoods.length) {
              $('#detail_ex').css('display', 'block');
              $('#detail_in').css('display', 'none');
            }
          }
        }
      })
    },

    //删除和批量删除
    del: function(data) {
      if (typeof(data) == 'number') {
        viewModel.promoRuleList.setRowSelect(data);
      }
      var ids = [];
      var rows = viewModel.promoRuleList.getSelectedRows(),
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
              data: {
                ids: ids.join(",")
              },
              success: function(data) {
                viewModel.promoRuleList.removeRows(rowsArr);
              }
            });

          }
        });
      } else {
        toastr.warning("请先选择需要删除数据!");
      }
    },
    ladderPrice: function(obj) {
      if (!obj.newValue) {
        return;
      }
      var grid = obj.gridObj,
        datatable = grid.dataTable,
        viewModel = grid.viewModel,
        field = obj.field,
        allRows = datatable.getAllRows(),
        rowIndex = obj.rowIndex,
        thisRow = grid.getRowByIndex(rowIndex);
      var rowId = $(grid.dataSourceObj.rows[rowIndex].value).attr("$_#_@_id");
      var curRow = datatable.getRowByRowId(rowId);
      var eArr = [];
      for (var i = 0, alen = allRows.length; i < alen; i++) {
        if (allRows[i].status && allRows[i].status != "fdel") {
          eArr.push(allRows[i]);
        }
      }
      var len = eArr.length;
      // var curRow = datatable.getCurrentRow();
      var low = curRow.getValue('amountLowerLimit') ? curRow.getValue('amountLowerLimit') : curRow.getValue('numberLowerLimit') ? curRow.getValue('numberLowerLimit') : curRow.getValue('topLowerLimit');
      if (field.indexOf('Upper') != -1) {
        if (parseFloat(obj.newValue) <= parseFloat(low)) {
          curRow.setValue(field, parseFloat(low) + 1);
          toastr.warning('上限应该大于下限！');
        }
        if (rowIndex != len - 1) {
          var nexRow = grid.getRowByIndex(rowIndex + 1),
            nexLow = nexRow.value.amountLowerLimit ? nexRow.value.amountLowerLimit : nexRow.value.numberLowerLimit ? nexRow.value.numberLowerLimit : nexRow.value.topLowerLimit;
          if (parseFloat(obj.newValue) > parseFloat(nexLow)) {
            curRow.setValue(field, parseFloat(nexLow));
            toastr.warning('下一阶梯的下限应该大于前一阶梯的上限！');
          }
        }
      } else if (field.indexOf('Lower') != -1) {
        if (parseInt(rowIndex) > 0 && len > 1) {
          var preRow = grid.getRowByIndex(rowIndex - 1),
            preUpper = preRow.value.amountUpperLimit ? preRow.value.amountUpperLimit : preRow.value.numberUpperLimit ? preRow.value.numberUpperLimit : preRow.value.topUpperLimit;

          if (parseFloat(low) < parseFloat(preUpper)) {
            curRow.setValue(field, parseFloat(preUpper));
            toastr.warning('下一阶梯的下限应该大于前一阶梯的上限！');
          }
        }
        var Upper = curRow.getValue('amountUpperLimit') ? curRow.getValue('amountUpperLimit') : curRow.getValue('numberUpperLimit') ? curRow.getValue('numberUpperLimit') : curRow.getValue('topUpperLimit');
        if (Upper) {
          if (parseFloat(obj.newValue) > parseFloat(Upper)) {
            curRow.setValue(field, parseFloat(Upper) - 1);
            toastr.warning('上限应该大于下限！');
          }
        }

      }

    },
    //增行
    addRow: function() {
      var ruleRow = viewModel.promoRuleMeta.getCurrentRow();
      var condition = ruleRow.getValue('condition');
      if (condition != 2) {
        var isProgressive = ruleRow.getValue('isProgressive');
        if (isProgressive == 1 || isProgressive == '1') {
          var allRows = viewModel.promoRuleItemList.getAllRows();
          var arr = [];
          for (var i = 0, len = allRows.length; i < len; i++) {
            if (allRows[i].status && allRows[i].status != "fdel") {
              arr.push(allRows[i]);
            }
          }
          if (arr.length == 0) {
            viewModel.promoRuleItemList.createEmptyRow({
              unSelect: true
            });
            return;
          } else if (arr.length == 1) {
            toastr.warning('当前促销条件下，递增为是只能有一条规则！')
            return;
          } else {
            viewModel.promoRuleItemList.removeRows(arr);
            viewModel.promoRuleItemList.createEmptyRow({
              unSelect: true
            });
            return;
          }
        }
      }
      viewModel.promoRuleItemList.createEmptyRow({
        unSelect: true
      });
    },
    //删行
    delRow: function() {
      if (typeof(data) == 'number') {
        viewModel.promoRuleItemList.setRowSelect(data);
      }
      var ids = [];
      var rows = viewModel.promoRuleItemList.getSelectedRows();
      if (rows && rows.length > 0) {
        for (var i = 0; i < rows.length; i++) {
          ids.push(rows[i].getValue("id"));
        }
        var rows = viewModel.promoRuleItemList.getSelectedRows();
        viewModel.promoRuleItemList.removeRows(rows);
      } else {
        toastr.warning('请选择数据');
        return;
      }
    },
    addRowTime: function() {
      viewModel.promRuleTimeRanges.createEmptyRow({
        unSelect: true
      });
    },
    //删行
    delRowTime: function() {
      if (typeof(data) == 'number') {
        viewModel.promRuleTimeRanges.setRowSelect(data);
      }
      var rows = viewModel.promRuleTimeRanges.getSelectedRows();
      if (rows && rows.length > 0) {
        viewModel.promRuleTimeRanges.removeRows(rows);
      } else {
        toastr.warning('请选择数据');
        return;
      }
    },
    //增行
    addRow2: function() {
      viewModel.showRealProductRef2();
    },
    //删行
    delRow2: function() {
      if (typeof(data) == 'number') {
        viewModel.includeGoodsList.setRowSelect(data);
      }
      var ids = [];
      var rows = viewModel.includeGoodsList.getSelectedRows();
      if (rows && rows.length > 0) {
        for (var i = 0; i < rows.length; i++) {
          ids.push(rows[i].getValue("id"));
        }
        var rows = viewModel.includeGoodsList.getSelectedRows();
        viewModel.includeGoodsList.removeRows(rows);
      } else {
        toastr.warning('请选择数据');
        return;
      }
    },
    // 点击grid产品参照 触发外部真实产品参照
    showRealProductRef2: function() {
      viewModel.clearRealProductRef2();
      $("#productRefer2 .refer").trigger("click");
    },
    // 清除参照之前的选择
    clearRealProductRef2: function() {
      viewModel.productRef2.setValue("productRefer2", "");
      var refer = $("#refContainerproductRefer2").data("uui.refer");
      refer.uncheckAll();
      refer.setValue([]);
    },

    //增行
    addRow3: function() {
      viewModel.showRealProductRef3();
    },
    //删行
    delRow3: function() {
      if (typeof(data) == 'number') {
        viewModel.excludeGoodsList.setRowSelect(data);
      }
      var ids = [];
      var rows = viewModel.excludeGoodsList.getSelectedRows();
      if (rows && rows.length > 0) {
        for (var i = 0; i < rows.length; i++) {
          ids.push(rows[i].getValue("id"));
        }
        var rows = viewModel.excludeGoodsList.getSelectedRows();
        viewModel.excludeGoodsList.removeRows(rows);
      } else {
        toastr.warning('请选择数据');
        return;
      }
    },
    // 点击grid产品参照 触发外部真实产品参照
    showRealProductRef3: function() {
      viewModel.clearRealProductRef3();
      $("#productRefer3 .refer").trigger("click");
    },
    // 清除参照之前的选择
    clearRealProductRef3: function() {
      viewModel.productRef3.setValue("productRefer3", "");
      var refer = $("#refContainerproductRefer3").data("uui.refer");
      refer.uncheckAll();
      refer.setValue([]);
    },

    //增行
    addRow4: function() {
      viewModel.showRealProductRef4();
    },
    //删行
    delRow4: function() {
      if (typeof(data) == 'number') {
        viewModel.excludeGoodsList.setRowSelect(data);
      }
      var ids = [];
      var rows = viewModel.excludeGoodsList.getSelectedRows();
      if (rows && rows.length > 0) {
        for (var i = 0; i < rows.length; i++) {
          ids.push(rows[i].getValue("id"));
        }
        var rows = viewModel.excludeGoodsList.getSelectedRows();
        viewModel.excludeGoodsList.removeRows(rows);
      } else {
        toastr.warning('请选择数据');
        return;
      }
    },
    // 点击grid产品参照 触发外部真实产品参照
    showRealProductRef4: function() {
      viewModel.clearRealProductRef4();
      $("#productRefer4 .refer").trigger("click");
    },
    // 清除参照之前的选择
    clearRealProductRef4: function() {
      viewModel.productRef4.setValue("productRefer4", "");
      var refer = $("#refContainerproductRefer4").data("uui.refer");
      refer.uncheckAll();
      refer.setValue([]);
    },

    //保存单据
    saveBill: function() {
      var type = "post";
      $('#timepanel').find('a.ant-time-picker-panel-clear-btn').first().trigger('click');
      if (viewModel.billPanelStatus !== CONST.BILLPANELSTATUS.ADD && viewModel.billPanelStatus !== CONST.BILLPANELSTATUS.COPY) {
        type = "put";
      }
      var promoRuleData = viewModel.promoRuleMeta.getCurrentRow().getSimpleData();
      var promoItemListData = viewModel.promoRuleItemList.getSimpleData() || [];
      var includeGoodsData = viewModel.includeGoodsList.getSimpleData() || [];
      var excludeGoodsData = viewModel.excludeGoodsList.getSimpleData() || [];
      var promRuleTimeRanges = viewModel.promRuleTimeRanges.getSimpleData() || [];
      for (var p = 0, len = promoItemListData.length; p < len; p++) {
        if (promoItemListData[p].persistStatus == 'new') {
          promoItemListData[p].id = '';
        }
      }
      promoRuleData.ruleItems = promoItemListData;
      promoRuleData.includedGoods = includeGoodsData;
      promoRuleData.excludedGoods = excludeGoodsData;
      promoRuleData.promRuleTimeRanges = promRuleTimeRanges;
      var validate = $("#validate")[0];
      var result = app.compsValidateMultiParam({
        element: validate,
        showMsg: true
      });

      if (promoItemListData.length == 0) {
        toastr.warning('促销方式列表不可为空');
        return;
      }
      if (viewModel.promoRuleMeta.getCurrentRow().getValue("isForAll") == 0 && includeGoodsData.length == 0) {
        toastr.warning('包含商品列表不可为空');
        return;
      }
      if (result.passed) {
        $._ajax({
          url: appCtx + viewModel.baseurl,
          type: type,
          data: JSON.stringify(promoRuleData),
          contentType: "application/json; charset=utf-8",
          success: function(data) {
            viewModel.search();
            viewModel.retListPanel();
          }
        });
      }
    },
    //点击取消 单据页
    cancelBill: function() {
      $('#timepanel').find('a.ant-time-picker-panel-clear-btn').first().trigger('click');
      viewModel.retListPanel();
    },

    //根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
    search: function(reindex) {
      if (reindex) {
        viewModel.promoRuleList.pageIndex(0);
      }
      viewModel.promoRuleList.removeAllRows();
      var queryData = singledocSearch.getDataWithOpr();
      queryData.size = viewModel.promoRuleList.pageSize();
      queryData.page = viewModel.promoRuleList.pageIndex();
      $._ajax({
        type: "get",
        url: appCtx + viewModel.baseurl,
        dataType: "json",
        data: queryData,
        success: function(data) {
          viewModel.promoRuleList.setSimpleData(data.content, {
            unSelect: true
          });
          viewModel.promoRuleList.totalRow(data.totalElements);
          viewModel.promoRuleList.totalPages(data.totalPages);
          viewModel.listIndex = null;
        }
      })
    },
    //清空搜索条件
    cleanSearch: function() {
      singledocSearch.clearSearch();
    },
    //启用
    enable: function() {
      var selectedRows = viewModel.promoRuleList.getSelectedRows();
      var ids = [];
      if (selectedRows && selectedRows.length > 0) {
        for (var i = 0; i < selectedRows.length; i++) {
          ids.push(selectedRows[i].getValue("id"));
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
              selectedRows[i].setValue("isEnable", "1");
            }
          }
        })
      } else {
        toastr.warning("请先选择需要启用数据");
      }
    },
    //停用
    disable: function() {
      var selectedRows = viewModel.promoRuleList.getSelectedRows();
      var ids = [];
      if (selectedRows && selectedRows.length > 0) {
        for (var i = 0; i < selectedRows.length; i++) {
          ids.push(selectedRows[i].getValue("id"));
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
              selectedRows[i].setValue("isEnable", "2");
            }
          }
        })
      } else {
        toastr.warning("请先选择需要停用数据")
      }
    },
    //页码改变时的回调函数
    pageChange: function(index) {
      viewModel.promoRuleList.pageIndex(index);
      viewModel.search();
    },
    //页码改变时的回调函数
    sizeChange: function(size) {
      viewModel.promoRuleList.pageSize(size);
      viewModel.search(true);
    }
  }
  viewModel = u.extend({}, baseData, events, common.rendertype, rendertype);

  function appInit(element, params) {

    //将模板页渲染到页面上
    element.innerHTML = tpl;
    //将viewModel和页面上的元素绑定并初始化u-meta声明的组件

    //促销条件
    $._ajax({
      type: "get",
      url: appCtx + "/b2c/enum-service/data",
      async: false,
      data: {
        enumClassName: "com.yonyou.ocm.prom.enums.PromRuleTypeEnum"
      },
      success: function(data) {
        var newarray = common.dataconvert.toMap(data, "name", "code");
        viewModel.promoConditionDataSrc = newarray;
      }
    });
    app = u.createApp({
      el: element,
      model: viewModel
    });

    // 查询组件初始化
    singledocSearch = new searchbox(
      $("#PromoActivity-searchcontent")[0], [{

          type: "text",
          key: "name",
          label: "促销规则名称",
        }, {
          type: "combo",
          key: "condition",
          label: "促销条件",
          dataSource: viewModel.promoConditionDataSrc
        }, {
          type: "radio",
          key: "isEnable",
          label: "启用状态",
          dataSource: [{
            value: '',
            name: '全部'
          }, {
            value: '1',
            name: '启用'
          }, {
            value: '2',
            name: '停用'
          }, {
            value: '0',
            name: '未启用'
          }]
        },
        //    {
        //      type: "combo",
        //      key: "deliveryTime",
        //      label: "赠品发货时机",
        //      dataSource: viewModel.deliveryTimeDataSrc
        //    }
      ]);
    // 列表查询数据(无查询条件)

    viewModel.search();

    var productRow2 = viewModel.productRef2.createEmptyRow();
    viewModel.productRef2.setRowFocus(productRow2);

    var productRow3 = viewModel.productRef3.createEmptyRow();
    viewModel.productRef3.setRowFocus(productRow3);

    var productRow4 = viewModel.productRef4.createEmptyRow();
    viewModel.productRef4.setRowFocus(productRow4);

  }

  function afterRender() {
    // 初始化折叠面板
    $.fn.collapsepanel(false, true);
    //绑定输入框enter事件
    $('#CustDocDef-searchcontent input').off("keydown").on("keydown", function(e) {
      if (e.keyCode == 13) {
        $(this).blur();
        viewModel.search();
      }
    });
    // 更改促销条件事件
    viewModel.promoRuleMeta.on("condition.valuechange", function(obj) {
      if (!obj.newValue) {
        return;
      }
      viewModel.promoRuleItemList.setAllRowsSelect();
      var delAllRows = viewModel.promoRuleItemList.getSelectedRows();
      viewModel.promoRuleItemList.removeRows(delAllRows);
      var grid = app.getComp("grid_item_list").grid;
      var condition = obj.rowObj.getValue('condition'); //促销条件
      var isProgressive = obj.rowObj.getValue('isProgressive'); //是否递增
      if (condition == "0" && isProgressive == "0") { //整单金额 不递增
        grid.setColumnVisibleByIndex(0, true);
        grid.setColumnVisibleByIndex(1, true);
        grid.setColumnVisibleByIndex(2, false);
        grid.setColumnVisibleByIndex(3, false);
        grid.setColumnVisibleByIndex(4, false);
        grid.setColumnVisibleByIndex(5, false);
        grid.setColumnVisibleByIndex(6, false);
        grid.setColumnVisibleByIndex(7, false);
        grid.setRequired('amountLowerLimit', true);
        grid.setRequired('amountUpperLimit', true);
        grid.setRequired('amountBase', false);
        grid.setRequired('numberLowerLimit', false);
        grid.setRequired('numberUpperLimit', false);
        grid.setRequired('numberBase', false);
        grid.setRequired('topLowerLimit', false);
        grid.setRequired('topUpperLimit', false);
        grid.repaintGridDivs();
      } else if (condition == "0" && isProgressive == "1") { //整单金额 递增
        grid.setColumnVisibleByIndex(0, false);
        grid.setColumnVisibleByIndex(1, false);
        grid.setColumnVisibleByIndex(2, true);
        grid.setColumnVisibleByIndex(3, false);
        grid.setColumnVisibleByIndex(4, false);
        grid.setColumnVisibleByIndex(5, false);
        grid.setColumnVisibleByIndex(6, false);
        grid.setColumnVisibleByIndex(7, false);
        grid.setRequired('amountLowerLimit', false);
        grid.setRequired('amountUpperLimit', false);
        grid.setRequired('amountBase', true);
        grid.setRequired('numberLowerLimit', false);
        grid.setRequired('numberUpperLimit', false);
        grid.setRequired('numberBase', false);
        grid.setRequired('topLowerLimit', false);
        grid.setRequired('topUpperLimit', false);
        grid.repaintGridDivs();
      } else if (condition == "1" && isProgressive == "0") { //整单数量 不递增
        grid.setColumnVisibleByIndex(0, false);
        grid.setColumnVisibleByIndex(1, false);
        grid.setColumnVisibleByIndex(2, false);
        grid.setColumnVisibleByIndex(3, true);
        grid.setColumnVisibleByIndex(4, true);
        grid.setColumnVisibleByIndex(5, false);
        grid.setColumnVisibleByIndex(6, false);
        grid.setColumnVisibleByIndex(7, false);
        grid.setRequired('amountLowerLimit', false);
        grid.setRequired('amountUpperLimit', false);
        grid.setRequired('amountBase', false);
        grid.setRequired('numberLowerLimit', true);
        grid.setRequired('numberUpperLimit', true);
        grid.setRequired('numberBase', false);
        grid.setRequired('topLowerLimit', false);
        grid.setRequired('topUpperLimit', false);
        grid.repaintGridDivs();
      } else if (condition == "1" && isProgressive == "1") { //整单数量 递增
        grid.setColumnVisibleByIndex(0, false);
        grid.setColumnVisibleByIndex(1, false);
        grid.setColumnVisibleByIndex(2, false);
        grid.setColumnVisibleByIndex(3, false);
        grid.setColumnVisibleByIndex(4, false);
        grid.setColumnVisibleByIndex(5, true);
        grid.setColumnVisibleByIndex(6, false);
        grid.setColumnVisibleByIndex(7, false);
        grid.setRequired('amountLowerLimit', false);
        grid.setRequired('amountUpperLimit', false);
        grid.setRequired('amountBase', false);
        grid.setRequired('numberLowerLimit', false);
        grid.setRequired('numberUpperLimit', false);
        grid.setRequired('numberBase', true);
        grid.setRequired('topLowerLimit', false);
        grid.setRequired('topUpperLimit', false);
        grid.repaintGridDivs();
      } else if (condition == "2") { //排序 付款时间
        grid.setColumnVisibleByIndex(0, false);
        grid.setColumnVisibleByIndex(1, false);
        grid.setColumnVisibleByIndex(2, false);
        grid.setColumnVisibleByIndex(3, false);
        grid.setColumnVisibleByIndex(4, false);
        grid.setColumnVisibleByIndex(5, false);
        grid.setColumnVisibleByIndex(6, true);
        grid.setColumnVisibleByIndex(7, true);
        grid.setRequired('amountLowerLimit', false);
        grid.setRequired('amountUpperLimit', false);
        grid.setRequired('amountBase', false);
        grid.setRequired('numberLowerLimit', false);
        grid.setRequired('numberUpperLimit', false);
        grid.setRequired('numberBase', false);
        grid.setRequired('topLowerLimit', true);
        grid.setRequired('topUpperLimit', true);
        grid.repaintGridDivs();
        obj.rowObj.setValue('isProgressive', 0);
      }
    });

    //更改是否递增事件
    viewModel.promoRuleMeta.on("isProgressive.valuechange", function(obj) {
      if (!obj.newValue) {
        return;
      }
      viewModel.promoRuleItemList.setAllRowsSelect();
      var delAllRows = viewModel.promoRuleItemList.getSelectedRows();
      viewModel.promoRuleItemList.removeRows(delAllRows);
      var grid = app.getComp("grid_item_list").grid;
      var condition = obj.rowObj.getValue('condition'); //促销条件
      var isProgressive = obj.rowObj.getValue('isProgressive'); //是否递增
      if (condition == "0" && isProgressive == "0") { //整单金额 不递增
        grid.setColumnVisibleByIndex(0, true);
        grid.setColumnVisibleByIndex(1, true);
        grid.setColumnVisibleByIndex(2, false);
        grid.setColumnVisibleByIndex(3, false);
        grid.setColumnVisibleByIndex(4, false);
        grid.setColumnVisibleByIndex(5, false);
        grid.setColumnVisibleByIndex(6, false);
        grid.setColumnVisibleByIndex(7, false);
        grid.setRequired('amountLowerLimit', true);
        grid.setRequired('amountUpperLimit', true);
        grid.setRequired('amountBase', false);
        grid.setRequired('numberLowerLimit', false);
        grid.setRequired('numberUpperLimit', false);
        grid.setRequired('numberBase', false);
        grid.setRequired('topLowerLimit', false);
        grid.setRequired('topUpperLimit', false);
        grid.repaintGridDivs();
      } else if (condition == "0" && isProgressive == "1") { //整单金额 递增
        grid.setColumnVisibleByIndex(0, false);
        grid.setColumnVisibleByIndex(1, false);
        grid.setColumnVisibleByIndex(2, true);
        grid.setColumnVisibleByIndex(3, false);
        grid.setColumnVisibleByIndex(4, false);
        grid.setColumnVisibleByIndex(5, false);
        grid.setColumnVisibleByIndex(6, false);
        grid.setColumnVisibleByIndex(7, false);
        grid.setRequired('amountLowerLimit', false);
        grid.setRequired('amountUpperLimit', false);
        grid.setRequired('amountBase', true);
        grid.setRequired('numberLowerLimit', false);
        grid.setRequired('numberUpperLimit', false);
        grid.setRequired('numberBase', false);
        grid.setRequired('topLowerLimit', false);
        grid.setRequired('topUpperLimit', false);
        grid.repaintGridDivs();
      } else if (condition == "1" && isProgressive == "0") { //整单数量 不递增
        grid.setColumnVisibleByIndex(0, false);
        grid.setColumnVisibleByIndex(1, false);
        grid.setColumnVisibleByIndex(2, false);
        grid.setColumnVisibleByIndex(3, true);
        grid.setColumnVisibleByIndex(4, true);
        grid.setColumnVisibleByIndex(5, false);
        grid.setColumnVisibleByIndex(6, false);
        grid.setColumnVisibleByIndex(7, false);
        grid.setRequired('amountLowerLimit', false);
        grid.setRequired('amountUpperLimit', false);
        grid.setRequired('amountBase', false);
        grid.setRequired('numberLowerLimit', true);
        grid.setRequired('numberUpperLimit', true);
        grid.setRequired('numberBase', false);
        grid.setRequired('topLowerLimit', false);
        grid.setRequired('topUpperLimit', false);
        grid.repaintGridDivs();
      } else if (condition == "1" && isProgressive == "1") { //整单数量 递增
        grid.setColumnVisibleByIndex(0, false);
        grid.setColumnVisibleByIndex(1, false);
        grid.setColumnVisibleByIndex(2, false);
        grid.setColumnVisibleByIndex(3, false);
        grid.setColumnVisibleByIndex(4, false);
        grid.setColumnVisibleByIndex(5, true);
        grid.setColumnVisibleByIndex(6, false);
        grid.setColumnVisibleByIndex(7, false);
        grid.setRequired('amountLowerLimit', false);
        grid.setRequired('amountUpperLimit', false);
        grid.setRequired('amountBase', false);
        grid.setRequired('numberLowerLimit', false);
        grid.setRequired('numberUpperLimit', false);
        grid.setRequired('numberBase', true);
        grid.setRequired('topLowerLimit', false);
        grid.setRequired('topUpperLimit', false);
        grid.repaintGridDivs();
      } else if (condition == "2") { //排序 付款时间
        grid.setColumnVisibleByIndex(0, false);
        grid.setColumnVisibleByIndex(1, false);
        grid.setColumnVisibleByIndex(2, false);
        grid.setColumnVisibleByIndex(3, false);
        grid.setColumnVisibleByIndex(4, false);
        grid.setColumnVisibleByIndex(5, false);
        grid.setColumnVisibleByIndex(6, true);
        grid.setColumnVisibleByIndex(7, true);
        grid.setRequired('amountLowerLimit', false);
        grid.setRequired('amountUpperLimit', false);
        grid.setRequired('amountBase', false);
        grid.setRequired('numberLowerLimit', false);
        grid.setRequired('numberUpperLimit', false);
        grid.setRequired('numberBase', false);
        grid.setRequired('topLowerLimit', true);
        grid.setRequired('topUpperLimit', true);
        grid.repaintGridDivs();
        if (obj.newValue == 1 || obj.newValue == "1") {
          obj.rowObj.setValue('isProgressive', 0);
          toastr.warning('促销条件为排名时，不允许递增！')
        }

      }

    });


    // 产品参照选择，为产品所在行增加多个包件行
    viewModel.productRef2.on("productRefer2.valuechange", function(obj) {
      if (!obj.newValue) {
        return;
      }
      var refValues = $("#refContainerproductRefer2").data("uui.refer").values;
      var selecRows = [];

      if (refValues && refValues.length > 0) {
        var newRows = [];
        for (var i = 0; i < refValues.length; i++) {
          var newRow = undefined;
          newRow = new u.Row({
            parent: viewModel.includeGoodsList
          });
          //判断是否存在row
          var row = viewModel.includeGoodsList.getRowByField("goodsCode", refValues[i].refcode);
          var row1 = viewModel.excludeGoodsList.getRowByField("goodsCode", refValues[i].refcode);
          if (!row && !row1) {
            newRows.push(newRow);
            selecRows.push(newRow);
          }
          newRow.setValue("goodsName", refValues[i].refname);
          newRow.setValue("goodsCode", refValues[i].refcode);
          newRow.setValue("goodsId", refValues[i].id);
        }
        viewModel.includeGoodsList.insertRows(0, newRows);
      }

    });

    // 产品参照选择，为产品所在行增加多个包件行
    viewModel.productRef3.on("productRefer3.valuechange", function(obj) {
      if (!obj.newValue) {
        return;
      }
      var refValues = $("#refContainerproductRefer3").data("uui.refer").values;
      var selecRows = [];

      if (refValues && refValues.length > 0) {
        var newRows = [];
        for (var i = 0; i < refValues.length; i++) {
          var newRow = undefined;
          newRow = new u.Row({
            parent: viewModel.excludeGoodsList
          });
          //判断是否存在row
          var row = viewModel.excludeGoodsList.getRowByField("goodsCode", refValues[i].refcode);
          var row1 = viewModel.includeGoodsList.getRowByField("goodsCode", refValues[i].refcode);
          if (!row && !row1) {
            newRows.push(newRow);
            selecRows.push(newRow);
          }
          newRow.setValue("goodsName", refValues[i].refname);
          newRow.setValue("goodsCode", refValues[i].refcode);
          newRow.setValue("goodsId", refValues[i].id);
        }
        viewModel.excludeGoodsList.insertRows(0, newRows);
      }

    });

    // 产品参照选择，为产品所在行增加多个包件行
    viewModel.productRef4.on("productRefer4.valuechange", function(obj) {
      if (!obj.newValue) {
        return;
      }
      var refValues = $("#refContainerproductRefer4").data("uui.refer").values;
      var selecRows = [];

      if (refValues && refValues.length > 0) {
        var newRows = [];
        for (var i = 0; i < refValues.length; i++) {
          var newRow = undefined;
          newRow = new u.Row({
            parent: viewModel.excludeGoodsList
          });
          //判断是否存在row
          var row = viewModel.excludeGoodsList.getRowByField("goodsCode", refValues[i].refcode);
          if (!row) {
            newRows.push(newRow);
            selecRows.push(newRow);
          }
          newRow.setValue("goodsName", refValues[i].refname);
          newRow.setValue("goodsCode", refValues[i].refcode);
          newRow.setValue("goodsId", refValues[i].id);
        }
        viewModel.excludeGoodsList.insertRows(0, newRows);
      }

    });

    //选择方式改变事件
    viewModel.promoRuleMeta.on("isForAll.valuechange", function(obj) {
      if (!obj.newValue) {
        return;
      }
      viewModel.includeGoodsList.removeAllRows();
      viewModel.excludeGoodsList.removeAllRows();
    });

  }

  function init(element, params) {
    appInit(element, params);
    afterRender();
    window.vm = viewModel;
    window.app = app;
  }

  return {
    init: init
  }
});