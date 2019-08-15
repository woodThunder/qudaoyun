function getConfig() {
    return {
        customer_cast: {
            meta: {
                marketAreaId: {
                    type: 'string',
                    // required: true,
                    refmodel: JSON.stringify(refinfo['marketArea']),
                    refcfg: '{"ctx":"/uitemplate_web","refName":"市场区域"}'
                },
                marketAreaName: {
                    type: 'string'
                },
                marketAreaCode: {
                    type: 'string'
                },
                customerId: {
                    required: false
                }
            }
        },
        card1: [
            {
                type: "refer",
                key: "marketAreaId",
                keyfordisplay: "marketAreaName",
                label: "市场区域",
                referId: "marketAreaId",
                compid: "marketAreaCode",
                refinfo: "market",
                required: true,
                clientParam: {
                    "EQ_isEnable": "1"
                }
            }
        ],
        grid1: {
            columns: [{
                field: "marketAreaName",
                dataType: "String",
                title: "市场区域",
                sort: "5"
            }]
        },
        search1: [
            {
                type: "refer",
                key: "marketArea",
                keyfordisplay: "marketAreaName",
                label: "市场区域",
                referId: "marketAreaIdSearch",
                compid: "marketAreaCode",
                refinfo: "market",
                clientParam: {
                    "EQ_isEnable": "1"
                }
            }
        ]
    }
}
function getBaseData(model) {
    return {
        billStateSrc: [{
            value: '0',
            name: '保存'
        }, {
            value: '1',
            name: '已提交'
        }, {
            value: '2',
            name: '审批中'
        }, {
            value: '3',
            name: '审批通过'
        }, {
            value: '4',
            name: '审批不通过'
        }, {
            value: '9',
            name: '关闭'
        }]
    }
  }
  
function afterCreate() {
    return function (viewModel) {
        viewModel.complexList.on("marketAreaId.valuechange", function (obj) {
            if (obj.newValue) {//市场区域值不为空
                viewModel.complexList.setMeta("customerId", "enable", false);
            } else {
                viewModel.complexList.setMeta("customerId", "enable", true);
            }
        });
        viewModel.complexList.on("customerId.valuechange", function (obj) {
            if (obj.newValue) {//客户值不为空
                viewModel.complexList.setMeta("marketAreaId", "enable", true);
            } else {
                viewModel.complexList.setMeta("marketAreaId", "enable", false);
            }
        });
    }
}