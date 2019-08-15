var oldNcRefCompInit = u.NcRefComp.prototype.init;
u.NcRefComp.prototype.init = function () {
  oldNcRefCompInit.apply(this, arguments);

  var oThis = this;
  this.dataModel.on(this.field + '.valuechange', function (v, b) {
    var rel = oThis.options.rel;
    // 非grid参照
    if (!rel) {
      return;
    }

    var ref = $('#refContainer' + oThis.fieldId).data('uui.refer');
    if (ref && ref.values && ref.values.length > 0) {
      if (v.newValue) {
        // 处理允许多选的情况
        if (ref.options && ref.options.isMultiSelectedEnabled) {
          // 构造新对象存储对应关系
          var relvalue = {};
          for (var i = 0; i < ref.values.length; i++) {
            var va = ref.values[i];
            if (va && va["refpk"]) {
              for (var f in va) {
                var datatableField = rel[f];
                if (datatableField) {
                  if (!relvalue[datatableField]) {
                    relvalue[datatableField] = va[f];
                  } else {
                    relvalue[datatableField] += ("," + va[f]);
                  }
                }
              }
            }
          }
          for (var field in relvalue) {
            oThis.dataModel.setValue(field, relvalue[field]);
          }
        } else {
          var va = ref.values[0];
          if (va && va["refpk"]) {
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
      else if (!v.newValue && v.oldValue) {
        for (var relKey in rel) {
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