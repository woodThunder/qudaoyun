define(['text!./promobill.html', 'ocm_common', 'searchbox', 'editcard', './meta.js', 'ocm_global'], function(tpl, common, searchbox, editcard) {
  'use strict'
  var app, baseData, events, rendertype, viewModel, singledocSearch, editRules = [],
    oldRuleId;
  baseData = {
    baseurl: '/b2c/promotions',
    promoFormList: new u.DataTable(promotionMeta),
    promoFormMeta: new u.DataTable(promotionMeta),
    promoFormItemList: new u.DataTable(promorulemeta),
    promoRuleMeta: new u.DataTable(promorulemeta),
    promoruleitemList: new u.DataTable(promoruleitemmeta),
    platformStoreList: new u.DataTable(platformstoremeta),
    excludeGoodsList: new u.DataTable(promRuleGoodsExcludeMeta),
    platList: new u.DataTable(platItem),
    ItemRefList: new u.DataTable(ItemRef),
    productRef4: new u.DataTable(productRef4),
    productRef2: new u.DataTable(productRef2),
    // ruleRef: new u.DataTable(ruleRef),
    includeGoodsList: new u.DataTable(promRuleGoodsIncludeMeta),
    promRuleTimeRanges: new u.DataTable(promRuleTimeRanges),
    listIndex: null,
    ruleTypeSrc: [],
    promTypeSrc: [],
    promTypeListSrc: [],
    promTimeTypeSrc: [],
    deliveryTimeSrc: [],
    //是否递增
    isProgressiveSrc: [{
      value: "0",
      name: "否"
    }, {
      value: "1",
      name: "是"
    }],
    //是否互斥
    isRejectedSrc: [{
      value: "0",
      name: "否"
    }, {
      value: "1",
      name: "是"
    }],
    //启用状态
    isEnableSrc: [{
      value: "0",
      name: "未启用"
    }, {
      value: "1",
      name: "启用"
    }, {
      value: "2",
      name: "停用"
    }],
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
    getClientPosition: function(elem) {
      var box = void 0;
      var x = void 0;
      var y = void 0;
      var doc = elem.ownerDocument;
      var body = doc.body;
      var docElem = doc && doc.documentElement;
      // 根据 GBS 最新数据，A-Grade Browsers 都已支持 getBoundingClientRect 方法，不用再考虑传统的实现方式
      box = elem.getBoundingClientRect();

      // 注：jQuery 还考虑减去 docElem.clientLeft/clientTop
      // 但测试发现，这样反而会导致当 html 和 body 有边距/边框样式时，获取的值不正确
      // 此外，ie6 会忽略 html 的 margin 值，幸运地是没有谁会去设置 html 的 margin

      x = box.left;
      y = box.top;

      // In IE, most of the time, 2 extra pixels are added to the top and left
      // due to the implicit 2-pixel inset border.  In IE6/7 quirks mode and
      // IE6 standards mode, this border can be overridden by setting the
      // document element's border to zero -- thus, we cannot rely on the
      // offset always being 2 pixels.

      // In quirks mode, the offset can be determined by querying the body's
      // clientLeft/clientTop, but in standards mode, it is found by querying
      // the document element's clientLeft/clientTop.  Since we already called
      // getClientBoundingRect we have already forced a reflow, so it is not
      // too expensive just to query them all.

      // ie 下应该减去窗口的边框吧，毕竟默认 absolute 都是相对窗口定位的
      // 窗口边框标准是设 documentElement ,quirks 时设置 body
      // 最好禁止在 body 和 html 上边框 ，但 ie < 9 html 默认有 2px ，减去
      // 但是非 ie 不可能设置窗口边框，body html 也不是窗口 ,ie 可以通过 html,body 设置
      // 标准 ie 下 docElem.clientTop 就是 border-top
      // ie7 html 即窗口边框改变不了。永远为 2
      // 但标准 firefox/chrome/ie9 下 docElem.clientTop 是窗口边框，即使设了 border-top 也为 0

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
    //时间范围开始
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
    //时间范围结束
    //是否互斥
    isRejectedFun: function() {
      var isRejected = viewModel.promoFormMeta.getValue('isMutex');
      var name;
      switch (isRejected) {
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
      var isEnable = viewModel.promoFormMeta.getValue('isEnable');
      var name;
      switch (isEnable) {
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
    //促销类型
    isTypeFun: function() {
      var isEnable = viewModel.promoFormMeta.getValue('type');
      var name;
      switch (isEnable) {
        case '0':
          name = '整单';
          break;
        case '1':
          name = '累计';
          break;
        case '2':
          name = '排名';
          break;
      }
      return name;
    },
    //促销时间类型
    isTimeTypeFun: function() {
      var isEnable = viewModel.promoFormMeta.getValue('timeType');
      var name;
      switch (isEnable) {
        case '0':
          name = '下单时间';
          break;
        case '1':
          name = '支付时间';
          break;
      }
      return name;
    },
    //选择一个规则
    rowSelectedFun: function(obj, refFromeRuleId, idStr) {
      if (obj.rowId) {
        var rowId = obj.rowId;
      } else {
        var grid = obj.gridObj,
          rowIndex = obj.rowIndex;
        var datatable = grid.dataTable;
        var rowId = $(grid.dataSourceObj.rows[rowIndex].value).attr("$_#_@_id");
      }
      var rulList = viewModel.promoFormItemList.getRowByRowId(rowId), //当前行
        ruleId = rulList.getValue('ruleId');
      if (!rulList.getValue('code') && !refFromeRuleId) return true;
      if (oldRuleId == ruleId) {
        if (!refFromeRuleId) {
          return true;
        }
      } else {
        var oldList = viewModel.promoFormItemList.getRowByField('ruleId', oldRuleId);
        if ($('#rulesdetail').css('display') == 'block') { //之前已经有打开的规则,把它存到editRules里
          viewModel.promoRuleMeta.setValue('priority', oldList.getValue('priority'));
          viewModel.promoRuleMeta.setValue('fromRuleId', oldList.getValue('fromRuleId'));
          viewModel.promoRuleMeta.setValue('name', oldList.getValue('name'));
          viewModel.promoRuleMeta.setValue('code', oldList.getValue('code'));
          viewModel.promoRuleMeta.setValue('condition', oldList.getValue('condition'));
          viewModel.promoRuleMeta.setValue('isProgressive', oldList.getValue('isProgressive'));
          viewModel.promoRuleMeta.setValue('persistStatus', oldList.getValue('persistStatus'));
          var mainRule = viewModel.promoRuleMeta.getSimpleData(), //规则设置
            promoruleitem = viewModel.promoruleitemList.getSimpleData(), //规则详情
            goodsList = viewModel.includeGoodsList.getSimpleData(), //适用商品列表
            exGoodsList = viewModel.excludeGoodsList.getSimpleData(), //不适用的商品列表
            timeRanges = viewModel.promRuleTimeRanges.getSimpleData(), //时间范围
            oldId = oldRuleId, //之前的fromRuleId
            flage = false; //之前没点过
          for (var e = 0; e < editRules.length; e++) {
            if (editRules[e].id == oldId) {
              flage = true; //之前点过
              editRules[e].ruleItems = promoruleitem; //规则详情
              editRules[e].promRules = mainRule; //规则设置
              editRules[e].includedGoods = goodsList;
              editRules[e].excludedGoods = exGoodsList;
              editRules[e].promRuleTimeRanges = timeRanges;
              break;
            }
          }
          if (!flage) {
            editRules.push({
              'id': oldRuleId,
              'ruleItems': promoruleitem,
              'promRules': mainRule,
              'includedGoods': goodsList,
              'excludedGoods': exGoodsList,
              'promRuleTimeRanges': timeRanges
            });
          }
        }
      }
      // var selectRowData = rulList.getSimpleData(),
      var isHas = false; //如果之前没有存储在数组里    
      oldRuleId = ruleId;

      for (var r = 0; r < editRules.length; r++) { //如果之前有存储在数组里的就从数组里读取
        if (editRules[r].id == ruleId) {
          isHas = true; //之前点过
          viewModel.promoRuleMeta.removeAllRows();
          viewModel.promoRuleMeta.setSimpleData(editRules[r].promRules);
          viewModel.promoruleitemList.removeAllRows();
          viewModel.promoruleitemList.setSimpleData(editRules[r].ruleItems, {
            unSelect: true
          });
          viewModel.reShowCols(obj);
          viewModel.includeGoodsList.removeAllRows();
          viewModel.includeGoodsList.setSimpleData(editRules[r].includedGoods, {
            unSelect: true
          });
          viewModel.excludeGoodsList.removeAllRows();
          viewModel.excludeGoodsList.setSimpleData(editRules[r].excludedGoods, {
            unSelect: true
          });
          viewModel.promRuleTimeRanges.setSimpleData(editRules[r].promRuleTimeRanges, {
            unSelect: true
          });
          $('#rulesdetail').css('display', 'block');
          break;
        }
      }
      if (isHas) {} else { //如果没有就发请求
        if (!refFromeRuleId) { //新增的空规则
          viewModel.promoRuleMeta.removeAllRows();
          viewModel.promoruleitemList.removeAllRows();
          viewModel.includeGoodsList.removeAllRows();
          viewModel.excludeGoodsList.removeAllRows();
          viewModel.promRuleTimeRanges.removeAllRows();

          rulList.setValue('condition', '0'); //条件
          rulList.setValue('isProgressive', '0'); //递增
          var tempRow = viewModel.promoRuleMeta.createEmptyRow();
          tempRow.setValue('isForAll', "0");
          $('#rulesdetail').css('display', 'block');
          return true;
        }
        $._ajax({
          type: "get",
          url: appCtx + '/b2c/prom-rules' + '/detail',
          data: {
            id: refFromeRuleId
          },
          success: function(data) {
            viewModel.promoRuleMeta.setSimpleData(data);
            viewModel.promoFormItemList.getCurrentRow().setValue('isProgressive', data.isProgressive);
            viewModel.promoruleitemList.removeAllRows();
            viewModel.promoruleitemList.setSimpleData(data.ruleItems, {
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
            $('#rulesdetail').css('display', 'block');
          }
        })
      }
      return true;
    },
    //时间限制
    disabledBegin: function(current) {
      var endTime = viewModel.promoFormItemList.getValue("endDate");
      if (endTime) {
        endTime = new Date(endTime).getTime();
        if (current) {
          current = new Date(current.format("YYYY-MM-DD")).getTime();
        }
        return current && current > endTime;
      }
    },
    disabledEnd: function(current) {
      var beginTime = viewModel.promoFormItemList.getValue("startDate");
      if (beginTime) {
        beginTime = new Date(beginTime).getTime();
        if (current) {
          current = new Date(current.format("YYYY-MM-DD")).getTime();
        }
        return current && current < beginTime;
      }
    },
    //查看详情
    detail: function(obj, rowId) {
      if ($('div.ui-bill-panel').css('display') !== 'none') {
        return;
      }
      //确保grid先将行设置为focus状态
      if (viewModel.listIndex == obj.rowIndex) {
        return true;
      } else {
        viewModel.listIndex = obj.rowIndex;
      }
      viewModel.promoFormList.setRowSelect(obj.rowIndex);
      var id = obj.rowObj.value.id;
      // if (viewModel.billPanelStatus != CONST.BILLPANELSTATUS.EDIT) {
      viewModel.billPanelStatus = CONST.BILLPANELSTATUS.DETAIL;
      // }
      //请求完整主子表信息
      viewModel.findByParentid(id);
      // viewModel.goDetailPanel();
    },
    //根据促销条件判断显示字段
    reShowCols: function(obj) {
      // if (viewModel.billPanelStatus == CONST.BILLPANELSTATUS.DETAIL) {
      var grid = app.getComp("grid_item_detail").grid;
      // } else {
      var grid1 = app.getComp("grid_item_edit").grid;
      // viewModel.billPanelStatus = CONST.BILLPANELSTATUS.DEFAULT;
      // }
      if (obj.rowId) {
        var rowId = obj.rowId;
      } else {
        var gridRules = obj.gridObj,
          rowIndex = obj.rowIndex;
        var datatable = gridRules.dataTable;
        var rowId = $(gridRules.dataSourceObj.rows[rowIndex].value).attr("$_#_@_id");
      }
      var rulList = viewModel.promoFormItemList.getRowByRowId(rowId), //当前行
        condition = rulList.getValue("condition"),
        isProgressive = rulList.getValue("isProgressive") || "0";
      if (!condition) {
        var condition = '0';
        var isProgressive = "0";
      }
      var isMutex = viewModel.promoFormMeta.getCurrentRow().getValue('isMutex'); //规则互斥
      var ruleGrid = app.getComp("grid_item_list").grid;
      if (isMutex == '0' || isMutex == 0) {
        ruleGrid.setColumnVisibleByIndex(0, false);
      } else {
        ruleGrid.setColumnVisibleByIndex(0, true);
        ruleGrid.setRequired('priority', true);
      }
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

        grid1.setColumnVisibleByIndex(0, true);
        grid1.setColumnVisibleByIndex(1, true);
        grid1.setColumnVisibleByIndex(2, false);
        grid1.setColumnVisibleByIndex(3, false);
        grid1.setColumnVisibleByIndex(4, false);
        grid1.setColumnVisibleByIndex(5, false);
        grid1.setColumnVisibleByIndex(6, false);
        grid1.setColumnVisibleByIndex(7, false);
        grid1.setRequired('amountLowerLimit', true);
        grid1.setRequired('amountUpperLimit', true);
        grid1.setRequired('amountBase', false);
        grid1.setRequired('numberLowerLimit', false);
        grid1.setRequired('numberUpperLimit', false);
        grid1.setRequired('numberBase', false);
        grid1.setRequired('topLowerLimit', false);
        grid1.setRequired('topUpperLimit', false);
        grid1.repaintGridDivs();
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

        grid1.setColumnVisibleByIndex(0, false);
        grid1.setColumnVisibleByIndex(1, false);
        grid1.setColumnVisibleByIndex(2, true);
        grid1.setColumnVisibleByIndex(3, false);
        grid1.setColumnVisibleByIndex(4, false);
        grid1.setColumnVisibleByIndex(5, false);
        grid1.setColumnVisibleByIndex(6, false);
        grid1.setColumnVisibleByIndex(7, false);
        grid1.setRequired('amountLowerLimit', false);
        grid1.setRequired('amountUpperLimit', false);
        grid1.setRequired('amountBase', true);
        grid1.setRequired('numberLowerLimit', false);
        grid1.setRequired('numberUpperLimit', false);
        grid1.setRequired('numberBase', false);
        grid1.setRequired('topLowerLimit', false);
        grid1.setRequired('topUpperLimit', false);
        grid1.repaintGridDivs();
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

        grid1.setColumnVisibleByIndex(0, false);
        grid1.setColumnVisibleByIndex(1, false);
        grid1.setColumnVisibleByIndex(2, false);
        grid1.setColumnVisibleByIndex(3, true);
        grid1.setColumnVisibleByIndex(4, true);
        grid1.setColumnVisibleByIndex(5, false);
        grid1.setColumnVisibleByIndex(6, false);
        grid1.setColumnVisibleByIndex(7, false);
        grid1.setRequired('amountLowerLimit', false);
        grid1.setRequired('amountUpperLimit', false);
        grid1.setRequired('amountBase', false);
        grid1.setRequired('numberLowerLimit', true);
        grid1.setRequired('numberUpperLimit', true);
        grid1.setRequired('numberBase', false);
        grid1.setRequired('topLowerLimit', false);
        grid1.setRequired('topUpperLimit', false);
        grid1.repaintGridDivs();
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

        grid1.setColumnVisibleByIndex(0, false);
        grid1.setColumnVisibleByIndex(1, false);
        grid1.setColumnVisibleByIndex(2, false);
        grid1.setColumnVisibleByIndex(3, false);
        grid1.setColumnVisibleByIndex(4, false);
        grid1.setColumnVisibleByIndex(5, true);
        grid1.setColumnVisibleByIndex(6, false);
        grid1.setColumnVisibleByIndex(7, false);
        grid1.setRequired('amountLowerLimit', false);
        grid1.setRequired('amountUpperLimit', false);
        grid1.setRequired('amountBase', false);
        grid1.setRequired('numberLowerLimit', false);
        grid1.setRequired('numberUpperLimit', false);
        grid1.setRequired('numberBase', true);
        grid1.setRequired('topLowerLimit', false);
        grid1.setRequired('topUpperLimit', false);
        grid1.repaintGridDivs();
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

        grid1.setColumnVisibleByIndex(0, false);
        grid1.setColumnVisibleByIndex(1, false);
        grid1.setColumnVisibleByIndex(2, false);
        grid1.setColumnVisibleByIndex(3, false);
        grid1.setColumnVisibleByIndex(4, false);
        grid1.setColumnVisibleByIndex(5, false);
        grid1.setColumnVisibleByIndex(6, true);
        grid1.setColumnVisibleByIndex(7, true);
        grid1.setRequired('amountLowerLimit', false);
        grid1.setRequired('amountUpperLimit', false);
        grid1.setRequired('amountBase', false);
        grid1.setRequired('numberLowerLimit', false);
        grid1.setRequired('numberUpperLimit', false);
        grid1.setRequired('numberBase', false);
        grid1.setRequired('topLowerLimit', true);
        grid1.setRequired('topUpperLimit', true);
        grid1.repaintGridDivs();
      }
    },
    //弹出卡片编辑窗(通过index区分是编辑还是新增，-1为新增，大于等于0为编辑)
    beforeEdit: function(index) {
      var title;
      viewModel.index = index;
      if (index >= 0) {
        //修改操作
        title = "编辑";
        viewModel.promoFormList.setRowFocus(index);
        var id = viewModel.promoFormList.getCurrentRow().getValue("id");
        //请求完整主子表信息
        viewModel.goBillPanel();
        viewModel.findByParentid(id);
        viewModel.billPanelStatus = CONST.BILLPANELSTATUS.EDIT;
        $('#rulesdetail').css('display', 'block');
        editRules = [];
        oldRuleId;
      } else {
        editRules = []
        title = "新增";
        viewModel.promoFormMeta.removeAllRows();
        var row = viewModel.promoFormMeta.createEmptyRow();
        // var tempRow = viewModel.promoRuleMeta.createEmptyRow();
        row.setValue("isEnable", "0"); //
        // row.setValue("isRejected", "0"); //
        // tempRow.setValue("isForAll", "0");
        viewModel.promoFormMeta.setRowFocus(row);
        viewModel.promoFormItemList.removeAllRows();
        viewModel.platformStoreList.removeAllRows();
        viewModel.promoruleitemList.removeAllRows();
        viewModel.promRuleTimeRanges.removeAllRows();
        viewModel.promoRuleMeta.removeAllRows();
        var isMutex = viewModel.promoFormMeta.getCurrentRow().getValue('isMutex');
        var ruleGrid = app.getComp("grid_item_list").grid;
        if (isMutex == '0' || isMutex == 0) {
          ruleGrid.setColumnVisibleByIndex(0, false);
        } else {
          ruleGrid.setColumnVisibleByIndex(0, true);
          ruleGrid.setRequired('priority', true);
        }
        viewModel.includeGoodsList.removeAllRows();
        viewModel.excludeGoodsList.removeAllRows();
        viewModel.platformStoreList.removeAllRows();
        $('#rulesdetail').css('display', 'none');
        viewModel.goBillPanel();
        viewModel.billPanelStatus = CONST.BILLPANELSTATUS.ADD;
      }
      oldRuleId = '';
    },
    timestampToTime: function(timestamp) {
      var date = new Date(timestamp), //时间戳为10位需*1000，时间戳为13位的话不需乘1000
        Y = date.getFullYear() + '-',
        M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-',
        D = date.getDate() + ' ',
        h = date.getHours() + ':',
        m = date.getMinutes() + ':',
        s = date.getSeconds();
      return Y + M + D + h + m + s;
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
          editRules = [];
          oldRuleId = '';
          viewModel.promoFormMeta.removeAllRows();
          viewModel.promoFormMeta.setSimpleData(data);
          var bT = viewModel.promoFormMeta.getValue('beginTime'),
            eT = viewModel.promoFormMeta.getValue('endTime');
          viewModel.promoFormMeta.setValue('beginTimeTemp', bT + ';' + eT);
          viewModel.promoFormMeta.setValue('tembeginTime', viewModel.timestampToTime(parseInt(bT)));
          viewModel.promoFormMeta.setValue('temendTime', viewModel.timestampToTime(parseInt(eT)));
          //把现在数据存入editRules初始化oldRuleId为第一行id
          var mainRule = data.promRules,
            flage = false; //之前没点过
          for (var e = 0; e < mainRule.length; e++) {
            var idStr = 'new' + e + Date.now().toString(36);
            if (e == 0) {
              oldRuleId = idStr;
            }
            // viewModel.promoRuleMeta.setSimpleData(mainRule[e]); //初始化弹出页面
            // var RuleElselist = viewModel.promoRuleMeta.getSimpleData(); //规则设置
            mainRule[e].ruleId = idStr;
            editRules.push({
              'id': idStr,
              'ruleItems': data.promRules[e].ruleItems,
              'promRules': mainRule[e], //RuleElselist,
              'includedGoods': data.promRules[e].includedGoods,
              'excludedGoods': data.promRules[e].excludedGoods,
              'promRuleTimeRanges': data.promRules[e].promRuleTimeRanges
            });
          }
          //初始化页面显示
          viewModel.promoFormItemList.removeAllRows();
          viewModel.promoFormItemList.setSimpleData(mainRule, {
            unSelect: true
          });
          viewModel.promoFormItemList.setRowSelect(0);
          //初始化孙表
          viewModel.promoRuleMeta.removeAllRows();
          viewModel.promoRuleMeta.setSimpleData(mainRule[0]);

          if (!data.promRules[0].isForAll) {
            viewModel.includeGoodsList.removeAllRows();
            viewModel.includeGoodsList.setSimpleData(data.promRules[0].includedGoods, {
              unSelect: true
            });
          } else {
            viewModel.excludeGoodsList.removeAllRows();
            viewModel.excludeGoodsList.setSimpleData(data.promRules[0].excludedGoods, {
              unSelect: true
            });
          }
          viewModel.promRuleTimeRanges.removeAllRows();
          viewModel.promRuleTimeRanges.setSimpleData(data.promRules[0].promRuleTimeRanges, {
            unSelect: true
          });
          viewModel.promoruleitemList.removeAllRows();
          viewModel.promoruleitemList.setSimpleData(data.promRules[0].ruleItems, {
            unSelect: true
          });
          var ruleGrid = app.getComp("grid_item_list").grid;
          viewModel.reShowCols({
            "gridObj": ruleGrid,
            "rowIndex": 0
          });
          viewModel.platformStoreList.removeAllRows();
          viewModel.platformStoreList.setSimpleData(data.promStoreSelects, {
            unSelect: true
          });
          if (viewModel.billPanelStatus == CONST.BILLPANELSTATUS.DETAIL) {
            if (data.promRules[0].includedGoods.length) {
              $('#detail_in').css('display', 'block');
              $('#detail_ex').css('display', 'none');
            }
            if (data.promRules[0].excludedGoods.length) {
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
        viewModel.promoFormList.setRowSelect(data);
      }
      var ids = [];
      var rows = viewModel.promoFormList.getSelectedRows(),
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
                viewModel.promoFormList.removeRows(rowsArr);
              }
            });

          }
        });
      } else {
        toastr.warning("请先选择需要删除数据");
      }
    },
    //增行
    addRow: function() {
      var newRow = viewModel.promoFormItemList.createEmptyRow({
        unSelect: true
      });
      var idStr = Date.now().toString(36);
      newRow.setValue('ruleId', 'new' + idStr);
    },
    //删行
    delRow: function() {
      if (typeof(data) == 'number') {
        viewModel.promoFormItemList.setRowSelect(data);
      }
      var rows = viewModel.promoFormItemList.getSelectedRows(),
        allRows = viewModel.promoFormItemList.getAllRows(),
        rowLen = rows.length,
        aRlen = allRows.length;
      if (rows && rowLen > 0) {
        for (var r = 0; r < rowLen; r++) {
          var delId = rows[r].getValue('ruleId');
          for (var i = 0; i < editRules.length; i++) {
            if (editRules[i].id == delId) {
              editRules[r].promRules[0].persistStatus = 'fdel';
              break;
            }
          }
        }
        viewModel.promoFormItemList.removeRows(rows);
        var setDone = false;
        if (rowLen < aRlen) {
          viewModel.promoFormItemList.setRowSelect(0);
          var rulList = viewModel.promoFormItemList.getAllRows(), //当前行
            ruleId = rulList[0].getValue('ruleId');
          oldRuleId = ruleId;
          //初始化孙表
          if (editRules.length) {
            for (var j = 0, jLen = editRules.length; j < jLen; j++) {
              if (editRules[j].id == oldRuleId) {
                viewModel.promoRuleMeta.removeAllRows();
                viewModel.promoRuleMeta.setSimpleData(editRules[j].promRules);

                if (!editRules[j].promRules[0].isForAll) {
                  viewModel.includeGoodsList.removeAllRows();
                  viewModel.includeGoodsList.setSimpleData(editRules[j].includedGoods, {
                    unSelect: true
                  });
                } else {
                  viewModel.excludeGoodsList.removeAllRows();
                  viewModel.excludeGoodsList.setSimpleData(editRules[j].excludedGoods, {
                    unSelect: true
                  });
                }
                viewModel.promRuleTimeRanges.removeAllRows();
                viewModel.promRuleTimeRanges.setSimpleData(editRules[j].promRuleTimeRanges, {
                  unSelect: true
                });
                viewModel.promoruleitemList.removeAllRows();
                viewModel.promoruleitemList.setSimpleData(editRules[j].ruleItems, {
                  unSelect: true
                });
                var ruleGrid = app.getComp("grid_item_list").grid;
                viewModel.reShowCols({
                  "gridObj": ruleGrid,
                  "rowIndex": 0
                });

                setDone = true;
                break;
              }
            }
          }
        }
        if (!setDone) {
          viewModel.promoRuleMeta.removeAllRows();
          viewModel.includeGoodsList.removeAllRows();
          viewModel.excludeGoodsList.removeAllRows();
          viewModel.promRuleTimeRanges.removeAllRows();
          viewModel.promoruleitemList.removeAllRows();
          $('#rulesdetail').css('display', 'none');
        }
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
      var ids = [];
      var rows = viewModel.promRuleTimeRanges.getSelectedRows();
      if (rows && rows.length > 0) {
        // for (var i = 0; i < rows.length; i++) {
        //   ids.push(rows[i].getValue("id"));
        // }
        var rows = viewModel.promRuleTimeRanges.getSelectedRows();
        viewModel.promRuleTimeRanges.removeRows(rows);
      } else {
        toastr.warning('请选择数据');
        return;
      }
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
    addRowRef: function() {
      viewModel.showRealProductRef2();
    },
    //删行
    delRowRef: function() {
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
    // showRuleRef2: function() {
    //   viewModel.clearRuleRef2();
    //   $("#rulsRefer .refer").trigger("click");
    // },
    // // 清除参照之前的选择
    // clearRuleRef2: function() {
    //   viewModel.ruleRef.setValue("ruleRefer", "");
    //   var refer = $("#refContainerruleRefer").data("uui.refer");
    //   refer.uncheckAll();
    //   refer.setValue([]);
    // },
    //增行addRowruleitem
    addRow2: function() {
      viewModel.clearplatsRef();
      $("#addPlatsRef .refer").trigger("click");
      // viewModel.platformStoreList.createEmptyRow({
      //   unSelect: true
      // });
    },
    //清空已选销售产品参照
    clearplatsRef: function() {
      viewModel.ItemRefList.setValue("b2cStoreRef", "");
      var refer = $("#refContainerb2cStoreRef").data("uui.refer");
      refer.uncheckAll();
      refer.setValue([]);
    },
    //删行
    delRow2: function() {
      if (typeof(data) == 'number') {
        viewModel.platformStoreList.setRowSelect(data);
      }
      var rows = viewModel.platformStoreList.getSelectedRows();
      if (rows && rows.length > 0) {
        viewModel.platformStoreList.removeRows(rows);
      } else {
        toastr.warning('请选择数据');
        return;
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
      var len = allRows.length;
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
    addRowruleitem: function() {
      var ruleRow = viewModel.promoFormItemList.getCurrentRow();
      if (ruleRow) {
        var condition = ruleRow.getValue('condition');
        if (condition != 2) {
          var isProgressive = ruleRow.getValue('isProgressive');
          if (isProgressive == 1 || isProgressive == '1') {
            var allRows = viewModel.promoruleitemList.getAllRows();
            if (allRows.length == 0) {
              viewModel.promoruleitemList.createEmptyRow({
                unSelect: true
              });
              return;
            } else if (allRows.length == 1) {
              toastr.warning('当前促销条件下，递增为是只能有一条规则！')
              return;
            } else {
              viewModel.promoruleitemList.removeRows(allRows);
              viewModel.promoruleitemList.createEmptyRow({
                unSelect: true
              });
              return;
            }
          }
        }
      }
      viewModel.promoruleitemList.createEmptyRow({
        unSelect: true
      });
    },
    //删行
    delRowruleitem: function() {
      if (typeof(data) == 'number') {
        viewModel.promoruleitemList.setRowSelect(data);
      }
      var rows = viewModel.promoruleitemList.getSelectedRows();
      if (rows && rows.length > 0) {
        viewModel.promoruleitemList.removeRows(rows);
      } else {
        toastr.warning('请选择数据');
        return;
      }
    },
    //删除Id
    removeId: function(obj) {
      for (var i = 0, len = obj.length; i < len; i++) {
        obj[i].id = null;
      }
      return obj;
    },
    //保存单据
    saveBill: function() {
      var type = "post";
      if (viewModel.billPanelStatus !== CONST.BILLPANELSTATUS.ADD && viewModel.billPanelStatus !== CONST.BILLPANELSTATUS.COPY) {
        type = "put";
      }
      $('#timepanel').find('a.ant-time-picker-panel-clear-btn').first().trigger('click');
      var validate = $("#validate")[0];
      var result = app.compsValidateMultiParam({
        element: validate,
        showMsg: true
      });
      if (!result.passed) {
        return;
      }
      var promoFormData = viewModel.promoFormMeta.getCurrentRow().getSimpleData(),
        rulList = viewModel.promoFormItemList.getCurrentRow(); //规则表格数据
      viewModel.promoRuleMeta.setValue('priority', rulList.getValue('priority'));
      viewModel.promoRuleMeta.setValue('fromRuleId', rulList.getValue('fromRuleId'));
      viewModel.promoRuleMeta.setValue('code', rulList.getValue('code'));
      viewModel.promoRuleMeta.setValue('name', rulList.getValue('name'));
      viewModel.promoRuleMeta.setValue('condition', rulList.getValue('condition'));
      viewModel.promoRuleMeta.setValue('isProgressive', rulList.getValue('isProgressive'));
      viewModel.promoRuleMeta.setValue('persistStatus', rulList.getValue('persistStatus'));
      var mainRule = viewModel.promoRuleMeta.getSimpleData(),
        promoruleitem = viewModel.promoruleitemList.getSimpleData(), //规则详情
        storeList = viewModel.platformStoreList.getSimpleData(),
        goodsList = viewModel.includeGoodsList.getSimpleData(),
        exGoodsList = viewModel.excludeGoodsList.getSimpleData(),
        timeRanges = viewModel.promRuleTimeRanges.getSimpleData(),
        flage = false; //之前没点过
      if (viewModel.billPanelStatus == CONST.BILLPANELSTATUS.ADD) {
        viewModel.removeId(mainRule);
        viewModel.removeId(goodsList);
        viewModel.removeId(exGoodsList);
        viewModel.removeId(promoruleitem);
      }
      for (var e = 0; e < editRules.length; e++) {
        if (editRules[e].id == oldRuleId) {
          flage = true; //之前点过
          editRules[e].promRules = mainRule;
          editRules[e].ruleItems = promoruleitem;
          editRules[e].includedGoods = goodsList;
          editRules[e].excludedGoods = exGoodsList;
          editRules[e].promRuleTimeRanges = timeRanges;
          break;
        }
      }
      if (!flage) {
        editRules.push({
          'id': oldRuleId,
          'ruleItems': promoruleitem,
          'promRules': mainRule,
          'includedGoods': goodsList,
          'excludedGoods': exGoodsList,
          'promRuleTimeRanges': timeRanges
        });
      }
      var selectRowData = viewModel.promoFormItemList.getAllRows();
      promoFormData.promRules = [];
      for (var i = 0; i < editRules.length; i++) {
        if (viewModel.billPanelStatus == CONST.BILLPANELSTATUS.ADD) {
          viewModel.removeId(editRules[i].includedGoods);
          viewModel.removeId(editRules[i].excludedGoods);
          viewModel.removeId(editRules[i].ruleItems);
        }
        editRules[i].promRules[0].ruleItems = editRules[i].ruleItems;
        editRules[i].promRules[0].includedGoods = editRules[i].includedGoods;
        editRules[i].promRules[0].excludedGoods = editRules[i].excludedGoods;
        editRules[i].promRules[0].promRuleTimeRanges = editRules[i].promRuleTimeRanges;
        editRules[i].promRules[0].id = null;
        promoFormData.promRules.push(editRules[i].promRules[0]);
      }
      promoFormData.promStoreSelects = storeList;
      $._ajax({
        url: appCtx + viewModel.baseurl,
        type: type,
        data: JSON.stringify(promoFormData),
        contentType: "application/json; charset=utf-8",
        success: function(data) {
          viewModel.search();
          viewModel.retListPanel();
        }
      });
      // }
    },
    //点击取消 单据页
    cancelBill: function() {
      $('#timepanel').find('a.ant-time-picker-panel-clear-btn').first().trigger('click')
      $('#rulesdetail').css('display', 'none');
      viewModel.retListPanel();
    },

    //根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
    search: function(reindex) {
      if (reindex) {
        viewModel.promoFormList.pageIndex(0);
      }
      viewModel.promoFormList.removeAllRows();
      var queryData = singledocSearch.getDataWithOpr();
      queryData.size = viewModel.promoFormList.pageSize();
      queryData.page = viewModel.promoFormList.pageIndex();
      $._ajax({
        type: "get",
        url: appCtx + viewModel.baseurl,
        dataType: "json",
        data: queryData,
        success: function(data) {
          viewModel.promoFormList.setSimpleData(data.content, {
            unSelect: true
          });
          viewModel.promoFormList.totalRow(data.totalElements);
          viewModel.promoFormList.totalPages(data.totalPages);
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
      var selectedRows = viewModel.promoFormList.getSelectedRows();
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
      var selectedRows = viewModel.promoFormList.getSelectedRows();
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
      viewModel.promoFormList.pageIndex(index);
      viewModel.search();
    },
    //页码改变时的回调函数
    sizeChange: function(size) {
      viewModel.promoFormList.pageSize(size);
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
        viewModel.ruleTypeSrc = newarray;
      }
    });

    //促销方式
    $._ajax({
      type: "get",
      url: appCtx + "/b2c/enum-service/data",
      async: false,
      data: {
        enumClassName: "com.yonyou.ocm.b2c.enums.PromTypeEnum"
      },
      success: function(data) {
        var newarray = common.dataconvert.toMap(data, "name", "code");
        viewModel.promTypeSrc = newarray;
      }
    });

    //促销类型
    $._ajax({
      type: "get",
      url: appCtx + "/b2c/enum-service/data",
      async: false,
      data: {
        enumClassName: "com.yonyou.ocm.prom.enums.PromTimeTypeEnum"
      },
      success: function(data) {
        var newarray = common.dataconvert.toMap(data, "name", "code");
        viewModel.promTimeTypeSrc = newarray;
      }
    });

    //促销类型
    $._ajax({
      type: "get",
      url: appCtx + "/b2c/enum-service/data",
      async: false,
      data: {
        enumClassName: "com.yonyou.ocm.prom.enums.PromotionTypeEnum"
      },
      success: function(data) {
        var newarray = common.dataconvert.toMap(data, "name", "code");
        viewModel.promTypeListSrc = newarray;
      }
    });
    //赠品发货时机
    $._ajax({
      type: "get",
      url: appCtx + "/b2c/enum-service/data",
      async: false,
      data: {
        enumClassName: "com.yonyou.ocm.b2c.enums.DeliveryTimeEnum"
      },
      success: function(data) {
        var newarray = common.dataconvert.toMap(data, "name", "code");
        viewModel.deliveryTimeSrc = newarray;
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
        key: "activity--name",
        label: "促销活动名称"
      }, {
        type: "text",
        key: "activity--theme",
        label: "促销活动主题"
      }, {
        type: "daterange",
        key: "beginTime",
        label: "活动开始时间"
      }, {
        type: "daterange",
        key: "endTime",
        label: "活动结束时间"
      }]);
    // 列表查询数据(无查询条件)

    viewModel.search();
    var productRef2Row = viewModel.productRef2.createEmptyRow();
    viewModel.productRef2.setRowFocus(productRef2Row);
    var productRef4Row = viewModel.productRef4.createEmptyRow();
    viewModel.productRef4.setRowFocus(productRef4Row);
    var platListRow = viewModel.platformStoreList.createEmptyRow();
    viewModel.platformStoreList.setRowFocus(platListRow);
    var ItemRefListRow = viewModel.ItemRefList.createEmptyRow();
    viewModel.ItemRefList.setRowFocus(ItemRefListRow);
    // var rulesListRow = viewModel.promoFormItemList.createEmptyRow();
    // viewModel.promoFormItemList.setRowFocus(rulesListRow);

  }

  function afterRender() {
    // 初始化折叠面板
    // $.fn.collapsepanel(false, true);
    //绑定输入框enter事件
    $('#CustDocDef-searchcontent input').off("keydown").on("keydown", function(e) {
      if (e.keyCode == 13) {
        $(this).blur();
        viewModel.search();
      }
    });
    viewModel.promoFormItemList.on("fromRuleId.valuechange", function(obj) {
      if (!obj.newValue) {
        return;
      }
      var refValues = $("#refContainerfromRuleId").data("uui.refer").values;
      viewModel.rowSelectedFun(obj, refValues[0].refpk);
    });
    viewModel.promoFormMeta.on("activityId.valuechange", function(obj) {
      if (!obj.newValue) {
        return;
      }
      var refValues = $("#refContaineractivityId").data("uui.refer").values;
      var row = obj.rowObj;
      row.setValue('theme', refValues[0].theme);
    });
    viewModel.promoFormMeta.on("beginTimeTemp.valuechange", function(obj) {
      if (!obj.newValue) {
        return;
      }
      var row = obj.rowObj,
        newVal = obj.newValue.split(';'),
        curRow = viewModel.promoFormMeta.getCurrentRow();
      curRow.setValue('beginTime', newVal[0]);
      curRow.setValue('endTime', newVal[1]);
      var promoFormData = curRow.getSimpleData();
    });
    viewModel.productRef2.on("productRefer2.valuechange", function(obj) {
      if (!obj.newValue) {
        return;
      }
      var refValues = $("#refContainerproductRefer2").data("uui.refer").values;
      var selecRows = [];
      if (refValues && refValues.length > 0) {
        for (var i = 0; i < refValues.length; i++) {
          var row = viewModel.includeGoodsList.getRowByField("id", refValues[i].refpk);
          if (!row) {
            var newRow = viewModel.includeGoodsList.createEmptyRow({
              unSelect: true
            });
            newRow.setValue('goodsName', refValues[i].refname);
            newRow.setValue('goodsCode', refValues[i].refcode);
            newRow.setValue('goodsId', refValues[i].refpk);
          }
        }
      }

    });
    viewModel.productRef4.on("productRefer4.valuechange", function(obj) {
      if (!obj.newValue) {
        return;
      }
      var refValues = $("#refContainerproductRefer4").data("uui.refer").values;
      var selecRows = [];
      if (refValues && refValues.length > 0) {
        for (var i = 0; i < refValues.length; i++) {
          var row = viewModel.excludeGoodsList.getRowByField("id", refValues[i].refpk);
          if (!row) {
            var newRow = viewModel.excludeGoodsList.createEmptyRow({
              unSelect: true
            });
            newRow.setValue('goodsName', refValues[i].refname);
            newRow.setValue('goodsCode', refValues[i].refcode);
            newRow.setValue('goodsId', refValues[i].refpk);
          }
        }
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
    //平台店铺参照
    viewModel.ItemRefList.on("b2cStoreRef.valuechange", function(obj) {
      // 清空参照时不增行
      if (!obj.newValue) {
        return;
      }
      var refer = $("#refContainerb2cStoreRef").data("uui.refer");
      var refValues = refer.values;
      if (refValues && refValues.length > 0) {
        for (var i = 0; i < refValues.length; i++) {
          var id = refValues[i].refpk;
          var row = viewModel.platformStoreList.getRowByField("storeId", id);
          if (!row || row.status == "fdel") {
            var tempNewrow = viewModel.platformStoreList.createEmptyRow();
            tempNewrow.setValue("storeName", refValues[i].refname);
            tempNewrow.setValue("platformName", refValues[i].platformName);
            tempNewrow.setValue("storeId", refValues[i].refpk);
            tempNewrow.setValue("persistStatus", 'new');
          }
        }
      }
    });
    //是否互斥
    viewModel.promoFormMeta.on("isMutex.valuechange", function(obj) {
      if (!obj.newValue) {
        return;
      }
      var isMutex = viewModel.promoFormMeta.getCurrentRow().getValue('isMutex');
      var ruleGrid = app.getComp("grid_item_list").grid;
      if (isMutex == '0' || isMutex == 0) {
        ruleGrid.setColumnVisibleByIndex(0, false);
      } else {
        ruleGrid.setColumnVisibleByIndex(0, true);
        ruleGrid.setRequired('priority', true);
      }
    });
    //表格里的促销条件变化
    viewModel.promoFormItemList.on('condition.valuechange', function(obj) {
      if (!obj.newValue) {
        return;
      }
      viewModel.promoruleitemList.removeAllRows();
      viewModel.reShowCols(obj);
    });
    viewModel.promoFormItemList.on('isProgressive.valuechange', function(obj) {
      if (!obj.newValue) {
        return;
      }
      // var allRows = viewModel.promoruleitemList.getAllRows();
      viewModel.promoruleitemList.removeAllRows();
      viewModel.reShowCols(obj);
    });
    //表格里的促销条件变化
    viewModel.promoFormMeta.on('activityId.valuechange', function(obj) {
      if (!obj.newValue) {
        return;
      }
      var refer = $("#refContaineractivityId").data("uui.refer");
      var refValues = refer.values;
      viewModel.promoFormMeta.getCurrentRow().setValue('activityTheme', refValues[0].theme);
    });
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