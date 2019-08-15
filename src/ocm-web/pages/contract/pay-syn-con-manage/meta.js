define(["ocm_basemodel"], function (basemodel) {
  // var purchasestatus = CONST.PURCHASE.PURCHASESTATUS;
  var model = {
    metas: {
      //合同表头
      complex: { //表头
        meta: {
          id: {
            type: 'string'
          }, //id
          code: { //("合同编码")
            type: 'string',
            // required: true
          },
          name: { //("合同名称")
            type: 'string',
            required: true
          },
          contractTypeId: { //("合同类型")
            type: 'string',
            required: true
          },
          contractTypeCode: { //合同类型编码
            type: 'string',
            required: true
          },
          contractTypeName: { //合同类型名称
            type: 'string',
            required: true
          },
          innerCode: { //("内部编号")
            type: 'string'
          },
          projectId: { //("项目Id")
            type: 'string'
          },
          projectName: { //("项目名称")
            type: 'string'
          },
          projectCode: { //("项目code")
            type: 'string'
          },
          saleOrgName: {
            type: 'string'
          },
          saleOrgCode: {
            type: 'string'
          },
          saleOrgId: { //("所属销售组织")
            "type": 'string',
            required: true,
            "refmodel": JSON.stringify(refinfo['organization_ocm']),
            "refcfg": '{"ctx":"/uitemplate_web"}',
            "refparam": '{"EQ_orgFuncRel":"01"}'
          },
          customerId: {
            type: "string",
            required: true,
            refmodel: JSON.stringify(refinfo["customer_sale"]),
            refcfg: '{"ctx":"/uitemplate_web","refName":"客户" }',
            refparam: '{"EQ_isChannelCustomer": "1"}'
          },
          customerName: { //("客户联系人// ")
            type: 'string'
          },
          customerCode: { //("客户联系人// ")
            type: 'string'
          },
          contact: { //("客户联系人// ")
            type: 'string'
          },
          contactType: { //("客户联系方式// ")
            type: 'string'
          },
          financeOrgId: { //("结算财务组织// ")
            type: 'string',
            required: true,
            // 结算财务组织
            refmodel: JSON.stringify(refinfo["organization_ocm"]),
            refcfg: '{"ctx":"/uitemplate_web","refName":"结算财务组织" }',
            refparam: '{"EQ_orgFuncRel":"07","EQ_isEnable":"1"}'
          },
          financeOrgCode: {
            type: "string",
          },
          financeOrgName: {
            type: "string",
          },
          effectDate: { //("生效日期// ")
            type: 'Date',
            required: true
          },
          invalidDate: { //("失效日期// ")
            type: 'Date',
            required: true
          },
          businessType: { //("交易约束类型// ")
            type: 'string',
            required: true
          },
          contractAmount: { //("合同总金额// ")
            type: "amountFloat"
          },
          saleDeptId: { //("销售部门// ")
            type: 'string'
          },
          saleDeptCode: { //("销售部门编码/ ")
            type: 'string'
          },
          saleDeptName: { //("销售部门名称// ")
            type: 'string'
          },
          customerManagerId: { //("客户经理Id// ")
            type: 'string'
          },
          customerManagerCode: { //("客户经理编码// ")
            type: 'string'
          },
          customerManagerName: { //("客户经理名称// ")
            type: 'string'
          },
          runOrgId: { //("执行组织// ")
            "type": 'string',
            required: true,
            "refmodel": JSON.stringify(refinfo['organization_ocm']),
            "refcfg": '{"ctx":"/uitemplate_web"}',
            "refparam": '{"EQ_orgFuncRel":"01"}'
          },
          runOrgCode: { //("执行组织code// ")
            type: 'string',
            required: true
          },
          runOrgName: { //("执行组织Name// ")
            type: 'string',
            required: true
          },
          runDeptId: { //("执行部门// ")
            type: 'string'
          },
          runDeptCode: { //("执行部门// ")
            type: 'string'
          },
          runDeptName: { //("执行部门// ")
            type: 'string'
          },
          runPersonId: { //("执行人// ")
            type: 'string'
          },
          runPersonCode: { //("执行人code// ")
            type: 'string'
          },
          runPersonName: { //("执行人Name// ")
            type: 'string'
          },
          isQualityMoney: { //("是否有质保金// ")
            type: "Integer",
            // required: true
          },
          qualityMoney: { //("质保金额// ")
            type: "amountFloat",
            regExp: /^\d+(\.{0,1}\d+){0,1}$/,
            errorMsg: '请录入非负数'
          },
          qualityEndDate: { //("质保金到期日期// ")
            type: 'Date'
          },
          thridSettlement: { //("第三方结算// ")
            type: 'String'
          },
          settlementDeal: { //("结算经销商// ")
            type: 'String'
          },
          serviceMonry: { //("服务费金额// ")
            type: "amountFloat",
            regExp: /^\d+(\.{0,1}\d+){0,1}$/,
            errorMsg: '请录入非负数'
          },
          status: { //("合同状态// ")
            type: 'String'
          },
          state: { //("审批状态// ")
            type: 'integer',
            default: "0"
          },
          vdef1: {
            type: 'string',
          },
          vdef2: {
            type: 'string',
          },
          vdef3: {
            type: 'string',
          },
          vdef4: {
            type: 'string',
          },
          vdef5: {
            type: 'string',
          },
          vdef6: {
            type: 'string',
          },
          vdef7: {
            type: 'string',
          },
          vdef8: {
            type: 'string',
          },
          vdef9: {
            type: 'string',
          },
          vdef10: {
            type: 'string',
          },
          vdef11: {
            type: 'string',
          },
          vdef12: {
            type: 'string',
          },
          vdef13: {
            type: 'string',
          },
          vdef14: {
            type: 'string',
          },
          vdef15: {
            type: 'string',
          },
        },
        pageSize: 10,
        //是否启用前端缓存
        // pageCache: true
      },
      //工程报价表体
      complexProQuoteItem: {
        meta: {
          id: {
            type: "string"
          },
          contractId: { //合同ID
            type: 'string'
          }, //id
          goodsId: {
            type: 'string' //商品id
          },
          goodsCode: {
            type: 'string' //商品编码
          },
          isOrdered:{
            type:"integer" // 是否已下单  0、未下单，1、已下单
          },
          goodsName: {
            type: 'string' //商品名称
          },
          singlePrice: {
            type: "amountFloat", //合同单价
            regExp: /^\d+(\.{0,1}\d+){0,1}$/,
            errorMsg: '请录入非负数',
            required: true
          },
          orderNum: {
            type: 'BigDecimal', //订货数量 *
            regExp: /^\d+(\.{0,1}\d+){0,1}$/,
            errorMsg: '请录入非负数',
            // required: true
          },
          mainNum: {
            type: 'BigDecimal', //主数量
            required: true
          },
          availableNum: {
            type: 'BigDecimal', //可下单数量
            // required: true
          },
          returnedNum: {
            type: 'BigDecimal', //可下单数量
            // required: true
          },
          changeRate: {
            type: 'BigDecimal', //换算率
            required: true
          },
          mainUnitId: {
            type: 'string' //销售单位
          },
          mainUnitCode: {
            type: 'string'
          },
          mainUnitName: {
            type: 'string'
          },
          orderUnitName: { //订货单位
            type: 'string'
          },
          orderUnitId: {
            type: 'string'
          },
          orderedNum: {
            type: 'string'
          }, //已下单数量
          orderUnitCode: {
            type: 'string'
          },
          contractMoney: {
            type: 'amountFloat',
            // type: "float", //合同金额
            // type: "amountFloat", //合同金额
            // required: true
          },
          projectBasePrice: {
            type: "amountFloat", //工程成本价
            regExp: /^\d+(\.{0,1}\d+){0,1}$/,
            errorMsg: '请录入非负数',
            required: true
          },
          commonSalePrice: {
            type: "amountFloat", //常规交易价
            regExp: /^\d+(\.{0,1}\d+){0,1}$/,
            errorMsg: '请录入非负数',
            required: true
          },
          thridSubPrice: {
            type: "amountFloat", //第三方结算差价
            regExp: /^\d+(\.{0,1}\d+){0,1}$/,
            errorMsg: '请录入非负数',
            // required: false
          },
          rowNum: {
            type: 'string',
            required: true
          },
          dr: {
            type: 'integer'
          },
          goodsVersion: {
            type: 'string',
            required: true
          },
          isGift: {
            type: 'integer', //是否赠品
            required: true
          },
          isClosed: {
            type: 'integer', //是否关闭
            required: true
          },
          remark: {
            type: 'string', //备注
            required: true
          },
        },
        pageSize: 10,
      },
      //收货地址
      shipAddressItem: {
        meta: {
          id: {
            type: "string"
          },
          rowNum: {
            type: 'string',
            required: true
          }, //行号
          contractId: {
            type: 'string',
            required: true
          }, //合同Id
          addressId: { //收货地址
            type: "string",
            required: true,
            refmodel: JSON.stringify(refinfo["saleorderCustomeraddress"]),
            refcfg: '{"ctx":"/uitemplate_web", "refName":"收货地址"}'
          },
          addressCode: {
            type: 'string',
            required: true
          },
          addressName: {
            type: 'string',
            required: true
          },
          isDefault: {
            type: 'integer',
            required: true
          },
        },
        pageSize: 10,
      },
      //收款执行情况
      executeDetailItem: {
        meta: {
          id: {
            type: "string"
          },
          // 编码--应收单号
          receivableCode: {
            type: "string"
          },
          beginDate: {
            type: "date"
          },
          endDate: {
            type: "date"
          },
          // 应收金额
          receivableMoney: {
            type: "amountFloat"
          },
          // 应收金额
          cancellationMoney: {
            type: "amountFloat"
          },
          // 已核销金额
          cancellationMoney: {
            type: "amountFloat"
          },
          // 待核销金额
          uncancellationMoney: {
            type: "amountFloat"
          },
        }
      },
      FileMeta: {
        meta: {
          id: {
            type: "string"
          }, //主键
          filepath: {
            type: "string"
          }, //文件名称
          filesize: {
            type: "string"
          }, //文件大小
          filename: {
            type: "string"
          }, //文件名称
          uploadtime: {
            type: "datetime"
          }, //上传时间
          groupname: {
            type: "string"
          }, //
          url: {
            type: "string"
          } //URL
        }
      },
      ItemRef: {
        meta: {
          productref: {
            type: 'string',
            // "refmodel": JSON.stringify(refinfo['goods']),
            // "refcfg": '{"ctx":"/uitemplate_web","isMultiSelectedEnabled":true}',
            // 'refparam': '{"EQ_isEnable":"1","EQ_isServiceType":"0"}'
            refmodel: JSON.stringify(refinfo["allowgoods"]),
            refcfg: '{"ctx":"/uitemplate_web","isMultiSelectedEnabled":true}',
            refparam: '{"saleModel": "01", "customerRankCode": "01"}'
          }
        }
      }
    },
    searchs: {
      search1: [{
          type: "text",
          key: "code",
          label: "合同编码",
        }, {
          key: "name",
          type: "text",
          label: "合同名称",
        }, {
          type: "refer",
          key: "contractType",
          label: "合同类型",
          refinfo: "trantype",
          clientParam: {
            "EQ_billTypeId": "SaleContract"
          }
        },
        {
          type: "refer",
          key: "saleOrg",
          label: "所属销售组织",
          refinfo: "organization_ocm",
          refName: "所属销售组织",
          clientParam: {
            EQ_orgFuncRel: "01",
            AUTH_refcod: "saleorder",
            AUTH_refdim: "saleOrg"
          }
        }, {
          type: "refer",
          key: "customer",
          label: "客户",
          refinfo: "customer",
          refName: "客户",
          clientParam: {
            EQ_isEnable: "1",
            EQ_isChannelCustomer: "1",
            AUTH_refcod: "saleorder",
            AUTH_refdim: "customer"
          }
        },
        {
          type: "refer",
          key: "runOrg",
          label: "执行组织",
          refinfo: "organization_ocm",
          refName: "执行组织",
          clientParam: {
            EQ_orgFuncRel: "01",
            AUTH_refcod: "saleorder",
            AUTH_refdim: "saleOrg"
          },
        },
        {
          type: "combo",
          key: "status",
          label: "合同状态",
          defaultValue:"0",
          dataSource: [{
            value: '0',
            name: '自由'
          }, {
            value: '1',
            name: '发布'
          }, {
            value: '2',
            name: '终止'
          }, {
            value: '3',
            name: '冻结'
          }],
          hasAll: false,
        }
      ]
    },
    buttons: {
      button1: [{
          key: "add",
          label: "新增",
          iconCls: "icon-plus",
          click: "showAddBillPanel"
        }, {
          key: "del",
          label: "删除",
          iconCls: "icon-shanchu1",
          click: "del"
        },
        {
          key: "pubNotice",
          label: "发布",
          iconCls: "icon-tubiao-duigou-xianxing",
          click: "pubNotice"
        },
        {
          key: "finishedPub",
          label: "终止",
          iconCls: "icon-tubiao-duigou-xianxing",
          click: "finishedPub"
        },
        {
          key: "canclePub",
          label: "冻结",
          iconCls: "icon-tubiao-duigou-xianxing",
          click: "freeze"
        },
        {
          key: "canclePub",
          label: "取消冻结",
          iconCls: "icon-tubiao-duigou-xianxing",
          click: "cancelFreeze"
        },
        {
          key: "contractChange",
          label: "变更",
          iconCls: "icon-tubiao-zhuanhua",
          click: "contractChangeFun"
        },
      ],
      button2: [{
          key: "cancel",
          label: "取消",
          click: "cancelContractBill"
        }, {
          key: "save",
          label: "保存",
          click: "saveContractBill",
          cls: "ui-btn-green"
        },
        {
          key: "back",
          label: "返回",
          click: "backContractBill"
        },
        /*{
         key: "save",
         label: "保存并提交",
         click: "submitBill",
         cls: "ui-btn-green"
         }*/
      ],
      button3: [{
          key: "addrow",
          label: "增行",
          iconCls: "icon-plus",
          click: "showAddItemsRef"
        }, {
          key: "delrow",
          label: "删行",
          iconCls: "icon-shanchu1",
          click: "delItems",
        },
        {
          key: "closeRow",
          label: "关闭",
          iconCls: "icon-tubiao-guanbi-xianxing",
          click: "closeItems",

        }, {
          key: "openRow",
          label: "打开",
          iconCls: "icon-tubiao-duigou-xianxing",
          click: "openItems",
        }, {
          key: "save",
          label: "保存",
          click: "saveProQuote",
          cls: "ui-btn-green",
          iconCls: "icon-tubiao-baocun"
        }
      ],
      button8: [{
          key: "addrow",
          label: "增行",
          iconCls: "icon-plus",
          click: "addAddressItem"
          // click: "showAddItemsRef"
        }, {
          key: "delrow",
          label: "删行",
          iconCls: "icon-shanchu1",
          click: "delAddressItem",
        },

        {
          key: "save",
          label: "保存",
          click: "saveAddressItems",
          cls: "ui-btn-green",
          iconCls: "icon-tubiao-baocun"
        }
      ],
      button4: [{
          key: "return",
          label: "返回",
          click: "retListPanel"
        },
        //     {
        //   key: "edit",
        //   label: "编辑",
        //   click: "detail2bill",
        //   cls: "ui-btn-green"
        // }
      ],
      button5: [{
          key: "fileview",
          label: "查看",
          iconCls: "icon-tubiao-chakan",
          click: "fileViewContract"
        },
        {
          key: "fileDownload",
          label: "下载",
          iconCls: "icon-tubiao-xiazai",
          click: "fileDownloadContract"
        }
      ],
      button6: [],
      button7: [{
          key: "onupload",
          label: "上传",
          iconCls: "icon-tubiao-shangchuan",
          click: "onOpenUploadWinContract"
        },
        {
          key: "filedel",
          label: "删除",
          iconCls: "icon-shanchu1",
          click: "fileDeleteContract"
        },
        {
          key: "fileview",
          label: "查看",
          iconCls: "icon-tubiao-chakan",
          click: "fileViewContract"
        },
        {
          key: "fileDownload",
          label: "下载",
          iconCls: "icon-tubiao-xiazai",
          click: "fileDownloadContract"
        }
      ],
      button9: [],
    },
    cards: {
      card1: [{
          type: "text",
          key: "code",
          label: "合同编码",
        }, {
          key: "name",
          type: "text",
          label: "合同名称",
        }, {
          type: "refer",
          key: "contractTypeId",
          label: "合同类型",
          refinfo: "trantype",
          clientParam: {
            "EQ_billTypeId": "SaleContract"
          }
        }, {
          key: "innerCode",
          type: "text",
          label: "内部编号",
        }, {
          type: "refer",
          key: "projectId",
          label: "项目名称",
          refinfo: "project", //项目档案
          // clientParam: {
          //     "EQ_orgFuncRel": "04"
          // },
        }, {
          type: "refer",
          key: "saleOrgId",
          label: "所属销售组织",
          refinfo: "organization_ocm",
          refName: "所属销售组织",
          clientParam: {
            EQ_orgFuncRel: "01",
            AUTH_refcod: "saleorder",
            AUTH_refdim: "saleOrg"
          }
        },
        //   {
        //   type: "refer",
        //   key: "customerId",
        //   label: "客户",
        //   refinfo: "customer",
        //   refName: "客户",
        //   clientParam: {
        //     EQ_isEnable: "1",
        //     EQ_isChannelCustomer: "1",
        //     AUTH_refcod: "saleorder",
        //     AUTH_refdim: "customer"
        //   }
        // },
        {
          type: "refer",
          key: "customerId",
          referId: "customerId",
          domid: "cardEdit_customerId",
          label: "客户",
          refinfo: "customer",
          clientParam: {
            EQ_isChannelCustomer: "1"
          },
          required: true,
          cls: "isCostFlush"
        },
        {
          type: "text",
          key: "contact",
          label: "客户联系人",
          // refinfo: "trantype",
          // refName: "交易类型"
        }, {
          type: "text",
          key: "contactType",
          label: "客户联系方式",
          maxLength: 11,
          regExp: /^1[3456789]\d{9}$/,
          errorMsg: '请输入正确的手机号'
          // refinfo: "trantype",
          // refName: "交易类型"
        }, {
          type: "refer",
          key: "financeOrgId",
          label: "结算财务组织",
          refinfo: "organization_ocm", //参照结算组织档案
          clientParam: {
            "EQ_isEnable": "1",
            "EQ_orgFuncRel": "07",
            "AUTH_refdim": "account.financeOrg"
          }
        }, {
          type: "date",
          key: "effectDate",
          label: "生效日期",
        }, {
          type: "date",
          key: "invalidDate",
          label: "失效日期",
        },
        {
          type: "combo",
          key: "businessType",
          label: "交易约束类型",

          dataSource: [{
            value: '1',
            name: '数量及单价'
          }, {
            value: '2',
            name: '仅单价'
          }],
          hasAll: false,
        }, {
          type: "text",
          key: "contractAmount",
          label: "合同总金额",
          enable: false
        }, {
          type: "refer",
          key: "saleDeptId",
          label: "销售部门",
          refinfo: "department",
          refName: "销售部门",
          clientParam: {
            AUTH_refcod: "saleorder",
            AUTH_refdim: "salesDept"
          }
        }, {
          type: "refer",
          key: "customerManagerId",
          label: "客户经理",
          refinfo: "accountManager",
          refName: "客户经理",
          clientParam: {
            AUTH_refcod: "saleorder",
            AUTH_refdim: "salesManager"
          }
        },
        {
          type: "refer",
          key: "runOrgId",
          label: "执行组织",
          refinfo: "organization_ocm",
          refName: "执行组织",
          clientParam: {
            EQ_orgFuncRel: "01",
            AUTH_refcod: "saleorder",
            AUTH_refdim: "saleOrg"
          },
        }, {
          type: "refer",
          key: "runDeptId",
          label: "执行部门",
          refinfo: "department",
          refName: "执行部门",
          clientParam: {
            AUTH_refcod: "saleorder",
            AUTH_refdim: "salesDept"
          }
        }, {
          type: "refer",
          key: "runPersonId",
          label: "执行人",
          refinfo: "accountManager",
          refName: "执行人",
          clientParam: {
            AUTH_refcod: "saleorder",
            AUTH_refdim: "salesManager"
          }
        }, {
          type: "combo",
          key: "isQualityMoney",
          label: "是否有质保金",
          dataSource: [{
            value: '0',
            name: '否'
          }, {
            value: '1',
            name: '是'
          }],
          hasAll: false,
        }, {
          type: "text",
          key: "qualityMoney",
          referId: "qualityMoney",
          domid: "cardEdit_qualityMoney",
          label: "质保金金额",
        }, {
          type: "date",
          key: "qualityEndDate",
          label: "质保金到期日期",
        }, {
          type: "combo",
          key: "thridSettlement",
          label: "第三方结算",
          dataSource: [
            //     {
            //     value: '0',
            //     name: '不包含'
            // },
            {
              value: '1',
              name: '差价结算'
            }, {
              value: '2',
              name: '服务结算'
            }
          ],
          hasAll: false,
        }, {
          type: "refer",
          key: "settlementDealId",
          referId: "settlementDealId",
          domid: "cardEdit_settlementDealId",
          label: "结算经销商",
          refinfo: "customers", //参照客户档案中的直接客户；
          // clientParam: {
          //     "EQ_orgFuncRel": "04"
          // },
        }, {
          type: "text",
          key: "serviceMonry",
          referId: "serviceMonry",
          domid: "cardEdit_serviceMonry",
          label: "服务费金额",
        }, {
          type: "combo",
          key: "status",
          label: "合同状态",
          defaultvalue: "0",
          enable: false,
          dataSource: [{
            value: '0',
            name: '自由'
          }, {
            value: '1',
            name: '发布'
          }, {
            value: '2',
            name: '终止'
          }, {
            value: '3',
            name: '冻结'
          }],
          hasAll: false,
        }, {
          type: "text",
          key: "vdef1",
          label: "自定义项1",
          cls: 'vdef1 visibleFalse',
        },
        {
          type: "text",
          key: "vdef2",
          label: "自定义项2",
          cls: 'vdef2 visibleFalse',
        },
        {
          type: "text",
          key: "vdef3",
          label: "自定义项3",
          cls: 'vdef3 visibleFalse',
        },
        {
          type: "text",
          key: "vdef4",
          label: "自定义项4",
          cls: 'vdef4 visibleFalse',
        },
        {
          type: "text",
          key: "vdef5",
          label: "自定义项5",
          cls: 'vdef5 visibleFalse',
        },
        {
          type: "text",
          key: "vdef6",
          label: "自定义项6",
          cls: 'vdef6 visibleFalse',
        }, {
          type: "text",
          key: "vdef7",
          label: "自定义项7",
          cls: 'vdef7 visibleFalse',
        },
        {
          type: "text",
          key: "vdef8",
          label: "自定义项8",
          cls: 'vdef8 visibleFalse',
        },
        {
          type: "text",
          key: "vdef9",
          label: "自定义项9",
          cls: 'vdef9 visibleFalse',
        }, {
          type: "text",
          key: "vdef10",
          label: "自定义项10",
          cls: 'vdef10 visibleFalse',
        }, {
          type: "text",
          key: "vdef11",
          label: "自定义项11",
          cls: 'vdef11 visibleFalse',
        }, {
          type: "text",
          key: "vdef12",
          label: "自定义项12",
          cls: 'vdef12 visibleFalse',
        }, {
          type: "text",
          key: "vdef13",
          label: "自定义项13",
          cls: 'vdef13 visibleFalse',
        }, {
          type: "text",
          key: "vdef14",
          label: "自定义项14",
          cls: 'vdef14 visibleFalse',
        }, {
          type: "text",
          key: "vdef15",
          label: "自定义项15",
          cls: 'vdef15 visibleFalse',
        }
      ],
      card2: [
        {
            type: "text",
            key: "code",
            enable:false,
            label: "合同编码",
        }, {
            key: "name",
            type: "text",
            label: "合同名称",
            enable:false
        }, {
            type: "text",
            key: "contractTypeName",
            label: "合同类型",
            enable:false,
        }, {
            key: "innerCode",
            type: "text",
            label: "内部编号",
            enable:false,
        }, {
            type: "text",
            key: "projectName",
            label: "项目名称",
            enable:false,
        }, {
            type: "text",
            key: "saleOrgName",
            label: "所属销售组织",
            enable:false
        },
        {
            type: "text",
            key: "customerName",
            label: "客户",
            enable:false,
        },
        {
            type: "text",
            key: "contact",
            label: "客户联系人",
            // refinfo: "trantype",
            // refName: "交易类型"
        }, {
            type: "text",
            key: "contactType",
            label: "客户联系方式",
            maxLength:11,
            regExp: /^1[3456789]\d{9}$/,
            errorMsg: '请输入正确的手机号'
        }, {
            type: "refer",
            key: "financeOrgName",
            label: "结算财务组织",
            enable:false,
        }, {
            type: "date",
            key: "effectDate",
            enable:false,
            label: "生效日期",
        }, {
            type: "date",
            key: "invalidDate",
            label: "失效日期",
        },
        {
            type: "combo",
            key: "businessType",
            enable:false,
            label: "交易约束类型",
            dataSource: [{
                value: '1',
                name: '数量及单价'
            }, {
                value: '2',
                name: '仅单价'
            }],
            hasAll: false,
        }, {
            type: "text",
            key: "contractAmount",
            label: "合同总金额",
            enable: false
        }, {
            type: "text",
            key: "saleDeptName",
            label: "销售部门",
            enable:false,
        }, {
            type: "text",
            key: "customerManagerName",
            label: "客户经理",
            enable:false,
        },
        {
            type: "text",
            key: "runOrgName",
            label: "执行组织",
            enable:false
        }, {
            type: "text",
            key: "runDeptName",
            label: "执行部门",
            enable:false
        }, {
            type: "text",
            key: "runPersonName",
            label: "执行人",
            enable:false
        }, {
            type: "combo",
            key: "isQualityMoney",
            label: "是否有质保金",
            enable:false,
            dataSource: [{
                value: '0',
                name: '否'
            }, {
                value: '1',
                name: '是'
            }],
            hasAll: false,
        }, {
            type: "text",
            key: "qualityMoney",
            referId: "qualityMoney",
            label: "质保金金额",
            enable:false,
        }, {
            type: "date",
            key: "qualityEndDate",
            label: "质保金到期日期",
            enable:false,
        }, {
            type: "combo",
            key: "thridSettlement",
            label: "第三方结算",
            enable:false,
            dataSource: [
                //     {
                //     value: '0',
                //     name: '不包含'
                // },
                {
                    value: '1',
                    name: '差价结算'
                }, {
                    value: '2',
                    name: '服务结算'
                }
            ],
            hasAll: false,
        }, {
            type: "refer",
            key: "settlementDealName",
            label: "结算经销商",
            enable:false
        }, {
            type: "text",
            key: "serviceMonry",
            label: "服务费金额",
            enable:false,
        }, {
            type: "combo",
            key: "status",
            label: "合同状态",
            defaultvalue:"0",
            enable: false,
            dataSource: [{
                value: '0',
                name: '自由'
            }, {
                value: '1',
                name: '发布'
            }, {
                value: '2',
                name: '终止'
            }, {
                value: '3',
                name: '冻结'
            }],
            hasAll: false,
        }, {
            type: "text",
            key: "vdef1",
            label: "自定义项1",
            cls: 'vdef1 visibleFalse',
        },
        {
            type: "text",
            key: "vdef2",
            label: "自定义项2",
            cls: 'vdef2 visibleFalse',
        },
        {
            type: "text",
            key: "vdef3",
            label: "自定义项3",
            cls: 'vdef3 visibleFalse',
        },
        {
            type: "text",
            key: "vdef4",
            label: "自定义项4",
            cls: 'vdef4 visibleFalse',
        },
        {
            type: "text",
            key: "vdef5",
            label: "自定义项5",
            cls: 'vdef5 visibleFalse',
        },
        {
            type: "text",
            key: "vdef6",
            label: "自定义项6",
            cls: 'vdef6 visibleFalse',
        }, {
            type: "text",
            key: "vdef7",
            label: "自定义项7",
            cls: 'vdef7 visibleFalse',
        },
        {
            type: "text",
            key: "vdef8",
            label: "自定义项8",
            cls: 'vdef8 visibleFalse',
        },
        {
            type: "text",
            key: "vdef9",
            label: "自定义项9",
            cls: 'vdef9 visibleFalse',
        }, {
            type: "text",
            key: "vdef10",
            label: "自定义项10",
            cls: 'vdef10 visibleFalse',
        }, {
            type: "text",
            key: "vdef11",
            label: "自定义项11",
            cls: 'vdef11 visibleFalse',
        }, {
            type: "text",
            key: "vdef12",
            label: "自定义项12",
            cls: 'vdef12 visibleFalse',
        }, {
            type: "text",
            key: "vdef13",
            label: "自定义项13",
            cls: 'vdef13 visibleFalse',
        }, {
            type: "text",
            key: "vdef14",
            label: "自定义项14",
            cls: 'vdef14 visibleFalse',
        }, {
            type: "text",
            key: "vdef15",
            label: "自定义项15",
            cls: 'vdef15 visibleFalse',
        }
    ]
},
    dialogs: {
      dialog1: [{
        type: "refer",
        key: "countryId",
        label: "国家",
        refinfo: "country",
        refName: "国家",
        keyfordisplay: "countryName",
        compid: "countryIdBase",
        required: true,
      }, {
        type: "refer",
        key: "provinceId",
        keyfordisplay: "provinceName",
        label: "所在省份",
        refinfo: "region",
        domid: "provinceIdinfo",
        compid: "provinceIdBase",
        enable: true,
        required: true,
        clientParam: {
          "EQ_areaLevel": "2"
        },
      }, {
        type: "refer",
        key: "cityId",
        keyfordisplay: "cityName",
        label: "所在城市",
        domid: "cityIdinfo",
        compid: "cityIdBase",
        enable: false,
        refinfo: "region",
        clientParam: {
          "EQ_areaLevel": "3"
        },
        required: true,
      }, {
        type: "refer",
        key: "districtId",
        keyfordisplay: "districtName",
        label: "所在区/县",
        domid: "countyIdinfo",
        compid: "districtIdBase",
        enable: false,
        refinfo: "region",
        clientParam: {
          "EQ_areaLevel": "4",
        },
      }, {
        type: "refer",
        keyfordisplay: "townName",
        key: "townId",
        label: "所在街道",
        domid: "townIdinfo",
        compid: "townIdBase",
        enable: false,
        refinfo: "region",
        clientParam: {
          "EQ_areaLevel": "5"
        },
        required: true,
      }, {
        type: "text",
        key: "receiveAddress",
        label: "详细地址",
        required: true,
        // disableInEdit: true
      }, {
        type: "text",
        key: "detailAddr",
        label: "收货地址",
        enable: false,
        width: "400px"
      }]
    },
    details: {
      detail1: [{
          key: "code",
          label: "合同编码",
        }, {
          key: "name",
          label: "合同名称",
        }, {
          key: "contractTypeName",
          label: "合同类型",
        }, {
          key: "innerCode",
          label: "内部编号",
        }, {
          key: "projectName",
          label: "项目名称",
        }, {
          key: "customerName",
          label: "客户",
        }, {
          key: "saleOrgName",
          label: "所属销售组织",
        }, {
          key: "contact",
          label: "客户联系人",
        }, {
          key: "contactType",
          label: "客户联系方式",
        }, {
          key: "financeOrgName",
          label: "结算财务组织",
        }, {
          key: "effectDate",
          label: "生效日期",
        }, {
          key: "invalidDate",
          label: "失效日期",
        }, {
          key: "businessType",
          label: "交易约束类型",
          computed: "businessType",
        }, {
          key: "contractAmount",
          label: "合同总金额",
        }, {
          key: "saleDeptName",
          label: "销售部门",
        }, {
          key: "customerManagerName",
          label: "客户经理",
        }, {
          key: "runOrgName",
          label: "执行组织",
        }, {
          key: "runDeptName",
          label: "执行部门",
        }, {
          key: "runPersonName",
          label: "执行人",
        }, {
          key: "isQualityMoney",
          label: "是否有质保金",
          computed: "isQualityMoney",
        }, {
          key: "qualityMoney",
          label: "质保金金额",
        }, {
          key: "qualityEndDate",
          label: "质保金到期日期",
        }, {
          key: "thridSettlement",
          label: "第三方结算",
          computed: "thridSettlement",
        }, {
          key: "settlementDealName",
          label: "结算经销商",
        }, {
          key: "serviceMonry",
          label: "服务费金额",
        }, {
          key: "status",
          label: "合同状态",
          computed: "contractStatus",
        },
        {
          key: "vdef1",
          label: "自定义项1",
          cls: 'vdef1 visibleFalse',
        },
        {
          key: "vdef2",
          label: "自定义项2",
          cls: 'vdef2 visibleFalse',
        },
        {
          key: "vdef3",
          label: "自定义项3",
          cls: 'vdef3 visibleFalse',
        },
        {
          key: "vdef4",
          label: "自定义项4",
          cls: 'vdef4 visibleFalse',
        },
        {
          key: "vdef5",
          label: "自定义项5",
          cls: 'vdef5 visibleFalse',
        },
        {
          key: "vdef6",
          label: "自定义项6",
          cls: 'vdef6 visibleFalse',
        }, {
          key: "vdef7",
          label: "自定义项7",
          cls: 'vdef7 visibleFalse',
        },
        {
          key: "vdef8",
          label: "自定义项8",
          cls: 'vdef8 visibleFalse',
        },
        {
          key: "vdef9",
          label: "自定义项9",
          cls: 'vdef9 visibleFalse',
        }, {
          key: "vdef10",
          label: "自定义项10",
          cls: 'vdef10 visibleFalse',
        }, {
          key: "vdef11",
          label: "自定义项11",
          cls: 'vdef11 visibleFalse',
        }, {
          key: "vdef12",
          label: "自定义项12",
          cls: 'vdef12 visibleFalse',
        }, {
          key: "vdef13",
          label: "自定义项13",
          cls: 'vdef13 visibleFalse',
        }, {
          key: "vdef14",
          label: "自定义项14",
          cls: 'vdef14 visibleFalse',
        }, {
          key: "vdef15",
          label: "自定义项15",
          cls: 'vdef15 visibleFalse',
        }
      ],
      detail2: [{
          key: "code",
          label: "合同编码",
        }, {
          key: "name",
          label: "合同名称",
        }, {
          key: "contractTypeName",
          label: "合同类型",
        }, {
          key: "innerCode",
          label: "内部编号",
        }, {
          key: "projectName",
          label: "项目名称",
        }, {
          key: "customerName",
          label: "客户",
        }, {
          key: "saleOrgName",
          label: "所属销售组织",
        }, {
          key: "contact",
          label: "客户联系人",
        }, {
          key: "contactType",
          label: "客户联系方式",
        }, {
          key: "financeOrgName",
          label: "结算财务组织",
        }, {
          key: "effectDate",
          label: "生效日期",
        }, {
          key: "invalidDate",
          label: "失效日期",
        }, {
          key: "businessType",
          label: "交易约束类型",
          computed: "businessType",
        }, {
          key: "contractAmount",
          label: "合同总金额",
        }, {
          key: "saleDeptName",
          label: "销售部门",
        }, {
          key: "customerManagerName",
          label: "客户经理",
        }, {
          key: "runOrgName",
          label: "执行组织",
        }, {
          key: "runDeptName",
          label: "执行部门",
        }, {
          key: "runPersonName",
          label: "执行人",
        }, {
          key: "isQualityMoney",
          label: "是否有质保金",
          computed: "isQualityMoney",
        }, {
          key: "qualityMoney",
          label: "质保金金额",
        }, {
          key: "qualityEndDate",
          label: "质保金到期日期",
        }, {
          key: "thridSettlement",
          label: "第三方结算",
          computed: "thridSettlement",
        }, {
          key: "settlementDealName",
          label: "结算经销商",
        }, {
          key: "serviceMonry",
          label: "服务费金额",
        }, {
          key: "status",
          label: "合同状态",
          computed: "contractStatus",
        },
        {
          key: "vdef1",
          label: "自定义项1",
          cls: 'vdef1 visibleFalse',
        },
        {
          key: "vdef2",
          label: "自定义项2",
          cls: 'vdef2 visibleFalse',
        },
        {
          key: "vdef3",
          label: "自定义项3",
          cls: 'vdef3 visibleFalse',
        },
        {
          key: "vdef4",
          label: "自定义项4",
          cls: 'vdef4 visibleFalse',
        },
        {
          key: "vdef5",
          label: "自定义项5",
          cls: 'vdef5 visibleFalse',
        },
        {
          key: "vdef6",
          label: "自定义项6",
          cls: 'vdef6 visibleFalse',
        }, {
          key: "vdef7",
          label: "自定义项7",
          cls: 'vdef7 visibleFalse',
        },
        {
          key: "vdef8",
          label: "自定义项8",
          cls: 'vdef8 visibleFalse',
        },
        {
          key: "vdef9",
          label: "自定义项9",
          cls: 'vdef9 visibleFalse',
        }, {
          key: "vdef10",
          label: "自定义项10",
          cls: 'vdef10 visibleFalse',
        }, {
          key: "vdef11",
          label: "自定义项11",
          cls: 'vdef11 visibleFalse',
        }, {
          key: "vdef12",
          label: "自定义项12",
          cls: 'vdef12 visibleFalse',
        }, {
          key: "vdef13",
          label: "自定义项13",
          cls: 'vdef13 visibleFalse',
        }, {
          key: "vdef14",
          label: "自定义项14",
          cls: 'vdef14 visibleFalse',
        }, {
          key: "vdef15",
          label: "自定义项15",
          cls: 'vdef15 visibleFalse',
        }
      ]
    },
    grids: {
      grid1: {
        domid: "grid_complex",
        umeta: {
          "id": "grid_complex",
          "data": "contractlist",
          "type": "grid",
          "editable": false,
          "multiSelect": true,
          "showNumCol": true
        },
        columns: [{
            "field": "code",
            "dataType": "String",
            "title": "合同编码",
            "renderType": "detailRender"
          }, {
            "field": "name",
            "dataType": "String",
            "title": "合同名称",
          }, {
            "field": "contractTypeName",
            "dataType": "String",
            "title": "合同类型",
          },
          //   {
          //   "field": "innerCode",
          //   "dataType": "String",
          //   "title": "内部编号",
          // }, {
          //   "field": "projectName",
          //   "dataType": "String",
          //   "title": "项目名称",
          // },
          {
            "field": "saleOrgName",
            "dataType": "String",
            "title": "所属销售组织"
          }, {
            "field": "customerName",
            "dataType": "String",
            "title": "客户"
          },
          //   {
          //   "field": "contact",
          //   "dataType": "String",
          //   "title": "客户联系人",
          // }, {
          //   "field": "contactType",
          //   "dataType": "string",
          //   "title": "客户联系方式",
          //   // "renderType": "statusRender",
          // },
          {
            "field": "financeOrgName",
            "dataType": "String",
            "title": "结算财务组织",
          }, {
            "field": "effectDate",
            "dataType": "Date",
            "title": "生效日期",
          },
          // {
          //   "field": "purchaseTypeName",
          //   "dataType": "String",
          //   "title": "采购类型",
          //   "visible":false
          // },
          {
            "field": "invalidDate",
            "dataType": "Date",
            "title": "失效日期",
            // "visible": false
          },

          // {
          //   "field": "totalGoodsNum",
          //   "dataType": "float",
          //   "title": "总数量",
          // },

          // {
          //   "field": "businessType",
          //   "dataType": "String",
          //   "title": "交易约束类型",
          //   "renderType": "businessTypeRender"
          //   // "visible": false
          // },
          //   {
          //   "field": "contractAmount",
          //   "dataType": "string",
          //   "title": "合同总金额",
          //    "visible": true
          // },
          // {
          //   "field": "saleDeptName",
          //   "dataType": "String",
          //   "title": "销售部门"
          // },
          // {
          //   "field": "customerManagerName",
          //   "dataType": "String",
          //   "title": "客户经理",
          //   "visible": false
          // },
          {
            "field": "runOrgName",
            "dataType": "Date",
            "title": "执行组织",
            // "visible": false
          },
          // {
          //   "field": "runDeptName",
          //   "dataType": "String",
          //   "title": "执行部门",
          //   // "visible": false
          // }, {
          //   "field": "runPersonName",
          //   "dataType": "String",
          //   "title": "执行人",
          //   // "visible": false
          // }, {
          //   "field": "isQualityMoney",
          //   "dataType": "String",
          //   "title": "是否有质保金",
          //   "renderType": "isQualityMoneyRender",
          //   // "visible": false
          // }, {
          //   "field": "qualityMoney",
          //   "dataType": "String",
          //   "title": "质保金额",
          //   // "renderType": "whetherRender",
          //   // "visible": false
          // }, {
          //   "field": "qualityEndDate",
          //   "dataType": "date",
          //   "title": "质保金到期日期",
          //   // "renderType": "whetherRender",
          //   // "visible": false
          // }, {
          //   "field": "thridSettlement",
          //   "dataType": "String",
          //   "title": "第三方结算",
          //   "renderType": "thridSettlementFormat",
          //   // "renderType": "thridSettlementFormat",
          //   // "visible": false
          // }, {
          //   "field": "settlementDealName",
          //   "dataType": "String",
          //   "title": "结算经销商",
          //   // "renderType": "whetherRender",
          //   // "visible": false
          // }, {
          //   "field": "serviceMonry",
          //   "dataType": "String",
          //   "title": "服务费金额",
          //   // "renderType": "whetherRender",
          //   // "visible": false
          // },
          {
            "field": "status",
            "dataType": "String",
            "title": "合同状态",
            "renderType": "contracStateFormat",
            // "visible": false
          }, {
            "field": "operationCode",
            "dataType": "String",
            "title": "操作",
            "renderType": "operation",
            "fixed": true,
            "width": "100px"
          },
        ]
      },
      //工程报价
      grid2: {
        // domid: "grid_complexItem",
        domid: "grid_complexProQuoteItem",
        umeta: {
          "id": "grid_complexProQuoteItem",
          "data": "proQuoteItems",
          "type": "grid",
          "editable": true,
          "multiSelect": true,
          "showNumCol": true,
          "onBeforeEditFun": "beforeEditCheck"
        },
        columns: [
          // {
          //     "field": "rowNum",
          //     "dataType": "String",
          //     "title": "行号",
          // },
          {
            "field": "goodsName",
            "dataType": "String",
            "title": "商品名称",
            "editable": false
          }, {
            "field": "goodsCode",
            "dataType": "String",
            "title": "商品编码",
            "editable": false
          },
          {
            "field": "singlePrice",
            "dataType": "amountFloat",
            "title": "合同单价",
            // "editType": "float",
            "required": true,
          },
          {
            "field": "orderNum",
            "dataType": "float",
            "title": "订货数量",
            "editType": "float",
            // "required": true,
          },
          {
            "field": "mainNum",
            "dataType": "float",
            "title": "主数量",
            "editable": false,
          },
          {
            // "field": "orderUnitName",
            "field": "orderUnitName",
            "dataType": "String",
            "title": "订货单位",
            "editable": false
          },
          {
            // "field": "orderUnitId",
            "field": "mainUnitName",
            "dataType": "String",
            "title": "销售单位",
            "editable": false
          },
          {
            "field": "changeRate",
            "dataType": "String",
            "title": "换算率",
            "editType": "float",
            "editable": false
          },
          {
            "field": "contractMoney",
            "dataType": "amountFloat",
            "title": "合同金额",
            "editable": false,
          }, {
            "field": "projectBasePrice",
            "dataType": "float",
            "title": "工程成本价",
            "editType": "float",
            // "required": true,
          }, {
            "field": "commonSalePrice",
            "dataType": "float",
            "title": "常规交易价",
            "editType": "float",
            // "required": true,
          }, {
            "field": "thridSubPrice",
            "dataType": "float",
            "title": "第三方结算差价",
            "editType": "float",
            "visible": false,
            // "required": true,
          },
          {
            "field": "isGift",
            "dataType": "checkbox",
            "editable": true,
            "title": "赠品",
            "renderType": "booleanRender",
          },
          {
            "field": "isClosed",
            "dataType": "checkbox",
            "title": "关闭",
            "width": "130px",
            "renderType": "disableBooleanRender",
            // "renderType": "booleanRender",
            "editable": false
          },
          // {
          //   "field": "remark",
          //   "dataType": "String",
          //   "title": "商品编号",
          //   "editable": true
          // },
        ]
      },
      grid3: {
        domid: "grid_complexItem_detail",
        umeta: {
          "id": "grid_complexItem_detail",
          "data": "shipAddressItem",
          "type": "grid",
          "editable": true,
          "multiSelect": true,
          "showNumCol": true
        },
        columns: [{
            field: "addressId",
            title: "收货地址",
            dataType: "String",
            required: true,
            referId: "receiveAddress",
            renderType: "ncReferRender",
            editType: "ncReferEditType",
            showField: "addressName",
            editOptions: {
              validType: "string",
              rel: {
                "refpk": "addressId",
                "detailAddr": "addressName"
              }
            },
          },
          {
            "field": "isDefault",
            "dataType": "checkbox",
            "editable": true,
            "title": "是否默认",
            "renderType": "booleanRender",
          },
        ]
      },
      grid4: {
        domid: "grid_CustAttachmentList_dom_detail",
        umeta: {
          id: "grid_CustAttachmentList_detail",
          data: "FileList",
          type: "grid",
          editable: true,
          multiSelect: true,
          showNumCol: true
        },
        columns: [{
            field: "filename",
            dataType: "String",
            title: "名称"
          },
          {
            field: "filesize",
            dataType: "String",
            title: "大小",
            editable: false
          },
          {
            field: "uploadtime",
            dataType: "String",
            title: "上传时间",
            editable: false
          }
        ]
      },
      grid5: {
        domid: "grid_complexBomItem",
        umeta: {
          "id": "grid_complexBomItem",
          "data": "proQuoteItems",
          "type": "grid",
          "editable": false,
          "showNumCol": true,
        },
        columns: [{
            "field": "goodsName",
            "dataType": "String",
            "title": "商品名称",
            "editable": false
          }, {
            "field": "goodsCode",
            "dataType": "String",
            "title": "商品编码",
            "editable": false
          },
          {
            "field": "singlePrice",
            "dataType": "float",
            "title": "合同单价",
            // "editType": "float",
          }, {
            "field": "orderNum",
            "dataType": "float",
            "title": "合同数量",
            "editType": "float",
            // "required": true,
          }, {
            // "field": "orderUnitName",
            "field": "orderUnitName",
            "dataType": "String",
            "title": "订货单位",
            "editable": false
          },
          {
            // "field": "orderUnitId",
            "field": "mainUnitName",
            "dataType": "String",
            "title": "销售单位",
            "editable": false
          },
          {
            "field": "changeRate",
            "dataType": "String",
            "title": "换算率",
            "editType": "float",
            "editable": false
          },
          {
            "field": "contractMoney",
            "dataType": "float",
            "title": "合同金额",
            "editType": "float",
            "editable": false,
          }, {
            "field": "projectBasePrice",
            "dataType": "float",
            "title": "工程成本价",
            "editType": "float",
          }, {
            "field": "commonSalePrice",
            "dataType": "float",
            "title": "常规交易价",
            "editType": "float",
          }, {
            "field": "thridSubPrice",
            "dataType": "float",
            "title": "第三方结算差价",
            "editType": "float",
          },
          {
            "field": "isGift",
            "dataType": "string",
            "editable": false,
            "title": "赠品",
            "renderType": "enableStatusRender",
            // "renderType": "disableBooleanRender",
          },
          {
            "field": "isClosed",
            "dataType": "string",
            "title": "关闭",
            "width": "130px",
            "renderType": "enableStatusRender",
            "editable": false
          },
          // {
          //   "field": "remark",
          //   "dataType": "String",
          //   "title": "商品编号",
          //   "editable": true
          // },
        ]
      },
      grid6: {
        domid: "grid_complexBomItem_detail",
        umeta: {
          "id": "grid_complexBomItem_detail",
          "data": "shipAddressItem",
          "type": "grid",
          "editable": false,
          "showNumCol": true
        },
        columns: [{
            // type: "refer",
            field: "addressId",
            title: "收货地址",
            dataType: "String",
            referId: "receiveAddress",
            renderType: "ncReferRender",
            editType: "ncReferEditType",
            showField: "addressName",
            editOptions: {
              validType: "string",
              rel: {
                "refpk": "addressId",
                "detailAddr": "addressName"
              }
            },
          },
          // {
          //     "field": "addressId",
          //     "dataType": "String",
          //     "title": "收货地址",
          //     "renderType": "ncReferRender",
          //     "editType": "ncReferEditType",
          //     "showField": "receiveStorageOrgName",
          //     "editOptions": {
          //         "validType": "string"
          //     },
          //     "editable": true,
          //     // "visible": false
          // },
          {
            "field": "isDefault",
            "dataType": "checkbox",
            "editable": true,
            "title": "是否默认",
            "renderType": "booleanRender",
          },
        ]
      },
      grid7: {
        domid: "grid_CustAttachmentList_dom_details",
        umeta: {
          id: "grid_CustAttachmentList_details",
          data: "FileList",
          type: "grid",
          editable: true,
          multiSelect: true,
          showNumCol: true
        },
        columns: [{
            field: "filename",
            dataType: "String",
            title: "名称"
          },
          {
            field: "filesize",
            dataType: "String",
            title: "大小",
            editable: false
          },
          {
            field: "uploadtime",
            dataType: "String",
            title: "上传时间",
            editable: false
          }
        ]
      },
      // 供货执行情况
      grid8: {
        domid: "grid_executeSupplyDetailItem_details",
        umeta: {
          id: "grid_executeSupplyDetailItem_details",
          data: "proQuoteItems",
          type: "grid",
          editable: false,
          multiSelect: false,
          showNumCol: true
        },
        columns: [{
          field: "goodsName",
          dataType: "String",
          title: "商品"
        }, {
          field: "goodsCode",
          dataType: "String",
          title: "商品编码"
        }, {
          field: "mainNum",
          dataType: "String",
          title: "数量"
        }, {
          field: "orderedNum",
          dataType: "String",
          title: "已下单数量"
        }, {
          field: "returnedNum",
          dataType: "String",
          title: "退货数量"
        }, {
          field: "availableNum",
          dataType: "String",
          title: "可下单数量"
        }, ]
      },
      // 收款执行情况
      grid9: {
        domid: "grid_executeGathDetailItem_details",
        umeta: {
          id: "grid_executeDetailItem_details",
          data: "executeDetailItem",
          type: "grid",
          editable: false,
          multiSelect: false,
          showNumCol: true
        },
        columns: [{
            field: "receivableCode",
            dataType: "String",
            title: "应收单编码"
          },
          {
            field: "beginDate",
            dataType: "String",
            title: "起算日期"
          }, {
            field: "endDate",
            dataType: "String",
            title: "到期日期"
          }, {
            field: "receivableMoney",
            dataType: "String",
            title: "应收金额"
          }, {
            field: "cancellationMoney",
            dataType: "String",
            title: "已核销金额"
          }, {
            field: "uncancellationMoney",
            dataType: "String",
            title: "待核销金额"
          }
        ]
      },
    }
  }
  return new basemodel(model)
})