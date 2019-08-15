define(["ocm_basemodel"], function (basemodel) {
    var model = {
        metas: {
			CustomerAltermeta: {
                params: {
                    "cls": "com.yonyou.ocm.base.service.dto.CustomerAlterDto"
                },
                meta: {
                    id: {
                        type: 'string'
                    }, //字段名
                    fieldName: {
                        type: 'string'
                    }, //客户
                    customerId: {
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['customer']),
                        "refcfg": '{"ctx":"/uitemplate_web","refName":"原业务账号"}'
                    },
                    customerCode: {
                        type: 'string'
                    },
                    customerName: {
                        type: 'string'
                    },
                    oldFieldValue: {
                        type: 'string'
                    }, //旧值
                    newFieldValue: {
                        type: 'string'
                    }, //新值
                    alterSourceId: {
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['custdocdef']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":"QY107","refName":"变更来源"}'
                    }, //变更来源
                    alterSourceCode: {
                        type: 'string'
                    },
                    alterSourceName: {
                        type: 'string'
                    },
					creator: {
						type: 'string',
					},
					creationTime: {
						type: 'string',
					},
                },
                pageSize: 10,
                //启用状态前端缓存
                // pageCache: true
            },
		},
		searchs: {
            search1: [
                {
                    type: "refer",
                    key: "customer--id",
                    label: "客户",
                    refinfo: "customer",
                    refName: "客类",
                    clientParam: {
                        "AUTH_refcod":"customeralter"
                    }
                },
				{
        		  type: "combo",
        		  key: "fieldName",
        		  label: "变更字段",
        		  url: appCtx + "/cust-doc-defs/cust_doc_code?cust_doc_code=CUSTOMER_ALTER_FIELD",
        		  namefield: "name",
        		  valuefield: "code",
				  multi:true,
				  opr: "IN",
        		},
				{
                    type: "refer",
                    key: "modifier",
                    label: "变更人",
					referId: "modifier",
                    refinfo: "AuthorizedUsers",
                    refName: "客类",
                    clientParam: {
                        "AUTH_refcod":"customeralter"
                    },
					isReturnName: true,
                },
				{
					type: "daterange",
					key: "creationTime",
					label: "变更日期",
					placeholder:["销售开始时间","销售结束时间"],
				},
			],
		},
		grids: {
			grid1: {
                "domid": "grid_customer_alter_dom",
                "umeta": {
                    "id": "grid_alter",
                    "data": "CustomerAlterList",
                    "type": "grid",
                    "editable": false,
                    "multiSelect": true,
                    "showNumCol": true,
                    "columnMenu": false
                },
                "columns": [{
                        "field": "customerCode",
                        "dataType": "String",
                        "title": "客户编码"
                    },{
                        "field": "customerName",
                        "dataType": "String",
                        "title": "客户名称"
                    },{
                        "field": "fieldValue",
                        "dataType": "String",
                        "title": "字段名称"
                    }, {
                        "field": "oldFieldValue",
                        "dataType": "String",
                        "title": "原值"
                    }, {
                        "field": "newFieldValue",
                        "dataType": "String",
                        "title": "新值"
                    },
                    {
                        "field": "creator",
                        "dataType": "String",
                        "title": "变更人"
                    },
					{
                        "field": "creationTime",
                        "dataType": "Datetime",
                        "title": "变更时间"
                    },
					{
                        "field": "alterSourceName",
                        "dataType": "refer",
                        "title": "变更来源",
						"visible": false,
                    }
                ]
            },
		},
	}
	return new basemodel(model);
})
            
