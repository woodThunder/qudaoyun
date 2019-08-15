define([], function () {
  // ----------------------兼容性处理 start----------------------
  String.prototype.trim = function (is_global) {
    if (is_global && is_global.toLowerCase() === "g") {
      return this.replace(/\s/g, "");
    }
    return this.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
  }
  if (!Array.prototype.filter) {
    Array.prototype.filter = function (fun /* , thisArg*/) {
      "use strict";

      if (this === void 0 || this === null)
        throw new TypeError();

      var t = Object(this);
      var len = t.length >>> 0;
      if (typeof fun !== "function")
        throw new TypeError();

      var res = [];
      var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
      for (var i = 0; i < len; i++) {
        if (i in t) {
          var val = t[i];

          // NOTE: Technically this should Object.defineProperty at
          //       the next index, as push can be affected by
          //       properties on Object.prototype and Array.prototype.
          //       But that method's new, and collisions should be
          //       rare, so use the more-compatible alternative.
          if (fun.call(thisArg, val, i, t))
            res.push(val);
        }
      }

      return res;
    };
  }
  // 实现 ECMA-262, Edition 5, 15.4.4.19
  // 参考: http://es5.github.com/#x15.4.4.19
  if (!Array.prototype.map) {
    Array.prototype.map = function (callback, thisArg) {

      var T, A, k;

      if (this == null) {
        throw new TypeError(" this is null or not defined");
      }

      // 1. 将O赋值为调用map方法的数组.
      var O = Object(this);

      // 2.将len赋值为数组O的长度.
      var len = O.length >>> 0;

      // 3.如果callback不是函数,则抛出TypeError异常.
      if (Object.prototype.toString.call(callback) != "[object Function]") {
        throw new TypeError(callback + " is not a function");
      }

      // 4. 如果参数thisArg有值,则将T赋值为thisArg;否则T为undefined.
      if (thisArg) {
        T = thisArg;
      }

      // 5. 创建新数组A,长度为原数组O长度len
      A = new Array(len);

      // 6. 将k赋值为0
      k = 0;

      // 7. 当 k < len 时,执行循环.
      while (k < len) {

        var kValue, mappedValue;

        //遍历O,k为原数组索引
        if (k in O) {

          //kValue为索引k对应的值.
          kValue = O[k];

          // 执行callback,this指向T,参数有三个.分别是kValue:值,k:索引,O:原数组.
          mappedValue = callback.call(T, kValue, k, O);

          // 返回值添加到新数组A中.
          A[k] = mappedValue;
        }
        // k自增1
        k++;
      }

      // 8. 返回新数组A
      return A;
    };
  }
  // ----------------------兼容性处理 end----------------------

  // ----------------------grid方法复写 start-------------------------
  var objCompare = function (rootObj, objAry) {
    var aryLen = objAry.length;
    // var rootStr = JSON.stringify(rootObj);
    var matchNum = 0;
    for (var i = 0; i < aryLen; i++) {
      // var compareStr = JSON.stringify(objAry[i]);
      var compareObj = objAry[i];
      matchNum += (rootObj == compareObj) ? 1 : 0;
    }
    return (matchNum > 0) ? true : false;
  };
  var gridCompProto = $.fn.grid.gridComp.prototype;
  gridCompProto.initOptionsTree = function () {

  }

  gridCompProto.initGrid = function () {
    if (!this.options.columns || this.options.columns.length == 0) {
      return;
    }
    var oThis = this;
    this.initOptions();
    this.initVariable();
    this.initWidthVariable();
    this.initGridCompColumn();
    this.initDataSource();
    this.createDivs();
    // 去掉
    this.inte = setInterval(function () {
      oThis.setIntervalFun.call(oThis)
    }, 300);
  },

    gridCompProto.createContentLeft = function () {
      var oThis = this,
        htmlStr = "",
        left = 0,
        hStr;
      if (this.options.multiSelect) {
        htmlStr += '<div class="u-grid-content-left" id="' + this.options.id + '_content_multiSelect" style="width:' + this.multiSelectWidth + 'px;' + hStr + '">';
        // 遍历生成所有行
        if (this.dataSourceObj.rows) {
          $.each(this.dataSourceObj.rows, function (i) {
            htmlStr += oThis.createContentLeftMultiSelectRow(this);
          });
        }
        htmlStr += '</div>';
        left += this.multiSelectWidth;
      }
      if (this.options.showNumCol) {
        htmlStr += '<div class="u-grid-content-left" id="' + this.options.id + '_content_numCol" style="width:' + this.numWidth + 'px;left:' + left + 'px;' + hStr + '">';
        // 遍历生成所有行
        if (this.dataSourceObj.rows) {
          this.treeNumCounter = 1;
          $.each(this.dataSourceObj.rows, function (i, row) {
            htmlStr += oThis.createContentLeftNumColRow(i, row.value);
          });
        }
        htmlStr += '</div>';
      }
      return htmlStr;
    }


  // gridCompProto.createContentLeftNumColRow = function(index, row) {
  //   if (this.options.showTree) {
  //     if (!row.parentId) {
  //       return '<div style="width:' + this.numWidth + 'px;" class="u-grid-content-num topLevel">' + (this.treeNumCounter++) + '</div>';
  //     } else {
  //       return '<div style="width:' + this.numWidth + 'px;display:none;" class="u-grid-content-num"></div>';;
  //     }
  //   }
  //   // by songyd3 如果参数中row存在，则使用参数row的index，修复grid行未选中但序号列出现选中样式bug
  //   if (row && row["$_#_@_id"]) {
  //     for (var i = 0; i < this.dataSourceObj.rows.length; i++) {
  //       if (this.dataSourceObj.rows[i].value["$_#_@_id"] == row["$_#_@_id"]) {
  //         index = this.dataSourceObj.rows[i].valueIndex;
  //         break;
  //       }
  //     }
  //   }
  //   var row = this.dataSourceObj.rows[index];
  //   var rootObj = row.value;
  //   var objAry = this.selectRows;
  //   var re = objCompare(rootObj, objAry);
  //   var htmlStr;
  //   var heightStr = '';
  //
  //   if (!this.options.needResetHeight) {
  //     heightStr = 'height:' + (this.options.rowHeight + 1) + 'px;';
  //   }
  //   if (re) {
  //     htmlStr = '<div style="width:' + this.numWidth + 'px;' + heightStr + '" class="u-grid-content-num  u-grid-content-sel-row">' + (index + 1) + '</div>';
  //   } else {
  //     htmlStr = '<div style="width:' + this.numWidth + 'px;' + heightStr + '" class="u-grid-content-num">' + (index + 1) + '</div>';
  //
  //   }
  //   return htmlStr;
  // }
  var oriResetNumCol = gridCompProto.resetNumCol;
  gridCompProto.resetNumCol = function () {
    if (!this.options.showTree) {
      return oriResetNumCol.call(this);
    }
    var numCols = $('#' + this.options.id + '_content_numCol >.u-grid-content-num');
    var num = 1;
    $.each(numCols, function (i) {
      if (u.hasClass(this, 'topLevel')) {
        this.innerHTML = num++;
      }
    });
  }

  var oriClickFunTree = gridCompProto.clickFunTree;
  gridCompProto.clickFunTree = function (e) {
    oriClickFunTree.call(this, e);
    if (this.options.showTree) {
      var trs = $('#' + this.options.id + '_content_table > tbody > tr');
      var numCols = $('#' + this.options.id + '_content_numCol >.u-grid-content-num');

      $.each(trs, function (i, tr) {
        var visible = $(tr).is(":visible"),
          $num = $(numCols[i])
        if (visible) {
          $num.show();
        } else {
          $num.hide();
        }
      })
    }


  }
  var oldCreateHeader = gridCompProto.createHeader;

  gridCompProto.createHeader = function () {
    var oldHtmlStr = oldCreateHeader.call(this);
    var htmlStr = oldHtmlStr.replace('<div class="u-grid-header-num" style="width:' + this.numWidth + 'px;"></div>', '<div class="u-grid-header-num" style="width:' + this.numWidth + 'px;">序号</div>');
    return htmlStr;
  }


  //复写grid默认参数设置
  var oldinitDefault = gridCompProto.initDefault;
  gridCompProto.initDefault = function () {
    oldinitDefault.call(this);
    this.defaults.needLocalStorage = false;
    this.defaults.noScroll = false;
    this.defaults.columnMenu = true; //默认可以显示菜单列按钮
    this.defaults.sortable = true; //默认可以列排序
    this.defaults.canDrag = true; //默认可以拖动列
    this.defaults.canSwap = true; //默认可以交换列
    this.defaults.contentSelect = false; //默认点击不会选中该行
    this.defaults.cancelFocus = false; //默认再次点击行时不会取消选中
    this.defaults.columnMenuType = 'border';
    this.defaults.fixedFloat = 'right';
    this.defaults.rowHeight = 40; // 行高
    this.defaults.headerHeight = 46;
    this.defaults.numWidth = 40; // 数字列宽度
    this.defaults.multiSelectWidth = 75; // 复选框列宽度
    // this.defaults.needResetHeight = true;
  }
  var oldInitOptions = gridCompProto.initOptions;
  gridCompProto.initOptions = function () {
    oldInitOptions.call(this);

    var oldAfterCreate = this.options.afterCreate;
    this.options.afterCreate = function () {
      if (typeof oldAfterCreate == 'function') {
        oldAfterCreate.call(this);
      }
      var oThis = this;
      setTimeout(function () {
        $('#' + oThis.options.id + '_content_div').perfectScrollbar({
          wheelSpeed: 20,
          wheelPropagation: false
        });
        var $ele = $(oThis.ele);
        $ele.find('.ps-scrollbar-y-rail').css('display', 'none');
        if (!$ele.find(".ps-scrollbar-x").width()) {
          $ele.find(".u-grid-content-div table").css("padding-bottom", "0px")
        } else {
          $ele.find(".u-grid-content-div table").css("padding-bottom", "10px")
        }
      }, 100)
    }
  }

  // 离开时显示滚动条
  var oldEditClose = gridCompProto.editClose;
  gridCompProto.editClose = function () {
    oldEditClose.call(this);
    $('.ps-scrollbar-x-rail').css('display', 'inherit');
    $('.ps-scrollbar-y-rail').css('display', 'none');
  }
  // 编辑时隐藏滚动条
  var oldEditRow = gridCompProto.editRow;
  gridCompProto.editRow = function ($tr, colIndex) {
    oldEditRow.call(this, $tr, colIndex);
    $('.ps-scrollbar-x-rail').css('display', 'none');
    $('.ps-scrollbar-y-rail').css('display', 'none');
  }
  // 列属性复写
  var gridCompColumnProto = $.fn.grid.gridCompColumn.prototype;
  var oldinitColumnDefault = gridCompColumnProto.initDefault;
  gridCompColumnProto.initDefault = function () {
    oldinitColumnDefault.call(this);
    this.defaults.width = '120';
  }
  // 根据fieldName隐藏或显示多列
  gridCompProto.setColumnsVisibleByFieldNames = function (fieldNames, visible) {
    for (var i = 0, len = this.gridCompColumnArr.length; i < len; i++) {
      var column = this.gridCompColumnArr[i];
      for (var j = 0, fieldName; fieldName = fieldNames[j++];) {
        if (fieldName == column.options.field) {
          this.setColumnVisibleByIndex(i, visible);
        }
      }
    }
  }
  gridCompProto.createThead = function (createFlag) {
    var oThis = this,
      visibleIndex = 0,
      gridCompColumnArr,
      trStyle = '',
      thLevelClass = '';
    if (this.options.maxHeaderLevel > 1) {
      trStyle = 'style="height:' + (this.headerHeight - 1) + 'px;"';
      thLevelClass = ' u-grid-header-level-th ';
    }
    var htmlStr = '<tr role="row" ' + trStyle + '>';
    if (createFlag == 'fixed') {
      gridCompColumnArr = this.gridCompColumnFixedArr;
    } else {
      gridCompColumnArr = this.gridCompColumnArr;
    }
    $.each(gridCompColumnArr, function (i) {
      var vi = visibleIndex,
        displayStyle = '';
      if (this.options.visible == false) {
        vi = -1;
        displayStyle = 'style="display:none;"';
      } else {
        visibleIndex++;
      }

      // 低版本浏览器不支持th position为relative，因此加入空div
      htmlStr += '<th role="columnheader" data-filed="' + this.options.field + '" rowspan="1" class="u-grid-header-th ' + thLevelClass + '" ' + displayStyle + 'field="' + this.options.field + '" index="' + i + '" visibleIndex="' + vi + '"><div style="position:relative;" class="u-grid-header-div">';
      var colorStype = '';
      if (this.options.headerColor || oThis.options.headerHeight) {
        var headerC = '';
        var headerH = '';
        if (this.options.headerColor) headerC = 'color:' + this.options.headerColor + ';';
        if (oThis.options.headerHeight) headerH = 'height:' + oThis.options.headerHeight + 'px;line-height:' + oThis.options.headerHeight + 'px;';
        colorStype = 'style="' + headerC + headerH + ';text-align:' + this.options.textAlign + ';"';
      } else {
        colorStype = 'style="text-align:' + this.options.textAlign + '"';
      }
      var requiredHtml = '';
      if (this.options.required) {
        requiredHtml = '<span style="color:red;">*</span>';
      } else if (oThis.options.editable && this.options.editable) {
        requiredHtml = '<i class="uifont icon-editable"></i>';
      }
      htmlStr += '<div class="u-grid-header-link" field="' + this.options.field + '" ' + colorStype + '>' + this.options.title + requiredHtml + '</div>';
      /*if(oThis.options.columnMenu && createFlag != 'fixed'){
          // 创建右侧按钮图标
          htmlStr += '<div class="u-grid-header-columnmenu uf uf-navmenu-light " field="' + this.options.field + '" style="display:none;"></div>';
      }*/
      htmlStr += '</div></th>';
    });

    htmlStr += '</tr>';
    return htmlStr;
  };
  // 获取显示列时排除固定列，修复改变列宽度图标与列标题右边框不对齐bug
  gridCompProto.getAllVisibleColumns = function () {
    var index = -1;
    var j = 0;
    var allVisibleColumns = [];
    for (var i = 0; i < this.gridCompColumnArr.length; i++) {
      if (!($('#' + this.options.id + '_header_table').find('th').eq(i).css('display') == 'none')) {
        allVisibleColumns.push(this.gridCompColumnArr[i]);
      }
    }
    return allVisibleColumns;
  }

  //   gridCompProto.addRows = function (rows, index) {

  // if (!(this.$ele.data('gridComp') == this)) return;
  // if (this.options.showTree || this.options.groupField) {
  //   // 树表待优化
  //   var l = rows.length;
  //   for (var i = 0; i < l; i++) {
  //     this.addOneRow(rows[i], l);
  //   }
  //   return;
  // }
  // if (typeof this.options.filterDataFun == 'function') {
  //   rows = this.options.filterDataFun.call(this, rows);
  // }

  // this.editClose();
  // var htmlStr = '',
  //   htmlStrmultiSelect = '',
  //   htmlStrNumCol = '',
  //   htmlStrFixed = '',
  //   oThis = this,
  //   l = this.dataSourceObj.rows.length,
  //   endFlag = false;
  // var newRows = [];
  // $.each(rows, function () {
  //   newRows.push(oThis.getGridRow(this));
  // });
  // rows = newRows;
  // if (index != 0) {
  //   if (index && index > 0) {
  //     if (l < index) index = l;
  //   } else {
  //     index = 0;
  //   }
  // }
  // if (l == index) {
  //   endFlag = true;
  // }
  // var rowObjArr = new Array();
  // $.each(rows, function (i) {
  //   var rowObj = {};
  //   rowObj.value = this;
  //   rowObj.valueIndex = index + i;
  //   rowObjArr.push(rowObj);
  //   oThis.dataSourceObj.rows.splice(index + i, 0, rowObj);
  //   oThis.updateEditRowIndex('+', index + i);
  // });

  // if (this.dataSourceObj.options.values) { } else {
  //   this.dataSourceObj.options.values = new Array();
  // }
  // $.each(rows, function (i) {
  //   oThis.dataSourceObj.options.values.splice(index + i, 0, this);
  // });

  // // 如果是在中间插入需要将后续的valueIndex + 1；
  // if (this.dataSourceObj.rows.length > index + rows.length) {
  //   $.each(this.dataSourceObj.rows, function (i) {
  //     if (i > index + rows.length - 1) {
  //       this.valueIndex = this.valueIndex + rows.length;
  //     }
  //   });
  // }
  // if (this.showType == 'grid' && $('#' + this.options.id + '_content_div tbody')[0]) {
  //   //只有grid展示的时候才处理div，针对隐藏情况下还要添加数据 //lyk--需要完善隐藏之后再显示同事添加数据操作
  //   $.each(rowObjArr, function (i, row) {
  //     htmlStr += oThis.createContentOneRow(this);
  //     htmlStrFixed += oThis.createContentOneRowFixed(this);
  //     if (oThis.options.multiSelect) {
  //       htmlStrmultiSelect += oThis.createContentLeftMultiSelectRow(this);
  //     }
  //     if (oThis.options.showNumCol) {
  //       htmlStrNumCol += oThis.createContentLeftNumColRow(i, row.value);
  //     }
  //   });
  //   try {
  //     if (endFlag) {
  //       $('#' + this.options.id + '_content_div tbody')[0].insertAdjacentHTML('beforeEnd', htmlStr);
  //     } else {
  //       if ($('#' + this.options.id + '_content_div').find('tbody').find('tr[role="row"]')[index]) $('#' + this.options.id + '_content_div').find('tbody').find('tr[role="row"]')[index].insertAdjacentHTML('beforeBegin', htmlStr);
  //       else if ($('#' + this.options.id + '_content_div tbody')[0]) $('#' + this.options.id + '_content_div tbody')[0].insertAdjacentHTML('afterBegin', htmlStr);
  //     }
  //     if (endFlag) {
  //       $('#' + this.options.id + '_content_fixed_div tbody')[0].insertAdjacentHTML('beforeEnd', htmlStrFixed);
  //     } else {
  //       if ($('#' + this.options.id + '_content_fixed_div').find('tbody').find('tr[role="row"]')[index]) $('#' + this.options.id + '_content_fixed_div').find('tbody').find('tr[role="row"]')[index].insertAdjacentHTML('beforeBegin', htmlStrFixed);
  //       else if ($('#' + this.options.id + '_content_fixed_div tbody')[0]) $('#' + this.options.id + '_content_fixed_div tbody')[0].insertAdjacentHTML('afterBegin', htmlStrFixed);
  //     }
  //   } catch (e) {
  //     //IE情况下
  //     var table = $('#' + this.options.id + '_content_div table')[0];
  //     var fixedTable = $('#' + this.options.id + '_content_fixed_div table')[0];
  //     if (table && fixedTable) {
  //       $.each(rowObjArr, function (i) {
  //         oThis.createContentOneRowForIE(table, index + i, this);
  //         oThis.createContentOneRowForIE(fixedTable, index + i, this, 'fixed');
  //       });
  //     }
  //   }
  //   if (this.options.multiSelect) {
  //     if (endFlag) {
  //       $('#' + this.options.id + '_content_multiSelect')[0].insertAdjacentHTML('beforeEnd', htmlStrmultiSelect);
  //     } else {
  //       var _content_multiSelect = $('#' + this.options.id + '_content_multiSelect').find('div')[index];
  //       if (_content_multiSelect) _content_multiSelect.insertAdjacentHTML('beforeBegin', htmlStrmultiSelect);
  //       else $('#' + this.options.id + '_content_multiSelect')[0].insertAdjacentHTML('afterBegin', htmlStrmultiSelect);
  //     }
  //     if (this.options.sumRowFirst && !this.options.sumRowFixed && this.dataSourceObj.rows.length > 0) $('#' + this.options.id + '_content_multiSelect').addClass('u-grid-content-left-sum-first');
  //   }
  //   if (this.options.showNumCol) {
  //     if (endFlag) {
  //       $('#' + this.options.id + '_content_numCol')[0].insertAdjacentHTML('beforeEnd', htmlStrNumCol);
  //     } else {
  //       var _content_multiSelect = $('#' + this.options.id + '_content_numCol').find('div')[index];
  //       if (_content_multiSelect) _content_multiSelect.insertAdjacentHTML('beforeBegin', htmlStrNumCol);
  //       else $('#' + this.options.id + '_content_numCol')[0].insertAdjacentHTML('afterBegin', htmlStrNumCol);
  //     }
  //     if (this.options.sumRowFirst && !this.options.sumRowFixed && this.dataSourceObj.rows.length > 0) $('#' + this.options.id + '_content_numCol').addClass('u-grid-content-left-sum-first');
  //     this.resetNumCol();
  //     this.updateNumColLastRowFlag();
  //   }
  //   this.repairSumRow();
  //   if (this.dataSourceObj.rows.length > 0) {
  //     $('#' + this.options.id + '_grid .u-grid-noScroll-left').css('display', "block");
  //   } else {
  //     $('#' + this.options.id + '_grid .u-grid-noScroll-left').css('display', "none");
  //   }
  //   this.noRowsShowFun();
  //   var obj = {};
  //   obj.begin = index;
  //   obj.length = rows.length;
  //   this.renderTypeFun(obj);
  // }

  // this.updateLastRowFlag();
  // this.isCheckedHeaderRow();
  // this.resetLeftHeight();
  // };
  // songyd3 修复点击行内参照时带入上一行Float类型中的数据问题
  gridCompProto.editClose = function () {
    var dohideFlag = true; //标记是否执行过hide、blur事件
    if (this.eidtRowIndex < 0 || this.editColIndex < 0) return;
    var row = this.dataSourceObj.rows[this.eidtRowIndex];
    var editField = this.gridCompColumnArr[this.editColIndex].options.field;
    var inputDom = null;
    //在chrome下
    // if (dohideFlag && this.editComp && this.editComp.hide) {
    // 	this.editComp.hide();
    // 	dohideFlag = false;
    // }

    // try {
    // 	var inputDom = this.editComp.element.parentNode.querySelector('input');
    // } catch (e) {}

    // if (dohideFlag && inputDom) {
    // 	inputDom.blur();
    // 	dohideFlag = false;
    // }

    // if (dohideFlag && this.editComp && this.editComp.comp && this.editComp.comp.hide) {
    // 	this.editComp.comp.hide();
    // 	dohideFlag = false;
    // }
    // 按理说应该是使用dohideFlag做为标志，调用hide方法就不走blur（即上面注释那段）。但是为了兼容ie在第一行输入‘32424’，点击第二行，在回到一行就不可输入了
    // if (this.editComp && this.editComp.hide) {
    //     this.editComp.hide();
    //     dohideFlag = false;
    // }
    // songyd3 修复点击行内参照时带入上一行Float类型中的数据问题
    if (this.editComp && this.editComp.hide && this.editComp.field == editField) {
      this.editComp.hide();
      dohideFlag = false;
    }

    try {
      var inputDom = this.editComp.element.parentNode.querySelector('input');
    } catch (e) { }

    if (inputDom) {
      inputDom.blur();
      dohideFlag = false;
    }

    if (this.editComp && this.editComp.comp && this.editComp.comp.hide) {
      this.editComp.comp.hide();
      dohideFlag = false;
    }
    try {
      $('#' + this.options.id + '_placeholder_div').remove();
    } catch (e) { }

    if (!row) return;
    if (this.options.editType != 'form') {
      //this.repaintRow(this.eidtRowIndex);
      var obj = {};
      obj.begin = this.eidtRowIndex;
      obj.length = 1;
      obj.field = editField;
      this.renderTypeFun(obj);
    }

    $('#' + this.options.id + '_content_edit_menu').css('display', 'none');
    this.repairSumRow();
    this.noRowsShowFun();
    this.updateLastRowFlag();
    this.eidtRowIndex = -1;
    // form形式删除对应区域,存在切换编辑形式的情况，所以一直删除
    // if(this.options.editType == 'form'){
    $('#' + this.options.id + '_multiSelect_edit').remove(null, true);
    $('#' + this.options.id + '_numCol_edit').remove(null, true);
    $('#' + this.options.id + '_edit_tr').remove(null, true);
    $('#' + this.options.id + '_edit_tr1').remove(null, true);
    // }
  };
  //增加空判断
  gridCompProto.resetThVariableDrag = function(nowTh, gridCompColumn, width) {
    var $resize_handle = $('#' + this.options.id + '_resize_handle');
    if ($resize_handle[0] && !$resize_handle[0].nowTh && gridCompColumn.options.canDrag) {
        $resize_handle.css('left', width - 4 + this.leftW);
        $resize_handle[0].nowTh = nowTh;
    }
  }
  // ----------------------grid方法复写 end----------------------






  // ----------------------分页方法复写 start----------------------
  // 复写分页全局配置
  u.pagination.prototype.DEFAULTS.showBtnOk = false;
  // u.pagination.prototype.DEFAULTS.pageList = [5, 10, 20, 50, 100, 1000];
  // u.pagination.prototype.DEFAULTS.pageList = [15, 30, 45, 60, 75, 1000];
  u.pagination.prototype.DEFAULTS.pageList = [15, 30, 50, 100];

  //扩展翻页前事件
  var old_pageInit = u.PaginationAdapter.prototype.init;
  u.PaginationAdapter.prototype.init = function () {
    old_pageInit.call(this);
    this.beforePageChange = u.getFunction(this.viewModel, this.options['beforePageChange']);
  }
  var old_pagination_page = u.pagination.prototype.page;
  u.pagination.prototype.page = function (pageIndex, totalPages, pageSize) {
    var beforePageChange = this.element['u-meta'].beforePageChange;
    if (typeof beforePageChange == "function") {
      var tmpPageIndex = pageIndex;
      if (tmpPageIndex <= 0) {
        tmpPageIndex = 1;
      }
      if (tmpPageIndex > totalPages) {
        tmpPageIndex = totalPages;
      }
      tmpPageIndex = pageIndex - 1 < 0 ? 0 : pageIndex - 1;
      var canChange = beforePageChange(tmpPageIndex, totalPages, pageSize);
      if (!canChange) {
        return;
      }
    }
    old_pagination_page.apply(this, arguments);
  }

  // ----------------------分页方法复写 end----------------------




  // ----------------------校验方法扩展或复写 start----------------------
  // u.Validate.prototype._needClean = function () {
  //   this.flag_ = 0;
  //   return false;
  // }
  var old_onFocusin = u.FloatAdapter.prototype.onFocusin;
  u.FloatAdapter.prototype.onFocusin = function () {
    if (this.validate.flag_ === 0) {
      this.validate.flag_ = 1;
    } else {
      old_onFocusin.call(this);
    }
  }
  var old_init = u.StringAdapter.prototype.onFocusin;
  u.StringAdapter.prototype.onFocusin = function () {
    if (this.validate.flag_ === 0) {
      this.validate.flag_ = 1;
    } else {
      old_init.call(this);
    };
  }
  // 校验使用元素显示值
  App.prototype.compsValidateMultiParam = function (options) {
    var element = options.element,
      comps = this.getComps(element),
      passed = true,
      showMsg = options.showMsg,
      notPassedArr = new Array();
    for (var i = 0; i < comps.length; i++) {
      if (comps[i].doValidate) {
        var _needTrueValue = true;
        if (comps[i].type == "u-text" && comps[i].validType != "float") {
          _needTrueValue = false;
          // $(comps[i].element).addClass('red-border');
        } else {
          // $(comps[i].element).removeClass('red-border');
        }
        var result = comps[i].doValidate({
          trueValue: _needTrueValue,
          showMsg: showMsg
        });
        // 如果passed为true,result.passed为false说明第一次出现错误校验
        if (passed && !result.passed) {
          var off = u.getOffset(comps[i].element);
          //滚动到第一次出现错误的地方
          window.scrollTo(0, off.top - 80);
          if (u.isIPAD) {
            // ipad上面云表单提交校验的时候没有滚动到对应位置
            window.top.scrollTo(0, off.top - 80);
          }
        }
        passed = result.passed && passed;
        if (!result.passed) {
          notPassedArr.push(result);
        }
      }
    }
    return {
      passed: passed,
      notPassedArr: notPassedArr
    };
  };
  //grid校验选中未通过校验行，清除上次校验未通过央视
  if (u.GridAdapter) {
    u.GridAdapter.prototype.doValidate = function (options) {
      var rows = this.grid.dataSourceObj.rows,
        gridColumnArr = this.grid.gridCompColumnArr,
        passed = true,
        MsgArr = new Array(),
        evalStr = '',
        rowMsg = '',
        wholeMsg = '',
        columnShowMsg = '',
        hasErrow = false;
      // 清除上次校验未通过的单元格样式
      this.$element.find("td,td div").removeClass("u-grid-err-td");
      // 遍历所有列
      for (var j = 0; j < gridColumnArr.length; j++) {
        // 遍历所有行
        var column = gridColumnArr[j],
          columnOptions = gridColumnArr[j].options,
          field = columnOptions.field,
          title = columnOptions.title,
          required = columnOptions.required,
          validType = '',
          placement = '',
          tipId = '',
          errorMsg = '',
          nullMsg = '',
          maxLength = '',
          minLength = '',
          max = '',
          min = '',
          maxNotEq = '',
          minNotEq = '',
          reg = '';
        if (columnOptions.editOptions) {
          validType = columnOptions.editOptions.validType;
          placement = columnOptions.editOptions.placement;
          tipId = columnOptions.editOptions.tipId;
          errorMsg = columnOptions.editOptions.errorMsg;
          nullMsg = columnOptions.editOptions.nullMsg;
          maxLength = columnOptions.editOptions.maxLength;
          minLength = columnOptions.editOptions.minLength;
          max = columnOptions.editOptions.max;
          min = columnOptions.editOptions.min;
          maxNotEq = columnOptions.editOptions.maxNotEq;
          minNotEq = columnOptions.editOptions.minNotEq;
          reg = columnOptions.editOptions.regExp;
          required = columnOptions.editOptions.required || columnOptions.required || '';
        }

        var columnPassedFlag = true,
          columnMsg = '',
          elel = document.body;
        if (this.editComponent[field] && this.editComponent[field].element) {
          elel = this.editComponent[field].element;
        }
        var validate$$1 = new u.Validate({
          el: elel,
          single: true,
          required: required,
          validType: validType,
          placement: placement,
          tipId: tipId,
          errorMsg: errorMsg,
          nullMsg: nullMsg,
          maxLength: maxLength,
          minLength: minLength,
          max: max,
          min: min,
          maxNotEq: maxNotEq,
          minNotEq: minNotEq,
          reg: reg,
          showFix: true
        });
        for (var i = 0; i < rows.length; i++) {
          var value = rows[i].value[field];
          var result = validate$$1.check({
            pValue: value,
            showMsg: false
          });
          passed = result.passed && passed;
          if (!result.passed) {
            columnPassedFlag = false;
            if (options.showMsg && columnMsg.indexOf(result.Msg) < 0) {
              columnMsg += result.Msg + ' ';
            }
            // 设置背景色
            var index = this.grid.getIndexOfColumn(column);
            var contentDiv = document.getElementById(this.grid.options.id + '_content_tbody');
            var row = contentDiv.querySelectorAll('tr')[i];
            var td = row.querySelectorAll('td')[index];
            var div = td.querySelector('div');
            u.addClass(td, 'u-grid-err-td');
            u.addClass(div, 'u-grid-err-td');
            var msg = '(' + title + ')' + result.Msg + ';';
            evalStr = 'if(typeof obj' + i + ' == \'undefined\'){var obj' + i + '= {}; MsgArr.push(obj' + i + ');obj' + i + '.rowNum = ' + i + '; obj' + i + '.arr = new Array();}obj' + i + '.arr.push(msg)';
            eval(evalStr);
          }
        }
        // 如果存在错误信息并且提示信息
        if (!columnPassedFlag && options.showMsg) {
          columnShowMsg += title + ':' + columnMsg + '<br>';
        }
        if (!columnPassedFlag) {
          if (!hasErrow) {
            // 滚动条要滚动到第一次出现错误的数据列
            hasErrow = true;
            var ind = this.grid.getIndexOfColumn(column);
            var thDom = $('#' + this.grid.options.id + '_header_table th', this.grid.$ele)[ind];
            var left = thDom.attrLeftTotalWidth;
            var contentDom = $('#' + this.grid.options.id + '_content_div', this.grid.$ele)[0];
            contentDom.scrollLeft = left;
          }
        }
      }
      if (columnShowMsg) u.showMessage({
        msg: columnShowMsg,
        showSeconds: 3
      });
      if (MsgArr.length > 0) {
        MsgArr.sort(function (a1, a2) {
          if (a1.rowNum > a2.rowNum) return 1;
          else return -1;
        });
      }
      var needselectIndexs = [];
      for (var k = 0; k < MsgArr.length; k++) {
        var rowNum = MsgArr[k].rowNum;
        rowMsg = MsgArr[k].arr.join('');
        needselectIndexs.push(rowNum);
        wholeMsg += '第' + (rowNum + 1) + '行:' + rowMsg;
      }
      if (needselectIndexs.length > 0) {
        this.dataModel.setRowsSelect(needselectIndexs);
      }
      return {
        passed: passed,
        comp: this,
        Msg: wholeMsg
      };
    }

  }
  //复写提示逻辑
  // u.Validate.fn.showMsg = function(msg) {
  // 	if (this.showMsgFlag == false || this.showMsgFlag == 'false') {
  // 		return;
  // 	}
  // 	var self = this;
  // 	var inputWidth = this.element.offsetWidth;
  // 	var inputHeight = this.element.offsetHeight;
  // 	var left = this.element.offsetLeft;
  // 	var top = this.element.offsetTop;
  // 	var html = '<div style="position:absolute;text-align:right;color:red;width:' + inputWidth + 'px;height:' + inputHeight + 'px;left:' + left + 'px;top:' + top + 'px;">' + msg + '</div>';
  // 	this.element.parentNode.appendChild($(html)[0]);
  // 	if (this.tipAliveTime !== -1) {
  // 		clearTimeout(this.timeout)
  // 		this.timeout = setTimeout(function() {
  // 			// self.tooltip.hide();
  // 			self.hideMsg();
  // 		}, this.tipAliveTime)
  // 	}
  // }
  // u.Validate.fn.hideMsg = function() {
  //
  // }
  //---------------------- 校验方法扩展或复写 end----------------------



  // ------------datatable相关方法扩展或复写 start----------------
  var oldRowGetSimpleData = Row.prototype.getSimpleData;
  Row.prototype.getSimpleData = function () {
    var _data = oldRowGetSimpleData.apply(this, arguments);
    _data.persistStatus = this.status;
    return _data
  }
  //正确处理date类型数据
  Row.prototype.formatValue = function formatValue(field, value) {
    if (value && value.replace) {
      value = value.replace(/</g, "&#60;").replace(/"/g, "&#34;").replace(/'/g, "&#39;");
    }
    var type = this.parent.getMeta(field, 'type');
    if (!type) return value;
    if (type == 'datetime') {
      return _formatDate(value);
      //return u.formatValue()
    }
    else if (type == 'date') {
      return u.date.format(value, "YYYY-MM-DD");
    }
    return value;
  };

  var _formatDate = function _formatDate(value) {
    if (!value) return value;
    var date = new Date();
    date.setTime(value);
    //如果不能转为Date 直接返回原值
    if (isNaN(date)) {
      return value;
    }
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    if (parseInt(month) < 10) month = "0" + month;
    var day = date.getDate();
    if (parseInt(day) < 10) day = "0" + day;
    var hours = date.getHours();
    if (parseInt(hours) < 10) hours = "0" + hours;
    var minutes = date.getMinutes();
    if (parseInt(minutes) < 10) minutes = "0" + minutes;
    var seconds = date.getSeconds();
    if (parseInt(seconds) < 10) seconds = "0" + seconds;
    var mill = date.getMilliseconds();
    var formatString = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds; //+ "." + mill;
    return formatString;
  };

  // 扩展DataTable方法，获取所有真实（状态不为fdel）行
  u.DataTable.prototype.getAllRealRows = function () {
    return this.rows().filter(function (row) {
      return row.status != u.Row.STATUS.FALSE_DELETE;
    })
  }
  // 扩展DataTable方法，获取所有真实（状态不为fdel）数据
  u.DataTable.prototype.getRealSimpleData = function () {
    var realSimpleData = [];
    for (var i = 0; i < this.rows().length; i++) {
      var row = this.rows()[i];
      if (row.status != u.Row.STATUS.FALSE_DELETE) {
        realSimpleData.push(row.getSimpleData());
      }
    }
    return realSimpleData;
  }
  // 扩展DataTable方法，通过rowid设置row选中
  u.DataTable.prototype.setRowSelectbyRowId = function (rowId) {
    var index = this.getIndexByRowId(rowId);
    this.setRowsSelect([index]);
    this.setRowFocus(this.getSelectedIndex());
  }

  // // 修复存在选中行，新增行时序号列显示为选中而其他列显示为未选中bug
  // u.DataTable.prototype.removeRows = function (indices) {
  //   debugger
  // //  indices = (0, this._util._formatToIndicesArray)(this, indices);
  //   indices = indices.sort();
  //   var rowIds = [],
  //     rows = this.rows(),
  //     deleteRows = [];
  //   for (var i = indices.length - 1; i >= 0; i--) {
  //     var index = indices[i];
  //     var delRow = rows[index];
  //     if (delRow == null) {
  //       continue;
  //     }
  //     rowIds.push(delRow.rowId);
  //     var deleteRow = rows.splice(index, 1);
  //     deleteRows.push(deleteRow[0]);
  //     this.updateSelectedIndices(index, '-');
  //     this.updateFocusIndex(index, '-');
  //   }
  //   this.rows(rows);
  //   this.deleteRows = deleteRows;
  //   this.trigger(DataTable.ON_DELETE, {
  //     indices: indices,
  //     rowIds: rowIds,
  //     deleteRows: deleteRows
  //   });
  //   this.updateCurrIndex();
  // }
  // // 扩展DataTable方法，新增后在第一行显示
  // u.DataTable.prototype.addRow = function (row) {
  //  // debugger
  //   this.insertRow(0, row);
  //   this.resetDelRowEnd();
  // };

  // // 扩展DataTable方法，新增后在第一行显示
  // u.DataTable.prototype.addRow = function (row) {
  // //   debugger
  //    this.insertRow(0, row);
  //    this.resetDelRowEnd();
  //  };
  // //扩展DataTable方法
  // u.DataTable.prototype.insertRow = function insertRow(index, row) {
  //   if (!row) {
  //     row = new Row({ parent: this });
  //   }
  //   this.insertRows(index, [row]);
  // };
  // // 扩展DataTable方法
  // u.DataTable.prototype.insertRows = function insertRows(index, rows) {
  //  // debugger
  //   var args = [index, 0];
  //   for (var i = 0; i < rows.length; i++) {
  //     args.push(rows[i]);
  //   }
  //   var preRows = this.rows;
  //   this.rows.splice.apply(this.rows, args);
  //  // var l =this.dataSourceObj.rows.length;
  //   this.updateSelectedIndices(index, '+', rows.length);
  //   this.updateFocusIndex(index, '+', rows.length);

  //   this.trigger(DataTable.ON_INSERT, {
  //     index: index,
  //     rows: rows
  //   });
  //   if (this.ns) {
  //     if (this.root.valueChange[this.ns]) this.root.valueChange[this.ns](-this.root.valueChange[this.ns]());
  //   }
  // };

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };
  // 扩展DateTable方法，setSimpleData可以保留数据持久化状态（新增、修改、删除）
  u.DataTable.prototype.setSimpleData = function (data, options, usePersistStauts) {
    // 默认不选中第一行
    if (!options) {
      options = { unSelect: true };
    }
    this.removeAllRows();
    this.cachedPages = [];
    this.focusIndex(-1);
    this.selectedIndices([]);

    this.setSimpleDataReal = [];
    // if (!data) {
    //   this.setSimpleDataReal = data;
    //   throw new Error("dataTable.setSimpleData param can't be null!");
    //   return;
    // }

    var rows = [];
    if (!u.isArray(data)) data = [data];
    for (var i = 0; i < data.length; i++) {
      var _data = data[i];
      /* 判断data中的字段在datatable中是否存在，如果不存在则创建 */
      for (var f in _data) {
        this.createField(f)
      }
      if (_typeof(data[i]) !== 'object') _data = {
        $data: data[i]
      };
      if (usePersistStauts === true) {
        if (_data.persistStatus) {
          rows.push({
            status: _data.persistStatus,
            data: _data
          });
        } else {
          rows.push({
            status: Row.STATUS.NORMAL,
            data: _data
          });
        }
      } else {
        if (options && options.status) {
          rows.push({
            status: options.status,
            data: _data
          });
        } else {
          rows.push({
            status: Row.STATUS.NORMAL,
            data: _data
          });
        }
      }
    }
    var _data = {
      rows: rows
    };
    if (options) {
      if (typeof options.fieldFlag == 'undefined') {
        options.fieldFlag = true;
      }
    }
    this.setData(_data, options);
  };
  // // 创建空行默认不选中
  // u.DataTable.prototype.createEmptyRow = function (options) {
  //     var r = new u.Row({
  //         parent: this
  //     });
  //     this.addRow(r);
  //     var unSelect = options ? options.unSelect : true;
  //     if (!unSelect) {
  //         if (!this.getCurrentRow()) this.setRowSelect(r);
  //     }
  //     return r;
  // };
  //创建聚焦行
  u.DataTable.prototype.createFocusRow = function(rowSimpleData) {
    var createRow = this.createEmptyRow();
    this.setRowFocus(createRow);
    rowSimpleData && createRow.setSimpleData(rowSimpleData);
    return createRow;
  }
  //按字段排序 orderType="asc"(默认) || "desc"
  u.DataTable.prototype.sortByField = function(field, orderType) {
    var dataTable = this;
    var oldFocusRow = dataTable.getFocusRow();
    dataTable.rows.sort(function(a, b) {
      var aField = parseInt(a.ref(field)());
      aField = isNaN(aField) ? 0 : aField;
      var bField = parseInt(b.ref(field)());
      bField = isNaN(bField) ? 0 : bField;
      return orderType === "desc" ? bField - aField : aField - bField;
    });
    dataTable.setRowFocus(oldFocusRow);
  }
  //----------------- datatable相关方法扩展或复写 end----------



  // ----------------------renderType复写 start----------------------
  window.booleanRender = function (obj) {
    var grid = obj.gridObj;
    var datatable = grid.dataTable;
    var rowId = obj.row.value['$_#_@_id'];
    var row = datatable.getRowByRowId(rowId);
    var checkStr = '',
      disableStr = '';

    if (obj.value == 'Y' || obj.value == 'true' || obj.value == '1' || obj.value == 1) {
      checkStr = ' is-checked';
    }
    if (grid.options.editType == 'form') {
      disableStr = ' is-disabled';
    }
    var htmlStr = '<label class="u-checkbox is-upgraded ' + checkStr + disableStr + '">' +
      '<input type="checkbox" class="u-checkbox-input">' +
      '<span class="u-checkbox-label"></span>' +
      '<span class="u-checkbox-focus-helper"></span><span class="u-checkbox-outline"><span class="u-checkbox-tick-outline"></span></span>' +
      '</label>'

    obj.element.innerHTML = htmlStr;


    $(obj.element).find('input').on('click', function (e) {
      $(this).parent().toggleClass('is-checked');
      // if (!obj.gridObj.options.editable) {
      //   u.stopEvent(e);
      //   return false;
      // }
      if ($(this).parent().hasClass('is-checked')) {
        this.checked = true;
      } else {
        this.checked = false;
      }
      var value = this.checked ? "1" : "0";
      var column = obj.gridCompColumn
      var field = column.options.field
      row.setValue(field, value);
    })
  }
  window.disableBooleanRender = function (obj) {

    var grid = obj.gridObj;
    var datatable = grid.dataTable;
    var rowId = obj.row.value['$_#_@_id'];
    var row = datatable.getRowByRowId(rowId);
    var checkStr = '',
      disableStr = '';

    if (obj.value == 'Y' || obj.value == 'true' || obj.value == '1' || obj.value == 1) {
      checkStr = 'is-checked';
    }
    disableStr = ' is-disabled';
    var htmlStr = '<label class="u-checkbox is-upgraded ' + checkStr + disableStr + '">' +
      '<input type="checkbox" class="u-checkbox-input">' +
      '<span class="u-checkbox-label"></span>' +
      '<span class="u-checkbox-focus-helper"></span><span class="u-checkbox-outline"><span class="u-checkbox-tick-outline"></span></span>' +
      '</label>'

    obj.element.innerHTML = htmlStr;

  }
  window.percentRender = function (obj) {
    //需要处理精度

    var grid = obj.gridObj;
    var column = obj.gridCompColumn;
    var field = column.options.field;
    var rowIndex = obj.rowIndex;
    var datatable = grid.dataTable;
    var rowId = $(grid.dataSourceObj.rows[rowIndex].value).attr("$_#_@_id");
    var row = datatable.getRowByRowId(rowId);
    if (!row) return;
    var rprec = row.getMeta(field, 'precision') || column.options.precision;
    var maskerMeta = u.core.getMaskerMeta('percent') || {};
    var precision = typeof parseFloat(rprec) == 'number' ? rprec : maskerMeta.precision;
    maskerMeta.precision = precision;
    if (maskerMeta.precision) {
      maskerMeta.precision = parseInt(maskerMeta.precision) + 2;
    }

    var formater = new u.NumberFormater(maskerMeta.precision);
    var masker = new u.PercentMasker(maskerMeta);
    var svalue = masker.format(formater.format(obj.value)).value;
    obj.element.innerHTML = svalue;
    // $(obj.element).css('text-align', 'right');
    $(obj.element).attr('title', svalue);

    // 根据惊道需求增加renderType之后的处理,此处只针对grid.js中的默认render进行处理，非默认通过renderType进行处理
    if (typeof afterRType == 'function') {
      afterRType.call(this, obj);
    }
  }
  window.comboTextRender = function(obj) {
    var enumkey = obj.gridCompColumn.options.comboParam.enumkey;
    var comboText = "";
    var dataSource = enuminfo[enumkey].dataSource;
    for(var i=0; i<dataSource.length; i++) {
      if(dataSource[i].value === obj.value) {
        comboText = dataSource[i].name;
        break;
      }
    }
    obj.element.innerHTML = comboText;
  }
  // ----------------------renderType复写 end----------------------

  // ----------------------处理showloader z-index防止多次操作 start----------------------
  var oldshowLoader = u.showLoader;
  u.showLoader = function (options) {
    oldshowLoader.call(this, options);
    var zIndex = u.getZIndex();
    $('.u-loader-container:eq(0)').css('z-index', zIndex);
  }

  // ----------------------处理showloader z-index防止多次操作 end----------------------

  // ----------------------覆写dialogMode的原型方法，只拖拽表头部分  start----------------------

  u.dialogMode.prototype.drag = function () {
    // 原定位方法容易使鼠标脱离需移动的盒子
    var box = $(this.content).closest('.u-msg-dialog')[0],
      triggerbox = $(this.content).find('.u-msg-title')[0],
      _X,
      _Y;//由于dialog采用相对定位，根据等式clientX1 - left1 = clientX2 - left2原理实现，而不是基于浏览器左上定位
    triggerbox.onmousedown = function (ev) {
      var oEvent = ev || event;
      _X = oEvent.clientX - parseInt($(box).css("left"));
      _Y = oEvent.clientY - parseInt($(box).css("top"));
      document.onmousemove = function (ev) {
        var oEvent = ev || event;
        var l = oEvent.clientX - _X;
        var t = oEvent.clientY - _Y;
        box.style.left = l + 'px';
        box.style.top = t + 'px';
      };
      document.onmouseup = function () {
        document.onmousemove = null;
        document.onmouseup = null; //鼠标抬起来后，清除onmouseup
      };
      return false; //阻止默认行为
    };
  };

  //可编辑renderType定义
  $.fn.grid.editableRenderType = {
    referRender: true,
  }
})
