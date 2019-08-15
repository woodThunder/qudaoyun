define(['text!/ocm-web/components/ordertrack/ordertrack.tpl.html', 'css!/ocm-web/components/ordertrack/ordertrack.css'], function(tpl, model) {
    'use strict';

    var ViewModel, baseData, events, orderTrack, app;

    baseData = {
        username: ko.observable("admin"),
        ObservableArray: ko.observableArray([])
    };

    ViewModel = u.extend({}, baseData, events);

    //订单跟踪
    orderTrack = {
        ContentTpl: function(ContentId) {
            var orderTrackBox = document.getElementById(ContentId);
            if (orderTrackBox) {
                orderTrackBox.innerHTML = tpl;
            }
        },
        run: function(ContentId, data, logisticsModeData, viewModel) {
            var nodeData = data;
            this.ContentTpl(ContentId);
            //logisticsMode：//物流方式
            var ordertracListTpl = null;
            //console.log(logisticsModeData);
            if (logisticsModeData == "1") { //三方物流(1): 付款--审核--分拨--公司发货--商家送货--送装完毕--回执上传--完成--关闭
                $(".ordertrackbox-head .track-box1 .border-t01").eq(0).show().siblings().hide();
                ordertracListTpl = $(".ordertrackbox-head .track-box1 .border-t01").eq(0).find(".b-li");
                //var a = $(".ordertrackbox-head .track-box1 .border-t01").length
                // console.log(a);
            } else { //全友快递/供应商直发(0,2): 付款--审核--分拨--公司发货--完成--关闭
                $(".ordertrackbox-head .track-box1 .border-t01").eq(1).show().siblings().hide();
                ordertracListTpl = $(".ordertrackbox-head .track-box1 .border-t01").eq(1).find(".b-li");
            }
            //content详细内容
            //console.log(nodeData);
            var nodeDataArr = [];
            for (var objName in nodeData) {
                var obj = {
                    node: objName,
                    title: objName,
                    list: nodeData[objName]
                }
                nodeDataArr.push(obj);
            }

            //时间戳转时间//title名称赋值
            for (var i = 0; i < nodeDataArr.length; i++) {
                //时间戳转时间
                for (var x = 0; x < nodeDataArr[i].list.length; x++) {
                    nodeDataArr[i].list[x].operateTime = UnixToDate(nodeDataArr[i].list[x].operateTime);
                }
                //title名称赋值
                var thisTitle = nodeDataArr[i].title;
                switch (thisTitle) {
                    case "0":
                        nodeDataArr[i].title = "付款";
                        break;
                    case "1":
                        nodeDataArr[i].title = "分拨";
                        break;
                    case "2":
                        nodeDataArr[i].title = "审核";
                        break;
                    case "3":
                        nodeDataArr[i].title = "财审";
                        break;
                    case "4":
                        nodeDataArr[i].title = "公司发货";
                        break;
                    case "5":
                        nodeDataArr[i].title = "商家签收";
                        break;
                    case "6":
                        nodeDataArr[i].title = "商家送货";
                        break;
                    case "7":
                        nodeDataArr[i].title = "送装完毕";
                        break;
                    case "8":
                        nodeDataArr[i].title = "回执上传";
                        break;
                    case "9":
                        nodeDataArr[i].title = "完成";
                        break;
                    case "10":
                        nodeDataArr[i].title = "关闭";
                        break;
                    default:
                        nodeDataArr[i].title = "none";
                        break;
                }
            }
            //console.log(nodeDataArr);

            //时间戳转时间方法 1513307588000 时间戳格式
            function UnixToDate(str) {
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
            };
            //时间转时间戳方法 2014-01-01 20:20:20 日期格式
            function DateToUnix(string) {
                var f = string.split(' ', 2);
                var d = (f[0] ? f[0] : '').split('-', 3);
                var t = (f[1] ? f[1] : '').split(':', 3);
                return (new Date(
                    parseInt(d[0], 10) || null,
                    (parseInt(d[1], 10) || 1) - 1,
                    parseInt(d[2], 10) || null,
                    parseInt(t[0], 10) || null,
                    parseInt(t[1], 10) || null,
                    parseInt(t[2], 10) || null
                )).getTime();
            };
            //进度条状态
            for (var i = 0; i < nodeDataArr.length; i++) {
                if (nodeDataArr[i].node == "0") {
                    ordertracListTpl.eq(0).addClass("pass");
                }
                if (nodeDataArr[i].node == "1") {
                    ordertracListTpl.eq(1).addClass("pass");
                }
                if (nodeDataArr[i].node == "2") {
                    ordertracListTpl.eq(2).addClass("pass");
                }
                if (nodeDataArr[i].node == "3") {
                    ordertracListTpl.eq(3).addClass("pass");
                }
                if (nodeDataArr[i].node == "4") {
                    ordertracListTpl.eq(4).addClass("pass");
                }
                if (nodeDataArr[i].node == "5") {
                    ordertracListTpl.eq(5).addClass("pass");
                }
                if (nodeDataArr[i].node == "6") {
                    ordertracListTpl.eq(6).addClass("pass");
                }
                if (nodeDataArr[i].node == "7") {
                    ordertracListTpl.eq(7).addClass("pass");
                }
                if (nodeDataArr[i].node == "8") {
                    //完成状态，倒数-2
                    ordertracListTpl.eq(-2).addClass("pass");
                }
                if (nodeDataArr[i].node == "9") { //关闭状态
                    ordertracListTpl.last().addClass("pass");
                    ordertracListTpl.hide().siblings(".b-li.pass").show();
                }
            }


            //邦定内容数据
            viewModel.nodeDataArr = ko.observableArray(nodeDataArr);
            var element = $(".ordertrackbox")[0];
            ko.cleanNode(element); //清除邦定数据
            app = u.createApp({
                el: element,
                model: viewModel
            });

        }
    }

    return {
        init: orderTrack
    }

})