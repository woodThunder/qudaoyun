define(["ocm_basemodel"], function (basemodel) {
	"use strict";
	var model = {
		metas: {
			AllowSaleProductmeta: {
				params: {
					cls: "com.yonyou.ocm.base.service.dto.AllowSaleProductDto"
				},
				meta: {
					organizationId: {
						required: true,
						refmodel: JSON.stringify(refinfo["organization_ocm"]),
						refcfg: '{"ctx":"/uitemplate_web"}',
						refparam: '{"EQ_isEnable":"1","EQ_orgFuncRel":"01"}' //销售组织
					}, //销售组织
					organizationCode: { type: "string" }, //销售组织编码
					organizationName: { type: "string" }, //销售组织
					customerCategoryId: {
						refmodel: JSON.stringify(refinfo["customer-category"]),
						refcfg: '{"ctx":"/uitemplate_web"}'
					}, // 客户分类
					customerCategoryCode: { type: "string" }, //客户分类编码
					customerCategoryName: { type: "string" }, //客户分类名称
					customerId: {
						refmodel: JSON.stringify(refinfo["customer"]),
						refcfg: '{"ctx":"/uitemplate_web", "isMultiSelectedEnabled":true}',
						refparam: '{"EQ_isEnable":"1", "EQ_isChannelCustomer":"1"}',
					}, // 客户
					customerCode: { type: "string" }, // 客户编码
					customerName: { type: "string" }, // 客户名称
					goodsCategoryId: {
						refmodel: JSON.stringify(refinfo["goodsCategory"]),
						refcfg: '{"ctx":"/uitemplate_web"}'
					}, // 商品分类
					goodsCategoryCode: { type: "string" }, // 商品分类编码
					goodsCategoryName: { type: "string" }, // 商品分类名称
					goodsId: {
						refmodel: JSON.stringify(refinfo["goods"]),
						refparam: '{"EQ_isEnable":"1","EQ_isServiceType":"0"}',
						refcfg: '{"ctx":"/uitemplate_web", "isMultiSelectedEnabled":true}'
					}, // 商品
					goodsCode: { type: "string" }, // 商品编码
					goodsName: { type: "string" }, // 商品名称
					// 市场区域
					marketAreaId: {
						refmodel: JSON.stringify(refinfo["market"]),
						refparam: '{"EQ_isEnable":"1"}',
						refcfg: '{"ctx":"/uitemplate_web", "isMultiSelectedEnabled":true}'
					},
					marketAreaCode: { type: "string" },
					marketAreaName: { type: "string" },
					brandId: {
						refmodel: JSON.stringify(refinfo["brand"]),
						refcfg: '{"ctx":"/uitemplate_web"}'
					}, // 商品
					brandCode: { type: "string" }, // 商品编码
					brandName: { type: "string" }, // 商品名称
					isExclude: { type: "string" }, //是否禁止
				},
				pageSize: 10
				//是否启用前端缓存
				// pageCache: true
			}
		},
		buttons: {
			button1: [
				{
					key: "editRow",
					label: "编辑",
					iconCls: "icon-edit",
					click: "beforeEdit",
					clickArg: ["$data", -1]
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
			button2: [
				{
					key: "saveRow",
					label: "保存",
					iconCls: "icon-save",
					click: "saveRow",
					clickArg: ["$data", -1]
				},
				{
					key: "cancelRow",
					label: "取消",
					iconCls: "icon-save",
					click: "cancelRow",
					clickArg: ["$data", -1]
				},
				{
					key: "addRow",
					label: "增行",
					iconCls: "icon-plus",
					click: "addRow",
					clickArg: ["$data", -1]
				},
				{
					key: "delChild",
					label: "删行",
					iconCls: "icon-shanchu1",
					click: "delChild"
				}
			]
		},
		searchs: {
			search1: [
				{
					type: "refer",
					key: "organization",
					label: "销售组织",
					refinfo: "organization_ocm",
					clientParam: { EQ_orgFuncRel: "01", "AUTH_refdim": "organization" } //销售组织
				},
				{
					type: "refer",
					key: "customerCategory",
					label: "客户分类",
					refinfo: "customer-category",
					clientParam: { "AUTH_refdim": "customerCategory" }
				},
				{
					type: "refer",
					key: "customer",
					label: "客户",
					refinfo: "customer",
					clientParam: { "AUTH_refdim": "customer" }
				},
				{
					type: "refer",
					key: "goodsCategory",
					label: "商品分类",
					refinfo: "goodsCategory",
					clientParam: { "AUTH_refdim": "goodsCategory" }
				},
				{
					type: "refer",
					key: "goods",
					label: "商品",
					refinfo: "goods",
					opr: "IN",
					refcfg: {
						ctx: "/uitemplate_web",
						isMultiSelectedEnabled: "true",
					}
				},
				{
					type: "refer",
					key: "brand",
					label: "品牌",
					refinfo: "brand"
				}
			]
		},
		grids: {
			grid1: {
				domid: "AllowSaleProduct",
				umeta: {
					id: "grid_AllowSaleProduct",
					data: "AllowSaleProductList",
					type: "grid",
					editable: false,
					multiSelect: true,
					showNumCol: true
				},
				columns: [
					{
						field: "organizationId",
						dataType: "String",
						title: "销售组织",
						renderType: "ncReferRender",
						editType: "ncReferEditType",
						showField: "organizationName",
						required: true,
						editOptions: {
							validType: "string",
							rel: {
								refpk: "organizationId",
								refname: "organizationName"
							}
						}
					},
					{
						field: "customerCategoryId",
						dataType: "String",
						title: "客户分类",
						renderType: "ncReferRender",
						editType: "ncReferEditType",
						showField: "customerCategoryName",
						editOptions: {
							validType: "string",
							rel: {
								refpk: "customerCategoryId",
								refname: "customerCategoryName"
							}
						}
					},
					{
						field: "customerId",
						dataType: "String",
						title: "客户",
						renderType: "ncReferRender",
						editType: "ncReferEditType",
						showField: "customerName",
						editOptions: {
							validType: "string",
							rel: {
								refpk: "customerId",
								refname: "customerName"
							}
						}
					},
					{
						field: "goodsCategoryId",
						dataType: "String",
						title: "商品分类",
						renderType: "ncReferRender",
						editType: "ncReferEditType",
						showField: "goodsCategoryName",
						editOptions: {
							validType: "string",
							rel: {
								refpk: "goodsCategoryId",
								refname: "goodsCategoryName"
							}
						}
					},
					{
						field: "marketAreaId",
						dataType: "String",
						title: "市场区域",
						renderType: "ncReferRender",
						editType: "ncReferEditType",
						showField: "marketAreaName",
						editOptions: {
							validType: "string",
							rel: {
								refpk: "marketAreaId",
								refname: "marketAreaName",
								refcode: "marketAreaCode",
							}
						}
					},
					{
						field: "goodsId",
						dataType: "String",
						title: "商品",
						renderType: "ncReferRender",
						editType: "ncReferEditType",
						showField: "goodsName",
						editOptions: {
							validType: "string",
							rel: {
								refpk: "goodsId",
								refname: "goodsName"
							}
						}
					},
					{
						field: "brandId",
						dataType: "String",
						title: "品牌",
						renderType: "ncReferRender",
						editType: "ncReferEditType",
						showField: "brandName",
						editOptions: {
							validType: "string",
							rel: {
								refpk: "brandId",
								refname: "brandName"
							}
						}
					},
					// {
					//   field: "isEnable",
					//   dataType: "String",
					//   title: "启用状态",
					//   renderType: "enableRender",
					//   editable: false
					// },
					{
						field: "isExclude",
						dataType: "checkbox",
						title: "是否禁止",
						renderType: "allowBooleanRender",
					},
				]
			}
		}
	};
	return new basemodel(model);
});
