define(["viewer"], function (Viewer) {
    var Common = {};
    var gridIdMap = new Map();
    /*生成唯一key值=时间戳+7位随机数字*/
    Common.generateUniqueKey = function () {
        var timestamp = +new Date();
        var randomStr = Math.random() + '';
        randomStr = randomStr.slice(2, 9);
        return timestamp + randomStr;
    };
    /**
     * 获得页面参数
     * @param {String} [field] [参数名]
     * @return {String} [value][参数值]
     */
    Common.getParameter = function (url) {
        var search = url
            .replace(/^\s+/, "")
            .replace(/\s+$/, "")
            .match(/([^?#]*)(#.*)?$/); //提取location.search中'?'后面的部分
        if (!search) {
            return {};
        }
        var searchStr = search[1];
        var searchHash = searchStr.split("&");
        var ret = {};
        for (var i = 0, len = searchHash.length; i < len; i++) {
            var pair = searchHash[i];
            if ((pair = pair.split("="))[0]) {
                var key = decodeURIComponent(pair.shift());
                var value = pair.length > 1 ? pair.join("=") : pair[0];
                if (value != undefined) {
                    value = decodeURIComponent(value);
                }
                if (key in ret) {
                    if (ret[key].constructor != Array) {
                        ret[key] = [ret[key]];
                    }
                    ret[key].push(value);
                } else {
                    ret[key] = value;
                }
            }
        }
        return ret;
    };

    /*URL传参转对象*/
    Common.parseQueryString = function (url) {
        var search = url
            .replace(/^\s+/, "")
            .replace(/\s+$/, "")
            .match(/([^?#]*)(#.*)?$/); //提取location.search中'?'后面的部分
        if (!search) {
            return {};
        }
        var searchStr = search[1];
        var searchHash = searchStr.split("&");
        var ret = {};
        for (var i = 0, len = searchHash.length; i < len; i++) {
            //这里可以调用each方法
            var pair = searchHash[i];
            if ((pair = pair.split("="))[0]) {
                var key = decodeURIComponent(pair.shift());
                var value = pair.length > 1 ? pair.join("=") : pair[0];

                if (value != undefined) {
                    value = decodeURIComponent(value);
                }
                if (key in ret) {
                    if (ret[key].constructor != Array) {
                        ret[key] = [ret[key]];
                    }
                    ret[key].push(value);
                } else {
                    ret[key] = value;
                }
            }
        }
        return ret;
    };

    /**
     * js对象转换url参数
     */
    Common.toUrlParam = function (obj) {
        var keys = Object.keys(obj);
        var urlParam = "";
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            var value = obj[key];
            urlParam += key + "=" + value;
            if (i < keys.length - 1) {
                urlParam += "&";
            }
        }
        return urlParam;
    };
    Common.htmlEncode = function (html) {
        //1.首先动态创建一个容器标签元素，如DIV
        var temp = document.createElement("div");
        //2.然后将要转换的字符串设置为这个元素的innerText(ie支持)或者textContent(火狐，google支持)
        temp.textContent != undefined
            ? (temp.textContent = html)
            : (temp.innerText = html);
        //3.最后返回这个元素的innerHTML，即得到经过HTML编码转换的字符串了
        var output = temp.innerHTML;
        temp = null;
        return output;
    };
    Common.htmlDecode = function (text) {
        //1.首先动态创建一个容器标签元素，如DIV
        var temp = document.createElement("div");
        //2.然后将要转换的字符串设置为这个元素的innerHTML(ie，火狐，google都支持)
        temp.innerHTML = text;
        //3.最后返回这个元素的innerText(ie支持)或者textContent(火狐，google支持)，即得到经过HTML解码的字符串了。
        var output = temp.innerText || temp.textContent;
        temp = null;
        return output;
    };
    Common.dataconvert = {
        doMap: function (array, nameField, valueField) {
            array[nameField] = valueField;
        },
        toMap: function (array, nameField, valueField) {
            var results = [];
            if (u.isArray(array) && array.length > 0) {
                for (var i = 0; i < array.length; i++) {
                    var result = {};
                    result.name = array[i][nameField];
                    result.value = array[i][valueField];
                    results.push(result);
                }
            }
            return results;
        },
        valueToName: function (value, datasource) {
            if (ko.isObservable(datasource)) {
                datasource = datasource();
            }
            if (u.isArray(datasource) && datasource.length > 0) {
                for (var i = 0; i < datasource.length; i++) {
                    if (value == datasource[i].value) {
                        return datasource[i].name;
                    }
                }
            }
        },
        valueToObj: function (value, datasource) {
            if (ko.isObservable(datasource)) {
                datasource = datasource();
            }
            if (u.isArray(datasource) && datasource.length > 0) {
                for (var i = 0; i < datasource.length; i++) {
                    if (value == datasource[i].value) {
                        return datasource[i];
                    }
                }
            }
        },
        filterByDr: function (items) {
            return items.filter(function (item) {
                return item.dr == 0;
            });
        },
        filterByfield: function (items, field, value, notinflag) {
            if (!u.isArray(value)) {
                value = [value];
            }
            return items.filter(function (item) {
                if (notinflag) {
                    //反向过滤
                    return $.inArray(item[field], value) == -1;
                }
                return $.inArray(item[field], value) > -1;
            });
        },
        // 数据格式转换
        convertObjArray: function (srcArray, relObj) {
            var targetArray = [];
            for (var i = 0; i < srcArray.length; i++) {
                var targetObject = {};
                var srcObject = srcArray[i];
                for (var srcKey in relObj) {
                    var targetKey = relObj[srcKey];
                    targetObject[targetKey] = srcObject[srcKey];
                }
                targetArray.push(targetObject);
            }
        },
        //对象数组差集
        diff: function (objKey, array1, array2) {
            var keyMap = {};
            var diffArray = [];
            for (var i = 0; i < array2.length; i++) {
                keyMap[array2[i][objKey]] = true;
            }
            for (var i = 0; i < array1.length; i++) {
                var key = array1[i][objKey];
                if (keyMap[key] !== true) {  //此对象array2中不存在，则加入差集
                    diffArray.push(array1[i]);
                }
            }
            return diffArray;
        }
    };

    Common.rendertype = {
        //表格文本编辑框
        editTypeText: function (obj) {
            var gridObj = obj.gridObj;
            var viewModel = gridObj.viewModel;//viewModel对象
            var field = obj.gridCompColumn.options.field;//列对应的字段值
            var ele = obj.element;//当前元素
            var dataTableId = gridObj.dataTable.id;//dataTable名称
            var rowId = obj.row.value["$_#_@_id"];
            var innerStr = '<div class=\'u-text\' style="width:100%;padding:0px;" u-meta=\'{"id":"' + field + '","type":"u-text","data":"' + dataTableId + '","field":"' + field + '","rowId":"' + rowId + '"}\'><input id=' + field + "_" + rowId + ' class="u-input" type="text" autocomplete="off" style="color:#333;padding:6px 12px;border-radius:4px;border:1px solid rgb(206,206,206);height:26px;margin-top:0px"></div>';
            var innerDom = u.makeDOM(innerStr);
            ele.innerHTML = '';
            ele.appendChild(innerDom);
            viewModel.app.createComp(innerDom, viewModel);
        },
        //只读表格文本编辑框
        readonlyTypeText: function (obj) {
            var gridObj = obj.gridObj;
            var viewModel = gridObj.viewModel;//viewModel对象
            var field = obj.gridCompColumn.options.field;//列对应的字段值
            var ele = obj.element;//当前元素
            var dataTableId = gridObj.dataTable.id;//dataTable名称
            var rowId = obj.row.value["$_#_@_id"];
            var innerStr = '<div class="u-text" style="width:90%;padding:0px;" u-meta=\'{"id":"' + field + '","type":"u-text","data":"' + dataTableId + '","field":"' + field + '","rowId":"' + rowId + '"}\'><input id=' + field + "_" + rowId + ' class="u-input" type="text" style="color:#333;padding:6px 12px;border-radius:4px;border:1px solid rgb(206,206,206);height:26px;margin-top:0px;" disabled="disabled"></div>';
            var innerDom = u.makeDOM(innerStr);
            ele.innerHTML = '';
            ele.appendChild(innerDom);
            viewModel.app.createComp(innerDom, viewModel);
        },
        //表格带%编辑框
        fixRowTypeText: function (obj) {
            var gridObj = obj.gridObj;
            var viewModel = gridObj.viewModel;//viewModel对象
            var field = obj.gridCompColumn.options.field;//列对应的字段值
            var ele = obj.element;//当前元素
            var dataTableId = gridObj.dataTable.id;//dataTable名称
            var rowId = obj.row.value["$_#_@_id"];
            if (obj.rowIndex == '0') {
                var innerStr = '<div class=\'u-text\' style="width:100%;padding:0px;" u-meta=\'{"id":"' + field + '","type":"u-text","data":"' + dataTableId + '","field":"' + field + '","rowId":"' + rowId + '"}\'><input id=' + field + "_" + rowId + ' class="u-input" type="text" style="color:#333;padding:6px 12px;border-radius:4px;border:1px solid rgb(206,206,206);height:26px;margin-top:0px" disabled="disabled"><span>%</span></div>';
            } else {
                var innerStr = '<div class=\'u-text\' style="width:100%;padding:0px;" u-meta=\'{"id":"' + field + '","type":"u-text","data":"' + dataTableId + '","field":"' + field + '","rowId":"' + rowId + '"}\'><input id=' + field + "_" + rowId + ' class="u-input" type="text" style="color:#333;padding:6px 12px;border-radius:4px;border:1px solid rgb(206,206,206);height:26px;margin-top:0px"><span>%</span></div>';
            }
            // var innerStr = '<div class=\'u-text\' style="width:100%;padding:0px;" u-meta=\'{"id":"' + field + '","type":"u-text","data":"' + dataTableId + '","field":"' + field + '","rowIndex":"' + rowId + '"}\'><input id=' + field + rowId + ' class="u-input" type="text" style="color:#333;padding:6px 12px;border-radius:4px;border:1px solid rgb(206,206,206);height:26px;margin-top:0px"><span>%</span></div>';
            var innerDom = u.makeDOM(innerStr);
            ele.innerHTML = '';
            ele.appendChild(innerDom);
            viewModel.app.createComp(innerDom, viewModel);
        },
        //表格下拉编辑框
        comboRender: function (obj) {
            var gridObj = obj.gridObj;
            var viewModel = gridObj.viewModel;
            var field = obj.gridCompColumn.options.field;
            var ele = obj.element;
            var dataTableId = gridObj.dataTable.id;
            var rowId = obj.row.value["$_#_@_id"];
            var datasource = JSON.stringify(obj.gridCompColumn.options.datasource);
            var innerStr = '<div class=\'u-combo\' style="width:100%;padding:5px;" u-meta=\'{"id":"' + field + '","type":"u-combobox","data":"' + dataTableId + '","field":"' + field + '","rowId":"' + rowId + '","datasource":' + datasource + ',"showFix":true, "onlySelect":true}\'>' +
                '<div class="u-input-group u-has-feedback"><input id=' + field + "_" + rowId + ' class="u-form-control" style="color:#333;padding:6px 12px;border-radius:4px;border:1px solid rgb(206,206,206);height:26px;margin-top:0px;background:#FFF;" /><span class="u-form-control-feedback uf uf-arrow-down" data-role="combo-button"></span></div></div>';
            var innerDom = u.makeDOM(innerStr);
            ele.innerHTML = '';
            ele.appendChild(innerDom);
            viewModel.app.createComp(innerDom, viewModel);
        },
        //复合编辑框
        multiRender: function (obj) {
            var gridObj = obj.gridObj;
            var viewModel = gridObj.viewModel;
            var fields = obj.gridCompColumn.options.field.split(',');
            var ele = obj.element;
            var dataTableId = gridObj.dataTable.id;
            var rowId = obj.row.value["$_#_@_id"];
            var datasource = JSON.stringify(obj.gridCompColumn.options.datasource);
            var innerStr = '<div class="u-text" style="width:20%;padding:0px;" u-meta=\'{"id":"' + fields[1] +'","type":"u-text","data":"' + dataTableId + '","field":"' + fields[1] + '","rowId":"' + rowId + '"}\'><input id=' + fields[1] + "_" + rowId + ' class="u-input" type="text" style="color:#333;padding:6px 12px;border-radius:4px;border:1px solid rgb(206,206,206);height:26px;margin-top:0px;" disabled="disabled"></div>'+
             '<div class=\'u-combo\' style="width:20%;padding:5px;" u-meta=\'{"id":"' + fields[0] + '","type":"u-combobox","data":"' + dataTableId + '","field":"' + fields[0] + '","rowId":"' + rowId + '","datasource":' + datasource + ',"showFix":true, "onlySelect":true}\'>' +
                '<div class="u-input-group u-has-feedback"><input id=' + fields[0] + "_" + rowId + ' class="u-form-control" style="color:#333;padding:6px 12px;border-radius:4px;border:1px solid rgb(206,206,206);height:26px;margin-top:0px;background:#FFF;" /><span class="u-form-control-feedback uf uf-arrow-down" data-role="combo-button"></span></div></div>' ;
                var innerDom = u.makeDOM(innerStr);
            ele.innerHTML = '';
            ele.appendChild(innerDom);
            viewModel.app.createComp(innerDom, viewModel);
        },
        //表格参照编辑框
        referRender: function (obj) {
            var gridObj = obj.gridObj;
            var gridId = gridObj.ele.id;
            var viewModel = gridObj.viewModel;
            var field = obj.gridCompColumn.options.field;
            var ele = obj.element;
            var dataTableId = gridObj.dataTable.id;
            var rowId = obj.row.value['$_#_@_id'];
            var innerStr = '<div class="u-text" style="width:85%;height:80%;margin-top:7px;" u-meta=\'{"id":"' + field + '","type":"uiRefer","data":"' + dataTableId + '","field":"' + field + '","rowId":"' + rowId + '"}\'>' +
                '<div class="u-input-group u-has-feedback" style="height:30px">' +
                '<input id='+ dataTableId + "_" + field + '_' + rowId + ' class="u-form-control" style="color:#333;height:26px; padding-right:25px;border-radius:4px;" autocomplete="off" />' +
                '<span class="u-form-control-feedback ui-icon uifont icon-bar refer" style="font-size:12px;" data-role="combo-button">' +
                '</span></div></div>';
            var innerDom = u.makeDOM(innerStr);
            ele.innerHTML = '';
            ele.appendChild(innerDom);
            viewModel.app.createComp(innerDom, viewModel);
        },
        //表格参照编辑框
        multiReferRender: function (obj) {
            var gridObj = obj.gridObj;
            var gridId = gridObj.ele.id;
            var viewModel = gridObj.viewModel;
            var field = obj.gridCompColumn.options.field;
            var ele = obj.element;
            var dataTableId = gridObj.dataTable.id;
            var rowId = obj.row.value['$_#_@_id'];
            var innerStr = '<div class=\'u-input\' style="width:100%;padding:0px;margin-top:7px;position:relative;border-bottom:none;" u-meta=\'{"id":"' + field + '","type":"u-text","data":"' + dataTableId + '","field":"' + field + '","rowId":"' + rowId +
                '"}\'><input id="'+ dataTableId + "_" + field + "_" + rowId + '" class="u-input" type="text" autocomplete="off" style="width:100%;color:#333;padding:6px 12px;border-radius:4px;border:1px solid rgb(206,206,206);height:26px;margin-top:0px"/>' +
                '<span class="u-form-control-feedback ui-icon uifont icon-bar refer" style="font-size:12px;" data-role="combo-button"></span></div>';
            // '<a data-bind="click:getReferData"/>aa</div>';
            var innerDom = u.makeDOM(innerStr);
            ele.innerHTML = '';
            ele.appendChild(innerDom);
            viewModel.app.createComp(innerDom, viewModel);
        },
        //表格参照编辑框
        readonlyReferRender: function (obj) {
            var gridObj = obj.gridObj;
            var gridId = gridObj.ele.id;
            var viewModel = gridObj.viewModel;
            var field = obj.gridCompColumn.options.field;
            var ele = obj.element;
            var dataTableId = gridObj.dataTable.id;
            var rowId = obj.row.value['$_#_@_id'];
            var innerStr = '<div class="u-text" style="width:85%;height:80%";padding:5px;" u-meta=\'{"id":"' + field + '","type":"uiRefer","data":"' + dataTableId + '","field":"' + field + '","rowId":"' + rowId + '"}\'>' +
                '<div class="u-input-group u-has-feedback" style="height:30px">' +
                '<input id='+ dataTableId + "_" + field + "_" + rowId + ' class="u-form-control" style="height:26px;margin-top:7px; padding-right:25px;border-radius:4px;" disabled=true/>' +
                '<span class="u-form-control-feedback ui-icon uifont icon-bar refer" style="margin-top:7px;font-size:12px;" data-role="combo-button">' +
                '</span></div></div>';
            var innerDom = u.makeDOM(innerStr);
            ele.innerHTML = '';
            ele.appendChild(innerDom);
            viewModel.app.createComp(innerDom, viewModel);
        },
        //表格日期编辑框
        dateRender: function (obj) {
            var gridObj = obj.gridObj;
            var viewModel = gridObj.viewModel;//viewModel对象
            var field = obj.gridCompColumn.options.field;//列对应的字段值
            var ele = obj.element;//当前元素
            var dataTableId = gridObj.dataTable.id;//dataTable名称
            var rowId = obj.row.value['$_#_@_id'];
            var innerStr = '<div class="u-text is-upgraded" u-meta=\'{"type":"u-date","data":"' + dataTableId + '","field":"' + field + '","id":"' + field + '","rowId":"' + rowId + '"}\' hasvalidate="true" data-upgraded=",u.Text" title=""><span data-reactroot="" class="ant-calendar-picker"><div>' +
                '<input id=' + field + "_" + rowId + ' class="ant-calendar-picker-input ant-input"><span class="ant-calendar-picker-icon"></span></span></div></div>';
            var innerDom = u.makeDOM(innerStr);
            ele.innerHTML = '';
            ele.appendChild(innerDom);
            viewModel.app.createComp(innerDom, viewModel);
        },
        //表格日期范围编辑框
        dateRangeRender: function (obj) {
            var gridObj = obj.gridObj;
            var viewModel = gridObj.viewModel;//viewModel对象
            var field = obj.gridCompColumn.options.field;//列对应的字段值
            var ele = obj.element;//当前元素
            var dataTableId = gridObj.dataTable.id;//dataTable名称
            var rowId = obj.row.value['$_#_@_id'];
            var innerStr =
                '    <div class="ui-inputarea" u-meta=\'{"type":"u-date","data":"' + dataTableId + '","field":"' + field + '","id":"' + field + '","rowId":"' + rowId + '","rangeFlag":"true","enable":"true"}\' hasvalidate="true">' +
                '        <span data-reactroot="" class="ant-calendar-picker">' +
                '            <span class="ant-calendar-picker-input ant-input">' +
                '                <input readonly="" placeholder="开始日期" class="ant-calendar-range-picker-input">' +
                '                <span class="ant-calendar-range-picker-separator"> ~ </span>' +
                '                <input readonly="" placeholder="结束日期" class="ant-calendar-range-picker-input">' +
                '                <span class="ant-calendar-picker-icon"></span>' +
                '            </span>' +
                '        </span>' +
                '    </div>';
            var innerDom = u.makeDOM(innerStr);
            ele.innerHTML = '';
            ele.appendChild(innerDom);
            viewModel.app.createComp(innerDom, viewModel);
        },
        approveFormat: function (value) {
            var name = "";
            switch (value) {
                case 0:
                    name = "未审核";
                    break;
                case 1:
                    name = "已审核";
                    break;
                default:
                    break;
            }
            return name;
        },

        historyStatusFormat: function (obj) {
            var name = "";
            var value = obj.value;
            switch (value) {
                case "0":
                    obj.element.innerHTML = "待审批";
                    break;
                case "1":
                    obj.element.innerHTML = "已审批";
                    break;
                default:
                    obj.element.innerHTML = "";
                    break;
            }
        },

        // 审批状态
        approveOperFormat: function (obj) {
            var name = "";
            var value = obj.value;
            switch (value) {
                case "0":
                    obj.element.innerHTML = "申请";
                    break;
                case "1":
                    obj.element.innerHTML = "同意";
                    break;
                case "2":
                    obj.element.innerHTML = "驳回";
                    break;
                case "3":
                    obj.element.innerHTML = "收回";
                    break;
                default:
                    obj.element.innerHTML = "";
                    break;
            }

        },

        approveReasonFormat: function (obj) {
            var name = "";
            var value = obj.value;
            switch (value) {
                case "completed":
                    obj.element.innerHTML = "同意";
                    break;
                case "deleted":
                    obj.element.innerHTML = "作废";
                    break;
                case "withdraw":
                    obj.element.innerHTML = "收回";
                    break;
                case "rejectall":
                    obj.element.innerHTML = "驳回";
                    break;
                case "apply":
                    obj.element.innerHTML = "申请";
                    break;
                default:
                    obj.element.innerHTML = "";
                    break;
            }

        },

        cusApproveFormat: function (params) {
            if (params.value == "0") {
                params.element.innerHTML = "自由态";
            } else if (params.value == "1") {
                params.element.innerHTML = "审核中";
            } else if (params.value == "2") {
                params.element.innerHTML = "审核通过";
            } else if (params.value == "3") {
                params.element.innerHTML = "审核不通过";
            } else {
                params.element.innerHTML = "-";
            }
        },

        DetailApproveFormat: function (value) {
            if (value == "0") {
                return "自由态";
            } else if (value == "1") {
                return "审核中";
            } else if (value == "2") {
                return "审核通过";
            } else if (value == "3") {
                return "审核不通过";
            } else {
                return "-";
            }
        },
        allowRender: function (params) {
            if (params.value == "1") {
                params.element.innerHTML = "允许";
            } else {
                params.element.innerHTML = "不允许";
            }
        },
        // 发布状态
        allowRender: function (params) {
            if (params.value == "1") {
                params.element.innerHTML = "已发布";
            } else {
                params.element.innerHTML = "未发布";
            }
        },
        statusRender: function (params) {
            if (params.value == "1") {
                params.element.innerHTML = "未提交";
            } else if (params.value == "2") {
                params.element.innerHTML = "审核中";
            } else if (params.value == "3") {
                params.element.innerHTML = "已发布";
            } else if (params.value == "4") {
                params.element.innerHTML = "未通过";
            } else if (params.value == "5") {
                params.element.innerHTML = "已下架";
            }
        },
        permitRender: function (params) {
            params.element.innerHTML = "允许";
            /*默认1表示启用，0表示停用*/
            if (params.value != 0 && params.value != "0") {
                params.element.innerHTML = "禁止";
            }
        },
        enableRender: function (params) {
            params.element.innerHTML = "停用";
            /*默认1表示启用，0表示停用*/
            if (params.value != 0 && params.value != "0") {
                params.element.innerHTML = "启用";
            }
        },

        FrozenRender: function (params) {
            if (params.value == 1 || params.value == "1") {
                params.element.innerHTML = "冻结";
            } else {
                params.element.innerHTML = "解冻";
            }
        },
        // 包含0，1，2停启用状态的render
        enableThreeRender: function (params) {
            /*默认0表示未启用，1表示启用，2表示停用*/
            if (params.value == 0 || params.value == "0") {
                params.element.innerHTML = "未启用";
            } else if (params.value == 1 || params.value == "1") {
                params.element.innerHTML = "启用";
            } else if (params.value == 2 || params.value == "2") {
                params.element.innerHTML = "停用";
            }
        },
        effectiveRender: function (params) {
            params.element.innerHTML = "无效";
            /*默认1表示启用，0表示停用*/
            if (params.value != 0 && params.value != "0") {
                params.element.innerHTML = "有效";
            }
        },
        userRender: function (params) {
            params.element.innerHTML = "淘汰";
            /*默认1表示在用，0表示淘汰*/
            if (params.value != 0 && params.value != "0") {
                params.element.innerHTML = "在用";
            }
        },
        whetherRender: function (params) {
            params.element.innerHTML = "否";
            /*默认1表示启用，0表示停用*/
            if (params.value === 0 || params.value === "0") {
                params.element.innerHTML = "否";
            }
            if (params.value === 1 || params.value === "1") {
                params.element.innerHTML = "是";
            }
        },
        whetherColorRender: function (params) {
            if (params.value == 0) {
                params.element.innerHTML = "否";
                params.element.style.color = "red";
            }
            /*默认1表示启用，0表示停用*/
            if (params.value != 0 && params.value != "0") {
                params.element.innerHTML = "是";
            }
        },
        typeCodeRender: function (params) {
            if (params.value == 1) {
                params.element.innerHTML = "仅本人";
            } else if (params.value == 2) {
                params.element.innerHTML = "负责客户";
            } else if (params.value == 3) {
                params.element.innerHTML = "负责客户及下级客户";
            } else if (params.value == 4) {
                params.element.innerHTML = "本市场区域及下级区域";
            } else if (params.value == 5) {
                params.element.innerHTML = "本部门及下级部门";
            } else if (params.value == 6) {
                params.element.innerHTML = "本组织";
            }
        },

        AnalysisMoneyFormat: function (obj) {//回款分析金额格式化
            var value = obj.value;
            if (value) {
                value = parseFloat(value);
                if (value <= 10) {
                    obj.element.innerHTML = value.toFixed(2);
                } else {
                    obj.element.innerHTML = value.toFixed(0);
                }
            }
        },

        // 单表操作
        operation4single: function (obj) {
            var viewModel = obj.gridObj.viewModel;
            var dataTableRowId = obj.row.value["$_#_@_id"];
            var delfun =
                "data-bind=click:del.bind($data," +
                obj.rowIndex +
                "," +
                dataTableRowId +
                ")";
            var editfun =
                "data-bind=click:beforeEdit.bind($data," +
                obj.rowIndex +
                "," +
                dataTableRowId +
                ")";

            obj.element.innerHTML =
                '<div class="ui-handle-icon">' +
                '<span class="ui-handle-word">' +
                '<a href="#" ' +
                editfun +
                ' title="编辑">编辑</a>' +
                "</span>    " +
                '<span class="ui-handle-word">' +
                '<a href="#" ' +
                delfun +
                ' title="删除">删除</a>' +
                "</span></div>";
            ko.cleanNode(obj.element);
            ko.applyBindings(viewModel, obj.element);
        },
        // 只有编辑的单表操作
        editoperation4single: function (obj) {
            var viewModel = obj.gridObj.viewModel;
            var dataTableRowId = obj.row.value["$_#_@_id"];
            var editfun =
                "data-bind=click:beforeEdit.bind($data," +
                obj.rowIndex +
                "," +
                dataTableRowId +
                ")";

            obj.element.innerHTML =
                '<div class="ui-handle-icon">' +
                '<span class="ui-handle-word">' +
                '<a href="#" ' +
                editfun +
                ' title="编辑">编辑</a>' +
                "</span></div>";
            ko.cleanNode(obj.element);
            ko.applyBindings(viewModel, obj.element);
        },
        // 主子表操作
        operation: function (obj) {
            var viewModel = obj.gridObj.viewModel;
            var dataTableRowId = obj.row.value["$_#_@_id"];
            var delfun =
                "data-bind=click:del.bind($data," +
                obj.rowIndex +
                "," +
                dataTableRowId +
                ")";
            var editfun =
                "data-bind=click:showEditBillPanel.bind($data," +
                obj.rowIndex +
                "," +
                dataTableRowId +
                ")";
            obj.element.innerHTML =
                '<div class="ui-handle-icon">' +
                '<span class="ui-handle-word">' +
                '<a href="#" ' +
                editfun +
                ' title="编辑">编辑</a>' +
                "</span>    " +
                '<span class="ui-handle-word">' +
                '<a href="#" ' +
                delfun +
                ' title="删除">删除</a>' +
                "</span></div>";
            ko.cleanNode(obj.element);
            ko.applyBindings(viewModel, obj.element);
        },
        // 只有编辑的主子表操作
        editoperation: function (obj) {
            var viewModel = obj.gridObj.viewModel;
            var dataTableRowId = obj.row.value["$_#_@_id"];
            var editfun =
                "data-bind=click:showEditBillPanel.bind($data," +
                obj.rowIndex +
                "," +
                dataTableRowId +
                ")";
            obj.element.innerHTML =
                '<div class="ui-handle-icon">' +
                '<span class="ui-handle-word">' +
                '<a href="#" ' +
                editfun +
                ' title="编辑">编辑</a>' +
                "</span></div>";
            ko.cleanNode(obj.element);
            ko.applyBindings(viewModel, obj.element);
        },
        // 包含数据权限的编辑删除操作
        operation4auth: function (obj) {
            var viewModel = obj.gridObj.viewModel;
            var dataTableRowId = obj.row.value["$_#_@_id"];
            var delfun =
                "data-bind='click:del.bind($data," +
                obj.rowIndex +
                "," +
                dataTableRowId +
                '), visible: buttonShowGroup["del"]\'';
            var editfun =
                "data-bind='click:showEditBillPanel.bind($data," +
                obj.rowIndex +
                "," +
                dataTableRowId +
                '), visible: buttonShowGroup["edit"]\'';
            obj.element.innerHTML =
                '<div class="ui-handle-icon">' +
                '<span class="ui-handle-word">' +
                '<a href="#" ' +
                editfun +
                ' title="编辑">编辑</a>' +
                "</span>    " +
                '<span class="ui-handle-word">' +
                '<a href="#" ' +
                delfun +
                ' title="删除">删除</a>' +
                "</span></div>";
            ko.cleanNode(obj.element);
            ko.applyBindings(viewModel, obj.element);
        },
        //表格新增删除
        adddeloperation: function (obj) {
            var dataTableId = obj.gridObj.dataTable.id;
            var viewModel = obj.gridObj.viewModel;
            var dataTableRowId = obj.row.value["$_#_@_id"];
            var id = obj.gridObj.$ele[0].id;
            var addfun =
                "data-bind=click:add.bind($data," + id + ")";
            var delfun =
                "data-bind=click:delChild.bind($data," +
                dataTableId +
                "," +
                dataTableRowId +
                "," +
                id +
                ")";
            // if (obj.rowIndex == 0) {
            //   obj.element.innerHTML =
            //     '<div class="ui-handle-icon">' +
            //     '<span class="ui-handle-word">' +
            //     '<a href="#" ' +
            //     delfun +
            //     ' title="删除">删除</a>' +
            //     "</span>    " +
            //     '<span class="ui-handle-word">' +
            //     '<a href="#" ' +
            //     addfun +
            //     ' title="新增">新增</a>' +
            //     "</span></div>";
            // } else {
            obj.element.innerHTML =
                '<div class="ui-handle-icon">' +
                '<span class="ui-handle-word">' +
                '<a href="#" ' +
                delfun +
                ' title="删除">删除</a>' +
                "</span>    "
            // }
            ko.cleanNode(obj.element);
            ko.applyBindings(viewModel, obj.element);
        },
        //表格新增删除
        seldeloperation: function (obj) {
            var dataTableId = obj.gridObj.dataTable.id;
            var viewModel = obj.gridObj.viewModel;
            var dataTableRowId = obj.row.value["$_#_@_id"];
            var id = obj.gridObj.$ele[0].id;
            var rowIndex = obj.rowIndex;
            var delfun =
                "data-bind=click:delSelRef.bind($data," +
                dataTableId +
                "," +
                dataTableRowId +
                "," +
                rowIndex +
                "," +
                id +
                ")";
            obj.element.innerHTML =
                '<div class="ui-handle-icon">' +
                '<span class="ui-handle-word">' +
                '<a href="#" ' +
                delfun +
                ' title="删除">删除</a>' +
                "</span>    "
            // }
            ko.cleanNode(obj.element);
            ko.applyBindings(viewModel, obj.element);
        },
        //  //表格新增删除
        //  adddeloperation: function (obj) {
        //   var viewModel = obj.gridObj.viewModel;
        //   var dataTableRowId = obj.row.value["$_#_@_id"];
        //   var id = obj.gridObj.$ele[0].id;
        //   var addfun =
        //     "data-bind=click:add.bind($data," + id + ")";
        //   var delfun =
        //     "data-bind=click:del.bind($data," +
        //     obj.rowIndex +
        //     "," +
        //     dataTableRowId +
        //     "," +
        //     id +
        //     ")";
        //   // if (obj.rowIndex == 0) {
        //   //   obj.element.innerHTML =
        //   //     '<div class="ui-handle-icon">' +
        //   //     '<span class="ui-handle-word">' +
        //   //     '<a href="#" ' +
        //   //     delfun +
        //   //     ' title="删除">删除</a>' +
        //   //     "</span>    " +
        //   //     '<span class="ui-handle-word">' +
        //   //     '<a href="#" ' +
        //   //     addfun +
        //   //     ' title="新增">新增</a>' +
        //   //     "</span></div>";
        //   // } else {
        //   obj.element.innerHTML =
        //     '<div class="ui-handle-icon">' +
        //     '<span class="ui-handle-word">' +
        //     '<a href="#" ' +
        //     delfun +
        //     ' title="删除">删除</a>' +
        //     "</span>    "
        //   // }
        //   ko.cleanNode(obj.element);
        //   ko.applyBindings(viewModel, obj.element);
        // },
        // xlx工作日报中的操作
        operationCustom: function (obj) {
            var viewModel = obj.gridObj.viewModel;
            var dataTableRowId = obj.row.value["$_#_@_id"];
            var showreport =
                "data-bind=click:showEditReport.bind($data," +
                obj.rowIndex +
                "," +
                dataTableRowId +
                ")";
            var showpic =
                "data-bind=click:showEditPic.bind($data," +
                obj.rowIndex +
                "," +
                dataTableRowId +
                ")";
            obj.element.innerHTML =
                '<div class="ui-handle-icon">' +
                '<span class="ui-handle-word">' +
                '<a href="#" ' +
                showreport +
                ' title="简报">简报</a>' +
                "</span>    " +
                '<span class="ui-handle-word">' +
                '<a href="#" ' +
                showpic +
                ' title="图片">图片</a>' +
                "</span></div>";
            ko.cleanNode(obj.element);
            ko.applyBindings(viewModel, obj.element);
        },

        detailRender: function (obj) {
            var viewModel = obj.gridObj.viewModel;
            var rowId = obj.row.value["$_#_@_id"];
            var detailfun = "data-bind=click:detail.bind($data," + rowId + ")";
            obj.element.innerHTML =
                '<a href="#" class="ui-a-detail" ' +
                detailfun +
                ">" +
                obj.value +
                "</a>";
            ko.cleanNode(obj.element);
            ko.applyBindings(viewModel, obj.element);
        },

        detailShowRender: function (obj) {
            var viewModel = obj.gridObj.viewModel;
            var rowId = obj.row.value["$_#_@_id"];
            var detailfun = "data-bind=click:detailShow.bind($data," + rowId + ")";
            obj.element.innerHTML =
                '<a href="#" class="ui-a-detail" ' +
                detailfun +
                ">" +
                obj.value +
                "</a>";
            ko.cleanNode(obj.element);
            ko.applyBindings(viewModel, obj.element);
        },
        approveRender: function (params) {
            var value = params.value;
            value += "";
            var showName = "";
            if (value == "0" || value == "2") {
                showName = "未审核";
            } else if (value == "1") {
                showName = "已审核";
            }
            params.element.innerHTML = showName;
        },
        precision2Render: function (obj) {
            var value = new u.NumberFormater(2).format(parseFloat(obj.value));
            obj.element.innerHTML = value;
        },
        precision3Render: function (obj) {
            var value = new u.NumberFormater(3).format(parseFloat(obj.value));
            obj.element.innerHTML = value;
        },
        precisionHandle: function (reffield, refprecision) {
            var value, precision;
            if (ko.isObservable(reffield)) {
                value = reffield();
            } else {
                value = reffield;
            }
            if (ko.isObservable(refprecision)) {
                precision = refprecision();
            } else if (u.isNumber(refprecision)) {
                precision = refprecision;
            } else {
                precision = 2;
            }
            value = new u.NumberFormater(precision).format(parseFloat(value));
            return value;
        }
    };
    // 公共renderType放置到window下
    for (var key in Common.rendertype) {
        window[key] = Common.rendertype[key];
    }

    // 审批功能封装
    Common.approve = {
        // 审批流参数验证
        /*
            tipMsg       : 确认提示语
            key          : 流程定义key
            bussinessNo  ：业务ID
            comment      : 单据名称
            dataTable    : 数据对象
            doAction     : 审批动作: submit 提交, recycling 回收, approve 审批, approveReject 驳回, approvePass 审批通过, history 历史记录
        */
        do: function (v, condMap) {
            var aaa = u.isArray(condMap);
            var bbb = typeof condMap;
            var ccc = condMap;

            if (!u.isArray(condMap) || typeof condMap === "undefined" || condMap === null || condMap === "") {
                toastr.warning("数据类型错误!");
                return
            }
            // key 为空 肯定模板没有配置或者没有找到 单独提示处理
            if (typeof condMap["key"] == "undefined" || condMap["key"] == "" || condMap["key"] == null) {
                toastr.warning("审批模板配置异常或模板未配置!");
                return
            }

            // key 格式处理
            condMap["key"] = $.trim(condMap["key"]);

            // 验证动作
            if (typeof condMap["doAction"] == "undefined" || condMap["doAction"] == "" || condMap["doAction"] == null) {
                toastr.warning("审批动作不能为空!");
                return
            }
            // 验证 id billCode
            if (
                typeof condMap["bussinessNo"] == "undefined" || condMap["bussinessNo"] == "" || condMap["bussinessNo"] == null
                || typeof condMap["bussinessBillNo"] == "undefined" || condMap["bussinessBillNo"] == "" || condMap["bussinessBillNo"] == null
            ) {
                toastr.warning("单据ID,单据编码 参数不全，请检查！");
                return
            }
            var act = condMap["doAction"];
            switch (act) {
                case "submit":
                    if (
                        typeof condMap["tipMsg"] == "undefined" || condMap["tipMsg"] == ""
                        || typeof condMap["comment"] == "undefined" || condMap["comment"] == ""
                        || typeof condMap["dataTable"] == "undefined" || condMap["dataTable"] == ""
                    ) {
                        toastr.warning("参数不全，请参考提示！");
                    }

                    this.submit(v, condMap); // 提交
                    break;
                case "recycling":
                    if (
                        typeof condMap["tipMsg"] == "undefined" || condMap["tipMsg"] == ""
                        || typeof condMap["type"] == "undefined" || condMap["type"] == ""
                    ) {
                        toastr.warning("参数不全，请参考提示！");
                    }
                    this.recycling(v, condMap); // 回收
                    break;
                case "approve": // 未写完
                    if (
                        typeof condMap["dataTable"] == "undefined" || condMap["dataTable"] == ""
                    ) {
                        toastr.warning("参数不全，请参考提示！");
                    }
                    this.approve(v, condMap); // 审批
                    break;

                case "approvePass":

                    this.approvePass(v, condMap); // 审批通过
                    break;


                case "approveReject":

                    this.approveReject(v, condMap); // 驳回
                    break;

                case "history":
                    this.history(v, condMap);
                    break;

                default:
                    break;
            }
        },

        //加载条
        loading: function onLoading() {
            var centerContent = '';
            var opt1 = {
                hasback: true,
                hasDesc: true,//是否含有加载内容描述
                centerContent: centerContent
            };
            u.showLoader(opt1);
        },

        //关闭加载条
        closeLoading: function onCloseLoading() {
            u.hideLoader();
        },

        // 审批单据提交
        submit: function (v, condMap) {
            var viewModel = v;//viewModel对象
            var datatable = condMap["dataTable"];
            var tipMsg = condMap["tipMsg"];
            var key = condMap["key"];
            var bussinessNo = condMap["bussinessNo"];
            var bussinessBillNo = condMap["bussinessBillNo"];
            var comment = condMap["comment"];
            var id = bussinessNo;
            var confirm = condMap["confirm"];

            // 默认是 true
            if (!confirm) {
                var data = {};
                data.processDefinitionkey = key;
                data.bussinessNo = bussinessNo;
                data.bussinessBillNo = bussinessBillNo;
                data.comment = comment;
                // 直接提交 已经确认
                $._ajax({
                    url: "/fmcg-bpm/bpm/cloud/manager/oper/start",
                    type: "post",
                    data: JSON.stringify(data),
                    //async: false,
                    contentType: "application/json; charset=utf-8",
                    success: function (data) {
                        if (data && data.success == '1') {
                            toastr.success("操作成功");
                        } else {
                            toastr.warning(data.msg);
                        }

                        if (condMap["reflash"] == true) {
                            viewModel.reflash(bussinessNo);
                        }
                        viewModel.search();
                    }
                });
            } else {
                Common.dialog.confirmDialog({
                    msg1: tipMsg,
                    msg2: '请谨慎操作',
                    width: '400px',
                    type: 'warning',
                    onOk: function () {
                        $(".u-msg-dialog-top").hide();
                        $(".u-overlay").hide();
                        Common.approve.loading();

                        var data = {}
                        data.processDefinitionkey = key;
                        data.bussinessNo = bussinessNo;
                        data.bussinessBillNo = bussinessBillNo;
                        data.comment = comment;
                        $._ajax({
                            url: "/fmcg-bpm/bpm/cloud/manager/oper/start",
                            type: "post",
                            data: JSON.stringify(data),
                            // async: false,
                            contentType: "application/json; charset=utf-8",
                            success: function (data) {
                                Common.approve.closeLoading();
                                if (data && data.success == '1') {
                                    toastr.success("操作成功");
                                } else {
                                    toastr.warning(data.msg);
                                }

                                if (condMap["reflash"] == true) {
                                    viewModel.reflash(bussinessNo);
                                }
                                viewModel.search();
                            }
                        });
                    }
                });
            }


        },

        // 回收单据 tipMsg
        // 流程收回，我发起的未审批完成的时候使用 type = 1
        // 流程收回，我待办的已审批完成的时候使用 type = 2
        recycling: function (v, condMap) {
            var datatable = condMap["dataTable"];
            var viewModel = v;//viewModel对象
            var tipMsg = condMap["tipMsg"];
            var key = condMap["key"];
            var bussinessNo = condMap["bussinessNo"];
            var bussinessBillNo = condMap["bussinessBillNo"];
            // var comment = condMap["comment"];
            // var row = viewModel[datatable].getCurrentRow();
            // var index = viewModel[datatable].getFocusIndex();
            var baurl = "";
            if (condMap["type"] == "1") {
                baurl = "/fmcg-bpm/bpm/cloud/manager/oper/process/withdraw";
            } else {
                baurl = "/fmcg-bpm/bpm/cloud/manager/oper/task/withdraw";
            }

            // var id = row.getValue("id");
            Common.dialog.confirmDialog({
                msg1: tipMsg,
                msg2: '请谨慎操作',
                width: '400px',
                type: 'warning',
                onOk: function () {
                    $(".u-msg-dialog-top").hide();
                    $(".u-overlay").hide();
                    Common.approve.loading();

                    var data = {}
                    data.processDefinitionkey = key;
                    data.bussinessNo = bussinessNo;
                    $._ajax({
                        url: baurl,
                        type: "post",
                        data: JSON.stringify(data),
                        //async: false,
                        contentType: "application/json; charset=utf-8",
                        success: function (data) {
                            Common.approve.closeLoading();
                            if (data && data.success == '1') {

                                toastr.success("操作成功");
                                if (condMap["reflash"] == true) {
                                    viewModel.reflash(bussinessNo);
                                }
                                viewModel.search();
                            } else {
                                toastr.warning(data.msg);
                            }


                        }
                    });
                }
            });
        },

        // 审批
        approve: function (v, condMap) {
            var viewModel = v;//viewModel对象
            var datatable = condMap["dataTable"];
            // var tipMsg = condMap["tipMsg"];
            var key = condMap["key"];
            var bussinessNo = condMap["bussinessNo"];
            var bussinessBillNo = condMap["bussinessBillNo"];
            // var comment = condMap["comment"];
            var qrydata = {};
            qrydata.processDefinitionkey = key;
            qrydata.bussinessNo = bussinessNo;
            $._ajax({
                url: "/fmcg-bpm/bpm/cloud/manager/oper/task/allow",
                type: "post",
                data: JSON.stringify(qrydata),
                contentType: "application/json; charset=utf-8",
                async: false,
                success: function (data) {
                    if (data && data.success == '1') {
                        viewModel.ApproveInfoData.removeAllRows();
                        viewModel.ApproveInfoData.createEmptyRow();
                        viewModel.ApproveInfoData.setValue("bussinessNo", bussinessNo);
                        viewModel.ApproveInfoData.setValue("processDefinitionkey", key);
                        viewModel.approveDialog = u.dialog({
                            content: "#approveinfo",
                            width: "350px",
                            height: "240px",
                        });
                        $('#approveinfo').find('.red-border').removeClass('red-border');
                    } else {
                        toastr.warning(data.msg);
                    }
                }
            });
        },

        checkApprove: function (processDefinitionkey, bussinessNo) {
            var qrydata = {};
            qrydata.processDefinitionkey = processDefinitionkey;
            qrydata.bussinessNo = bussinessNo;
            $._ajax({
                url: "/fmcg-bpm/bpm/cloud/manager/oper/task/allow",
                type: "post",
                data: JSON.stringify(qrydata),
                contentType: "application/json; charset=utf-8",
                async: false,
                success: function (data) {
                    if (data && data.success == '1') {
                        return true;
                    } else {
                        toastr.warning(data.msg);
                        return false;
                    }
                }
            });
        },

        // 驳回 comment 固定 key , bussinessNo
        approveReject: function (v, condMap) {
            var viewModel = v;//viewModel对象
            // var datatable = condMap["dataTable"];
            // var tipMsg = condMap["tipMsg"];
            var key = condMap["key"];
            var bussinessNo = condMap["bussinessNo"];
            var bussinessBillNo = condMap["bussinessBillNo"];
            var comment = condMap["comment"];
            // var row = viewModel[datatable].getCurrentRow();

            // var result = common.validate.validate($('#approveinfo')[0]);
            // if(!result.passed) {
            //     return false;
            // }

            var con = {};
            con.comment = comment;
            con.bussinessNo = bussinessNo;
            con.processDefinitionkey = key;

            $._ajax({
                url: "/fmcg-bpm/bpm/cloud/manager/oper/task/rejectToInitial",
                type: "post",
                data: JSON.stringify(con, ['bussinessNo', 'processDefinitionkey', 'comment']),
                contentType: "application/json; charset=utf-8",
                //async: false,
                success: function (data) {
                    if (data && data.success == '1') {
                        toastr.success("操作成功");
                        viewModel.approveDialog.hide();

                        if (condMap["reflash"] == true) {
                            viewModel.reflash(bussinessNo);
                        }
                        viewModel.search();
                    } else {
                        toastr.warning(data.msg);
                    }
                }
            });

        },

        // 审批通过 comment 必填  bussinessNo,key 全局
        approvePass: function (v, condMap) {
            // var datatable = condMap["dataTable"];
            // var tipMsg = condMap["tipMsg"];
            var viewModel = v;//viewModel对象
            var key = condMap["key"];
            var bussinessNo = condMap["bussinessNo"];
            var bussinessBillNo = condMap["bussinessBillNo"];
            approveData = viewModel.ApproveInfoData.getSimpleData();
            var comment = approveData[0].comment;

            var con = {};
            con.comment = comment;
            con.bussinessNo = bussinessNo;
            con.processDefinitionkey = key;

            con.agree = "true";
            $._ajax({
                url: "/fmcg-bpm/bpm/cloud/manager/oper/task/complete",
                type: "post",
                data: JSON.stringify(con, ['bussinessNo', 'processDefinitionkey', 'agree', 'comment']),
                contentType: "application/json; charset=utf-8",
                //async: false,
                success: function (data) {
                    if (data && data.success == '1') {
                        toastr.success("操作成功");
                        viewModel.approveDialog.hide();
                        if (condMap["reflash"] == true) {
                            viewModel.reflash(bussinessNo);
                        }
                        viewModel.search();
                    } else {
                        toastr.warning(data.msg);
                    }
                }
            });

        },

        // 历史记录       no,key 全局变量
        history: function (v, condMap) {
            var viewModel = v;//viewModel对象
            var datatable = condMap["dataTable"];
            // var tipMsg = condMap["tipMsg"];
            var key = condMap["key"];
            var bussinessNo = condMap["bussinessNo"];
            var bussinessBillNo = condMap["bussinessBillNo"];
            // var comment = condMap["comment"];
            // var row = viewModel[datatable].getCurrentRow();

            // var id = row.getValue("id");
            var con = {};
            con.bussinessNo = bussinessNo;
            con.processDefinitionKey = key;
            $._ajax({
                url: "/fmcg-bpm/bpm/cloud/manager/history/trace",
                type: "post",
                data: JSON.stringify(con),
                //async: false,
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    // cuiwl 为流程历史第一条增加申请状态
                    if (data && data.length > 0) {
                        var applydata = data[data.length - 1];
                        if (applydata && applydata.processInstanceId) {
                            applydata.deleteReason = 'apply';
                        }
                    }
                    viewModel.ApproveHistoryList.setSimpleData(data, { unSelect: false });
                }
            });
            viewModel.approveHistory = u.dialog({
                content: "#approvehistory",
                width: "800px",
                height: "500px",
            });
        },
    };

    Common.dialog = {
        confirmDialogTemplate:
            '<div class="u-msg-dialog-top" id="{id}_top">' +
            '<div class="u-msg-dialog ui-msg-dialog" style="{width}{height}{top}">' +
            '<div class="u-msg-dialog-content">' +
            '<div class="u-msg-content">' +
            "</div>" +
            '<div class="u-msg-footer">' +
            '<a class="u-msg-cancel ui-btn">{cancelText}</a><a class="u-msg-ok ui-btn ui-btn-primary margin-right-5">{okText}</a></div>' +
            "</div>" +
            "</div></div>",
        generatecontent: function (icon, msg1, msg2) {
            var htmlstr =
                '<div class="ui-msgdialog-box">' +
                '<div class="ui-msgdialog-innerbox">' +
                '<i class="ui-msgdialog-icon ' +
                icon +
                '"></i>' +
                "</div>" +
                '<div class="ui-msgdialog-innerbox">' +
                '<p class="ui-msgdialog-msg-main">' +
                msg1 +
                "</p>" +
                '<p class="ui-msgdialog-msg-assist">' +
                msg2 +
                "</p>" +
                "</div>" +
                "</div> ";
            return htmlstr;
        },
        confirmDialog: function (option) {
            // debugger
            var icon =
                option.type == "error"
                    ? "uifont icon-tubiao-shibai font-c-red"
                    : "uifont icon-tubiao-jingshi font-c-yellow";
            if (option.icon) {
                icon = option.icon;
            }
            var content =
                typeof option.msg == "undefined"
                    ? this.generatecontent(icon, option.msg1, option.msg2)
                    : option.msg;
            var customOptions = {
                msg: content,
                template: this.confirmDialogTemplate,
                title: option.title,
                width: option.width,
                // top: option.top,
                // height: option.height,
                onOk: option.onOk
            };
            if (option.onCancel) {
                customOptions.onCancel = option.onCancel;
            }
            u.confirmDialog(customOptions);
        }
    };

    Common.metautils = {
        metaHandle: function (meta, option, busimeta, filter) {
            if (option.key) {
                switch (option.type) {
                    case "range":
                        meta[option.keyStart] = {
                            type: "string"
                        };
                        meta[option.keyEnd] = {
                            type: "string"
                        };
                        break;
                    case "refer":
                        meta[option.key] = {
                            refmodel: JSON.stringify(refinfo[option.refinfo])
                        };
                        //重构refcfg
                        var refcfg = {
                            ctx: "/uitemplate_web"
                        };
                        if (option.multi) refcfg.isMultiSelectedEnabled = true;
                        if (option.refCode) refcfg.refCode = option.refCode;
                        if (option.refName) refcfg.refName = option.refName;
                        if (option.isReturnCode) refcfg.isReturnCode = option.isReturnCode;
                        if (option.refcfg) u.extend(refcfg, option.refcfg);

                        meta[option.key]["refcfg"] = JSON.stringify(refcfg);


                        if (typeof option.autoValue != "undefined" && option.autoValue == true) {

                            var fieldId = option.key;
                            var fieldStr = fieldId.substring(0, fieldId.length - 2);
                            var fieldName = fieldStr + "Name";
                            var fieldCode = fieldStr + "Code";

                            meta[fieldCode] = {
                                type: "string"
                            };

                            meta[fieldName] = {
                                type: "string"
                            };

                            meta.autoValue = {
                                type: "string"
                            };
                        }

                        //判断是否有显示字段
                        if (option.keyfordisplay)
                            meta[option.keyfordisplay] = {
                                type: "string"
                            };
                        // 处理过滤参数

                        // 人员档案处理过滤参数
                        if (option.refinfo == "personext" || option.refinfo == "persons" || option.refinfo == "person") {
                            filter = true;
                        }

                        if (filter) {
                            //需要过滤已停用的档案
                            var refparam = {
                                EQ_isEnable: "1"
                            };
                            if (option.clientParam || option.refparam) {
                                u.extend(refparam, option.clientParam, option.refparam);
                            }
                            meta[option.key]["refparam"] = JSON.stringify(refparam);
                        } else {
                            //搜索中不主动过滤已停用的档案
                            if (option.clientParam || option.refparam) {
                                meta[option.key]["refparam"] = JSON.stringify(
                                    option.clientParam || option.refparam
                                );
                            }
                        }
                        break;
                    default:
                        meta[option.key] = {
                            type: "string"
                        };
                }
                // 处理默认值
                if (option.defaultvalue != undefined) {
                    meta[option.key].default = option.defaultvalue;
                }
                //处理必输
                if (option.required) {
                    meta[option.key].required = true;
                }
                // 处理在编辑中不能修改的字段 暂不需要
                if (option.disableInEdit) {
                    meta[option.key].disableInEdit = true;
                }

                //用业务元数据补充自定义组件的元数据,主要为默认值
                if (busimeta) {
                    meta[option.key] = u.extend({}, meta[option.key], busimeta);
                }
            }
        },
        optionHandle: function (option, dataTable) {
            // debugger
            var newoption = {};
            var label = option.label,
                meta,
                content;
            if (typeof dataTable != "string") dataTable = "params";
            switch (option.type) {
                case "radio":
                    meta = {
                        type: "u-radio",
                        data: dataTable,
                        field: option.key,
                        datasource: option.key + "sourceData"
                    };
                    if (option.enable === false) {
                        meta["enable"] = option.enable + "";
                    }
                    content =
                        '<label  class="u-radio margin-right-15" >' +
                        '<input type="radio" class="u-radio-button" name="' +
                        option.key +
                        '">' +
                        '<span class="u-radio-label"></span>' +
                        "</label>";
                    break;
                case "checkbox":
                    if (option.multi) {
                        content = "";
                        var keyArray = option.keyArray;
                        for (var i = 0; i < keyArray.length; i++) {
                            var checkedValue =
                                keyArray[i].checkedValue == undefined
                                    ? option.checkedValue
                                    : keyArray[i].checkedValue;
                            var unCheckedValue =
                                keyArray[i].unCheckedValue == undefined
                                    ? option.unCheckedValue
                                    : keyArray[i].unCheckedValue;
                            var labelCls = keyArray[i].labelCls ? keyArray[i].labelCls : "";
                            var tempMeta = {
                                type: "u-checkbox",
                                data: dataTable,
                                field: keyArray[i].key,
                                checkedValue: checkedValue,
                                unCheckedValue: unCheckedValue
                            };
                            if (option.enable === false) {
                                tempMeta["enable"] = option.enable + "";
                            }
                            content +=
                                '<label class="u-checkbox margin-right-20 ' +
                                labelCls +
                                "\" u-meta='" +
                                JSON.stringify(tempMeta) +
                                "'>" +
                                '<input type="checkbox" class="u-checkbox-input">' +
                                '<span class="u-checkbox-label">' +
                                keyArray[i].label +
                                "</span>" +
                                "</label>";
                        }
                        if (option.requiredOne) {
                            var validateMeta = {
                                type: "u-text",
                                data: dataTable,
                                field: option.key
                            };
                            content +=
                                '<div class="ui-inputarea" style="position:absolute;left:0;" u-meta=\'' +
                                JSON.stringify(validateMeta) +
                                "'>" +
                                '<input class="J-requiredone" style="opacity:0;" disabled="disabled"/></div>';
                        }
                    } else {
                        tempMeta = {
                            type: "u-checkbox",
                            data: dataTable,
                            field: option.key,
                            checkedValue: option.checkedValue,
                            unCheckedValue: option.unCheckedValue
                        };
                        if (option.enable === false) {
                            tempMeta["enable"] = option.enable + "";
                        }
                        content =
                            '<label class="u-checkbox h28 labelhidden" u-meta=\'' +
                            JSON.stringify(tempMeta) +
                            "'>" +
                            '<input type="checkbox" class="u-checkbox-input">' +
                            '<span class="u-checkbox-label" data-role="name"></span>' +
                            "</label>";
                    }
                    break;
                case "checkboxlist":
                    meta = {
                        type: "u-checkbox",
                        data: dataTable,
                        field: option.key,
                        datasource: option.key + "sourceData"
                    };
                    content =
                        '<label class="u-checkbox margin-right-10">' +
                        '<input type="checkbox" class="u-checkbox-input">' +
                        '<span class="u-checkbox-label" data-role="name"></span>';
                    "</label>";
                    break;
                case "combo":
                    meta = {
                        type: "u-combobox",
                        data: dataTable,
                        field: option.key,
                        mutil: option.multi,
                        datasource: option.key + "sourceData",
                        showFix: true
                    };
                    if (option.onlySelect) {
                        meta["onlySelect"] = option.onlySelect;
                    }
                    content =
                        "<input placeholder=" + option.label + " />" +
                        '<span class="ui-icon uf uf-arrow-down" data-role="combo-button"></span>';
                    break;
                case "datetime":
                    meta = {
                        type: "u-datetime",
                        data: dataTable,
                        field: option.key
                    };
                    if (option.disabledDate) {
                        meta["disabledDate"] = option.key + "disabledDate";
                    }
                    content =
                        "<input placeholder=" + option.label + " />" + '<span class="ui-icon uf uf-calendar"></span>';
                    break;
                case "date":
                    meta = {
                        type: "u-date",
                        data: dataTable,
                        field: option.key,
                        format: "YYYY-MM-DD"
                    };
                    if (option.disabledDate) {
                        meta["disabledDate"] = option.key + "disabledDate";
                    }
                    content =
                        "<input placeholder=" + option.label + " />" + '<span class="ui-icon uf uf-calendar"></span>';
                    break;

                case "time":
                    meta = {
                        type: "u-time",
                        data: dataTable,
                        field: option.key,
                        format: "hh:mm.SSSZ"
                    };
                    if (option.disabledDate) {
                        meta["disabledDate"] = option.key + "disabledDate";
                    }
                    content =
                        "<input placeholder=" + option.label + " />" + '<span class="ui-icon uf uf-calendar"></span>';
                    break;

                case "year":
                    meta = {
                        type: "u-year",
                        data: dataTable,
                        field: option.key,
                    };
                    if (option.disabledDate) {
                        meta["disabledDate"] = option.key + "disabledDate";
                    }
                    content =
                        "<input placeholder=" + option.label + " />" + '<span class="ui-icon uf uf-calendar"></span>';
                    break;
                case "yearmonth":
                    meta = {
                        type: "u-yearmonth",
                        data: dataTable,
                        field: option.key,
                    };
                    if (option.disabledDate) {
                        meta["disabledDate"] = option.key + "disabledDate";
                    }
                    content =
                        "<input placeholder=" + option.label + " />" + '<span class="ui-icon uf uf-calendar"></span>';
                    break;
                case "daterange":
                    meta = {
                        type: "u-date",
                        data: dataTable,
                        field: option.key,
                        format: "YYYY-MM-DD",
                        rangeFlag: true
                    };
                    if (option.placeholder) {
                        meta["placeholder"] = option.placeholder;
                    }
                    content = "<input />";
                    break;
                case "range":
                    var meta1, meta2;
                    meta1 = {
                        type: "u-text",
                        data: dataTable,
                        field: option.keyStart
                    };
                    meta2 = {
                        type: "u-text",
                        data: dataTable,
                        field: option.keyEnd
                    };
                    content =
                        "<input u-meta='" +
                        JSON.stringify(meta1) +
                        '\' style="width: 95px" />' +
                        " - " +
                        "<input u-meta='" +
                        JSON.stringify(meta2) +
                        '\' style="width: 95px" />';
                    break;
                case "refer":
                    meta = {
                        type: "uiRefer",
                        data: dataTable,
                        field: option.key
                    };
                    if (option.keyfordisplay) {
                        meta.display = option.keyfordisplay;
                    }

                    if (typeof option.autoValue != "undefined" && option.autoValue == true) {
                        var fieldId = option.key;
                        var fieldStr = fieldId.substring(0, fieldId.length - 2);
                        var fieldName = fieldStr + "Name";
                        var fieldCode = fieldStr + "Code";
                        meta[fieldCode] = fieldCode;
                        meta[fieldName] = fieldName;

                        meta.autoValue = true;
                    }

                    if (option.rel) {
                        meta.rel = option.rel;
                    }
                    var inputId = option.referId
                        ? option.referId
                        : option.key + new Date().getTime();
                    var disabled = option.disabled ? 'disabled="disabled"' : '';
                    content =
                        '<input placeholder=' + option.label + ' id="' +
                        inputId +
                        '" readonly="readonly" autocomplete="off" ' + disabled + ' />' +
                        '<span class="ui-icon uifont icon-bar refer"></span>';
                    break;
                case "textarea":
                    var tempMeta = {
                        type: "textarea",
                        data: dataTable,
                        field: option.key
                    };
                    if (option.enable === false) {
                        tempMeta["enable"] = option.enable + "";
                    }
                    content =
                        '<textarea  style="resize: none" u-meta=\'' +
                        JSON.stringify(tempMeta) +
                        "'>" +
                        "</textarea>";
                    break;
                case "label":
                    var tempMeta = JSON.stringify({
                        type: "oc-labelwithsource",
                        data: dataTable,
                        field: option.key,
                        datasource: CONST.ENABLESTATUS,
                        defaultvalue: option.defaultvalue
                    });
                    content = "<label u-meta='" + tempMeta + "'></label>";
                    break;
                case "textreadonly":
                    var tempMeta = JSON.stringify({
                        type: "oc-label",
                        data: dataTable,
                        field: option.key
                    });
                    content = "<label u-meta='" + tempMeta + "'></label>";
                    break;
                case 'integer':
                    meta = {
                        type: "integer",
                        data: dataTable,
                        field: option.key
                    };
                    if (option.validType) {
                        meta.validType = option.validType;
                    }
                    content = "<input />";
                    break;
                case 'float':
                    meta = {
                        type: "float",
                        data: dataTable,
                        field: option.key,
                        precision: option.precision,
                    };
                    if (option.validType) {
                        meta.validType = option.validType;
                    }
                    content = "<input />";
                    break;
                case 'phone':
                    meta = {
                        type: "phoneNumber",
                        data: dataTable,
                        field: option.key,
                    };
                    if (option.validType) {
                        meta.validType = option.validType;
                    }
                    content = "<input />";
                    break;
                default:
                    meta = {
                        type: "u-text",
                        data: dataTable,
                        field: option.key
                    };
                    if (option.validType) {
                        meta.validType = option.validType;
                    }
                    if (option.enable === false) {
                        meta["enable"] = option.enable + "";
                    }
                    content = "<input placeholder=" + option.label + " />";
            }

            //处理uui组件的meta字符串，为每个组件添加随机数id
            if (meta == undefined) {
                newoption.meta = "";
            } else {
                if (option.compid == undefined) {
                    meta.id = new Date().getTime();
                } else {
                    meta.id = option.compid;
                }
                newoption.meta = "u-meta='" + JSON.stringify(meta) + "'";
            }
            // 处理整体输入项的class，以方便个性化字段
            if (option.cls == undefined) {
                newoption.cls = "";
            } else {
                newoption.cls = option.cls;
            }
            // 处理输入项上关于输入项label的class
            if (option.labelcls == undefined) {
                newoption.labelcls = "";
            } else {
                newoption.labelcls = option.labelcls;
            }
            // 处理输入项上关于输入的class
            if (option.inputCls == undefined) {
                newoption.inputCls = "";
            } else {
                newoption.inputCls = option.inputCls;
            }
            //处理必输项红色星号
            if (option.required) {
                label = "<span class='ui-redstar'>*</span>" + label;
            }
            // 添加元素id方便数据联动
            if (option.domid) {
                newoption.domid = option.domid;
            }
            //处理编辑态不可编辑的数据
            if (option.disableInEdit) {
                var showfield = option.key;
                if (option.keyfordisplay) {
                    showfield = option.keyfordisplay;
                }
                var tempMeta = JSON.stringify({
                    type: "oc-label",
                    data: dataTable,
                    field: showfield
                });
                content +=
                    '<label style="display:none" class="J-editcard-text" u-meta=\'' +
                    tempMeta +
                    "'></label>";
            }

            newoption.label = label;
            newoption.content = content;

            return newoption;
        },
        urlHandle: function (urls, viewModel) {
            var url, comboarr;
            if (u.isArray(urls) && urls.length > 0) {
                this.loopajax(urls.length - 1, urls, viewModel);
            }
            return;
        },
        loopajax: function (index, urls, viewModel) {
            if (index < 0) {
                return;
            }
            var self = this;
            var url = urls[index].url;
            var comboarr = urls[index].comboarr;
            var namefield = urls[index].namefield;
            var valuefield = urls[index].valuefield;
            var hasAll = urls[index].hasAll;

            $._ajax({
                type: "get",
                dataType: "json",
                url: url,
                async: false,
                complete: function () {
                    setTimeout("u.hideLoader({hasback:true});", 200);
                    index--;
                    self.loopajax(index, urls, viewModel);
                },
                success: function (data) {
                    var tempcombodata = self.toMap(data, namefield, valuefield);
                    if (hasAll) {
                        tempcombodata.unshift({
                            name: "全部",
                            value: ""
                        });
                    }
                    viewModel[comboarr](tempcombodata);
                }
            });
        },
        toMap: function (array, nameField, valueField) {
            var results = [];
            if (u.isArray(array) && array.length > 0) {
                for (var i = 0; i < array.length; i++) {
                    var result = {};
                    result.name = array[i][nameField];
                    result.value = array[i][valueField];
                    results.push(result);
                }
            }
            return results;
        }
    };
    Common.bill = {
        //跳转单据页
        goBillPanel: function () {
            // $(".ui-list-panel").hide();
            $(".ui-panel").hide();
            $(".ui-bill-panel").show();
            $(".ui-bill-panel").animateCss("fadeIn");
        },
        //返回列表页
        retListPanel: function () {
            // $(".ui-bill-panel").hide();
            // $(".ui-bill-detail").hide();
            $(".ui-panel").hide();
            $(".ui-list-panel").show();
            $(".ui-list-panel").animateCss("fadeIn");

            $("#simpleview").show();
            $(".iframeaa").remove();
            $("#outerDetails").hide();
        },
        //跳转详情页
        goDetailPanel: function () {
            // $(".ui-list-panel").hide();
            $(".ui-panel").hide();
            $(".ui-bill-detail").show();
            $(".ui-bill-detail").animateCss("fadeIn");
        },
        //跳转详情弹出页
        goDetailPanelDaiolg: function () {

        },
        //详情跳转单据页
        detail2bill: function () {
            // $(".ui-bill-detail").hide();
            $(".ui-panel").hide();
            $(".ui-bill-panel").show();
            $(".ui-bill-panel").animateCss("fadeIn");
        },
        //跳转图片维护页
        goPicPanel: function () {
            $(".ui-panel").hide();
            $(".ui-bill-pic").show();
            $(".ui-bill-pic").animateCss("fadeIn");
        },
        //图片也跳转列表
        goPicPanelbill: function () {
            $(".ui-bill-pic").hide();
            $(".ui-panel").show();
            $(".ui-panel").animateCss("fadeIn");
        },
        //跳转搭配关系维护页
        goMatchPanel: function () {
            $(".ui-bill-detail").hide();
            $(".ui-bill-match").show();
            $(".ui-bill-match").animateCss("fadeIn");
        }
    };
    Common.format = {
        // 日期格式化
        dateFormat: function (dataTable, field) {
            var dateLong = this[dataTable].ref(field)();
            var dateStr = u.date.format(dateLong, "YYYY年MM月DD日");
            return dateStr;
        },
        // 审核状态格式化
        approveFormat: function (dataTable, field) {
            var value = this[dataTable].ref(field)();
            value = parseInt(value);
            var showName = "";
            if (u.isNumber(value)) {
                for (var i = 0; i < CONST.APPROVE.length; i++) {
                    if (CONST.APPROVE[i].value === value) {
                        showName = CONST.APPROVE[i].name;
                        break;
                    }
                }
            }
            return showName;
        },
        // 启用状态格式化
        enableFormat: function (dataTable, field) {
            var value = this[dataTable].ref(field)();
            value = parseInt(value);
            var showName = "";
            if (u.isNumber(value)) {
                for (var i = 0; i < CONST.ENABLESTATUS.length; i++) {
                    if (CONST.ENABLESTATUS[i].value === value) {
                        showName = CONST.ENABLESTATUS[i].name;
                        break;
                    }
                }
            }
            return showName;
        },
        // 是否格式化
        whetherFormat: function (dataTable, field) {
            var value = this[dataTable].ref(field)();
            value = parseInt(value);
            var showName = "";
            if (u.isNumber(value)) {
                for (var i = 0; i < CONST.WHETHER.length; i++) {
                    if (CONST.WHETHER[i].value === value) {
                        showName = CONST.WHETHER[i].name;
                        break;
                    }
                }
            }
            return showName;
        },
        // 销售主体格式化
        saleEntityFormat: function (dataTable, field) {
            var value = this[dataTable].ref(field)();
            var showName = "";
            for (var i = 0; i < CONST.SALEENTITY.length; i++) {
                if (CONST.SALEENTITY[i].value == value) {
                    showName = CONST.SALEENTITY[i].name;
                    break;
                }
            }
            return showName;
        }
    };


    Common.fileHandle = {
        importToPage: function (importUrl, element, callback) {
            var importHtml =
                '<div id="dialog_content_import" class="import-box" style="display:none;">' +
                '<div class="u-msg-title">' +
                "<h4>导入</h4>" +
                "</div>" +
                '<div class="u-msg-content">' +
                '<div class="ui-panel-head ui-bill-head">' +
                '<div class="ui-item">' +
                '<form id="uploadForm" enctype="multipart/form-data">' +
                '<a class="ui-btn ui-btn-green importBtn">选择文件' +
                '<input id="token" type="hidden" name="token" value="' + localStorage.getItem("token") + '"/>' +//导入增加TOKEN参数
                '<input id="file" type="file" name="file" class="importFile"/>' +
                "</a>" +
                "</form>" +
                '<span id="fileName" class="fileName">上传的文件信息</span>' +
                "</div>" +
                '<div class="ui-item begin" style="display:none;">' +
                '<a class="u-msg-up ui-btn ui-btn-green">开始上传</a>' +
                '<div class="progress-box">' +
                '<div class="progress-bar" id="progress-bar"></div>' +
                '<span class="tip-txt" id="tip-txt">正在解析中</span>' +
                "</div>" +
                '<span class="progress-percent margin-left-15" id="progress-percent"></span>' +
                '<div class="clearfix"></div>' +
                "</div>" +
                "</div>" +
                '<div class="info-area" id="info-area">' +
                '<div class="import-info margin-top-15">执行信息:</div>' +
                '<ul class="error-list margin-top-10" id="error-list"></ul>' +
                "</div>" +
                "</div>" +
                '<div class="u-msg-footer">' +
                '<a class="u-msg-cancel ui-btn ui-btn-primary margin-right-5">取消</a>' +
                '<a class="u-msg-ok ui-btn ui-btn-green">完成</a>' +
                "</div>" +
                "</div>";
            $(element).empty();
            $(element).append($(importHtml));
            var importDialog = u.dialog({
                content: "#dialog_content_import",
                hasCloseMenu: true,
                width: "40%"
            });
            var $dialogEle = $(importDialog.contentDom);
            $dialogEle.find("#file").change(function () {
                var $element = $(importDialog.contentDom);
                var fileName = $element.find("#file")[0].files;
                var fileSize =
                    fileName[0].size > 1024 * 1024
                        ? Math.round(fileName[0].size / (1024 * 1024)) + "MB大小"
                        : Math.round(fileName[0].size / 1024) + "KB大小";
                $element
                    .find("#fileName")
                    .text("文件名:" + fileName[0].name + "  共:" + fileSize);
                $element.find(".ui-item.begin").show();
                $element.find("#progress-bar").css("width", "0%");
                $element.find("#info-area").hide(300);
                $element.find("#error-list").empty();
            });
            var upBtn = $("#dialog_content_import .u-msg-up");
            upBtn.unbind("click").click(function () {
                //导入
                importOk(importDialog);
            });
            var okButton = $("#dialog_content_import .u-msg-ok");
            okButton.unbind("click").click(function () {
                importDialog.close();
                $(".ui-item.begin").hide();
                $("#progress-bar").css("width", "0%");
                $("#progress-num").text("0%");
                $("#error-num").text(0);
                $("#total-num").text(0);
                $("#already-num").text(0);
            });
            var cancelButton = $("#dialog_content_import .u-msg-cancel");
            cancelButton.unbind("click").click(function () {
                importDialog.close();
                $(".ui-item.begin").hide();
                $("#progress-bar").css("width", "0%");
                $("#progress-num").text("0%");
                $("#error-num").text(0);
                $("#total-num").text(0);
                $("#already-num").text(0);
            });

            function importOk(importDialog) {
                var $element = $(importDialog.contentDom);
                $element.find("#tip-txt").show();
                $.ajax({
                    url: importUrl,
                    // url: appCtx + importUrl,
                    type: "POST",
                    cache: false,
                    data: new FormData($("#uploadForm")[0]),
                    processData: false,
                    contentType: false
                })
                    .done(function (res) {
                        $element.find("#tip-txt").hide(300);
                        $element.find("#error-list").empty();
                        if (res.success == "fail_global") {
                            $element.find("#info-area").show(300);
                            var errorItem = $('<li class="error-item"></li>');
                            errorItem.text("系统出现异常");
                            errorItem.css("color", "red");
                            errorItem.css("font-size", "14px");
                            $element.find("#error-list").append(errorItem);
                            return;
                        }
                        if (res.status == "failed") {
                            $element.find("#info-area").show(300);
                            var errorItem = $('<li class="error-item"></li>');
                            errorItem.text(res.msg);
                            errorItem.css("color", "red");
                            errorItem.css("font-size", "14px");
                            $element.find("#error-list").append(errorItem);
                            if (res.error && res.error.length > 0) {
                                for (var i = 0; i < res.error.length; i++) {
                                    var errorItem = $('<li class="error-item"></li>');
                                    errorItem.text(res.error[i]);
                                    $element.find("#error-list").append(errorItem);
                                }
                            }
                            return;
                        }
                        $element.find("#info-area").hide(300);
                        if (!res.data) {
                            res.data = [];
                        }
                        callback(res.data);
                        $element.find("#progress-bar").css("width", "100%");
                        $element
                            .find("#progress-percent")
                            .text("已上传")
                            .css("color", "#00936D");
                    })
                    .fail(function (res) {
                        //					toastr.error(res.msg);
                    });
            }
        },
        importFile: function (importUrl, importStatusUrl, element, hasModify, callback) {
            //导入
            var importmeta = {
                meta: {
                    isEdit: {
                        type: "string",
                        required: true
                    }
                }
            };
            var viewModel = {
                importData: new u.DataTable(importmeta),
                importTypeSrc: [
                    {
                        value: false,
                        name: "新增"
                    },
                    {
                        value: true,
                        name: "修改"
                    }
                ]
            };
            if (hasModify === 1) {
                viewModel.importTypeSrc = [
                    {
                        value: false,
                        name: "新增"
                    }
                ];
            }
            viewModel.importData.removeAllRows();
            viewModel.importData.createEmptyRow();
            viewModel.importData.setValue("isEdit", false);
            var importHtml =
                '<div id="dialog_content_import" class="import-box" style="display:none;">' +
                '<div class="u-msg-title">' +
                "<h4>导入</h4>" +
                "</div>" +
                '<div class="u-msg-content">' +
                '<div class="ui-panel-head ui-bill-head">' +
                '<div class="ui-item" style="float: none;">' +
                '<div class="ui-name" style="line-height: 28px; width:85px;">导入类型：</div>' +
                '<div class="ui-inputarea">' +
                '<div u-meta=\'{"type":"u-radio","data":"importData","field":"isEdit","datasource":"importTypeSrc"}\' id="importType">' +
                '<label  class="u-radio margin-right-10" >' +
                '<input type="radio" class="u-radio-button" name="importType">' +
                '<span class="u-radio-label"></span>' +
                "</label>" +
                "</div>" +
                "</div>" +
                "</div>" +
                '<div class="ui-item">' +
                '<form id="uploadForm" class="margin-left-25" enctype="multipart/form-data">' +
                '<input id="token" type="hidden" name="token" value="' + localStorage.getItem("token") + '"/>' +//导入增加TOKEN参数
                '<input id="importFileType" type="hidden" name="" value=""/>' +
                '<a class="ui-btn importBtn" style="border-radius: 20px;">选择文件' +
                '<input id="file" type="file" name="file" class="importFile"/>' +
                "</a>" +
                "</form>" +
                '<span id="fileName" class="fileName">上传的文件信息</span>' +
                "</div>" +
                '<div class="ui-item begin" style="display:none;">' +
                '<a class="u-msg-up ui-btn ui-btn-green">开始上传</a>' +
                '<div class="progress-box">' +
                '<div class="progress-bar" id="progress-bar"></div>' +
                '<span class="tip-txt" id="tip-txt">正在解析中</span>' +
                "</div>" +
                '<span class="progress-percent margin-left-15"><i class="num" id="progress-num">0%</i>已上传</span>' +
                "</div>" +
                '<div class="info-area" id="info-area">' +
                '<div class="import-info">' +
                // '<span class="progress-percent">解析状态:<i id="parse-status"></i></span>'+
                '<span class="progress-percent">总计条数:<i class="num" id="total-num">0</i></span>' +
                '<span class="progress-percent">已处理数:<i class="num" id="already-num">0</i></span>' +
                '<span class="progress-percent">错误条数:<i class="num" id="error-num">0</i></span>' +
                "</div>" +
                '<div class="import-info margin-top-15">执行信息:</div>' +
                '<ul class="error-list margin-top-10" id="error-list"></ul>' +
                "</div>" +
                '<div class="clearfix"></div>' +
                "</div>" +
                "</div>" +
                '<div class="u-msg-footer">' +
                '<a class="u-msg-cancel ui-btn margin-right-5">取消</a>' +
                '<a class="u-msg-ok ui-btn ui-btn-primary">完成</a>' +
                "</div>" +
                "</div>";
            $(element).empty();
            $(element).append($(importHtml));
            ko.cleanNode(element);
            var app = u.createApp({
                el: element,
                model: viewModel
            });
            $("#file").change(function () {
                var fileName = document.getElementById("file").files;
                var fileSize =
                    fileName[0].size > 1024 * 1024
                        ? Math.round(fileName[0].size / (1024 * 1024)) + "MB大小"
                        : Math.round(fileName[0].size / 1024) + "KB大小";
                $("#fileName").text("文件名:" + fileName[0].name + "  共:" + fileSize);
                $(".ui-item.begin").show();
                $("#progress-bar").css("width", "0%");
                $("#progress-num").text("0%");
                $("#error-num").text(0);
                $("#total-num").text(0);
                $("#already-num").text(0);
                $("#info-area").hide(300);
                $("#error-list").empty();
            });
            var importDialog = u.dialog({
                content: "#dialog_content_import",
                hasCloseMenu: true,
                width: "40%"
            });

            var upBtn = $("#dialog_content_import .u-msg-up");
            upBtn.unbind("click").click(function () {
                //导入
                importOk();
            });
            var okButton = $("#dialog_content_import .u-msg-ok");
            okButton.unbind("click").click(function () {
                importDialog.close();
                $(".ui-item.begin").hide();
                $("#progress-bar").css("width", "0%");
                $("#progress-num").text("0%");
                $("#error-num").text(0);
                $("#total-num").text(0);
                $("#already-num").text(0);
            });
            var cancelButton = $("#dialog_content_import .u-msg-cancel");
            cancelButton.unbind("click").click(function () {
                importDialog.close();
                $(".ui-item.begin").hide();
                $("#progress-bar").css("width", "0%");
                $("#progress-num").text("0%");
                $("#error-num").text(0);
                $("#total-num").text(0);
                $("#already-num").text(0);
            });

            function importOk() {
                var isEdit = viewModel.importData.getValue("isEdit");
                $("#importFileType").attr("name", "isEdit");
                $("#importFileType").attr("value", isEdit);
                $("#tip-txt").show();
                $.ajax({
                    url: importUrl,
                    // url: appCtx + importUrl,
                    type: "POST",
                    cache: false,
                    data: new FormData($("#uploadForm")[0]),
                    processData: false,
                    contentType: false
                })
                    .done(function (res) {
                        //        var newArr = res;
                        //
                        //        newArr.forEach(function (e,index) {
                        //
                        //        })
                        if (res.status == "failed") {
                            $(".ui-item.begin").hide(300);
                            $("#file").val("");
                            $("#info-area").show(300);
                            var errorItem = $('<li class="error-item"></li>');
                            errorItem.text(res.msg);
                            errorItem.css("color", "red");
                            errorItem.css("font-size", "14px");
                            $("#error-list").append(errorItem);
                            if (res.error && res.error.length > 0) {
                                for (var i = 0; i < res.error.length; i++) {
                                    var errorItem = $('<li class="error-item"></li>');
                                    errorItem.text(res.error[i]);
                                    $("#error-list").append(errorItem);
                                }
                            }
                            return;
                        }
                        if (res.status == "success") {
                            $("#tip-txt").hide();
                            $("#info-area").show(300);
                            var errorItem = $('<li class="error-item"></li>');
                            errorItem.text(res.msg);
                            errorItem.css("color", "green");
                            errorItem.css("font-size", "14px");
                            $("#error-list").append(errorItem);
                            var time = false;
                            var t;
                            var errorIndex = 0;
                            beginGet();

                            function beginGet() {
                                if (time) {
                                    clearTimeout(t);
                                    return;
                                }
                                getStatus();
                                t = setTimeout(beginGet, 5000);
                            }

                            function getStatus() {
                                $.ajax({
                                    url: importStatusUrl + "?token=" + localStorage.getItem("token"),
                                    // url: appCtx + importStatusUrl,
                                    type: "GET",
                                    contentType: false
                                })
                                    .done(function (res) {
                                        var loadingStatus = res.result.loadingStatus;
                                        var errorNum = res.result.errorNum;
                                        var totalNum = res.result.totalNum;
                                        var currentNum = res.result.currentNum;
                                        console.log(loadingStatus);
                                        $("#progress-bar").css("width", loadingStatus + "%");
                                        $("#progress-num").text(loadingStatus + "%");
                                        $("#error-num").text(errorNum);
                                        $("#total-num").text(totalNum);
                                        $("#already-num").text(currentNum);
                                        var errorList = res.error;
                                        if (errorList && errorList.length > 0) {
                                            for (var i = errorIndex; i < errorList.length; i++) {
                                                var errorItem = $('<li class="error-item"></li>');
                                                errorItem.text(errorList[i]);
                                                $("#error-list").append(errorItem);
                                            }
                                            $("#info-area").show(300);
                                            errorIndex = errorList.length;
                                            console.log($("#error-list li").length);
                                        }
                                        if (
                                            totalNum != 0 &&
                                            totalNum == currentNum &&
                                            loadingStatus == "100"
                                        ) {
                                            time = true;
                                            $("#file").val("");
                                            if (errorList === null || errorList.length == 0) {
                                                var errorItem = $('<li class="error-item"></li>');
                                                errorItem.text("导入完成");
                                                errorItem.css("color", "green");
                                                $("#error-list").append(errorItem);
                                                $(".ui-item.begin").hide(300);
                                                if (callback && typeof callback === "function") {
                                                    callback();
                                                }
                                            }
                                        }
                                    })
                                    .fail(function (res) { });
                            }
                        }
                    })
                    .fail(function (res) {
                        //					toastr.error(res.msg);
                    });
            }
        },

        importFileByTemplate: function (importUrl, importStatusUrl, templateUrl, element, callback) {
            //导入
            var importmeta = {
                meta: {
                    isEdit: {
                        type: "string",
                        required: true
                    }
                }
            };
            var viewModel = {
                importData: new u.DataTable(importmeta),
            };
            viewModel.importData.removeAllRows();
            viewModel.importData.createEmptyRow();
            viewModel.importData.setValue("isEdit", false);
            var importHtml =
                '<div id="dialog_content_import" class="import-box" style="display:none;">' +
                '<div class="u-msg-title">' +
                "<h4>导入</h4>" +
                "</div>" +
                '<div class="u-msg-content">' +
                '<div class="ui-panel-head ui-bill-head">' +
                '<div class="ui-item" style="float: none;">' +
                '<div class="ui-name" style="line-height: 28px; width:85px;">' +
                '<a href="' + templateUrl + '" download="客户等级导入模板" class="downloadTemplate">下载模板</a></div>' +
                "</div>" +
                '<div class="ui-item">' +
                '<form id="uploadForm" enctype="multipart/form-data">' +
                '<input id="token" type="hidden" name="token" value="' + localStorage.getItem("token") + '"/>' +//导入增加TOKEN参数
                '<input id="importFileType" type="hidden" name="" value=""/>' +
                '<a class="ui-btn ui-btn-green importBtn">选择文件' +
                '<input id="file" type="file" name="file" class="importFile"/>' +
                "</a>" +
                "</form>" +
                '<span id="fileName" class="fileName">上传的文件信息</span>' +
                "</div>" +
                '<div class="ui-item begin" style="display:none;">' +
                '<a class="u-msg-up ui-btn ui-btn-green">开始上传</a>' +
                '<div class="progress-box">' +
                '<div class="progress-bar" id="progress-bar"></div>' +
                '<span class="tip-txt" id="tip-txt">正在解析中</span>' +
                "</div>" +
                '<span class="progress-percent margin-left-15"><i class="num" id="progress-num">0%</i>已上传</span>' +
                "</div>" +
                '<div class="info-area" id="info-area">' +
                '<div class="import-info">' +
                // '<span class="progress-percent">解析状态:<i id="parse-status"></i></span>'+
                '<span class="progress-percent">总计条数:<i class="num" id="total-num">0</i></span>' +
                '<span class="progress-percent">已处理数:<i class="num" id="already-num">0</i></span>' +
                '<span class="progress-percent">错误条数:<i class="num" id="error-num">0</i></span>' +
                "</div>" +
                '<div class="import-info margin-top-15">执行信息:</div>' +
                '<ul class="error-list margin-top-10" id="error-list"></ul>' +
                "</div>" +
                '<div class="clearfix"></div>' +
                "</div>" +
                "</div>" +
                '<div class="u-msg-footer">' +
                '<a class="u-msg-cancel ui-btn ui-btn-primary margin-right-5">取消</a>' +
                '<a class="u-msg-ok ui-btn ui-btn-green">完成</a>' +
                "</div>" +
                "</div>";
            $(element).empty();
            $(element).append($(importHtml));
            ko.cleanNode(element);
            var app = u.createApp({
                el: element,
                model: viewModel
            });
            $("#file").change(function () {
                var fileName = document.getElementById("file").files;
                var fileSize =
                    fileName[0].size > 1024 * 1024
                        ? Math.round(fileName[0].size / (1024 * 1024)) + "MB大小"
                        : Math.round(fileName[0].size / 1024) + "KB大小";
                $("#fileName").text("文件名:" + fileName[0].name + "  共:" + fileSize);
                $(".ui-item.begin").show();
                $("#progress-bar").css("width", "0%");
                $("#progress-num").text("0%");
                $("#error-num").text(0);
                $("#total-num").text(0);
                $("#already-num").text(0);
                $("#info-area").hide(300);
                $("#error-list").empty();
            });
            var importDialog = u.dialog({
                content: "#dialog_content_import",
                hasCloseMenu: true,
                width: "40%"
            });

            var upBtn = $("#dialog_content_import .u-msg-up");
            upBtn.unbind("click").click(function () {
                //导入
                importOk();
            });
            var okButton = $("#dialog_content_import .u-msg-ok");
            okButton.unbind("click").click(function () {
                importDialog.close();
                $(".ui-item.begin").hide();
                $("#progress-bar").css("width", "0%");
                $("#progress-num").text("0%");
                $("#error-num").text(0);
                $("#total-num").text(0);
                $("#already-num").text(0);
            });
            var cancelButton = $("#dialog_content_import .u-msg-cancel");
            cancelButton.unbind("click").click(function () {
                importDialog.close();
                $(".ui-item.begin").hide();
                $("#progress-bar").css("width", "0%");
                $("#progress-num").text("0%");
                $("#error-num").text(0);
                $("#total-num").text(0);
                $("#already-num").text(0);
            });

            function importOk() {
                var isEdit = viewModel.importData.getValue("isEdit");
                $("#importFileType").attr("name", "isEdit");
                $("#importFileType").attr("value", isEdit);
                $("#tip-txt").show();
                $.ajax({
                    url: importUrl,
                    // url: appCtx + importUrl,
                    type: "POST",
                    cache: false,
                    data: new FormData($("#uploadForm")[0]),
                    processData: false,
                    contentType: false,
                }).done(function (res) {
                    //        var newArr = res;
                    //
                    //        newArr.forEach(function (e,index) {
                    //
                    //        })
                    if (res.status == "failed") {
                        $(".ui-item.begin").hide(300);
                        $("#file").val("");
                        $("#info-area").show(300);
                        var errorItem = $('<li class="error-item"></li>');
                        errorItem.text(res.msg);
                        errorItem.css("color", "red");
                        errorItem.css("font-size", "14px");
                        $("#error-list").append(errorItem);
                        if (res.error && res.error.length > 0) {
                            for (var i = 0; i < res.error.length; i++) {
                                var errorItem = $('<li class="error-item"></li>');
                                errorItem.text(res.error[i]);
                                $("#error-list").append(errorItem);
                            }
                        }
                        return;
                    }
                    if (res.status == "success") {
                        $("#tip-txt").hide();
                        $("#info-area").show(300);
                        var errorItem = $('<li class="error-item"></li>');
                        errorItem.text(res.msg);
                        errorItem.css("color", "green");
                        errorItem.css("font-size", "14px");
                        $("#error-list").append(errorItem);
                        var time = false;
                        var t;
                        var errorIndex = 0;
                        beginGet();

                        function beginGet() {
                            if (time) {
                                clearTimeout(t);
                                return;
                            }
                            getStatus();
                            t = setTimeout(beginGet, 5000);
                        }

                        function getStatus() {
                            $.ajax({
                                url: importStatusUrl,
                                // url: appCtx + importStatusUrl,
                                type: "GET",
                                contentType: false
                            })
                                .done(function (res) {
                                    var loadingStatus = res.result.loadingStatus;
                                    var errorNum = res.result.errorNum;
                                    var totalNum = res.result.totalNum;
                                    var currentNum = res.result.currentNum;
                                    console.log(loadingStatus);
                                    $("#progress-bar").css("width", loadingStatus + "%");
                                    $("#progress-num").text(loadingStatus + "%");
                                    $("#error-num").text(errorNum);
                                    $("#total-num").text(totalNum);
                                    $("#already-num").text(currentNum);
                                    var errorList = res.error;
                                    if (errorList && errorList.length > 0) {
                                        for (var i = errorIndex; i < errorList.length; i++) {
                                            var errorItem = $('<li class="error-item"></li>');
                                            errorItem.text(errorList[i]);
                                            $("#error-list").append(errorItem);
                                        }
                                        $("#info-area").show(300);
                                        errorIndex = errorList.length;
                                        console.log($("#error-list li").length);
                                    }
                                    if (
                                        totalNum != 0 &&
                                        totalNum == currentNum &&
                                        loadingStatus == "100"
                                    ) {
                                        time = true;
                                        $("#file").val("");
                                        if (errorList === null || errorList.length == 0) {
                                            var errorItem = $('<li class="error-item"></li>');
                                            errorItem.text("导入完成");
                                            errorItem.css("color", "green");
                                            $("#error-list").append(errorItem);
                                            $(".ui-item.begin").hide(300);
                                            if (callback && typeof callback === "function") {
                                                callback();
                                            }
                                        }
                                    }
                                })
                                .fail(function (res) { });
                        }
                    }
                }).fail(function (res) {
                    //					toastr.error(res.msg);
                });
            }
        },

        exportFile: function (dataTable, element, searchParams, templateUrl, excelDataUrl, isAuditStatus) {
            //导出
            var exportmeta = {
                meta: {
                    isEdit: {
                        type: "string",
                        required: true
                    },
                    isAll: {
                        type: "string",
                        required: true
                    },
                    excelFileName: {
                        type: "string"
                    }
                }
            };
            var viewModel = {
                exportData: new u.DataTable(exportmeta),
                listData: dataTable,
                exportTypeSrc: [],
                exportRangeSrc: []
            };
            viewModel.exportData.removeAllRows();
            viewModel.exportData.createEmptyRow();
            if (element.id != "exportFiel") {
                viewModel.exportTypeSrc = [
                    {
                        value: 0,
                        name: "导出新增模板"
                    }
                ];
                viewModel.exportRangeSrc = [];
            } else {
                viewModel.exportTypeSrc = [
                    {
                        value: 0,
                        name: "导出新增模板"
                    },
                    {
                        value: true,
                        name: "导出需修改的数据"
                    },
                    {
                        value: false,
                        name: "导出数据"
                    }
                ];
                viewModel.exportRangeSrc = [
                    {
                        value: false,
                        name: "选中的数据行"
                    },
                    {
                        value: true,
                        name: "符合当前查询条件的全部数据行"
                    }
                ];
            }
            //初始默认选择导出新增模板
            viewModel.exportData.setValue("isEdit", 0);
            var exportHtml =
                '<div id="dialog_content_export' +
                element.id +
                '">' +
                '<div class="u-msg-title">' +
                "<h4>导出</h4>" +
                "</div>" +
                '<div class="u-msg-content" id="validateExport">' +
                '<div class="ui-panel-head ui-bill-head">' +
                '<div class="ui-item" style="float: none;">' +
                '<div class="ui-name" style="line-height: 28px;">导出类型：</div>' +
                '<div class="ui-inputarea">' +
                '<div u-meta=\'{"type":"u-radio","data":"exportData","field":"isEdit","datasource":"exportTypeSrc","required":true}\' id="exportType">' +
                '<label  class="u-radio margin-right-10" >' +
                '<input type="radio" class="u-radio-button" name="exportType">' +
                '<span class="u-radio-label"></span>' +
                "</label>" +
                "</div>" +
                "</div>" +
                "</div>" +
                '<div class="ui-item" style="float: none;display:none;" id="exportRange">' +
                '<div class="ui-name" style="line-height: 28px;">导出范围：</div>' +
                '<div class="ui-inputarea">' +
                '<div u-meta=\'{"type":"u-radio","data":"exportData","field":"isAll","datasource":"exportRangeSrc","required":true}\'>' +
                '<label  class="u-radio margin-right-10" >' +
                '<input type="radio" class="u-radio-button" name="exportRange">' +
                '<span class="u-radio-label"></span>' +
                "</label>" +
                "</div>" +
                "</div>" +
                "</div>" +
                '<div class="ui-item" style="float: none;">' +
                '<div class="ui-name">请输入文件名：</div>' +
                '<div class="ui-inputarea">' +
                '<div u-meta=\'{"type":"u-text","data":"exportData","field":"excelFileName"}\'>' +
                "<input/>" +
                "</div>" +
                "</div>" +
                "</div>" +
                "</div>" +
                "</div>" +
                '<div class="u-msg-footer">' +
                '<a class="u-msg-cancel ui-btn margin-right-5">取消</a>' +
                '<a class="u-msg-ok ui-btn ui-btn-primary">确定</a>' +
                "</div>" +
                "</div>";
            $(element).empty();
            $(element).append($(exportHtml));
            ko.cleanNode(element);
            var app = u.createApp({
                el: element,
                model: viewModel
            });
            //判断是否选择导出新增模板
            $(element)
                .find("#exportType")
                .on("click", "input", function () {
                    var txt = $(this)
                        .closest("label")
                        .text();
                    if (txt == "导出新增模板") {
                        $(this)
                            .parents(".u-msg-content")
                            .find("#exportRange")
                            .slideUp(300);
                        viewModel.exportData.setValue("isAll", null);
                    } else {
                        $(this)
                            .parents(".u-msg-content")
                            .find("#exportRange")
                            .slideDown(300);
                    }
                });

            var exportDialog = u.dialog({
                content: "#dialog_content_export" + element.id,
                hasCloseMenu: true
            });
            var okButton = $("#dialog_content_export" + element.id + " .u-msg-ok");
            okButton.unbind("click").click(function (vent) {
                exportOk(vent);
            });
            var cancelButton = $(
                "#dialog_content_export" + element.id + " .u-msg-cancel"
            );
            cancelButton.unbind("click").click(function () {
                exportDialog.close();
            });

            // function addEvent(el, type, fn) {
            //   if (el.addEventListener) {
            //     //绝大多数非IE内核浏览器
            //     el.addEventListener(type, fn, false);
            //   } else if (el.attachEvent) {
            //     //IE内核
            //     el.attachEvent("on" + type, function () {
            //       fn.call(el);
            //     });
            //   } else {
            //     //选择dom元素错误
            //     throw new Error("不支持该dom元素");
            //   }
            // }

            function exportOk(vent) {
                var isAll = viewModel.exportData.getValue("isAll");
                var isEdit = viewModel.exportData.getValue("isEdit");
                var excelFileName = viewModel.exportData.getValue("excelFileName");
                var selectRowsArr = viewModel.listData.getSelectedRows();

                var exportUrl;
                //校验
                var validate = $(vent.target)
                    .closest(".u-msg-footer")
                    .prevAll("#validateExport")[0];
                var result = app.compsValidateMultiParam({
                    element: validate,
                    showMsg: true
                });
                if (isEdit != "0") {
                    if (!result.passed) {
                        toastr.warning("请选择导出范围!");
                        return;
                    }
                }

                //有审核条件限制
                if (isAuditStatus == true && isEdit == "true") {
                    var flag = false;
                    if (isAll == "false") {
                        for (var i = 0; i < selectRowsArr.length; i++) {
                            var auditStatus = selectRowsArr[i].getValue("auditStatus");
                            if (auditStatus == "1") {
                                flag = true;
                            }
                        }
                    } else {
                        var allRows = viewModel.listData.getAllRows();
                        for (var i = 0; i < allRows.length; i++) {
                            var auditStatus = allRows[i].getValue("auditStatus");
                            if (auditStatus == "1") {
                                flag = true;
                            }
                        }
                    }
                    if (flag) {
                        toastr.warning("已审核数据不能导出，请重新选择！");
                        return;
                    }
                }
                if (isAll == "false") {
                    if (selectRowsArr.length < 1) {
                        toastr.warning("导出选中行方式下需要选择数据导出！");
                        return;
                    }
                }
                if (isEdit == "0") {
                    exportUrl = templateUrl;
                } else {
                    exportUrl = excelDataUrl;
                }
                var ids = selectRowsArr.map(function (row, index, arr) {
                    return row.getValue("id");
                });
                $("#exportForm").remove();
                var form = $(
                    "<form id='exportForm'><iframe id='exportIframe' name='exportFrame' frameborder='0'></iframe></form>"
                ); //定义一个form表单
                form.attr("style", "display:none"); //在form表单中添加查询参数
                form.attr("target", "exportFrame");
                form.attr("method", "post");
                form.attr("action", exportUrl);
                // form.attr("action", appCtx + exportUrl);

                var input1 = $("<input>");
                input1.attr("type", "hidden");
                input1.attr("name", "ids");
                input1.attr("value", ids);

                var input2 = $("<input>");
                input2.attr("type", "hidden");
                input2.attr("name", "excelFileName");
                input2.attr("value", excelFileName);

                var input3 = $("<input>");
                input3.attr("type", "hidden");
                input3.attr("name", "isAll");
                input3.attr("value", isAll);



                if (searchParams) {
                    var input4 = $("<input>");
                    input4.attr("type", "hidden");
                    input4.attr("name", "searchParams");
                    input4.attr("value", JSON.stringify(searchParams));
                }

                var input5 = $("<input>");
                input5.attr("type", "hidden");
                input5.attr("name", "isEdit");
                input5.attr("value", isEdit);



                $("body").append(form); //将表单放置在web中
                form.append(input1); //将查询参数控件提交到表单上
                form.append(input2); //将查询参数控件提交到表单上
                form.append(input3); //将查询参数控件提交到表单上
                if (searchParams) {
                    form.append(input4);
                } //将查询参数控件提交到表单上
                form.append(input5); //将查询参数控件提交到表单上
                var ifr = document.getElementById("exportIframe");
                // addEvent(ifr, "load", function () {
                //   var pre = this.contentDocument.getElementsByTagName("pre");
                //   if (pre && pre.length > 0) {
                //     var str = pre[0].innerText;
                //     var msg = JSON.parse(str).msg;
                //     toastr.error(msg);
                //   }
                // });
                //增加TOKEN 参数----BEGIN
                var input6 = $("<input>");
                var token = localStorage.getItem("token");
                if (!token) {
                    toastr.error("请重新登录");
                    return;
                }
                input6.attr("type", "hidden");
                input6.attr("name", "token");
                input6.attr("value", token);
                form.append(input6);
                //增加TOKEN 参数----END

                form.submit();
                exportDialog.close();
            }
        },
        exportFile1: function (dataTable, element, searchParams, templateUrl, excelDataUrl, isAuditStatus) {
            //导出
            var exportmeta = {
                meta: {
                    isEdit: {
                        type: "string",
                        required: true
                    },
                    isAll: {
                        type: "string",
                        required: true
                    },
                    excelFileName: {
                        type: "string"
                    }
                }
            };
            var viewModel = {
                exportData: new u.DataTable(exportmeta),
                listData: dataTable,
                exportTypeSrc: [],
                exportRangeSrc: []
            };
            viewModel.exportData.removeAllRows();
            viewModel.exportData.createEmptyRow();
            if (element.id != "exportFiel") {
                viewModel.exportTypeSrc = [
                    {
                        value: 0,
                        name: "导出新增模板"
                    }
                ];
                viewModel.exportRangeSrc = [];
            } else {
                viewModel.exportTypeSrc = [
                    {
                        value: 0,
                        name: "导出新增模板"
                    },
                    {
                        value: true,
                        name: "导出需修改的数据"
                    },
                    {
                        value: false,
                        name: "导出数据"
                    }
                ];
                viewModel.exportRangeSrc = [
                    {
                        value: false,
                        name: "选中的数据行"
                    },
                    {
                        value: true,
                        name: "符合当前查询条件的全部数据行"
                    }
                ];
            }
            //初始默认选择导出新增模板
            viewModel.exportData.setValue("isEdit", 0);
            var exportHtml =
                '<div id="dialog_content_export' +
                element.id +
                '">' +
                '<div class="u-msg-title">' +
                "<h4>导出</h4>" +
                "</div>" +
                '<div class="u-msg-content" id="validateExport">' +
                '<div class="ui-panel-head ui-bill-head">' +
                // '<div class="ui-item" style="float: none;">' +
                // '<div class="ui-name" style="line-height: 28px;">导出类型：</div>' +
                // '<div class="ui-inputarea">' +
                // '<div u-meta=\'{"type":"u-radio","data":"exportData","field":"isEdit","datasource":"exportTypeSrc","required":true}\' id="exportType">' +
                // '<label  class="u-radio margin-right-10" >' +
                // '<input type="radio" class="u-radio-button" name="exportType">' +
                // '<span class="u-radio-label"></span>' +
                // "</label>" +
                // "</div>" +
                // "</div>" +
                // "</div>" +
                '<div class="ui-item" style="float: none;" id="exportRange">' +
                '<div class="ui-name" style="line-height: 28px;">导出范围：</div>' +
                '<div class="ui-inputarea">' +
                '<div u-meta=\'{"type":"u-radio","data":"exportData","field":"isAll","datasource":"exportRangeSrc","required":true}\'>' +
                '<label  class="u-radio margin-right-10" >' +
                '<input type="radio" class="u-radio-button" name="exportRange">' +
                '<span class="u-radio-label"></span>' +
                "</label>" +
                "</div>" +
                "</div>" +
                "</div>" +
                '<div class="ui-item" style="float: none;">' +
                '<div class="ui-name">请输入文件名：</div>' +
                '<div class="ui-inputarea">' +
                '<div u-meta=\'{"type":"u-text","data":"exportData","field":"excelFileName"}\'>' +
                "<input/>" +
                "</div>" +
                "</div>" +
                "</div>" +
                "</div>" +
                "</div>" +
                '<div class="u-msg-footer">' +
                '<a class="u-msg-cancel ui-btn margin-right-5">取消</a>' +
                '<a class="u-msg-ok ui-btn ui-btn-primary">确定</a>' +
                "</div>" +
                "</div>";
            $(element).empty();
            $(element).append($(exportHtml));
            ko.cleanNode(element);
            var app = u.createApp({
                el: element,
                model: viewModel
            });
            //判断是否选择导出新增模板
            $(element)
                .find("#exportType")
                .on("click", "input", function () {
                    var txt = $(this)
                        .closest("label")
                        .text();
                    if (txt == "导出新增模板") {
                        $(this)
                            .parents(".u-msg-content")
                            .find("#exportRange")
                            .slideUp(300);
                        viewModel.exportData.setValue("isAll", null);
                    } else {
                        $(this)
                            .parents(".u-msg-content")
                            .find("#exportRange")
                            .slideDown(300);
                    }
                });

            var exportDialog = u.dialog({
                content: "#dialog_content_export" + element.id,
                hasCloseMenu: true
            });
            var okButton = $("#dialog_content_export" + element.id + " .u-msg-ok");
            okButton.unbind("click").click(function (vent) {
                exportOk(vent);
            });
            var cancelButton = $(
                "#dialog_content_export" + element.id + " .u-msg-cancel"
            );
            cancelButton.unbind("click").click(function () {
                exportDialog.close();
            });

            // function addEvent(el, type, fn) {
            //   if (el.addEventListener) {
            //     //绝大多数非IE内核浏览器
            //     el.addEventListener(type, fn, false);
            //   } else if (el.attachEvent) {
            //     //IE内核
            //     el.attachEvent("on" + type, function () {
            //       fn.call(el);
            //     });
            //   } else {
            //     //选择dom元素错误
            //     throw new Error("不支持该dom元素");
            //   }
            // }

            function exportOk(vent) {
                var isAll = viewModel.exportData.getValue("isAll");
                var isEdit = viewModel.exportData.getValue("isEdit");
                var excelFileName = viewModel.exportData.getValue("excelFileName");
                var selectRowsArr = viewModel.listData.getSelectedRows();

                var exportUrl;
                //校验
                var validate = $(vent.target)
                    .closest(".u-msg-footer")
                    .prevAll("#validateExport")[0];
                var result = app.compsValidateMultiParam({
                    element: validate,
                    showMsg: true
                });
                if (isEdit != "0") {
                    if (!result.passed) {
                        toastr.warning("请选择导出范围!");
                        return;
                    }
                }

                //有审核条件限制
                if (isAuditStatus == true && isEdit == "true") {
                    var flag = false;
                    if (isAll == "false") {
                        for (var i = 0; i < selectRowsArr.length; i++) {
                            var auditStatus = selectRowsArr[i].getValue("auditStatus");
                            if (auditStatus == "1") {
                                flag = true;
                            }
                        }
                    } else {
                        var allRows = viewModel.listData.getAllRows();
                        for (var i = 0; i < allRows.length; i++) {
                            var auditStatus = allRows[i].getValue("auditStatus");
                            if (auditStatus == "1") {
                                flag = true;
                            }
                        }
                    }
                    if (flag) {
                        toastr.warning("已审核数据不能导出，请重新选择！");
                        return;
                    }
                }
                if (isAll == "false") {
                    if (selectRowsArr.length < 1) {
                        toastr.warning("导出选中行方式下需要选择数据导出！");
                        return;
                    }
                }
                if (isEdit == "0") {
                    exportUrl = templateUrl;
                } else {
                    exportUrl = excelDataUrl;
                }
                var ids = selectRowsArr.map(function (row, index, arr) {
                    return row.getValue("id");
                });
                $("#exportForm").remove();
                var form = $(
                    "<form id='exportForm'><iframe id='exportIframe' name='exportFrame' frameborder='0'></iframe></form>"
                ); //定义一个form表单
                form.attr("style", "display:none"); //在form表单中添加查询参数
                form.attr("target", "exportFrame");
                form.attr("method", "post");
                form.attr("action", exportUrl);
                // form.attr("action", appCtx + exportUrl);

                var input1 = $("<input>");
                input1.attr("type", "hidden");
                input1.attr("name", "ids");
                input1.attr("value", ids);

                var input2 = $("<input>");
                input2.attr("type", "hidden");
                input2.attr("name", "excelFileName");
                input2.attr("value", excelFileName);

                var input3 = $("<input>");
                input3.attr("type", "hidden");
                input3.attr("name", "isAll");
                input3.attr("value", isAll);

                if (searchParams) {
                    var input4 = $("<input>");
                    input4.attr("type", "hidden");
                    input4.attr("name", "searchParams");
                    input4.attr("value", JSON.stringify(searchParams));
                }

                var input5 = $("<input>");
                input5.attr("type", "hidden");
                input5.attr("name", "isEdit");
                input5.attr("value", isEdit);

                $("body").append(form); //将表单放置在web中
                form.append(input1); //将查询参数控件提交到表单上
                form.append(input2); //将查询参数控件提交到表单上
                form.append(input3); //将查询参数控件提交到表单上
                if (searchParams) {
                    form.append(input4);
                } //将查询参数控件提交到表单上
                form.append(input5); //将查询参数控件提交到表单上
                var ifr = document.getElementById("exportIframe");
                // addEvent(ifr, "load", function () {
                //   var pre = this.contentDocument.getElementsByTagName("pre");
                //   if (pre && pre.length > 0) {
                //     var str = pre[0].innerText;
                //     var msg = JSON.parse(str).msg;
                //     toastr.error(msg);
                //   }
                // });
                //增加TOKEN 参数----BEGIN
                var input6 = $("<input>");
                var token = localStorage.getItem("token");
                if (!token) {
                    toastr.error("请重新登录");
                    return;
                }
                input6.attr("type", "hidden");
                input6.attr("name", "token");
                input6.attr("value", token);
                form.append(input6);
                //增加TOKEN 参数----END
                form.submit();
                exportDialog.close();
            }
        },
        exportTemplate: function (dataTable, element, searchParams, templateUrl, excelDataUrl) {
            //导出
            var exportmeta = {
                meta: {
                    isEdit: {
                        type: "string",
                        required: true
                    },
                    isAll: {
                        type: "string",
                        required: true
                    },
                    excelFileName: {
                        type: "string"
                    }
                }
            };
            var viewModel = {
                exportData: new u.DataTable(exportmeta),
                listData: dataTable,
                exportTypeSrc: [
                    {
                        value: 0,
                        name: "导出新增模板"
                    }
                ]
            };
            viewModel.exportData.removeAllRows();
            viewModel.exportData.createEmptyRow();
            //初始默认选择导出新增模板
            viewModel.exportData.setValue("isEdit", 0);
            var exportHtml =
                '<div id="dialog_content_export2">' +
                '<div class="u-msg-title">' +
                "<h4>导出</h4>" +
                "</div>" +
                '<div class="u-msg-content" id="validateExport">' +
                '<div class="ui-panel-head ui-bill-head">' +
                '<div class="ui-item" style="float: none;margin-top: 0px">' +
                '<div class="ui-name" style="line-height: 28px;">导出类型：</div>' +
                '<div class="ui-inputarea">' +
                '<div u-meta=\'{"type":"u-radio","data":"exportData","field":"isEdit","datasource":"exportTypeSrc","required":true}\' id="exportType">' +
                '<label  class="u-radio margin-right-10" >' +
                '<input type="radio" class="u-radio-button" name="exportType">' +
                '<span class="u-radio-label"></span>' +
                "</label>" +
                "</div>" +
                "</div>" +
                '<div class="u-msg-footer" style="padding-top: 8px">' +
                '<a class="u-msg-cancel ui-btn margin-right-5">取消</a>' +
                '<a class="u-msg-ok ui-btn ui-btn-primary">确定</a>' +
                "</div>" +
                "</div>";
            $(element).empty();
            $(element).append($(exportHtml));
            ko.cleanNode(element);
            var app = u.createApp({
                el: element,
                model: viewModel
            });
            var exportDialog = u.dialog({
                content: "#dialog_content_export2",
                hasCloseMenu: true
            });
            var okButton = $("#dialog_content_export2 .u-msg-ok");
            okButton.unbind("click").click(function () {
                exportOk();
            });
            var cancelButton = $("#dialog_content_export2 .u-msg-cancel");
            cancelButton.unbind("click").click(function () {
                exportDialog.close();
            });

            function exportOk() {
                var isAll = viewModel.exportData.getValue("isAll");
                var isEdit = viewModel.exportData.getValue("isEdit");
                var excelFileName = viewModel.exportData.getValue("excelFileName");
                var selectRowsArr = viewModel.listData.getSelectedRows();

                var exportUrl;
                //校验
                var validate = $("#validateExport")[0];
                var result = app.compsValidateMultiParam({
                    element: validate,
                    showMsg: true
                });
                if (isEdit != "0") {
                    if (!result.passed) {
                        toastr.warning("请选择导出范围!");
                        return;
                    }
                }
                if (isEdit == "0") {
                    exportUrl = templateUrl;
                } else {
                    exportUrl = excelDataUrl;
                }
                var ids = selectRowsArr.map(function (row, index, arr) {
                    return row.getValue("id");
                });
                $("#exportForm").remove();
                var form = $("<form id='exportForm'>"); //定义一个form表单
                form.attr("style", "display:none"); //在form表单中添加查询参数
                form.attr("target", "");
                form.attr("method", "post");
                form.attr("action", exportUrl);
                // form.attr("action", appCtx + exportUrl);

                var input1 = $("<input>");
                input1.attr("type", "hidden");
                input1.attr("name", "ids");
                input1.attr("value", ids);
                //增加TOKEN 参数----BEGIN
                var input6 = $("<input>");
                var token = localStorage.getItem("token");
                if (!token) {
                    toastr.error("请重新登录");
                    return;
                }
                input6.attr("type", "hidden");
                input6.attr("name", "token");
                input6.attr("value", token);
                form.append(input6);
                //增加TOKEN 参数----END

                $("body").append(form); //将表单放置在web中
                form.append(input1); //将查询参数控件提交到表单上
                form.submit();
                exportDialog.close();
            }
        },
        /**
         * @param {Object} dataTable
         * @param {Object} element
         * @param {Object} searchParams
         * @param {Object} templateUrl
         * @param {Object} excelDataUrl
         * @param {Object} type  配置导出类型 [{value:0,name:"导出新增模板"},{value:true,name:"导出需修改的数据"},{value:false,name:"导出数据"}]
         */
        exportFileType: function (dataTable, element, searchParams, templateUrl, excelDataUrl, type, isHideSelectRow) {
            //导出
            var exportmeta = {
                meta: {
                    isEdit: {
                        type: "string",
                        required: true
                    },
                    isAll: {
                        type: "string",
                        required: true
                    },
                    excelFileName: {
                        type: "string"
                    }
                }
            };
            var viewModel = {
                exportData: new u.DataTable(exportmeta),
                listData: dataTable,
                exportTypeSrc: type,
                exportRangeSrc: [
                    {
                        value: false,
                        name: "选中的数据行"
                    },
                    {
                        value: true,
                        name: "符合当前查询条件的全部数据行"
                    }
                ]
            };
            if (isHideSelectRow && isHideSelectRow == true) {
                viewModel.exportRangeSrc = [{
                    value: true,
                    name: "符合当前查询条件的全部数据行"
                }];
            }
            viewModel.exportData.removeAllRows();
            viewModel.exportData.createEmptyRow();
            //初始默认选择导出所有
            viewModel.exportData.setValue("isEdit", "false");
            //默认选中所有
            viewModel.exportData.setValue("isAll", true);
            var exportHtml =
                '<div id="dialog_content_export' +
                element.id +
                '">' +
                '<div class="u-msg-title">' +
                "<h4>导出</h4>" +
                "</div>" +
                '<div class="u-msg-content" id="validateExport">' +
                '<div class="ui-panel-head ui-bill-head">' +
                '<div class="ui-item" style="float: none;">' +
                '<div class="ui-name" style="line-height: 28px;">导出类型：</div>' +
                '<div class="ui-inputarea">' +
                '<div u-meta=\'{"type":"u-radio","data":"exportData","field":"isEdit","datasource":"exportTypeSrc","required":true}\' id="exportType">' +
                '<label  class="u-radio margin-right-10" >' +
                '<input type="radio" class="u-radio-button" name="exportType">' +
                '<span class="u-radio-label"></span>' +
                "</label>" +
                "</div>" +
                "</div>" +
                "</div>" +
                '<div class="ui-item" style="float: none;" id="exportRange" data-bind="style: {display: exportTypeSrc.length == 1 ? ' + '"block"' + ' : ' + '"none"' + ' }">' +
                '<div class="ui-name" style="line-height: 28px;">导出范围：</div>' +
                '<div class="ui-inputarea">' +
                '<div u-meta=\'{"type":"u-radio","data":"exportData","field":"isAll","datasource":"exportRangeSrc","required":true}\'>' +
                '<label  class="u-radio margin-right-10" >' +
                '<input type="radio" class="u-radio-button" name="exportRange">' +
                '<span class="u-radio-label"></span>' +
                "</label>" +
                "</div>" +
                "</div>" +
                "</div>" +
                '<div class="ui-item" style="float: none;">' +
                '<div class="ui-name">请输入文件名：</div>' +
                '<div class="ui-inputarea">' +
                '<div u-meta=\'{"type":"u-text","data":"exportData","field":"excelFileName"}\'>' +
                "<input/>" +
                "</div>" +
                "</div>" +
                "</div>" +
                "</div>" +
                "</div>" +
                '<div class="u-msg-footer">' +
                '<a class="u-msg-cancel ui-btn margin-right-5">取消</a>' +
                '<a class="u-msg-ok ui-btn ui-btn-primary">确定</a>' +
                "</div>" +
                "</div>";
            $(element).empty();
            $(element).append($(exportHtml));
            ko.cleanNode(element);
            var app = u.createApp({
                el: element,
                model: viewModel
            });
            //判断是否选择导出新增模板
            $(element)
                .find("#exportType")
                .on("click", "input", function () {
                    var txt = $(this)
                        .closest("label")
                        .text();
                    if (txt == "导出新增模板") {
                        $(this)
                            .parents(".u-msg-content")
                            .find("#exportRange")
                            .slideUp(300);
                        viewModel.exportData.setValue("isAll", null);
                    } else {
                        $(this)
                            .parents(".u-msg-content")
                            .find("#exportRange")
                            .slideDown(300);
                        //默认选中所有
                        viewModel.exportData.setValue("isAll", true);
                    }
                });

            var exportDialog = u.dialog({
                content: "#dialog_content_export" + element.id,
                hasCloseMenu: true
            });
            var okButton = $("#dialog_content_export" + element.id + " .u-msg-ok");
            okButton.unbind("click").click(function (vent) {
                exportOk(vent);
            });
            var cancelButton = $(
                "#dialog_content_export" + element.id + " .u-msg-cancel"
            );
            cancelButton.unbind("click").click(function () {
                exportDialog.close();
            });

            function exportOk(vent) {
                var isAll = viewModel.exportData.getValue("isAll");
                var isEdit = viewModel.exportData.getValue("isEdit");
                var excelFileName = viewModel.exportData.getValue("excelFileName");
                var selectRowsArr = viewModel.listData.getSelectedRows();

                var exportUrl;
                //校验
                var validate = $(vent.target)
                    .closest(".u-msg-footer")
                    .prevAll("#validateExport")[0];
                var result = app.compsValidateMultiParam({
                    element: validate,
                    showMsg: true
                });
                if (isEdit != "0") {
                    if (!result.passed) {
                        toastr.warning("请选择导出范围!");
                        return;
                    }
                }
                if (isAll == "false") {
                    if (selectRowsArr.length < 1) {
                        toastr.warning("导出选中行方式下需要选择数据导出！");
                        return;
                    }
                }
                if (isEdit == "0") {
                    exportUrl = templateUrl;
                } else {
                    exportUrl = excelDataUrl;
                }
                var ids = selectRowsArr.map(function (row, index, arr) {
                    return row.getValue("id");
                });
                $("#exportForm").remove();
                var form = $("<form id='exportForm'>"); //定义一个form表单
                form.attr("style", "display:none"); //在form表单中添加查询参数
                form.attr("target", "");
                form.attr("method", "post");
                form.attr("action", exportUrl);
                // form.attr("action", appCtx + exportUrl);

                var input1 = $("<input>");
                input1.attr("type", "hidden");
                input1.attr("name", "ids");
                input1.attr("value", ids);

                var input2 = $("<input>");
                input2.attr("type", "hidden");
                input2.attr("name", "excelFileName");
                input2.attr("value", excelFileName);

                var input3 = $("<input>");
                input3.attr("type", "hidden");
                input3.attr("name", "isAll");
                input3.attr("value", isAll);

                if (searchParams) {
                    var input4 = $("<input>");
                    input4.attr("type", "hidden");
                    input4.attr("name", "searchParams");
                    input4.attr("value", JSON.stringify(searchParams));
                }

                var input5 = $("<input>");
                input5.attr("type", "hidden");
                input5.attr("name", "isEdit");
                input5.attr("value", isEdit);

                $("body").append(form); //将表单放置在web中
                form.append(input1); //将查询参数控件提交到表单上
                form.append(input2); //将查询参数控件提交到表单上
                form.append(input3); //将查询参数控件提交到表单上
                if (searchParams) {
                    form.append(input4);
                } //将查询参数控件提交到表单上
                form.append(input5); //将查询参数控件提交到表单上
                //增加TOKEN 参数----BEGIN
                var input6 = $("<input>");
                var token = localStorage.getItem("token");
                if (!token) {
                    toastr.error("请重新登录");
                    return;
                }
                input6.attr("type", "hidden");
                input6.attr("name", "token");
                input6.attr("value", token);
                form.append(input6);
                //增加TOKEN 参数----END
                form.submit();
                exportDialog.close();
            }
        },
    };
    Common.treeUtil = {
        //嵌套树形结构铺平
        nested2Array: function (nested, subKey) {
            var array = [];
            //TODO: 暂只处理二级嵌套
            for (var i = 0; i < nested.length; i++) {
                array.push(nested[i]);
                var subNested = nested[i][subKey];
                for (var j = 0; j < subNested.length; j++) {
                    array.push(subNested[j]);
                }
            }
            return array;
        },
        getDownLevelByUpLevel: function (up, pid_ids) {
            var down = [];
            for (var i = 0; i < up.length; i++) {
                var pid = up[i];
                var ids = pid_ids[pid];
                ids ? (down = down.concat(ids)) : "";
            }
            return down;
        },
        getLevelArr: function (pid_ids, rootKey) {
            var levelArr = [];
            var upLevel = [rootKey];
            for (var i = 0; i < 10; i++) {
                console.log("第", i, "层级");
                console.log("upLevel", upLevel);
                var downLevel = this.getDownLevelByUpLevel(upLevel, pid_ids);
                console.log("downLevel", downLevel);
                if (downLevel.length == 0) {
                    break;
                }
                upLevel = downLevel;
                levelArr.push(downLevel);
            }
            return levelArr;
        },
        toMapPid_ids: function (treeData, idKey, pidKey, rootKey) {
            var map = {};
            for (var i = 0; i < treeData.length; i++) {
                var idValue = treeData[i][idKey];
                var pidValue = treeData[i][pidKey];
                if (!pidValue) pidValue = rootKey;
                if (!map[pidValue]) {
                    map[pidValue] = [];
                }
                map[pidValue].push(idValue);
            }
            return map;
        },
        orderTreeByLevel: function (treeData, id, pid) {
            var mapPid_ids = this.toMapPid_ids(treeData, id, pid, "root");
            var levelArr = this.getLevelArr(mapPid_ids, "root");
            var mapId_Data = {};
            for (var i = 0; i < treeData.length; i++) {
                idValue = treeData[i][id];
                mapId_Data[idValue] = treeData[i];
            }
            var orderedTreeData = [];
            for (var i = 0; i < levelArr.length; i++) {
                for (var j = 0; j < levelArr[i].length; j++) {
                    var idValue = levelArr[i][j];
                    var data = mapId_Data[idValue];
                    orderedTreeData.push(data);
                }
            }
            //TODO: 残缺树暂不排序，原样返回
            return treeData.length === orderedTreeData.length ? orderedTreeData : treeData;
        },
        //[{id:11,name:"aa"}] => {11: {id:11, name: "aa"}}; 方便根据id定位避免遍历
        // arrayData2MapData: function(arrayData) {
        //   var mapData = {};
        //   for(var i=0; i<arrayData.length; i++) {
        //     mapData[arrayData[i].id] = arrayData[i];
        //   }
        //   return mapData;
        // }
        //分离出存在父级但父级不在当前数据集中的数据
        // getParentNoInDatas(allTreeDatas, idKey, pidKey) {
        //   var parentNoInDatas = [];
        //   var allTreeMap = this.arrayData2MapData(allTreeDatas);
        //   for(var i=0; i<allTreeDatas.length; i++) {
        //     var treeData = allTreeDatas[i];
        //     var treeDataPid = treeData[pidKey];
        //     if(treeDataPid && !allTreeMap[treeDataPid]) {
        //       parentNoInDatas.push(treeData);
        //     }
        //     else {
        //
        //     }
        //   }
        // }
    };
    Common.arrayUtil = {
        // 对象数组根据对象上某一个字段去重
        uniqBy: function (arr, identity) {
            var hash = {};
            var newArr = [];
            if (arr && arr.length > 0) {
                for (var i = 0; i < arr.length; i++) {
                    if (!hash[arr[i][identity]]) {
                        hash[arr[i][identity]] = true;
                        newArr.push(arr[i]);
                    }
                }
            } else {
                return [];
            }
            return newArr;
        }
    };
    Common.printTool = {
        printCur: function (nodekey, curId, serverUrl) {
            //已经功能节点编码获取打印模版编码
            var hash = window.location.hash;
            hash = hash.replace("#/", "");
            $._ajax({
                type: "GET",
                url:
                    "/iuap_qy/appResAllocate/queryPrintTemplateAllocate?funccode=" +
                    hash +
                    "&nodekey=" +
                    nodekey,
                datatype: "json",
                contentType: "application/json;charset=utf-8",
                success: function (result) {
                    if (result) {
                        if (result.success == "success") {
                            var data = result.detailMsg.data;
                            var templateCode = data.res_code;
                            //调用打印
                            Common.printTool.printPageByTemplateCode(
                                templateCode,
                                curId,
                                serverUrl
                            );
                        } else {
                            u.messageDialog({
                                msg: result.detailMsg.msg,
                                title: "提示",
                                btnText: "OK"
                            });
                        }
                    } else {
                        u.messageDialog({
                            msg: "无返回数据",
                            title: "操作提示",
                            btnText: "确定"
                        });
                    }
                }
            });
        },
        printPageByTemplateCode: function (templateCode, id, serverUrl) {
            //打印逻辑
            if (id != undefined && id.trim() != null) {
                //                    var tenantId = cookie.get('tenantid');//租户ID
                var tenantId = "tenant"; //固定字符串
                var serverUrl = appCtx + serverUrl; //取数据的url地址
                var params = {
                    //去后台打印数据的参数
                    id: id
                };
                params = encodeURIComponent(JSON.stringify(params)); //URL参数部分有特殊字符，必须编码(不同的tomcat对特殊字符的处理不一样)
                var url =
                    "/cloud_print_service/print/preview?tenantId=" +
                    tenantId +
                    "&printcode=" +
                    templateCode +
                    "&serverUrl=" +
                    serverUrl +
                    "&params=" +
                    params +
                    "&sendType=post";
                window.open(url);
            } else {
                u.messageDialog({
                    msg: "请选择一条数据进行打印",
                    title: "提示",
                    btnText: "确定"
                });
            }
        }
    };
    Common.referUtil = {
        //增加参照参数，如果已存在，则更新
        addParams: function (referIptId, refParams) {
            var $refMetaDom = $('#' + referIptId).parents('[data-refmodel]').eq(0);
            var existParam = $refMetaDom.attr('data-refparam');
            existParam = existParam ? JSON.parse(existParam) : {};
            var clientParam = u.extend({}, existParam, refParams);
            $refMetaDom.attr("data-refparam", JSON.stringify(clientParam));
        },
        //删除参照参数
        removeParam: function (referIptId, refParamKey) {
            var $refMetaDom = $('#' + referIptId).parent();
            var existParam = $refMetaDom.attr('data-refparam');
            existParam = existParam ? JSON.parse(existParam) : {};
            existParam[refParamKey] ? delete existParam[refParamKey] : "";
            $refMetaDom.attr("data-refparam", JSON.stringify(existParam));
        },
        // 清空已选参照
        clearRef: function (referFlag) {
            var referids = [];
            if (referFlag instanceof HTMLElement) {
                $(referFlag).find('[data-refmodel] input[id]').each(function (index, ele) {
                    referids.push($(ele).attr('id'));
                })
            }
            else {
                referids = referFlag;
            }
            if (referids && referids.length > 0) {
                for (var i = 0; i < referids.length; i++) {
                    var refContainerId = "#refContainer" + referids[i];
                    var refer = $(refContainerId).data("uui.refer");
                    refer.setValue([]);
                    refer.selectedInOpen = [];
                    refer.uncheckAll();
                    var $referInput = $('#' + referids[i]);
                    $referInput.attr('data-search', "");
                    $referInput.attr('data-ref', "");
                    $referInput.attr('title', "");
                    $(refContainerId).find('.allData').trigger('click');
                }
            }
        },
    };
    Common.fileUtil = {
        //上传文件
        upload: function (fileInput, successCallback, errorCallback, processCallback) {
            var formData = new FormData();
            var fileName = fileInput.files[0].name;
            var extName = fileName.slice(fileName.lastIndexOf('.') + 1);
            formData.append('file', fileInput.files[0]);
            formData.append('type', extName);
            var url = '/fmcg-kb/file/upload-upload';
            var xhr = new XMLHttpRequest();  // XMLHttpRequest 对象
            xhr.responseType = 'text';
            xhr.open("post", url, true); //post方式，url为服务器请求地址，true 该参数规定请求是否异步处理。
            xhr.setRequestHeader("token", localStorage.getItem('token'));
            // xhr.setRequestHeader('Content-Type', 'multipart/form-data');
            xhr.onload = uploadComplete; //请求完成
            xhr.onerror = uploadFailed; //请求失败
            xhr.upload.onprogress = progressFunction;//【上传进度调用方法实现】
            xhr.upload.onloadstart = function () {//上传开始执行方法
                console.log("上传开始执行:", arguments);
                ot = new Date().getTime();   //设置上传开始时间
                oloaded = 0;//设置上传开始时，以上传的文件大小为0
            };
            xhr.send(formData); //开始上传，发送form数据
            function uploadComplete(e) {
                var statusCode = e.target.status;
                if (statusCode == 200) {
                    var fileUrl = e.target.responseText;
                    console.log("上传成功，文件路径为:", fileUrl);
                    successCallback(fileUrl);
                }
                else if (statusCode == 500) {
                    var businessException = e.target.responseText;
                    businessException = businessException ? JSON.parse(businessException) : {};
                    if (errorCallback) {
                        errorCallback(e, businessException.message);
                    }
                    else {
                        toastr.error("文件上传失败:" + businessException.message);
                    }
                }
                else {

                }
            };
            function uploadFailed(e) {
                if (errorCallback) {
                    errorCallback(e);
                }
                else {
                    toastr.error("文件上传失败");
                }
            };
            function Percentage(num, total) {
                return (Math.round(num / total * 10000) / 100.00);
                // return (Math.round(num / total * 10000) / 100.00 + "%");// 小数点后两位百分比
            };
            function progressFunction(e) {

                if (processCallback) {
                    // 计算百分比
                    var totalSize = e.total;
                    var loadedSize = e.loaded;
                    var bfb = Percentage(loadedSize, totalSize);
                    processCallback(bfb);
                }
            }
        },
        //根据文件类型返回文件描述图url
        getTypeImageUrl(fileUrl) {
            var imageTypes = ["jpg", "jpeg", "gif", "png", "bmp"];
            var excelTypes = ["xls", "xlsx"];
            var docTypes = ["doc", "docx"];
            var txtTypes = ["txt"];
            var pptTypes = ["ppt", "pptx"];
            var pdfTypes = ["pdf"];
            var zipTypes = ["rar", "zip", "7z"];
            var videoTypes = ["mp4", "avi", "wmv", "mpeg", "mp4", "mov", "mkv", "flv", "f4v", "m4v", "rmvb", "rm", "3gp"];
            var audioTypes = ["mp3", "wav", "wma", "amr"];
            if (fileUrl == null)
                return "/fmcg-web/images/defaultfile.png";
            var fileType = fileUrl.slice(fileUrl.lastIndexOf('.') + 1);
            //图片类型直接返回图片url
            if (imageTypes.indexOf(fileType) !== -1) {
                return fileUrl;
            }
            else if (excelTypes.indexOf(fileType) !== -1) {
                return "/fmcg-web/images/xls.png";
            }
            else if (docTypes.indexOf(fileType) !== -1) {
                return "/fmcg-web/images/docx.png";
            }
            else if (txtTypes.indexOf(fileType) !== -1) {
                return "/fmcg-web/images/txt.png";
            }
            else if (pptTypes.indexOf(fileType) !== -1) {
                return "/fmcg-web/images/pptx.png";
            }
            else if (pdfTypes.indexOf(fileType) !== -1) {
                return "/fmcg-web/images/pdf.png";
            }
            else if (zipTypes.indexOf(fileType) !== -1) {
                return "/fmcg-web/images/zip.png";
            }
            else if (videoTypes.indexOf(fileType) !== -1) {
                return "/fmcg-web/images/video.png";
            }
            else if (audioTypes.indexOf(fileType) !== -1) {
                return "/fmcg-web/images/audio.png";
            }
            else {
                return "/fmcg-web/images/defaultfile.png";
            }
        }
    };
    Common.childGrid = {
        batchdel: function (viewModel, dataTable, gridId) {
            var rows = viewModel[dataTable].getSelectedRows();
            var indexs = viewModel[dataTable].getSelectedIndexs();
            viewModel[dataTable].removeRows(rows);
            var delLen = indexs.length;
            for (var k = 0; k < delLen; k++) {
                var length = viewModel[dataTable].getAllRows().length;
                for (var i = indexs[k]; i < length; i++) {
                    var curTr = $('#grid_' + gridId + '_content_tbody').find('tr')[i];
                    // del(curTr, i, viewModel);
                    Common.childGrid.del(curTr, i, viewModel);
                }
            }
        },

        del: function (curTr, i, viewModel) {
            var metaDom = $(curTr).find('[u-meta]')
            for (var j = 0; j < metaDom.length; j++) {
                var jsonTemp = JSON.parse(metaDom.eq(j).attr('u-meta'));
                if (jsonTemp.type == 'uiRefer') {
                    var input = metaDom.eq(j).find('input')[0]
                    $(input).attr('id', jsonTemp.field + i)
                    var val = $(input).val();
                    $(input).val(val);
                    jsonTemp.rowIndex = i;
                    metaDom.eq(j).attr("u-meta", JSON.stringify(jsonTemp));
                    // debugger
                    // viewModel.app.createComp(metaDom[j], viewModel);
                } else
                // if (jsonTemp.type == 'u-text') {
                {
                    var input = metaDom.eq(j).find('input')[0]
                    $(input).attr('id', jsonTemp.field + i)
                    jsonTemp.rowIndex = i;
                    metaDom.eq(j).attr("u-meta", JSON.stringify(jsonTemp));

                    // var innerStr = '<div class=\'u-text\' style="width:100%;padding:5px;" u-meta=""><input class="u-input" id="'+i+'" type="text"></div>';
                    var innerStr = metaDom[j].parentElement.innerHTML;
                    var innerDom = u.makeDOM(innerStr);
                    $(innerDom).attr("u-meta", JSON.stringify(jsonTemp));
                    var parDom = metaDom[j].parentElement;
                    parDom.innerHTML = '';
                    parDom.appendChild(innerDom);

                    viewModel.app.createComp(innerDom, viewModel);
                }

            }
        }
    };
    Common.validate = {

        validate: function (ele, noNeedValidateArr) {
            var passed = true;
            // var compos = self.app.comps;
            var compos = Common.validate.getComps(ele);
            var notPassedArr = new Array();
            for (var i = 0; i < compos.length; i++) {
                var compo = compos[i];
                var field = compo.field;
                if (field && noNeedValidateArr
                    && noNeedValidateArr.length > 0
                    && $.inArray(field, noNeedValidateArr) >= 0) {//过滤掉某些需要校验的字段
                    continue;
                }
                if (compo.doValidate) {
                    var _needTrueValue = true;
                    if (compo.type == "u-text" && compo.validType != "float") {
                        _needTrueValue = false;
                    } else {

                    }
                    var result = compo.doValidate({
                        trueValue: _needTrueValue,
                        showMsg: true
                    });
                    // 如果passed为true,result.passed为false说明第一次出现错误校验
                    if (passed && !result.passed) {
                        var off = u.getOffset(compo.element);
                        //滚动到第一次出现错误的地方
                        window.scrollTo(0, off.top - 80);
                        if (u.isIPAD) {
                            // ipad上面云表单提交校验的时候没有滚动到对应位置
                            window.top.scrollTo(0, off.top - 80);
                        }
                    }
                    passed = result.passed && passed;
                    if (!result.passed) {
                        var $ele = $(compo.element);
                        if (compo.type == 'uiRefer') {
                            $ele = $(compo.element).find('input');
                        }
                        if (compo.type != 'grid') {
                            $ele.addClass('red-border');
                        }
                        notPassedArr.push(result);
                    } else {
                        var $ele = $(compo.element);
                        if (compo.type == 'uiRefer') {
                            $ele = $(compo.element).find('input');
                        }
                        if (compo.type != 'grid') {
                            $ele.removeClass('red-border');
                        }
                    }
                    // 去掉子表参照样式显示错误的问题u-grid-err-td
                    $(ele).find('.u-grid-err-td').removeClass('u-grid-err-td');
                }

                // if (compo.required == true) {
                //     if (compo.options.type == 'u-text' || compo.options.type == 'string' || compo.options.type == 'oc-label') {
                //         if (compo.showValue == undefined || compo.showValue == null || compo.showValue == "") {
                //             compo.element.classList.add('red-border');
                //             hasNull = true;
                //         } else {
                //             compo.element.classList.remove('red-border');
                //         }
                //     } else {
                //         if (compo.showValue == undefined || compo.showValue == null || compo.showValue == "") {
                //             compo.element.children[0].classList.add('red-border');
                //             hasNull = true;
                //         } else {
                //             compo.element.children[0].classList.remove('red-border');
                //         }
                //     }
                // }
            }
            return {
                passed: passed,
                notPassedArr: notPassedArr
            };
        },

        getComps: function (element) {
            if (element) {
                return Common.validate.getCompsByElement(element);
            } else {
                return this.comps;
            }
        },
        /**
        * 获取某区域中的所有控件
        * @param {object} element
        */
        getCompsByElement: function (element) {
            var elements = element ? element : this.elements;
            var returnComps = [];
            if (typeof elements == 'string') {
                elements = document.querySelectorAll(elements);
            }
            if (!u.isArray(elements) && !(elements instanceof NodeList)) elements = [elements];
            u.each(elements, function (i, element) {
                if (element) {
                    element.querySelectorAll('[u-meta]').forEach(function (ele) {
                        if (ele['u-meta']) {
                            var comp = ele['u-meta'];
                            if (comp) returnComps.push(comp);
                        }
                    });
                }
            });
            return returnComps;
        },

        // 日期比较 d1 开始时间  d2 结束时间
        compareDate: function (d1, d2) {
            return ((new Date(d1.replace(/-/g, "\/"))) > (new Date(d2.replace(/-/g, "\/"))));
        }
    };
    //自定义ko绑定
    //日期毫秒数显示为日期文本
    ko.bindingHandlers.dateText = {
        init: function (element, valueAccessor, allBindings) {
            element.innerHTML = u.date.format(valueAccessor(), "YYYY-MM-DD");
        },
        update: function (element, valueAccessor, allBindings) {
            element.innerHTML = u.date.format(valueAccessor(), "YYYY-MM-DD");
        }
    }
    //日期毫秒数显示为日期时间文本
    ko.bindingHandlers.datetimeText = {
        init: function (element, valueAccessor, allBindings) {
            element.innerHTML = u.date.format(valueAccessor(), "YYYY-MM-DD HH:mm:ss");
        },
        update: function (element, valueAccessor, allBindings) {
            element.innerHTML = u.date.format(valueAccessor(), "YYYY-MM-DD HH:mm:ss");
        }
    }
    //下拉枚举值显示为枚举名
    ko.bindingHandlers.comboText = {
        init: function (element, valueAccessor, allBindings) {
            element.innerHTML = ko.bindingHandlers.comboText.getComboText(valueAccessor);
        },
        update: function (element, valueAccessor, allBindings) {
            element.innerHTML = ko.bindingHandlers.comboText.getComboText(valueAccessor);
        },
        getComboText: function (valueAccessor) {
            var valueObject = valueAccessor();
            var comboValue = valueObject.text;
            var comboText = "";
            var enumDataSource = window.enuminfo[valueObject.enum].dataSource;
            for (var i = 0; i < enumDataSource.length; i++) {
                if (enumDataSource[i].value == comboValue) {
                    comboText = enumDataSource[i].name;
                    break;
                }
            }
            return comboText;
        }
    }
    //图片列表绑定
    ko.bindingHandlers.imgitems = {
        init: function (element, valueAccessor, allBindings) {
            var imageUrls = (valueAccessor() || "").split(",").filter(Boolean);
            var imageStr = imageUrls.map(function (src) {
                return '<div class="ui-imgitem"><img src="' + src + '"></div>';
            }).join("");
            // if(imageUrls.length === 0){
            //   imageStr = "<span style='color:grey;'>暂无</span>"
            // }
            // new Viewer(element, {zIndex: 9999,fullscreen: true});
        },
        update: function (element, valueAccessor, allBindings) {
            var imageUrls = (valueAccessor() || "").split(",").filter(Boolean);
            var imageStr = imageUrls.map(function (src) {
                return '<div class="ui-imgitem"><img src="' + src + '"></div>';
            }).join("");
            // if(imageUrls.length === 0){
            //   imageStr = "<span style='color:grey;'>暂无</span>"
            // }
            element.innerHTML = imageStr;
            new Viewer(element, { zIndex: 9999, fullscreen: true });
        }
    }
    //照片
    ko.bindingHandlers.imageRender = {
        init: function (element, valueAccessor, allBindings) {
            var imageUrls = (valueAccessor() || "").split(",").filter(Boolean);
            var imageStr = imageUrls.map(function (src) {
                return '<img width="40" height="30" style="margin-right:1px;" src="' + src + '">';
            }).join("");
            if (imageUrls.length === 0) {
                imageStr = "<span style='color:grey;'>暂无</span>"
            }
            // new Viewer(element, {zIndex: 9999,fullscreen: true});
        },
        update: function (element, valueAccessor, allBindings) {
            var imageUrls = (valueAccessor() || "").split(",").filter(Boolean);
            var imageStr = imageUrls.map(function (src) {
                return '<img width="40" height="30" style="margin-right:1px;" src="' + src + '">';
            }).join("");
            if (imageUrls.length === 0) {
                imageStr = "<span style='color:grey;'>暂无</span>"
            }
            element.innerHTML = imageStr;
            new Viewer(element, { zIndex: 9999, fullscreen: true });
        }
    }
    return Common;
});
