var OrderSummar = [];
var OrderSummarDate = [];
var timer = 300000;
var timerQuery = null;
var queryData = {
	beginDate:' ',
	saleOrg: ' '
}
~ function () {
	window.initData = [
		{
			name: '北京',
			value: 0
		},
		{
			name: '天津',
			value: 0
		},
		{
			name: '上海',
			value: 0
		},
		{
			name: '重庆',
			value: 0
		},
		{
			name: '河北',
			value: 0
		},
		{
			name: '河南',
			value: 0
		},
		{
			name: '云南',
			value: 0
		},
		{
			name: '辽宁',
			value: 0
		},
		{
			name: '黑龙江',
			value: 0
		},
		{
			name: '湖南',
			value: 0
		},
		{
			name: '安徽',
			value: 0
		},
		{
			name: '山东',
			value: 0
		},
		{
			name: '新疆',
			value: 0
		},
		{
			name: '江苏',
			value: 0
		},
		{
			name: '浙江',
			value: 0
		},
		{
			name: '江西',
			value: 0
		},
		{
			name: '湖北',
			value: 0
		},
		{
			name: '广西',
			value: 0
		},
		{
			name: '甘肃',
			value: 0
		},
		{
			name: '山西',
			value: 0
		},
		{
			name: '内蒙古',
			value: 0
		},
		{
			name: '陕西',
			value: 0
		},
		{
			name: '吉林',
			value: 0
		},
		{
			name: '福建',
			value: 0
		},
		{
			name: '贵州',
			value: 0
		},
		{
			name: '广东',
			value: 0
		},
		{
			name: '青海',
			value: 0
		},
		{
			name: '西藏',
			value: 0
		},
		{
			name: '四川',
			value: 0
		},
		{
			name: '宁夏',
			value: 0
		},
		{
			name: '海南',
			value: 0
		},
		{
			name: '台湾',
			value: 0
		},
		{
			name: '香港',
			value: 0
		},
		{
			name: '澳门',
			value: 0
		}
	];

	var geoCoordMap = {
		'海门': [121.15, 31.89],
		'鄂尔多斯': [109.781327, 39.608266],
		'招远': [120.38, 37.35],
		'舟山': [122.207216, 29.985295],
		'齐齐哈尔': [123.97, 47.33],
		'盐城': [120.13, 33.38],
		'赤峰': [118.87, 42.28],
		'青岛': [120.33, 36.07],
		'乳山': [121.52, 36.89],
		'金昌': [102.188043, 38.520089],
		'泉州': [118.58, 24.93],
		'莱西': [120.53, 36.86],
		'日照': [119.46, 35.42],
		'胶南': [119.97, 35.88],
		'南通': [121.05, 32.08],
		'拉萨': [91.11, 29.97],
		'云浮': [112.02, 22.93],
		'梅州': [116.1, 24.55],
		'文登': [122.05, 37.2],
		'上海': [121.48, 31.22],
		'攀枝花': [101.718637, 26.582347],
		'威海': [122.1, 37.5],
		'承德': [117.93, 40.97],
		'厦门': [118.1, 24.46],
		'汕尾': [115.375279, 22.786211],
		'潮州': [116.63, 23.68],
		'丹东': [124.37, 40.13],
		'太仓': [121.1, 31.45],
		'曲靖': [103.79, 25.51],
		'烟台': [121.39, 37.52],
		'福州': [119.3, 26.08],
		'瓦房店': [121.979603, 39.627114],
		'即墨': [120.45, 36.38],
		'抚顺': [123.97, 41.97],
		'玉溪': [102.52, 24.35],
		'张家口': [114.87, 40.82],
		'阳泉': [113.57, 37.85],
		'莱州': [119.942327, 37.177017],
		'湖州': [120.1, 30.86],
		'汕头': [116.69, 23.39],
		'昆山': [120.95, 31.39],
		'宁波': [121.56, 29.86],
		'湛江': [110.359377, 21.270708],
		'揭阳': [116.35, 23.55],
		'荣成': [122.41, 37.16],
		'连云港': [119.16, 34.59],
		'葫芦岛': [120.836932, 40.711052],
		'常熟': [120.74, 31.64],
		'东莞': [113.75, 23.04],
		'河源': [114.68, 23.73],
		'淮安': [119.15, 33.5],
		'泰州': [119.9, 32.49],
		'南宁': [108.33, 22.84],
		'营口': [122.18, 40.65],
		'惠州': [114.4, 23.09],
		'江阴': [120.26, 31.91],
		'蓬莱': [120.75, 37.8],
		'韶关': [113.62, 24.84],
		'嘉峪关': [98.289152, 39.77313],
		'广州': [113.23, 23.16],
		'延安': [109.47, 36.6],
		'太原': [112.53, 37.87],
		'清远': [113.01, 23.7],
		'中山': [113.38, 22.52],
		'昆明': [102.73, 25.04],
		'寿光': [118.73, 36.86],
		'盘锦': [122.070714, 41.119997],
		'长治': [113.08, 36.18],
		'深圳': [114.07, 22.62],
		'珠海': [113.52, 22.3],
		'宿迁': [118.3, 33.96],
		'咸阳': [108.72, 34.36],
		'铜川': [109.11, 35.09],
		'平度': [119.97, 36.77],
		'佛山': [113.11, 23.05],
		'海口': [110.35, 20.02],
		'江门': [113.06, 22.61],
		'章丘': [117.53, 36.72],
		'肇庆': [112.44, 23.05],
		'大连': [121.62, 38.92],
		'临汾': [111.5, 36.08],
		'吴江': [120.63, 31.16],
		'石嘴山': [106.39, 39.04],
		'沈阳': [123.38, 41.8],
		'苏州': [120.62, 31.32],
		'茂名': [110.88, 21.68],
		'嘉兴': [120.76, 30.77],
		'长春': [125.35, 43.88],
		'胶州': [120.03336, 36.264622],
		'银川': [106.27, 38.47],
		'张家港': [120.555821, 31.875428],
		'三门峡': [111.19, 34.76],
		'锦州': [121.15, 41.13],
		'南昌': [115.89, 28.68],
		'柳州': [109.4, 24.33],
		'三亚': [109.511909, 18.252847],
		'自贡': [104.778442, 29.33903],
		'吉林': [126.57, 43.87],
		'阳江': [111.95, 21.85],
		'泸州': [105.39, 28.91],
		'西宁': [101.74, 36.56],
		'宜宾': [104.56, 29.77],
		'呼和浩特': [111.65, 40.82],
		'成都': [104.06, 30.67],
		'大同': [113.3, 40.12],
		'镇江': [119.44, 32.2],
		'桂林': [110.28, 25.29],
		'张家界': [110.479191, 29.117096],
		'宜兴': [119.82, 31.36],
		'北海': [109.12, 21.49],
		'西安': [108.95, 34.27],
		'金坛': [119.56, 31.74],
		'东营': [118.49, 37.46],
		'牡丹江': [129.58, 44.6],
		'遵义': [106.9, 27.7],
		'绍兴': [120.58, 30.01],
		'扬州': [119.42, 32.39],
		'常州': [119.95, 31.79],
		'潍坊': [119.1, 36.62],
		'重庆': [106.54, 29.59],
		'台州': [121.420757, 28.656386],
		'南京': [118.78, 32.04],
		'滨州': [118.03, 37.36],
		'贵阳': [106.71, 26.57],
		'无锡': [120.29, 31.59],
		'本溪': [123.73, 41.3],
		'克拉玛依': [84.77, 45.59],
		'渭南': [109.5, 34.52],
		'马鞍山': [118.48, 31.56],
		'宝鸡': [107.15, 34.38],
		'焦作': [113.21, 35.24],
		'句容': [119.16, 31.95],
		'北京': [116.46, 39.92],
		'徐州': [117.2, 34.26],
		'衡水': [115.72, 37.72],
		'包头': [110, 40.58],
		'绵阳': [104.73, 31.48],
		'乌鲁木齐': [87.68, 43.77],
		'枣庄': [117.57, 34.86],
		'杭州': [120.19, 30.26],
		'淄博': [118.05, 36.78],
		'鞍山': [122.85, 41.12],
		'溧阳': [119.48, 31.43],
		'库尔勒': [86.06, 41.68],
		'安阳': [114.35, 36.1],
		'开封': [114.35, 34.79],
		'济南': [117, 36.65],
		'德阳': [104.37, 31.13],
		'温州': [120.65, 28.01],
		'九江': [115.97, 29.71],
		'邯郸': [114.47, 36.6],
		'临安': [119.72, 30.23],
		'兰州': [103.73, 36.03],
		'沧州': [116.83, 38.33],
		'临沂': [118.35, 35.05],
		'南充': [106.110698, 30.837793],
		'天津': [117.2, 39.13],
		'富阳': [119.95, 30.07],
		'泰安': [117.13, 36.18],
		'诸暨': [120.23, 29.71],
		'郑州': [113.65, 34.76],
		'哈尔滨': [126.63, 45.75],
		'聊城': [115.97, 36.45],
		'芜湖': [118.38, 31.33],
		'唐山': [118.02, 39.63],
		'平顶山': [113.29, 33.75],
		'邢台': [114.48, 37.05],
		'德州': [116.29, 37.45],
		'济宁': [116.59, 35.38],
		'荆州': [112.239741, 30.335165],
		'宜昌': [111.3, 30.7],
		'义乌': [120.06, 29.32],
		'丽水': [119.92, 28.45],
		'洛阳': [112.44, 34.7],
		'秦皇岛': [119.57, 39.95],
		'株洲': [113.16, 27.83],
		'石家庄': [114.48, 38.03],
		'莱芜': [117.67, 36.19],
		'常德': [111.69, 29.05],
		'保定': [115.48, 38.85],
		'湘潭': [112.91, 27.87],
		'金华': [119.64, 29.12],
		'岳阳': [113.09, 29.37],
		'长沙': [113, 28.21],
		'衢州': [118.88, 28.97],
		'廊坊': [116.7, 39.53],
		'菏泽': [115.480656, 35.23375],
		'合肥': [117.27, 31.86],
		'武汉': [114.31, 30.52],
		'大庆': [125.03, 46.58]
	};
	var yData = [];
	var convertData = function (data) {
		var res = [];
		for (var i = 0; i < data.length; i++) {
			var geoCoord = geoCoordMap[data[i].name];
			if (geoCoord) {
				res.push({
					name: data[i].name,
					value: geoCoord.concat(data[i].value)
				});
			}
		}
		return res;
	};
	// data.sort(function (o1, o2) {
	// 	if (isNaN(o1.value) || o1.value == null) return -1;
	// 	if (isNaN(o2.value) || o2.value == null) return 1;
	// 	return o1.value - o2.value;
	// });

	// for (var i = 0; i < data.length; i++) {
	// 	yData.push(data[i].name);
	// }

	var option = {
		tooltip: {
			show: true,
			formatter: function (params) {
				return params.name + '：' + (params.data['value'] ? params.data['value'] : 0);
			},
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
			roam: false,
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
				show: false,
			},
			"data": window.initData
		}]
	};
	window.myChart = echarts.init(document.getElementById('p1_main'));
	myChart.setOption(option, true);

	window.myChart_2 = echarts.init(document.getElementById('p1_sales-money'));
	var option2 = {
		"color": ["#FC6C24", "#21BDFC"],
		"grid": {
			"top": 50,
			"bottom": 20,
			"left": 20,
			"right": 20,
			"containLabel": true
		},
		"legend": {
			"data": [{
				"name": "订单金额",
				"icon": "rect"
			}],
			"itemWidth": 12,
			"itemHeight": 12,
			"textStyle": {
				"fontSize": 16,
				"color": "rgba(255,255,255, 0.6)"
			},
			"top": 12,
			"left": 21,

		},
		"tooltip": {
			"trigger": "item",
			"axisPointer": {
				"type": "cross",
				"crossStyle": {
					"color": "rgba(255,255,255, 0.6)"
				}
			},
			formatter: function (params) {
				return params.value
			},
		},
		"xAxis": {
			"type": "category",
			"axisLine": {
				"lineStyle": {
					"color": "rgba(255,255,255, 0.6)"
				}
			},
			"splitArea": {
				"show": false
			},
			nameLocation: 'start',
			"axisTick": false,
			"axisLabel": {
				"color": "rgba(255,255,255, 0.6)"
			},
			splitNumber: 20,
			// "data": ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]
			"data": []
		},
		"yAxis": [{
			"type": "value",
			"axisTick": false,
			"axisLine": {
				"lineStyle": {
					"color": "rgba(255,255,255, 0.6)"
				}
			},
			"splitLine": {
				"show": false
			},
			"axisLabel": {
				"color": "rgba(255,255,255, 0.6)"
			}
		}, ],
		"series": [{
			"name": "订单金额",
			"type": "line",
			smooth: true,
			"data": [],
		}]
	}
	myChart_2.setOption(option2, true);
	var MM = timestampToTime(new Date().getTime(), 'yyyy-mm') + '01';
	$('#p1_startDate').val(MM);
	queryData.beginDate = new Date(MM).getTime();
	searchAjax(queryData);
	timerQueryFun();
	queryRef()
	// 展示时间 
	showLeftTime();
	detapick();
	$('#p1_fullscreen').click(function() {
		Fullscreen()
	})
	$('#p1_fullscreen').trigger('click');
}();

function timerQueryFun (time) {
	var time = time ? time : timer;
	timerQuery = setInterval(function(){
		searchAjax(queryData)
	}, time)
}


// 查询所有接口，
function searchAjax(data) {
	
	// 最新十订单
	// searchNewOrder(data);
	// 销售员排行 
	// searchSalemanager(data);
	// 查询时间段内销售额
	// searchOrderSummary();
	// 查询整体销售情况
	// searchSaleSummary(data);
	// 查询各省销售情况
	searchProvSaleSummary(data);
	// 客户排行 
	// searchSaleRank(data);
}
//dom操作
$(function () {
	// 关闭
	
	$('#p1_viewClose').click(function () {
		window.open('', '_self', '');
		window.close();
	});

	// 设置
	$('#p1_viewSettings').click(function () {
		$('.p1_setting').show();
	});

	$('.p1_settingBtn').on('click', 'a', function () {
		var _index = $(this).index();
		
		if (_index == 0) {
			$('.p1_setting').hide();
		}
		if (_index == 1) {
			var data = (new Date($('#p1_startDate').val()).getTime()) || new Date().getTime();
			var timeVal = $.trim($('#p1_timerQuery').val());
			OrderSummar = [];
			OrderSummarDate = [];
			var time = parseFloat(timeVal) * 60 * 1000;
			queryData = {
				beginDate: data,
				saleOrg: ($('#p1_saleOrg').attr('refid')) || ' '
			}
			searchAjax(queryData);
			clearInterval(timerQuery);
			timerQueryFun(time)
			$('.p1_setting').hide();
		}
	});
});

// 查询最新的十个订单
function searchNewOrder(data) {
	var body = data ? data : {
		saleOrg: ''
	}
	$.ajax({
		url: '/occ-b2b-order/b2b/order/find-real-time-order',
		data: body,
		type: 'get',
		success: function (resp) {
			if (resp && resp.length > 0) {
				var html = resp.map(function (item) {
					var data = '';
					if (item.creationTime) {
						date = (new Date(item.creationTime)).toLocaleDateString();
						date = date.replace(/\//g, '-')
					}
					return '<li><span>' + item.creator + '</span><span class="p1_color-golden">' + item.totalDealAmount + '</span> <span>' + date + '</span></li>'
				});
				$('.p1_realTime-value').html('').append(html);
			}
		}
	})
};

// 查询客户销售排行
function searchSaleRank(data) {
	var body = data ? data : {
		saleOrg: '',
		beginDate: ''
	}
	$.ajax({
		url: '/occ-b2b-order/b2b/order/find-sale-rank',
		data: body,
		type: 'get',
		success: function (resp) {
			var html = '';
			for (var i = 0; i < resp.length; i++) {
				var num = 'num';
				var No = '';
				if (i < 3) {
					num += (i + 1)
				} else {
					No = i + 1;
				}
				var width = Math.ceil(resp[i].value / resp[0].value * 100);
				width = width > 100 ? 100 : width;
				html += '<li>' +
					'<span class="p1_list-num p1_icon p1_' + num + '"">' + No + '</span>' +
					'<a href="#" title='+ resp[i].name +'>' + resp[i].name + '</a>' +
					'<div class="p1_rank-bar" ><span style="width: ' + width + '%"></span></div>' +
					'<span class="p1_sales-amount">' + resp[i].value + '</span>' +
					'</li>'
				i = i == 9 ? resp.length + 1 : i;
			}
			$('.p1_sales-rank ul').html('').append(html);
		}
	})
};

// 查询销售额排名前十的销售员
function searchSalemanager(data) {
	var body = data ? data : {
		saleOrg: '',
		beginDate: ''
	}
	$.ajax({
		url: '/occ-b2b-order/b2b/order/find-salemanager-rank',
		data: body,
		type: 'get',
		success: function (resp) {
			var html = '';
			for (var i = 0; i < resp.length; i++) {
				var num = 'num';
				var No = '';
				if (i < 3) {
					num += (i + 1)
				} else {
					No = i + 1;
				}
				var width = Math.floor(resp[i].value / resp[0].value * 100);
				width = width > 100 ? 100 : width;
				html += '<li>' +
					'<span class="p1_list-num p1_icon p1_' + num + '"">' + No + '</span>' +
					'<a href="#" title='+ resp[i].name +'>' + resp[i].name + '</a>' +
					'<div class="p1_rank-bar" ><span style="width: ' + width + '%"></span></div>' +
					'<span class="p1_sales-amount">' + resp[i].value + '</span>' +
					'</li>'
				i = i == 6 ? resp.length + 1 : i;
			}
			$('.p1_sales-person ul').html('').append(html);
		}
	})
};

// 查询时间段内销售额
function searchOrderSummary() {
	
	var d1 = new Date()
	var time = d1.getTime()
	var OrderSummarDate = []

	OrderSummarDate.push(timestampToTime(time));
	OrderSummarDate.push(timestampToTime(time+1000));
	OrderSummarDate.push(timestampToTime(time+2000));
	OrderSummarDate.push(timestampToTime(time+3000));
	OrderSummarDate.push(timestampToTime(time+4000));
			window.myChart_2.setOption({
				series: [{
					"data": [
						Math.round(Math.random()*100),
						Math.round(Math.random()*100),
						Math.round(Math.random()*100),
						Math.round(Math.random()*100),
						Math.round(Math.random()*100),
					]
					
				}],
				xAxis: [{
					"data": OrderSummarDate
				}]
			});
	
};

// 查询整体销售情况
function searchSaleSummary(data) {
	var body = data ? data : {
		saleOrg: '',
		beginDate: ''
	}
	$.ajax({
		url: '/occ-b2b-order/b2b/order/find-sale-summary',
		data: body,
		type: 'get',
		success: function (resp) {
			if (resp) {
				$('#p1_totalSales').html(resp.totalDealAmount);
				$('#p1_totalMainNum').html(resp.totalNum);
				$('#p1_saleMainNum').html(resp.totalTransVol);
			}
		}
	})
};

// 查询各省销售情况
function searchProvSaleSummary(data) {
	var body = data ? data : {
		saleOrg: '',
		beginDate: ''
	}
	var str = '[{"name":"广东省","value":5072},{"name":"广西省","value":4542.6},{"name":"湖南省","value":4596},{"name":"四川省","value":45946},{"name":"内蒙古自治区","value":1800},{"name":"北京市","value":215080},{"name":"山东省","value":21380}]'
	var resp = JSON.parse(str)		

	// var newData = $.extend(true, window.initData, resp);
			var newData = window.initData;
			for (var i = 0; i < resp.length; i++) {
				for (var k = 0; k < newData.length; k++) {
					var respName = resp[i].name.substr(0, 2);
					var newDataName = newData[k].name.substr(0, 2);
					if (newDataName == respName) {
						newData[k].value = resp[i].value;
					}
				}
			}
			window.myChart.setOption({
				series: [{
					"data": newData
				}],
			})
	
};

// 询销售组织
function queryRef() {
	var body = {
		search_EQ_isEnable: 1
	}
	// $.ajax({
	// 	url: '/occ-base/organizations',
	// 	data: body,
	// 	type: 'get',
	// 	success: function (resp) {
	// 		console.log(resp)
	// 		ref('setting-select-ref', resp)
	// 	}
	// })
};

function timestampToTime(timestamp, flag) {
	var date = new Date(timestamp);
	var Y = date.getFullYear() + '-';
	var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
	var D = date.getDate() + ' ';
	var h = date.getHours() + ':';
	var m = date.getMinutes() + ':';
	var s = date.getSeconds();
	if (flag == 'yyyy-mm') {
		return Y + M;
	} else {
		return h + m + s;
	}
	
}

function showLeftTime() {
	var d = new Date(),
		str = '';
	str += d.getFullYear() + '年';
	str += d.getMonth() + 1 + '月';
	str += d.getDate() + '日';
	str += d.getHours() + '时';
	str += d.getMinutes() + '分';
	str += d.getSeconds() + '秒';

	$('.p1_header-time').html(str)
	//一秒刷新一次显示时间
	var timeID = setTimeout(showLeftTime, 1000);
}

function detapick() {
	obj = ['2018-07-12', '2018-07-13', '2018-07-20']; //禁用日期可以从数据库查
	//  自定义格式
	$.fn.datetimepicker.dates['zdy'] = {
		days: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
		daysShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
		daysMin: ["日", "一", "二", "三", "四", "五", "六"],
		months: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
		monthsShort: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
		today: "今天",
		format: "yyyy-mm-dd",
		titleFormat: "yyyy-mm-",
		weekStart: 1,
		suffix: [],
		meridiem: ["上午", "下午"]
	};
	$('#p1_startDate').datetimepicker({
		language: 'zdy',
		weekStart: 1,
		todayBtn: 1,
		autoclose: 1,
		endDate: new Date(),
		minView: 2,
		maxView: 3,
	});
}

function Fullscreen() {

	var docElm = document.documentElement;
    //W3C
    if(docElm.requestFullscreen) {
      docElm.requestFullscreen();
    }

    //FireFox
    else if(docElm.mozRequestFullScreen) {
      docElm.mozRequestFullScreen();
    }

    //Chrome等
    else if(docElm.webkitRequestFullScreen) {
      docElm.webkitRequestFullScreen();
    }

    //IE11
    else if(elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    }
}

function ref (el, data) {
	var $el = $('.' + el);
	
	if (!data || !data.content) {
		return;
	}
	var html = '<div class="p1_select-container"><ul>';
	data.content.forEach(function (item) {
		html += '<li refId="'+ item.id +'">'+ item.name +'</li>'
	});
	html += '</ul></div>';
	$el.parent().find('.p1_select-container').remove();
	$el.parent().append(html);
	$el.on('click', function (){
		var clas = $el.parent().hasClass('isSelecked');
		if (clas) {
			$el.parent().removeClass('isSelecked');
		} else {
			$el.parent().addClass('isSelecked');
		}
	});
	var _container = $el.parent().find('.p1_select-container ul');
	if (_container) {
		_container.on('click', 'li', function(){
			var _index = $(this).index;
			var _id = $(this).attr('refid'),
				_val = $(this).html(),
				prev = $(this).parents('.p1_select-container').prev();
			prev.val(_val).attr('refId', _id)
			$el.parent().removeClass('isSelecked');
		})
	}
}