/**
 * neoui-kero v3.2.4
 * neoui kero
 * author : [object Object]
 * homepage : https://github.com/iuap-design/neoui-kero#readme
 * bugs : https://github.com/iuap-design/neoui-kero/issues
 **/
/**
 * tinper-neoui-grid v3.2.4
 * grid
 * author : yonyou FED
 * homepage : https://github.com/iuap-design/tinper-neoui-grid#readme
 * bugs : https://github.com/iuap-design/tinper-neoui-grid/issues
 */

(function () {
'use strict';

/*
 * 处理参数
 */
var init = function init(options, gridComp) {
    this.defaults = {};
    this.gridComp = gridComp;
    this.options = $.extend({}, this.defaults, options);
    this.rows = new Array(); // 存储数据行
    this.hasParentRows = new Array(); // 存在父项
    this.nothasParentRows = new Array(); // 不存在父项
};
/*
 * 将values转化为rows并进行排序
 */
var sortRows = function sortRows(field, sortType) {
    var self = this;
    if (typeof this.gridComp.options.filterDataFun == 'function') {
        this.options.values = this.gridComp.options.filterDataFun.call(this, this.options.values);
    }
    if (this.gridComp.options.showTree) {
        this.treeSortRows(field, sortType);
    } else {
        this.basicSortRows(field, sortType);
    }
    this.gridComp.eidtRowIndex = -1;
    if (self.gridComp && self.gridComp.selectRows && self.gridComp.selectRows.length > 0) {
        $.each(this.rows, function () {
            var row = this;
            $.each(self.gridComp.selectRows, function () {
                var selectRow = this;
                if (row.value['$_#_@_id'] == selectRow['$_#_@_id']) row.checked = true;
            });
        });
    }
};
/*
 * 将values转化为rows并进行排序(标准)
 */
var basicSortRows = function basicSortRows(field, sortType) {
    var oThis = this,
        dataType = "";
    if (field) {
        dataType = this.gridComp.getColumnByField(field).options.dataType;
    }
    this.rows = new Array();
    this.groupRows = new Array();
    if (this.options.values) {
        $.each(this.options.values, function (i) {
            var rowObj = {};
            rowObj.value = this;
            rowObj.valueIndex = i;
            oThis.rows.push(rowObj);
            oThis.gridComp.getGroupIndex(this, i, rowObj);
            oThis.rows = oThis.getGroupRows();
        });
    }
};
var treeSortRows = function treeSortRows(field, sortType) {
    this.basicSortRows(field, sortType);
};
/*
 * 获取合计值
 */
var getSumValue = function getSumValue(field, gridCompColumn, gridComp) {
    var sumValue = null;
    if (gridCompColumn.options.sumCol) {
        $.each(this.rows, function (i) {
            var v = $(this.value).attr(field);
            if (gridCompColumn.options.dataType == 'Int') {
                v = gridComp.getInt(v, 0);
                sumValue += parseInt(v);
            } else {
                v = gridComp.getFloat(v, 0);
                sumValue = gridComp.accAdd(sumValue, parseFloat(v));
            }
        });
    }
    // 处理精度
    if (gridCompColumn.options.dataType == 'Float' && gridCompColumn.options.precision) {
        var o = {};
        o.value = sumValue;
        o.precision = gridCompColumn.options.precision;
        sumValue = gridComp.DicimalFormater(o);
    }
    if (sumValue != null && sumValue != undefined && sumValue != 'null' && sumValue != 'undefined') {
        return sumValue + '';
    } else {
        return '';
    }
};

var getGroupSumValue = function getGroupSumValue(field, gridCompColumn, groupRow) {
    var sumValue = null;
    var gridComp = this.gridComp;
    if (gridCompColumn.options.sumCol) {
        $.each(groupRow.rows, function (i) {
            var v = $(this.value).attr(field);
            if (gridCompColumn.options.dataType == 'Int') {
                v = gridComp.getInt(v, 0);
                sumValue += parseInt(v);
            } else {
                v = gridComp.getFloat(v, 0);
                sumValue = gridComp.accAdd(sumValue, parseFloat(v));
            }
        });
    }
    // 处理精度
    if (gridCompColumn.options.dataType == 'Float' && gridCompColumn.options.precision) {
        var o = {};
        o.value = sumValue;
        o.precision = gridCompColumn.options.precision;
        sumValue = gridComp.DicimalFormater(o);
    }
    if (sumValue != null && sumValue != undefined && sumValue != 'null' && sumValue != 'undefined') {
        return sumValue + '';
    } else {
        return '';
    }
};

var addOneRowGroup = function addOneRowGroup(rowObj) {
    var groupField = this.gridComp.options.groupField,
        hasGroupFlag = false;
    if (groupField) {
        var groupValue = this.gridComp.getString($(rowObj.value).attr(groupField), '');
        if (!this.groupRows) this.groupRows = new Array();
        //[{value:1,length,rows:[{},{}]},{value:2,rows:[{},{}},{value:3,rows:[{},{}}]
        $.each(this.groupRows, function (i) {
            var nowGroup = this;
            if (nowGroup.value == groupValue) {
                hasGroupFlag = true;
                nowGroup.length = parseInt(nowGroup.length) + 1;
                nowGroup.rows.push(rowObj);
            }
        });
        if (!hasGroupFlag) {
            var newGroupRow = {
                value: groupValue,
                length: 1,
                rows: [rowObj]
            };
            this.groupRows.push(newGroupRow);
        }
    }
};

var getGroupRows = function getGroupRows() {
    var groupField = this.gridComp.options.groupField,
        rows = [];
    if (groupField) {
        if (this.groupRows && this.groupRows.length > 0) {
            $.each(this.groupRows, function () {
                $.each(this.rows, function () {
                    rows.push(this);
                });
            });
        }
    } else {
        rows = this.rows;
    }
    return rows;
};
var initFunObj = {
    init: init,
    sortRows: sortRows,
    basicSortRows: basicSortRows,
    treeSortRows: treeSortRows,
    getSumValue: getSumValue,
    getGroupSumValue: getGroupSumValue,
    addOneRowGroup: addOneRowGroup,
    getGroupRows: getGroupRows
};

var sort_initEventFun = function sort_initEventFun() {
    // 扩展方法
    var oThis = this;
    $('#' + this.options.id).on('mouseup', function (e) {
        if ($(e.target).closest('#' + oThis.options.id + '_header').length > 0) {
            // 点击的是header区域
            oThis.mouseUpX = e.clientX;
            oThis.mouseUpY = e.clientY;
            //点击过程中鼠标没有移动
            if (oThis.mouseDownX == oThis.mouseUpX && oThis.mouseDownY == oThis.mouseUpY) {
                //或者移动距离小于5px(由于移动之后会显示屏幕div，暂时不做处理)
                oThis.columnClickX = e.clientX;
                oThis.columnClickY = e.clientY;
                var eleTh = $(e.target).closest('th')[0];
                if ($(e.target).hasClass('u-grid-header-columnmenu')) {} else {
                    // 执行click操作,进行排序
                    oThis.canSortable(e, eleTh);
                }
            }
        } else if ($(e.target).closest('#' + oThis.options.id + '_content').length > 0) {
            // 点击的是数据区域

        }
    });
};
var sort_initGridEventFun = function sort_initGridEventFun() {
    // 扩展方法
    var oThis = this;
};
/*
 * 处理排序
 */
var canSortable = function canSortable(e, ele) {
    var oThis = this,
        $ele = $(ele),
        field = $ele.attr('field'),
        sortable = this.getColumnAttr('sortable', field);
    if (sortable) {
        if (e.ctrlKey) {
            // 构建排序信息的数据结构
            var prioArray = [];
            $('.u-grid-header-sort-priority').each(function (index, domEle) {
                var $el = $(domEle);
                var p = parseInt($el.text());
                var f = $el.closest('th').attr('field');
                var st;
                if ($el.parent().hasClass("uf-arrow-down")) {
                    st = 'asc';
                } else if ($el.parent().hasClass("uf-arrow-up")) {
                    st = 'desc';
                }
                prioArray[p - 1] = {
                    field: f,
                    sortType: st
                };
            });
            // 页面调整
            /*修改ue将caret调整为caret*/
            var $caret;
            if (($caret = $ele.find('.uf-arrow-down')).length > 0) {
                var p = parseInt($caret.find('.u-grid-header-sort-priority').text());
                prioArray[p - 1].sortType = 'desc';
                $caret.removeClass('uf-arrow-down').addClass('uf-arrow-up');
            } else if (($caret = $ele.find('.uf-arrow-up')).length > 0) {
                var p = parseInt($caret.find('.u-grid-header-sort-priority').text());
                for (var i = p; i < prioArray.length; i++) {
                    var $flag = $('[field=' + prioArray[i].field + ']').find('.u-grid-header-sort-priority');
                    $flag.text(parseInt($flag.text()) - 1);
                }
                prioArray.splice(p - 1, 1);
                $caret.remove();
            } else {
                prioArray.push({
                    field: field,
                    sortType: 'asc'
                });
                // $ele.first().append('<span class="uf uf-arrow-down u-grid-header-sort-span" ><span class="u-grid-header-sort-priority">'+prioArray.length+'</span></span>')
                $ele.first().first().append('<span class="uf uf-arrow-down u-grid-header-sort-span" ></span>');
            }
            // 执行排序逻辑
            this.dataSourceObj.sortRowsByPrio(prioArray);
        } else {
            if ($(".uf-arrow-down").parent().parent().parent()[0] == ele) {
                //原来为升序，本次为降序
                $(".uf-arrow-down").remove();
                //$(ele.firstChild)[0].insertAdjacentHTML('beforeEnd','<span class="uf uf-arrow-up u-grid-header-sort-span" ><span class="u-grid-header-sort-priority">1</span></span>');
                $(ele.firstChild.firstChild)[0].insertAdjacentHTML('beforeEnd', '<span class="uf uf-arrow-up u-grid-header-sort-span" ></span>');
                if (typeof this.options.onSortFun == 'function') {
                    this.options.onSortFun.call(this, field, 'asc');
                } else {
                    this.dataSourceObj.sortRows(field, "asc");
                }
            } else if ($(".uf-arrow-up").parent().parent().parent()[0] == ele) {
                //原来为降序，本次为不排序
                $(".uf-arrow-up").remove();
                if (typeof this.options.onSortFun == 'function') {
                    this.options.onSortFun.call(this);
                } else {
                    this.dataSourceObj.sortRows();
                }
            } else {
                //本次为升序
                $(".uf-arrow-down").remove();
                $(".uf-arrow-up").remove();
                // $(ele.firstChild)[0].insertAdjacentHTML('beforeEnd','<span class="uf uf-arrow-down u-grid-header-sort-span"><span class="u-grid-header-sort-priority">1</span></span>');
                $(ele.firstChild.firstChild)[0].insertAdjacentHTML('beforeEnd', '<span class="uf uf-arrow-down u-grid-header-sort-span"></span>');
                if (typeof this.options.onSortFun == 'function') {
                    this.options.onSortFun.call(this, field, "desc");
                } else {
                    this.dataSourceObj.sortRows(field, "desc");
                }
            }
        }

        oThis.repairContent();
        oThis.afterGridDivsCreate();
    }
};
var re_deleteOneRowTree = function re_deleteOneRowTree() {
    if (this.options.showTree) {
        this.dataSourceObj.sortRows();
    }
};
/*
 * 根据排序的优先级的排序
 * prioArray = [{field:'f2', sortType:'asc'}, {field:'f3', sortType:'desc'}, {field:'f1', sortType:'asc'}]
 */
var sortRowsByPrio = function sortRowsByPrio(prioArray, cancelSort) {
    var oThis = this;
    if (cancelSort) {
        this.rows = new Array();
        if (this.options.values) {
            $.each(this.options.values, function (i) {
                var rowObj = {};
                rowObj.value = this;
                rowObj.valueIndex = i;
                oThis.rows.push(rowObj);
            });
        }
    }

    var evalStr = function evalStr(i) {
        if (i == prioArray.length - 1) {
            return 'by(prioArray[' + i + '].field, prioArray[' + i + '].sortType)';
        } else {
            return 'by(prioArray[' + i + '].field, prioArray[' + i + '].sortType,' + evalStr(i + 1) + ')';
        }
    };

    var by = function by(field, sortType, eqCall) {
        var callee = arguments.callee;
        return function (a, b) {
            var v1 = $(a.value).attr(field);
            var v2 = $(b.value).attr(field);
            var dataType = oThis.gridComp.getColumnByField(field).options.dataType;
            if (dataType == 'Float') {
                v1 = parseFloat(v1);
                v2 = parseFloat(v2);
                if (isNaN(v1)) {
                    return 1;
                }
                if (isNaN(v2)) {
                    return -1;
                }
                if (v1 == v2 && eqCall) {
                    return eqCall();
                }
                return sortType == 'asc' ? v1 - v2 : v2 - v1;
            } else if (dataType == 'Int') {
                v1 = parseInt(v1);
                v2 = parseInt(v2);
                if (isNaN(v1)) {
                    return 1;
                }
                if (isNaN(v2)) {
                    return -1;
                }
                if (v1 == v2 && eqCall) {
                    return eqCall();
                }
                return sortType == 'asc' ? v1 - v2 : v2 - v1;
            } else {
                v1 = oThis.gridComp.getString(v1, '');
                v2 = oThis.gridComp.getString(v2, '');
                try {
                    var rsl = v1.localeCompare(v2);
                    if (rsl === 0 && eqCall) {
                        return eqCall();
                    }
                    if (rsl === 0) {
                        return 0;
                    }
                    return sortType == 'asc' ? rsl : -rsl;
                } catch (e) {
                    return 0;
                }
            }
        };
    };

    this.rows.sort(eval(evalStr(0)));
};

/*
 * 将values转化为rows并进行排序(标准)
 */
var re_basicSortRows = function re_basicSortRows(field, sortType) {
    var oThis = this,
        groupField = this.gridComp.options.groupField;
    var dataType = "";

    if (!field) {
        this.rows = new Array();
        this.groupRows = new Array();
        if (this.options.values) {
            $.each(this.options.values, function (i) {
                var rowObj = {};
                rowObj.value = this;
                rowObj.valueIndex = i;
                oThis.rows.push(rowObj);
                oThis.addOneRowGroup(rowObj);
                oThis.rows = oThis.getGroupRows();
            });
        }
        return;
    }
    if (groupField && field && groupField != field) {
        oThis.rows = [];
        $.each(this.groupRows, function () {
            var nowGroup = this;
            nowGroup.rows.sort(oThis.gridComp.SortByFun(field, sortType));
            oThis.rows = oThis.rows.concat(nowGroup.rows);
        });
    } else {
        this.rows.sort(this.gridComp.SortByFun(field, sortType));
    }
};
var sortFunObj = {
    sort_initEventFun: sort_initEventFun,
    sort_initGridEventFun: sort_initGridEventFun,
    re_basicSortRows: re_basicSortRows,
    canSortable: canSortable,
    deleteOneRowTree: re_deleteOneRowTree,
    sortRowsByPrio: sortRowsByPrio
};

var re_initTree = function re_initTree(options, gridOptions) {
    if (gridOptions.showTree) {
        options.sortable = false;
    }
    return options;
};
var re_initOptionsTree = function re_initOptionsTree() {
    if (this.options.showTree) {
        this.options.showNumCol = false;
    }
    if (this.options.treeAsync) {
        if (typeof this.options.onTreeExpandFun != 'function') {
            alert('treeAsync 为true必须定义onTreeExpandFun');
        }
    }
};
var re_clickFunTree = function re_clickFunTree(e) {
    var oThis = this,
        $target = $(e.target),
        $td = $target.closest('td');

    if ($td.length > 0) {
        var $tr = $td.parent();
        var index = this.getTrIndex($tr);
        var row = oThis.dataSourceObj.rows[index];
        if (row) {
            var rowChildIndex = oThis.getChildRowIndex(row);
            if ($target.hasClass('uf-reduce-s-o') || $target.hasClass('uf-add-s-o')) {
                var minus = $td.find('.uf-reduce-s-o');
                var plus = $td.find('.uf-add-s-o');
                if (minus.length > 0) {
                    // 合上 需要将所有的都合上
                    minus.removeClass('uf-reduce-s-o').addClass('uf-add-s-o');
                    if (rowChildIndex.length > 0) {
                        var allChildRowIndex = oThis.getAllChildRowIndex(row);
                        $.each(allChildRowIndex, function () {
                            var $tr1 = $('tr[role="row"]:eq(' + parseInt(this) + ')', $tr.parent());
                            $tr1.css('display', 'none');
                            // 左侧复选区隐藏
                            $('#' + oThis.options.id + '_content_multiSelect >div:nth-child(' + (parseInt(this) + 1) + ')').css('display', 'none');
                            $('.uf-reduce-s-o', $tr1).removeClass('uf-reduce-s-o').addClass('uf-add-s-o');
                        });
                    }
                    if (this.options.editType == 'form') {
                        $('#' + this.options.id + '_multiSelect_edit').remove(null, true);
                        $('#' + this.options.id + '_numCol_edit').remove(null, true);
                        $('#' + this.options.id + '_edit_tr').remove(null, true);
                        $('#' + this.options.id + '_edit_tr1').remove(null, true);
                    }
                } else if (plus.length > 0) {
                    // 展开
                    if (this.options.treeAsync && row.value.isParent) {
                        var obj = {};
                        obj.row = row;
                        obj.gridObj = this;
                        var keyField = this.options.keyField;
                        var keyValue = this.getString(row.value[keyField], '');
                        obj.keyValue = keyValue;
                        this.options.onTreeExpandFun.call(this, obj);
                    }
                    plus.removeClass('uf-add-s-o').addClass('uf-reduce-s-o');
                    if (rowChildIndex.length > 0) {
                        $.each(rowChildIndex, function () {
                            var $tr1 = $('tr[role="row"]:eq(' + parseInt(this) + ')', $tr.parent());
                            $tr1.css('display', '');
                            var ss = $('#' + oThis.options.id + '_content_multiSelect >div:nth-child(' + (parseInt(this) + 1) + ')')[0];
                            $('#' + oThis.options.id + '_content_multiSelect >div:nth-child(' + (parseInt(this) + 1) + ')').css('display', '');
                        });
                    }
                }
                this.resetLeftHeight();
            }
        }
    }
};
var re_addOneRowTree = function re_addOneRowTree(row, index, rowObj) {
    var oThis = this,
        l = this.dataSourceObj.rows.length,
        displayFlag;
    // 存在树结构
    if (this.options.showTree) {
        this.hasParent = false;
        this.hasChildF = false;
        var keyField = this.options.keyField;
        var parentKeyField = this.options.parentKeyField;
        var keyValue = this.getString($(row).attr(keyField), '');
        rowObj.keyValue = keyValue;
        var parentKeyValue = this.getString($(row).attr(parentKeyField), '');
        rowObj.parentKeyValue = parentKeyValue;
        var parentChildLength;
        /* 判断是否存在父项/子项 */
        $.each(this.dataSourceObj.rows, function (i) {
            var value = this.value;
            var nowKeyValue = oThis.getString($(value).attr(keyField), '');
            var nowParentKeyValue = oThis.getString($(value).attr(parentKeyField), '');
            if (nowKeyValue == parentKeyValue) {
                /* 取父项的index和父项的子index*/
                oThis.hasParent = true;
                oThis.addRowParentIndex = i;
                parentChildLength = oThis.getAllChildRow(this).length;
                var parentLevel = this.level;
                rowObj.level = parentLevel + 1;
                // 由于不止需要计算最后一个子节点，同时需要计算子节点的子节点。所以现在添加到父节点的下面一个
                index = oThis.addRowParentIndex + parentChildLength + 1;
                if (!oThis.options.needTreeSort) return false;
            }
            if (nowParentKeyValue == keyValue && keyValue != '') {
                oThis.hasChildF = true;
            }
            if (oThis.hasParent && oThis.hasChildF) return false;
        });
        if (!this.hasParent) {
            rowObj.level = 0;
            if (index != l) {
                // 如果没有父项则插入到最后，因为index有可能插入到其他节点的子节点之中，计算复杂
                index = l;
            }
        }
        if (this.hasParent) {
            var $pTr = $('#' + this.options.id + '_content_div').find('tbody').find('tr[role="row"]').eq(oThis.addRowParentIndex);
            $pTr.removeClass('u-grid-content-leaf-row').addClass('u-grid-content-parent-row');

            var openDiv = $('.uf-add-s-o', $pTr);
            if (!(openDiv.length > 0)) {
                displayFlag = 'block';
            }
            if (parentChildLength > 0) {
                // 如果存在父项并且父项存在子项则需要判断父项是否展开
                // var openDiv = $('.uf-add-s-o', $pTr);
                // if (!(openDiv.length > 0)) {
                //     displayFlag = 'block';
                // }
            } else {
                // 如果存在父项并且父项原来没有子项则需要添加图标
                if (this.options.autoExpand) {
                    displayFlag = 'block';
                }

                var d = $("div:eq(0)", $pTr);
                var openDiv = $('.uf-add-s-o', $pTr);
                var closeDiv = $('.uf-reduce-s-o', $pTr);
                if (this.options.autoExpand) {
                    var spanHtml = '<span class="uf u-grid-content-tree-span uf-reduce-s-o"></span>';
                } else {
                    var spanHtml = '<span class="uf u-grid-content-tree-span uf-add-s-o"></span>';
                }
                if (d.length > 0 && openDiv.length == 0 && closeDiv.length == 0) {
                    d[0].insertAdjacentHTML('afterBegin', spanHtml);
                    var oldLeft = parseInt(d[0].style.left);
                    l = oldLeft - 16;
                    if (l > 0 || l == 0) {
                        d[0].style.left = l + "px";
                    }
                }
                if (openDiv.length > 0) {
                    openDiv.removeClass('uf-add-s-o').addClass('uf-reduce-s-o');
                }
            }
        }
    }

    return {
        index: index,
        displayFlag: displayFlag
    };
};
var re_addOneRowTreeHasChildF = function re_addOneRowTreeHasChildF(rowObj) {
    if (this.hasChildF) {
        //如果存在子项则重新渲染整个区域
        this.dataSourceObj.sortRows();
        this.repairContent();
    } else {
        // 修改rowObj 和parent的变量
        if (this.hasParent) {
            var parentRowObj = this.dataSourceObj.rows[this.addRowParentIndex];
            parentRowObj.hasChild = true;
            parentRowObj.childRow.push(rowObj);
            parentRowObj.childRowIndex.push(rowObj.valueIndex);
            rowObj.parentRow = parentRowObj;
            rowObj.parentRowIndex = this.addRowParentIndex;
        }
        rowObj.hasChild = false;
        rowObj.childRow = new Array();
        rowObj.childRowIndex = new Array();
    }
};
var re_updateValueAtTree = function re_updateValueAtTree(rowIndex, field, value, force) {
    var oThis = this;
    var keyField = this.options.keyField;
    var parentKeyField = this.options.parentKeyField;
    if (this.options.showTree && (field == keyField || field == parentKeyField)) {
        // 目前已经不适用grid源生的编辑设置了，因为树表时关闭edit
        var hasParent = false;
        var hasChildF = false;

        $.each(this.dataSourceObj.rows, function (i) {
            var vv = this.value;
            var nowKeyValue = oThis.getString($(vv).attr(keyField), '');
            var nowParentKeyValue = oThis.getString($(vv).attr(parentKeyField), '');
            if (field == keyField && value == nowParentKeyValue) {
                //修改的是keyfield，判断是否存在子项
                hasChildF = true;
            }
            if (field == parentKeyField && value == nowKeyValue) {
                //修改的是parentKeyField，判断是否存在父项
                hasParent = true;
            }
        });
        if (hasChildF || hasParent) {
            //删除当前行之后重新插入当前行由addonerow来进行树结构处理
            var rowValue = $(this.dataSourceObj.rows[rowIndex].value);
            this.deleteOneRow(rowIndex);
            this.addOneRow(rowValue[0]);
        }
    }
    if (this.options.showTree && (field == keyField || field == parentKeyField) && (hasChildF || hasParent)) {
        rowIndex = this.getRowIndexByValue(field, value);
    }
    return rowIndex;
};
/*
 * 获取数据行下所有子元素
 */
var getAllChildRow = function getAllChildRow(row) {
    // if(row.allChildRow && row.allChildRow.length > 0){
    // 	return row.allChildRow;
    // }
    row.allChildRow = new Array();
    this.getAllChildRowFun(row, row.allChildRow);
    return row.allChildRow;
};
var re_getChildRowIndex = function re_getChildRowIndex(row) {
    var result = [],
        oThis = this;
    //优先取childRowIndex--胡玥修改
    if (row.childRow && row.childRow.length > 0) {
        $.each(row.childRow, function () {
            var index = oThis.getRowIndexByValue(oThis.options.keyField, this.keyValue);
            result.push(index);
        });
    }
    return result;
};
/*
 * 获取数据行下所有子元素的index
 */
var getAllChildRowIndex = function getAllChildRowIndex(row) {
    // if(row.allChildRowIndex && row.allChildRowIndex.length > 0){
    // 	return row.allChildRowIndex;
    // }
    row.allChildRowIndex = new Array();
    this.getAllChildRowIndexFun(row, row.allChildRowIndex);
    return row.allChildRowIndex;
};
var getAllChildRowFun = function getAllChildRowFun(row, rowArry) {
    var oThis = this;
    if (row.childRow.length > 0) {
        Array.prototype.push.apply(rowArry, row.childRow);
        $.each(row.childRow, function () {
            oThis.getAllChildRowFun(this, rowArry);
        });
    }
};
var getAllChildRowIndexFun = function getAllChildRowIndexFun(row, rowArry) {
    var oThis = this;
    if (row.childRow.length > 0) {
        Array.prototype.push.apply(rowArry, this.getChildRowIndex(row));
        $.each(row.childRow, function () {
            oThis.getAllChildRowIndexFun(this, rowArry);
        });
    }
};
/* 展开某个节点 */
var expandNode = function expandNode(keyValue) {
    var rowIndex = this.getRowIndexByValue(this.options.keyField, keyValue);
    this.expandNodeByIndex(rowIndex);
};
var expandNodeByIndex = function expandNodeByIndex(rowIndex) {
    var row = this.getRowByIndex(rowIndex);
    var parentExpand = false,
        parentIndex,
        needExpanedParent = new Array();
    var whileRow = row;
    while (!parentExpand) {
        if (whileRow.parentKeyValue == '') {
            parentExpand = true;
            break;
        } else {
            parentIndex = whileRow.parentRowIndex;
            whileRow = whileRow.parentRow;
            var $pTr = $('#' + this.options.id + '_content_div').find('tbody').find('tr[role="row"]').eq(parentIndex);
            var openDiv = $('.uf-add-s-o', $pTr);
            if (openDiv.length > 0) {
                //合着
                needExpanedParent.push(parentIndex);
            } else {
                parentExpand = true;
                break;
            }
        }
    }
    if (needExpanedParent.length > 0) {
        for (var i = needExpanedParent.length - 1; i > -1; i--) {
            var index = needExpanedParent[i];
            var $pTr = $('#' + this.options.id + '_content_div').find('tbody').find('tr[role="row"]').eq(index);
            var openDiv = $('.uf-add-s-o', $pTr);
            openDiv.click();
        }
    }

    var $Tr = $('#' + this.options.id + '_content_div').find('tbody').find('tr[role="row"]').eq(rowIndex);
    var openDiv = $('.uf-add-s-o', $Tr);
    var firstDiv = $('.u-grid-content-td-div', $Tr);
    if (openDiv.length > 0) openDiv.click();else firstDiv.click();
};
/*
 * 将values转化为rows并进行排序(数表)
 */
var re_treeSortRows = function re_treeSortRows(field, sortType) {
    var oThis = this;
    var spliceHasParentRows = new Array();
    this.rows = new Array();
    this.hasParentRows = new Array();
    this.nothasParentRows = new Array();
    if (this.options.values) {
        $.each(this.options.values, function (i) {
            var rowObj = {};
            var $this = $(this);
            var keyField = oThis.gridComp.options.keyField;
            var parentKeyField = oThis.gridComp.options.parentKeyField;
            var keyValue = oThis.gridComp.getString($this.attr(keyField), '');
            var parentKeyValue = oThis.gridComp.getString($this.attr(parentKeyField), '');
            rowObj.valueIndex = i;
            rowObj.value = this;
            rowObj.keyValue = keyValue;
            rowObj.parentKeyValue = parentKeyValue;
            if (parentKeyValue == '') {
                oThis.nothasParentRows.push(rowObj);
            } else {
                oThis.hasParentRows.push(rowObj);
            }
            oThis.rows.push(rowObj);
        });
        // 判断存在父项的数据的父项是否真正存在
        $.each(this.hasParentRows, function (i) {
            var parentKeyValue = this.parentKeyValue;
            var hasParent = false;
            $.each(oThis.rows, function () {
                if (this.keyValue == parentKeyValue) {
                    hasParent = true;
                }
            });
            if (!hasParent) {
                spliceHasParentRows.push(this);
                oThis.nothasParentRows.push(this);
            }
        });
        $.each(spliceHasParentRows, function () {
            var index = oThis.hasParentRows.indexOf(this);
            oThis.hasParentRows.splice(index, 1);
        });
        oThis.rows = new Array();
        var level = 0;
        // 遍历nothasParentRows，将子项加入rows
        $.each(this.nothasParentRows, function (i) {
            this.level = level;
            oThis.rows.push(this);
            oThis.pushChildRows(this, level);
        });
    }
};
/*
 * 将当前行子项插入rows数组
 */
var pushChildRows = function pushChildRows(row, level) {
    var keyValue = row.keyValue;
    var oThis = this;
    var nowLevel = parseInt(level) + 1;
    var hasChild = false;
    var childRowArray = new Array();
    var childRowIndexArray = new Array();
    var spliceHasParentRows = new Array();
    $.each(this.hasParentRows, function (i) {
        if (this && this.parentKeyValue == keyValue) {
            hasChild = true;
            this.level = nowLevel;
            oThis.rows.push(this);
            childRowArray.push(this);
            var index = parseInt(oThis.rows.length - 1);
            childRowIndexArray.push(index);
            spliceHasParentRows.push(this);
            oThis.pushChildRows(this, nowLevel);
        }
    });
    $.each(spliceHasParentRows, function () {
        var index = oThis.hasParentRows.indexOf(this);
        oThis.hasParentRows.splice(index, 1);
    });
    row.hasChild = hasChild;
    row.childRow = childRowArray;
    row.childRowIndex = childRowIndexArray;
};
var treeFunObj = {
    initOptionsTree: re_initOptionsTree,
    clickFunTree: re_clickFunTree,
    addOneRowTree: re_addOneRowTree,
    addOneRowTreeHasChildF: re_addOneRowTreeHasChildF,
    updateValueAtTree: re_updateValueAtTree,
    getAllChildRow: getAllChildRow,
    getChildRowIndex: re_getChildRowIndex,
    getAllChildRowIndex: getAllChildRowIndex,
    getAllChildRowFun: getAllChildRowFun,
    getAllChildRowIndexFun: getAllChildRowIndexFun,
    expandNode: expandNode,
    expandNodeByIndex: expandNodeByIndex,
    re_treeSortRows: re_treeSortRows,
    pushChildRows: pushChildRows,
    re_initTree: re_initTree
};

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};











var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var dataSource = function dataSource(options, gridComp) {
    classCallCheck(this, dataSource);


    this.init(options, gridComp);
    this.sortRows();
};



var dataSourceProto = dataSource.prototype;
if (!Object.assign) {
    Object.assign = u.extend;
}
Object.assign(dataSourceProto, initFunObj);

dataSourceProto.basicSortRows = sortFunObj.re_basicSortRows;

/*
 * tree
 */
dataSourceProto.treeSortRows = treeFunObj.re_treeSortRows;
dataSourceProto.pushChildRows = treeFunObj.pushChildRows;

/*
 * 处理参数
 */
var init$1 = function init(options, gridComp) {
    // this.gridComp = gridComp; // 在处理前端缓存将column转为string的时候会因为此属性出现死循环
    var gridOptions = gridComp.options;
    this.gridGetBoolean = gridComp.getBoolean;
    this.initDefault();
    // 从grid继承的属性
    var gridDefault = {
        sortable: gridOptions.sortable,
        canDrag: gridOptions.canDrag,
        width: gridOptions.columnWidth
    };
    if (options.dataType == 'Date') {
        this.defaults.format = 'YYYY-MM-DD';
    }
    // 树表暂时不支持排序
    options = this.initTree(options, gridOptions);
    this.options = $.extend({}, this.defaults, gridDefault, options);
    this.getBooleanOptions();
    try {
        if (typeof this.options.renderType == 'string') this.options.renderType = eval(this.options.renderType);
    } catch (e) {}
    try {
        if (typeof this.options.editType == 'string') this.options.editType = eval(this.options.editType);
    } catch (e) {}

    this.options.width = this.options.width;
    this.firstColumn = false;
};
var initTree = function initTree(options) {
    return options;
};

var initDefault = function initDefault() {
    this.defaults = {
        width: '200', // 默认宽度为200
        sortable: true, // 是否可以排序
        canDrag: true, // 是否可以拖动
        fixed: false, // 是否固定列
        visible: true, // 是否显示
        canVisible: true, // 是否可以隐藏
        sumCol: false, // 是否计算合计
        editable: true, // 是否可修改
        editFormShow: true, // 是否可修改
        autoExpand: false, // 是否自动扩展列
        editType: 'text', // 编辑类型，支持传入function扩展
        dataType: 'String', // 数据类型,String, Date, Datetime, Int, Float
        //precision:  //精度
        format: 'YYYY-MM-DD hh:mm:ss',
        //renderType:'', 渲染类型
        //headerColor
        headerLevel: 1, // header层级
        hiddenLevel: 1, // 宽度不足隐藏的优先级，值越大优先隐藏
        // parentHeader 对应的父header的title
        // 目前仅支持两级，多级的话需要改变头的高度，另外处理当前级别的时候需要看下是否存在上级，如果存在上级的话
        // 则创建新的div，这就涉及到需要躲变量计算每级的宽度，需要考虑下如何实现。
        // headerColor:'#a8a8a8'
        textAlign: 'left' // 显示时对齐方式
    };
};
var getBooleanOptions = function getBooleanOptions() {
    this.options.sortable = this.gridGetBoolean(this.options.sortable);
    this.options.canDrag = this.gridGetBoolean(this.options.canDrag);
    this.options.fixed = this.gridGetBoolean(this.options.fixed);
    this.options.visible = this.gridGetBoolean(this.options.visible);
    this.options.canVisible = this.gridGetBoolean(this.options.canVisible);
    this.options.sumCol = this.gridGetBoolean(this.options.sumCol);
    this.options.editable = this.gridGetBoolean(this.options.editable);
    this.options.editFormShow = this.gridGetBoolean(this.options.editFormShow);
    this.options.autoExpand = this.gridGetBoolean(this.options.autoExpand);
};

var initFunObj$1 = {
    init: init$1,
    initDefault: initDefault,
    initTree: initTree,
    getBooleanOptions: getBooleanOptions
};

var column = function column(options, gridComp) {
    classCallCheck(this, column);

    this.init(options, gridComp);
};


var gridCompColumnProto = column.prototype;
if (!Object.assign) {
    Object.assign = u.extend;
}
Object.assign(gridCompColumnProto, initFunObj$1);

/*
 * tree
 */
gridCompColumnProto.initTree = treeFunObj.re_initTree;

var gridBrowser = {};
var userAgent = navigator.userAgent;
var ua = userAgent.toLowerCase();
var s;
if (s = ua.match(/msie ([\d.]+)/)) {
    gridBrowser.isIE = true;
}
if (gridBrowser.isIE) {
    var mode = document.documentMode;
    if (mode == null) {} else {
        if (mode == 8) {
            gridBrowser.isIE8 = true;
        } else if (mode == 9) {
            gridBrowser.isIE9 = true;
        } else if (mode == 10) {
            gridBrowser.isIE10 = true;
        }
    }
}

if (ua.indexOf('Android') > -1 || ua.indexOf('android') > -1 || ua.indexOf('Adr') > -1 || ua.indexOf('adr') > -1) {
    gridBrowser.isAndroid = true;
}

if (gridBrowser.isAndroid) {
    if (window.screen.width >= 768 && window.screen.width < 1024) {
        gridBrowser.isAndroidPAD = true;
    }
    if (window.screen.width <= 768) {
        gridBrowser.isAndroidPhone = true;
    }
}

if (ua.match(/iphone/i)) {
    gridBrowser.isIOS = true;
    gridBrowser.isIphone = true;
}

if (ua.match(/ipad/i)) {
    gridBrowser.isIOS = true;
    gridBrowser.isIPAD = true;
}

if (gridBrowser.isIphone || gridBrowser.isAndroidPhone) {
    gridBrowser.isMobile = true;
}

/*
 * 创建顶层div以及_top div层
 * 添加顶层div相关监听
 */
var createDivs = function createDivs() {
    var oThis = this,
        styleStr = '',
        str = '',
        mobileClass = '';
    this.ele.innerHTML = '';
    if (this.options.width) {
        str += 'width:' + this.options.width + ';';
    } else {
        str += 'width:auto;';
    }
    if (this.options.height) {
        str += 'height:' + this.options.height + ';';
    } else {
        str += 'height:auto;';
    }
    if (str != '') {
        styleStr = 'style="' + str + '"';
    }
    if (gridBrowser.isMobile) {
        mobileClass = 'u-grid-mobile';
    }
    var htmlStr = '<div id="' + this.options.id + '" data-role="grid" class="u-grid ' + mobileClass + '" ' + styleStr + '>';
    htmlStr += '</div>';
    this.ele.insertAdjacentHTML('afterBegin', htmlStr);
    // 创建屏幕div,用于拖动等操作
    var htmlStr = '<div id="' + this.options.id + '_top" class="u-grid-top"></div>';
    // this.ele.insertAdjacentHTML('afterBegin', htmlStr);
    document.body.appendChild($(htmlStr)[0]);
    this.initEventFun(); //创建完成之后顶层div添加监听
    this.widthChangeFun(); // 根据整体宽度创建grid或form展示区域
};
/*
 * 创建div区域
 */
var repaintDivs = function repaintDivs() {
    // 后期可以考虑form展示
    this.repaintGridDivs();
    this.realtimeTableRows = null;
};
/*
 * 创建grid形式下div区域
 */
var createGridDivs = function createGridDivs() {
    if (this.createGridFlag) {
        return;
    }
    // 为避免重复渲染，在开始清空里面内容
    if ($('#' + this.options.id)[0]) $('#' + this.options.id)[0].innerHTML = '';
    var htmlStr = '<div id="' + this.options.id + '_grid" class="u-grid">';
    htmlStr += this.createHeader();
    htmlStr += this.createBeginNoScroll();
    htmlStr += this.createContent();
    htmlStr += this.createEndNoScroll();
    htmlStr += '</div>';
    if ($('#' + this.options.id)[0]) $('#' + this.options.id).html(htmlStr);
    $('#' + this.options.id + '_column_menu').remove();
    $(document.body).append(this.createColumnMenu());
    this.initGridEventFun();
    this.headerFirstClassFun();
    this.showType = 'grid';
    this.afterGridDivsCreate();
    this.createGridFlag = true;
    this.realtimeTableRows = null;
};

var createBeginNoScroll = function createBeginNoScroll() {
    return this.createNoScroll('begin');
};

var createEndNoScroll = function createEndNoScroll() {
    return this.createNoScroll('end');
};

var createNoScroll = function createNoScroll(type) {
    var htmlStr = '<div id="' + this.options.id + '_noScroll_' + type + '" class="u-grid-noScroll ' + type + '"><div class="u-grid-noScroll-wrap ' + type + '" id="' + this.options.id + '_noScroll_' + type + '_wrap">';

    if ((this.options.multiSelect || this.options.showNumCol) && (type == 'begin' && this.options.sumRowFirst && this.options.sumRowFixed || type == 'end' && !this.options.sumRowFirst && this.options.sumRowFixed)) {
        htmlStr += '<div id="' + this.options.id + '_noScroll_left" class="u-grid-noScroll-left" style="width:' + this.leftW + 'px;height:' + this.noScrollHeight + 'px;">';
        htmlStr += '</div>';
    }
    htmlStr += this.createNoScrollTableFixed(type);
    htmlStr += this.createNoScrollTable(type);
    htmlStr += '</div></div>';
    return htmlStr;
};

var createNoScrollTableFixed = function createNoScrollTableFixed(type) {
    return this.createNoScrollTable(type, 'fixed');
};

var createNoScrollTable = function createNoScrollTable(type, createFlag) {
    /*var leftW, idStr, styleStr, hStr, cssStr, tableStyleStr;
    hStr = "";
     if (createFlag == 'fixed') {
        leftW = parseInt(this.leftW);
        idStr = 'fixed_';
        cssStr = 'fixed-';
        if (this.options.fixedFloat == 'right') {
            styleStr = 'style="position:absolute;width:' + this.fixedWidth + 'px;right:0px;' + hStr + '"';
        } else {
            styleStr = 'style="position:absolute;width:' + this.fixedWidth + 'px;left:' + leftW + 'px;' + hStr + '"';
        }
        tableStyleStr = 'style="width:' + this.fixedWidth + 'px;"';
    } else {
        if (this.options.fixedFloat == 'right') {
            leftW = parseInt(this.leftW);
        } else {
            leftW = parseInt(this.leftW) + parseInt(this.fixedWidth, 0);
        }
        idStr = '';
        cssStr = '';
        styleStr = 'style="position:relative;left:' + leftW + 'px;' + hStr;
        if (this.contentMinWidth > 0) {
            styleStr += 'width:' + this.contentMinWidth + 'px;';
        }
        // 因为添加overflow-x之后会导致纵向也显示不全，后续出现问题通过修改宽度来实现，不再通过overflow来实现
        if (this.options.noScroll) {
            styleStr += 'overflow-x:hidden;'
        }
        styleStr += '"';
        tableStyleStr = '';
        if (this.contentMinWidth > 0) {
            if (this.contentWidth > 0) {
                tableStyleStr = 'style="position:relative;min-width:' + this.contentMinWidth + 'px;width:' + this.contentWidth + 'px;"';
            } else {
                tableStyleStr = 'style="position:relative;min-width:' + this.contentMinWidth + 'px;"';
            }
        }
    }
    var htmlStr = '<table role="grid" id="' + this.options.id + '_noScroll_' + idStr + type + '_table" ' + tableStyleStr + '>';
    htmlStr += this.createColgroup(createFlag);
    htmlStr += '<thead role="rowgroup" id="' + this.options.id + '_noSCroll_' + idStr + type + '_thead" style="display:none">';
    htmlStr += this.createThead(createFlag);
    htmlStr += '</thead>';
    if ((type == 'begin' && this.options.sumRowFirst && this.options.sumRowFixed) || (type == 'end' && !this.options.sumRowFirst && this.options.sumRowFixed)) {
        htmlStr += '<tbody role="rowgroup" id="' + this.options.id + '_noScroll_' + idStr + type + '_tbody">';
        htmlStr += this.createContentRowsSumRow(createFlag);
        htmlStr += '</tbody>';
    }
    htmlStr += '</table>';
    return htmlStr;*/
    var leftW, positionStr, idStr;
    if (createFlag == 'fixed') {
        leftW = parseInt(this.leftW);
        positionStr = 'absolute;width:' + this.fixedWidth + 'px;z-index:11;';
        idStr = 'fixed_';
    } else {
        if (this.options.fixedFloat == 'right') {
            leftW = parseInt(this.leftW);
        } else {
            leftW = parseInt(this.leftW) + parseInt(this.fixedWidth);
        }
        positionStr = 'relative;';
        idStr = '';
        if (this.contentMinWidth > 0) {
            positionStr += 'width:' + this.contentMinWidth + 'px;';
        }
    }
    if (createFlag == 'fixed' && this.options.fixedFloat == 'right') {
        var htmlStr = '<table role="grid" id="' + this.options.id + '_noScroll_' + idStr + type + '_table" style="position:' + positionStr + ';right:0px;">';
    } else {
        var htmlStr = '<table role="grid" id="' + this.options.id + '_noScroll_' + idStr + type + '_table" style="position:' + positionStr + ';left:' + leftW + 'px;">';
    }
    htmlStr += this.createColgroup(createFlag);
    htmlStr += '<thead role="rowgroup" id="' + this.options.id + '_noSCroll_' + idStr + type + '_thead" style="display:none">';
    htmlStr += this.createThead(createFlag);
    htmlStr += '</thead>';
    if (type == 'begin' && this.options.sumRowFirst && this.options.sumRowFixed || type == 'end' && !this.options.sumRowFirst && this.options.sumRowFixed) {
        htmlStr += '<tbody role="rowgroup" id="' + this.options.id + '_noScroll_' + idStr + type + '_tbody">';
        htmlStr += this.createContentRowsSumRow(createFlag);
        htmlStr += '</tbody>';
    }
    htmlStr += '</table>';
    return htmlStr;
};

/*
 * 重画grid
 */
var repaintGridDivs = function repaintGridDivs() {
    $('#' + this.options.id + '_grid').remove(null, true);
    this.showType = '';
    this.wholeWidth = 0;
    this.createGridFlag = false;
    this.columnsVisibleFun();
    this.widthChangeFun();
    this.realtimeTableRows = null;
};
/*
 * 创建columnMenu区域
 */
var createColumnMenu = function createColumnMenu() {
    return '';
};
/*
 * 创建header区域
 */
var createHeader = function createHeader() {
    var wrapStr = '',
        headerShowStr = '';
    if (!this.options.showHeader) headerShowStr = 'style="display:none;"';
    var htmlStr = '<div class="u-grid-header" id="' + this.options.id + '_header" ' + headerShowStr + '><div class="u-grid-header-wrap" id="' + this.options.id + '_header_wrap" data-role="resizable" ' + wrapStr + '>';
    if (this.options.columnMenu) {
        htmlStr += '<div class="u-grid-header-columnmenu uf uf-navmenu-light"></div>';
    }
    if (this.options.multiSelect || this.options.showNumCol) {
        htmlStr += '<div id="' + this.options.id + '_header_left" class="u-grid-header-left" style="width:' + this.leftW + 'px;">';
        if (this.options.multiSelect) {
            if (gridBrowser.isIE8) {
                //htmlStr += '<div class="u-grid-header-multi-select" style="width:' + this.multiSelectWidth + 'px;"><input class="u-grid-multi-input"   type="checkbox" id="' + this.options.id + '_header_multi_input"></div>'
                htmlStr += '<div class="u-grid-header-multi-select" style="width:' + this.multiSelectWidth + 'px;"><span class="u-grid-checkbox-outline" id="' + this.options.id + '_header_multi_input"><span class="u-grid-checkbox-tick-outline"></span></span></div>';
            } else {
                //htmlStr += '<div class="u-grid-header-multi-select  checkbox check-success" style="width:' + this.multiSelectWidth + 'px;"><input  class="u-grid-multi-input"  type="checkbox" id="' + this.options.id + '_header_multi_input"><label for="' + this.options.id + '_header_multi_input"></label></div>'
                htmlStr += '<div class="u-grid-header-multi-select  checkbox check-success" style="width:' + this.multiSelectWidth + 'px;"><span class="u-grid-checkbox-outline" id="' + this.options.id + '_header_multi_input"><span class="u-grid-checkbox-tick-outline"></span></span></div>';
            }
        }
        if (this.options.showNumCol) {
            htmlStr += '<div class="u-grid-header-num" style="width:' + this.numWidth + 'px;"></div>';
        }
        htmlStr += '</div>';
    }
    htmlStr += this.createHeaderTableFixed();
    htmlStr += this.createHeaderTable();
    htmlStr += '</div>';
    htmlStr += this.createHeaderDrag();
    htmlStr += '</div>';
    return htmlStr;
};
/*
 * 创建header区域table
 */
var createHeaderTable = function createHeaderTable(createFlag) {
    var leftW, positionStr, idStr;
    if (createFlag == 'fixed') {
        leftW = parseInt(this.leftW);
        positionStr = 'absolute;width:' + this.fixedWidth + 'px;z-index:11;background:#F9F9F9;';
        idStr = 'fixed_';
    } else {
        if (this.options.fixedFloat == 'right') {
            leftW = parseInt(this.leftW);
        } else {
            leftW = parseInt(this.leftW) + parseInt(this.fixedWidth);
        }
        positionStr = 'relative;';
        idStr = '';
        if (this.contentMinWidth > 0) {
            positionStr += 'width:' + this.contentMinWidth + 'px;';
        }
    }
    if (createFlag == 'fixed' && this.options.fixedFloat == 'right') {
        var htmlStr = '<table role="grid" id="' + this.options.id + '_header_' + idStr + 'table" style="position:' + positionStr + ';right:0px;">';
    } else {
        var htmlStr = '<table role="grid" id="' + this.options.id + '_header_' + idStr + 'table" style="position:' + positionStr + ';left:' + leftW + 'px;">';
    }
    htmlStr += this.createColgroup(createFlag);
    htmlStr += '<thead role="rowgroup" id="' + this.options.id + '_header_' + idStr + 'thead">';
    htmlStr += this.createThead(createFlag);
    htmlStr += '</thead></table>';
    return htmlStr;
};
var createHeaderTableFixed = function createHeaderTableFixed() {
    return '';
};
var createHeaderDrag = function createHeaderDrag() {
    return '';
};
/*
 * 创建colgroup
 */
var createColgroup = function createColgroup(createFlag) {
    var oThis = this,
        htmlStr = '<colgroup>',
        gridCompColumnArr;
    if (createFlag == 'fixed') {
        gridCompColumnArr = this.gridCompColumnFixedArr;
    } else {
        gridCompColumnArr = this.gridCompColumnArr;
    }
    $.each(gridCompColumnArr, function () {
        if (this.options.visible) {
            htmlStr += '<col';
            if (!this.options.autoExpand) {
                htmlStr += ' style="width:' + oThis.formatWidth(this.options.width) + '"';
            }
            htmlStr += '>';
        }
    });
    htmlStr += '</colgroup>';
    return htmlStr;
};
/*
 * 创建thead区域
 */
var createThead = function createThead(createFlag) {
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
/*
 * 创建内容区域
 */
var createContent = function createContent() {
    var h = '',
        displayStr = '',
        bottonStr = '',
        lbw = 0;
    if (this.countContentHeight) {
        var wh = $('#' + this.options.id)[0].offsetHeight;
        this.wholeHeight = wh;
        if (wh > 0) {
            this.contentHeight = parseInt(wh) - this.exceptContentHeight - 1 > 0 ? parseInt(wh) - this.exceptContentHeight - 1 : 0;
            if (this.contentHeight > 0) {
                h = 'style="height:' + this.contentHeight + 'px;"';
            }
        }
    }
    var htmlStr = '<div id="' + this.options.id + '_content" class="u-grid-content" ' + h + '>';
    if (this.options.showNumCol || this.options.multiSelect) {
        htmlStr += this.createContentLeft();
        if (!(this.contentWidth > this.contentMinWidth)) {
            displayStr = 'display:none;';
            bottonStr = 'bottom:0px;';
        }
        htmlStr += this.createContentSumRow(bottonStr);
        if (u.isIOS) {
            displayStr += 'width:0px;';
        }
        if (this.options.fixedFloat == 'right') {
            lbw = this.leftW;
        } else {
            lbw = this.leftW + this.fixedWidth;
        }
        // htmlStr += '<div class="u-grid-content-left-bottom" id="' + this.options.id + '_content_left_bottom" style="width:' + lbw + 'px;' + displayStr + '">';
        // htmlStr += '</div>';
    }
    htmlStr += this.createContentTableFixed();
    htmlStr += this.createContentTable();
    htmlStr += '</div>';
    return htmlStr;
};
var createContentSumRow = function createContentSumRow() {
    return '';
};
/*
 * 创建内容区左侧区域
 */
var createContentLeft = function createContentLeft() {
    var oThis = this,
        htmlStr = "",
        left = 0,
        hStr = "",
        sumRowClass = '',
        topStr = "";
    // 高度可伸缩，暂时去掉内部的高度设置
    // if(this.countContentHeight && parseInt(this.contentHeight) > 0){
    // 	hStr = 'max-height:' + this.contentHeight + 'px;overflow:hidden;';
    // }else{
    // 	hStr = '';
    // }
    if (this.options.showSumRow && this.options.sumRowFirst && !this.options.sumRowFixed && this.options.sumRowHeight) {
        topStr = "top:" + this.options.sumRowHeight + 'px';
    }
    if (this.options.showSumRow) {
        sumRowClass = 'u-grid-content-left-sum';
        if (this.options.sumRowFirst && !this.options.sumRowFixed && this.dataSourceObj.rows.length > 0) {
            sumRowClass += ' u-grid-content-left-sum-first';
        }
    }
    if (this.options.multiSelect) {
        htmlStr += '<div class="u-grid-content-left u-grid-content-left-multi ' + sumRowClass + '" id="' + this.options.id + '_content_multiSelect" style="width:' + this.multiSelectWidth + 'px;' + hStr + topStr + '">';
        // 遍历生成所有行
        if (this.dataSourceObj.rows) {
            if (this.options.groupSumRow) {
                htmlStr += oThis.createContentLeftMultiSelectGroupRows();
            } else {
                $.each(this.dataSourceObj.rows, function (i) {
                    htmlStr += oThis.createContentLeftMultiSelectRow(this);
                });
            }
        }
        htmlStr += '</div>';
        left += this.multiSelectWidth;
    }
    if (this.options.showNumCol) {
        htmlStr += '<div class="u-grid-content-left u-grid-content-left-num ' + sumRowClass + '" id="' + this.options.id + '_content_numCol" style="width:' + this.numWidth + 'px;left:' + left + 'px;' + hStr + topStr + '">';
        // 遍历生成所有行
        if (this.dataSourceObj.rows) {
            if (this.options.groupSumRow) {
                htmlStr += oThis.createContentLeftNumColGroupRows();
            } else {
                $.each(this.dataSourceObj.rows, function (i, row) {
                    htmlStr += oThis.createContentLeftNumColRow(i, row.value);
                });
            }
        }
        htmlStr += '</div>';
    }
    return htmlStr;
};

var createContentLeftMultiSelectGroupRows = function createContentLeftMultiSelectGroupRows() {
    return '<div>参数设置显示分组合计行，但是未引入分组合计行资源</div>';
};

var createContentLeftNumColGroupRows = function createContentLeftNumColGroupRows() {
    return '<div>参数设置显示分组合计行，但是未引入分组合计行资源</div>';
};
/*
 * 创建内容区左侧区域复选区（一行）
 */
var createContentLeftMultiSelectRow = function createContentLeftMultiSelectRow(row, displayFlag) {
    var displayStr = '';
    if (!this.options.autoExpand && row.level > 0 && displayFlag != 'block') {
        displayStr = 'display:none;';
    }
    var tmpcheck = row.value["$_#_@_id"];
    if (!tmpcheck) {
        tmpcheck = setTimeout(function () {});
    }

    var rootObj = row.value;
    var objAry = this.selectRows;
    var re = objCompare(rootObj, objAry);
    var heightStr = '';

    if (!this.options.needResetHeight) {
        heightStr = 'height:' + (this.options.rowHeight + 1) + 'px;';
    }

    var createFlag = true;
    if (typeof this.options.onBeforeCreateLeftMul == 'function') {
        var obj = {
            gridObj: this,
            rowObj: row
        };
        createFlag = this.options.onBeforeCreateLeftMul.call(this, obj);
    }
    if (gridBrowser.isIE8) {
        //var	htmlStr = '<div style="width:' + this.multiSelectWidth + 'px;' + displayStr + '" class="u-grid-content-multiSelect " ><input class="u-grid-multi-input" id="checkbox'+tmpcheck+'" type="checkbox" value="1" ></div>'
        var htmlStr = '<div style="width:' + this.multiSelectWidth + 'px;' + heightStr + displayStr + '" class="u-grid-content-multiSelect " >';
        if (createFlag) htmlStr += '<span class="u-grid-checkbox-outline" id="checkbox' + tmpcheck + '" value="1"><span class="u-grid-checkbox-tick-outline"></span></span>';
        htmlStr += '</div>';
    } else {
        if (re) {
            var htmlStr = '<div style="width:' + this.multiSelectWidth + 'px;' + heightStr + displayStr + '" class="u-grid-content-multiSelect checkbox check-success u-grid-content-sel-row" >';
            if (createFlag) htmlStr += '<span class="u-grid-checkbox-outline  is-checked" id="checkbox' + tmpcheck + '" value="1"><span class="u-grid-checkbox-tick-outline"></span></span>';
            htmlStr += '</div>';
        } else {
            var htmlStr = '<div style="width:' + this.multiSelectWidth + 'px;' + heightStr + displayStr + '" class="u-grid-content-multiSelect checkbox check-success" >';
            if (createFlag) htmlStr += '<span class="u-grid-checkbox-outline" id="checkbox' + tmpcheck + '" value="1"><span class="u-grid-checkbox-tick-outline"></span></span>';
            htmlStr += '</div>';
        }
        //var htmlStr = '<div style="width:' + this.multiSelectWidth + 'px;' + displayStr + '" class="u-grid-content-multiSelect checkbox check-success" ><input class="u-grid-multi-input" id="checkbox'+tmpcheck+'" type="checkbox" value="1" ><label for="checkbox'+tmpcheck+'"></label></div>'
    }
    return htmlStr;
};
/*
 * 创建内容区左侧区域数字列（一行）
 */
var createContentLeftNumColRow = function createContentLeftNumColRow(index) {
    var row = this.dataSourceObj.rows[index];
    var rootObj = row.value;
    var objAry = this.selectRows;
    var re = objCompare(rootObj, objAry);
    var htmlStr;
    var heightStr = '';

    if (!this.options.needResetHeight) {
        heightStr = 'height:' + (this.options.rowHeight + 1) + 'px;';
    }
    if (re) {
        htmlStr = '<div style="width:' + this.numWidth + 'px;' + heightStr + '" class="u-grid-content-num  u-grid-content-sel-row">' + (index + 1) + '</div>';
    } else {
        htmlStr = '<div style="width:' + this.numWidth + 'px;' + heightStr + '" class="u-grid-content-num">' + (index + 1) + '</div>';
    }
    return htmlStr;
};
/*
 * 创建内容区table
 */
var createContentTable = function createContentTable(createFlag) {
    var leftW, idStr, styleStr, hStr, cssStr, tableStyleStr;
    if (this.countContentHeight && parseInt(this.contentHeight) > 0) {
        hStr = 'height:' + this.contentHeight + 'px;';
    } else {
        hStr = "";
    }

    if (createFlag == 'fixed') {
        leftW = parseInt(this.leftW);
        idStr = 'fixed_';
        cssStr = 'fixed-';
        if (this.options.fixedFloat == 'right') {
            styleStr = 'style="position:absolute;width:' + this.fixedWidth + 'px;right:0px;' + hStr + '"';
        } else {
            styleStr = 'style="position:absolute;width:' + this.fixedWidth + 'px;left:' + leftW + 'px;' + hStr + '"';
        }
        tableStyleStr = 'style="width:' + this.fixedWidth + 'px;"';
    } else {
        if (this.options.fixedFloat == 'right') {
            leftW = parseInt(this.leftW);
        } else {
            leftW = parseInt(this.leftW) + parseInt(this.fixedWidth, 0);
        }
        idStr = '';
        cssStr = '';
        styleStr = 'style="position:relative;left:' + leftW + 'px;' + hStr;
        if (this.contentMinWidth > 0) {
            styleStr += 'width:' + this.contentMinWidth + 'px;';
        }
        // 因为添加overflow-x之后会导致纵向也显示不全，后续出现问题通过修改宽度来实现，不再通过overflow来实现
        if (this.options.noScroll) {
            styleStr += 'overflow-x:hidden;';
        }
        styleStr += '"';
        tableStyleStr = '';
        if (this.contentMinWidth > 0) {
            if (this.contentWidth > 0) {
                tableStyleStr = 'style="min-width:' + this.contentMinWidth + 'px;width:' + this.contentWidth + 'px;"';
            } else {
                tableStyleStr = 'style="min-width:' + this.contentMinWidth + 'px;"';
            }
        }
    }

    var htmlStr = '<div id="' + this.options.id + '_content_' + idStr + 'div" class="u-grid-content-' + cssStr + 'div" ' + styleStr + '>';
    htmlStr += '<div style="height:30px;position:absolute;top:-30px;width:100%;z-index:-1;"></div><table role="grid" id="' + this.options.id + '_content_' + idStr + 'table" ' + tableStyleStr + '>';
    htmlStr += this.createColgroup(createFlag);
    htmlStr += '<thead role="rowgroup" id="' + this.options.id + '_content_' + idStr + 'thead" style="display:none">';
    htmlStr += this.createThead(createFlag);
    htmlStr += '</thead>';
    htmlStr += this.createContentRows(createFlag);
    htmlStr += '</table>';
    if (createFlag != 'fixed') {
        htmlStr += this.createNoRowsDiv();
    }
    htmlStr += '</div>';
    return htmlStr;
};
var createContentTableFixed = function createContentTableFixed() {
    return '';
};
/*
 * 创建无数据区域
 */
var createNoRowsDiv = function createNoRowsDiv() {
    var styleStr = '',
        styleStr1 = '';
    if (this.contentMinWidth > 0) {
        styleStr += 'style="width:' + this.contentMinWidth + 'px;"';
    }
    if (this.contentWidth > 0) {
        styleStr1 += 'style="width:' + this.contentWidth + 'px;"';
    }
    var htmlStr = '<div class="u-grid-noRowsDiv"' + styleStr1 + ' id="' + this.options.id + '_noRows"></div>';
    htmlStr += '<div class="u-grid-noRowsShowDiv"' + styleStr + ' id="' + this.options.id + '_noRowsShow">' + this.transMap.ml_no_rows + '</div>';
    return htmlStr;
};
/*
 * 创建内容区域所有行
 */
var createContentRows = function createContentRows(createFlag) {
    var oThis = this,
        htmlStr = "",
        idStr;
    if (createFlag == 'fixed') {
        idStr = 'fixed_';
    } else {
        idStr = '';
    }
    // 遍历生成所有行
    if (this.dataSourceObj.rows) {
        htmlStr += '<tbody role="rowgroup" id="' + this.options.id + '_content_' + idStr + 'tbody">';
        if (this.options.sumRowFirst && !this.options.sumRowFixed) {
            htmlStr += this.createContentRowsSumRow(createFlag);
        }
        if (this.options.groupField) {
            htmlStr += oThis.createContentGroupRows(createFlag);
        } else {
            $.each(this.dataSourceObj.rows, function (i) {
                htmlStr += oThis.createContentOneRow(this, createFlag);
            });
        }
        if (!this.options.sumRowFirst && !this.options.sumRowFixed) {
            htmlStr += this.createContentRowsSumRow(createFlag);
        }
        htmlStr += '</tbody>';
    }
    return htmlStr;
};
var createContentRowsSumRow = function createContentRowsSumRow() {
    return '<div>参数设置显示合计行，但是未引入合计行资源</div>';
};
var createContentGroupRows = function createContentGroupRows() {
    return '<div>参数设置显示分组合计行，但是未引入分组合计行资源</div>';
};
/*
 * 创建内容区域数据行
 */
var createContentOneRow = function createContentOneRow(row, createFlag, displayFlag) {
    var styleStr = '';
    if (!this.options.autoExpand && row.level > 0 && displayFlag != 'block') {
        styleStr = 'style="display:none"';
    }

    var rootObj = row.value;
    var objAry = this.selectRows;
    var re = objCompare(rootObj, objAry);
    var htmlStr = '';
    var classStr = '';
    if (this.options.showTree) {
        if (row.hasChild) {
            classStr += ' u-grid-content-parent-row ';
        } else {
            classStr += ' u-grid-content-leaf-row ';
        }

        if (row.level == 0) {
            classStr += ' u-grid-content-level0-row ';
        } else {
            classStr += ' u-grid-content-levelother-row ';
        }
    }

    if (re) {
        classStr += 'u-grid-content-sel-row';
    }
    htmlStr = '<tr role="row" class="' + classStr + '" ' + styleStr + '>';
    htmlStr += this.createContentOneRowTd(row, createFlag);
    htmlStr += '</tr>';
    return htmlStr;
};
/*
 * 创建内容区域数据行，针对IE
 */
var createContentOneRowForIE = function createContentOneRowForIE(table, index, rowObj, createFlag, displayFlag) {
    var row = table.insertRow(index + 1);
    row.setAttribute("role", "row");
    if (!this.options.autoExpand && rowObj.level > 0 && displayFlag != 'block') {
        row.style.display = 'none';
    }

    if (this.options.showTree) {
        if (row.hasChild) {
            $(row).addClass('u-grid-content-parent-row');
        } else {
            $(row).addClass('u-grid-content-leaf-row');
        }

        if (row.level == 0) {
            $(row).addClass('u-grid-content-level0-row');
        } else {
            $(row).addClass('u-grid-content-levelother-row');
        }
    }

    this.createContentOneRowTdForIE(row, rowObj, createFlag);
};

/*
 * 数据更新重画当前行
 */
var repaintRow = function repaintRow(rowIndex) {
    var tr = $('#' + this.options.id + '_content_tbody').find('tr[role="row"]')[rowIndex],
        fixedtr = $('#' + this.options.id + '_content_fixed_tbody').find('tr[role="row"]')[rowIndex],
        row = this.dataSourceObj.rows[rowIndex],
        $tr = $(tr),
        index = this.getTrIndex($tr);
    if (gridBrowser.isIE8 || gridBrowser.isIE9) {
        var table = $('#' + this.options.id + '_content_table')[0],
            fixedtable = $('#' + this.options.id + '_content_fixed_table')[0];
        var className = tr.className;
        var fixclassName = fixedtr.className;
        table.deleteRow(rowIndex + 1);
        fixedtable.deleteRow(rowIndex + 1);
        var tr = table.insertRow(rowIndex + 1);
        u.addClass(tr, className);
        var fixedtr = fixedtable.insertRow(rowIndex + 1);
        u.addClass(fixedtr, fixclassName);
        this.createContentOneRowTdForIE(tr, row);
        this.createContentOneRowTdForIE(fixedtr, row, 'fixed');
    } else {
        tr.innerHTML = this.createContentOneRowTd(row);
        if (fixedtr) fixedtr.innerHTML = this.createContentOneRowTd(row, 'fixed');
    }
    var obj = {};
    obj.begin = index;
    obj.length = 1;
    this.renderTypeFun(obj);
};
/*
 * 创建行td对应的html
 */
var createContentOneRowTd = function createContentOneRowTd(row, createFlag) {
    var oThis = this,
        htmlStr = '',
        gridCompColumnArr,
        value = row.value;
    if (createFlag == 'fixed') {
        gridCompColumnArr = this.gridCompColumnFixedArr;
    } else {
        gridCompColumnArr = this.gridCompColumnArr;
    }
    $.each(gridCompColumnArr, function () {
        var f = this.options.field,
            v = $(value).attr(f);
        v = oThis.getString(v, '');
        if ($.type(v) == 'object') {
            v = v.showValue;
        }
        var renderType = this.options.renderType;
        var treeStyle = '';
        var spanStr = '';
        var iconStr = '';
        var vStr = '';
        var tdStyle = '';
        var cssStr = '';
        var classStr = '';
        var rowHeight = oThis.options.rowHeight;
        if (oThis.options.showTree && this.firstColumn) {
            var l = parseInt(oThis.treeLeft) * parseInt(row.level);
            treeStyle = 'style="position:relative;';
            if (row.hasChild || value.isParent) {
                if (oThis.options.autoExpand && !value.isParent) {
                    spanStr = '<span class=" uf uf-reduce-s-o u-grid-content-tree-span"></span>';
                } else {
                    spanStr = '<span class=" uf uf-add-s-o u-grid-content-tree-span"></span>';
                }
            } else {
                l += 16;
            }
            treeStyle += 'text-align:' + this.options.textAlign + ';';
            if (oThis.options.maxHeight > 40) {
                treeStyle += 'max-height:' + oThis.options.maxHeight + 'px;';
            }
            treeStyle += 'left:' + l + 'px;"';
        } else {
            if (oThis.options.maxHeight > 40) {
                treeStyle += 'style="text-align:' + this.options.textAlign + ';max-height:' + oThis.options.maxHeight + 'px;"';
            } else {
                treeStyle += 'style="text-align:' + this.options.textAlign + ';"';
            }
        }

        if (this.options.icon) {
            iconStr = '<span class="' + this.options.icon + '"></span>';
        }
        if (oThis.options.heightAuto) {
            cssStr = 'height-auto';
        }
        // title="' + v + '" 创建td的时候不在设置title，在renderType中设置,处理现实xml的情况
        if (oThis.options.groupField && f == oThis.options.groupField) {
            classStr = 'class="u-grid-content-td-group-field';
            if (oThis.nowGroupValue == v) {
                classStr += ' no-text';
                oThis.nowGroupIndex++;
            } else {
                oThis.nowGroupIndex = 1;
                oThis.nowGroupValue = v;
                oThis.nowGroupRow = oThis.getGroupRowByGroupValue(v);
                oThis.nowGroupRowCount = oThis.nowGroupRow.rows.length;
            }
            if (oThis.nowGroupIndex == oThis.nowGroupRowCount) {
                classStr += ' group-last';
            }
            classStr += '"';
            if (oThis.nowGroupIndex == 1) rowHeight = oThis.options.rowHeight * oThis.nowGroupRowCount;
        }

        if (oThis.options.groupShowField && f == oThis.options.groupShowField) {
            var groupV = row.value[oThis.options.groupField];
            classStr = 'class="u-grid-content-td-group-field';
            if (oThis.nowGroupShowValue == v) {
                classStr += ' no-text';
                oThis.nowGroupShowIndex++;
            } else {
                oThis.nowGroupShowIndex = 1;
                oThis.nowGroupShowValue = v;
                oThis.nowGroupShowRow = oThis.getGroupRowByGroupValue(groupV);
                oThis.nowGroupShowRowCount = oThis.nowGroupShowRow.rows.length;
            }
            if (oThis.nowGroupShowIndex == oThis.nowGroupShowRowCount) {
                classStr += ' group-last';
            }
            classStr += '"';
            if (oThis.nowGroupShowIndex == 1) rowHeight = oThis.options.rowHeight * oThis.nowGroupShowRowCount;
        }

        if (!this.options.visible) {
            tdStyle = 'style="display:none;';
            if (oThis.options.rowHeight) {
                tdStyle += 'height:' + oThis.options.rowHeight + 'px;line-height:' + rowHeight + 'px;';
            }
            tdStyle += '"';
        } else {
            if (oThis.options.rowHeight) {
                tdStyle += 'style="height:' + oThis.options.rowHeight + 'px;line-height:' + rowHeight + 'px;"';
            }
        }
        htmlStr += '<td role="rowcell"  ' + tdStyle + classStr + ' realValue="' + v + '" ><div class="u-grid-content-td-div ' + cssStr + '" ' + treeStyle + '>' + spanStr + iconStr + '<span>' + v.replace(/\</g, '&lt;').replace(/\>/g, '&gt;') + '</span></div></td>';
    });
    return htmlStr;
};
/*
 * 创建行td,针对IE
 */
var createContentOneRowTdForIE = function createContentOneRowTdForIE(row, rowObj, createFlag) {
    var oThis = this,
        gridCompColumnArr,
        value = rowObj.value;
    if (createFlag == 'fixed') {
        gridCompColumnArr = this.gridCompColumnFixedArr;
    } else {
        gridCompColumnArr = this.gridCompColumnArr;
    }
    $.each(gridCompColumnArr, function () {
        var f = this.options.field,
            v = $(value).attr(f),
            v = oThis.getString(v, '');
        if ($.type(v) == 'object') {
            v = v.showValue;
        }
        var renderType = this.options.renderType,
            treeStyle = '',
            spanStr = '',
            iconStr = '',
            vStr = '',
            htmlStr = '',
            newCell = row.insertCell(),
            cssStr = '';
        newCell.setAttribute("role", "rowcell");
        // newCell.title = v.replace(/\</g,'\<').replace(/\>/g,'\>');
        if (oThis.options.showTree && this.firstColumn) {
            var l = parseInt(oThis.treeLeft) * parseInt(row.level);
            treeStyle = 'style="position:relative;';
            if (row.hasChild || value.isParent) {
                if (oThis.options.autoExpand && !value.isParent) {
                    spanStr = '<span class=" uf uf-reduce-s-o u-grid-content-tree-span"></span>';
                } else {
                    spanStr = '<span class=" uf uf-add-s-o u-grid-content-tree-span"></span>';
                }
            } else {
                l += 16;
            }
            treeStyle += 'text-align:' + this.options.textAlign + ';';
            if (oThis.options.maxHeight > 40) {
                treeStyle += 'max-height:' + oThis.options.maxHeight + 'px;';
            }
            treeStyle += 'left:' + l + 'px;"';
        } else {
            if (oThis.options.maxHeight > 40) {
                treeStyle += 'style="text-align:' + this.options.textAlign + ';max-height:' + oThis.options.maxHeight + 'px;"';
            } else {
                treeStyle += 'style="text-align:' + this.options.textAlign + ';"';
            }
        }
        if (!this.options.visible) {
            newCell.style.display = "none";
        }
        if (oThis.options.rowHeight) {
            newCell.style.height = oThis.options.rowHeight + 'px';
            newCell.style.lineHeight = oThis.options.rowHeight + 'px';
        }
        if (this.options.icon) {
            iconStr = '<span class="' + this.options.icon + '"></span>';
        }
        if (oThis.options.heightAuto) {
            cssStr = 'height-auto';
        }
        htmlStr += '<div class="u-grid-content-td-div ' + cssStr + '" ' + treeStyle + '>' + spanStr + iconStr + '<span>' + v.replace(/\</g, '&lt;').replace(/\>/g, '&gt;') + '</span></div>';
        newCell.insertAdjacentHTML('afterBegin', htmlStr);
    });
};
/*
 * 重画内容区域
 */
var repairContent = function repairContent() {
    var $pDiv = $('#' + this.options.id + '_content').parent();
    $('#' + this.options.id + '_content').remove(null, true);
    if ($pDiv[0]) {
        var htmlStr = this.createContent();
        $pDiv[0].insertAdjacentHTML('beforeEnd', htmlStr);
        this.renderTypeFun();
        this.initContentDivEventFun();
        if ($('#' + this.options.id + '_content_div')[0]) {
            $('#' + this.options.id + '_content_div')[0].scrollLeft = this.scrollLeft;
        }
        $('#' + this.options.id + '_content_edit_menu').css('display', 'none');
    }
    this.realtimeTableRows = null;
};

/**
 * Object Compare with Array Object
 */
var objCompare = function objCompare(rootObj, objAry) {
    var aryLen = objAry.length;
    // var rootStr = JSON.stringify(rootObj);
    var matchNum = 0;
    for (var i = 0; i < aryLen; i++) {
        // var compareStr = JSON.stringify(objAry[i]);
        var compareObj = objAry[i];
        matchNum += rootObj == compareObj ? 1 : 0;
    }
    return matchNum > 0 ? true : false;
};

var createFunObj = {
    createDivs: createDivs,
    repaintDivs: repaintDivs,
    createGridDivs: createGridDivs,
    repaintGridDivs: repaintGridDivs,
    createColumnMenu: createColumnMenu,
    createHeader: createHeader,
    createHeaderTable: createHeaderTable,
    createHeaderTableFixed: createHeaderTableFixed,
    createHeaderDrag: createHeaderDrag,
    createColgroup: createColgroup,
    createThead: createThead,
    createContent: createContent,
    createContentSumRow: createContentSumRow,
    createContentLeft: createContentLeft,
    createContentLeftMultiSelectRow: createContentLeftMultiSelectRow,
    createContentLeftNumColRow: createContentLeftNumColRow,
    createContentLeftMultiSelectGroupRows: createContentLeftMultiSelectGroupRows,
    createContentLeftNumColGroupRows: createContentLeftNumColGroupRows,
    createContentTable: createContentTable,
    createContentTableFixed: createContentTableFixed,
    createNoRowsDiv: createNoRowsDiv,
    createContentRows: createContentRows,
    createContentRowsSumRow: createContentRowsSumRow,
    createContentGroupRows: createContentGroupRows,
    createContentOneRow: createContentOneRow,
    createContentOneRowForIE: createContentOneRowForIE,
    repaintRow: repaintRow,
    createContentOneRowTd: createContentOneRowTd,
    createContentOneRowTdForIE: createContentOneRowTdForIE,
    repairContent: repairContent,
    createBeginNoScroll: createBeginNoScroll,
    createEndNoScroll: createEndNoScroll,
    createNoScroll: createNoScroll,
    createNoScrollTableFixed: createNoScrollTableFixed,
    createNoScrollTable: createNoScrollTable
};

var trHoverFun = function trHoverFun(index) {
    if (index < 0) return;
    var oThis = this;
    $('#' + oThis.options.id + '_content_tbody').find('tr[role="row"]').removeClass('u-grid-move-bg');
    $('#' + oThis.options.id + '_content_fixed_tbody').find('tr[role="row"]').removeClass('u-grid-move-bg');
    if (oThis.options.multiSelect) $('#' + oThis.options.id + '_content_multiSelect').find('div').removeClass('u-grid-move-bg');
    if (oThis.options.showNumCol) $('#' + oThis.options.id + '_content_numCol').find('div').removeClass('u-grid-move-bg');
    if (index > -1) {
        var $tr = $('#' + oThis.options.id + '_content_tbody').find('tr[role="row"]').eq(index);
        if ($tr && $tr[0] && $tr[0].id && $tr[0].id == oThis.options.id + '_edit_tr') {
            return;
        }
        $('#' + oThis.options.id + '_content_tbody').find('tr[role="row"]').eq(index).addClass('u-grid-move-bg');
        $('#' + oThis.options.id + '_content_fixed_tbody').find('tr[role="row"]').eq(index).addClass('u-grid-move-bg');
        if (oThis.options.multiSelect) $('#' + oThis.options.id + '_content_multiSelect').find('div').eq(index).addClass('u-grid-move-bg');
        if (oThis.options.showNumCol) $('#' + oThis.options.id + '_content_numCol').find('div').eq(index).addClass('u-grid-move-bg');
        if (typeof oThis.options.onRowHover == 'function' && !$tr.is('.u-grid-content-sum-row')) {
            var obj = {};
            obj.gridObj = oThis;
            obj.rowObj = oThis.dataSourceObj.rows[index];
            obj.rowIndex = index;
            oThis.options.onRowHover(obj);
        }
    }
};
/*
 * 定时器处理
 */
var setIntervalFun = function setIntervalFun(e) {
    this.widthChangeFun();
    this.heightChangeFun();
    this.editorRowChangeFun();
};
var editorRowChangeFun = function editorRowChangeFun() {};
/*
 * grid区域创建完成之后处理
 * 1、数据列显示处理
 * 2、取行高
 */
var afterGridDivsCreate = function afterGridDivsCreate() {
    if (this.showType != 'grid') return;
    this.columnsVisibleFun();
    this.resetThVariable();
    this.countRowHeight();
    this.noRowsShowFun();
    this.renderTypeFun();
    this.resetScrollLeft();
    this.hideEditMenu();
    this.resetLeftHeight();
    this.isCheckedHeaderRow();
    this.resetColumnWidthByRealWidth();
    if (typeof this.options.afterCreate == 'function') {
        this.options.afterCreate.call(this);
    }
};
/*
 * 取行高
 */
var countRowHeight = function countRowHeight() {
    if ($('#' + this.options.id + '_content_tbody tr')[0]) {
        this.rowHeight = $('#' + this.options.id + '_content_tbody tr')[0].offsetHeight;
    }
};

/**
 * 根据内容区的高度调整左侧区域的高度
 */
var resetLeftHeight = function resetLeftHeight() {
    if (!this.options.needResetHeight) {
        return;
    }
    this.resetLeftHeightTimes = 0;
    var self = this;
    if (this.resetLeftHeightSetTimeout) clearTimeout(this.resetLeftHeightSetTimeout);
    this.resetLeftHeightSetTimeout = setTimeout(function () {
        resetLeftHeightFun.call(self);
    }, 100);
};

var resetLeftHeightFun = function resetLeftHeightFun() {
    if (this.options.showNumCol || this.options.multiSelect) {
        var self = this;
        var $trs = $('#' + this.options.id + '_content_tbody tr[role="row"]');
        var $leftNums = $('#' + this.options.id + '_content_numCol div');
        var $leftSelects = $('#' + this.options.id + '_content_multiSelect > div');
        for (var i = 0; i < $trs.length; i++) {
            var nowRowHeight = $trs[i].offsetHeight;
            if (nowRowHeight == 0 && this.resetLeftHeightTimes < 50) {
                this.resetLeftHeightTimes++;
                this.resetLeftHeightSetTimeout = setTimeout(function () {
                    resetLeftHeightFun.call(self);
                }, 100);
            }
            if ($leftNums[i]) {
                $leftNums[i].style.height = nowRowHeight + 'px';
                $leftNums[i].style.lineHeight = nowRowHeight + 'px';
            }

            if ($leftSelects[i]) {
                $leftSelects[i].style.height = nowRowHeight + 'px';
                $leftSelects[i].style.lineHeight = nowRowHeight + 'px';
                $($leftSelects[i]).find('.u-grid-checkbox-outline').css('top', (nowRowHeight - 14) / 2);
            }
        }
    }
    this.resetLeftHeightGroupSumFun();
};
var resetLeftHeightGroupSumFun = function resetLeftHeightGroupSumFun() {};
/*
 * 处理是否显示无数据行
 */
var noRowsShowFun = function noRowsShowFun() {
    if (this.dataSourceObj.rows && this.dataSourceObj.rows.length > 0) {
        $('#' + this.options.id + '_noRowsShow').css('display', 'none');
        $('#' + this.options.id + '_noRows').css('display', 'none');
    } else {
        $('#' + this.options.id + '_noRowsShow').css('display', 'block');
        $('#' + this.options.id + '_noRows').css('display', 'block');
    }
};

/*
 * grid区域重画完成之后处理，已经执行过afterGridDivsCreate
 * 1、设置横向滚动条
 * 2、隐藏编辑按钮
 */
var afterRepaintGrid = function afterRepaintGrid() {
    this.resetScrollLeft();
    this.hideEditMenu();
};
/*
 * 设置横向滚动条
 */
var resetScrollLeft = function resetScrollLeft() {
    if ($('#' + this.options.id + '_content_div')[0]) {
        try {
            $('#' + this.options.id + '_content_div')[0].scrollLeft = this.scrollLeft;
        } catch (e) {}
    }
};
/*
 * 隐藏编辑按钮
 */
var hideEditMenu = function hideEditMenu() {};

var createCalFunOjb = {
    trHoverFun: trHoverFun,
    setIntervalFun: setIntervalFun,
    editorRowChangeFun: editorRowChangeFun,
    afterGridDivsCreate: afterGridDivsCreate,
    countRowHeight: countRowHeight,
    noRowsShowFun: noRowsShowFun,
    afterRepaintGrid: afterRepaintGrid,
    resetScrollLeft: resetScrollLeft,
    hideEditMenu: hideEditMenu,
    resetLeftHeight: resetLeftHeight,
    resetLeftHeightGroupSumFun: resetLeftHeightGroupSumFun
};

/*
 * 创建完成之后顶层div添加监听
 */
var initEventFun = function initEventFun() {
    var oThis = this;
    $('#' + this.options.id).on('mousedown', function (e) {
        if ($(e.target).closest('#' + oThis.options.id + '_header').length > 0) {
            // 点击的是header区域
            oThis.mouseDownX = e.clientX;
            oThis.mouseDownY = e.clientY;
        } else if ($(e.target).closest('#' + oThis.options.id + '_content').length > 0) {
            // 点击的是数据区域
        }
    });
};
/*
 * 创建完成之后grid层 div添加监听
 */
var initGridEventFun = function initGridEventFun() {
    var oThis = this;
    // 拖动
    this.initContentDivEventFun();
    // 全选
    $('#' + this.options.id + '_header_multi_input').on('click', function (e) {
        if (oThis.hasChecked) {
            oThis.setAllRowUnSelect();
        } else {
            oThis.setAllRowSelect();
        }
    });
};
/*
 * 内容区 div添加监听
 */
var initContentDivEventFun = function initContentDivEventFun() {
    var oThis = this;
    // 通过复选框设置选中行
    $('#' + oThis.options.id + '_content .u-grid-content-left').on('click', function (e) {
        var $input = $(e.target).closest('.u-grid-checkbox-outline');
        if ($input.length > 0) {
            var $div = $($input.parent());
            var index = $('.u-grid-content-multiSelect', $div.parent()).index($div);
            if ($input.hasClass('is-checked')) {
                oThis.setRowUnselect(index);
            } else {
                oThis.setRowSelect(index);
            }
        }
    });
    // 同步滚动条
    $('#' + this.options.id + '_content_div').on('scroll', function (e) {
        var sumRowH = 0,
            l;
        oThis.scrollLeft = this.scrollLeft;
        oThis.scrollTop = this.scrollTop;
        if (oThis.options.fixedFloat == 'right') {
            l = oThis.leftW - oThis.scrollLeft;
        } else {
            l = oThis.leftW - oThis.scrollLeft + oThis.fixedWidth;
        }
        $('#' + oThis.options.id + '_header_table').css('left', l + "px");
        $('#' + oThis.options.id + '_noScroll_begin_table').css('left', l + "px");
        $('#' + oThis.options.id + '_noScroll_end_table').css('left', l + "px");
        $('#' + oThis.options.id + '_noRowsShow').css('left', oThis.scrollLeft + "px");
        $('#' + oThis.options.id + '_edit_form').css('left', oThis.scrollLeft + "px");
        if (oThis.options.showSumRow && oThis.options.sumRowFirst && !oThis.options.sumRowFixed) {
            sumRowH = 44;
            if (oThis.options.sumRowHeight) sumRowH = oThis.options.sumRowHeight;
        }
        $('#' + oThis.options.id + '_content_multiSelect').css('top', -oThis.scrollTop + sumRowH + "px");
        $('#' + oThis.options.id + '_content_numCol').css('top', -oThis.scrollTop + sumRowH + "px");
        $('#' + oThis.options.id + '_content_fixed_div').css('top', -oThis.scrollTop + "px");
        if (gridBrowser.isIE10 || gridBrowser.isIPAD) {
            //ie10下示例系统中的档案节点新增数据之后前两次无法输入，因为此处会关闭输入控件
        } else {
            oThis.editClose();
        }
    });
    // 数据行相关事件
    $('#' + this.options.id + '_content_tbody').on('click', function (e) {
        // // 双击处理
        // if (typeof oThis.options.onDblClickFun == 'function') {
        //     oThis.isDblEvent('tbodyClick', oThis.dblClickFun, e, oThis.clickFun, e);
        // } else {
        //     oThis.clickFun(e);
        // }
        if (typeof oThis.options.onDblClickFun == 'function') {
            oThis.clickTimeout = setTimeout(function () {
                oThis.clickFun(e);
            }, 300);
        } else {
            oThis.clickFun(e);
        }
    });

    $('#' + this.options.id + '_content_tbody').dblclick(function (e) {
        if (typeof oThis.options.onDblClickFun == 'function') {
            if (oThis.clickTimeout) clearTimeout(oThis.clickTimeout);
            oThis.dblClickFun(e);
        }
    });
    $('#' + this.options.id + '_content_fixed_tbody').on('click', function (e) {
        // 双击处理
        // if (typeof oThis.options.onDblClickFun == 'function') {
        //     oThis.isDblEvent('tbodyClick', oThis.dblClickFun, e, oThis.clickFun, e);
        // } else {
        //     oThis.clickFun(e);
        // }
        if (typeof oThis.options.onDblClickFun == 'function') {
            oThis.clickTimeout = setTimeout(function () {
                oThis.clickFun(e);
            }, 300);
        } else {
            oThis.clickFun(e);
        }
    });
    $('#' + this.options.id + '_content_fixed_tbody').dblclick(function (e) {
        if (typeof oThis.options.onDblClickFun == 'function') {
            if (oThis.clickTimeout) clearTimeout(oThis.clickTimeout);
            oThis.dblClickFun(e);
        }
    });
    $('#' + this.options.id + '_content').on('mousemove', function (e) {
        var $tr = $(e.target).closest('tr'),
            $div = $(e.target).closest('div'),
            mousemoveIndex = -1;
        // 首先清除所有的背景
        if ($tr.length > 0) {
            mousemoveIndex = $('tr[role="row"]', $tr.parent()).index($tr);
        } else if ($div.length > 0 && ($div.hasClass('u-grid-content-multiSelect') || $div.hasClass('u-grid-content-num'))) {
            //左侧复选及数字列
            mousemoveIndex = $('div', $div.parent()).index($div);
        }

        oThis.trHoverFun(mousemoveIndex);
    });
    $('#' + this.options.id + '_content').on('mouseout', function (e) {
        $('#' + oThis.options.id + '_content_tbody').find('tr').removeClass('u-grid-move-bg');
        $('#' + oThis.options.id + '_content_fixed_tbody').find('tr').removeClass('u-grid-move-bg');
        if (oThis.options.multiSelect) $('#' + oThis.options.id + '_content_multiSelect').find('div').removeClass('u-grid-move-bg');
        if (oThis.options.showNumCol) $('#' + oThis.options.id + '_content_numCol').find('div').removeClass('u-grid-move-bg');
        if (typeof oThis.options.onContentOut == 'function') {
            var obj = {};
            obj.gridObj = oThis;
            var $tr = $(e.target).closest('tr');
            if ($tr.length > 0 && !$tr.is('.u-grid-content-sum-row')) {
                var mouseoutIndex = $('tr[role="row"]', $tr.parent()).index($tr);
                obj.rowObj = oThis.dataSourceObj.rows[mouseoutIndex];
                obj.rowIndex = mouseoutIndex;
            }
            oThis.options.onContentOut(obj);
        }
    });
};

var eventFunObj = {
    initEventFun: initEventFun,
    initGridEventFun: initGridEventFun,
    initContentDivEventFun: initContentDivEventFun
};

/*
 * 获取某列对应属性
 */
var getColumnAttr = function getColumnAttr(attr, field) {
    for (var i = 0; i < this.gridCompColumnArr.length; i++) {
        if (this.gridCompColumnArr[i].options.field == field) {
            return $(this.gridCompColumnArr[i].options).attr(attr);
        }
    }
    for (var i = 0; i < this.gridCompColumnFixedArr.length; i++) {
        if (this.gridCompColumnFixedArr[i].options.field == field) {
            return $(this.gridCompColumnFixedArr[i].options).attr(attr);
        }
    }
    return "";
};
/*
 * 根据field获取gridcompColumn对象
 */
var getColumnByField = function getColumnByField(field) {
    for (var i = 0; i < this.gridCompColumnArr.length; i++) {
        if (this.gridCompColumnArr[i].options.field == field) {
            return this.gridCompColumnArr[i];
        }
    }
    for (var i = 0; i < this.gridCompColumnFixedArr.length; i++) {
        if (this.gridCompColumnFixedArr[i].options.field == field) {
            return this.gridCompColumnFixedArr[i];
        }
    }

    return null;
};
/*
 * 获取column属于第几列
 */
var getIndexOfColumn = function getIndexOfColumn(column) {
    var index = -1;
    for (var i = 0; i < this.gridCompColumnArr.length; i++) {
        if (this.gridCompColumnArr[i] == column) {
            index = i;
            break;
        }
    }
    return index;
};
/*
 * 获取column属于当前显示第几列
 */
var getVisibleIndexOfColumn = function getVisibleIndexOfColumn(column) {
    var index = -1;
    var j = 0;
    for (var i = 0; i < this.gridCompColumnArr.length; i++) {
        if (this.gridCompColumnArr[i] == column) {
            if (!($('#' + this.options.id + '_header_table').find('th').eq(i).css('display') == 'none')) {
                index = j;
            }
            break;
        }
        if (!($('#' + this.options.id + '_header_table').find('th').eq(i).css('display') == 'none')) {
            j++;
        }
    }
    return index;
};
/*
 * 获取column后面第一个显示列所在第几列
 */
var getNextVisibleInidexOfColumn = function getNextVisibleInidexOfColumn(column) {
    var index = -1,
        flag = false,
        j = 0;
    for (var i = 0; i < this.gridCompColumnArr.length; i++) {
        if (this.gridCompColumnArr[i] == column) {
            if (!($('#' + this.options.id + '_header').find('th').eq(i).css('display') == 'none')) {

                j++;
            }
            flag = true;
        }
        if (flag == true && !($('#' + this.options.id + '_header').find('th').eq(i).css('display') == 'none')) {
            index = j;
            break;
        }
        if (!($('#' + this.options.id + '_header').find('th').eq(i).css('display') == 'none')) {

            j++;
        }
    }
    return index;
};

/*
 * 获取选中行
 */
var getSelectRows = function getSelectRows() {
    return this.selectRows;
};
/*
 * 获取选中行对应行号
 */
var getSelectRowsIndex = function getSelectRowsIndex() {
    return this.selectRowsIndex;
};

/*
 * 获取focus行
 */
var getFocusRow = function getFocusRow() {
    return this.focusRow;
};
/*
 * 获取focus行对应行号
 */
var getFocusRowIndex = function getFocusRowIndex() {
    return this.focusRowIndex;
};
/*
 * 获取所有行
 */
var getAllRows = function getAllRows() {
    var oThis = this;
    this.allRows = new Array();
    if (this.dataSourceObj.rows) {
        $.each(this.dataSourceObj.rows, function () {
            oThis.allRows.push(this.value);
        });
    }
    return this.allRows;
};
/*
 * 根据行号获取row
 */
var getRowByIndex = function getRowByIndex(index) {
    return this.dataSourceObj.rows[index];
};
/*
 * 根据某个字段值获取rowIndex
 */
var getRowIndexByValue = function getRowIndexByValue(field, value) {
    var index = -1;
    $.each(this.dataSourceObj.rows, function (i) {
        // var v = $(this.value).attr(field);
        var v = this.value[field];
        if (v == value) {
            index = i;
        }
    });
    return index;
};

var getChildRowIndex = function getChildRowIndex(row) {
    var result = [];
    $.each(row.childRow, function () {
        result.push(this.valueIndex);
    });
    return result;
};

var getColumnByVisibleIndex = function getColumnByVisibleIndex(index) {
    var nowIndex = -1;
    for (var i = 0; i < this.gridCompColumnArr.length; i++) {
        var column = this.gridCompColumnArr[i];
        if (!($('#' + this.options.id + '_header').find('th').eq(i).css('display') == 'none')) {
            nowIndex++;
        }
        if (nowIndex == index) {
            return column;
        }
    }
    return null;
};

var getAllVisibleColumns = function getAllVisibleColumns() {
    var index = -1;
    var j = 0;
    var allVisibleColumns = [];
    for (var i = 0; i < this.gridCompColumnArr.length; i++) {
        if (!($('#' + this.options.id + '_header').find('th').eq(i).css('display') == 'none')) {
            allVisibleColumns.push(this.gridCompColumnArr[i]);
        }
    }
    return allVisibleColumns;
};

var getFunObj = {
    getColumnAttr: getColumnAttr,
    getColumnByField: getColumnByField,
    getIndexOfColumn: getIndexOfColumn,
    getVisibleIndexOfColumn: getVisibleIndexOfColumn,
    getNextVisibleInidexOfColumn: getNextVisibleInidexOfColumn,
    getSelectRows: getSelectRows,
    getSelectRowsIndex: getSelectRowsIndex,
    getFocusRow: getFocusRow,
    getFocusRowIndex: getFocusRowIndex,
    getAllRows: getAllRows,
    getRowByIndex: getRowByIndex,
    getRowIndexByValue: getRowIndexByValue,
    getChildRowIndex: getChildRowIndex,
    getColumnByVisibleIndex: getColumnByVisibleIndex,
    getAllVisibleColumns: getAllVisibleColumns
};

/*
 * 处理参数
 */
var init$2 = function init(ele, options) {
    this.dataSource = dataSource;
    this.gridCompColumn = column;
    this.ele = ele[0];
    this.$ele = ele;
    this.initDefault();
    this.options = $.extend({}, this.defaults, options);
    this.getBooleanOptions();
    this.transDefault = {
        ml_show_column: '显示/隐藏列',
        ml_clear_set: '清除设置',
        ml_no_rows: '无数据',
        ml_sum: '合计:',
        ml_group_sum: '小计:',
        ml_close: '关闭'
    };
    this.transMap = $.extend({}, this.transDefault, options.transMap);
    this.gridCompColumnFixedArr = new Array();
    this.gridCompColumnArr = new Array(); // 存储设置默认值之后的columns对象
    // this.headerHeight = 45; // header区域高度
    this.countContentHeight = true; // 是否计算内容区的高度（是否为流式）
    this.minColumnWidth = 80; // 最小列宽
    this.scrollBarHeight = 16; // 滚动条高度
    this.numWidth = this.options.numWidth || 40; // 数字列宽度
    this.multiSelectWidth = this.options.multiSelectWidth || 40; // 复选框列宽度

    this.basicGridCompColumnArr = new Array(); // 存储基本的columns对象，用于清除设置
    this.columnMenuWidth = 160; // column menu的宽度
    this.columnMenuHeight = 33; // column menu的高度
    this.gridCompColumnFixedArr = new Array(); // 存储设置默认值之后的固定列columns对象
    this.gridCompLevelColumn = new Array(); // 存储多级表头时的多级
    this.baseHeaderHeight = this.options.headerHeight || 44;
    this.headerHeight = this.baseHeaderHeight * parseInt(this.options.maxHeaderLevel) + 1;
    this.gridCompHiddenLevelColumnArr = new Array(); // 存储自动隐藏时隐藏优先级排序后的column
    this.treeLeft = 10; // 树表时每一级之间的差值
    this.overWidthVisibleColumnArr = new Array(); // 超出定义宽度的column集合
};
var getBooleanOptions$1 = function getBooleanOptions() {
    this.options.cancelFocus = this.getBoolean(this.options.cancelFocus);
    this.options.showHeader = this.getBoolean(this.options.showHeader);
    this.options.showNumCol = this.getBoolean(this.options.showNumCol);
    this.options.multiSelect = this.getBoolean(this.options.multiSelect);
    this.options.columnMenu = this.getBoolean(this.options.columnMenu);
    this.options.canDrag = this.getBoolean(this.options.canDrag);
    this.options.overWidthHiddenColumn = this.getBoolean(this.options.overWidthHiddenColumn);
    this.options.sortable = this.getBoolean(this.options.sortable);
    this.options.showSumRow = this.getBoolean(this.options.showSumRow);
    this.options.sumRowFirst = this.getBoolean(this.options.sumRowFirst);
    this.options.canSwap = this.getBoolean(this.options.canSwap);
    this.options.showTree = this.getBoolean(this.options.showTree);
    this.options.autoExpand = this.getBoolean(this.options.autoExpand);
    this.options.needTreeSort = this.getBoolean(this.options.needTreeSort);
    this.options.needLocalStorage = this.getBoolean(this.options.needLocalStorage);
    this.options.noScroll = this.getBoolean(this.options.noScroll);
    this.options.cancelSelect = this.getBoolean(this.options.cancelSelect);
    this.options.contentSelect = this.getBoolean(this.options.contentSelect);
    this.options.contentFocus = this.getBoolean(this.options.contentFocus);
    this.options.needResetHeight = this.getBoolean(this.options.needResetHeight);
    this.options.treeAsync = this.getBoolean(this.options.treeAsync);
    this.options.heightAuto = this.getBoolean(this.options.heightAuto);
};
/*
 * 初始化默认参数
 */
var initDefault$1 = function initDefault() {
    this.defaults = {
        id: new Date().valueOf(),
        editType: 'default',
        cancelFocus: true, // 第二次点击是否取消focus
        cancelSelect: true, // 第二次点击是否取消select
        showHeader: true, // 是否显示表头
        showNumCol: false, // 是否显示数字列
        multiSelect: false, // 是否显示复选框
        columnMenu: true, // 是否存在列头操作按钮
        canDrag: true, // 是否可以拖动
        // formMaxWidth: 300, // 整体宽度小于某一值之后以form展示
        formMaxWidth: 0,
        maxHeaderLevel: 1, // header的最高层级，用于计算header区域的高度
        overWidthHiddenColumn: false, // 宽度不足时是否自动隐藏column
        sortable: true, // 是否可以排序
        showSumRow: false, // 是否显示合计行
        sumRowFirst: false, // 合计行是否显示在第一行，true表示显示在第一行，false表示显示在最后一行
        sumRowFixed: false, //合计行是否固定在头部，不随滚动条滚动
        canSwap: true, // 是否可以交换列位置
        showTree: false, // 是否显示树表
        autoExpand: true, // 是否默认展开
        needTreeSort: false, // 是否需要对传入数据进行排序，此设置为优化性能，如果传入数据是无序的则设置为true，如果可以保证先传入父节点后传入子节点则设置为false提高性能
        needLocalStorage: false, // 是否使用前端缓存
        noScroll: false, // 是否显示滚动条,宽度设置百分比的话不显示滚动条
        contentSelect: true, // 点击内容区是否执行选中逻辑
        showEditIcon: false, // 是否显示编辑图标
        contentFocus: true, // 点击内容区是否执行focus逻辑
        fixedFloat: 'left',
        groupField: '', // 是否按照某字段进行分组显示
        groupSumRow: false, //是否显示分组小计
        rowHeight: 44, // 行高
        columnMenuType: 'base', // border表示存在边线
        needResetHeight: false, // 是否需要根据右侧内容高度调整左侧高度，目前为false，后续提供方案之后再处理此参数
        treeAsync: false, //树表异步加载数据
        heightAuto: false, // 内容自动撑高
        expandColumnIndex: 0
        // sumRowHeight 合计行行高
        // headerHeight 表头高
        // maxHeight heightAuto为true时的最大高度
    };
};
/*
 * 创建grid
 */
var initGrid = function initGrid() {
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
    // UAP-NC 轻量化项目：切换tab时添加form会消失问题
    this.inte = setInterval(function () {
        oThis.setIntervalFun.call(oThis);
    }, 300);
};
/*
 * 销毁自身
 */
var destroySelf = function destroySelf() {
    clearInterval(this.inte);
    this.$ele.data('gridComp', null);
    this.ele.innerHTML = '';
    this.showTree = '';
    this.showType = '';
};
/*
 * 对传入参数进行格式化处理
 * 宽度、高度处理
 * 左侧区域宽度计算
 * 除去内容区域的高度
 */
var initOptions = function initOptions() {
    this.options.width = this.formatWidth(this.options.width);
    this.options.height = this.formatWidth(this.options.height);
    this.options.rowHeight = parseInt(this.options.rowHeight);
    if (this.options.height == '100%' || !this.options.height) {
        this.countContentHeight = false;
    }
    this.initOptionsTree();
    this.leftW = 0; // 左侧区域宽度（数字列复选框等）
    if (this.options.showNumCol) {
        this.leftW += this.numWidth;
    }
    if (this.options.multiSelect) {
        this.leftW += this.multiSelectWidth;
    }
    this.exceptContentHeight = 0; // 内容区域之外的高度
    this.noScrollHeight = 0;
    if (this.options.showHeader) {
        this.exceptContentHeight += this.headerHeight;
    }

    this.fixedWidth = 0;
    if (this.options.maxHeaderLevel > 1) {
        this.options.canSwap = false;
        this.options.canDrag = false;
        this.options.columnMenu = false;
    }
    if (this.options.rowHeight && !this.options.sumRowHeight) {
        this.options.sumRowHeight = this.options.rowHeight;
    }
    if (this.options.sumRowFixed) {
        this.noScrollHeight += this.options.sumRowHeight;
        this.exceptContentHeight += this.options.sumRowHeight;
        // if (!this.options.sumRowFirst) {
        this.exceptContentHeight += 1;
        // }
    }
    if (this.options.heightAuto) {
        this.options.needResetHeight = true;
    } else {
        this.options.maxHeight = 0;
    }

    // 获取缓存id
    var url = window.location.href;
    var index = url.indexOf('?');
    if (index > 0) {
        url = url.substring(0, index);
    }
    this.localStorageId = this.options.id + url;
};
var initOptionsTree = function initOptionsTree() {};
/*
 * 初始化变量
 */
var initVariable = function initVariable() {
    this.initDataSourceVariable();
    // 鼠标点击移动时位置记录
    this.mouseUpX = 'mouseUpX';
    this.mouseUpY = 'mouseUpY';
    this.mouseDownX = 'mouseDownX';
    this.mouseDownY = 'mouseDownY';
    this.mouseMoveX = 'mouseMoveX';
    this.mouseMoveY = 'mouseMoveY';
    this.scrollLeft = 0; // 记录横向滚动条
    this.scrollTop = 0; // 记录纵向滚动条
    this.showType = ''; // 记录grid显示方式，form和grid
    this.createGridFlag = false; // 是否已经创建grid展示
    this.columnClickX = 0; // 点击处的X坐标
    this.columnClickY = 0; // 点击处的Y坐标
    this.columnMenuMove = false; // 是否在column menu区域移动
    this.firstColumn = true; // 用于记录是否已经存在第一列，true表示还没有，false表示已经存在
    this.lastVisibleColumn = null;
    this.lastVisibleColumnWidth = 0;
    this.columnMenuMove = false; // 是否在column menu区域移动
    this.createColumnMenuFlag = false; // 是否已经创建column menu 区域
    this.menuColumnsHeight = 0;
    this.createFormFlag = false; // 是否已经创建form展示
    this.$sd_storageData = null; // 本地缓存内容为object
};
/*
 * 初始化datasource相关变量
 */
var initDataSourceVariable = function initDataSourceVariable() {
    this.selectRows = new Array();
    this.selectRowsObj = new Array();
    this.selectRowsIndex = new Array();
    this.allRows = new Array();
    this.eidtRowIndex = -1; // 当前修改行
};

// 初始化宽度相关变量
var initWidthVariable = function initWidthVariable() {
    // 计算用变量
    this.wholeWidth = 0; // 整体宽度
    this.wholeHeight = 0; // 整体高度
    this.rowHeight = 0; // 数据行高度
    this.contentRealWidth = 0; // 内容区真实宽度,严格按照设置的width计算的宽度
    this.contentWidth = 0; // 内容区宽度，自动扩展之后的宽度
    this.contentMinWidth = 0; // 内容区最小宽度,即可视宽度
    this.contentHeight = 0; //内容区高度
    this.fixedRealWidth = 0; // 固定区域真实宽度
    this.fixedWidth = 0; // 固定区域宽度
};
/*
 * 创建gridCompColumn对象方便后续处理
 */
var initGridCompColumn = function initGridCompColumn() {
    var oThis = this;
    this.initGridCompColumnVar();
    if (this.options.columns) {
        $.each(this.options.columns, function (i) {
            oThis.initGridCompColumnFun(this);
        });
    }
    this.initGridCompColumnLoacl();
    this.initGridHiddenLevelColumn();
    this.initGridCompFixedColumn();
    this.columnsVisibleFun();
};
var initGridCompColumnVar = function initGridCompColumnVar() {
    this.gridCompColumnArr = new Array();
    this.basicGridCompColumnArr = new Array();
    this.gridCompColumnFixedArr = new Array();
    this.gridCompLevelColumn = new Array();
    this.gridCompHiddenLevelColumnArr = new Array();
};
var initGridCompColumnFun = function initGridCompColumnFun(columnOptions) {
    var column$$1 = new column(columnOptions, this);
    // 如果可编辑增加修改图标
    this.editHeadTitleIcon(column$$1);
    var widthStr = column$$1.options.width + '';
    if (widthStr.indexOf("%") > 0) {
        this.options.noScroll = 'true';
    } else {
        column$$1.options.width = parseInt(column$$1.options.width);
    }
    column$$1.options.optionsWidth = column$$1.options.width;
    column$$1.options.realWidth = column$$1.options.width;
    this.gridCompColumnArr.push(column$$1);
    this.initGridCompColumnColumnMenuFun(columnOptions);
    this.initGridCompColumnHeaderLevelFun(columnOptions);
};
var initGridCompColumnColumnMenuFun = function initGridCompColumnColumnMenuFun(columnOptions) {};
var initGridCompColumnHeaderLevelFun = function initGridCompColumnHeaderLevelFun(columnOptions) {};
var initGridCompColumnLoacl = function initGridCompColumnLoacl(columnOptions) {};
var initGridHiddenLevelColumn = function initGridHiddenLevelColumn() {};
var initGridCompFixedColumn = function initGridCompFixedColumn() {};
/*
 * 设置某列是否必输
 */
var setRequired = function setRequired(field, value) {};
/*
 * 创建dataSource对象方便后续处理
 */
var initDataSource = function initDataSource() {
    var oThis = this;
    this.dataSourceObj = new dataSource(this.options.dataSource, this);
};
var initFunObj$2 = {
    init: init$2,
    getBooleanOptions: getBooleanOptions$1,
    initDefault: initDefault$1,
    initGrid: initGrid,
    destroySelf: destroySelf,
    initOptions: initOptions,
    initOptionsTree: initOptionsTree,
    initVariable: initVariable,
    initDataSourceVariable: initDataSourceVariable,
    initWidthVariable: initWidthVariable,
    initGridCompColumn: initGridCompColumn,
    initGridCompColumnVar: initGridCompColumnVar,
    initGridCompColumnFun: initGridCompColumnFun,
    initGridCompColumnColumnMenuFun: initGridCompColumnColumnMenuFun,
    initGridCompColumnHeaderLevelFun: initGridCompColumnHeaderLevelFun,
    initGridCompColumnLoacl: initGridCompColumnLoacl,
    initGridHiddenLevelColumn: initGridHiddenLevelColumn,
    initGridCompFixedColumn: initGridCompFixedColumn,
    setRequired: setRequired,
    initDataSource: initDataSource
};

/*
    重新结算是否选中header第一行
 */

var isCheckedHeaderRow = function isCheckedHeaderRow() {
    if (this.selectRows.length !== 0 && this.selectRows.length == this.dataSourceObj.rows.length) {
        //修改全选标记为false
        $('#' + this.options.id + '_header_multi_input').addClass('is-checked');
        this.hasChecked = true;
    } else {
        $('#' + this.options.id + '_header_multi_input').removeClass('is-checked');
        this.hasChecked = false;
    }
};
/*
 * 添加一行
 */
var addOneRow = function addOneRow(row, index) {

    if (typeof this.options.filterDataFun == 'function') {
        var rows = this.options.filterDataFun.call(this, [row]);
        row = rows[0];
    }
    row = this.getGridRow(row);
    var oThis = this,
        displayFlag = 'none',
        rowObj = {},
        parentIndex,
        parentChildLength = 0,
        l = this.dataSourceObj.rows.length,
        endFlag = false;
    rowObj.value = row, displayFlag;
    if (this.options.showTree) {
        var treeObj = this.addOneRowTree(row, index, rowObj);
        index = treeObj.index;
        displayFlag = treeObj.displayFlag;
    }

    if (this.options.groupField) {
        index = this.getGroupIndex(row, index, rowObj);
    }

    if (index != 0) {
        if (index && index > 0) {
            if (l < index) index = l;
        } else {
            index = 0;
        }
    }
    if (l == index) {
        endFlag = true;
    }
    rowObj.valueIndex = index;
    rowObj.value = row;
    this.dataSourceObj.rows.splice(index, 0, rowObj);
    // 如果是在中间插入需要将后续的valueIndex + 1；
    if (this.dataSourceObj.rows.length > index + 1) {
        $.each(this.dataSourceObj.rows, function (i) {
            if (i > index) {
                this.valueIndex = this.valueIndex + 1;
            }
        });
    }

    // 需要重新排序重置变量
    var l = 0;
    if (this.options.showTree) {
        if (this.dataSourceObj.options.values) {
            l = this.dataSourceObj.options.values.length;
        } else {
            this.dataSourceObj.options.values = new Array();
        }
        this.dataSourceObj.options.values.splice(index, 0, row);
        this.addOneRowTreeHasChildF(rowObj);
    } else {
        if (this.dataSourceObj.options.values) {} else {
            this.dataSourceObj.options.values = new Array();
        }
        this.dataSourceObj.options.values.splice(index, 0, row);
    }

    if (this.showType == 'grid' && !this.hasChildF) {
        //只有grid展示的时候才处理div，针对隐藏情况下还要添加数据
        this.editClose();
        this.updateEditRowIndex('+', index);
        try {
            var htmlStr = this.createContentOneRow(rowObj, 'normal', displayFlag);
            if (endFlag) {
                $('#' + this.options.id + '_content_tbody')[0].insertAdjacentHTML('beforeEnd', htmlStr);
            } else {
                var $$tr = $('#' + this.options.id + '_content_tbody').find('tr[role="row"]')[index - 1];
                var $$tbody = $('#' + this.options.id + '_content_tbody')[0];
                if ($$tr) $$tr.insertAdjacentHTML('afterEnd', htmlStr);else if ($$tbody) $$tbody.insertAdjacentHTML('afterBegin', htmlStr);
            }
            if ($('#' + this.options.id + '_content_fixed_div').length > 0) {
                var htmlStr = this.createContentOneRow(rowObj, 'fixed', displayFlag);
                if (endFlag) {
                    $('#' + this.options.id + '_content_fixed_tbody')[0].insertAdjacentHTML('beforeEnd', htmlStr);
                } else {
                    var $$tr = $('#' + this.options.id + '_content_fixed_tbody').find('tr[role="row"]')[index - 1];
                    if ($$tr) $$tr.insertAdjacentHTML('afterEnd', htmlStr);else if ($('#' + this.options.id + '_content_fixed_tbody')[0]) $('#' + this.options.id + '_content_fixed_tbody')[0].insertAdjacentHTML('afterBegin', htmlStr);
                }
            }
        } catch (e) {
            //IE情况下
            var table = $('#' + this.options.id + '_content_div table')[0];
            if (table) this.createContentOneRowForIE(table, index, rowObj, 'normal', displayFlag);
            var fixedTable = $('#' + this.options.id + '_content_fixed_div table')[0];
            if (fixedTable) this.createContentOneRowForIE(fixedTable, index, rowObj, 'fixed', displayFlag);
        }
        if (this.options.multiSelect) {
            var htmlStr = this.createContentLeftMultiSelectRow(rowObj, displayFlag);
            if (endFlag) {
                $('#' + this.options.id + '_content_multiSelect')[0].insertAdjacentHTML('beforeEnd', htmlStr);
            } else {
                var $$div = $('#' + this.options.id + '_content_multiSelect').find('div')[index - 1];
                if ($$div) $$div.insertAdjacentHTML('afterEnd', htmlStr);else $('#' + this.options.id + '_content_multiSelect')[0].insertAdjacentHTML('afterBegin', htmlStr);
            }
            if (this.options.sumRowFirst && !this.options.sumRowFixed && this.dataSourceObj.rows.length > 0) $('#' + this.options.id + '_content_multiSelect').addClass('u-grid-content-left-sum-first');
        }
        if (this.options.showNumCol) {
            var htmlStr = this.createContentLeftNumColRow(index, row);
            if (endFlag) {
                $('#' + this.options.id + '_content_numCol')[0].insertAdjacentHTML('beforeEnd', htmlStr);
            } else {
                var $$div = $('#' + this.options.id + '_content_numCol').find('div')[index - 1];
                if ($$div) $$div.insertAdjacentHTML('afterEnd', htmlStr);else $('#' + this.options.id + '_content_numCol')[0].insertAdjacentHTML('afterBegin', htmlStr);
            }
            if (this.options.sumRowFirst && !this.options.sumRowFixed && this.dataSourceObj.rows.length > 0) $('#' + this.options.id + '_content_numCol').addClass('u-grid-content-left-sum-first');
            this.resetNumCol();
            this.updateNumColLastRowFlag();
        }
        this.repairSumRow();
        this.repairGroupSumRow(rowObj);
        this.noRowsShowFun();
        this.updateLastRowFlag();
        this.resetLeftHeight();
        if (this.dataSourceObj.rows.length > 0) {
            $('#' + this.options.id + '_grid .u-grid-noScroll-left').css('display', "block");
        } else {
            $('#' + this.options.id + '_grid .u-grid-noScroll-left').css('display', "none");
        }
        var obj = {};
        obj.begin = index;
        obj.length = 1;
        this.renderTypeFun(obj);
        if (this.options.groupField) {
            var groupValue = row[this.options.groupField];
            this.resetGroupFieldTd(groupValue);
        }
    }
};

var resetGroupFieldTd = function resetGroupFieldTd() {};

var repairGroupSumRow = function repairGroupSumRow() {};
var addOneRowTree = function addOneRowTree(row, index) {
    return index;
};

var getGroupIndex = function getGroupIndex(row, index) {
    return index;
};
var addOneRowTreeHasChildF = function addOneRowTreeHasChildF() {};
var editClose = function editClose() {};
/*
 * 添加多行
 */
var addRows = function addRows(rows, index) {

    if (!(this.$ele.data('gridComp') == this)) return;
    if (this.options.showTree || this.options.groupField) {
        // 树表待优化
        var l = rows.length;
        for (var i = 0; i < l; i++) {
            this.addOneRow(rows[i], l);
        }
        return;
    }
    if (typeof this.options.filterDataFun == 'function') {
        rows = this.options.filterDataFun.call(this, rows);
    }

    this.editClose();
    var htmlStr = '',
        htmlStrmultiSelect = '',
        htmlStrNumCol = '',
        htmlStrFixed = '',
        oThis = this,
        l = this.dataSourceObj.rows.length,
        endFlag = false;
    var newRows = [];
    $.each(rows, function () {
        newRows.push(oThis.getGridRow(this));
    });
    rows = newRows;
    if (index != 0) {
        if (index && index > 0) {
            if (l < index) index = l;
        } else {
            index = 0;
        }
    }
    if (l == index) {
        endFlag = true;
    }
    var rowObjArr = new Array();
    $.each(rows, function (i) {
        var rowObj = {};
        rowObj.value = this;
        rowObj.valueIndex = index + i;
        rowObjArr.push(rowObj);
        oThis.dataSourceObj.rows.splice(index + i, 0, rowObj);
        oThis.updateEditRowIndex('+', index + i);
    });

    if (this.dataSourceObj.options.values) {} else {
        this.dataSourceObj.options.values = new Array();
    }
    $.each(rows, function (i) {
        oThis.dataSourceObj.options.values.splice(index + i, 0, this);
    });

    // 如果是在中间插入需要将后续的valueIndex + 1；
    if (this.dataSourceObj.rows.length > index + rows.length) {
        $.each(this.dataSourceObj.rows, function (i) {
            if (i > index + rows.length - 1) {
                this.valueIndex = this.valueIndex + rows.length;
            }
        });
    }
    if (this.showType == 'grid' && $('#' + this.options.id + '_content_div tbody')[0]) {
        //只有grid展示的时候才处理div，针对隐藏情况下还要添加数据 //lyk--需要完善隐藏之后再显示同事添加数据操作
        $.each(rowObjArr, function (i, row) {
            htmlStr += oThis.createContentOneRow(this);
            htmlStrFixed += oThis.createContentOneRowFixed(this);
            if (oThis.options.multiSelect) {
                htmlStrmultiSelect += oThis.createContentLeftMultiSelectRow(this);
            }
            if (oThis.options.showNumCol) {
                htmlStrNumCol += oThis.createContentLeftNumColRow(l + i, row.value);
            }
        });
        try {
            if (endFlag) {
                $('#' + this.options.id + '_content_div tbody')[0].insertAdjacentHTML('beforeEnd', htmlStr);
            } else {
                if ($('#' + this.options.id + '_content_div').find('tbody').find('tr[role="row"]')[index]) $('#' + this.options.id + '_content_div').find('tbody').find('tr[role="row"]')[index].insertAdjacentHTML('beforeBegin', htmlStr);else if ($('#' + this.options.id + '_content_div tbody')[0]) $('#' + this.options.id + '_content_div tbody')[0].insertAdjacentHTML('afterBegin', htmlStr);
            }
            if (endFlag) {
                $('#' + this.options.id + '_content_fixed_div tbody')[0].insertAdjacentHTML('beforeEnd', htmlStrFixed);
            } else {
                if ($('#' + this.options.id + '_content_fixed_div').find('tbody').find('tr[role="row"]')[index]) $('#' + this.options.id + '_content_fixed_div').find('tbody').find('tr[role="row"]')[index].insertAdjacentHTML('beforeBegin', htmlStrFixed);else if ($('#' + this.options.id + '_content_fixed_div tbody')[0]) $('#' + this.options.id + '_content_fixed_div tbody')[0].insertAdjacentHTML('afterBegin', htmlStrFixed);
            }
        } catch (e) {
            //IE情况下
            var table = $('#' + this.options.id + '_content_div table')[0];
            var fixedTable = $('#' + this.options.id + '_content_fixed_div table')[0];
            if (table && fixedTable) {
                $.each(rowObjArr, function (i) {
                    oThis.createContentOneRowForIE(table, index + i, this);
                    oThis.createContentOneRowForIE(fixedTable, index + i, this, 'fixed');
                });
            }
        }
        if (this.options.multiSelect) {
            if (endFlag) {
                $('#' + this.options.id + '_content_multiSelect')[0].insertAdjacentHTML('beforeEnd', htmlStrmultiSelect);
            } else {
                var _content_multiSelect = $('#' + this.options.id + '_content_multiSelect').find('div')[index];
                if (_content_multiSelect) _content_multiSelect.insertAdjacentHTML('beforeBegin', htmlStrmultiSelect);else $('#' + this.options.id + '_content_multiSelect')[0].insertAdjacentHTML('afterBegin', htmlStrmultiSelect);
            }
            if (this.options.sumRowFirst && !this.options.sumRowFixed && this.dataSourceObj.rows.length > 0) $('#' + this.options.id + '_content_multiSelect').addClass('u-grid-content-left-sum-first');
        }
        if (this.options.showNumCol) {
            if (endFlag) {
                $('#' + this.options.id + '_content_numCol')[0].insertAdjacentHTML('beforeEnd', htmlStrNumCol);
            } else {
                var _content_multiSelect = $('#' + this.options.id + '_content_numCol').find('div')[index];
                if (_content_multiSelect) _content_multiSelect.insertAdjacentHTML('beforeBegin', htmlStrNumCol);else $('#' + this.options.id + '_content_numCol')[0].insertAdjacentHTML('afterBegin', htmlStrNumCol);
            }
            if (this.options.sumRowFirst && !this.options.sumRowFixed && this.dataSourceObj.rows.length > 0) $('#' + this.options.id + '_content_numCol').addClass('u-grid-content-left-sum-first');
            this.resetNumCol();
            this.updateNumColLastRowFlag();
        }
        this.repairSumRow();
        if (this.dataSourceObj.rows.length > 0) {
            $('#' + this.options.id + '_grid .u-grid-noScroll-left').css('display', "block");
        } else {
            $('#' + this.options.id + '_grid .u-grid-noScroll-left').css('display', "none");
        }
        this.noRowsShowFun();
        var obj = {};
        obj.begin = index;
        obj.length = rows.length;
        this.renderTypeFun(obj);
    }

    this.updateLastRowFlag();
    this.isCheckedHeaderRow();
    this.resetLeftHeight();
};
var createContentOneRowFixed = function createContentOneRowFixed(rowObj) {
    return '';
};
var updateEditRowIndex = function updateEditRowIndex(opType, opIndex, num) {};
/*
 * 删除一行
 */
var deleteOneRow = function deleteOneRow(index) {
    var oThis = this;
    index = parseInt(index);
    var row = this.dataSourceObj.rows[index];
    if (!row) return;
    var rowValue = row.value;

    if (this.showType == 'grid' && this.eidtRowIndex != index) {
        //只有grid展示的时候才处理div，针对隐藏情况下还要添加数据
        this.editClose();
    }
    this.dataSourceObj.rows.splice(index, 1);
    this.updateEditRowIndex('-', index);
    if (this.dataSourceObj.options.values) {
        var i = this.dataSourceObj.options.values.indexOf(rowValue);
        this.dataSourceObj.options.values.splice(i, 1);
    }
    // 如果是在中间插入需要将后续的valueIndex - 1；
    if (this.dataSourceObj.rows.length > index + 1) {
        $.each(this.dataSourceObj.rows, function (i) {
            if (i >= index) {
                this.valueIndex = this.valueIndex - 1;
            }
        });
    }
    if (this.selectRows) {
        $.each(this.selectRows, function (i) {
            if (this == rowValue) {
                oThis.selectRows.splice(i, 1);
                oThis.selectRowsObj.splice(i, 1);
                oThis.selectRowsIndex.splice(i, 1);
            } else if (oThis.selectRowsIndex[i] > index) {
                oThis.selectRowsIndex[i] = oThis.selectRowsIndex[i] - 1;
            }
        });
    }
    if (this.focusRow) {
        if (this.focusRow == rowValue) {
            this.focusRow = null;
            this.focusRowObj = null;
            this.focusRowIndex = null;
        } else if (this.focusRowIndex > index) {
            this.focusRowIndex = this.focusRowIndex - 1;
        }
    }
    this.deleteOneRowGroup(row);
    if (this.showType == 'grid') {
        //只有grid展示的时候才处理div，针对隐藏情况下还要添加数据
        $('#' + this.options.id + '_content_div tbody tr[role="row"]:eq(' + index + ')').remove();
        $('#' + this.options.id + '_content_fixed_div tbody tr[role="row"]:eq(' + index + ')').remove();
        $('#' + this.options.id + '_content_multiSelect >div:eq(' + index + ')').remove();
        $('#' + this.options.id + '_content_numCol >.u-grid-content-num:eq(' + index + ')').remove();
        if (this.dataSourceObj.rows.length == 0) {
            $('#' + this.options.id + '_content_multiSelect').removeClass('u-grid-content-left-sum-first');
            $('#' + this.options.id + '_content_numCol').removeClass('u-grid-content-left-sum-first');
        }
        this.resetNumCol();
        this.repairSumRow();
        this.repairGroupSumRow(row);
        this.noRowsShowFun();
        this.updateNumColLastRowFlag();
        if (this.dataSourceObj.rows.length > 0) {
            $('#' + this.options.id + '_grid .u-grid-noScroll-left').css('display', "block");
        } else {
            $('#' + this.options.id + '_grid .u-grid-noScroll-left').css('display', "none");
        }
        if (this.options.groupField) {
            var groupValue = row.value[this.options.groupField];
            this.resetGroupFieldTd(groupValue);
        }
    }

    this.deleteOneRowTree();
    if (typeof this.options.onRowDelete == 'function') {
        var obj = {};
        obj.gridObj = this;
        obj.index = index;
        obj.row = row;
        if (!this.options.onRowDelete(obj)) {
            return;
        }
    }
    this.isCheckedHeaderRow();
};
var repairSumRow = function repairSumRow() {};
var deleteOneRowGroupSum = function deleteOneRowGroupSum() {};
var deleteOneRowTree = function deleteOneRowTree() {};
/*
 * 删除多行
 */
var deleteRows = function deleteRows(indexs) {
    var oThis = this,
        indexss = new Array();
    $.each(indexs, function (i) {
        indexss.push(indexs[i]);
    });
    indexss.sort(function (a, b) {
        return b - a;
    });

    $.each(indexss, function (i) {
        oThis.deleteOneRow(this);
    });
    this.isCheckedHeaderRow();
};
/*
 * 修改某一行
 */
var updateRow = function updateRow(index, row) {
    if (index > -1 && index < this.dataSourceObj.rows.length) {
        this.dataSourceObj.rows[index].value = row;
        this.dataSourceObj.options.values[this.dataSourceObj.rows[index].valueIndex] = row;
        if (this.showType == 'grid') {
            var obj = {};
            obj.begin = index;
            obj.length = 1;
            this.renderTypeFun(obj);
            this.repairSumRow();
        }
    }
};
/*
 * 修改某个cell的值
 */
var updateValueAt = function updateValueAt(rowIndex, field, value, force) {
    if (rowIndex > -1 && rowIndex < this.dataSourceObj.rows.length) {
        var oThis = this,
            oldValue = $(this.dataSourceObj.rows[rowIndex].value).attr(field),
            treeRowIndex = rowIndex;
        if (typeof value == 'undefined') value = '';
        if (oldValue != value || force) {
            if (typeof this.options.onBeforeValueChange == 'function') {
                var obj = {};
                obj.gridObj = this;
                //因为树表更新时候可能改变rowIndex的顺序
                obj.rowIndex = treeRowIndex;
                obj.field = field;
                obj.oldValue = oldValue;
                obj.newValue = value;
                var flag = this.options.onBeforeValueChange(obj);
                if (!flag) return;
            }
            $(this.dataSourceObj.rows[rowIndex].value).attr(field, value);
            // $(this.dataSourceObj.options.values[this.dataSourceObj.rows[rowIndex].valueIndex]).attr(field, value); //grouptest依次执行除删除后不存在分组表头按钮最后修改数据会错误
            if (this.showType == 'grid') {
                var obj = {};
                obj.field = field;
                obj.begin = rowIndex;
                obj.length = 1;
                this.renderTypeFun(obj);
                // this.editColIndex = undefined;
                // 如果编辑行为修改行则同时需要修改编辑行的显示
                treeRowIndex = this.updateValueAtTree(rowIndex, field, value, force);
                this.updateValueAtEdit(rowIndex, field, value, force);
                this.repairSumRow();
                this.repairGroupSumRow(this.dataSourceObj.rows[rowIndex]);
            }
            if (typeof this.options.onValueChange == 'function') {
                var obj = {};
                obj.gridObj = this;
                //因为树表更新时候可能改变rowIndex的顺序
                obj.rowIndex = treeRowIndex;
                obj.field = field;
                obj.oldValue = oldValue;
                obj.newValue = value;
                this.options.onValueChange(obj);
            }
            this.resetLeftHeight();
        }
    }
};
var updateValueAtTree = function updateValueAtTree(rowIndex, field, value, force) {
    return rowIndex;
};
var updateValueAtEdit = function updateValueAtEdit(rowIndex, field, value, force) {};
/*
 * 选中一行
 * slice 设置全选时，slice为true，不做渲染，在setAllRowSelect中统一渲染
 */
var setRowSelect = function setRowSelect(rowIndex, doms) {
    var selectDiv, rowTr, fixedRowTr, numColDiv;
    if (!this.dataSourceObj.rows[rowIndex]) return true;
    //已经选中退出
    if (this.showType == 'grid') {
        if (doms && doms['contentTrs']) rowTr = doms['contentTrs'][rowIndex];else rowTr = this.$ele.find('#' + this.options.id + '_content_tbody tr[role="row"]')[rowIndex];
    }
    if (this.dataSourceObj.rows[rowIndex].checked) {
        if (this.showType == 'grid') {
            if (u.hasClass(rowTr, "u-grid-content-sel-row")) return true;
        } else {
            return true;
        }
    }
    if (doms && doms['multiSelectDivs']) selectDiv = doms['multiSelectDivs'][rowIndex];else selectDiv = this.$ele.find('#' + this.options.id + '_content_multiSelect').find('div')[rowIndex];

    var beforeSelectFlag = true;
    if (typeof this.options.onBeforeRowSelected == 'function') {
        var obj = {};
        obj.gridObj = this;
        obj.rowObj = this.dataSourceObj.rows[rowIndex];
        obj.rowIndex = rowIndex;
        beforeSelectFlag = this.options.onBeforeRowSelected(obj);
    }
    if (beforeSelectFlag && typeof this.options.onBeforeCreateLeftMul == 'function') {
        var obj = {
            gridObj: this,
            rowObj: this.dataSourceObj.rows[rowIndex]
        };
        beforeSelectFlag = this.options.onBeforeCreateLeftMul.call(this, obj);
    }
    if (!beforeSelectFlag) {
        if (this.options.multiSelect) {
            var _input = selectDiv.children[0];
            if (_input) _input.checked = false;
        }
        return false;
    }
    if (!this.options.multiSelect) {
        if (this.selectRowsObj && this.selectRowsObj.length > 0) {
            $.each(this.selectRowsObj, function () {
                this.checked = false;
            });
        }
        this.selectRows = new Array();
        this.selectRowsObj = new Array();
        this.selectRowsIndex = new Array();
        if (this.showType == 'grid') {
            $('#' + this.options.id + '_content_tbody tr[role="row"]').removeClass("u-grid-content-sel-row");
            $('#' + this.options.id + '_content_tbody tr[role="row"] a').removeClass("u-grid-content-sel-row");
            $('#' + this.options.id + '_content_fixed_tbody tr[role="row"]').removeClass("u-grid-content-sel-row");
            $('#' + this.options.id + '_content_fixed_tbody tr[role="row"] a').removeClass("u-grid-content-sel-row");
            if (this.options.multiSelect) {
                $('#' + this.options.id + '_content_multiSelect div').removeClass("u-grid-content-sel-row");
            }
            if (this.options.showNumCol) {
                $('#' + this.options.id + '_content_numCol div').removeClass("u-grid-content-sel-row");
            }
        }
    } else {
        if (this.showType == 'grid') {
            var _input = selectDiv.children[0];
            // _input.checked = true;
            $(_input).addClass('is-checked');
        }
    }
    if (this.showType == 'grid') {
        $(rowTr).addClass("u-grid-content-sel-row");

        if (doms && doms['fixContentTrs']) fixedRowTr = doms['fixContentTrs'][rowIndex];else fixedRowTr = this.$ele.find('#' + this.options.id + '_content_fixed_tbody tr[role="row"]')[rowIndex];
        $(fixedRowTr).addClass("u-grid-content-sel-row");
        var ini = rowIndex;
        if (this.eidtRowIndex > -1 && this.eidtRowIndex < rowIndex && this.options.editType == 'form') {
            ini++;
        }
        if (this.options.multiSelect) {
            if (ini != rowIndex) selectDiv = this.$ele.find('#' + this.options.id + '_content_multiSelect').find('div')[ini];
            $(selectDiv).addClass('u-grid-content-sel-row');
        }
        if (this.options.showNumCol) {
            if (doms && doms['numColDivs']) numColDiv = doms['numColDivs'][ini];else numColDiv = this.$ele.find('#' + this.options.id + '_content_numCol').find('div')[ini];
            $(numColDiv).addClass('u-grid-content-sel-row');
        }
    }
    this.selectRows.push(this.dataSourceObj.rows[rowIndex].value);
    this.selectRowsObj.push(this.dataSourceObj.rows[rowIndex]);
    this.selectRowsIndex.push(rowIndex);
    this.dataSourceObj.rows[rowIndex].checked = true;
    // if(this.selectRows.length == this.dataSourceObj.rows.length){
    //     //修改全选标记为false
    //     $('#' + this.options.id + '_header_multi_input').addClass('is-checked')
    // }
    this.isCheckedHeaderRow();
    if (typeof this.defaultOnRowSelected == 'function') {
        var obj = {};
        obj.gridObj = this;
        obj.rowObj = this.dataSourceObj.rows[rowIndex];
        obj.rowIndex = rowIndex;
        this.defaultOnRowSelected(obj);
    }

    if (typeof this.options.onRowSelected == 'function') {
        var obj = {};
        obj.gridObj = this;
        obj.rowObj = this.dataSourceObj.rows[rowIndex];
        obj.rowIndex = rowIndex;
        this.options.onRowSelected(obj);
    }
    return true;
};
/*
 * 反选一行
 */
var setRowUnselect = function setRowUnselect(rowIndex) {
    var oThis = this;
    if (!this.dataSourceObj.rows[rowIndex]) return true;
    //已经选中退出
    if (!this.dataSourceObj.rows[rowIndex].checked) return true;
    if (typeof this.options.onBeforeRowUnSelected == 'function') {
        var obj = {};
        obj.gridObj = this;
        obj.rowObj = this.dataSourceObj.rows[rowIndex];
        obj.rowIndex = rowIndex;
        if (!this.options.onBeforeRowUnSelected(obj)) {
            if (this.options.multiSelect) {
                $('#' + this.options.id + '_content_multiSelect input:eq(' + rowIndex + ')')[0].checked = true;
            }
            return false;
        }
    }
    if (this.options.multiSelect) {
        // $('#' + this.options.id + '_content_multiSelect input:eq(' + rowIndex+ ')')[0].checked = false;
        $('#' + this.options.id + '_content_multiSelect .u-grid-content-multiSelect:eq(' + rowIndex + ')').find('.u-grid-checkbox-outline').removeClass('is-checked');
    }
    var ini = rowIndex;
    if (this.eidtRowIndex > -1 && this.eidtRowIndex < rowIndex && this.options.editType == 'form') {
        ini++;
    }
    $('#' + this.options.id + '_content_tbody').find('tr[role="row"]:eq(' + ini + ')').removeClass("u-grid-content-sel-row");
    $('#' + this.options.id + '_content_tbody').find('tr[role="row"]:eq(' + ini + ') a').removeClass("u-grid-content-sel-row");
    $('#' + this.options.id + '_content_fixed_tbody').find('tr[role="row"]:eq(' + ini + ')').removeClass("u-grid-content-sel-row");
    $('#' + this.options.id + '_content_fixed_tbody').find('tr[role="row"]:eq(' + ini + ') a').removeClass("u-grid-content-sel-row");
    if (this.options.multiSelect) {
        $('#' + this.options.id + '_content_multiSelect >div:eq(' + ini + ')').removeClass("u-grid-content-sel-row");
    }
    if (this.options.showNumCol) {
        $('#' + this.options.id + '_content_numCol >div:eq(' + ini + ')').removeClass("u-grid-content-sel-row");
    }
    $.each(this.selectRows, function (i) {
        if (this == oThis.dataSourceObj.rows[rowIndex].value) {
            oThis.selectRows.splice(i, 1);
            oThis.selectRowsObj.splice(i, 1);
            oThis.selectRowsIndex.splice(i, 1);
        }
    });
    this.dataSourceObj.rows[rowIndex].checked = false;

    //修改全选标记为false
    $('#' + this.options.id + '_header_multi_input').removeClass('is-checked');

    if (typeof this.options.onRowUnSelected == 'function') {
        var obj = {};
        obj.gridObj = this;
        obj.rowObj = this.dataSourceObj.rows[rowIndex];
        obj.rowIndex = rowIndex;
        this.options.onRowUnSelected(obj);
    }
    oThis.isCheckedHeaderRow();
    return true;
};
/*
 * 选中所有行
 */
var setAllRowSelect = function setAllRowSelect() {
    // $('#' + this.options.id + '_header_multi_input').prop('checked', true)
    $('#' + this.options.id + '_header_multi_input').addClass('is-checked');
    if (typeof this.options.onBeforeAllRowSelected == 'function') {
        var obj = {};
        obj.gridObj = this;
        obj.rowObjs = this.dataSourceObj.rows;
        if (!this.options.onBeforeAllRowSelected(obj)) {
            return;
        }
    }
    // 把需要的dom在循环外获取出来
    var multiSelectDivs = this.$ele.find('#' + this.options.id + '_content_multiSelect >div'),
        numColDivs = this.$ele.find('#' + this.options.id + '_content_numCol >div'),
        contentTrs = this.$ele.find('#' + this.options.id + '_content_tbody tr[role="row"]'),
        fixContentTrs = this.$ele.find('#' + this.options.id + '_content_fixed_tbody tr[role="row"]');
    this.$ele.find('#' + this.options.id + '_content_tbody tr[role="row"]');
    for (var i = 0; i < this.dataSourceObj.rows.length; i++) {
        this.setRowSelect(i, {
            multiSelectDivs: multiSelectDivs,
            numColDivs: numColDivs,
            contentTrs: contentTrs,
            fixContentTrs: fixContentTrs
        });
    }
    this.hasChecked = true;
    if (typeof this.options.onAllRowSelected == 'function') {
        var obj = {};
        obj.gridObj = this;
        obj.rowObjs = this.dataSourceObj.rows;
        this.options.onAllRowSelected(obj);
    }
};
/*
 * 反选所有行
 * 所有行取消选中--huyue
 */
var setAllRowUnSelect = function setAllRowUnSelect() {
    // $('#' + this.options.id + '_header_multi_input').attr('checked', false)
    $('#' + this.options.id + '_header_multi_input').removeClass('is-checked');
    if (typeof this.options.onBeforeAllRowUnSelected == 'function') {
        var obj = {};
        obj.gridObj = this;
        obj.rowObjs = this.dataSourceObj.rows;
        if (!this.options.onBeforeAllRowUnSelected(obj)) {
            return;
        }
    }
    // begin-在调用该方式时需要将row对象更新，否则会导致虽然点击取消全选但是获取到的还是全选的row--huyue
    for (var i = 0; i < this.dataSourceObj.rows.length; i++) {
        this.setRowUnselect(i);
    }
    // end
    if (this.options.multiSelect) {
        $('#' + this.options.id + '_content_multiSelect .u-grid-content-multiSelect').find('.u-grid-checkbox-outline').removeClass('is-checked');
    }
    $('#' + this.options.id + '_content_tbody').find('tr[role="row"]').removeClass("u-grid-content-sel-row");
    $('#' + this.options.id + '_content_tbody').find('tr[role="row"] a').removeClass("u-grid-content-sel-row");
    $('#' + this.options.id + '_content_fixed_tbody').find('tr[role="row"]').removeClass("u-grid-content-sel-row");
    $('#' + this.options.id + '_content_fixed_tbody').find('tr[role="row"] a').removeClass("u-grid-content-sel-row");
    if (this.options.multiSelect) {
        $('#' + this.options.id + '_content_multiSelect >div').removeClass("u-grid-content-sel-row");
    }
    if (this.options.showNumCol) {
        $('#' + this.options.id + '_content_numCol >div').removeClass("u-grid-content-sel-row");
    }
    this.selectRows = [];
    this.selectRowsObj = [];
    this.selectRowsIndex = [];
    $.each(this.dataSourceObj.rows, function () {
        this.checked = false;
    });
    $('#' + this.options.id + '_header_multi_input').removeClass('is-checked');
    this.hasChecked = false;
    if (typeof this.options.onAllRowUnSelected == 'function') {
        var obj = {};
        obj.gridObj = this;
        obj.rowObjs = this.dataSourceObj.rows;
        this.options.onAllRowUnSelected(obj);
    }
};

/*
 * focus一行
 */
var setRowFocus = function setRowFocus(rowIndex) {
    //已经选中退出
    if (this.dataSourceObj.rows[rowIndex].focus) return true;
    if (!this.dataSourceObj.rows[rowIndex]) return true;
    if (typeof this.options.onBeforeRowFocus == 'function') {
        var obj = {};
        obj.gridObj = this;
        obj.rowObj = this.dataSourceObj.rows[rowIndex];
        obj.rowIndex = rowIndex;
        if (!this.options.onBeforeRowFocus(obj)) {
            return false;
        }
    }
    $('#' + this.options.id + '_content_tbody tr[role="row"]').removeClass("u-grid-content-focus-row");
    $('#' + this.options.id + '_content_tbody tr[role="row"] a').removeClass("u-grid-content-focus-row");
    $('#' + this.options.id + '_content_fixed_tbody tr[role="row"]').removeClass("u-grid-content-focus-row");
    $('#' + this.options.id + '_content_fixed_tbody tr[role="row"] a').removeClass("u-grid-content-focus-row");
    if (this.options.multiSelect) {
        $('#' + this.options.id + '_content_multiSelect').find('div').removeClass("u-grid-content-focus-row");
    }
    if (this.options.showNumCol) {
        $('#' + this.options.id + '_content_numCol').find('div').removeClass("u-grid-content-focus-row");
    }
    if (this.focusRowObj) {
        this.focusRowObj.focus = false;
    }
    $('#' + this.options.id + '_content_tbody tr[role="row"]:eq(' + rowIndex + ')').addClass("u-grid-content-focus-row");
    $('#' + this.options.id + '_content_tbody tr[role="row"]:eq(' + rowIndex + ') a').addClass("u-grid-content-focus-row");
    $('#' + this.options.id + '_content_fixed_tbody tr[role="row"]:eq(' + rowIndex + ')').addClass("u-grid-content-focus-row");
    $('#' + this.options.id + '_content_fixed_tbody tr[role="row"]:eq(' + rowIndex + ') a').addClass("u-grid-content-focus-row");
    var ini = rowIndex;
    if (this.eidtRowIndex > -1 && this.eidtRowIndex < rowIndex && this.options.editType == 'form') {
        ini++;
    }
    if (this.options.multiSelect) {
        $('#' + this.options.id + '_content_multiSelect >div:eq(' + ini + ')').addClass("u-grid-content-focus-row");
    }
    if (this.options.showNumCol) {
        $('#' + this.options.id + '_content_numCol >div:eq(' + ini + ')').addClass("u-grid-content-focus-row");
    }
    this.focusRow = this.dataSourceObj.rows[rowIndex].value;
    this.focusRowObj = this.dataSourceObj.rows[rowIndex];
    this.focusRowIndex = rowIndex;
    this.dataSourceObj.rows[rowIndex].focus = true;
    if (typeof this.options.onRowFocus == 'function') {
        var obj = {};
        obj.gridObj = this;
        obj.rowObj = this.dataSourceObj.rows[rowIndex];
        obj.rowIndex = rowIndex;
        this.options.onRowFocus(obj);
    }
    /*if(!this.options.multiSelect){
        this.setRowSelect(rowIndex);
    }*/
    return true;
};
/*
 * 反focus一行
 */
var setRowUnFocus = function setRowUnFocus(rowIndex) {
    var oThis = this;
    if (!this.dataSourceObj.rows[rowIndex]) return true;
    if (typeof this.options.onBeforeRowUnFocus == 'function') {
        var obj = {};
        obj.gridObj = this;
        obj.rowObj = this.dataSourceObj.rows[rowIndex];
        obj.rowIndex = rowIndex;
        if (!this.options.onBeforeRowUnFocus(obj)) {
            return false;
        }
    }
    //已经选中退出
    if (!this.dataSourceObj.rows[rowIndex].focus) return true;
    var ini = rowIndex;
    if (this.eidtRowIndex > -1 && this.eidtRowIndex < rowIndex && this.options.editType == 'form') {
        ini++;
    }
    $('#' + this.options.id + '_content_tbody tr[role="row"]:eq(' + ini + ')').removeClass("u-grid-content-focus-row");
    $('#' + this.options.id + '_content_tbody tr[role="row"]:eq(' + ini + ') a').removeClass("u-grid-content-focus-row");
    $('#' + this.options.id + '_content_fixed_tbody tr[role="row"]:eq(' + ini + ')').removeClass("u-grid-content-focus-row");
    $('#' + this.options.id + '_content_fixed_tbody tr[role="row"]:eq(' + ini + ') a').removeClass("u-grid-content-focus-row");
    if (this.options.multiSelect) {
        $('#' + this.options.id + '_content_multiSelect >div:eq(' + ini + ')').removeClass("u-grid-content-focus-row");
    }
    if (this.options.showNumCol) {
        $('#' + this.options.id + '_content_numCol >div:eq(' + ini + ')').removeClass("u-grid-content-focus-row");
    }
    this.dataSourceObj.rows[rowIndex].focus = false;
    this.focusRow = null;
    this.focusRowObj = null;
    this.focusRowIndex = null;
    if (typeof this.options.onRowUnFocus == 'function') {
        var obj = {};
        obj.gridObj = this;
        obj.rowObj = this.dataSourceObj.rows[rowIndex];
        obj.rowIndex = rowIndex;
        this.options.onRowUnFocus(obj);
    }
    if (!this.options.multiSelect) {
        this.setRowUnselect(rowIndex);
    }
    return true;
};
/*
 * 增加删除时重置数字列
 */
var resetNumCol = function resetNumCol() {
    var numCols = $('#' + this.options.id + '_content_numCol >.u-grid-content-num');
    $.each(numCols, function (i) {
        this.innerHTML = i + 1 + "";
    });
};
var operateRowFunObj = {
    isCheckedHeaderRow: isCheckedHeaderRow,
    addOneRow: addOneRow,
    addOneRowTree: addOneRowTree,
    addOneRowTreeHasChildF: addOneRowTreeHasChildF,
    getGroupIndex: getGroupIndex,
    editClose: editClose,
    addRows: addRows,
    createContentOneRowFixed: createContentOneRowFixed,
    updateEditRowIndex: updateEditRowIndex,
    deleteOneRow: deleteOneRow,
    repairSumRow: repairSumRow,
    deleteOneRowTree: deleteOneRowTree,
    deleteRows: deleteRows,
    updateRow: updateRow,
    updateValueAt: updateValueAt,
    updateValueAtTree: updateValueAtTree,
    updateValueAtEdit: updateValueAtEdit,
    setRowSelect: setRowSelect,
    setRowUnselect: setRowUnselect,
    setAllRowSelect: setAllRowSelect,
    setAllRowUnSelect: setAllRowUnSelect,
    setRowFocus: setRowFocus,
    setRowUnFocus: setRowUnFocus,
    resetNumCol: resetNumCol,
    repairGroupSumRow: repairGroupSumRow,
    deleteOneRowGroupSum: deleteOneRowGroupSum,
    resetGroupFieldTd: resetGroupFieldTd
};

/*
 * 处理renderType
 * begin为起始行，length为行数（增加行数时使用）
 */
var renderTypeFun = function renderTypeFun(obj) {
    if (!this.isGridShow()) return;
    if (typeof obj == 'undefined') {
        var begin = null,
            length = null,
            field = '';
    } else {
        var begin = typeof obj.begin == 'undefined' ? null : obj.begin,
            length = typeof obj.length == 'undefined' ? null : obj.length,
            field = typeof obj.field == 'undefined' ? '' : obj.field;
    }
    var oThis = this,
        begin = parseInt(begin),
        length = parseInt(length),
        end = begin;
    if (length > 0) {
        end = parseInt(begin + length - 1);
    }
    if (field == '') {
        if (this.gridCompColumnFixedArr) $.each(this.gridCompColumnFixedArr, function (i) {
            oThis.renderTypeByColumn(this, i, begin, length, true);
        });
        $.each(this.gridCompColumnArr, function (i) {
            oThis.renderTypeByColumn(this, i, begin, length, false);
        });
    } else {
        var rendered = false;
        if (this.gridCompColumnFixedArr) $.each(this.gridCompColumnFixedArr, function (i) {
            if (this.options.field == field) {
                oThis.renderTypeByColumn(this, i, begin, length, true);
                rendered = true;
                return;
            }
        });
        if (!rendered) $.each(this.gridCompColumnArr, function (i) {
            if (this.options.field == field) {
                oThis.renderTypeByColumn(this, i, begin, length, false);
                return;
            }
        });
    }
};
/*
 * 处理renderType
 * gridCompColumn对象，index为第几列
 * begin为起始行，length为行数（增加行数时使用）
 */
var renderTypeByColumn = function renderTypeByColumn(gridCompColumn, i, begin, length, isFixedColumn) {
    var oThis = this,
        renderType = gridCompColumn.options.renderType,
        sumCol = gridCompColumn.options.sumCol,
        sumRenderType = gridCompColumn.options.sumRenderType,
        dataType = gridCompColumn.options.dataType,
        precision = gridCompColumn.options.precision,
        format = gridCompColumn.options.format,
        field = gridCompColumn.options.field,
        end = begin,
        idSuffix = isFixedColumn === true ? '_content_fixed_tbody' : '_content_tbody',
        idStr = isFixedColumn === true ? 'fixed_' : '',
        visibleColIndex = this.getVisibleIndexOfColumn(gridCompColumn);

    if (length > 0) {
        end = parseInt(begin + length - 1);
    }
    this.realtimeTableRows = $('#' + this.options.id + idSuffix).find('tr[role="row"]');
    // this.realtimeTableRows = document.getElementById(oThis.options.id + idSuffix).children;
    // 记录role不是row的行
    var notRowIndex = -1;
    // for (var k = 0; k < oThis.realtimeTableRows.length; k++) {
    //     if (oThis.realtimeTableRows[k].getAttribute("role") != "row") {
    //         notRowIndex = k
    //     }
    // }
    $.each(oThis.dataSourceObj.rows, function (j) {
        if (begin >= 0 && j >= begin && j <= end || isNaN(begin)) {
            //如果当前修改此列则将变量重置
            if (oThis.editColIndex == visibleColIndex && oThis.eidtRowIndex == j && oThis.options.editType == 'default') {
                oThis.editColIndex = -1;
                oThis.eidtRowIndex = -1;
            }
            var trIndex = j;
            if (notRowIndex != -1 && j >= notRowIndex) {
                trIndex++;
            }
            var tr = oThis.realtimeTableRows[trIndex],
                td = tr.children[i];
            if (oThis.iconSpan) {
                var iconSpan = oThis.iconSpan;
            }

            if (td) {
                if (td.children[0].innerHTML.indexOf('u-grid-content-tree-span') != -1) {
                    var span = td.children[0].children[1];
                } else {
                    // td.innerHTML = '<div class="u-grid-content-td-div"></div>'; //如果是树表的话第一列显示会有问题，等出现其他问题之后再修改此处
                    var span = td.children[0];
                }
                if (span) {
                    var v = $(this.value).attr(field);
                    if (typeof renderType == 'function' || dataType == 'Date' || dataType == 'Datetime' || dataType == 'Int' || dataType == 'Float') {
                        span.innerHTML = '';
                        if (typeof renderType == 'function') {
                            v = oThis.getString(v, '');
                            var obj = {};
                            obj.value = v;
                            obj.element = span;
                            obj.gridObj = oThis;
                            obj.row = this;
                            obj.gridCompColumn = gridCompColumn;
                            obj.rowIndex = j;
                            renderType.call(oThis, obj);
                        } else if (dataType == 'Date' || dataType == 'Datetime') {
                            if (v == null || v == undefined || v == 'null' || v == 'undefined' || v == "") {
                                v = "";
                            }
                            if (dataType == 'Date') {
                                v = u.dateRender(v);
                            } else {
                                v = u.dateTimeRender(v);
                            }
                            span.innerHTML = v;
                            span.title = v;
                        } else if (dataType == 'Int') {
                            v = parseInt(v);
                            if (!isNaN(v)) {
                                span.innerHTML = v;
                                span.title = v;
                            } else {
                                span.innerHTML = "";
                                span.title = "";
                            }
                        } else if (dataType == 'Float') {
                            if (precision) {
                                var o = {};
                                o.value = v;
                                o.precision = precision;
                                v = oThis.DicimalFormater(o);
                            } else {
                                v = parseFloat(v);
                            }
                            if (!isNaN(v)) {
                                span.innerHTML = v;
                                span.title = v;
                            } else {
                                span.innerHTML = "";
                                span.title = "";
                            }
                        } else {
                            //此处逻辑放到渲染处，减少render执行次数。
                            v = oThis.getString(v, '');
                            var v1 = v.replace(/\</g, '\<');
                            v1 = v1.replace(/\>/g, '\>');
                            span.title = v;
                            v = v.replace(/\</g, '&lt;');
                            v = v.replace(/\>/g, '&gt;');
                            span.innerHTML = v;
                        }
                    } else {
                        v = oThis.getString(v, '');
                        var v1 = v.replace(/\</g, '\<');
                        v1 = v1.replace(/\>/g, '\>');
                        span.title = v;
                        v = v.replace(/\</g, '&lt;');
                        v = v.replace(/\>/g, '&gt;');
                        if (i == 0 && iconSpan) {
                            v = iconSpan += v;
                        }
                        span.innerHTML = v;
                    }

                    /* 增加处理判断是否需要显示... */
                    var obj = {
                        span: span,
                        column: gridCompColumn
                    };
                    var colum_maxlength = gridCompColumn.options.maxLength,
                        overFlag = false;
                    if (colum_maxlength && colum_maxlength > 0) {
                        //控制表格列显示...
                        overFlag = span.innerHTML.length > colum_maxlength ? true : false;
                    } else {
                        overFlag = oThis.getRenderOverFlag(obj);
                    }
                    if (overFlag) {
                        $(span).addClass('u-grid-content-td-div-over');
                    }
                }
            }
        }
        oThis.renderTypeGroupSumRow(gridCompColumn, i, isFixedColumn, this);
    });
    this.renderTypeSumRow(gridCompColumn, i, begin, length, isFixedColumn);
};

var getRenderOverFlag = function getRenderOverFlag(obj) {
    // 影响性能，不再支持此方式，按照maxLength来处理
    if (this.options.heightAuto && this.options.maxHeight > 40) {
        var span = obj.span;
        var nowHeight = span.offsetHeight;
        var nowWidth = span.offsetWidth;
        var newSpan = $(span).clone()[0];
        var overFlag = false;
        obj.span.parentNode.appendChild(newSpan);
        var oldDisplay = span.style.display;
        span.style.display = 'none';
        newSpan.style.height = '';
        newSpan.style.maxHeight = '999999px';
        var newHeight = newSpan.offsetHeight;
        if (newHeight > nowHeight) {
            overFlag = true;
        }
        obj.span.parentNode.removeChild(newSpan);
        span.style.display = oldDisplay;
        return overFlag;
    }
};

var renderTypeSumRow = function renderTypeSumRow(gridCompColumn, i, begin, length, isFixedColumn) {};
var renderTypeGroupSumRow = function renderTypeGroupSumRow() {};
var renderTypeFunObj = {
    renderTypeFun: renderTypeFun,
    renderTypeByColumn: renderTypeByColumn,
    renderTypeSumRow: renderTypeSumRow,
    renderTypeGroupSumRow: renderTypeGroupSumRow,
    getRenderOverFlag: getRenderOverFlag
};

/*
 * 设置某列是否显示(传入column)
 */
var setColumnVisibleByColumn = function setColumnVisibleByColumn(column, visible) {
    var index = this.getIndexOfColumn(column);
    this.setColumnVisibleByIndex(index, visible);
};
/*
 * 设置某列是否显示(传入index为gridCompColumnArr中的数据)
 */
var setColumnVisibleByIndex = function setColumnVisibleByIndex(index, visible) {
    if (index >= 0) {
        var column = this.gridCompColumnArr[index],
            visibleIndex = this.getVisibleIndexOfColumn(column),
            canVisible = column.options.canVisible,
            l = $('input:checked', $('#' + this.options.id + '_column_menu_columns_ul')).length;
        if (!canVisible && visible == false) {
            return;
        }
        // 显示处理
        if (column.options.visible == false && visible) {
            var htmlStr = '<col';
            if (column.options.width) {
                htmlStr += ' style="width:' + this.formatWidth(column.options.width) + '"';
            }
            htmlStr += '>';
            // 当前列之后的显示列的index
            var nextVisibleIndex = this.getNextVisibleInidexOfColumn(column);
            $('#' + this.options.id + '_header_table th:eq(' + index + ')').css('display', "");
            $('#' + this.options.id + '_content_table th:eq(' + index + ')').css('display', "");
            $('td:eq(' + index + ')', $('#' + this.options.id + '_content tbody tr')).css('display', "");
            if (nextVisibleIndex < 0) {
                this.lastVisibleColumn = column;
                // 添加在最后面
                try {
                    $('#' + this.options.id + '_header_table col:last')[0].insertAdjacentHTML('afterEnd', htmlStr);
                    $('#' + this.options.id + '_content_table col:last')[0].insertAdjacentHTML('afterEnd', htmlStr);
                } catch (e) {
                    $('#' + this.options.id + '_header_table col:last').after(htmlStr);
                    $('#' + this.options.id + '_content_table col:last').after(htmlStr);
                }
            } else {
                // 添加在下一个显示列之前
                try {
                    $('#' + this.options.id + '_header_table col:eq(' + (nextVisibleIndex - 1) + ')')[0].insertAdjacentHTML('beforeBegin', htmlStr);
                    $('#' + this.options.id + '_content_table col:eq(' + (nextVisibleIndex - 1) + ')')[0].insertAdjacentHTML('beforeBegin', htmlStr);
                } catch (e) {
                    $('#' + this.options.id + '_header_table col:eq(' + (nextVisibleIndex - 1) + ')').before(htmlStr);
                    $('#' + this.options.id + '_content_table col:eq(' + (nextVisibleIndex - 1) + ')').before(htmlStr);
                }
            }
            var newContentW = this.contentWidth + parseInt(column.options.width);
            if (this.showType == 'grid') {
                $('#' + this.options.id + '_column_menu_columns_ul li input:eq(' + index + ')')[0].checked = true;
            }
        }
        // 隐藏处理
        if (column.options.visible == true && !visible) {
            $('#' + this.options.id + '_header_table th:eq(' + index + ')').css('display', "none");
            $('#' + this.options.id + '_header_table col:eq(' + visibleIndex + ')').remove();
            $('#' + this.options.id + '_content_table th:eq(' + index + ')').css('display', "none");
            $('#' + this.options.id + '_content_table col:eq(' + visibleIndex + ')').remove();
            $('td:eq(' + index + ')', $('#' + this.options.id + '_content_table tbody tr')).css('display', "none");
            // 隐藏之后需要判断总体宽度是否小于内容区最小宽度，如果小于需要将最后一列进行扩展
            var newContentW = this.contentWidth - parseInt(column.options.width);
            if (this.showType == 'grid') {
                $('#' + this.options.id + '_column_menu_columns_ul li input:eq(' + index + ')')[0].checked = false;
            }
            if (this.lastVisibleColumn == column) {
                var allVisibleColumns = this.getAllVisibleColumns();
                this.lastVisibleColumn = allVisibleColumns[allVisibleColumns.length - 1];
            }
        }
        column.options.visible = visible;
        var w = this.contentWidthChange(newContentW);
        this.lastVisibleColumn.options.width = this.lastVisibleColumnWidth;
        this.contentWidth = w;
        this.resetThVariable();
        this.noScrollWidthReset();
        this.contentMinWidth = parseInt(this.wholeWidth) - parseInt(this.leftW) - parseInt(this.fixedWidth);
        if (this.contentMinWidth < 0) this.contentMinWidth = 0;
        if (this.contentRealWidth < this.contentMinWidth) {
            this.contentWidth = this.contentMinWidth;
            var oldWidth = this.lastVisibleColumn.options.width;
            this.lastVisibleColumnWidth = oldWidth + (this.contentMinWidth - this.contentRealWidth);
            // modfied by tianxq1 最后一列自动扩展
            this.lastVisibleColumn.options.width = this.lastVisibleColumnWidth;
            // this.setColumnWidth(this.lastVisibleColumn, this.lastVisibleColumnWidth);
        } else {
            this.contentWidth = this.contentRealWidth;
        }
        this.resetColumnWidthByRealWidth();
        this.saveGridCompColumnArrToLocal();

        var columnAllCheck = $('input', $('#' + this.options.id + '_column_menu_ul .header'));
        if (columnAllCheck.length > 0) {
            var lll = $('input:not(:checked)', $('#' + this.options.id + '_column_menu_columns_ul')).length;
            if (lll > 0) {
                columnAllCheck[0].checked = false;
            } else {
                columnAllCheck[0].checked = true;
            }
        }
    }
};

var resetColumnWidthByRealWidth = function resetColumnWidthByRealWidth() {
    var oThis = this;
    $.each(this.gridCompColumnArr, function () {
        if (this.options.realWidth != this.options.width) {
            oThis.setColumnWidth(this, this.options.realWidth);
        }
    });
    this.resetLastVisibleColumnWidth();
};

/*
 * 根据field设置宽度
 */
var setCoulmnWidthByField = function setCoulmnWidthByField(field, newWidth) {
    var column = this.getColumnByField(field);
    this.setColumnWidth(column, newWidth);
};
/*
 * 根据column对象设置宽度
 */
var setColumnWidth = function setColumnWidth(column, newWidth) {
    // if (column != this.lastVisibleColumn) {
    if (newWidth > this.minColumnWidth || newWidth == this.minColumnWidth) {
        var nowVisibleThIndex = this.getVisibleIndexOfColumn(column),
            oldWidth = column.options.width,
            changeWidth = newWidth - oldWidth,
            cWidth = this.contentWidth + changeWidth;
        this.contentWidth = this.contentWidthChange(cWidth);
        $('#' + this.options.id + '_header_table col:eq(' + nowVisibleThIndex + ')').css('width', newWidth + "px");
        $('#' + this.options.id + '_content_table col:eq(' + nowVisibleThIndex + ')').css('width', newWidth + "px");
        column.options.width = newWidth;
        column.options.realWidth = newWidth;
        this.resetThVariable();
        this.saveGridCompColumnArrToLocal();
    }
    this.resetLastVisibleColumnWidth();
    this.columnsVisibleFun();
    // }
};
/*
 * 设置数据源
 */
var setDataSource = function setDataSource(dataSource) {
    if (!(this.$ele.data('gridComp') == this)) return;
    this.initDataSourceVariable();
    this.options.dataSource = dataSource;
    this.initDataSource();
    if (this.showType == 'grid') {
        this.widthChangeGridFun();
        if (this.dataSourceObj.rows.length > 0) {
            $('#' + this.options.id + '_grid .u-grid-noScroll-left').css('display', "block");
        } else {
            $('#' + this.options.id + '_grid .u-grid-noScroll-left').css('display', "none");
        }
    }
};
/*
 * 设置数据源 格式为：
 * {
    fields:['column1','column2','column3','column4','column5','column6'],
    values:[["cl1","1","cl3","cl4","cl5","cl6"]
            ,["cl12","2","cl32","cl42","cl52","cl62"]
            ,["cl13","3","cl33","cl43","cl53","cl63"]
            ,["cl14","4","cl34","cl44","cl54","cl64"]
            ,["cl15","5","cl35","cl45","cl55","cl65"]
            ,["cl16","6","cl36","cl46","cl56","cl66"]
        ]

    }
 */
var setDataSourceFun1 = function setDataSourceFun1(dataSource) {
    var dataSourceObj = {};
    if (dataSource.values) {
        var valuesArr = new Array();
        $.each(dataSource.values, function () {
            if (dataSource.fields) {
                var valueObj = {},
                    value = this;
                $.each(dataSource.fields, function (j) {
                    $(valueObj).attr(this, value[j]);
                });
                valuesArr.push(valueObj);
            }
        });
    }
    $(dataSourceObj).attr('values', valuesArr);
    this.setDataSource(dataSourceObj);
};
var setFunObj = {
    setColumnVisibleByColumn: setColumnVisibleByColumn,
    setColumnVisibleByIndex: setColumnVisibleByIndex,
    setCoulmnWidthByField: setCoulmnWidthByField,
    setColumnWidth: setColumnWidth,
    setDataSource: setDataSource,
    setDataSourceFun1: setDataSourceFun1,
    resetColumnWidthByRealWidth: resetColumnWidthByRealWidth
};

/*
 * 整体宽度改变处理
 */
var widthChangeFun = function widthChangeFun() {
    var oThis = this;
    if ($('#' + this.options.id)[0]) {
        // 获取整体区域宽度
        //var w = $('#' + this.options.id).width()  //[0].offsetWidth;
        // jquery获取方式有问题，修改为offsetWidth
        var w = $('#' + this.options.id)[0].offsetWidth;
        // w!=0的判断是为了处理页签中的grid在切换的过程中会重绘
        if (this.wholeWidth != w && this.$ele.data('gridComp') == this && w != 0) {
            this.wholeWidth = w;

            // 树展开/合上的时候会导致页面出现滚动条导致宽度改变，没有&&之后会重新刷新页面导致无法收起
            if (w > this.options.formMaxWidth && (this.showType == 'form' || this.showType == '' || !$('#' + this.options.id + '_content_div tbody')[0]) || this.options.overWidthHiddenColumn || this.options.noScroll) {
                //lyk--需要完善隐藏之后再显示同事添加数据操作
                oThis.widthChangeGridFun();
            } else if (w > 0 && w < this.options.formMaxWidth && (this.showType == 'grid' || this.showType == '')) {}
            if (w > this.options.formMaxWidth) {
                this.contentMinWidth = parseInt(this.wholeWidth) - parseInt(this.leftW) - parseInt(this.fixedWidth);
                if (this.contentMinWidth < 0) this.contentMinWidth = 0;
                setTimeout(function () {
                    $('#' + oThis.options.id + '_header_wrap').css('max-width', oThis.wholeWidth + 'px');
                    $('#' + oThis.options.id + '_content_div').css('width', oThis.contentMinWidth + 'px');
                    $('#' + oThis.options.id + '_content_table').css('min-width', oThis.contentMinWidth + 'px');
                    $('#' + oThis.options.id + '_content_table').css('width', oThis.contentMinWidth + 'px');
                    $('#' + oThis.options.id + '_header_table').css('min-width', oThis.contentMinWidth + 'px');
                    $('#' + oThis.options.id + '_header_table').css('width', oThis.contentMinWidth + 'px');
                    $('#' + oThis.options.id + '_noRowsShow').css('width', oThis.contentMinWidth + 'px');
                    //滚动条可能发生变化导致grid内部列的宽度发生变化
                    oThis.columnsVisibleFun();
                    if (oThis.contentRealWidth < oThis.contentMinWidth) {
                        oThis.contentWidth = oThis.contentMinWidth;
                    } else {
                        oThis.contentWidth = oThis.contentRealWidth;
                    }
                    $('#' + oThis.options.id + '_noRows').css('width', oThis.contentWidth + 'px');
                    if (typeof oThis.options.afterCreate == 'function') {
                        oThis.options.afterCreate.call(oThis);
                    }
                }, 300);
            }
            $('#' + oThis.options.id + '_header_table').css('width', oThis.contentMinWidth + 'px');
            $('#' + oThis.options.id + '_edit_form').css('width', oThis.contentMinWidth + 'px');

            this.preWholeWidth = w;
            this.resetLeftHeight();
        }
    }
};
/*
 * 整体宽度改变处理(grid形式)
 */
var widthChangeGridFun = function widthChangeGridFun() {
    var oThis = this,
        halfWholeWidth = parseInt(this.wholeWidth / 2);
    this.noScrollWidthReset();
    this.widthChangeGridFunFixed(halfWholeWidth);
    /* 如果宽度不足处理自动隐藏*/
    this.widthChangeGridFunOverWidthHidden();
    // 内容区域宽度自动扩展
    this.contentMinWidth = parseInt(this.wholeWidth) - parseInt(this.leftW) - parseInt(this.fixedWidth);
    if (this.contentMinWidth < 0) this.contentMinWidth = 0;
    if (this.contentRealWidth < this.contentMinWidth) {
        this.contentWidth = this.contentMinWidth;
        var oldWidth = this.lastVisibleColumn.options.width;
        this.lastVisibleColumnWidth = oldWidth + (this.contentMinWidth - this.contentRealWidth);
        // modfied by tianxq1 最后一列自动扩展
        this.lastVisibleColumn.options.width = this.lastVisibleColumnWidth;
    } else {
        this.contentWidth = this.contentRealWidth;
    }
    this.createGridFlag = false;
    this.createGridDivs();
    $('#' + this.options.id + '_form').css('display', 'none');
    $('#' + this.options.id + '_grid').css('display', 'block');
};

/**
 * 不显示滚动条的情况下需要重置每列的宽度
 */
var noScrollWidthReset = function noScrollWidthReset() {
    if (this.options.noScroll) {
        //云采不支持拖动，后续再完善拖动之后的情况
        /*if (this.hasNoScrollRest) {
            var nowW = 0;
            for (var i = 0; i < this.gridCompColumnArr.length; i++) {
                var column = this.gridCompColumnArr[i];
                var nowWidth = column.options.width;
                var pre = this.preWholeWidth - this.leftW;
                var whole = this.wholeWidth - this.leftW;
                var newWidth = parseInt(nowWidth / pre * whole);
                if(column.options.visible){
                    nowW += newWidth;
                }
                this.setColumnWidth(column, newWidth);
            }
         } else {*/
        //先按100%来处理
        var nowW = 0;
        for (var i = 0; i < this.gridCompColumnArr.length; i++) {
            var column = this.gridCompColumnArr[i];
            // var nowWidth = column.options.width + '';
            var nowWidth = column.options.optionsWidth + '';
            var whole = this.wholeWidth - this.leftW;

            if (nowWidth.indexOf('%') > 0) {
                var newWidth = parseInt(nowWidth.replace('%', '') * whole / 100);
            } else {
                var newWidth = parseInt(nowWidth);
            }
            if (newWidth < this.minColumnWidth) {
                newWidth = this.minColumnWidth;
            }
            if (column.options.visible) {
                nowW += parseInt(newWidth);
            }
            this.setColumnWidth(column, newWidth);
        }
        /*}*/
        this.hasNoScrollRest = true;
    }
    if (nowW > whole) {
        var lastVisibleColumn = this.lastVisibleColumn;
        var lastWidth = lastVisibleColumn.options.width;
        var newLastWidth = lastWidth - (nowW - whole);
        this.setColumnWidth(lastVisibleColumn, newLastWidth);
    }
};
var widthChangeGridFunFixed = function widthChangeGridFunFixed(halfWholeWidth) {};
var widthChangeGridFunOverWidthHidden = function widthChangeGridFunOverWidthHidden() {};
/*
 * 整体高度改变处理
 */
var heightChangeFun = function heightChangeFun() {
    if (this.countContentHeight) {
        var oldH = this.wholeHeight,
            h = $('#' + this.options.id)[0].offsetHeight;
        this.wholeHeight = h;
        if (oldH != h && h > 0) {
            var contentH = h - 1 - this.exceptContentHeight > 0 ? h - 1 - this.exceptContentHeight : 0;
            $('#' + this.options.id + '_content').css('height', contentH + 'px');
            $('#' + this.options.id + '_content_div').css('height', contentH + 'px');
        }
    }
};
/*
 * 内容区宽度改变
 */
var contentWidthChange = function contentWidthChange(newContentWidth) {
    if (newContentWidth < this.contentMinWidth) {
        var oldW = parseInt(this.lastVisibleColumn.options.width);
        this.lastVisibleColumnWidth = oldW + (this.contentMinWidth - newContentWidth);
        $('#' + this.options.id + '_header_table col:last').css('width', this.lastVisibleColumnWidth + "px");
        $('#' + this.options.id + '_content_table col:last').css('width', this.lastVisibleColumnWidth + "px");
        newContentWidth = this.contentMinWidth;
    }

    if (newContentWidth > this.contentMinWidth) {
        // 首先处理扩展列的宽度为原有宽度，然后再扩展最后一列
        // 解决dragdemo拖动的过程中会导致宽度错位，不再还原宽度
        // var l = this.overWidthVisibleColumnArr.length;
        // if (l > 0) {
        //     for (var i = 0; i < l; i++) {
        //         var overWidthColumn = this.overWidthVisibleColumnArr[i];
        //         var nowVisibleIndex = this.getVisibleIndexOfColumn(overWidthColumn);
        //         var w = parseInt(overWidthColumn.options.width);
        //         var realW = overWidthColumn.options.realWidth;
        //         $('#' + this.options.id + '_header_table col:eq(' + nowVisibleIndex + ')').css('width', realW + "px");
        //         $('#' + this.options.id + '_content_table col:eq(' + nowVisibleIndex + ')').css('width', realW + "px");
        //         newContentWidth = newContentWidth - (w - realW);
        //         overWidthColumn.options.width = overWidthColumn.options.realWidth;
        //     }
        //     if (newContentWidth < this.contentMinWidth) {
        //         var oldW = parseInt(this.lastVisibleColumn.options.width);
        //         this.lastVisibleColumnWidth = oldW + (this.contentMinWidth - newContentWidth);
        //         $('#' + this.options.id + '_header_table col:last').css('width', this.lastVisibleColumnWidth + "px");
        //         $('#' + this.options.id + '_content_table col:last').css('width', this.lastVisibleColumnWidth + "px");
        //         this.lastVisibleColumn.options.width = this.lastVisibleColumnWidth;
        //         newContentWidth = this.contentMinWidth;
        //     }
        // }
        if (newContentWidth > this.contentMinWidth) {
            // $('#' + this.options.id + '_content_left_bottom').css('display', 'block');
            // $('#' + this.options.id + '_content_left_sum_bottom').css('bottom', 16);
        } else {
                // $('#' + this.options.id + '_content_left_bottom').css('display', 'none');
                // $('#' + this.options.id + '_content_left_sum_bottom').css('bottom', 0);
            }
    } else {
            // $('#' + this.options.id + '_content_left_bottom').css('display', 'none');
            // $('#' + this.options.id + '_content_left_sum_bottom').css('bottom', 0);
        }
    if (!this.options.noScroll) {
        $('#' + this.options.id + '_content_table').css('width', newContentWidth + "px");
        $('#' + this.options.id + '_header_table').css('width', newContentWidth + "px");
        $('#' + this.options.id + '_noRows').css('width', newContentWidth + "px");
    }

    return newContentWidth;
};
var wdChangeFunObj = {
    widthChangeFun: widthChangeFun,
    widthChangeGridFun: widthChangeGridFun,
    widthChangeGridFunFixed: widthChangeGridFunFixed,
    widthChangeGridFunOverWidthHidden: widthChangeGridFunOverWidthHidden,
    heightChangeFun: heightChangeFun,
    contentWidthChange: contentWidthChange,
    noScrollWidthReset: noScrollWidthReset
};

/*
 * 双击/单击处理
 */
var isDblEvent = function isDblEvent(eventname, dbFun, dbArg, Fun, Arg) {
    var nowTarget = dbArg.target;
    if (this.currentEventName != null && this.currentEventName == eventname && this.currentTarget != null && this.currentTarget == nowTarget) {
        dbFun.call(this, dbArg);
        this.currentEventName = null;
        this.currentTarget = null;
        if (this.cleanCurrEventName) clearTimeout(this.cleanCurrEventName);
    } else {
        var oThis = this;
        if (this.cleanCurrEventName) clearTimeout(this.cleanCurrEventName);
        this.currentEventName = eventname;
        this.currentTarget = nowTarget;
        this.cleanCurrEventName = setTimeout(function () {
            oThis.currentEventName = null;
            this.currentTarget = null;
            Fun.call(oThis, Arg);
        }, 250);
    }
};
/*
 * 双击处理
 */
var dblClickFun = function dblClickFun(e) {
    if (typeof this.options.onDblClickFun == 'function') {
        var $tr = $(e.target).closest('tr');
        if ($tr[0].id == this.options.id + '_edit_tr') {
            return;
        }
        var index = 0;
        if ($tr.length > 0) {
            index = this.getTrIndex($tr);
        }
        var obj = {};
        obj.gridObj = this;
        obj.rowObj = this.dataSourceObj.rows[index];
        obj.rowIndex = index;
        this.options.onDblClickFun(obj);
    }
};
/*
 * 单击处理
 */
var clickFun = function clickFun(e) {
    var oThis = this;

    // 处理focus事件
    var $tr = $(e.target).closest('tr');
    if ($tr.length > 0 && $tr[0].id == this.options.id + '_edit_tr') {
        return;
    }
    var index = this.getTrIndex($tr);
    if (typeof this.options.onBeforeClickFun == 'function') {
        var obj = {};
        obj.gridObj = this;
        obj.rowObj = this.dataSourceObj.rows[index];
        obj.rowIndex = index;
        obj.e = e;
        if (!this.options.onBeforeClickFun(obj)) {
            return;
        }
    }
    // 处理树表展开/合上
    this.clickFunTree(e);
    if ($tr.length > 0) {

        var row = oThis.dataSourceObj.rows[index];
        if (row) {
            if (oThis.options.rowClickBan) {
                return;
            }
            this.clickFunEdit(e, index);
            var rowChildIndex = oThis.getChildRowIndex(row);
            if (oThis.options.contentFocus || !oThis.options.multiSelect) {
                if (oThis.dataSourceObj.rows[index].focus && oThis.options.cancelFocus) {
                    oThis.setRowUnFocus(index);
                } else {
                    if (!oThis.dataSourceObj.rows[index].focus) {
                        oThis.setRowFocus(index);
                    }
                }
            }
            if (oThis.options.contentSelect || !oThis.options.multiSelect) {
                if (oThis.dataSourceObj.rows[index].checked && oThis.options.cancelSelect) {
                    oThis.setRowUnselect(index);
                } else {
                    if (!oThis.dataSourceObj.rows[index].checked) {
                        oThis.setRowSelect(index);
                    }
                }
            }
        }
    }
};
var clickFunTree = function clickFunTree(e) {};
var clickFunEdit = function clickFunEdit(e) {};

var clickFunObj = {
    isDblEvent: isDblEvent,
    dblClickFun: dblClickFun,
    clickFun: clickFun,
    clickFunTree: clickFunTree,
    clickFunEdit: clickFunEdit
};

/*
 * 更新最后数据行标识
 */
var updateLastRowFlag = function updateLastRowFlag() {
    // 共享服务加的，没有对应的css暂时去掉
    return;
    var rows = $('#' + this.options.id + '_content_tbody').find('tr[role=row]');
    for (var i = 0, count = rows.length; i < count; i++) {
        if (i == count - 1) $(rows[i]).addClass('last-row');else $(rows[i]).removeClass('last-row');
    }
};
var updateNumColLastRowFlag = function updateNumColLastRowFlag() {
    // 共享服务加的，没有对应的css暂时去掉
    return;
    var numCols = $('#' + this.options.id + '_content_numCol').find('.u-grid-content-num');
    for (var i = 0, count = numCols.length; i < count; i++) {
        if (i == count - 1) $(numCols[i]).addClass('last-row');else $(numCols[i]).removeClass('last-row');
    }
};

/*
 * column是否显示处理，只在初始化gridCompColumn对象时调用，其他时候不再调用
 * 计算固定区域及内容区域的真实宽度
 * 计算第一列
 * 计算内容区域最后一列显示列
 */
var columnsVisibleFun = function columnsVisibleFun() {
    var oThis = this,
        w = 0;
    this.firstColumn = true;
    this.overWidthVisibleColumnArr = new Array();
    $.each(this.gridCompColumnArr, function () {
        if (this.options.visible) {
            w += parseInt(this.options.width);
            if (this.options.width > this.options.realWidth) {
                oThis.overWidthVisibleColumnArr.push(this);
            }
            this.firstColumn = oThis.firstColumn;
            oThis.firstColumn = false;
            oThis.lastVisibleColumn = this;
            oThis.lastVisibleColumnWidth = this.options.width;
        }
    });
    this.contentRealWidth = w;
};

var resetLastVisibleColumnWidth = function resetLastVisibleColumnWidth() {
    var allVisibleColumns = this.getAllVisibleColumns();
    var l = allVisibleColumns.length;
    var w = 0;
    var lastW = 0;
    for (var i = 0; i < allVisibleColumns.length; i++) {
        var column = allVisibleColumns[i];
        if (i == l - 1 - this.options.expandColumnIndex) {
            lastW = column.options.realWidth;
            this.lastVisibleColumn = column;
        } else {
            w += column.options.width;
        }
    }
    if (w < this.contentMinWidth) {
        var lw = this.contentMinWidth - w;
        if (lw > lastW) lastW = lw;
    }
    this.lastVisibleColumnWidth = lastW;
    this.lastVisibleColumn.options.width = lastW;
    if (this.options.expandColumnIndex == 0) {
        $('#' + this.options.id + '_header_table col:last').css('width', this.lastVisibleColumnWidth + "px");
        $('#' + this.options.id + '_content_table col:last').css('width', this.lastVisibleColumnWidth + "px");
    } else {
        var eqIndex = l - this.options.expandColumnIndex - 1;
        $('#' + this.options.id + '_header_table col:eq(' + eqIndex + ')').css('width', this.lastVisibleColumnWidth + "px");
        $('#' + this.options.id + '_content_table col:eq(' + eqIndex + ')').css('width', this.lastVisibleColumnWidth + "px");
    }
};
/*
 * 创建完成之后处理变量
 */
var resetThVariable = function resetThVariable() {
    if (this.showType != 'grid') return;
    var oThis = this;
    this.contentWidth = 0;

    // 记录每列宽度及当前宽度之和
    $('#' + this.options.id + '_header_table th', this.$ele).each(function (i) {
        //会出现th多于列的情况，发现问题之后再看下为什么
        var gridCompColumn = oThis.gridCompColumnArr[i];
        var w = 0;
        if (gridCompColumn.options.visible) {
            w = parseInt(gridCompColumn.options.width);
        }
        this.attrLeftTotalWidth = oThis.contentWidth;
        oThis.contentWidth += w;
        oThis.resetThVariableDrag(this, gridCompColumn, w);
        this.gridCompColumn = gridCompColumn;
        this.attrWidth = w;
        this.attrRightTotalWidth = oThis.contentWidth;
    });
    oThis.resetThVariableHeaderLevel();
};
var resetThVariableDrag = function resetThVariableDrag(nowTh, gridCompColumn) {};
var resetThVariableHeaderLevel = function resetThVariableHeaderLevel() {};

/*
 * 修改第一列的css
 */
var headerFirstClassFun = function headerFirstClassFun() {
    $('#' + this.options.id + '_grid .u-grid-header-th-first').removeClass('u-grid-header-th-first');
    $('#' + this.options.id + '_grid').find('th').eq(0).addClass('u-grid-header-th-first');
};

/*
 * 根据filed设置renderType
 */
var setRenderType = function setRenderType(field, renderType) {
    var gridCompColumn = this.getColumnByField(field);
    gridCompColumn.options.renderType = renderType;
    var index = this.getIndexOfColumn(gridCompColumn);
    this.renderTypeByColumn(gridCompColumn, index);
};
/*
 * 设置是否显示header
 */
var setShowHeader = function setShowHeader(showHeader) {
    this.options.showHeader = showHeader;
    if (showHeader) {
        $('#' + this.options.id + '_header').css('display', "block");
    } else {
        $('#' + this.options.id + '_header').css('display', "none");
    }
};
/*
 * 设置数据列的精度
 */
var setColumnPrecision = function setColumnPrecision(field, precision) {
    var gridColumn = this.getColumnByField(field);
    gridColumn.options.precision = precision;
    this.renderTypeFun();
    if (this.options.showSumRow) {
        this.repairSumRow();
    }
};
var setMultiSelect = function setMultiSelect(multiSelect) {
    var oldMultiSelect = this.options.multiSelect;
    if (oldMultiSelect != multiSelect) {
        this.options.multiSelect = multiSelect;
        this.initGrid();
    }
};
var setShowNumCol = function setShowNumCol(showNumCol) {
    var oldShowNumCol = this.options.showNumCol;
    if (oldShowNumCol != showNumCol) {
        this.options.showNumCol = showNumCol;
        this.initGrid();
    }
};
var isGridShow = function isGridShow() {
    if (this.showType == 'grid') return true;
    return false;
};
var getBoolean = function getBoolean(value) {
    if (value === 'true' || value === true) return true;
    return false;
};
var otherFunObj = {
    updateLastRowFlag: updateLastRowFlag,
    updateNumColLastRowFlag: updateNumColLastRowFlag,
    columnsVisibleFun: columnsVisibleFun,
    resetThVariable: resetThVariable,
    resetThVariableDrag: resetThVariableDrag,
    resetThVariableHeaderLevel: resetThVariableHeaderLevel,
    headerFirstClassFun: headerFirstClassFun,
    setRenderType: setRenderType,
    setShowHeader: setShowHeader,
    setColumnPrecision: setColumnPrecision,
    setMultiSelect: setMultiSelect,
    setShowNumCol: setShowNumCol,
    isGridShow: isGridShow,
    resetLastVisibleColumnWidth: resetLastVisibleColumnWidth,
    getBoolean: getBoolean
};

/*
 * 对宽度和高度进行处理
 */
var formatWidth = function formatWidth(w) {
    // 获得宽度
    if (w) {
        return (w + "").indexOf("%") > 0 ? w : parseInt(w) + "px";
    } else {
        return '';
    }
};
/*
 * 两个元素交换位置，要求传入参数e1在e2之前
 */
var swapEle = function swapEle(e1, e2) {
    var n = e1.next(),
        p = e2.prev();
    e2.insertBefore(n);
    e1.insertAfter(p);
};
var getString = function getString(value, defaultValue) {
    if (value === null || value === undefined || value === 'null' || value === 'undefined' || value === "") {
        value = defaultValue;
    }
    if (gridBrowser.isIE8) {
        return [value].join("");
    } else {
        return value + "";
    }
};
var getInt = function getInt(value, defaultValue) {
    if (value === null || value === undefined || value === 'null' || value === 'undefined' || value === "" || isNaN(value)) {
        value = defaultValue;
    }
    return value;
};
var getFloat = function getFloat(value, defaultValue) {
    if (value === null || value === undefined || value === 'null' || value === 'undefined' || value === "" || isNaN(value)) {
        value = defaultValue;
    }
    return value;
};
/*
 * 克隆对象
 */
var cloneObj = function cloneObj(obj) {
    var o;
    if ((typeof obj === "undefined" ? "undefined" : _typeof(obj)) == "object") {
        if (obj === null) {
            o = null;
        } else {
            if (obj instanceof Array) {
                o = [];
                for (var i = 0, len = obj.length; i < len; i++) {
                    o.push(this.cloneObj(obj[i]));
                }
            } else {
                o = {};
                for (var k in obj) {
                    o[k] = this.cloneObj(obj[k]);
                }
            }
        }
    } else {
        o = obj;
    }
    return o;
};
/*
 * 处理精度
 */
var DicimalFormater = function DicimalFormater(obj) {
    var value = obj.value + '',
        precision = obj.precision;
    for (var i = 0; i < value.length; i++) {
        if ("-0123456789.".indexOf(value.charAt(i)) == -1) return "";
    }
    return checkDicimalInvalid(value, precision);
};
var checkDicimalInvalid = function checkDicimalInvalid(value, precision) {
    if (value == null || isNaN(value)) return "";
    // 浮点数总位数不能超过10位
    var digit = parseFloat(value);
    var result = (digit * Math.pow(10, precision) / Math.pow(10, precision)).toFixed(precision);
    if (result == "NaN") return "";
    return result;
};
var accAdd = function accAdd(v1, v2) {
    var r1, r2, m;
    try {
        r1 = v1.toString().split('.')[1].length;
    } catch (e) {
        r1 = 0;
    }
    try {
        r2 = v2.toString().split('.')[1].length;
    } catch (e) {
        r2 = 0;
    }
    m = Math.pow(10, Math.max(r1, r2));
    return (v1 * m + v2 * m) / m;
};
var getTrIndex = function getTrIndex($tr) {
    return $('tr[id!="' + this.options.id + '_edit_tr"][role="row"]', $tr.parent()).index($tr);
};

var getDataTableRowIdByRow = function getDataTableRowIdByRow(row) {
    return row.value['$_#_@_id'];
};

/**
 * 按字节数截取字符串 例:"e我是d".nLen(4)将返回"e我"
 */
String.prototype.substrCH = function (nLen) {
    var i = 0;
    var j = 0;
    while (i < nLen && j < this.length) {
        // 循环检查制定的结束字符串位置是否存在中文字符
        var charCode = this.charCodeAt(j);
        if (charCode > 256 && i == nLen - 1) {
            break;
        }
        //      else if(charCode >= 0x800 && charCode <= 0x10000){
        //          i = i + 3;
        //      }
        else if (charCode > 256) {
                // 返回指定下标字符编码，大于265表示是中文字符
                i = i + 2;
            } //是中文字符，那计数增加2
            else {
                    i = i + 1;
                } //是英文字符，那计数增加1
        j = j + 1;
    }
    return this.substr(0, j);
};

var SortByFun = function SortByFun(field, sortType, eqCall) {
    var oThis = this;
    return function (a, b) {
        var v1 = $(a.value).attr(field);
        var v2 = $(b.value).attr(field);
        var dataType = oThis.getColumnByField(field).options.dataType;
        if (dataType == 'Float') {
            v1 = parseFloat(v1);
            v2 = parseFloat(v2);
            if (isNaN(v1)) {
                return 1;
            }
            if (isNaN(v2)) {
                return -1;
            }
            if (v1 == v2 && eqCall) {
                return eqCall.apply(oThis, arguments);
            }
            return sortType == 'asc' ? v1 - v2 : sortType == 'desc' ? v2 - v1 : 0;
        } else if (dataType == 'Int') {
            v1 = parseInt(v1);
            v2 = parseInt(v2);
            if (isNaN(v1)) {
                return 1;
            }
            if (isNaN(v2)) {
                return -1;
            }
            if (v1 == v2 && eqCall) {
                return eqCall.apply(oThis, arguments);
            }
            return sortType == 'asc' ? v1 - v2 : sortType == 'desc' ? v2 - v1 : 0;
        } else {
            v1 = oThis.getString(v1, '');
            v2 = oThis.getString(v2, '');
            try {
                var rsl = v1.localeCompare(v2);
                if (rsl === 0 && eqCall) {
                    return eqCall.apply(oThis, arguments);
                }
                if (rsl === 0) {
                    return 0;
                }
                return sortType == 'asc' ? rsl : sortType == 'desc' ? -rsl : 0;
            } catch (e) {
                return 0;
            }
        }
    };
};

var getGridRow = function getGridRow(row) {
    var obj = {};
    var nullField = this.options.nullField;
    if (nullField) {
        if (nullField.indexOf(';') > 0) {
            var nullFields = nullField.split(';');
            for (var i = 0; i < nullFields.length; i++) {
                var f = nullFields[i];
                row[f] = null;
            }
        } else {
            row[nullField] = null;
        }
    }
    return row;
};

var utilFunOjb = {
    formatWidth: formatWidth,
    swapEle: swapEle,
    getString: getString,
    getInt: getInt,
    getFloat: getFloat,
    cloneObj: cloneObj,
    DicimalFormater: DicimalFormater,
    accAdd: accAdd,
    getTrIndex: getTrIndex,
    getDataTableRowIdByRow: getDataTableRowIdByRow,
    SortByFun: SortByFun,
    getGridRow: getGridRow
};

var re_initGridCompColumnColumnMenuFun = function re_initGridCompColumnColumnMenuFun(columnOptions) {
    var column1 = new this.gridCompColumn(columnOptions, this);
    column1.options.realWidth = column1.options.width;
    this.basicGridCompColumnArr.push(column1);
};

var colMenu_initGridCompColumn = function colMenu_initGridCompColumn() {
    // 扩展方法
    this.menuColumnsHeight = this.gridCompColumnArr.length * this.columnMenuHeight;
};

var re_createColumnMenu = function re_createColumnMenu() {
    if (this.options.columnMenuType == 'base') {
        return re_createColumnMenu_base.call(this);
    } else if (this.options.columnMenuType == 'border') {
        return re_createColumnMenu_border.call(this);
    }
};

var re_createColumnMenu_base = function re_createColumnMenu_base() {
    var oThis = this;
    var htmlStr = '<div class="u-grid-column-menu" id="' + this.options.id + '_column_menu">';
    htmlStr += '<ul data-role="menu" role="menubar" class="u-grid-column-menu-ul" id="' + this.options.id + '_column_menu_ul">';

    // 创建清除设置
    htmlStr += '<li class="u-grid-column-menu-li" role="menuitem">';
    htmlStr += '<div class="u-grid-column-menu-div1" id="' + this.options.id + '_clearSet">';
    htmlStr += '<span class="u-grid-column-menu-span">' + this.transMap.ml_clear_set + '</span>';
    htmlStr += '</div></li>';

    htmlStr += '<div class="u-grid-column-menu-columns" id="' + this.options.id + '_column_menu_columns">';
    htmlStr += '<ul data-role="menu" role="menubar" class="u-grid-column-menu-columns-ul" id="' + this.options.id + '_column_menu_columns_ul">';
    $.each(this.gridCompColumnArr, function (i) {
        if (oThis.getString(this.options.title, '') != '') {
            var styleStr = '';
            if (!this.options.canVisible) styleStr += ' style="display:none;"';
            htmlStr += '<li class="u-grid-column-menu-columns-li" role="menuitem" index="' + i + '" ' + styleStr + '>';
            htmlStr += '<div class="u-grid-column-menu-columns-div1">';
            var checkedStr = "";
            if (this.options.visible) checkedStr = ' checked';

            htmlStr += '<div class="u-grid-column-menu-columns-div2"><input type="checkbox" ' + checkedStr + '><label></label></div>';
            htmlStr += '<span class="u-grid-column-menu-columns-span">' + this.options.title + '</span>';
            htmlStr += '</div></li>';
        }
    });
    htmlStr += '</ul></div>';

    htmlStr += '</ul></div>';

    // 创建数据列区域

    return htmlStr;
};

var re_createColumnMenu_border = function re_createColumnMenu_border() {
    var oThis = this;
    var htmlStr = '<div class="u-grid-column-menu-border" id="' + this.options.id + '_column_menu">';
    htmlStr += '<ul data-role="menu" role="menubar" class="u-grid-column-menu-ul-border" id="' + this.options.id + '_column_menu_ul">';

    var columnHtmlStr = '<div class="u-grid-column-menu-columns" id="' + this.options.id + '_column_menu_columns">';
    columnHtmlStr += '<ul data-role="menu" role="menubar" class="u-grid-column-menu-columns-ul-border" id="' + this.options.id + '_column_menu_columns_ul">';
    var allCheckFlag = true;
    $.each(this.gridCompColumnArr, function (i) {
        if (oThis.getString(this.options.title, '') != '') {
            var styleStr = '';
            if (!this.options.canVisible) styleStr += ' style="display:none;"';
            columnHtmlStr += '<li class="u-grid-column-menu-columns-li" role="menuitem" index="' + i + '" ' + styleStr + '>';
            columnHtmlStr += '<div class="u-grid-column-menu-columns-div1-border">';
            var checkedStr = "";
            if (this.options.visible) checkedStr = ' checked';

            if (this.options.canVisible && !this.options.visible) allCheckFlag = false;
            columnHtmlStr += '<div class="u-grid-column-menu-columns-div2-border"><input type="checkbox" ' + checkedStr + '><label></label></div>';
            columnHtmlStr += '<span class="u-grid-column-menu-columns-span-border">' + this.options.title + '</span>';
            columnHtmlStr += '</div></li>';
        }
    });
    columnHtmlStr += '</ul></div>';
    var checkedStr = '';
    if (allCheckFlag) checkedStr = ' checked ';
    var headerHtmlStr = '<li class="u-grid-column-menu-columns-li header" role="menuitem">';
    headerHtmlStr += '<div class="u-grid-column-menu-columns-div1-border">';
    headerHtmlStr += '<div class="u-grid-column-menu-columns-div2-border"><input type="checkbox" ' + checkedStr + '><label></label>&nbsp;显示</div>';
    headerHtmlStr += '<span class="u-grid-column-menu-columns-span-border" style="text-align:center;">项目名称</span>';
    headerHtmlStr += '</div></li>';

    htmlStr += headerHtmlStr;
    htmlStr += columnHtmlStr;

    htmlStr += '</ul>';
    // 创建清除设置
    htmlStr += '<div class="u-grid-column-menu-div1-border" id="' + this.options.id + '_clearSet">';
    htmlStr += '<span class="u-grid-column-menu-span-border">' + this.transMap.ml_clear_set + '</span>';
    htmlStr += '</div>';
    htmlStr += '</div>';

    // 创建数据列区域

    return htmlStr;
};

var colMenu_initEventFun = function colMenu_initEventFun() {
    // 扩展方法
    var oThis = this;
    $('#' + this.options.id).on('mouseup', function (e) {
        if ($(e.target).closest('#' + oThis.options.id + '_header').length > 0) {
            // 点击的是header区域
            oThis.mouseUpX = e.clientX;
            oThis.mouseUpY = e.clientY;
            //点击过程中鼠标没有移动
            if (oThis.mouseDownX == oThis.mouseUpX && oThis.mouseDownY == oThis.mouseUpY) {
                //或者移动距离小于5px(由于移动之后会显示屏幕div，暂时不做处理)
                oThis.columnClickX = e.clientX;
                oThis.columnClickY = e.clientY;
                var eleTh = $(e.target).closest('th')[0];
                if ($(e.target).hasClass('u-grid-header-columnmenu')) {
                    //点击的是columnmenu
                    $('#' + oThis.options.id + '_column_menu').css('display', 'block');

                    // 根据点击位置来显示column menu区域
                    if (oThis.options.columnMenuType == 'base') {
                        var left = e.clientX - 160;
                    } else if (oThis.options.columnMenuType == 'border') {
                        var left = e.clientX - 240;
                    }

                    if (left < 0) left = 0;
                    var top = e.clientY + 10;
                    $('#' + oThis.options.id + '_column_menu').css('left', left);
                    $('#' + oThis.options.id + '_column_menu').css('top', top);
                    /*数据列多的情况下处理显示的高度*/

                    var sX = $(window).width();
                    var sH = $(window).height();

                    // 如果数据列高度高于屏幕高度则数据列高度设置为屏幕高度-10；
                    var columnsHeight = oThis.menuColumnsHeight;
                    if (oThis.menuColumnsHeight + top + 34 > sH) {
                        columnsHeight = sH - top - 34;
                        $('#' + oThis.options.id + '_column_menu_columns').css('height', columnsHeight + 'px');
                    } else {
                        $('#' + oThis.options.id + '_column_menu_columns').css('height', '');
                    }
                    oThis.ele.createColumnMenuFlag = true;
                } else {}
            }
        } else if ($(e.target).closest('#' + oThis.options.id + '_content').length > 0) {
            // 点击的是数据区域

        }
    });

    $(document).on('click', function () {
        if (oThis.columnMenuMove == false && oThis.ele.createColumnMenuFlag == false) {
            if (oThis.ele.offsetWidth >= 0) $('#' + oThis.options.id + '_column_menu').css('display', 'none');
        }
        oThis.ele.createColumnMenuFlag = false;
    });
    $(document).on('scroll', function () {
        if (oThis.columnMenuMove == false && oThis.ele.createColumnMenuFlag == false) {
            if (oThis.ele.offsetWidth >= 0) $('#' + oThis.options.id + '_column_menu').css('display', 'none');
        }
        oThis.ele.createColumnMenuFlag = false;
    });
};

var colMenu_initGridEventFun = function colMenu_initGridEventFun() {
    // 扩展方法
    var oThis = this;

    /*header 按钮处理开始*/
    // column按钮
    $('#' + this.options.id + '_column_menu_ul').off('mousemove');
    $('#' + this.options.id + '_column_menu_ul').on('mousemove', function (e) {
        oThis.columnMenuMove = true;
    });
    $('#' + this.options.id + '_column_menu_ul').off('mouseout');
    $('#' + this.options.id + '_column_menu_ul').on('mouseout', function (e) {
        oThis.columnMenuMove = false;
    });

    // 清除设置按钮
    $('#' + this.options.id + '_clearSet').off('click');
    $('#' + this.options.id + '_clearSet').on('click', function (e) {
        oThis.clearLocalData();
        oThis.initGridCompColumn();
        oThis.hasNoScrollRest = false;
        oThis.noScrollWidthReset();
        // 清除排序
        oThis.dataSourceObj.sortRows();
        oThis.repaintGridDivs();
        if (typeof oThis.options.onClearSetFun == 'function') {
            oThis.options.onClearSetFun(oThis);
        }
    });
    // 显示/隐藏列 对应所有列的点击处理
    $('#' + this.options.id + '_column_menu_columns_ul li input').off('click');
    $('#' + this.options.id + '_column_menu_columns_ul li input').on('click', function (e) {
        //待完善 优化与li的click的代码整合
        var index = $(this).closest('li').attr('index');

        if (oThis.gridCompColumnArr[index].options.visible) {
            $(this)[0].checked = false;
            var ll = $('input:checked', $('#' + oThis.options.id + '_column_menu_columns_ul')).length;
            if (ll == 0) {
                $(this)[0].checked = true;
                return;
            }

            if (document.documentMode == 8) {
                var oldScrollTop = $('#' + oThis.options.id + '_column_menu_columns')[0].scrollTop;
                var oldTop = $('#' + oThis.options.id + '_column_menu')[0].style.top;
                var oldLeft = $('#' + oThis.options.id + '_column_menu')[0].style.left;
                oThis.gridCompColumnArr[index].options.visible = false;
                oThis.repaintGridDivs();
                $('#' + oThis.options.id + '_column_menu').css('display', 'block');
                $('#' + oThis.options.id + '_column_menu').css('left', oldLeft);
                $('#' + oThis.options.id + '_column_menu').css('top', oldTop);
                $('#' + oThis.options.id + '_column_menu_columns')[0].scrollTop = oldScrollTop;
            } else {
                oThis.setColumnVisibleByIndex(index, false);
                oThis.gridCompColumnArr[index].options.visible = false;
            }
        } else {
            $(this)[0].checked = true;

            if (document.documentMode == 8) {
                var oldScrollTop = $('#' + oThis.options.id + '_column_menu')[0].scrollTop;
                var oldTop = $('#' + oThis.options.id + '_column_menu')[0].style.top;
                var oldLeft = $('#' + oThis.options.id + '_column_menu')[0].style.left;
                oThis.gridCompColumnArr[index].options.visible = true;
                oThis.repaintGridDivs();
                $('#' + oThis.options.id + '_column_menu').css('display', 'block');
                $('#' + oThis.options.id + '_column_menu').css('left', oldLeft);
                $('#' + oThis.options.id + '_column_menu').css('top', oldTop);
                $('#' + oThis.options.id + '_column_menu_columns')[0].scrollTop = oldScrollTop;
            } else {
                oThis.setColumnVisibleByIndex(index, true);
                oThis.gridCompColumnArr[index].options.visible = true;
            }
        }
        oThis.saveGridCompColumnArrToLocal();
        e.stopPropagation();
    });
    $('#' + this.options.id + '_column_menu_columns_ul li').off('click');
    $('#' + this.options.id + '_column_menu_columns_ul li').on('click', function (e) {
        var inputDom = $(this).find('input');
        inputDom.click();
    });

    // $('#grid2_column_menu_ul .header input')
    $('#' + this.options.id + '_column_menu_ul .header input').on('click', function (e) {
        var nowCheck = $(this)[0].checked;
        $.each(oThis.gridCompColumnArr, function (i) {
            //当全部取消选中的时候，第一个不会取消选中--胡玥
            if (nowCheck || i !== 0) {
                oThis.setColumnVisibleByColumn(this, nowCheck);
            }
        });
    });
    /*header 按钮处理结束*/
};

var re_createHeaderDrag = function re_createHeaderDrag() {
    return '<div class="u-grid-header-resize-handle" id="' + this.options.id + '_resize_handle"><div class="u-grid-header-resize-handle-inner"></div></div>';
};

var drag_initEventFun = function drag_initEventFun() {
    // 扩展方法
    var oThis = this;

    $('#' + this.options.id).on('mousemove', function (e) {
        if ($(e.target).closest('#' + oThis.options.id + '_header').length > 0) {
            // 在header区域移动
            var eleTh = $(e.target).closest('th')[0];
            // 将其他列的操作按钮隐藏，显示当前列的
            oThis.headerThDrag(e, eleTh);
        }

        oThis.dragFun(e);
        // e.stopPropagation();
    });
    $('#' + this.options.id + '_top').on('mousemove', function (e) {
        oThis.dragFun(e);
        e.stopPropagation();
    });

    $('#' + this.options.id).on('mouseup', function (e) {
        oThis.dragEnd(e);
    });

    $('#' + this.options.id + '_top').on('mouseup', function (e) {
        oThis.dragEnd(e);
    });
};

var drag_initGridEventFun = function drag_initGridEventFun() {
    // 扩展方法
    var oThis = this;
    $('#' + this.options.id + '_resize_handle').on('mousedown', function (e) {
        oThis.dragStart(e);
        // return false;
    });
};
/*
 * 拖动开始
 */
var dragStart = function dragStart(e) {
    this.dragFlag = true;
    this.dragW = null;
    this.dragStartX = e.clientX;
};
/*
 * 改变列宽度处理
 */
var dragFun = function dragFun(e) {
    if (this.dragFlag) {
        var nowTh = $('#' + this.options.id + '_resize_handle')[0].nowTh,
            $nowTh = $(nowTh),
            nowThIndex = $nowTh.attr('index'),
            column = this.gridCompColumnArr[nowThIndex],
            nowVisibleThIndex = this.getVisibleIndexOfColumn(column);
        if (nowTh && column != this.lastVisibleColumn) {
            this.dragEndX = e.clientX;
            var changeWidth = parseInt(this.dragEndX) - parseInt(this.dragStartX),
                newWidth = parseInt(nowTh.attrWidth) + parseInt(changeWidth),
                cWidth = parseInt(this.contentWidth) + parseInt(changeWidth);
            if (newWidth > this.minColumnWidth) {
                if (this.options.noScroll) {
                    // 不显示滚动条的情况下，当前列的该变量对后面一列产生影响
                    var nextVisibleThIndex = this.getNextVisibleInidexOfColumn(column);
                    if (nextVisibleThIndex > -1) {
                        var nextColumn = this.getColumnByVisibleIndex(nextVisibleThIndex);
                        if (!this.dragNextClomunWidth || this.dragNextClomunWidth < 0) this.dragNextClomunWidth = nextColumn.options.width;
                    }
                    var nextNewWidth = parseInt(this.dragNextClomunWidth) - parseInt(changeWidth);
                    if (!(nextNewWidth > this.minColumnWidth)) {
                        $('#' + this.options.id + '_top').css('display', 'block');
                        return;
                    }
                }
                if (!this.options.noScroll) {
                    this.dragW = this.contentWidthChange(cWidth);
                }
                $('#' + this.options.id + '_header_table col:eq(' + nowVisibleThIndex + ')').css('width', newWidth + "px");
                $('#' + this.options.id + '_content_table col:eq(' + nowVisibleThIndex + ')').css('width', newWidth + "px");
                $('#' + this.options.id + '_noScroll_begin_table col:eq(' + nowVisibleThIndex + ')').css('width', newWidth + "px");
                $('#' + this.options.id + '_noScroll_begin_tbody col:eq(' + nowVisibleThIndex + ')').css('width', newWidth + "px");

                column.options.width = newWidth;
                column.options.realWidth = newWidth;
                column.options.optionsWidth = newWidth;
                if (this.options.noScroll) {
                    $('#' + this.options.id + '_header_table col:eq(' + nextVisibleThIndex + ')').css('width', nextNewWidth + "px");
                    $('#' + this.options.id + '_content_table col:eq(' + nextVisibleThIndex + ')').css('width', nextNewWidth + "px");
                    $('#' + this.options.id + '_noScroll_begin_table col:eq(' + nowVisibleThIndex + ')').css('width', newWidth + "px");
                    $('#' + this.options.id + '_noScroll_begin_tbody col:eq(' + nowVisibleThIndex + ')').css('width', newWidth + "px");
                    nextColumn.options.width = nextNewWidth;
                    nextColumn.options.realWidth = nextNewWidth;
                    nextColumn.options.optionsWidth = nextNewWidth;
                }
            }
        }
        $('#' + this.options.id + '_top').css('display', 'block');
    }
};
/*
 * 拖动结束
 */
var dragEnd = function dragEnd(e) {
    if (this.dragFlag) {
        this.resetThVariable();
        this.saveGridCompColumnArrToLocal();
        this.resetLeftHeight();
    }
    this.dragNextClomunWidth = -1;
    // this.lastVisibleColumn.options.width = this.lastVisibleColumnWidth;
    if (this.dragW) this.contentWidth = this.dragW;
    $('#' + this.options.id + '_resize_handle')[0].nowTh = null;
    this.dragFlag = false;
    $('#' + this.options.id + '_top').css('display', 'none');
};

/*
 * 计算拖动div所在位置
 */
var headerThDrag = function headerThDrag(e, ele) {
    if (!this.dragFlag && !this.swapColumnFlag && ele && ele.gridCompColumn && ele.gridCompColumn.options.canDrag && $('#' + this.options.id + '_resize_handle')[0].nowTh != ele) {
        var $ele = $(ele);
        //当fixedFloat为right的时候，计算拖拽位置有问题-NC轻量化-huyue
        if (this.options.fixedFloat === 'right') {
            $('#' + this.options.id + '_resize_handle').css('left', ele.attrRightTotalWidth - this.scrollLeft - 4 + this.leftW + this.fixedWidth_R);
        } else {
            $('#' + this.options.id + '_resize_handle').css('left', ele.attrRightTotalWidth - this.scrollLeft - 4 + this.leftW + this.fixedWidth);
        }
        $('#' + this.options.id + '_resize_handle')[0].nowTh = ele;
    }
};
var re_resetThVariableDrag = function re_resetThVariableDrag(nowTh, gridCompColumn, width) {
    if (!$('#' + this.options.id + '_resize_handle')[0].nowTh && gridCompColumn.options.canDrag) {
        $('#' + this.options.id + '_resize_handle').css('left', width - 4 + this.leftW);
        $('#' + this.options.id + '_resize_handle')[0].nowTh = nowTh;
    }
};
var dragFunObj = {
    createHeaderDrag: re_createHeaderDrag,
    dragStart: dragStart,
    dragFun: dragFun,
    dragEnd: dragEnd,
    headerThDrag: headerThDrag,
    resetThVariableDrag: re_resetThVariableDrag,
    drag_initEventFun: drag_initEventFun,
    drag_initGridEventFun: drag_initGridEventFun
};

var re_hideEditMenu = function re_hideEditMenu() {
    $('#' + this.options.id + '_content_edit_menu').css('display', 'none');
};

var re_clickFunEdit = function re_clickFunEdit(e, index) {
    var $tr = $(e.target).closest('tr');
    var $td = $(e.target).closest('td');
    var colIndex = $td.index();
    if (this.options.editable && (this.eidtRowIndex != index || this.options.editType == 'default' && this.editColIndex != colIndex)) {
        this.editClose();
        this.editRowFun($tr, colIndex);
    }
};

var editRowFun = function editRowFun($tr, colIndex) {
    var index = this.getTrIndex($tr);
    if (typeof this.options.onBeforeEditFun == 'function') {
        var obj = {};
        obj.gridObj = this;
        obj.rowObj = this.dataSourceObj.rows[index];
        obj.rowIndex = index;
        obj.colIndex = colIndex;
        obj.$tr = $tr;
        if (!this.options.onBeforeEditFun(obj)) {
            if (this.eidtRowIndex != -1) {
                this.editClose();
            }
            return;
        }
    }
    if (this.eidtRowIndex != -1) {
        this.editClose();
    }
    var index = typeof $tr === 'number' ? $tr : this.getTrIndex($tr);
    this.eidtRowIndex = index;
    this.editColIndex = colIndex;
    this.editRow($tr, colIndex);
    return true;
};
var editRowIndexFun = function editRowIndexFun(i) {
    if (this.eidtRowIndex != -1) {
        this.editClose();
    }
    this.eidtRowIndex = i;
    this.editColIndex = 0;
    this.editRow();
};
/*
 * 创建编辑行
 */
var editRow = function editRow($tr, colIndex) {
    if (colIndex < 0) return;
    var oThis = this;
    var isFixedCol = false;
    if ($tr && $tr.parents('table').attr('id').indexOf('_fixed_') > -1) isFixedCol = true;
    $tr = $tr || $('#' + this.options.id + '_content_tbody tr[role="row"]:eq(' + this.eidtRowIndex + ')');
    colIndex = colIndex || 0;
    var row = this.dataSourceObj.rows[this.eidtRowIndex].value;
    this.editRowObj = this.cloneObj(row);
    if (this.options.editType == 'default') {
        var column = isFixedCol ? this.gridCompColumnFixedArr[colIndex] : this.gridCompColumnArr[colIndex];
        if (column && column.options.editable) {
            var td = $('td:eq(' + colIndex + ')', $tr)[0];
            var field = column.options.field;
            var value = $(row).attr(field);
            value = oThis.getString(value, '');
            var obj = {};
            obj.td = td;
            obj.value = value;
            obj.field = field;
            obj.editType = column.options.editType;
            obj.rowObj = oThis.editRowObj;
            obj.$tr = $tr;
            obj.colIndex = colIndex;
            oThis.editCell(obj);
        }
        $('#' + this.options.id + '_content_edit_menu').css('display', 'block');
        $('#' + this.options.id + '_content_edit_menu_cancel').css('marginLeft', '10px'); // 与form形式相比偏左
        var topIndex = $('tr:visible', $tr.parent()).index($tr);
        this.rowHeight = $tr.height(); // tianxq
        var t = this.rowHeight * (topIndex + 1) + this.headerHeight + 1;
    } else if (this.options.editType == 'form') {
        if (typeof this.options.formEditRenderFun == 'function') {
            if (this.fixedWidth > 0) {
                var table = $('#' + this.options.id + '_content_fixed_table')[0];
            } else {
                var table = $('#' + this.options.id + '_content_table')[0];
            }

            var tr = table.insertRow(this.eidtRowIndex + 2);
            tr.id = this.options.id + '_edit_tr';
            $(tr).addClass('grid_edit_form_tr');
            var cell = tr.insertCell();
            cell.id = this.options.id + '_edit_td';
            $(cell).addClass('grid_edit_form_td');
            cell.style.borderBottom = '0px';
            cell.style.background = '#fff';
            var cWidth = parseInt(this.contentMinWidth) + parseInt(this.fixedWidth);
            var htmlStr = '<div id="' + this.options.id + '_edit_form" class="u-grid-edit-form" style="width:' + cWidth + 'px;float:left;">';
            htmlStr += '</div>';
            cell.innerHTML = htmlStr;
            var obj = {};
            obj.grid = gridObj;
            obj.element = $('#' + this.options.id + '_edit_form')[0];
            obj.editRowObj = this.editRowObj;
            this.options.formEditRenderFun.call(this, obj);
            var htmlStr = '<div style="position:relative;float:left;width:100%;height:40px;"></div>';
            $('#' + this.options.id + '_edit_form')[0].insertAdjacentHTML('beforeEnd', htmlStr);
            var h = $('#' + this.options.id + '_edit_td')[0].offsetHeight;
            var color = $('#' + this.options.id + '_edit_form').css('background-color');
            if (this.options.multiSelect) {
                var $div = $('#' + this.options.id + '_content_multiSelect > div').eq(this.eidtRowIndex);
                var htmlStr = '<div class="grid_open_edit" id="' + this.options.id + '_multiSelect_edit" style="background-color:' + color + ';float:left;position:relative;width:' + this.multiSelectWidth + 'px;height:' + h + 'px"></div>';
                $div[0].insertAdjacentHTML('afterEnd', htmlStr);
            }
            if (this.options.showNumCol) {
                var $div = $('#' + this.options.id + '_content_numCol > .u-grid-content-num').eq(this.eidtRowIndex);
                var htmlStr = '<div id="' + this.options.id + '_numCol_edit" style="background-color:' + color + ';float:left;position:relative;width:' + this.numWidth + 'px;"></div>';
                $div[0].insertAdjacentHTML('afterEnd', htmlStr);
            }
            $('#' + this.options.id + '_content_edit_menu').css('display', 'block');

            if (this.fixedWidth > 0) {
                var table1 = $('#' + this.options.id + '_content_table')[0];
                var tr1 = table1.insertRow(this.eidtRowIndex + 2);
                tr1.id = this.options.id + '_edit_tr1';
            }
        } else {
            if (this.fixedWidth > 0) {
                var table = $('#' + this.options.id + '_content_fixed_table')[0];
            } else {
                var table = $('#' + this.options.id + '_content_table')[0];
            }

            var tr = table.insertRow(this.eidtRowIndex + 2);
            tr.id = this.options.id + '_edit_tr';
            $(tr).addClass('grid_edit_form_tr');
            var cell = tr.insertCell();
            cell.id = this.options.id + '_edit_td';
            $(cell).addClass('grid_edit_form_td');
            cell.style.borderBottom = '0px';
            var cWidth = parseInt(this.contentMinWidth) + parseInt(this.fixedWidth);
            var htmlStr = '<div id="' + this.options.id + '_edit_form" class="u-grid-edit-form" style="width:' + cWidth + 'px;float:left;">';
            $.each(this.gridCompColumnFixedArr, function (i) {
                var show = false;
                if (this.options.editFormShow && (this.options.editable || !this.options.editable && oThis.options.noneEditableFormShow)) {
                    show = true;
                }

                if (show) {
                    var field = this.options.field;
                    var value = $(row).attr(field);
                    value = oThis.getString(value, '');
                    var title = this.options.title;
                    var headerColor = this.options.headerColor;
                    htmlStr += oThis.formEditCell(value, field, title, this.options.required, headerColor);
                }
            });

            $.each(this.gridCompColumnArr, function (i) {
                var show = false;
                if (this.options.editFormShow && (this.options.editable || !this.options.editable && oThis.options.noneEditableFormShow)) {
                    show = true;
                }

                if (show) {
                    var field = this.options.field;
                    var value = $(row).attr(field);
                    value = oThis.getString(value, '');
                    var title = this.options.title;
                    var headerColor = this.options.headerColor;
                    htmlStr += oThis.formEditCell(value, field, title, this.options.required, headerColor);
                }
            });
            htmlStr += '</div>';
            cell.innerHTML = htmlStr;

            $.each(this.gridCompColumnFixedArr, function (i) {
                var show = false;
                if (this.options.editFormShow && (this.options.editable || !this.options.editable && oThis.options.noneEditableFormShow)) {
                    show = true;
                }

                if (show) {
                    var field = this.options.field;
                    var td = $('#' + oThis.options.id + '_edit_' + field)[0];
                    var value = $(row).attr(field);
                    var title = this.options.title;
                    value = oThis.getString(value, '');
                    var obj = {};
                    obj.td = td;
                    td.innerHTML = '<div class="u-grid-content-td-div" title=""></div>';
                    obj.value = value;
                    obj.field = field;
                    obj.editType = this.options.editType;
                    obj.rowObj = oThis.editRowObj;
                    obj.$tr = $tr;
                    obj.colIndex = colIndex;
                    htmlStr += oThis.editCell(obj);
                }
            });

            $.each(this.gridCompColumnArr, function (i) {
                var show = false;
                if (this.options.editFormShow && (this.options.editable || !this.options.editable && oThis.options.noneEditableFormShow)) {
                    show = true;
                }

                if (show) {
                    var field = this.options.field;
                    var td = $('#' + oThis.options.id + '_edit_' + field)[0];
                    var value = $(row).attr(field);
                    var title = this.options.title;
                    value = oThis.getString(value, '');
                    var obj = {};
                    obj.td = td;
                    td.innerHTML = '<div class="u-grid-content-td-div" title=""></div>';
                    obj.value = value;
                    obj.field = field;
                    obj.editType = this.options.editType;
                    obj.rowObj = oThis.editRowObj;
                    obj.$tr = $tr;
                    obj.colIndex = colIndex;
                    htmlStr += oThis.editCell(obj);
                }
            });

            if (typeof this.options.renderEditMemu == "function") {

                this.options.renderEditMemu.apply(this, [$('#' + this.options.id + '_edit_form')[0], this.eidtRowIndex, this.dataSourceObj.rows.length]);
            } else {
                var htmlStr = '<div id="' + this.options.id + '_content_edit_menu" style="position:relative;float:left;width:100%;height:40px;"><button type="button" class="u-grid-content-edit-menu-button u-grid-content-edit-menu-button-ok" id="' + this.options.id + '_content_edit_menu_close">' + this.transMap.ml_close + '</button></div>';

                $('#' + this.options.id + '_edit_form')[0].insertAdjacentHTML('beforeEnd', htmlStr);
                $('#' + this.options.id + '_content_edit_menu_close').on('click', function (e) {
                    oThis.editClose();
                });
            }
            // 处理左侧区域位置
            var h = $('#' + this.options.id + '_edit_td')[0].offsetHeight;
            var color = $('#' + this.options.id + '_edit_form').css('background-color');
            if (this.options.multiSelect) {
                var $div = $('#' + this.options.id + '_content_multiSelect > div').eq(this.eidtRowIndex);
                var htmlStr = '<div class="grid_open_edit " id="' + this.options.id + '_multiSelect_edit" style="background-color:' + color + ';float:left;position:relative;width:' + this.multiSelectWidth + 'px;height:' + h + 'px"></div>';
                $div[0].insertAdjacentHTML('afterEnd', htmlStr);
            }
            if (this.options.showNumCol) {
                var $div = $('#' + this.options.id + '_content_numCol > .u-grid-content-num').eq(this.eidtRowIndex);
                var htmlStr = '<div id="' + this.options.id + '_numCol_edit" style="background-color:' + color + ';float:left;position:relative;width:' + this.numWidth + 'px;"></div>';
                $div[0].insertAdjacentHTML('afterEnd', htmlStr);
            }
            $('#' + this.options.id + '_content_edit_menu').css('display', 'block');

            if (this.fixedWidth > 0) {
                var table1 = $('#' + this.options.id + '_content_table')[0];
                var tr1 = table1.insertRow(this.eidtRowIndex + 2);
                tr1.id = this.options.id + '_edit_tr1';
            }
        }
    }
};
/*
 * 行编辑关闭
 */
var re_editClose = function re_editClose() {
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
    if (this.editComp && this.editComp.hide) {
        this.editComp.hide();
        dohideFlag = false;
    }

    try {
        var inputDom = this.editComp.element.parentNode.querySelector('input');
    } catch (e) {}

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
    } catch (e) {}

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
/*
 * 编辑单元格
 */
var editCell = function editCell(obj) {
    var td = obj.td;
    var value = obj.value;
    var field = obj.field;
    var editType = obj.editType;
    var rowObj = obj.rowObj;
    var $tr = obj.$tr;
    var colIndex = obj.colIndex;
    var oThis = this;
    if (obj.colIndex == 0) {
        try {
            this.iconSpan = '';
            this.iconSpan = $(td).find('.uf')[0].outerHTML;
        } catch (e) {}
    } else {
        this.iconSpan = '';
    }

    var obj = {};
    obj.td = td;
    obj.field = field;
    obj.$tr = $tr;
    obj.colIndex = colIndex;
    oThis.newEditObj = obj;

    if (editType == 'text') {
        if (this.options.editType == 'default') {
            td.innerHTML = '<div class="u-grid-content-td-div" style="position: relative; left: 0px;"><div class="eType-input"><input id="' + this.options.id + "_edit_field_" + field + '" type="text" value="' + value + '" field="' + field + '" style="width:100%;margin:0px;min-height:20px;font-size:12px;color:#444"></div></div>';
        } else {
            td.innerHTML = '<div class="u-grid-content-td-div" style="position: relative; left: 0px;"><div class="eType-input"><input id="' + this.options.id + "_edit_field_" + field + '" type="text" value="' + value + '" field="' + field + '"></div></div>';
        }
        $('input', $(td)).on('blur', function () {
            oThis.editValueChange(field, this.value);
        });
    } else if (typeof editType == 'function') {
        var obj = {};
        var $Div = $('.u-grid-content-td-div', $(td));
        $Div.removeClass('u-grid-content-td-div-over');
        obj.gridObj = this;
        obj.element = $Div[0];
        if (this.options.editType == 'default') {
            // 对于高度被撑开的情况需要放一个 div来把整体撑开
            var nowHeight = obj.element.offsetHeight;
            var editDivHtml = '<div id="' + this.options.id + '_placeholder_div" class="u-grid-edit-placeholder-div" style="height:' + nowHeight + 'px;"></div>';
            $Div[0].innerHTML = editDivHtml;
            obj.element = $('#' + this.options.id + '_placeholder_div')[0];
        }
        obj.value = value;
        obj.field = field;
        obj.rowObj = rowObj;
        editType.call(this, obj);
    }
    // input输入blur时显示下一个编辑控件
    // modify by syj
    $('input', $(td)).off('keydown'); //支持使用者自定义的情况
    // modify by syj
    $('input', $(td)).on('keydown', function (e) {
        if (oThis.options.editType == 'form') {} else {
            var keyCode = e.keyCode;
            if (e.keyCode == 13 || e.keyCode == 9) {
                // 回车
                this.blur(); //首先触发blur来将修改值反应到datatable中
                // IE11会导致先触发nextEditShow后触发blur的处理
                setTimeout(function () {
                    oThis.nextEditShow();
                }, 100);
                u.stopEvent(e);
            }
        }
    });
    if (this.options.editType == 'default') $('input:first', $(td)).focus();
};
/*
 * 触发下一个编辑单元格
 */
var nextEditShow = function nextEditShow() {
    var obj = this.newEditObj;
    var td = obj.td;
    var $tr = obj.$tr;
    var colIndex = parseInt(obj.colIndex) + 1;
    // 如果是最后一列则换行
    if ($(td).next('td').length == 0) {
        var $nextTr = $tr.next('tr');
        if ($nextTr.length > 0) {
            $tr = $nextTr;
            colIndex = 0;
            $tr.click(); //触发下一行的焦点
        } else {
            return;
        }
    }

    colIndex = _getNextEditColIndex(this, colIndex, $tr);
    var column = this.gridCompColumnArr[colIndex];
    if (column) {
        this.editRowFun($tr, colIndex);
    } else {
        var $nextTr = $tr.next('tr');
        if ($nextTr.length > 0) {
            $tr = $nextTr;
            colIndex = 0;
            $tr.click(); //触发下一行的焦点
        } else {
            return;
        }
        colIndex = _getNextEditColIndex(this, colIndex, $tr);
        var column = this.gridCompColumnArr[colIndex];
        if (column) {
            this.editRowFun($tr, colIndex);
        }
    }
};

var _getNextEditColIndex = function _getNextEditColIndex(gridObj, nowIndex, $tr) {
    // 如果下一列为隐藏/不可修改/复选框则跳到下一个
    var colIndex = -1;
    var column = gridObj.gridCompColumnArr[nowIndex];
    var beforeFlag = true;
    var index = gridObj.getTrIndex($tr);
    if (typeof gridObj.options.onBeforeEditFun == 'function') {
        var obj = {};
        obj.gridObj = gridObj;
        obj.rowObj = gridObj.dataSourceObj.rows[index];
        obj.rowIndex = index;
        obj.colIndex = nowIndex;
        obj.$tr = $tr;
        if (!gridObj.options.onBeforeEditFun(obj)) {
            beforeFlag = false;
        }
    }
    if (column && column.options && !column.options.visible || column && column.options && !column.options.editable || !beforeFlag) {
        colIndex = _getNextEditColIndex(gridObj, nowIndex + 1, $tr);
    } else {
        colIndex = nowIndex;
    }
    return colIndex;
};
var editValueChange = function editValueChange(field, value) {
    // 设置row的值为新值
    if (this.eidtRowIndex > -1 && this.eidtRowIndex < this.dataSourceObj.rows.length) {
        this.updateValueAt(this.eidtRowIndex, field, value);
    }
};
var re_updateEditRowIndex = function re_updateEditRowIndex(opType, opIndex, num) {
    if (this.eidtRowIndex < 0) return;
    if (opType == '-') {
        if (opIndex < this.eidtRowIndex) {
            this.eidtRowIndex--;
        } else if (opIndex == this.eidtRowIndex) {
            this.eidtRowIndex = -1;
        }
    } else if (opType == '+') {
        num === undefined && (num = 1);
        if (opIndex <= this.eidtRowIndex) {
            this.eidtRowIndex += num;
        }
    }
};
var re_updateValueAtEdit = function re_updateValueAtEdit(rowIndex, field, value, force) {
    if (this.eidtRowIndex == rowIndex) {
        if (this.options.editType == 'form') {} else {
            if (this.gridCompColumnArr[this.editColIndex].options.field == field) this.eidtRowIndex = -1; //下拉选中之后eidtRowIndex依然为原来的值，后续需要判断修改列
        }

        if ($('#' + this.options.id + "_edit_field_" + field).length > 0) {
            if ($('#' + this.options.id + "_edit_field_" + field)[0].type == 'checkbox') {
                if (value == 'Y' || value == 'true' || value === true) {
                    $('#' + this.options.id + "_edit_field_" + field)[0].checked = true;
                } else {
                    $('#' + this.options.id + "_edit_field_" + field)[0].checked = false;
                }
            } else {
                $('#' + this.options.id + "_edit_field_" + field)[0].value = value;
            }
        }
    }
};
/*
 * 根据filed设置editType
 */
var setEditType = function setEditType(field, editType) {
    var gridCompColumn = this.getColumnByField(field);
    gridCompColumn.options.editType = editType;
};
/*
 * 设置是否可修改
 */
var setEditable = function setEditable(editable) {
    this.options.editable = editable;
    this.setColumnEdit();
    this.editClose();
};

var setColumnEdit = function setColumnEdit() {
    var i;
    for (i = 0; i < this.gridCompColumnArr.length; i++) {

        this.editFieldIcon(this.gridCompColumnArr[i]);
    }

    for (i = 0; i < this.gridCompColumnFixedArr.length; i++) {

        this.editFieldIcon(this.gridCompColumnFixedArr[i]);
    }
};

var editFieldIcon = function editFieldIcon(column) {
    var fieldDom = $('.u-grid-header-link[field=' + column.options.field + ']');
    var fieldEditIconDom = fieldDom.find('.uf-fontselectioneditor');
    if (this.options.showEditIcon && this.options.editable && column.options.editable) {

        if (!fieldEditIconDom) {
            fieldDom.append('<i class="uf uf-fontselectioneditor"></i>');
        }
        fieldDom.removeClass('u-grid-hide-title-icon');
    } else {
        fieldDom.addClass('u-grid-hide-title-icon');
    }
};

var edit_initEventFun = function edit_initEventFun() {
    var oThis = this;
    $(document).on('click', function (e) {
        if (oThis.options.editable && oThis.options.editType == 'default') {
            var $e = $(e.target);
            var flag = true;
            flag = $(e.target).closest('.u-grid-content-td-div').length > 0 ? false : flag;
            var cusStr = oThis.options.customEditPanelClass;
            if (cusStr) {
                var cArr = cusStr.split(',');
                $.each(cArr, function () {
                    flag = $e.closest('.' + this).length > 0 ? false : flag;
                });
            }
            if ($e.attr('role') == 'grid-for-edit') {
                flag = false;
            }
            if ($e.parent().length == 0) {
                flag = false;
            }
            if (flag) {
                oThis.editClose();
            }
        }
    });

    u.on(document, 'scroll', function () {
        if (oThis.options.editType == 'default') {
            if (gridBrowser.isIE10 || gridBrowser.isIPAD) {} else {
                oThis.editClose();
            }
        }
    });
    // 为所有div添加监听，滚动时执行editClose
    $('div').on('scroll', function () {
        if (oThis.options.editType == 'default') {
            if (gridBrowser.isIE10 || gridBrowser.isIPAD) {} else {
                oThis.editClose();
            }
        }
    });
};
var setGridEditType = function setGridEditType(newEditType) {
    this.options.editType = newEditType;
};
var setGridEditTypeAndEditRow = function setGridEditTypeAndEditRow(newEditType, rowIndex, colIndex) {
    this.options.editType = newEditType;
    var $contentBody = $('#' + this.options.id + '_content_tbody');
    var $tr = $('tr:eq(' + rowIndex + ')', $contentBody);
    this.editRowFun($tr, colIndex);
};

// 如果可编辑增加修改图标
var editHeadTitleIcon = function editHeadTitleIcon(column) {

    if (this.options.showEditIcon && this.options.editable && column.options.editable) {
        column.options.title += '<i class="uf uf-fontselectioneditor"></i>';
    }
};

var eidtFunObj = {
    hideEditMenu: re_hideEditMenu,
    clickFunEdit: re_clickFunEdit,
    editRowFun: editRowFun,
    editRowIndexFun: editRowIndexFun,
    editRow: editRow,
    editClose: re_editClose,
    editCell: editCell,
    nextEditShow: nextEditShow,
    editValueChange: editValueChange,
    updateEditRowIndex: re_updateEditRowIndex,
    updateValueAtEdit: re_updateValueAtEdit,
    setEditType: setEditType,
    setEditable: setEditable,
    setColumnEdit: setColumnEdit,
    editFieldIcon: editFieldIcon,
    setGridEditType: setGridEditType,
    setGridEditTypeAndEditRow: setGridEditTypeAndEditRow,
    editHeadTitleIcon: editHeadTitleIcon,
    edit_initEventFun: edit_initEventFun
};

var editForm_initDefault = function editForm_initDefault() {
	// 扩展方法
	this.defaults = $.extend(true, {}, this.defaults, {
		noneEditableFormShow: true // form编辑器是否显示不可编辑字段
	});
};

var editForm_setRequired = function editForm_setRequired(field, value) {
	// 扩展方法
	var oThis = this;
	$.each(this.gridCompColumnArr, function (i) {
		if (this.options.field == field) {
			this.options.required = value;
			if (!value) {
				$('#' + oThis.options.id + '_edit_' + this.options.field).parent().find('.u-grid-edit-mustFlag').hide();
			} else {
				$('#' + oThis.options.id + '_edit_' + this.options.field).parent().find('.u-grid-edit-mustFlag').show();
			}
		}
	});
};

var re_editorRowChangeFun = function re_editorRowChangeFun() {
	if ($('#' + this.options.id + '_edit_form').length > 0) {
		var h = $('#' + this.options.id + '_edit_form')[0].offsetHeight;
		$('#' + this.options.id + '_numCol_edit').css('height', h);
		$('#' + this.options.id + '_multiSelect_edit').css('height', h);
	}
};
/*
 * form形式下编辑单元格
 */
var formEditCell = function formEditCell(value, field, title, required, headerColor) {
	// 创建lable
	var st = title + '';
	if (st.lengthb() > 28) {
		st = st.substrCH(26) + '...';
	}
	var htmlStr = '<div class="u-grid-edit-whole-div"><div class="u-grid-edit-label"><div title="' + title + '" style="color:' + headerColor + '">' + st + '<span style="color:red;' + (!required ? 'display: none' : '') + '" class="u-grid-edit-mustFlag">*</span></div></div>'; // 创建编辑区域
	htmlStr += '<div id="' + this.options.id + '_edit_' + field + '" class="u-grid-edit-div"></div>';
	htmlStr += '</div>';
	return htmlStr;
};
var editFromFunObj = {
	editForm_initDefault: editForm_initDefault,
	editForm_setRequired: editForm_setRequired,
	editorRowChangeFun: re_editorRowChangeFun,
	formEditCell: formEditCell
};

/*
 * 将固定列放入gridCompColumnFixedArr
 */
var re_initGridCompFixedColumn = function re_initGridCompFixedColumn() {
    var oThis = this;
    var w = 0;
    var removeArr = [];
    $.each(this.gridCompColumnArr, function (i) {
        if (this.options.fixed == true) {
            oThis.gridCompColumnFixedArr.push(this);
        }
    });
    $.each(this.gridCompColumnFixedArr, function (i) {
        if (this.options.fixed != true) {
            oThis.gridCompColumnArr.push(this);
            removeArr.push(this);
        }
    });
    $.each(removeArr, function (i) {
        for (var i = oThis.gridCompColumnFixedArr.length; i > -1; i--) {
            if (this == oThis.gridCompColumnFixedArr[i]) {
                oThis.gridCompColumnFixedArr.splice(i, 1);
                break;
            }
        }
    });
    $.each(this.gridCompColumnFixedArr, function (i) {
        for (var i = oThis.gridCompColumnArr.length; i > -1; i--) {
            if (oThis.gridCompColumnArr[i] == this) {
                oThis.gridCompColumnArr.splice(i, 1);
                break;
            }
        }
    });
};

var fixed_columnsVisibleFun = function fixed_columnsVisibleFun() {
    // 扩展方法
    var oThis = this,
        fixW = 0,
        fixW_R = 0;
    $.each(this.gridCompColumnFixedArr, function () {
        if (this.options.visible) {
            //NC轻量化在fixedFloat为right的时候，会导致没法拖拽宽度
            if (oThis.options.fixedFloat !== "right") {
                fixW_R += parseInt(this.options.width);
            }
            fixW += parseInt(this.options.width);
            this.firstColumn = oThis.firstColumn;
            oThis.firstColumn = false;
        }
    });
    //新增加fixedWidth_R为mousemove
    this.fixedWidth_R = fixW_R;
    this.fixedRealWidth = fixW;
    this.fixedWidth = fixW;
};

var re_createHeaderTableFixed = function re_createHeaderTableFixed() {
    return this.createHeaderTable('fixed');
};

var re_createContentTableFixed = function re_createContentTableFixed() {
    return this.createContentTable('fixed');
};
var re_createContentOneRowFixed = function re_createContentOneRowFixed(rowObj) {
    return this.createContentOneRow(rowObj, 'fixed');
};
var re_widthChangeGridFunFixed = function re_widthChangeGridFunFixed(halfWholeWidth) {
    // 固定区域宽度不大于整体宽度的一半
    if (this.fixedRealWidth > halfWholeWidth) {
        this.fixedWidth = halfWholeWidth;
    } else {
        this.fixedWidth = this.fixedRealWidth;
    }
};

var setColumnFixed = function setColumnFixed(field, fixed) {
    var gridCompColumn = this.getColumnByField(field);
    gridCompColumn.options.fixed = fixed;
    this.initGridCompFixedColumn();
    this.repaintDivs();
};

var fixFunObj = {
    initGridCompFixedColumn: re_initGridCompFixedColumn,
    fixed_columnsVisibleFun: fixed_columnsVisibleFun,
    createHeaderTableFixed: re_createHeaderTableFixed,
    createContentTableFixed: re_createContentTableFixed,
    createContentOneRowFixed: re_createContentOneRowFixed,
    widthChangeGridFunFixed: re_widthChangeGridFunFixed,
    setColumnFixed: setColumnFixed
};

/*
 * 创建form形式下div
 */
var createFromDivs = function createFromDivs() {
    if (this.createFormFlag) {
        return;
    }
    var htmlStr = '<div id="' + this.options.id + '_form" class="u-grid-form">';
    htmlStr += this.createFromContent();
    $('#' + this.options.id)[0].insertAdjacentHTML('afterBegin', htmlStr);
    this.createFormFlag = true;
};

/*
 * 创建form形式下内容区域
 */
var createFromContent = function createFromContent() {
    var htmlStr = '<div class="u-grid-form-content" id="' + this.options.id + '_form_content" class="u-grid-content">';
    htmlStr += '<table role="grid" id="' + this.options.id + '_form_content_table">';
    htmlStr += this.createFormContentRows();
    htmlStr += '</table>';
    return htmlStr;
};

/*
 * 创建form形式下内容区域所有行
 */
var createFormContentRows = function createFormContentRows() {
    var oThis = this,
        htmlStr = "";
    // 遍历生成所有行
    if (this.dataSourceObj.rows) {
        htmlStr += '<tbody role="rowgroup" id="' + this.options.id + '_form_content_tbody">';
        $.each(this.dataSourceObj.rows, function () {
            htmlStr += '<tr role="row"><td role="rowcell">';
            var value = this.value;
            $.each(oThis.gridCompColumnArr, function () {
                var f = this.options.field,
                    t = this.options.title,
                    v = $(value).attr(f);
                htmlStr += '<div>' + t + ':</div>';
                htmlStr += '<div>' + v + '</div>';
            });
            htmlStr += '</td></tr>';
        });
        htmlStr += '</tbody>';
    }
    return htmlStr;
};

/*
 * 整体宽度改变处理(form形式)
 */
var widthChangeFormFun = function widthChangeFormFun() {
    this.createFromDivs();
    $('#' + this.options.id + '_grid').css('display', 'none');
    $('#' + this.options.id + '_form').css('display', 'block');
    this.showType = 'form';
    if (typeof this.options.afterCreate == 'function') {
        this.options.afterCreate.call(this);
    }
};
var formShowFunOjb = {
    createFromDivs: createFromDivs,
    createFromContent: createFromContent,
    createFormContentRows: createFormContentRows,
    widthChangeFormFun: widthChangeFormFun
};

var re_resetThVariableHeaderLevel = function re_resetThVariableHeaderLevel() {
    var oThis = this,
        oldParentHeaderStr = '',
        parentWidth = 0,
        maxHeaderLevel = this.options.maxHeaderLevel,
        columnWidthArr = [];
    // 遍历所有已经创建的th创建对象记录column的width
    $('#' + this.options.id + '_header_table th', this.$ele).each(function (i) {
        var gridCompColumn = oThis.gridCompColumnArr[i];
        var field = gridCompColumn.options.field;
        var w = 0;
        if (gridCompColumn.options.visible) {
            w = parseInt(gridCompColumn.options.width);
        }
        var obj = {
            field: field,
            width: w
        };
        columnWidthArr.push(obj);
    });
    // 遍历所有headerLevel > 1的column，创建div并设置top及width值
    var firstColumnField = this.getColumnByVisibleIndex(0).options.field;
    for (var i = 0; i < this.gridCompLevelColumn.length; i++) {
        var column = this.gridCompLevelColumn[i];
        var field = column.field;
        var title = column.title;
        var startField = column.startField;
        var endField = column.endField;
        if (startField && endField) {
            var startTh = $('th[field=' + startField + ']', this.$ele.find('#' + this.options.id + '_header_thead'));
            var styleStr = ' style="';
            var classStr = '';
            var linkStyleStr = '';
            var headerLevel = column.headerLevel;
            var top = (parseInt(maxHeaderLevel) - parseInt(headerLevel)) * this.baseHeaderHeight;
            styleStr += 'top:' + top + 'px;z-index:' + headerLevel + ';';
            var width = 0;
            var startFlag = false;
            for (var j = 0; j < columnWidthArr.length; j++) {
                var nowColumn = columnWidthArr[j];
                var nowField = nowColumn.field;
                if (nowField == startField || startFlag) {
                    startFlag = true;
                    width += nowColumn.width;
                    if (nowField == endField) {
                        break;
                    }
                }
            }
            styleStr += 'width:' + width + 'px;';
            styleStr += '" ';
            if (firstColumnField == startField) {
                classStr += ' grid-no-left-border ';
            }
            if (maxHeaderLevel == headerLevel) {
                classStr += ' grid-max-level-div ';
            }

            if (this.options.headerHeight) linkStyleStr = 'style="height:' + this.options.headerHeight + 'px;line-height:' + this.options.headerHeight + 'px;"';
            var htmlStr = '<div id="' + this.options.id + field + '" class="u-gird-parent ' + classStr + '" ' + styleStr + '><div class="u-grid-header-link" ' + linkStyleStr + ' title="' + title + '">' + title + '</div></div>';
            startTh[0].insertAdjacentHTML('afterBegin', htmlStr);
        }
    }
};

var re_initGridCompColumnHeaderLevelFun = function re_initGridCompColumnHeaderLevelFun(columnOptions) {
    // 扩展方法
    if (columnOptions.headerLevel > 1) {
        this.gridCompLevelColumn.push(columnOptions);
        var oldLength = this.gridCompColumnArr.length;
        this.gridCompColumnArr.length = oldLength - 1;
        if (this.basicGridCompColumnArr && this.basicGridCompColumnArr.length > 0) {
            this.basicGridCompColumnArr.length = oldLength - 1;
        }
    }
};
var getLevelTitleByField = function getLevelTitleByField(field) {
    for (var i = 0; i < this.gridCompLevelColumn.length; i++) {
        var columnField = this.gridCompLevelColumn[i].field;
        if (columnField == field) {
            return this.gridCompLevelColumn[i].title;
        }
    }
    return '';
};
var headerLevelFunObj = {
    resetThVariableHeaderLevel: re_resetThVariableHeaderLevel,
    initGridCompColumnHeaderLevelFun: re_initGridCompColumnHeaderLevelFun,
    // initGridHiddenLevelColumn : initGridHiddenLevelColumn,
    getLevelTitleByField: getLevelTitleByField
};

var re_initGridCompColumnLoacl = function re_initGridCompColumnLoacl() {
    var oThis = this,
        localGridCompColumnArr = this.getGridCompColumnArrFromLocal();
    // 获取本地缓存中的数据
    if (localGridCompColumnArr != null) {
        this.gridCompColumnArr = localGridCompColumnArr;
        $.each(this.gridCompColumnArr, function () {
            var field = this.options.field;
            for (var i = 0; i < oThis.options.columns.length; i++) {
                var c = oThis.options.columns[i];
                if (c.field == field) {
                    var options = $.extend({}, c, this.options);
                    this.options = options;
                    this.options.realWidth = this.options.width;
                    break;
                }
            }
        });
    }
};
/*
 * 获取本地个性化存储的设置
 */
var getLocalData = function getLocalData() {
    if (!this.options.needLocalStorage) return null;
    if (window.localStorage == null) return null;
    if (this.$sd_storageData != null) return this.$sd_storageData;else {
        if (window.localStorage.getItem(this.localStorageId) == null) {
            try {
                window.localStorage.setItem(this.localStorageId, "{}");
            } catch (e) {
                return null;
            }
        }
        var storageDataStr = window.localStorage.getItem(this.localStorageId);
        if (typeof JSON == "undefined") this.$sd_storageData = eval("(" + storageDataStr + ")");else this.$sd_storageData = JSON.parse(storageDataStr);
        return this.$sd_storageData;
    }
};
/*
 * 保存本地个性化存储的设置
 */
var saveLocalData = function saveLocalData() {
    if (!this.options.needLocalStorage) return null;
    var oThis = this;
    if (this.saveSettimeout) {
        clearTimeout(this.saveSettimeout);
    }
    this.saveSettimeout = setTimeout(function () {
        if (oThis.$sd_storageData == null || window.localStorage == null) return;
        var strogeDataStr = JSON.stringify(oThis.$sd_storageData);
        try {
            window.localStorage.setItem(oThis.localStorageId, strogeDataStr);
        } catch (e) {}
    }, 200);
};
/*
 * 清除本地个性化存储的设置
 */
var clearLocalData = function clearLocalData() {
    if (!this.options.needLocalStorage) return null;
    if (this.saveSettimeout) {
        clearTimeout(this.saveSettimeout);
    }
    window.localStorage.setItem(this.localStorageId, "{}");
    this.$sd_storageData = {};
};
/*
 * 将数据列顺序保存至本地个性化存储
 */
var saveGridCompColumnArrToLocal = function saveGridCompColumnArrToLocal() {
    if (!this.options.needLocalStorage) return null;
    var defData = this.getLocalData();
    defData["gridCompColumnArr"] = this.gridCompColumnArr.concat(this.gridCompColumnFixedArr);
    this.saveLocalData();
};
/*
 * 从本地个性化存储中取出数据列顺序
 */
var getGridCompColumnArrFromLocal = function getGridCompColumnArrFromLocal() {
    if (!this.options.needLocalStorage) return null;
    var defData = this.getLocalData();
    if (defData == null) return null;
    if (defData["gridCompColumnArr"] == null) return null;
    return defData["gridCompColumnArr"];
};
var localStorageFunObj = {
    initGridCompColumnLoacl: re_initGridCompColumnLoacl,
    getLocalData: getLocalData,
    saveLocalData: saveLocalData,
    clearLocalData: clearLocalData,
    saveGridCompColumnArrToLocal: saveGridCompColumnArrToLocal,
    getGridCompColumnArrFromLocal: getGridCompColumnArrFromLocal
};

var re_initGridHiddenLevelColumn = function re_initGridHiddenLevelColumn() {
    if (!this.options.overWidthHiddenColumn) return;
    var oThis = this;
    var w = 0;

    this.gridCompHiddenLevelColumnArr = this.gridCompColumnArr.slice(0);

    this.gridCompHiddenLevelColumnArr.sort(function (a, b) {
        var hiddenLevel1 = a.options.hiddenLevel;
        var hiddenLevel2 = b.options.hiddenLevel;
        if (hiddenLevel1 > hiddenLevel2) {
            return -1;
        } else {
            return 1;
        }
    });
};
var re_widthChangeGridFunOverWidthHidden = function re_widthChangeGridFunOverWidthHidden() {
    if (this.options.overWidthHiddenColumn) {
        this.lastVisibleColumn.options.width = this.lastVisibleColumn.options.realWidth;
        var wholeWidth = parseInt(this.wholeWidth) - parseInt(this.leftW);
        var columnWholeWidth = parseInt(this.fixedWidth) + parseInt(this.contentRealWidth);
        if (columnWholeWidth > wholeWidth) {
            for (var i = 0; i < this.gridCompHiddenLevelColumnArr.length; i++) {
                var column = this.gridCompHiddenLevelColumnArr[i];
                if (column.options.visible) {
                    column.options.visible = false;
                    columnWholeWidth = parseInt(columnWholeWidth) - parseInt(column.options.width);
                }
                if (!(columnWholeWidth > wholeWidth)) {
                    break;
                }
            }
            this.columnsVisibleFun();
        } else {
            // 会将隐藏的显示出来
            /*for (var i = this.gridCompHiddenLevelColumnArr.length - 1; i > -1; i--) {
                var column = this.gridCompHiddenLevelColumnArr[i];
                if (!column.options.visible) {
                    columnWholeWidth = parseInt(columnWholeWidth) + parseInt(column.options.width);
                    if (columnWholeWidth > wholeWidth) {
                        break;
                    }
                    column.options.visible = true;
                }
            }
            this.columnsVisibleFun();*/
        }
    }
};
var overWidthHiddenFunObj = {
    initGridHiddenLevelColumn: re_initGridHiddenLevelColumn,
    widthChangeGridFunOverWidthHidden: re_widthChangeGridFunOverWidthHidden
};

var re_createContentRowsSumRow = function re_createContentRowsSumRow(createFlag) {
    var htmlStr = '';
    if (this.options.showSumRow && this.dataSourceObj.rows && this.dataSourceObj.rows.length > 0) {
        htmlStr += this.createSumRow(createFlag);
    }
    return htmlStr;
};
var re_createContentSumRow = function re_createContentSumRow(bottonStr) {
    var htmlStr = '';
    // if(this.options.showSumRow){
    // 	htmlStr += '<div class="u-grid-content-left-sum-bottom" id="' + this.options.id + '_content_left_sum_bottom" style="width:' + (this.leftW + this.fixedWidth) + 'px;'+bottonStr+'">';
    // 	htmlStr += '</div>';
    // }
    return htmlStr;
};
/*
 * 创建合计行
 */
var createSumRow = function createSumRow(createFlag) {
    if (this.options.showSumRow) {
        var oThis = this,
            idStr,
            gridCompColumnArr;
        if (createFlag == 'fixed') {
            idStr = 'fixed_';
            gridCompColumnArr = this.gridCompColumnFixedArr;
        } else {
            idStr = '';
            gridCompColumnArr = this.gridCompColumnArr;
        }
        var t = parseInt(this.wholeHeight) - this.exceptContentHeight - 48 - this.scrollBarHeight;
        t = t > 0 ? t : 0;
        var htmlStr = '<tr role="sumrow" class="u-grid-content-sum-row" id="' + this.options.id + '_content_' + idStr + 'sum_row" style="top:' + t + 'px;">';
        $.each(gridCompColumnArr, function () {
            var f = this.options.field;
            var precision = this.options.precision;
            var dataType = this.options.dataType;
            var sumValue = oThis.dataSourceObj.getSumValue(f, this, oThis);
            if (dataType == 'float') {
                var o = {};
                o.value = sumValue;
                o.precision = precision ? precision : 2;
                sumValue = oThis.DicimalFormater(o);
            }
            var tdStyle = '';
            if (!this.options.visible) {
                tdStyle = 'style="display:none;';
                if (oThis.options.rowHeight) {
                    tdStyle += 'height:' + oThis.options.rowHeight + 'px;line-height:' + oThis.options.rowHeight + 'px;';
                }
                tdStyle += '"';
            } else {
                if (oThis.options.rowHeight) {
                    tdStyle += 'style="height:' + oThis.options.rowHeight + 'px;line-height:' + oThis.options.rowHeight + 'px;"';
                }
            }
            htmlStr += '<td role="sumrowcell" title="' + sumValue + '" ' + tdStyle + '>';
            if (this.firstColumn) {
                htmlStr += '<div class="u-gird-centent-sum-div"><span>' + oThis.transMap.ml_sum + '</span></div>';
            }
            var contentStyle = '';
            if (this.options.dataType == 'integer' || this.options.dataType == 'float') {
                contentStyle = 'style="text-align: right;"';
            }
            htmlStr += '<div class="u-grid-content-td-div" ' + contentStyle + '><span value="' + sumValue + '">' + sumValue + '</span></div></td>';
        });
        htmlStr += '</tr>';
        return htmlStr;
    }
};

/*
 * 创建合计行 for ie
 */
var createSumRowForIE = function createSumRowForIE(table, createFlag) {
    if (this.options.showSumRow) {
        var oThis = this,
            idStr,
            gridCompColumnArr;
        if (createFlag == 'fixed') {
            idStr = 'fixed_';
            gridCompColumnArr = this.gridCompColumnFixedArr;
        } else {
            idStr = '';
            gridCompColumnArr = this.gridCompColumnArr;
        }
        var t = parseInt(this.wholeHeight) - this.exceptContentHeight - 48 - this.scrollBarHeight;
        t = t > 0 ? t : 0;
        var row = table.insertRow();
        row.role = 'sumrow';
        row.className = 'u-grid-content-sum-row';
        row.id = this.options.id + '_content_' + idStr + 'sum_row';
        row.style.top = t + 'px';
        $.each(gridCompColumnArr, function () {
            var f = this.options.field;
            var precision = this.options.precision;
            var dataType = this.options.dataType;
            var sumValue = oThis.dataSourceObj.getSumValue(f, this, oThis);
            if (dataType == 'float') {
                var o = {};
                o.value = sumValue;
                o.precision = precision ? precision : 2;
                sumValue = oThis.DicimalFormater(o);
            }
            var newCell = row.insertCell();
            newCell.role = 'sumrowcell';
            newCell.title = sumValue;
            if (oThis.options.sumRowHeight) {
                newCell.style.height = oThis.options.sumRowHeight + 'px';
                newCell.style.lineHeight = oThis.options.sumRowHeight + 'px';
            }
            var contentStyle = '';
            if (this.options.dataType == 'integer' || this.options.dataType == 'float') {
                contentStyle = 'style="text-align: right;"';
            }

            var htmlStr = '<div class="u-grid-content-td-div" ' + contentStyle + '>';
            if (this.firstColumn) {
                htmlStr += '<div class="u-gird-centent-sum-div"><span>' + oThis.transMap.ml_sum + '</span></div>';
            }
            htmlStr += '<span value="' + sumValue + '">' + sumValue + '</span></div>';
            newCell.insertAdjacentHTML('afterBegin', htmlStr);
        });
    }
};
/*
 * 重画合计行
 */
var re_repairSumRow = function re_repairSumRow() {
    var self = this;
    if (this.re_repairSumRowSetTimeout) clearTimeout(this.re_repairSumRowSetTimeout);
    this.re_repairSumRowSetTimeout = setTimeout(function () {
        re_repairSumRowFun.call(self);
    }, 100);
};

var re_repairSumRowFun = function re_repairSumRowFun() {
    if (this.options.showSumRow) {
        if (this.options.sumRowFixed) {
            if (this.options.sumRowFirst) {
                $('#' + this.options.id + '_noScroll_begin_table tbody .u-grid-content-sum-row').remove();
                $('#' + this.options.id + '_noScroll_fixed_begin_table tbody .u-grid-content-sum-row').remove();
                try {
                    if (this.dataSourceObj.rows && this.dataSourceObj.rows.length > 0) {
                        $('#' + this.options.id + '_grid .u-grid-noScroll-left').remove();
                        var type = 'begin';
                        if ((this.options.multiSelect || this.options.showNumCol) && (type == 'begin' && this.options.sumRowFirst && this.options.sumRowFixed || type == 'end' && !this.options.sumRowFirst && this.options.sumRowFixed)) {
                            var htmlStr = '<div id="' + this.options.id + '_noScroll_left" class="u-grid-noScroll-left" style="width:' + this.leftW + 'px;height:' + this.noScrollHeight + 'px;">';
                            htmlStr += '</div>';
                            $('#' + this.options.id + '_grid .u-grid-noScroll-wrap')[0].insertAdjacentHTML('afterBegin', htmlStr);
                        }
                        var htmlStr = this.createSumRow();
                        $('#' + this.options.id + '_noScroll_begin_table tbody')[0].insertAdjacentHTML('afterBegin', htmlStr);
                        var htmlStr = this.createSumRow('fixed');
                        $('#' + this.options.id + '_noScroll_fixed_begin_table tbody')[0].insertAdjacentHTML('afterBegin', htmlStr);
                    }
                } catch (e) {
                    var table = $('#' + this.options.id + '_noScroll_begin_table')[0];
                    var fixedTable = $('#' + this.options.id + '_noScroll_fixed_begin_table')[0];
                    this.createSumRowForIE(table);
                    this.createSumRowForIE(fixedTable, 'fixed');
                }
            } else {
                $('#' + this.options.id + '_noScroll_end_table tbody .u-grid-content-sum-row').remove();
                $('#' + this.options.id + '_noScroll_fixed_end_table tbody .u-grid-content-sum-row').remove();
                try {
                    if (this.dataSourceObj.rows && this.dataSourceObj.rows.length > 0) {
                        var htmlStr = this.createSumRow();
                        $('#' + this.options.id + '_noScroll_end_table tbody')[0].insertAdjacentHTML('afterBegin', htmlStr);
                        var htmlStr = this.createSumRow('fixed');
                        $('#' + this.options.id + '_noScroll_fixed_end_table tbody')[0].insertAdjacentHTML('afterBegin', htmlStr);
                    }
                } catch (e) {
                    var table = $('#' + this.options.id + '_noScroll_end_table')[0];
                    var fixedTable = $('#' + this.options.id + '_noScroll_fixed_end_table')[0];
                    this.createSumRowForIE(table);
                    this.createSumRowForIE(fixedTable, 'fixed');
                }
            }
        } else {
            $('#' + this.options.id + '_content_div tbody .u-grid-content-sum-row').remove();
            $('#' + this.options.id + '_content_fixed_div tbody .u-grid-content-sum-row').remove();
            try {
                if (this.dataSourceObj.rows && this.dataSourceObj.rows.length > 0) {
                    var htmlStr = this.createSumRow();
                    if (this.options.sumRowFirst) {
                        $('#' + this.options.id + '_content_div tbody')[0].insertAdjacentHTML('afterBegin', htmlStr);
                    } else {
                        $('#' + this.options.id + '_content_div tbody')[0].insertAdjacentHTML('beforeEnd', htmlStr);
                    }
                    var htmlStr = this.createSumRow('fixed');
                    if ($('#' + this.options.id + '_content_fixed_div tbody')[0]) {
                        if (this.options.sumRowFirst) {
                            $('#' + this.options.id + '_content_fixed_div tbody')[0].insertAdjacentHTML('afterBegin', htmlStr);
                        } else {
                            $('#' + this.options.id + '_content_fixed_div tbody')[0].insertAdjacentHTML('beforeEnd', htmlStr);
                        }
                    }
                }
            } catch (e) {
                var table = $('#' + this.options.id + '_content_div table')[0];
                var fixedTable = $('#' + this.options.id + '_content_fixed_div table')[0];
                this.createSumRowForIE(table);
                this.createSumRowForIE(fixedTable, 'fixed');
            }
        }

        this.renderSumRow();
    }
};

var renderSumRow = function renderSumRow() {
    var oThis = this;
    $.each(this.gridCompColumnFixedArr, function (i) {
        var sumCol = this.options.sumCol;
        var sumRenderType = this.options.sumRenderType;
        var idStr = 'fixed_';
        if (sumCol) {
            var sumSpans = $('#' + oThis.options.id + '_content_' + idStr + 'sum_row').find('td').eq(i).find('span');
            var sumSpan = sumSpans[sumSpans.length - 1];
            if (sumSpan) {
                if (typeof sumRenderType == 'function') {
                    var sumV = $(sumSpan).attr('value');
                    var obj = {};
                    obj.value = sumV;
                    obj.element = sumSpan;
                    obj.gridObj = oThis;
                    obj.gridCompColumn = this;
                    sumRenderType.call(oThis, obj);
                } else if (dataType == 'integer' || dataType == 'float') {
                    sumSpan.style.textAlign = 'right';
                }
            }
        }
    });
    $.each(this.gridCompColumnArr, function (i) {
        var sumCol = this.options.sumCol;
        var dataType = this.options.dataType;
        var sumRenderType = this.options.sumRenderType;
        var idStr = '';
        if (sumCol) {
            var sumSpans = $('#' + oThis.options.id + '_content_' + idStr + 'sum_row').find('td').eq(i).find('span');
            var sumSpan = sumSpans[sumSpans.length - 1];
            if (sumSpan) {
                if (typeof sumRenderType == 'function') {
                    var sumV = $(sumSpan).attr('value');
                    var obj = {};
                    obj.value = sumV;
                    obj.element = sumSpan;
                    obj.gridObj = oThis;
                    obj.gridCompColumn = this;
                    sumRenderType.call(oThis, obj);
                } else if (dataType == 'integer' || dataType == 'float') {
                    sumSpan.style.textAlign = 'right';
                }
            }
        }
    });
};

var re_renderTypeSumRow = function re_renderTypeSumRow(gridCompColumn, i, begin, length, isFixedColumn) {
    var oThis = this;
    var sumCol = gridCompColumn.options.sumCol;
    var sumRenderType = gridCompColumn.options.sumRenderType;
    var dataType = gridCompColumn.options.dataType;
    var idStr = isFixedColumn === true ? 'fixed_' : '';
    if (sumCol) {
        var sumSpans = $('#' + this.options.id + '_content_' + idStr + 'sum_row').find('td').eq(i).find('span');
        var sumSpan = sumSpans[sumSpans.length - 1];
        if (sumSpan) {
            if (typeof sumRenderType == 'function') {
                var sumV = $(sumSpan).attr('value');
                var obj = {};
                obj.value = sumV;
                obj.element = sumSpan;
                obj.gridObj = oThis;
                obj.gridCompColumn = gridCompColumn;
                sumRenderType.call(oThis, obj);
            } else if (dataType == 'integer' || dataType == 'float') {
                sumSpan.style.textAlign = 'right';
            }
        }
    }
};

// 增加预制render
window.maxSumRender = function maxSumRender(opt) {
    var gridComp = opt.gridObj;
    var gridCompColumn = opt.gridCompColumn;
    var field = gridCompColumn.options.field;
    var element = opt.element;
    var nowMax;
    $.each(gridComp.dataSourceObj.rows, function (i) {
        var v = $(this.value).attr(field);
        if (gridCompColumn.options.dataType == 'Int') {
            v = gridComp.getInt(v, 0);
        } else {
            v = gridComp.getFloat(v, 0);
        }
        if (typeof nowMax == 'undefined') {
            nowMax = v;
        } else {
            if (v > nowMax) nowMax = v;
        }
    });

    // 处理精度
    if (gridCompColumn.options.dataType == 'Float' && gridCompColumn.options.precision) {
        var o = {};
        o.value = nowMax;
        o.precision = gridCompColumn.options.precision;
        nowMax = gridComp.DicimalFormater(o);
    }

    element.innerHTML = nowMax + '';
};
window.minSumRender = function minSumRender(opt) {
    var gridComp = opt.gridObj;
    var gridCompColumn = opt.gridCompColumn;
    var field = gridCompColumn.options.field;
    var element = opt.element;
    var nowMax;
    $.each(gridComp.dataSourceObj.rows, function (i) {
        var v = $(this.value).attr(field);
        if (gridCompColumn.options.dataType == 'Int') {
            v = gridComp.getInt(v, 0);
        } else {
            v = gridComp.getFloat(v, 0);
        }
        if (typeof nowMax == 'undefined') {
            nowMax = v;
        } else {
            if (v < nowMax) nowMax = v;
        }
    });

    // 处理精度
    if (gridCompColumn.options.dataType == 'Float' && gridCompColumn.options.precision) {
        var o = {};
        o.value = nowMax;
        o.precision = gridCompColumn.options.precision;
        nowMax = gridComp.DicimalFormater(o);
    }
    element.innerHTML = nowMax + '';
};
window.avgSumRender = function avgSumRender(opt) {
    var sumValue = opt.value;
    var gridComp = opt.gridObj;
    var gridCompColumn = opt.gridCompColumn;
    var element = opt.element;
    var l = gridComp.dataSourceObj.rows.length;
    var avgValue = sumValue / l;

    // 处理精度
    if (gridCompColumn.options.dataType == 'Float' && gridCompColumn.options.precision) {
        var o = {};
        o.value = avgValue;
        o.precision = gridCompColumn.options.precision;
        avgValue = gridComp.DicimalFormater(o);
    }
    element.innerHTML = avgValue + '';
};

var sumRowFunObj = {
    createContentRowsSumRow: re_createContentRowsSumRow,
    createContentSumRow: re_createContentSumRow,
    createSumRow: createSumRow,
    createSumRowForIE: createSumRowForIE,
    repairSumRow: re_repairSumRow,
    renderSumRow: renderSumRow,
    renderTypeSumRow: re_renderTypeSumRow
};

var swap_initEventFun = function swap_initEventFun() {
    // 扩展方法
    var oThis = this;
    $('#' + this.options.id).on('mousedown', function (e) {
        if ($(e.target).closest('#' + oThis.options.id + '_header').length > 0) {
            // 点击的是header区域
            var eleTh = $(e.target).closest('th')[0];
            if (oThis.options.canSwap && eleTh) {
                oThis.swapColumnStart(e, eleTh);
            }
            e.preventDefault();
        } else if ($(e.target).closest('#' + oThis.options.id + '_content').length > 0) {
            // 点击的是数据区域
        }
    });

    $('#' + this.options.id).on('mousemove', function (e) {
        oThis.mouseMoveX = e.clientX;
        oThis.mouseMoveY = e.clientY;
        if ((oThis.mouseMoveX != oThis.mouseDownX || oThis.mouseDownY != oThis.mouseMoveY) && oThis.mouseDownX != 'mouseDownX' && oThis.options.canSwap && oThis.swapColumnEle) {
            // 鼠标按下之后移动了
            oThis.swapColumnFlag = true;
        }
        oThis.swapColumnFun(e);
        // e.stopPropagation();
    });

    $('#' + this.options.id + '_top').on('mousemove', function (e) {
        oThis.mouseMoveX = e.clientX;
        oThis.mouseMoveY = e.clientY;
        if ((oThis.mouseMoveX != oThis.mouseDownX || oThis.mouseDownY != oThis.mouseMoveY) && oThis.mouseDownX != 'mouseDownX' && oThis.options.canSwap && oThis.swapColumnEle) {
            // 鼠标按下之后移动了
            oThis.swapColumnFlag = true;
        }
        oThis.swapColumnFun(e);
        e.stopPropagation();
    });

    $('#' + this.options.id).on('mouseup', function (e) {
        oThis.mouseUpX = e.clientX;
        oThis.mouseUpY = e.clientY;
        oThis.swapColumnEnd(e);
        oThis.mouseUpX = 'mouseUpX';
        oThis.mouseUpY = 'mouseUpY';
        oThis.mouseDownX = 'mouseDownX';
        oThis.mouseDownY = 'mouseDownY';
        oThis.mouseMoveX = 'mouseMoveX';
        oThis.mouseMoveY = 'mouseMoveY';
    });

    $('#' + this.options.id + '_top').on('mouseup', function (e) {
        oThis.mouseUpX = e.clientX;
        oThis.mouseUpY = e.clientY;
        oThis.swapColumnEnd(e);
        oThis.mouseUpX = 'mouseUpX';
        oThis.mouseUpY = 'mouseUpY';
        oThis.mouseDownX = 'mouseDownX';
        oThis.mouseDownY = 'mouseDownY';
        oThis.mouseMoveX = 'mouseMoveX';
        oThis.mouseMoveY = 'mouseMoveY';
    });
};

var swap_initGridEventFun = function swap_initGridEventFun() {
    // 扩展方法
    var oThis = this;
};

/*
 * 交换列位置开始，并不修改swapColumnFlag，当移动的时候才修改swapColumnFlag
 */
var swapColumnStart = function swapColumnStart(e, ele) {
    if (!this.options.canSwap) {
        return;
    }
    this.swapColumnEle = ele;
    this.swapColumnStartX = e.clientX;
    this.swapColumnStartY = e.clientY;
};
/*
 * 交换位置
 */
var swapColumnFun = function swapColumnFun(e) {
    if (!this.options.canSwap) {
        return;
    }
    var oThis = this;
    if (this.swapColumnFlag) {
        var nowTh = this.swapColumnEle;
        if (!nowTh) {
            return;
        }
        var $nowTh = $(nowTh);
        if (!nowTh.gridCompColumn) {
            return;
        }
        var nowGridCompColumn = nowTh.gridCompColumn;
        //创建拖动区域
        if ($('#' + this.options.id + '_clue').length == 0) {
            var $d = $('<div class="u-grid u-grid-header-drag-clue" id="' + this.options.id + '_clue" />').css({
                width: nowTh.scrollWidth + "px",
                left: nowTh.attrLeftTotalWidth - oThis.scrollLeft + oThis.leftW + oThis.fixedWidth + "px",
                top: "0px",
                paddingLeft: $nowTh.css("paddingLeft"),
                paddingRight: $nowTh.css("paddingRight"),
                lineHeight: $nowTh.height() + "px",
                paddingTop: $nowTh.css("paddingTop"),
                paddingBottom: $nowTh.css("paddingBottom")
            }).html(nowGridCompColumn.options.title || nowGridCompColumn.options.field).prepend('<span class="uf uf-bancirclesymbol u-grid-header-drag-status" />');
            try {
                $('#' + this.options.id)[0].insertAdjacentElement('afterBegin', $d[0]);
            } catch (e) {
                $('#' + this.options.id)[0].insertBefore($d[0], $('#' + this.options.id)[0].firstChild);
            }
            $d.on('mousemove', function () {
                e.stopPropagation();
            });
        }
        this.swapColumnEndX = e.clientX;
        this.swapColumnEndY = e.clientY;
        var changeX = this.swapColumnEndX - this.swapColumnStartX,
            changeY = this.swapColumnEndY - this.swapColumnStartY;
        $('#' + this.options.id + '_clue').css({
            left: nowTh.attrLeftTotalWidth + changeX - oThis.scrollLeft + oThis.leftW + oThis.fixedWidth + "px",
            top: changeY + "px"
        });

        // 创建提示div
        if ($('#' + this.options.id + '_swap_top').length == 0) {
            var $d = $('<span class="uf uf-triangle-down u-grid-header-swap-tip-span"  id="' + this.options.id + '_swap_top"/>');
            $d.css({
                top: $nowTh.height() - 6 + 'px'
            });
            var $d1 = $('<span class="uf uf-triangle-up u-grid-header-swap-tip-span" id="' + this.options.id + '_swap_down" />');
            $d1.css({
                top: '6px'
            });
            try {
                $('#' + this.options.id)[0].insertAdjacentElement('afterBegin', $d[0]);
                $('#' + this.options.id)[0].insertAdjacentElement('afterBegin', $d1[0]);
            } catch (e) {
                $('#' + this.options.id)[0].insertBefore($d[0], $('#' + this.options.id)[0].firstChild);
                $('#' + this.options.id)[0].insertBefore($d1[0], $('#' + this.options.id)[0].firstChild);
            }
        }
        this.canSwap = false;
        $('#' + this.options.id + '_header_table th').each(function (i) {
            var left = $(this).offset().left,
                right = left + parseInt(this.attrWidth);
            if (i == 0 && e.clientX < left) {
                // 移动到最左边
                if (oThis.swapColumnEle != this) {
                    oThis.swapToColumnEle = 'LeftEle';
                    $('#' + oThis.options.id + '_swap_top').css({
                        left: -oThis.scrollLeft - 3 + oThis.leftW + oThis.fixedWidth + 'px',
                        display: 'block'
                    });
                    $('#' + oThis.options.id + '_swap_down').css({
                        left: -oThis.scrollLeft - 3 + oThis.leftW + oThis.fixedWidth + 'px',
                        display: 'block'
                    });
                }
                oThis.canSwap = true;
            } else if (left < e.clientX && e.clientX < right) {
                if (oThis.swapColumnEle != this && parseInt($(this).attr('index')) + 1 != parseInt($(oThis.swapColumnEle).attr('index'))) {
                    if (oThis.swapToColumnEle != this) {
                        oThis.swapToColumnEle = this;
                        $('#' + oThis.options.id + '_swap_top').css({
                            left: this.attrRightTotalWidth - oThis.scrollLeft - 3 + oThis.leftW + oThis.fixedWidth + 'px',
                            display: 'block'
                        });
                        $('#' + oThis.options.id + '_swap_down').css({
                            left: this.attrRightTotalWidth - oThis.scrollLeft - 3 + oThis.leftW + oThis.fixedWidth + 'px',
                            display: 'block'
                        });
                    }
                    oThis.canSwap = true;
                    return false;
                }
            }
        });
        if (this.canSwap) {
            $('.u-grid-header-drag-status').removeClass('uf-bancirclesymbol').addClass('uf-plussigninablackcircle');
        } else {
            $('#' + this.options.id + '_swap_top').css('display', 'none');
            $('#' + this.options.id + '_swap_down').css('display', 'none');
            $('.u-grid-header-drag-status').removeClass('uf-plussigninablackcircle').addClass('uf-bancirclesymbol');
            this.swapToColumnEle = null;
        }
        $('#' + this.options.id + '_top').css('display', 'block');
    }
};
/*
 * 交换位置结束
 */
var swapColumnEnd = function swapColumnEnd(e) {
    if (!this.options.canSwap) {
        return;
    }
    var oThis = this;
    if (this.swapColumnFlag) {
        if (this.swapToColumnEle) {
            var swapColumnEle = this.swapColumnEle,
                swapToColumnEle = this.swapToColumnEle,
                swapColumnIndex = $(swapColumnEle).attr('index'),
                swapToColumnIndex = $(swapToColumnEle).attr('index'),
                swapGridCompColumn = this.gridCompColumnArr[swapColumnIndex];
            this.gridCompColumnArr.splice(parseInt(swapToColumnIndex) + 1, 0, swapGridCompColumn);
            if (parseInt(swapColumnIndex) < parseInt(swapToColumnIndex)) this.gridCompColumnArr.splice(parseInt(swapColumnIndex), 1);else this.gridCompColumnArr.splice(parseInt(swapColumnIndex) + 1, 1);

            this.saveGridCompColumnArrToLocal();
            this.repaintGridDivs();
            this.resetColumnWidthByRealWidth();
        }
        $('#' + this.options.id + '_clue').remove();
        $('#' + this.options.id + '_swap_top').css('display', 'none');
        $('#' + this.options.id + '_swap_down').css('display', 'none');
    }
    this.swapColumnEle = null;
    this.swapColumnFlag = false;
    $('#' + this.options.id + '_top').css('display', 'none');
};
var swapFunObj = {
    swap_initEventFun: swap_initEventFun,
    swap_initGridEventFun: swap_initGridEventFun,
    swapColumnStart: swapColumnStart,
    swapColumnFun: swapColumnFun,
    swapColumnEnd: swapColumnEnd
};

var rowDrag_initGridEventFun = function rowDrag_initGridEventFun() {

    var oThis = this;

    // 判断是否操作在内容行上
    // 根据某个字段判断是否可拖拽，如果可编辑调用rowDragStart
    $('#' + this.options.id + '_content_tbody').on('mousedown', function (e) {
        var $tarTr = $(e.target).closest("tr");
        var isEditTr = $(e.target).closest("tr").hasClass('grid_edit_form_tr');
        if ($tarTr.length > 0 && !isEditTr) {
            var eleTr = $(e.target).closest("tr")[0];
            if (oThis.options.canRowDrag) {
                oThis.rowDragStart(e, eleTr);
            }
            // e.preventDefault();
        }
    });

    // move事件
    $('#' + this.options.id + '_content_tbody').on('mousemove', function (e) {
        oThis.mouseMoveX = e.clientX;
        oThis.mouseMoveY = e.clientY;
        if (oThis.rowDragEle && (oThis.mouseMoveX != oThis.rowDragStartX || oThis.mouseMoveY != oThis.rowDragStartY) && oThis.options.canRowDrag) {
            oThis.rowDragFlag = true;
            // 鼠标按下之后移动了
            oThis.rowDragFun(e);
        }

        // e.stopPropagation();
    });

    $('#' + this.options.id + '_content_tbody').on('mouseup', function (e) {
        oThis.mouseUpX = e.clientX;
        oThis.mouseUpY = e.clientY;
        oThis.rowDragEnd(e);
    });
};

// const rowDrag_initGridEventFun = function(){
// 	// 扩展方法
// 	var oThis = this;
// };
// 行拖拽开始之前
var rowDragStart = function rowDragStart(e, ele) {
    var oThis = this;
    // 保存element，
    // 记录之前clientx，clienty
    // 记录当前行的序号
    if (!this.options.canRowDrag) {
        return;
    }
    this.rowDragStartX = e.clientX;
    this.rowDragStartY = e.clientY;
    this.rowDragEle = ele;
    // 查询rowDragEle是第几个tr元素
    $('#' + this.options.id + '_content_tbody').find('tr').each(function (i) {
        if ($(this).is(oThis.rowDragEle)) {
            oThis.rowDragStartIndex = i;
            return false;
        }
    });
};

// 行拖拽
var rowDragFun = function rowDragFun(e) {
    var oThis = this;
    // 拖拽时动态生成图标
    if (!oThis.options.canRowDrag) {
        return;
    }

    if (this.rowDragFlag) {
        this.rowDragEndX = e.clientX;
        this.rowDragEndY = e.clientY;
        var changeX = this.rowDragEndX - this.rowDragStartX,
            changeY = this.rowDragEndY - this.rowDragStartY;
        var rowHeight = this.rowDragEle.clientHeight;

        var rowCounts = parseInt(changeY / rowHeight);

        if (rowCounts < 0) {
            this.dragdirection = -1;
        } else {
            this.dragdirection = 1;
        }

        this.rowDragEndIndex = this.rowDragStartIndex + rowCounts;

        if (this.rowDragEndIndex < 0) {
            this.rowDragEndIndex = 0;
        }

        if (this.rowDragEndIndex != this.rowDragStartIndex) {
            // var $flagIconDom = $('<span class="uf uf-moveoption" />');
            //先删除相关的标记元素
            $('#' + this.options.id + '_content_tbody').find('tr td').removeClass('u-grid-drag-icon');
            //添加标记元素
            $('#' + this.options.id + '_content_tbody').find('tr').eq(this.rowDragEndIndex).find('td').first().addClass('u-grid-drag-icon');
        }
    }
};

// 行拖拽结束
var rowDragEnd = function rowDragEnd(e) {
    var tempdata;
    if (!this.options.canRowDrag) {
        return;
    }
    if (this.rowDragFlag && this.rowDragEndIndex != this.rowDragStartIndex) {
        //保存下临时数据
        tempdata = this.dataSourceObj.rows[this.rowDragStartIndex];

        $('#' + this.options.id + '_content_tbody').find('tr td').removeClass('u-grid-drag-icon');

        if (this.dragdirection < 0) {

            //dom元素操作
            $('#' + this.options.id + '_content_tbody').find('tr').eq(this.rowDragEndIndex).before(this.rowDragEle);

            // 删除起始位置
            this.dataSourceObj.rows.splice(this.rowDragStartIndex, 1);

            this.dataSourceObj.rows.splice(this.rowDragEndIndex, 0, tempdata);
        } else {

            // 数据操作
            this.dataSourceObj.rows.splice(this.rowDragStartIndex, 1);
            // dom元素操作
            if (this.rowDragEndIndex >= this.dataSourceObj.rows.length) {
                $('#' + this.options.id + '_content_tbody').append(this.rowDragEle);
                this.dataSourceObj.rows.splice(this.rowDragEndIndex + 1, 0, tempdata);
            } else {
                $('#' + this.options.id + '_content_tbody').find('tr').eq(this.rowDragEndIndex + 1).before(this.rowDragEle);
                this.dataSourceObj.rows.splice(this.rowDragEndIndex, 0, tempdata);
            }
        }

        // 刷新选中行 后续优化
        var selectRows = [];
        selectRows = selectRows.concat(this.getSelectRows());
        this.setAllRowUnSelect();
        if (this.options.multiSelect) $('#' + this.options.id + '_content_multiSelect').find('.u-grid-content-sel-row').removeClass('u-grid-content-sel-row');
        if (this.options.showNumCol) $('#' + this.options.id + '_content_numCol').find('.u-grid-content-sel-row').removeClass('u-grid-content-sel-row');
        for (var i = 0; i < selectRows.length; i++) {
            var selectRow = selectRows[i];
            var selectIndex = this.getRowIndexByValue('$_#_@_id', selectRow['$_#_@_id']);
            this.setRowSelect(selectIndex);
        }
    }
    // 删除之前行，插入新行

    this.rowDragFlag = false;
    this.rowDragEle = undefined;
};

var setRowDrag = function setRowDrag(isDrag) {
    this.options.canRowDrag = isDrag;
};
var rowDragFunObj = {
    rowDrag_initGridEventFun: rowDrag_initGridEventFun,
    rowDragStart: rowDragStart,
    rowDragFun: rowDragFun,
    rowDragEnd: rowDragEnd,
    setRowDrag: setRowDrag
};

var createContentGroupRows$1 = function createContentGroupRows(createFlag) {
    var htmlStr = '',
        oThis = this;
    if (this.options.groupField && this.dataSourceObj.groupRows && this.dataSourceObj.groupRows.length > 0) {
        $.each(this.dataSourceObj.groupRows, function (i) {
            $.each(this.rows, function () {
                htmlStr += oThis.createContentOneRow(this, createFlag);
            });
            if (oThis.options.groupSumRow) htmlStr += oThis.createContentGroupSumRow(this, createFlag);
        });
    }
    return htmlStr;
};

var createContentLeftMultiSelectGroupRows$1 = function createContentLeftMultiSelectGroupRows() {
    var htmlStr = '',
        oThis = this;
    if (this.options.groupField && this.dataSourceObj.groupRows && this.dataSourceObj.groupRows.length > 0) {
        $.each(this.dataSourceObj.groupRows, function (i) {
            if (this.rows && this.rows.length > 0) {
                $.each(this.rows, function () {
                    htmlStr += oThis.createContentLeftMultiSelectRow(this);
                });
                if (oThis.options.groupSumRow) htmlStr += oThis.createContentLetGroupSumRow('multiSelect', this.value);
            }
        });
    }
    return htmlStr;
};

var createContentLeftNumColGroupRows$1 = function createContentLeftNumColGroupRows() {
    var htmlStr = '',
        oThis = this,
        index = 0;
    if (this.options.groupField && this.dataSourceObj.groupRows && this.dataSourceObj.groupRows.length > 0) {
        $.each(this.dataSourceObj.groupRows, function (i) {
            if (this.rows && this.rows.length > 0) {
                $.each(this.rows, function () {
                    htmlStr += oThis.createContentLeftNumColRow(index);
                    index++;
                });
                if (oThis.options.groupSumRow) htmlStr += oThis.createContentLetGroupSumRow('numCol', this.value);
            }
        });
    }
    return htmlStr;
};

var re_getGroupIndex = function re_getGroupIndex(row, index, rowObj) {
    var groupField = this.options.groupField,
        oThis = this;

    if (groupField) {
        // 对于已经渲染之后可以哦天哪过此方式处理
        // if (this.showType == 'grid') {
        //     var value = this.getString($(row).attr(groupField), '');
        //     var $tds = $("td:contains(" + value + ")");
        //     if ($tds.length > 0) {
        //         var td = $tds[$tds.length - 1];
        //         var $tr = $(td).closest('tr');
        //         var $table = $tr.closest('table');
        //         var index = $table.find('tr[role="row"]').index($tr[0]);
        //         return index;
        //     }
        // }else{
        var value = this.getString($(row).attr(groupField), '');
        var nowIndex = -1;
        this.dataSourceObj.addOneRowGroup(rowObj);

        $.each(this.dataSourceObj.rows, function (i) {
            var nowRow = this;
            var nowValue = oThis.getString($(nowRow.value).attr(groupField), '');
            if (value == nowValue) {
                nowIndex = i;
            } else {
                if (nowIndex > -1) {
                    return false;
                }
            }
        });
        if (nowIndex > -1) {
            return nowIndex + 1;
        } else {
            return nowIndex = this.dataSourceObj.rows.length;
        }
        // }
    }
    return index;
};

var getGroupRowByGroupValue = function getGroupRowByGroupValue(groupValue) {
    var groupRow;
    if (this.dataSourceObj.groupRows && this.dataSourceObj.groupRows.length > 0) {
        $.each(this.dataSourceObj.groupRows, function () {
            var nowGroupRow = this;
            if (nowGroupRow.value == groupValue) {
                groupRow = this;
                return false;
            }
        });
        return groupRow;
    }
};

var deleteOneRowGroup = function deleteOneRowGroup(rowObj) {
    var groupField = this.options.groupField,
        groupValue = rowObj.value[groupField];
    var groupRow = this.getGroupRowByGroupValue(groupValue);
    if (groupRow) {
        var index = groupRow.rows.indexOf(rowObj);
        groupRow.rows.splice(index, 1);
        if (groupRow.rows.length == 0) {
            var groupIndex = this.dataSourceObj.groupRows.indexOf(groupRow);
            this.dataSourceObj.groupRows.splice(groupIndex, 1);
        }
    }
};

var resetGroupFieldTd$1 = function resetGroupFieldTd(groupValue) {
    var $tds = $('#' + this.options.id + '_content_table').find('td[realValue=' + groupValue + ']');
    var l = $tds.length;
    $tds.addClass('u-grid-content-td-group-field').addClass('no-text').removeClass('group-last');
    $($tds[l - 1]).addClass('group-last');
    $($tds[0]).css('line-height', l * this.options.rowHeight + 'px').removeClass('no-text');
};
var groupFunObj = {
    createContentGroupRows: createContentGroupRows$1,
    createContentLeftMultiSelectGroupRows: createContentLeftMultiSelectGroupRows$1,
    createContentLeftNumColGroupRows: createContentLeftNumColGroupRows$1,
    getGroupIndex: re_getGroupIndex,
    getGroupRowByGroupValue: getGroupRowByGroupValue,
    deleteOneRowGroup: deleteOneRowGroup,
    resetGroupFieldTd: resetGroupFieldTd$1
};

// 后续和createSumRow整合
var createContentGroupSumRow = function createContentGroupSumRow(groupRow, createFlag) {
    if (this.options.groupSumRow) {
        var oThis = this,
            idStr,
            groupValue = groupRow.value;
        if (createFlag == 'fixed') {
            idStr = 'fixed_';
        } else {
            idStr = '';
        }
        var htmlStr = '<tr role="groupsumrow" groupValue="' + groupValue + '" class="u-grid-content-group-sum-row" id="' + this.options.id + '_content_' + idStr + 'group_sum_row_' + groupValue + '">';
        htmlStr += createContentGroupSumRowTd.call(this, groupRow, createFlag);
        htmlStr += '</tr>';
        return htmlStr;
    }
};

var createContentGroupSumRowTd = function createContentGroupSumRowTd(groupRow, createFlag) {
    var htmlStr = '',
        oThis = this,
        gridCompColumnArr;
    if (createFlag == 'fixed') {
        gridCompColumnArr = this.gridCompColumnFixedArr;
    } else {
        gridCompColumnArr = this.gridCompColumnArr;
    }
    $.each(gridCompColumnArr, function () {
        var f = this.options.field;
        var precision = this.options.precision;
        var dataType = this.options.dataType;
        var sumValue = oThis.dataSourceObj.getGroupSumValue(f, this, groupRow);
        if (dataType == 'float') {
            var o = {};
            o.value = sumValue;
            o.precision = precision ? precision : 2;
            sumValue = oThis.DicimalFormater(o);
        }
        var tdStyle = '';
        if (!this.options.visible) {
            tdStyle = 'style="display:none;';
            if (oThis.options.rowHeight) {
                tdStyle += 'height:' + oThis.options.rowHeight + 'px;line-height:' + oThis.options.rowHeight + 'px;';
            }
            tdStyle += '"';
        } else {
            if (oThis.options.rowHeight) {
                tdStyle += 'style="height:' + oThis.options.rowHeight + 'px;line-height:' + oThis.options.rowHeight + 'px;"';
            }
        }
        htmlStr += '<td role="groupsumrowcell"  title="' + sumValue + '" ' + tdStyle + '>';
        if (this.firstColumn) {
            htmlStr += '<div class="u-gird-centent-group-sum-div"><span>' + oThis.transMap.ml_group_sum + '</span></div>';
        }
        var contentStyle = '';
        if (this.options.dataType == 'integer' || this.options.dataType == 'float') {
            contentStyle = 'style="text-align: right;"';
        }
        htmlStr += '<div class="u-grid-content-td-div" ' + contentStyle + '><span value="' + sumValue + '">' + sumValue + '</span></div></td>';
    });
    return htmlStr;
};

var createContentLetGroupSumRow = function createContentLetGroupSumRow(type, groupValue) {
    var w,
        hStr = '';
    if (type == 'multiSelect') w = this.multiSelectWidth;
    if (type == 'numCol') w = this.numWidth;
    var wStr = 'width:' + w + 'px;';

    if (!this.options.needResetHeight) {
        hStr = 'height:' + (this.options.rowHeight + 1) + 'px;';
    }
    var html = '<span groupValue="' + groupValue + '" class="u-grid-content-group-sum-left" style=" ' + wStr + hStr + '"></span>';
    return html;
};

var repairGroupSumRow$1 = function repairGroupSumRow(rowObj) {
    if (this.options.groupSumRow) {
        var oThis = this,
            groupField = this.options.groupField,
            groupValue = rowObj.value[groupField];
        if (!this.repairGroupSumRowArr) {
            this.repairGroupSumRowArr = [];
        }
        if (this.repairGroupSumRowArr.indexOf(groupValue) < 0) {
            this.repairGroupSumRowArr.push(groupValue);
        }
        if (this.re_repairGroupSumRowSetTimeout) clearTimeout(this.re_repairGroupSumRowSetTimeout);
        this.re_repairGroupSumRowSetTimeout = setTimeout(function () {
            repairGroupSumRowFun.call(oThis);
        }, 200);
    }
};

var repairGroupSumRowFun = function repairGroupSumRowFun() {
    var oThis = this;
    if (this.repairGroupSumRowArr && this.repairGroupSumRowArr.length > 0 && this.options.groupSumRow) {
        $.each(this.repairGroupSumRowArr, function () {
            var groupValue = this,
                groupRow = oThis.getGroupRowByGroupValue(groupValue);
            if (groupRow) {
                var $tr = $('#' + oThis.options.id + '_content_tbody').find('tr[groupValue=' + groupValue + ']');
                if ($tr.length > 0) {
                    var htmlStr = createContentGroupSumRowTd.call(oThis, groupRow);
                    $tr.html(htmlStr);
                } else {
                    var htmlStr = oThis.createContentGroupSumRow(groupRow);
                    var $tds = $('#' + oThis.options.id + '_content_tbody').find("td:contains(" + groupValue + ")");
                    if ($tds.length > 0) {
                        var td = $tds[$tds.length - 1];
                        var $tr = $(td).closest('tr');
                        var index = $tr.parent().find('tr[role="row"]').index($tr[0]);
                        $tr[0].insertAdjacentHTML('afterEnd', htmlStr);
                        if (oThis.options.multiSelect) {
                            var mulStr = oThis.createContentLetGroupSumRow('multiSelect', groupValue);
                            var muldiv = $('#' + oThis.options.id + '_content_multiSelect').find('div')[index];
                            muldiv.insertAdjacentHTML('afterEnd', mulStr);
                        }
                        if (oThis.options.showNumCol) {
                            var numStr = oThis.createContentLetGroupSumRow('numCol', groupValue);
                            var numdiv = $('#' + oThis.options.id + '_content_numCol').find('div')[index];
                            numdiv.insertAdjacentHTML('afterEnd', numStr);
                        }
                    }
                }
            } else {
                var $tr = $('#' + oThis.options.id + '_content_tbody').find('tr[groupValue=' + groupValue + ']');
                if ($tr.length > 0) {
                    $tr.remove();
                    if (oThis.options.showNumCol) {
                        var $span = $('#' + oThis.options.id + '_content_numCol').find('span[groupValue=' + groupValue + ']');
                        $span.remove();
                    }
                    if (oThis.options.multiSelect) {
                        var $span = $('#' + oThis.options.id + '_content_multiSelect').find('span[groupValue=' + groupValue + ']');
                        $span.remove();
                    }
                }
            }
        });
        this.resetLeftHeightGroupSumFun();
    }
    this.repairGroupSumRowArr = [];
};

var resetLeftHeightGroupSumFun$1 = function resetLeftHeightGroupSumFun() {
    if ((this.options.showNumCol || this.options.multiSelect) && this.options.groupSumRow) {
        var $trs = $('#' + this.options.id + '_content_tbody tr[role="groupsumrow"]');
        var $leftNums = $('#' + this.options.id + '_content_numCol span');
        var $leftSelects = $('#' + this.options.id + '_content_multiSelect > span');
        for (var i = 0; i < $trs.length; i++) {
            var nowRowHeight = $trs[i].offsetHeight;
            if ($leftNums[i]) {
                $leftNums[i].style.height = nowRowHeight + 'px';
                // $leftNums[i].style.lineHeight = nowRowHeight + 'px';
            }

            if ($leftSelects[i]) {
                $leftSelects[i].style.height = nowRowHeight + 'px';
                // $leftSelects[i].style.lineHeight = nowRowHeight + 'px';
            }
        }
    }
};

var renderTypeGroupSumRow$1 = function renderTypeGroupSumRow(gridCompColumn, i, isFixedColumn, rowObj) {
    var oThis = this;
    var sumCol = gridCompColumn.options.sumCol;
    var groupField = this.options.groupField;
    if (sumCol && groupField) {
        var groupValue = this.getString($(rowObj.value).attr(groupField), '');
        var groupSumRenderType = gridCompColumn.options.groupSumRenderType;
        var dataType = gridCompColumn.options.dataType;
        var idStr = isFixedColumn === true ? 'fixed_' : '';
        var sumSpans = $('#' + this.options.id + '_content_' + idStr + 'group_sum_row_' + groupValue).find('td').eq(i).find('span');
        var sumSpan = sumSpans[sumSpans.length - 1];
        if (sumSpan) {
            if (typeof groupSumRenderType == 'function') {
                var sumV = $(sumSpan).attr('value');
                var obj = {};
                obj.value = sumV;
                obj.element = sumSpan;
                obj.gridObj = oThis;
                obj.gridCompColumn = gridCompColumn;
                groupSumRenderType.call(oThis, obj);
            } else if (dataType == 'integer' || dataType == 'float') {
                sumSpan.style.textAlign = 'right';
            }
        }
    }
};
var groupSumRowFunObj = {
    createContentGroupSumRow: createContentGroupSumRow,
    createContentLetGroupSumRow: createContentLetGroupSumRow,
    repairGroupSumRow: repairGroupSumRow$1,
    resetLeftHeightGroupSumFun: resetLeftHeightGroupSumFun$1,
    renderTypeGroupSumRow: renderTypeGroupSumRow$1
};

var gridComp = function gridComp(ele, options) {
    classCallCheck(this, gridComp);

    this.init(ele, options);
    this.initGrid();
};


var gridCompProto = gridComp.prototype;
if (!Object.assign) {
    Object.assign = u.extend;
}
Object.assign(gridCompProto, createFunObj);
Object.assign(gridCompProto, createCalFunOjb);
Object.assign(gridCompProto, eventFunObj);
Object.assign(gridCompProto, getFunObj);
Object.assign(gridCompProto, initFunObj$2);
Object.assign(gridCompProto, operateRowFunObj);
Object.assign(gridCompProto, renderTypeFunObj);
Object.assign(gridCompProto, setFunObj);
Object.assign(gridCompProto, wdChangeFunObj);
Object.assign(gridCompProto, clickFunObj);
Object.assign(gridCompProto, otherFunObj);
Object.assign(gridCompProto, utilFunOjb);

/*
 * colmuenu
 */
var oldInitGridCompColumn = gridCompProto.initGridCompColumn;
var oldInitEventFun = gridCompProto.initEventFun;
var oldInitGridEventFun = gridCompProto.initGridEventFun;

gridCompProto.initGridCompColumnColumnMenuFun = re_initGridCompColumnColumnMenuFun;
gridCompProto.initGridCompColumn = function () {
    // 执行原有方法
    oldInitGridCompColumn.apply(this, arguments);
    colMenu_initGridCompColumn.apply(this, arguments);
};
gridCompProto.createColumnMenu = re_createColumnMenu;
gridCompProto.initEventFun = function () {
    // 执行原有方法
    oldInitEventFun.apply(this, arguments);
    colMenu_initEventFun.apply(this, arguments);
};
gridCompProto.initGridEventFun = function () {
    // 执行原有方法
    oldInitGridEventFun.apply(this, arguments);
    colMenu_initGridEventFun.apply(this, arguments);
};

if (typeof gridCompProto.saveGridCompColumnArrToLocal == 'undefined') {
    gridCompProto.saveGridCompColumnArrToLocal = function () {};
}
if (typeof gridCompProto.clearLocalData == 'undefined') {
    gridCompProto.clearLocalData = function () {};
}

/*
 * grag
 */
var oldInitEventFun_grag = gridCompProto.initEventFun;
var oldInitGridEventFun_grag = gridCompProto.initGridEventFun;
Object.assign(gridCompProto, dragFunObj);
gridCompProto.initEventFun = function () {
    // 执行原有方法
    oldInitEventFun_grag.apply(this, arguments);
    dragFunObj.drag_initEventFun.apply(this, arguments);
};
gridCompProto.initGridEventFun = function () {
    // 执行原有方法
    oldInitGridEventFun_grag.apply(this, arguments);
    dragFunObj.drag_initGridEventFun.apply(this, arguments);
};
if (typeof gridCompProto.saveGridCompColumnArrToLocal == 'undefined') {
    gridCompProto.saveGridCompColumnArrToLocal = function () {};
}

/*
 * edit
 */
var oldInitEventFun_edit = gridCompProto.initEventFun;
Object.assign(gridCompProto, eidtFunObj);

if (typeof gridCompProto.formEditCell == 'undefined') {
    gridCompProto.formEditCell = function () {};
}

gridCompProto.initEventFun = function () {
    // 执行原有方法
    oldInitEventFun_edit.apply(this, arguments);
    eidtFunObj.edit_initEventFun.apply(this, arguments);
};

/*
 * editForm
 */
var oldInitDefault = gridCompProto.initDefault;
var oldSetRequired = gridCompProto.setRequired;
Object.assign(gridCompProto, editFromFunObj);
gridCompProto.initDefault = function () {
    // 执行原有方法
    oldInitDefault.apply(this, arguments);
    editFromFunObj.editForm_initDefault.apply(this, arguments);
};
gridCompProto.setRequired = function () {
    // 执行原有方法
    oldSetRequired.apply(this, arguments);
    editFromFunObj.editForm_setRequired.apply(this, arguments);
};

/*
 * fixed
 */
var oldColumnsVisibleFun = gridCompProto.columnsVisibleFun;
Object.assign(gridCompProto, fixFunObj);
gridCompProto.columnsVisibleFun = function () {
    // 执行原有方法
    oldColumnsVisibleFun.apply(this, arguments);
    fixFunObj.fixed_columnsVisibleFun.apply(this, arguments);
};

/*
 * formShow
 */
Object.assign(gridCompProto, formShowFunOjb);

/*
 * headerLevel
 */
Object.assign(gridCompProto, headerLevelFunObj);

/*
 * localStorage
 */
Object.assign(gridCompProto, localStorageFunObj);

/*
 * overWidthColumn
 */
Object.assign(gridCompProto, overWidthHiddenFunObj);

/*
 * sort
 */
var oldInitEventFun_sort = gridCompProto.initEventFun;
var oldInitGridEventFun_sort = gridCompProto.initGridEventFun;
Object.assign(gridCompProto, sortFunObj);
gridCompProto.initEventFun = function () {
    // 执行原有方法
    oldInitEventFun_sort.apply(this, arguments);
    sortFunObj.sort_initEventFun.apply(this, arguments);
};
gridCompProto.initGridEventFun = function () {
    // 执行原有方法
    oldInitGridEventFun_sort.apply(this, arguments);
    sortFunObj.sort_initGridEventFun.apply(this, arguments);
};

/*
 * sumRow
 */
Object.assign(gridCompProto, sumRowFunObj);

/*
 * swap
 */
var oldInitEventFun_swap = gridCompProto.initEventFun;
var oldInitGridEventFun_swap = gridCompProto.initGridEventFun;
Object.assign(gridCompProto, swapFunObj);

gridCompProto.initEventFun = function () {
    // 执行原有方法
    oldInitEventFun_swap.apply(this, arguments);
    swapFunObj.swap_initEventFun.apply(this, arguments);
};
gridCompProto.initGridEventFun = function () {
    // 执行原有方法
    oldInitGridEventFun_swap.apply(this, arguments);
    swapFunObj.swap_initGridEventFun.apply(this, arguments);
};

/*
 * rowDrag
 */

// var oldInitEventFun_rowDrag= gridCompProto.initEventFun;
var oldInitGridEventFun_rowDrag = gridCompProto.initGridEventFun;
Object.assign(gridCompProto, rowDragFunObj);

gridCompProto.initGridEventFun = function () {
    // 执行原有方法
    oldInitGridEventFun_rowDrag.apply(this, arguments);
    rowDragFunObj.rowDrag_initGridEventFun.apply(this, arguments);
};

/*
 * tree
 */
Object.assign(gridCompProto, treeFunObj);

/*
 * group
 */
Object.assign(gridCompProto, groupFunObj);

/*
 * groupsum
 */
Object.assign(gridCompProto, groupSumRowFunObj);

/*
 * 对象所支持的属性及默认值
 */

var old = $.fn.grid;
// 方法扩展
$.fn.grid = function (options) {
	var grid = $(this).data('gridComp');
	if (!grid) $(this).data('gridComp', grid = new gridComp(this, options));
	return grid;
};
$.fn.grid.gridComp = gridComp;
$.fn.grid.gridCompColumn = column;
$.fn.grid.dataSource = dataSource;

$.fn.grid.noConflict = function () {
	$.fn.grid = old;
	return this;
};

}());
