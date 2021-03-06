var oldNcRefCompInit = u.NcRefComp.prototype.init;
u.NcRefComp.prototype.init = function() {
  oldNcRefCompInit.apply(this, arguments);

  var oThis = this;
  this.dataModel.on(this.field + '.valuechange', function(v, b) {
    var ref = $('#refContainer' + oThis.fieldId).data('uui.refer');
    var rel = oThis.options.rel;
    // 非grid参照
    if (!rel) {
      return;
    }
    if (ref && ref.values && ref.values.length > 0) {
    	if(v.newValue) {
				for (var i = 0; i < ref.values.length; i++) {
	        var va = ref.values[i];
          if(va && va["refpk"]) {
            for (var f in va) {
              var datatableField = rel[f];
              if (datatableField) {
                var value = va[f];
                oThis.dataModel.setValue(datatableField, value);
              }
            }
          }
      	}
    	}
      // 清空参照同时清空相关rel值
      else if(!v.newValue && v.oldValue) {
        for(var relKey in rel) {
          var relField = rel[relKey];
          v.rowObj.setValue(relField, "");
        }
      }

      // setTimeout(function() {
//    var rowObj = oThis.dataModel.getCurrentRow();
      var rowObj = v.rowObj;
      var fieldName = oThis.field;
      var e = {
        eventType: 'dataTableEvent',
        dataTable: rowObj.parent.id,
        rowId: rowObj.rowId,
        field: fieldName,
        oldValue: '',
        newValue: rowObj.getValue(fieldName),
        ctx: "",
        rowObj: rowObj
      }
      oThis.dataModel.trigger(DataTable.ON_VALUE_CHANGE, e)
      // },100);
    }
  })
}

$.fn.Refer.defaults.cancelNormal = true;
/*
此部分为更新参照源码的说明，不要删除！！！！！！！
需要测试grid中通过下拉以及弹框两种方式选择后查看带入的多字段是否都存在
// szyx chagne begin   和// szyx chagne end 之间为修改内容

refGrid.js
refer.js


*/

//grid中使用参照带出多个值
{/* <div options='{"field":"officeId","dataType":"String","title":"办事处","renderType":"ncReferRender","editType":"ncReferEditType","showField":"officeName","editOptions":{"validType":"string","rel":{"refpk":"officeId","refname":"officeName"}}}'></div> */}

//普通输入框中使用参照带出多个值
{/* <div u-meta='{"type":"uiRefer","data":"AdjustmentFloatingCoefficientList","field":"floatCoefficientId",\
"rel":{"refpk":"floatCoefficientId","refcode":"floatCoefficientCode","refname":"floatCoefficientName"}}'>
          <input readonly="readonly"/>
          <span class="ui-icon uifont icon-bar refer"></span>
        </div> */}
