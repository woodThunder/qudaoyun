//回车提交动作
$(document).on('keydown', function(e){
	if($(".bac").length==0){
		if(e.keyCode == 13){
			var obtnLogin=document.getElementById("loginBtn")
			obtnLogin.focus();
		}
	}
});

//提交表单
$('#loginBtn').on('click', function(){
	
	
//	$('.enterprises').show();
//	$('#login_form').hide();
//	return ;
//	show_loading();
	var myReg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/; //邮件正则
	if($('#username').val() == ''){
		show_err_msg('用户名还没填呢！');	
		$('#username').focus();
	}else if($('#password').val() == ''){
		show_err_msg('密码还没填呢！');
		$('#password').focus();
	}else{
		var data =
				{ 
					telephone:$('#telephone').val(),
					password:$('#password').val()
				};
				var parm =JSON.stringify(data);
		$.ajax({
			url: "/workbench/account/login",
			type: 'POST',
			data: parm,
			dataType: 'JSON',
			contentType: 'application/json',
			cache: false,
			success: function (ret) {
				if(ret.error){
					show_err_msg(ret.error);
					return ;
				}
				if(ret.db_code){
					window.open("/workbench/home/index?db_code="+ret.db_code+"&tenantId="+ret.tenantId, "_self"); 
				}
				if(ret.tuser){
					$(".enterprises").show();
					$('#login_form').hide();
					$(".list-wrapper").empty();
					var str = [];
					$.each(ret.tuser, function(i, item) {
						var tenant = item.modeltype=="allshare"?item.tenantid:"default";
						str.push(
								'<li class="enterprise-item first-item can-use" data-id="'+tenant+'" data-db="'+item.datasourcecode+'">'+
                            		'<div class="enterprise-info">'+
                            			'<p class="enterprise-name">'+item.tenantname+'</p>'+
                            			'<span class="enter-icon j-enter-icon"></span>'+
                            		'</div>'+
                        		'</li>'
						);					

					});
					$(".list-wrapper").append(str);
				}
			}
		});
	}
});

$(".list-wrapper").on('click','.enterprise-item',function(){
	var db_code = $(this).attr('data-db');
	var tenantId = $(this).attr('data-id');
	window.open("/workbench/home/index?db_code="+db_code+"&tenantId="+tenantId, "_self"); 
})


//提交验证
$('.page-container form').on('submit', function(){
	var username = $(this).find('.username').val();
	var password = $(this).find('.password').val();
	if(username == '') {
		$(this).find('.error').fadeOut('fast', function(){
			$(this).css('top', '27px');
		});
		$(this).find('.error').fadeIn('fast', function(){
			$(this).parent().find('.username').focus();
		});
		return false;
	}
	if(password == '') {
		$(this).find('.error').fadeOut('fast', function(){
			$(this).css('top', '96px');
		});
		$(this).find('.error').fadeIn('fast', function(){
			$(this).parent().find('.password').focus();
		});
		return false;
	}
});

//输入时取消错误提示
$('.page-container form .username, .page-container form .password').on('keyup', function(){
	$(this).parent().find('.error').fadeOut('fast');
});
