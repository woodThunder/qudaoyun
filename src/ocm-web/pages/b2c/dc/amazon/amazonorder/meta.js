define(["ocm_global"], function () {
  //列表
  window.OrderList = {
    params: {
      "cls": "com.yonyou.ocm.dc.service.dto.AmazonOrderDto"
    },
    meta:{
          id: { type: "string" },
          dr: { type: "integer" },
          ts: { type: "datetime" },
          creator: { type: "string" },
          creationTime: { type: "datetime" },
          modifier: { type: "string" },
          modifiedTime: { type: "datetime" },
          amazonorderid: { type: "string" },
          sellerorderid: { type: "string" },
          purchasedate: { type: "datetime" },
          lastupdatedate: { type: "datetime" },
          orderstatus: { type: "string" },
          fulfillmentchannel: { type: "string" },
          saleschannel: { type: "string" },
          orderchannel: { type: "string" },
          shipservicelevel: { type: "string" },
          countrycode: { type: "string" },
          stateorregion: { type: "string" },
          city: { type: "string" },
          county: { type: "string" },
          district: { type: "string" },
          postalcode: { type: "string" },
          phone: { type: "string" },
          ordertotal: { type: "string" },
          shippednum: { type: "string" },
          unshippednum: { type: "string" },
          paymentmethod: { type: "string" },
          marketplaceid: { type: "string" },
          buyername: { type: "string" },
          buyeremail: { type: "string" },
          servicelevelcategory: { type: "string" },
          shippinglabel: { type: "string" },
          shippedbyamazontfm: { type: "string" },
          tfmshipmentstatus: { type: "string" },
          ordertype: { type: "string" },
          earliestshipdate: { type: "datetime" },
          latestshipdate: { type: "datetime" },
          earliestdeliverydate: { type: "datetime" },
          issync: { type: "string" },
          isexception: { type: "string" },
          exceptiondesc: { type: "string" },
          shopsource: {
            type: "string",
            'refmodel': JSON.stringify(refinfo['b2cStoreRef']),
            'refcfg': '{"ctx":"/uitemplate_web", "refName":"店铺来源"}'
          },
          shopsourceCode: { type: "string" },
          shopsourceName: { type: "string" }
        },
      pageSize: 10,
      last: { type: "boolean" },
      totalElements: { type: "integer" },
      totalPages: { type: "integer" },
      number: { type: "integer" },
      size: { type: "integer" },
      first: { type: "boolean" },
      numberOfElements: { type: "integer" }
      
  }

  //单行
  window.Order = {
    meta:{
          id: { type: "string" },
          dr: { type: "integer" },
          ts: { type: "datetime" },
          creator: { type: "string" },
          creationTime: { type: "datetime" },
          modifier: { type: "string" },
          modifiedTime: { type: "datetime" },
          amazonorderid: { type: "string" },
          sellerorderid: { type: "string" },
          purchasedate: { type: "datetime" },
          lastupdatedate: { type: "datetime" },
          orderstatus: { type: "string" },
          fulfillmentchannel: { type: "string" },
          saleschannel: { type: "string" },
          orderchannel: { type: "string" },
          shipservicelevel: { type: "string" },
          countrycode: { type: "string" },
          stateorregion: { type: "string" },
          city: { type: "string" },
          county: { type: "string" },
          district: { type: "string" },
          postalcode: { type: "string" },
          phone: { type: "string" },
          ordertotal: { type: "string" },
          shippednum: { type: "string" },
          unshippednum: { type: "string" },
          paymentmethod: { type: "string" },
          marketplaceid: { type: "string" },
          buyername: { type: "string" },
          buyeremail: { type: "string" },
          servicelevelcategory: { type: "string" },
          shippinglabel: { type: "string" },
          shippedbyamazontfm: { type: "string" },
          tfmshipmentstatus: { type: "string" },
          ordertype: { type: "string" },
          earliestshipdate: { type: "datetime" },
          latestshipdate: { type: "datetime" },
          earliestdeliverydate: { type: "datetime" },
          issync: { type: "string" },
          isexception: { type: "string" },
          exceptiondesc: { type: "string" },
          shopsource: { type: "string" },
          shopsourceCode: { type: "string" },
          shopsourceName: { type: "string" }
        },
      last: { type: "boolean" },
      totalElements: { type: "integer" },
      totalPages: { type: "integer" },
      number: { type: "integer" },
      size: { type: "integer" },
      first: { type: "boolean" },
      numberOfElements: { type: "integer" }
      
  
  }

  //商品
  window.Goodss = {}
  
  window.catchOneMeta={
				meta: {
					storeRef: {
						type: 'string',
						"refmodel": JSON.stringify(refinfo['b2cStoreRef']),
						"refcfg": '{"ctx":"/uitemplate_web","isMultiSelectedEnabled":false}',
						"refparam": '{"IN_platform.id":"6763be4d-85f0-4cec-afcd-416e270f3d23"}'
					},
					storeCode:{ type: "string" } ,
					tid:{ type: "string" } 
				}
			}
})