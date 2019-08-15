define(["ocm_global"], function () {
  window.mainListMeta = {
      meta: {
          id: { type: 'string' },
          code: { type: 'string', required: true },
          dispatchNoteCode: { type: 'string'},
          orderCode: { type: 'string'},
          billStatus:{ type: 'integer'},
          dispatchType:{type: 'integer'},
          address: { type: 'string'},
          phone: { type: 'string' },
          applyDate: { type: 'datetime' },
          requireDate: { type: 'datetime' },
          customer: { type: 'string' },
          isOrdered:{type: 'string'},
          address: { type: 'string' },//地址
          countryName: { type: 'string' },//国家
          provinceName: { type: 'string' },//省份
          cityName: { type: 'string' },//城市
          districtName: { type: 'string' },//区县
          remark:{type: 'integer'},
           // 商品子表
           goods:{
                type: 'child',
                meta: {
                    goodsCode:{type:'string'},
                    goodsName:{type:'string'},
                    num:{type: 'integer', required: true,default: '1'}
                }
           },
           deliveryPersonCode:{type:'string'},
           deliveryPersonName:{type:'string'},           
           deliveryPersonId:{
                type: "string",
                required: true,
                "refmodel": JSON.stringify(refinfo['sc-per-ref']),
                "refcfg": '{"ctx":"/uitemplate_web","refName":"请选择"}'
           },
           // 安装人员
           installPersonCode:{type:'string'},
           installPersonName:{type:'string'},
           installPersonId:{
                type: "string",
                required: true,
                "refmodel": JSON.stringify(refinfo['sc-per-ref']),
                "refcfg": '{"ctx":"/uitemplate_web","refName":"请选择"}'
            }
           
      },
      pageSize: 10,
      //是否启用前端缓存
      // pageCache: true
  }

  window.appointmentMeta = {

  }

})
