define(["ocm_basemodel"], function (basemodel) {
    var model = {
        metas: {
            Picturemeta: {
                params: {
                    "cls": "cn.com.quanyou.cs.prom.service.dto.PictureDto"
                },
                meta: {
                    //基本信息开始
                    id: {type: 'string', required: true},
                    code: {type: 'string'}, //编码
                    name: {
                        type: 'string',
                        required: true
                    },
					pictureCategoryId: {
                        "type": 'string',
                        "refmodel": JSON.stringify(refinfo['pictureCategories']),
                  		"clientParam": {
                  		  "EQ_isEnable": "1"
                  		},
                       "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
                    },
                    pictureCategoryCode: {type: 'string'}, 
					pictureCategoryName: {type: 'string'},
					fileUrl: {type: 'string'},
                    isEnable: { type: 'integer' },//启用状态
				}
			},
			PictureCategoryMeta: {
				meta: {
					pictureCategoryId: {
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['pictureCategories']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
						"refparam": '{"EQ_isEnable":"1"}',
						required:true
                    },
				}
			}
			
		},
		grids: {
            grid1: {
                "domid": "buoyancyfactorlist",
                "umeta": {
                    "id": "grid_buoyancyfactorlist",
                    "data": "PictureList",
                    "type": "grid",
                    "editable": true,
                    "multiSelect": true,
                    "showNumCol": true
                },
                "columns": [
					{
                        "field": "code",
                        "dataType": "String",
                        "title": "编码",
						"editable": false,
                    }, {
                        "field": "name",
                        "dataType": "String",
                        "title": "名称",
						"required": true,
                    },
					{
						"id": "pictureCategoryId",
						"field": "pictureCategoryId",
						"dataType": "String",
						"title": "图片分类",
						"renderType": "ncReferRender",
						"editType": "ncReferEditType",
						"editOptions": {
							"validType": "string",
							"rel": {
								"refname": "pictureCategoryName"
							}
						},
						"showField": "cityName",
						"showField": "pictureCategoryName",
						"required": true
					},
					{
                        "field": "fileUrl",
                        "dataType": "String",
                        "title": "图片预览",
						"renderType": "picShow",
						"editable": false,
                    },
					{
						"field": "isEnable",
						"dataType": "integer",
						"title": "启用状态",
						"width": "190px",
						"editable": false,
             			//"renderType": "isEnableGrid"
						"editOptions": {
							"id": "addrStatus",
							"type": "combo",
							"datasource": "statusSource"
						},
						"editType": "combo",
						"renderType": "comboRender",
					}
                    
				]
			}
		},
		buttons: {
            button1: [{
                    key: "upload",
                    label: "上传",
                    iconCls: "icon-upload",
                    click: "uploadPic",
                    auth: true
                },
                {
                    key: "save",
                    label: "保存",
                    iconCls: "icon-save1",
                    click: "saveList",
                    auth: true
                },
                {
                    key: "del",
                    label: "删除",
                    iconCls: "icon-shanchu1",
                    click: "del",
                    auth: true
                },
				{
                    key: "enable",
                    label: "启用",
                    iconCls: "icon-qiyong",
                    click: "enable",
                    auth: true
                },
				{
                    key: "disable",
                    label: "停用",
                    iconCls: "icon-tingyong",
                    click: "disable",
                    auth: true
                },
                {
                    key: "match",
                    label: "匹配商品",
                    iconCls: "icon-match",
                    click: "match",
                    auth: true
                },
			],
			button2: [{
                    key: "pre",
                    label: "上一张",
                    click: "prev"
                },
                {
                    key: "next",
                    label: "下一张",
                    click: "next"
                }
            ],
		},
		searchs: {
			search1: [
				{
					type: "text",
					key: "code",
					label: "编码"
				},
				{
					type: "text",
					key: "name",
					label: "名称"
				},
				{
                    type: "refer",
                    key: "pictureCategory--id",
                    label: "图片分类",
                    refinfo: "pictureCategories",
                    refName: "图片分类",
					clientParam: {"EQ_isEnable":"1"}

                },
			]
		}

	}
	return new basemodel(model);
});
