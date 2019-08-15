function getConfig(){
    return {
        moqRuleControlmeta: {
            meta: {
                linkCustomersId: {
                    required: false
                }, //适用客户
            }
        },
        allRulemeta:{
            meta:{
                unitAmount:{
                    type: "float"
                }
            }
        },
        dialog1:[
            {
                type: "combo",
                key: "limitType",
                label: "整单限制类型",
                required: true,
                dataSource: [
                  { value: "1", name: "数量" },
                  { value: "2", name: "重量" },
                  { value: "3", name: "体积" },
                  { value: "4", name: "金额" }  
                ]
            },
        ],
        grid2:{
            columns: [
                {
                    field: "unitAmount",
                    dataType: "float",
                    title: "整单金额",
                    editType: "float",
                    sort:"6"
                }
            ]
        }
    }
}
function getEvents(viewModel){
    return {
        //优先维度
        limitTypeRender: function(obj) {
            var stateValue = viewModel.simpleList
            .getRow(obj.rowIndex)
            .getValue("limitType");
            var stateName;
            if (stateValue == 1) {
                stateName = "数量";
            }
            if (stateValue == 2) {
                stateName = "重量";
            }
            if (stateValue == 3) {
                stateName = "体积";
            }
            if (stateValue == 4) {
                stateName = "金额";
            }
            obj.element.innerHTML = stateName;
        },
        //将操作后的数据进行保存
        //修改适用客户不是必填项，如果不选适用客户则默认全选
        edit: function() {
            var result = viewModel.dialogcardcomp.validate();
            if (result.passed) {
                var index = viewModel.index;
                var currentRow,
                    type = "post";
                var postdata = viewModel.dialogcardcomp.geteidtData();
                var linkOrgs = [];
                var linkOrgsIds = postdata.linkOrgsId.split(",");
                if (linkOrgsIds && linkOrgsIds.length > 0) {
                    for (var i = 0; i < linkOrgsIds.length; i++) {
                        linkOrgs.push({ stockOrgId: linkOrgsIds[i] });
                    }
                }
                postdata.linkOrgs = linkOrgs;
                var linkCustomers = [];
                if(postdata.linkCustomersId){//适用客户选择
                    var linkCustomersIds = postdata.linkCustomersId.split(",");
                    if (linkCustomersIds && linkCustomersIds.length > 0) {
                        for (var i = 0; i < linkCustomersIds.length; i++) {
                            linkCustomers.push({ customerId: linkCustomersIds[i] });
                        }
                    }
                }else{//适用客户未选择，则默认是所有客户

                }
                postdata.linkCustomers = linkCustomers;
                if (index >= 0) {
                    type = "put";
                }
                //更改后台数据
                $._ajax({
                    url: appCtx + viewModel.baseurl,
                    type: type,
                    data: JSON.stringify(postdata),
                    contentType: "application/json; charset=utf-8",
                    success: function(data) {
                        //如果index大于等于0说明是修改
                        viewModel.dialogcardcomp.close();
                        viewModel.search();
                    }
                });
            }
        }
    }
}