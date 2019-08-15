define(['cookieOperation'], function() {
	var cookieOperation = require('cookieOperation');
	function getUserInfoByName(name) { 
		name = "_A_P_" + name;
		return cookieOperation.get(name)
	}

	function UserInfo () {
		this.init();
	};

	UserInfo.prototype.init = function () {
		this.id = getUserInfoByName('userId');
		this.name = decodeURI(getUserInfoByName('userName'));
		this.avator = getUserInfoByName('userAvator');
		this.rolename = decodeURI(getUserInfoByName('rolename'));
		this.rolecode = getUserInfoByName('rolecode');
		this.defaultRolecode = getUserInfoByName('defaulstCode');
	};

	UserInfo.prototype.refresh = function () {
		this.init();
		return this;
	};

	var userInfo = new UserInfo();

	return userInfo;
});