/**
 * 前端的国际化操作：
 * 1、国际化展示采用用户自己选择的语种进行展示；
 * 2、默认的语种为简体中文；
 * 3、网站支持国际化多语，需要对翻译的内容进行资源化；
 * 4、
 */

/*
 * 设置语言类型： 默认为中文
 */
var defaultLocales = getCookie("u_locale");

/**
 *  页面执行主入口
 */
$(function() {

	/*
	 * 设置默认的语言环境
	 */
	setDefaultLocales();

	/* 
	 * 加载I18n资源 
	 */
	loadI18nProperties();
	
});


/**
 * 页面设置Locales
 */
function pageLocales(){
	
	/* 将语言选择默认选中缓存中的值 */
	$("#language option[value=" + defaultLocales + "]").attr("selected", true);

	/* 选择语言 */
	$("#language").on('change', function() {
		var language = $(this).children('option:selected').val()
		console.log(language);
		getCookie("locales", language, {
			expires : 30,
			path : '/'
		});
		getCookie("u_locale", language, {
			expires : 30,
			path : '/'
		});
		location.reload();
	});
	
};


/**
 * 加载i18n资源
 * 回调函数中不需要写入任何的处理逻辑，页面赋值单独处理
 * TODO 把当前目录下的资源文件都加载
 * @return
 */
function loadI18nProperties() {
	
	/*
	 * i18n资源加载
	 */
	$.i18n.properties({
		name : 'iuap',// + defaultLocales, // 资源文件名称
        language : defaultLocales,
		// path : 'locales/', //'locales/' + defaultLocales + '/', // 资源文件路径
		path : 'http://localhost:8080/wbalone/locales',
		mode : 'map', // 用Map的方式使用资源文件中的值
		//checkAvailableLanguages: true,
		//async: true,
		callback : function() {
			// do nothing
		}
	});
	
	/* 需要引入 i18n 文件 */
	if ($.i18n == undefined) {
		console.log("请引入i18n js 文件")
		return false;
	};

};

/**
 * 给页面进行赋值
 * 该部分由于页面异步加载的问题，需要使用回调函数aftercreate
 * 1、 html页面： 先对其中的i18n标记的label进行赋值，再对grid的title进行赋值
 * 2、 js文件：直接通过i18n.prop进行赋值
 */
function assignmentPage() {
	
	// 对其中的i18n标记的label进行赋值
	var labelElement = $(".i18n");
	
	console.log("写入完毕---" +labelElement.length);
	
	labelElement.each(function() {
		// 根据i18n元素的 name 获取内容写入
		$(this).html($.i18n.prop($(this).attr('name')));
	});

	// 该部分需要对表格部分的title进行重新的封装。
	// 建议进行替换的方式，通过type=text & u-mate.type = grid找到options在找到title进行替换
	var gridElement = $("div[attribute='options']");

	gridElement.each(function() {
		var options = $(this).html();
		
	});
};

/**
 * 设置cookie操作
 */
function setCookie(name, value, options) {
	
	options = options || {};
	if (value === null) {
		value = '';
		options.expires = -1;
	}
	var expires = '';
	if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
		var date;
		if (typeof options.expires == 'number') {
			date = new Date();
			date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
		} else {
			date = options.expires;
		}
		expires = '; expires=' + date.toUTCString();
	}
	var path = options.path ? '; path=' + options.path : '';
	var domain = options.domain ? '; domain=' + options.domain : '';
	var s = [ cookie, expires, path, domain, secure ].join('');
	var secure = options.secure ? '; secure' : '';
	var c = [ name, '=', encodeURIComponent(value) ].join('');
	var cookie = [ c, expires, path, domain, secure ].join('')
	document.cookie = cookie;

};

/**
 * 获取cookie操作
 */
function getCookie(name) {
	
	var cookieValue = null;
	if (document.cookie && document.cookie != '') {
		var cookies = document.cookie.split(';');
		for (var i = 0; i < cookies.length; i++) {
			var cookie = $.trim(cookies[i]);
			// Does this cookie string begin with the name we want?
			if (cookie.substring(0, name.length + 1) == (name + '=')) {
				cookieValue = decodeURIComponent(cookie
						.substring(name.length + 1));
				break;
			}
		}
	}
	return cookieValue;
	
};

/**
 * 获取浏览器语言类型
 * 
 * @return {string} 浏览器国家语言
 */
function getNavLocales () {
	
	if (navigator.appName == "Netscape") {
		var navLanguage = navigator.language;
		return navLanguage.substr(0, 2);
	}
	return false;
};

/**
 * 设置默认的语言环境
 * 1、 先从本地cookie中获取，
 * 2、 再从本地语言环境中获取
 * 3、 TODO 如果用于有自己的设置的话，从session中获取
 */
function  setDefaultLocales(){
	if (getCookie("u_locale")) {
		defaultLocales = getCookie("u_locale");
	} else {
		// 获取浏览器语言
		var navLocales = getNavLocales();
		if (navLocales) {
			defaultLocales = navLocales;
			// 存到cookie中
			setCookie("u_locale", navLocales);
		} else {
			console.log("not navigator");
			return false;
		}
	}
};


/**
 *  页面执行主入口
 */
function initI18n() {
	/*
	 * 给页面赋值
	 */
	assignmentPage();
};
