var timer = 300000;
var timerQuery = null;
var queryData = {
  beginDate: ' ',
  saleOrg: ' '
};
~ function() {
  //饼图
  $.ajax({
    url: '/occ-stock/stock/out-in-journals/allInventory',
    // data: '',
    type: 'get',
    success: function(mapdata) {
      if (!mapdata) {
        return;
      }
      //数据纯属虚构
      var data = mapdata.proData;
      var geoCoordMap = JSON.parse(mapdata.geoCoordMap);

      var yData = [];
      var convertData = function(data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
          var dname = data[i].name;
          var geoCoord = geoCoordMap[dname];
          if (geoCoord) {
            res.push({
              name: data[i].name,
              value: geoCoord.concat(data[i].value)
            });
          }
        }
        return res;
      };
      data.sort(function(o1, o2) {
        if (isNaN(o1.value) || o1.value == null) return -1;
        if (isNaN(o2.value) || o2.value == null) return 1;
        return o1.value - o2.value;
      });

      for (var i = 0; i < data.length; i++) {
        yData.push(data[i].name);
      }

      var option = {
        tooltip: {
          show: true,
          formatter: function(params) {
            return params.name + '：' + params.data['value'] + '%'
          },
        },
        legend: {
          show: true,
          orient: 'vertical', //图例列表的布局朝向
          itemWidth: 14,
          itemHeight: 14,
          right: 30,
          bottom: 100,
          data: [{
              name: '内部仓库',
              icon: 'image://img/icon-yellow.jpg'
            }, {
              name: '伙伴仓库',
              icon: 'image://img/icon-red.jpg'
            }, {
              name: '内部仓库预警中',
              icon: 'image://img/icon-yellow-warning.jpg'
            }, {
              name: '伙伴仓库预警中',
              icon: 'image://img/icon-red-warning.jpg'
            },

          ],
          textStyle: {
            color: "#fff",
            fontWeight: 'normal',
            fontFamily: '宋体'
          }
        },
        visualMap: {
          text: ['', ''],
          showLabel: true,
          seriesIndex: [0],
          min: 0,
          max: 7,
          width: "100%",
          inRange: {
            color: ['#edfbfb', '#b7d6f3', '#40a9ed', '#3598c1', '#215096', ]
          },
          textStyle: {
            color: '#000'
          },
        },
        grid: {
          right: 10,
          top: 80,
          bottom: 30,
          width: '10%'
        },
        xAxis: {
          type: 'value',
          scale: true,
          position: 'top',
          splitNumber: 1,
          boundaryGap: false,
          splitLine: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            margin: 2,
            textStyle: {
              color: '#aaa'
            }
          }
        },
        yAxis: {
          type: 'category',
          nameGap: 16,
          axisLine: {
            show: false,
            lineStyle: {
              color: '#ddd'
            }
          },
          axisTick: {
            show: false,
            lineStyle: {
              color: '#ddd'
            }
          },
          axisLabel: {
            interval: 0,
            textStyle: {
              color: '#999'
            }
          },
          data: []
        },
        geo: {
          roam: true,
          map: 'china',
          layoutSize: '100%',
          label: {
            emphasis: {
              show: false
            }
          },
          itemStyle: {
            emphasis: {
              areaColor: '#fff464'
            }
          },
          regions: [{
            name: '南海诸岛',
            value: 0,
            itemStyle: {
              normal: {
                opacity: 0,
                label: {
                  show: true
                }
              }
            }
          }],
        },
        series: [{
          name: 'mapSer',
          type: 'map',
          roam: false,
          geoIndex: 0,
          label: {
            show: true,
          },
          data: data
        }, {
          name: "内部仓库",
          type: 'scatter',
          coordinateSystem: 'geo',
          data: convertData(mapdata.convertData0
            //   [{
            //   name: "胶州",
            //   value: 52
            // }, {
            //   name: "银川",
            //   value: 52
            // }, {
            //   name: "张家港",
            //   value: 52
            // }, {
            //   name: "三门峡",
            //   value: 53
            // }, {
            //   name: "锦州",
            //   value: 54
            // }, {
            //   name: "南昌",
            //   value: 54
            // }, ]
          ),
          symbolSize: 8,
          label: {
            normal: {
              show: false
            },
            emphasis: {
              show: false
            }
          },
          itemStyle: {
            normal: {
              color: '#FE5E3A',
            },
            emphasis: {
              borderColor: '#fff',
              borderWidth: 1
            }
          }
        }, {
          name: "伙伴仓库",
          type: 'scatter',
          coordinateSystem: 'geo',
          data: convertData(mapdata.convertData1
            //   [{
            //   name: "柳州",
            //   value: 54
            // }, {
            //   name: "三亚",
            //   value: 54
            // }, {
            //   name: "焦作",
            //   value: 75
            // }, {
            //   name: "句容",
            //   value: 75
            // }, {
            //   name: "北京",
            //   value: 79
            // }, {
            //   name: "沧州",
            //   value: 100
            // }, {
            //   name: "临沂",
            //   value: 103
            // }, {
            //   name: "南充",
            //   value: 104
            // }, {
            //   name: "天津",
            //   value: 105
            // }, {
            //   name: "富阳",
            //   value: 106
            // }, {
            //   name: "泰安",
            //   value: 112
            // }, {
            //   name: "诸暨",
            //   value: 112
            // }, ]
          ),
          symbolSize: 8,
          label: {
            normal: {
              show: false
            },
            emphasis: {
              show: false
            }
          },
          itemStyle: {
            normal: {
              color: '#FCB62C',
            },
            emphasis: {
              borderColor: '#fff',
              borderWidth: 1
            }
          }
        }, {
          name: "内部仓库预警中",
          type: 'effectScatter',
          coordinateSystem: 'geo',
          rippleEffect: {
            brushType: 'stroke'
          }, //波纹绘制方式
          label: {
            emphasis: {
              show: true,
              position: 'right',
              formatter: '{b}'
            }
          },
          symbolSize: 8,
          showEffectOn: 'render', //何时显示特效
          zlevel: 2,
          itemStyle: {
            normal: {
              color: '#FFB700'
            }
          },
          data: convertData(mapdata.convertData2
            //   [{
            //   name: "海门",
            //   value: 9
            // }, {
            //   name: "鄂尔多斯",
            //   value: 12
            // }, {
            //   name: "招远",
            //   value: 12
            // }, {
            //   name: "舟山",
            //   value: 12
            // }, ]
          ),
        }, {
          name: "伙伴仓库预警中",
          type: 'effectScatter',
          coordinateSystem: 'geo',
          rippleEffect: {
            brushType: 'stroke'
          }, //波纹绘制方式
          label: {
            emphasis: {
              show: true,
              position: 'right',
              formatter: '{b}'
            }
          },
          symbolSize: 8,
          showEffectOn: 'render', //何时显示特效
          zlevel: 2,
          itemStyle: {
            normal: {
              color: '#FF4500'
            }
          },
          data: convertData(mapdata.convertData3
            //   [{
            //     name: "齐齐哈尔",
            //     value: 14
            //   }, {
            //     name: "延安",
            //     value: 38
            //   }, {
            //     name: "长春",
            //     value: 51
            //   },

            // ]
          ),
        }, ]
      };
      var myChart = echarts.init(document.getElementById('main'));
      myChart.setOption(option);
    }
  });

  //饼图
  $.ajax({
    url: '/occ-stock/stock/out-in-journals/inventory-structure-ratio',
    // data: '',
    type: 'get',
    success: function(data) {
      if (data) {
        var data_name = [];
        for (var n in data) {
          data[n]['name'] = data[n]['name'];
          data_name.push(data[n]['name'])
        }
        var option2 = {
          tooltip: {
            trigger: 'item',
            // formatter: "{d}" + "%"
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            type: 'scroll',
            orient: 'vertical',
            top: 'center',
            left: 280,
            data: data_name,
            textStyle: {
              color: "#fff",
              fontWeight: 'normal',
              overflow: 'hidden',
              fontFamily: '宋体'
            }
          },
          series: [{
            name: '',
            type: 'pie',
            center: ['34%', '54%'],
            label: {
              normal: {
                formatter: '{d}%',
                textStyle: {
                  fontWeight: 'normal',
                  fontSize: 12
                }
              }
            },
            radius: ['40%', '60%'],
            data: data
          }, ]
        };
        var myChart2 = echarts.init(document.getElementById('category-ratio'));
        myChart2.setOption(option2)
      }
    }
  });

  // queryData.beginDate = new Date(MM).getTime();
  searchAjax();
  timerQueryFun();
}();

function timerQueryFun(time) {
  var time = time ? time : timer;
  timerQuery = setInterval(function() {
    searchAjax()
  }, time)
}
// 查询所有接口，
function searchAjax(data) {

  // 库存低存量预警
  searchNewOrder();
  // 售罄率
  saleOutrate();
  //高库龄商品
  highagegoods();
  // 整体情况
  searchSaleSummary();
  // 查询各省销售情况
  // searchProvSaleSummary(data);
  // // 客户排行 
  // searchSaleRank(data);
}

//dom操作
$(function() {
  //获得当前<ul>
  var $uList = $(".realTime-value");

  var timer = null;
  //触摸清空定时器
  $uList.hover(function() {
      clearInterval(timer);
    },
    function() { //离开启动定时器
      timer = setInterval(function() {
          scrollList($uList);
        },
        1000);
    }).trigger("mouseleave"); //自动触发触摸事件
  //滚动动画
  function scrollList(obj) {
    //获得当前<li>的高度
    var scrollHeight = $("ul li:first").height();
    //滚动出一个<li>的高度
    $uList.stop().animate({
        marginTop: -scrollHeight
      },
      600,
      function() {
        //动画结束后，将当前<ul>marginTop置为初始值0状态，再将第一个<li>拼接到末尾。
        $uList.css({
          marginTop: 0
        }).find("li:first").appendTo($uList);
      });
  }

  //整体销售情况
  var $totalMoney = $(".total-money .num");
  var $totalAmount = $(".total-amount .num");
  var $totalNum = $(".total-num .num");
  var timer2 = null;
  timer2 = setInterval(function() {
    var curNum = Math.floor($totalMoney.text());
    var curNum2 = Math.floor($totalAmount.text());
    var curNum3 = Math.floor($totalNum.text());
    var random = Math.floor(Math.random() * (1000 - 10 + 1) + 10)

    function addRandom(curNum, random) {
      return Math.floor(curNum + random)
    }
    $totalMoney.text(addRandom(curNum, random));
    $totalAmount.text(addRandom(curNum2, random));
    $totalNum.text(addRandom(curNum3, random));
  }, 1000);

});
// 库存低存量预警
function searchNewOrder() {
  $.ajax({
    url: '/occ-stock/stock/out-in-journals/inventory-lower',
    type: 'get',
    success: function(resp) {
      if (resp && resp.length > 0) {
        var html = resp.map(function(item) {
          return '<li>' +
            '<span class="goodsName">' + item.goods + '</span>' +
            '<span class="storageName">' + item.warehouse + '</span>' +
            '<span class="availableNum">' + item.availablenum + '</span>' +
            '<span class="onHandNum">' + item.onhandnum + '</span>' +
            '<span class="onOrderNum">' + item.willAvailablenum + '</span>' +
            '</li>'
        });
        $('ul#restnumwarning').html('').append(html.join(''));
      }
    }
  })
};
// 售罄率
function saleOutrate() {
  $.ajax({
    url: '/occ-stock/stock/out-in-journals/saleout',
    type: 'get',
    success: function(resp) {
      if (resp && resp.length > 0) {
        var html = resp.map(function(item, index) {
          if (item.saleout > 100) {
            item.saleout = 100
          }
          var num = index < 3 ? 'num' + (index + 1) : '';
          var shownum = index < 3 ? '' : index + 1;
          return '<li>' +
            '<span class="list-num icon ' + num + '">' + shownum + '</span>' +
            '<a href="###" class="goods-name" title="' + item.goods + '">' + item.goods + '</a>' +
            ' <div class="rank-bar">' +
            '<div class="rankBar-width"><span style="width: ' + item.saleout + '%"></span></div>' +
            '<a href="###">' + item.saleout + '%</a>' +
            ' <p>' + item.warehouse + '</p>' +
            '</div>' +
            '</li>'
        });
        $('ul#saleout').html('').append(html.join(''));
      }
    }
  })
};
// 高库龄商品
function highagegoods() {
  $.ajax({
    url: '/occ-stock/stock/out-in-journals/warehousAnalysis',
    type: 'get',
    success: function(resp) {
      if (resp && resp.length > 0) {
        var html = resp.map(function(item, index) {
          var num = index < 3 ? 'num' + (index + 1) : '';
          var shownum = index < 3 ? '' : index + 1;
          var rate = index > 9 ? '5' : (100 - index * 10);
          return '<li>' +
            '<span class="list-num icon ' + num + '">' + shownum + '</span>' +
            '<a href="###" class="goods-name" title="' + item.goods + '">' + item.goods + '</a>' +
            ' <div class="rank-bar">' +
            '<div class="rankBar-width"><span style="width: ' + rate + '%"></span></div>' +
            '<a href="###">' + item.date + '天</a>' +
            ' <p>' + item.warehouse + '</p>' +
            '</div>' +
            '<span class="high-amount"> ' + item.onhandnum + '</span>' +
            '</li>'
        });
        $('ul#highagegoods').html('').append(html.join(''));
      }
    }
  })
};
// 整体情况
function searchSaleSummary() {
  // var body = data ? data : {
  //   saleOrg: '',
  //   beginDate: ''
  // }
  $.ajax({
    url: '/occ-stock/stock/out-in-journals/inventory-all',
    // data: '',
    type: 'get',
    success: function(resp) {
      if (resp) {
        $('#totalstock').html(resp[0].value);
        $('#totalDepotNum').html(resp[1].value);
      }
    }
  })
};