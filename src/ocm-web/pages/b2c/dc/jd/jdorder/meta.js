define(["ocm_global"], function () {
  //活动定义
  window.Order = {
    params: {
      "cls": "com.yonyou.ocm.dc.service.dto.JdOrderDto"
    },
    meta:{
          id: { type: "string" },
          dr: { type: "integer" },
          ts: { type: "datetime" },
          creator: { type: "string" },
          creationTime: { type: "datetime" },
          modifier: { type: "string" },
          modifiedTime: { type: "datetime" },
          persistStatus: { type: "string" },
          orderid: { type: "string" },
          venderid: { type: "string" },
          paytype: { type: "string" },
          ordertotalprice: { type: "float" },
          orderpayment: { type: "float" },
          freightprice: { type: "float" },
          sellerdiscount: { type: "float" },
          orderstate: { type: "string" },
          orderstateremark: { type: "string" },
          deliverytype: { type: "string" },
          invoiceinfo: { type: "string" },
          orderremark: { type: "string" },
          orderstarttime: { type: "datetime" },
          orderendtime: { type: "datetime" },
          issync: { type: "string" },
          isexception: { type: "string" },
          exceptiondesc: { type: "string" },
          shopsource: {
            type: "string",
            'refmodel': JSON.stringify(refinfo['b2cStoreRef']),
            'refcfg': '{"ctx":"/uitemplate_web", "refName":"店铺来源"}'
          },
          shopsourceCode: { type: "string" },
          shopsourceName: { type: "string" },
          ordersellerprice: { type: "float" },
          modified: { type: "string" },
          venderremark: { type: "string" },
          issynuser: { type: "string" },
          pkOrg: { type: "string" },
          pin: { type: "string" }
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
    meta:{
          id: { type: "string" },
          dr: { type: "integer" },
          ts: { type: "datetime" },
          creator: { type: "string" },
          creationTime: { type: "datetime" },
          modifier: { type: "string" },
          modifiedTime: { type: "datetime" },
          persistStatus: { type: "string" },
          orderid: { type: "string" },
          venderid: { type: "string" },
          paytype: { type: "string" },
          ordertotalprice: { type: "float" },
          orderpayment: { type: "float" },
          freightprice: { type: "float" },
          sellerdiscount: { type: "float" },
          orderstate: { type: "string" },
          orderstateremark: { type: "string" },
          deliverytype: { type: "string" },
          invoiceinfo: { type: "string" },
          orderremark: { type: "string" },
          orderstarttime: { type: "datetime" },
          orderendtime: { type: "datetime" },
          issync: { type: "string" },
          isexception: { type: "string" },
          exceptiondesc: { type: "string" },
          shopsource: {
            type: "string",
            'refmodel': JSON.stringify(refinfo['b2cStoreRef']),
            'refcfg': '{"ctx":"/uitemplate_web", "refName":"店铺来源"}'
          },
          shopsourceCode: { type: "string" },
          shopsourceName: { type: "string" },
          ordersellerprice: { type: "float" },
          modified: { type: "string" },
          venderremark: { type: "string" },
          issynuser: { type: "string" },
          pkOrg: { type: "string" },
          pin: { type: "string" }
        }
  }
  //收货人  
  window.Consignees = {
    meta:{
      
    }
  }
  //优惠券  
  window.Coupons = {}
  //商品
  window.Goodss = {}
  
  //业务类型
  window.BussType = {
    meta: {
      id: { type: 'string' },
      bussiTypeId: { type: 'string' },//id
      bussiTypeCode: { type: 'string', required: true },//编码
      bussiTypeName: { type: 'string', required: true },//名称
    }
  }
  //办事处
  window.Agency = {
    meta: {
      id: { type: 'string' },
      officeId: { type: 'string' },//id
      officeCode: { type: 'string', required: true },//编码
      officeName: { type: 'string', required: true },//名称
    }
  }
  //业务类型参照
  window.BussTypeRef = {
    meta: {
      bussRefer: {
        type: 'string',
        "refmodel": JSON.stringify(refinfo['busstype']),
        "refcfg": '{"ctx":"/uitemplate_web","isMultiSelectedEnabled":true}'
      },//id
    }
  }
  //办事处参照
  window.AgencyRef = {
    meta: {
      agencyRefer: {
        type: 'string',
        "refmodel": JSON.stringify(refinfo['organization_ocm']),
        "refcfg": '{"ctx":"/uitemplate_web","isMultiSelectedEnabled":true}',
        "refparam": '{"EQ_isOffice":"1"}'
      }
    }
  }
   window.catchOneMeta={
				meta: {
					storeRef: {
						type: 'string',
						"refmodel": JSON.stringify(refinfo['b2cStoreRef']),
						"refcfg": '{"ctx":"/uitemplate_web","isMultiSelectedEnabled":false}',
						"refparam": '{"IN_platform.id":"6763be4d-85f0-4cec-afcd-416e270f3d45"}'
					},
					storeCode:{ type: "string" } ,
					tid:{ type: "string" } 
				}
			}
})