/**
 * author:zhanghy7
 * time:20170524
 */

(function(win){
	win.refinfo = {};
	refinfo['wbUser'] = {
			"refClientPageInfo":{"currPageIndex":0,
				"pageCount":0,"pageSize":100},
				"refCode":"wbUser",
				"refModelUrl":"/wbalone/wbUserRef/",
				"refName":"用户",
				"refUIType":"RefGrid",
				"rootName":"用户列表"
	};
	
	refinfo['dept'] = {
			"refClientPageInfo":{"currPageIndex":0,
				"pageCount":0,"pageSize":100},
				"refCode":"dept",
				"refModelUrl":"/wbalone/deptUnderOrgRef/",
				"refName":"组织下部门",
				"refUIType":"RefTree",
				"rootName":"部门列表"
	};
	
	refinfo['organization'] = {
			"refClientPageInfo":{"currPageIndex":0,
				"pageCount":0,"pageSize":100},
				"refCode":"organization",
				"refModelUrl":"/wbalone/organizationRef/",
				"refName":"组织",
				"refUIType":"RefTree",
				"rootName":"组织列表"
	};
	
	refinfo['people'] = {
			"refClientPageInfo":{"currPageIndex":0,
				"pageCount":0,"pageSize":100},
				"refCode":"people",
				"refModelUrl":"/iuap_qy/peopledocRef/",
				"refName":"人员",
				"refUIType":"RefGrid",
				"rootName":"档案列表"
	};
	
	refinfo['printTemplate'] = {
			"refClientPageInfo":{"currPageIndex":0,
				"pageCount":0,"pageSize":100},
				"refCode":"printTemplate",
				"refModelUrl":"/iuap_qy/printTemplateRef/",
				"refName":"打印模版",
				"refUIType":"RefGrid",
				"strFieldCode":["refcode","refname","reftype"],
				"strFieldName":["模版编码","模版名称","模版类型"],
				"rootName":"模版列表"
	};
	
	refinfo['repositoryRef'] = {
			"refClientPageInfo":{"currPageIndex":0,
				"pageCount":0,"pageSize":100},
				"refCode":"repositoryRef",
				"refModelUrl":"/iuap_qy/repositoryRef/",
				"refName":"流程定义",
				"refUIType":"RefGrid",
				"strFieldCode":["refcode","refname"],
				"strFieldName":["定义编码","定义名称"],
				"rootName":"流程定义列表"
	};
	
})(window);