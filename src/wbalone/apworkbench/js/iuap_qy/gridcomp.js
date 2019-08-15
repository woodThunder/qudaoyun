var gridCompProto = $.fn.grid.gridComp.prototype;
gridCompProto.initOptionsTree = function() {

}

gridCompProto.initGrid  = function() {
		if(!this.options.columns || this.options.columns.length == 0){
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
		this.inte = setInterval(function(){oThis.setIntervalFun.call(oThis)}, 300);
	},

gridCompProto.createContentLeft = function() {
		var oThis = this,htmlStr = "",left = 0,hStr;
		if(this.options.multiSelect){
			htmlStr += '<div class="u-grid-content-left" id="' + this.options.id + '_content_multiSelect" style="width:' + this.multiSelectWidth + 'px;' + hStr + '">';
			// 遍历生成所有行
			if (this.dataSourceObj.rows) {
				$.each(this.dataSourceObj.rows, function(i) {
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
				$.each(this.dataSourceObj.rows, function(i, row) {
					htmlStr += oThis.createContentLeftNumColRow(i, row.value);
				});
			}
			htmlStr += '</div>';
		}
		return htmlStr;
	}


gridCompProto.createContentLeftNumColRow = function(index, row) {
	if(this.options.showTree) {
		if(!row.parentId) {
			return '<div style="width:' + this.numWidth + 'px;" class="u-grid-content-num topLevel">' + (this.treeNumCounter++) + '</div>';
		} else {
			return '<div style="width:' + this.numWidth + 'px;display:none;" class="u-grid-content-num"></div>';;
		}
	}
	var htmlStr = '<div style="width:' + this.numWidth + 'px;" class="u-grid-content-num">' + (index+1) + '</div>';
	return htmlStr;
}
var oriResetNumCol = gridCompProto.resetNumCol;
gridCompProto.resetNumCol = function() {
	if(!this.options.showTree) {
		return oriResetNumCol.call(this);
	}
	var numCols = $('#' + this.options.id + '_content_numCol >.u-grid-content-num');
  var num = 1;
	$.each(numCols,function(i){
		if(u.hasClass(this, 'topLevel')) {
			this.innerHTML = num++;
		}
	});
}

var oriClickFunTree = gridCompProto.clickFunTree;
gridCompProto.clickFunTree = function(e) {
	oriClickFunTree.call(this,e);
	var trs = $('#' + this.options.id + '_content_table > tbody > tr');
	var numCols = $('#' + this.options.id + '_content_numCol >.u-grid-content-num');

	$.each(trs,function(i, tr){
		var visible = $(tr).is(":visible"), $num = $(numCols[i])
		if(visible) {
			$num.show();
		} else {
			$num.hide();
		}
	})

}
var oldCreateHeader = gridCompProto.createHeader;

gridCompProto.createHeader = function() {
	var oldHtmlStr = oldCreateHeader.call(this);
	var htmlStr = oldHtmlStr.replace('<div class="u-grid-header-num" style="width:' + this.numWidth + 'px;"></div>', '<div class="u-grid-header-num" style="width:' + this.numWidth + 'px;">序号</div>');
	return htmlStr;
}


//复写grid默认参数设置
var oldinitDefault = gridCompProto.initDefault;
gridCompProto.initDefault = function() {
	oldinitDefault.call(this);
	this.defaults.needLocalStorage = false;
	this.defaults.noScroll = false;
	this.defaults.columnMenu = true;//默认可以显示菜单列按钮
	this.defaults.sortable = true;//默认可以列排序
	this.defaults.canDrag = true;//默认可以拖动列
	this.defaults.canSwap = true;//默认可以交换列
	this.defaults.contentSelect = false;//默认点击不会选中该行
	this.defaults.cancelFocus = false;//默认再次点击行时不会取消选中
	this.defaults.columnMenuType = 'border';
	this.defaults.fixedFloat = 'right';
	this.defaults.rowHeight =  40; // 行高
	this.defaults.headerHeight = 46;
}
var oldInitOptions = gridCompProto.initOptions;
gridCompProto.initOptions = function() {
    oldInitOptions.call(this);

    var oldAfterCreate = this.options.afterCreate;
    this.options.afterCreate = function() {
        if (typeof oldAfterCreate == 'function') {
            oldAfterCreate.call(this);
        }
        $('#' + this.options.id + '_content_div').perfectScrollbar({
            wheelSpeed: 20,
            wheelPropagation: false
        });
    }
}
var oldRowGetSimpleData = Row.prototype.getSimpleData;
Row.prototype.getSimpleData = function(){
  var _data = oldRowGetSimpleData.apply(this,arguments);
  _data.persistStatus = this.status;
  return _data
}


// 复写分页全局配置
u.pagination.prototype.DEFAULTS.showBtnOk = false;
