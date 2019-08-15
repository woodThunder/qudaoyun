define(['text!/ocm-web/components/repairTrack/repairTrack.tpl.html', 'css!/ocm-web/components/repairTrack/repairTrack.css'], function (tpl, model) {
  'use strict';

  var viewModel, baseData, events, repairTrack, app;

  baseData = {
    username: ko.observable("admin"),
    ObservableArray: ko.observableArray([])
  };

  viewModel = u.extend({}, baseData, events);

  //跟踪
  repairTrack = {
    ContentTpl: function (ContentId) {
      var orderTrackBox = document.getElementById(ContentId);
      if (orderTrackBox) {
        orderTrackBox.innerHTML = tpl;
      }
    },
    run: function (ContentId, data) {
      var nodeData = data;
      this.ContentTpl(ContentId);
      var nodeDataArr = [];
      var arrData = [];
      for (var i = 0; i < nodeData.length; i++) {
        var obj = {
          operateTime: nodeData[i].operateTime,
          datas: nodeData[i],
          imgsArr: nodeData[i].imgs != null ? nodeData[i].imgs.split(';') : null,
          descriptionArr: nodeData[i].description != null ? nodeData[i].description.split(';') : null
        }
        nodeDataArr.push(obj);
      }

      // for(var objName in nodeData) {
      //   var obj2 = {list:nodeData[objName]};
      //   // console.log(obj2);
      // }

      // 时间戳转时间 
      for (var i = 0; i < nodeDataArr.length; i++) {
        //时间戳转时间
        nodeDataArr[i].operateTime = UnixToDate(nodeDataArr[i].operateTime);
      }

      //时间戳转时间方法 1513307588000 时间戳格式
      function UnixToDate(str) {
        //补0操作
        var getzf = function (num) {
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
    init: repairTrack
  }

})