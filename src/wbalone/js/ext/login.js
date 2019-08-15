require([ 'jquery'], function($) {
	function showWrongMessage(wrong){
		$("#wrong").show().find("span").first().html(wrong);
	}
	$('#password').keyup(function(){
		$("#wrong").find('span').text('');
	})
	function login(){
		var username = $("#username").val();
		var password = $("#password").val();
		var param = {
			username : username,
			password : password
		};
		$.post(contextRoot+"/account/login",param, function(data) {
			//var da = JSON.parse(data);

			if(data.status=="0"){
				showWrongMessage(data.message);
				return ;
			}
			//location.href = config.baseUrl+"portalui/index.html";
			window.open(config.baseUrl+"home/index", "_self");
		});
	}
	
	$(function(){
		$("#loginBtn").click(function(){
			login();
		});
		$("#password").keyup(function(event) {
			if (event.keyCode == 13) {
				login();
			}
		});
	});
});
