define(['text!/ocm-web/components/dynamicTemplate/tpl.detail.html',
	'text!/ocm-web/components/dynamicTemplate/tpl.edit.html',
	'text!/ocm-web/components/dynamicTemplate/tpl.list.html',
	'text!/ocm-web/components/dynamicTemplate/tpl.dialog.html',
	'ocm_common', 'handlebars'
],
	function (detailTpl, editTpl, listTpl, dialogTpl, common, Handlebars) {
		function registerHelper() {
			Handlebars.registerHelper("addOne", function (index, options) {
				return parseInt(index) + 1;
			});
			Handlebars.registerHelper("stringifyObject", function (object, options) {
				var objectStr = "";
				for (var key in object) {
					objectStr += key + ":" + object[key] + ",";
				}
				if (objectStr[objectStr.length - 1] === ",") {
					objectStr = objectStr.slice(0, -1);
				}
				return objectStr;
			});
		}
		registerHelper();

		//寄生式继承
		function inheritPrototype(SubClass, SuperClass) {
			function F() { }
			F.prototype = SuperClass.prototype;
			var subPrototype = new F();
			subPrototype.constructor = SubClass;
			SubClass.prototype = subPrototype;
		}

		var DynamicTemplate = {};
		DynamicTemplate.Base = function (options) {
			this.vmOfBusi = options.vm; //业务vm
			this.vmOfComp = {}; //组件vm
			this.models = options.models; //定义objectKey与dataTable关系
			this.dtEvents = options.dtEvents; //业务代码注册的dataTable事件
			this.matchParam;
			this.matchSuccess;
			this.templateSchema;
			this.pageOption;
			this.pageElement;
			this.testdataFlag = options.testdataFlag;
		}
		u.extend(DynamicTemplate.Base.prototype, {
			//获取模板定义JSON
			getTemplateSchema: function () {
				var self = this;
				this.matchParam.appCode = this.matchParam.busiObjCode;
				if (this.matchParam.busiObjCode === 'moqRuleControl') {
					this.matchParam.busiObjCode = 'moqCtrlStrategy';
				}
				if (this.matchParam.busiObjCode === 'rejectorder') {
					this.matchParam.busiObjCode = 'saleorder';
				}
				//请求匹配模板时间戳
				$._ajax({
					type: 'get',
					url: '/occ-cmpt/cmpt/tmpl-auth-rels/getTmplContentForCurrentUser',
					contentType: 'application/json; charset=utf-8',
					data: this.matchParam,
					success: function (templatePublish) {
						if (!templatePublish) {
							console.error("未查询到对应模板信息");
							return;
						}
						self.rebuildTemplateSchema(templatePublish);
						var cacheKey = self.getTemplateSchemaCacheKey(templatePublish.templateId, templatePublish.publishTime);
						var cacheSchema = localStorage.getItem(cacheKey);

						self.getTemplateSchemaSuccess(templatePublish);

						$.fn.collapsepanel(false, true);
					}
				});
			},
			//重新组装模板数据查询结果，主要提取字段分组
			rebuildTemplateSchema: function (templateData) {
				if (!templateData || !templateData.head) return;
				var head = templateData.head;
				var comps = head.comps;
				for (var i = 0; i < comps.length; i++) {
					comps[i].groups = [];
					var items = comps[i].items;
					var groups = [];
					comps[i].emptyGroup = [];
					for (var j = 0; j < items.length; j++) {
						var item = items[j];
						if (item.feildgroup) {
							if (groups[item.feildgroup]) {
								groups[item.feildgroup].push(item);
							} else {
								groups[item.feildgroup] = [item];
							}
						} else {
							comps[i].emptyGroup.push(item);
						}
					}
					for (var key in groups) {
						if (Object.prototype.toString.call(groups[key])
							=== '[object Array]') {
							comps[i].groups.push({ label: key, items: groups[key] });
						}
					}
					comps[i].groups.sort();
					// comps[i].groups = groups;
				}
			},
			//获取模板定义JSON缓存key值
			getTemplateSchemaCacheKey: function (templateId, publishTime) {
				return "templateSchema_" + templateId + "_" + publishTime;
			},
			//重建dataTable
			renewModelDt: function (busientityMeta) {
				for (var i = 0; i < this.models.length; i++) {
					var dataTableId = this.models[i].dt;
					// 判断dataTableId是否重建过，防止再次重建后数据丢失
					// if (this.vmOfBusi[dataTableId].templateType) {
					this.vmOfBusi[dataTableId] = new DataTable({
						id: this.models[i].dt,
						pageSize: 10
					});
					// }
				}
			},
			//绑定dataTable事件
			bindDtEvents: function () {
				this.dtEvents && Object.prototype.toString.call(this.dtEvents) === "[object Function]" &&
					this.dtEvents();
			},
			//扩展DataTable元数据
			extendDtMeta: function () {
				var self = this;
				this.templateSchema.head && this.templateSchema.head.comps.forEach(function (comp) {
					self.querySourceDtMeta(comp);

				});
				this.templateSchema.tabs && this.templateSchema.tabs.length > 0 && this.templateSchema.tabs.forEach(function (tab) {
					tab.comps.forEach(function (comp) {
						self.querySourceDtMeta(comp);

					});
				});
				this.templateSchema.list && this.templateSchema.list.comps.forEach(function (comp) {
					self.querySourceDtMeta(comp);
				});
			},
			querySourceDtMeta: function (comp) {
				var self = this;
				// 查询元数据
				var trantemplatesParams = {
					search_EQ_busientity: comp.objectKey,
					size: 999,
					page: 0
				}
				$._ajax({
					type: 'get',
					url: "/fmcg-dynamic-object/dynamic/busientity-meta-datas",
					contentType: 'application/json; charset=utf-8',
					data: trantemplatesParams,
					async: false,
					dataType: 'json',
					success: function (resp) {
						if (resp && resp.content) {
							var busientityMetas = [];
							resp.content.forEach(function (busientityMeta) {
								busientityMetas.push({
									key: busientityMeta.key,
									label: busientityMeta.label,
									style: busientityMeta.style,
									type: 'text',
								})
							});
							for (var i = 0; i < busientityMetas.length; i++) {
								for (var j = 0; j < comp.items.length; j++) {
									if (comp.items[j].key == busientityMetas[i].key) {
										busientityMetas[i] = u.extend(busientityMetas[i], comp.items[j])
									}
								}
								// 更新精度类型和默认精度值
								var precisions = self.viewModel.precisionSettings;
								for (key in precisions) {
									if (busientityMetas[i].key == key) {
										busientityMetas[i].type = precisions[key].type;
										if (precisions[key].precision) busientityMetas[i].precision = precisions[key].precision;
										break
									}
								}
							}
							var extendDtMeta = {
								objectKey: comp.objectKey,
								items: busientityMetas
							}
							self.extendCompDtMeta(extendDtMeta);
						} else {
							self.extendCompDtMeta(comp);
						}
					},
					error: function () {
						self.extendCompDtMeta(comp);
					}

				});
			},
			/**
			 * 为模板组件扩展dataTable元数据
			 */
			extendCompDtMeta: function (busientityMetas) {
				var self = this;
				var dataTableId = this.getDtIdByObjectKey(busientityMetas.objectKey);
				var dataTable = this.vmOfBusi[dataTableId];
				self.extendBaseMeta(dataTable);

				busientityMetas.items.forEach(function (item) {
					if (item.type == 'text') item.type = 'string';
					var itemField = dataTable.getMeta(item.key);
					if (!itemField) {
						dataTable.createField(item.key, item);
					}
					self.extendDtMetaForDefault(dataTable, busientityMetas, item);
					self.extendDtMetaForValidation(dataTable, item, busientityMetas);
					switch (item.type) {
						case "refer":
							self.extendDtMetaForRefextend(dataTable, item);
							break;
						case "docrefer":
							self.extendDtMetaForDocrefer(dataTable, item);
							break;
						default:
					}
				});

			},
			extendBaseMeta: function (dataTable) {
				var baseFields = ["id", "creator", "createTime", "modifier", "modifiedTime", "dr", "ts", "serialnum"];
				baseFields.forEach(function (fieldKey) {
					dataTable.createField(fieldKey, {
						type: 'string',
						enable: true,
						required: false,
						desc: {}
					});
				});
			},
			//扩展DataTable的字段默认值
			extendDtMetaForDefault: function (dataTable, compSchema, itemSchema) {
				if (!itemSchema.defaultValue) {
					return;
				}
				if ((compSchema.type === "table") || (compSchema.type === "form" && this.billStatus === "add")) {
					dataTable.setMeta(itemSchema.key, "default", itemSchema.defaultValue);
				}
			},
			extendDtMetaForRefextend: function (dataTable, referItemSchema) {
				// console.log("正在为dt:", dataTable, "中参照字段key:", referItemSchema.key, "扩展【参照扩展】字段");
				var refshowcontentFieldKey = "refshowcontent_" + referItemSchema.key + "_" + (referItemSchema.refshowcontent || "name");
				var refshowcontentField = dataTable.getMeta(refshowcontentFieldKey);
				if (!refshowcontentField) {
					// console.log("扩展refshowcontent字段:", refshowcontentFieldKey);
					dataTable.createField(refshowcontentFieldKey, referItemSchema);
				}
				if (referItemSchema.refrel) {
					for (var j = 0; j < referItemSchema.refrel.length; j++) {
						var refrelSchema = referItemSchema.refrel[j];
						var refrelFieldKey = Utils.getrefrelKey(referItemSchema, refrelSchema);
						var refrelField = dataTable.getMeta(refrelFieldKey);
						if (!refrelField) {
							// console.log("扩展refrel字段:", refrelFieldKey);
							dataTable.createField(refrelFieldKey, refrelSchema);
						}
					}
					// 监听参照变化赋值关联字段
					// dataTable.on(referItemSchema.key+'.valuechange', (function (dataTable, referItemSchema, refrelSchema) {
					//   return function() {
					//     var refJQDom = $('#refContainer' + dataTable.id + '_' + referItemSchema.key);
					//     var datas = refJQDom.data("uui.refer") ? refJQDom.data("uui.refer").values : [];
					//     if (dataTable.getCurrentRow()) {
					//       for (var j = 0; j < referItemSchema.refrel.length; j++) {
					//         var refrelFieldKey = "refrel_" + referItemSchema.key + "_" + refrelSchema.key;
					//         dataTable.getCurrentRow().setValue(refrelFieldKey, datas[0][refrelSchema.key]);
					//       }
					//     }
					//   }
					// })(dataTable, referItemSchema, refrelSchema));
				}
				var updatedMeta = {};
				updatedMeta[referItemSchema.key] = {};
				updatedMeta[referItemSchema.key].refmodel = JSON.stringify(refinfo[referItemSchema.refkey]);
				var refcfg = {
					ctx: "/uitemplate_web",
				}
				if (referItemSchema.multi == 1) refcfg.isMultiSelectedEnabled = true;
				if (referItemSchema.refshowcontent && referItemSchema.refshowcontent === "code") {
					refcfg.isReturnCode = true;
				}
				updatedMeta[referItemSchema.key].refcfg = JSON.stringify(refcfg);
				// console.log("扩展参照字段meta:", updatedMeta);
				dataTable.updateMeta(updatedMeta);
				this.bindReferChangeEvent(dataTable, referItemSchema);
			},
			extendDtMetaForDocrefer: function (dataTable, docreferItemSchema) {
				// console.log("正在为dt:", dataTable, "中自定义档案参照字段key:", docreferItemSchema.key, "扩展字段");
				var docreferCodeFieldKey = "refshowcontent_" + docreferItemSchema.key + "_code";
				var docreferCodeField = dataTable.getMeta(docreferCodeFieldKey);
				if (!docreferCodeField) {
					console.log("扩展自定义档案参照code字段:", docreferCodeFieldKey);
					dataTable.createField(docreferCodeFieldKey, {
						type: 'string',
						enable: true,
						required: false,
						desc: {}
					});
				}
				var docreferNameFieldKey = "refshowcontent_" + docreferItemSchema.key + "_name";
				var docreferNameField = dataTable.getMeta(docreferNameFieldKey);
				if (!docreferNameField) {
					// console.log("扩展自定义档案参照name字段:", docreferNameFieldKey);
					dataTable.createField(docreferNameFieldKey, {
						type: 'string',
						enable: true,
						required: false,
						desc: {}
					});
				}
				var updatedMeta = {};
				updatedMeta[docreferItemSchema.key] = {};
				updatedMeta[docreferItemSchema.key].refmodel = JSON.stringify(refinfo["custdocdef"]);
				var refcfg = {
					ctx: "/uitemplate_web",
					refCode: docreferItemSchema.refcode,
					refName: docreferItemSchema.refname,
				}
				updatedMeta[docreferItemSchema.key].refcfg = JSON.stringify(refcfg);
				// console.log("扩展自定义档案参照字段meta:", updatedMeta);
				dataTable.updateMeta(updatedMeta);
			},
			//扩展校验规则
			extendDtMetaForValidation: function (dataTable, itemSchema, compSchema) {
				var validationMeta = {};
				validationMeta[itemSchema.key] = {
					// required: true,
					required: itemSchema.required == "0" ? false : true,
				};
				if (compSchema.type === "table") {
					u.extend(validationMeta[itemSchema.key], {
						showFix: true,
					});
				}
				dataTable.updateMeta(validationMeta);
			},
			/**
			 * 生成uicomp主键
			 */
			generateUICompId: function () {
				return "uicomp_" + (+new Date()) + "_" + (Math.random() + '').slice(2, 8);
			},
			/**
			 * 根据objectKey获取dataTableId
			 */
			getDtIdByObjectKey: function (objectKey) {
				for (var i = 0; i < this.models.length; i++) {
					if (this.models[i].objectKey === objectKey && this.models[i].type === this.testdataFlag) {
						return this.models[i].dt;
					}
				}
			},
			/**
			 * 根据objectKey获取 dialog的comps
			 */
			getDtDialogCompByObjectKey: function (objectKey) {
				for (var i = 0; i < this.models.length; i++) {
					if (this.models[i].objectKey === objectKey && this.models[i].type === this.testdataFlag) {
						return this.models[i].dialogComps;
					}
				}
			},
			/**
			 * 初始化组件vm
			 * @return {[type]} [description]
			 */
			initVmOfComp: function () {
				this.vmOfComp = {};
				//注入dataTable
				for (var i = 0; i < this.models.length; i++) {
					var dataTableId = this.models[i].dt;
					this.vmOfComp[dataTableId] = this.vmOfBusi[dataTableId];
				}
				//注入uicompsOption结构
				this.vmOfComp.uicompsOption = {
					cards: {},
					details: {},
					searchs: {},
					grids: {},
					buttons: {},
					dialogs: {}
				};
			},
			//模板字段JSON => 【ui-detail组件】datasource
			buildUIDetailDatasource: function (schemaItems, $dt) {
				var datasource = [];
				for (var i = 0; i < schemaItems.length; i++) {
					var datasourceItem = {
						type: schemaItems[i].type,
						key: schemaItems[i].key,
						label: schemaItems[i].label,
						computed: $dt + schemaItems[i].key
					};
					switch (schemaItems[i].type) {
						case "refer":
							var datasourceItem_refshowcontent = {
								type: 'text',
								key: "refshowcontent_" + schemaItems[i].key + "_" + (schemaItems[i].refshowcontent || "name"),
								label: schemaItems[i].label,
							};
							datasource.push(u.extend({}, schemaItems[i], datasourceItem_refshowcontent));
							var refrel = schemaItems[i].refrel;
							if (refrel && refrel.length > 0) {
								for (var j = 0; j < refrel.length; j++) {
									var datasourceItem_refrel = {
										type: 'text',
										key: 'refrel_' + schemaItems[i].key + '_' + refrel[j].key,
										label: refrel[j].showLabel,
									}
									datasource.push(u.extend({}, refrel[j], datasourceItem_refrel));
								}
							}
							break;
						case "combo":
							datasourceItem.enumkey = schemaItems[i].enumkey;
							datasource.push(datasourceItem);
							break;
						case "textarea":
							datasourceItem.type = "text";
							datasource.push(datasourceItem);
							break;
						case "docrefer":
							var docreferNameItem = {
								label: schemaItems[i].label,
								key: "refshowcontent_" + schemaItems[i].key + "_name",
							};
							datasource.push(docreferNameItem);
							break;
						default:
							datasource.push(datasourceItem);
					}
				}
				// console.log("ui-detail组件datasource为: ",datasource);
				return datasource;
			},
			//模板JSON => 【ui-card组件】datasource
			buildUICardDatasource: function (schemaItems, dataTableId) {
				var datasource = [];
				for (var i = 0; i < schemaItems.length; i++) {
					var datasourceItem = {
						type: schemaItems[i].type,
						key: schemaItems[i].key,
						label: schemaItems[i].label,
						disableFilter: true,
						required: schemaItems[i].required != 1,
						enable: schemaItems[i].editable == 1
					};
					switch (schemaItems[i].type) {
						case "refer":
							datasource.push(u.extend(datasourceItem, {
								referId: dataTableId + "_" + schemaItems[i].key,  	// 如果修改定义方式，请同步修改refer.js 1668 this.options.wrapRefer.contentId解析方式
								compid: schemaItems[i].key
							}));
							var refrel = schemaItems[i].refrel;
							if (refrel && refrel.length > 0) {
								for (var j = 0; j < refrel.length; j++) {
									var datasourceItem_refrel = {
										type: 'text',
										key: 'refrel_' + schemaItems[i].key + '_' + refrel[j].key,
										label: refrel[j].showLabel,
										enable: false,
										compid: 'refrel_' + schemaItems[i].key + '_' + refrel[j].key,
									}
									datasource.push(datasourceItem_refrel);
								}
							}
							break;
						case "docrefer":
							var datasource_docrefer = {
								type: "refer",
								key: schemaItems[i].key,
								label: schemaItems[i].label,
							};
							datasource.push(datasource_docrefer);
							break;
						case "combo":
							// console.table(schemaItems[i]);
							datasourceItem = {
								type: "combo",
								label: schemaItems[i].label,
								key: schemaItems[i].key,
								dataSource: enuminfo[schemaItems[i].enumkey].dataSource,
								onlySelect: true,
								required: schemaItems[i].required != 1,
								enable: schemaItems[i].editable == 1
							}
							datasource.push(datasourceItem);
							break;
						case "textarea":
							datasourceItem.type = "text";
							datasource.push(datasourceItem);
							break;
						case "boolean":
							datasourceItem = {
								type: "checkbox",
								key: schemaItems[i].key,
								label: schemaItems[i].label,
								checkedValue: "1",
								unCheckedValue: "0",
								required: schemaItems[i].required != 1,
								enable: schemaItems[i].editable == 1
							}
						default:
							datasource.push(datasourceItem);
					}
				}
				// console.log("ui-detail组件datasource为: ",datasource);
				return datasource;
			},
			//TODO:【模板控件】 => 展示型【ui-grid组件】options  multiSelect: true 多选 false 不可多选
			buildShowUIGridOption: function (templateComp, multiSelect) {
				var dt = this.getDtIdByObjectKey(templateComp.objectKey);
				var gridColumns = [];
				var RT = this.testdataFlag == "list" ? this.viewModel.listRenderTypes : this.viewModel.detailRenderTypes;
				for (var i = 0; i < templateComp.items.length; i++) {
					var itemSchema = templateComp.items[i];
					var column = {
						field: itemSchema.key,
						title: itemSchema.label,
						dataType: 'String',
						editable: false,
						visible: itemSchema.visible && itemSchema.visible == "0" ? false : true,
					};
					if (RT) {
						for (var key in RT) {
							if (itemSchema.key == key) {
								column.renderType = RT[key];
							}
						}
					}
					if (itemSchema.renderType) column.renderType = itemSchema.renderType;
					if (itemSchema.width) column.width = itemSchema.width;
					var columnForType = {};
					switch (itemSchema.type) {
						case "date":
							columnForType = {
								dataType: "Date"
							};
							gridColumns.push(u.extend(column, columnForType));
							break;
						case "datetime":
							columnForType = {
								dataType: "Datetime"
							};
							gridColumns.push(u.extend(column, columnForType));
							break;
						case "boolean":
							if (column.renderType) {
								gridColumns.push(column);
								break;
							}
							columnForType = {
								renderType: "disableBooleanRender"
							};
							gridColumns.push(u.extend(column, columnForType));
							break;
						case "combo":
							//方案1: renderType计算combo值对应名称
							// columnForType = {
							// 	renderType: "comboTextRender",
							// 	comboParam: {
							// 		enumkey: itemSchema.enumkey
							// 	}
							// };
							var comboDataSource  = typeof enuminfo[itemSchema.enumkey].dataSource == 'function' ? (enuminfo[itemSchema.enumkey].dataSource)() : enuminfo[itemSchema.enumkey].dataSource;
							comboDataSource = comboDataSource ? comboDataSource: [];
							columnForType = {
								renderType: "comboRender",
								// datasource: enuminfo[itemSchema.enumkey].dataSource,
								editOptions: {
									type: "combo",
									datasource: comboDataSource
								},
								editType: "combo",
							};
							gridColumns.push(u.extend(column, columnForType));

							//方案2: 增加comboText_[key]字段，隐藏combo对应的列，增加comboText对应的列
							// var comboTextColumn = {
							//   field: "comboText_" + itemSchema.key,
							//   title: itemSchema.label,
							//   dataType: 'String',
							// };
							break;
						case "refer":
							var refshowcontentColumn = {
								title: itemSchema.label,
								field: "refshowcontent_" + itemSchema.key + "_" + itemSchema.refshowcontent,
								renderType: "ncReferRender",
								editType: "ncReferEditType",
								refmodel: JSON.stringify(refinfo[itemSchema.refkey]),
								refparam: '',
								showField: "refshowcontent_" + itemSchema.key + "_" + itemSchema.refshowcontent,
								editOptions: {
									validType: 'String',
									rel: {
										refpk: itemSchema.key,
										refname: "refshowcontent_" + itemSchema.key + "_" + itemSchema.refshowcontent
									}
								}
							};
							gridColumns.push(u.extend(column, refshowcontentColumn));

							/* if (itemSchema.refrel && itemSchema.refrel.length > 0) {
								itemSchema.refrel.forEach(function (refrel) {
									var refrelColumn = {
										title: refrel.showLabel,
										field: "refrel_" + itemSchema.key + "_" + refrel.key
									};
									gridColumns.push(u.extend(column, refrelColumn));
								});
							} */
							break;
						case "docrefer":
							// var docreferNameColumn = {
							// 	title: itemSchema.label,
							// 	field: "docrefer_" + itemSchema.key + "_name",
							// };
							var docreferNameColumn = {
								title: itemSchema.label,
								field: "refshowcontent_" + itemSchema.key + "_" + (itemSchema.refshowcontent || "name"),
								renderType: "ncReferRender",
								editType: "ncReferEditType",
								refmodel: JSON.stringify(refinfo[itemSchema.refkey]),
								refparam: '',
								showField: "refshowcontent_" + itemSchema.key + "_" + (itemSchema.refshowcontent || "name"),
								editOptions: {
									validType: 'String',
									rel: {
										refpk: itemSchema.key,
										refname: "refshowcontent_" + itemSchema.key + "_" + (itemSchema.refshowcontent || "name")
									}
								}
							};
							gridColumns.push(docreferNameColumn);
							break;
						default:
							gridColumns.push(column);
					}
				}
				var showUIGridOption = {
					domid: "template_showuigrid_" + dt,
					umeta: {
						id: "grid_template_showuigrid_" + dt,
						data: dt,
						type: "grid",
						editable: true,
						// multiSelect: templateComp.multiSelect ? templateComp.multiSelect : false,
						multiSelect: multiSelect,
						showNumCol: true,
					},
					columns: gridColumns
				}
				this.handleGridOperation(showUIGridOption, templateComp.objectKey);
				// console.log(templateComp.objectKey + "对象相关展示型ui-grid配置项:", showUIGridOption);
				return showUIGridOption;
			},
			buildEditUIGridOption: function (templateComp) {
				var dt = this.getDtIdByObjectKey(templateComp.objectKey);
				var gridColumns = [];
				for (var i = 0; i < templateComp.items.length; i++) {
					var itemSchema = templateComp.items[i];
					var column = {
						field: itemSchema.key,
						title: itemSchema.label,
						dataType: itemSchema.type,
						editable: itemSchema.editable && itemSchema.editable == "0" ? false : true,
						// required: !!itemSchema.required,
						required: itemSchema.required && itemSchema.required == "0" ? false : true,
						visible: itemSchema.visible && itemSchema.visible == "0" ? false : true,
						// visible: itemSchema.visible && !!itemSchema.visible,
						// renderType: "editTypeText",
					};
					if (this.viewModel.editRenderTypes) {
						var renderTypes = this.viewModel.editRenderTypes;
						for (var key in renderTypes) {
							if (itemSchema.key == key) {
								column.renderType = renderTypes[key];
							}
						}
					}
					var columnForType = {};
					switch (itemSchema.type) {
						case "label":
							columnForType = {
								dataType: "String",
								editable: false
							};
							gridColumns.push(u.extend(column, columnForType));
							break;
						case "date":
							columnForType = {
								dataType: "Date",
								editType: "date",
								renderType: "dateRender"
							};
							gridColumns.push(u.extend(column, columnForType));
							break;
						case "datetime":
							//TODO: 编辑表格-日期时间
							columnForType = {
								dataType: "Datetime"
							};
							gridColumns.push(u.extend(column, columnForType));
							break;
						case "boolean":
							if (column.renderType) {
								gridColumns.push(column);
								break;
							}
							columnForType = {
								renderType: "booleanRender"
							};
							gridColumns.push(u.extend(column, columnForType));
							break;
						case "combo":
							var comboDataSource  = typeof enuminfo[itemSchema.enumkey].dataSource == 'function' ? (enuminfo[itemSchema.enumkey].dataSource)() : enuminfo[itemSchema.enumkey].dataSource;
							comboDataSource = comboDataSource ? comboDataSource: [];
							columnForType = {
								renderType: "comboRender",
								// datasource: enuminfo[itemSchema.enumkey].dataSource,
								editOptions: {
									type: "combo",
									datasource: comboDataSource
								},
								editType: "combo",
							};
							gridColumns.push(u.extend(column, columnForType));	
							break;
						case "docrefer":
							// columnForType = {
							// 	renderType: "referRender",
							// };
							// gridColumns.push(u.extend(column, columnForType));
							// var docreferNameColumn = {
							//   title: itemSchema.label,
							//   field: "docrefer_" + itemSchema.key + "_name",
							// };
							// gridColumns.push(docreferNameColumn);

							columnForType = {
								renderType: "ncReferRender",
								editType: "ncReferEditType",
								refmodel: JSON.stringify(refinfo[itemSchema.refkey]),
								refparam: '',
								showField: "refshowcontent_" + itemSchema.key + "_" + (itemSchema.refshowcontent || "name"),
								editOptions: {
									validType: 'String',
									rel: {
										refpk: itemSchema.key,
										refname: "refshowcontent_" + itemSchema.key + "_" + (itemSchema.refshowcontent || "name")
									}
								}
							};
							gridColumns.push(u.extend(column, columnForType));
							if (itemSchema.refrel && itemSchema.refrel.length > 0) {
								itemSchema.refrel.forEach(function (refrel) {
									var refrelColumn = {
										title: refrel.showLabel,
										field: "refrel_" + itemSchema.key + "_" + refrel.key,
										editable: false
									};
									gridColumns.push(refrelColumn);
								});
							}
							break;
						case "refer":
							columnForType = {
								renderType: "ncReferRender",
								editType: "ncReferEditType",
								refmodel: JSON.stringify(refinfo[itemSchema.refkey]),
								refparam: '',
								showField: "refshowcontent_" + itemSchema.key + "_" + itemSchema.refshowcontent,
								editOptions: {
									validType: 'String',
									rel: {
										refpk: itemSchema.key,
										refname: "refshowcontent_" + itemSchema.key + "_" + itemSchema.refshowcontent
									}
								}
							};
							gridColumns.push(u.extend(column, columnForType));
							if (itemSchema.refrel && itemSchema.refrel.length > 0) {
								itemSchema.refrel.forEach(function (refrel) {
									var refrelColumn = {
										title: refrel.showLabel,
										field: "refrel_" + itemSchema.key + "_" + refrel.key,
										editable: false
									};
									gridColumns.push(refrelColumn);
								});
							}
							break;
						default:
							gridColumns.push(column);
					}
				}
				var editUIGridOption = {
					domid: "template_edituigrid_" + dt,
					umeta: {
						id: "grid_template_edituigrid_" + dt,
						data: dt,
						type: "grid",
						editable: true,
						multiSelect: true,
						showNumCol: true,
						onBeforeEditFun: (this.viewModel[dt + "OnBeforeEditFun"] ? (dt + "OnBeforeEditFun") : function () { }),
						onRowSelected: (this.viewModel[dt + "OnRowSelectedFun"] ? (dt + "OnRowSelectedFun") : function () { }),
						onRowUnSelected: (this.viewModel[dt + "OnRowUnSelectedFun"] ? (dt + "OnRowUnSelectedFun") : function () { })
					},
					columns: gridColumns
				}
				this.handleGridOperation(editUIGridOption, templateComp.objectKey);
				// console.log(templateComp.objectKey+"对象相关编辑型ui-grid配置项:", editUIGridOption);
				return editUIGridOption;
			},
			//绑定参照值变化事件
			bindReferChangeEvent: function (dataTable, referItemSchema) {
				// console.log(referItemSchema.key + 'valuechange listener');
				// dataTable.on(referItemSchema.key + '.valuechange', this.updateRefrel.bind(dataTable, referItemSchema));
			},
			//更新参照关联字段
			updateRefrel: function (referItemSchema, obj) {
				var curRow = obj.rowObj;
				var refkey = referItemSchema.refkey;
				var refdataId = obj.newValue;
				if (!obj.newValue) { //清空关联字段
					if (referItemSchema.refrel && referItemSchema.refrel.length > 0) {
						referItemSchema.refrel.forEach(function (refrel) {
							var refrelKey = "refrel_" + referItemSchema.key + "_" + refrel.key;
							curRow.setValue(refrelKey, "");
						});
					}
					return;
				}
				$._ajax({
					type: 'get',
					url: '/occ-base/app/dynamic-ref/query-ref',
					// traditional:true,
					data: {
						code: referItemSchema.refkey,
						param: JSON.stringify([{
							id: refdataId
						}]),
					},
					success: function (refdataArr) {
						if (!refdataArr || !refdataArr[0]) {
							return;
						}
						var refdataObj = refdataArr[0];
						if (referItemSchema.refrel && referItemSchema.refrel.length > 0) {
							referItemSchema.refrel.forEach(function (refrel) {
								var refrelKey = Utils.getrefrelKey(referItemSchema, refrel);
								var refrelValue = refdataObj ? refdataObj[refrel.key] : "";
								curRow.setValue(refrelKey, refrelValue);
							});
						}
					}
				})
			},
			//更新模板扩展数据，如参照显示内容、参照关联字段、自定义档案参照名称、自定义档案参照编码
			updateExtendData: function () {
				var self = this;
				var extendDatas = [];
				//解析模板schema，获取所有业务实体参照、自定义档案参照，并从业务数据DataTable提取主键
				//主表
				var headItems = this.templateSchema.head.comps[0].items;
				var headCompType = this.templateSchema.head.comps[0].type;
				var headBindType = this._getBindTypeByCompType(headCompType);
				var headDataTable = this.vmOfComp[this.getDtIdByObjectKey(this.templateSchema.head.comps[0].objectKey)];
				// var headReferItems = [];
				// var headDocreferItems = [];
				var headExtendData = {
					objectKey: this.templateSchema.head.comps[0].objectKey,
					dt: this.getDtIdByObjectKey(this.templateSchema.head.comps[0].objectKey),
					bindType: headBindType, //绑定类型
					referItems: [],
					docreferItems: [],
				};
				for (var i = 0; i < headItems.length; i++) {
					switch (headItems[i].type) {
						case "refer":
							var referItem = this._buildReferItem({
								itemSchema: headItems[i],
								bindType: headBindType,
								dataTable: headDataTable,
								type: "refer"
							});
							headExtendData.referItems.push(referItem);
							break;
						case "docrefer":
							var docreferItem = this._buildReferItem({
								itemSchema: headItems[i],
								bindType: headBindType,
								dataTable: headDataTable,
								type: "docrefer"
							});
							headExtendData.referItems.push(docreferItem);
							break;
						default:
					}
				}
				extendDatas.push(headExtendData);
				//子表
				var tabs = this.templateSchema.tabs;
				for (var i = 0; i < tabs.length; i++) {
					var comps = tabs[i].comps;
					for (var j = 0; j < comps.length; j++) {
						var compBindType = this._getBindTypeByCompType(comps[j].type);
						var compDataTableId = this.getDtIdByObjectKey(comps[j].objectKey);
						var compDataTable = this.vmOfComp[compDataTableId];
						var compExtendData = {
							objectKey: comps[j].objectKey,
							dt: compDataTableId,
							bindType: compBindType, //绑定类型
							referItems: [],
							docreferItems: [],
						};
						var compItems = comps[j].items;
						for (var k = 0; k < compItems.length; k++) {
							switch (compItems[k].type) {
								case "refer":
									var referItem = this._buildReferItem({
										itemSchema: compItems[k],
										bindType: compBindType,
										dataTable: compDataTable,
										type: "refer"
									});
									compExtendData.referItems.push(referItem);
									break;
								case "docrefer":
									var docreferItem = this._buildReferItem({
										itemSchema: compItems[k],
										bindType: compBindType,
										dataTable: compDataTable,
										type: "docrefer"
									});
									compExtendData.referItems.push(docreferItem);
									break;
								default:
							}
						}
						extendDatas.push(compExtendData);
					}
				}
				// console.table(extendDatas)
				extendDatas.forEach(function (data) {
					if (data.referItems && data.referItems.length > 0) {
						data.referItems.forEach(function (item) {
							var reqData = {
								refDocId: item.type == "refer" ? item.refkey : "custdocdef"
							}
							// bindType 分为current和all两种情况
							// current为主表，单个查询；all为子表，同一参照不同行的批量查询
							if (data.bindType === 'current') {
								reqData.dataIds = item.refdataObjId
								item.refdataObj = {};
							} else if (data.bindType === 'all') {
								reqData.dataIds = item.refdataArrId.join(',')
								item.refdataArr = [];
							}
							if (!reqData.refDocId || !reqData.dataIds) {
								return true;
							}
							$._ajax({
								async: false,
								type: 'get',
								url: '/occ-base/base/ref-docs/getReferList',
								contentType: 'application/json; charset=utf-8',
								data: reqData,
								success: function (resdata) {
									if (data.bindType === 'current') {
										item.refdataObj = resdata;
									} else if (data.bindType === 'all') {
										item.refdataArr = resdata;
									}
								}
							});
						});
					}
					// if (data.docreferItems && data.docreferItems.length > 0) {
					// 	data.docreferItems.forEach(function (item) {
					// 		var reqData = {
					// 			refDocId: "custdocdef",
					// 			refDocCode: item.refcode
					// 		}
					// 		// bindType 分为current和all两种情况
					// 		// current为主表，单个查询；all为子表，同一参照不同行的批量查询
					// 		if (data.bindType === 'current') {
					// 			reqData.dataIds = item.docrefdataObjId
					// 			item.refdataObj = {};
					// 		} else if (data.bindType === 'all') {
					// 			reqData.dataIds = item.docrefdataArrId.join(',')
					// 			item.refdataArr = [];
					// 		}
					// 		if (!reqData.refDocCode || !reqData.dataIds) {
					// 			return true;
					// 		}
					// 		$._ajax({
					// 			async: false,
					// 			type: 'get',
					// 			// url: '/occ-base/base/sys-docs/getReferList',
					// 			url: '/occ-base/base/ref-docs/getReferList',
					// 			contentType: 'application/json; charset=utf-8',
					// 			data: reqData,
					// 			success: function (resdata) {
					// 				if (data.bindType === 'current') {
					// 					item.refdataObj = resdata;
					// 				} else if (data.bindType === 'all') {
					// 					item.refdataArr = resdata;
					// 				}
					// 			}
					// 		});
					// 	});
					// }
				});
				for (var i = 0; i < extendDatas.length; i++) {
					var compDataTable = self.vmOfComp[extendDatas[i].dt];
					var compBindType = extendDatas[i].bindType;
					extendDatas[i].modelExtendData = self._buildModelExtendData({
						bindType: extendDatas[i].bindType,
						referItems: extendDatas[i].referItems,
						docreferItems: extendDatas[i].docreferItems,
						dt: compDataTable
					});
					if (compBindType === "current") {
						var curRow = compDataTable.getCurrentRow();
						var curRowMetas = extendDatas[i].modelExtendData["current"];
						for (key in curRowMetas) {
							var _val = curRowMetas[key];
							if (_val) curRow.setValue(key, _val)
						}
					} else {
						// var allRowData = compDataTable.getSimpleData();
						// 获取真实数据(过滤dr==1)
						// var allRowData = compDataTable.getRealSimpleData();
						// self._extendArray(allRowData, [extendDatas[i].modelExtendData["all"]]);
						// console.log(extendDatas[i].dt + "组装扩展字段后的业务数据:", allRowData);
						compDataTable.setSimpleData(extendDatas[i].modelExtendData, {
							unSelect: true
						});
					}
				}
				//后台请求获取全部关联数据
				// setTimeout(function() {
				// $._ajax({
				// 	type: 'get',
				// 	url: '/occ-base/base/sys-docs/getReferList',
				// 	contentType: 'application/json; charset=utf-8',
				// 	data: JSON.stringify(extendDatas),
				// 	success: function (completeExtendDatas) {
				// 		// var completeExtendDatas = test_completeExtendData(extendDatas);
				// 		//将关联数据组装成模型扩展数据，并赋值给DataTable
				// 		for (var i = 0; i < completeExtendDatas.length; i++) {
				// 			var compDataTable = self.vmOfComp[completeExtendDatas[i].dt];
				// 			var compBindType = completeExtendDatas[i].bindType;
				// 			completeExtendDatas[i].modelExtendData = self._buildModelExtendData({
				// 				bindType: completeExtendDatas[i].bindType,
				// 				referItems: completeExtendDatas[i].referItems,
				// 				docreferItems: completeExtendDatas[i].docreferItems,
				// 			});
				// 			if (compBindType === "current") {
				// 				var curRow = compDataTable.getCurrentRow();
				// 				var curRowData = curRow.getSimpleData();
				// 				u.extend(curRowData, completeExtendDatas[i].modelExtendData["current"]);
				// 				// console.log(completeExtendDatas[i].dt + "组装扩展字段后的业务数据:", curRowData);
				// 				curRow.setSimpleData(curRowData);
				// 			} else {
				// 				var allRowData = compDataTable.getSimpleData();
				// 				self._extendArray(allRowData, [completeExtendDatas[i].modelExtendData["all"]]);
				// 				// console.log(completeExtendDatas[i].dt + "组装扩展字段后的业务数据:", allRowData);
				// 				compDataTable.setSimpleData(allRowData);
				// 			}
				// 		}
				// 	}
				// });
				// }, 100);

			},
			//更新模板扩展数据，如参照显示内容、参照关联字段、自定义档案参照名称、自定义档案参照编码
			updateExtendListData: function () {
				var self = this;
				var extendDatas = [];
				//解析模板schema，获取所有业务实体参照、自定义档案参照，并从业务数据DataTable提取主键
				var list = this.templateSchema.list;
				for (var i = 0; i < list.length; i++) {
					var comps = list[i].comps;
					for (var j = 0; j < comps.length; j++) {
						var compBindType = this._getBindTypeByCompType(comps[j].type);
						var compDataTableId = this.getDtIdByObjectKey(comps[j].objectKey);
						var compDataTable = this.vmOfComp[compDataTableId];
						var compExtendData = {
							objectKey: comps[j].objectKey,
							dt: compDataTableId,
							bindType: compBindType, //绑定类型
							referItems: [],
							docreferItems: [],
						};
						var compItems = comps[j].items;
						for (var i = 0; i < compItems.length; i++) {
							switch (compItems[i].type) {

								default:
							}
						}
						extendDatas.push(compExtendData);
					}
				}
				//后台请求获取全部关联数据
				$._ajax({
					type: 'post',
					url: '/occ-base/app/dynamic-ref/query-batch-ref',
					contentType: 'application/json; charset=utf-8',
					data: JSON.stringify(extendDatas),
					success: function (completeExtendDatas) {
						//将关联数据组装成模型扩展数据，并赋值给DataTable
						for (var i = 0; i < completeExtendDatas.length; i++) {
							var compDataTable = self.vmOfComp[completeExtendDatas[i].dt];
							var compBindType = completeExtendDatas[i].bindType;
							completeExtendDatas[i].modelExtendData = self._buildModelExtendData({
								bindType: completeExtendDatas[i].bindType,
								referItems: completeExtendDatas[i].referItems,
								docreferItems: completeExtendDatas[i].docreferItems,
							});
							if (compBindType === "current") {
								var curRow = compDataTable.getCurrentRow();
								var curRowMetas = extendDatas[i].modelExtendData["current"];
								for (key in curRowMetas) {
									var _val = curRowMetas[key];
									if (_val) curRow.setValue(key, _val)
								}
							} else {
								var allRowData = compDataTable.getSimpleData();
								self._extendArray(allRowData, [completeExtendDatas[i].modelExtendData["all"]]);
								compDataTable.setSimpleData(allRowData, {
									unSelect: true
								});
							}
						}
					}
				});
			},
			_getBindTypeByCompType: function (compType) {
				var bindType = "current";
				if (compType === "table") {
					return "all";
				}
				return bindType;
			},
			_buildReferItem: function (opt) {
				var referItem = u.extend({}, opt.itemSchema);
				if (opt.bindType === "current") {
					referItem.refdataObjId = opt.dataTable.getCurrentRow() ? opt.dataTable.getCurrentRow().getValue(referItem.key) : "";
				} else {
					// 解决值为空或者null 也push进去
					/* referItem.refdataArrId = opt.dataTable.getSimpleData().map(function (dataObj) {
						return dataObj[referItem.key];
					}); */
					referItem.refdataArrId = [];
					var optData = opt.dataTable.getRealSimpleData();
					for (var i = 0; i < optData.length; i++) {
						if (optData[i][referItem.key]) referItem.refdataArrId.push(optData[i][referItem.key])
					}
				}
				return referItem;
			},
			_buildDocreferItem: function (opt) {
				var docreferItem = u.extend({}, opt.itemSchema);
				if (opt.bindType === "current") {
					docreferItem.docrefdataObjId = opt.dataTable.getCurrentRow() ? opt.dataTable.getCurrentRow().getValue(docreferItem.key) : "";
				} else {
					docreferItem.docrefdataArrId = [];
					var optData = opt.dataTable.getRealSimpleData();
					for (var i = 0; i < optData.length; i++) {
						if (optData[i][docreferItem.key]) referItem.refdataArrId.push(optData[i][docreferItem.key])
					}
				}
				return docreferItem;
			},
			_buildModelExtendData: function (opt) {
				var modelExtendData = {};
				var bindType = opt.bindType;
				var referItems = opt.referItems;
				var docreferItems = opt.docreferItems;
				var dt = opt.dt;
				modelExtendData[bindType] = bindType === "current" ? {} : [];
				if (bindType === "current") {
					for (var i = 0; i < referItems.length; i++) {
						var referItem = referItems[i];
						if (!referItem.refdataObjId || !referItem.refdataObj) {
							continue;
						}
						var itemExtendData = {};
						var item_refshowcontentKey = "refshowcontent_" + referItem.key + "_" + (referItem.refshowcontent || "name");
						itemExtendData[item_refshowcontentKey] = referItem.refdataObj && referItem.refdataObj.length > 0 ? referItem.refdataObj[0][referItem.refshowcontent || "name"] : "";
						if (referItem.refrel && referItem.refrel.length > 0) {
							for (var j = 0; j < referItem.refrel.length; j++) {
								var refrel = referItem.refrel[j];
								var item_refrelKey = "refrel_" + referItem.key + "_" + refrel.key;
								itemExtendData[item_refrelKey] = referItem.refdataObj[refrel.key];
							}
						}
						u.extend(modelExtendData[bindType], itemExtendData);
					}
					for (var i = 0; i < docreferItems.length; i++) {
						var docreferItem = docreferItems[i];
						var itemExtendData = {};
						var item_docreferCodeKey = "refshowcontent_" + docreferItem.key + "_code";
						var item_docreferNameKey = "refshowcontent_" + docreferItem.key + "_name";
						itemExtendData[item_docreferCodeKey] = docreferItem.docrefdataObj ? docreferItem.docrefdataObj["code"] : "";
						itemExtendData[item_docreferNameKey] = docreferItem.docrefdataObj ? docreferItem.docrefdataObj["name"] : "";
						u.extend(modelExtendData[bindType], itemExtendData);
					}
					// console.log("构造modelExtendData为:", modelExtendData);
					return modelExtendData;
				} else { //bindType === "all"
					var itemExtendDatas_Arr = [];
					var _curDtData = dt.getRealSimpleData();
					for (var i = 0; i < referItems.length; i++) {
						var referItem = referItems[i];
						var item_refshowcontentKey = "refshowcontent_" + referItem.key + "_" + (referItem.refshowcontent || "name");
						var itemExtendDatas = referItem.refdataArrId.map(function (id, index) {
							var curkey = referItem.key;
							var refdataObj = referItem.refdataArr;
							var itemExtendData = {};
							for (var j = 0; j < refdataObj.length; j++) {
								var ids = id.split(",");
								var showContentKey = "",
									itemRefrelId = ""
								ids.forEach(function (refData_id) {
									// id 可能是多选会是多个，需要拼接起来
									if (refdataObj[j].id == refData_id) {
										if (!showContentKey) showContentKey = refdataObj[j][referItem.refshowcontent || "name"];
										itemRefrelId += refdataObj[j].id + ","
									}
								})
								if (showContentKey && itemRefrelId) {
									itemExtendData[item_refshowcontentKey] = showContentKey;
									itemExtendData["item_refrel_id"] = itemRefrelId.substr(0, itemRefrelId.length - 1)

								}
							}
							// var itemExtendData = {};
							// itemExtendData[item_refshowcontentKey] = refdataObj ? refdataObj[referItem.refshowcontent] : "";
							if (referItem.refrel && referItem.refrel.length > 0) {
								for (var j = 0; j < referItem.refrel.length; j++) {
									var item_refrel = referItem.refrel[j];
									var item_refrelKey = "refrel_" + referItem.key + "_" + item_refrel.key;
									// itemExtendData[item_refrelKey] = refdataObj ? refdataObj[item_refrel.key] : "";
									if (!refdataObj) {
										itemExtendData[item_refrelKey] = "";
									} else {
										for (var i = 0; i < refdataObj.length; i++) {
											var item_refrel_id = itemExtendData.item_refrel_id.split(',');
											var itemExtendData_item_refrelKey = "";
											item_refrel_id.forEach(function (refrel_id) {
												if (refrel_id == refdataObj[i].id) {
													itemExtendData_item_refrelKey += refdataObj[i][item_refrel.key] + ","
												}
											});
											if (itemExtendData_item_refrelKey) itemExtendData[item_refrelKey] = itemExtendData_item_refrelKey.substr(0, itemExtendData_item_refrelKey.length - 1);
											// if (itemExtendData.item_refrel_id == refdataObj[i].id) {
											// 	itemExtendData[item_refrelKey] = refdataObj[i][item_refrel.key];
											// }
										}
									}
								}
							}
							_curDtData.forEach(function (item) {
								if (item[curkey] == itemExtendData.item_refrel_id) {
									for (key in itemExtendData) {
										item[key] = itemExtendData[key];
									}
								}
							})
							return itemExtendData;
						});
						itemExtendDatas_Arr.push(itemExtendDatas);
					}
					for (var i = 0; i < docreferItems.length; i++) {
						var docreferItem = docreferItems[i];
						var item_docreferCodeKey = "refshowcontent_" + docreferItem.key + "_code";
						var item_docreferNameKey = "refshowcontent_" + docreferItem.key + "_name";
						var itemExtendDatas = docreferItem.docrefdataArrId.map(function (id, index) {
							var docrefdataObj = docreferItem.docrefdataArrId[index];
							var itemExtendData = {};
							itemExtendData[item_docreferCodeKey] = docrefdataObj ? docrefdataObj.code : "";
							itemExtendData[item_docreferNameKey] = docrefdataObj ? docrefdataObj.name : "";
							return itemExtendData;
						});
						itemExtendDatas_Arr.push(itemExtendDatas);
					}
					// this._extendArray(modelExtendData[bindType], itemExtendDatas_Arr);
					// console.log("构造modelExtendData为:", modelExtendData);
					// return modelExtendData;
					return _curDtData;
				}
			},
			//按顺序扩展数组中对象元素
			// [], [[{id: "1"}, {id: "2"}],[{code: "1_c"}, {code: "2_c"}]] => [{id: "1", code: "1_c"}, {id: "2"， code: "2_c"}]
			// 必须保证originArray.length === appendArray_Arr[i].length
			_extendArray: function (originArray, appendArray_Arr) {
				// console.log("被扩展对象数组:", originArray);
				// console.log("扩展对象数组_数组:", appendArray_Arr);
				for (var i = 0; i < appendArray_Arr.length; i++) {
					var appendArray = appendArray_Arr[i];
					for (var j = 0; j < appendArray.length; j++) {
						var appendObj = appendArray[j];
						if (!originArray[j]) {
							originArray[j] = {};
						}
						if (originArray[j]) u.extend(originArray[j], appendObj);
					}
				}
				// console.log("扩展后对象数组:", originArray);
			},
			
			removeImageItem: function (headSchema) {
				var imageItems = [];
				headSchema.comps.forEach(function (comp) {
					var noImageItems = [];
					comp.items.forEach(function (item) {
						if (item.type === "image") {
							imageItems.push(item);
						} else {
							noImageItems.push(item);
						}
					});
					comp.items = noImageItems;
				});
				return imageItems;
			},
			/**
			 * 给指定模型对应grid增加操作列
			 * 参数形如:
			 * [
			 *   {
			 *    "objectKey": "",
			 *    "btns": [
			 *      {
			 *        "showHTML": "<span>详情</span>",
			 *        "onClick": "child1Detail",
			 *      }
			 *    ]
			 *   }
			 * ]
			 *
			 */
			setGridOperations: function (options) {
				this.gridOperations = options;
			},
			getGridOperation: function (objectKey) {
				if (!this.gridOperations) {
					return;
				}
				if (!objectKey) {
					return this.gridOperations;
				}
				for (var i = 0; i < this.gridOperations.length; i++) {
					if (objectKey === this.gridOperations[i].objectKey) {
						return this.gridOperations[i];
					}
				}
			},
			/**
			 * 处理【ui-grid组件操作列】
			 */
			handleGridOperation: function (gridOption, objectKey) {
				var self = this
				var gridOperation = this.getGridOperation(objectKey);
				if (!gridOperation) {
					return;
				}
				gridOperation.btns && gridOperation.btns.forEach(function (operationBtn) {
					//在vmOfComp中创建操作列按钮点击事件（引用vmOfBusi中的同名事件）
					self.vmOfComp[operationBtn.onClick] = self.vmOfBusi[operationBtn.onClick];
				});
				this.vmOfComp["gridOperationRender_" + objectKey] = function (obj) {
					var operationColumnHTML = '<div class="ui-handle-icon">';
					gridOperation.btns && gridOperation.btns.forEach(function (operationBtn) {
						//生成操作列显示内容
						var rowId = obj.row.value["$_#_@_id"];
						operationColumnHTML += '' +
							'<span class="ui-handle-word margin-right-5">' +
							'<a href="#" data-bind="click: $root.' + operationBtn.onClick + '.bind($root, ' + obj.rowIndex + ", " + rowId + ')" >' +
							operationBtn.showHTML +
							'</a>' +
							'</span>';
					});
					operationColumnHTML += '</div>';
					obj.element.innerHTML = operationColumnHTML;
					ko.cleanNode(obj.element);
					ko.applyBindings(self.vmOfComp, obj.element);
				}
				var operationColumn = {
					field: "id",
					dataType: "String",
					editable: false,
					title: "操作",
					fixed: true,
					width: '200px',
					renderType: "operation",
				};
				gridOption.columns.push(operationColumn);
			},
			doValidate: function () {
				return this.vmOfComp.app.compsValidateMultiParam({ element: this.pageElement });
			}
		})

		DynamicTemplate.Search = function () {

		}
		DynamicTemplate.List = function (options) {
			DynamicTemplate.Base.call(this, options);
			this.pageTpl = Handlebars.compile(listTpl);
		}
		inheritPrototype(DynamicTemplate.List, DynamicTemplate.Base);
		u.extend(DynamicTemplate.List.prototype, {
			// 获取模板页面
			getPage: function (params) {
				this.matchParam = params.matchParam;
				this.matchSuccess = params.success;
				this.viewModel = params.viewModel;
				this.detailField = params.detailField;
				this.getTemplateSchema();
			},
			// 生命周期钩子，获取模板定义成功
			getTemplateSchemaSuccess: function (templateSchema) {
				this.templateSchema = templateSchema;
				this.renewModelDt();
				this.extendDtMeta();
				this.bindDtEvents();
				this.initVmOfComp();
				this.pageOption = this.buildPageOption();
				this.pageElement = document.createElement('div');
				this.pageElement.innerHTML = this.pageTpl(this.pageOption.list);
				ko.cleanNode(this.pageElement);
				u.createApp({
					el: this.pageElement,
					model: u.extend(this.vmOfComp, this.viewModel || {}, this.vmOfComp)
				});
				/* this.vmOfComp.app = u.createApp({
					el: this.pageElement,
					model: u.extend(this.vmOfComp, this.viewModel || {}, this.vmOfComp)
				}); */
				this.matchSuccess(this.pageElement);
			},
			/**
			 * 构造页面配置项，用于解析模板输出pageHTML
			 * @return {[type]} [description]
			 */
			buildPageOption: function () {
				var self = this;
				var pageOption = u.extend({}, this.templateSchema);
				pageOption.list && pageOption.list.comps.forEach(function (comp) {
					self.appendUICompForComp(comp);
				});
				return pageOption;
			},
			/**
			 * 给comp追加uicomp属性
			 */
			appendUICompForComp: function (comp) {
				var compId = this.generateUICompId();
				switch (comp.type) {
					case "form":
						comp.uicomp = {
							id: compId,
							type: "ui-grid",
							params: {
								vm: "$root",
								options: "$root.uicompsOption.grids." + compId + ".options",
							},
							pagination: JSON.stringify({ "type": "pagination", "data": this.getDtIdByObjectKey(comp.objectKey), "pageChange": "pageChange", "sizeChange": "sizeChange", "pageList": [5, 10, 20, 50, 100] }),
							dataBind: "text:" + this.getDtIdByObjectKey(comp.objectKey) + ".selectedIndices().length"
						}
						this.vmOfComp.uicompsOption.grids[compId] = {
							options: this.buildShowUIGridOption(comp, true),
						}
						break;
					default:
						console.error("不支持的模板组件类型");
				}
			},
			updateExtendData: function () {
				var self = this;
				var extendDatas = [];
				//解析模板schema，获取所有业务实体参照、自定义档案参照，并从业务数据DataTable提取主键
				//主表
				var heaItems = this.templateSchema.list;
				// var headCompType = this.templateSchema.head.comps[0].type;
				// var headBindType = this._getBindTypeByCompType(headCompType);
				// var headDataTable = this.vmOfComp[this.getDtIdByObjectKey(this.templateSchema.head.comps[0].objectKey)];
				// var headReferItems = [];
				// var headDocreferItems = [];
				// var headExtendData = {
				// 	objectKey: this.templateSchema.head.comps[0].objectKey,
				// 	dt: this.getDtIdByObjectKey(this.templateSchema.head.comps[0].objectKey),
				// 	bindType: headBindType, //绑定类型
				// 	referItems: [],
				// 	docreferItems: [],
				// };
				// for (var i = 0; i < headItems.length; i++) {
				// 	switch (headItems[i].type) {
				// 		case "refer":
				// 			var referItem = this._buildReferItem({
				// 				itemSchema: headItems[i],
				// 				bindType: headBindType,
				// 				dataTable: headDataTable,
				// 			});
				// 			headExtendData.referItems.push(referItem);
				// 			break;
				// 		case "docrefer":
				// 			var docreferItem = this._buildDocreferItem({
				// 				itemSchema: headItems[i],
				// 				bindType: headBindType,
				// 				dataTable: headDataTable,
				// 			});
				// 			headExtendData.docreferItems.push(docreferItem);
				// 			break;
				// 		default:
				// 	}
				// }
				// extendDatas.push(headExtendData);
				//子表
				// var tabs = this.templateSchema.tabs;
				// for (var i = 0; i < tabs.length; i++) {
				var comps = heaItems.comps;
				for (var j = 0; j < comps.length; j++) {
					var compBindType = "all";
					var compDataTableId = this.getDtIdByObjectKey(comps[j].objectKey);
					var compDataTable = this.vmOfComp[compDataTableId];
					var compExtendData = {
						objectKey: comps[j].objectKey,
						dt: compDataTableId,
						bindType: compBindType, //绑定类型
						referItems: [],
						docreferItems: [],
					};
					var compItems = comps[j].items;
					for (var i = 0; i < compItems.length; i++) {
						switch (compItems[i].type) {
							case "refer":
								var referItem = this._buildReferItem({
									itemSchema: compItems[i],
									bindType: compBindType,
									dataTable: compDataTable,
								});
								compExtendData.referItems.push(referItem);
								break;
							case "docrefer":
								var docreferItem = this._buildReferItem({
									itemSchema: compItems[i],
									bindType: compBindType,
									dataTable: compDataTable,
								});
								compExtendData.docreferItems.push(docreferItem);
								break;
							default:
						}
					}
					extendDatas.push(compExtendData);
				}
				// }
				// console.table(extendDatas)
				extendDatas.forEach(function (data) {
					if (data.referItems && data.referItems.length > 0) {
						data.referItems.forEach(function (item) {
							var reqData = {
								refDocId: item.refkey
							}
							// bindType 分为current和all两种情况
							// current为主表，单个查询；all为子表，同一参照不同行的批量查询
							if (data.bindType === 'current') {
								reqData.dataIds = item.refdataObjId
								item.refdataObj = {};
							} else if (data.bindType === 'all') {
								reqData.dataIds = item.refdataArrId.join(',')
								item.refdataArr = [];
							}
							if (!reqData.refDocId || !reqData.dataIds) {
								return true;
							}
							$._ajax({
								async: false,
								type: 'get',
								url: '/occ-base/base/ref-docs/getReferList',
								contentType: 'application/json; charset=utf-8',
								data: reqData,
								success: function (resdata) {
									// console.table(resdata);
									if (data.bindType === 'current') {
										item.refdataObj = resdata;
									} else if (data.bindType === 'all') {
										item.refdataArr = resdata;
									}
								}
							});
						});
					}
					if (data.docreferItems && data.docreferItems.length > 0) {
						data.docreferItems.forEach(function (item) {
							var reqData = {
								refDocId: item.refid
							}
							if (data.bindType === 'current') {
								reqData.dataIds = item.refdataObjId
								item.docrefdataObj = {};
							} else if (data.bindType === 'all') {
								reqData.dataIds = item.docrefdataArrId.join(',')
								item.docrefdataArr = [];
							}
							if (!reqData.refDocId || !reqData.dataIds) {
								return true;
							}
							$._ajax({
								async: false,
								type: 'get',
								url: '/occ-base/base/sys-docs/getReferList',
								contentType: 'application/json; charset=utf-8',
								data: reqData,
								success: function (resdata) {
									if (data.bindType === 'current') {
										item.docrefdataObj = resdata;
									} else if (data.bindType === 'all') {
										item.docrefdataArr = resdata;
									}
								}
							});
						});
					}
				});
				for (var i = 0; i < extendDatas.length; i++) {
					var compDataTable = self.vmOfComp[extendDatas[i].dt];
					var compBindType = extendDatas[i].bindType;
					extendDatas[i].modelExtendData = self._buildModelExtendData({
						bindType: extendDatas[i].bindType,
						referItems: extendDatas[i].referItems,
						docreferItems: extendDatas[i].docreferItems,
						dt: compDataTable
					});
					if (compBindType === "current") {
						var curRow = compDataTable.getCurrentRow();
						var curRowData = curRow.getSimpleData();
						u.extend(curRowData, extendDatas[i].modelExtendData["current"]);
						// console.log(extendDatas[i].dt + "组装扩展字段后的业务数据:", curRowData);
						curRow.setSimpleData(curRowData, {
							unSelect: true
						});
					} else {
						// var allRowData = compDataTable.getSimpleData();
						// 获取真实数据(过滤dr==1)
						// var allRowData = compDataTable.getRealSimpleData();
						// self._extendArray(allRowData, [extendDatas[i].modelExtendData["all"]]);
						// console.log(extendDatas[i].dt + "组装扩展字段后的业务数据:", allRowData);
						compDataTable.setSimpleData(extendDatas[i].modelExtendData, {
							unSelect: true
						});
					}
				}
				//后台请求获取全部关联数据
				// setTimeout(function() {
				// $._ajax({
				// 	type: 'get',
				// 	url: '/occ-base/base/sys-docs/getReferList',
				// 	contentType: 'application/json; charset=utf-8',
				// 	data: JSON.stringify(extendDatas),
				// 	success: function (completeExtendDatas) {
				// 		// var completeExtendDatas = test_completeExtendData(extendDatas);
				// 		//将关联数据组装成模型扩展数据，并赋值给DataTable
				// 		for (var i = 0; i < completeExtendDatas.length; i++) {
				// 			var compDataTable = self.vmOfComp[completeExtendDatas[i].dt];
				// 			var compBindType = completeExtendDatas[i].bindType;
				// 			completeExtendDatas[i].modelExtendData = self._buildModelExtendData({
				// 				bindType: completeExtendDatas[i].bindType,
				// 				referItems: completeExtendDatas[i].referItems,
				// 				docreferItems: completeExtendDatas[i].docreferItems,
				// 			});
				// 			if (compBindType === "current") {
				// 				var curRow = compDataTable.getCurrentRow();
				// 				var curRowData = curRow.getSimpleData();
				// 				u.extend(curRowData, completeExtendDatas[i].modelExtendData["current"]);
				// 				// console.log(completeExtendDatas[i].dt + "组装扩展字段后的业务数据:", curRowData);
				// 				curRow.setSimpleData(curRowData);
				// 			} else {
				// 				var allRowData = compDataTable.getSimpleData();
				// 				self._extendArray(allRowData, [completeExtendDatas[i].modelExtendData["all"]]);
				// 				// console.log(completeExtendDatas[i].dt + "组装扩展字段后的业务数据:", allRowData);
				// 				compDataTable.setSimpleData(allRowData);
				// 			}
				// 		}
				// 	}
				// });
				// }, 100);

			},
		});


		DynamicTemplate.Edit = function (options) {
			DynamicTemplate.Base.call(this, options);
			this.pageTpl = Handlebars.compile(editTpl);
			this.editChildButtons = options.editChildButtons;
			this.editChildTabButtons = options.editChildTabButtons;
			this.billStatus;
		}
		inheritPrototype(DynamicTemplate.Edit, DynamicTemplate.Base);
		u.extend(DynamicTemplate.Edit.prototype, {
			//获取模板页面
			getPage: function (params) {
				var self = this;
				this.matchParam = params.matchParam;
				this.matchSuccess = params.success;
				this.viewModel = params.viewModel;
				this.billStatus = params.billStatus;
				this.getTemplateSchema();
			},
			//生命周期钩子: 获取模板定义成功
			getTemplateSchemaSuccess: function (templateSchema) {
				this.templateSchema = templateSchema;
				this.renewModelDt();
				this.extendDtMeta();
				this.bindDtEvents();
				this.initVmOfComp();
				this.pageOption = this.buildPageOption();
				this.pageElement = document.createElement('div');
				this.pageElement.className = "tplEdit-panel-content";
				this.pageElement.innerHTML = this.pageTpl(this.pageOption);
				if (this.editChildButtons) {
					$(this.pageElement).find('.tab-content').after('<ui-buttons data-bind=\'visible:isBomPanel()\' params=\'datasource:$root.editChildButtons\'></ui-buttons>');
				}
				ko.cleanNode(this.pageElement);
				u.createApp({
					el: this.pageElement,
					model: u.extend(this.vmOfComp, this.viewModel || {}, this.vmOfComp)
					// model: this.vmOfComp
				});
				this.matchSuccess(this.pageElement);
			},
			/**
			 * 构造页面配置项，用于解析模板输出pageHTML
			 * @return {[type]} [description]
			 */
			buildPageOption: function () {
				var self = this;
				var pageOption = u.extend({}, this.templateSchema);
				pageOption.imageItems = this.removeImageItem(pageOption.head);
				pageOption.hasImage = pageOption.imageItems.length !== 0;
				pageOption.head && pageOption.head.comps.forEach(function (comp) {
					self.appendUICompForComp(comp);
				});
				pageOption.tabs && pageOption.tabs.forEach(function (tab) {
					tab.comps.forEach(function (comp) {
						self.appendUICompForComp(comp);
					});
				});
				return pageOption;
			},
			/**
			 * 给comp追加uicomp属性
			 */
			appendUICompForComp: function (comp) {
				var that = this;
				var groups = comp.groups ? comp.groups : [comp];
				if (comp.emptyGroup && comp.emptyGroup.length > 0) {
					var compId = that.generateUICompId();
					var dataTableId = that.getDtIdByObjectKey(comp.objectKey);
					comp.emptyGroup.uicomp = {
						id: compId,
						type: "ui-card",
						params: {
							vm: "$root",
							dt: "$root." + dataTableId,
							billstatus: "$root.uicompsOption.cards." + compId + ".billstatus",
							datasource: "$root.uicompsOption.cards." + compId + ".datasource",
						}
					};
					that.vmOfComp.uicompsOption.cards[compId] = {
						billstatus: that.billstatus,
						datasource: that.buildUICardDatasource(comp.items, dataTableId),
					};
				}
				groups.forEach(function (group) {
					var compId = that.generateUICompId();
					var dataTableId = that.getDtIdByObjectKey(comp.objectKey);
					switch (comp.type) {
						case "form":
							group.uicomp = {
								id: compId,
								type: "ui-card",
								params: {
									vm: "$root",
									dt: "$root." + dataTableId,
									billstatus: "$root.uicompsOption.cards." + compId + ".billstatus",
									datasource: "$root.uicompsOption.cards." + compId + ".datasource",
								}
							};
							that.vmOfComp.uicompsOption.cards[compId] = {
								billstatus: that.billstatus,
								datasource: that.buildUICardDatasource(comp.items, dataTableId),
							};
							break;
						case "table":
							group.uicomp = {
								id: compId,
								type: "ui-grid",
								params: {
									vm: "$root",
									options: "$root.uicompsOption.grids." + compId + ".options",
								},
							}
							that.vmOfComp.uicompsOption.grids[compId] = {
								options: that.buildEditUIGridOption(comp),
							}
							var uibuttonCompId = that.generateUICompId();
							comp.uibuttons = {
								id: uibuttonCompId,
								type: 'ui-buttons',
								params: {
									datasource: "$root.uicompsOption.buttons." + uibuttonCompId + ".datasource",
								}
							}
							var uiTabButtonCompId = that.generateUICompId();
							if (that.editChildTabButtons) {
								for (key in that.editChildTabButtons) {
									if (key == comp.objectKey) {
										comp.uiTabButtons = {
											id: uiTabButtonCompId,
											type: 'ui-buttons',
											params: {
												datasource: "$root.editChildTabButtons." + key,
											}
										}
									}
								}
							}

							that.vmOfComp.uicompsOption.buttons[uibuttonCompId] = {
								datasource: comp.buttons
							}
							//注入子表新增行
							that.vmOfComp.addTplChildRow = function (dataTable) {
								that[dataTable].createEmptyRow();
							}.bind(this.vmOfComp);
							//注入子表删除行
							that.vmOfComp.delTplChildRow = function (dataTable) {
								var selectedRows = that[dataTable].getSelectedRows();
								that[dataTable].removeRows(selectedRows);
							}.bind(that.vmOfComp);
							break;
						default:
							console.error("不支持的模板组件类型");
					}
				});
			},
		});

		DynamicTemplate.Dialog = function (options) {
			DynamicTemplate.Base.call(this, options);
			this.pageTpl = Handlebars.compile(dialogTpl);
			this.dialogComps = options.dialogComps;
			this.billStatus;
		}
		inheritPrototype(DynamicTemplate.Dialog, DynamicTemplate.Base);
		u.extend(DynamicTemplate.Dialog.prototype, {
			//获取模板页面
			getPage: function (params) {
				var self = this;
				this.matchParam = params.matchParam;
				this.matchSuccess = params.success;
				this.viewModel = params.viewModel;
				this.billStatus = params.billStatus;
				this.getTemplateSchema();
			},
			//生命周期钩子: 获取模板定义成功
			getTemplateSchemaSuccess: function (templateSchema) {
				this.templateSchema = templateSchema;
				this.renewModelDt();
				this.extendDtMeta();
				this.bindDtEvents();
				this.initVmOfComp();
				this.pageOption = this.buildPageOption();
				this.pageElement = document.createElement('div');
				this.pageElement.innerHTML = this.pageTpl(this.pageOption);
				ko.cleanNode(this.pageElement);
				u.createApp({
					el: this.pageElement,
					model: u.extend(this.vmOfComp, this.viewModel || {}, this.vmOfComp)
				});
				this.matchSuccess(this.pageElement);
			},
			/**
			 * 构造页面配置项，用于解析模板输出pageHTML
			 * @return {[type]} [description]
			 */
			buildPageOption: function () {
				var self = this;
				var pageOption = u.extend({}, this.templateSchema);
				pageOption.head && pageOption.head.comps.forEach(function (comp) {
					self.appendUICompForComp(comp);
				});
				return pageOption;
			},
			/**
			 * 给comp追加uicomp属性
			 */
			appendUICompForComp: function (comp) {
				var compId = this.generateUICompId();
				var dataTableId = this.getDtIdByObjectKey(comp.objectKey);
				var dialogComps = this.getDtDialogCompByObjectKey(comp.objectKey);

				switch (comp.type) {
					case "form":
						comp.uicomp = {
							id: compId,
							type: "ui-card",
							params: {
								vm: "$root",
								dt: "$root." + dataTableId,
								billstatus: "$root.uicompsOption.dialogs." + compId + ".billstatus",
								datasource: "$root.uicompsOption.dialogs." + compId + ".datasource",
								ref: "$root." + dialogComps
							}
						};
						this.vmOfComp.uicompsOption.dialogs[compId] = {
							billstatus: this.billstatus,
							datasource: this.buildUICardDatasource(comp.items, dataTableId),
						};
						break;
					default:
						console.error("不支持的模板组件类型");
				}
			},
			//更新模板扩展数据，如参照显示内容、参照关联字段、自定义档案参照名称、自定义档案参照编码
			updateExtendData: function () {
				var self = this;
				var extendDatas = [];
				//解析模板schema，获取所有业务实体参照、自定义档案参照，并从业务数据DataTable提取主键
				var headItems = this.templateSchema.head.comps[0].items;
				var headCompType = this.templateSchema.head.comps[0].type;
				var headBindType = this._getBindTypeByCompType(headCompType);
				var headDataTable = this.vmOfComp[this.getDtIdByObjectKey(this.templateSchema.head.comps[0].objectKey)];
				var headExtendData = {
					objectKey: this.templateSchema.head.comps[0].objectKey,
					dt: this.getDtIdByObjectKey(this.templateSchema.head.comps[0].objectKey),
					bindType: headBindType, //绑定类型
					referItems: [],
					docreferItems: [],
				};
				for (var i = 0; i < headItems.length; i++) {
					switch (headItems[i].type) {
						case "refer":
							var referItem = this._buildReferItem({
								itemSchema: headItems[i],
								bindType: headBindType,
								dataTable: headDataTable,
							});
							headExtendData.referItems.push(referItem);
							break;
						case "docrefer":
							var docreferItem = this._buildReferItem({
								itemSchema: headItems[i],
								bindType: headBindType,
								dataTable: headDataTable,
							});
							headExtendData.docreferItems.push(docreferItem);
							break;
						default:
					}
				}
				extendDatas.push(headExtendData);
				extendDatas.forEach(function (data) {
					if (data.referItems && data.referItems.length > 0) {
						data.referItems.forEach(function (item) {
							var reqData = {
								refDocId: item.refkey
							}
							// bindType 分为current和all两种情况
							// current为主表，单个查询；all为子表，同一参照不同行的批量查询
							if (data.bindType === 'current') {
								reqData.dataIds = item.refdataObjId
								item.refdataObj = {};
							} else if (data.bindType === 'all') {
								reqData.dataIds = item.refdataArrId.join(',')
								item.refdataArr = [];
							}
							if (!reqData.refDocId || !reqData.dataIds) {
								return true;
							}
							$._ajax({
								async: false,
								type: 'get',
								url: '/occ-base/base/ref-docs/getReferList',
								contentType: 'application/json; charset=utf-8',
								data: reqData,
								success: function (resdata) {
									if (data.bindType === 'current') {
										item.refdataObj = resdata;
									} else if (data.bindType === 'all') {
										item.refdataArr = resdata;
									}
								}
							});
						});
					}
				});
				for (var i = 0; i < extendDatas.length; i++) {
					var compDataTable = self.vmOfComp[extendDatas[i].dt];
					var compBindType = extendDatas[i].bindType;
					extendDatas[i].modelExtendData = self._buildModelExtendData({
						bindType: extendDatas[i].bindType,
						referItems: extendDatas[i].referItems,
						docreferItems: extendDatas[i].docreferItems,
					});
					if (compBindType === "current") {
						var curRow = compDataTable.getCurrentRow();
						var curRowMetas = extendDatas[i].modelExtendData["current"];
						for (key in curRowMetas) {
							var _val = curRowMetas[key];
							if (_val) curRow.setValue(key, _val)
						}
					} else {
						// 获取真实数据(过滤dr==1)
						var allRowData = compDataTable.getRealSimpleData();
						self._extendArray(allRowData, [extendDatas[i].modelExtendData["all"]]);
						compDataTable.setSimpleData(allRowData, {
							unSelect: true
						});
					}
				}
			},
		});


		DynamicTemplate.Detail = function (options) {
			DynamicTemplate.Base.call(this, options);
			this.pageTpl = Handlebars.compile(detailTpl);
			this.detailChildButtons = options.detailChildButtons;
			this.gridOperations;
		}
		inheritPrototype(DynamicTemplate.Detail, DynamicTemplate.Base);
		u.extend(DynamicTemplate.Detail.prototype, {
			//获取模板页面
			getPage: function (params) {
				var self = this;
				this.matchParam = params.matchParam;
				this.matchSuccess = params.success;
				this.viewModel = params.viewModel;
				this.getTemplateSchema();
			},
			//生命周期钩子: 获取模板定义成功
			getTemplateSchemaSuccess: function (templateSchema) {
				this.templateSchema = templateSchema;
				this.renewModelDt();
				this.extendDtMeta();
				this.bindDtEvents();
				this.initVmOfComp();
				this.pageOption = this.buildPageOption();
				this.pageElement = document.createElement('div');
				this.pageElement.className = "tplDetail-panel-content";
				this.pageElement.innerHTML = this.pageTpl(this.pageOption);
				if (this.detailChildButtons) {
					$(this.pageElement).find('.tab-content').after('<ui-buttons data-bind=\'visible:isBomPanel()\' params=\'datasource:$root.detailChildButtons\'></ui-buttons>');
				}
				ko.cleanNode(this.pageElement);
				u.createApp({
					el: this.pageElement,
					model: u.extend(this.vmOfComp, this.viewModel || {}, this.vmOfComp)
				});
				/* this.vmOfComp.app = u.createApp({
					el: this.pageElement,
					model: u.extend(this.vmOfComp, this.viewModel || {}, this.vmOfComp)
				}); */
				this.matchSuccess(this.pageElement);
			},
			/**
			 * 构造页面配置项，用于解析模板输出pageHTML
			 * @return {[type]} [description]
			 */
			buildPageOption: function () {
				var self = this;
				var pageOption = u.extend({}, this.templateSchema);
				pageOption.imageItems = this.removeImageItem(pageOption.head);
				var headDataTableId = this.getDtIdByObjectKey(pageOption.head.comps[0].objectKey);
				pageOption.imageItems.forEach(function (imageItem) {
					self.appendUIImglist(imageItem, headDataTableId);
				});
				pageOption.hasImage = pageOption.imageItems.length === 0 ? false : true;
				pageOption.head && pageOption.head.comps.forEach(function (comp) {
					self.appendUICompForComp(comp);
				});
				pageOption.tabs && pageOption.tabs.forEach(function (tab) {
					tab.comps.forEach(function (comp) {
						self.appendUICompForComp(comp);
					});
				});
				return pageOption;
			},
			/**
			 * 给imageItem追加uiimglist属性
			 */
			appendUIImglist: function (imageItem, dataTableId) {
				imageItem.uiimglist = {
					params: {
						dt: '$root.' + dataTableId,
						key: imageItem.key,
					}
				}
			},
			/**
			 * 给comp追加uicomp属性
			 */
			appendUICompForComp: function (comp) {
				var that = this;
				var groups = comp.groups ? comp.groups : [comp];
				if (comp.emptyGroup && comp.emptyGroup.length > 0) {
					var compId = that.generateUICompId();
					var dataTableId = that.getDtIdByObjectKey(comp.objectKey);
					comp.emptyGroup.uicomp = {
						id: compId,
						type: "ui-detail",
						params: {
							vm: "$root",
							dt: "$root." + dataTableId,
							datasource: "$root.uicompsOption.details." + compId + ".datasource",
						}
					};
					that.vmOfComp.uicompsOption.details[compId] = {
						datasource: that.buildUIDetailDatasource(comp.emptyGroup, dataTableId),
					};
				}
				groups.forEach(function (group) {
					var compId = that.generateUICompId();
					var dataTableId = that.getDtIdByObjectKey(comp.objectKey);
					switch (comp.type) {
						case "form":
							group.uicomp = {
								id: compId,
								type: "ui-detail",
								params: {
									vm: "$root",
									dt: "$root." + dataTableId,
									datasource: "$root.uicompsOption.details." + compId + ".datasource",
								}
							};
							that.vmOfComp.uicompsOption.details[compId] = {
								datasource: that.buildUIDetailDatasource(group.items),
							};
							break;
						case "table":
							group.uicomp = {
								id: compId,
								type: "ui-grid",
								params: {
									vm: "$root",
									options: "$root.uicompsOption.grids." + compId + ".options",
								},
							}
							that.vmOfComp.uicompsOption.grids[compId] = {
								options: that.buildShowUIGridOption(group, true),
							}
							break;
						default:
							console.error("不支持的模板组件类型");
					}
				});
			},
		});
		Utils = {};
		Utils.getrefrelKey = function (referItemSchema, refrel) {
			return "refrel_" + referItemSchema.key + "_" + refrel.key;
		}
		return DynamicTemplate;
	});