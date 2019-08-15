/*****功能节点：服务商等级****/
define(["ocm_basemodel"], function(basemodel) {
	'use strict';
	var model = {
		metas: {
			gradeMeta: {
				meta: {
					id: { type: "string" }, //主键
					code: { type: "string", required: true, maxLength: 30 }, //编码
					name: { type: "string", required: true, maxLength: 30 }, //名称
					description: { type: "string", required: true, maxLength: 200 }, //描述
					ts: { type: "string" }, //时间戳
					dr: { type: "string" }, //删除标识
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
			button1: [{
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
			]
		},
		searchs: {
			search1: [{
					type: "text",
					key: "code",
					label: "服务商等级编码"
				},
				{
					type: "text",
					key: "name",
					label: "服务商等级名称",
				}
			]
		},
		dialogs: {
			dialog1: [{
            type:"text",
            key:"code",
            label:"服务商等级编码",
            // disableInEdit:true
          },
          {
            type:"text",
            key:"name",
            label:"服务商等级名称"
		  },
		  {
            type:"text",
            key:"description",
            label:"服务商等级描述"
          }
			]
		},
		grids: {
			grid1: {
				domid: "serviceGrade",
				umeta: {
					id: "grid_serviceGrade",
					data: "simpleList",
					type: "grid",
					editable: false,
					multiSelect: true,
					showNumCol: true,
				},
				columns: [{
						field: "code",
						dataType: "String",
						title: "服务商等级编码",
					},
					{
						field: "name",
						dataType: "String",
						title: "服务商等级名称",
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
