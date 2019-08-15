function getConfig(){
    return {
        Customermeta: {
            meta: {
                enterpriseProperties:{
                    type:'string'
                },
                enterprisePropertiesName:{
                    type:'string'
                },
                enterprisePropertiesCode:{
                    type:'string'
                },
                dealerClassification: { 
                    type: 'string',
                    // refmodel: JSON.stringify(refinfo['custdocdef']),
                    // refcfg: '{"ctx":"/uitemplate_web","refCode":"DEALER_CLASSIFICATION","refName":"经销商分类"}',
                },
                dealerClassificationName:{
                    type:'string'
                },
                dealerClassificationCode:{
                    type:'string'
                },
                dealerType: { 
                    type: 'string', 
                    // refmodel: JSON.stringify(refinfo['custdocdef']),
                    // refcfg: '{"ctx":"/uitemplate_web","refCode":"DEALER_TYPE","refName":"经销商类型"}',
                },
                dealerTypeName:{
                    string:'string'
                },
                dealerTypeCode:{
                    string:'string'
                },
                //渠道类型
                // channelTypeId: {
                //     type: "string",
                //     "refmodel": JSON.stringify(refinfo["channel-type"]),
                //     "refcfg": "{\"ctx\":\"/uitemplate_web\",\"refCode\":\"\",\"refName\":\"渠道类型\",\"isMultiSelectedEnabled\":true}"
                // },
                cooperationStateId: {
                    string:'string'
                },
                cooperationStateName: {
                    string:'string'
                },
                cooperationStateCode: {
                    string:'string'
                }
            }
        },
        card1:[
            {
                type: "refer",
                key: "customerCategoryId",
                label: "省区",
            },
            {
                type: "refer",
                key: "channelTypeId",
                label: "经销商渠道"
            },
            {
                type: "refer",
                key: "cityId",
                label: "所属城市",
                domid: "cityIdinfo",
                compid: "cityIdBase"
                // disableInEdit: true
            },
            {
                type: "combo",
                key: "enterprisePropertiesCode",
                url: window.pathMap.base +
                "/cust-doc-defs/cust_doc_code?cust_doc_code=ENTERPRISE_PROPERTIES",
                label: "企业性质",
                namefield: "name",
                valuefield: "code"
            },
            {
                // type: "refer",
                // key: "dealerClassification",
                // // keyfordisplay:"dealerClassificationName",
                // label: "经销商分类",
                // refinfo: "custDoc"
                type: "combo",
                key: "dealerClassificationCode",
                url: window.pathMap.base +
                "/cust-doc-defs/cust_doc_code?cust_doc_code=DEALER_CLASSIFICATION",
                label: "经销商分类",
                namefield: "name",
                valuefield: "code"
            },
            {
                // type: "refer",
                // key: "dealerType",
                // // keyfordisplay:"dealerTypeName",
                // refinfo: "custDoc",
                // label: "经销商类型"
                type: "combo",
                key: "dealerTypeCode",
                url: window.pathMap.base +
                "/cust-doc-defs/cust_doc_code?cust_doc_code=DEALER_TYPE",
                label: "经销商类型",
                namefield: "name",
                valuefield: "code"
            },
            {
                type: "date",
                key: "foodLicenseTime",
                label: "食品经营许可证有效期",
            },
            {
                type: "text",
                key: "corporationContact",
                label: "企业法人联系方式",
            },
            {
                type: "combo",
                key: "cooperationStateCode",
                url: window.pathMap.base +
                "/cust-doc-defs/cust_doc_code?cust_doc_code=COOPERATION_STATE",
                label: "客户合作状态",
                namefield: "name",
                valuefield: "code",
                // enable: false
            },
            {
                type: "text",
                key: "deposit",
                label: "立户时实收保证金",
            },
            {
                type: "text",
                key: "gunMny",
                label: "立户时实收扫码枪款",
            },
            {
                type: "text",
                key: "score",
                label: "立户时评分",
            },
            {
                type: "combo",
                key: "highProvinceCode",
                url: window.pathMap.base +
                "/cust-doc-defs/cust_doc_code?cust_doc_code=HIGH_PROVINCE",
                label: "经营区域最高级别",
                namefield: "name",
                valuefield: "code",
                // enable: false
            },
            {
                type: "radio",
                key: "isContainCounty",
                defaultvalue: "0",
                label: "经营区域是否覆盖县城",
                dataSource: "whetherSrc"
            },
            {
                type: "text",
                key: "containCounty",
                label: "所覆盖县城名称",
            },
            {
                type: "radio",
                key: "isProvincialCapital",
                defaultvalue: "0",
                label: "省会城市",
                dataSource: "whetherSrc"
            },
            {
                type: "radio",
                key: "isPrefectureCity",
                defaultvalue: "0",
                label: "地级城市",
                dataSource: "whetherSrc"
            },
            {
                type: "radio",
                key: "isCountyCity",
                defaultvalue: "0",
                label: "县级城市",
                dataSource: "whetherSrc"
            },
            {
                type: "radio",
                key: "isVillageCity",
                defaultvalue: "0",
                label: "乡镇区域",
                dataSource: "whetherSrc"
            },
            {
                type: "text",
                key: "haveShop",
                label: "自有门店数量",
            },
            {
                type: "text",
                key: "cooperateShop",
                label: "合作门店数量",
            },
            {
                type: "text",
                key: "joinShop",
                label: "加盟门店数量",
            },
            {
                type: "radio",
                key: "isSc",
                defaultvalue: "0",
                label: "经营大型SC系统",
                dataSource: "whetherSrc"
            },
            {
                type: "text",
                key: "scName",
                label: "大型SC系统名称",
            },
            {
                type: "combo",
                key: "customerScRelationCode",
                url: window.pathMap.base +
                "/cust-doc-defs/cust_doc_code?cust_doc_code=CUSTOMER_SC_RELATION",
                label: "与SC系统关系",
                namefield: "name",
                valuefield: "code"
            },
            {
                type: "text",
                key: "purchaseMny",
                label: "预计进货额（万/月）",
            },
            {
                type: "checkboxlist",
                key: "competitorProduct",
                label: "竞品品牌",
                dataSource:  [{
                    value: 'competitorProduct01',
                    name: '惠氏'
                }, {
                    value: 'competitorProduct02',
                    name: '美赞臣'
                }, {
                    value: 'competitorProduct03',
                    name: '雅培'
                }, {
                    value: 'competitorProduct04',
                    name: '雀巢'
                }, {
                    value: 'competitorProduct05',
                    name: '美素佳儿'
                }, {
                    value: 'competitorProduct06',
                    name: '爱他美'
                }, {
                    value: 'competitorProduct07',
                    name: '诺优能'
                }, {
                    value: 'competitorProduct08',
                    name: '完达山'
                }, {
                    value: 'competitorProduct09',
                    name: '伊利'
                }, {
                    value: 'competitorProduct10',
                    name: '君乐宝'
                }, {
                    value: 'competitorProduct11',
                    name: '雅士利'
                }],
                cls: "ui-checkboxes-item"
            },
            {
                type: "text",
                key: "otherCompetitorProduct",
                label: "其他竞品品牌",
            },
        ],
        detail1:[
            {
                key: "customerCategoryName",
                label: "省区",
            },
            {
                key: "channelTypeName",
                label: "经销商渠道"
            },
            {
                key: "cityName",
                label: "所属城市"
            },
            {
                key: "enterprisePropertiesName",
                label: "企业性质"
            },
            {
                key: "dealerClassificationName",
                label: "经销商分类"
            },
            {
                key: "dealerTypeName",
                label: "经销商类型"
            },
            {
                key: "foodLicenseTime",
                label: "食品经营许可证有效期",
            },
            {
                type: "text",
                key: "corporationContact",
                label: "企业法人联系方式",
            },
            {
                key: "startTime",
                label: "立户日期",
                computed: "startTimeFormatter"
            },
            {
                key: "endTime",
                label: "撤户日期",
                computed: "endTimeFormatter"
            },
            {
                key: "cooperationStateName",
                label: "客户合作状态",
            },
            {
                type: "text",
                key: "principalName",
                label: "四级管理片区负责人",
            },
            {
                key: "startYear",
                label: "立户年份",
            },
            {
                key: "endYear",
                label: "撤户年份",
            },
            {
                key: "deposit",
                label: "立户时实收保证金",
            },
            {
                key: "gunMny",
                label: "立户时实收扫码枪款",
            },
            {
                key: "score",
                label: "立户时评分",
            },
            {
                key: "highProvinceCode",
                label: "客户合作状态",
            },
            {
                key: "highProvinceName",
                label: "经营区域最高级别"
            },
            {
                key: "isContainCounty",
                label: "经营区域是否覆盖县城",
                computed: "isContainCounty"
            },
            {
                key: "containCounty",
                label: "所覆盖县城名称",
            },
            {
                key: "isProvincialCapital",
                label: "省会城市",
                computed: "isProvincialCapital"
            },
            {
                key: "isPrefectureCity",
                label: "地级城市",
                computed: "isPrefectureCity",
            },
            {
                key: "isCountyCity",
                label: "县级城市",
                computed: "isCountyCity"
            },
            {
                key: "isVillageCity",
                label: "乡镇区域",
                computed: "isVillageCity"
            },
            {
                key: "haveShop",
                label: "自有门店数量",
            },
            {
                key: "cooperateShop",
                label: "合作门店数量",
            },
            {
                key: "joinShop",
                label: "加盟门店数量",
            },
            {
                key: "isSc",
                label: "经营大型SC系统",
                computed: "isSc"
            },
            {
                key: "scName",
                label: "大型SC系统名称",
            },
            {
                key: "customerScRelationCode",
                label: "与SC系统关系",
            },
            {
                key: "purchaseMny",
                label: "预计进货额（万/月）",
            },
            {
                key: "competitorProduct",
                label: "竞品品牌",
                computed: "competitorProduct"
            },
            {
                key: "otherCompetitorProduct",
                label: "其他竞品品牌",
            },
        ]
    }
}

function getEvents(viewModel) {
    return {
        // 编辑按钮点击事件
        beforeEdit_after: function(index, rowId){
            
            if (index >= 0) {
                var code = viewModel.CustomerList.getRowByRowId(rowId).getValue("cooperationStateName");
                if(code == "正常合作") {
                    viewModel.CustomerList.setMeta("cooperationStateCode", "enable", true);
                } else {
                    viewModel.CustomerList.setMeta("cooperationStateCode", "enable", false);
                }
            }else{
                viewModel.CustomerList.setMeta("cooperationStateCode", "enable", false);
            }
        },
        // 经营区域是否覆盖县城
        isContainCounty: ko.pureComputed(function () {
            var dataValue = viewModel.CustomerList.ref("isContainCounty")();
            var showName;
            dataValue == 1 ? (showName = "是") : (showName = "否");
            return showName;
        }),
        // 省会城市
        isProvincialCapital: ko.pureComputed(function () {
            var dataValue = viewModel.CustomerList.ref("isProvincialCapital")();
            var showName;
            dataValue == 1 ? (showName = "是") : (showName = "否");
            return showName;
        }),
        // 地级城市
        isPrefectureCity: ko.pureComputed(function () {
            var dataValue = viewModel.CustomerList.ref("isPrefectureCity")();
            var showName;
            dataValue == 1 ? (showName = "是") : (showName = "否");
            return showName;
        }),
        // 县级城市
        isCountyCity: ko.pureComputed(function () {
            var dataValue = viewModel.CustomerList.ref("isCountyCity")();
            var showName;
            dataValue == 1 ? (showName = "是") : (showName = "否");
            return showName;
        }),
        // 乡镇区域
        isVillageCity: ko.pureComputed(function () {
            var dataValue = viewModel.CustomerList.ref("isVillageCity")();
            var showName;
            dataValue == 1 ? (showName = "是") : (showName = "否");
            return showName;
        }),
        // 是否经营大型SC孕婴连锁系统（SC连锁系统门店>=10家）
        isSc: ko.pureComputed(function () {
            var dataValue = viewModel.CustomerList.ref("isSc")();
            var showName;
            dataValue == 1 ? (showName = "是") : (showName = "否");
            return showName;
        }),
        // 开始时间格式化
        startTimeFormatter: ko.pureComputed(function () {
            var dataValue = viewModel.CustomerList.ref("startTime")();
            var showName = viewModel.UnixToDate(dataValue);
            return showName;
        }),
        // 开始时间格式化
        endTimeFormatter: ko.pureComputed(function () {
            var dataValue = viewModel.CustomerList.ref("endTime")();
            var showName = viewModel.UnixToDate(dataValue);
            return showName;
        }),
        UnixToDate: function(str) {
            //补0操作
            var getzf = function(num) {
                if (parseInt(num) < 10) {
                    num = '0' + num;
                }
                return num;
            }
            var oDate = new Date(str),
                oYear = oDate.getFullYear(),
                oMonth = oDate.getMonth() + 1,
                oDay = oDate.getDate(),
                oHour = oDate.getHours(),
                oMin = oDate.getMinutes(),
                oSen = oDate.getSeconds(),
                oTime = oYear + '-' + getzf(oMonth) + '-' + getzf(oDay) + ' ' + getzf(oHour) + ':' + getzf(oMin) + ':' + getzf(oSen); //最后拼接时间
            return oTime;
        },
        // 竞品品牌
        competitorProduct: ko.pureComputed(function () {
            var dataValue = viewModel.CustomerList.ref("competitorProduct")();
            var arr = [{
                value: 'competitorProduct01',
                name: '惠氏'
            }, {
                value: 'competitorProduct02',
                name: '美赞臣'
            }, {
                value: 'competitorProduct03',
                name: '雅培'
            }, {
                value: 'competitorProduct04',
                name: '雀巢'
            }, {
                value: 'competitorProduct05',
                name: '美素佳儿'
            }, {
                value: 'competitorProduct06',
                name: '爱他美'
            }, {
                value: 'competitorProduct07',
                name: '诺优能'
            }, {
                value: 'competitorProduct08',
                name: '完达山'
            }, {
                value: 'competitorProduct09',
                name: '伊利'
            }, {
                value: 'competitorProduct10',
                name: '君乐宝'
            }, {
                value: 'competitorProduct11',
                name: '雅士利'
            }];
            var showName = [];
            if(dataValue) {
                dataValue = dataValue.split(",")
                if(dataValue){
                    dataValue.forEach(function(item, index){
                        arr.forEach(function(itemArr, indexArr){
                            if(itemArr.value == item){
                                showName.push(itemArr.name);
                            }
                        })
                    })
                    showName = showName.join(",");
                }
            }
            return showName;
        }),
        //启用
        enable: function () {
            var selectedRows = viewModel.CustomerList.getSelectedRows();
            var ids = [];
            var status = [];
            var statustip = "";
            if (selectedRows && selectedRows.length > 0) {
                for (var i = 0; i < selectedRows.length; i++) {
                    ids.push(selectedRows[i].getValue("id"));
                    if (
                        selectedRows[i].getValue("isEnable") == 1 ||
                        selectedRows[i].getValue("isEnable") == "1"
                    ) {
                        status.push(selectedRows[i].getValue("code"));
                    }
                }
                if (status.length > 0) {
                    var statusArr = function () {
                        for (i = 0; i < status.length; i++) {
                            statustip += status[i] + "，";
                        }
                        return statustip.substring(0, statustip.length - 1);
                    };

                    toastr.warning("数据   " + statusArr() + " 不可重复启用");
                    return false;
                }
                ids = ids.join(",");
                $._ajax({
                    type: "post",
                    url: appCtx + viewModel.baseurl + "/batch-enable",
                    data: {
                        ids: ids
                    },
                    success: function (res) {
                        for (var i = 0; i < selectedRows.length; i++) {
                            selectedRows[i].setValue("isEnable", "1");
                        }
                        toastr.success("启用成功");
                        viewModel.search();
                    }
                });
            } else {
                toastr.warning("请先选择需要启用数据");
            }
        },
        //停用
        disable: function () {
            var selectedRows = viewModel.CustomerList.getSelectedRows();
            var ids = [];
            var status = [];
            var statustip = "";
            if (selectedRows && selectedRows.length > 0) {
                for (var i = 0; i < selectedRows.length; i++) {
                    ids.push(selectedRows[i].getValue("id"));
                    if (
                        selectedRows[i].getValue("isEnable") == 0 ||
                        selectedRows[i].getValue("isEnable") == "0"
                    ) {
                        status.push(selectedRows[i].getValue("code"));
                    }
                }
                if (status.length > 0) {
                    var statusArr = function () {
                        for (i = 0; i < status.length; i++) {
                            statustip += status[i] + "，";
                        }
                        return statustip.substring(0, statustip.length - 1);
                    };

                    toastr.warning("未启用数据不可停用");
                    return false;
                }
                ids = ids.join(",");
                $._ajax({
                    type: "post",
                    url: appCtx + viewModel.baseurl + "/batch-disable",
                    data: {
                        ids: ids
                    },
                    success: function (res) {
                        for (var i = 0; i < selectedRows.length; i++) {
                            selectedRows[i].setValue("isEnable", "2");
                        }
                        toastr.success("停用成功");
                        viewModel.search();
                    }
                });
            } else {
                toastr.warning("请先选择需要停用数据");
            }
        },
        //点击保存按钮
        saveHandle: function () {
            var _index = viewModel.index;
            var ChannelPass = true;
            var isChannelCustomer = viewModel.CustomerList.getValue(
                "isChannelCustomer"
            );
            //var isOrganization = viewModel.CustomerList.getValue("isOrganization");
            var infoBase = $("#baseInfo")[0];
            var basePass = viewModel.validate(infoBase);
            if(_index>=0){
                if (basePass.passed) {
                    if(viewModel.flag){
                        viewModel.edit(_index);
                    }else{
                        toastr.warning("正式关闭不能选择！");
                    }
                }
            }else{
                viewModel.edit(_index);
            }
        },
    }
}

function afterCreate() {
    return function (viewModel) {
        viewModel.CustomerList.on("cooperationStateCode.valuechange", function (obj) {
            if(obj.newValue == "3"){
                viewModel.flag = false;
            }else{
                viewModel.flag = true;
            }
        });
    }
}

  