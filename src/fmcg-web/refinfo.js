define(function () {
  var refinfo = {};
  //iuap 工作台 start-----------------------------------------------------
  refinfo['wbUser'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/wbalone/wbUserRef/",
    "refName": "负责人",
    "refUIType": "RefGrid",
    "rootName": "负责人列表"
  };
  refinfo['dept'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/wbalone/deptUnderOrgRef/",
    "refName": "组织下部门",
    "refUIType": "RefTree",
    "rootName": "部门列表"
  };
  // refinfo['organization'] = {
  //   "refClientPageInfo": {
  //     "currPageIndex": 0,
  //     "pageCount": 0,
  //     "pageSize": 100
  //   },
  //   "refCode": "",
  //   "refModelUrl": "/wbalone/organizationRef-ref/",
  //   "refName": "组织",
  //   "refUIType": "RefTree",
  //   "rootName": "组织列表"
  // };
  refinfo['AuthorizedUsers'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "internalmsg",
    "refModelUrl": "/iuap_qy/internalmsg/users/",
    "refName": "用户",
    "refUIType": "RefGrid",
    "rootName": "用户"
  };
  refinfo['appmenu'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "appMenu",
    "refModelUrl": "/wbalone/appMenuRef/",
    "refName": "菜单",
    "refUIType": "RefTree",
    "rootName": "菜单列表"
  };
  //iuap工作台 end-----------------------------------------------------


  //动态模板可使用的参照  start--------------------------------------
  //组织
  //经销商
  refinfo['wholesaler_supplier'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/occ-base/customer-ref/",
    "refName": "客户",
    "refUIType": "RefGrid",
    //"rootName": "客户"
  };
  refinfo['organization'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/occ-base" + "/organization-ref/",
    "refName": "组织",
    "refUIType": "RefGrid",
    "rootName": "组织",
    "refparam": '{"EQ_isSale":"1"}'
  };
  //人员
  refinfo['template_person'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/occ-base/person-ext-ref/",
    "refName": "人员",
    "refUIType": "RefGrid",
    "rootName": "人员",
  };
  //app潜在客户负责人
  refinfo['liable_person'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/occ-base/person-ext-ref/",
    "refName": "人员",
    "refUIType": "RefGrid",
    "rootName": "人员",
  };
  //产品线
  refinfo['product_lines'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/occ-base/product-line-ref/",
    "refName": "产品线",
    "refUIType": "RefGrid",
    "rootName": "产品线",
  };
  //品牌
  refinfo['brand'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/occ-base/base/brand-ref/",
    "refName": "品牌",
    "refUIType": "RefGrid",
    "rootName": "品牌",
  };
  //组织
  refinfo['BU'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/occ-base" + "/organization-ref/",
    "refName": "组织",
    "refUIType": "RefGrid",
    "rootName": "组织",
    "refparam": '{"EQ_isSale":"1"}'
  };
  //大区
  refinfo['market_areas'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/occ-base/market-areas-ref/",
    "refName": "大区",
    "refUIType": "RefGrid",
    "rootName": "大区"
  };
  //办事处
  refinfo['office'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/occ-base/market-areas-ref/",
    "refName": "办事处",
    "refUIType": "RefGrid",
    "rootName": "办事处"
  };
  //城市单元
  refinfo['city_unit'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/occ-base/market-areas-ref/",
    "refName": "城市单元",
    "refUIType": "RefGrid",
    "rootName": "城市单元"
  };
  //上级客户
  refinfo['parent_custs'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/occ-base" + "/customer-ref/",
    "refName": "上级客户",
    "refUIType": "RefGrid",
    "rootName": "上级客户"
  };
  //行政区划
  refinfo['administrative-divisions'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/occ-base" + "/administrative-division-ref/",
    "refName": "地区",
    "refUIType": "RefGrid",
    "rootName": "地区",
    // "refparam": '{"EQ_areaLevel": "2"}'
  };
  //行政区划
  refinfo['province'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/occ-base" + "/administrative-division-ref/",
    "refName": "省",
    "refUIType": "RefGrid",
    "rootName": "地区",
    "refparam": '{"EQ_areaLevel": "2"}'
  };
  //行政区划
  refinfo['city'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/occ-base" + "/administrative-division-ref/",
    "refName": "市",
    "refUIType": "RefGrid",
    "rootName": "地区",
    "refparam": '{"EQ_areaLevel": "3"}'
  };
  //行政区划
  refinfo['county'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/occ-base" + "/administrative-division-ref/",
    "refName": "区",
    "refUIType": "RefGrid",
    "rootName": "区",
    "refparam": '{"EQ_areaLevel": "4"}'
  };
  //行政区划
  refinfo['town'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/occ-base" + "/administrative-division-ref/",
    "refName": "城镇",
    "refUIType": "RefGrid",
    "rootName": "地区",
    "refparam": '{"EQ_areaLevel": "5"}'
  };
  refinfo['channel_types'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/occ-base/base/channel-type-ref/",
    "refName": "渠道类型",
    "refUIType": "RefGrid",
    "rootName": "渠道类型"
  };
  //客户等级参照
  refinfo['customer_levels'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/occ-base/base/customer-level-ref/",
    "refName": "客户等级",
    "refUIType": "RefGrid",
    //"rootName": "客户信用等级"
  };
  // 政策类型
  refinfo['policy_types'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/fmcg-act/mer/policy-types-ref/",
    "refName": "政策类型",
    "refUIType": "RefGrid",
  };
  //服务商
  refinfo['supplier'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": '/occ-base/suppliers-ref/',
    "refName": "供应商",
    "refUIType": "RefGrid",
    "rootName": "供应商列表"
  };
  refinfo['template_goodscategory'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/occ-base" + "/product-category-ref/",
    "refName": "产品品类表",
    "refUIType": "RefGrid",
    "rootName": "产品品类表"
  };
  // 部门参照--新增
  refinfo['department'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/occ-base" + "/department-ref/",
    "refName": "组织下部门",
    "refUIType": "RefTree",
    "rootName": "部门列表"
  };
  //活动方案类型 --新增
  refinfo['apply_types'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/fmcg-act/mer/apply-types-ref/",
    "refName": "活动方案类型",
    "refUIType": "RefGrid",
  };
  //终端类型 --新增
  refinfo['template_terminaltype'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/fmcg-occ-base-ext/terminal-type-ref/",
    "refName": "终端类型",
    "refUIType": "RefGrid",
  };
  //终端等级 --新增
  refinfo['template_terminalgrade'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/fmcg-occ-base-ext/terminal-type-ref/",
    "refName": "终端等级",
    "refUIType": "RefGrid",
  };
  // 计量单位--新增
  refinfo['template_unit'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/occ-base" + "/unit-ref/",
    "refName": "计量单位表",
    "refUIType": "RefGrid",
    "rootName": "计量单位表"
  };
  //物料分类参照 --新增
  refinfo['goods_category'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/occ-base/goods-category-ref/",
    "refName": "商品分类",
    "refUIType": "RefTree",
    "rootName": "产品分类"
  };
  // 渠道类型--新增
  refinfo['canal_type'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/fmcg-occ-base-ext/canal-type-ref/",
    "refName": "渠道类型",
    "refUIType": "RefGrid",
  };
  // 品项      "template_goodscategory"
  // 陈列方式  "template_diaplyway"
  // 商品  "template_goods"
  // 计量单位  "template_unit"
  // 竞品物料  "template_competinggoods"
  // 宣传物料  "template_publicitymaterial"
  // 付费陈列内容  "template_paydisplay"
  //人员档案 "template_person"
  //终端  "template_terminal"
  //终端等级   "template_terminalgrade"
  //终端类型  "template_terminaltype"
  //模板模板可使用的参照  end----------------------------------------

  // 测试 start-----------------------------------------------------
  refinfo['treetest'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/fmcg-web/tree-ref-example/",
    "refName": "树测试",
    "refUIType": "RefTree",
    "rootName": "树测试列表",
  };
  refinfo['treegridtest'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/fmcg-web/treegrid-ref-example/",
    "refName": "树表测试",
    "refUIType": "RefGridTree",
    "rootName": "树表测试列表",
  };
  refinfo['gridtest'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/fmcg-web/grid-ref-example/",
    "refName": "表测试",
    "refUIType": "RefGrid",
    "rootName": "表测试列表",
  };
  //测试 end-----------------------------------------------------

  // 基本档案 start-----------------------------------------------------
   //区域目标类型
   refinfo['areaTargetType'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/fmcg-sales-target/sale/targetType-ref/",
    "refName": "区域目标类型",
    "refUIType": "RefGrid",
    "rootName": "区域目标类型",
    "refparam": '{"EQ_assessType": "01"}',
  };
   //指标项
   refinfo['index'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/fmcg-sales-target/quotas-ref/",
    "refName": "指标项",
    "refUIType": "RefGrid",
    "rootName": "指标项",
  };
  //考核周期
  refinfo['evaluperiod'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "PROD002",
    "refModelUrl": "/occ-base" + "/cust-doc-defs-ref/",
    "refName": "考核周期",
    "refUIType": "RefGrid",
    "rootName": "考核周期"
  };
  //考核对象类型
  refinfo['evaluobjecttype'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "PROD001",
    "refModelUrl": "/occ-base" + "/cust-doc-defs-ref/",
    "refName": "考核对象类型",
    "refUIType": "RefGrid",
    "rootName": "考核对象类型"
  };
  //指标分类
  refinfo['quotaGroupId'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/fmcg-sales-target/quota-groups-ref/",
    "refName": "指标分类",
    "refUIType": "RefGrid",
    "rootName": "指标分类",
  };
  //指标分类
  refinfo['sourceObject'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/occ-base/busientity-ref/",
    "refName": "来源数据对象",
    "refUIType": "RefGrid",
    "rootName": "来源数据对象",
  };
  //取值来源对象
  refinfo['dataSourceObject'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/fmcg-sales-target/quota-sources-ref/",
    "refName": "取值来源对象",
    "refUIType": "RefGrid",
    "rootName": "取值来源对象",
  };
  //取值来源字段
  refinfo['dataSourceField'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/fmcg-dynamic-object/busientity-meta-datas-ref/",
    "refName": "取值来源字段",
    "refUIType": "RefGrid",
    "rootName": "取值来源字段",
  };
  //目标类型
  refinfo['targettype'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/fmcg-sales-target/sale/targetType-ref/",
    "refName": "目标类型",
    "refUIType": "RefGrid",
    "rootName": "目标类型",
  };
  //币种档案
  refinfo['currency'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/occ-base" + "/currency-ref/",
    "refName": "币种",
    "refUIType": "RefGrid",
    "rootName": "币种"
  };
  refinfo['custdocdef'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/occ-base" + "/cust-doc-defs-ref/",
    "refName": "字典",
    "refUIType": "RefGrid",
    "rootName": "字典列表",
  };
  refinfo['productGroup'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/fmcg-occ-base-ext/product-group-ref/",
    "refName": "产品组",
    "refUIType": "RefGrid",
    "rootName": "产品组列表",
  };
  refinfo['prodAttrStruc'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/occ-base" + "/base/prod-attr-struc-ref/",
    "refName": "特征属性结构",
    "refUIType": "RefGrid",
    "rootName": "特征属性结构",
  };
  refinfo['organization_ocm'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/occ-base" + "/organization-ref/",
    "refName": "组织",
    "refUIType": "RefGrid",
    "rootName": "组织列表",
  };
  // 部门参照
  refinfo['dept_ocm'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/occ-base" + "/department-ref/",
    "refName": "组织下部门",
    "refUIType": "RefTree",
    "rootName": "部门列表"
  };
  // 角色多选参照
  refinfo['role_com'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/occ-base" + "/role-ref/",
    "refName": "角色",
    "refUIType": "RefGrid",
    "rootName": "角色"
  };
  // 用户参照
  refinfo['user'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/occ-base" + "/user-ref/",
    "refName": "用户",
    "refUIType": "RefGrid",
    "rootName": "用户"
  };

  refinfo['orderType'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/occ-base" + "/cust-doc-defs/",
    "refName": "业务标识",
    "refUIType": "RefGrid",
    "rootName": "业务标识列表",
  };
  refinfo['productInfo'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/occ-base" + "/product-info-ref/",
    "refName": "产品信息",
    "refUIType": "RefGrid",
    "rootName": "产品信息列表"
  };
  // 成品中只查销售产品和套件
  refinfo['productsaleorsuite'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/occ-base" + "/product-info-saleorsuite-ref/",
    "refName": "产品",
    "refUIType": "RefGrid",
    "rootName": "产品",
    "defaultFieldCount": 5,
    "strFieldCode": ["refcode", "description", "productSaleSeriesName", "productModelName", "baseUnitName"],
    "strFieldName": ["编码", "描述", "销售系列", "产品型号", "计量单位"],
  };
  refinfo['packBelongProduct'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/occ-base" + "/packBelongProduct-info-ref/",
    "refName": "包件所属产品信息",
    "refUIType": "RefGrid",
    "rootName": "包件所属产品信息列表"
  };
  refinfo['productSaleSeries'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/occ-base" + "/product-sale-series-ref/",
    "refName": "销售系列表",
    "refUIType": "RefGrid",
    "rootName": "销售系列表"
  };
  //商品属性
  refinfo['productAttr'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/occ-base" + "/base/product-attribute-ref/",
    "refName": "产品属性",
    "refUIType": "RefGrid",
    "rootName": "产品属性"
  };
  // 自定义档案
  refinfo["CustDoc"] = {
    refClientPageInfo: {
      currPageIndex: 0,
      pageCount: 0,
      pageSize: 100
    },
    refCode: "",
    refModelUrl: "/occ-base" + "/cust-docs-ref/",
    refName: "档案定义表",
    refUIType: "RefGrid",
    rootName: "档案定义表"
  };
  //特征属性页面 系统档案
  refinfo["systemDoc"] = {
    refClientPageInfo: {
      currPageIndex: 0,
      pageCount: 0,
      pageSize: 100
    },
    refCode: "",
    refModelUrl: "/occ-base" + "/cust-doc-defs-ref/",
    refName: "系统档案",
    refUIType: "RefGrid",
    rootName: "系统档案"
  };
  // 特征属性
  refinfo["product-attr"] = {
    refClientPageInfo: {
      currPageIndex: 0,
      pageCount: 0,
      pageSize: 100
    },
    refCode: "",
    refModelUrl: "/occ-base" + "/base/product-attr-ref/",
    refName: "特征属性",
    refUIType: "RefGrid",
    rootName: "特征属性"
  };
  // 特征属性值
  refinfo["prodAttrVal"] = {
    refClientPageInfo: {
      currPageIndex: 0,
      pageCount: 0,
      pageSize: 100
    },
    refCode: "",
    refModelUrl: "/occ-base" + "/base/prod-attr-val-ref/",
    refName: "特征属性值",
    refUIType: "RefGrid",
    rootName: "特征属性值"
  };
  refinfo['prodStyle'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/occ-base" + "/prod-style-ref/",
    "refName": "风格表",
    "refUIType": "RefGrid",
    "rootName": "风格表"
  };
  refinfo['productCategory'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/occ-base" + "/product-category-ref/",
    "refName": "产品品类表",
    "refUIType": "RefGrid",
    "rootName": "产品品类表"
  };
  refinfo['ProductTextureType'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/occ-base" + "/product-texture-type-ref/",
    "refName": "上级材质",
    "refUIType": "RefGrid",
    "rootName": "上级材质"
  };
  refinfo['ProdMaterial'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/occ-base" + "/product-material-group-ref/",
    "refName": "上级物料组",
    "refUIType": "RefGrid",
    "rootName": "上级物料组",
    "defaultFieldCount": 4,
    "strFieldCode": ["refcode", "name", "treePathCodePret", "treePathNamePret"],
    "strFieldName": ["编码", "名称", "物料组编码", "物料组名称"],
  };
  refinfo['ProdMaterialtree'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/occ-base" + "/product-material-group-tree-ref/",
    "refName": "物料组",
    "refUIType": "RefTree",
    "rootName": "物料组"
  };
  refinfo['productRadSeries'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/occ-base" + "/product-rad-series-ref/",
    "refName": "产品研发表",
    "refUIType": "RefGrid",
    "rootName": "产品研发表"
  };
  refinfo['productModel'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/occ-base" + "/product-model-ref/",
    "refName": "型号表",
    "refUIType": "RefGrid",
    "rootName": "型号表"
  };
  refinfo['CustDoc'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/occ-base" + "/cust-docs-ref/",
    "refName": "档案定义表",
    "refUIType": "RefGrid",
    "rootName": "档案定义表"
  };
  refinfo['customer'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/occ-base" + "/customer-ref/",
    "refName": "客户",
    "refUIType": "RefGrid",
    "rootName": "客户"
  };
  // 潜在客户参照
  refinfo['customerPotential'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/occ-base" + "/customer-potential-ref/",
    "refName": "潜在客户",
    "refUIType": "RefGrid",
    "rootName": "客户"
  };
  // 客户申请单参照
  refinfo['customerApply'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/occ-base" + "/customer-apply-ref/",
    "refName": "客户申请单",
    "refUIType": "RefGrid",
    "rootName": "客户"
  };

  refinfo['customeraddress'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/occ-base" + "/customer-addr-ref/",
    "refName": "地址",
    "refUIType": "RefGrid",
    "rootName": "地址"
  };
  refinfo['busstype'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "QY037",
    "refModelUrl": "/occ-base" + "/cust-doc-defs-ref/",
    "refName": "业务类型",
    "refUIType": "RefGrid",
    "rootName": "业务类型"
  };
  refinfo['channeltype'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "QY059",
    "refModelUrl": "/occ-base" + "/cust-doc-defs-ref/",
    "refName": "渠道类型",
    "refUIType": "RefGrid",
    "rootName": "渠道类型"
  };
  // 公告分类参照
  refinfo['noticeType'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "xlx106",
    "refModelUrl": "/occ-base" + "/cust-doc-defs-ref/",
    "refName": "公告分类",
    "refUIType": "RefGrid",
    "rootName": "公告分类"
  };

  // 身份类型参照 -- 活动政策-推广团队-身份类型
  refinfo['identity'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "xlxprom012",
    "refModelUrl": "/occ-base" + "/cust-doc-defs-ref/",
    "refName": "身份类型",
    "refUIType": "RefGrid",
    "rootName": "身份类型"
  };

  // 餐饮形式
  refinfo['cateringForm'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "xlxprom002",
    "refModelUrl": "/occ-base" + "/cust-doc-defs-ref/",
    "refName": "餐饮形式",
    "refUIType": "RefGrid",
    "rootName": "餐饮形式"
  };

  // 餐饮类型
  refinfo['cateringType'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "xlxprom001",
    "refModelUrl": "/occ-base" + "/cust-doc-defs-ref/",
    "refName": "餐饮类型",
    "refUIType": "RefGrid",
    "rootName": "餐饮类型"
  };

  // 房间类型
  refinfo['roomType'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "xlxprom003",
    "refModelUrl": "/occ-base" + "/cust-doc-defs-ref/",
    "refName": "房间类型",
    "refUIType": "RefGrid",
    "rootName": "房间类型"
  };

  // 支付对象类型
  refinfo['payObjectType'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "xlxprom005",
    "refModelUrl": "/occ-base" + "/cust-doc-defs-ref/",
    "refName": "支付对象类型",
    "refUIType": "RefGrid",
    "rootName": "支付对象类型"
  };

  // 互动地址类型参照
  refinfo['placeType'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "xlxprom006",
    "refModelUrl": "/occ-base" + "/cust-doc-defs-ref/",
    "refName": "地址类型",
    "refUIType": "RefGrid",
    "rootName": "地址类型"
  };
  refinfo['product'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/occ-base" + "/product-ref/",
    "refName": "销售产品",
    "refUIType": "RefGrid",
    "rootName": "销售产品",
    "defaultFieldCount": 5,
    "strFieldCode": ["productInfoCode", "productInfoName", "saleSeriesName", "productModelName", "baseUnitName"],
    "strFieldName": ["编码", "名称", "销售系列", "产品型号", "计量单位"],
  };
  refinfo['colordoc'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/occ-base" + "/color-doc-ref/",
    "refName": "颜色表",
    "refUIType": "RefGrid",
    "rootName": "颜色表"
  };
  refinfo['prodSpec'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/occ-base" + "/prod-spec-ref/",
    "refName": "规格表",
    "refUIType": "RefGrid",
    "rootName": "规格表"
  };
  refinfo['utils'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/occ-base" + "/unit-ref/",
    "refName": "计量单位表",
    "refUIType": "RefGrid",
    "rootName": "计量单位表"
  };
  refinfo['designProduct'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/occ-base" + "/prod-design-ref/",
    "refName": "设计产品表",
    "refUIType": "RefGrid",
    "rootName": "设计产品表"
  };
  refinfo['account'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/occ-base" + "/account-ref/",
    "refName": "账户",
    "refUIType": "RefGrid",
    "rootName": "账户"
  };
  refinfo['productFunction'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/occ-base" + "/product-function-ref/",
    "refName": "功能表",
    "refUIType": "RefGrid",
    "rootName": "功能表"
  };
  refinfo['productPack'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/occ-base" + "/finished-product-pack-ref/",
    "refName": "包件信息",
    "refUIType": "RefGrid",
    "rootName": "包件信息"
  };
  refinfo['department'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/occ-base" + "/department-ref/",
    "refName": "所属部门",
    "refUIType": "RefGrid",
    "rootName": "所属部门"
  };
  //部门树形参照
  refinfo['departmenttree'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/occ-base" + "/department-tree-ref/",
    "refName": "所属部门",
    "refUIType": "RefTree",
    "rootName": "所属部门"
  };
  refinfo['person'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    // "refModelUrl": "/occ-base/person-ref/",
    "refModelUrl": "/occ-base/person-ext-ref/",
    "refName": "人员",
    "refUIType": "RefGrid",
    "rootName": "人员"
  };
  refinfo['personext'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    // "refModelUrl": "/occ-base/person-ref/",
    "refModelUrl": "/occ-base/person-ext-ref/",
    "refName": "人员",
    "refUIType": "RefGrid",
    "rootName": "人员"
  };
  refinfo['ecommerceplatform'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/occ-base" + "/comm-plat-ref/",
    "refName": "所属平台编码",
    "refUIType": "RefGrid",
    "rootName": "所属平台编码"
  };
  /*refinfo['channelInvestUnit'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/occ-base" + "/chan-inve-unit-ref/",
    "refName": "投资单位",
    "refUIType": "RefGrid",
    "rootName": "投资单位"
  };*/
  refinfo['customerGrade'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/occ-base" + "/customer-ref/",
    "refName": "上级经销商",
    "refUIType": "RefGrid",
    "rootName": "上级经销商"
  };
  refinfo['country'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/occ-base" + "/base/country-ref/",
    "refName": "国别",
    "refUIType": "RefGrid",
    "rootName": "国别",
    // "isEnable": false,
    // "default": "CN"
  };
  refinfo['region'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/occ-base" + "/administrative-division-ref/",
    "refName": "地区",
    "refUIType": "RefGrid",
    "rootName": "地区"
  };
  refinfo['market'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/occ-base" + "/market-areas-ref/",
    "refName": "市场区域",
    "refUIType": "RefGrid",
    "rootName": "市场区域"
  };
  refinfo['shipToPartys'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/occ-base" + "/ship-to-partys-ref/",
    "refName": "送达方",
    "refUIType": "RefGrid",
    "rootName": "送达方",
    "strFieldCode": ["customerAddresCode", "customerAddresName"],
    "strFieldName": ["编码", "名称"],
  };
  refinfo['channelCusStores'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/occ-base" + "/channel-cus-stores-ref/",
    "refName": "账户送达方",
    "refUIType": "RefGrid",
    "rootName": "账户送达方",
    "defaultFieldCount": 3,
    "strFieldCode": ["refcode", "refname", "accountName"],
    "strFieldName": ["编码", "送达方", "业务账户"]
  };
  refinfo['shopdecoarea'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/occ-base" + "/shop-deco-area-ref/",
    "refName": "门店装修区域",
    "refUIType": "RefGrid",
    "rootName": "门店装修区域",
    // "strFieldCode":["customerAddresCode","customerAddresName"],
    // "strFieldName":["编码","名称"],
  };
  refinfo['accountManager'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/occ-base" + "/person-organization-ref/",
    "refName": "客户经理",
    "refUIType": "RefGrid",
    "rootName": "客户经理",
  };
  refinfo['prodPhoto'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/occ-base" + "/prod-photo-info-ref/",
    "refName": "产品图片",
    "refUIType": "RefGrid",
    "rootName": "产品图片",
  };
  refinfo['pictureCategories'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/occ-base" + "/picture-categories-ref/",
    "refName": "图片分类",
    "refUIType": "RefGrid",
    "rootName": "图片分类",
  };
  refinfo['channelpostifnoref'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/occ-base" + "/channel-postifno-ref/",
    "refName": "岗位",
    "refUIType": "RefGrid",
    "rootName": "岗位",
  };
  refinfo['postref'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/occ-base" + "/base/posts-ref/",
    "refName": "岗位",
    "refUIType": "RefGrid",
    "rootName": "岗位",
  };
  refinfo['salePrincipal'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/occ-base" + "/cust-doc-defs/",
    "refName": "销售主体",
    "refUIType": "RefGrid",
    "rootName": "销售主体列表"
  };
  // 基本档案 end-----------------------------------------------------
  //价格促销 start
  refinfo['organization_price'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/occ-base" + "/price-organization-ref/",
    "refName": "组织",
    "refUIType": "RefGrid",
    "rootName": "组织列表",
  };
  refinfo['activenode'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/occ-base" + "/active-node-ref/",
    "refName": "活动节点",
    "refUIType": "RefGrid",
    "rootName": "活动节点列表",
  };
  refinfo['productcombine'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/occ-base" + "/product-combine-ref/",
    "refName": "产品组合",
    "refUIType": "RefGrid",
    "rootName": "产品组合列表",
  };
  refinfo['agencypartition'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/occ-base" + "/agency-partition-ref/",
    "refName": "办事处分区",
    "refUIType": "RefTree",
    "rootName": "办事处分区列表"
  };
  refinfo['agencypartitionfilterbodys'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/occ-base" + "/agency-partition-filterbodys-tree-ref/",
    "refName": "办事处分区",
    "refUIType": "RefTree",
    "rootName": "办事处分区列表"
  };
  refinfo['agencypartitiongrid'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/occ-base" + "/agency-partition-gird-ref/",
    "refName": "办事处分区",
    "refUIType": "RefGrid",
    "rootName": "办事处分区列表"
  };
  refinfo['activitytypeb'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/occ-base" + "/activity-type-b-ref/",
    "refName": "活动类型",
    "refUIType": "RefGrid",
    "rootName": "活动类型列表"
  };
  refinfo['activitytypec'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/occ-base" + "/prom/activity-type-c-ref/",
    "refName": "活动类型",
    "refUIType": "RefGrid",
    "rootName": "活动类型列表"
  };
  refinfo['applytype'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/fmcg-act" + "/mer/apply-types-ref/",
    "refName": "活动类型",
    "refUIType": "RefGrid",
    "rootName": "活动类型列表"
  };
  refinfo['activitystore'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/occ-base" + "/prom/activity-stores/",
    "refName": "活动门店",
    "refUIType": "RefGrid",
    "rootName": "活动门店"
  };
  refinfo['activitystorec'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/occ-base" + "/prom/prom-store-c-ref/",
    "refName": "活动门店",
    "refUIType": "RefGrid",
    "rootName": "活动门店",
    "strFieldCode": ["refcode", "refname"],
    "strFieldName": ["编码", "名称"],
  };
  refinfo['customerRefb'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/occ-base" + "/prom-customer-ref/",
    "refName": "经销商",
    "refUIType": "RefGrid",
    "rootName": "经销商"
  };
  refinfo['customerRefc'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/occ-base" + "/prom/prom-customer-c-ref/",
    "refName": "经销商",
    "refUIType": "RefGrid",
    "rootName": "经销商"
  };
  refinfo['customerRefbchoose'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/occ-base" + "/prom-customer-to-choose-product-ref/",
    "refName": "经销商",
    "refUIType": "RefGrid",
    "rootName": "经销商"
  };
  refinfo['promofficeb'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/occ-base" + "/prom-office-ref/",
    "refName": "办事处",
    "refUIType": "RefGrid",
    "rootName": "办事处"
  };
  refinfo['shopref'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/occ-base" + "/shop-ref/",
    "refName": "门店",
    "refUIType": "RefGrid",
    "rootName": "门店"
  };
  refinfo['promactivity'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/occ-base" + "/prom-activity-ref/",
    "refName": "活动定义",
    "refUIType": "RefGrid",
    "rootName": "活动定义列表"
  };
  refinfo['promactivityc'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/occ-base" + "/prom/activity-c-ref/",
    "refName": "活动定义",
    "refUIType": "RefGrid",
    "rootName": "活动定义列表"
  };

  refinfo['demoactivitytypeb'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/occ-base" + "/demo-activity-type-b-ref/",
    "refName": "活动类型",
    "refUIType": "RefGrid",
    "rootName": "活动类型列表",
    "defaultFieldCount": 5,
    "strFieldCode": ["refpk", "refcode", "refname", "status"],
    "strFieldName": ["主键", "编码", "名称", "状态"],
    // "refCodeNamePK":["refcode","refname","refpk"],
  };
  refinfo['demotabref'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/occ-base" + "/testref_grid_ctr/",
    "refName": "产品/产品组合",
    "refUIType": "RefGrid",
    "rootName": "活动类型列表",
    // "refCodeNamePK":["refcode","refname","refpk"],
  };
  refinfo['promproducttab'] = {
    "cancelNormal": false,
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/occ-base" + "/prom-product-ref/",
    "refName": "产品/产品组合",
    "refUIType": "RefGrid",
    "rootName": "",
    "hasTab": true,
    "tab1": "产品组合",
    "tab2": "产品",
    // "defaultFieldCount":3,
    // "strFieldCode":["refpk","refcode","refname"],
    // "strFieldName":["主键","编码","名称"],
    // "strFieldCode_tab":["refcode","refname"],
    // "strFieldName_tab":["编码","名称"],
    // "refCodeNamePK":["refcode","refname","refpk"],
  };
  refinfo['promproductstab'] = {
    "cancelNormal": false,
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/occ-base" + "/prom-product-c-ref/",
    "refName": "销售产品/产品组合",
    "refUIType": "RefGrid",
    "rootName": "",
    "hasTab": true,
    "tab1": "产品组合",
    "tab2": "产品",
    // "defaultFieldCount":3,
    // "strFieldCode":["refpk","refcode","refname"],
    // "strFieldName":["主键","编码","名称"],
    // "strFieldCode_tab":["refcode","refname"],
    // "strFieldName_tab":["编码","名称"],
    // "refCodeNamePK":["refcode","refname","refpk"],
  };
  refinfo['promproductpack'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/occ-base" + "/prom-pack-pro-ref/",
    "refName": "产品包件",
    "refUIType": "RefGrid",
    "rootName": "产品包件"
  };
  refinfo['floatCoefficient'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/occ-base" + "/float-coeff-ref/",
    "refName": "上浮系数",
    "refUIType": "RefGrid",
    "rootName": "上浮系数列表"
  };
  refinfo['wholeSalePrice'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/occ-base" + "/whole-sale-price-ref/",
    "refName": "批发基础价",
    "refUIType": "RefGrid",
    "rootName": "批发基础价列表"
  };
  refinfo['retailManager'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/occ-base" + "/retail-manager-ref/",
    "refName": "零售管控价",
    "refUIType": "RefGrid",
    "rootName": "零售管控价列表"
  };
  refinfo['wholeSalePriceCopy'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/occ-base" + "/whole-sale-price-copy-ref/",
    "refName": "批发基础价",
    "refUIType": "RefGrid",
    "rootName": "批发基础价列表",
    "defaultFieldCount": 5,
    "strFieldCode": ["refcode", "refname", "salePrincipal", "saleOrg"],
    "strFieldName": ["价格表编码", "价格表名称", "销售主体", "销售组织"]
  };
  refinfo['promDesignProduct'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/occ-base" + "/prom-prod-design-ref/",
    "refName": "设计产品",
    "refUIType": "RefGrid",
    "rootName": "设计产品"
  };

  //价格促销 end-----------------------------------------------------

  //b2b订单中心 start-----------------------------------------------------
  refinfo['potypoe'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/occ-base" + "/po-type-ref/",
    "refName": "采购订单类型",
    "refUIType": "RefGrid",
    "rootName": "采购订单类型列表"
  };
  refinfo['transportmode'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/occ-base" + "/transport-mode-ref/",
    "refName": "运输方式",
    "refUIType": "RefGrid",
    "rootName": "运输方式类型列表",
    "defaultFieldCount": 1,
    "strFieldCode": ["refname"],
    "strFieldName": ["运输方式"]
  };
  refinfo['sotypoe'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/occ-base" + "/so-type-ref/",
    "refName": "销售订单类型",
    "refUIType": "RefGrid",
    "rootName": "销售订单类型列表"
  };
  refinfo['vehicletypoe'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/occ-base" + "/vehicle-type-ref/",
    "refName": "车辆类型",
    "refUIType": "RefGrid",
    "rootName": "车辆类型列表"
  };
  refinfo['shippingport'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/occ-base" + "/shipping-port-ref/",
    "refName": "装运点",
    "refUIType": "RefGrid",
    "rootName": "装运点"
  };
  refinfo['storeLocation'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/occ-base" + "/store-location-ref/",
    "refName": "仓库",
    "refUIType": "RefGrid",
    "rootName": "仓库"
  };
  refinfo['storearea'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/occ-base" + "/store-area-ref/",
    "refName": "库区",
    "refUIType": "RefGrid",
    "rootName": "库区"
  };
  refinfo['shippingcondition'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/occ-base" + "/shipping-condition-ref/",
    "refName": "装运条件",
    "refUIType": "RefGrid",
    "rootName": "装运条件"
  };
  //b2b订单中心 end-----------------------------------------------------

  //B2C订单中心 start---------------------------------------------------
  //档案管理 start---------------------------------------------------
  refinfo['organization_auth_b2c'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/occ-base" + "/b2c/agency-auth-ref/",
    "refName": "组织",
    "refUIType": "RefGrid",
    "rootName": "组织列表",
  };
  refinfo['B2CProduct'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/occ-base" + "/product-info-ref/",
    "refName": "请选择",
    "refUIType": "RefGrid",
    "rootName": "产品组列表"
  };
  refinfo['B2CfourdDList'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    // "refModelUrl": "/occ-base"+"/b2c/serviceprovider-ref/",
    "refModelUrl": "/occ-base" + "/b2c/serviceProviderInfo-auth-ref/",
    "refName": "服务商",
    "refUIType": "RefGrid",
    "rootName": "服务商列表",
    "defaultFieldCount": 5,
    //"strFieldCode": ["orgName", "serviceType", "name"],
    //"strFieldName": ["办事处名称", "服务商编码", "服务商名称"],
  };
  refinfo['B2CgoodsSettlement'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/occ-base" + "/b2c/goods-settlement-standards-ref/",
    "refName": "结算标准类别",
    "refUIType": "RefGrid",
    "rootName": "商品结算标准",
    "defaultFieldCount": 5,
    "strFieldCode": ["refcode", "refname"],
    "strFieldName": ["编码", "名称"],
  };
  refinfo['b2cplatform'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/occ-base" + "/b2c/platform-ref/",
    "refName": "所属平台",
    "refUIType": "RefGrid",
    "rootName": "所属平台"
  };
  refinfo['b2cGoodsRef'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/occ-base" + "/b2c/goods-ref/",
    "refName": "请选择",
    "refUIType": "RefGrid",
    "rootName": "商品列表"
  };

  refinfo['b2csupplier'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": '/occ-base/suppliers-ref/',
    "refName": "供应商",
    "refUIType": "RefGrid",
    "rootName": "供应商列表"
  };
  refinfo["suppliercategory"] = {
    refClientPageInfo: {
      currPageIndex: 0,
      pageCount: 0,
      pageSize: 100
    },
    refCode: "",
    refModelUrl: "/occ-base" + "/base/supplier-category-ref/",
    refName: "供应商分类",
    refUIType: "RefTree",
    rootName: "供应商分类"
  };
  refinfo['b2cStoreRef'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/occ-base" + "/b2c/store-auth-ref/",
    // "refModelUrl": "/occ-base"+"/b2c/store-ref/",
    "refName": "请选择",
    "refUIType": "RefGrid",
    "rootName": "店铺列表"
  };
  refinfo['b2cproduct'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/occ-base" + "/product-info-ref/",
    "refName": "销售产品",
    "refUIType": "RefGrid",
    "rootName": "销售产品",
    "defaultFieldCount": 5,
    "strFieldCode": ["refcode", "refname", "proStateName"],
    "strFieldName": ["产品编码", "产品名称", "产品状态"],
  };
  refinfo['serviceFeeCount'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/occ-base" + "/b2c/settlement-formulas-ref/",
    "refName": "服务费计算公式",
    "refUIType": "RefGrid",
    "rootName": "档案管理",
    "defaultFieldCount": 5,
  };
  refinfo['b2clogicompany'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/occ-base" + "/b2c/logicompany-ref/",
    "refName": "物流公司",
    "refUIType": "RefGrid",
    "rootName": "物流公司"
  };
  refinfo['b2cPromotionRef'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/occ-base" + "/b2c/promotion-ref/",
    "refName": "促销活动",
    "refUIType": "RefGrid",
    "rootName": "促销活动"
  };
  refinfo['b2cPromotionRuleRef'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/occ-base" + "/b2c/promotion-rule-ref/",
    "refName": "促销规则",
    "refUIType": "RefGrid",
    "rootName": "促销规则"
  };
  //档案管理 end-----------------------------------------------------
  refinfo['settlementDetailsRef'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/occ-base" + "/b2c/settle-rpt-ref/",
    "refName": "服务费结算表",
    "refUIType": "RefGrid",
    "rootName": "服务费结算表",
    "defaultFieldCount": 5,
    "strFieldCode": ["refcode", "serviceProviderName", "dateStart", "dateEnd"],
    "strFieldName": ["结算单号", "服务商名称", "结算起始日期", "结算截止日期"]
  };
  //B2c订单中心 end-----------------------------------------------------
  //
  refinfo['filerSchemeRef'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/occ-base" + "/b2c/fields-configure-ref/",
    "refName": "字段名称",
    "refUIType": "RefGrid",
    "rootName": "字段名称列表"
  };
  //模版管理Start----------------------------------
  refinfo['metadata'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/occ-base" + "/metadata-ref/",
    "refName": "UI元数据",
    "refUIType": "RefGrid",
    "rootName": "UI元数据"
  };
  refinfo['menu'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/occ-base" + "/menu-ref/",
    "refName": "菜单",
    "refUIType": "RefGrid",
    "rootName": "菜单"
  };

  refinfo['role'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/occ-base" + "/role-ref/",
    "refName": "角色",
    "refUIType": "RefGrid",
    "rootName": "角色"
  };
  //模版管理End----------------------------------
  // 订单标记参照服务order-sign-ref
  refinfo['ordersign'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/occ-base" + "/b2c/order-sign-ref/",
    "refName": "订单标记",
    "refUIType": "RefGrid",
    "rootName": "订单标记"
  };

  /*基础档案fmcg*/
  //组织树
  refinfo['organizationTree'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/occ-base" + "/organization-tree-ref/",
    "refName": "组织",
    "refUIType": "RefTree",
    "rootName": "组织"
  };
  //区域市场树
  refinfo['areaMarketTree'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/occ-base" + "/market-areas-ref/",
    "refName": "区域市场",
    "refUIType": "RefTree",
    "rootName": "区域市场"
  };

  // 参照测试
  refinfo['reftest'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/occ-base" + "/kb/catalogs-ref/",
    "refName": "参照测试",
    "refUIType": "RefGrid",
    "rootName": "参照测试"
  };

  //知识库标签分类参照
  refinfo['refknowledgelabelclass'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/fmcg-kb/kb/lable-types-ref/",
    "refName": "标签分类",
    "refUIType": "RefGrid",
    "rootName": "标签分类"
  };

  //知识库标签参照
  refinfo['refknowledgelabel'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/fmcg-kb/kb/lables-ref/",
    "refName": "标签",
    "refUIType": "RefGrid",
    "rootName": "标签"
  };

  //知识目录参照
  refinfo['refknowledgecatalog'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/fmcg-kb/kb/catalogs-tree-ref/",
    "refName": "知识目录参照",
    "refUIType": "RefTree",
    "rootName": "知识目录"
  };

  //知识目录所属组织参照
  refinfo['refknowledgeorg'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/occ-base/organizations/",
    "refName": "所属组织参照",
    "refUIType": "RefGrid",
    //  "rootName": "知识目录参照"
  };

  //知识库参照
  refinfo['knowstore'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": '/fmcg-kb/kb/storages-ref/',
    "refName": "知识库",
    "refUIType": "RefGrid",
    "rootName": "知识库"
  };
  // 人员参照
  refinfo['persons'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    // "refModelUrl": '/occ-base/person-ref/',
    "refModelUrl": '/occ-base/person-ext-ref/',
    "refName": "人员参照",
    "refUIType": "RefGrid",
  };
  // 组织参照
  refinfo['organization_xlx'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": '/occ-base/organization-ref/',
    "refName": "组织参照",
    "refUIType": "RefGrid",
  };

  //-------零售商--start
  //客户所属组织参照
  refinfo['organizationId'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/occ-base/organization-ref/",
    "refName": "组织",
    "refUIType": "RefGrid",
    //  "rootName": "知识目录参照"
  };

  //区域市场参照
  refinfo['marketareas'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/occ-base/market-areas-ref/",
    "refName": "区域市场",
    "refUIType": "RefGrid",
    //"rootName": "区域市场"
  };

  //客户类型参照
  refinfo['channeltypes'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": '/occ-base/base/channel-type-ref/',
    "refName": "客户类型",
    "refUIType": "RefGrid",
    "refparam": '{"EQ_isEnable":"1"}',
    //"rootName": "客户类型"
  };

  //客户参照
  refinfo['customers'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/occ-base/customer-ref/",
    "refName": "客户",
    "refUIType": "RefGrid",
    //"rootName": "客户"
  };

  //客户基本分类参照
  refinfo['customercategorys'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/occ-base/base/customer-category-ref/",
    "refName": "客户基本分类",
    "refUIType": "RefGrid",
    //"rootName": "客户基本分类"
  };

  //地区分类参照
  refinfo['areaclass'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/occ-base/administrative-division-ref/",
    "refName": "地区分类",
    "refUIType": "RefGrid",
    //"rootName": "地区分类"
  };

  //客户税类参照
  refinfo['taxtype'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "xlx005",
    "refModelUrl": "/occ-base/cust-doc-defs-ref/",
    "refName": "客户税类",
    "refUIType": "RefGrid",
    //"rootName": "客户税类"
  };

  //客户等级参照
  refinfo['custlevel'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/occ-base/base/customer-level-ref/",
    "refName": "客户等级",
    "refUIType": "RefGrid",
    //"rootName": "客户信用等级"
  };

  //品牌参照
  refinfo['brandref'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/occ-base/base/brand-ref/",
    "refName": "品牌",
    "refUIType": "RefGrid",
    //"rootName": "品牌"
  };
  //产品线参照
  refinfo['prodlineref'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/occ-base/product-line-ref/",
    "refName": "产品线",
    "refUIType": "RefGrid",
    //"rootName": "产品线"
  };

  //产品组参照
  refinfo['prodgroupref'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/fmcg-occ-base-ext/product-group-ref/",
    "refName": "产品组",
    "refUIType": "RefGrid",
    //"rootName": "产品组"
  };


  //产品组树状参照
  refinfo['prodgroupreftree'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/fmcg-occ-base-ext/product-group-ref/",
    "refName": "产品组",
    "refUIType": "RefTree",
    "rootName": "产品组"
  };

  //销售目标对象参照
  refinfo['saletargetref'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "xlxsale005",
    "refModelUrl": "/occ-base/cust-doc-defs-ref/",
    "refName": "目标对象",
    "refUIType": "RefGrid",
    //"rootName": "目标对象"
  };

  //物料参照
  refinfo['goods'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/occ-base/base/goods-ext-ref/",
    // "refModelUrl": "/occ-base/base/goods-ref/",
    "refName": "商品",
    "refUIType": "RefGrid",
    //  "rootName": "物料参照"
  };
  //物料分类参照
  refinfo['goods_categorys'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/occ-base/goods-category-ref/",
    "refName": "商品分类",
    "refUIType": "RefTree",
    "rootName": "产品分类"
  };
  //产品组分类参照
  refinfo['goods_groups'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/fmcg-occ-base-ext/product-group-ref/",
    "refName": "产品组",
    "refUIType": "RefGrid",
  };

  //季节
  refinfo['session'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "SESSION01",
    "refModelUrl": "/occ-base/cust-doc-defs-ref/",
    "refName": "季节",
    "refUIType": "RefGrid",
    //"rootName": "季节"
  };

  // 模块列表
  refinfo['modulelist'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "xlxm103",
    "refModelUrl": "/occ-base/cust-doc-defs-ref/",
    "refName": "模块列表",
    "refUIType": "RefGrid",
    //"rootName": "季节"
  };

  // 基础设置 - 参数类型
  refinfo['argtype'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "xlxm104",
    "refModelUrl": "/occ-base/cust-doc-defs-ref/",
    "refName": "参数类型",
    "refUIType": "RefGrid",
    //"rootName": "季节"
  };

  //活动
  //基础档案
  refinfo['basedoc'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "xlxprom006",
    "refModelUrl": "/occ-base/cust-doc-defs-ref/",
    "refName": "地点类型",
    "refUIType": "RefGrid",
  };

  refinfo['roleTypeRef'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "xlx107",
    "refModelUrl": "/occ-base/cust-doc-defs-ref/",
    "refName": "角色类型",
    "refUIType": "RefGrid",
  };

  //基础档案
  refinfo['chengdanfang'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "xlxprom004",
    "refModelUrl": "/occ-base/cust-doc-defs-ref/",
    "refName": "承担方",
    "refUIType": "RefGrid",
  };
  //费用项
  refinfo['fee'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/fmcg-act/fee-item-ref/",
    "refName": "费用收支项目",
    "refUIType": "RefGrid",
  };
  //费用项
  refinfo['fee'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/fmcg-act/fee-item-ref/",
    "refName": "费用收支项目",
    "refUIType": "RefGrid",
  };
  //费用项
  refinfo['feeItem'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/fmcg-act/fee-item-ref/",
    "refName": "费用收支项目",
    "refUIType": "RefGrid",
  };
  // 政策类型
  refinfo['policytype'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/fmcg-act/mer/policy-types-ref/",
    "refName": "政策类型",
    "refUIType": "RefGrid",
  };

  // 总结类型
  refinfo['sumtype'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/fmcg-act/mer/sum-types-ref/",
    "refName": "总结类型",
    "refUIType": "RefGrid",
  };

  //销售年度期间
  refinfo['salerange'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/fmcg-sales-target/sale/range-ref/",
    "refName": "销售年度期间",
    "refUIType": "RefGrid",
  };
  //铺货检查项目
  refinfo['checktype'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "xlx110",
    "refModelUrl": "/occ-base" + "/cust-doc-defs-ref/",
    "refName": "检查项目",
    "refUIType": "RefGrid",
  };

  //红黄灯模块列表
  refinfo['hhdmodule'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/fmcg-cooperation-work/cw/sethhd-modules-tree-ref/",
    "refName": "红黄灯模块选择",
    "refUIType": "RefTree",
    "rootName": "红黄灯模块选择"
  };

  // 参观申请会议中的参观路线
  refinfo['visitroutes'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/fmcg-act/mer/vistor-routes-ref/",
    "refName": "参观路线",
    "refUIType": "RefGrid",
  };

  refinfo['visitroutes'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/fmcg-occ-base-ext/terminal-type-ref/",
    "refName": "终端",
    "refUIType": "RefGrid",
  };
  //终端
  refinfo['template_terminal'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/fmcg-occ-base-ext/terminal-stores-ref/",
    "refName": "终端",
    "refUIType": "RefGrid",
  };

  // 渠道类型
  refinfo['canaltyperef'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/fmcg-occ-base-ext/canal-type-ref/",
    "refName": "渠道类型",
    "refUIType": "RefGrid",
  };
  // 人员类别
  refinfo['persontypes'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/fmcg-occ-base-ext/person-types-ref/",
    "refName": "人员类别",
    "refUIType": "RefGrid",
  };

  //拜访主题
  refinfo['visittheme'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/fmcg-visit/subjects-ref/",
    "refName": "拜访主题",
    "refUIType": "RefGrid",
    "defaultFieldCount": 1,
    "strFieldCode": ["refname"],
    "strFieldName": ["名称"],
  };
  //拜访主题
  refinfo['custvisittheme'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/fmcg-visit/distributor/subjects-ref/",
    "refName": "拜访主题",
    "refUIType": "RefGrid",
    "defaultFieldCount": 1,
    "strFieldCode": ["refname"],
    "strFieldName": ["名称"],
  };
  //终端
  refinfo['terminal'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/fmcg-occ-base-ext/terminal-stores-ref/",
    "refName": "终端",
    "refUIType": "RefGrid",
  };
  //终端类型
  refinfo['terminaltype'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/fmcg-occ-base-ext/terminal-type-ref/",
    "refName": "终端类型",
    "refUIType": "RefGrid",
  };

  //二级终端类型
  refinfo['terminalsecondarytype'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/fmcg-occ-base-ext/terminal-secondary-type-ref/",
    "refName": "二级终端类型",
    "refUIType": "RefGrid",
  };
  //路线
  refinfo['routesref'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/fmcg-visit/routes-ref/",
    "refName": "路线",
    "refUIType": "RefGrid",
    "strFieldCode": ["refname"],
    "strFieldName": ["名称"],
  };
  //品项
  refinfo['productmaterialgroup'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/fmcg-occ-base-ext/product-material-group-ref/",
    "refName": "路线",
    "refUIType": "RefGrid",
  };
  //模板字段可选参照
  refinfo['tplfieldrefer'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/occ-base/ref-ref-centers/",
    "refName": "可选参照",
    "refUIType": "RefGrid",
  };
  //上级连锁机构
  refinfo['terminalparentref'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/fmcg-occ-base-ext/terminal-parent-ref/",
    "refName": "上级连锁机构",
    "refUIType": "RefGrid",
  };
  //路线人员分配
  refinfo['routespersonref'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/fmcg-visit/routes-person-ref/",
    "refName": "路线人员分配",
    "refUIType": "RefGrid",
    "strFieldCode": ["personCode", "personName"],
    "strFieldName": ["编码", "名称"],
  };
  //业务对象
  refinfo['busiobject'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/occ-base/busiobjects-ref/",
    "refName": "业务对象",
    "refUIType": "RefGrid",
  };
  //模板可分配业务对象
  refinfo['tplallotbusiobject'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/occ-base/busiobjects-ref/",
    "refName": "业务对象",
    "refUIType": "RefGrid",
    "refparam": '{"EQ_hasBusiType":"1"}',
  };
  //业务类型
  refinfo['busitype'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/occ-base/busitypes-ref/",
    "refName": "业务类型",
    "refUIType": "RefGrid",
  };
  //人员
  refinfo['person1'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    // "refModelUrl": "/occ-base/person-ref/",
    "refModelUrl": "/occ-base/person-ref/",
    "refName": "人员",
    "refUIType": "RefGrid",
    "rootName": "人员"
  };
  //巡查单类型
  refinfo['sumpotroltypesref'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/fmcg-act/mer/sum-potrol-types-ref/",
    "refName": "巡查单类型",
    "refUIType": "RefGrid",
  };
  //执行单类型
  refinfo['suminspecttypesref'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/fmcg-act/mer/sum-inspect-types-ref/",
    "refName": "执行单类型",
    "refUIType": "RefGrid",
  };
  //活动方案类型
  // refinfo['applytypesref'] = {
  //   "refClientPageInfo": {
  //     "currPageIndex": 0,
  //     "pageCount": 0,
  //     "pageSize": 100
  //   },
  //   "refCode": "",
  //   "refModelUrl": "/fmcg-act/mer/apply-types-ref/",
  //   "refName": "活动方案类型",
  //   "refUIType": "RefGrid",
  // };
  //终端等级
  refinfo['terminalgrade'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/fmcg-occ-base-ext/terminal-grade-ref/",
    "refName": "终端等级",
    "refUIType": "RefGrid",
  };
  //结案报告类型
  refinfo['sumtypesref'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/fmcg-act/mer/sum-types-ref/",
    "refName": "结案报告类型",
    "refUIType": "RefGrid",
  };
  //事业部
  refinfo['organization_bu'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/occ-base" + "/organization-ref/",
    "refName": "事业部",
    "refUIType": "RefGrid",
    "rootName": "事业部",
    "refparam": '{"EQ_isSale":"1"}'
    // "refparam": '{"EQ_isSale":"1","EQ_officeType":"2"}'
  };

  //商品参照
  refinfo['productinforef'] = {
    refClientPageInfo: {
      currPageIndex: 0,
      pageCount: 0,
      pageSize: 100
    },
    refCode: "",
    refModelUrl: "/ocm-web/product-info-ref/",
    refName: "商品",
    refUIType: "RefGrid",
    rootName: "商品",
    defaultFieldCount: 5,
    strFieldCode: ["refcode", "refname"],
    strFieldName: ["商品编码", "商品名称"]
  }
  //二批商参照
  refinfo['wholesalerref'] = {
    refClientPageInfo: {
      currPageIndex: 0,
      pageCount: 0,
      pageSize: 100
    },
    refCode: "",
    refModelUrl: "/occ-base/wholesaler-ref/",
    refName: "二批商",
    refUIType: "RefGrid",
    rootName: "二批商",
    defaultFieldCount: 5,
    strFieldCode: ["refcode", "refname"],
    strFieldName: ["二批商编码", "二批商名称"]
  }
  refinfo['quarters_ocm'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/occ-base/base/posts-ref/",
    "refName": "岗位层级",
    "refUIType": "RefGrid",
    "rootName": "岗位层级列表",
  };
  refinfo['item_ocm'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "",
    "refModelUrl": "/fmcg-analysis/item-ref/",
    "refName": "业务",
    "refUIType": "RefGrid",
    "rootName": "业务列表",
  };

  //统计区间
  refinfo['dateTypeIdRef'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "GRY001",
    "refModelUrl": "/occ-base" + "/cust-doc-defs-ref/",
    "refName": "业务类型",
    "refUIType": "RefGrid",
    "rootName": "业务类型"
  };
  //阈值类型
  refinfo['thresholdTypeIdRef'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "GRY002",
    "refModelUrl": "/occ-base" + "/cust-doc-defs-ref/",
    "refName": "业务类型",
    "refUIType": "RefGrid",
    "rootName": "业务类型"
  };
  //适用角色
  refinfo['postLimitIdRef'] = {
    "refClientPageInfo": {
      "currPageIndex": 0,
      "pageCount": 0,
      "pageSize": 100
    },
    "refCode": "GRY003",
    "refModelUrl": "/occ-base" + "/cust-doc-defs-ref/",
    "refName": "业务类型",
    "refUIType": "RefGrid",
    "rootName": "业务类型"
  };

  return refinfo;
});
