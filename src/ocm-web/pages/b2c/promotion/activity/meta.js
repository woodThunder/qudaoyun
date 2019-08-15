/*****功能节点：活动设置****/
define(["ocm_basemodel"], function(basemodel) {
	'use strict';
	var model = {
		metas: {
			activityMeta: {
				meta: {
					code: {
						type: 'string',
						maxLength: 50,
						required: true
					},
					name: {
						type: 'string',
						maxLength: 100,
						required: true
					},
					theme: {
						type: 'string',
						maxLength: 500,
						required: true
					},
					isEnable: {
						type: 'Integer',
						default: '0'
					}, //是否生效

					id: {
						type: "string"
					}, //主键
					ts: {
						type: "string"
					}, //时间戳
					dr: {
						type: "string"
					}, //删除标识
					creator: {
						type: "string"
					}, //创建人
					creationTime: {
						type: "datetime"
					}, //创建时间
					modifier: {
						type: "string"
					}, //修改人
					modifiedTime: {
						type: "datetime"
					} //修改时间
				},
				pageSize: 10,
				//是否启用前端缓存
				// pageCache: true
			}
		},
		buttons: {
			button1: [{
				key: "add",
				label: "新增",
				iconCls: "icon-plus",
				click: "beforeEdit"
			}, {
				key: "del",
				label: "删除",
				iconCls: "icon-shanchu1",
				click: "del"
			}, {
				key: "enable",
				label: "启用",
				iconCls: "icon-qiyong",
				click: "enable"
			}, {
				key: "disable",
				label: "停用",
				iconCls: "icon-tingyong",
				click: "disable"
			}]
		},
		searchs: {
			search1: [{
				type: "text",
				key: "code",
				label: "活动编码"
			}, {
				type: "text",
				key: "name",
				label: "活动名称"
			}, {
				type: "radio",
				key: "isEnable",
				label: "启用状态",
				dataSource: [{
					value: '',
					name: '全部'
				}, {
					value: '1',
					name: '启用'
				}, {
					value: '2',
					name: '停用'
				}, {
					value: '0',
					name: '未启用'
				}]
			}]
		},
		dialogs: {
			dialog1: [{
				type: "text",
				key: "code",
				label: "活动编码",
				disableInEdit: true,
			}, {
				type: "text",
				key: "name",
				label: "活动名称"
			}, {
				type: "text",
				key: "theme",
				label: "活动主题",
			}, {
				type: "label",
				key: "isEnable",
				label: "启用状态",
			}]
		},
		grids: {
			grid1: {
				domid: "activity",
				umeta: {
					id: "grid_activity",
					data: "simpleList",
					type: "grid",
					editable: false,
					multiSelect: true,
					showNumCol: true,
				},
				columns: [{
						field: "code",
						dataType: "String",
						title: "活动编码",
					}, {
						field: "name",
						dataType: "String",
						title: "活动名称",
					}, {
						field: "theme",
						dataType: "String",
						title: "活动主题",
					}, {
						field: "isEnable",
						dataType: "String",
						title: "状态",
						renderType: "enableRender"
					}, {
						field: "creator",
						dataType: "String",
						title: "创建人",
						visible: false
					}, {
						field: "modifier",
						dataType: "String",
						title: "修改人",
						visible: false
					}, {
						field: "creationTime",
						dataType: "Date",
						title: "创建时间",
						visible: false
					}, {
						field: "modifiedTime",
						dataType: "Date",
						title: "修改时间",
						visible: false
					},

					{
						field: "operation",
						dataType: "String",
						title: "操作",
						renderType: "operation4single",
						fixed: true,
						width: "110px"
					},
				]
			}
		}
	};
	return new basemodel(model);
});