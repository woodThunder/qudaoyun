/*****功能节点：系统参数设置****/
define(["ocm_basemodel"], function(basemodel) {
	'use strict';
	var model = {
		metas: {
			systemParamMeta: {
				meta: {
					id: {
						type: 'string'
					}, //id
					code: {
						type: 'string',
						required: true
					}, //编码
					name: {
						type: 'string',
						required: true
					}, //名称
					rule: {
						type: 'string',
						required: true
					}, //规则
					description: {
						type: 'string',
						maxLength: 100
					}, //描述
				},
				pageSize: 10,
				//是否启用前端缓存
				// pageCache: true
			}
		},
		buttons: {
			//			button1: [{
			//					key: "add",
			//					label: "新增",
			//					iconCls: "icon-plus",
			//					click: "beforeEdit"
			//				},
			//				{
			//					key: "del",
			//					label: "删除",
			//					iconCls: "icon-shanchu1",
			//					click: "del"
			//				},
			//				{
			//					key: "enable",
			//					label: "启用",
			//					iconCls: "icon-qiyong",
			//					click: "enable"
			//				},
			//				{
			//					key: "disable",
			//					label: "停用",
			//					iconCls: "icon-tingyong",
			//					click: "disable"
			//				}
			//			]
		},
		searchs: {
			search1: [{
				type: "text",
				key: "name",
				label: "参数名称",
			}]
		},
		dialogs: {
			dialog1: [{
				type: "text",
				key: "name",
				label: "参数名称",
				disableInEdit: true
			}, {
				type: "textarea",
				key: "rule",
				label: "参数规则",
				cls: "ui-textarea-item"
			}, {
				type: "textarea",
				key: "description",
				label: "参数描述",
				cls: "ui-textarea-item",
				enable: false
			}]
		},
		grids: {
			grid1: {
				domid: "systemparams",
				umeta: {
					id: "grid_systemparams",
					data: "simpleList",
					type: "grid",
					editable: false,
					multiSelect: true,
					showNumCol: true,
				},
				columns: [{
					field: "name",
					dataType: "String",
					title: "参数名称",
				}, {
					field: "rule",
					dataType: "String",
					title: "参数值",
				}, {
					field: "description",
					dataType: "String",
					title: "参数描述",
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
				}, {
					field: "operation",
					dataType: "String",
					title: "操作",
					renderType: "operation",
					fixed: true,
					width: "110px"
				}, ]
			}
		}
	};
	return new basemodel(model);
});