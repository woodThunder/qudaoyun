/**
 * 表格类型参照（包括单选和多选）
 */
+ function($) {
//define(['jquery'], function($) {
		var gridViewModel = {
			/**
			 * 单选表格
			 */
			referbindGridEvent : function (referModel) {
				var ReferFn=$.Refer.exports;
				var that = referModel;
		        that.$el.find('.refer_results2').append(_.template(that.getGridTpl())({}));
		        that.$el.find('.hotData').append(_.template(that.getGridhotTpl())({})); //常用数据
		        that.$el.find('.refer_results2').on('click', '.refer_nav li', function (e) {
		            var $that = $(this);
		            var isRefresh = $that.hasClass('ref_class_refresh');
		            var selectedData = $that.hasClass('selectedData');
		            var searchInput = $that.hasClass('searchInput');
		            if(searchInput){
		            	$that.find("input[type='text']").focus();
		            	return;
		            }
		            if (isRefresh || selectedData) {
		                return;
		            }
		            that.selectedTab = $that;
		            var currentIndex = that.$el.find('.refer_nav li.action').toggleClass('action').attr('index');
		            var clickedIndex = $that.attr('index');
		            var condition = $that.attr('condition');

		            if ("1" === clickedIndex) {
		                that.refreshHotData(true);
		            } else if ("2" === clickedIndex) {
						that.loadData();
		            }else if(that.isLocalModel && that.options.data.length>0){
		            	var datas = that.options.data.slice(0) ;
		                that.$el.find(".msgtype-table").bootstrapTable('load', {data: datas});
		                that.$el.find(".fixed-table-header").css('background', '#EBEFF0');
		            }

		            e.stopPropagation();//当前dom结果结构发生变化，阻止错误事件

		            that.$el.find('.ul_list' + currentIndex).hide();
		            that.$el.find('.ul_list' + clickedIndex).show();
		            //that.$el.find('.nav_list' + clickedIndex).toggleClass('action');
		            that.$el.find('.nav_list' + clickedIndex).addClass('action');

		            //that.addScroll();
		        });
		        //点击搜索图标
		        that.$el.find('.refer_results2').on('click', '.refer_nav li .pic-search,.refer_nav li .btn-search', function (e) {
		        	var searchContent = that.$el.find('.refer_nav li.searchInput input[type="text"]').val();
		        	that.searchFlag = true;
		        	if(that.options.isApp){
		        		that.trigger("serachData",searchContent,that.options);
		        	}else{
		        		that.loadData(true,searchContent);
		        	}
		        });

		        //zhanghy7-begin
		         //qy点击搜索
		        that.$el.find('.refer_nav li.searchInput input[type="text"]').on('keydown', function(event) {
                		if (event.keyCode === 13) {
                    			var searchContent = that.$el.find('.refer_nav li.searchInput input[type="text"]').val();
                    			that.searchFlag = true;
                    			if (that.options.isApp) {
                        			that.trigger("serachData", searchContent, that.options);
                    			} else {
                        			that.loadData(true, searchContent, 0);
                    			}
                		}
            		})
		        that.$el.find('.refer_nav').on('click', '.searchInput .num-search', function (e) {
		        	var searchContent = that.$el.find('.refer_nav li.searchInput input[type="text"]').val();
		        	that.searchFlag = true;
		        	if(that.options.isApp){
		        		that.trigger("serachData",searchContent,that.options);
		        	}else{
                        //跟点击加载冲突，e.originalEvent区分 加载更多和搜索（临时解决）
                        if(e.originalEvent){
                            that.loadData(true,searchContent,0);
                        }
		        	}
		        });
		        //zzz-e
		        //点击搜索全部
//		        that.$el.find('.refer_results2').on('click', '.refer_nav li .btn-search', function (e) {
//		        	var searchContent = that.$el.find('.refer_nav li.searchInput input[type="text"]').val();
//		        	that.searchFlag = true;
//		        	that.loadData(true,searchContent);
//		        });
		        that.$el.find('.refer_results2').on('click', '.refer_list2 li', function () {
		            var refpk = $(this).attr('pk');
					var refname = $(this).attr('name');
					var refcode = $(this).attr('code');
		              var item = {};
		                item.refpk = refpk;
		                item.refname = refname;
		                item.refcode = refcode;
		                that.setValue([item]);
		                ReferFn.updateHotData(that.options.getRefHotDataKey(), item, that.options.hotDataSize);
		                that.hide();
		        });

		        var cols = that.buildTableColumn(that.options.isMultiSelectedEnabled);


				var rowclick= function (row) {
								var item = {};
				                item.refpk = row.refpk;
				                item.refname = row.refname;
				                item.refcode = row.refcode;
				                /*
				                zhanghy7-begin
								将行数据和行对象作为$.Refer对象的属性供refer中的.btn-grid-ok的click事件调用
				                */
				                $.Refer['gridItem'] = item;
				                $.Refer['row'] = row;
				                // ReferFn.updateHotData(that.options.getRefHotDataKey(), row, that.options.hotDataSize);
				                // that.hide();
				                /*
				                zhanghy7-end
								将行数据和行对象作为$.Refer对象的属性供refer中的.btn-grid-ok的click事件调用
				                */
		            		}

		        that.$el.find(".msgtype-table").bootstrapTable({
		            onClickRow:rowclick,
		            columns: cols
		        });

		        that.$el.find(".msgtype-table2").bootstrapTable({
		            onClickRow:rowclick,
		            columns: cols,
		            formatNoMatches: function () {
		                return '';
		            }
		        });

		        that.$el.find(".fixed-table-header").css('background', '#EBEFF0');
		         that.addScroll(true);

		        that.$el.find('.ref_class_refresh').on('click', 'span', function () {
		            var selectedVals = that.$el.find(".msgtype-table").bootstrapTable('getSelections');
		            that.searchFlag = false; //刷新之后将搜索标志位置为false
		            that.$el.find('.refer_nav li.searchInput input[type="text"]').val("");//刷新之后将搜索框内容置为空
					if(that.isLocalModel){
						 var datas = that.options.data;
		                 that.$el.find(".msgtype-table").bootstrapTable('load', {data: datas});
					}else{
						// that.showLoading();
			            that.ajax({
							url: that.getListUrl(),
			                type: "post",
			                data: that.getRefParam(true),
			                traditional: true,
			                async: true,
			                dataType: "json",
			                success: function (data) {

			                    var datas =  data.data;
                                if ((!!window.ActiveXObject || "ActiveXObject" in window) && datas.length>0 && data.page.currPageIndex +1==data.page.pageCount){//IE 切最后一页
                                    datas.push({refcode:"",refpk:"test",refname:""});
                                    if(data.page.pageCount==1 ){  //只有1页  多于12行增加空行
										if(datas.length>12){
                                            datas.push({refcode:"",refpk:"test",refname:""});
										}
                                    }else{
                                        datas.push({refcode:"",refpk:"test",refname:""});
                                    }
                                }
                                that.options.data =datas;
			                    datas.length==0 && that.$el.find(".msgtype-table").find("td").html('没有数据');
			                    that.$el.find(".msgtype-table").bootstrapTable('load', {data: datas});
								that.updatePagination(data.page); //分页
			                },
							//modi by yany -begin
							beforeSend: function () {
								that.showLoading();
							},
							//modi by yany -end
							complete: function () {
				                that.hideLoading();
				            }
			            });
					}
					//刷新常用数据
					if (that.$el.find('.refer_nav li.nav_list1').hasClass('action')) {
						that.refreshHotCache = true;
			            that.refreshHotData(true);
					}
		        });
			},
			/**
			 * 多选表格
			 */
			referbindMultiGridEvent : function (referModel) {
				var that = referModel;
				that.$el.find('.refer_results2').append(_.template(that.getGridTpl())({}));
				that.$el.find('.hotData').append(_.template(that.getGridhotTpl())({})); //常用数据
				//切换常用 全部 等页签
		        that.$el.find('.refer_results2').on('click', '.refer_nav li', function (e,sysnDataFlag) {
		            var $that = $(this);
		            var isRefresh = $that.hasClass('ref_class_refresh');
		            var selectedData = $that.hasClass('selectedData');
		            var searchInput = $that.hasClass('searchInput');
		            if(searchInput){
		            	$that.find("input[type='text']").focus();
		            	return;
		            }
		            if (isRefresh || selectedData) {
		                return;
		            }
		            that.selectedTab = $that;
		            var currentIndex = that.$el.find('.refer_nav li.action').toggleClass('action').attr('index');
		            var clickedIndex = $that.attr('index');
		            var condition = $that.attr('condition');
		            var selectData = that.getSelections(null,sysnDataFlag);
		            if ("1" === clickedIndex) {
		                that.refreshHotData(true,selectData);
		            }else if ("2" === clickedIndex) {
						that.loadData(true);
		            }else if(that.isLocalModel && that.options.data.length>0){
		            	var datas = that.options.data;
		                that.$el.find(".msgtype-table").bootstrapTable('load', {data: datas});
		                that.$el.find(".fixed-table-header").css('background', '#EBEFF0');
		            }else if("2" === clickedIndex && that.options.data.length !== 0 && selectData.length >= 0){
		            	var datas = that.options.data;
		            	$.each(datas, function(i, v){
							v.selected = $.grep(selectData, function(e){
								return e.refpk === v.refpk;
							}).length >0;
						});
		                that.$el.find(".msgtype-table").bootstrapTable('load', {data: datas});
		                that.$el.find(".fixed-table-header").css('background', '#EBEFF0');
		                that.uCheckboxInit();
		            }

		            e.stopPropagation(); //当前dom结果结构发生变化，阻止错误事件

		            that.$el.find('.ul_list' + currentIndex).hide();
		            that.$el.find('.ul_list' + clickedIndex).show();
		            //that.$el.find('.nav_list' + clickedIndex).toggleClass('action');
		            that.$el.find('.nav_list' + clickedIndex).addClass('action');

		            //that.addScroll();
		        });
		        //点击搜索图标和搜索全
		        //部
		        that.$el.find('.refer_nav li.searchInput input[type="text"]').on('keydown',function(event){
                              if(event.keyCode===13){
                               var searchContent = that.$el.find('.refer_nav li.searchInput input[type="text"]').val();
                                 that.searchFlag = true;
                                 if(that.options.isApp){
                                         that.trigger("serachData",searchContent,that.options);
                                 }else{
                                         that.loadData(true,searchContent,0);
                                 }


                              }
                        })
		        that.$el.find('.refer_results2,.refer_results_top.qy-grid').on('click', '.refer_nav li .pic-search,.refer_nav li .btn-search,.num-search', function (e) {
		        	var searchContent = that.$el.find('.refer_nav li.searchInput input[type="text"]').val();
		        	that.searchFlag = true;
		        	if(that.options.isApp){
		        		that.trigger("serachData",searchContent,that.options);
		        	}else{
		        		that.loadData(true,searchContent,0);
		        	}
		        });

				//点击常用数据
		        that.$el.find('.refer_results2').on('click', '.refer_list2 li', function () {
		            var refpk = $(this).attr('pk');
		            $.each(that.options.data, function (i, val) {
		                if (val.refpk === refpk) {
		                    val.selected = false;
		                }
		            });
		            that.$el.find(".fixed-table-body .msgtype-table").bootstrapTable('load', {data: that.options.data});
		            that.updateSelectedTab();
		        });

		        var cols = that.buildTableColumn(that.options.isMultiSelectedEnabled);
		        //zhanghy7-begin为多页签多次定义表头
		        var cols_tab = that.buildTableColumn(that.options.isMultiSelectedEnabled,that.options.strFieldCode_tab);
		        //zhanghy7-end为多页签多次定义表头
		        that.$el.find(".msgtype-table").bootstrapTable({
		            onCheck: function (row) {
										// songyd3
										if(!that.hasSelectInOpen(row.refpk)) {
											that.selectedInOpen.push(row);
										}
		                that.updateSelectedTab();
		            },
		            onUncheck: function (row) {
		                that.unSelections(row.id || row.refpk);
		            },
		            onCheckAll: function () {
										// songyd3
										var currClassTableData = that.$el.find(".msgtype-table").bootstrapTable('getData');
										if(currClassTableData && currClassTableData.length > 0) {
											for(var i=0;i<currClassTableData.length;i++) {
												if(!that.hasSelectInOpen(currClassTableData[i].refpk)) {
													that.selectedInOpen.push(currClassTableData[i]);
												}
											}
										}
		                that.updateSelectedTab();
		            },
		            onUncheckAll: function () {
		                var currClassTableData = that.$el.find(".msgtype-table").bootstrapTable('getData');
		                $.each(currClassTableData, function (i, v) {
		                    that.unSelections(v.id || v.refpk);
		                });
		            },
		            columns: cols,
		            formatNoMatches: function () {
		                return '';
		            },
								// songyd3 第二个页签中表格数据变化后事件，为表格选中已选项
								onPostBody: function() {
									var selectedInOpenIds = [];
									if(that.selectedInOpen && that.selectedInOpen.length > 0) {
										for(var i=0;i<that.selectedInOpen.length;i++) {
											selectedInOpenIds.push(that.selectedInOpen[i].refpk);
										}
									}
									that.$el.find(".msgtype-table").bootstrapTable("checkBy", {field:"refpk",values: selectedInOpenIds});
								}
		        });
				//常用
				//zhanghy7-begin为多页签多次定义表头
				if(that.options.hasTab){
					that.$el.find(".msgtype-table2").bootstrapTable({
			            onCheck: function (row) {
										// songyd3
										if(!that.hasSelectInOpen(row.refpk)) {
											that.selectedInOpen.push(row);
										}
			                that.updateSelectedTab();
			            },
			            onUncheck: function (row) {
			                that.unSelections(row.id || row.refpk);
			            },
			            onCheckAll: function () {
											// songyd3
											var currClassTableData = that.$el.find(".msgtype-table2").bootstrapTable('getData');
											if(currClassTableData && currClassTableData.length > 0) {
												for(var i=0;i<currClassTableData.length;i++) {
													if(!that.hasSelectInOpen(currClassTableData[i].refpk)) {
														that.selectedInOpen.push(currClassTableData[i]);
													}
												}
											}
			                that.updateSelectedTab();
			            },
			            onUncheckAll: function () {
			                var currClassTableData = that.$el.find(".msgtype-table2").bootstrapTable('getData');
			                $.each(currClassTableData, function (i, v) {
			                    that.unSelections(v.id || v.refpk);
			                });
			            },
			            columns: cols_tab,
									// songyd3 第一个页签中表格数据变化后事件，为表格选中已选项
									onPostBody: function() {
										var selectedInOpenIds = [];
										if(that.selectedInOpen && that.selectedInOpen.length > 0) {
											for(var i=0;i<that.selectedInOpen.length;i++) {
												selectedInOpenIds.push(that.selectedInOpen[i].refpk);
											}
										}
										that.$el.find(".msgtype-table2").bootstrapTable("checkBy", {field:"refpk",values: selectedInOpenIds});
									}
			        });
				}
				else{
					that.$el.find(".msgtype-table2").bootstrapTable({
			            onCheck: function (row) {
			                that.updateSelectedTab();
			            },
			            onUncheck: function (row) {
			                that.unSelections(row.id || row.refpk);
			            },
			            onCheckAll: function () {
			                that.updateSelectedTab();
			            },
			            onUncheckAll: function () {
			                var currClassTableData = that.$el.find(".msgtype-table").bootstrapTable('getData');
			                $.each(currClassTableData, function (i, v) {
			                    that.unSelections(v.id || v.refpk);
			                });
			            },
			            columns: cols
			        });
				}
				//zhanghy7-end为多页签多次定义表头

		        that.$el.find(".fixed-table-header").css('background', '#EBEFF0');
		        that.addScroll(true);

		        that.$el.find('.ref_class_refresh').on('click', 'span', function () {
							// modify by syj
							that.searchFlag = false; //刷新之后将搜索标志位置为false
			        that.$el.find('.refer_nav li.searchInput input[type="text"]').val("");//刷新之后将搜索框内容置为空
							that.loadData(true);
// 		            var selectedVals = that.$el.find(".msgtype-table").bootstrapTable('getSelections');
// 		            that.searchFlag = false; //刷新之后将搜索标志位置为false
// 		            that.$el.find('.refer_nav li.searchInput input[type="text"]').val("");//刷新之后将搜索框内容置为空
// 		            if(that.isLocalModel){
// 						var datas = that.options.data;
// 						that.$el.find(".msgtype-table").bootstrapTable('load', {data: datas});
// 		                if (selectedVals && selectedVals.length > 0) {
// 		                    var refpks = $.map(selectedVals, function (val, index) {
// 		                        return val.refpk;
// 		                    });
// 		                    that.$el.find(".msgtype-table").bootstrapTable("checkBy", {field: "refpk", values: refpks});
// 		                }
// 					}else{
// 			            // that.showLoading();
// 						that.ajax({
// 							url: that.getListUrl(),
// 			                type: "post",
// 			                data: that.getRefParam(true),
// 			                traditional: true,
// 			                async: true,
// 			                //async: false,
// 			                dataType: "json",
// 			                success: function (data) {
// 			                    var datas = that.options.data = data.data;
// 			                    datas.length==0 && that.$el.find(".msgtype-table").find("td").html('没有数据');
// 			                    that.$el.find(".msgtype-table").bootstrapTable('load', {data: datas});
// 			                    if (selectedVals && selectedVals.length > 0) {
// 			                        var refpks = $.map(selectedVals, function (val, index) {
// 			                            return val.refpk;
// 			                        });
// 			                        that.$el.find(".msgtype-table").bootstrapTable("checkBy", {field: "refpk", values: refpks});
// 			                    }
// 								that.updatePagination(data.page); //分页
// //								if(that.$el.find(".msgtype-table tbody .bs-checkbox label").length===0){
// //									that.$el.find(".msgtype-table tbody .bs-checkbox").append("<label></label>");
// //								}
// 			                },
// 							//modi by yany -begin
// 							beforeSend: function () {
// 								that.showLoading();
// 							},
// 							//modi by yany -end
// 							complete: function () {
// 				                that.hideLoading();
// 				                that.uCheckboxInit();
// 				            }
// 			            });
// 					}
// 					//刷新常用数据
// 					if (that.$el.find('.refer_nav li.nav_list1').hasClass('action')) {
// 						that.refreshHotCache = true;
// 			            that.refreshHotData(true);
// 					}
		        });
			}
		}
		$.fn.gridViewModel = gridViewModel;
		return gridViewModel;
//});
}($)
