module.exports = [
    //单位数据
    {
      type: "get",
      url: "/apitest/getest",
      json: "apitest_getest.json"
    },
    //自建商品-基本信息-Dt数据
    {
      type: "post",
      url: "/apitest/postest",
      json: "apitest_postest.json"
    },
    //主子单据示例-查询
    {
      type: "get",
      url: "/demo-product-combine",
      json: "demo-product-combine.json"
    },
    {
      type: "get",
      url: "/demo-order-query",
      json: "demo-order-query.json"
    },
    {
        type: "post",
        url: "/fmcg-dynamic-object/dynamic/trantemplates/provide/parent",
        json: "dynamicTemplateData_parent.json"
    },
    {
        type: "post",
        url: "/fmcg-dynamic-object/dynamic/trantemplates/provide/child",
        json: "dynamicTemplateData_child.json"
    },
    {
        type: "post",
        url: "/fmcg-dynamic-object/dynamic/trantemplates/provide/order",
        json: "dynamicTemplateData_orderDetail.json"
    }
]
