define(["ocm_global"], function () {
	//活动定义
	window.Order = {
		params: {
			"cls": "com.yonyou.ocm.dc.service.dto.SuningorderDto"
		},
		meta: {
			account: { type: "string" },
			bank: { type: "string" },
			buyerordremark: { type: "string" },
			citycode: { type: "string" },
			cityname: { type: "string" },
			creationTime: { type: "datetime" },
			creator: { type: "string" },
			customeraddress: { type: "string" },
			customername: { type: "string" },
			districtcode: { type: "string" },
			districtname: { type: "string" },
			dr: { type: "integer" },
			evaluationmark: { type: "string" },
			exceptiondesc: { type: "string" },
			id: { type: "string" },
			invoice: { type: "string" },
			invoicehead: { type: "string" },
			invoicerecipientaddress: { type: "string" },
			invoicerecipienthandphone: { type: "string" },
			invoicerecipientname: { type: "string" },
			invoicerecipientphone: { type: "string" },
			invoicetype: { type: "string" },
			isexception: { type: "string" },
			issync: { type: "string" },
			issynuser: { type: "string" },
			mobnum: { type: "string" },
			modifiedTime: { type: "datetime" },
			modifier: { type: "string" },
			ordercode: { type: "string" },
			ordersaletime: { type: "datetime" },
			ordertotalstatus: { type: "string" },
			persistStatus: { type: "string" },
			pkOrgCode: { type: "string" },
			pkOrgId: { type: "string" },
			pkOrgName: { type: "string" },
			provincecode: { type: "string" },
			provincename: { type: "string" },
			registeraddress: { type: "string" },
			registerphone: { type: "string" },
			sellerordremark: { type: "string" },
			shopsource: {
				type: "string",
				'refmodel': JSON.stringify(refinfo['b2cStoreRef']),
				'refcfg': '{"ctx":"/uitemplate_web", "refName":"店铺来源"}'
			},
			shopsourceCode: { type: "string" },
			shopsourceName: { type: "string" },
			ts: { type: "datetime" },
			username: { type: "string" },
			vattaxpayernumber: { type: "string" }

		},
		last: { type: "boolean" },
		totalElements: { type: "integer" },
		totalPages: { type: "integer" },
		number: { type: "integer" },
		size: { type: "integer" },
		first: { type: "boolean" },
		numberOfElements: { type: "integer" },
		pageSize: 10,
		//是否启用前端缓存
		// pageCache: true
	}

	//子页面
	window.OrderChild = {
		meta: {
			account: { type: "string" },
			bank: { type: "string" },
			buyerordremark: { type: "string" },
			citycode: { type: "string" },
			cityname: { type: "string" },
			creationTime: { type: "datetime" },
			creator: { type: "string" },
			customeraddress: { type: "string" },
			customername: { type: "string" },
			districtcode: { type: "string" },
			districtname: { type: "string" },
			dr: { type: "integer" },
			evaluationmark: { type: "string" },
			exceptiondesc: { type: "string" },
			id: { type: "string" },
			invoice: { type: "string" },
			invoicehead: { type: "string" },
			invoicerecipientaddress: { type: "string" },
			invoicerecipienthandphone: { type: "string" },
			invoicerecipientname: { type: "string" },
			invoicerecipientphone: { type: "string" },
			invoicetype: { type: "string" },
			isexception: { type: "string" },
			issync: { type: "string" },
			issynuser: { type: "string" },
			mobnum: { type: "string" },
			modifiedTime: { type: "datetime" },
			modifier: { type: "string" },
			ordercode: { type: "string" },
			ordersaletime: { type: "datetime" },
			ordertotalstatus: { type: "string" },
			persistStatus: { type: "string" },
			pkOrgCode: { type: "string" },
			pkOrgId: { type: "string" },
			pkOrgName: { type: "string" },
			provincecode: { type: "string" },
			provincename: { type: "string" },
			registeraddress: { type: "string" },
			registerphone: { type: "string" },
			sellerordremark: { type: "string" },
			shopsource: { type: "string" },
			shopsourceCode: { type: "string" },
			shopsourceName: { type: "string" },
			ts: { type: "datetime" },
			username: { type: "string" },
			vattaxpayernumber: { type: "string" }
		}


	}

	//商品
	window.Goodss = {}


	window.catchOneMeta={
				meta: {
					storeRef: {
						type: 'string',
						"refmodel": JSON.stringify(refinfo['b2cStoreRef']),
						"refcfg": '{"ctx":"/uitemplate_web","isMultiSelectedEnabled":false}',
						"refparam": '{"IN_platform.id":"6763be4d-85f0-4cec-afcd-416e270f3d44"}'
					},
					storeCode:{ type: "string" } ,
					tid:{ type: "string" } 
				}
			}
})