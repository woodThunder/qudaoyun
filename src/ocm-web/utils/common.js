define([], function() {
    var Common = {};

    /**
     * liuweias 2018.12.19
     * 对数组中的对象按照对象的某个属性进行排序
     */
    Common.arrSort = {
        /**
         * 根据对象的某个属性对其进行由小到大排序
         *
         * @param propertyName 需要排序字段的名称
         * @returns {Function}
         */
        arrMinToMaxSort: function(propertyName) {
            return function(object1, object2) {
                var value1 = object1[propertyName];
                var value2 = object2[propertyName];
                if (value2 < value1) {
                    return 1;
                } else if (value2 > value1) {
                    return -1;
                } else {
                    return 0;
                }
            }
        },

        /**
         * 根据对象的某个属性对其进行由大到小排序
         *
         * @param propertyName 需要排序字段的名称
         * @returns {Function}
         */
        arrMaxToMinSort: function(propertyName) {
            return function(object1, object2) {
                var value1 = object1[propertyName];
                var value2 = object2[propertyName];
                if (value2 > value1) {
                    return 1;
                } else if (value2 < value1) {
                    return -1;
                } else {
                    return 0;
                }
            }
        }

    };

    /**
     * 获得页面参数
     * @param {String} [field] [参数名]
     * @return {String} [value][参数值]
     */
    Common.getParameter = function(url) {
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

    /**
     * js对象转换url参数
     */
    Common.toUrlParam = function(obj) {
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
    Common.htmlEncode = function(html) {
        //1.首先动态创建一个容器标签元素，如DIV
        var temp = document.createElement("div");
        //2.然后将要转换的字符串设置为这个元素的innerText(ie支持)或者textContent(火狐，google支持)
        temp.textContent != undefined ?
            (temp.textContent = html) :
            (temp.innerText = html);
        //3.最后返回这个元素的innerHTML，即得到经过HTML编码转换的字符串了
        var output = temp.innerHTML;
        temp = null;
        return output;
    };
    Common.htmlDecode = function(text) {
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
        toMap: function(array, nameField, valueField) {
            var results = [{
                value: "",
                name: "请选择"
            }];
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
        valueToName: function(value, datasource) {
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
        valueToObj: function(value, datasource) {
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
        filterByDr: function(items) {
            return items.filter(function(item) {
                return item.dr == 0;
            });
        },
        filterByfield: function(items, field, value, notinflag) {
            if (!u.isArray(value)) {
                value = [value];
            }
            return items.filter(function(item) {
                if (notinflag) {
                    //反向过滤
                    return $.inArray(item[field], value) == -1;
                }
                return $.inArray(item[field], value) > -1;
            });
        },
        // 数据格式转换
        convertObjArray: function(srcArray, relObj) {
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
        diff: function(objKey, array1, array2) {
            var keyMap = {};
            var diffArray = [];
            for (var i = 0; i < array2.length; i++) {
                keyMap[array2[i][objKey]] = true;
            }
            for (var i = 0; i < array1.length; i++) {
                var key = array1[i][objKey];
                if (keyMap[key] !== true) { //此对象array2中不存在，则加入差集
                    diffArray.push(array1[i]);
                }
            }
            return diffArray;
        }
    };
    Common.tools = {
        format: function(shijianchuo) {
            //日期格式格式化
            function add0(m) {
                return m < 10 ? '0' + m : m
            }
            //shijianchuo是整数，否则要parseInt转换
            var time = new Date(shijianchuo);
            var y = time.getFullYear();
            var m = time.getMonth() + 1;
            var d = time.getDate();
            var h = time.getHours();
            var mm = time.getMinutes();
            var s = time.getSeconds();
            return y + '-' + add0(m) + '-' + add0(d) + ' ' + add0(h) + ':' + add0(mm) + ':' + add0(s);
        },
    };
    Common.rendertype = {
        // 合同状态format
        contracStateFormat: function(val) {
            var name = "";
            switch (value) {
                case 0:
                    name = "自由";
                    break;
                case 1:
                    name = "发布";
                    break;
                case 2:
                    name = "终止";
                    break;
                case 3:
                    name = "冻结";
                    break;
                default:
                    break;
            }
            return name;
        },
        // 第三方结算
        thridSettlementFormat: function(val) {
            var name = "";
            switch (value) {
                case 0:
                    name = "不包含";
                    break;
                case 1:
                    name = "商品价差结算";
                    break;
                case 2:
                    name = "外包服务结算";
                    break;
                default:
                    break;
            }
            return name;
        },
        approveFormat: function(value) {
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
        approveFormat: function(value) {
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
        permitRender: function(params) {
            params.element.innerHTML = "允许";
            /*默认1表示启用，0表示停用*/
            if (params.value != 0 && params.value != "0") {
                params.element.innerHTML = "禁止";
            }
        },
        enableRender: function(params) {
            params.element.innerHTML = "停用";
            /*默认1表示已启用，0表示未启用 ，2表示已停用 */
            if (params.value == 0 || params.value == "0") {
                params.element.innerHTML = "未启用";
            }
            if (params.value == 1 || params.value == "1") {
                params.element.innerHTML = "已启用";
            }
            if (params.value == 2 || params.value == "2") {
                params.element.innerHTML = "已停用";
            }
        },
        addPercentage: function(params) {
            if (params.value) {
                params.element.innerHTML = params.value + '%'
            }
        },
        effectiveRender: function(params) {
            params.element.innerHTML = "无效";
            /*默认1表示启用，0表示停用*/
            if (params.value != 0 && params.value != "0") {
                params.element.innerHTML = "有效";
            }
        },
        userRender: function(params) {
            params.element.innerHTML = "淘汰";
            /*默认1表示在用，0表示淘汰*/
            if (params.value != 0 && params.value != "0") {
                params.element.innerHTML = "在用";
            }
        },
        whetherRender: function(params) {
            params.element.innerHTML = "否";
            /*默认1表示启用，0表示停用*/
            if (params.value != 0 && params.value != "0") {
                params.element.innerHTML = "是";
            }
        },
        // 单表操作
        operation4single: function(obj) {
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
        //主子表操作
        operation: function(obj) {
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
        // 包含数据权限的编辑删除操作
        operation4auth: function(obj) {
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
        detailRender: function(obj) {
            var viewModel = obj.gridObj.viewModel;
            var dataTableRowId = obj.row.value["$_#_@_id"];
            var detailfun = "data-bind=click:detail.bind($data," +
                dataTableRowId +
                ")";
            obj.element.innerHTML =
                '<a href="#" class="ui-a-detail" ' +
                detailfun +
                ">" +
                obj.value +
                "</a>";
            ko.cleanNode(obj.element);
            ko.applyBindings(viewModel, obj.element);
        },
        approveRender: function(params) {
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
        precision2Render: function(obj) {
            var value = new u.NumberFormater(2).format(parseFloat(obj.value));
            obj.element.innerHTML = value;
        },
        precision3Render: function(obj) {
            var value = new u.NumberFormater(3).format(parseFloat(obj.value));
            obj.element.innerHTML = value;
        },
        //表格下拉编辑框
        comboRender: function(obj) {
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

        //表格参照编辑框
        referRender: function(obj) {
            var gridObj = obj.gridObj;
            var gridId = gridObj.ele.id;
            var viewModel = gridObj.viewModel;
            var field = obj.gridCompColumn.options.field;
            var ele = obj.element;
            var dataTableId = gridObj.dataTable.id;
            var rowId = obj.row.value['$_#_@_id'];
            var innerStr = '<div class="u-text" style="width:85%;height:80%;margin-top:7px;" u-meta=\'{"id":"' + field + '","type":"uiRefer","data":"' + dataTableId + '","field":"' + field + '","rowId":"' + rowId + '"}\'>' +
                '<div class="u-input-group u-has-feedback" style="height:30px">' +
                '<input id=' + dataTableId + "_" + field + '_' + rowId + ' class="u-form-control" style="color:#333;height:26px; padding-right:25px;border-radius:4px;" autocomplete="off" />' +
                '<span class="u-form-control-feedback ui-icon uifont icon-bar refer" style="font-size:12px;" data-role="combo-button">' +
                '</span></div></div>';
            var innerDom = u.makeDOM(innerStr);
            ele.innerHTML = '';
            ele.appendChild(innerDom);
            viewModel.app.createComp(innerDom, viewModel);
        },
        precisionHandle: function(reffield, refprecision) {
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
    Common.events = {
      createNewComp: function (element, viewModel) {
        element.querySelectorAll('[u-meta]').forEach(function (ele) {
          var options = JSON.parse(ele.getAttribute('u-meta'));
          if (!options.id) {
            options.id = Math.random();
          }
          // 对单选框特殊处理
          if (options['type'] == 'u-radio') {
            var field = options['field'];
            ele.innerHTML = '<label class="u-radio margin-right-15">' +
              '<input type="radio" class="u-radio-button" name="' + field + '" />' +
              '<span class="u-radio-label"></span>' +
              '</label>';
          }
          options['type'] = options['type'] || 'string';
          if (options && options['type']) {
            var comp = u.compMgr.createDataAdapter({
              el: ele,
              options: options,
              model: viewModel,
              app: viewModel.app
            });
            // 下拉框特殊处理
            if (options['type'] == 'u-combobox') {
              $(ele).find("input.u-combobox-input").attr("readonly", true);
            }
            ele['u-meta'] = comp;
            viewModel.app.comps.push(comp);
          }
        });
      },
    }
    Common.dialog = {
        confirmDialogTemplate: '<div class="u-msg-dialog-top" id="{id}_top">' +
            '<div class="u-msg-dialog ui-msg-dialog" style="{width}{height}{top}">' +
            '<div class="u-msg-dialog-content">' +
            '<div class="u-msg-content">' +
            "</div>" +
            '<div class="u-msg-footer">' +
            '<a class="u-msg-cancel ui-btn ui-btn-primary">{cancelText}</a><a class="u-msg-ok ui-btn ui-btn-green margin-right-5">{okText}</a></div>' +
            "</div>" +
            "</div></div>",
        generatecontent: function(icon, msg1, msg2) {
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
        confirmDialog: function(option) {
            var icon =
                option.type == "error" ?
                "uifont icon-tubiao-shibai font-c-red" :
                "uifont icon-tubiao-jingshi font-c-yellow";
            if (option.icon) {
                icon = option.icon;
            }
            var content =
                typeof option.msg == "undefined" ?
                this.generatecontent(icon, option.msg1, option.msg2) :
                option.msg;
            var customOptions = {
                msg: content,
                template: this.confirmDialogTemplate,
                title: option.title,
                width: option.width,
                onOk: option.onOk
            };
            if (option.onCancel) {
                customOptions.onCancel = option.onCancel;
            }
            u.confirmDialog(customOptions);
        },
        stockConfirmDialogTemplate: '<div class="u-msg-dialog-top" id="{id}_top">' +
            '<div class="u-msg-dialog ui-msg-dialog" style="{width}{height}{top}">' +
            '<div class="u-msg-dialog-content">' +
            '<div class="u-msg-title">' +
            '<h4>{title}</h4>' +
            "</div>" +
            '<div class="u-msg-content">' +
            "</div>" +
            '<div class="u-msg-footer">' +
            '<a class="u-msg-cancel ui-btn ui-btn-primary hidden">{cancelText}</a><a class="u-msg-ok ui-btn ui-btn-green margin-right-5">{okText}</a></div>' +
            "</div>" +
            "</div></div>",
        stockConfirmDialog: function(data, cb) {
            if (data && (data.promptMessage != "" && data.promptMessage != null)) {
                var msg =
                    '<div class="ui-msgdialog-box left">' +
                    '<div class="ui-msgdialog-innerbox">' +
                    '<p class="ui-msgdialog-msg-main">提示信息：</p>' +
                    "</div>" +
                    '<div class="ui-msgdialog-innerbox">' +
                    '<p class="ui-msgdialog-msg-main">' +
                    data.promptMessage +
                    "</p>" +
                    "</div>" +
                    "</div> ";
                u.confirmDialog({
                    msg: msg,
                    template: this.stockConfirmDialogTemplate,
                    title: "已成功保存，该仓库设置了负库存提醒，以下商品库存量不足",
                    width: "500px",
                    onOk: cb,
                    // onCancel: cb
                });
            } else {
                if (typeof cb == "function") {
                    cb();
                }
            }
        }
    };

    Common.metautils = {
        metaHandle: function(meta, option, busimeta, filter) {
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
                            ctx: "/uitemplate_web",
                        };
                        if (option.multi) refcfg.isMultiSelectedEnabled = true;
                        if (option.refCode) refcfg.refCode = option.refCode;
                        if (option.refName) refcfg.refName = option.refName;
                        if (option.isReturnCode) refcfg.isReturnCode = option.isReturnCode;
                        if (option.refcfg) u.extend(refcfg, option.refcfg);
                        meta[option.key]["refcfg"] = JSON.stringify(refcfg);

                        //判断是否有显示字段
                        if (option.keyfordisplay) meta[option.keyfordisplay] = {
                            type: "string"
                        };

                        // 重构参照过滤参数
                        var refparam = {};
                        if (filter) {
                            // 修改通过option传递的过滤参数
                            refparam['EQ_isEnable'] = "1";
                            // 修改通过业务元数据声明的过滤参数
                            if (busimeta && busimeta.refparam) {
                                var temprefparam = JSON.parse(busimeta.refparam);
                                u.extend(temprefparam, refparam);
                                busimeta.refparam = JSON.stringify(temprefparam);
                            }
                        }
                        u.extend(refparam, option.clientParam, option.refparam);
                        meta[option.key]["refparam"] = JSON.stringify(refparam);

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
        optionHandle: function(option, dataTable) {
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
                                keyArray[i].checkedValue == undefined ?
                                option.checkedValue :
                                keyArray[i].checkedValue;
                            var unCheckedValue =
                                keyArray[i].unCheckedValue == undefined ?
                                option.unCheckedValue :
                                keyArray[i].unCheckedValue;
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
                        '<input class="u-combobox-input" />' +
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
                        "<input />" + '<span class="ui-icon uf uf-calendar"></span>';
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
                    content = "<input />";
                    break;
                case "datemonth":
                    meta = {
                        type: "u-month",
                        data: dataTable,
                        field: option.key,
                        format: "MM"
                    };
                    if (option.disabledDate) {
                        meta["disabledDate"] = option.key + "disabledDate";
                    }
                    content = "<input />";
                    break;
                case "dateyearmonth":
                    meta = {
                        type: "u-yearmonth",
                        data: dataTable,
                        field: option.key,
                        format: "YYYY-MM"
                    };
                    if (option.disabledDate) {
                        meta["disabledDate"] = option.key + "disabledDate";
                    }
                    content = "<input />";
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
                    if (option.rel) {
                        meta.rel = option.rel;
                    }
                    var inputId = option.referId ?
                        option.referId :
                        option.key + new Date().getTime();
                    content =
                        '<input id="' +
                        inputId +
                        '" readonly="readonly" autocomplete="off"/>' +
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
                        datasource: option.datasource ? option.datasource : CONST.ENABLESTATUS,
                        defaultvalue: option.defaultvalue
                    });
                    content = "<label u-meta='" + tempMeta + "'></label>";
                    break;
                case "textreadonly":
                    var tempMeta = {
                        type: "oc-label",
                        data: dataTable,
                        field: option.key
                    };
                    if (option.format) tempMeta.format = option.format;
                    content = "<label u-meta='" + JSON.stringify(tempMeta) + "'></label>";
                    break;
                case "citypicker":
                    meta = {
                        type: "u-citypicker",
                        data: dataTable,
                        field: option.key,
                    };
                    var inputId = option.pickerId;
                    content = '<input id="' + inputId + '"class="form-control u-citypicker">'
                    break;
                case 'intinput':
                    meta = {
                        type: "integer",
                        data: dataTable,
                        field: option.key
                    };
                    if (option.validType) {
                        meta.validType = option.validType;
                    }
                    content = "<input />";
                default:
                    meta = {
                        type: "u-text",
                        data: dataTable,
                        field: option.key
                    };
                    if (option.validType) {
                        meta.validType = option.validType;
                    }
                    content = "<input />";
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
                // 统一处理enable参数
                if (option.enable === false) {
                    meta["enable"] = option.enable + "";
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
            if (option.visible != undefined) {
              newoption.cls += ' hidden ';
              newoption.required = false;
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
        urlHandle: function(urls, viewModel) {
            var url, comboarr;
            if (u.isArray(urls) && urls.length > 0) {
                this.loopajax(urls.length - 1, urls, viewModel);
            }
            return;
        },
        loopajax: function(index, urls, viewModel) {
            if (index < 0) {
                return;
            }
            var self = this;
            var url = urls[index].url;
            var comboarr = urls[index].comboarr;
            var namefield = urls[index].namefield;
            var valuefield = urls[index].valuefield;
            var hasAll = urls[index].hasAll;

            $.ajax({
                type: "get",
                dataType: "json",
                url: url,
                async: false,
                complete: function() {
                    setTimeout("u.hideLoader({hasback:true});", 200);
                    index--;
                    self.loopajax(index, urls, viewModel);
                },
                success: function(data) {
                    var tempcombodata = self.toMap(data, namefield, valuefield);
                    if (hasAll) {
                        tempcombodata.unshift({
                            name: "全部",
                            value: CONST.DEFAULTOPTION
                        });
                    }
                    viewModel[comboarr](tempcombodata);
                }
            });
        },
        toMap: function(array, nameField, valueField) {
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
        openedPage: {},
        //跳转单据页
        goBillPanel: function(f) {
            if (!f) {
                f = function() {
                    console.log('没有回调方法')
                }
            }
            // 约定：定义模板的busiObject与菜单编码一致
            var menuCode = location.hash.split('/')[1].split("?")[0];
            // 判断该节点是否已经初始化过，如果是则直接显示
            if (this.editTemplate && !Common.bill.openedPage[menuCode + "edit"]) {
                var viewModel = this;
                var editTemplate = this.editTemplate;
                Common.bill.openedPage[menuCode + "edit"] = true;
                // 调用模板解析引擎生成模板
                editTemplate.getPage({
                    matchParam: {
                        busiObjCode: menuCode,
                        tmplTypeId: "pc-edit",
                        // 从appurl中取参数。
                        tranTypeId: window.__occ_app_param__ && window.__occ_app_param__.tranType,
                    },
                    billStatus: viewModel.billPanelStatus && viewModel.billPanelStatus(),
                    success: function(pageEle) {
                        $(".ui-bill-panel .ui-panel-head").append(pageEle);
                        if (viewModel.childButtons) {
                            $('.tab-content').after('<ui-buttons data-bind=\'visible:isBomPanel()\' params=\'datasource:$root.buttonEditSource\'></ui-buttons>');
                        }
                        $(".ui-panel").hide();
                        $(".ui-bill-panel").show();
                        $(".ui-bill-panel").animateCss("fadeIn");
                        // 因为u.createApp中对appcomps的处理是异步的，这里用setTimeout实现等待
                        setTimeout(function() {
                            // 成功后回调
                            f();
                            // 解析参照字段的关联字段
                            editTemplate.updateExtendData();
                        }, 0);
                    },
                    viewModel: viewModel
                });
            } else {
                $(".ui-panel").hide();
                $(".ui-bill-panel").show();
                $(".ui-bill-panel").animateCss("fadeIn");
                f();
            }
        },
        goDialogBillPanel: function(f) {
            if (!f) {
                f = function() {
                    console.log('没有回调方法')
                }
            }
            // 约定：定义模板的busiObject与菜单编码一致
            var menuCode = location.hash.split('/')[1].split("?")[0];
            // 判断该节点是否已经初始化过，如果是则直接显示
            if (this.dialogTemplate && !Common.bill.openedPage[menuCode + "dialog"]) {
                var viewModel = this;
                var dialogTemplate = this.dialogTemplate;
                Common.bill.openedPage[menuCode + "dialog"] = true;
                // 调用模板解析引擎生成模板
                dialogTemplate.getPage({
                    matchParam: {
                        busiObjCode: menuCode,
                        tmplTypeId: "pc-edit",
                        tranTypeId: window.__occ_app_param__ && window.__occ_app_param__.tranType,
                    },
                    billStatus: viewModel.billPanelStatus && viewModel.billPanelStatus(),
                    success: function(pageEle) {
                        $(".ui-dialog-panel").append(pageEle);
                        setTimeout(function() {
                            f();
                            dialogTemplate.updateExtendData();
                        }, 0);
                    },
                    viewModel: viewModel
                });
            } else {
                f();
            }
        },
        //返回列表页
        retListPanel: function() {
            // $(".ui-bill-panel").hide();
            // $(".ui-bill-detail").hide();
            $(".ui-panel").hide();
            $(".ui-list-panel").show();
            $(".ui-list-panel").animateCss("fadeIn");
        },
        //跳转详情页
        goDetailPanel: function(f, index) {
            if (!f) {
                f = function() {
                    console.log('没有回调方法')
                }
            }
            // $(".ui-list-panel").hide();
            var menuCode = location.hash.split('/')[1].split("?")[0];
            if (this.detailTemplate && !Common.bill.openedPage[menuCode + "detail"]) {
                var viewModel = this;
                var detailTemplate = this.detailTemplate;
                Common.bill.openedPage[menuCode + "detail"] = true;
                detailTemplate.getPage({
                    matchParam: {
                        busiObjCode: menuCode,
                        tmplTypeId: "pc-detail",
                        tranTypeId: window.__occ_app_param__ && window.__occ_app_param__.tranType,
                    },
                    billStatus: viewModel.billPanelStatus && viewModel.billPanelStatus(),
                    success: function(pageEle) {
                        $(".ui-bill-detail .ui-panel-head").append(pageEle);
                        $(".ui-panel").hide();
                        $(".ui-bill-detail").show();
                        $(".ui-bill-detail").animateCss("fadeIn");
                        setTimeout(function() {
                            // 成功后回调
                            f(index);
                            // 解析参照字段的关联字段
                            detailTemplate.updateExtendData();
                        }, 0);
                    },
                    viewModel: viewModel
                });
            } else {
                //本段代码实现了详情页中，鼠标悬浮显示全部内容。  wt 2018-09-08
                var num = $(".ui-bill-detail").find("ui-detail").find("div.ui-item").length;
                for (var i = 0; i < num; i++) {
                    var title = $(".ui-bill-detail").find("ui-detail")
                        .find("div.ui-item")[i].childNodes[1].childNodes[0].innerHTML
                    $($(".ui-bill-detail").find("ui-detail").find("div.ui-item")[i].childNodes[1].childNodes[0])
                        .attr("title", title)
                }
                $(".ui-panel").hide();
                $(".ui-bill-detail").show();
                $(".ui-bill-detail").animateCss("fadeIn");
                f(index);
            }
        },
        //详情跳转单据页
        detail2bill: function() {
            // $(".ui-bill-detail").hide();
            $(".ui-panel").hide();
            $(".ui-bill-panel").show();
            $(".ui-bill-panel").animateCss("fadeIn");
        },
        //跳转图片维护页
        goPicPanel: function() {
            $(".ui-panel").hide();
            $(".ui-bill-pic").show();
            $(".ui-bill-pic").animateCss("fadeIn");
        },
        //图片也跳转列表
        goPicPanelbill: function() {
            $(".ui-bill-pic").hide();
            $(".ui-panel").show();
            $(".ui-panel").animateCss("fadeIn");
        },
        //跳转搭配关系维护页
        goMatchPanel: function() {
            $(".ui-bill-detail").hide();
            $(".ui-bill-match").show();
            $(".ui-bill-match").animateCss("fadeIn");
        }
    };
    Common.format = {
        // 日期格式化
        dateFormat: function(dataTable, field) {
            var dateLong = this[dataTable].ref(field)();
            var dateStr = u.date.format(dateLong, "YYYY年MM月DD日");
            return dateStr;
        },
        // 审核状态格式化
        approveFormat: function(dataTable, field) {
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
        enableFormat: function(dataTable, field) {
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
        whetherFormat: function(dataTable, field) {
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
        saleEntityFormat: function(dataTable, field) {
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
        importToPage: function(importUrl, element, callback) {
            var importHtml =
                '<div id="dialog_content_import" class="import-box" style="display:none;">' +
                '<div class="u-msg-title">' +
                "<h4>导入</h4>" +
                "</div>" +
                '<div class="u-msg-content">' +
                '<div class="ui-panel-head ui-bill-head">' +
                '<div class="ui-item">' +
                '<form id="uploadForm" enctype="multipart/form-data">' +
                '<a class="ui-btn ui-btn-green importBtn">导入文件' +
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
            $dialogEle.find("#file").change(function() {
                var $element = $(importDialog.contentDom);
                var fileName = $element.find("#file")[0].files;
                var fileSize =
                    fileName[0].size > 1024 * 1024 ?
                    Math.round(fileName[0].size / (1024 * 1024)) + "MB大小" :
                    Math.round(fileName[0].size / 1024) + "KB大小";
                $element
                    .find("#fileName")
                    .text("文件名:" + fileName[0].name + "  共:" + fileSize);
                $element.find(".ui-item.begin").show();
                $element.find("#progress-bar").css("width", "0%");
                $element.find("#info-area").hide(300);
                $element.find("#error-list").empty();
            });
            var upBtn = $("#dialog_content_import .u-msg-up");
            upBtn.unbind("click").click(function() {
                //导入
                importOk(importDialog);
            });
            var okButton = $("#dialog_content_import .u-msg-ok");
            okButton.unbind("click").click(function() {
                importDialog.close();
                $(".ui-item.begin").hide();
                $("#progress-bar").css("width", "0%");
                $("#progress-num").text("0%");
                $("#error-num").text(0);
                $("#total-num").text(0);
                $("#already-num").text(0);
            });
            var cancelButton = $("#dialog_content_import .u-msg-cancel");
            cancelButton.unbind("click").click(function() {
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
                        url: appCtx + importUrl,
                        type: "POST",
                        cache: false,
                        data: new FormData($("#uploadForm")[0]),
                        processData: false,
                        contentType: false
                    })
                    .done(function(res) {
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
                    .fail(function(res) {
                        //					toastr.error(res.msg);
                    });
            }
        },
        // pageAppCtxUrl : 节点前缀，A模块下的文件放到B模块， 导致 appCtx 前缀错误
        importFile: function(
            importUrl,
            importStatusUrl,
            element,
            hasModify,
            callback,
            pageAppCtxUrl,
            extendParams
        ) {
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
                importTypeSrc: [{
                    value: false,
                    name: "新增"
                }, {
                    value: true,
                    name: "修改"
                }]
            };
            viewModel.importData.setValue("isEdit", true);
            if (hasModify === 1) {
                viewModel.importTypeSrc = [{
                    value: false,
                    name: "新增"
                }];
                viewModel.importData.setValue("isEdit", false);
            }
            viewModel.importData.removeAllRows();
            viewModel.importData.createEmptyRow();
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
                '<form id="uploadForm" enctype="multipart/form-data">' +
                '<input id="importFileType" type="hidden" name="" value=""/>' +
                '<input id="importFileTypeParams" type="hidden" name="" value=""/>' +
                '<a class="ui-btn ui-btn-green importBtn">导入文件' +
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
            $("#file").change(function() {
                // 优化，防止document中file主键重复定义，选择不对
                // var fileName = document.getElementById("file").files;
                var fileName = $(this)[0].files;
                var fileSize =
                    fileName[0].size > 1024 * 1024 ?
                    Math.round(fileName[0].size / (1024 * 1024)) + "MB大小" :
                    Math.round(fileName[0].size / 1024) + "KB大小";
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
            upBtn.unbind("click").click(function() {
                //导入
                importOk();
            });
            var okButton = $("#dialog_content_import .u-msg-ok");
            okButton.unbind("click").click(function() {
                importDialog.close();
                $(".ui-item.begin").hide();
                $("#progress-bar").css("width", "0%");
                $("#progress-num").text("0%");
                $("#error-num").text(0);
                $("#total-num").text(0);
                $("#already-num").text(0);
            });
            var cancelButton = $("#dialog_content_import .u-msg-cancel");
            cancelButton.unbind("click").click(function() {
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
                if (extendParams) {
                    $("#importFileTypeParams").attr("name", "params");
                    $("#importFileTypeParams").attr("value", extendParams);
                }
                
            
                $("#tip-txt").show();
                $.ajax({
                        url: (pageAppCtxUrl ? pageAppCtxUrl : appCtx) + importUrl,
                        type: "POST",
                        cache: false,
                        data: new FormData($("#uploadForm")[0]),
                        processData: false,
                        contentType: false
                    })
                    .done(function(res) {
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
                                        url: (pageAppCtxUrl ? pageAppCtxUrl : appCtx) + importStatusUrl,
                                        type: "GET",
                                        contentType: false
                                    })
                                    .done(function(res) {
                                        // time = true;
                                        var loadingStatus = res.result.loadingStatus;
                                        var errorNum = res.result.errorNum;
                                        var totalNum = res.result.totalNum;
                                        var currentNum = res.result.currentNum;
                                        $("#progress-bar").css("width", loadingStatus + "%");
                                        $("#progress-num").text(loadingStatus + "%");
                                        $("#error-num").text(errorNum || 0);
                                        $("#total-num").text(totalNum || 0);
                                        $("#already-num").text(currentNum || 0);
                                        var errorList = res.error;
                                        if (errorList && errorList.length > 0) {
                                            for (var i = errorIndex; i < errorList.length; i++) {
                                                var errorItem = $('<li class="error-item"></li>');
                                                errorItem.text(errorList[i]);
                                                $("#error-list").append(errorItem);
                                            }
                                            $("#info-area").show(300);
                                            errorIndex = errorList.length;
                                            // clearTimeout(t);
                                        }
                                        if (totalNum != 0 && totalNum == currentNum && loadingStatus == "100") {
                                            time = true;
                                            $("#file").val("");
                                            if (errorList === null || errorList.length == 0) {
                                                // clearTimeout(t);
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
                                    .fail(function(res) {
                                        console.log(2);
                                        clearTimeout(t);

                                    });
                            }
                        }
                    })
                    .fail(function(res) {
                        //					toastr.error(res.msg);
                    });
            }
        },
        //导出-新
        exportFile: function(
            dataTable,
            element,
            searchParams,
            templateUrl,
            excelDataUrl,
            isAuditStatus,
            isPdf,
            pageAppCtxUrl
        ) {
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
                    },
                    isPdf: {
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
                viewModel.exportTypeSrc = [{
                    value: 0,
                    name: "导出新增模板"
                }];
                viewModel.exportRangeSrc = [];
            } else {
                viewModel.exportTypeSrc = [{
                    value: 0,
                    name: "导出新增模板"
                }, {
                    value: true,
                    name: "导出需修改的数据"
                }, {
                    value: 'false',
                    name: "导出数据"
                }];
                viewModel.exportRangeSrc = [{
                    value: 'false',
                    name: "选中的数据行"
                }, {
                    value: true,
                    name: "符合当前查询条件的全部数据行"
                }];
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
                '<div class="u-msg-content" id="validateExport"  style="margin-top: 15px">' +
                '<div class="ui-panel-head ui-bill-head">' +
                '<div class="ui-item" style="float: none;">' +
                '<div class="ui-name" style="line-height: 28px;">导出类型：</div>' +
                '<div class="ui-inputarea" style="width: auto">' +
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
                '<div class="ui-inputarea" style="width: auto">' +
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
                '<div u-meta=\'{"type":"u-text","data":"exportData","field":"isPdf"}\'>' +
                '<input type="hidden"/>' +
                "</div>" +
                "</div>" +
                "</div>" +
                "</div>" +
                "</div>" +
                '<div class="u-msg-footer">' +
                '<a class="u-msg-cancel ui-btn ui-btn-primary margin-right-5">取消</a>' +
                '<a class="u-msg-ok ui-btn ui-btn-green">确定</a>' +
                "</div>" +
                "</div>";
            $(element).empty();
            $(element).append($(exportHtml));
            ko.cleanNode(element);
            var app = u.createApp({
                el: element,
                model: viewModel
            });
            viewModel.exportData.setValue("isPdf", isPdf);
            //判断是否选择导出新增模板
            $(element)
                .find("#exportType")
                .on("click", "input", function() {
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
                        viewModel.exportData.setValue("isAll", 'false');

                    }
                });

            var exportDialog = u.dialog({
                content: "#dialog_content_export" + element.id,
                hasCloseMenu: true
            });
            var okButton = $("#dialog_content_export" + element.id + " .u-msg-ok");
            okButton.unbind("click").click(function(vent) {
                exportOk(vent);
            });
            var cancelButton = $(
                "#dialog_content_export" + element.id + " .u-msg-cancel"
            );
            cancelButton.unbind("click").click(function() {
                exportDialog.close();
            });

            function addEvent(el, type, fn) {
                if (el.addEventListener) {
                    //绝大多数非IE内核浏览器
                    el.addEventListener(type, fn, false);
                } else if (el.attachEvent) {
                    //IE内核
                    el.attachEvent("on" + type, function() {
                        fn.call(el);
                    });
                } else {
                    //选择dom元素错误
                    throw new Error("不支持该dom元素");
                }
            }

            function exportOk(vent) {
                var isAll = viewModel.exportData.getValue("isAll");
                var isEdit = viewModel.exportData.getValue("isEdit");
                var excelFileName = viewModel.exportData.getValue("excelFileName");
                var isPdf = viewModel.exportData.getValue("isPdf");
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
                var ids = selectRowsArr.map(function(row, index, arr) {
                    return row.getValue("id");
                });
                $("#exportForm").remove();
                var form = $(
                    "<form id='exportForm'><iframe id='exportIframe' name='exportFrame' frameborder='0'></iframe></form>"
                ); //定义一个form表单
                form.attr("style", "display:none"); //在form表单中添加查询参数
                form.attr("target", "exportFrame");
                form.attr("method", "post");
                form.attr("action", (pageAppCtxUrl ? pageAppCtxUrl : appCtx) + exportUrl);

                var input1 = $("<input>");
                input1.attr("type", "hidden");
                input1.attr("name", "ids");
                input1.attr("value", ids);

                var input2 = $("<input>");
                input2.attr("type", "hidden");
                input2.attr("name", "excelFileName");
                input2.attr("value", excelFileName);


                var input6 = $("<input>");
                input6.attr("type", "hidden");
                input6.attr("name", "isPdf");
                input6.attr("value", isPdf);


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
                form.append(input6);
                if (searchParams) {
                    form.append(input4);
                } //将查询参数控件提交到表单上
                form.append(input5); //将查询参数控件提交到表单上
                var ifr = document.getElementById("exportIframe");
                addEvent(ifr, "load", function() {
                    var pre = this.contentDocument.getElementsByTagName("pre");
                    if (pre && pre.length > 0) {
                        var str = pre[0].innerText;
                        var msg = JSON.parse(str).msg;
                        var status = JSON.parse(str).status;
                        if (status == "success") {
                            toastr.success(msg);
                        } else {
                            toastr.error(msg);
                        }
                    }
                });
                form.submit();
                exportDialog.close();
            }
        },
        //只能导出数据的导出
        exportFileDirect: function(
            dataTable,
            element,
            searchParams,
            templateUrl,
            excelDataUrl,
            isAuditStatus,
            isPdf,
            pageAppCtxUrl
        ) {
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
                    },
                    isPdf: {
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
                viewModel.exportTypeSrc = [{
                    value: false,
                    name: "导出数据"
                }];
                viewModel.exportRangeSrc = [];
            } else {
                viewModel.exportTypeSrc = [
                    //     {
                    //     value: 0,
                    //     name: "导出新增模板"
                    // }, {
                    //     value: true,
                    //     name: "导出需修改的数据"
                    // },
                    {
                        value: false,
                        name: "导出数据"
                    }
                ];
                viewModel.exportRangeSrc = [{
                    value: false,
                    name: "选中的数据行"
                }, {
                    value: true,
                    name: "符合当前查询条件的全部数据行"
                }];
            }
            //初始默认选择导出新增模板
            viewModel.exportData.setValue("isEdit", 'false');
            viewModel.exportData.setValue("isAll", false);
            var exportHtml =
                '<div id="dialog_content_export' +
                element.id +
                '">' +
                '<div class="u-msg-title">' +
                "<h4>导出</h4>" +
                "</div>" +
                '<div class="u-msg-content" id="validateExport"  style="margin-top: 15px">' +
                '<div class="ui-panel-head ui-bill-head">' +
                '<div class="ui-item" style="float: none;">' +
                '<div class="ui-name" style="line-height: 28px;">导出类型：</div>' +
                '<div class="ui-inputarea" style="width: auto">' +
                '<div u-meta=\'{"type":"u-radio","data":"exportData","field":"isEdit","datasource":"exportTypeSrc","required":true}\' id="exportType">' +
                '<label  class="u-radio margin-right-10" >' +
                '<input type="radio" class="u-radio-button" name="exportType">' +
                '<span class="u-radio-label"></span>' +
                "</label>" +
                "</div>" +
                "</div>" +
                "</div>" +
                '<div class="ui-item" style="float: none" id="exportRange">' +
                '<div class="ui-name" style="line-height: 28px;">导出范围：</div>' +
                '<div class="ui-inputarea" style="width: auto">' +
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
                '<div u-meta=\'{"type":"u-text","data":"exportData","field":"isPdf"}\'>' +
                '<input type="hidden"/>' +
                "</div>" +
                "</div>" +
                "</div>" +
                "</div>" +
                "</div>" +
                '<div class="u-msg-footer">' +
                '<a class="u-msg-cancel ui-btn ui-btn-primary margin-right-5">取消</a>' +
                '<a class="u-msg-ok ui-btn ui-btn-green">确定</a>' +
                "</div>" +
                "</div>";
            $(element).empty();
            $(element).append($(exportHtml));
            ko.cleanNode(element);
            var app = u.createApp({
                el: element,
                model: viewModel
            });
            viewModel.exportData.setValue("isPdf", isPdf);
            //判断是否选择导出新增模板
            $(element)
                .find("#exportType")
                .on("click", "input", function() {
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
            okButton.unbind("click").click(function(vent) {
                exportOk(vent);
            });
            var cancelButton = $(
                "#dialog_content_export" + element.id + " .u-msg-cancel"
            );
            cancelButton.unbind("click").click(function() {
                exportDialog.close();
            });

            function addEvent(el, type, fn) {
                if (el.addEventListener) {
                    //绝大多数非IE内核浏览器
                    el.addEventListener(type, fn, false);
                } else if (el.attachEvent) {
                    //IE内核
                    el.attachEvent("on" + type, function() {
                        fn.call(el);
                    });
                } else {
                    //选择dom元素错误
                    throw new Error("不支持该dom元素");
                }
            }

            function exportOk(vent) {
                var isAll = viewModel.exportData.getValue("isAll");
                var isEdit = viewModel.exportData.getValue("isEdit");
                var excelFileName = viewModel.exportData.getValue("excelFileName");
                var isPdf = viewModel.exportData.getValue("isPdf");
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
                var ids = selectRowsArr.map(function(row, index, arr) {
                    return row.getValue("id");
                });
                $("#exportForm").remove();
                var form = $(
                    "<form id='exportForm'><iframe id='exportIframe' name='exportFrame' frameborder='0'></iframe></form>"
                ); //定义一个form表单
                form.attr("style", "display:none"); //在form表单中添加查询参数
                form.attr("target", "exportFrame");
                form.attr("method", "post");
                form.attr("action", (pageAppCtxUrl ? pageAppCtxUrl : appCtx) + exportUrl);

                var input1 = $("<input>");
                input1.attr("type", "hidden");
                input1.attr("name", "ids");
                input1.attr("value", ids);

                var input2 = $("<input>");
                input2.attr("type", "hidden");
                input2.attr("name", "excelFileName");
                input2.attr("value", excelFileName);


                var input6 = $("<input>");
                input6.attr("type", "hidden");
                input6.attr("name", "isPdf");
                input6.attr("value", isPdf);


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
                form.append(input6);
                if (searchParams) {
                    form.append(input4);
                } //将查询参数控件提交到表单上
                form.append(input5); //将查询参数控件提交到表单上
                var ifr = document.getElementById("exportIframe");
                addEvent(ifr, "load", function() {
                    var pre = this.contentDocument.getElementsByTagName("pre");
                    if (pre && pre.length > 0) {
                        var str = pre[0].innerText;
                        var msg = JSON.parse(str).msg;
                        var status = JSON.parse(str).status;
                        if (status == "success") {
                            toastr.success(msg);
                        } else {
                            toastr.error(msg);
                        }
                    }
                });
                form.submit();
                exportDialog.close();
            }
        },
        exportTemplate: function(
            dataTable,
            element,
            searchParams,
            templateUrl,
            excelDataUrl,
            pageAppCtxUrl
        ) {
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
                    // isPdf: {
                    //     type: "string"
                    // }
                }
            };
            var viewModel = {
                exportData: new u.DataTable(exportmeta),
                listData: dataTable,
                exportTypeSrc: [{
                    value: 0,
                    name: "导出新增模板"
                }]
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
                '<div class="u-msg-content" id="validateExport" style="maigin-top: 15px">' +
                '<div class="ui-panel-head ui-bill-head">' +
                '<div class="ui-item" style="float: none;margin-top: 0px">' +
                '<div class="ui-name" style="line-height: 28px;">导出类型：</div>' +
                '<div class="ui-inputarea" style="width: auto">' +
                '<div u-meta=\'{"type":"u-radio","data":"exportData","field":"isEdit","datasource":"exportTypeSrc","required":true}\' id="exportType">' +
                '<label  class="u-radio margin-right-10" >' +
                '<input type="radio" class="u-radio-button" name="exportType">' +
                '<span class="u-radio-label"></span>' +
                "</label>" +
                "</div>" +
                "</div>" +
                '<div class="u-msg-footer" style="padding-top: 8px">' +
                '<a class="u-msg-cancel ui-btn ui-btn-primary margin-right-5">取消</a>' +
                '<a class="u-msg-ok ui-btn ui-btn-green">确定</a>' +
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
            okButton.unbind("click").click(function() {
                exportOk();
            });
            var cancelButton = $("#dialog_content_export2 .u-msg-cancel");
            cancelButton.unbind("click").click(function() {
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
                var ids = selectRowsArr.map(function(row, index, arr) {
                    return row.getValue("id");
                });
                $("#exportForm").remove();
                var form = $("<form id='exportForm'>"); //定义一个form表单
                form.attr("style", "display:none"); //在form表单中添加查询参数
                form.attr("target", "");
                form.attr("method", "post");
                form.attr("action", (pageAppCtxUrl ? pageAppCtxUrl : appCtx) + exportUrl);

                var input1 = $("<input>");
                input1.attr("type", "hidden");
                input1.attr("name", "ids");
                input1.attr("value", ids);

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
        //导出-旧，不再使用
        exportFileType: function(
            dataTable,
            element,
            searchParams,
            templateUrl,
            excelDataUrl,
            type
        ) {
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
                exportRangeSrc: [{
                    value: false,
                    name: "选中的数据行"
                }, {
                    value: true,
                    name: "符合当前查询条件的全部数据行"
                }]
            };
            viewModel.exportData.removeAllRows();
            viewModel.exportData.createEmptyRow();
            //初始默认选择导出新增模板
            viewModel.exportData.setValue("isEdit", 0);
            var exportHtml =
                '<div id="dialog_content_export' +
                element.id +
                '">' +
                '<div class="u-msg-title">' +
                "<h4>导出</h4>" +
                "</div>" +
                '<div class="u-msg-content" id="validateExport"  style="margin-top: 15px">' +
                '<div class="ui-panel-head ui-bill-head">' +
                '<div class="ui-item" style="float: none;">' +
                '<div class="ui-name" style="line-height: 28px;">导出类型：</div>' +
                '<div class="ui-inputarea" style="width: auto">' +
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
                '<div class="ui-inputarea" style="width: auto">' +
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
                '<a class="u-msg-cancel ui-btn ui-btn-primary margin-right-5">取消</a>' +
                '<a class="u-msg-ok ui-btn ui-btn-green">确定</a>' +
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
                .on("click", "input", function() {
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
            okButton.unbind("click").click(function(vent) {
                exportOk(vent);
            });
            var cancelButton = $(
                "#dialog_content_export" + element.id + " .u-msg-cancel"
            );
            cancelButton.unbind("click").click(function() {
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
                var ids = selectRowsArr.map(function(row, index, arr) {
                    return row.getValue("id");
                });
                $("#exportForm").remove();
                var form = $("<form id='exportForm'>"); //定义一个form表单
                form.attr("style", "display:none"); //在form表单中添加查询参数
                form.attr("target", "");
                form.attr("method", "post");
                form.attr("action", appCtx + exportUrl);

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
                form.submit();
                exportDialog.close();
            }
        }
    };
    Common.treeUtil = {
        getDownLevelByUpLevel: function(up, pid_ids) {
            var down = [];
            for (var i = 0; i < up.length; i++) {
                var pid = up[i];
                var ids = pid_ids[pid];
                ids ? (down = down.concat(ids)) : "";
            }
            return down;
        },
        getLevelArr: function(pid_ids, rootKey) {
            var levelArr = [];
            var upLevel = [rootKey];
            for (var i = 0; i < 10; i++) {
                var downLevel = this.getDownLevelByUpLevel(upLevel, pid_ids);
                if (downLevel.length == 0) {
                    break;
                }
                upLevel = downLevel;
                levelArr.push(downLevel);
            }
            return levelArr;
        },
        toMapPid_ids: function(treeData, idKey, pidKey, rootKey) {
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
        orderTreeByLevel: function(treeData, id, pid) {
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
            return orderedTreeData;
        }
    };
    Common.arrayUtil = {
        // 对象数组根据对象上某一个字段去重
        uniqBy: function(arr, identity) {
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
        printCur: function(nodekey, curId, serverUrl) {
            //已经功能节点编码获取打印模版编码
            var hash = window.location.hash;
            hash = hash.replace("#/", "");
            $.ajax({
                type: "GET",
                url: "/iuap_qy/appResAllocate/queryPrintTemplateAllocate?funccode=" +
                    hash +
                    "&nodekey=" +
                    nodekey,
                datatype: "json",
                contentType: "application/json;charset=utf-8",
                success: function(result) {
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
        printPageByTemplateCode: function(templateCode, id, serverUrl) {
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
    Common.address = {
        //采购添加表格地址编辑
        addressInfo: function(options) {
            var grid = options.gridObj,
                datatable = grid.dataTable, //前一行的数据
                viewModel = grid.viewModel,
                field = options.field,
                element = options.element,
                column = grid.getColumnByField(field),
                rowId = options.rowObj['$_#_@_id'],
                row = datatable.getRowByRowId(rowId), //当前Row
                addr = row.getValue(field) ? row.getValue(field) : "双击编辑地址";

            var oldCountryId = row.getValue('countryId'), //获取原有数据
                oldProvinceId = row.getValue('provinceId'),
                oldCityId = row.getValue('cityId'),
                oldDistrictId = row.getValue('districtId'),
                oldTownId = row.getValue('townId'),
                oldReceiveAddress = row.getValue('receiveAddress'),
                oldDetailAddr = row.getValue('detailAddr');

            var htmlStr = '<div class="input-group u-has-feedback">' +
                '<input type="text" class="form-control addressinput" title="' + addr + '" placeholder="双击编辑地址">' +
                '<span class="u-form-control-feedback uf uf-symlist"></span>' +
                '</div>';
            $(element).html(htmlStr)
            ko.cleanNode(element);
            ko.applyBindings(viewModel, element);
            $(element)
                .find("input.addressinput")
                .on("dblclick", function(e) { //触发双击事件
                    var tar = e.target;
                    var provinceId = viewModel.addresscardcomp.app.getComp("provinceIdBase");
                    var cityId = viewModel.addresscardcomp.app.getComp("cityIdBase");
                    var districtId = viewModel.addresscardcomp.app.getComp("districtIdBase");
                    var townId = viewModel.addresscardcomp.app.getComp("townIdBase");
                    if (!oldDetailAddr || oldDetailAddr == '') { //如果原有数据为空弹出框的输入框为空，默认显示中国
                        viewModel.addresscardcomp.viewModel.params.setValue("provinceId", "");
                        viewModel.addresscardcomp.viewModel.params.setValue("cityId", "");
                        viewModel.addresscardcomp.viewModel.params.setValue("districtId", "");
                        viewModel.addresscardcomp.viewModel.params.setValue("townId", "");
                        viewModel.addresscardcomp.viewModel.params.setValue('receiveAddress', '');
                        viewModel.addresscardcomp.viewModel.params.setValue('detailAddr', '');
                        viewModel.addresscardcomp.viewModel.params.setValue("countryId", "8dc2fc87-0a4f-420b-8d1a-b74b1278f24b"); //默认显示中国
                        districtId.setEnable(false);
                        cityId.setEnable(false);
                        townId.setEnable(false);
                    } else { //如果有就显示原有数据
                        viewModel.addresscardcomp.viewModel.params.setValue("provinceId", oldProvinceId);
                        viewModel.addresscardcomp.viewModel.params.setValue("cityId", oldCityId);
                        viewModel.addresscardcomp.viewModel.params.setValue("districtId", oldDistrictId);
                        viewModel.addresscardcomp.viewModel.params.setValue("townId", oldTownId);
                        viewModel.addresscardcomp.viewModel.params.setValue('receiveAddress', oldReceiveAddress);
                        viewModel.addresscardcomp.viewModel.params.setValue('detailAddr', oldDetailAddr);
                        viewModel.addresscardcomp.viewModel.params.setValue("countryId", oldCountryId);
                        if (oldCityId && oldCityId != '') { //判断城市不为空则设置为可编辑
                            cityId.setEnable(true);
                            districtId.setEnable(true);
                        } else {
                            cityId.setEnable(false);
                            districtId.setEnable(false);
                            townId.setEnable(false);
                        }
                        if (oldDistrictId && oldDistrictId != '') {
                            districtId.setEnable(true);
                            townId.setEnable(true);
                        } else {
                            districtId.setEnable(false);
                            townId.setEnable(false);
                        }
                    }
                    viewModel.addresscardcomp.show("地址信息", "800px", viewModel.addrOk); //弹出对话框并设置保存按钮的方法
                });
        },
        showAddItemsRef: function(viewModel) {
            viewModel.hadIds = [];

            if (!viewModel.countryId) {
                $._ajax({
                    type: "get",
                    url: viewModel.districtUrlCountry,
                    dataType: "json",
                    // data: queryData,
                    success: function(data) {
                        var countryId = data.id;
                        $._ajax({
                            type: "get",
                            url: viewModel.districturlProvince + '?' + 'countryId=' + countryId,
                            dataType: "json",
                            success: function(data) {
                                var arr = [];
                                if (data.length) {
                                    for (var i = 0, len = data.length; i < len; i++) {
                                        if (data[i].isEnable == 1 || data[i].isEnable == '1') {
                                            arr.push(data[i]);
                                        }
                                    }
                                }
                                viewModel.simpleListTree.removeAllRows();
                                viewModel.simpleListTree.setSimpleData(arr, {
                                    unSelect: true
                                });
                            }
                        });
                    },
                });
            }
            popupDialog = u.dialog({
                id: 'district-popup',
                content: "#district-popup",
                "width": "500px",
                "height": "500px"
            });
            var okButton = $("#district-popup .u-msg-ok");
            okButton.unbind("click").click(function() { //保存按钮
                viewModel.fourleveladdr(viewModel);
            });
            var cancelButton = $("#district-popup .u-msg-cancel");
            cancelButton.unbind("click").click(function() {
                popupDialog.close();
            });
        },
        // 四级地址选择
        fourleveladdr: function(viewModel) {
            var allCahecked = $('#markIcon .ztree span.button[checked="checked"]');
            if (allCahecked && allCahecked.size() > 0) {
                for (var i = 0, len = allCahecked.size(); i < len; i++) {
                    var pLi = $(allCahecked[i]).parents('li').first();
                    if (pLi.hasClass('level2')) {
                        var pLiPLi = pLi.parents('li').first();
                        var spanIco = pLiPLi.find('span[level="1"]').first();
                        if (spanIco.attr('checked') && spanIco.attr('checked') == 'checked') {
                            continue;
                        }
                    }
                    var spanDate = $(allCahecked[i]).attr('data');
                    if (!spanDate || spanDate == undefined) continue;
                    var datas = JSON.parse(spanDate);
                    var dlen = datas.district.length;
                    for (var dL = 0; dL < dlen; dL++) {
                        if (datas.town) {
                            var row = viewModel.districtItem.getRowByField("townId", datas.town.townId);
                            if (row) {
                                continue;
                            }
                        } else {
                            var row = viewModel.districtItem.getRowByField("districtId", datas.district[dL].districtId);
                            if (row) {
                                continue;
                            }
                        }
                        var newrow = viewModel.districtItem.createEmptyRow();
                        newrow.setValue("provinceId", datas.province.provinceId);
                        newrow.setValue("provinceCode", datas.province.provinceCode);
                        newrow.setValue("provinceName", datas.province.provinceName);

                        newrow.setValue("cityId", datas.city.cityId);
                        newrow.setValue("cityCode", datas.city.cityCode);
                        newrow.setValue("cityName", datas.city.cityName);


                        newrow.setValue("districtId", datas.district[dL].districtId);
                        newrow.setValue("districtCode", datas.district[dL].districtCode);
                        newrow.setValue("districtName", datas.district[dL].districtName);

                        if (datas.town) {
                            newrow.setValue("townId", datas.town.townId);
                            newrow.setValue("townCode", datas.town.townCode);
                            newrow.setValue("townName", datas.town.townName);
                        }
                    }
                }
                popupDialog.close();
            } else {
                toastr.warning('请选择至少一个三级或四级地址！')
            }

        },
        //树点击事件
        clickTree: function(viewModel, e) {
            //获取到被点击的树节点行号
            var num = viewModel.simpleListTree.selectedIndices()[0];
            if (num == null) {
                return
            }
            var allData = viewModel.simpleListTree.getSimpleData(),
                pId = allData[num].id;
            if ($.inArray(pId, viewModel.hadIds) == -1 && allData[num].areaLevel != 4) {
                $._ajax({
                    type: "get",
                    url: viewModel.districturl + '?' + 'parentId=' + pId + '&includeSelf=' + 0 + '&recursive=' + 0,
                    dataType: "json",
                    success: function(data) {
                        viewModel.hadIds.push(pId);
                        if (data.length) {
                            var arrD = [];
                            for (var i = 0, len = data.length; i < len; i++) {
                                if (data[i].isEnable == 1 || data[i].isEnable == '1') {
                                    arrD.push(data[i]);
                                }
                            }
                        }
                        if (arrD) {
                            viewModel.simpleListTree.addSimpleData(arrD);
                        } else {
                            toastr.warning('已没有下级地址！')
                        }
                    }
                })
            }
            // 增行 四级地址选择 start---------
            var checkIco = $(e.target);
            if (typeof((checkIco).attr("treenode_ico")) !== "undefined") {
                var li = checkIco.parents('li'),
                    level = li.length - 1;
                if (li.first().hasClass('level0')) {
                    return;
                }
                checkIco.attr('level', level);
                if (checkIco.attr('checked') && checkIco.attr('checked') == 'checked') {
                    if (level != 3) {
                        var lilv1 = checkIco.parents('li.level1').first(),
                            icoSpan = lilv1.find('span[checked="checked"]').first();
                        if (icoSpan.size()) {
                            icoSpan.removeAttr('checked');
                            icoSpan.removeClass('checked');
                        }
                    }
                    checkIco.removeAttr('checked');
                    checkIco.removeClass('checked');
                } else {
                    if (checkIco.attr('num') != num) {
                        checkIco.attr('num', num);
                        checkIco.attr('checked', 'checked');
                        checkIco.addClass('checked');
                    } else {
                        checkIco.attr('checked', 'checked');
                        checkIco.addClass('checked');
                    }
                    if (level == 2) {
                        var lilv1 = checkIco.parents('li.level1').first(),
                            lilv1Checked = lilv1.find('a.level1>span').first(),
                            lilv1lis = lilv1.find('li.level2'),
                            liASpanChecked = lilv1.find('li.level2 a.level2 span[checked="checked"]');
                        if (!lilv1Checked.attr('checked') && (liASpanChecked.length == lilv1lis.length)) {
                            lilv1Checked.attr('checked', 'checked');
                            lilv1Checked.addClass('checked');
                        }
                    }
                }

                // 数据组织 start
                function findTree(treeId, checkIco, level, parentId) { //当前树id,当前点击的节点，当前是第几级，父级Id
                    //被选中的树节点id
                    var thirdId = [],
                        tempObj = {},
                        tempSimpleList = [],
                        lv2to0Id,
                        lv3to1,
                        lv3to0,
                        pli = $(checkIco).parents('li').first(),
                        nextNameAs = pli.find('li a').not('.level3');
                    //树中数据源（与列表数据相同）
                    var simpleTreeData = viewModel.simpleListTree.getSimpleData();
                    //遍历树中数据，找出本级及下级放入列表
                    for (var i = 0; i < simpleTreeData.length; i++) {
                        //本级
                        if (simpleTreeData[i].id == treeId) {
                            // tempSimpleList.push(simpleTreeData[i]);
                            if (level == 1) {
                                tempObj.city = {
                                    "type": "city",
                                    "cityId": simpleTreeData[i].id,
                                    "cityCode": simpleTreeData[i].code,
                                    "cityName": simpleTreeData[i].name
                                };
                            } else if (level == 2) {
                                tempSimpleList.push({
                                    "type": "district",
                                    "districtId": simpleTreeData[i].id,
                                    "districtCode": simpleTreeData[i].code,
                                    "districtName": simpleTreeData[i].name
                                });
                            } else if (level == 3) {
                                tempObj.town = {
                                    "type": "town",
                                    "townId": simpleTreeData[i].id,
                                    "townCode": simpleTreeData[i].code,
                                    "townName": simpleTreeData[i].name
                                };
                            }
                            continue;
                        }
                        //上级
                        if (parentId && simpleTreeData[i].id == parentId) {
                            if (level == 1) {
                                tempObj.province = {
                                    "type": "province",
                                    "provinceId": simpleTreeData[i].id,
                                    "provinceCode": simpleTreeData[i].code,
                                    "provinceName": simpleTreeData[i].name
                                };
                            } else if (level == 2) {
                                tempObj.city = {
                                    "type": "city",
                                    "cityId": simpleTreeData[i].id,
                                    "cityCode": simpleTreeData[i].code,
                                    "cityName": simpleTreeData[i].name
                                };
                                lv2to0Id = simpleTreeData[i].parentId;
                            } else if (level == 3) {
                                tempSimpleList.push({
                                    "type": "district",
                                    "districtId": simpleTreeData[i].id,
                                    "districtCode": simpleTreeData[i].code,
                                    "districtName": simpleTreeData[i].name
                                });
                                lv3to1 = simpleTreeData[i].parentId;
                            }
                            continue;
                        }
                        //下级
                        if (simpleTreeData[i].parentId == treeId) {
                            if (level == 1) {
                                tempSimpleList.push({
                                    "type": "district",
                                    "districtId": simpleTreeData[i].id,
                                    "districtCode": simpleTreeData[i].code,
                                    "districtName": simpleTreeData[i].name
                                });
                            }
                            thirdId.push(simpleTreeData[i].id);
                        }
                    }
                    if (level == 1) {} else if (level == 2) {
                        for (var i = 0; i < simpleTreeData.length; i++) {
                            //省级
                            if (simpleTreeData[i].id == lv2to0Id) {
                                tempObj.province = {
                                    "type": "province",
                                    "provinceId": simpleTreeData[i].id,
                                    "provinceCode": simpleTreeData[i].code,
                                    "provinceName": simpleTreeData[i].name
                                };
                                break;
                            }
                        }
                        // $(checkIco).attr('data', JSON.stringify(tempSimpleList));
                    } else if (level == 3) {
                        for (var i = 0; i < simpleTreeData.length; i++) {
                            //市级
                            if (simpleTreeData[i].id == lv3to1) {
                                tempObj.city = {
                                    "type": "city",
                                    "cityId": simpleTreeData[i].id,
                                    "cityCode": simpleTreeData[i].code,
                                    "cityName": simpleTreeData[i].name
                                };
                                lv3to0 = simpleTreeData[i].parentId;
                                for (var i = 0; i < simpleTreeData.length; i++) {
                                    //省级
                                    if (simpleTreeData[i].id == lv3to0) {
                                        tempObj.province = {
                                            "type": "province",
                                            "provinceId": simpleTreeData[i].id,
                                            "provinceCode": simpleTreeData[i].code,
                                            "provinceName": simpleTreeData[i].name
                                        };
                                        break;
                                    }
                                }
                                break;
                            }
                        }
                        // $(checkIco).attr('data', JSON.stringify(tempSimpleList));
                    }
                    tempObj.district = tempSimpleList;
                    var str = JSON.stringify(tempObj);
                    $(checkIco).attr('data', str);
                }

                // 数据组织 end
                switch (level) {
                    case 1:
                        if (checkIco.attr('checked') == 'checked') {
                            if ($(li[0]).find('li').size() < 1) { //如果首次点击 下级元素还没出现在页面里
                                $(li[0]).find('span.noline_close').trigger('click');
                            }
                            var lis = $(li[0]).find('li span[treenode_ico]');
                            for (var l = 0; l < lis.length; l++) {
                                var pa = $(lis[l]).parent('a');
                                if (!pa.hasClass('level3')) { //如果不是四级地址都选中
                                    $(lis[l]).addClass('checked').attr('checked', 'checked');
                                }
                            }
                            //被点击的树节点
                            var treeData = viewModel.simpleListTree.getSimpleData()[num],
                                treeId = treeData.id, //被选中的树节点id
                                parentId = treeData.parentId;
                            findTree(treeId, checkIco, 1, parentId)
                        } else {
                            var lis = $(li[0]).find('li span[treenode_ico]');
                            for (var l = 0; l < lis.length; l++) {
                                var pa = $(lis[l]).parent('a');
                                if (!pa.hasClass('level3')) { //如果不是四级地址都选中
                                    $(lis[l]).removeClass('checked').removeAttr('checked');
                                }
                            }
                        }
                        break;
                    case 2:
                        if (checkIco.attr('checked') == 'checked') {
                            //被点击的树节点
                            var treeData = viewModel.simpleListTree.getSimpleData()[num],
                                treeId = treeData.id, //被选中的树节点id
                                parentId = treeData.parentId;
                            findTree(treeId, checkIco, 2, parentId)
                        }
                        break;
                    case 3:
                        if (checkIco.attr('checked') == 'checked') {
                            //被点击的树节点
                            var treeData = viewModel.simpleListTree.getSimpleData()[num],

                                treeId = treeData.id, //被选中的树节点id
                                parentId = treeData.parentId; //父节点id
                            findTree(treeId, checkIco, 3, parentId)
                        }
                        break;
                }
            }
        },
    };

    // 商品选配
    Common.goodsOptional = {
        /**
         * @example 编辑选配common.goodsOptional.goodsOptional()
         * @param viewModel 当前viewModel, 用来挂载dialog
         * @param title     弹窗title
         * @param baseGoodsOptId     选配结果id
         * @param goodsId   商品Id
         * @param el        dialog id
         * @param callback  确定是回调函数
         */
        goodsOptional: function(viewModel, title, goodsId, baseGoodsOptId, el, CurrentRow, bomCurrent, callback) {
            Common.goodsOptional.searchOpt(goodsId, baseGoodsOptId, bomCurrent, init);

            function init(optData) {
                viewModel.goodsOptional = {
                    goodsOptDtos: []
                };
                /**
                 * 获取子件的所有选配项， 筛选出各个子件对应的选配信息，重新挂到子件外层上，方便渲染获取
                 * 现在返回时子件的所有选配熟悉在一个list，需要根据选配项的id去筛选出属于这个子件的选配信息及选配项
                 * 主用于多选项的使用
                 **/
                for (var i = 0; i < optData.length; i++) {
                    var goodsAttrVals = optData[i].goodsAttrVals;
                    var newList = [];
                    goodsAttrVals.forEach(function(goodsAttrVals) {
                        for (var i = 0; i < newList.length; i++) {
                            if (newList[i].prodAttrStrucItemId === goodsAttrVals.prodAttrStrucItemId) {
                                if (goodsAttrVals.isChecked) {
                                    newList[i].isAttrName = goodsAttrVals.attrValName;
                                }
                                newList[i].id = goodsAttrVals.id,
                                    newList[i].goodsId = goodsAttrVals.goodsId,
                                    newList[i].prodAttrStrucItemId = goodsAttrVals.prodAttrStrucItemId,
                                    newList[i].productAttrId = goodsAttrVals.productAttrId,
                                    newList[i].name = goodsAttrVals.name,
                                    newList[i].type = goodsAttrVals.productAttrTypeCode;
                                //bug PTQDYGG-1088
                                if (goodsAttrVals.isOptionalAttr) {
                                    newList[i].orderitembom.push({
                                        attrValId: goodsAttrVals.attrValId,
                                        attrValCode: goodsAttrVals.attrValCode,
                                        attrValName: goodsAttrVals.attrValName,
                                        isChecked: goodsAttrVals.isChecked
                                    });
                                } else {
                                    newList[i].orderitembom.push({
                                        attrValId: "",
                                        attrValCode: "",
                                        attrValName: "",
                                        isChecked: goodsAttrVals.isChecked
                                    });
                                }
                                return;
                            }
                        }
                        if (!goodsAttrVals.isChecked) {
                            goodsAttrVals.isChecked = goodsAttrVals.isOptionalAttr != 1 ? true : false;
                        }
                        newList.push({
                            id: goodsAttrVals.id,
                            goodsId: goodsAttrVals.goodsId,
                            prodAttrStrucItemId: goodsAttrVals.prodAttrStrucItemId,
                            productAttrId: goodsAttrVals.productAttrId,
                            type: goodsAttrVals.productAttrTypeCode,
                            name: goodsAttrVals.name,
                            isAttrName: goodsAttrVals.isChecked ? goodsAttrVals.attrValName : '',
                            isOptionalAttr: (goodsAttrVals.isOptionalAttr ? goodsAttrVals.isOptionalAttr : '0'), // 是否可选配
                            // bug PTQDYGG-1088
                            orderitembom: goodsAttrVals.isOptionalAttr ? [{
                                attrValId: goodsAttrVals.attrValId,
                                attrValCode: goodsAttrVals.attrValCode,
                                attrValName: goodsAttrVals.attrValName,
                                isChecked: goodsAttrVals.isChecked
                            }] : [{
                                attrValId: "",
                                attrValCode: "",
                                attrValName: "",
                                isChecked: goodsAttrVals.isChecked
                            }]
                        })
                    });
                    optData[i].orderitembom = newList;
                }
                // 获取当前点击行的信息
                var currentRow = CurrentRow.getCurrentRow().getSimpleData();

                // 判断如果页面存在则不再重复渲染
                if (!$('#' + el + " .goodsOptDetails").html()) {
                    var otherHtml = [
                        '<div class="goodsOptDetails">' +
                        '<div class="u-msg-title">' +
                        '<h4>' + title + '</h4>' +
                        '</div>' +
                        '<div class="u-tabs ui-tabs u-msg-content">' +
                        '<div class="special-product">' +
                        '<div id="tab-panel-1" class="u-tabs__panel is-active">' +
                        '<div class="goodsOpt_details_contnet">' +
                        '<h3 class="details_title">基本信息</h3>' +
                        '<div class="baseic_data">' +
                        '<p>' +
                        '<label>商品编码:</label>' +
                        '<span>' + (currentRow.code ? currentRow.code : currentRow.goodsCode) + '</span>' +
                        '</p>' +
                        '<p>' +
                        '<label>商品名称:</label>' +
                        '<span>' + (currentRow.displayName ? currentRow.displayName : currentRow.goodsName) + '</span>' +
                        '</p>' +
                        '<p>' +
                        '<label>商品版本:</label>' +
                        '<span>' + (currentRow.version ? currentRow.version : currentRow.goodsVersion) + '</span>' +
                        '</p>' +
                        '</div>' +
                        '</div>' +
                        '<div class="product-content margin-top-25">' +
                        '<div class="ui-table-container">' +
                        '<div class="ui-collapse-group">' +
                        '<div data-collapse>' +
                        '<h3 class="details_title">选配信息</h3>' +
                        '<div class="ui-collapse-content" id="adpater-content">' +

                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '<div class="u-msg-footer">' +
                        '<a class="ui-btn ui-btn-primary J-cancel margin-right-5">取消</a>' +
                        '<a class="ui-btn ui-btn-primary J-reset margin-right-5">重置</a>' +
                        '<a class="ui-btn ui-btn-green  J-ok">确认</a>' +
                        '</div>',
                        '</div>'
                    ].join('');
                    $(otherHtml).appendTo($('#' + el));
                    // 选配信息
                    // 此处用来判断是否有子件，
                    var tempHtml = optData.length > 1 ? optData.map(function(items, index) {
                        var optional = {
                            goodsId: items.id,
                            uniqueKey: items.id,
                            goodsOptVals: [],
                            optResult: ''
                        };
                        var isDisplay = items.isOptional != 1 ? 'none' : 'block';
                        var temp = ['<div class="adapter_data adapter_data_key" style="display: ' + isDisplay + '" data-key="' + index + '">' +
                            '<div class="adapter_data_title">' +
                            '<div class="baseic_data">' +
                            '<p class="rowFolding">' +
                            '<i class="uifont icon-tubiao-xiaosanjiao-xia" style="display: inline-block; vertical-align: top"></i>' +
                            '</p>' +
                            '<p>' +
                            '<label>商品编码:</label>' +
                            '<span>' + items.code + '</span>' +
                            '</p>' +
                            '<p>' +
                            '<label>商品名称:</label>' +
                            '<span>' + items.displayName + '</span>' +
                            '</p>' +
                            '<p>' +
                            '<label>商品版本:</label>' +
                            '<span>' + items.version + '</span>' +
                            '</p>' +
                            '</div>' +
                            '</div>' +
                            '<div>' +
                            items.orderitembom.map(function(itemBom, key) {
                                var border = items.orderitembom.length != 1 && items.orderitembom.length - 1 != key ?
                                    'border-bottom: 1px solid #eee' : '',
                                    display = itemBom.type != 'radio' && itemBom.orderitembom.length > 6 ? 'block' : 'none';
                                var prodAttrStrucItemName = itemBom.name;
                                optional[prodAttrStrucItemName] = "";
                                var prodAttrStrucItemName = itemBom.name;
                                var isChecked = itemBom.isChecked ? 'is-checked' : '';
                                var goodsOptDtos = {
                                    goodsOptId: itemBom.id,
                                    prodAttrStrucItemName: itemBom.name,
                                    prodAttrStrucItemId: itemBom.prodAttrStrucItemId,
                                    attrValId: itemBom.attrValId,
                                    attrValCode: itemBom.attrValCode,
                                    attrValName: itemBom.attrValName,
                                };
                                itemBom.attrValName = itemBom.attrValName ? itemBom.attrValName : '';
                                optional.goodsOptVals.push(goodsOptDtos);
                                var isDisplay = itemBom.isOptionalAttr != 1 ? 'none' : 'block';
                                var typeHtml = itemBom.type != '04' ? '<div class="adapter_list" style="display: ' + isDisplay + '" data-attrKey="' + key + '">' +
                                    '<div class="adapter_baseic">' +
                                    '<label class="prodAttrStrucItemName">' + itemBom.name + ':</label>' +
                                    '<span class="goodsProperty">' + itemBom.isAttrName + '</span>' +
                                    '<p class="adapter_search">' +
                                    '<input type="text" placeholder="请输入关键字"><span class="adapter_search_btn" data-index = "' + key + '">搜索</span>' +
                                    '</p>' +
                                    '</div>' +
                                    '<div class="adapter_list_radio adapter_list_radio' + key + '" style="' + border + '">' +
                                    '<div class="adapter_list_radioMore" style="display: ' + display + '">' +
                                    '<a>更多' +
                                    '<i class="uifont icon-down"></i>' +
                                    '</a>' +
                                    '</div>' +
                                    itemBom.orderitembom.map(function(itemBomItem, index) {
                                        var isChecked = itemBomItem.isChecked ? 'is-checked' : '';
                                        if (itemBomItem.isChecked) {
                                            goodsOptDtos.attrValName = itemBomItem.attrValName;
                                            goodsOptDtos.attrValCode = itemBomItem.attrValCode;
                                            goodsOptDtos.attrValId = itemBomItem.attrValId;
                                        }
                                        var attrValName = itemBomItem.isChecked ? itemBomItem.attrValName : '';
                                        var subStrAttrValName = (itemBomItem.attrValName).length > 12 ? (itemBomItem.attrValName).substr(0, 11) + '...' : itemBomItem.attrValName;
                                        return (
                                            '<label class="u-radio margin-right-15 is-upgraded ' + isChecked + '" data-prodName="' + itemBom.name + '" radioNamw="' + itemBomItem.attrValName + '" radioValue = "' + itemBomItem.attrValCode + '" radioId = "' + itemBomItem.attrValId + '">' +
                                            '<input type="radio" class="u-radio-button" name="isLegalPersonCorp" value="' + index + '">' +
                                            '<span class="u-radio-label">' + subStrAttrValName + '</span>' +
                                            '<span class="u-radio-outer-circle"></span>' +
                                            '<span class="u-radio-inner-circle"></span>' +
                                            '</label>'
                                        )
                                    }).join('') +
                                    '</div>' +
                                    '</div>' :
                                    '<div class="adapter_list" style="margin-bottom: 0; display: ' + isDisplay + '" data-attrKey="' + key + '">' +
                                    '<div class="adapter_baseic" style="' + border + '; height: 54px">' +
                                    '<label data-prodName="' + itemBom.name + '">' + itemBom.name + ':</label>' +
                                    function() {
                                        var attrName = (itemBom.isAttrName ? itemBom.isAttrName : itemBom.orderitembom[0].attrValCode) || '';
                                        var disabled = itemBom.isOptionalAttr != 1 ? '<input type="text" disabled="disabled" class="adapter_input" placeholder="请输入" value="' + attrName + '">' : '<input type="text" class="adapter_input" placeholder="请输入" value="' + attrName + '">';
                                        return disabled;
                                    }() +
                                    '</div>' +
                                    '</div>'
                                return typeHtml;
                            }).join('') +
                            '</div>' +
                            '</div>'
                        ].join("");
                        viewModel.goodsOptional.goodsOptDtos.push(optional)
                        bindEvent($(temp).appendTo($('#' + el + " #adpater-content")), items);
                    }) : optData.map(function(items, index) {
                        var optional = {
                            goodsId: items.id,
                            uniqueKey: items.id,
                            goodsOptVals: [],
                            optResult: ''
                        };
                        var temp = [
                            '<div>' +
                            items.orderitembom.map(function(itemBom, key) {
                                var border = items.orderitembom.length != 1 && items.orderitembom.length - 1 != key ?
                                    'border-bottom: 1px solid #eee' : '',
                                    display = itemBom.type != 'radio' && itemBom.orderitembom.length > 6 ? 'block' : 'none';
                                var prodAttrStrucItemName = itemBom.name;
                                optional[prodAttrStrucItemName] = "";
                                var prodAttrStrucItemName = itemBom.name;

                                var goodsOptDtos = {
                                    goodsOptId: itemBom.id,
                                    prodAttrStrucItemName: itemBom.name,
                                    prodAttrStrucItemId: itemBom.prodAttrStrucItemId,
                                    attrValId: itemBom.attrValId,
                                    attrValCode: itemBom.attrValCode,
                                    attrValName: itemBom.attrValName,
                                };
                                itemBom.attrValName = itemBom.attrValName ? itemBom.attrValName : '';
                                optional.goodsOptVals.push(goodsOptDtos);
                                var isDisplay = itemBom.isOptionalAttr != 1 ? 'none' : 'block';
                                var typeHtml = itemBom.type != '04' ? '<div class="adapter_list" style="display: ' + isDisplay + '" data-attrKey="' + key + '">' +
                                    '<div class="adapter_baseic">' +
                                    '<label class="prodAttrStrucItemName">' + itemBom.name + ':</label>' +
                                    '<span class="goodsProperty">' + itemBom.isAttrName + '</span>' +
                                    '<p class="adapter_search">' +
                                    '<input type="text" placeholder="请输入关键字"><span class="adapter_search_btn" data-index = "' + key + '">搜索</span>' +
                                    '</p>' +
                                    '</div>' +
                                    '<div class="adapter_list_radio adapter_list_radio' + key + '" style="' + border + '">' +
                                    '<div class="adapter_list_radioMore" style="display: ' + display + '">' +
                                    '<a>更多' +
                                    '<i class="uifont icon-down"></i>' +
                                    '</a>' +
                                    '</div>' +
                                    itemBom.orderitembom.map(function(itemBomItem, index) {
                                        var isChecked = itemBomItem.isChecked ? 'is-checked' : '';
                                        if (itemBomItem.isChecked) {
                                            goodsOptDtos.attrValName = itemBomItem.attrValName;
                                            goodsOptDtos.attrValCode = itemBomItem.attrValCode;
                                            goodsOptDtos.attrValId = itemBomItem.attrValId;
                                        }
                                        var attrValName = itemBomItem.isChecked ? itemBomItem.attrValName : '';
                                        var subStrAttrValName = (itemBomItem.attrValName).length > 12 ? (itemBomItem.attrValName).substr(0, 11) + '...' : itemBomItem.attrValName;
                                        return (
                                            '<label class="u-radio margin-right-15 is-upgraded ' + isChecked + '" data-prodName="' + itemBom.name + '" radioNamw="' + itemBomItem.attrValName + '" radioValue = "' + itemBomItem.attrValCode + '" radioId = "' + itemBomItem.attrValId + '">' +
                                            '<input type="radio" class="u-radio-button" name="isLegalPersonCorp" value="' + index + '">' +
                                            '<span class="u-radio-label">' + subStrAttrValName + '</span>' +
                                            '<span class="u-radio-outer-circle"></span>' +
                                            '<span class="u-radio-inner-circle"></span>' +
                                            '</label>'
                                        )
                                    }).join('') +
                                    '</div>' +
                                    '</div>' :
                                    '<div class="adapter_list" style="margin-bottom: 0; display: ' + isDisplay + '" data-attrKey="' + key + '">' +
                                    '<div class="adapter_baseic" style="' + border + '; height: 54px">' +
                                    '<label data-prodName="' + itemBom.name + '">' + itemBom.name + ':</label>' +
                                    function() {
                                        var attrName = (itemBom.isAttrName ? itemBom.isAttrName : itemBom.orderitembom[0].attrValCode) || '';
                                        var disabled = itemBom.isOptionalAttr != 1 ? '<input type="text" disabled="disabled" class="adapter_input" placeholder="请输入" value="' + attrName + '">' : '<input type="text" class="adapter_input" itemBom.isOptionalAttr placeholder="请输入" value="' + attrName + '">';
                                        return disabled;
                                    }() +
                                    '</div>' +
                                    '</div>'
                                return typeHtml;
                            }).join('') +
                            '</div>'
                        ].join("");
                        viewModel.goodsOptional.goodsOptDtos.push(optional)
                        bindEvent($(temp).appendTo($('#' + el + " #adpater-content")), items);
                    })
                }
                // 折叠行
                $('#' + el + ' .baseic_data').on('click', '.rowFolding', function() {
                    var cls = $(this).hasClass('rotate');
                    if (cls) {
                        $(this).removeClass('rotate').parents('.adapter_data').height('auto');
                    } else {
                        $(this).addClass('rotate').parents('.adapter_data').height(43);
                    }

                });

                /**
                 * 筛选匹配项
                 * @param  arr  筛选对象
                 * @param  key  关键字
                 */
                function indexSelect(arr, key) {
                    var newJson = [],
                        json;
                    if (key == "" || key == null) {
                        json = eval(arr);
                        return json;
                    } else {
                        json = eval(arr);
                        for (var i = 0; i < json.length; i++) {
                            if ((json[i].attrValName).indexOf(key) > -1) {
                                newJson.push(json[i]);
                            }
                        }
                        return newJson;
                    }
                }

                function bindEvent($el, item) {
                    // bind radio
                    bindRadioEvent($el, item);
                    $el.find('.adapter_search_btn').on('click', function() {
                        var searchVal = $.trim($(this).prev().val()),
                            _index = $(this).attr('data-index'),
                            parent = $(this).parents('.adapter_list'),
                            radioDom = $(parent).find('.adapter_list_radio');

                        var newItem = indexSelect(item.orderitembom[_index].orderitembom, searchVal);

                        var temp = newItem.length > 0 ? newItem.map(function(itemBomItem, index) {
                            var subStrAttrValName = (itemBomItem.attrValName).length > 12 ? (itemBomItem.attrValName).substr(0, 11) + '...' : itemBomItem.attrValName;
                            return (
                                '<label class="u-radio padding-right-15 is-upgraded" data-prodName="' + item.orderitembom[_index].name + '" radioNamw="' + itemBomItem.attrValName + '" radioValue = "' + itemBomItem.attrValCode + '" radioId = "' + itemBomItem.attrValId + '">' +
                                '<input type="radio" class="u-radio-button" name="isLegalPersonCorp" value="' + index + '">' +
                                '<span class="u-radio-label">' + subStrAttrValName + '</span>' +
                                '<span class="u-radio-outer-circle"></span>' +
                                '<span class="u-radio-inner-circle"></span>' +
                                '</label>'
                            )
                        }).join('') : '<div class="noSearchData" style="text-align: center; margin-top: 15px">搜索无记录</div>'
                        if (newItem.length > 6) {
                            radioDom.height(100).find('.adapter_list_radioMore').show().removeClass('expand');

                        } else {
                            radioDom.height(100).find('.adapter_list_radioMore').hide();
                        }
                        radioDom.find('.u-radio, .noSearchData').remove().end().append(temp);

                        return false;
                    })
                }

                function bindRadioEvent($el, item) {
                    // radio 选择事件
                    $el.find('.adapter_list_radio').on('click', '.u-radio', function() {
                        $(this).addClass('is-checked').siblings().removeClass('is-checked');
                        var val = $(this).attr('radioValue'),
                            name = $(this).attr('radioNamw'),
                            prodAttrStrucItemName = $(this).attr('data-prodName'),
                            _index = $(this).parents('.adapter_data_key').attr('data-key') || 0;

                        $(this).parent().prev().find('.goodsProperty').html(name);
                        var goodsAttrOpts = viewModel.goodsOptional.goodsOptDtos[_index];
                        goodsAttrOpts[prodAttrStrucItemName] = name;
                        // 判断子件下是否有多个选项
                        if (goodsAttrOpts.goodsOptVals.length > 1) {
                            // 获取对应项的 attrkey
                            var _key = $(this).parents('.adapter_list').attr('data-attrKey');
                            goodsAttrOpts.goodsOptVals[_key].attrValCode = $(this).attr('radioValue');
                            goodsAttrOpts.goodsOptVals[_key].attrValName = $(this).attr('radioNamw');
                            goodsAttrOpts.goodsOptVals[_key].attrValId = $(this).attr('radioId');
                        } else {
                            goodsAttrOpts.goodsOptVals[0].attrValCode = $(this).attr('radioValue');
                            goodsAttrOpts.goodsOptVals[0].attrValName = $(this).attr('radioNamw');
                            goodsAttrOpts.goodsOptVals[0].attrValId = $(this).attr('radioId');
                        }
                        return false;
                    });
                    // input 输入
                    $el.find('.adapter_input').on('blur', function() {
                        var val = $.trim($(this).val()),
                            prodAttrStrucItemName = $(this).prev().attr('data-prodName'),
                            _index = $(this).parents('.adapter_data_key').attr('data-key') || 0;
                        var goodsAttrOpts = viewModel.goodsOptional.goodsOptDtos[_index];
                        goodsAttrOpts[prodAttrStrucItemName] = val;
                        var _key = $(this).parents('.adapter_list').attr('data-attrKey');
                        // 判断子件下是否有多个选项
                        if (goodsAttrOpts.goodsOptVals.length > 1) {
                            // 获取对应项的 attrkey
                            goodsAttrOpts.goodsOptVals[_key].attrValName = val;
                            goodsAttrOpts.goodsOptVals[_key].attrValCode = val;
                            goodsAttrOpts.goodsOptVals[_key].attrValId = val;
                        } else {
                            goodsAttrOpts.goodsOptVals[_key].attrValCode = val;
                            goodsAttrOpts.goodsOptVals[_key].attrValId = val;
                            goodsAttrOpts.goodsOptVals[_key].attrValName = val;
                        }
                        return false;
                    });
                    $el.find('.adapter_input').trigger('blur');
                    // 更多
                    $el.find('.adapter_list_radioMore').on('click', function() {
                        var cls = $(this).hasClass('expand');
                        if (cls) {
                            // $(this).removeClass('expand').parent().height(100);
                            $(this).removeClass('expand').parent().css({
                                'max-height': '110px',
                            });
                        } else {
                            // $(this).addClass('expand').parent().height('auto');
                            $(this).addClass('expand').parent().css({
                                'max-height': 'none',
                            });
                        }

                    });
                }

                if (!viewModel.referdeliveryorderOptdialog) {
                    viewModel.referdeliveryorderOptdialog = u.dialog({
                        id: el,
                        content: "#" + el,
                        hasCloseMenu: true,
                        width: '90%'
                    });
                    // 调整样式
                    $('#' + el + ' .u-msg-content').css({
                        padding: '15px'
                    })
                    var okButton = $("#" + el + " .J-ok");
                    okButton.off().on("click", function() {
                        if (callback && typeof callback == 'function') {
                            var input = $('#' + el).find('.goodsProperty');
                            var adapter_input = $('#' + el).find('.adapter_input');
                            for (var i = 0; i < input.length; i++) {
                                var isRequset = $(input[i]).parents('.adapter_list').css('display') == 'none' ? false : true;
                                if (!input[i].innerHTML && isRequset) {
                                    var prevName = $(input[i]).prev().html();
                                    toastr.warning(prevName + '不能为空');
                                    return;
                                }
                            }
                            for (var i = 0; i < adapter_input.length; i++) {
                                var isRequset = $(adapter_input[i]).parents('.adapter_list').css('display') == 'none' ? false : true;
                                if (!adapter_input[i].value && isRequset) {
                                    var prevName = $(adapter_input[i]).prev().html();
                                    toastr.warning(prevName + '不能为空');
                                    return;
                                }
                            }
                            var cbData = viewModel.goodsOptional.goodsOptDtos;
                            for (var i = 0; i < cbData.length; i++) {
                                var optResult = '';
                                var optAttr = [];
                                for (var j = 0, opt = cbData[i].goodsOptVals; j < opt.length; j++) {
                                    if (opt[j].attrValId) {
                                        optAttr.push(opt[j]);
                                        optResult += opt[j].prodAttrStrucItemName + ':' + opt[j].attrValName + ',';
                                    }
                                    cbData[i].goodsOptVals = optAttr;
                                }
                                cbData[i].optResult = optResult.slice(0, optResult.length - 1);
                            }
                            var data = [];
                            data.push(viewModel.goodsOptional)
                            $._ajax({
                                type: "get",
                                url: '/occ-base/api/base/goodsOpt/save-opt',
                                data: JSON.stringify(data),
                                type: 'POST',
                                contentType: "application/json; charset=utf-8",
                                success: function(data) {
                                    if (!data) {
                                        toastr.warning('保存未返回结果');
                                        return;
                                    }
                                    /**
                                     * @example 保存后拿到选配id 饭后添加到订单行上
                                     * @param  保存后的选配信息做展示
                                     * @param  返回的选配id，需要挂到订单行上
                                     */
                                    callback(viewModel.goodsOptional, data, function() {
                                        viewModel.referdeliveryorderOptdialog.close();
                                        $("#" + el).html('');
                                        viewModel.referdeliveryorderOptdialog = null;
                                    });
                                }
                            });
                        } else {
                            throw new Error("callback is no function or callback not find");
                        }
                    });
                    var okButton = $("#" + el + " .J-reset");
                    okButton.off().on("click", function() {
                        $('#' + el).find('.goodsProperty').html('');
                        $('#' + el).find('input').val('');
                        $('#' + el).find('.adapter_search_btn').trigger('click');
                    });
                    var cancelButton = $("#" + el + " .J-cancel");
                    cancelButton.off().on("click", function() {
                        viewModel.referdeliveryorderOptdialog.close();
                        $("#" + el).html('');
                        viewModel.referdeliveryorderOptdialog = null;
                    });
                    var closeButton = $("#" + el + " .u-msg-close");
                    closeButton.off().on("click", function() {
                        $("#" + el).html('');
                        viewModel.referdeliveryorderOptdialog = null;
                    });
                } else {
                    viewModel.referdeliveryorderOptdialog.show();
                }

            }
        },

        /**
         * @example 查看选配common.goodsOptional.OptionalDetails()
         * @param viewModel 当前viewModel, 用来挂载dialog
         * @param title     弹窗title
         * @param goodsId   商品行Id
         * @param el        dialog id (不加 ‘#’)
         */
        OptionalDetails: function(viewModel, title, goodsId, baseGoodsOptId, el, CurrentRow, BomCurrentRow) {

            Common.goodsOptional.serachOptDetail(baseGoodsOptId, BomCurrentRow, init);

            function init(optData) {
                var currentRow = CurrentRow.getCurrentRow().getSimpleData();

                if (!$('#' + el + " .goodsOptDetails").html()) {
                    var otherHtml = [
                        '<div class="goodsOptDetails">' +
                        '<div class="u-msg-title">' +
                        '<h4>' + title + '</h4>' +
                        '</div>' +
                        '<div class="u-tabs ui-tabs u-msg-content">' +
                        '<div class="special-product">' +
                        '<div id="tab-panel-1" class="u-tabs__panel is-active">' +
                        '<div class="goodsOpt_details_contnet">' +
                        '<h3 class="details_title">基本信息</h3>' +
                        '<div class="baseic_data">' +
                        '<p>' +
                        '<label>商品编码:</label>' +
                        '<span>' + (currentRow.code ? currentRow.code : currentRow.goodsCode) + '</span>' +
                        '</p>' +
                        '<p>' +
                        '<label>商品名称:</label>' +
                        '<span>' + (currentRow.displayName ? currentRow.displayName : currentRow.goodsName) + '</span>' +
                        '</p>' +
                        '<p>' +
                        '<label>商品版本:</label>' +
                        '<span>' + ((currentRow.version ? currentRow.version : currentRow.goodsVersion) || '') + '</span>' +
                        '</p>' +
                        '</div>' +
                        '</div>' +
                        '<div class="product-content margin-top-25">' +
                        '<div class="ui-table-container">' +
                        '<div class="ui-collapse-group">' +
                        '<div data-collapse>' +
                        '<h3 class="details_title">选配信息</h3>' +
                        '<div class="ui-collapse-content" id="adpater-content">' +

                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '<div class="u-msg-footer">' +
                        '<a class="ui-btn ui-btn-primary J-cancel margin-right-5">关闭</a>' +
                        '</div>',
                        '</div>'
                    ].join('');
                    $(otherHtml).appendTo($('#' + el));
                    // 选配信息
                    // 此处用来判断是否有子件，
                    if (optData.length > 0) {
                        optData.map(function(item, index) {
                            var isDisplay = item.goodsOptVals.length > 0 ? 'block' : 'none';
                            item["isOptional"] = [];
                            var itemHtml = item.goodsOptVals.map(function(itemBom, key) {
                                if (itemBom.attrValCode || itemBom.attrValId || itemBom.attrValName) {
                                    item.isOptional.push(key)
                                    var border = item.goodsOptVals.length != 1 && item.goodsOptVals.length - 1 != key ? 'border-bottom: 1px solid #eee' : '';
                                    var name = itemBom.prodAttrStrucItemName || itemBom.prodAttrStrucItemId;
                                    var value = itemBom.attrValName || itemBom.attrValCode || itemBom.attrValId;
                                    var typeHtml =
                                        '<div class="adapter_list" style="padding-bottom: 0">' +
                                        '<div class="adapter_baseic" style="' + border + '; height: 54px">' +
                                        '<label class="prodAttrStrucItemName">' + name + ': </label>' +
                                        '<span class="goodsProperty"> ' + value + '</span>' +
                                        '</div>' +
                                        '</div>';
                                    return typeHtml;
                                }
                            }).join('')
                            var temp = "";
                            if (item.isOptional.length > 0) {
                                temp = ['<div class="adapter_data" style="display: ' + isDisplay + '" data-key="' + index + '">' +
                                    '<div class="adapter_data_title">' +
                                    '<div class="baseic_data">' +
                                    '<p class="rowFolding>' +
                                    '<i class="uifont icon-tubiao-xiaosanjiao-xia" style="display: inline-block; vertical-align: top"></i>' +
                                    '</p>' +
                                    '<p>' +
                                    '<label>商品编码:</label>' +
                                    '<span>' + item.code + '</span>' +
                                    '</p>' +
                                    '<p>' +
                                    '<label>商品名称:</label>' +
                                    '<span>' + item.displayName + '</span>' +
                                    '</p>' +
                                    '<p>' +
                                    '<label>商品版本:</label>' +
                                    '<span>' + item.version + '</span>' +
                                    '</p>' +
                                    '</div>' +
                                    '</div>' +
                                    '<div>' +
                                    itemHtml +
                                    '</div>' +
                                    '</div>'
                                ].join("");
                            }
                            $(temp).appendTo($('#' + el + " #adpater-content"));
                        })
                    }
                    /*optData.length > 1 ? optData.map(function (item, index) {
						var isDisplay = item.goodsOptVals.length > 0 ? 'block' : 'none';

                        var itemHtml = item.goodsOptVals.map(function (itemBom, key) {
                            if (!!itemBom.attrValCode && !!itemBom.attrValId && !!itemBom.attrValName) {
                            	item[index].isOptional.push(key)
                                var border = item.goodsOptVals.length != 1 && item.goodsOptVals.length - 1 != key ? 'border-bottom: 1px solid #eee' : '';
                                var typeHtml =
                                    '<div class="adapter_list" style="padding-bottom: 0">' +
                                    '<div class="adapter_baseic" style="' + border + '; height: 54px">' +
                                    '<label class="prodAttrStrucItemName">' + itemBom.prodAttrStrucItemName + ': </label>' +
                                    '<span class="goodsProperty"> ' + itemBom.attrValName + '</span>' +
                                    '</div>'+
                                    '</div>';
                                return typeHtml;
                            }
                        }).join('')


                        var temp = "";
                        if (item[index].isOptional.length > 0) {
                            temp = ['<div class="adapter_data" style="display: ' + isDisplay + '" data-key="' + index + '">' +
                            '<div class="adapter_data_title">' +
                            '<div class="baseic_data">' +
                            '<p class="rowFolding>' +
                            '<i class="uifont icon-tubiao-xiaosanjiao-xia" style="display: inline-block; vertical-align: top"></i>' +
                            '</p>' +
                            '<p>' +
                            '<label>商品编码:</label>' +
                            '<span>' + item.code + '</span>' +
                            '</p>' +
                            '<p>' +
                            '<label>商品名称:</label>' +
                            '<span>' + item.displayName + '</span>' +
                            '</p>' +
                            '<p>' +
                            '<label>商品版本:</label>' +
                            '<span>' + item.version + '</span>' +
                            '</p>' +
                            '</div>' +
                            '</div>' +
                            '<div>' +
                            itemHtml +
                            '</div>' +
                            '</div>'
                            ].join("");
						}
                        $(temp).appendTo($('#' + el + " #adpater-content"));
					}) : optData.map(function (item, index) {
						var temp = [
                            '<div>' +
                            item.goodsOptVals.map(function (itemBom, key) {
                                if (!!itemBom.attrValCode && !!itemBom.attrValId && !!itemBom.attrValName) {
                                    var border = item.goodsOptVals.length != 1 && item.goodsOptVals.length - 1 != key ? 'border-bottom: 1px solid #eee' : '';
                                    itemBom.attrValName = itemBom.attrValName ? itemBom.attrValName : '';
                                    var typeHtml =
                                        '<div class="adapter_list" style="padding-bottom: 0">' +
                                        '<div class="adapter_baseic" style="' + border + '; height: 54px">' +
                                        '<label class="prodAttrStrucItemName">' + itemBom.prodAttrStrucItemName + ': </label>' +
                                        '<span class="goodsProperty"> ' + itemBom.attrValName + '</span>' +
                                        '</div>' +
                                        '</div>';
                                    return typeHtml;
                                }
                            }).join('') +
                            '</div>'
						].join("");
						$(temp).appendTo($('#' + el + " #adpater-content"));
					})*/
                }
                if (!viewModel.referdeliveryorderOptdialog) {
                    viewModel.referdeliveryorderOptdialog = u.dialog({
                        id: el,
                        content: "#" + el,
                        hasCloseMenu: true,
                        width: '90%'
                    });
                    // 调整样式
                    $('#' + el + ' .u-msg-content').css({
                        padding: '15px'
                    });
                    var cancelButton = $("#" + el + " .J-cancel");
                    cancelButton.off().on("click", function() {
                        viewModel.referdeliveryorderOptdialog.close();
                        $("#" + el).html('');
                        viewModel.referdeliveryorderOptdialog = null;
                    });
                    var closeButton = $("#" + el + " .u-msg-close");
                    closeButton.off().on("click", function() {
                        viewModel.referdeliveryorderOptdialog = null;
                        $("#" + el).html('');
                    });
                } else {
                    viewModel.referdeliveryorderOptdialog.show();
                }
            }
        },

        // 查询选配
        searchOpt: function(id, baseGoodsOptId, bomCurrent, cb) {
            // 商品选配信息
            $._ajax({
                type: "get",
                url: window.pathMap.base + '/api/base/goods/get-opt/' + id,
                success: function(data) {
                    if (!data || data[0].goodsAttrVals.length < 1) {
                        toastr.warning("查询无可选配信息");
                        return;
                    }
                    if (baseGoodsOptId) {
                        // 根据选配结果 id 查询选配结果
                        $._ajax({
                            type: "get",
                            url: '/occ-base/api/base/goodsOpt/find-by-ids',
                            data: {
                                ids: baseGoodsOptId
                            },
                            contentType: "application/json; charset=utf-8",
                            success: function(res) {
                                if (res) {
                                    var bomRow = bomCurrent.getSimpleData(),
                                        _bomRow = [];
                                    bomRow.forEach(function(item) {
                                        if (item.dr != '1') {
                                            _bomRow.push(item);
                                        }
                                    });
                                    for (var z = 0; z < data.length; z++) {
                                        // 给bom行增加选配id为给选配结果与选配项合并数据
                                        for (var q = 0; q < _bomRow.length; q++) {
                                            if (_bomRow[q].goodsId == data[z].id) {
                                                data[z].baseGoodsOptId = _bomRow[q].baseGoodsOptId || _bomRow[q].goodsSelection
                                            }
                                        }
                                        for (var k = 0; k < res.length; k++) {
                                            // 判断是否为同一个子件
                                            if (res[k].id == data[z].baseGoodsOptId) {
                                                var goodsopt = data[z].goodsAttrVals;
                                                var goodsResultOpt = res[k].goodsOptVals;
                                                for (var i = 0; i < goodsopt.length; i++) {
                                                    for (var j = 0; j < goodsResultOpt.length; j++) {
                                                        if (goodsResultOpt[j].attrValId == goodsopt[i].attrValId) {
                                                            goodsopt[i].isChecked = true;
                                                        }
                                                        if (goodsopt[i].productAttrTypeCode == '04' && goodsResultOpt[j].prodAttrStrucItemName == goodsopt[i].name) {
                                                            goodsopt[i].attrValName = goodsResultOpt[j].attrValName;
                                                            goodsopt[i].isChecked = true;
                                                        }
                                                    }
                                                }
                                            }

                                        }
                                    }

                                } else {
                                    toastr.warning("未返回选配信息");
                                }
                                cb(data)
                            }
                        });
                    } else {
                        cb(data)
                    }
                }
            });
        },
        serachOptDetail: function(baseGoodsOptId, bomDatas, cb) {
            // 根据选配结果 id 查询选配结果
            $._ajax({
                type: "get",
                url: '/occ-base/api/base/goodsOpt/find-by-ids',
                data: {
                    ids: baseGoodsOptId
                },
                contentType: "application/json; charset=utf-8",
                success: function(res) {
                    if (res) {
                        res.forEach(function(baseData) {
                            if (bomDatas) {
                                var bomAllDatas = bomDatas.getSimpleData();
                                bomAllDatas.forEach(function(item) {
                                    if (baseData.goodsId === item.goodsId) {
                                        baseData.baseGoodsOptId = item.baseGoodsOptId || item.goodsSelection;
                                        baseData.code = item.code || item.goodsCode;
                                        baseData.displayName = item.displayName || item.goodsName;
                                        baseData.version = (item.version || item.goodsVersion) || "";
                                    }
                                })
                            } else {
                                bomDatas = []
                            }
                        })

                        cb(res);

                        /*if (res.length > 0) {
                            if (BomRow) {
                                var BomCurrentRow = BomRow.getSimpleData();
                                BomCurrentRow.forEach(function (item) {
                                    item.baseGoodsOptId = item.baseGoodsOptId ? item.baseGoodsOptId : item.goodsSelection;
                                    item.code = item.code ? item.code : item.goodsCode;
                                    item.displayName = item.displayName ? item.displayName : item.goodsName;
                                    item.version = item.version ? item.version : item.goodsVersion;
                                    for (var j = 0; j < res.length; j++) {
                                        if (item.baseGoodsOptId == res[j].id) {
                                            res[j].code = item.code;
                                            res[j].displayName = item.displayName;
                                            res[j].version = item.version;
                                        }
                                    }
                                })
                            }
                        }
                        cb(res);*/
                    } else {
                        toastr.warning("未返回选配信息");
                    }
                }
            });
        }
    }
    //高品范围
    Common.goodsRange = {
        gREditType: function(options) {
            var grid = options.gridObj,
                datatable = grid.dataTable,
                viewModel = grid.viewModel,
                field = options.field,
                element = options.element,
                column = grid.getColumnByField(field);
            var htmlStr = '<div class="input-group date form_date">' +
                '<input  class="form-control goodsrangeinp" type="text">' +
                '<span class="u-form-control-feedback uf uf-symlist"></span>' +
                '</div>'
            //element.innerHTML = htmlStr
            $(element).html(htmlStr)
            ko.cleanNode(element);
            ko.applyBindings(viewModel, element);
            viewModel.rulesdialogcardcomp.cleareidt();
            $(element)
                .find("input.goodsrangeinp")
                .on("click", function(e) {
                    viewModel.rulesdialogcardcomp.show(
                        "高品范围",
                        "500px",
                        ruleedit
                    )
                })
            if (options.gridObj.options.editType != "form") {
                $(element).find('input').trigger("click");
            }

            function ruleedit(v) {
                var curRow = viewModel.complexItems.getCurrentRow();
                var postdata = viewModel.rulesdialogcardcomp.geteidtData();
                $._ajax({
                    url: "/occ-base/base/goods-ranges/create-goodsRange-when-not-exit",
                    type: "post",
                    data: JSON.stringify(postdata),
                    contentType: "application/json; charset=utf-8",
                    success: function(data) {
                        //如果index大于等于0说明是修改
                        viewModel.rulesdialogcardcomp.close();
                        //获取需要修改的行
                        var curRow = viewModel.complexItems.getCurrentRow();
                        curRow.setValue('goodsRangeId', data.id);
                        curRow.setValue('goodsRangeDesc', data.description);
                    }
                });
                // }
            }
        },
    }

    Common.getRefDataByDtAndKey = function(dataTable, key) {
        if (dataTable instanceof u.DataTable) {
            dataTable = dataTable.id;
        }
        var refJQDom = $('#refContainer' + dataTable + '_' + key);
        return (refJQDom.data("uui.refer") && refJQDom.data("uui.refer").values) ? refJQDom.data("uui.refer").values : "";
    }
    // 检验字符串长度（包含中文长度）
    Common.validStrLength = function(str) {
        var len = 0;
        if (!str) return len;
        for (var i = 0; i < str.length; i++) {
            if (str.charCodeAt(i) > 127 || str.charCodeAt(i) == 94) {
                len += 2;
            } else {
                len++;
            }
        }
        return len;
    }
    // 附件 查看
    Common.flieUpload = {
        fileDetails: function(url) {
            var otherHtml = [
                "<div>" +
                '<div class="u-msg-title">' +
                "<h4>附件查看</h4>" +
                "</div>" +
                '<div class="u-tabs ui-tabs u-msg-content">' +
                '<div id="showFileContent" style="text-align: center; margin-top: 20px;">' +
                '<img class="showAttachImg" src="' +
                url +
                '" style="width: 70%; transform: rotate(0deg)">' +
                "</div>" +
                "</div>" +
                '<div class="u-msg-footer">' +
                '<a class="ui-btn ui-btn-primary J-transRight margin-right-5">左转</a>' +
                '<a class="ui-btn ui-btn-primary J-result margin-right-5">重置</a>' +
                '<a class="ui-btn ui-btn-primary J-transLeft margin-right-5">右转</a>' +
                '<a class="ui-btn ui-btn-primary J-cancel margin-right-5">关闭</a>' +
                "</div>",
                "</div>"
            ].join("");
            $("#fileDetailsdialog").html(otherHtml);
            if (!viewModel.fileDetailsdialog) {
                viewModel.fileDetailsdialog = u.dialog({
                    id: "fileDetailsdialog",
                    content: "#fileDetailsdialog",
                    hasCloseMenu: true,
                    width: "65%"
                });
            } else {
                viewModel.fileDetailsdialog.show();
            }
            var cancelButton = $("#fileDetailsdialog .J-cancel");
            var transRight = $("#fileDetailsdialog .J-transRight");
            var result = $("#fileDetailsdialog .J-result");
            var transLeft = $("#fileDetailsdialog .J-transLeft");
            cancelButton.off().on("click", function() {
                viewModel.fileDetailsdialog.close();
            });
            transRight.off().on("click", function() {
                var rotateVal = $('.showAttachImg')[0].style.transform;
                rotateVal = rotateVal.replace("rotate(", "").replace("deg)", "");
                var value = parseFloat(rotateVal) - 90;
                var imgW = $('.showAttachImg').width(),
                    imgH = $('.showAttachImg').height(),
                    pH = $('.showAttachImg').parent().height();
                $('.showAttachImg').css({
                    webkitTransform: "rotate(" + value + "deg)",
                    msTransform: "rotate(" + value + "deg)",
                    MozTransform: "rotate(" + value + "deg)",
                    transform: "rotate(" + value + "deg)",
                })
                // value % 60 == 0 点击了奇数次
                if (Math.abs(value % 60) == 0) {
                    if (imgW > imgH) {
                        $('.showAttachImg').parent().css({
                            "padding-top": 0
                        }).height(imgH);
                    }
                } else {
                    if (imgW > imgH) {
                        var pt = (imgW - imgH) / 2;
                        if (pH < imgW) $('.showAttachImg').parent().height(imgW).css({
                            "padding-top": pt
                        });
                    }
                }
            });
            result.off().on("click", function() {
                var value = 0;
                $('.showAttachImg').css({
                    webkitTransform: "rotate(" + value + "deg)",
                    msTransform: "rotate(" + value + "deg)",
                    MozTransform: "rotate(" + value + "deg)",
                    transform: "rotate(" + value + "deg)",
                })
                var imgW = $('.showAttachImg').width(),
                    imgH = $('.showAttachImg').height();
                if (imgW > imgH) {
                    $('.showAttachImg').parent().css({
                        "padding-top": 0
                    }).height(imgH);
                }
            });
            transLeft.off().on("click", function() {
                var rotateVal = $('.showAttachImg')[0].style.transform;
                rotateVal = rotateVal.replace("rotate(", "").replace("deg)", "");
                var value = parseFloat(rotateVal) + 90;
                var imgW = $('.showAttachImg').width(),
                    imgH = $('.showAttachImg').height(),
                    pH = $('.showAttachImg').parent().height();
                $('.showAttachImg').css({
                    webkitTransform: "rotate(" + value + "deg)",
                    msTransform: "rotate(" + value + "deg)",
                    MozTransform: "rotate(" + value + "deg)",
                    transform: "rotate(" + value + "deg)",
                })
                // value % 60 == 0 点击了奇数次
                if (Math.abs(value % 60) == 0) {
                    if (imgW > imgH) {
                        $('.showAttachImg').parent().css({
                            "padding-top": 0
                        }).height(imgH);
                    }
                } else {
                    if (imgW > imgH) {
                        var pt = (imgW - imgH) / 2;
                        if (pH < imgW) $('.showAttachImg').parent().height(imgW).css({
                            "padding-top": pt
                        });
                    }
                }
            });
        }
    }
    Common.dynamicTemplate = {
        extendDatas: function(extendData) {
            if (!extendData || extendData.length == 0) {
                return extendData;
            }
            var _arrList = extendData,
                data = extendData;
            data.forEach(function(item, index) {
                for (key in item) {
                    var splitStr = key.split("refshowcontent_");
                    var splitRefStr = key.split("refrel_");
                    if (splitStr.length > 1) {
                        var fildeStr = key.split("_");
                        if (fildeStr[2]) {
                            fildeName = fildeStr[1].replace("Id", "") + fildeStr[2].replace(fildeStr[2][0], fildeStr[2][0].toLocaleUpperCase());
                            _arrList[index][fildeName] = item[key];
                        }
                        delete _arrList[index][key];
                    }
                    if (splitRefStr.length > 1) {
                        var fildeStr = key.split("_");
                        if (fildeStr[2]) {
                            fildeName = fildeStr[1].replace("Id", "") + fildeStr[2].replace(fildeStr[2][0], fildeStr[2][0].toLocaleUpperCase());
                            _arrList[index][fildeName] = item[key];
                        }
                        delete _arrList[index][key];
                    }
                }
            })
            return _arrList
        },
    }
    /**
     * 编辑时校验当前人是否是当前审批人，是继续操作，否禁止编辑
     */
    Common.checkApprover = function(id) {
        var msg = "";
        $.ajax({
            type: "post",
            url: "/eiap-plus/process/getbillbpm",
            data: JSON.stringify({
                billId: id
            }),
            dataType: "json",
            async: false,
            contentType: "application/json;charset=utf-8", //必需
            success: function(res) {
                if (res) {
                    if (res.msg) {
                        msg = {
                            message: "查找单据主键对应的流程定义报错！",
                            isUnDoBpm: false
                        }
                    }
                    var message = res.message;
                    if (message == "NoBpm") {
                        msg = {
                            message: "",
                            isUnDoBpm: true
                        }
                    } else if (message == "UnDo") {
                        msg = {
                            message: "",
                            isUnDoBpm: true
                        }
                    } else {
                        msg = {
                            message: "当前用户不是审批人，不能编辑",
                            isUnDoBpm: false
                        }
                    }
                } else {
                    msg = {
                        message: "后台返回数据格式有误",
                        isUnDoBpm: false
                    }
                }
            },
            error: function(er) {
                msg = {
                    message: er,
                    isUnDoBpm: false
                }
            }
        });
        return msg;
    }
    return Common;
});