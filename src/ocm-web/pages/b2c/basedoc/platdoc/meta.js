/*****功能节点：平台档案****/
define(["ocm_basemodel"], function(basemodel) {
	'use strict';
	var model = {
		metas: {
			platformMeta: {
				meta: {
					id: { type: "string" }, //主键
					code: { type: "string", required: true, maxLength: 30 }, //平台编码
					name: { type: "string", required: true, maxLength: 30 }, //平台名称
					params: { type: "string", required: true, maxLength: 100 }, //平台参数
					ts: { type: "string" }, //时间戳
					dr: { type: "string" }, //删除标识
					pk_org: { type: "string" }, //组织
					creator: { type: "string" }, //创建人
					creationTime: { type: "datetime" }, //创建时间
					modifier: { type: "string" }, //修改人
					modifiedTime: { type: "datetime" } //修改时间
				},
				pageSize: 10,
				//是否启用前端缓存
				// pageCache: true
			}
		},
		buttons: {
			button1: []
		},
		searchs: {
			search1: [{
					type: "text",
					key: "code",
					label: "平台编码"
				},
				{
					type: "text",
					key: "name",
					label: "平台名称",
				}
			]
		},
		dialogs: {
			dialog1: [{
					type: "text",
					key: "code",
					label: "平台编码",
					// disableInEdit:true
				},
				{
					type: "text",
					key: "name",
					label: "平台名称"
				},
				{
					type: "text",
					key: "params",
					label: "平台参数",
				}
			]
		},
		grids: {
			grid1: {
				domid: "platformdoc",
				umeta: {
					id: "grid_platformdoc",
					data: "simpleList",
					type: "grid",
					editable: false,
					multiSelect: true,
					showNumCol: true,
				},
				columns: [{
						field: "code",
						dataType: "String",
						title: "平台编码",
					},
					{
						field: "name",
						dataType: "String",
						title: "平台名称",
					},
					{
						field: "params",
						dataType: "String",
						title: "平台参数",
					},
					{
						field: "creator",
						dataType: "String",
						title: "创建人",
						visible: false
					},
					{
						field: "modifier",
						dataType: "String",
						title: "修改人",
						visible: false
					},
					{
						field: "creationTime",
						dataType: "Date",
						title: "创建时间",
						visible: false
					},
					{
						field: "modifiedTime",
						dataType: "Date",
						title: "修改时间",
						visible: false
					},

//					{
//						field: "operation",
//						dataType: "String",
//						title: "操作",
//						renderType: "operation4single",
//						fixed: true,
//						width: "110px"
//					},
				]
			}
		}
	};
	return new basemodel(model);
});