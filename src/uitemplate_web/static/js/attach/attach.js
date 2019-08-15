require.config({
	paths: {
		'webUploader':"/uitemplate_web/static/js/attach/webuploader"
	},
	shim: {
        'webUploader':{
            deps:["css!/iuap-saas-filesystem-service/resources/js/webuploader.css",]
        }
	}
})
define(["webUploader"],function(webUploader){

	var addAttachEvent = function(){

		var filepath="/hr/fileupload/";
        var groupname="hr";


        /**
         * click event //头像上传
         */
        var uploadimg={
            init: function () {
                //获取表单数据
                var par = {
                    filepath:filepath,//[单据相关的唯一标示，一般包含单据ID，如果有多个附件的时候由业务自己制定规则]
                    groupname:groupname, //[分組名称,未来会提供树节点]
                    url:true,  //是否返回附件的连接地址,
                    permission: "read",
                    thumbnail :  "w_500"
                }
                // 初始化Web Uploader
                var uploader = webUploader.create({
                    // 选完文件后，是否自动上传。
                    auto: true,
                    swf: window.baseUrl + '/vendor/trd/upload/Uploader.swf?v=' + Math.random(),
                    server: "/iuap-saas-filesystem-service/file/upload",
                    chunked: false,
                    chunkSize: 512 * 1024,
                    formData:par,
                    pick: '#filePicker',
                    fileNumLimit: 1,
                    dupliacate:true,
                    fileSizeLimit: 1024*200,
                    // 只允许选择图片文件。
                    accept: {
                        title: 'Images',
                        extensions: 'gif,jpg,jpeg,bmp,png',
                        mimeTypes: 'image/*'
                    }
                });
                uploader.on('beforeFileQueued', function (file) {
                    //如果是单文件上传，把旧的文件地址传过去
                    var timestamp=new Date().getTime();
                    var filepath="/hr/fileupload/"+ timestamp;
                    var groupname="hr";
                    var data = {
                        filepath:filepath,//[单据相关的唯一标示，一般包含单据ID，如果有多个附件的时候由业务自己制定规则]
                        groupname:groupname, //[分組名称,未来会提供树节点]
                        url:true,  //是否返回附件的连接地址,
                        permission: "read",
                        thumbnail :  "w_500",//【选填】缩略图--可调节大小，和url参数配合使用，不会存储到数据库
                    }
                    uploader.option( 'formData',data);

                });

                // 文件上传成功，给item添加成功class, 用样式标记上传成功。
                uploader.on('uploadSuccess', function (file, res) {
                    uploader.removeFile(file);
                    var fieldid = $("#filePicker").attr("fieldid");//用于绑定url信息
                    if(res && 1 == res.status && res.data.length > 0){

                            var pictureUrl = res.data[0].url;
                            if(pictureUrl.indexOf("http")<0){
                                pictureUrl="http://"+pictureUrl;
                            }
                            $(".touxiangimg")[0].src=pictureUrl;
                            //绑定url
                            app.dataTables.headform.getCurrentRow().setValue(fieldid,pictureUrl);

                    }else {
                        var message = res.message;
                        u.showMessageDialog({type:"info",title:"头像上传错误信息",msg: message,backdrop:true});
                    }

                    /* $('#' + file.id).addClass('upload-state-done');*/
                });

                // 文件上传失败，显示上传出错。
                uploader.on('uploadError', function (file, res) {
                    u.showMessage({showSeconds: 2,msg:res.msg,position:"center",msgType:"error"});

                });
                uploader.on('error', function (type) {
                    if(type == "Q_EXCEED_SIZE_LIMIT"){
                        u.showMessage({showSeconds: 2,msg:"文件大小不能超过200K",position:"center",msgType:"error"});
                    }
                    console.log(">>>>>error:" + type);
                });
                // 完成上传完了，成功或者失败，先删除进度条。
                uploader.on('uploadComplete', function (file) {
                    $('.upload-tip').hide();
                    uploader.reset();
                });
                // 所有文件上传成功后调用
                uploader.on('uploadFinished', function () {
                    //清空队列

                    uploader.reset();
                });
            }
        }
        // $(document).on("change", "#uploadbatch_id", function(e) {
        	// var fieldid = $(this).parent().attr("fieldid");//用于绑定url信息
        	// var timestamp=new Date().getTime();
		// 	var fileLimitSize=1*1024*200;
        	// if($("#uploadbatch_id")[0].files[0]!=null&&$("#uploadbatch_id")[0].files[0].size<fileLimitSize&&$("#uploadbatch_id")[0].files[0].type.indexOf("image")>=0){
        	// 	filesystem_fileUpload(filepath+timestamp,groupname,true,fieldid);
        	// }else if($("#uploadbatch_id")[0].files[0]!=null&&$("#uploadbatch_id")[0].files[0].type.indexOf("image")<0){
		// 		u.showMessage({showSeconds: 2,msg:"请上传gif,jpg,jpeg,bmp,png格式图片",position:"center",msgType:"error"});
		// 		return false;
		// 	}else if($("#uploadbatch_id")[0].files[0]!=null&&$("#uploadbatch_id")[0].files[0].size>fileLimitSize){
		// 		u.showMessage({showSeconds: 2,msg:"文件大小不能超过200K",position:"center",msgType:"error"});
		// 		return false;
		// 	}
		// });
		uploadimg.init();
		$("#fileList").hover(function(){
				$("#filePicker").removeClass("hide");
				// $("#uploadbatch_id").removeClass("hide");
		   },function(){
				   $("#filePicker").addClass("hide");
				   // $("#uploadbatch_id").addClass("hide");
		});
	}
	 function filesystem_fileUpload(filepath,groupname,imageflag,fieldid) {
		 	$.ajaxFileUpload({
		 		url : "/iuap-saas-filesystem-service/file/upload",
		 		secureuri:false,
		 		fileElementId : 'uploadbatch_id',
		 		type : 'post',//固定 post类型 不可修改 
		 		dataType : 'json', //返回值类型 一般设置为json
		 		data : {
			        filepath:filepath,//[单据相关的唯一标示，一般包含单据ID，如果有多个附件的时候由业务自己制定规则]
			        groupname:groupname, //[分組名称,未来会提供树节点]
			        url:true,  //是否返回附件的连接地址,
			        permission: "read",
			        thumbnail :  "w_500",//【选填】缩略图--可调节大小，和url参数配合使用，不会存储到数据库
					//cross_url : "/filesrv/" //【选填】跨iuap-saas-fileservice-base 时候必填
				},
		 		success : function(result) //服务器成功响应处理函数
		 		{
		 			if(result && 1 == result.status && result.data.length > 0){
		 				if(imageflag){//如果是头像上传
		 					var pictureUrl = result.data[0].url;
							if(pictureUrl.indexOf("http")<0){
								pictureUrl="http://"+pictureUrl;
							}
							$(".touxiangimg")[0].src=pictureUrl;
							//绑定url
				        	app.dataTables.headform.getCurrentRow().setValue(fieldid,pictureUrl);
 				        }
					}else {
						var message = result.message;
						u.showMessageDialog({type:"info",title:"头像上传错误信息",msg: message,backdrop:true});
					}
		 		}
		 	}) 
	 };
	
	return {
		addAttachEvent: addAttachEvent
	}
	
})