define(["ocm_basemodel"], function (basemodel) {
	"use strict";
	var model = {
		metas: {
			LadderPriceChildMeta: {
				params: {
					cls: "com.yonyou.occ.price.service.dto.LadderPriceDetailDto"
				},
				meta: {
					count: { type: 'string' },
					ladderindex: { type: 'string' },
					ladderadd: { type: 'string' }
				}
			},
			LadderPricemeta: {
				params: {
					cls: "com.yonyou.occ.price.service.dto.LadderPriceDto"
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
					goodsId: {
						refmodel: JSON.stringify(refinfo["goods"]),
						refparam: '{"EQ_isEnable":"1","EQ_isServiceType":"0"}',
						refcfg: '{"ctx":"/uitemplate_web", "isMultiSelectedEnabled":true}'
					}, // 商品
					goodsCode: { type: "string" }, // 商品编码
					goodsName: { type: "string" }, // 商品名称
					productId: {
						refmodel: JSON.stringify(refinfo["product"]),
						refparam: '{"EQ_isEnable":"1"}',
						refcfg: '{"ctx":"/uitemplate_web", "isMultiSelectedEnabled":true}'
					}, // 商品
					productCode: { type: "string" }, // 产品编码
					productName: { type: "string" }, // 产品名称
					brandId: {
						refmodel: JSON.stringify(refinfo["brand"]),
						refcfg: '{"ctx":"/uitemplate_web"}'
					}, // 商品
					brandCode: { type: "string" }, // 品牌编码
					brandName: { type: "string" }, // 品牌名称
					goodscategoryId: {
						refmodel: JSON.stringify(refinfo["goodsCategory"]),
						refcfg: '{"ctx":"/uitemplate_web"}'
					}, // 商品分类
					goodscategoryCode: { type: "string" }, // 商品分类编码
					goodscategoryName: { type: "string" }, // 商品分类名称

					shopId: {
						type: 'string',
						"refmodel": JSON.stringify(refinfo['shop']),
						"refcfg": '{"ctx":"/uitemplate_web","refname":"门店"}',
					},//所属门店
					shopCode: { type: 'string', required: true },//编码
					shopName: { type: 'string', required: true },//名称
					customerId: {
						refmodel: JSON.stringify(refinfo["customer"]),
						refcfg: '{"ctx":"/uitemplate_web", "isMultiSelectedEnabled":true}',
						refparam: '{"EQ_isEnable":"1", "EQ_isChannelCustomer":"1"}',
					}, // 客户
					customerCode: { type: "string" }, // 客户编码
					customerName: { type: "string" }, // 客户名称
					customercategoryId: {
						refmodel: JSON.stringify(refinfo["customer-category"]),
						refcfg: '{"ctx":"/uitemplate_web"}'
					}, // 客户分类
					customercategoryCode: { type: "string" }, //客户分类编码
					customercategoryName: { type: "string" }, //客户分类名称
					customerlevelId: {
						type: "string",
						required: true,
						refmodel: JSON.stringify(refinfo["customer-level"]),
						refcfg: '{"ctx":"/uitemplate_web"}'
					}, //
					customerlevelCode: { type: "string", required: true },
					customerlevelName: { type: "string", required: true },
					// 市场区域
					marketareaId: {
						refmodel: JSON.stringify(refinfo["market"]),
						refparam: '{"EQ_isEnable":"1"}',
						refcfg: '{"ctx":"/uitemplate_web", "isMultiSelectedEnabled":true}'
					},
					marketareaCode: { type: "string" },
					marketareaName: { type: "string" },
					startdate: {// 起始日期
						type: 'datetime',
					},
					enddate: {// 截止日期
						type: 'datetime',
					},
					ladderPriceDetail: {
						type: 'string'
					}
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
					key: "delRow",
					label: "删行",
					iconCls: "icon-shanchu1",
					click: "delRow"
				}
			],
			button3: [
				{
					key: "addChild",
					label: "新增",
					iconCls: "icon-save",
					click: "addChild",
					clickArg: ["$data", -1]
				},
				{
					key: "delchild",
					label: "删除",
					iconCls: "icon-save",
					click: "delchild",
					clickArg: ["$data", -1]
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
					required: true,
					clientParam: { EQ_orgFuncRel: "01", "AUTH_refdim": "organization" } //销售组织
				}
			]
		},
		grids: {
			grid1: {
				domid: "LadderPriceList",
				umeta: {
					id: "grid_LadderPriceList",
					data: "LadderPriceList",
					type: "grid",
					groupField: "organizationId",
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
						visible: false,
						editOptions: {
							validType: "string",
							rel: {
								refpk: "organizationId",
								refname: "organizationName"
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
						field: "productId",
						dataType: "String",
						title: "产品",
						renderType: "ncReferRender",
						editType: "ncReferEditType",
						showField: "productName",
						editOptions: {
							validType: "string",
							rel: {
								refpk: "productId",
								refname: "productName"
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
					{
						field: "goodscategoryId",
						dataType: "String",
						title: "商品分类",
						renderType: "ncReferRender",
						editType: "ncReferEditType",
						showField: "goodscategoryName",
						editOptions: {
							validType: "string",
							rel: {
								refpk: "goodscategoryId",
								refname: "goodscategoryName"
							}
						}
					},
					{
						field: "shopId",
						dataType: "String",
						title: "门店",
						renderType: "ncReferRender",
						editType: "ncReferEditType",
						showField: "shopName",
						editOptions: {
							validType: "string",
							rel: {
								refpk: "shopId",
								refname: "shopName"
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
						field: "customercategoryId",
						dataType: "String",
						title: "客户分类",
						renderType: "ncReferRender",
						editType: "ncReferEditType",
						showField: "customercategoryName",
						editOptions: {
							validType: "string",
							rel: {
								refpk: "customercategoryId",
								refname: "customercategoryName"
							}
						}
					},
					{
						field: "customerlevelId",
						dataType: "String",
						title: "客户等级",
						renderType: "ncReferRender",
						editType: "ncReferEditType",
						showField: "customerlevelName",
						editOptions: {
							validType: "string",
							rel: {
								refpk: "customerlevelId",
								refname: "customerlevelName"
							}
						}
					},
					{
						field: "marketareaId",
						dataType: "String",
						title: "市场区域",
						renderType: "ncReferRender",
						editType: "ncReferEditType",
						showField: "marketareaName",
						editOptions: {
							validType: "string",
							rel: {
								refpk: "marketareaId",
								refname: "marketareaName",
								refcode: "marketareaCode",
							}
						}
					},
					{
						field: "startdate",
						dataType: "date",
						title: "起始日"
					},
					{
						field: "enddate",
						dataType: "date",
						title: "截止日"
					},
					{
						field: "organizationCode",
						dataType: "text",
						title: "操作",
						renderType: "editOperation"
					}
				]
			},
			grid2:{
				domid: "LadderPriceChildList",
				umeta: {
				    id: "grid_LadderPriceChildList",
					data: "LadderPriceChildList",
					type: "grid",
					groupField: "organizationId",
					editable: true,
					multiSelect: true,
					showNumCol: true
				},
				columns: [
					{
						field: "count",
						dataType: "text",
						title: "数量大于",
						required: true
					},
					{
						field: "ladderindex",
						dataType: "text",
						title: "价格指数",
						required: true
					},
					{
						field: "ladderadd",
						dataType: "text",
						title: "价格加成",
						required: true
					},
					{
						field: "count",
						dataType: "text",
						title: "操作",
						renderType: "delchildRender",
						editable: false
					}
				]
			},
            grid3:{
                domid: "LadderPriceChildListView",
                umeta: {
                    id: "grid_LadderPriceChildList_view",
                    data: "LadderPriceChildList",
                    type: "grid",
                    groupField: "organizationId",
                    editable: false,
                    multiSelect: false,
                    showNumCol: true
                },
                columns: [
                    {
                        field: "count",
                        dataType: "text",
                        title: "数量大于"
                    },
                    {
                        field: "ladderindex",
                        dataType: "text",
                        title: "价格指数"
                    },
                    {
                        field: "ladderadd",
                        dataType: "text",
                        title: "价格加成"
					}
				]
			}
		}
	};
	return new basemodel(model);
});
