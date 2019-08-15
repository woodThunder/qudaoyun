define(["ocm_global"], function () {
  window.refundMeta = {
    params: {
			"cls": "com.yonyou.ocm.dc.service.dto"
		},
    meta:{
          id: { type: "string" },
          dr: { type: "integer" },
          ts: { type: "integer" },
          creator: { type: "string" },
          creationTime: { type: "datetime" },
          modifier: { type: "string" },
          modifiedTime: { type: "datetime" },
     
          ordercode: { type: "string" },
          productcode: { type: "string" },
          customer: { type: "string" },
          dealmoney: { type: "float" },
          returnmoney: { type: "float" },
          applytime: { type: "datetime" },
          statuspasstime: { type: "datetime" },
          statusdesc: { type: "string" },
          returnreason: { type: "string" },
          expresscompanycode: { type: "string" },
          refundtype: { type: "string" },
          pkOrg: { type: "string" },
          shopsource: { type: "string" },
          issync: { type: "string" },
          isexception2: { type: "string" },
          isexception: { type: "string" },
          exceptiondesc: { type: "string" },
        
        },
        pageSize: 10
  }
})