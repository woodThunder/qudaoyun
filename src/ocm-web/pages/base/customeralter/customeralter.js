define([
    "text!./customeralter.html",
    "ocm_common",
    "ocm_baseview",
    "./meta.js",
], function (tpl, common, baseview, model) {
    "use strict";
    var viewModel;
    var view = baseview.extend({
        beforeCreate: function () {
            viewModel = this.viewModel;
        },
		tpl: tpl,
		model: model,
		baseData : {
			baseurl : '/base/customer-alters',
			CustomerAlterList: new u.DataTable(model.options.metas.CustomerAltermeta),
            searchcomp: {},
            searchSource: model.options.searchs.search1,
			grid1Option: model.options.grids.grid1,
            alterSourceSrc: ko.observableArray([]),
	    },
		events: {
			//根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
			search: function (reindex) {
				setTimeout(function () {
					if(reindex){
						viewModel.CustomerAlterList.pageIndex(0);
					}

					
					viewModel.CustomerAlterList.removeAllRows();
					var queryData = viewModel.searchcomp.getDataWithOpr();

					console.log(queryData);
					var modifierRefer = $("#refContainermodifier").data("uui.refer");
					if(modifierRefer.values) {
						queryData['search_EQ_modifier'] = modifierRefer.values[0].refname;
					}
					queryData.size = viewModel.CustomerAlterList.pageSize();
					queryData.page = viewModel.CustomerAlterList.pageIndex();
					$._ajax({
						type:"get",
						url:appCtx + viewModel.baseurl,
						dataType:"json",
						data:queryData,
						success:function(data){
							viewModel.CustomerAlterList.setSimpleData(data.content,{unSelect:true});
							viewModel.CustomerAlterList.totalRow(data.totalElements);
							viewModel.CustomerAlterList.totalPages(data.totalPages);
						}
					})
				},0)
			},
			//清空搜索条件
			cleanSearch: function () {
				viewModel.searchcomp.clearSearch();
			},
			//页码改变时的回调函数
			pageChange: function (index) {
				viewModel.CustomerAlterList.pageIndex(index);
				viewModel.search();
			},
			//页码改变时的回调函数
			sizeChange: function (size) {
				viewModel.CustomerAlterList.pageSize(size);
				viewModel.search(true);
			}
		},
		afterCreate: function() {
            // 选择上传文件后，直接调用上传方法
            $("#fileiptwrap").on("change", "#uploadbatch_id", function () {
                if (this.value) {
                    viewModel.onFileUploadCustomer();
                }
            });

			//枚举
            $._ajax({
                type: "get",
                url: window.pathMap.base + "/cust-doc-defs/cust_doc_code/batch",
                data: {
                    cust_doc_code_batch: "QY107"
                },
                success: function (data) {
                    var newarray;
                    newarray = common.dataconvert.toMap(data["QY107"], "name", "code");
                    viewModel.alterSourceSrc(newarray);
                }
            });
		}
	});
	return view;
});
