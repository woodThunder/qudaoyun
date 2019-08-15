define(["ocm_basemodel"], function (basemodel) {
	"use strict";
	var model = {
		metas: {
			// 托型设置
			poControlRulemeta: {
				meta: {
					trayName: { type: "string", required: true }, //托型Name
					trayCode: { type: "string", required: true }, //托型Code
					id: { type: "string", required: true } //托型Id
				},
				pageSize: 10
				//是否启用前端缓存
				// pageCache: true
			},
			// 托型规则设置
			ruleSettingmeta: {
				meta: {
					trayId: { type: "string" }, //托型Id
					trayName: { type: "string" }, //托型Name
					trayCode: { type: "string" }, //托型Code
					goodsId: { type: "string", required: true }, //商品Id
					goodsName: { type: "string", required: true }, //商品Name
					goodsCode: { type: "string", required: true }, //商品Code
					weightUnitId: { type: "string" }, //重量单位
					weightUnitName: { type: "string" }, //重量单位Name
					volumeUnitId: { type: "string" }, //体积单位
					volumeUnitName: { type: "string" }, //体积单位Name
					dimension: { type: "string", required: true, default: "1" }, //对应依据
					goodsNumber: { type: "string" }, //商品数量
					maxWeight: { type: "string" }, //载重量
					maxVolume: { type: "string" } //最大装载体积
				},
				pageSize: 10,
				params: {
					dialogcardUseDynamicRequired: true
				}
			}
		},
		buttons: {
			// 托型设置
			button1: [
				{
					key: "add",
					label: "新增",
					iconCls: "icon-plus",
					click: "beforeEdit"
				},
				{
					key: "del",
					label: "删除",
					iconCls: "icon-shanchu1",
					click: "del"
				},
				{
					key: "import",
					label: "导入",
					iconCls: "icon-import",
					click: "importHandle"
				},
				{
					key: "export",
					label: "导出",
					iconCls: "icon-export",
					click: "exportHandle"
				}
			],
			// 托型规则设置
			button2: [
				{
					key: "add",
					label: "新增",
					iconCls: "icon-plus",
					click: "addruleFn"
				},
				{
					key: "del",
					label: "删除",
					iconCls: "icon-shanchu1",
					click: "ruledel"
				},
				{
					key: "del",
					label: "返回",
					iconCls: "icon-shanchu1",
					click: "goback"
				},
				{
					key: "item-import",
					label: "导入",
					iconCls: "icon-import",
					click: "item_importHandle"
				},
				{
					key: "item-export",
					label: "导出",
					iconCls: "icon-export",
					click: "item_exportHandle"
				}
			]
		},
		searchs: {
			// 托型设置
			search1: [
				{
					type: "refer",
					key: "trayCodeSearch",
					label: "托型编码"
				},
				{
					type: "text",
					key: "trayNameSearch",
					label: "托型名称"
				}
			]
		},
		dialogs: {
			// 托型设置
			dialog1: [
				{
					type: "text",
					key: "trayCode",
					label: "托型编码"
				},
				{
					type: "text",
					key: "trayName",
					label: "托型名称"
				}
			],
			// 托型规则设置
			dialog2: [
				{
					type: "refer",
					key: "goodsId",
					label: "商品名称",
					refinfo: "goods"
				},
				{
					type: "combo",
					key: "dimension",
					label: "核算依据",
					dataSource: [
						{ value: "3", name: "重量" },
						{ value: "2", name: "体积" },
						{ value: "1", name: "数量" }
					],
					onlySelect: true,
					required: true,
					fn: {
						after: function (data) {
							if (data.newValue == 1) {
								data.row.setValue("maxWeight", "");
								data.row.setValue("weightUnitId", "");
								data.row.setValue("maxVolume", "");
								data.row.setValue("volumeUnitId", "");
							} else if (data.newValue == 3) {
								data.row.setValue("maxVolume", "");
								data.row.setValue("volumeUnitId", "");
								data.row.setValue("goodsNumber", "");
							} else {
								data.row.setValue("maxWeight", "");
								data.row.setValue("weightUnitId", "");
								data.row.setValue("goodsNumber", "");
							}
						}
					}
				},
				{
					type: "intinput",
					key: "goodsNumber",
					label: "一托可装载数量",
					required: true,
					fn: {
						before: function (row) {
							if (
								row.getValue("dimension") == 2 ||
								row.getValue("dimension") == 3
							) {
								return false;
							}
						}
						// required: function(data) {
						//   if (data["dimension"] == 1) {
						//     debugger;
						//     return true;
						//   }
						// }
					}
				},
				{
					type: "intinput",
					key: "maxWeight",
					label: "一托可装载重量",
					required: true,
					fn: {
						before: function (row) {
							if (
								row.getValue("dimension") == 1 ||
								row.getValue("dimension") == 2
							) {
								return false;
							}
						}
						// required: function(data) {
						//   if (data["dimension"] == 3) {
						//     return true;
						//   }
						// }
					}
				},
				{
					type: "refer",
					key: "weightUnitId",
					label: "重量单位",
					refinfo: "utils"
				},
				{
					type: "intinput",
					key: "maxVolume",
					label: "一托可装载体积",
					required: true,
					fn: {
						before: function (row) {
							if (
								row.getValue("dimension") == 1 ||
								row.getValue("dimension") == 3
							) {
								return false;
							}
						}
						// required: function(data) {
						//   if (data["dimension"] == 2) {
						//     return true;
						//   }
						// }
					}
				},
				{
					type: "refer",
					key: "volumeUnitId",
					label: "体积单位",
					refinfo: "utils"
				}
			]
		},
		grids: {
			// 托型设置
			grid1: {
				domid: "POControlRule",
				umeta: {
					id: "grid_SupporttypeSetting",
					data: "simpleList",
					type: "grid",
					editable: false,
					multiSelect: true,
					showNumCol: true
				},
				columns: [
					// {
					//   field: "id",
					//   dataType: "String",
					//   title: "托型ID",
					//   width: "300px"
					// },
					{
						field: "trayCode",
						dataType: "String",
						title: "托型编码"
					},
					{
						field: "trayName",
						dataType: "String",
						title: "托型名称"
					},
					{
						field: "operation",
						dataType: "String",
						title: "满托规则",
						renderType: "fullruleSet",
						fixed: true,
						width: "110px"
					},
					{
						field: "operation",
						dataType: "String",
						title: "操作",
						renderType: "operation4single",
						fixed: true,
						width: "110px"
					}
				]
			},
			// 托型规则设置
			grid2: {
				domid: "ruleSetting",
				umeta: {
					id: "grid_ruleSetting",
					data: "rulessimpleList",
					type: "grid",
					editable: false,
					multiSelect: true,
					showNumCol: true
				},
				columns: [
					{
						field: "goodsName",
						dataType: "String",
						title: "商品名称",
						width: "300px"
					},
					{
						field: "dimension",
						dataType: "String",
						title: "核算依据",
						renderType: "dimensionFn"
					},
					{
						field: "goodsNumber",
						dataType: "Integer",
						title: "装载数量"
					},
					{
						field: "maxWeight",
						dataType: "Integer",
						title: "装载重量",
						renderType: "unitShowFn"
					},
					{
						field: "maxVolume",
						dataType: "Integer",
						title: "装载体积",
						renderType: "unitShowFn"
					},
					{
						field: "operation",
						dataType: "String",
						title: "操作",
						renderType: "operation4rule",
						fixed: true,
						width: "110px"
					}
				]
			}
		}
	};
	return new basemodel(model);
});
